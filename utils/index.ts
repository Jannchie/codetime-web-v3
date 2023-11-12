import * as Plot from '@observablehq/plot'

import { formatDuration } from 'date-fns'
import { enUS, ja, zhCN } from 'date-fns/locale'

export { Plot }

export interface User {
  CreatedAt: string
  UpdatedAt: string
  DeletedAt?: string
  id: number
  email: string
  username: string
  avatar: string
  github_id: number
  bio: string
  upload_token: string
}

export async function fetchStats(by: string = 'time', limit: number = 60, unit: 'minutes' | 'days' | 'hours' = 'minutes') {
  // get timezone, eg. -09:00
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const params = new URLSearchParams({
    by,
    tz,
    limit: String(limit),
    unit,
  })
  return await useAPIFetch<{ data: { duration: number; time: string }[] }>(`/stats?${params}`)
}

export async function useAPIFetch<T>(path: string) {
  const apiHost = useRuntimeConfig().public.apiHost
  const _fetch = useRequestFetch()
  return await useAsyncData<T>(path, () => _fetch(`${apiHost}${path}`, {
    credentials: 'include',
  }))
}

export async function fetchUser() {
  const { data } = await useAPIFetch<User>('/user')
  return data
}

export async function fetchSumMinutes() {
  const apiHost = useRuntimeConfig().public.apiHost
  const { data } = await useFetch<{ minutes: number }>(`${apiHost}/sum-minutes`)
  return data
}

export function useUser() {
  return inject<Ref<User | null>>('user', ref(null))
}

export interface TopData {
  field: string
  minutes: number
}

export async function fetchTop(field: string, minutes: number = 0, limit: number = 5) {
  const params = new URLSearchParams({
    field,
    minutes: String(minutes),
    limit: String(limit),
  })
  const { data } = await useAPIFetch<TopData[]>(`/top?${params}`)
  return data
}

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

export function getDurationString(ms: number): string {
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
    format: ['hours', 'minutes', 'seconds'],
  }).replace('hour', 'hr').replace('minute', 'min').replace('second', 'sec')
}
