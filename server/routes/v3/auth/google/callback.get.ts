import { defineEventHandler, deleteCookie, getCookie, getHeader, getQuery, sendRedirect } from 'h3'
import { tryUser } from '../../../../utils/auth'
import { setAuthCookies } from '../../../../utils/auth-cookie'
import { exchangeGoogleWebCode, frontendUrl, GOOGLE_LINK_COOKIE, GOOGLE_NONCE_COOKIE, GOOGLE_RETURN_COOKIE, GOOGLE_STATE_COOKIE, linkProviderIdentity, safeReturnPath, upsertGoogleUser, verifyGoogleIdToken } from '../../../../utils/oauth'

// Callback half of the redirect sign-in flow started at
// /v3/auth/google/start. Verifies state + nonce, exchanges the code for
// an ID token, then hands off to exactly the same verify/upsert path the
// GIS endpoint (/v3/auth/google) uses — same OAuth client, so `sub` is
// identical and existing users.google_id rows keep matching.
//
// Structure mirrors /v3/auth/github deliberately: the duplicate-hit
// guards below were all learned from real traces on that route, and
// Google authorization codes are single-use in the same way.

const recentCodes = new Map<string, number>()
const CODE_TTL_MS = 10 * 60 * 1000

function rememberCode(code: string) {
  const now = Date.now()
  for (const [k, t] of recentCodes) {
    if (now - t > CODE_TTL_MS) {
      recentCodes.delete(k)
    }
  }
  recentCodes.set(code, now)
}

defineRouteMeta({
  openAPI: {
    tags: ['auth'],
    summary: 'Google OAuth callback (redirect flow)',
    parameters: [
      { name: 'code', in: 'query', required: true, schema: { type: 'string' } },
      { name: 'state', in: 'query', required: true, schema: { type: 'string' } },
    ],
    responses: {
      302: { description: 'Redirect to frontend' },
    },
  },
})

function safeCode(code: unknown): code is string {
  return typeof code === 'string' && code.length >= 8 && code.length <= 2048 && /^[\w./-]+$/.test(code)
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const fe = frontendUrl()

  // Always clear the handshake cookies, whatever happens next, so a
  // single state/nonce pair can never be replayed.
  const stateFromCookie = getCookie(event, GOOGLE_STATE_COOKIE) || ''
  const nonceFromCookie = getCookie(event, GOOGLE_NONCE_COOKIE) || ''
  const linkIntent = getCookie(event, GOOGLE_LINK_COOKIE) === '1'
  const returnTo = safeReturnPath(getCookie(event, GOOGLE_RETURN_COOKIE))
  deleteCookie(event, GOOGLE_STATE_COOKIE, { path: '/' })
  deleteCookie(event, GOOGLE_NONCE_COOKIE, { path: '/' })
  deleteCookie(event, GOOGLE_LINK_COOKIE, { path: '/' })
  deleteCookie(event, GOOGLE_RETURN_COOKIE, { path: '/' })

  // User dismissed the Google account chooser, or Google refused the
  // request outright. Not an error worth an /auth/error page.
  if (typeof q.error === 'string') {
    return sendRedirect(event, linkIntent ? `${fe}/dashboard/settings` : fe, 302)
  }

  const code = q.code
  if (!safeCode(code)) {
    return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Invalid authorization code')}`, 302)
  }

  // OAuth Login-CSRF defence — see /v3/auth/github/start.
  const stateFromQuery = typeof q.state === 'string' ? q.state : ''
  if (!stateFromQuery || !stateFromCookie || stateFromQuery !== stateFromCookie) {
    return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Invalid OAuth state')}`, 302)
  }

  // Prefetch/speculation agents and bfcache replays would otherwise burn
  // the single-use code and hand the real user an error page.
  const purpose = (getHeader(event, 'sec-purpose') || getHeader(event, 'purpose') || '').toLowerCase()
  if (purpose.includes('prefetch')) {
    return sendRedirect(event, fe, 204 as any)
  }
  if (recentCodes.has(code)) {
    return sendRedirect(event, fe, 302)
  }
  rememberCode(code)

  const linkSession = linkIntent ? await tryUser(event) : null

  try {
    // CRITICAL: build redirect_uri from frontendUrl(), not from
    // getRequestURL(event). Nginx terminates TLS and proxies plain HTTP
    // to Nuxt without X-Forwarded-Proto, so the request URL reads as
    // http:// — and Google compares redirect_uri byte-for-byte between
    // /authorize and /token. Same trap as the GitHub callback.
    const redirectUri = `${fe}/v3/auth/google/callback`
    const { idToken } = await exchangeGoogleWebCode(code, redirectUri)
    const claims = await verifyGoogleIdToken(idToken)
    if (!claims.sub) {
      return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Google user ID not found')}`, 302)
    }
    // The ID token must echo the nonce we planted at /authorize.
    if (!nonceFromCookie || claims.nonce !== nonceFromCookie) {
      return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Invalid OAuth nonce')}`, 302)
    }

    if (linkSession) {
      // Link mode — attach to the signed-in user rather than provisioning
      // a new row. Outcomes match POST /v3/auth/google/link, and the
      // settings page already renders these ?link=&result= banners.
      const outcome = await linkProviderIdentity(linkSession.id, 'googleId', claims.sub)
      const settingsUrl = `${fe}/dashboard/settings`
      switch (outcome) {
        case 'linked':
        case 'already-yours': {
          return sendRedirect(event, `${settingsUrl}?link=google&result=ok`, 302)
        }
        case 'taken-by-self': {
          return sendRedirect(event, `${settingsUrl}?link=google&result=replace`, 302)
        }
        case 'conflict': {
          return sendRedirect(event, `${settingsUrl}?link=google&result=conflict`, 302)
        }
      }
    }

    const { id, tokenV1 } = await upsertGoogleUser(claims)
    setAuthCookies(event, id, tokenV1)
    return sendRedirect(event, `${fe}${returnTo ?? ''}`, 302)
  }
  catch (error) {
    console.error('[auth.google.callback]', error)
    return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Authentication failed. Please try again.')}`, 302)
  }
})
