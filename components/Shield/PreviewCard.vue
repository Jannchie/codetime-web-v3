<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <CardBase class="p-6">
    <div class="text-xl mb-4">
      {{ t.dashboard.shield.preview.title }}
    </div>
    <div class="flex items-center justify-center h-32">
      <NuxtImg
        placeholder
        :src="link"
        class="h-8"
        alt="CodeTime Badge"
      />
    </div>
  </CardBase>
</template>
