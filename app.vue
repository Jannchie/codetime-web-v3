<script setup lang="ts">
const { data: user } = await fetchUser()
provide('user', user)
useHead({
  script: [{ children: '!function() {var e = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; t = localStorage.getItem("scheme") || "auto";("dark" === t || e && "light" !== t) ? document.documentElement.setAttribute("data-scheme", "dark") : document.documentElement.setAttribute("data-scheme", "light")}()' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
