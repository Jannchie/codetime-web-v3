<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  onChange?: (value: string) => void
}>()

defineEmits(['change', 'update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    class="border border-surface-border-low rounded bg-surface-base px-2 py-1 outline-none"
    @input="$emit('update:modelValue', ($event.target as any)?.value ?? '')"
  >
</template>
