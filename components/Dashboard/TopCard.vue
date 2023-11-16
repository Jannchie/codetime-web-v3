<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  data: TopData[] | null
  type: 'language' | 'project' | 'platform'
}>()

const filters = inject<FilterItem[]>('filters')
const maxMinutes = computed(() => {
  if (props.data === null) {
    return 0
  }
  return Math.max(...props.data.map(d => d.minutes))
})

function onClickItem(field: string, type: 'language' | 'project' | 'platform') {
  if (filters) {
    const filter = {
      value: field,
      key: type,
    }
    if (!filters.find(f => f.key === type && f.value === field)) {
      filters.push(filter)
    }
    else {
      filters.splice(filters.findIndex(f => f.key === type && f.value === field), 1)
    }
  }
}
</script>

<template>
  <CardBase class="max-w-[calc(100vw-0.5rem)]">
    <div class="flex flex-col gap-2">
      <div class="text-lg flex items-center gap-2">
        <i :class="icon" />
        <div>
          {{ title }}
        </div>
      </div>
      <div
        v-for="d in data"
        :key="d.field"
      >
        <div
          class="flex op75 justify-between gap-2 text-sm cursor-pointer"
          :class="filters?.find(f => f.key === type && f.value === d.field) ? 'text-sky-4' : ''"
          @click="onClickItem(d.field, type)"
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
        <div class="h-0.5 my-0.5 bg-neutral-8 rounded-xl overflow-hidden">
          <div
            class="h-full bg-sky-7"
            :style="{ width: `${d.minutes / maxMinutes * 100}%` }"
          />
        </div>
      </div>
    </div>
  </CardBase>
</template>
