<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

defineProps<{
  options: PlotOptions
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <div class="min-w-[700px]">
      <PoltRenderer
        class="flex"
        :options="options"
        @pointerup="(e: PointerEvent, d: any) => console.log(e, d)"
      />
    </div>
  </div>
</template>
