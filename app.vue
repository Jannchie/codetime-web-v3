<script setup lang="ts">
const { data: user, pending } = await fetchUser()
provide('user', user)
provide('user-pending', pending)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
