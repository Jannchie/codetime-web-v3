export function useTheme() {
  return inject<Ref<string>>('theme', ref('system'))
}

export function initTheme() {
  const themeCookie = useCookie('theme', {
    default: () => 'system',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 100),
  })
  const theme = ref(themeCookie)
  watchEffect(() => {
    themeCookie.value = theme.value
  })
  provide('theme', theme)
}
