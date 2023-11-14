<script setup lang="ts">
import * as d3 from 'd3'
import * as Plot from '@observablehq/plot'

definePageMeta({
  layout: 'dashboard',
})

const days = ref(28)

const allData = await fetchStats('time', 525600, 'days')
const hasData = computed(() => {
  if (allData.data === null) {
    return false
  }
  return (allData.data.value?.data.length ?? 0) > 0
})

const [languageTopData, projectTopData, platformTopData] = await useAllTopData(hasData, days)

const totalMinutes = useTotalMinutes(allData.data)
const todayMinutes = useTodayMinutes(allData.data)
const minDateString = d3.min(allData.data.value?.data ?? [], d => d.time)
const minDateDate = minDateString ? new Date(minDateString) : new Date()
const dateRange = d3.utcDay.range(minDateDate, new Date())
const dataMap = new Map<string, number | string>()
dateRange.forEach((d) => {
  dataMap.set(d.toISOString().slice(0, 10), 0)
})

const pAllData = computed(() => {
  const data = allData.data.value?.data ?? []
  data.forEach((d) => {
    const date = new Date(d.time)
    const key = date.toISOString().slice(0, 10)
    dataMap.set(key, d.duration)
  })
  const res = Array.from(dataMap.entries()).map(([key, duration]) => ({
    date: new Date(key),
    duration: duration as number,
  })).sort((a, b) => b.date.getTime() - a.date.getTime())
  return res
})

const filtedData = computed(() => {
  const data = pAllData.value
  const res = data.filter((d) => {
    return d.date.getTime() >= d3.utcDay.offset(new Date(), -days.value).getTime()
  })
  return res
})

const currentStreak = useCurrentStreak(pAllData)
const maxStreak = useMaxStreak(pAllData)
</script>

<template>
  <DashboardPageTitle
    title="总览"
    description="查看您的所有 CodeTime 数据。"
  />
  <DashboardPageContent v-if="hasData">
    <CardBase class="p-0!">
      <div class="p-4 flex flex-col">
        <div class="flex gap-2 children:sm:flex-basis-[200px] flex-wrap children:flex-grow">
          <DashboardDataBody
            title="编程时间/总计"
            :value="getDurationString(totalMinutes)"
          />
          <DashboardDataBody
            title="编程时间/今日"
            :value="getDurationString(todayMinutes)"
          />
          <DashboardDataBody
            title="连续天数/当前"
            :value="formateDays(currentStreak)"
          />
          <DashboardDataBody
            title="连续天数/最大"
            :value="formateDays(maxStreak)"
          />
        </div>
        <YearCalendarChart :data="pAllData" />
      </div>
    </CardBase>
    <DashboardDataRange :days="days" />
    <div
      class="flex gap-2 flex-wrap flex-basis-[100%] flex-col sm:flex-row sm:children:flex-basis-[calc(100%/3-(0.5rem)*2/3)] sm:children:max-w-[calc(100%/3-(0.5rem)*2/3)]"
    >
      <DashboardTopCard
        icon="i-tabler-braces"
        title="语言"
        :data="languageTopData"
      />
      <DashboardTopCard
        icon="i-tabler-app-window"
        title="项目"
        :data="projectTopData"
      />
      <DashboardTopCard
        icon="i-tabler-terminal"
        title="平台"
        :data="platformTopData"
      />
    </div>
    <CumulativeLineChart :data="filtedData" />
  </DashboardPageContent>
  <DashboardPageContent v-else>
    <CardBase class="p-6 flex gap-2">
      <div>
        <i
          class="w-6 h-6 text-sky-6 i-mdi:alert-circle-outline"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-sky-6 font-black">
          还没有数据
        </div>
        <div class="text-sm">
          <span class="op50">
            目前，我们尚未收到您的编码时间记录。我们的应用程序依赖于代码编辑器或集成开发环境（例如 VSCode、JetBrains IDE ）的插件。为了确保正常运作，请您前往
          </span>
          <NuxtLink
            to="dashboard/settings"
            class="text-sky-6"
          >
            [ 设置 ]
          </NuxtLink>
          <span class="op50">
            页面并在您所使用的支持插件的代码编辑器中进行相应配置。感谢您的合作。
          </span>
        </div>
      </div>
    </CardBase>
  </DashboardPageContent>
</template>
