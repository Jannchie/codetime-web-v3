<script setup lang="ts">
import { darkTheme, lightTheme } from '~/theme'

const props = defineProps<{ theme?: string }>()
const preferredTheme = usePreferredColorScheme()
const theme = useTheme()
provide('theme', theme)
const themeData = computed(() => {
  if (props.theme) {
    if (props.theme === 'system') {
      return preferredTheme.value === 'dark' ? darkTheme : lightTheme
    }
    switch (props.theme) {
      case 'dark':
        return darkTheme
      case 'light':
        return lightTheme
    }
  }
  switch (theme.value) {
    case 'dark':
      return darkTheme
    case 'light':
      return lightTheme
  }
  if (theme.value === 'system' && preferredTheme.value === 'dark') {
    return darkTheme
  }
  return lightTheme
})
const style = ref({})
watchEffect(() => {
  if (!props.theme && theme.value === 'system') {
    style.value = {}
    return
  }
  const data = themeData.value
  style.value = {
    '--color-frontground': data.frontground,
    '--color-background': data.background,
    '--color-primary-1': data.primary[1],
    '--color-primary-2': data.primary[2],
    '--color-primary-3': data.primary[3],
    '--color-bg-1': data.back[1],
    '--color-bg-2': data.back[2],
    '--color-bg-3': data.back[3],
    '--color-border-1': data.border[1],
    '--color-border-2': data.border[2],
    '--color-border-3': data.border[3],
    '--color-error-1': data.error[1],
    '--color-error-2': data.error[2],
    '--color-error-3': data.error[3],
    '--color-success-1': data.success[1],
    '--color-success-2': data.success[2],
    '--color-success-3': data.success[3],
    '--color-warning-1': data.warning[1],
    '--color-warning-2': data.warning[2],
    '--color-warning-3': data.warning[3],
    'color-scheme': data.dark ? 'dark' : 'light',
    'background-color': data.background,
    'color': data.frontground,
  }
})
</script>

<template>
  <div
    :style="style"
  >
    <slot />
  </div>
</template>
