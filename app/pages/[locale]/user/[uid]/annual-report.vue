<script setup lang="tsx">
import { Btn } from '@roku-ui/vue'
import { v3GetUserByUserId, v3GetYearlyReportData } from '~/api/v3'

const route = useRoute()
const uid = computed(() => {
  return Number(route.params.uid)
})
const t = useI18N()
const { data: user } = (await v3GetUserByUserId({
  path: {
    user_id: uid.value,
  },
}))

if (!user) {
  throw createError({
    statusCode: 404,
    message: t.value.annualReport.userNotFound,
  })
}
watchEffect(() => {
  useSeoMeta({
    title: `${user?.username} - ${t.value.annualReport.annualCodeTimeReport('2024')}`,
    description: t.value.meta.description,
    ogTitle: t.value.meta.ogTitle,
    ogDescription: t.value.meta.ogDescription,
    twitterTitle: t.value.meta.twitterTitle,
    twitterDescription: t.value.meta.twitterDescription,
    ogUrl: 'https://codetime.dev',
    twitterCard: 'summary',
  })
})
const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const { share } = useShare()
const yearlyDataResp = await v3GetYearlyReportData({
  query: {
    user_id: uid.value,
    year: '2024',
    timezone: user.timezone ?? browserTimezone,
  },
})
const yearlyData = computed(() => {
  return yearlyDataResp.data
})

const yearCalendarData = computed(() => {
  if (yearlyData.value) {
    return yearlyData.value.dailyDistribution.map((d) => {
      return {
        date: new Date(d.field),
        duration: d.minutes * 60 * 1000,
      }
    })
  }
  return []
})

const sumMinutes = computed(() => {
  if (yearlyData.value) {
    return yearlyData.value.dailyDistribution.reduce((acc, cur) => acc + cur.minutes, 0)
  }
  return 0
})

// defineOgImageComponent('AnnualReport', {
//   title: `${getDurationString(sumMinutes.value * 60 * 1000)}`,
//   description: t.value.annualReport.annualCodeTimeReport('2024'),
//   colorMode: 'dark',
//   theme: '#0067cc',
//   username: user.username,
//   logo: 'https://codetime.dev/icon.png',
//   avatar: user.avatar,
// })

const averageMinutes = computed(() => {
  if (yearlyData.value) {
    return sumMinutes.value / yearlyData.value.dailyDistribution.length
  }
  return 0
})

const mostProductiveHour = computed(() => {
  if (yearlyData.value && yearlyData.value.hourlyDistribution.length > 0) {
    let maxHour = yearlyData.value.hourlyDistribution[0]!
    for (const hourData of yearlyData.value.hourlyDistribution) {
      if (hourData.minutes > maxHour.minutes) {
        maxHour = hourData
      }
    }
    return maxHour
  }
  return {
    field: 0,
    minutes: 0,
  }
})

