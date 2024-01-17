<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
}>()
</script>

<template>
  <div class="p-2">
    <div>
      <div class="text-base text-primary-container">
        {{ title }}
      </div>
      <div
        v-if="value !== ''"
        class="text-sm text-surface-onlow"
      >
        {{ value }}
      </div>
      <div
        v-else
        class="bg-text-surface-onlow my-[2px] h-16px w-20 animate-pulse bg-surface-onlow/50 text-sm"
      />
    </div>
  </div>
</template>
