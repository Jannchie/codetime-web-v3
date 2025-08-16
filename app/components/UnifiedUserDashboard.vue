<script setup lang="ts">
import * as d3 from 'd3'
import { v3GetUserByUserId, v3GetUserTopLanguagesRank } from '~/api/v3'

type UnifiedUserDashboardProps = {
  userId?: number
  showUserInfo?: boolean
  showControls?: boolean
  layout?: 'dashboard' | 'user'
}

const props = withDefaults(defineProps<UnifiedUserDashboardProps>(), {
  showUserInfo: false,
  showControls: true,
  layout: 'dashboard',
})

const route = useRoute()
const t = useI18N()

// 确定用户ID - 优先使用props，否则从路由获取，最后使用当前用户
const currentUser = useUser()
const targetUserId = computed(() => {
  if (props.userId) {
 return props.userId
}
  if (route.params.uid) {
 return Number(route.params.uid)
}
  return currentUser.value?.id
})

const isOwnProfile = computed(() => {
  return targetUserId.value === currentUser.value?.id
})

// 过滤器系统（仅在概览模式下使用）
const filters = reactive<FilterItem[]>([])
provide('filters', filters)

// 日期范围控制
const days = useLocalStorage('days', ref(currentUser.value?.plan === 'pro' ? 365 : 28))
const segments = ref(5)

const endTime = computed(() => new Date())
const startTime = computed(() => {
  const start = new Date()
  start.setDate(start.getDate() - days.value)
  return start
})

