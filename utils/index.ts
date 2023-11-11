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
  bio: string
  upload_token: string
}

export async function fetchStats() {
  const apiHost = useRuntimeConfig().public.apiHost
  const _fetch = useRequestFetch()
  const { data } = await useAsyncData(() => _fetch(`${apiHost}/stats?by=time&tz=-09:00&limit=60&unit=minutes`, {
    credentials: 'include',
  }))
  return data.value as { data: { duration: number; time: string }[] }
}

export async function fetchUser() {
  const apiHost = useRuntimeConfig().public.apiHost
  const _fetch = useRequestFetch()
  const { data } = await useAsyncData<User>(() => _fetch(`${apiHost}/user`, {
    credentials: 'include',
  }))
  return data
}

export async function fetchSumMinutes() {
  const apiHost = useRuntimeConfig().public.apiHost
  const resp = await fetch(`${apiHost}/sum-minutes`)
  const data = await resp.json()
  return data
}

export function useUser() {
  return inject<Ref<User | null>>('user', ref(null))
}
