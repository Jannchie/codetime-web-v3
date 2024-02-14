<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
}>()
</script>

<template>
  <div class="p-2">
    <div>
      <div class="text-base text-primary-on">
        {{ title }}
      </div>
      <div
        v-if="value !== ''"
        class="text-nowrap text-sm text-surface-on"
      >
        {{ value }}
      </div>
      <div
        v-else
        class="text-sm text-surface-on"
      >
        -
      </div>
    </div>
  </div>
</template>
