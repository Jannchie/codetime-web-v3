<script setup lang="ts">
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
      <RTextField
        :value="markdown"
        class="text-xs grow-1"
      />
      <RCopyBtn
        class="text-xs"
        :value="markdown"
      />
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-code" />
      <RTextField
        :value="html"
        class="text-xs grow-1"
      />
      <RCopyBtn
        class="text-xs"
        :value="html"
      />
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-link" />
      <RTextField
        :value="link"
        class="text-xs grow-1"
      />
      <RCopyBtn
        class="text-xs"
        :value="link"
      />
    </div>
  </CardBase>
</template>
