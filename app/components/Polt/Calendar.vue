<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  options: PlotOptions
}>()
const op = computed(() => props.options)
const calendarWrapper = ref<HTMLElement | null>(null)
watch([op], () => {
  calendarWrapper.value?.scrollTo({
    left: calendarWrapper.value.scrollWidth,
    behavior: 'smooth',
  })
}, {
  deep: true,
})
</script>

<template>
  <div
    ref="calendarWrapper"
    class="calendar-container flex justify-start overflow-x-auto"
  >
    <PoltRenderer
      :options="op"
      @pointerup="(e: PointerEvent, d: any) => console.log(e, d)"
    />
  </div>
</template>

<style scoped>
.calendar-container :deep(.plot) {
  --plot-background: transparent !important;
  background: transparent !important;
}
</style>
