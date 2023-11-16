<script setup lang="ts">
import * as d3 from 'd3'

defineProps<{
  days: number
}>()
const t = useI18N()
</script>

<template>
  <div class="mt-8 ml-4">
    <div>
      {{ t.dashboard.overview.dataRange.title(days) }}
    </div>
    <div class="text-sm op50">
      <span>
        {{ d3.timeFormat('%Y-%m-%d')(new Date()) }}
      </span>
      <span> ~ </span>
      <span>
        {{ d3.timeFormat('%Y-%m-%d')(new Date(Date.now() - days * 24 * 60 * 60 * 1000)) }}
      </span>
    </div>
  </div>
</template>
