<script setup lang="ts">
import { Btn } from '@roku-ui/vue'
import { v3GetUserByUserId, v3GetUserCodingHistory, v3GetUserTopLanguagesRank } from '~/api/v3'

definePageMeta({
  middleware: ['i18n'],
})

const route = useRoute()
const t = useI18N()

const uid = computed(() => {
  return Number(route.params.uid)
})

// 获取用户基本信息和状态
const { data: userResult, error: userError } = await useAsyncData(`user-${uid.value}`, async () => {
  try {
    const response = await v3GetUserByUserId({
      path: {
        user_id: uid.value,
      },
    })
    return {
      user: response.data,
      isHidden: false,
      notFound: false,
    }
  }
  catch (error: any) {
    console.error('Error fetching user:', error)

    // 检查是否是403错误（用户隐藏数据）
    if (error?.status_code === 403 || error?.status === 403) {
      return {
        user: null,
        isHidden: true,
        notFound: false,
      }
    }

    // 其他错误视为用户不存在
    return {
      user: null,
      isHidden: false,
      notFound: true,
    }
  }
})

// 从结果中提取数据
const user = computed(() => userResult.value?.user || null)
const userHiddenData = computed(() => userResult.value?.isHidden || false)
const userNotFound = computed(() => userResult.value?.notFound || false)

// 如果用户不存在，显示404错误
if (userNotFound.value || (userError.value && !userHiddenData.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'User not found',
  })
}

// 获取用户最常用语言排行榜
const { data: topLanguagesData, pending: languagesPending } = await useAsyncData(`topLanguages-${uid.value}`, async () => {
  // 如果用户隐藏了数据，不尝试获取语言排行榜
  if (userHiddenData.value) {
    return null
  }

  try {
    const response = await v3GetUserTopLanguagesRank({
      path: {
        user_id: uid.value,
      },
    })
    return response.data
  }
  catch (error: any) {
    console.error('Error fetching top languages ranks:', error)
    return null
  }
})

// 计算属性来获取语言条目
const topLanguagesRanks = computed(() => {
  return topLanguagesData.value?.entries || []
})

// 获取用户编程历史数据用于近期活动日历
const { data: codingHistoryData, pending: codingHistoryPending } = await useAsyncData(`codingHistory-${uid.value}`, async () => {
  if (userHiddenData.value) {
    return null
  }

  try {
    const response = await v3GetUserCodingHistory({
      path: {
        user_id: uid.value,
      },
      query: {
        days: 90, // 获取90天的数据
      },
    })

    return response.data
  }
  catch (error: any) {
    console.error('Error fetching coding history:', error)
    console.error('Error details:', {
      status: error.status,
      statusCode: error.status_code,
      message: error.message,
      detail: error.detail,
    })
    return null
  }
})

// 处理近期90天的日历数据
const recentActivityData = computed(() => {
  if (!codingHistoryData.value?.data) {
    return []
  }

  return codingHistoryData.value.data
    .map((d: { time: string, duration: number }) => ({
      date: new Date(d.time),
      duration: d.duration * 60 * 1000, // 转换为毫秒
    }))
    .sort((a: { date: Date, duration: number }, b: { date: Date, duration: number }) => a.date.getTime() - b.date.getTime())
})

// 使用新API的数据更新统计概览
const totalMinutesFromHistory = computed(() => {
  return codingHistoryData.value?.totalMinutes || 0
})

// 更新活跃天数计算（基于实际有编程记录的天数）
const activeDaysFromHistory = computed(() => {
  return recentActivityData.value.filter((d: { date: Date, duration: number }) => d.duration > 0).length
})

// 计算统计概览数据
const totalMinutes = computed(() => {
  // 优先使用编程历史API的总时间，如果没有则使用语言排名数据
  if (totalMinutesFromHistory.value > 0) {
    return totalMinutesFromHistory.value
  }
  return topLanguagesRanks.value.reduce((sum, item) => sum + item.totalMinutes, 0)
})

const activeDays = computed(() => {
  // 优先使用编程历史API的活跃天数，如果没有则估算
  if (activeDaysFromHistory.value > 0) {
    return activeDaysFromHistory.value
  }
  // 简单估算：假设平均每天编程1小时，可以基于总时间估算活跃天数
  const estimatedDays = Math.min(Math.floor(totalMinutes.value / 60), 365)
  return estimatedDays
})

const bestPercentile = computed(() => {
  // 使用最好的语言排名百分位数作为整体排名参考
  if (topLanguagesRanks.value.length > 0) {
    return Math.min(...topLanguagesRanks.value.map(item => item.percentile))
  }
  return null
})

// 设置SEO元数据
watchEffect(() => {
  useSeoMeta({
    title: `${user.value?.username} - CodeTime`,
    description: user.value?.bio || `${user.value?.username}'s CodeTime profile`,
    ogTitle: `${user.value?.username} - CodeTime`,
    ogDescription: user.value?.bio || `${user.value?.username}'s CodeTime profile`,
    twitterTitle: `${user.value?.username} - CodeTime`,
    twitterDescription: user.value?.bio || `${user.value?.username}'s CodeTime profile`,
  })
})
</script>

