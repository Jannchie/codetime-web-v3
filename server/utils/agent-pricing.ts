// Model pricing pulled from OpenRouter's models API.
// Source: https://openrouter.ai/api/v1/models
// Falls back to a small built-in subset if the network is unavailable.
//
// Ported verbatim from agent-time/apps/api/src/pricing.ts so the Vibe
// dashboard renders the same cost figures as the agent-time UI. Keep
// the FALLBACK table in sync when agent-time updates its prices.
//
// A price is a *schedule*, not a number. Two time dimensions exist:
//
//   1. Effective dates — a provider changing its rate must not re-price
//      history. DeepSeek's 2026-08-16 change raises every rate, so
//      applying it retroactively would overstate old months by up to 4.7x.
//   2. Time of day — DeepSeek bills peak and off-peak rates depending on
//      the UTC hour a request lands in.
//
// Everything else in the catalogue has a single flat period and pays no
// cost for those dimensions existing: `ratesFor` short-circuits to the
// one rate card and the SQL side never splits those rows by hour.
//
// Note ccusage has nothing to port here — as of its 2026-08-14 HEAD it
// has no time-of-day or effective-date pricing at all (its only tiering
// is long-context `*_above_200k` plus a fast multiplier), and neither
// LiteLLM nor models.dev carry time-window fields.

const SOURCE_URL = 'https://openrouter.ai/api/v1/models'

const REFRESH_MS = 24 * 60 * 60 * 1000

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

// Per-token USD rates. One card = the price of everything at one instant.
// RATE_KEYS is the field list every rate-card transform iterates, so adding
// a sixth cost dimension means touching the constructors only, never the
// scale/blend arithmetic.
const RATE_KEYS = [
  'inputCostPerToken',
  'cacheCreationInputCostPerToken',
  'cacheReadInputCostPerToken',
  'cachedInputCostPerToken',
  'outputCostPerToken',
] as const

type Rates = Record<(typeof RATE_KEYS)[number], number>

// The rate card actually applied to a row, plus provenance. This is the
// shape the dashboard serialises into its per-model `pricing` block, so
// it stays flat — the schedule is resolved before it gets here.
export type ModelPrice = Rates & {
  displayName?: string
  source: 'openrouter' | 'fallback' | 'override' | 'missing'
}

// One contiguous slice of a model's price history. `rates` is the flat
// (or off-peak) card; `peak` overrides it inside daily [startHour, endHour)
// **UTC** windows. Whole hours only — the SQL side anchors rows to a UTC
// hour, so a window boundary at :30 could not be honoured exactly.
type PricePeriod = {
  from: number
  rates: Rates
  peak?: { windowsUtc: Array<[number, number]>, rates: Rates }
}

type PriceSchedule = {
  displayName?: string
  source: ModelPrice['source']
  // Ascending by `from`. The first entry opens at -Infinity so any
  // timestamp resolves.
  periods: PricePeriod[]
  // SQL LIKE patterns (lowercase) matching every stored spelling of this
  // model. REQUIRED on any schedule that is time-sensitive (more than one
  // period, or any peak window): it is what tells the query layer to split
  // these rows by UTC hour so each hour can take its own rate. Match the
  // whole vendor rather than one model id — over-matching only costs a few
  // extra (correctly priced) rows, under-matching silently mis-prices.
  sqlMatch?: string[]
}

type CatalogState = {
  loadedAt: number
  status: 'ready' | 'stale' | 'missing'
  table: Record<string, PriceSchedule>
  raw: Map<string, PriceSchedule>
  source: 'openrouter' | 'fallback'
}

