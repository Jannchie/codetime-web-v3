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
    class="overflow-x-auto"
  >
    <div
      class="min-w-[700px]"
    >
      <PoltRenderer
        class="flex"
        :options="op"
        @pointerup="(e: PointerEvent, d: any) => console.log(e, d)"
      />
    </div>
  </div>
</template>
