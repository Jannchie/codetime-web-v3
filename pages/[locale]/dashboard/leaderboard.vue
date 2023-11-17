<script setup lang="ts">
import * as d3 from 'd3'

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

    <template v-if="resp.pending.value">
      loading
    </template>
    <template v-else-if="resp.error.value">
      error
    </template>
    <template v-else-if="!resp.data.value">
      empty
    </template>
    <template v-else-if="resp.data.value">
      <div
        v-for="item, i in resp.data.value"
        :key="item.username"
        class="flex items-center gap-4 pl-2"
      >
        <div class="w-10 op75 text-right">
          #{{ i + 1 }}
        </div>
        <NuxtImg
          v-if="item.avatar"
          :src="item.avatar"
          class="w-10 h-10 rounded-full"
        />
        <i
          v-else
          class="w-10 h-10 rounded-full border border-neutral-7 bg-neutral-8 flex items-center justify-center text-neutral-7"
        />
        <div class="w-32 max-w-32">
          <div class="overflow-hidden truncate">
            {{ item.username }}
          </div>
          <div class="text-sm op75 overflow-hidden text-nowrap truncate">
            {{ getDurationString(item.minutes * 60 * 1000) }}
          </div>
        </div>
        <div class="grow-1 pr-4">
          <div class="h-0.5 bg-neutral-7 w-full">
            <div
              class="h-full bg-sky-9"
              :style="{
                width: `${item.minutes / maxMinutes * 100}%`,
              }"
            />
          </div>
        </div>
      </div>
    </template>
  </DashboardPageContent>
</template>
