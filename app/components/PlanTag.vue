<script setup lang="ts">
defineProps<{
  plan: string
}>()
</script>

<template>
  <div
    v-if="plan === 'pro'"
    class="border-purple-5 rounded-full bg-sky-5/20 px-3 py-0.5 text-xs text-purple-5 font-mono uppercase"
  >
    {{ plan }}
  </div>
  <div
    v-else
    class="border-gray-5 rounded-full bg-gray-5/20 px-3 py-0.5 text-xs text-gray-5 font-mono uppercase"
  >
    {{ plan }}
  </div>
</template>
