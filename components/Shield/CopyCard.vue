<script setup lang="ts">
const props = defineProps<{
  link: string
}>()
const link = computed(() => props.link)
const markdown = computed(() => `[![CodeTime Badge](${link.value})](https://codetime.dev)`)
const html = computed(() => `<img href="https://codetime.dev" alt="CodeTime Badge" src="${link.value}">`)

const htmlClipboard = useClipboard({
  source: html,
})
const markdownClipboard = useClipboard({
  source: markdown,
})
const linkClipboard = useClipboard({
  source: link,
})
</script>

<template>
  <CardBase class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <i class="i-tabler-markdown" />
      <RTextField
        :value="markdown"
        class="text-xs grow-1"
      />
      <RBtn
        class="text-xs flex items-center gap-2"
        @click="markdownClipboard.copy(markdown)"
      >
        <i class="i-tabler-copy" />
        复制
      </RBtn>
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-code" />
      <RTextField
        :value="html"
        class="text-xs grow-1"
      />
      <RBtn
        class="text-xs flex items-center gap-2"
        @click="htmlClipboard.copy(html)"
      >
        <i class="i-tabler-copy" />
        复制
      </RBtn>
    </div>
    <div class="flex items-center gap-2">
      <i class="i-tabler-link" />
      <RTextField
        :value="link"
        class="text-xs grow-1"
      />
      <RBtn
        class="text-xs flex items-center gap-2"
        @click="linkClipboard.copy(link)"
      >
        <i class="i-tabler-copy" />
        复制
      </RBtn>
    </div>
  </CardBase>
</template>
