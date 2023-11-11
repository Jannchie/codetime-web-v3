<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const locale = computed({
  get: () => route.params.locale as string,
  set: (locale: string) => {
    router.push({
      params: { locale },
    })
    useHead({
      htmlAttrs: {
        lang: locale,
      },
    })
  },
})
</script>

<template>
  <div class="relative">
    <RSelect
      v-model="locale"
      class="w-28"
      :options="[
        { label: 'English', id: 'en' },
        { label: '中文', id: 'zh-CN' },
        { label: '日本語', id: 'ja' },
      ]"
    />
  </div>
</template>
