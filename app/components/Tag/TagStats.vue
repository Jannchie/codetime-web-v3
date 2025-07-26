<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'
import type { TagResponse } from '~/api/v3/types.gen'
import * as Plot from '@observablehq/plot'
import { Select } from '@roku-ui/vue'
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
    for (const dataPoint of tagStats.value.data) {
      const dateKey = new Date(dataPoint.time).toDateString()
      dataMap.set(dateKey, dataPoint)
    }
  }

  // 为每个日期生成数据点
  const result = fullDateRange.map((date) => {
    const dateKey = date.toDateString()
    const dataPoint = dataMap.get(dateKey)

    return {
      date: new Date(date),
      duration: dataPoint?.duration || 0, // 原始分钟数
      minutes: dataPoint?.duration || 0, // duration 已经是分钟单位
      hours: (dataPoint?.duration || 0) / 60, // 转换为小时用于Y轴显示
    }
  })
  return result
})

// 检查是否有实际数据
const hasActualData = computed(() => {
  return chartData.value.some(d => d.duration > 0)
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
      paddingInner: 0.1,
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
        ry1: 8,
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
  <CardBase class="h-103" :loading="loadingStats">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="rounded-lg h-6 w-6 shadow-sm"
          :style="{ backgroundColor: tag.color }"
        />
        <h3 class="text-lg font-medium">
          {{ t.dashboard.tags.stats.statisticsTitle(tag.name) }}
        </h3>
      </div>

      <!-- 时间范围选择 -->
      <Select
        v-model="timeRange"
        :options="timeRangeOptions.map(opt => opt.id)"
        :label-getter="opt => opt"
      />
    </div>

    <div v-if="loadingStats" class="space-y-4">
      <!-- 加载状态 -->
      <div class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="rounded bg-surface-variant-1 h-4 w-16 animate-pulse" />
          <div class="rounded bg-surface-variant-1 h-6 w-20 animate-pulse" />
        </div>
      </div>
      <div class="gap-4 grid grid-cols-1 lg:grid-cols-2">
        <div v-for="i in 2" :key="i" class="space-y-3">
          <div class="rounded bg-surface-variant-1 h-4 w-24 animate-pulse" />
          <div class="space-y-2">
            <div v-for="j in 3" :key="j" class="flex items-center justify-between">
              <div class="rounded bg-surface-variant-1 h-4 w-32 animate-pulse" />
              <div class="rounded bg-surface-variant-1 h-4 w-16 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!tagStats" class="text-surface-dimmed py-8 text-center">
      <i class="i-tabler-chart-bar-off text-2xl mb-2" />
      <p class="text-sm">
        {{ t.dashboard.tags.stats.noData }}
      </p>
    </div>

    <div v-else class="space-y-6">
      <!-- 统计卡片 -->
      <div class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
        <div class="p-3 rounded-lg bg-surface-variant-1 flex gap-3 items-center">
          <div class="bg-primary/10 p-2 rounded">
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

        <div class="p-3 rounded-lg bg-surface-variant-1 flex gap-3 items-center">
          <div class="bg-success/10 p-2 rounded">
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

        <div class="p-3 rounded-lg bg-surface-variant-1 flex gap-3 items-center">
          <div class="bg-calendar/10 p-2 rounded">
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

        <div class="p-3 rounded-lg bg-surface-variant-1 flex gap-3 items-center">
          <div class="bg-info/10 p-2 rounded">
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
        <h4 class="font-medium mb-3">
          {{ t.dashboard.tags.stats.timeTrend }}
        </h4>
        <div v-if="hasActualData" :key="`chart-${props.tag.id}-${timeRange}`" class="h-52 w-full">
          <PoltChart
            ref="chart"
            :key="`plot-${props.tag.id}-${timeRange}`"
            :options="chartOptions"
          />
        </div>
        <div v-else class="text-surface-dimmed flex h-52 items-center justify-center">
          <div class="text-center">
            <i class="i-tabler-chart-line-off text-2xl mb-2" />
            <p class="text-sm">
              {{ t.dashboard.tags.stats.noChartData }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </CardBase>
</template>
