import * as d3 from 'd3'
import type { TopData } from '.'

export function useMaxStreak(data: Ref<{
  date: Date
  duration: number
}[]>) {
  return computed(() => {
    if (data.value === null) {
      return 0
    }
    let streak = 0
    let maxStreak = 0
    const sortedData = data.value.slice().sort((a, b) => b.date.getTime() - a.date.getTime())
    for (let i = 0; i < sortedData.length; i++) {
      const d = sortedData[i]
      if (d.duration === 0) {
        maxStreak = Math.max(maxStreak, streak)
        streak = 0
        continue
      }
      streak++
    }
    return Math.max(maxStreak, streak)
  })
}

export function useCurrentStreak(data: Ref<{
  date: Date
  duration: number
}[]>) {
  return computed(() => {
    if (data.value === null) {
      return 0
    }
    let streak = 0
    const sortedData = data.value.slice().sort((a, b) => b.date.getTime() - a.date.getTime())
    for (let i = 0; i < sortedData.length; i++) {
      const d = sortedData[i]
      if (d.duration === 0) {
        break
      }
      streak++
    }
    return streak
  })
}

export function useTodayMinutes(data: Ref<{
  data: {
    duration: number
    time: string
  }[]
} | null>) {
  return computed(() => {
    if (!data.value) {
      return 0
    }
    const today = new Date()
    const todayString = today.toISOString().slice(0, 10)
    const todayData = data.value.data.find(d => d.time.slice(0, 10) === todayString)
    return todayData?.duration ?? 0
  })
}

export function useTotalMinutes(data: Ref<{
  data: {
    duration: number
    time: string
  }[]
} | null>) {
  return computed(() => {
    if (!data) {
      return 0
    }
    return data.value?.data.reduce((acc, cur) => acc + cur.duration, 0) ?? 0
  })
}

// Function to transform platform data
export function transformTopPlatformData(data: TopData[]) {
  return data.map((d) => {
    if (d.field.toLocaleLowerCase().includes('mac')) {
      d.icon = 'i-mdi-apple'
    }
    else if (d.field.toLocaleLowerCase().includes('window')) {
      d.icon = 'i-mdi-microsoft-windows'
    }
    else if (d.field.toLocaleLowerCase().includes('linux')) {
      d.icon = 'i-codicon-terminal-linux'
    }
    else {
      d.icon = 'i-mdi-desktop-classic'
    }
    return d
  })
}

export function transformTopLanguageData(data: TopData[]) {
  return data.map((d) => {
    d.icon = iconMap.get(d.field) ?? 'i-material-symbols-question-mark-rounded'
    // d.field = getLanguageName(d.field)
    return d
  })
}

export function useMergedFilters(filters: FilterItem[]) {
  return computed(() => {
    const map = new Map<string, string>()
    filters.forEach((f) => {
      if (map.has(f.key)) {
        const value = map.get(f.key)
        if (value) {
          map.set(f.key, `${value},${f.value}`)
        }
      }
      else {
        map.set(f.key, f.value)
      }
    })
    const res: FilterItem[] = []
    map.forEach((value, key) => {
      res.push({ key, value })
    })
    return res
  })
}

export function useProcessedData(data: Ref<{
  data: {
    duration: number
    time: string
    by?: string | undefined
  }[]
} | null>) {
  const t = useI18N()
  return computed(() => {
    const differentBy = new Set<string>()
    data.value?.data.forEach((d) => {
      differentBy.add(d.by ?? t.value.plot.label.unknown)
    })

    // get sum duration for each by
    const sumDurationBy = new Map<string, number>()
    data.value?.data.forEach((d) => {
      const duration = sumDurationBy.get(d.by ?? t.value.plot.label.unknown) ?? 0
      sumDurationBy.set(d.by ?? t.value.plot.label.unknown, duration + d.duration)
    })

    // get top by
    const sortedBy = Array.from(sumDurationBy.entries()).sort((a, b) => b[1] - a[1])
    const topBy = sortedBy.slice(0, 5).map(d => d[0])
    const dataWithOther = data.value?.data.map((d) => {
      d = { ...d }
      if (!topBy.includes(d.by ?? t.value.plot.label.unknown)) {
        d.by = t.value.plot.label.other
      }
      return d
    }) ?? []
    const minDateString = d3.min(data.value?.data ?? [], d => d.time)
    const minDateDate = minDateString ? new Date(minDateString) : new Date()
    const dateRange = d3.utcDay.range(minDateDate, new Date())
    const dataMap = new Map<string, number>()
    dateRange.forEach((d) => {
      topBy.forEach((by) => {
        const key: string = [d.toISOString().slice(0, 10), by].join(',')
        dataMap.set(key, 0)
      })
    })
    dataWithOther.forEach((d) => {
      const date = new Date(d.time)
      const key = [date.toISOString().slice(0, 10), d.by ?? t.value.plot.label.unknown].join(',')
      dataMap.set(key, d.duration)
    })
    const res = Array.from(dataMap.entries()).map(([keyRaw, data]) => {
      const key = keyRaw.split(',')
      return { date: new Date(key[0]), duration: data, by: key[1] }
    })
      .sort((a, b) => a.by.localeCompare(b.by))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
    return res
  })
}
