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
    class="py-1 px-2 rounded border border-neutral-7 bg-neutral-8 outline-none"
    @input="$emit('update:modelValue', ($event.target as any)?.value ?? '')"
  >
</template>
