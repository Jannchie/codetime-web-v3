<script setup lang="ts">
import * as d3 from 'd3'
import { Image, Paper } from '@roku-ui/vue'

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
  <div class="mb-4 pl-6">
    <div class="text-surface-onlow text-xl">
      {{ t.dashboard.leaderboard.title(days) }}
    </div>
    <div class="text-surface-onlow">
      {{ fromDate.toISOString().slice(0, 10) }} ~ {{ new Date().toISOString().slice(0, 10) }}
    </div>
  </div>
  <template v-if="resp.pending.value">
    <Paper
      class="max-w-358px flex flex-col gap-6 border-transparent rounded-2xl"
      rounded="1rem"
    >
      <div
        v-for="_, i in 32"
        :key="i"
        class="flex items-center justify-between gap-4 pl-2"
      >
        <div class="flex items-center gap-2">
          <div class="w-12 text-center">
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
              class="text-surface-onlow"
            >
              # {{ i + 1 }}
            </div>
          </div>
          <Image
            width="40px"
            height="40px"
            class="h-10 w-10 animate-pulse rounded-full bg-surface-on-low op50"
          />
          <div class="max-w-32 w-32">
            <div class="my-1 h-[16px] w-16 animate-pulse overflow-hidden truncate bg-surface-on-low op50" />
            <div class="h-[14px] w-32 animate-pulse overflow-hidden truncate bg-surface-on-low text-nowrap text-xs op50" />
          </div>
        </div>

        <div class="pr-4">
          <div class="text-surface-onlow w-32 animate-pulse overflow-hidden truncate bg-surface-on-low text-nowrap op50" />
        </div>
      </div>
    </Paper>
  </template>
  <template v-else-if="resp.error.value" />
  <template v-else-if="!resp.data.value" />
  <template v-else-if="resp.data.value">
    <Paper
      class="flex flex-col gap-6 rounded-2xl"
      rounded="1rem"
    >
      <div
        v-for="item, i in resp.data.value"
        :key="item.username"
        class="flex items-center justify-between gap-4 pl-2"
      >
        <div class="flex items-center gap-2">
          <div class="w-12 text-center">
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
          <Image
            width="40px"
            height="40px"
            :src="item.avatar"
            class="h-10 w-10 rounded-full"
          />
          <div class="max-w-32 w-32">
            <div class="overflow-hidden truncate">
              {{ item.username }}
            </div>
            <div class="overflow-hidden truncate text-nowrap text-xs op75">
              {{ getDurationString(item.minutes * 60 * 1000) }}
            </div>
          </div>
        </div>

        <div class="pr-4">
          <div class="text-surface-onlow overflow-hidden truncate text-nowrap">
            {{ `${(((item.minutes * 60 * 1000) / (days * 60 * 24 * 60 * 1000) * 100)).toFixed(2)}%` }}
          </div>
        </div>
      </div>
    </Paper>
  </template>
</template>
