<script setup lang="ts">
import { Select, TextField } from '@roku-ui/vue'

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
const t = useI18N()
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
        v-model="style"
        :options="[
          { label: t.dashboard.badge.style.social, id: 'social' },
          { label: t.dashboard.badge.style.flatSquare, id: 'flat-square' },
          { label: t.dashboard.badge.style.flat, id: 'flat' },
          { label: t.dashboard.badge.style.forTheBadge, id: 'for-the-badge' },
          { label: t.dashboard.badge.style.plastic, id: 'plastic' },
        ]"
        :placeholder="t.dashboard.badge.placeholder.style"
      />
      <TextField
        v-if="style !== 'social'"
        v-model="color"
        :placeholder="t.dashboard.badge.placeholder.color"
      />
      <TextField
        v-model="project"
        :placeholder="t.dashboard.badge.placeholder.project"
      />
      <TextField
        v-model="days"
        type="number"
        :placeholder="t.dashboard.badge.placeholder.days"
      />
    </CardBase>
    <BadgeCopyCard :link="link" />
  </DashboardPageContent>
</template>
