import { afterEach, describe, expect, it, vi } from 'vitest'

// Characterization tests for the pricing layer.
//
// These lock the *observable* cost contract — what a row of tokens bills —
// rather than the implementation that computes it, so the same file passes
// before and after the catalogue is swapped out. Every expectation here is
// either hand-computable from a rate card asserted in the same test, or a
// documented table value (the DeepSeek schedules, the fast multipliers).
//
// The module is a process-wide singleton whose catalogue loads once and is
// then cached for REFRESH_MS, and nothing exports a way to invalidate it.
// So each catalogue shape gets a fresh module instance via `loadPricing`
// rather than a shared `beforeAll` — mildly awkward, and itself an argument
// for an injectable catalogue.

type Pricing = typeof import('./agent-pricing')

/**
 * A fresh copy of the pricing module with `fetch` stubbed.
 *
 * Default: every fetch rejects, so the catalogue falls back to the built-in
 * FALLBACK + OVERRIDES tables. That is the deterministic surface — no
 * network, no upstream drift, and the same tables both implementations
 * ship — so all but the parser tests below run against it.
 */
async function loadPricing(fetchImpl?: typeof globalThis.fetch): Promise<Pricing> {
  vi.resetModules()
  vi.stubGlobal('fetch', fetchImpl ?? vi.fn(async () => {
    throw new Error('offline')
  }))
  const mod = await import('./agent-pricing')
  await mod.ensurePricingLoaded()
  return mod
}

/**
 * A models.dev `api.json` response carrying exactly the providers given.
 *
 * Its `cost` figures are USD per *million* tokens, unlike the per-token
 * rates everything else in this file deals in — that conversion is part of
 * what these tests pin down.
 */
