<script setup lang="ts">
import { Select } from '@roku-ui/vue'

const tempRef = ref('')
const searchText = refDebounced(tempRef, 300)
const { data } = await useAPIFetch<{
  project: string
  latestEventTime: number
}[]>('/search/workspace', {
  method: 'GET',
  params: {
    limit: 10,
    word: searchText,
  },
})

const options = computed(() => {
  return data.value?.map((item) => {
    return {
      label: item.project,
      id: item.project,
    }
  }) ?? []
})
const t = useI18N()
</script>

<template>
  <Select
    searchable
    :placeholder="t.dashboard.badge.placeholder.project"
    :options="options"
    @input="tempRef = $event"
  />
</template>
