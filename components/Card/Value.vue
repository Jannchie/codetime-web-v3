<script setup lang="ts">
import { useTextCS } from '@roku-ui/vue'

defineProps<{
  title: string
  value: string
  unit: string
}>()

const textCS = useTextCS('primary')
</script>

<template>
  <CardBase>
    <div
      v-bind="textCS"
      class="text-sm"
    >
      {{ title }}
    </div>
    <div class="text-xl">
      {{ value }}
      <span class="text-surface-dimmed text-sm">{{ unit }}</span>
    </div>
    <div />
  </CardBase>
</template>
