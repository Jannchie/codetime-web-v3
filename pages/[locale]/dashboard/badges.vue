<script setup lang="ts">
import { Select, TextField } from '@roku-ui/vue'

definePageMeta({
  layout: 'dashboard',
})
const t = useI18N()
const styleOptions = [
  { label: t.value.dashboard.badge.style.social, id: 'social' },
  { label: t.value.dashboard.badge.style.flatSquare, id: 'flat-square' },
  { label: t.value.dashboard.badge.style.flat, id: 'flat' },
  { label: t.value.dashboard.badge.style.forTheBadge, id: 'for-the-badge' },
  { label: t.value.dashboard.badge.style.plastic, id: 'plastic' },
]
const styleObj = ref(styleOptions[0])
const color = ref<string>('222')
const user = useUser()
const project = ref<{
  label: string
  id: string
} | null>(null)
const days = ref<string>('')

const link = computed(() => {
  // 使用 URLSearchParams 代替
  const res = `https://img.shields.io/endpoint?style=${styleObj.value.id}&color=${color.value}&url=https%3A%2F%2Fapi.codetime.dev%2Fshield%3Fid%3D${user.value?.id}%26project%3D${project.value?.id ?? ''}%26in=${String(Number(days.value) * 86400 * 1000)}`
  return res
})
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.badge"
    :description="t.dashboard.pageHeader.description.badge"
  />
  <DashboardPageContent>
    <BadgePreviewCard :link="link" />
    <CardBase class="flex flex-col gap-2 children:flex-grow-1 sm:flex-row">
      <Select
        v-model="styleObj"
        :options="styleOptions"
        :placeholder="t.dashboard.badge.placeholder.style"
      />
      <TextField
        v-if="styleObj.id !== 'social'"
        v-model="color"
        :placeholder="t.dashboard.badge.placeholder.color"
      />
      <!-- <TextField
        v-model="project"
        :placeholder="t.dashboard.badge.placeholder.project"
      /> -->
      <ProjectSelect
        v-model="project"
      />
      <TextField
        v-model="days"
        type="number"
        :placeholder="t.dashboard.badge.placeholder.days"
      />
    </CardBase>
    <BadgeCopyCard
      :link="link"
      class="z-1"
    />
  </DashboardPageContent>
</template>
