<script setup lang="ts">
import { getV3AgentProjects } from '~/api/v3'

// Picker over the caller's agent project names — the raw
// `agent_sessions.project` strings the token badge's `project` param
// matches against.

export type AgentProjectOption = {
  label: string
  id: string
  isRecent?: boolean
}

const modelValue = defineModel<AgentProjectOption | null>()
const t = useI18N()

async function loader(q: string): Promise<AgentProjectOption[]> {
  const trimmed = q.trim()
  const resp = await getV3AgentProjects({
    query: trimmed ? { q: trimmed } : undefined,
  })
  return (resp.data?.results ?? []).map(r => ({
    label: r.project,
    id: `agent-project:${r.project}`,
    isRecent: !trimmed,
  }))
}
</script>

<template>
  <WidgetEntitySelect
    v-model="modelValue"
    :loader="loader"
    :placeholder="t.dashboard.badge.placeholder.agentProject"
    :empty-text="t.dashboard.projectSelector.noneText"
  >
    <template #option="{ option, selected }">
      <i v-if="option.isRecent" class="i-tabler-history project-icon" />
      <i v-else class="i-tabler-folder project-icon" />
      <span class="project-label">{{ option.label }}</span>
      <i v-if="selected" class="i-tabler-check text-primary text-sm" />
    </template>
  </WidgetEntitySelect>
</template>

<style scoped>
.project-icon { color: var(--ct-fg-subtle); font-size: 14px; flex-shrink: 0; }
.project-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 1 auto;
  min-width: 0;
}
</style>
