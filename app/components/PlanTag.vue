<script setup lang="ts">
import { Tag } from '@roku-ui/vue'

defineProps<{
  plan: string
}>()
</script>

<template>
  <Tag
    :color="plan === 'pro' ? '#a855f7' : 'gray'"
    variant="light"
    size="sm"
    class="font-mono uppercase"
  >
    {{ plan }}
  </Tag>
</template>
