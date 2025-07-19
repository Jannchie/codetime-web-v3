<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink
    v-bind="$attrs"
    :to="to"
  >
    <slot />
  </NuxtLink>
</template>
