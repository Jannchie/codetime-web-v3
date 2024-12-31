<script setup lang="tsx">
import { Paper } from '@roku-ui/vue'
import { getUserByUserId, getYearlyReportData } from '~/api/v3'

defineOgImageComponent('NuxtSeo', {
  title: 'Hello OG Image 👋',
  description: 'Look what at me in dark mode',
})
const user = useAsyncData(async () => {
  const resp = await getUserByUserId({
    path: {
      user_id: 2,
    },
  })
  return resp.data
})

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const yearlyData = useAsyncData(async () => {
  const resp = await getYearlyReportData({
    query: {
      year: '2024',
      timezone: browserTimezone,
    },
    path: {
      user_id: 2,
    },
  })
  return resp.data
})

const yearCalendarData = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.dailyDistribution.map((d) => {
      return {
        date: new Date(d.field),
        duration: d.minutes * 60 * 1000,
      }
    })
  }
  return []
})

const sumMinutes = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.dailyDistribution.reduce((acc, cur) => acc + cur.minutes, 0)
  }
  return 0
})

const averageMinutes = computed(() => {
  if (yearlyData.data.value) {
    return sumMinutes.value / yearlyData.data.value.dailyDistribution.length
  }
  return 0
})

const mostActiveHour = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.hourlyDistribution.reduce((acc, cur) => {
      if (cur.minutes > acc.minutes) {
        return cur
      }
      return acc
    }, yearlyData.data.value.hourlyDistribution[0])
  }
  return {
    field: 0,
    minutes: 0,
  }
})

const hourlyDistribution = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.hourlyDistribution.map((d) => {
      d.field = d.field.toString().padStart(2, '0')
      return {
        field: d.field,
        minutes: d.minutes,
      }
    }).sort((a, b) => {
      if (a.field >= '06' && b.field < '06') {
        return -1
      }
      if (a.field <= '06' && b.field > '06') {
        return 1
      }
      return a.field.localeCompare(b.field)
    })
  }
  return []
})

const dayPeriods = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.hourlyDistribution.reduce((acc, cur) => {
      if (Number(cur.field) >= 6 && Number(cur.field) < 12) {
        acc.morning += cur.minutes
      }
      else if (Number(cur.field) >= 12 && Number(cur.field) < 18) {
        acc.afternoon += cur.minutes
      }
      else if (Number(cur.field) >= 18 && Number(cur.field) < 24) {
        acc.evening += cur.minutes
      }
      else {
        acc.midnight += cur.minutes
      }
      return acc
    }, {
      morning: 0,
      afternoon: 0,
      evening: 0,
      midnight: 0,
    })
  }
  return {
    morning: 0,
    afternoon: 0,
    evening: 0,
    midnight: 0,
  }
})

const dayPeriodsString = computed(() => {
  return Object.entries(dayPeriods.value).map(([key, value]) => {
    return `${key}: ${getDurationString(value * 60 * 1000, ['hours'])} (${(value / sumMinutes.value * 100).toFixed(0)}%)`
  }).join(' · ')
})

// 双休日编程时间占比
const weekendMinutes = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.dailyDistribution.reduce((acc, cur) => {
      if (new Date(cur.field).getDay() === 0 || new Date(cur.field).getDay() === 6) {
        return acc + cur.minutes
      }
      return acc
    }, 0)
  }
  return 0
})
const weekendMinutesRatio = computed(() => {
  if (yearlyData.data.value) {
    return weekendMinutes.value / sumMinutes.value
  }
  return 0
})

const monthlyMinutes = computed(() => {
  const resp: Record<string, number> = {}
  for (const data of yearlyData.data.value?.dailyDistribution ?? []) {
    const date = new Date(data.field)
    const month = date.getMonth()
    if (!resp[month]) {
      resp[month] = 0
    }
    resp[month] += data.minutes
  }
  return Object.keys(resp).map((key) => {
    const monthStr = new Date(2024, Number(key), 1).toLocaleString('en-US', { month: 'long' })
    return {
      month: Number(key),
      field: monthStr,
      minutes: resp[key],
    }
  }).sort((a, b) => a.month - b.month)
})

const averageMonthlyMinutes = computed(() => {
  if (yearlyData.data.value) {
    return sumMinutes.value / 12
  }
  return 0
})
function HeaderComponent({ title, value, extra }: { title: string, value?: string, extra?: string }) {
  return (
    <div class="my-4 flex flex-col items-center">
      <div class="text-primary">
        {title}
      </div>
      {
        value && (

          <div class="text-3xl font-bold">
            {value}
          </div>
        )
      }
      {
        extra && (
          <div class="text-sm text-surface-dimmed">
            {extra}
          </div>
        )
      }
    </div>
  )
}

const topLanguage = computed(() => {
  if (yearlyData.data.value) {
    return yearlyData.data.value.topLanguages[0]
  }
  return null
})
</script>