const FALLBACK: Record<string, PriceSchedule> = {
  'gpt-5': fbPrice('GPT-5', 1.25e-6, 1.25e-7, 1e-5),
  'gpt-5-codex': fbPrice('GPT-5 Codex', 1.25e-6, 1.25e-7, 1e-5),
  'gpt-5.1': fbPrice('GPT-5.1', 1.25e-6, 1.25e-7, 1e-5),
  'gpt-5.1-codex': fbPrice('GPT-5.1 Codex', 1.25e-6, 1.25e-7, 1e-5),
  'gpt-5.1-codex-max': fbPrice('GPT-5.1 Codex Max', 1.25e-6, 1.25e-7, 1e-5),
  'gpt-5.1-codex-mini': fbPrice('GPT-5.1 Codex Mini', 2.5e-7, 2.5e-8, 2e-6),
  'gpt-5.2-codex': fbPrice('GPT-5.2 Codex', 1.75e-6, 1.75e-7, 1.4e-5),
  'gpt-5.3-codex': fbPrice('GPT-5.3 Codex', 1.75e-6, 1.75e-7, 1.4e-5),
  'gpt-5.4': fbPrice('GPT-5.4', 2.5e-6, 2.5e-7, 1.5e-5),
  'gpt-5.4-mini': fbPrice('GPT-5.4 Mini', 7.5e-7, 7.5e-8, 4.5e-6),
  'gpt-5.5': fbPrice('GPT-5.5', 5e-6, 5e-7, 3e-5),
  // The 5.6 family is the first OpenAI tier OpenRouter reports an
  // `input_cache_write` for (1.25× input), so these carry an explicit
  // cache-creation rate instead of defaulting it to the cache-read rate.
  'gpt-5.6-sol': fbPrice('GPT-5.6 Sol', 5e-6, 5e-7, 3e-5, 6.25e-6),
  'gpt-5.6-luna': fbPrice('GPT-5.6 Luna', 1e-6, 1e-7, 6e-6, 1.25e-6),
  'gpt-5.6-terra': fbPrice('GPT-5.6 Terra', 2.5e-6, 2.5e-7, 1.5e-5, 3.125e-6),
  'gpt-5-mini': fbPrice('GPT-5 Mini', 2.5e-7, 2.5e-8, 2e-6),
  'gpt-5-nano': fbPrice('GPT-5 Nano', 5e-8, 5e-9, 4e-7),
  'claude-sonnet-4-6': fbPrice('Claude Sonnet 4.6', 3e-6, 3e-7, 1.5e-5, 3.75e-6),
  // Sonnet 5 is on introductory pricing ($2/$10 per MTok) through
  // 2026-08-31; list price afterwards is $3/$15. Rows here are best-effort
  // degraded-mode approximations, not a historical price archive —
  // OpenRouter is the source of truth whenever it is reachable. (The
  // schedule below *can* express the step-up; it is deliberately not used
  // for Anthropic because OpenRouter tracks those rates for us.)
  'claude-sonnet-5': fbPrice('Claude Sonnet 5', 2e-6, 2e-7, 1e-5, 2.5e-6),
  'claude-opus-4-6': fbPrice('Claude Opus 4.6', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-4-7': fbPrice('Claude Opus 4.7', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-4-8': fbPrice('Claude Opus 4.8', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-5': fbPrice('Claude Opus 5', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-fable-5': fbPrice('Claude Fable 5', 1e-5, 1e-6, 5e-5, 1.25e-5),
  'claude-haiku-4-5': fbPrice('Claude Haiku 4.5', 1e-6, 1e-7, 5e-6, 1.25e-6),
  // Retired 2026-07-24 in favour of the v4 family; kept because stored
  // model strings are immortal and old rows still price against them.
  'deepseek-chat': fbPrice('DeepSeek Chat', 2.8e-7, 2.8e-8, 4.2e-7),
  'deepseek-reasoner': fbPrice('DeepSeek Reasoner', 2.8e-7, 2.8e-8, 4.2e-7),
  // The v4 family lives in OVERRIDES, not here — see below.
}

// ---------------------------------------------------------------------
// DeepSeek — first-party schedules that OUTRANK the OpenRouter catalogue.
// ---------------------------------------------------------------------
//
// Two independent reasons these are overrides rather than fallbacks:
//
//   1. OpenRouter's model-level `pricing` block reports whichever endpoint
//      it routes to by default. For `deepseek/deepseek-v4-pro` that is a
//      reseller at $1.168/$2.336 per MTok — 2.7× DeepSeek's own
//      $0.435/$0.87, which is only visible via
//      /api/v1/models/<id>/endpoints. Users calling the first-party API
//      (the overwhelmingly common case for a `deepseek-v4-pro` row) were
//      being priced at the reseller rate whenever OpenRouter was up.
//   2. OpenRouter publishes one number per model and has no way to
//      express a peak/off-peak schedule at all.
//   3. Its cache-read numbers are unreliable for this vendor: it quotes
//      $0.028/MTok for v4-flash, 10x DeepSeek's published $0.0028, while
//      quoting v4-pro's $0.003625 exactly right. These workloads are
//      overwhelmingly cache reads, so that one field moved 30 days of
//      measured DeepSeek spend across all users from $217 to $58.
//
// Source of truth: https://api-docs.deepseek.com/quick_start/pricing/
const DEEPSEEK_PEAK_FROM_MS = Date.UTC(2026, 7, 16, 16, 0, 0)

// 01:00-04:00 and 06:00-10:00 UTC — i.e. 09:00-12:00 / 14:00-18:00 in
// Beijing, DeepSeek's home working hours. Off-peak is everything else,
// billed at exactly half the peak rate.
const DEEPSEEK_PEAK_WINDOWS_UTC: Array<[number, number]> = [[1, 4], [6, 10]]

// DeepSeek publishes three prices per model — cache hit, cache miss and
// output, in $/MTok. There is deliberately no cache-*write* price: writing
// the context cache is free, and the tokens that missed are billed at the
// plain input (miss) rate. So cacheCreation === input here, NOT the hit
// rate that `fbPrice` would otherwise default it to — that default was
// under-charging DeepSeek cache creation by ~30-50×.
function deepseekRates(hitPerMTok: number, missPerMTok: number, outputPerMTok: number): Rates {
  return {
    inputCostPerToken: missPerMTok / 1e6,
    cacheCreationInputCostPerToken: missPerMTok / 1e6,
    cacheReadInputCostPerToken: hitPerMTok / 1e6,
    cachedInputCostPerToken: hitPerMTok / 1e6,
    outputCostPerToken: outputPerMTok / 1e6,
  }
}

const DEEPSEEK_SQL_MATCH = ['%deepseek%']

const OVERRIDES: Record<string, PriceSchedule> = {
  'deepseek-v4-flash': {
    displayName: 'DeepSeek V4 Flash',
    source: 'override',
    sqlMatch: DEEPSEEK_SQL_MATCH,
    periods: [
      { from: Number.NEGATIVE_INFINITY, rates: deepseekRates(0.0028, 0.14, 0.28) },
      {
        from: DEEPSEEK_PEAK_FROM_MS,
        rates: deepseekRates(0.007, 0.22, 0.66),
        peak: { windowsUtc: DEEPSEEK_PEAK_WINDOWS_UTC, rates: deepseekRates(0.014, 0.44, 1.32) },
      },
    ],
  },
  'deepseek-v4-pro': {
    displayName: 'DeepSeek V4 Pro',
    source: 'override',
    sqlMatch: DEEPSEEK_SQL_MATCH,
    periods: [
      { from: Number.NEGATIVE_INFINITY, rates: deepseekRates(0.003_625, 0.435, 0.87) },
      {
        from: DEEPSEEK_PEAK_FROM_MS,
        rates: deepseekRates(0.022, 0.66, 1.98),
        peak: { windowsUtc: DEEPSEEK_PEAK_WINDOWS_UTC, rates: deepseekRates(0.044, 1.32, 3.96) },
      },
    ],
  },
}

// Column name carrying a row's pricing time anchor: the start of the UTC
// hour its tokens were spent in, as epoch seconds, or NULL when the model's
// price does not vary with time. `estimateCostFromRow` reads it and
// `priceAnchorSql` (agent-pricing-sql.ts) emits it — this constant is the
// only place the name is written.
export const PRICE_ANCHOR_COLUMN = 'price_hour_epoch'

// Every LIKE pattern the query layer must split by UTC hour, derived from
// the schedules themselves so the two can never drift: a vendor that
// gains a peak schedule declares `sqlMatch` next to its periods and the
// query layer follows automatically.
export const TIME_SENSITIVE_MODEL_SQL_PATTERNS: readonly string[] = [
  ...new Set(
    [...Object.values(OVERRIDES), ...Object.values(FALLBACK)]
      .filter(schedule => isTimeSensitive(schedule))
      .flatMap(schedule => schedule.sqlMatch ?? []),
  ),
]

// Fast / priority inference variants. Mirrors agent-time/apps/api/src/
// pricing.ts so the fallback table can still price fast tiers when
// OpenRouter is unreachable or has not yet catalogued a variant.
//
// The multiplier is NOT constant — the known values are mirrored from
// ccusage's fast-multiplier-overrides.json
// (/root/codetime/ccusage/rust/crates/ccusage/src/): Opus 4.6/4.7 ×6
// ($30/$150), Opus 4.8 ×2 ($10/$50, Anthropic's published fast-mode rate),
// gpt-5.5 ×2.5, gpt-5.4 / gpt-5.3-codex ×2. Opus 5 follows 4.8; the rest of
// the Codex tiers use ×2 as the house default, since upstream has not
// published a rate for them. Sonnet and Haiku have no fast variant — do not
// synthesize one.
//
// These entries are the ONLY source for Codex fast/priority rows: OpenRouter
// catalogues no `gpt-5.x-fast` model at all, and drops Anthropic fast
// variants when they retire upstream (4.6-fast is already gone). Stored model
// strings are immortal, so this table is append-only — never delete a row
// because upstream retired it, or its historical rows silently price at $0.
addFastVariants(FALLBACK, ['claude-opus-4-6', 'claude-opus-4-7'], 6)
addFastVariants(FALLBACK, ['claude-opus-4-8', 'claude-opus-5'], 2)
addFastVariants(FALLBACK, ['gpt-5.5'], 2.5)
addFastVariants(FALLBACK, [
  'gpt-5',
  'gpt-5-codex',
  'gpt-5.1',
  'gpt-5.1-codex',
  'gpt-5.1-codex-max',
  'gpt-5.1-codex-mini',
  'gpt-5.2-codex',
  'gpt-5.3-codex',
  'gpt-5.4',
  'gpt-5.4-mini',
  'gpt-5.6-sol',
  'gpt-5.6-luna',
  'gpt-5.6-terra',
], 2)

function scaleRates(rates: Rates, multiplier: number): Rates {
  const out = {} as Rates
  for (const key of RATE_KEYS) {
    out[key] = rates[key] * multiplier
  }
  return out
}

function addFastVariants(table: Record<string, PriceSchedule>, baseIds: string[], multiplier: number): void {
  for (const id of baseIds) {
    const base = table[id]
    if (!base) {
      continue
    }
    // Scale every period, peak included, so a fast variant of a
    // time-scheduled model keeps its schedule instead of flattening.
    table[`${id}-fast`] = {
      displayName: base.displayName ? `${base.displayName} Fast` : undefined,
      source: base.source,
      periods: base.periods.map(period => ({
        from: period.from,
        rates: scaleRates(period.rates, multiplier),
        peak: period.peak
          ? { windowsUtc: period.peak.windowsUtc, rates: scaleRates(period.peak.rates, multiplier) }
          : undefined,
      })),
    }
  }
}

function fbPrice(
  displayName: string,
  input: number,
  cachedRead: number,
  output: number,
  cacheCreation = cachedRead,
): PriceSchedule {
  return {
    displayName,
    source: 'fallback',
    periods: [{
      from: Number.NEGATIVE_INFINITY,
      rates: {
        inputCostPerToken: input,
        cacheCreationInputCostPerToken: cacheCreation,
        cacheReadInputCostPerToken: cachedRead,
        cachedInputCostPerToken: cachedRead,
        outputCostPerToken: output,
      },
    }],
  }
}

let state: CatalogState = {
  loadedAt: 0,
  status: 'missing',
  table: { ...FALLBACK },
  raw: new Map(),
  source: 'fallback',
}

let inflight: Promise<void> | null = null

// Resolved lookups, keyed by the raw stored model string. A dashboard
// request resolves thousands of rows across a handful of distinct models
// (the per-(project, model) breakdown alone is folded three ways), and every
// miss re-runs the whole candidate expansion. Invalidated wherever `state`
// is reassigned in loadCatalog — those are the only writes.
const resolved = new Map<string, PriceSchedule | null>()

async function loadCatalog(): Promise<void> {
  try {
    const response = await fetch(SOURCE_URL, { headers: { accept: 'application/json' } })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const json = (await response.json()) as { data: Array<Record<string, unknown>> }
    const models = json.data ?? []
    const map = new Map<string, PriceSchedule>()
    for (const model of models) {
      const id = model.id
      if (!id || typeof id !== 'string') {
        continue
      }
      const pricing = model.pricing as Record<string, unknown> | undefined
      if (!pricing || typeof pricing !== 'object') {
        continue
      }
      const input = Number.parseFloat(String(pricing.prompt ?? ''))
      const output = Number.parseFloat(String(pricing.completion ?? ''))
      if (!Number.isFinite(input) || !Number.isFinite(output)) {
        continue
      }
      // Read both cache-read and cache-write from OpenRouter. They are
      // distinct on Claude (cache_write ≈ 1.25× input, cache_read ≈ 0.1× input)
      // — reusing the cache_read rate for creation would under-charge cache
      // creation by ~12.5×. Fall back to cache_read when write is absent
      // (most OpenAI/DeepSeek entries have no input_cache_write).
      const cacheRead = Number.parseFloat(String(pricing.input_cache_read ?? '')) || input * 0.1
      const cacheWrite = Number.parseFloat(String(pricing.input_cache_write ?? '')) || cacheRead
      // OpenRouter is a point-in-time quote: one rate, valid now. It is
      // therefore always a single open-ended period.
      const schedule: PriceSchedule = {
        displayName: typeof model.name === 'string' ? model.name : undefined,
        source: 'openrouter',
        periods: [{
          from: Number.NEGATIVE_INFINITY,
          rates: {
            inputCostPerToken: input,
            cacheCreationInputCostPerToken: cacheWrite,
            cacheReadInputCostPerToken: cacheRead,
            cachedInputCostPerToken: cacheRead,
            outputCostPerToken: output,
          },
        }],
      }
      const key = id.toLowerCase()
      map.set(key, schedule)
      // Also index the bare name. The codetime CLI stores model ids without
      // OpenRouter's mandatory `vendor/` prefix, and this reverse index is
      // what lets any vendor resolve without a hand-written prefix rule (the
      // VENDOR_PREFIX_BY_FAMILY table below only ever existed to reconstruct
      // that prefix). Bare names cannot collide with full ids — those always
      // contain a slash — and first-wins keeps a future duplicate bare name
      // from silently flipping an already-resolved price.
      const bare = key.slice(key.indexOf('/') + 1)
      if (bare !== key && !map.has(bare)) {
        map.set(bare, schedule)
      }
    }
    state = {
      loadedAt: Date.now(),
      status: 'ready',
      table: { ...FALLBACK },
      raw: map,
      source: 'openrouter',
    }
    resolved.clear()
  }
  catch (error) {
    state = {
      loadedAt: Date.now(),
      status: state.status === 'ready' ? 'stale' : 'missing',
      table: { ...FALLBACK },
      raw: state.raw,
      source: 'fallback',
    }
    resolved.clear()
    console.warn('[pricing] OpenRouter fetch failed, fallback to built-in table:', (error as Error).message)
  }
}

export function ensurePricingLoaded(): Promise<void> {
  if (state.status === 'ready' && Date.now() - state.loadedAt < REFRESH_MS) {
    return Promise.resolve()
  }
  if (!inflight) {
    inflight = loadCatalog().finally(() => {
      inflight = null
    })
  }
  return inflight
}

// Build lookup candidates from a codetime-emitted model name. The CLI's
// naming scheme uses dashes between version digits (`claude-opus-4-7`)
// and sometimes appends a release date (`claude-haiku-4-5-20251001`),
// while OpenRouter ids use dots and no date (`anthropic/claude-opus-4.7`).
// We try the literal name first, then progressively normalized variants.
// Family → OpenRouter vendor prefix lookup. Now a backstop only: the
// catalogue is indexed by bare name too (see loadCatalog), so a bare id
// resolves for every vendor without a rule here. These survive because they
// also let a `vendor/`-prefixed lookup hit the bare-keyed FALLBACK table.
// Do not add a rule per new vendor — the reverse index already covers it.
const VENDOR_PREFIX_BY_FAMILY: Array<{ test: (name: string) => boolean, prefix: string }> = [
  { test: n => n.startsWith('claude-'), prefix: 'anthropic/' },
  { test: n => n.startsWith('gpt-') || n.startsWith('o1-') || n.startsWith('o3-') || n.startsWith('o4-'), prefix: 'openai/' },
  { test: n => n.startsWith('deepseek-'), prefix: 'deepseek/' },
  { test: n => n.startsWith('glm-'), prefix: 'z-ai/' },
  { test: n => n.startsWith('grok-'), prefix: 'x-ai/' },
  { test: n => n.startsWith('gemini-'), prefix: 'google/' },
  { test: n => n.startsWith('llama-'), prefix: 'meta-llama/' },
  { test: n => n.startsWith('qwen'), prefix: 'qwen/' },
  { test: n => n.startsWith('mistral-') || n.startsWith('codestral-'), prefix: 'mistralai/' },
]

// `claude-opus-4-7` → `claude-opus-4.7`. The lookahead keeps the regex from
// chewing through 8-digit date suffixes.
function dotted(s: string): string {
  return s.replaceAll(/(\D)(\d+)-(\d+)(?=-|$)/g, '$1$2.$3')
}

function pricingCandidates(model: string): string[] {
  const set = new Set<string>()
  const add = (s: string): void => {
    if (!s) {
      return
    }
    set.add(s)
    // Drop any `vendor/` prefix the caller may have supplied so that the
    // raw model name is still a candidate on its own.
    const stripped = s.replace(/^[^/]+\//, '')
    set.add(stripped)
    // Infer the vendor prefix from the model family.
    for (const { test, prefix } of VENDOR_PREFIX_BY_FAMILY) {
      if (test(stripped)) {
        set.add(`${prefix}${stripped}`)
      }
    }
  }
  // Every spelling variant of one base form: the form itself, its dotted
  // version, and — when it ends in a release tag — the untagged form of
  // both. Tags come in every width vendors have used: `-YYYYMMDD`
  // (`claude-haiku-4-5-20251001`), `-YYMMDD` (`deepseek-v4-flash-260425`),
  // `-MMDD` (`deepseek-v4-pro-0813`) and the moving `-latest`. Stripping
  // one that was not a tag is safe by construction: candidates are probed
  // as exact keys, so an over-eager strip misses rather than mis-prices.
  // `add` is Set-backed, so re-adding an unchanged form is a no-op.
  const addAllForms = (form: string): void => {
    for (const variant of [form, form.replace(/-(?:\d{4}|\d{6}|\d{8}|latest)$/, '')]) {
      add(variant)
      add(dotted(variant))
    }
  }
  const base = model.toLowerCase()
  addAllForms(base)
  // Some Codex proxies stamp the reasoning effort into the model name
  // (`gpt-5.5(xhigh)`, `gpt-5.4 (high)`). The parenthetical is not part of
  // any catalogue id, and pricing does not vary by effort, so retry without
  // it. This is the permanent home for the rule: historical rows keep their
  // raw name forever, and users on older CLI builds keep emitting it. The
  // CLI strips it too (codetime-cli packages/cli/src/adapters/codex.ts,
  // normalizeCodexModel) so new rows don't split the model leaderboard —
  // the two copies are in separate repos with no shared package, so these
  // comments are the sync mechanism. Keep both.
  const deparenthesized = base.replace(/\s*\([^)]*\)\s*$/, '').trim()
  if (deparenthesized && deparenthesized !== base) {
    addAllForms(deparenthesized)
  }
  // Some clients join vendor and model with a `-` instead of a `/`
  // (`deepseek-deepseek-v4-pro`, `openai-gpt-5.6-sol`). Drop the leading
  // segment and let the lookup decide: every candidate is probed as an exact
  // key, so a wrong guess simply misses instead of mispricing.
  const withoutLeadingSegment = base.slice(base.indexOf('-') + 1)
  if (base.includes('-') && withoutLeadingSegment) {
    addAllForms(withoutLeadingSegment)
  }
  return [...set]
}

function getScheduleFor(model: string): PriceSchedule | null {
  if (!model) {
    return null
  }
  const cached = resolved.get(model)
  if (cached !== undefined) {
    return cached
  }
  const schedule = resolveScheduleFor(model)
  resolved.set(model, schedule)
  return schedule
}

function resolveScheduleFor(model: string): PriceSchedule | null {
  const candidates = pricingCandidates(model)
  // Overrides first: they exist precisely because the catalogue's answer
  // for these models is wrong (reseller rate) or unrepresentable
  // (peak/off-peak). See the OVERRIDES block.
  for (const candidate of candidates) {
    const override = OVERRIDES[candidate]
    if (override) {
      return override
    }
  }
  for (const candidate of candidates) {
    const fromRaw = state.raw.get(candidate)
    if (fromRaw) {
      return fromRaw
    }
  }
  for (const candidate of candidates) {
    const fallback = state.table[candidate]
    if (fallback) {
      return fallback
    }
  }
  return null
}

// A schedule is time-sensitive when *when* the tokens were spent changes
// what they cost: more than one effective period, or any peak window.
// Called once per priced row, so it stays allocation-free (no closure).
function isTimeSensitive(schedule: PriceSchedule): boolean {
  if (schedule.periods.length > 1) {
    return true
  }
  for (const period of schedule.periods) {
    if (period.peak) {
      return true
    }
  }
  return false
}

function periodAt(schedule: PriceSchedule, atMs: number): PricePeriod {
  let current = schedule.periods[0]!
  for (const period of schedule.periods) {
    if (period.from <= atMs) {
      current = period
    }
    else {
      break
    }
  }
  return current
}

function isPeakHour(windows: Array<[number, number]>, atMs: number): boolean {
  // Epoch ms floors to UTC midnight without any timezone lookup, which is
  // exactly what the windows are defined against.
  const hour = Math.floor((atMs - Math.floor(atMs / DAY_MS) * DAY_MS) / HOUR_MS)
  return windows.some(([start, end]) => hour >= start && hour < end)
}

// Exact rate card at one instant.
function ratesAt(schedule: PriceSchedule, atMs: number): Rates {
  const period = periodAt(schedule, atMs)
  if (period.peak && isPeakHour(period.peak.windowsUtc, atMs)) {
    return period.peak.rates
  }
  return period.rates
}

// Milliseconds of one daily UTC window that fall in [epoch, x). Closed
// form: whole elapsed days each contribute the window's full length, and
// the partial last day contributes however much of it has elapsed.
function dailyWindowMsUpTo(x: number, startMs: number, lengthMs: number): number {
  const days = Math.floor(x / DAY_MS)
  const intoDay = x - days * DAY_MS
  return days * lengthMs + Math.min(Math.max(intoDay - startMs, 0), lengthMs)
}

// Milliseconds of [from, to) that land inside a daily UTC peak window.
// O(windows) — differencing the two prefix sums beats walking the range a
// day at a time, which cost ~730 iterations for a year-long window.
function peakMsBetween(windows: Array<[number, number]>, fromMs: number, toMs: number): number {
  let total = 0
  for (const [start, end] of windows) {
    const startMs = start * HOUR_MS
    const lengthMs = (end - start) * HOUR_MS
    total += dailyWindowMsUpTo(toMs, startMs, lengthMs) - dailyWindowMsUpTo(fromMs, startMs, lengthMs)
  }
  return total
}

function weightedRates(parts: Array<{ rates: Rates, weight: number }>): Rates {
  let total = 0
  for (const part of parts) {
    total += part.weight
  }
  if (total <= 0) {
    return parts[0]!.rates
  }
  const out = {} as Rates
  for (const key of RATE_KEYS) {
    let acc = 0
    for (const { rates, weight } of parts) {
      acc += rates[key] * (weight / total)
    }
    out[key] = acc
  }
  return out
}

// Degraded path: the row is a sum over a whole window, so we no longer know
// which hours its tokens were spent in. Blend the schedule across the
// window by wall-clock time — i.e. assume usage is spread evenly. That is
// wrong for a user who only ever codes during peak hours, but it is
// bounded (never outside [off-peak, peak]) and it is the honest answer when
// the time axis has already been aggregated away. Callers that *do* have a
// timestamp pass `at` instead and get the exact rate.
function blendRates(schedule: PriceSchedule, fromMs: number, toMs: number): Rates {
  // An unbounded (all-time) window would give ancient rates unbounded
  // weight; a year of lookback is enough for any live schedule.
  const start = Number.isFinite(fromMs) ? fromMs : toMs - 365 * DAY_MS
  if (!(toMs > start)) {
    return ratesAt(schedule, start)
  }
  const parts: Array<{ rates: Rates, weight: number }> = []
  const periods = schedule.periods
  for (let i = 0; i < periods.length; i++) {
    const period = periods[i]!
    const next = periods[i + 1]
    const segStart = Math.max(start, period.from)
    const segEnd = Math.min(toMs, next ? next.from : Number.POSITIVE_INFINITY)
    if (!(segEnd > segStart)) {
      continue
    }
    const span = segEnd - segStart
    if (period.peak) {
      const peakMs = peakMsBetween(period.peak.windowsUtc, segStart, segEnd)
      parts.push({ rates: period.peak.rates, weight: peakMs }, { rates: period.rates, weight: span - peakMs })
    }
    else {
      parts.push({ rates: period.rates, weight: span })
    }
  }
  // `parts` is never empty: the first period opens at -Infinity and
  // `toMs > start` was checked above, so at least one segment has span.
  return weightedRates(parts)
}

export type TimeInput = number | string | Date | null | undefined

function toMs(value: TimeInput): number | null {
  if (value === null || value === undefined) {
    return null
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  const ms = value instanceof Date ? value.getTime() : Date.parse(value)
  return Number.isFinite(ms) ? ms : null
}

// How the rate card was arrived at:
//   'flat'    — the model has a single timeless rate; `at` is irrelevant.
//   'exact'   — time-sensitive model priced at a known instant.
//   'blended' — time-sensitive model priced across a window (see blendRates).
export type PriceBasis = 'flat' | 'exact' | 'blended'

function ratesFor(
  schedule: PriceSchedule,
  at: TimeInput,
  window: readonly [TimeInput, TimeInput] | undefined,
): { rates: Rates, basis: PriceBasis } {
  if (!isTimeSensitive(schedule)) {
    return { rates: schedule.periods[0]!.rates, basis: 'flat' }
  }
  const atMs = toMs(at)
  if (atMs !== null) {
    return { rates: ratesAt(schedule, atMs), basis: 'exact' }
  }
  const begin = (window ? toMs(window[0]) : null) ?? Number.NEGATIVE_INFINITY
  const end = (window ? toMs(window[1]) : null) ?? Date.now()
  return { rates: blendRates(schedule, begin, end), basis: 'blended' }
}

// The `pricing` block handed back per row. Memoised on the rate card so a
// request pricing thousands of rows against the same card allocates one
// object rather than thousands. A rate card belongs to exactly one
// schedule, so its name and provenance can never disagree.
const priceCards = new WeakMap<Rates, ModelPrice>()

function priceCardFor(schedule: PriceSchedule, rates: Rates): ModelPrice {
  const cached = priceCards.get(rates)
  if (cached) {
    return cached
  }
  const card: ModelPrice = { ...rates, displayName: schedule.displayName, source: schedule.source }
  priceCards.set(rates, card)
  return card
}

// Resolve a model to the flat rate card that applies at `at` (default: now).
export function getPriceFor(model: string, at?: TimeInput): ModelPrice | null {
  const schedule = getScheduleFor(model)
  if (!schedule) {
    return null
  }
  return priceCardFor(schedule, ratesFor(schedule, at ?? Date.now(), undefined).rates)
}

// Anthropic prices a 1-hour ephemeral cache write at 2× input, vs the
// default 5-minute write at 1.25× input (the latter is what
// cacheCreationInputCostPerToken already encodes). Mirrors ccusage's
// CACHE_CREATE_1H_INPUT_MULTIPLIER — see
// /root/codetime/ccusage/rust/crates/ccusage/src/cost.rs
// (cache_create_1h_cost = pricing.input * CACHE_CREATE_1H_INPUT_MULTIPLIER).
const CACHE_CREATE_1H_INPUT_MULTIPLIER = 2

export function estimateCostUsd(args: {
  model: string
  inputTokens: number
  cachedInputTokens: number
  cacheCreationInputTokens?: number
  // TTL split subsets of cacheCreationInputTokens. Optional; absent on
  // legacy CLIs. When both are 0 the cost is identical to the pre-split
  // behaviour (everything charged at cacheCreationInputCostPerToken).
  cacheCreation5mInputTokens?: number
  cacheCreation1hInputTokens?: number
  cacheReadInputTokens?: number
  outputTokens: number
  // reasoning is an informational subset of outputTokens under the v2
  // token convention — it is NOT added to the billed output. OpenAI/Codex
  // already fold reasoning into output_tokens, and the v2 CLI does the same
  // for Gemini/OpenCode (v1-era Gemini/OpenCode rows under-count slightly
  // until re-ingested). This matches ccusage's calculate_codex_model_cost,
  // which multiplies output_tokens only. Kept as a parameter so callers can
  // keep passing it as an informational field.
  reasoningOutputTokens: number
  // When these tokens were spent. Pass `at` whenever the row is anchored to
  // a real instant (the hour bucket it was grouped into); pass `window` —
  // the request's [since, until] — when it is a sum over a range. Both are
  // ignored for models with a flat schedule, which is nearly all of them.
  at?: TimeInput
  window?: readonly [TimeInput, TimeInput]
}): { cost: number, pricing: ModelPrice | null, basis: PriceBasis } {
  const schedule = getScheduleFor(args.model)
  if (!schedule) {
    return { cost: 0, pricing: null, basis: 'flat' }
  }
  const { rates, basis } = ratesFor(schedule, args.at, args.window)
  const pricing = priceCardFor(schedule, rates)
  const cacheCreation = Math.max(0, args.cacheCreationInputTokens ?? 0)
  // Split the cache-creation total by ephemeral TTL. `known1h` is clamped
  // to the total so a malformed/over-counted 1h split can never bill more
  // creation tokens than were actually written. Everything else (the 5m
  // split plus any unsplit remainder) bills at the default creation rate;
  // only the 1h portion takes the 2× input rate. When the 1h split is 0
  // (legacy / split-unknown), this collapses to the original single-rate
  // formula exactly.
  const known1h = Math.min(Math.max(0, args.cacheCreation1hInputTokens ?? 0), cacheCreation)
  const creationDefaultRate = Math.max(0, cacheCreation - known1h)
  // Codex / OpenAI emit only `cachedInputTokens` (a subset of input) and
  // never split it into cache_read vs cache_creation. The CLI therefore
  // writes 0 (not NULL) into the cache_read_input_tokens column, so a
  // plain `??` fallback never fires. Treat an explicit 0 the same as
  // "absent" and derive cache read from cachedInputTokens — otherwise
  // 90%+ of Codex input would silently get charged at the full prompt
  // rate instead of the much cheaper cache_read rate.
  const explicitCacheRead = Math.max(0, args.cacheReadInputTokens ?? 0)
  const cacheRead = explicitCacheRead > 0
    ? explicitCacheRead
    : Math.max(0, args.cachedInputTokens - cacheCreation)
  const fresh = Math.max(0, args.inputTokens - cacheCreation - cacheRead)
  const cost
    = fresh * rates.inputCostPerToken
    + creationDefaultRate * rates.cacheCreationInputCostPerToken
    + known1h * rates.inputCostPerToken * CACHE_CREATE_1H_INPUT_MULTIPLIER
    + cacheRead * rates.cacheReadInputCostPerToken
    // outputTokens already includes reasoning under the v2 convention; do
    // not add reasoningOutputTokens here (ccusage parity).
    + args.outputTokens * rates.outputCostPerToken
  return { cost, pricing, basis }
}

function rowNum(v: unknown): number {
  if (v === null || v === undefined) {
    return 0
  }
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

// Convenience: build estimateCostUsd args from a raw SQL row that uses
// the standard `*_tokens` snake_case column names — every cost-folding
// loop in the agent dashboard / public-usage handlers writes the same
// six toN(...) reads, so the column-name contract lives here instead.
//
// PRICE_ANCHOR_COLUMN is the other half of the contract: queries that can
// anchor their rows in time select it (see `priceAnchorSql`) and those rows
// price exactly. Rows without it fall back to blending across `window`.
export function estimateCostFromRow(
  r: Record<string, unknown>,
  window?: readonly [TimeInput, TimeInput],
): { cost: number, pricing: ModelPrice | null, basis: PriceBasis } {
  const anchor = r[PRICE_ANCHOR_COLUMN]
  const at = anchor === null || anchor === undefined
    ? undefined
    : rowNum(anchor) * 1000
  return estimateCostUsd({
    model: String(r.model ?? 'unknown'),
    inputTokens: rowNum(r.input_tokens),
    cachedInputTokens: rowNum(r.cached_input_tokens),
    cacheCreationInputTokens: rowNum(r.cache_creation_input_tokens),
    cacheCreation5mInputTokens: rowNum(r.cache_creation_5m_input_tokens),
    cacheCreation1hInputTokens: rowNum(r.cache_creation_1h_input_tokens),
    cacheReadInputTokens: rowNum(r.cache_read_input_tokens),
    outputTokens: rowNum(r.output_tokens),
    reasoningOutputTokens: rowNum(r.reasoning_output_tokens),
    at,
    window,
  })
}

export function pricingState(): { status: CatalogState['status'], loadedAt: number, source: CatalogState['source'], size: number } {
  return { status: state.status, loadedAt: state.loadedAt, source: state.source, size: state.raw.size }
}