const hourlyDistribution = computed(() => {
  if (yearlyData.value) {
    return yearlyData.value.hourlyDistribution.map((d) => {
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
  const result = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    midnight: 0,
  }

  if (yearlyData.value) {
    for (const cur of yearlyData.value.hourlyDistribution) {
      if (Number(cur.field) >= 6 && Number(cur.field) < 12) {
        result.morning += cur.minutes
      }
      else if (Number(cur.field) >= 12 && Number(cur.field) < 18) {
        result.afternoon += cur.minutes
      }
      else if (Number(cur.field) >= 18 && Number(cur.field) < 24) {
        result.evening += cur.minutes
      }
      else {
        result.midnight += cur.minutes
      }
    }
  }

  return result
})

const hourString = computed(() => {
  return Object.entries(dayPeriods.value).map(([key, value]) => {
    return `${t.value.annualReport.priodOfDay[key as keyof typeof t.value.annualReport.priodOfDay]}: ${getDurationString(value * 60 * 1000, ['hours'])} (${(value / sumMinutes.value * 100).toFixed(0)}%)`
  }).join(' · ')
})

// 双休日编程时间占比
const weekendMinutes = computed(() => {
  if (yearlyData.value) {
    let sum = 0
    for (const cur of yearlyData.value.dailyDistribution) {
      const day = new Date(cur.field).getDay()
      if (day === 0 || day === 6) {
        sum += cur.minutes
      }
    }
    return sum
  }
  return 0
})
const weekendMinutesRatio = computed(() => {
  if (yearlyData.value) {
    return weekendMinutes.value / sumMinutes.value
  }
  return 0
})
const locale = useLocale()
const monthlyMinutes = computed(() => {
  const resp: Record<string, number> = {}
  for (const data of yearlyData.value?.dailyDistribution ?? []) {
    const date = new Date(data.field)
    const month = date.getMonth()
    if (!resp[month]) {
      resp[month] = 0
    }
    resp[month] += data.minutes
  }
  return Object.keys(resp).map((key) => {
    const monthStr = new Date(2024, Number(key), 1).toLocaleString(locale.value, { month: 'long' })
    return {
      month: Number(key),
      field: monthStr,
      minutes: resp[key],
    }
  }).sort((a, b) => a.month - b.month)
})
const allMonths = computed(() => {
  return Array.from({ length: 12 }, (_, i) => {
    return new Date(2024, i, 1).toLocaleString(locale.value, { month: 'long' })
  })
})
const averageMonthlyMinutes = computed(() => {
  if (yearlyData.value) {
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
  if (yearlyData.value) {
    return yearlyData.value.topLanguages[0]
  }
  return null
})
</script>

<template>
  <NuxtLayout name="user">
    <div
      v-if=" yearlyData?.dailyDistribution.length === 0 || !user"
      class="m-32 mx-auto max-w-820px"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="text-4xl font-bold">
          No Data
        </div>
        <div class="text-surface-dimmed">
          No data available for 2024
        </div>
      </div>
    </div>
    <div
      v-else
      class="mx-auto max-w-820px p-2"
    >
      <div class="mb-6 mt-8 flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold">
          {{ t.annualReport.annualCodeTimeReport('2024') }}
        </h1>
      </div>
      <div
        v-if="user"
        class="mb-12 flex justify-center"
      >
        <div class="flex gap-2">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            class="h-10 w-10 rounded-full"
          >
          <div>
            <div class="text-sm font-bold">
              {{ user.username }}
            </div>
            <div class="text-xs text-surface-dimmed">
              {{ user.email }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-32 mt-4 flex flex-col items-center">
          <HeaderComponent
            :title="t.annualReport.totalCodingTimeOfTheYear"
            :value="getDurationString(sumMinutes * 60 * 1000)"
          />
          <YearCalendarChart
            :data="yearCalendarData"
            :end-date="new Date(2024, 11, 31)"
          />
          <div class="w-full flex items-center gap-4">
            <div>
              <div class="text-3xl text-primary">
                {{ (weekendMinutesRatio * 100).toFixed(0) }}%
              </div>
              <div class="text-sm text-surface-dimmed">
                {{ t.annualReport.weekendCodingTimeRatio }}
              </div>
            </div>
            <div>
              <div class="text-3xl text-primary">
                {{ getDurationString(averageMinutes * 60 * 1000, ["hours", "minutes"]) }}
              </div>
              <div class="text-sm text-surface-dimmed">
                {{ t.annualReport.averageDailyCodingTime }}
              </div>
            </div>
          </div>
        </div>

        <div class="mb-32 mt-4 flex flex-col items-center">
          <HeaderComponent
            :title="t.annualReport.busiestMonthOfTheYear"
            :value="(() => { if (monthlyMinutes.length === 0) return ''; const maxMinutes = Math.max(...monthlyMinutes.map((d) => d.minutes || 0)); const busiestMonth = monthlyMinutes.find((d) => (d.minutes || 0) === maxMinutes); return busiestMonth ? `${busiestMonth.field} (${getDurationString((busiestMonth.minutes || 0) * 60 * 1000)})` : ''; })()"
          />
          <div class="h-300px max-h-300px max-w-800px w-800px">
            <PoltChart
              :options="{
                x: {
                  type: 'band',
                  label: t.annualReport.month,
                  domain: allMonths,
                },
                y: {
                  label: t.annualReport.minutes,
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
            v-if="mostProductiveHour"
            :title="t.annualReport.theMostProductiveHourOfTheYear"
            :value="`${mostProductiveHour.field}:00 - ${mostProductiveHour.field}:59`"
            :extra="hourString"
          />
          <div class="h-300px max-h-300px max-w-800px w-800px">
            <PoltChart
              :options="{
                x: {
                  type: 'band',
                  label: t.annualReport.hour,
                  domain: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05'],
                },
                y: {
                  label: t.annualReport.minutes,
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
            :title="t.annualReport.theMostUsedLanguageOfTheYear"
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
              v-for="lang in yearlyData?.topLanguages.slice(1)"
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
        <div class="flex justify-center">
          <Btn
            size="lg"
            @click="() => share({
              title: `${user?.username} - ${t.annualReport.annualCodeTimeReport('2024')}`,
              url: `https://codetime.dev/${locale}/user/${uid}/annual-report`,
            })"
          >
            <i class="i-tabler-share h-5 w-5" />
            <span>
              {{ t.annualReport.shareMyReport }}
            </span>
          </Btn>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
