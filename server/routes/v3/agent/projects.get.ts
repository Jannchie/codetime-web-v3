import { and, desc, eq, gte, ilike, isNotNull, ne, sql } from 'drizzle-orm'
import { defineEventHandler, getQuery } from 'h3'
import { agentSessions } from '../../../db/schema'
import { tryUser } from '../../../utils/auth'
import { useDb } from '../../../utils/db'
import { agentVisibilityCutoff } from '../../../utils/plan-limits'
import { sendPyError } from '../../../utils/py-error'

// Distinct agent project names for the caller, most recently active
// first. Feeds pickers (e.g. the token-badge configurator) that need to
// offer the raw `agent_sessions.project` strings the badge/session
// filters match against.

defineRouteMeta({
  openAPI: {
    tags: ['agent'],
    summary: 'List agent project names for the authenticated user',
    parameters: [
      { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Case-insensitive substring filter.' },
      { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 } },
    ],
    responses: {
      200: {
        description: 'Project name page',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['results'],
              properties: {
                results: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['project', 'lastEventAt'],
                    properties: {
                      project: { type: 'string' },
                      lastEventAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      401: { $ref: '#/components/responses/Unauthorized' },
    },
  },
})

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

export default defineEventHandler(async (event) => {
  const user = await tryUser(event)
  if (!user) {
    return sendPyError(event, 401, 'Not authenticated')
  }
  const q = getQuery(event)
  let limit = Number(q.limit ?? DEFAULT_LIMIT)
  if (!Number.isFinite(limit) || limit < 1) {
    limit = DEFAULT_LIMIT
  }
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT
  }
  const search = typeof q.q === 'string' && q.q.trim().length > 0 ? q.q.trim() : null

  const db = useDb()
  const where = [
    eq(agentSessions.userId, user.id),
    isNotNull(agentSessions.project),
    ne(agentSessions.project, ''),
  ]
  const cutoff = agentVisibilityCutoff(user.plan)
  if (cutoff) {
    where.push(gte(agentSessions.lastEventAt, cutoff))
  }
  if (search) {
    where.push(ilike(agentSessions.project, `%${search.replaceAll(/[%_\\]/g, String.raw`\$&`)}%`))
  }

  const lastEventAt = sql<string>`max(${agentSessions.lastEventAt})`
  const rows = await db
    .select({ project: agentSessions.project, lastEventAt })
    .from(agentSessions)
    .where(and(...where))
    .groupBy(agentSessions.project)
    .orderBy(desc(lastEventAt))
    .limit(limit)

  return {
    results: rows.map(r => ({
      project: r.project as string,
      lastEventAt: new Date(r.lastEventAt).toISOString(),
    })),
  }
})
