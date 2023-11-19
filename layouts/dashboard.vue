<script setup lang="ts">
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
const user = await fetchUser()
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
  <ThemeProvider class="min-h-100vh flex-col flex">
    <NuxtLayout name="default">
      <!-- Notification -->
      <div
        v-if="false"
        class="h-84px min-w-full sm:min-w-sm absolute right-0 p-2 z-1"
      >
        <CardBase>
          <div class="flex flex-col gap-1">
            <div class="text-primary-1 font-black flex items-center gap-1.5">
              <i
                class="w-5 h-5 text-primary-1 i-mdi:alert-circle-outline"
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
        <div class="flex flex-col gap-2 pt-2 px-2 w-full">
          <div
            class="flex items-center justify-between h-34px"
          >
            <div class="flex gap-2 items-center">
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
                class="flex gap-3 text-sm items-center"
                :to="`/${locale}/dashboard`"
              >
                <NuxtImg
                  v-if="user && user.avatar"
                  :src="user.avatar"
                  class="rounded-full w-5 h-5"
                />
                {{ user.username }}
              </NuxtLink>
            </div>
            <div class="flex items-center gap-2">
              <ClientOnly>
                <i class="i-tabler-language-hiragana w-5 h-5" />
                <LanguageSelect />
              </ClientOnly>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <div
              v-for="tab in headerTabs"
              :key="tab.id"
            >
              <NuxtLink
                :to="`/${locale}${tab.path}`"
                class="px-3 py-2 hover:bg-back-1 rounded op50 hover:op75 text-sm"
              >
                {{ tab.label }}
              </NuxtLink>
              <div class="min-h-0.5 mt-2">
                <div
                  v-if="tab === currentTab"
                >
                  <div class="h-0.5 bg-primary-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RHeader>
      <slot v-if="user" />
      <div
        v-else
        class="flex flex-col items-center justify-center h-full op75"
      >
        <div class="mb-8">
          <NuxtImg
            alt="Code Time"
            src="/icon.svg"
            width="64"
          />
        </div>
        <span class="text-sm pb-6 max-w-2xl text-center">
          {{ t.dashboard.loginRequired }}
        </span>
        <LoginButton />
      </div>
      <CodetimeFooter />
    </NuxtLayout>
  </ThemeProvider>
</template>

<style scoped>
.header-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 1.2rem;
}
</style>
