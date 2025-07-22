<script setup lang="ts">
import { v3GetTotalMinutes } from '~/api/v3'
import { locales } from '~/i18n'

const locale = useLocale()
const { data, status } = await useAsyncData(async () => {
  const { data } = await v3GetTotalMinutes()
  return data
}, { server: false })

// Simple seeded random number generator for consistent noise across windows
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10_000
  return x - Math.floor(x)
}

// Dynamic minutes calculation based on cache timestamp and current time
const currentTime = ref(Date.now())
const minutes = computed(() => {
  if (!data.value) {
    return 0
  }

  const { totalMinutes, last24HMinutes, cacheTimestamp } = data.value
  const cacheTime = new Date(cacheTimestamp).getTime()
  const elapsedMs = currentTime.value - cacheTime
  const elapsedMinutes = elapsedMs / (1000 * 60)

  // Calculate average coding rate from last 24 hours
  const averageRatePerMinute = last24HMinutes / (24 * 60)

  // Estimate additional minutes since cache time
  const estimatedAdditionalMinutes = Math.max(0, elapsedMinutes * averageRatePerMinute)

  // Add consistent noise that's the same across all windows and time
  // Use totalMinutes as seed for consistent noise based on data, not time
  const noise = seededRandom(totalMinutes) * 2 - 1 // Random between -1 and 1
  const noiseAmount = Math.abs(noise) * Math.min(5, totalMinutes * 0.001) // Scale noise based on total minutes

  const finalMinutes = totalMinutes + estimatedAdditionalMinutes + (noise > 0 ? noiseAmount : -noiseAmount)

  return Math.round(Math.max(0, finalMinutes))
})

const fomater = computed(() => {
  const finalLocale = locales.includes(locale.value) ? locale.value : 'en'
  return new Intl.NumberFormat(finalLocale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
})

// Update current time every 0.2 seconds for smooth real-time growth
onMounted(() => {
  const interval = setInterval(() => {
    currentTime.value = Date.now()
  }, 200) // Update every 0.2 seconds

  onUnmounted(() => {
    clearInterval(interval)
  })
})

const t = useI18N()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <span class="inline-block text-surface-dimmed">
      {{ t.landing.alreadyStatistical }}
    </span>
    <div v-if="status === 'success'" class="flex items-end gap-2 text-6xl op75">
      <span
        key="b"
        class="font-bold font-mono"
      >
        {{ fomater.format(minutes) }}
      </span>
      <span class="text-xl">
        {{ t.landing.minutes }}
      </span>
    </div>
    <div v-else class="flex items-end gap-2 text-6xl op75">
      <div
        key="a"
        class="h-60px min-w-72 animate-pulse rounded bg-neutral-5 font-bold font-mono"
      />
      <span class="text-xl">
        {{ t.landing.minutes }}
      </span>
    </div>
  </div>
</template>
