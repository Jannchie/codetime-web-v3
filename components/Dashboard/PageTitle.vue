<script setup lang="ts">
import { useCS, useMergedCS } from '@roku-ui/vue'

defineProps<{
  title?: string
  description?: string
  loading?: boolean
}>()

const borderCS = useCS({
  type: 'border',
  color: 'surface',
  index: { dark: 7, light: 4 },
})

const containerCS = useCS({
  type: 'bg',
  color: 'surface',
  index: { dark: 9, light: 1 },
})
const cs = useMergedCS(borderCS, containerCS)
</script>

<template>
  <div
    class="flex border-b pt-6"
    v-bind="cs"
  >
    <div class="mx-auto my-8 max-w-6xl w-6xl px-7">
      <div
        v-if="loading"
        class="mb-4 h-36px w-40 animate-pulse bg-surface-variant bg-op50 text-3xl"
      />
      <div
        v-else
        class="mb-4 text-3xl"
      >
        {{ title }}
      </div>
      <div
        v-if="loading"
        class="h-20px w-60 animate-pulse bg-surface-variant bg-op50 text-sm"
      />
      <div
        v-else
        class="text-sm op75"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
