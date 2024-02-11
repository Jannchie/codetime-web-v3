import * as Plot from '@observablehq/plot'

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
  google_id: string
  bio: string
  upload_token: string
  plan: 'free' | 'pro'
  plan_expires_at: string
  plan_status: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid'
}

export async function fetchStats(limit: Ref<number>, by: string = 'time', unit: 'minutes' | 'days' | 'hours' = 'minutes') {
  // get timezone, eg. -09:00
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return await useAPIFetch<{ data: { duration: number, time: string, by?: string }[] }>(`/stats`, {
    params: {
      by,
      tz,
      limit,
      unit,
    },
    watch: [limit],
  })
}

export async function useAPIFetch<T>(path: string, options: any, needLogin = true) {
  const { apiHost } = useRuntimeConfig().public
  return useLazyFetch<T>(`${path}`, {
    server: false,
    baseURL: apiHost,
    credentials: needLogin ? 'include' : undefined,
    ...options,
  })
}

export async function fetchUser() {
  return await useAPIFetch<User>('/user', {
    credentials: 'include',
    lazy: false,
  })
}

export async function fetchSumMinutes() {
  const { apiHost } = useRuntimeConfig().public
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

export async function fetchTop(field: string, minutes: ComputedRef<number>, limit: number = 5, filters: MaybeRef<FilterItem[]>, options?: any) {
  const params = computed(() => {
    return {
      field,
      minutes: minutes.value,
      limit,
      ...unref(filters).reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
      }, {} as Record<string, string>),
    }
  })
  return await useAPIFetch<TopData[]>(`/top`, {
    ...options,
    credentials: 'include',
    params,
  })
}

export interface FilterItem {
  key: string
  value: string
}
