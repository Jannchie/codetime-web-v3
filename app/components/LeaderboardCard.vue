<script setup lang="ts">
import { Avatar, Paper } from '@roku-ui/vue'
import * as d3 from 'd3'
import { v3GetLeaderboard } from '~/api/v3'

const props = defineProps<{
  days: number
}>()
const days = computed(() => props.days)
const t = useI18N()
const resp = useAsyncData(`leaderboard-${days.value}`, async () => {
  const result = await v3GetLeaderboard({
    query: {
      days: days.value,
    },
  })
  return result.data?.entries?.map(entry => ({
    username: entry.user.username,
    avatar: entry.user.avatar,
    minutes: entry.totalMinutes,
  })) ?? []
}, {
  server: false,
  watch: [days],
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

  <Paper
    class="rounded-2xl flex flex-col gap-6 h-full w-full"
  >
    <template v-if="resp.status.value === 'pending'">
      <div v-for="i in 20" :key="i" class="flex gap-4 items-center justify-between">
        <div class="flex gap-2 items-center">
          <div class="rounded bg-surface-variant-1 h-6 w-8 animate-pulse" />
          <div class="rounded-full bg-surface-variant-1 h-10 w-10 animate-pulse" />
          <div class="w-32">
            <div class="mb-1 rounded bg-surface-variant-1 h-4 w-20 animate-pulse" />
            <div class="rounded bg-surface-variant-1 h-3 w-16 animate-pulse" />
          </div>
        </div>
        <div class="pr-4">
          <div class="rounded bg-surface-variant-1 h-4 w-12 animate-pulse" />
        </div>
      </div>
    </template>
    <template v-else-if="resp.data.value">
      <div
        v-for="item, i in resp.data.value"
        :key="item.username"
        class="flex gap-4 items-center justify-between"
      >
        <div class="flex gap-2 items-center">
          <div class="text-center w-8">
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
            :src="item.avatar ?? ''"
            :size="2.25"
            :name="item.username"
            class="rounded-full h-40px w-40px"
          />
          <div class="max-w-32 w-32">
            <div class="text-sm truncate overflow-hidden">
              {{ item.username }}
            </div>
            <div class="text-xs op75 text-nowrap truncate overflow-hidden">
              {{ getDurationString(item.minutes * 60 * 1000) }}
            </div>
          </div>
        </div>

        <div class="pr-4">
          <div class="text-surface-dimmed text-nowrap truncate overflow-hidden">
            {{ `${(((item.minutes * 60 * 1000) / (days * 60 * 24 * 60 * 1000) * 100)).toFixed(2)}%` }}
          </div>
        </div>
      </div>
    </template>
  </Paper>
</template>
