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
    <div class="flex gap-2 items-center">
      <i class="i-tabler-markdown" />
      <TextField
        v-model="markdown"
        size="sm"
        readonly
        class="text-xs grow-1 children:w-full"
      />
      <RCopyBtn
        class="text-xs"
        size="sm"
        :value="markdown"
      />
    </div>
    <div class="flex gap-2 items-center">
      <i class="i-tabler-code" />
      <TextField
        v-model="html"
        size="sm"
        readonly
        class="text-xs grow-1 children:w-full"
      />
      <RCopyBtn
        class="text-xs"
        size="sm"
        :value="html"
      />
    </div>
    <div class="flex gap-2 items-center">
      <i class="i-tabler-link" />
      <TextField
        v-model="link"
        size="sm"
        readonly
        class="text-xs grow-1 children:w-full"
      />
      <RCopyBtn
        class="text-xs"
        size="sm"
        :value="link"
      />
    </div>
  </CardBase>
</template>
