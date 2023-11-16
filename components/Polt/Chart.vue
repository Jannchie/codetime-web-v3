<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()

const options = ref(props.options)
watchEffect(() => {
  options.value = props.options
})
const chartWrapper = ref<HTMLElement | null>(null)
const { width } = useElementBounding(chartWrapper)
const basicHeight = options.value.height ?? 400
watchEffect(() => {
  if (chartWrapper.value) {
    options.value.width = width.value
    if (options.value.width * 0.7 < basicHeight) {
      options.value.height = options.value.width * 0.7
    }
    else {
      options.value.height = basicHeight
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
