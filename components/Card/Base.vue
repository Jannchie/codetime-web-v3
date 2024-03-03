<script setup lang="ts">
import { Paper } from '@roku-ui/vue'

const props = defineProps<{
  loading?: boolean
  sparse?: boolean
  dense?: boolean
  withBorder?: boolean
  color?: 'primary' | 'secondary' | 'surface' | 'error' | 'success' | 'warning'
}>()
const cardRef = ref<HTMLElement | null>(null)
</script>

<template>
  <Paper
    ref="cardRef"
    :color="color"
    :with-border="props.withBorder"
    :loading="props.loading"
    class="relative rounded-2xl"
    :class="{
      'p-2!': props.sparse,
      'p-1!': props.dense,
    }"
  >
    <slot />
  </Paper>
</template>
