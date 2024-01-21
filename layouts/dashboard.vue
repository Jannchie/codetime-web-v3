<script setup lang="ts">
import { RokuProvider } from '@roku-ui/vue'

const t = useI18N()
const headerTabs = ref([
  { label: t.value.dashboard.pageHeader.title.overview, id: 'overview', path: `/dashboard` },
  { label: t.value.dashboard.pageHeader.title.badge, id: 'badges', path: `/dashboard/badges` },
  { label: t.value.dashboard.pageHeader.title.settings, id: 'settings', path: `/dashboard/settings` },
  { label: t.value.dashboard.pageHeader.title.leaderboard, id: 'leaderboard', path: `/dashboard/leaderboard` },
])
useSeoMeta({
  title: 'CodeTime - 追迹你的编程时间',
  description: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  ogTitle: 'CodeTime - 追迹你的编程时间',
  ogDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  ogImage: '/icon.png',
  ogUrl: 'https://codetime.dev',
  twitterTitle: 'CodeTime - 追迹你的编程时间',
  twitterDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  twitterImage: '/icon.png',
  twitterCard: 'summary',
})
const locale = useLocale()
const currentTab = useCurrentTab(headerTabs)
const { data: user, pending, error } = await fetchUser()
provide('user', user)
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
</script>

<template>
  <RokuProvider class="min-h-100vh flex flex-col">
    <NuxtLayout name="default">
      <RHeader class="bg-surface-low px-2 pt-2">
        <div class="w-full flex flex-col gap-2 px-2 pt-2">
          <div
            class="h-34px flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/${locale}`"
              >
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
                <NuxtImg
                  :src="user.avatar"
                  class="h-7 w-7 rounded-full"
                />
                <div>
                  {{ user.username }}
                </div>
              </NuxtLink>
              <div
                v-else-if="pending && !error"
                class="flex items-center gap-3 text-sm"
              >
                <div
                  class="h-7 w-7 animate-pulse rounded-full bg-surface-onlow bg-op50"
                />
                <div class="h-1em w-16 animate-pulse rounded bg-surface-onlow bg-op50" />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <i class="i-tabler-language-hiragana h-6 w-6" />
              <LanguageSelect />
            </div>
          </div>
          <div class="mt-2 flex gap-2">
            <div
              v-for="tab in headerTabs"
              :key="tab.id"
            >
              <NuxtLink
                :to="`/${locale}${tab.path}`"
                class="rounded px-3 py-2 text-sm hover:bg-surface-base"
              >
                {{ tab.label }}
              </NuxtLink>
              <div class="mt-2 min-h-0.5">
                <div
                  v-if="tab === currentTab"
                >
                  <div class="h-0.5 bg-primary-container" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RHeader>
      <div v-if="pending && !error">
        <!-- loading -->
        <div class="m-auto h-full op75">
          <DashboardPageTitle loading />
          <div class="m-auto mt-8 w-6xl animate-pulse md:max-w-6xl -px-6">
            <div class="mt-2 h-32 w-full rounded-2xl bg-surface-base" />
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
  </RokuProvider>
</template>

<style scoped>
.header-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 1.2rem;
}
</style>
