<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex border-neutral-8 border-b">
    <div class="max-w-6xl px-7 w-6xl mx-auto my-8 after:empty-content">
      <div class="text-3xl mb-4">
        {{ title }}
      </div>
      <div class="text-sm op75">
        {{ description }}
      </div>
    </div>
  </div>
</template>
