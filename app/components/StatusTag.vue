<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>

<template>
  <div
    class="border-gray-5 rounded-full bg-gray-5/20 px-3 py-0.5 text-xs text-gray-5 font-mono uppercase"
  >
    {{ status }}
  </div>
</template>
