import { formatDuration } from 'date-fns'
import enUS from 'date-fns/locale/en-US/index'
import ja from 'date-fns/locale/ja/index'
import zhCN from 'date-fns/locale/zh-CN/index'
import languageIdentifiers from './LanguageIdentifiers.json'

export function getDurationData(ms: number): { hour: number; minute: number; second: number } {
  const MS_OF_HOUR = 3600000
  const MS_OF_MINUTE = 60000
  const MS_OF_SECOND = 1000
  const hour = Math.floor(ms / MS_OF_HOUR)
  ms %= MS_OF_HOUR
  const minute = Math.floor(ms / MS_OF_MINUTE)
  ms %= MS_OF_MINUTE
  const second = Math.floor(ms / MS_OF_SECOND)
  return { hour, minute, second }
}

export function getDurationString(ms: number, format = ['hours', 'minutes', 'seconds']): string {
  const route = useRoute()
  const locale = route.params.locale as string
  const { hour, minute, second } = getDurationData(ms)
  const localeMap = new Map<string, Locale>([
    ['en', enUS],
    ['zh-CN', zhCN],
    ['ja', ja],
  ])
  return formatDuration({ hours: hour, minutes: minute, seconds: second }, {
    locale: localeMap.get(locale) ?? localeMap.get('en'),
    format,
  }).replace('hour', 'hr').replace('minute', 'min').replace('second', 'sec')
}

export function formateDays(days: number) {
  const route = useRoute()
  const locale = route.params.locale as string
  const localeMap = new Map<string, Locale>([
    ['en', enUS],
    ['zh-CN', zhCN],
    ['ja', ja],
  ])
  return formatDuration({ days }, {
    locale: localeMap.get(locale) ?? localeMap.get('en'),
    format: ['days'],
  })
}

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const entries = Object.entries(languageIdentifiers)
const languageIdentifiersMap = new Map(entries)

export function getLanguageName(languageIdentifier: string): string {
  const res = languageIdentifiersMap.get(languageIdentifier) ?? languageIdentifier
  switch (res) {
    case '':
      return 'Unknown'
    case 'plain_text':
      return 'Plain Text'
    default:
      return res
  }
}
