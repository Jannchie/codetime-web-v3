<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const props = defineProps<{
  icon: string
  title: string
  type: 'language' | 'project' | 'platform'
  filters: FilterItem[]
  days: number
}>()

const transform = computed(() => {
  switch (props.type) {
    case 'language':
      return transformTopLanguageData
    case 'platform':
      return transformTopPlatformData
  }
})
const minutes = computed(() => props.days * 24 * 60)
const { pending: loading, data: rawData, refresh } = await fetchTop(props.type, minutes, 5, props.filters, { transform: transform.value })
watch([props], () => {
  refresh()
})

const isLoading = computed(() => unref(loading) ?? false)
const data = computed(() => unref(rawData))
const filters = inject<FilterItem[]>('filters')
const maxMinutes = computed(() => {
  if (data.value === null) {
    return 0
  }
  return Math.max(...data.value.map(d => d.minutes))
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
const ani = ref()
onMounted(() => {
  nextTick(() => {
    autoAnimate(ani.value!)
  })
})
</script>

<template>
  <CardBase
    :loading="isLoading"
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
            @click="onClickItem(d.field, type)"
          >
            <div class="overflow-hidden truncate text-nowrap">
              <i
                v-if="d.icon"
                :class="d.icon"
                class="mb-0.5 mr-1 inline-block"
              />
              {{ type === 'language' ? getLanguageName(d.field) : d.field }}
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
