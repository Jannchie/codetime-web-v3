import { iconMap } from './../utils/icon'
import { zhCN } from './zhCN'
import { ja } from './ja'

const i18NMap = new Map([
  ['zh-CN', zhCN],
  ['en', zhCN],
  ['ja', ja],
])

export const locales = [...iconMap.keys()]
export function useI18N() {
  return computed(() => {
    const locale = useLocale()
    const i18N = i18NMap.get(locale.value) ?? zhCN
    return i18N
  })
}
