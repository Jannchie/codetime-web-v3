<script setup lang="ts">
defineProps<{
  notYet?: boolean
}>()
const target = ref<HTMLElement | null>(null)
const targetIsVisible = useElementVisibility(target)
</script>

<template>
  <div
    ref="target"
    class="flex items-center gap-2"
  >
    <i
      v-show="targetIsVisible"
      class="h-4 w-4"
      :class="{
        'i-line-md-confirm-circle-twotone': !notYet,
        'i-line-md-loading-twotone-loop': notYet,
      }"
    />
    <slot />
  </div>
</template>
