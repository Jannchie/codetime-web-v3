<script setup lang="ts">
const props = defineProps<{
  filter: {
    key: string
    value: string
  }
}>()
const t = useI18N()

const filters = inject<FilterItem[]>('filters')

function onClickFilterItem(key: string, value: string) {
  if (filters) {
    const filter = {
      value,
      key,
    }
    if (filters.some(f => f.key === key && f.value === value)) {
      filters.splice(filters.findIndex(f => f.key === key && f.value === value), 1)
    }
    else {
      filters.push(filter)
    }
  }
}
const k = computed(() => {
  switch (props.filter.key) {
    case 'language': {
      return t.value.dashboard.overview.top.language
    }
    case 'project': {
      return t.value.dashboard.overview.top.project
    }
    case 'platform': {
      return t.value.dashboard.overview.top.platform
    }
    default: {
      return props.filter.key
    }
  }
})

const filterItemRef = ref<HTMLSpanElement | null>(null)
const pos = ref({ x: 0, y: 0 })
watchEffect(() => {
  pos.value.x = filterItemRef.value?.offsetLeft ?? 0
  pos.value.y = filterItemRef.value?.offsetTop ?? 0
})

const observer = new MutationObserver(() => {
  pos.value.x = filterItemRef.value?.offsetLeft ?? 0
  pos.value.y = filterItemRef.value?.offsetTop ?? 0
})

onMounted(() => {
  nextTick(() => {
    const targetElement = filterItemRef.value!
    const config = { attributes: true, childList: true, subtree: true }
    observer.observe(targetElement, config)
  })
})
onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <span
    ref="filterItemRef"
    :key="filter.key + filter.value"
    :style="{
      top: `${pos.y}px`,
      left: `${pos.x}px`,
    }"
    class="flex items-center gap-2 rounded-full bg-primary px-2 py-1 text-white"
  >
    <div>
      {{ k }}: {{ filter.key === 'language' ? getLanguageName(filter.value) : filter.value }}
    </div>
    <button
      class="bg-transparent leading-0"
      @click="onClickFilterItem(filter.key, filter.value)"
    >
      <i
        class="i-tabler-x h-4 w-4"
      />
    </button>
  </span>
</template>
