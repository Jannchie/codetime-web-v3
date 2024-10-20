<script setup lang="ts">
import { Paper } from '@roku-ui/vue'

defineProps<{
  loading?: boolean
  withBorder?: boolean
  color?: 'primary' | 'secondary' | 'surface' | 'error' | 'success' | 'warning'
}>()
</script>

<template>
  <Paper
    :color="color"
    :with-border="true"
    :loading="loading"
    rounded="lg"
  >
    <slot />
  </Paper>
</template>
