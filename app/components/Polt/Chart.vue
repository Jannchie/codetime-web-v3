<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()

const chartWrapper = ref<HTMLElement | null>(null)
const { width, height } = useElementBounding(chartWrapper)
const op = computed(() => {
  const w = width.value || 800
  const h = height.value || 300
  return {
    width: w,
    height: h,
    ...props.options,
  }
})
</script>

<template>
  <div
    ref="chartWrapper"
    data-allow-mismatch
    class="polt-chart-wrapper w-full"
  >
    <PoltRenderer
      :options="op"
    />
  </div>
</template>

<style scoped>
/* Charts that size themselves from the container need a floor to measure
   against. Ones that declare their own `options.height` can lower or drop it
   by setting --polt-chart-min-h on any ancestor — no :deep() into this class. */
.polt-chart-wrapper {
  min-height: var(--polt-chart-min-h, 300px);
}
</style>
