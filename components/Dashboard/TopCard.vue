<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string
  title: string
  type: 'language' | 'project' | 'platform'
  filters?: FilterItem[]
  days: number
}>(), {
  filters: () => [],
})

const transform = computed(() => {
  switch (props.type) {
    case 'language':
      return transformTopLanguageData
    case 'platform':
      return transformTopPlatformData
  }
})
const minutes = computed(() => props.days * 24 * 60)

const { pending: loading, data: rawData } = await fetchTop(props.type, minutes, 5, props.filters, { transform: transform.value })

const isLoading = computed(() => unref(loading) ?? false)
const data = computed(() => unref(rawData))
const filters = inject<FilterItem[]>('filters')

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
  <DashboardTopCardTemplate
    :loading="isLoading"
    :data="data"
    :icon="icon"
    :title="title"
    :filters="filters"
    :type="type"
    @click-item="onClickItem"
  />
</template>
