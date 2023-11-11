<script setup>
// const defaultLang = useNavigatorLanguage()
// console.log(defaultLang.language.value)
const locale = useRoute('locale').params.locale
const currentLocale = ref(locale)
const router = useRouter()
watch(currentLocale, (value) => {
  router.push(`/${value}/`)
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
