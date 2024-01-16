<script setup lang="ts">
import * as d3 from 'd3'
import { Image, Paper } from '@roku-ui/vue'

definePageMeta({
  layout: 'dashboard',
})
const t = useI18N()
interface LeaderboardItem {
  username: string
  avatar: string
  minutes: number
}
const days = ref<number>(7)
const resp = await useAPIFetch<LeaderboardItem[]>('/leaderboard', {
  method: 'GET',
  query: {
    days,
  },
  credentials: 'include',
})

const maxMinutes = computed(() => {
  if (!resp.data.value) {
    return 0
  }
  return Math.max(...resp.data.value.map(item => item.minutes))
})

const fromDate = d3.utcDay.offset(new Date(), -days.value)
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.leaderboard"
    :description="t.dashboard.pageHeader.description.leaderboard"
  />
  <DashboardPageContent>
    <div class="pl-6">
      <div class="text-xl op75">
        {{ t.dashboard.leaderboard.title(days) }}
      </div>
      <div class="op50">
        {{ fromDate.toISOString().slice(0, 10) }} ~ {{ new Date().toISOString().slice(0, 10) }}
      </div>
    </div>

    <template v-if="resp.pending.value" />
    <template v-else-if="resp.error.value" />
    <template v-else-if="!resp.data.value" />
    <template v-else-if="resp.data.value">
      <Paper
        class="flex flex-col gap-6"
        rounded="1rem"
        with-border
      >
        <div
          v-for="item, i in resp.data.value"
          :key="item.username"
          class="flex items-center gap-4 pl-2"
        >
          <div class="w-10 text-right text-lg op75">
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
            <div v-else>
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
          <div class="grow-1 pr-4">
            <div
              v-if="i !== 0"
              class="text-right text-xs text-primary-container sm:text-sm"
            >
              {{ t.dashboard.leaderboard.delta(getDurationString(60 * 1000 * (-item.minutes + resp.data.value[i - 1].minutes))) }}
            </div>
            <div class="h-0.5 w-full bg-surface-lowest">
              <div
                class="h-full bg-primary-container"
                :style="{
                  width: `${item.minutes / maxMinutes * 100}%`,
                }"
              />
            </div>
          </div>
        </div>
      </Paper>
    </template>
  </DashboardPageContent>
</template>
