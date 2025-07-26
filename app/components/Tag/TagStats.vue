<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'
import type { TagResponse } from '~/api/v3/types.gen'
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { v3GetTagHistory } from '~/api/v3'
import { getDurationString } from '~/utils/format'

type Props = {
  tag: TagResponse
}

const props = defineProps<Props>()

const t = useI18N()

// 时间范围选择
const timeRange = ref('7d')
const timeRangeOptions = computed(() => [
  { label: t.value.dashboard.tags.timeRange.last7Days, id: '7d' },
  { label: t.value.dashboard.tags.timeRange.last30Days, id: '30d' },
  { label: t.value.dashboard.tags.timeRange.last90Days, id: '90d' },
])

// 获取标签历史统计数据
const { data: tagStats, pending: loadingStats } = await useAsyncData(
  `tag-stats-${props.tag.id}-${timeRange.value}`,
  async () => {
    try {
      const days = timeRange.value === '7d' ? 7 : (timeRange.value === '30d' ? 30 : 90)
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(endDate.getDate() - days)

      const response = await v3GetTagHistory({
        path: { tag_id: props.tag.id },
        query: {
          start_datetime: startDate,
          end_datetime: endDate,
        },
      })

      return response.data
    }
    catch (error_) {
      console.error('Failed to fetch tag stats:', error_)
      return null
    }
  },
  {
    server: false,
    watch: [timeRange, () => props.tag.id],
  },
)

const chart = ref()
useElementBounding(chart)

// 准备图表数据
const chartData = computed(() => {
  // 生成完整的日期范围
  const days = timeRange.value === '7d' ? 7 : (timeRange.value === '30d' ? 30 : 90)
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days + 1) // +1 是为了包含今天

  // 生成完整的日期序列
  const fullDateRange = []
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    fullDateRange.push(currentDate)
  }

  // 创建数据映射
  const dataMap = new Map()
  if (tagStats.value?.data) {
    tagStats.value.data.forEach((dataPoint: any) => {
      const dateKey = new Date(dataPoint.time).toDateString()
      dataMap.set(dateKey, dataPoint)
    })
  }

  // 为每个日期生成数据点
  return fullDateRange.map(date => {
    const dateKey = date.toDateString()
    const dataPoint = dataMap.get(dateKey)
    
    return {
      date: new Date(date),
      duration: dataPoint?.duration || 0, // 原始分钟数
      minutes: dataPoint?.duration || 0, // duration 已经是分钟单位
      hours: (dataPoint?.duration || 0) / 60, // 转换为小时用于Y轴显示
    }
  })
})

// 图表配置
const chartOptions = computed<PlotOptions>(() => {
  const data = chartData.value
  const hasData = data.length > 0

  if (!hasData) {
    return {
      height: 200,
      marks: [],
    }
  }

  const maxHours = Math.max(...data.map((d: any) => d.hours))
  const avgHours = data.reduce((sum: number, d: any) => sum + d.hours, 0) / data.length

  // 计算时间范围
  const days = timeRange.value === '7d' ? 7 : (timeRange.value === '30d' ? 30 : 90)
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - days + 1)

  return {
    padding: 0,
    marginLeft: 30,
    marginRight: 20,
    marginBottom: 40,
    marginTop: 20,
    height: 200,
    x: {
      label: t.value.plot.label.date,
      domain: [startDate, endDate],
      tickFormat: d3.timeFormat('%m/%d'),
      interval: d3.timeDay,
    },
    y: {
      grid: true,
      nice: true,
      label: t.value.plot.label.timeHour,
      tickFormat: (d: number) => d3.format('.1f')(d),
      domain: [0, maxHours * 1.1],
    },
    marks: [
      // 竖向柱状图
      Plot.barY(data, {
        x: 'date',
        y: 'hours',
        fill: props.tag.color,
        fillOpacity: 0.8,
        tip: true,
        title: (d: any) => {
          return `${d.date.toLocaleDateString()}\n${getDurationString(d.minutes * 60 * 1000, ['hours', 'minutes'])}`
        },
      }),
      // 添加平均线
      ...(data.length > 1
        ? [
            Plot.ruleY([avgHours], {
              stroke: props.tag.color,
              strokeDasharray: '4,4',
              strokeOpacity: 0.8,
              strokeWidth: 2,
            }),
          ]
        : []),
    ],
  }
})
</script>

