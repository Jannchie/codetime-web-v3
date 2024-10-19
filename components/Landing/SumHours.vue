<script setup lang="ts">
import { locales } from '~/i18n'

const locale = useLocale()
const data = await fetchSumMinutes()
const minutes = computed(() => {
  return data.value?.minutes ?? 0
})
const fomater = computed(() => {
  const finalLocale = locales.includes(locale.value) ? locale.value : 'en'
  return new Intl.NumberFormat(finalLocale, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
})
const t = useI18N()
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <span class="text-surface-dimmed inline-block">
      {{ t.landing.alreadyStatistical }}
    </span>
    <ClientOnly>
      <template #placeholder>
        <div class="flex items-end gap-2 text-6xl op75">
          <div
            key="a"
            class="h-60px min-w-72 animate-pulse rounded bg-neutral-5 font-bold font-mono"
          />
          <span class="text-xl">
            {{ t.landing.minutes }}
          </span>
        </div>
      </template>
      <div class="flex items-end gap-2 text-6xl op75">
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
