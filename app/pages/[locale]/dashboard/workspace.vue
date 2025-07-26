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

const { data, pending } = useAsyncData(async () => {
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
    <div class="text-xl mx-4">
      {{ projectName }}
    </div>
    <CardBase>
      <ProjectSelect v-model="project" />
      <div class="mt-4 flex gap-2">
        <Btn
          v-for="name in historyWorkspaceNameList"
          :key="name"
          rounded="full"
          @click="project = { label: name ?? '', id: name ?? '' }"
        >
          {{ name }}
        </Btn>
      </div>
    </CardBase>
    <DashboardDataRange v-model:days="days" />
    <CardBase
      :loading="pending"
      class="min-h-64 relative"
    >
      <div class="text-xl mb-4">
        {{ t.dashboard.workspace.flameGraph.title }}
      </div>
      <DashboardFlameChart
        v-if="data && data.length > 0"
        :line-height="height"
        :data="data"
      />
    </CardBase>
    <div
      v-if="data && data.length > 0"
      class="flex flex-basis-[100%] flex-col flex-wrap gap-2 sm:flex-row sm:children:flex-basis-[calc(100%/3-0.5rem*2/3)] sm:children:max-w-[calc(100%/3-0.5rem*2/3)]"
    >
      <CardBase :loading="pending">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 items-center">
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
              class="text-sm flex gap-2 justify-between"
            >
              <div class="text-nowrap truncate overflow-hidden">
                {{ branch }}
              </div>
              <div class="flex-shrink-0">
                {{ getDurationString(count * 60 * 1000) }}
              </div>
            </div>
            <div class="bg-surface-variant my-0.5 rounded-xl h-0.5 overflow-hidden">
              <div
                class="bg-primary h-full"
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
