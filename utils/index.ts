import type { UserSelfPublic } from '~/api/v3/types.gen'
import { v3GetUserSelf, v3ListSelfStats, v3ListSelfStatsTime } from '~/api/v3'

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
  const filterArray = unref(filters)
  const filterKey = JSON.stringify(filterArray)
  
  return await useAsyncData(`top-${field}-${minutes.value}-${limit}-${filterKey}`, async () => {
    const activeFilters = unref(filters)
    const platformFilter = activeFilters.find(f => f.key === 'platform')?.value
    const projectFilter = activeFilters.find(f => f.key === 'workspace')?.value
    const languageFilter = activeFilters.find(f => f.key === 'language')?.value
    
    const resp = await v3ListSelfStats({
      query: {
        by: field as any,
        unit: 'days',
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        limit,
        platform: platformFilter || null,
        project: projectFilter || null,
        language: languageFilter || null,
      },
    })
    return resp.data?.data.map(item => ({
      field: item.by,
      minutes: item.duration,
      icon: undefined,
    })) ?? []
  }, {
    server: false,
    watch: [minutes, filterArray],
    ...options,
  })
}

export type FilterItem = {
  key: string
  value: string
}

export * as Plot from '@observablehq/plot'
