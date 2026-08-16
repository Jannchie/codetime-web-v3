import type {
  CostEstimate,
  ModelPrice,
  PricingCatalogState,
  TimeInput,
} from 'llm-pricing'
import { modelsDevSource, PricingCatalog } from 'llm-pricing'
import { fileCache } from 'llm-pricing/node'

// The pricing catalogue, and the cost contract the dashboard folds rows
// through. The arithmetic, the schedule handling, and the catalogue
// parsers all live in `llm-pricing` — this module is the seam: it owns
// the one catalogue instance this process shares, and the two decisions
// that are ours rather than the library's (which upstream to price
// against, and how to read this table's rows).
//
// The exported surface is deliberately unchanged from the hand-rolled
// version it replaces, so every call site and the characterization tests
// in `agent-pricing.test.ts` carry over untouched.

// models.dev, which quotes every provider separately rather than the one
// endpoint a router would pick. Measured over all 93,504 rows of
// `agent_session_models` it prices 621 more of them than OpenRouter did
// and raises the all-time total by 0.56% ($645,790.62 -> $649,401.10) —
// almost entirely first-party rates that OpenRouter only carried at a
// reseller's quote, or not at all (gemini went from 85 unpriced rows to
// 1, pi from 113 to 24).
//
// `openRouterSource()` can be appended to fill ids models.dev does not
// list, since a later source only claims keys no earlier one had. It is
// deliberately not: over the same rows it recovers 26 of the remaining
// 19,099 unpriced and moves the total by $2.68, which does not pay for a
// second upstream on the request path. What is left unpriced is not
// catalogue coverage — it is rows whose `model` column holds a provider
// name (`codex`/`openai`, 715 rows), a router alias (`opencode`/
// `big-pickle`), or a local GGUF checkpoint. No price feed can answer
// those; the collector has to.
const catalog = new PricingCatalog({
  sources: [modelsDevSource()],
  // models.dev is a ~3.9 MB payload, against OpenRouter's ~0.5 MB, and
  // `ensureLoaded` sits on the request path — so without a cache the
  // first request after every boot waits on that download, once per PM2
  // worker. On disk it is shared by the whole cluster and survives
  // restarts.
  //
  // Skipped under test: the suite stubs `fetch` to assert the offline
  // path, and a real cache directory would answer from some previous
  // run's download instead, making that assertion depend on machine
  // state.
  cache: process.env.VITEST ? undefined : fileCache(),
  onWarn: (message, error) => console.warn('[pricing]', message, error),
})

/** See `PricingCatalog#ensureLoaded`. */
export function ensurePricingLoaded(): Promise<void> {
  return catalog.ensureLoaded()
}

/** See `PricingCatalog#state`. */
export function pricingState(): PricingCatalogState {
  return catalog.state()
}

/** Resolve a model to the rate card that applies at `at` (default: now). */
export function getPriceFor(model: string, at?: TimeInput): ModelPrice | null {
  return catalog.getPrice(model, at)
}

/** Apply the catalogue to an explicit set of token counts. */
export function estimateCostUsd(args: Parameters<PricingCatalog['estimate']>[0]): CostEstimate {
  return catalog.estimate(args)
}

/**
 * Every LIKE pattern the query layer must split by UTC hour.
 *
 * Derived from the schedules themselves so the two can never drift: a
 * vendor that gains a peak schedule declares its match patterns next to
 * its periods and the query layer follows automatically. Read at
 * query-build time rather than at import — the catalogue has to be loaded
 * first, and every caller already awaits `ensurePricingLoaded`.
 *
 * (This replaces a module-scope `TIME_SENSITIVE_MODEL_SQL_PATTERNS`
 * constant; the catalogue is no longer a static table, so the patterns
 * cannot be known before it loads.)
 */
export function timeSensitiveSqlPatterns(): readonly string[] {
  return catalog.timeSensitiveSqlPatterns()
}

/**
 * Price a row from `agent_session_models`.
 *
 * Column names are this table's default snake_case contract, so only the
 * two producer-shape questions need answering here:
 *
 * - `inputIncludesCache` stays at its default (true). Measured across all
 *   93,534 rows, `total_tokens - (input_tokens + output_tokens)` is
 *   exactly 0 for every source that reports a usable total — the
 *   collector normalises each agent's counts into one schema and stores
 *   input as the superset. This is a property of the collector, not of
 *   any vendor, so it is uniform here in a way it is not in general.
 *
 * - `reasoningIncludedInOutput` is inferred per row rather than assumed,
 *   because it is *not* uniform: `gemini` reports both ways (857 of its
 *   1,157 reasoning-bearing rows fold thinking into `output_tokens`, 300
 *   sit it alongside) and so does `opencode` (2,967/1,588), with the two
 *   shapes overlapping in both time and model id. Setting it per source
 *   would overcharge the majority — $17,685 across the table.
 *
 * Inference reads `total_tokens` and needs it to match one convention
 * exactly. Aggregated rows only qualify when every row in the group
 * agrees; a mixed group matches neither equation and falls back to the
 * default, which is the majority convention and never the more expensive
 * one. Rows from queries that do not select `total_tokens` price exactly
 * as they did before.
 */
export function estimateCostFromRow(
  row: Record<string, unknown>,
  window?: readonly [TimeInput, TimeInput],
): CostEstimate {
  return catalog.estimateFromRow(row, { window, inferShape: true })
}

// Re-exported so callers import the cost contract from one place rather
// than reaching past this seam into the library. `inferTokenShape` is here
// for anything that needs a row's shape without pricing it.
//
// `sumEstimates` is how a caller folds many rows into one figure. Adding
// `cost` up by hand loses everything the estimates carry besides the
// number — which card priced them, whether any were approximated, and how
// much usage went unpriced at $0 — and every aggregate on this dashboard
// needs at least one of those.
export { type CostEstimate, type CostTotal, inferTokenShape, type ModelPrice, PRICE_ANCHOR_COLUMN, type PriceBasis, sumEstimates, type TimeInput } from 'llm-pricing'
