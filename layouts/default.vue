<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'

provide('user', await fetchUser())
</script>

<template>
  <NuxtLoadingIndicator
    color="#fff"
    :height="1"
  />
  <slot />
</template>

<style>
:root {
  color-scheme: light dark;
}

input[type="password"] {
  font-family: "system-ui", "Segoe UI", sans-serif;
}

[lang="ja"]  {
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
}

[lang="zh-CN"] {
  font-family: 'Noto Sans SC', 'Inter', sans-serif;
}

.plot {
  --plot-background: rgb(23 23 23);
  background: rgb(23 23 23) !important;
}

.y-grid {
  stroke-dasharray: 2 2;
}

[aria-label="tip"] {
  --plot-background: rgb(23 23 23);
  background: rgb(23 23 23) !important;
  border: 1px solid rgb(23 23 23) !important;
  fill: rgb(23 23 23) !important;
}

marker {
  stroke: rgb(23 23 23) !important;
}
</style>
