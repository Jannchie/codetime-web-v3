<script setup lang="ts">
defineProps<{
  title: string
  value: string
  unit: string
}>()
</script>

<template>
  <CardBase>
    <div class="text-sm text-primary-container">
      {{ title }}
    </div>
    <div class="text-xl">
      {{ value }}
      <span class="text-sm op50">{{ unit }}</span>
    </div>
    <div />
  </CardBase>
</template>
