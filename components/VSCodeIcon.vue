<script setup lang="ts">
const props = defineProps<{
  language: string
}>()

const iconClassName = computed(() => {
  return iconMap.get(props.language) ?? 'vscode-icons-file-type-text'
})
</script>

<template>
  <NuxtImg
    :src="`vscode-icons/vscode-icons_${iconClassName.split('vscode-icons-')[1]}.svg`"
    :alt="iconClassName.split('vscode-icons-file-type-')[1]"
  />
</template>
