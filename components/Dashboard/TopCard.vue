<script setup lang="ts">
import type { TopData } from '~/utils'

const props = defineProps<{
  icon: string
  title: string
  data: TopData[] | null
}>()

const maxMinutes = computed(() => {
  if (props.data === null) {
    return 0
  }
  return Math.max(...props.data.map(d => d.minutes))
})
</script>

<template>
  <CardBase class="p-4 max-w-[calc(100vw-0.5rem)]">
    <div class="flex flex-col gap-2">
      <div class="text-lg flex items-center gap-2">
        <i :class="icon" />
        <div>
          {{ title }}
        </div>
      </div>
      <template
        v-if="data !== null"
      >
        <div
          v-for="d in data"
          :key="d.field"
        >
          <div
            class="flex op75 justify-between gap-2 text-sm"
          >
            <div class="overflow-hidden truncate text-nowrap">
              <i
                v-if="d.icon"
                :class="d.icon"
                class="mr-1 inline-block mb-0.5"
              />
              {{ d.field }}
            </div>
            <div class="flex-shrink-0">
              {{ getDurationString(d.minutes * 60 * 1000) }}
            </div>
          </div>
          <div class="h-0.5 bg-neutral-8">
            <div
              class="h-full bg-sky-7"
              :style="{ width: `${d.minutes / maxMinutes * 100}%` }"
            />
          </div>
        </div>
      </template>
      <template
        v-else
      >
        Loading...
      </template>
    </div>
  </CardBase>
</template>
