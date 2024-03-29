<script setup lang="ts">
import * as d3 from 'd3'

const props = defineProps<{
  data: MaybeRef<{
    date: Date
    duration: number
  }[]>
}>()
const data = computed(() => {
  return unref(props.data)
})
const yearStartDate = d3.utcDay.offset(new Date(), -365)
const years = d3.utcDay.range(yearStartDate, new Date())
const yearData = computed(() => {
  const d = data.value.filter((d) => {
    return d.date.getTime() >= yearStartDate.getTime()
  })

  const da = years.map((date) => {
    const day = d.find((d) => {
      return d.date.getTime() === date.getTime()
    })
    return {
      date,
      duration: day?.duration ?? 0,
    }
  })
  if (da.every(d => d.duration === 0)) {
    return []
  }
  return da
})

const latestWeekDate = computed(() => {
  return yearData.value[yearData.value.length - 1].date
})

const t = useI18N()
const options = computed(() => ({
  width: 800,
  height: 140,
  x: {
    axis: null,
    tickSize: 0,
  },
  y: {
    tickSize: 0,
    tickFormat: Plot.formatWeekday('en'),
  },
  color: {
    interpolate: (d: number) => {
      if (d === 0) {
        return 'rgb(var(--r-color-surface-lowest))'
      }
      return d3.scaleQuantile([0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.2, 0.4, 0.6, 0.8, 1].map(d3.interpolateRgb('#5AF2', '#2AF')))(d)
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
      },
      rx: 2,
      ry: 2,
      stroke: 'rgb(var(--r-color-surface-border-low))',
      strokeOpacity: 0,
      inset: 1,
    }),
  ],
}))
</script>

<template>
  <div
    v-if="yearData.length === 0"
    class="m-2 h-100px w-168 animate-pulse bg-primary-container bg-op25"
  />
  <PoltCalendar
    v-else
    :options="options"
  />
</template>
