<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'

const user = await fetchUser()
provide('user', user)
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
  background: var(--plot-background) !important;
}
.y-dot-plot {
  --plot-background: rgb(23 23 23);
  background: var(--plot-background) !important;
}

.y-grid {
  stroke-dasharray: 2 2;
}

[aria-label="tip"] {
  background: var(--plot-background) !important;
  border: 1px solid var(--plot-background) !important;
  fill: var(--plot-background) !important;
}

marker {
  stroke: var(--plot-background)!important;
}
.y-dot-plot [aria-label="y-axis tick label"] > text {
  stroke: var(--plot-background);
  -webkit-font-smoothing: antialiased;
  font-family: 'Inter', sans-serif;
  text-anchor: end !important;
  text-transform: capitalize;
  stroke-linecap: round;
  stroke-linejoin: round;
  paint-order: stroke;
  stroke-width: 6px;
}
</style>
