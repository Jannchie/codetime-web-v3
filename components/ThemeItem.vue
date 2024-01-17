<script setup lang="ts">
import { ThemeProvider, darkTheme, lightTheme, useScheme } from '@roku-ui/vue'

const props = defineProps<{
  theme?: string
}>()

const t = useI18N()
const currentScheme = useScheme()
const isCurrent = computed(() => {
  return props.theme === currentScheme?.value
})
const title = computed(() => {
  switch (props.theme) {
    case 'dark':
      return t.value.dashboard.settings.theme.dark
    case 'light':
      return t.value.dashboard.settings.theme.light
    case 'system':
      return t.value.dashboard.settings.theme.system
  }
})
const preferColor = usePreferredDark()

const theme = computed(() => {
  switch (props.theme) {
    case 'dark':
      return darkTheme
    case 'light':
      return lightTheme
    default:
      return preferColor.value ? darkTheme : lightTheme
  }
})
</script>

<template>
  <CardBase
    class="cursor-pointer overflow-hidden !p-0"
    :class="{
      'border-primary-container': isCurrent,
    }"
    @click="() => currentScheme = props.theme ?? 'system'"
  >
    <div
      class="flex items-center gap-2 border-b border-surface-border-low p-2 text-sm op75"
      :class="{
        'text-primary-container': isCurrent,
      }"
    >
      <i
        class="i-tabler-palette"
      />
      {{ title }}
    </div>
    <ThemeProvider :theme="theme">
      <div
        class="h-full w-86 p-2"
      >
        <CardBase>
          <div class="mb-2 h-1em w-32 rounded-full bg-primary-container" />
          <div class="mb-1 h-1em w-full rounded-full bg-surface-on text-sm op-25" />
          <div class="h-1em w-2/3 rounded-full bg-surface-on text-sm op-25" />
        </CardBase>
      </div>
    </ThemeProvider>
  </CardBase>
</template>
