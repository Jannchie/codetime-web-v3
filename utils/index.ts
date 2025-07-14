import type { UserSelfPublic } from '~/api/v3/types.gen'
import { v3GetUserSelf, v3ListSelfStats, v3ListSelfStatsTime, v3ListSelfTop } from '~/api/v3'

export async function fetchStats(limit: Ref<number>, by: string = 'time', unit: 'minutes' | 'days' | 'hours' = 'minutes') {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  return await (by === 'time'
    ? useAsyncData(async () => {
        const resp = await v3ListSelfStatsTime({
          query: {
            unit,
            tz,
            limit: limit.value,
          },
        })
        return {
          data: resp.data?.data.map(item => ({
            duration: item.duration,
            time: item.time,
            by: undefined,
          })) ?? [],
        }
      }, {
        server: false,
        watch: [limit],
      })
    : useAsyncData(async () => {
        const resp = await v3ListSelfStats({
          query: {
            by: by as any,
            unit,
            tz,
            limit: limit.value,
          },
        })
        return {
          data: resp.data?.data.map(item => ({
            duration: item.duration,
            time: item.time,
            by: item.by,
          })) ?? [],
        }
      }, {
        server: false,
        watch: [limit],
      }))
}

export async function fetchUser() {
  return await useAsyncData(async () => {
    const resp = await v3GetUserSelf()
    return resp.data
  }, {
    server: false,
  })
}

export function useUser() {
  return inject<Ref<UserSelfPublic | null>>('user', ref(null))
}

export type TopData = {
  field: string
  minutes: number
  icon?: string
}

export async function fetchTop(field: string, minutes: ComputedRef<number>, limit: number = 5, filters: MaybeRef<FilterItem[]>, options?: any) {
  return await useAsyncData(`top-${field}-${minutes.value}-${limit}`, async () => {
    const resp = await v3ListSelfTop({
      query: {
        field: field as any,
        minutes: minutes.value,
        limit,
      },
    })
    return resp.data?.map(item => ({
      field: item.field,
      minutes: item.minutes,
      icon: undefined,
    })) ?? []
  }, {
    server: false,
    watch: [minutes],
    ...options,
  })
}

export type FilterItem = {
  key: string
  value: string
}

export * as Plot from '@observablehq/plot'
