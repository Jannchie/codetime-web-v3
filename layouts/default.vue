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
</style>
