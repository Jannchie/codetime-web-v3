<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()

const chartWrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementBounding(chartWrapper)
const op = computed(() => {
  return {
    width: width.value,
    height: height.value,
    ...props.options,
  }
})
</script>

<template>
  <div
    ref="chartWrapper"
    data-allow-mismatch
    class="flex-col h-full w-full overflow-y-auto"
  >
    <PoltRenderer
      :options="op"
    />
  </div>
</template>
