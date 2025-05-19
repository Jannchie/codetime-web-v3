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
const language = ref<string>('')
const days = ref<string>('')
const apiHost = 'https://api.codetime.dev'

// 收集 link 依赖的 params
const rawParams = computed(() => ({
  uid: user.value?.id,
  project: project.value?.id,
  minutes: String(Number(days.value) * 24 * 60),
  color: color.value,
  style: styleObj.value.id,
  language: language.value,
}))

// 对 params 做防抖
const debouncedParams = refDebounced(rawParams, 300)

// link 只依赖防抖后的 params
const link = computed(() => {
  const params = debouncedParams.value

  // Remove null or undefined values from params and convert all values to strings
  const filteredParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key, value]) => value !== null && value !== undefined && value !== '' && key !== 'style' && key !== 'color' && value !== '0')
      .map(([key, value]) => [key, String(value)]),
  )
  const queryString = new URLSearchParams(filteredParams).toString()
  const url = `${apiHost}/v3/users/shield?${queryString}`
  const safeUrl = encodeURIComponent(url)
  const res = `https://img.shields.io/endpoint?style=${params.style}&color=${params.color}&url=${safeUrl}`
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
      <TextField
        v-model="language"
        :placeholder="t.dashboard.badge.placeholder.language"
      />
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
