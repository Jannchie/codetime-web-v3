<script setup lang="ts">
import * as Plot from '@observablehq/plot'

const props = defineProps<{
  data: {
    date: Date
    duration: number
    by: string
  }[]
  yLabel: string
}>()
const t = useI18N()
const differentLabel = computed(() => {
  const differentLanguages = new Set<string>()
  const differentDates = new Set<string>()
  props.data.forEach((d) => {
    differentLanguages.add(d.by)
    differentDates.add(d.date.toISOString().slice(0, 10))
  })
  return { differentDates, differentLanguages }
})
const chart = ref()
const { width, height } = useElementBounding(chart)

const maxR = computed(() => {
  const v = (Math.min((width.value - 100) / differentLabel.value.differentDates.size * 1.25, height.value / differentLabel.value.differentLanguages.size) * 0.6)
  return v === 0 ? 20 : v
})

const options = computed<Plot.PlotOptions>(() => {
  return {
    className: 'y-dot-plot',
    color: {
      scheme: 'Warm',
    },
    marginRight: 24,
    y: {
      grid: true,
      ariaLabel: props.yLabel,
      label: props.yLabel,
    },
    x: {
      insetRight: maxR.value,
      insetLeft: maxR.value,
      label: t.value.plot.label.date,
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
        tip: {
          stroke: '#404040',
          channels: {
            by: {
              label: props.yLabel,
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
            r: false,
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
      Plot.axisY({
        anchor: 'right',
        ariaLabel: t.value.plot.label.language,
        tickFormat: (d: string) => getLanguageName(d),
        tickPadding: -8,
      }),
    ],
  }
})
</script>

<template>
  <PoltChart
    ref="chart"
    :options="options"
  />
</template>
