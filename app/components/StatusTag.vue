<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>

<template>
  <div
    class="bg-gray-5/20 border-gray-5 text-gray-5 text-xs font-mono px-3 py-0.5 rounded-full uppercase"
  >
    {{ status }}
  </div>
</template>
