<script setup lang="ts">
import * as Plot from '@observablehq/plot'

interface DataPoint {
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

const data = computed<DataPoint[]>(() => {
  function aggregateData(data: DataPoint[], interval = 15): DataPoint[] {
    const aggregatedData: DataPoint[] = []

    for (let i = 0; i < data.length; i += interval) {
      const chunk = data.slice(i, i + interval)
      const maxRatio = chunk.reduce((max, item) => item.ratio > max ? item.ratio : max, 0)
      aggregatedData.push({ time: data[i].time, ratio: maxRatio })
    }

    return aggregatedData
  }
  if (!props.data) {
    return []
  }
  return aggregateData(props.data ?? [], props.interval)
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
      axis: 'right',
      // tickSize: 0,
      // tickFormat: () => '',
      // ariaLabel: props.yLabel,
      // label: props.yLabel,
      domain: [0, 1],
    },
    x: {
      // insetRight: maxR.value,
      // insetLeft: maxR.value,
      tickFormat: (d: number) => {
        const hour = Math.floor(d / 60)
        const minute = d % 60
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      },
      label: t.value.plot.label.date,
    },
    width: 1110,
    height: 300,
    // r: { range: [0, maxR.value] },
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
    :options="options"
  />
</template>