<template>
  <NuxtLayout name="user">
    <div class="mx-auto p-6 max-w-4xl">
      <!-- Hidden Data Warning -->
      <div v-if="userHiddenData" :key="`hidden-${uid}`" class="mb-8 p-6 border border-amber-500/20 rounded-lg bg-amber-500/10">
        <div class="flex gap-3 items-center">
          <i class="i-tabler-lock text-2xl text-amber-600" />
          <div>
            <h2 class="text-lg text-amber-800 font-semibold">
              此用户已隐藏了信息
            </h2>
            <p class="text-amber-700">
              该用户选择将编程数据设为私有。
            </p>
          </div>
        </div>
      </div>

      <!-- User Header -->
      <div class="mb-8 flex flex-col items-center">
        <div v-if="user?.avatar" class="mb-4">
          <img
            :src="user.avatar"
            :alt="user.username"
            class="border-surface-dimmed border-4 rounded-full h-24 w-24"
          >
        </div>
        <div v-else class="mb-4">
          <div class="border-surface-dimmed bg-surface-dim border-4 rounded-full flex h-24 w-24 items-center justify-center">
            <i class="i-tabler-user text-4xl text-surface-dimmed" />
          </div>
        </div>

        <h1 class="text-3xl font-bold text-center">
          {{ user?.username || `User ${uid}` }}
        </h1>

        <div v-if="user?.email" class="text-surface-dimmed">
          {{ user.email }}
        </div>

        <div v-if="user?.bio" class="mt-2 text-center max-w-md">
          {{ user.bio }}
        </div>

        <div class="text-sm text-surface-dimmed mt-2 flex gap-4">
          <div v-if="user?.plan" class="flex gap-1 items-center">
            <i class="i-tabler-crown" />
            <span>{{ user.plan }}</span>
          </div>
          <div v-if="user?.createdAt" class="flex gap-1 items-center">
            <i class="i-tabler-calendar" />
            <span>{{ new Date(user.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

      <!-- Statistics Overview -->
      <div v-if="!userHiddenData" class="mb-8">
        <UserStatsOverview
          :total-minutes="totalMinutes"
          :percentile="bestPercentile"
          :active-days="activeDays"
          :loading="languagesPending || codingHistoryPending"
        />
      </div>

      <!-- Recent Activity Calendar -->
      <div v-if="!userHiddenData" class="mb-8">
        <UserRecentActivityCalendar
          :data="recentActivityData"
          :loading="codingHistoryPending"
          :days="codingHistoryData?.timeRangeDays || 90"
        />
      </div>

      <!-- Top Languages Ranking -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">
          {{ t.dashboard.overview.top.language }}
        </h2>

        <!-- Loading State -->
        <div v-if="languagesPending" class="space-y-3">
          <div
            v-for="i in 3"
            :key="i"
            class="border-surface-dimmed p-4 border rounded-lg animate-pulse"
          >
            <div class="flex gap-3 items-center">
              <div class="bg-surface-dimmed rounded h-8 w-8" />
              <div class="bg-surface-dimmed rounded h-8 w-8" />
              <div class="flex-1 space-y-2">
                <div class="bg-surface-dimmed rounded h-4 w-24" />
                <div class="bg-surface-dimmed rounded h-3 w-16" />
              </div>
            </div>
          </div>
        </div>

        <!-- Data State -->
        <div v-else-if="topLanguagesRanks && topLanguagesRanks.length > 0" class="space-y-3">
          <div
            v-for="(rank, index) in topLanguagesRanks"
            :key="rank.language"
            class="border-surface-dimmed p-4 border rounded-lg flex items-center justify-between"
          >
            <div class="flex gap-3 items-center">
              <div class="text-2xl text-primary font-bold">
                #{{ index + 1 }}
              </div>
              <VSCodeIcon
                :language="rank.language || 'Unknown'"
                class="h-8 w-8"
              />
              <div>
                <div class="font-semibold">
                  {{ getLanguageName(rank.language || 'Unknown') }}
                </div>
                <div class="text-sm text-surface-dimmed">
                  {{ getDurationString(rank.totalMinutes * 60 * 1000) }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-surface-dimmed">
                {{ (rank.percentile * 100).toFixed(1) }}%
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="py-12 text-center">
          <i class="i-tabler-chart-bar text-6xl text-surface-dimmed mx-auto mb-4 block" />
          <h3 class="text-xl font-semibold mb-2">
            {{ t.dashboard.overview.noData.notice.title }}
          </h3>
          <p class="text-surface-dimmed">
            No programming language data available for this user yet.
          </p>
        </div>
      </div>

      <!-- Links Section -->
      <div class="border-surface-dimmed pt-6 border-t">
        <h2 class="text-xl font-bold mb-4">
          Links
        </h2>
        <div class="flex gap-4">
          <NuxtLink
            :to="`/${useLocale().value}/user/${uid}/annual-report`"
          >
            <Btn>
              <i class="i-tabler-chart-line" />
              <span>{{ t.annualReport.reviewAnnualReport }}</span>
            </Btn>
          </NuxtLink>

          <a
            v-if="user?.githubId"
            :href="`https://github.com/user/${user.githubId}`"
            target="_blank"
          >
            <Btn variant="outline">
              <i class="i-tabler-brand-github" />
              <span>GitHub</span>
            </Btn>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