// 用户信息获取（仅在显示用户信息时）
const { data: userResult, error: userError } = await useAsyncData(`user-${targetUserId.value}`, async () => {
  if (!props.showUserInfo || !targetUserId.value) {
 return null
}

  try {
    const response = await v3GetUserByUserId({
      path: {
        user_id: targetUserId.value,
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

    if (error?.status_code === 403 || error?.status === 403) {
      return {
        user: null,
        isHidden: true,
        notFound: false,
      }
    }

    return {
      user: null,
      isHidden: false,
      notFound: true,
    }
  }
})

const user = computed(() => userResult.value?.user || null)
const userHiddenData = computed(() => userResult.value?.isHidden || false)
const userNotFound = computed(() => userResult.value?.notFound || false)

// 如果用户不存在，显示404错误
if (props.showUserInfo && userNotFound.value && userError.value && !userHiddenData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'User not found',
  })
}

// Dashboard数据获取（仅在dashboard模式或查看自己的资料时）
const shouldFetchDashboardData = computed(() => {
  return props.layout === 'dashboard' || isOwnProfile.value
})

const allDataResp = shouldFetchDashboardData.value ? fetchStats(days, 'time', 'days') : { data: ref(null), status: ref('success') }
const allLanguageDataResp = shouldFetchDashboardData.value ? fetchStats(days, 'language', 'days') : { data: ref(null), status: ref('success') }
const allProjectDataResp = shouldFetchDashboardData.value ? fetchStats(days, 'workspace', 'days') : { data: ref(null), status: ref('success') }

const allLanguageData = computed(() => allLanguageDataResp.data.value?.data ?? [])
const allProjectData = computed(() => allProjectDataResp.data.value?.data ?? [])
const hasData = computed(() => {
  if (allDataResp.data.value === null) {
    return false
  }
  return (allDataResp.data.value?.data.length ?? 0) > 0
})

const allData = computed(() => {
  return allDataResp.data.value?.data ?? []
})

const pAllData = useProcessedData(allData)
const pAllLangData = useProcessedData(allLanguageData)
const pAllProjectData = useProcessedData(allProjectData)

const filtedData = computed(() => {
  const data = unref(pAllData)
  const res = data.filter((d) => {
    return d.date.getTime() >= d3.utcDay.offset(new Date(), -days.value).getTime()
  })
  return res
})

// 用户特定数据获取（语言排行和编程历史）
const { data: topLanguagesData, pending: languagesPending } = await useAsyncData(`topLanguages-${targetUserId.value}`, async () => {
  if (!targetUserId.value || (props.showUserInfo && userHiddenData.value)) {
    return null
  }

  try {
    const response = await v3GetUserTopLanguagesRank({
      path: {
        user_id: targetUserId.value,
      },
    })
    return response.data
  }
  catch (error: any) {
    console.error('Error fetching top languages ranks:', error)
    return null
  }
})

const topLanguagesRanks = computed(() => {
  return topLanguagesData.value?.entries || []
})

const topLanguage = computed(() => {
  if (topLanguagesRanks.value.length > 0) {
    return topLanguagesRanks.value[0]?.language
  }
  return null
})

// SEO设置（仅在用户页面模式）
watchEffect(() => {
  if (props.showUserInfo && user.value && !userHiddenData.value) {
    useSeoMeta({
      title: `${user.value.username} - CodeTime Developer Profile`,
      description: user.value.bio || `View ${user.value.username}'s programming analytics, coding patterns, and development insights on CodeTime. See their most used programming languages and coding activity.`,
      keywords: `${user.value.username}, developer profile, programming analytics, coding statistics, ${topLanguage.value || 'programming'} developer`,
      ogTitle: `${user.value.username} - CodeTime Developer Profile`,
      ogDescription: user.value.bio || `View ${user.value.username}'s programming analytics and coding patterns`,
      ogType: 'profile',
      ogImage: user.value.avatar || '/icon.png',
      twitterTitle: `${user.value.username} - CodeTime Developer Profile`,
      twitterDescription: user.value.bio || `View ${user.value.username}'s programming analytics`,
      twitterCard: 'summary',
    })
  }
})
</script>

<template>
  <div class="mx-auto p-6 max-w-6xl space-y-8">
    <!-- User Header (仅在用户模式显示) -->
    <div v-if="showUserInfo" class="space-y-6">
      <!-- Hidden Data Warning -->
      <div v-if="userHiddenData" :key="`hidden-${targetUserId}`" class="p-6 border border-amber-500/20 rounded-lg bg-amber-500/10">
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
      <div class="flex flex-col items-center">
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
          {{ user?.username || `User ${targetUserId}` }}
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
    </div>

    <!-- 控制面板 (仅在启用时显示) -->
    <div v-if="showControls && !userHiddenData" class="space-y-4">
      <DashboardDataRange v-model:days="days" />
    </div>

    <!-- 数据内容区域 -->
    <div v-if="!userHiddenData" class="space-y-8">
      <!-- Dashboard模式的内容 -->
      <template v-if="shouldFetchDashboardData">
        <!-- 插件指引 (当没有数据时，仅在 dashboard 模式下显示) -->
        <DashboardPluginGuide v-if="layout === 'dashboard' && allDataResp.status.value === 'success' && !hasData" />

        <!-- Dashboard内容 (当有数据时) -->
        <template v-else>
          <!-- 活动日历 -->
          <DashboardCalendarCard
            :loading="allDataResp.status.value !== 'success'"
            :data="allData"
          />

          <!-- 过滤器 (仅在概览模式) -->
          <DashboardFilterWrapper v-if="layout === 'dashboard'" />

          <!-- Top卡片区域 -->
          <div
            v-if="hasData"
            class="flex flex-basis-[100%] flex-col flex-wrap gap-2 sm:flex-row sm:children:flex-basis-[calc(100%/3-0.5rem*2/3)] sm:children:max-w-[calc(100%/3-0.5rem*2/3)]"
          >
            <DashboardTopCard
              icon="i-tabler-braces"
              type="language"
              :days="days"
              :filters="filters"
              :title="t.dashboard.overview.top.language"
            />
            <DashboardTopCard
              icon="i-tabler-app-window"
              type="workspace"
              :days="days"
              :filters="filters"
              :title="t.dashboard.overview.top.workspace"
            />
            <DashboardTopCard
              icon="i-tabler-terminal"
              type="platform"
              :days="days"
              :filters="filters"
              :title="t.dashboard.overview.top.platform"
            />
          </div>

          <!-- 累积线性图 -->
          <CumulativeLineChart
            v-if="allDataResp.status.value === 'success' && hasData"
            :loading="false"
            :data="filtedData"
          />
          <CardBase v-else-if="allDataResp.status.value === 'pending'">
            <div>
              <div class="text-lg mb-4 flex gap-2 items-center">
                <i class="i-tabler-calendar-event" />
                <div>
                  {{ t.dashboard.overview.codetimeTrendTitle }}
                </div>
              </div>
            </div>
            <div class="rounded-2xl bg-surface-variant-1 h-64 w-full animate-pulse" />
          </CardBase>

          <!-- 语言趋势图 -->
          <CardBase
            v-if="allLanguageDataResp.status.value === 'success' && pAllLangData.length > 0"
            :loading="false"
          >
            <div>
              <div class="text-lg flex gap-2 items-center">
                <i class="i-carbon-chart-line-data" />
                <div>
                  {{ t.dashboard.overview.codetimeLanguaeTrendTitle }}
                </div>
              </div>
            </div>
            <PoltYDot
              :data="pAllLangData"
              :y-label="t.plot.label.language"
            />
          </CardBase>
          <CardBase v-else-if="allLanguageDataResp.status.value === 'pending'" :loading="true">
            <div>
              <div class="text-lg mb-4 flex gap-2 items-center">
                <i class="i-carbon-chart-line-data" />
                <div>
                  {{ t.dashboard.overview.codetimeLanguaeTrendTitle }}
                </div>
              </div>
            </div>
            <div class="rounded-2xl bg-surface-variant-1 h-64 w-full animate-pulse" />
          </CardBase>

          <!-- 项目趋势图 -->
          <CardBase
            v-if="allProjectDataResp.status.value === 'success' && pAllProjectData.length > 0"
            :loading="false"
          >
            <div>
              <div class="text-lg flex gap-2 items-center">
                <i class="i-carbon-chart-line-data" />
                <div>
                  {{ t.dashboard.overview.codetimeProjectTrendTitle }}
                </div>
              </div>
            </div>
            <PoltYDot
              :data="pAllProjectData"
              :y-label="t.plot.label.project"
            />
          </CardBase>
          <CardBase v-else-if="allProjectDataResp.status.value === 'pending'" :loading="true">
            <div>
              <div class="text-lg mb-4 flex gap-2 items-center">
                <i class="i-carbon-chart-line-data" />
                <div>
                  {{ t.dashboard.overview.codetimeProjectTrendTitle }}
                </div>
              </div>
            </div>
            <div class="rounded-2xl bg-surface-variant-1 h-64 w-full animate-pulse" />
          </CardBase>

          <!-- 每日分布图 -->
          <PoltDailyDistribution
            v-if="hasData"
            :start-time="startTime"
            :end-time="endTime"
            :segments="segments"
          />
        </template>
      </template>
    </div>

    <!-- 扩展信息区域 (仅在用户模式显示) -->
    <div v-if="showUserInfo && !userHiddenData" class="space-y-8">
      <!-- Top Languages Ranking -->
      <div>
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
    </div>
  </div>
</template>
