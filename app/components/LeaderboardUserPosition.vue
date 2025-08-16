<script setup lang="ts">
import { Avatar, Paper } from '@roku-ui/vue'
import { v3GetSelfOverallRank, v3GetUserSelf } from '~/api/v3'

const props = defineProps<{
  days: number
}>()

const userRankData = useAsyncData(`user-rank-${props.days}`, async () => {
  try {
    const result = await v3GetSelfOverallRank({
      query: {
        days: props.days,
      },
    })
    return result.data
  }
 catch (error) {
    console.error('Failed to fetch user rank:', error)
    return null
  }
}, {
  server: false,
  watch: [() => props.days],
})

const userSelfData = useAsyncData('user-self', async () => {
  try {
    const result = await v3GetUserSelf()
    return result.data
  }
 catch (error) {
    console.error('Failed to fetch user self:', error)
    return null
  }
}, {
  server: false,
})

const userDisplayRank = computed(() => {
  if (!userRankData.data.value) {
    return null
  }

  const percentile = userRankData.data.value.percentile

  // 如果在后90%，显示 >90%
  if (percentile > 0.9) {
    return '>90%'
  }

  // 如果在前1%，显示小数点，否则显示整数百分比
  return percentile <= 0.01
    ? `Top ${(percentile * 100).toFixed(1)}%`
    : `Top ${(percentile * 100).toFixed(0)}%`
})

const formattedDuration = computed(() => {
  if (!userRankData.data.value) {
    return '--'
  }
  return getDurationString(userRankData.data.value.totalMinutes * 60 * 1000)
})

const userPercentage = computed(() => {
  if (!userRankData.data.value) {
    return '--'
  }
  const percentage = ((userRankData.data.value.totalMinutes * 60 * 1000) / (props.days * 24 * 60 * 60 * 1000) * 100)
  return `${percentage.toFixed(2)}%`
})

const locale = useLocale()

function navigateToUser() {
  if (userSelfData.data.value?.id) {
    navigateTo(`/${locale.value}/user/${userSelfData.data.value.id}`)
  }
}
</script>

<template>
  <template v-if="userRankData.status.value === 'pending'">
    <Paper
      no-padding
      class="mb-4 p-2 border rounded-2xl"
    >
      <div class="p-2 rounded-xl flex gap-4 items-center justify-between">
        <div class="flex gap-2 items-center">
          <div class="rounded bg-surface-variant-1 h-4 w-8 animate-pulse" />
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
    </Paper>
  </template>
  <Paper
    v-else-if="userRankData.data.value"
    no-padding
    class="mb-4 p-2 border rounded-2xl cursor-pointer transition-colors"
    @click="navigateToUser"
  >
    <div class="p-2 rounded-xl flex gap-4 items-center justify-between hover:bg-surface-variant-2">
      <div class="flex gap-2 items-center">
        <div class="text-center w-8">
          <div class="text-xs text-primary font-medium">
            {{ userDisplayRank }}
          </div>
        </div>
        <Avatar
          :src="userSelfData.data.value?.avatar ?? ''"
          :size="2.25"
          :name="userRankData.data.value.username"
          class="rounded-full h-40px w-40px"
        />
        <div class="max-w-32 w-32">
          <div class="text-sm font-medium truncate overflow-hidden">
            {{ userRankData.data.value.username }}
          </div>
          <div class="text-xs op75 text-nowrap truncate overflow-hidden">
            {{ formattedDuration }}
          </div>
        </div>
      </div>

      <div class="pr-4">
        <div class="text-surface-dimmed text-nowrap truncate overflow-hidden">
          {{ userPercentage }}
        </div>
      </div>
    </div>
  </Paper>
</template>
