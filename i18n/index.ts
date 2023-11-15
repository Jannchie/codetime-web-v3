import { zhCN } from './zhCN'
import { ja } from './ja'

export const t = computed(() => {
  const locale = useLocale()
  switch (locale.value) {
    case 'zh-CN':
      return zhCN
    case 'en':
      return zhCN
    case 'ja':
      return ja
  }
  return zhCN
})

export function useI18n(): typeof zhCN {
  const locale = useLocale()
  if (locale.value === 'zh-CN') {
    return zhCN
  }
  return zhCN
}
