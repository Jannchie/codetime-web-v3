<script setup lang="ts">
const props = defineProps<{
  allData: {
    duration: number
    time: string
    by?: string
  }[]
}>()
const data = computed(() => props.allData)

const pAllData = useProcessedData(data)
const totalMinutes = useTotalMinutes(data)
const todayMinutes = useTodayMinutes(data)
const currentStreak = useCurrentStreak(pAllData)
const maxStreak = useMaxStreak(pAllData)
const t = useI18N()
</script>

<template>
  <CardBase
    class="min-h-210px"
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
