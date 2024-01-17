<script setup lang="ts">
import * as d3 from 'd3'

defineProps<{
  days: number
}>()
const t = useI18N()
</script>

<template>
  <div class="ml-4 mt-8">
    <div>
      {{ t.dashboard.overview.dataRange.title(days) }}
    </div>
    <div class="text-sm text-surface-onlow">
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
