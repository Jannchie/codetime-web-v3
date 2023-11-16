<script setup lang="ts">
import * as d3 from 'd3'
import * as Plot from '@observablehq/plot'

defineProps<{
  data: {
    date: Date
    duration: number
    by: string
  }[]
}>()
const t = useI18N()
</script>

<template>
  <PoltChart
    :options="{
      color: {
        scheme: 'Tableau10',
      },
      y: {
        grid: true,
        nice: true,
        axis: 'right',
        label: t.plot.label.timeHour,
        tickFormat: (d: number) => d3.format(',d')(d / 60 / 60 / 1000),
      },
      width: 1110,
      height: 300,
      marks: [
        Plot.dot(data, Plot.pointer({
          x: 'date',
          y: 'duration',
          interval: 'day',
          opacity: 0.5,
          fill: 'by',
          marker: 'circle',
          r: 8,
          tip: {
            stroke: '#404040',
            channels: {
              by: {
                label: t.plot.label.language,
                value: d => getLanguageName(d.by),
              },
              duration: {
                label: t.plot.label.duration,
                value: d => getDurationString(d.duration),
              },
              date: {
                label: t.plot.label.date,
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
        Plot.line(data, {
          x: 'date',
          y: 'duration',
          stroke: 'by',
          marker: 'circle',
          curve: 'catmull-rom-open',
        }),
      ],
    }"
  />
</template>
