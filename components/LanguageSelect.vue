<script setup>
// const defaultLang = useNavigatorLanguage()
// console.log(defaultLang.language.value)
const lang = ref('zh')
</script>

<template>
  <div class="relative">
    <RSelect
      v-model="lang"
      class="w-28"
      :options="[
        { label: 'English', id: 'en' },
        { label: '中文', id: 'zh' },
        { label: '日本語', id: 'ja' },
      ]"
    />
  </div>
</template>
