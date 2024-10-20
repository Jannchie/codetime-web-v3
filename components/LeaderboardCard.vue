<script setup lang="ts">
import { Avatar, Paper } from '@roku-ui/vue'
import * as d3 from 'd3'

const props = defineProps<{
  days: number
}>()
const days = computed(() => props.days)
interface LeaderboardItem {
  username: string
  avatar: string
  minutes: number
}
const t = useI18N()
const resp = await useAPIFetch<LeaderboardItem[]>('/leaderboard', {
  method: 'GET',
  query: {
    days,
  },
  credentials: 'include',
})

const fromDate = d3.utcDay.offset(new Date(), -days.value)
</script>

<template>
  <div class="mb-4 pl-5">
    <div class="text-base">
      {{ t.dashboard.leaderboard.title(days) }}
    </div>
    <div class="text-sm text-surface-dimmed">
      {{ fromDate.toISOString().slice(0, 10) }} ~ {{ new Date().toISOString().slice(0, 10) }}
    </div>
  </div>
  <template v-if="resp.status.value === 'pending'" />
  <template v-else-if="resp.error.value" />
  <template v-else-if="resp.data.value">
    <Paper
      with-border
      class="w-full flex flex-col gap-6 rounded-2xl"
    >
      <div
        v-for="item, i in resp.data.value"
        :key="item.username"
        class="flex items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <div class="w-8 text-center">
            <i
              v-if="i === 0"
              class="i-fluent-emoji-flat-1st-place-medal h-6 w-6"
            />
            <i
              v-else-if="i === 1"
              class="i-fluent-emoji-flat-2nd-place-medal h-6 w-6"
            />
            <i
              v-else-if="i === 2"
              class="i-fluent-emoji-flat-3rd-place-medal h-6 w-6"
            />
            <div v-else-if="i === 32">
              -
            </div>
            <div
              v-else
              class="text-sm"
            >
              #{{ i + 1 }}
            </div>
          </div>
          <Avatar
            :src="item.avatar"
            :size="2.25"
            :name="item.username"
            class="h-40px w-40px rounded-full"
          />
          <div class="max-w-32 w-32">
            <div class="overflow-hidden truncate text-sm">
              {{ item.username }}
            </div>
            <div class="overflow-hidden truncate text-nowrap text-xs op75">
              {{ getDurationString(item.minutes * 60 * 1000) }}
            </div>
          </div>
        </div>

        <div class="pr-4">
          <div class="overflow-hidden truncate text-nowrap text-surface-dimmed">
            {{ `${(((item.minutes * 60 * 1000) / (days * 60 * 24 * 60 * 1000) * 100)).toFixed(2)}%` }}
          </div>
        </div>
      </div>
    </Paper>
  </template>
</template>
