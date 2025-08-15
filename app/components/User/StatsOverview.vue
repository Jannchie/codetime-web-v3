<script setup lang="ts">
type StatsOverviewProps = {
  totalMinutes: number
  rank?: number
  percentile?: number
  topLanguage?: string
  timeRangeDays?: number
  loading?: boolean
}

const props = withDefaults(defineProps<StatsOverviewProps>(), {
  loading: false,
  rank: undefined,
  percentile: undefined,
  topLanguage: undefined,
  timeRangeDays: undefined,
})

const t = useI18N()

const totalHours = computed(() => Math.floor(props.totalMinutes / 60))
const formattedDuration = computed(() => getDurationString(props.totalMinutes * 60 * 1000))

const rankDisplay = computed(() => {
  if (props.rank !== undefined) {
    return `#${props.rank}`
  }
  if (props.percentile !== undefined) {
    return `Top ${(props.percentile * 100).toFixed(1)}%`
  }
  return '--'
})
</script>

<template>
  <div class="gap-3 grid grid-cols-1 sm:grid-cols-3">
    <!-- Total Coding Time -->
    <div class="border-surface-dimmed bg-surface-low p-4 border rounded-lg transition-all hover:shadow-sm">
      <div class="flex gap-3 items-start">
        <div class="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
          <i class="i-tabler-clock text-lg" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-surface-dimmed tracking-wide font-medium uppercase">
            {{ t.dashboard.overview.recent.time }}
          </p>
          <div v-if="loading" class="mt-1.5">
            <div class="bg-surface-dimmed rounded h-6 w-20 animate-pulse" />
            <div class="bg-surface-dimmed mt-1 rounded h-3 w-12 animate-pulse" />
          </div>
          <div v-else class="mt-1.5">
            <p class="text-on-surface text-lg leading-tight font-semibold">
              {{ totalMinutes > 0 ? formattedDuration : '--' }}
            </p>
            <p class="text-xs text-surface-dimmed mt-0.5">
              {{ totalMinutes > 0 ? `${totalHours.toLocaleString()} ${t.dashboard.overview.hours}` : 'No data' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ranking -->
    <div class="border-surface-dimmed bg-surface-low p-4 border rounded-lg transition-all hover:shadow-sm">
      <div class="flex gap-3 items-start">
        <div class="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
          <i class="i-tabler-trophy text-lg" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-surface-dimmed tracking-wide font-medium uppercase">
            {{ t.dashboard.overview.ranking }}
          </p>
          <div v-if="loading" class="mt-1.5">
            <div class="bg-surface-dimmed rounded h-6 w-16 animate-pulse" />
            <div class="bg-surface-dimmed mt-1 rounded h-3 w-14 animate-pulse" />
          </div>
          <div v-else class="mt-1.5">
            <p class="text-on-surface text-lg leading-tight font-semibold">
              {{ rankDisplay }}
            </p>
            <p class="text-xs text-surface-dimmed mt-0.5">
              {{ (props.rank !== undefined || props.percentile !== undefined) ? 'Best Language Rank' : 'No data' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Language -->
    <div class="border-surface-dimmed bg-surface-low p-4 border rounded-lg transition-all hover:shadow-sm">
      <div class="flex gap-3 items-start">
        <div class="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
          <i class="i-tabler-code text-lg" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-surface-dimmed tracking-wide font-medium uppercase">
            {{ t.dashboard.overview.topLanguage }}
          </p>
          <div v-if="loading" class="mt-1.5">
            <div class="bg-surface-dimmed rounded h-6 w-16 animate-pulse" />
            <div class="bg-surface-dimmed mt-1 rounded h-3 w-12 animate-pulse" />
          </div>
          <div v-else class="mt-1.5">
            <p class="text-on-surface text-lg leading-tight font-semibold">
              {{ props.topLanguage || '--' }}
            </p>
            <p class="text-xs text-surface-dimmed mt-0.5">
              {{ props.topLanguage ? (props.timeRangeDays ? `Last ${props.timeRangeDays} days` : 'Recent period') : 'No data' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
