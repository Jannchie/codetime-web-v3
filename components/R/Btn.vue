<script setup lang="ts">
import { Btn } from '@roku-ui/vue'

withDefaults(defineProps<{
  color?: 'error' | 'primary'
}>(), {
  color: 'primary',
})
</script>

<template>
  <Btn
    :color="color"
    hover-variant="filled"
  >
    <slot />
  </Btn>
</template>
