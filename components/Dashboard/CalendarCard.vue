<script setup lang="ts">
const props = defineProps<{
  allData: any
}>()
const pAllData = useProcessedData(props.allData.data)
const currentStreak = useCurrentStreak(pAllData)
const maxStreak = useMaxStreak(pAllData)
const totalMinutes = useTotalMinutes(props.allData.data)
const todayMinutes = useTodayMinutes(props.allData.data)
const t = useI18N()
</script>

<template>
  <CardBase
    class="min-h-210px"
    dense
    :loading="!!allData.pending.value"
  >
    <div class="flex flex-col p-2">
      <div
        :style="{
          flexWrap: 'nowrap',
        }"
        class="flex flex-wrap gap-2 children:flex-grow children:sm:flex-basis-[200px]"
      >
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
</template>

<style>
[aria-label="tip"] {
  color: var(--r-color-surface-low);
  --plot-background: rgb(var(--r-color-surface-low));
  stroke-opacity: 0;
  background: var(--plot-background) !important;
  border: 1px solid var(--plot-background) !important;
  fill: var(--plot-background) !important;
}
</style>
