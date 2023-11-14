<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()
const options = reactive(props.options)
const chartWrapper = ref<HTMLElement | null>(null)
const { width } = useElementBounding(chartWrapper)
const basicHeight = options.height ?? 400
watchEffect(() => {
  if (chartWrapper.value) {
    options.width = width.value
    if (options.width * 0.7 < basicHeight) {
      options.height = options.width * 0.7
    }
    else {
      options.height = basicHeight
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
