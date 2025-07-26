<script setup lang="ts">
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
      <div class="flex gap-2 items-center">
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
