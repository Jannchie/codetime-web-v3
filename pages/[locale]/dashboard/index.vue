<script setup lang="ts">
import * as d3 from 'd3'

const filters = reactive<FilterItem[]>([])
provide('filters', filters)

definePageMeta({
  layout: 'dashboard',
})

const days = ref(28)

const allData = await fetchStats('time', 525600, 'days')
const allLanguageData = await fetchStats('language', days.value, 'days')
const allProjectData = await fetchStats('project', days.value, 'days')
const hasData = computed(() => {
  if (allData.data.value === null) {
    return true
  }
  return (allData.data.value?.data.length ?? 0) > 0
})

const totalMinutes = useTotalMinutes(allData.data)
const todayMinutes = useTodayMinutes(allData.data)

const pAllData = useProcessedData(allData.data)
const pAllLangData = useProcessedData(allLanguageData.data)
const pAllProjectData = useProcessedData(allProjectData.data)

const filtedData = computed(() => {
  const data = pAllData.value
  const res = data.filter((d) => {
    return d.date.getTime() >= d3.utcDay.offset(new Date(), -days.value).getTime()
  })
  return res
})

const currentStreak = useCurrentStreak(pAllData)
const maxStreak = useMaxStreak(pAllData)
const t = useI18N()
const NoDataBody = t.value.dashboard.overview.noData.notice.body
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.overview"
    :description="t.dashboard.pageHeader.description.overview"
  />
  <DashboardPageContent v-if="hasData">
    <CardBase
      class="min-h-210px"
      dense
      :loading="!!allData.pending.value"
    >
      <div class="flex flex-col p-2">
        <div class="flex flex-wrap gap-2 children:flex-grow children:sm:flex-basis-[200px]">
          <DashboardDataBody
            :title="t.dashboard.overview.statistic.timeTotal"
            :value="getDurationString(totalMinutes)"
          />
          <DashboardDataBody
            :title="t.dashboard.overview.statistic.timeToday"
            :value="getDurationString(todayMinutes)"
          />
          <DashboardDataBody
            :title="t.dashboard.overview.statistic.currentStreak"
            :value="formateDays(currentStreak)"
          />
          <DashboardDataBody
            :title="t.dashboard.overview.statistic.longestStreak"
            :value="formateDays(maxStreak)"
          />
        </div>
        <YearCalendarChart
          :data="pAllData"
        />
      </div>
    </CardBase>
    <DashboardDataRange :days="days" />
    <DashboardFilterWrapper />
    <div
      class="flex flex-basis-[100%] flex-col flex-wrap gap-2 sm:flex-row sm:children:max-w-[calc(100%/3-0.5rem*2/3)] sm:children:flex-basis-[calc(100%/3-0.5rem*2/3)]"
    >
      <DashboardTopCard
        icon="i-tabler-braces"
        type="language"
        :filters="filters"
        :title="t.dashboard.overview.top.language"
      />
      <DashboardTopCard
        icon="i-tabler-app-window"
        type="project"
        :filters="filters"
        :title="t.dashboard.overview.top.project"
      />
      <DashboardTopCard
        icon="i-tabler-terminal"
        type="platform"
        :filters="filters"
        :title="t.dashboard.overview.top.platform"
      />
    </div>
    <CumulativeLineChart :data="filtedData" />
    <CardBase>
      <div>
        <div class="flex items-center gap-2 text-lg">
          <i class="i-carbon-chart-line-data" />
          <div>
            {{ t.dashboard.overview.codetimeLanguaeTrendTitle }}
          </div>
        </div>
      </div>
      <PoltYDot
        :data="pAllLangData"
        :y-label="t.plot.label.language"
      />
    </CardBase>
    <CardBase>
      <div>
        <div class="flex items-center gap-2 text-lg">
          <i class="i-carbon-chart-line-data" />
          <div>
            {{ t.dashboard.overview.codetimeProjectTrendTitle }}
          </div>
        </div>
      </div>
      <PoltYDot
        :data="pAllProjectData"
        :y-label="t.plot.label.project"
      />
    </CardBase>
  </DashboardPageContent>
  <DashboardPageContent v-else>
    <CardBase class="flex gap-2 p-6">
      <div class="leading-0">
        <i
          class="i-mdi:alert-circle-outline h-6 w-6 text-primary-container"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-primary-container font-black">
          {{ t.dashboard.overview.noData.notice.title }}
        </div>
        <NoDataBody />
      </div>
    </CardBase>
  </DashboardPageContent>
</template>
