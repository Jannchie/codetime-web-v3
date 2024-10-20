<script setup lang="ts">
import { Image } from '@roku-ui/vue'

const t = useI18N()
// const headerTabs = computed(() => [
//   { label: t.value.dashboard.pageHeader.title.overview, id: 'overview', path: `/dashboard` },
//   { label: t.value.dashboard.pageHeader.title.badge, id: 'badges', path: `/dashboard/badges` },
//   { label: t.value.dashboard.pageHeader.title.settings, id: 'settings', path: `/dashboard/settings` },
//   { label: t.value.dashboard.pageHeader.title.leaderboard, id: 'leaderboard', path: `/dashboard/leaderboard` },
// ])
watchEffect(() => {
  useSeoMeta({
    title: t.value.meta.title,
    description: t.value.meta.description,
    ogTitle: t.value.meta.ogTitle,
    ogDescription: t.value.meta.ogDescription,
    twitterTitle: t.value.meta.twitterTitle,
    twitterDescription: t.value.meta.twitterDescription,
    ogImage: 'https://codetime.dev/icon.png',
    ogUrl: 'https://codetime.dev',
    twitterImage: 'https://codetime.dev/icon.png',
    twitterCard: 'summary',
  })
})

const locale = useLocale()
// const currentTab = useCurrentTab(headerTabs)
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
</script>

<template>
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
              <Image
                :src="user.avatar"
                class="h-7 w-7 rounded-full"
                height="28px"
                width="28px"
              />
              <div class="hidden sm:block">
                {{ user.username }}
              </div>
              <PlanTag
                :plan="user.plan"
              />
            </NuxtLink>
            <div
              v-else-if="pending "
              class="flex items-center gap-3 text-sm"
            >
              <div
                class="bg-surface-on-low h-7 w-7 animate-pulse rounded-full bg-op50"
              />
              <div class="bg-surface-on-low h-1em w-16 animate-pulse rounded bg-op50" />
            </div>
          </div>
          <div class="hidden items-center gap-2 sm:flex">
            <i class="i-tabler-language-hiragana h-6 w-6" />
            <LanguageSelect />
          </div>
        </div>
        <div class="mt-2 flex gap-2" />
      </div>
    </RHeader>
    <div v-if="pending">
      <!-- loading -->
      <div class="m-auto h-full op75">
        <div class="m-auto mt-8 w-6xl animate-pulse md:max-w-6xl -px-6">
          <div class="mt-2 h-32 w-full rounded-2xl bg-surface-base" />
        </div>
      </div>
    </div>
    <div v-else>
      <slot />
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
