<script setup lang="ts">
import * as d3 from 'd3'

const props = defineProps<{
  data: MaybeRef<{
    date: Date
    duration: number
  }[]>
}>()
const data = unref(props.data)
const yearStartDate = d3.utcDay.offset(new Date(), -365)
const yearData = computed(() => {
  const res = data.filter((d) => {
    return d.date.getTime() >= yearStartDate.getTime()
  })
  return res
})

const latestWeekDate = computed(() => {
  return yearData.value[yearData.value.length - 1].date
})

const options = {
  width: 700,
  height: 130,
  x: {
    axis: null,
    tickSize: 0,
    insetLeft: -8,
  },
  y: {
    tickSize: 0,
    tickFormat: Plot.formatWeekday('en'),
  },
  color: {
    interpolate: (d: number) => {
      if (d === 0) {
        return '#0004'
      }
      return d3.scaleQuantile([0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.2, 0.4, 0.6, 0.8, 1].map(d3.interpolateRgb('#38bdf822', '#38bdf8')))(d)
    },
  },
  marks: [
    Plot.cell(yearData.value, {
      fill: 'duration',
      x: (d) => {
        return getWeekDifference(d.date, latestWeekDate.value)
      },
      y: d => d.date.getUTCDay(),
      tip: {
        channels: {
          date: {
            label: t.value.plot.label.date,
            value: d => d.date.toISOString().slice(0, 10),
          },
          duration: {
            label: t.value.plot.label.duration,
            value: d => getDurationString(d.duration),
          },
        },
        format: {
          fill: false,
          x: false,
          y: false,
        },
        stroke: '#404040',
      },
      rx: 2,
      ry: 2,
      stroke: '#1e1e1e',
      inset: 0.5,
    }),
  ],
}
</script>

<template>
  <PoltCalendar :options="options" />
</template>
