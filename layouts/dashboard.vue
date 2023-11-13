<script setup lang="ts">
const headerTabs = ref([
  { label: 'Overview', id: 'overview', path: `/dashboard` },
  { label: 'Shield', id: 'shield', path: `/dashboard/shield` },
  { label: 'Settings', id: 'settings', path: `/dashboard/settings` },
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
const route = useRoute()
const locale = computed(() => {
  return route.params.locale as string
})

const currentPath = computed(() => {
  return route.path
})
const currentTab = computed(() => {
  const normalizedCurrentPath = currentPath.value.replace(/\/$/, '')
  const ctab = headerTabs.value.find((tab) => {
    return `/${locale.value}${tab.path}` === normalizedCurrentPath
  })
  return ctab
})
const user = await fetchUser()
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
    <div class="h-84px min-w-full sm:min-w-sm absolute right-0 p-2 z-1">
      <!-- TODO: Notification -->
      <CardBase v-if="false">
        <div class="flex flex-col gap-1">
          <div class="text-sky-6 font-black flex items-center gap-1.5">
            <i
              class="w-5 h-5 text-sky-6 i-mdi:alert-circle-outline"
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
      <div class="flex flex-col gap-2 pt-2 px-2">
        <div
          class="flex gap-2 items-center"
        >
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
              :src="user.avatar"
              class="rounded-full w-5 h-5"
            />
            {{ user.username }}
          </NuxtLink>
        </div>
        <div class="flex gap-2">
          <div
            v-for="tab in headerTabs"
            :key="tab.id"
          >
            <NuxtLink
              :to="`/${locale}${tab.path}`"
              class="px-3 py-2 hover:bg-neutral-7 rounded transition-all op50 hover:op75 text-sm"
            >
              {{ tab.label }}
            </NuxtLink>
            <div class="min-h-0.5 mt-2">
              <div
                v-if="tab === currentTab"
              >
                <div class="h-0.5 bg-sky-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RHeader>
    <slot />
  </NuxtLayout>
</template>

<style scoped>
.header-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 1.2rem;
}
</style>
