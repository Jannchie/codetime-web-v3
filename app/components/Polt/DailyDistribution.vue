<script setup lang="ts">
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { v3GetTimeDistribution } from '~/api/v3'

type DataPoint = {
  time: number
  ratio: number
}

const props = withDefaults(defineProps<{
  startTime: Date
  endTime: Date
  interval?: number
  segments?: number
  title?: string
}>(), {
  interval: 10,
  segments: 3,
  title: 'Daily Coding Distribution',
})
const t = useI18N()

function fillGapsInData(data: DataPoint[]): DataPoint[] {
  if (data.length === 0) {
    return []
  }

  // 创建一个完整的时间映射，每分钟一个数据点
  const timeMap = new Map<number, number>()

  // 填入现有数据
  for (const point of data) {
    timeMap.set(point.time, point.ratio)
  }

  // 填充完整的 24 小时时间轴（0-1439 分钟）
  const filledData: DataPoint[] = []
  for (let minute = 0; minute < 1440; minute++) {
    filledData.push({
      time: minute,
      ratio: timeMap.get(minute) ?? 0,
    })
  }

  return filledData
}

function aggregateData(data: DataPoint[], interval = 15): DataPoint[] {
  // 先填充空白时间段
  const filledData = fillGapsInData(data)
  const aggregatedData: DataPoint[] = []

  for (let i = 0; i < filledData.length; i += interval) {
    const chunk = filledData.slice(i, i + interval)
    let maxRatio = 0
    for (const item of chunk) {
      if (item.ratio > maxRatio) {
        maxRatio = item.ratio
      }
    }
    const datum = filledData[i]
    if (datum) {
      aggregatedData.push({ time: datum.time, ratio: maxRatio })
    }
  }

  return aggregatedData
}
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

const { data: timeDistributionData, pending: segmentsPending } = await useAsyncData('time-distribution-segments', async () => {
  const totalMs = props.endTime.getTime() - props.startTime.getTime()
  const segmentMs = Math.floor(totalMs / props.segments)
  const promises = []

  for (let i = 0; i < props.segments; i++) {
    const segmentEndTime = new Date(props.endTime.getTime() - i * segmentMs)
    const segmentStartTime = new Date(segmentEndTime.getTime() - segmentMs)

    const resp = v3GetTimeDistribution({
      query: {
        start_time: segmentStartTime,
        end_time: segmentEndTime,
        tz,
      },
    }).then(response => ({
      data: response.data?.data ?? [],
      period: `Period ${i + 1}`,
      periodIndex: i,
      startTime: segmentStartTime,
      endTime: segmentEndTime,
    }))
    promises.push(resp)
  }

  const results = await Promise.all(promises)
  return results
}, {
  server: false,
  watch: [() => props.startTime, () => props.endTime, () => props.segments],
})

const { data: summaryData, pending: summaryPending } = await useAsyncData('time-distribution-summary', async () => {
  const resp = await v3GetTimeDistribution({
    query: {
      start_time: props.startTime,
      end_time: props.endTime,
      tz,
    },
  })

  return resp.data?.data ?? []
}, {
  server: false,
  watch: [() => props.startTime, () => props.endTime],
})

const isLoading = computed(() => segmentsPending.value || summaryPending.value)

const data = computed<DataPoint[]>(() => {
  if (!timeDistributionData.value || timeDistributionData.value.length === 0) {
    return []
  }

  const firstSegment = timeDistributionData.value[0]
  if (!firstSegment) {
    return []
  }

  const maxCount = d3.max(firstSegment.data.map(d => d.count) ?? []) ?? 1
  const processedData = firstSegment.data.map((d) => {
    const ratio = d.count / maxCount
    const timeInMinutes = d.hour * 60 + d.minute
    return {
      time: timeInMinutes,
      ratio,
    }
  })

  return aggregateData(processedData, props.interval)
})

const summaryDistribution = computed<DataPoint[]>(() => {
  if (!summaryData.value || summaryData.value.length === 0) {
    return []
  }

  const maxCount = d3.max(summaryData.value.map(d => d.count) ?? []) ?? 1
  const processedData = summaryData.value.map((d) => {
    const ratio = d.count / maxCount
    const timeInMinutes = d.hour * 60 + d.minute
    return {
      time: timeInMinutes,
      ratio,
    }
  })

  return aggregateData(processedData, props.interval)
})

const segmentedData = computed(() => {
  if (!timeDistributionData.value || timeDistributionData.value.length === 0) {
    return []
  }

  return timeDistributionData.value.map((segment, index) => {
    const maxCount = d3.max(segment.data.map(d => d.count) ?? []) ?? 1
    const processedData = segment.data.map((d) => {
      const ratio = d.count / maxCount
      const timeInMinutes = d.hour * 60 + d.minute
      return {
        time: timeInMinutes,
        ratio,
      }
    })

    return {
      period: segment.period,
      data: aggregateData(processedData, props.interval),
      opacity: Math.max(0.3, 1 - index * 0.2),
    }
  })
})

const currentTime = computed(() => {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
})

const currentTimeLabel = computed(() => {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
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
      // 分段数据线（透明度较低）
      ...(segmentedData.value.length > 0
        ? segmentedData.value.flatMap(segment => [
            Plot.lineY(segment.data, Plot.windowY(60 / props.interval, {
              x: 'time',
              y: 'ratio',
              stroke: 'var(--color-primary-1)',
              opacity: segment.opacity,
              strokeWidth: 1.5,
            })),
          ])
        : []
      ),
      // 汇总数据线（success 颜色，更明显）
      ...(summaryDistribution.value.length > 0
        ? [
            Plot.lineY(summaryDistribution.value, Plot.windowY(60 / props.interval, {
              x: 'time',
              y: 'ratio',
              stroke: 'var(--color-success-1)',
              strokeWidth: 4,
              opacity: 1,
            })),
          ]
        : []
      ),
      // 回退到原始显示（如果没有分段数据）
      ...(segmentedData.value.length === 0 && summaryDistribution.value.length === 0
        ? [
            Plot.dot(data.value, {
              x: 'time',
              y: 'ratio',
              opacity: 0.1,
            }),
            Plot.lineY(data.value, Plot.windowY(60 / props.interval, { x: 'time', y: 'ratio', stroke: 'var(--color-primary-1)' })),
          ]
        : []
      ),
      // 当前时间标记
      Plot.ruleX([currentTime.value], {
        stroke: 'var(--color-error-1)',
        strokeWidth: 2,
        opacity: 0.8,
      }),
      Plot.text([{ x: currentTime.value, y: 0.95, label: `Current Time (${currentTimeLabel.value})` }], {
        x: 'x',
        y: 'y',
        text: 'label',
        fill: 'var(--color-error-1)',
        fontSize: 12,
        dx: currentTime.value < 600 ? 5 : -5,
        textAnchor: currentTime.value < 600 ? 'start' : 'end',
      }),
    ],
  }
})
</script>

<template>
  <CardBase :loading="isLoading">
    <div class="mb-4 flex items-center gap-2 text-lg">
      <i class="i-carbon-chart-line-data" />
      <div>
        {{ props.title }}
      </div>
    </div>
    <PoltChart
      ref="chart"
      :options="options"
    />
  </CardBase>
</template>