function modelsDevFetch(providers: Record<string, unknown>): typeof globalThis.fetch {
  return vi.fn(async () => Response.json(
    providers,
    { status: 200, headers: { 'content-type': 'application/json' } },
  )) as unknown as typeof globalThis.fetch
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('catalogue resolution', () => {
  it('prices from the built-in table when the network is unavailable', async () => {
    const { getPriceFor, pricingState } = await loadPricing()
    expect(pricingState().source).toBe('fallback')
    const price = getPriceFor('claude-opus-5')
    expect(price?.source).toBe('fallback')
    expect(price?.inputCostPerToken).toBe(5e-6)
    expect(price?.outputCostPerToken).toBe(25e-6)
  })

  it('resolves model ids the way the agent clis actually store them', async () => {
    const { getPriceFor } = await loadPricing()
    // Dated snapshot suffix, and a bare parenthesised effort suffix — both
    // appear verbatim in the stored `model` column.
    expect(getPriceFor('claude-haiku-4-5-20251001')).not.toBeNull()
    expect(getPriceFor('gpt-5.5(xhigh)')?.inputCostPerToken)
      .toBe(getPriceFor('gpt-5.5')?.inputCostPerToken)
  })

  it('synthesizes fast variants at the documented per-model multipliers', async () => {
    const { getPriceFor } = await loadPricing()
    const base = (m: string) => getPriceFor(m)!.inputCostPerToken
    // The multiplier is per-model, not a constant — regressing it to a
    // single house value is the failure this pins down.
    expect(getPriceFor('claude-opus-4-7-fast')!.inputCostPerToken).toBeCloseTo(base('claude-opus-4-7') * 6, 15)
    expect(getPriceFor('claude-opus-5-fast')!.inputCostPerToken).toBeCloseTo(base('claude-opus-5') * 2, 15)
    expect(getPriceFor('gpt-5.5-fast')!.inputCostPerToken).toBeCloseTo(base('gpt-5.5') * 2.5, 15)
  })

  it('does not invent a fast variant for models that have none', async () => {
    const { getPriceFor } = await loadPricing()
    // Sonnet and Haiku ship no fast tier; synthesizing one would bill a
    // premium nobody charges.
    expect(getPriceFor('claude-sonnet-5-fast')).toBeNull()
  })

  it('treats an unknown model as unpriced rather than free', async () => {
    const { getPriceFor, estimateCostUsd } = await loadPricing()
    expect(getPriceFor('totally-made-up-model')).toBeNull()
    const result = estimateCostUsd({
      model: 'totally-made-up-model',
      inputTokens: 1e6,
      cachedInputTokens: 0,
      outputTokens: 1e6,
      reasoningOutputTokens: 0,
    })
    // Cost 0 with a null `pricing` is how the dashboard tells "we don't
    // know" from "it was free" — the pair matters, not just the number.
    expect(result).toMatchObject({ cost: 0, pricing: null })
  })
})

describe('token arithmetic', () => {
  it('treats input_tokens as a superset of the cache counts', async () => {
    const { estimateCostUsd, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    // 1M input of which 600k was read from cache and 300k written to it,
    // leaving 100k genuinely fresh. Reading these as siblings instead
    // would bill the 900k cached tokens at the full input rate.
    const { cost } = estimateCostUsd({
      model: 'claude-opus-5',
      inputTokens: 1e6,
      cachedInputTokens: 0,
      cacheCreationInputTokens: 300_000,
      cacheReadInputTokens: 600_000,
      outputTokens: 0,
      reasoningOutputTokens: 0,
    })
    const expected
      = 100_000 * r.inputCostPerToken
        + 300_000 * r.cacheCreationInputCostPerToken
        + 600_000 * r.cacheReadInputCostPerToken
    expect(cost).toBeCloseTo(expected, 10)
  })

  it('derives cache reads from cached_input when cache_read is an explicit zero', async () => {
    const { estimateCostUsd, getPriceFor } = await loadPricing()
    const r = getPriceFor('gpt-5.5')!
    // The Codex shape: one `cached_input_tokens` figure, a hard 0 in
    // `cache_read_input_tokens` (the CLI writes 0, not NULL). Without the
    // fallback, 90%+ of Codex input bills at the full prompt rate.
    const { cost } = estimateCostUsd({
      model: 'gpt-5.5',
      inputTokens: 1e6,
      cachedInputTokens: 900_000,
      cacheReadInputTokens: 0,
      outputTokens: 0,
      reasoningOutputTokens: 0,
    })
    const expected = 100_000 * r.inputCostPerToken + 900_000 * r.cacheReadInputCostPerToken
    expect(cost).toBeCloseTo(expected, 10)
    // And the discount is real, not cosmetic.
    expect(cost).toBeLessThan(1e6 * r.inputCostPerToken * 0.25)
  })

  it('bills the 1h cache-creation split at twice the input rate', async () => {
    const { estimateCostUsd, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    const args = {
      model: 'claude-opus-5',
      inputTokens: 100_000,
      cachedInputTokens: 0,
      cacheCreationInputTokens: 100_000,
      outputTokens: 0,
      reasoningOutputTokens: 0,
    }
    const fiveMinute = estimateCostUsd({ ...args, cacheCreation5mInputTokens: 100_000 })
    const oneHour = estimateCostUsd({ ...args, cacheCreation1hInputTokens: 100_000 })
    expect(fiveMinute.cost).toBeCloseTo(100_000 * r.cacheCreationInputCostPerToken, 10)
    expect(oneHour.cost).toBeCloseTo(100_000 * r.inputCostPerToken * 2, 10)
  })

  it('collapses to the single creation rate when the ttl split is unknown', async () => {
    const { estimateCostUsd, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    // Legacy rows carry no split at all. They must price exactly as they
    // did before the split existed.
    const { cost } = estimateCostUsd({
      model: 'claude-opus-5',
      inputTokens: 100_000,
      cachedInputTokens: 0,
      cacheCreationInputTokens: 100_000,
      outputTokens: 0,
      reasoningOutputTokens: 0,
    })
    expect(cost).toBeCloseTo(100_000 * r.cacheCreationInputCostPerToken, 10)
  })

  it('does not bill reasoning tokens on top of output', async () => {
    const { estimateCostUsd, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    // Under the default convention reasoning is already inside
    // output_tokens; adding it again double-charges every thinking turn.
    const { cost } = estimateCostUsd({
      model: 'claude-opus-5',
      inputTokens: 0,
      cachedInputTokens: 0,
      outputTokens: 1e6,
      reasoningOutputTokens: 400_000,
    })
    expect(cost).toBeCloseTo(1e6 * r.outputCostPerToken, 10)
  })

  // A negative count would credit the invoice; a NaN propagates through
  // every sum it reaches, so one bad row turns a whole dashboard aggregate
  // into NaN — which loses more than a wrong number would.
  //
  // This failed against the previous implementation, which clamped with
  // `Math.max(0, x)` — and `Math.max(0, NaN)` is NaN, so the clamp did not
  // clamp. It was latent rather than live (the row path coerced first, and
  // the table has 0 negative counts across 93,534 rows), reachable only
  // through the exported `estimateCostUsd`. The catalogue now coerces every
  // count through a finite-and-non-negative guard, so it passes.
  it('never lets a malformed count subtract from the bill', async () => {
    const { estimateCostUsd } = await loadPricing()
    const { cost } = estimateCostUsd({
      model: 'claude-opus-5',
      inputTokens: -1e9,
      cachedInputTokens: Number.NaN,
      cacheCreationInputTokens: -5,
      outputTokens: 1000,
      reasoningOutputTokens: 0,
    })
    expect(Number.isFinite(cost)).toBe(true)
    expect(cost).toBeGreaterThanOrEqual(0)
  })
})

/** A fully-populated row at the table's snake_case column contract. */
function pricingRow(over: Record<string, unknown> = {}) {
  return {
    model: 'claude-opus-5',
    input_tokens: 1e6,
    cached_input_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 0,
    reasoning_output_tokens: 0,
    ...over,
  }
}

describe('row pricing', () => {
  it('reads the snake_case column contract', async () => {
    const { estimateCostFromRow, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    const { cost } = estimateCostFromRow(pricingRow())
    expect(cost).toBeCloseTo(1e6 * r.inputCostPerToken, 10)
  })

  it('coerces the shapes a postgres driver actually returns', async () => {
    const { estimateCostFromRow, getPriceFor } = await loadPricing()
    const r = getPriceFor('claude-opus-5')!
    // bigint columns arrive as strings; absent columns as null/undefined.
    const { cost } = estimateCostFromRow({
      model: 'claude-opus-5',
      input_tokens: '1000000',
      cached_input_tokens: null,
      output_tokens: undefined,
    })
    expect(cost).toBeCloseTo(1e6 * r.inputCostPerToken, 10)
  })

  it('prices a row with no model as unpriced rather than throwing', async () => {
    const { estimateCostFromRow } = await loadPricing()
    expect(estimateCostFromRow({}).cost).toBe(0)
  })
})

describe('time-sensitive schedules', () => {
  it('exposes exactly the sql patterns the query layer must split by hour', async () => {
    const { timeSensitiveSqlPatterns } = await loadPricing()
    // The query layer builds its LIKE list from this; a model that gains a
    // peak schedule without declaring `sqlMatch` would silently price flat.
    expect([...timeSensitiveSqlPatterns()]).toEqual(['%deepseek%'])
  })

  it('does not re-price history when a vendor raises rates', async () => {
    const { getPriceFor } = await loadPricing()
    // DeepSeek's 2026-08-16 16:00 UTC change. Applying it retroactively
    // would overstate every prior month.
    const before = getPriceFor('deepseek-v4-flash', Date.UTC(2026, 7, 16, 15))
    const after = getPriceFor('deepseek-v4-flash', Date.UTC(2026, 7, 16, 17))
    expect(before!.inputCostPerToken).toBeCloseTo(0.14 / 1e6, 15)
    expect(after!.inputCostPerToken).toBeCloseTo(0.22 / 1e6, 15)
  })

  it('charges peak rates inside the utc peak windows', async () => {
    const { getPriceFor } = await loadPricing()
    // 01:00-04:00 and 06:00-10:00 UTC bill at exactly double off-peak.
    const offPeak = getPriceFor('deepseek-v4-flash', Date.UTC(2026, 8, 1, 12))
    const peak = getPriceFor('deepseek-v4-flash', Date.UTC(2026, 8, 1, 2))
    expect(peak!.inputCostPerToken).toBeCloseTo(offPeak!.inputCostPerToken * 2, 15)
  })

  it('bills deepseek cache creation at the miss rate, not the hit rate', async () => {
    const { getPriceFor } = await loadPricing()
    const p = getPriceFor('deepseek-v4-pro', Date.UTC(2026, 6, 1))!
    // Writing DeepSeek's context cache is free and the missed tokens bill
    // at the plain input rate. Defaulting creation to the hit rate
    // under-charged this by ~120x.
    expect(p.cacheCreationInputCostPerToken).toBeCloseTo(0.435 / 1e6, 15)
    expect(p.cacheReadInputCostPerToken).toBeCloseTo(0.003_625 / 1e6, 15)
    expect(p.inputCostPerToken).toBeCloseTo(0.435 / 1e6, 15)
  })

  it('prices exactly when the row carries a time anchor', async () => {
    const { estimateCostFromRow, PRICE_ANCHOR_COLUMN } = await loadPricing()
    const result = estimateCostFromRow({
      model: 'deepseek-v4-flash',
      input_tokens: 1e6,
      cached_input_tokens: 0,
      output_tokens: 0,
      // Epoch *seconds*, per the column contract — 02:00 UTC is peak.
      [PRICE_ANCHOR_COLUMN]: Date.UTC(2026, 8, 1, 2) / 1000,
    })
    expect(result.basis).toBe('exact')
    expect(result.cost).toBeCloseTo(0.44, 10)
  })

  it('blends across the request window when the row has no anchor', async () => {
    const { estimateCostFromRow, PRICE_ANCHOR_COLUMN } = await loadPricing()
    const result = estimateCostFromRow({
      model: 'deepseek-v4-flash',
      input_tokens: 1e6,
      cached_input_tokens: 0,
      output_tokens: 0,
      [PRICE_ANCHOR_COLUMN]: null,
    }, [Date.UTC(2026, 8, 1), Date.UTC(2026, 8, 2)])
    // 7 peak hours and 17 off-peak in a UTC day, weighted by duration.
    expect(result.basis).toBe('blended')
    expect(result.cost).toBeCloseTo((7 * 0.44 + 17 * 0.22) / 24, 10)
  })

  it('prices a flat model identically with or without an anchor', async () => {
    const { estimateCostFromRow, PRICE_ANCHOR_COLUMN } = await loadPricing()
    // Nearly every model is flat: the anchor must not perturb its cost,
    // or adding the column to a query would change historical totals.
    const base = { model: 'claude-opus-5', input_tokens: 1e6, cached_input_tokens: 0, output_tokens: 0 }
    const anchored = estimateCostFromRow({ ...base, [PRICE_ANCHOR_COLUMN]: Date.UTC(2026, 8, 1, 2) / 1000 })
    const windowed = estimateCostFromRow({ ...base, [PRICE_ANCHOR_COLUMN]: null }, [Date.UTC(2026, 8, 1), Date.UTC(2026, 8, 2)])
    expect(anchored.cost).toBeCloseTo(windowed.cost, 12)
  })
})

describe('catalogue parsing', () => {
  it('prefers a live listing over the built-in table', async () => {
    const { getPriceFor, pricingState } = await loadPricing(modelsDevFetch({
      anthropic: {
        models: {
          'claude-opus-5': { name: 'Claude Opus 5', cost: { input: 9, output: 45, cache_read: 0.9 } },
        },
      },
    }))
    expect(pricingState().source).toBe('modelsdev')
    // Quoted per million tokens; billed per token.
    expect(getPriceFor('claude-opus-5')?.inputCostPerToken).toBe(9e-6)
  })

  it('keeps cache write distinct from cache read', async () => {
    const { getPriceFor } = await loadPricing(modelsDevFetch({
      anthropic: {
        models: {
          'claude-opus-5': { cost: { input: 5, output: 25, cache_read: 0.5, cache_write: 6.25 } },
        },
      },
    }))
    const p = getPriceFor('claude-opus-5')!
    // Reusing the read rate for creation under-charges writes by ~12.5x.
    expect(p.cacheCreationInputCostPerToken).toBe(6.25e-6)
    expect(p.cacheReadInputCostPerToken).toBe(5e-7)
  })

  it('resolves a bare model id to its first-party quote, not a reseller one', async () => {
    const { getPriceFor } = await loadPricing(modelsDevFetch({
      // 186 providers quote 6,199 models between them, so a bare name
      // collides 15-25 ways. Rows store bare names, so whichever provider
      // wins that key is the price this dashboard publishes — it has to be
      // the vendor, whatever order the JSON happens to arrive in.
      'some-reseller': { models: { 'claude-opus-5': { cost: { input: 20, output: 100 } } } },
      'anthropic': { models: { 'claude-opus-5': { cost: { input: 5, output: 25 } } } },
    }))
    expect(getPriceFor('claude-opus-5')!.inputCostPerToken).toBe(5e-6)
    // And it holds even when the row names the reseller outright: the
    // vendor's quote outranks by provider, not by how exactly the id was
    // spelled. Worth knowing rather than relying on — this table stores
    // bare names, so no row here can reach the other branch.
    expect(getPriceFor('some-reseller/claude-opus-5')!.inputCostPerToken).toBe(5e-6)
  })

  it('drops a quote it cannot bill against rather than pricing it', async () => {
    const { getPriceFor, estimateCostUsd } = await loadPricing(modelsDevFetch({
      // Two ways a feed carries something that is not a rate. A negative
      // one is what OpenRouter puts on the meta-models whose endpoint the
      // router picks at request time: read literally it is minus a dollar
      // per token, and it does not merely mis-price its own model —
      // summed into a total it credits back everything else. 14 aggregated
      // rows of `openrouter/auto` came to -$9,625,814 and turned this
      // account's $645k total negative.
      'a-router': { models: { auto: { name: 'Auto', cost: { input: -1, output: -1 } } } },
      // A 0/0 placeholder is the quieter one: 506 of models.dev's live
      // quotes are subscription plans advertising availability rather than
      // a per-token rate. Priced literally they report $0 spend on real
      // traffic, which reads as a fact rather than as a gap.
      'a-plan': { models: { 'included-model': { cost: { input: 0, output: 0 } } } },
      'anthropic': { models: { 'claude-opus-5': { cost: { input: 5, output: 25 } } } },
    }))
    // Dropped, not clamped to zero: a resolved id shadows both the
    // built-in table and every later source, so a free-looking price is
    // the same bug wearing a plausible number. Unpriced stays visible.
    expect(getPriceFor('auto')).toBeNull()
    expect(getPriceFor('a-router/auto')).toBeNull()
    expect(getPriceFor('included-model')).toBeNull()
    expect(getPriceFor('claude-opus-5')).not.toBeNull()
    const { cost, pricing } = estimateCostUsd({
      model: 'auto',
      inputTokens: 66_672_834,
      cachedInputTokens: 0,
      outputTokens: 315_291,
      reasoningOutputTokens: 0,
    })
    expect(pricing).toBeNull()
    expect(cost).toBe(0)
  })

  it('falls back to the built-in table when the feed is unusable', async () => {
    const { getPriceFor, pricingState } = await loadPricing(
      vi.fn(async () => new Response('nope', { status: 500 })) as unknown as typeof globalThis.fetch,
    )
    expect(pricingState().source).toBe('fallback')
    expect(getPriceFor('claude-opus-5')?.inputCostPerToken).toBe(5e-6)
  })
})
