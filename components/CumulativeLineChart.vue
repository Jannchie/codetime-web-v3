<script setup lang="ts">
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'

const props = defineProps<{
  data: MaybeRef<{
    duration: number
    date: Date
  }[]>
}>()

const data = computed(() => unref(props.data).filter(d => d.date > d3.utcDay.offset(new Date(), -365)))
const options = {
  x: {
    interval: 'day',
  },
  width: 1110,
  height: 300,
  y: {
    grid: true,
    nice: true,
    axis: 'right',
    label: '时间（小时）',
    tickFormat: (d: number) => d3.format(',d')(d / 60 / 60 / 1000),
  },
  marks: [
    Plot.dotY(data.value, { x: 'date', y: 'duration', fill: '#333' }),
    Plot.lineY(data.value, Plot.windowY({ k: 7, x: 'date', y: 'duration', stroke: 'rgb(2 132 199)' })),
    Plot.linearRegressionY(data.value, { x: 'date', y: 'duration', stroke: '#c2410c', ci: 0.99 }),
  ],

}
</script>

<template>
  <CardBase class="p4">
    <div>
      <div class="text-lg flex items-center gap-2">
        <i class="i-tabler-calendar-event" />
        <div>
          编程时间趋势
        </div>
      </div>
    </div>
    <div class="flex-col overflow-y-auto">
      <div class="w-1110px">
        <PoltRenderer
          :options="options"
        />
      </div>
    </div>
  </CardBase>
</template>
