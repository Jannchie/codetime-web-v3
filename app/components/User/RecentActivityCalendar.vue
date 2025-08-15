<script setup lang="ts">
import * as d3 from 'd3'

type RecentActivityProps = {
  data: {
    date: Date
    duration: number
  }[]
  loading?: boolean
  days?: number
}

const props = withDefaults(defineProps<RecentActivityProps>(), {
  loading: false,
  days: 90,
})

const t = useI18N()

// 计算近期日期范围
const endDate = new Date()
const startDate = d3.utcDay.offset(endDate, -props.days)
const dateRange = d3.utcDay.range(startDate, endDate)

// 处理数据
const calendarData = computed(() => {
  if (props.loading || props.data.length === 0) {
    return []
  }

  const dataMap = new Map()
  for (const item of props.data) {
    const dateKey = d3.timeFormat('%Y-%m-%d')(item.date)
    dataMap.set(dateKey, item.duration)
  }

  return dateRange.map((date) => {
    const dateKey = d3.timeFormat('%Y-%m-%d')(date)
    return {
      date,
      duration: dataMap.get(dateKey) || 0,
    }
  })
})

// 计算最新的周日期（用于定位）
const latestWeekDate = computed(() => {
  return calendarData.value.length > 0 ? calendarData.value.at(-1)?.date || endDate : endDate
})

// 计算合适的图表尺寸
const chartDimensions = computed(() => {
  const weeks = Math.ceil(props.days / 7) // 90天大约13-14周
  const cellSize = 14 // 方块大小
  const cellSpacing = 2 // 方块间距
  const marginLeft = 60 // 左侧星期标签的空间
  const marginRight = 20
  const marginTop = 20
  const marginBottom = 20

  return {
    width: marginLeft + (weeks * (cellSize + cellSpacing)) + marginRight,
    height: marginTop + (7 * (cellSize + cellSpacing)) + marginBottom,
    cellSize,
    cellSpacing,
  }
})

// 日历图表选项
const options = computed(() => ({
  width: chartDimensions.value.width,
  height: chartDimensions.value.height,
  marginLeft: 60,
  marginRight: 20,
  marginTop: 20,
  marginBottom: 20,
  x: {
    axis: null,
    tickSize: 0,
  },
  y: {
    tickSize: 0,
    tickFormat: Plot.formatWeekday('en'),
    label: null,
  },
  color: {
    interpolate: (d: number) => {
      if (d === 0) {
        return 'var(--r-surface-background-variant-2-color)'
      }
      return d3.scaleQuantile([0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.2, 0.4, 0.6, 0.8, 1].map(d3.interpolateRgb('#5AF2', '#2AF')))(d)
    },
  },
  marks: [
    Plot.cell(calendarData.value, {
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
      stroke: 'var(--r-color-surface-border-color)',
      strokeOpacity: 0.1,
      inset: 0.5,
    }),
  ],
}))

// 统计信息
const totalDays = computed(() => calendarData.value.filter(d => d.duration > 0).length)
const totalTime = computed(() => calendarData.value.reduce((sum, d) => sum + d.duration, 0))
const avgDailyTime = computed(() => totalDays.value > 0 ? totalTime.value / totalDays.value : 0)
</script>

<template>
  <div class="p-4">
    <!-- Header -->
    <div class="mb-4 flex gap-3 items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold">
          Recent Activity
        </h3>
        <p class="text-sm text-surface-dimmed">
          Coding activity in the past {{ days }} days
        </p>
      </div>
      <div v-if="!loading && calendarData.length > 0" class="text-right">
        <div class="text-sm font-medium">
          {{ totalDays }} active days
        </div>
        <div class="text-xs text-surface-dimmed">
          {{ getDurationString(avgDailyTime) }} avg/day
        </div>
        <div class="text-xs text-surface-dimmed">
          {{ getDurationString(totalTime) }} total
        </div>
      </div>
    </div>

    <!-- Calendar -->
    <div v-if="loading" class="py-8 flex justify-center">
      <div class="space-y-1">
        <div
          v-for="week in 7"
          :key="week"
          class="flex gap-1"
        >
          <div
            v-for="day in Math.ceil(days / 7)"
            :key="day"
            class="bg-surface-dimmed rounded h-3.5 w-3.5 animate-pulse"
          />
        </div>
      </div>
    </div>

    <div v-else-if="calendarData.length === 0" class="py-8 text-center">
      <i class="i-tabler-calendar-off text-4xl text-surface-dimmed mb-2 block" />
      <p class="text-surface-dimmed">
        No coding activity in the past {{ days }} days
      </p>
    </div>

    <div v-else class="overflow-x-auto">
      <div class="flex justify-center">
        <PoltCalendar :options="options" />
      </div>

      <!-- Legend -->
      <div class="text-xs flex gap-2 items-center justify-center">
        <span class="text-surface-dimmed">Less</span>
        <div class="flex gap-1">
          <div
            v-for="level in 5"
            :key="level"
            class="rounded-sm h-2.5 w-2.5"
            :style="{
              backgroundColor: level === 1
                ? 'var(--r-surface-background-variant-2-color)'
                : d3.interpolateRgb('#5AF2', '#2AF')((level - 1) / 4),
            }"
          />
        </div>
        <span class="text-surface-dimmed">More</span>
      </div>
    </div>
  </div>
</template>
