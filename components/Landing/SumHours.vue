<script setup lang="ts">
const route = useRoute()
const locale = route.params.locale as string
const minutes = ref(0)
if (typeof window !== 'undefined') {
  const { minutes: m } = await fetchSumMinutes()
  minutes.value = m
}
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
        <div class="text-6xl op75">
          <span class="font-bold font-mono">
            -
          </span>
          <span class="text-xl">
            分钟
          </span>
        </div>
      </template>
      <div class="text-6xl op75">
        <span class="font-bold font-mono">
          {{ fomater.format(minutes / 60 * 997) }}
        </span>
        <span class="text-xl">
          小时
        </span>
      </div>
    </ClientOnly>
  </div>
</template>
