<script setup lang="ts">
import { useTextCS } from '@roku-ui/vue'

defineProps<{
  title: string
  value: string | number
}>()
const textCS = useTextCS('primary')
</script>

<template>
  <div class="p-2">
    <div>
      <div
        v-bind="textCS"
        class="text-base"
      >
        {{ title }}
      </div>
      <div
        v-if="value !== ''"
        class="text-surface-on text-sm text-nowrap"
      >
        {{ value }}
      </div>
      <div
        v-else
        class="text-surface-on text-sm"
      >
        -
      </div>
    </div>
  </div>
</template>
