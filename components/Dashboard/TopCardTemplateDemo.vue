<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const props = withDefaults(defineProps<{
  loading: boolean
  data: TopData[] | null
  icon: string
  title: string
  filters?: FilterItem[]
  type: 'language' | 'project' | 'platform'
}>(), {
  filters: () => [],
})
defineEmits<{
  clickItem: [field: string, type: 'language' | 'project' | 'platform']
}>()
const ani = ref()
const maxMinutes = computed(() => {
  if (props.data === null) {
    return 0
  }
  return Math.max(...props.data.map(d => d.minutes))
})
</script>

<template>
  <CardBase
    :loading="loading"
    style="width: -webkit-fill-available;"
    class="h-232px max-w-[calc(100vw-0.5rem)]"
  >
    <div
      ref="ani"
      class="flex flex-col gap-2"
    >
      <div class="flex items-center gap-2">
        <i
          :class="icon"
        />
        <div class="text-lg">
          {{ title }}
        </div>
      </div>
      <template v-if="loading && !data">
        <div
          v-for="i in 5"
          :key="i"
          class="flex justify-between py-1"
          :style="{
            opacity: 0.5 + 0.5 * (-i / 5),
          }"
        >
          <div class="flex gap-1">
            <div
              class="h-20px w-20px animate-pulse bg-surface-onlow"
            />
            <div
              class="h-20px w-20 animate-pulse bg-surface-onlow"
            />
          </div>
          <div
            class="h-20px w-30 animate-pulse bg-surface-onlow"
          />
        </div>
      </template>
      <template v-else>
        <div
          v-for="d in data"
          :key="d.field"
        >
          <div
            class="flex cursor-pointer justify-between gap-2 text-sm"
            :class="filters?.find(f => f.key === type && f.value === d.field) ? 'text-primary-container' : ''"
            @click="$emit('clickItem', d.field, type)"
          >
            <div class="overflow-hidden truncate text-nowrap">
              <i
                v-if="d.icon"
                :class="d.icon"
                class="mb-0.5 mr-1 inline-block"
              />
              {{ d.field }}
            </div>
            <div class="flex-shrink-0">
              {{ getDurationString(d.minutes * 60 * 1000) }}
            </div>
          </div>
          <div class="my-0.5 h-0.5 overflow-hidden rounded-xl bg-surface-lowest">
            <div
              class="h-full bg-primary-container"
              :style="{ width: `${d.minutes / maxMinutes * 100}%` }"
            />
          </div>
        </div>
      </template>
    </div>
  </CardBase>
</template>
