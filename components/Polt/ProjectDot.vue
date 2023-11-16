<script setup lang="ts">
import * as d3 from 'd3'
import * as Plot from '@observablehq/plot'

const props = defineProps<{
  data: {
    date: Date
    duration: number
    by: string
  }[]
}>()
const t = useI18N()
const differentLanguages = new Set<string>()
const differentDates = new Set<string>()
props.data.forEach((d) => {
  differentLanguages.add(d.by)
  differentDates.add(d.date.toISOString().slice(0, 10))
})
const chart = ref()
const { width, height } = useElementBounding(chart)

const maxR = computed(() => {
  const v = (Math.min((width.value - 100) / differentDates.size * 1.25, height.value / differentLanguages.size) * 0.6)
  return v === 0 ? 20 : v
})
const options = computed<Plot.PlotOptions>(() => ({
  marginRight: 80,
  color: {
    scheme: 'Warm',
  },
  y: {
    label: t.value.plot.label.language,
    grid: true,
    axis: 'right',
    ariaLabel: t.value.plot.label.language,
    tickFormat: (d: string) => getLanguageName(d),
    paddingOuter: 0.2,
  },
  x: {
    insetRight: maxR.value,
    label: t.value.plot.label.date,
    paddingOuter: 0.2,
  },
  width: 1110,
  height: 300,
  r: { range: [0, maxR.value] },
  marks: [
    Plot.dot(props.data, Plot.pointer({
      x: 'date',
      y: 'by',
      r: 'duration',
      fill: 'duration',
      fillOpacity: 0.25,
      marginRight: 80,
      tip: {
        stroke: '#404040',
        channels: {
          by: {
            label: t.value.plot.label.language,
            value: d => getLanguageName(d.by),
          },
          duration: {
            label: t.value.plot.label.duration,
            value: d => getDurationString(d.duration),
          },
          date: {
            label: t.value.plot.label.date,
            value: d => d.date.toISOString().slice(0, 10),
          },
        },
        format: {
          fill: false,
          x: false,
          y: false,
        },
      },
    })),
    Plot.dot(props.data, {
      x: 'date',
      y: 'by',
      r: 'duration',
      fill: 'duration',
      fillOpacity: 0.25,
      stroke: 'duration',
    }),
  ],
}))
</script>

<template>
  <PoltChart
    ref="chart"
    :options="options"
  />
</template>
