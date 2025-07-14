<script setup lang="ts">
import * as d3 from 'd3'
import { v3GetTimeDistribution } from '~/api/v3'

const filters = reactive<FilterItem[]>([])
provide('filters', filters)

definePageMeta({
  layout: 'dashboard',
})

const user = useUser()
const days = useLocalStorage('days', ref(user.value?.plan === 'pro' ? 365 : 28))
const allDataResp = await fetchStats(days, 'time', 'days')
const allLanguageDataResp = await fetchStats(days, 'language', 'days')
const allProjectDataResp = await fetchStats(days, 'project', 'days')
const allLanguageData = computed(() => allLanguageDataResp.data.value?.data ?? [])
const allProjectData = computed(() => allProjectDataResp.data.value?.data ?? [])
const hasData = computed(() => {
  if (allDataResp.data.value === null) {
    return false
  }
  return (allDataResp.data.value?.data.length ?? 0) > 0
})

const allData = computed(() => {
  return allDataResp.data.value?.data ?? []
})

const pAllData = useProcessedData(allData)
const pAllLangData = useProcessedData(allLanguageData)
const pAllProjectData = useProcessedData(allProjectData)

const filtedData = computed(() => {
  const data = unref(pAllData)
  const res = data.filter((d) => {
    return d.date.getTime() >= d3.utcDay.offset(new Date(), -days.value).getTime()
  })
  return res
})

// GetTimeDistribution
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
const timeDistributionResp = await useAsyncData(async () => {
  const resp = await v3GetTimeDistribution({
    query: {
      tz,
      days: days.value,
    },
  })
  return resp.data?.data ?? []
}, {
  server: false,
  watch: [days],
})

const dailyDistribution = computed(() => {
  if (!timeDistributionResp.data.value) {
    return []
  }
  const maxCount = d3.max(timeDistributionResp.data.value.map(d => d.count) ?? []) ?? 1
  return timeDistributionResp.data.value.map((d) => {
    const ratio = d.count / maxCount
    const timeInMinutes = d.hour * 60 + d.minute
    return {
      time: timeInMinutes,
      ratio,
      count: d.count,
    }
  })
})
const t = useI18N()
const NoDataBody = t.value.dashboard.overview.noData.notice.body
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.overview"
    :description="t.dashboard.pageHeader.description.overview"
  />
  <DashboardPageContent v-if="allDataResp.status.value !== 'success' && !allDataResp.data.value">
    <div class="h-32 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
  </DashboardPageContent>
  <DashboardPageContent v-else-if="hasData">
    <DashboardDataRange v-model:days="days" />
    <DashboardCalendarCard
      :loading="allDataResp.status.value === 'pending'"
      :data="allData"
    />
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
        type="workspace"
        :days="days"
        :filters="filters"
        :title="t.dashboard.overview.top.workspace"
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
      :loading="allDataResp.status.value === 'pending'"
      :data="filtedData"
    />
    <CardBase :loading="allLanguageDataResp.status.value === 'pending'">
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
    <CardBase :loading="allProjectDataResp.status.value === 'pending'">
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
    <CardBase :loading="timeDistributionResp.status.value === 'pending'">
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
          class="text-primary-on i-mdi:alert-circle-outline h-6 w-6"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-primary-on font-black">
          {{ t.dashboard.overview.noData.notice.title }}
        </div>
        <NoDataBody />
      </div>
    </CardBase>
  </DashboardPageContent>
</template>
