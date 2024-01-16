<script setup lang="ts">
import { TextField } from '@roku-ui/vue'

const props = defineProps<{
  link: string
}>()
const link = computed(() => props.link)
const markdown = computed(() => `[![CodeTime Badge](${link.value})](https://codetime.dev)`)
const html = computed(() => `<img href="https://codetime.dev" alt="CodeTime Badge" src="${link.value}">`)
</script>

<template>
  <CardBase class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <i class="i-tabler-markdown" />
      <TextField
        size="sm"
        :value="markdown"
        class="grow-1 text-xs"
      />
      <RCopyBtn
        class="text-xs"
        :value="markdown"
      />
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-code" />
      <TextField
        size="sm"
        :value="html"
        class="grow-1 text-xs"
      />
      <RCopyBtn
        class="text-xs"
        :value="html"
      />
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-link" />
      <TextField
        size="sm"
        :value="link"
        class="grow-1 text-xs"
      />
      <RCopyBtn
        class="text-xs"
        :value="link"
      />
    </div>
  </CardBase>
</template>
