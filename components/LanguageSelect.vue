<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const locale = computed(
  () => route.params.locale as string,
)
const currentLocale = ref(locale.value)
watchEffect(() => {
  nextTick(() => {
    router.push({
      params: { locale: currentLocale.value },
    })
  })
  useHead({
    htmlAttrs: {
      lang: currentLocale.value,
    },
  })
})
</script>

<template>
  <div class="relative">
    <RSelect
      v-model="currentLocale"
      class="w-28"
      :options="[
        { label: 'English', id: 'en' },
        { label: '中文', id: 'zh-CN' },
        { label: '日本語', id: 'ja' },
      ]"
    />
  </div>
</template>
