<script setup lang="ts">
const filters = inject<FilterItem[]>('filters')

watchEffect(() => {
  filters?.sort((a, b) => {
    if (a.key > b.key) {
      return 1
    }
    if (a.key < b.key) {
      return -1
    }
    return 0
  })
})
</script>

<template>
  <div
    class="relative min-h-6 flex flex-wrap gap-2 px-2 text-xs"
  >
    <TransitionGroup
      enter-from-class="opacity-0"
      enter-active-class="transition-all duration-200 ease-out"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-out absolute left-4"
      leave-to-class="opacity-0"
      move-class="transition-all duration-200 ease-out"
    >
      <DashboardFilterItem
        v-for="filter in filters"
        :key="filter.key + filter.value"
        :filter="filter"
      />
    </TransitionGroup>
  </div>
</template>
