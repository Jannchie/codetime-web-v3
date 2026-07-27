<script setup lang="ts">
import type { VibeOverviewBucket, VibeSummary } from './types'
import { computed } from 'vue'
import { useExchangeRate } from '~/composables/useExchangeRate'
import { compactParts as compact, elapsedBuckets, fmtDurationParts } from './types'

// Six KPI tiles laid out as a 6-col grid (collapses to 3-col then
// 2-col on narrower viewports). The shape and sparkline behaviour
// match agent-time/KpiGrid.vue intentionally so the visual language
// is identical; the only change is the colour palette (ct-* tokens).

const props = defineProps<{
  summary: VibeSummary
  overview: VibeOverviewBucket[]
  totalCostUsd?: number
}>()

const { formatCompactNumber, currencyMeta } = useExchangeRate()

type Kpi = {
  index: string
  label: string
  value: string
  unit?: string
  delta?: { sign: 1 | -1 | 0, label: string }
  caption: string
  spark: number[]
  accentValue?: boolean
}

// Half-and-half trend: compare the sum of the latter half to the
// earlier half. Same heuristic as agent-time; not statistically
// rigorous but matches user intuition for "is it trending up?"
//
// The two halves must be the same WIDTH — these are sums, not means,
// so an odd bucket count handing the tail one extra bucket reports a
// flat window as +8% (27 elapsed days => 14 vs 13). On an odd count
// the middle bucket is dropped rather than assigned to either side.
function trend(buckets: number[]): { sign: 1 | -1 | 0, label: string } {
  if (buckets.length < 4) {
    return { sign: 0, label: '—' }
  }
  const half = Math.floor(buckets.length / 2)
  const head = buckets.slice(0, half).reduce((s, v) => s + v, 0)
  const tail = buckets.slice(buckets.length - half).reduce((s, v) => s + v, 0)
  if (head === 0 && tail === 0) {
    return { sign: 0, label: '0%' }
  }
  if (head === 0) {
    return { sign: 1, label: '+∞' }
  }
  const change = (tail - head) / head
  if (Math.abs(change) < 0.005) {
    return { sign: 0, label: '0%' }
  }
  const sign: 1 | -1 = change > 0 ? 1 : -1
  return { sign, label: `${change > 0 ? '+' : ''}${(change * 100).toFixed(0)}%` }
}

const t = useI18N()
const L = computed(() => t.value.dashboard.agent?.labels?.kpi)
const trendHint = computed(() => L.value?.trendHint ?? 'Trend: second half of the selected range vs the first half — not a comparison with the previous period.')

type MetricKey = 'activity' | 'sessions' | 'tokens' | 'linesChanged' | 'estimatedCostUsd'

const kpis = computed<Kpi[]>(() => {
  const spine = props.overview
  const started = elapsedBuckets(spine)
  // Both halves of every tile that reads the bucket spine. Sparklines
  // draw the full spine so the KPI x-extent lines up with the timeline
  // below; the delta compares only buckets that have started, since
  // the spine's trailing zeros would otherwise read as a decline.
  // Stated once here so a tile can't take its spark and its delta
  // from different windows.
  const series = (key: MetricKey) => ({
    spark: spine.map(item => item[key]),
    delta: trend(started.map(item => item[key])),
  })

  const activity = series('activity')
  const sessions = series('sessions')
  const tokens = series('tokens')
  const costSeries = series('estimatedCostUsd')
  const linesChanged = series('linesChanged')

  const totalTokens = props.summary.totalTokens
  const totalCommands = props.summary.totalCommandCalls
  const totalTools = props.summary.totalToolCalls
  const linesNet = props.summary.totalLinesAdded - props.summary.totalLinesRemoved
  const cost = props.totalCostUsd ?? 0

  const eventsCompact = compact(props.summary.totalEvents)
  const sessionsCompact = compact(props.summary.totalSessions)
  const linesNetCompact = compact(linesNet)
  const tokensCompact = compact(totalTokens)
  const durationMs = props.summary.totalDurationMs
  const timeCompact = fmtDurationParts(durationMs)

  const inCompact = compact(props.summary.totalInputTokens)
  const outCompact = compact(props.summary.totalOutputTokens)

  const l = L.value
  return [
    {
      index: '01',
      label: l?.events ?? 'events',
      value: eventsCompact.value,
      unit: eventsCompact.unit,
      caption: `${totalTools.toLocaleString()} ${l?.tools ?? 'tool'} · ${totalCommands.toLocaleString()} ${l?.cmd ?? 'cmd'}`,
      ...activity,
    },
    {
      index: '02',
      label: l?.sessions ?? 'sessions',
      value: sessionsCompact.value,
      unit: sessionsCompact.unit,
      caption: `${props.summary.totalProjects} ${l?.projects ?? 'projects'}`,
      ...sessions,
    },
    {
      index: '03',
      label: l?.tokens ?? 'tokens',
      value: tokensCompact.value,
      unit: tokensCompact.unit,
      caption: `${inCompact.value}${inCompact.unit ?? ''} ${l?.inSuffix ?? 'in'} · ${outCompact.value}${outCompact.unit ?? ''} ${l?.outSuffix ?? 'out'}`,
      ...tokens,
    },
    {
      index: '04',
      label: l?.cost ?? 'cost',
      value: cost > 0 ? formatCompactNumber(cost) : '—',
      unit: undefined,
      caption: cost > 0 ? (l?.estimated ?? 'estimated') : '—',
      ...costSeries,
      accentValue: true,
    },
    {
      index: '05',
      label: l?.time ?? 'time',
      value: timeCompact.value,
      unit: timeCompact.unit,
      caption: l?.agentActive ?? 'agent active',
      ...sessions,
    },
    {
      index: '06',
      label: l?.linesNet ?? 'lines net',
      value: `${linesNet >= 0 ? '+' : ''}${linesNetCompact.value}`,
      unit: linesNetCompact.unit,
      caption: `+${props.summary.totalLinesAdded.toLocaleString()} / −${props.summary.totalLinesRemoved.toLocaleString()}`,
      ...linesChanged,
    },
  ]
})
</script>

