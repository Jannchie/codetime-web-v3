<script setup lang="ts">
import { localeMap } from '@/utils/format'
import { Image, useContainerFilledCS, useCS } from '@roku-ui/vue'
import { formatDistanceToNow } from 'date-fns'
import VSCodeIcon from '~/components/VSCodeIcon.vue'

const t = useI18N()
const headerTabs = computed(() => [
  { label: t.value.dashboard.pageHeader.title.overview, id: 'overview', path: `/dashboard` },
  { label: t.value.dashboard.pageHeader.title.badge, id: 'badges', path: `/dashboard/badges` },
  { label: t.value.dashboard.pageHeader.title.workspace, id: 'workspace', path: `/dashboard/workspace` },
  { label: t.value.dashboard.pageHeader.title.leaderboard, id: 'leaderboard', path: `/dashboard/leaderboard` },
  { label: t.value.dashboard.pageHeader.title.settings, id: 'settings', path: `/dashboard/settings` },
])

const locale = useLocale()
const currentTab = useCurrentTab(headerTabs)
const user = useUser()

const pending = autoResetRef(false, 1000)
pending.value = true

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icon.png',
    },
  ],
})
const containerCS = useCS({
  type: 'bg',
  color: 'surface',
  index: { dark: 9, light: 1 },
})
const hoverCS = useCS({
  type: 'hover:bg',
  color: 'surface',
  index: { dark: 7, light: 3 },
})
const fillCS = useContainerFilledCS('primary')

interface EventLog {
  id: number
  uid: number
  eventTime: number
  language: string
  project: string
  relativeFile: string
  absoluteFile: string
  editor: string
  platform: string
  gitOrigin: string
  gitBranch: string
  DeletedAt: string | null
}

async function fetchLatestStats() {
  return await useAPIFetch<EventLog | null>(`/stats/latest`, { })
}

const resp = await fetchLatestStats()

// 如果日期是 12月 20日到 1月 15 日之间，则是年度报告展示周期
const showAnnualReport = computed(() => {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()
  return (month === 11 && day >= 20) || (month === 0 && day <= 15)
})
</script>

<template>
  <NuxtLayout name="default">
    <RHeader
      class="px-2 pt-2"
      v-bind="containerCS"
    >
      <div class="w-full flex flex-col gap-4 px-2 pt-2">
        <div class="h-34px flex items-center justify-between">
          <ClientOnly>
            <div class="flex items-center gap-2">
              <NuxtLink :to="`/${locale}`">
                <NuxtImg
                  alt="Code Time"
                  src="/icon.svg"
                  width="26"
                  class="ml-2 mr-3"
                />
              </NuxtLink>
              <NuxtLink
                v-if="user"
                class="flex items-center gap-3 text-sm"
                :to="`/${locale}/dashboard`"
              >
                <Image
                  :src="user.avatar"
                  class="h-7 w-7 rounded-full"
                  height="28px"
                  width="28px"
                />
                <div class="hidden sm:block">
                  {{ user.username }}
                </div>
                <PlanTag :plan="user.plan" />
              </NuxtLink>
              <div
                v-else-if="pending"
                class="flex items-center gap-3 text-sm"
              >
                <div class="h-7 w-7 animate-pulse rounded-full bg-op50" />
                <div class="h-1em w-16 animate-pulse rounded bg-op50" />
              </div>

              <NuxtLink
                v-if="user && showAnnualReport"
                :to="`/${locale}/user/${user.id}/annual-report`"
              >
                Annual Report
              </NuxtLink>

              <div v-if="resp.status.value === 'pending'">
                <div class="h-4 w-20 animate-pulse rounded-full bg-white bg-op50" />
              </div>
              <div
                v-else-if="resp.data.value"
                class="flex items-center gap-2 text-xs"
              >
                <div class="relative">
                  <div class="h-3 w-3 animate-ping rounded-full bg-primary" />
                  <div class="absolute left-0 top-0 h-3 w-3 rounded-full bg-primary" />
                </div>
                <VSCodeIcon
                  :language="resp.data.value.language"
                  class="h-4 w-4"
                />
                <span class="truncate">
                  {{ t.dashboard.pageHeader.userLatestEvent(resp.data.value.project) }}
                </span>
              </div>
            </div>
          </ClientOnly>

          <div class="hidden items-center gap-2 sm:flex">
            <i class="i-tabler-language-hiragana h-6 w-6" />
            <LanguageSelect />
          </div>
        </div>
        <div class="flex gap-2">
          <div
            v-for="tab in headerTabs"
            :key="tab.id"
          >
            <NuxtLink
              :to="`/${locale}${tab.path}`"
              v-bind="hoverCS"
              class="rounded px-3 py-2 text-sm"
            >
              {{ tab.label }}
            </NuxtLink>

            <div class="mt-2 min-h-0.5">
              <div v-if="tab === currentTab">
                <div
                  v-bind="fillCS"
                  class="h-0.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RHeader>
    <div v-if="pending">
      <!-- loading -->
      <div class="m-auto h-full op75">
        <DashboardPageTitle loading />
        <div class="m-auto mt-8 w-6xl animate-pulse md:max-w-6xl -px-6">
          <div class="mt-2 h-32 w-full rounded-2xl bg-surface-variant-1" />
        </div>
      </div>
    </div>
    <div v-else>
      <slot v-if="user" />
      <div
        v-else
        class="h-full flex flex-col items-center justify-center py-16 op75"
      >
        <div class="mb-8">
          <NuxtImg
            alt="Code Time"
            src="/icon.svg"
            width="64"
          />
        </div>
        <span class="max-w-2xl pb-6 text-center text-sm">
          {{ t.dashboard.loginRequired }}
        </span>
        <LoginButton />
      </div>
    </div>
    <CodetimeFooter />
  </NuxtLayout>
</template>

<style scoped>
.header-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 1.2rem;
}
</style>
