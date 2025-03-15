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
  const dateCount = differentLabel.value.differentDates.size
  const languageCount = differentLabel.value.differentLanguages.size
  const widthFactor = (width.value - 100) / dateCount * 1.25
  const heightFactor = height.value / languageCount
  const calculatedValue = Math.min(widthFactor, heightFactor) * 0.5
  return calculatedValue > 0 ? calculatedValue : 20
})

const options = computed<Plot.PlotOptions>(() => {
  const o: Plot.PlotOptions = {
    className: 'y-dot-plot',
    color: {
      scheme: 'Warm',
    },
    marginRight: 24,
    y: {
      grid: true,
      ariaLabel: props.yLabel,
      label: props.yLabel,
      axis: false,
    },
    x: {
      tickSize: 4,
      insetRight: maxR.value,
      insetLeft: maxR.value,
      label: t.value.plot.label.date,
    },
    width: 1110,
    height: 300,
    r: { range: [0, maxR.value] },
    marks: [
      Plot.dot(
        props.data,
        Plot.pointer({
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
        }),
      ),
      Plot.dot(
        props.data,
        {
          x: 'date',
          y: 'by',
          r: 'duration',
          fill: 'duration',
          fillOpacity: 0.25,
          stroke: 'duration',
        },
      ),
      Plot.axisY({
        anchor: 'right',
        textAnchor: 'end',
        textStroke: 'var(--r-surface-background-color)',
        textStrokeWidth: 4,
        ariaLabel: t.value.plot.label.language,
        tickFormat: (d: string) => getLanguageName(d),
        tickPadding: -8,
        tickSize: 4,
      }),
    ],
  }
  return o
})
</script>

<template>
  <PoltChart
    ref="chart"
    :options="options"
  />
</template>

<style lang="css">
.y-dot-plot {
  font-size: 14px;
}
</style>
