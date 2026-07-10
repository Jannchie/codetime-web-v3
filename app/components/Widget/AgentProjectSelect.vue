<script setup lang="ts">
// Picker over the caller's agent project names — the raw
// `agent_sessions.project` strings the token badge's `project` param
// matches against. The endpoint is not in the generated SDK yet, so we
// fetch it directly (same pattern as the vibe dashboard page).

export type AgentProjectOption = {
  label: string
  id: string
  isRecent?: boolean
}

const modelValue = defineModel<AgentProjectOption | null>()
const t = useI18N()

type AgentProjectsResponse = { results: { project: string, lastEventAt: string }[] }

async function loader(q: string): Promise<AgentProjectOption[]> {
  const trimmed = q.trim()
  const resp = await $fetch<AgentProjectsResponse>('/v3/agent/projects', {
    query: trimmed ? { q: trimmed } : undefined,
    credentials: 'include',
  })
  return (resp?.results ?? []).map(r => ({
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
