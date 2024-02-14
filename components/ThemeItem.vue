<script setup lang="ts">
import { ThemeProvider, defaultTheme } from '@roku-ui/vue'

const props = defineProps<{
  theme?: string
}>()

const t = useI18N()
const currentScheme = computed({ get() {
  if (typeof window !== 'undefined') {
    return document.documentElement.dataset.scheme
  }
}, set(value: string) {
  if (typeof window !== 'undefined') {
    document.documentElement.dataset.scheme = value
  }
} })
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
</script>

<template>
  <CardBase
    class="cursor-pointer overflow-hidden border rounded-2xl p-2 !p-0"
    :class="{
      'border-primary-container': isCurrent,
      'border-surface-border-base': !isCurrent,
    }"
    @click="() => currentScheme = props.theme ?? 'system'"
  >
    <div
      class="flex items-center gap-2 border-b border-surface-border-base p-2 text-sm op75"
      :class="{
        'text-primary-on': isCurrent,
      }"
    >
      <i
        class="i-tabler-palette"
      />
      {{ title }}
    </div>
    <ThemeProvider
      :theme="defaultTheme"
      :scheme="theme"
    >
      <div
        class="h-full w-86 bg-surface-lowest p-4"
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
