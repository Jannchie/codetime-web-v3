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
    class="border-surface-border-low px-2 py-1 outline-none border rounded bg-surface-base"
    @input="$emit('update:modelValue', ($event.target as any)?.value ?? '')"
  >
</template>
