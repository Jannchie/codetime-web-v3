<script setup lang="ts">
type StatsOverviewProps = {
  totalMinutes: number
  rank?: number
  percentile?: number
  activeDays: number
  loading?: boolean
}

const props = withDefaults(defineProps<StatsOverviewProps>(), {
  loading: false,
  rank: undefined,
  percentile: undefined,
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
  return 'N/A'
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
            {{ t.dashboard.overview.total.time }}
          </p>
          <div v-if="loading" class="mt-1.5">
            <div class="bg-surface-dimmed rounded h-6 w-20 animate-pulse" />
            <div class="bg-surface-dimmed mt-1 rounded h-3 w-12 animate-pulse" />
          </div>
          <div v-else class="mt-1.5">
            <p class="text-on-surface text-lg leading-tight font-semibold">
              {{ formattedDuration }}
            </p>
            <p class="text-xs text-surface-dimmed mt-0.5">
              {{ totalHours.toLocaleString() }} {{ t.dashboard.overview.hours }}
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
              Global Ranking
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Days -->
    <div class="border-surface-dimmed bg-surface-low p-4 border rounded-lg transition-all hover:shadow-sm">
      <div class="flex gap-3 items-start">
        <div class="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
          <i class="i-tabler-calendar-stats text-lg" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-surface-dimmed tracking-wide font-medium uppercase">
            {{ t.dashboard.overview.active.days }}
          </p>
          <div v-if="loading" class="mt-1.5">
            <div class="bg-surface-dimmed rounded h-6 w-12 animate-pulse" />
            <div class="bg-surface-dimmed mt-1 rounded h-3 w-16 animate-pulse" />
          </div>
          <div v-else class="mt-1.5">
            <p class="text-on-surface text-lg leading-tight font-semibold">
              {{ activeDays }}
            </p>
            <p class="text-xs text-surface-dimmed mt-0.5">
              Days this year
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
