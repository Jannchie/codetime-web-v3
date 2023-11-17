import { zhCN } from './zhCN'
import { ja } from './ja'
import { en } from './en'

type I18NData = typeof en

const i18NMap: Map<string, I18NData> = new Map<string, I18NData>([
  ['zh-CN', zhCN],
  ['en', en],
  ['ja', ja],
])

export const locales = [...i18NMap.keys()]
export function useI18N() {
  return computed(() => {
    const locale = useLocale()
    const i18N = i18NMap.get(locale.value) ?? zhCN
    return i18N
  })
}
