<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()

const op = computed(() => props.options)
const chartWrapper = ref<HTMLElement | null>(null)
const { width } = useElementBounding(chartWrapper)
const basicHeight = op.value.height ?? 400
watchEffect(() => {
  if (chartWrapper.value) {
    op.value.width = width.value
    if (op.value.width * 0.7 < basicHeight) {
      op.value.height = op.value.width * 0.7
    }
    else {
      op.value.height = basicHeight
    }
  }
})
</script>

<template>
  <div
    ref="chartWrapper"
    class="flex-col overflow-y-auto"
  >
    <PoltRenderer
      :options="options"
    />
  </div>
</template>
