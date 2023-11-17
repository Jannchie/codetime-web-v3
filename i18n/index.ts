import { zhCN } from './zhCN'
import { ja } from './ja'
import { en } from './en'

export type I18NData = typeof en

const i18NMap = new Map<string, Partial<I18NData>>([
  ['zh-CN', zhCN],
  ['en', en],
  ['ja', ja],
])

function mergeI18N(a: any, b: any): I18NData {
  const result: any = { ...a }
  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        if (typeof result[key] === 'object' && typeof b[key] === 'object') {
          result[key] = mergeI18N(result[key], b[key])
        }
      }
      else {
        result[key] = b[key]
      }
    }
  }
  return result
}

export const locales = [...i18NMap.keys()]
export function useI18N() {
  return computed<I18NData>(() => {
    const locale = useLocale()
    const i18N = i18NMap.get(locale.value) ?? zhCN
    return mergeI18N(i18N, en)
  })
}
