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

<style>
[lang="ja"] *:not(.font-mono) {
  font-family: 'HarmonyOS Sans JP', 'Yu Gothic UI', 'Segoe UI', 'Inter', system-ui, sans-serif;
}
[lang="zh-CN"] *:not(.font-mono) {
  font-family: 'HarmonyOS Sans SC', 'Microsoft YaHei UI', 'Segoe UI', 'Inter', system-ui, sans-serif;
}

*:not(.font-mono) {
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}
</style>
