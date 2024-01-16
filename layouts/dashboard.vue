<script setup lang="ts">
import { RokuProvider } from '@roku-ui/vue'

initTheme()
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
const { data: user, pending } = await fetchUser()
provide('user', user)
useHead({
  htmlAttrs: {
    'lang': locale.value,
    'data-scheme': 'dark',
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
      <!-- Notification -->
      <div
        v-if="false"
        class="absolute right-0 z-1 h-84px min-w-full p-2 sm:min-w-sm"
      >
        <CardBase>
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1.5 text-primary-container font-black">
              <i
                class="i-mdi:alert-circle-outline h-5 w-5 text-primary-container"
              />
              title
            </div>
            <div class="text-sm">
              desc
            </div>
          </div>
        </CardBase>
      </div>
      <RHeader class="px-2 pt-2">
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
                  class="h-5 w-5 rounded-full"
                />
                {{ user.username }}
              </NuxtLink>
            </div>
            <div class="flex items-center gap-2">
              <ClientOnly>
                <i class="i-tabler-language-hiragana h-5 w-5" />
                <LanguageSelect />
              </ClientOnly>
            </div>
          </div>
          <div class="mt-2 flex gap-2">
            <div
              v-for="tab in headerTabs"
              :key="tab.id"
            >
              <NuxtLink
                :to="`/${locale}${tab.path}`"
                class="rounded px-3 py-2 text-sm op50 hover:bg-surface-low hover:op75"
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
      <div v-if="pending">
        <!-- loading -->
        <div class="h-full flex flex-col items-center justify-center op75">
          <!-- <div class="mb-8">
            <NuxtImg
              alt="Code Time"
              src="/icon.svg"
              width="64"
            />
          </div> -->
          <div class="animate-pulse">
            <div class="mt-2 h-4 w-32 rounded bg-surface-base" />
            <div class="mt-2 h-4 w-32 rounded bg-surface-base" />
            <div class="mt-2 h-32 w-60vw rounded bg-surface-base" />
          </div>
        </div>
      </div>
      <div v-else>
        <slot v-if="user" />
        <div
          v-else
          class="h-full flex flex-col items-center justify-center op75"
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
