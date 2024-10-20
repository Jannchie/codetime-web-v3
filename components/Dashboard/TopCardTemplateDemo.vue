<script setup lang="ts">
const data = [
  {
    field: 'python',
    minutes: 68763,
    icon: 'i-vscode-icons-file-type-python',
  },
  {
    field: 'vue',
    minutes: 40113,
    icon: 'i-vscode-icons-file-type-vue',
  },
  {
    field: 'typescript',
    minutes: 38538,
    icon: 'i-vscode-icons-file-type-typescript',
  },
  {
    field: 'typescriptreact',
    minutes: 29848,
    icon: 'i-vscode-icons-file-type-reactts',
  },
  {
    field: 'go',
    minutes: 21171,
    icon: 'i-vscode-icons-file-type-go',
  },
]
const t = useI18N()
</script>

<template>
  <DashboardTopCardTemplate
    :data="data"
    icon="i-tabler-braces"
    :filters="[]"
    :title="t.dashboard.overview.top.language"
    type="language"
  />
</template>
