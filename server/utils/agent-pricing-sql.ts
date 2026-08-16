import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { PRICE_ANCHOR_COLUMN, timeSensitiveSqlPatterns } from './agent-pricing'

// The SQL half of the pricing time-anchor contract whose other half is
// `estimateCostFromRow` (agent-pricing.ts). Kept in its own module so the
// pricing catalogue itself stays free of any database dependency.
//
// Emits the start of the UTC hour a row's tokens were spent in, as epoch
// seconds — the grain needed to charge peak / off-peak rates (whose windows
// are whole UTC hours) and to keep pre-cutover history on pre-cutover
// rates. Add it to a query's select list AND its group by, and the rows it
// returns price exactly instead of being blended across the request window.
//
// It is NULL for every model whose price is flat, which is nearly all of
// them: those rows all share one group, so the query returns exactly as
// many rows as it did without this column. Only vendors whose schedules
// declare `sqlMatch` pay the ≤24× row fan-out.
//
// `extract(epoch from <timestamptz>)` is unambiguously UTC-based, so this
// deliberately sidesteps `date_trunc`, whose result depends on the session
// TimeZone — display buckets elsewhere are truncated in the *user's* zone,
// which is the wrong frame for a billing window.
// Read at call time, not at import: the catalogue is fetched rather than
// static, so the pattern list is only known once it has loaded. Every
// caller already awaits `ensurePricingLoaded` before building a query.
export function priceAnchorSql(modelCol: SQL, tsCol: SQL): SQL {
  const matches = timeSensitiveSqlPatterns().map(
    pattern => sql`lower(coalesce(${modelCol}, '')) like ${pattern}`,
  )
  // No time-varying schedule in the catalogue: every row anchors to NULL,
  // and the callers' group-by collapses back to what it was.
  if (matches.length === 0) {
    return sql`null::bigint as ${sql.raw(PRICE_ANCHOR_COLUMN)}`
  }
  return sql`case when ${sql.join(matches, sql` or `)} then (floor(extract(epoch from ${tsCol}) / 3600) * 3600)::bigint end as ${sql.raw(PRICE_ANCHOR_COLUMN)}`
}
