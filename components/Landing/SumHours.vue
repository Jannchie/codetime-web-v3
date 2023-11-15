<script setup lang="ts">
const locale = useLocale()
const data = await fetchSumMinutes()
const minutes = computed(() => {
  return data.value?.minutes ?? 0
})
const fomater = computed(() => new Intl.NumberFormat(locale.value, {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}))
</script>

<template>
  <div class="flex flex-col items-center">
    <span class="op50">
      {{ t.landing.alreadyStatistical }}
    </span>
    <ClientOnly>
      <template #placeholder>
        <div class="text-6xl op75 flex items-end gap-2">
          <div
            key="a"
            class="font-bold font-mono min-w-72 h-60px bg-neutral-8 animate-pulse rounded"
          />
          <span class="text-xl">
            {{ t.landing.minutes }}
          </span>
        </div>
      </template>
      <div class="text-6xl op75 flex items-end gap-2">
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
    </ClientOnly>
  </div>
</template>
