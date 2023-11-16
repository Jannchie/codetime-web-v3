<script setup lang="ts">
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
    :title="t.dashboard.pageHeader.title.shield"
    :description="t.dashboard.pageHeader.description.shield"
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
        :placeholder="t.dashboard.shield.placeholder.style"
      />
      <RTextField
        v-if="style !== 'social'"
        v-model="color"
        :placeholder="t.dashboard.shield.placeholder.color"
      />
      <RTextField
        v-model="project"
        :placeholder="t.dashboard.shield.placeholder.project"
      />
      <RTextField
        v-model="days"
        type="number"
        :placeholder="t.dashboard.shield.placeholder.days"
      />
    </CardBase>
    <ShieldPreviewCard :link="link" />
    <ShieldCopyCard :link="link" />
  </DashboardPageContent>
</template>
