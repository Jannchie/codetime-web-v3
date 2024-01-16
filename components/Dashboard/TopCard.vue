<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const props = defineProps<{
  icon: string
  title: string
  data: TopData[] | null
  type: 'language' | 'project' | 'platform'
  loading: MaybeRef<boolean>
}>()

const isLoading = computed(() => unref(props.loading) ?? false)

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
const test = ref()
onMounted(() => {
  nextTick(() => {
    autoAnimate(test.value!)
  })
})
</script>

<template>
  <CardBase
    :loading="isLoading"
    style="width: -webkit-fill-available;"
    class="max-w-[calc(100vw-0.5rem)]"
  >
    <div
      ref="test"
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
        <div class="my-0.5 h-0.5 overflow-hidden rounded-xl bg-surface-low">
          <div
            class="h-full bg-primary-container"
            :style="{ width: `${d.minutes / maxMinutes * 100}%` }"
          />
        </div>
      </div>
    </div>
  </CardBase>
</template>