<template>
  <CardBase>
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="h-6 w-6 rounded-lg shadow-sm"
          :style="{ backgroundColor: tag.color }"
        />
        <h3 class="text-lg font-medium">
          {{ t.dashboard.tags.stats.statisticsTitle(tag.name) }}
        </h3>
      </div>

      <!-- 时间范围选择 -->
      <select
        v-model="timeRange"
        class="border-surface-variant-2 border rounded bg-surface px-2 py-1 text-sm"
      >
        <option v-for="option in timeRangeOptions" :key="option.id" :value="option.id">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div v-if="loadingStats" class="space-y-4">
      <!-- 加载状态 -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="h-4 w-16 animate-pulse rounded bg-surface-variant-1" />
          <div class="h-6 w-20 animate-pulse rounded bg-surface-variant-1" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div v-for="i in 2" :key="i" class="space-y-3">
          <div class="h-4 w-24 animate-pulse rounded bg-surface-variant-1" />
          <div class="space-y-2">
            <div v-for="j in 3" :key="j" class="flex items-center justify-between">
              <div class="h-4 w-32 animate-pulse rounded bg-surface-variant-1" />
              <div class="h-4 w-16 animate-pulse rounded bg-surface-variant-1" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!tagStats" class="py-8 text-center text-surface-dimmed">
      <i class="i-tabler-chart-bar-off mb-2 text-2xl" />
      <p class="text-sm">
        {{ t.dashboard.tags.stats.noData }}
      </p>
    </div>

    <div v-else class="space-y-6">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
        <div class="flex items-center gap-3 rounded-lg bg-surface-variant-1 p-3">
          <div class="bg-primary/10 rounded p-2">
            <i class="i-tabler-clock text-sm text-primary" />
          </div>
          <div>
            <p class="text-xs text-surface-dimmed">
              {{ t.dashboard.tags.stats.totalDuration }}
            </p>
            <p class="font-semibold">
              {{ getDurationString(tagStats.totalMinutes * 60 * 1000) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 rounded-lg bg-surface-variant-1 p-3">
          <div class="bg-success/10 rounded p-2">
            <i class="text-success i-tabler-list text-sm" />
          </div>
          <div>
            <p class="text-xs text-surface-dimmed">
              {{ t.dashboard.tags.stats.recordCount }}
            </p>
            <p class="font-semibold">
              {{ tagStats.data?.length || 0 }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 rounded-lg bg-surface-variant-1 p-3">
          <div class="bg-calendar/10 rounded p-2">
            <i class="text-calendar i-tabler-calendar text-sm" />
          </div>
          <div>
            <p class="text-xs text-surface-dimmed">
              {{ t.dashboard.tags.stats.timeRange }}
            </p>
            <p class="font-semibold">
              {{ Math.ceil((new Date(tagStats.periodEnd).getTime() - new Date(tagStats.periodStart).getTime()) / (1000 * 60 * 60 * 24)) }} {{ t.dashboard.tags.stats.days }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 rounded-lg bg-surface-variant-1 p-3">
          <div class="bg-info/10 rounded p-2">
            <i class="text-info i-tabler-chart-line text-sm" />
          </div>
          <div>
            <p class="text-xs text-surface-dimmed">
              {{ t.dashboard.tags.stats.dailyAverage }}
            </p>
            <p class="font-semibold">
              {{ getDurationString((tagStats.totalMinutes / Math.max(1, Math.ceil((new Date(tagStats.periodEnd).getTime() - new Date(tagStats.periodStart).getTime()) / (1000 * 60 * 60 * 24)))) * 60 * 1000) }}
            </p>
          </div>
        </div>
      </div>

      <!-- 时间趋势图表 -->
      <div v-if="!loadingStats && tagStats">
        <h4 class="mb-3 font-medium">
          {{ t.dashboard.tags.stats.timeTrend }}
        </h4>
        <div v-if="chartData.length > 0" :key="`chart-${props.tag.id}-${timeRange}`" class="h-52 w-full">
          <PoltChart
            ref="chart"
            :key="`plot-${props.tag.id}-${timeRange}`"
            :options="chartOptions"
          />
        </div>
        <div v-else class="h-52 flex items-center justify-center text-surface-dimmed">
          <div class="text-center">
            <i class="i-tabler-chart-line-off mb-2 text-2xl" />
            <p class="text-sm">
              {{ t.dashboard.tags.stats.noChartData }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </CardBase>
</template>
