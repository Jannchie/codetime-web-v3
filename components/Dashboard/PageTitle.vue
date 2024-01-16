<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex border-b border-surface-border-low">
    <div class="after:empty-content mx-auto my-8 max-w-6xl w-6xl px-7">
      <div class="mb-4 text-3xl">
        {{ title }}
      </div>
      <div class="text-sm op75">
        {{ description }}
      </div>
    </div>
  </div>
</template>
