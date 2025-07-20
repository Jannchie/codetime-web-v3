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

// 并行发起所有主要请求
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
const [allDataResp, allLanguageDataResp, allProjectDataResp, timeDistributionResp] = await Promise.all([
  fetchStats(days, 'time', 'days'),
  fetchStats(days, 'language', 'days'),
  fetchStats(days, 'workspace', 'days'),
  useAsyncData(async () => {
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
])

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
  <DashboardPageContent>
    <DashboardDataRange v-model:days="days" />
    
    <DashboardCalendarCard
      v-if="allDataResp.status.value === 'success' && hasData"
      :loading="false"
      :data="allData"
    />
    <CardBase v-else-if="allDataResp.status.value === 'pending'">
      <div class="h-32 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
    </CardBase>
    <CardBase v-else-if="!hasData" class="flex gap-2 p-6">
      <div class="leading-0">
        <i class="text-primary-on i-mdi:alert-circle-outline h-6 w-6" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-primary-on font-black">
          {{ t.dashboard.overview.noData.notice.title }}
        </div>
        <NoDataBody />
      </div>
    </CardBase>
    
    <DashboardFilterWrapper />
    
    <div
      v-if="hasData"
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
      v-if="allDataResp.status.value === 'success' && hasData"
      :loading="false"
      :data="filtedData"
    />
    <CardBase v-else-if="allDataResp.status.value === 'pending'">
      <div class="h-64 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
    </CardBase>
    
    <CardBase 
      v-if="allLanguageDataResp.status.value === 'success' && pAllLangData.length > 0"
      :loading="false"
    >
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
    <CardBase v-else-if="allLanguageDataResp.status.value === 'pending'" :loading="true">
      <div class="h-64 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
    </CardBase>
    
    <CardBase 
      v-if="allProjectDataResp.status.value === 'success' && pAllProjectData.length > 0"
      :loading="false"
    >
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
    <CardBase v-else-if="allProjectDataResp.status.value === 'pending'" :loading="true">
      <div class="h-64 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
    </CardBase>
    
    <CardBase 
      v-if="timeDistributionResp.status.value === 'success' && dailyDistribution && (d3.max(dailyDistribution.map((d => d.count))) ?? 0) > 0"
      :loading="false"
    >
      <div>
        <div class="flex items-center gap-2 text-lg">
          <i class="i-carbon-chart-line-data" />
          <div>
            {{ t.dashboard.overview.dailyCodingDistributionTitle }}
          </div>
        </div>
      </div>
      <PoltYDis
        :data="dailyDistribution"
      />
    </CardBase>
    <CardBase v-else-if="timeDistributionResp.status.value === 'pending'" :loading="true">
      <div class="h-64 w-full animate-pulse rounded-2xl bg-surface-variant-1" />
    </CardBase>
  </DashboardPageContent>
</template>
