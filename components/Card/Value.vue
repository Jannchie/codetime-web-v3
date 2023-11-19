<script setup lang="ts">
defineProps<{
  title: string
  value: string
  unit: string
}>()
</script>

<template>
  <CardBase>
    <div class="text-primary-1 text-sm">
      {{ title }}
    </div>
    <div class="text-xl">
      {{ value }}
      <span class="op50 text-sm">{{ unit }}</span>
    </div>
    <div />
  </CardBase>
</template>
