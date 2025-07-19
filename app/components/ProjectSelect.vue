<script setup lang="ts">
import { Select } from '@roku-ui/vue'
import { v3SearchWorkspaces } from '~/api/v3'

const tempRef = ref('')
const searchText = refDebounced(tempRef, 300)
const { data } = await useAsyncData(async () => {
  if (!searchText.value) {
    return null
  }
  const resp = await v3SearchWorkspaces({
    query: {
      limit: 10,
      q: searchText.value,
    },
  })
  return resp.data
}, {
  server: false,
  watch: [searchText],
})

const options = computed(() => {
  return data.value?.results.map((item) => {
    return {
      label: item.workspaceName,
      id: item.workspaceName,
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
    :filter="() => true"
    :none-text="t.dashboard.projectSelector.noneText"
    @input="tempRef = $event"
  />
</template>
