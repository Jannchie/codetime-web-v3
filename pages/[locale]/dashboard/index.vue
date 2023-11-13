<script setup lang="ts">
import { Icon } from '@iconify/vue'
import * as d3 from 'd3'
import * as Plot from '@observablehq/plot'

definePageMeta({
  layout: 'dashboard',
})
const allData = await fetchStats('time', 525600, 'days')
const hasData = computed(() => {
  if (allData.data === null) {
    return false
  }
  return (allData.data.value?.data.length ?? 0) > 0
})

let languageTopData: globalThis.Ref<globalThis.TopData[] | null>
let projectTopData: globalThis.Ref<globalThis.TopData[] | null>
let platformTopData: globalThis.Ref<globalThis.TopData[] | null>
if (hasData) {
  languageTopData = (await fetchTop('language', 1440, 5, {
    transform(data) {
      return data.map((d) => {
        d.icon = iconMap.get(d.field)
        d.field = getLanguageName(d.field)
        return d
      })
    },
  }))
  projectTopData = await fetchTop('project', 1440, 5)
  platformTopData = await fetchTop('platform', 1440, 5, {
    transform(data) {
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
    },
  })
}
const totalMinutes = computed(() => {
  if (allData.data === null) {
    return 0
  }
  return allData.data.value?.data.reduce((acc, cur) => acc + cur.duration, 0) ?? 0
})

const todayMinutes = computed(() => {
  if (allData.data === null) {
    return 0
  }
  const today = new Date()
  const todayString = today.toISOString().slice(0, 10)
  const todayData = allData.data.value?.data.find(d => d.time.slice(0, 10) === todayString)
  return todayData?.duration ?? 0
})

const yearStartDate = d3.utcDay.offset(new Date(), -365)
const dateListPastYear = d3.utcDay.range(yearStartDate, new Date())
const dataMap = new Map<string, number | string>()
dateListPastYear.forEach((d) => {
  dataMap.set(d.toISOString().slice(0, 10), 0)
})

const pData = computed(() => {
  const data = allData.data.value?.data ?? []
  data.forEach((d) => {
    const date = new Date(d.time)
    const key = date.toISOString().slice(0, 10)
    dataMap.set(key, d.duration)
  })
  const res = Array.from(dataMap.entries()).map(([key, duration]) => ({
    date: new Date(key),
    duration,
  })).sort((a, b) => b.date.getTime() - a.date.getTime())
  return res
})

const yearData = computed(() => {
  const data = pData.value
  const res = data.filter((d) => {
    return d.date.getTime() >= yearStartDate.getTime()
  })
  return res
})

const currentStreak = computed(() => {
  if (allData.data === null) {
    return 0
  }
  let streak = 0
  for (let i = 0; i < pData.value.length; i++) {
    const d = pData.value[i]
    if (d.duration === 0) {
      break
    }
    streak++
  }
  return streak
})

const maxStreak = computed(() => {
  if (allData.data === null) {
    return 0
  }
  let streak = 0
  let maxStreak = 0
  for (let i = 0; i < pData.value.length; i++) {
    const d = pData.value[i]
    if (d.duration === 0) {
      maxStreak = Math.max(maxStreak, streak)
      streak = 0
      continue
    }
    streak++
  }
  return maxStreak
})

const latestWeekDate = computed(() => {
  return yearData.value[yearData.value.length - 1].date
})

function getWeekDifference(date1: Date, date2: Date): number {
  const time1 = date1.getTime()
  const time2 = date2.getTime()
  const day = date2.getUTCDay()
  const timeDiff = Math.abs(Math.abs(time2 - time1) + day * 24 * 60 * 60 * 1000)
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000
  const weekDiff = Math.floor(timeDiff / oneWeekInMillis)
  return weekDiff
}

const options = {
  width: 700,
  height: 130,
  x: {
    axis: null,
    tickFormat: Plot.formatWeekday('en'),
    tickSize: 0,
  },
  y: {
    tickSize: 0,
    tickFormat: Plot.formatWeekday('en'),
  },
  color: {
    interpolate: (d: number) => {
      if (d === 0) {
        return '#0004'
      }
      return d3.scaleQuantile([0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.2, 0.4, 0.6, 0.8, 1].map(d3.interpolateRgb('#38bdf822', '#38bdf8')))(d)
    },
  },
  marks: [
    Plot.cell(yearData.value, {
      fill: 'duration',
      x: (d) => {
        const deltaWeek = getWeekDifference(d.date, latestWeekDate.value)
        return deltaWeek
      },
      y: d => d.date.getUTCDay(),
      tip: {
        channels: {
          date: {
            label: '日期',
            value: d => d.date.toISOString().slice(0, 10),
          },
          duration: {
            label: '时间',
            value: d => getDurationString(d.duration),
          },
        },
        format: {
          fill: false,
          x: false,
          y: false,
        },
        stroke: '#404040',
        strokeWidth: 1,
      },
      rx: 2,
      ry: 2,
      stroke: '#1e1e1e',
      inset: 0.5,
    }),
  ],
}
</script>

<template>
  <DashboardPageTitle
    title="总览"
    description="查看您的所有 CodeTime 数据。"
  />
  <DashboardPageContent v-if="hasData">
    <CardBase class="p-0!">
      <div class="p-4 flex flex-col">
        <div class="flex gap-2 children:flex-basis-[200px]">
          <DashboardDataBody
            title="编程时间/总计"
            :value="getDurationString(totalMinutes)"
          />
          <DashboardDataBody
            title="编程时间/今日"
            :value="getDurationString(todayMinutes)"
          />
          <DashboardDataBody
            title="连续天数/当前"
            :value="formateDays(currentStreak)"
          />
          <DashboardDataBody
            title="连续天数/最大"
            :value="formateDays(maxStreak)"
          />
        </div>
        <div class="overflow-x-auto">
          <div class="min-w-[700px]">
            <PoltRenderer
              class="flex"
              :options="options"
              @pointerup="(e: PointerEvent, d: any) => console.log(e, d)"
            />
          </div>
        </div>
      </div>
    </CardBase>
    <div
      class="flex gap-2 flex-wrap flex-basis-[100%] flex-col sm:flex-row sm:children:flex-basis-[calc(100%/3-(0.5rem)*2/3)] sm:children:max-w-[calc(100%/3-(0.5rem)*2/3)]"
    >
      <DashboardTopCard
        icon="i-tabler-braces"
        title="语言"
        :data="languageTopData"
      />
      <DashboardTopCard
        icon="i-tabler-app-window"
        title="项目"
        :data="projectTopData"
      />
      <DashboardTopCard
        icon="i-tabler-terminal"
        title="平台"
        :data="platformTopData"
      />
    </div>
  </DashboardPageContent>
  <DashboardPageContent v-else>
    <CardBase class="p-6 flex gap-2">
      <div>
        <i
          class="w-6 h-6 text-sky-6 i-mdi:alert-circle-outline"
        />
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-sky-6 font-black">
          还没有数据
        </div>
        <div class="text-sm">
          <span class="op50">
            目前，我们尚未收到您的编码时间记录。我们的应用程序依赖于代码编辑器或集成开发环境（例如 VSCode、JetBrains IDE ）的插件。为了确保正常运作，请您前往
          </span>
          <NuxtLink
            to="dashboard/settings"
            class="text-sky-6"
          >
            [ 设置 ]
          </NuxtLink>
          <span class="op50">
            页面并在您所使用的支持插件的代码编辑器中进行相应配置。感谢您的合作。
          </span>
        </div>
      </div>
    </CardBase>
  </DashboardPageContent>
</template>
