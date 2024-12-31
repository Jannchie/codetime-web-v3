<script setup lang="ts">
definePageMeta({
  middleware: ['i18n'],
})
const route = useRoute()
const uid = computed(() => route.params.uid)
</script>

<template>
  <NuxtLayout name="user">
    {{
      uid
    }}
    <h1>user</h1>
  </NuxtLayout>
</template>
