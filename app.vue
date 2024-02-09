<script setup lang="ts">
const { data: user } = await fetchUser()
provide('user', user)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
