export function useLocale() {
  const router = useRouter()
  const route = router.currentRoute
  const locale = computed(() => {
    return route.value.params.locale as string
  })
  return locale
}

export function useCurrentPath() {
  const router = useRouter()
  const route = router.currentRoute
  const path = computed(() => {
    return route.value.path
  })
  return path
}

export function useCurrentTab(headerTabs: Ref<{ path: string; label: string; id: string }[]>) {
  const locale = useLocale()
  const currentPath = useCurrentPath()
  const currentTab = computed(() => {
    const normalizedCurrentPath = currentPath.value.replace(/\/$/, '')
    const ctab = headerTabs.value.find((tab) => {
      return `/${locale.value}${tab.path}` === normalizedCurrentPath
    })
    return ctab
  })
  return currentTab
}
