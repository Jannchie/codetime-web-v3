<script setup lang="ts">
import { RokuProvider } from '@roku-ui/vue'

const t = useI18N()
watchEffect(() => {
  useSeoMeta({
    title: t.value.meta.title,
    description: t.value.meta.description,
    ogTitle: t.value.meta.ogTitle,
    ogDescription: t.value.meta.ogDescription,
    twitterTitle: t.value.meta.twitterTitle,
    twitterDescription: t.value.meta.twitterDescription,
    ogImage: '/icon.png',
    ogUrl: 'https://codetime.dev',
    twitterImage: '/icon.png',
    twitterCard: 'summary',
  })
})
const locale = useLocale()
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
  <NuxtLayout name="default">
    <RHeader class="px-4 py-3">
      <img
        alt="Code Time"
        src="/icon.svg"
        width="26"
        class="ml-2 mr-3"
      >
      <div class="flex items-center gap-2">
        <LanguageSelect />
      </div>
    </RHeader>
    <slot />
    <CodetimeFooter />
  </NuxtLayout>
</template>

<style>
#__nuxt {
  min-height: 100vh;
}
</style>