<template>
  <NuxtLayout name="user">
    <div class="mx-auto max-w-820px p-2">
      <div class="mb-6 mt-8 flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold">
          2024 Annual Report
        </h1>
      </div>
      <div
        v-if="user.status.value === 'pending'"
        class="h-32 w-full animate-pulse rounded bg-surface-variant-1"
      />
      <div v-else-if="user.error.value">
        {{ user.error.value }}
      </div>
      <div
        v-else-if="user.data.value"
        class="mb-12 flex justify-center"
      >
        <div class="flex gap-2">
          <img
            v-if="user.data.value.avatar"
            :src="user.data.value.avatar"
            class="h-10 w-10 rounded-full"
          >
          <div>
            <div class="text-sm font-bold">
              {{ user.data.value.username }}
            </div>
            <div class="text-xs text-surface-dimmed">
              {{ user.data.value.email }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="yearlyData.status.value === 'pending'"
        class="h-32 w-full animate-pulse rounded bg-surface-variant-1"
      />
      <div v-else-if="yearlyData.error.value">
        {{ yearlyData.error.value }}
      </div>
      <div v-else>
        <div class="mb-32 mt-4 flex flex-col items-center">
          <HeaderComponent
            title="Annual Total Coding Time"
            :value="getDurationString(sumMinutes * 60 * 1000)"
          />
          <YearCalendarChart
            :data="yearCalendarData"
          />
          <div class="w-full flex items-center gap-4">
            <div>
              <div class="text-3xl text-primary">
                {{ (weekendMinutesRatio * 100).toFixed(0) }}%
              </div>
              <div class="text-sm text-surface-dimmed">
                Weekend Coding Time
              </div>
            </div>

            <div>
              <div class="text-3xl text-primary">
                {{ getDurationString(averageMinutes * 60 * 1000, ["hours", "minutes"]) }}
              </div>
              <div class="text-sm text-surface-dimmed">
                Average Daily Coding Time
              </div>
            </div>
          </div>
        </div>

        <div class="mb-32 mt-4 flex flex-col items-center">
          <HeaderComponent
            title="Annual Busiest Month"
            :value="`${Math.max(...monthlyMinutes.map((d) => d.minutes)) ? `${monthlyMinutes.find((d) => d.minutes === Math.max(...monthlyMinutes.map((d) => d.minutes)))?.field}` : ''} (${getDurationString(Math.max(...monthlyMinutes.map((d) => d.minutes)) * 60 * 1000)})`"
          />
          <div class="h-300px max-h-300px max-w-800px w-800px">
            <PoltChart
              :options="{
                color: { scheme: 'burd' },
                x: {
                  type: 'band',
                  label: 'Month',
                  domain: monthlyMinutes.map((d) => d.field),
                },
                y: {
                  grid: true,
                },
                marks: [
                  Plot.lineY(monthlyMinutes, { x: 'field', y: 'minutes', marker: true }),
                  Plot.ruleY([0]),
                  Plot.ruleY([averageMonthlyMinutes], { stroke: 'var(--r-primary-background-color)', strokeDasharray: '4 4' }),
                ],
              }"
            />
          </div>
        </div>

        <div class="mb-32 mt-4 flex flex-col items-center">
          <HeaderComponent
            title="Annual Most Active Hour"
            :value="`${mostActiveHour.field}:00 - ${mostActiveHour.field}:59`"
            :extra="dayPeriodsString"
          />
          <div class="h-300px max-h-300px max-w-800px w-800px">
            <PoltChart
              :options="{
                x: {
                  type: 'band',
                  label: 'Hour',
                },
                y: {
                  grid: true,
                },
                marks: [
                  Plot.barY(hourlyDistribution, { x: 'field', y: 'minutes', fill: 'minutes' }),
                  Plot.ruleY([0]),
                ],
              }"
            />
          </div>
        </div>
        <div
          v-if="topLanguage"
          class="mb-32 mt-4 flex flex-col items-center"
        >
          <HeaderComponent
            title="Annual Most Used Language"
          />
          <div class="flex items-center gap-2">
            <VSCodeIcon
              :language="topLanguage.field || 'Unknown'"
              class="h-16 w-16"
            />
            <div class="text-2xl font-bold">
              <span>
                {{ getLanguageName(topLanguage.field ?? 'Unknown') }}
              </span>
              <span>
                ({{ getDurationString(topLanguage.minutes * 60 * 1000) }})
              </span>
            </div>
          </div>
          <div class="mt-4 flex flex-col items-center gap-1">
            <div
              v-for="lang in yearlyData.data.value?.topLanguages.slice(1)"
              :key="lang.field"
              class="flex items-center gap-2"
            >
              <VSCodeIcon
                :language="lang.field || 'Unknown'"
                class="h-4 w-4"
              />
              <span>
                {{ getLanguageName(lang.field ?? 'Unknown') }}
              </span>
              <span>
                ({{ getDurationString(lang.minutes * 60 * 1000) }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
