<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  loading?: boolean
}>()
</script>

<template>
  <div class="flex border-b border-surface-border-low bg-surface-low pt-6 transition-background-color,border-color">
    <div class="mx-auto my-8 max-w-6xl w-6xl px-7">
      <div
        v-if="loading"
        class="mb-4 h-36px w-40 animate-pulse bg-surface-on-low bg-op50 text-3xl"
      />
      <div
        v-else
        class="mb-4 text-3xl"
      >
        {{ title }}
      </div>
      <div
        v-if="loading"
        class="h-20px w-60 animate-pulse bg-surface-on bg-op50 text-sm"
      />
      <div
        v-else
        class="text-sm op75"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
