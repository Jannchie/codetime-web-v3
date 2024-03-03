<script setup lang="ts">
defineProps<{
  title: string
  value: string
  unit: string
}>()
</script>

<template>
  <CardBase>
    <div class="text-sm text-primary-on">
      {{ title }}
    </div>
    <div class="text-xl">
      {{ value }}
      <span class="text-surface-onlow text-sm">{{ unit }}</span>
    </div>
    <div />
  </CardBase>
</template>
