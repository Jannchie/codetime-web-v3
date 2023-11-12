<script setup lang="ts">
const route = useRoute()
const locale = route.params.locale as string
const data = await fetchSumMinutes()
const minutes = computed(() => {
  return data.value?.minutes ?? 0
})
const fomater = new Intl.NumberFormat(locale, {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})
</script>

<template>
  <div class="flex flex-col items-center">
    <span class="op50">
      已统计编程时间
    </span>
    <ClientOnly>
      <template #placeholder>
        <div class="text-6xl op75 flex items-end gap-2">
          <div
            key="a"
            class="font-bold font-mono min-w-72 h-60px bg-neutral-8 animate-pulse rounded"
          />
          <span class="text-xl">
            分钟
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
          分钟
        </span>
      </div>
    </ClientOnly>
  </div>
</template>
