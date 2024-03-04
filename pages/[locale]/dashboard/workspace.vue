<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
const t = useI18N()
const route = useRoute()
const project = ref<{
  label: string
  id: string
} | null>(route.query.project
  ? {
      label: route.query.project as string,
      id: route.query.project as string,
    }
  : null)
const router = useRouter()
const projectName = computed(() => {
  return project.value?.label
})
watch(project, (newVal) => {
  if (newVal) {
    router.push({
      query: {
        project: newVal.id,
      },
    })
  }
})

const user = useUser()

const days = ref(user.value?.plan === 'pro' ? 365 * 100 : 28)

const { data, pending } = await useAPIFetch<{
  language: string
  relativeFile: string
  createdAt: string
}[]>('/workspace', {
  method: 'GET',
  params: {
    project: projectName,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    days,
  },
})

const height = 26
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.workspace"
    :description="t.dashboard.pageHeader.description.workspace"
  />
  <DashboardPageContent>
    <DashboardDataRange v-model:days="days" />
    <CardBase>
      <ProjectSelect v-model="project" />
    </CardBase>
    <CardBase
      :loading="pending"
      class="relative min-h-64"
    >
      <div class="mb-4 text-xl">
        {{ t.dashboard.workspace.flameGraph.title }}
      </div>
      <DashboardFlameChart
        :line-height="height"
        :data="data"
      />
    </CardBase>

    <!-- <CardBase
      :loading="pending"
    >
      <div class="mb-4 text-xl">
        {{ t.dashboard.workspace.fileList.title }}
      </div>
      <div
        v-for="node in basicFlameNodes"
        :key="node.path"
        class="text-sm font-mono"
      >
        <div
          :style="{
            paddingLeft: `${node.depth * 8}px`,
          }"
        >
          {{ node.name }} ( {{ getDurationString(node.value * 60 * 1000) }}) {{ ((node.end - node.start) * 100).toFixed(1) }}%
        </div>
      </div>
    </CardBase> -->
  </DashboardPageContent>
</template>
