<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'dashboard',
})

const style = ref<string>('social')
const color = ref<string>('')
const user = useUser()
const project = ref<string>('')
const days = ref<number>(0)
const link = computed(() => {
  // 使用 URLSearchParams 代替
  const params = new URLSearchParams({
    id: user.value?.id.toString() ?? '',
    project: project.value,
    in: (days.value * 86400000).toString(),
    color: color.value,
    style: style.value,
  })
  const url = new URL(`https://img.shields.io/endpoint?${params.toString()}`)
  const res = `${url.toString()}&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D2%26`
  return res
})

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
  <DashboardPageTitle
    title="徽章"
    description="在你的项目中用简明、一致、清晰的徽章展示你的编程时间。"
  />
  <DashboardPageContent>
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        预览
      </div>
      <div class="flex items-center justify-center h-32">
        <NuxtImg
          placeholder
          :src="link"
          class="h-8"
          alt="CodeTime Badge"
        />
      </div>
    </CardBase>
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
  </DashboardPageContent>
</template>
