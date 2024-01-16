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
      <div class="text-sm op75">
        {{ value }}
      </div>
    </div>
  </div>
</template>
