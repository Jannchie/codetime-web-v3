<script setup lang="ts">
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
watchEffect(() => {
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
})
</script>

<template>
  <RHeader class="px-4 py-3">
    <NuxtImg
      alt="Code Time"
      src="/icon.svg"
      width="26"
      class="ml-2 mr-3"
    />
    <div>
      <LanguageSelect />
    </div>
  </RHeader>
  <NuxtLayout
    name="default"
  >
    <slot />
  </NuxtLayout>
  <footer class="text-center mt-32 py-4 mt-auto">
    <div class="text-sm op50">
      datreks @ {{ new Date().getFullYear() }}
    </div>
  </footer>
</template>

<style>
#__nuxt {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
