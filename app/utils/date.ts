import type { Ref } from 'vue'

export function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function endOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime()
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

export function diffDays(a: Date, b: Date): number {
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000)))
}

// ISO-week Monday — matches `date_trunc('week', …)` on the server side.
export function startOfIsoWeek(d: Date): Date {
  const x = startOfDay(d)
  const dow = (x.getDay() + 6) % 7
  x.setDate(x.getDate() - dow)
  return x
}

export type ResolvedRangeBounds = {
  start: Date | null
  end: Date | null
  days: number
}

// Numeric preset-id grammar ('rolling:28', 'week:-1', 'month:0').
// Single owner of the syntax and validity rules — rolling spans are
// ≥ 1 day, week/month offsets point at the current or a past window —
// shared by resolveRangePreset and DataRange's parsePreset so the two
// can never accept different sets of ids.
export type NumericRangePreset
  = | { kind: 'rolling', days: number }
    | { kind: 'week', offset: number }
    | { kind: 'month', offset: number }

export function parseNumericPreset(raw: string): NumericRangePreset | null {
  const m = /^(rolling|week|month):(-?\d+)$/.exec(raw)
  if (!m) {
    return null
  }
  const n = Number(m[2])
  if (!Number.isFinite(n)) {
    return null
  }
  if (m[1] === 'rolling') {
    return n >= 1 ? { kind: 'rolling', days: n } : null
  }
  if (n > 0) {
    return null
  }
  return { kind: m[1] as 'week' | 'month', offset: n }
}

// Write resolved bounds into a caller's range refs. Writes are
// identity-preserving — a fresh Date with an equal timestamp would
// still re-trigger fetch watchers keyed on these refs by reference —
// so equal timestamps skip the write. Shared by DataRange and
// UnifiedUserDashboard so their re-anchor paths stay equivalent.
export function applyResolvedBounds(
  bounds: ResolvedRangeBounds,
  refs: { start: Ref<Date | null>, end: Ref<Date | null>, days: Ref<number> },
): void {
  if (refs.start.value?.getTime() !== bounds.start?.getTime()) {
    refs.start.value = bounds.start
  }
  if (refs.end.value?.getTime() !== bounds.end?.getTime()) {
    refs.end.value = bounds.end
  }
  refs.days.value = bounds.days
}

// Resolve a persisted range-preset id ('today', 'ytd', 'week:-1',
// 'rolling:28', 'custom:now', …) to concrete bounds anchored at `now`.
// Single source of truth for the dashboard date-range presets: both
// DataRange (on pick/restore) and UnifiedUserDashboard (re-anchoring
// the persisted range before its stats fetchers fire) derive bounds
// from here, so a stale localStorage window from a previous visit
// cannot survive a reload. Returns null for ids whose bounds do not
// derive from the clock alone: a frozen 'custom' range (its stored
// dates are the truth), a 'custom:now' with no stored start, or an
// unknown id.
export function resolveRangePreset(
  preset: string | null | undefined,
  opts?: { customStart?: Date | null, now?: Date },
): ResolvedRangeBounds | null {
  if (!preset) {
    return null
  }
  const now = opts?.now ?? new Date()
  const today = startOfDay(now)
  if (preset === 'today') {
    return { start: today, end: endOfDay(today), days: 1 }
  }
  if (preset === 'ytd') {
    const first = new Date(today.getFullYear(), 0, 1)
    const end = endOfDay(today)
    return { start: first, end, days: diffDays(first, end) }
  }
  if (preset === 'all') {
    return { start: null, end: null, days: 36_500 }
  }
  if (preset === 'custom:now') {
    // The persisted end was "today" at pick time — re-anchor it to the
    // current day so the window keeps tracking now across reloads.
    const customStart = opts?.customStart
    if (!customStart) {
      return null
    }
    const start = startOfDay(customStart)
    const end = endOfDay(today)
    return { start, end, days: diffDays(start, end) }
  }
  const parsed = parseNumericPreset(preset)
  if (!parsed) {
    return null
  }
  if (parsed.kind === 'rolling') {
    return { start: null, end: null, days: parsed.days }
  }
  if (parsed.kind === 'week') {
    const monday = addDays(startOfIsoWeek(today), parsed.offset * 7)
    const end = endOfDay(addDays(monday, 6))
    return { start: monday, end, days: diffDays(monday, end) }
  }
  const anchor = addMonths(today, parsed.offset)
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const end = endOfDay(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0))
  return { start: first, end, days: diffDays(first, end) }
}

export function getWeekDifference(currentDate: Date, baseDate: Date): number {
  const time1 = currentDate.getTime()
  const time2 = baseDate.getTime()
  const day = baseDate.getUTCDay()
  const refTime = (7 - day) * 24 * 60 * 60 * 1000 + time2
  const timeDiff = Math.abs(Math.abs(refTime - time1))
  const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000
  const weekDiff = Math.ceil(timeDiff / oneWeekInMillis)
  return -weekDiff
}
