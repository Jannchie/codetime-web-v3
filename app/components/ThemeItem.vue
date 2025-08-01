<script setup lang="ts">
import { borderCS, ThemeProvider, useContainerFilledCS, useCS, useSchemeString } from '@roku-ui/vue'

const props = defineProps<{
  theme?: string
}>()

const t = useI18N()
const currentScheme = computed({ get() {
  if (globalThis.window !== undefined) {
    return document.documentElement.dataset.scheme ?? 'light'
  }
  return 'light'
}, set(value: string) {
  if (globalThis.window !== undefined) {
    document.documentElement.dataset.scheme = value
  }
} })
const scheme = useSchemeString()
const isCurrent = computed(() => {
  return props.theme === scheme.value
})
const title = computed(() => {
  switch (props.theme) {
    case 'dark': {
      return t.value.dashboard.settings.theme.dark
    }
    case 'light': {
      return t.value.dashboard.settings.theme.light
    }
    case 'system': {
      return t.value.dashboard.settings.theme.system
    }
  }
  return ''
})
const filledCS = useContainerFilledCS('primary')
const textCS = useCS({
  type: 'bg',
  color: 'surface',
  index: { dark: 3, light: 7 },
})
</script>

<template>
  <CardBase

    with-border no-padding
    class="p-2 border rounded-2xl cursor-pointer overflow-hidden !p-0"
    :class="{
      'border-primary-container': isCurrent,
      'border-surface-border-base': !isCurrent,
    }"
    @click="() => currentScheme = props.theme ?? 'system'"
  >
    <div
      class="text-sm p-2 border-b op75 flex gap-2 items-center"
      :class="{
        'text-primary-on': isCurrent,
      }"
      v-bind="borderCS"
    >
      <i
        class="i-tabler-palette"
      />
      {{ title }}
    </div>
    <ThemeProvider
      :scheme="theme"
    >
      <div
        class="p-4 bg-[var(--r-surface-background-base-color)] h-full w-86"
      >
        <CardBase>
          <div
            v-bind="filledCS"
            class="mb-2 rounded-full h-1em w-32"
          />
          <div
            v-bind="textCS"
            class="text-sm mb-1 rounded-full op-25 h-1em w-full"
          />
          <div class="text-sm rounded-full op-25 h-1em w-2/3" />
        </CardBase>
      </div>
    </ThemeProvider>
  </CardBase>
</template>
