<script setup lang="ts">
import * as d3 from 'd3'

const filters = reactive<FilterItem[]>([])
provide('filters', filters)

definePageMeta({
})

const user = useUser()
const days = ref(user.value?.plan === 'pro' ? 365 : 28)
const allData = await fetchStats(days, 'time', 'days')
const allLanguageData = await fetchStats(days, 'language', 'days')
const allProjectData = await fetchStats(days, 'project', 'days')
const hasData = computed(() => {
  if (allData.data.value === null) {
    return false
  }
  return (allData.data.value?.data.length ?? 0) > 0
})

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

interface DailyDistribution {
  minute: number
  hour: number
  count: number
}
// GetDailyDistribution
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
const resp = await useAPIFetch<DailyDistribution[]>('/daily-distribution', { params: { tz, days } })
const dailyDistribution = computed(() => {
  const maxCount = d3.max(resp.data.value?.map(d => d.count) ?? []) ?? 1
  return resp.data.value?.map((d) => {
    const h = d.hour
    const m = d.minute
    const ratio = d.count / maxCount
    // format hh:mm
    const time = h * 60 + m
    return {
      time,
      ratio,
      count: d.count,
    }
  })
})
const t = useI18N()
const NoDataBody = t.value.dashboard.overview.noData.notice.body
</script>

<template>
  <NuxtLayout name="dashboard">
    <DashboardPageTitle
      :title="t.dashboard.pageHeader.title.overview"
      :description="t.dashboard.pageHeader.description.overview"
    />
    <DashboardPageContent v-if="allData.status.value !== 'success' && !allData.data.value">
      <div class="h-32 w-full animate-pulse rounded-2xl bg-surface-onlow/20" />
    </DashboardPageContent>
    <DashboardPageContent v-else-if="hasData">
      <DashboardDataRange v-model:days="days" />
      <DashboardCalendarCard :all-data="allData" />
      <DashboardFilterWrapper />
      <div
        class="flex flex-basis-[100%] flex-col flex-wrap gap-2 sm:flex-row sm:children:max-w-[calc(100%/3-0.5rem*2/3)] sm:children:flex-basis-[calc(100%/3-0.5rem*2/3)]"
      >
        <DashboardTopCard
          icon="i-tabler-braces"
          type="language"
          :days="days"
          :filters="filters"
          :title="t.dashboard.overview.top.language"
        />
        <DashboardTopCard
          icon="i-tabler-app-window"
          type="project"
          :days="days"
          :filters="filters"
          :title="t.dashboard.overview.top.project"
        />
        <DashboardTopCard
          icon="i-tabler-terminal"
          type="platform"
          :days="days"
          :filters="filters"
          :title="t.dashboard.overview.top.platform"
        />
      </div>
      <CumulativeLineChart
        :loading="allData.pending.value"
        :data="filtedData"
      />
      <CardBase :loading="allLanguageData.pending.value">
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
      <CardBase :loading="allProjectData.pending.value">
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
      <CardBase :loading="resp.pending.value">
        <div>
          <div class="flex items-center gap-2 text-lg">
            <i class="i-carbon-chart-line-data" />
            <div>
              {{ t.dashboard.overview.dailyCodingDistributionTitle }}
            </div>
          </div>
        </div>
        <PoltYDis
          v-if="(dailyDistribution && (d3.max(dailyDistribution.map((d => d.count))) ?? 0) > 0)"
          :data="dailyDistribution"
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
  </NuxtLayout>
</template>
