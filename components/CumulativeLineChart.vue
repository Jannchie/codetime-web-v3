<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'

const props = defineProps<{
  data: MaybeRef<{
    duration: number
    date: Date
  }[]>
  loading: boolean
}>()

const t = useI18N()
const data = computed(() => unref(props.data))
const chart = ref()
const { width, height } = useElementBounding(chart)
const options = computed<PlotOptions>(() => ({
  w: width.value,
  h: height.value,
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
  <CardBase :loading="loading">
    <div>
      <div class="flex items-center gap-2 text-lg">
        <i class="i-tabler-calendar-event" />
        <div>
          {{ t.dashboard.overview.codetimeTrendTitle }}
        </div>
      </div>
    </div>
    <PoltChart
      ref="chart"
      :options="options"
    />
  </CardBase>
</template>
