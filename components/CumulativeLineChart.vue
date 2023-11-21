<script setup lang="ts">
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import type { PlotOptions } from '@observablehq/plot'

const props = defineProps<{
  data: MaybeRef<{
    duration: number
    date: Date
  }[]>
}>()

const t = useI18N()
const data = computed(() => unref(props.data))
const options = computed<PlotOptions>(() => ({
  x: {
    interval: 'day',
  },
  padding: 0,
  marginLeft: 8,
  marginRight: 22,
  width: 1110,
  height: 300,
  y: {
    grid: true,
    nice: true,
    axis: 'right',
    label: t.value.plot.label.timeHour,
    tickFormat: (d: number) => d3.format(',d')(d / 60 / 60 / 1000),
  },
  marks: [
    Plot.dotY(data.value, { x: 'date', y: 'duration', fill: 'var(--color-fg-2)', fillOpacity: 0.25 }),
    Plot.lineY(data.value, Plot.windowY({ k: 7, x: 'date', y: 'duration', stroke: 'var(--color-primary-1)', curve: 'natural' })),
    Plot.linearRegressionY(data.value, { x: 'date', y: 'duration', stroke: 'var(--color-error-1)' }),
  ],
}))
</script>

<template>
  <CardBase class="p-4">
    <div>
      <div class="text-lg flex items-center gap-2">
        <i class="i-tabler-calendar-event" />
        <div>
          {{ t.dashboard.overview.codetimeTrendTitle }}
        </div>
      </div>
    </div>
    <PoltChart :options="options" />
  </CardBase>
</template>
