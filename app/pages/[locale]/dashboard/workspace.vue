<script setup lang="ts">
import { Btn } from '@roku-ui/vue'
import { v3GetWorkspaceFiles } from '~/api/v3'

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

const workspaceLRU = useLRU<string>('workspace-select', 5)

const historyWorkspaceNameList = computed(() => {
  return workspaceLRU.values.value
})

watch(project, (newVal) => {
  if (newVal) {
    workspaceLRU.set(newVal.id, newVal.label)
    router.push({
      query: {
        project: newVal.id,
      },
    })
  }
})

const user = useUser()

const days = ref(user.value?.plan === 'pro' ? 365 * 100 : 28)

const { data, pending } = await useAsyncData(async () => {
  if (!projectName.value) {
    return null
  }
  const resp = await v3GetWorkspaceFiles({
    query: {
      project: projectName.value,
      days: days.value,
    },
  })
  return resp.data ?? []
}, {
  server: false,
  watch: [projectName, days],
})

const gitBranchCountMap = computed(() => {
  const map = new Map<string, number>()
  if (data.value) {
    for (const d of data.value) {
      const branch = d.gitBranch || 'Unknown'
      if (map.has(branch)) {
        map.set(branch, map.get(branch)! + 1)
      }
      else {
        map.set(branch, 1)
      }
    }
  }
  const arr = [...map]
  return arr.sort((a, b) => b[1] - a[1])
})
const maxBranchCount = computed(() => {
  return Math.max(...gitBranchCountMap.value.map(([, count]) => count))
})
const height = 26
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.workspace"
    :description="t.dashboard.pageHeader.description.workspace"
  />
  <DashboardPageContent>
    <div class="mx-4 text-xl">
      {{ projectName }}
    </div>
    <CardBase>
      <ProjectSelect v-model="project" />
      <div class="mt-4 flex gap-2">
        <Btn
          v-for="name in historyWorkspaceNameList"
          :key="name"
          rounded="full"
          @click="project = { label: name, id: name }"
        >
          {{ name }}
        </Btn>
      </div>
    </CardBase>
    <DashboardDataRange v-model:days="days" />
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
    <div
      v-if="data && data.length > 0"
      class="flex flex-basis-[100%] flex-col flex-wrap gap-2 sm:flex-row sm:children:max-w-[calc(100%/3-0.5rem*2/3)] sm:children:flex-basis-[calc(100%/3-0.5rem*2/3)]"
    >
      <CardBase :loading="pending">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <i class="i-tabler-git-branch" />
            <div class="text-lg">
              Top Branch
            </div>
          </div>

          <div
            v-for="([branch, count]) in gitBranchCountMap.slice(0, 5)"
            :key="branch"
          >
            <div
              class="flex justify-between gap-2 text-sm"
            >
              <div class="overflow-hidden truncate text-nowrap">
                {{ branch }}
              </div>
              <div class="flex-shrink-0">
                {{ getDurationString(count * 60 * 1000) }}
              </div>
            </div>
            <div class="bg-surface-variant my-0.5 h-0.5 overflow-hidden rounded-xl">
              <div
                class="h-full bg-primary"
                :style="{ width: `${count / maxBranchCount * 100}%` }"
              />
            </div>
          </div>
        </div>
      </CardBase>
    </div>
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
