<script setup lang="ts">
const props = defineProps<{
  theme?: string
}>()

const t = useI18N()
const currentTheme = useTheme()
const isCurrent = computed(() => {
  return props.theme === currentTheme?.value
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
    class="!p-0 overflow-hidden cursor-pointer"
    :class="{
      'border-primary-1': isCurrent,
    }"
    @click="() => currentTheme = props.theme ?? 'system'"
  >
    <div
      class="p-2 border-b border-border-1 text-sm op75"
    >
      {{ title }}
    </div>
    <ThemeProvider :theme="theme">
      <div
        class="w-86 h-full p-2 bg-background"
      >
        <CardBase>
          <div class="h-1em w-32 bg-primary-1 mb-2 rounded-full" />
          <div class="h-1em w-full bg-frontground text-sm rounded-full op-25 mb-1" />
          <div class="h-1em w-2/3 bg-frontground rounded-full text-sm op-25" />
        </CardBase>
      </div>
    </ThemeProvider>
  </CardBase>
</template>
