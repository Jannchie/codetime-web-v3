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
    class="border-b flex gap-2 items-center justify-between relative"
  >
    <slot />
  </header>
</template>
