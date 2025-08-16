<script setup lang="ts">
definePageMeta({
  middleware: ['i18n'],
})

const route = useRoute()

const uid = computed(() => {
  return Number(route.params.uid)
})
</script>

<template>
  <NuxtLayout name="user">
    <UnifiedUserDashboard
      :user-id="uid"
      :show-user-info="true"
      :show-controls="false"
      layout="user"
    />
  </NuxtLayout>
</template>
