import * as Plot from '@observablehq/plot'

import type { AsyncDataOptions, UseFetchOptions } from 'nuxt/dist/app/composables'
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'

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
  return await useAPIFetch<{ data: { duration: number; time: string; by?: string }[] }>(`/stats?${params}`)
}

export async function useAPIFetch<T>(path: string, options: UseFetchOptions<(T extends void ? unknown : T), (T extends void ? unknown : T), KeysOf<(T extends void ? unknown : T)>, any, any, any > = {}) {
  const apiHost = useRuntimeConfig().public.apiHost
  fetch(`${apiHost}${path}`, { credentials: 'include' })
  return await useFetch<T>(`${path}`, {
    $fetch: useRequestFetch(),
    baseURL: apiHost,
    credentials: 'include',
    ...options,
  })
}

export async function fetchUser() {
  const { data } = await useAPIFetch<User>('/user', {
    credentials: 'include',
  })
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
  icon?: string
}

export async function fetchTop(field: string, minutes: number = 0, limit: number = 5, filters: Ref<FilterItem[]>, options?: AsyncDataOptions<TopData[], TopData[], KeysOf<TopData[]>, null>) {
  const params = computed(() => {
    const params = {
      field,
      minutes: String(minutes),
      limit: String(limit),
      ...filters.value.reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
      }, {} as Record<string, string>),
    }
    return params
  })
  const apiHost = useRuntimeConfig().public.apiHost
  const resp = await useFetch<TopData[]>(`${apiHost}/top`, {
    ...options,
    credentials: 'include',
    query: params,
    $fetch: useRequestFetch(),
  })
  return resp
}

export interface FilterItem {
  key: string
  value: string
}
