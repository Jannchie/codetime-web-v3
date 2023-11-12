<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'

provide('user', await fetchUser())
</script>

<template>
  <slot />
</template>

<style>
:root  {
  color-scheme: light dark;
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
</style>
