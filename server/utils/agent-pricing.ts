// Model pricing pulled from OpenRouter's models API.
// Source: https://openrouter.ai/api/v1/models
// Falls back to a small built-in subset if the network is unavailable.
//
// Ported verbatim from agent-time/apps/api/src/pricing.ts so the Vibe
// dashboard renders the same cost figures as the agent-time UI. Keep
// the FALLBACK table in sync when agent-time updates its prices.

const SOURCE_URL = 'https://openrouter.ai/api/v1/models'

const REFRESH_MS = 24 * 60 * 60 * 1000

export type ModelPrice = {
  displayName?: string
  inputCostPerToken: number
  cacheCreationInputCostPerToken: number
  cacheReadInputCostPerToken: number
  cachedInputCostPerToken: number
  outputCostPerToken: number
  source: 'openrouter' | 'fallback' | 'missing'
}

type CatalogState = {
  loadedAt: number
  status: 'ready' | 'stale' | 'missing'
  table: Record<string, ModelPrice>
  raw: Map<string, ModelPrice>
  source: 'openrouter' | 'fallback'
}

const FALLBACK: Record<string, ModelPrice> = {
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
  // 2026-08-31; list price afterwards is $3/$15. This table has no
  // effective-from dimension, so whatever rate it carries is applied to all
  // history — like every other row here, it is a best-effort degraded-mode
  // approximation, not a historical price archive. OpenRouter is the source
  // of truth whenever it is reachable.
  'claude-sonnet-5': fbPrice('Claude Sonnet 5', 2e-6, 2e-7, 1e-5, 2.5e-6),
  'claude-opus-4-6': fbPrice('Claude Opus 4.6', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-4-7': fbPrice('Claude Opus 4.7', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-4-8': fbPrice('Claude Opus 4.8', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-opus-5': fbPrice('Claude Opus 5', 5e-6, 5e-7, 25e-6, 6.25e-6),
  'claude-fable-5': fbPrice('Claude Fable 5', 1e-5, 1e-6, 5e-5, 1.25e-5),
  'claude-haiku-4-5': fbPrice('Claude Haiku 4.5', 1e-6, 1e-7, 5e-6, 1.25e-6),
  'deepseek-chat': fbPrice('DeepSeek Chat', 2.8e-7, 2.8e-8, 4.2e-7),
  'deepseek-reasoner': fbPrice('DeepSeek Reasoner', 2.8e-7, 2.8e-8, 4.2e-7),
  'deepseek-v4-flash': fbPrice('DeepSeek V4 Flash', 1.4e-7, 2.8e-9, 2.8e-7),
  'deepseek-v4-pro': fbPrice('DeepSeek V4 Pro', 4.35e-7, 3.625e-9, 8.7e-7),
}

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

function addFastVariants(table: Record<string, ModelPrice>, baseIds: string[], multiplier: number): void {
  for (const id of baseIds) {
    const base = table[id]
    if (!base) {
      continue
    }
    table[`${id}-fast`] = {
      displayName: base.displayName ? `${base.displayName} Fast` : undefined,
      inputCostPerToken: base.inputCostPerToken * multiplier,
      cacheCreationInputCostPerToken: base.cacheCreationInputCostPerToken * multiplier,
      cacheReadInputCostPerToken: base.cacheReadInputCostPerToken * multiplier,
      cachedInputCostPerToken: base.cachedInputCostPerToken * multiplier,
      outputCostPerToken: base.outputCostPerToken * multiplier,
      source: 'fallback',
    }
  }
}

function fbPrice(
  displayName: string,
  input: number,
  cachedRead: number,
  output: number,
  cacheCreation = cachedRead,
): ModelPrice {
  return {
    displayName,
    inputCostPerToken: input,
    cacheCreationInputCostPerToken: cacheCreation,
    cacheReadInputCostPerToken: cachedRead,
    cachedInputCostPerToken: cachedRead,
    outputCostPerToken: output,
    source: 'fallback',
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
const resolved = new Map<string, ModelPrice | null>()

async function loadCatalog(): Promise<void> {
  try {
    const response = await fetch(SOURCE_URL, { headers: { accept: 'application/json' } })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const json = (await response.json()) as { data: Array<Record<string, unknown>> }
    const models = json.data ?? []
    const map = new Map<string, ModelPrice>()
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
      const price: ModelPrice = {
        displayName: typeof model.name === 'string' ? model.name : undefined,
        inputCostPerToken: input,
        cacheCreationInputCostPerToken: cacheWrite,
        cacheReadInputCostPerToken: cacheRead,
        cachedInputCostPerToken: cacheRead,
        outputCostPerToken: output,
        source: 'openrouter',
      }
      const key = id.toLowerCase()
      map.set(key, price)
      // Also index the bare name. The codetime CLI stores model ids without
      // OpenRouter's mandatory `vendor/` prefix, and this reverse index is
      // what lets any vendor resolve without a hand-written prefix rule (the
      // VENDOR_PREFIX_BY_FAMILY table below only ever existed to reconstruct
      // that prefix). Bare names cannot collide with full ids — those always
      // contain a slash — and first-wins keeps a future duplicate bare name
      // from silently flipping an already-resolved price.
      const bare = key.slice(key.indexOf('/') + 1)
      if (bare !== key && !map.has(bare)) {
        map.set(bare, price)
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
  // version, and — when it ends in a `-YYYYMMDD` release tag — the undated
  // form of both. `add` is Set-backed, so re-adding an unchanged form is a
  // no-op.
  const addAllForms = (form: string): void => {
    for (const variant of [form, form.replace(/-\d{8}$/, '')]) {
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

export function getPriceFor(model: string): ModelPrice | null {
  if (!model) {
    return null
  }
  const cached = resolved.get(model)
  if (cached !== undefined) {
    return cached
  }
  const price = resolvePriceFor(model)
  resolved.set(model, price)
  return price
}

function resolvePriceFor(model: string): ModelPrice | null {
  const candidates = pricingCandidates(model)
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
}): { cost: number, pricing: ModelPrice | null } {
  const pricing = getPriceFor(args.model)
  if (!pricing) {
    return { cost: 0, pricing: null }
  }
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
    = fresh * pricing.inputCostPerToken
    + creationDefaultRate * pricing.cacheCreationInputCostPerToken
    + known1h * pricing.inputCostPerToken * CACHE_CREATE_1H_INPUT_MULTIPLIER
    + cacheRead * pricing.cacheReadInputCostPerToken
    // outputTokens already includes reasoning under the v2 convention; do
    // not add reasoningOutputTokens here (ccusage parity).
    + args.outputTokens * pricing.outputCostPerToken
  return { cost, pricing }
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
export function estimateCostFromRow(r: Record<string, unknown>): { cost: number, pricing: ModelPrice | null } {
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
  })
}

export function pricingState(): { status: CatalogState['status'], loadedAt: number, source: CatalogState['source'], size: number } {
  return { status: state.status, loadedAt: state.loadedAt, source: state.source, size: state.raw.size }
}