<template>
  <div class="kpis">
    <div
      v-for="kpi in kpis"
      :key="kpi.index"
      class="kpi"
    >
      <div class="head">
        <span class="kpi-label">{{ kpi.label }}</span>
        <span
          v-if="kpi.delta"
          class="kpi-delta"
          :class="{ up: kpi.delta.sign === 1, down: kpi.delta.sign === -1, flat: kpi.delta.sign === 0 }"
          :title="trendHint"
        >
          {{ kpi.delta.label }}
        </span>
      </div>
      <div class="value">
        <span v-if="kpi.accentValue" class="value-prefix">{{ currencyMeta.symbol }}</span>
        <span class="value-num">{{ kpi.value }}</span>
        <span v-if="kpi.unit" class="value-unit">{{ kpi.unit }}</span>
      </div>
      <VibeSparkline
        :values="kpi.spark"
        color="var(--ct-primary)"
        :width="220"
        :height="28"
        :fill="false"
      />
      <div class="caption">
        {{ kpi.caption }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.kpis {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.kpi {
  position: relative;
  border-right: 1px solid var(--ct-border);
  padding: 18px 22px 14px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  transition: background 160ms ease;
}

.kpi:hover { background: var(--ct-surface-1); }
.kpi:last-child { border-right: none; }

.head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
}

.kpi-label {
  font-size: 13.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ct-fg-muted);
}

.kpi-delta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12.5px;
  letter-spacing: 0.04em;
  color: var(--ct-fg-muted);
  font-family: var(--ct-font-mono);
  font-variant-numeric: tabular-nums;
}

.kpi-delta.up   { color: var(--ct-success); }
.kpi-delta.down { color: var(--ct-danger); }
.kpi-delta.flat { color: var(--ct-fg-subtle); }

.value {
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.value-prefix {
  font-size: 14px;
  color: var(--ct-primary);
  margin-right: 1px;
}

.value-num {
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--ct-primary);
  line-height: 1.05;
  font-family: var(--ct-font-mono);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.value-unit {
  font-size: 12px;
  color: var(--ct-fg-muted);
  margin-left: 2px;
  font-family: var(--ct-font-mono);
}

.caption {
  font-size: 12px;
  color: var(--ct-fg-muted);
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

:deep(svg) { width: 100%; }

@media (max-width: 1100px) {
  .kpis { grid-template-columns: repeat(3, 1fr); }
  .kpi:nth-child(3n) { border-right: none; }
  .kpi:nth-child(n + 4) { border-top: 1px solid var(--ct-border); }
}

@media (max-width: 720px) {
  .kpis { grid-template-columns: repeat(2, 1fr); }
  .kpi { border-right: 1px solid var(--ct-border); }
  .kpi:nth-child(2n) { border-right: none; }
  .kpi:nth-child(n + 3) { border-top: 1px solid var(--ct-border); }
}
</style>
