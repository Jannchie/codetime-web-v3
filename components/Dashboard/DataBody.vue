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
        class="text-nowrap text-sm text-surface-onlow"
      >
        {{ value }}
      </div>
      <div
        v-else
        class="text-sm text-surface-onlow"
      >
        -
      </div>
    </div>
  </div>
</template>
