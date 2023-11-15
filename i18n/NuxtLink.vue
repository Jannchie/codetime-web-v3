<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to">
    <slot />
  </NuxtLink>
</template>
