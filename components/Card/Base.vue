<script setup lang="ts">
import { Paper } from '@roku-ui/vue'

const props = defineProps<{
  loading?: boolean
  sparse?: boolean
  dense?: boolean
  withBorder?: boolean
  noPadding?: boolean
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
      'p-6!': props.sparse && !props.noPadding,
      'p-1!': props.dense && !props.noPadding,
      'p-4!': !props.sparse && !props.dense && !props.noPadding,
    }"
  >
    <slot />
  </Paper>
</template>
