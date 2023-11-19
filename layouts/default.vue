<script setup lang="ts">
import '@unocss/reset/tailwind-compat.css'


const user = await fetchUser()
provide('user', user)

</script>

<template>
  <NuxtLoadingIndicator
    color="var(--color-primary-1)"
    :height="1"
  />
    <slot />
</template>

<style>
:root {
  color-scheme: light dark;
  background-color: var(--color-background);
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
  --plot-background: var(--color-bg-3);
  background: var(--plot-background) !important;
}
.y-dot-plot {
  --plot-background: var(--color-bg-3);
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

@media (prefers-color-scheme: dark) {
  :root {
    --color-frontground: #eee; --color-background: #111; --color-primary-1: #0284c7; --color-primary-2: #075985; --color-primary-3: #0c4a6e; --color-bg-1: #404040; --color-bg-2: #262626; --color-bg-3: #171717; --color-border-1: #404040; --color-border-2: #262626; --color-border-3: #171717; --color-error-1: #ef4444; --color-error-2: #b91c1c; --color-error-3: #7f1d1d; --color-success-1: #10b981; --color-success-2: #047857; --color-success-3: #064e3b; --color-warning-1: #f59e0b; --color-warning-2: #b45309; --color-warning-3: #78350f;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --color-frontground: #111; --color-background: #eee; --color-primary-1: #0284c7; --color-primary-2: #0284c7; --color-primary-3: #0284c7; --color-bg-1: #ffffff; --color-bg-2: #fefefe; --color-bg-3: #fcfcfc; --color-border-1: #d4d4d4; --color-border-2: #a3a3a3; --color-border-3: #a3a3a3; --color-error-1: #dc2626; --color-error-2: #dc2626; --color-error-3: #dc2626; --color-success-1: #059669; --color-success-2: #059669; --color-success-3: #059669; --color-warning-1: #d97706; --color-warning-2: #d97706; --color-warning-3: #d97706;
  }
}
</style>
