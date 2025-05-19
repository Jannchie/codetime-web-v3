export function useLocale() {
  const router = useRouter()
  const route = router.currentRoute
  return computed(() => {
      return route.value.params.locale as string
    });
}

export function useCurrentPath() {
  const router = useRouter()
  const route = router.currentRoute
  return computed(() => {
      return route.value.path
    });
}

export function useCurrentTab(headerTabs: Ref<{ path: string, label: string, id: string }[]>) {
  const locale = useLocale()
  const currentPath = useCurrentPath()
  return computed(() => {
      const normalizedCurrentPath = currentPath.value.replace(/\/$/, '')
      return headerTabs.value.find((tab) => {
              return `/${locale.value}${tab.path}` === normalizedCurrentPath
            });
    });
}
