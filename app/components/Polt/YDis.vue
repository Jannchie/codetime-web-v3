<script setup lang="ts">
import * as Plot from '@observablehq/plot'

type DataPoint = {
  time: number
  ratio: number
}
const props = withDefaults(defineProps<{
  data: DataPoint[] | undefined
  interval?: number
}>(), {
  interval: 5,
})
const t = useI18N()

function aggregateData(data: DataPoint[], interval = 15): DataPoint[] {
  const aggregatedData: DataPoint[] = []

  for (let i = 0; i < data.length; i += interval) {
    const chunk = data.slice(i, i + interval)
    let maxRatio = 0
    for (const item of chunk) {
      if (item.ratio > maxRatio) {
        maxRatio = item.ratio
      }
    }
    const datum = data[i]
    if (datum) {
      aggregatedData.push({ time: datum.time, ratio: maxRatio })
    }
  }

  return aggregatedData
}
const data = computed<DataPoint[]>(() => {
  if (!props.data) {
    return []
  }
  return aggregateData(props.data ?? [], props.interval)
})
const chart = ref()
const { width, height } = useElementBounding(chart)
const options = computed<Plot.PlotOptions>(() => {
  return {
    w: width.value,
    h: height.value,
    className: 'y-dot-plot',
    color: {
      scheme: 'Warm',
    },
    marginRight: 24,
    y: {
      grid: true,
      axis: 'right',
      domain: [0, 1],
    },
    x: {
      tickFormat: (d: number) => {
        const hour = Math.floor(d / 60)
        const minute = d % 60
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      },
      label: t.value.plot.label.date,
    },
    width: 1110,
    height: 300,
    marks: [
      Plot.dot(data.value, {
        x: 'time',
        y: 'ratio',
        opacity: 0.1,
      }),
      Plot.lineY(data.value, Plot.windowY(60 / props.interval, { x: 'time', y: 'ratio', stroke: 'var(--color-primary-1)' })),
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
