<script setup lang="ts">
import type { PlotOptions } from '@observablehq/plot'
import type { AllTagsHistoryResponse, TagHistoryItem } from '~/api/v3/types.gen'
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'

const props = defineProps<{
  data: AllTagsHistoryResponse | null
  loading: boolean
}>()

const chart = ref()
const t = useI18N()
const { width, height } = useElementBounding(chart)

const chartData = computed(() => {
  if (!props.data?.tags) {
    return []
  }

  // Transform the data for stacked bar chart
  const processedData: Array<{
    tag: string
    tagId: string
    color: string
    duration: number
    date: Date
  }> = []

  for (const tagHistory of props.data.tags as TagHistoryItem[]) {
    for (const timeData of tagHistory.timeBreakdown) {
      processedData.push({
        tag: tagHistory.tag.name,
        tagId: tagHistory.tag.id,
        color: tagHistory.tag.color,
        duration: timeData.duration,
        date: new Date(timeData.time),
      })
    }
  }

  return processedData
})

const options = computed<PlotOptions>(() => {
  const groupedData = d3.rollup(
    chartData.value,
    v => d3.sum(v, d => d.duration),
    d => d3.timeDay(d.date),
    d => d.tag,
  )

  const stackedData: Array<{
    date: Date
    tag: string
    duration: number
    color: string
  }> = []

  for (const [date, tags] of groupedData) {
    for (const [tag, duration] of tags) {
      const tagData = chartData.value.find(d => d.tag === tag)
      stackedData.push({
        date,
        tag,
        duration,
        color: tagData?.color || '#666',
      })
    }
  }

  return {
    width: Math.max(width.value, 800),
    height: Math.max(height.value, 400),
    marginLeft: 30,
    marginRight: 0,
    x: {
      label: null,
      interval: 'day',
      tickFormat: (d: Date) => d3.timeFormat('%m/%d')(d),
    },
    y: {
      grid: true,
      nice: true,
      label: t.value.plot.label.durationHours,
      tickFormat: (d: number) => d3.format('.1f')(d / 60),
    },
    color: {
      domain: [...new Set(stackedData.map(d => d.tag))],
      range: [...new Set(stackedData.map(d => d.color))],
    },
    marks: [
      Plot.rectY(
        stackedData,
        Plot.stackY({
          x: 'date',
          y: 'duration',
          fill: d => d.color,
          title: d => `${d.tag}: ${(d.duration / 60).toFixed(1)} hours`,
        }),
      ),
      Plot.ruleY([0]),
    ],
  }
})
</script>

<template>
  <CardBase :loading="loading">
    <div class="space-y-4">
      <div class="text-lg font-medium flex gap-2 items-center">
        <i class="i-tabler-chart-bar" />
        {{ t.dashboard.tags.stats.timeDistribution }}
      </div>

      <div v-if="!loading && chartData.length > 0" class="w-full">
        <PoltChart
          ref="chart"
          :options="options"
        />
      </div>

      <div v-else-if="!loading && chartData.length === 0" class="text-gray-500 py-8 text-center">
        {{ t.dashboard.tags.stats.noData }}
      </div>
    </div>
  </CardBase>
</template>
