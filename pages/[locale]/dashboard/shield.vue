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
    <ShieldCopyCard :link="link" />
  </DashboardPageContent>
</template>
