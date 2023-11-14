<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'dashboard',
})

const style = ref<string>('social')
const color = ref<string>('222')
const user = useUser()
const project = ref<string>('')
const days = ref<string>('')

const link = computed(() => {
  // 使用 URLSearchParams 代替
  const res = `https://img.shields.io/endpoint?style=${style.value}&color=${color.value}&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D${user.value?.id}%26project%3D${project.value}%26in=${String(Number(days.value) * 86400 * 1000)}`
  return res
})
</script>

<template>
  <DashboardPageTitle
    title="徽章"
    description="在你的项目中用简明、一致、清晰的徽章展示你的编程时间。"
  />
  <DashboardPageContent>
    <CardBase class="flex children:flex-grow-1 gap-2">
      <RSelect
        v-model="style"
        :options="[
          { label: 'social', id: 'social' },
          { label: 'flat-square', id: 'flat-square' },
          { label: 'flat', id: 'flat' },
          { label: 'For the Badge', id: 'for-the-badge' },
          { label: 'Plastic', id: 'plastic' },
        ]"
        placeholder="样式"
      />
      <RTextField
        v-if="style !== 'social'"
        v-model="color"
        placeholder="颜色"
      />
      <RTextField
        v-model="project"
        placeholder="项目"
      />
      <RTextField
        v-model="days"
        placeholder="天数"
        type="number"
      />
    </CardBase>
    <ShieldPreviewCard :link="link" />
    <ShieldCopyCard :link="link" />
  </DashboardPageContent>
</template>
