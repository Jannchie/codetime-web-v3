<script setup lang="ts">
import { useCS } from '@roku-ui/vue'

const borderCS = useCS({
  type: 'border',
  color: 'surface',
  index: { dark: 7, light: 4 },
})
</script>

<template>
  <header
    v-bind="borderCS"
    class="relative flex items-center justify-between gap-2 border-b"
  >
    <slot />
  </header>
</template>
