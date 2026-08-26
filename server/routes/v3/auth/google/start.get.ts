import { randomBytes } from 'node:crypto'
import { defineEventHandler, getQuery, sendRedirect, setCookie } from 'h3'
import { isProduction } from '../../../../utils/env'
import { frontendUrl, GOOGLE_LINK_COOKIE, GOOGLE_NONCE_COOKIE, GOOGLE_RETURN_COOKIE, GOOGLE_STATE_COOKIE, GOOGLE_STATE_TTL_SECONDS, googleWebClientId, safeReturnPath } from '../../../../utils/oauth'

// Server-initiated Google OAuth handshake — the FedCM-free replacement
// for Google Identity Services.
//
// GIS (both the One Tap prompt and the rendered button) drives sign-in
// through `navigator.credentials.get({identity})`. That API is simply
// absent for a non-trivial slice of users — privacy extensions and Brave
// shields block it, Chrome's `chrome://settings/content/federatedIdentityApi`
// toggle disables it, and older/non-Chromium browsers never had it. Those
// users saw `FedCM get() rejects with NotSupportedError` in the console
// and a button that did nothing (issue #41), with no way for us to detect
// the failure in JS and fall back.
//
// A plain authorization-code redirect has none of those dependencies: no
// third-party cookies, no new browser APIs, just a 302. Same shape as
// /v3/auth/github/start, including `?link=1` link mode and `?return_to=`.

defineRouteMeta({
  openAPI: {
    tags: ['auth'],
    summary: 'Begin Google OAuth (sets state cookie, redirects)',
    parameters: [
      {
        name: 'link',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['1'] },
        description: 'When `1`, the callback will link the Google identity to the currently signed-in user instead of provisioning a new account.',
      },
    ],
    responses: {
      302: { description: 'Redirect to Google /authorize' },
    },
  },
})

export default defineEventHandler((event) => {
  const fe = frontendUrl()
  const clientId = googleWebClientId()
  if (!clientId) {
    return sendRedirect(event, `${fe}/auth/error?message=${encodeURIComponent('Google OAuth is not configured')}`, 302)
  }

  const state = randomBytes(24).toString('hex')
  const nonce = randomBytes(24).toString('hex')
  const isProd = isProduction()
  // SameSite=Lax: the cookies must survive Google's top-level redirect
  // back to our callback. Strict would drop them.
  const cookieOpts = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: GOOGLE_STATE_TTL_SECONDS,
    path: '/',
  } as const
  setCookie(event, GOOGLE_STATE_COOKIE, state, cookieOpts)
  setCookie(event, GOOGLE_NONCE_COOKIE, nonce, cookieOpts)

  const query = getQuery(event)
  const isLinkMode = query.link === '1'
  if (isLinkMode) {
    setCookie(event, GOOGLE_LINK_COOKIE, '1', cookieOpts)
  }

  const returnTo = safeReturnPath(query.return_to)
  if (returnTo) {
    setCookie(event, GOOGLE_RETURN_COOKIE, returnTo, cookieOpts)
  }

  // Must match byte-for-byte with the value the callback sends to
  // /token — see the redirect_uri note in callback.get.ts.
  const redirectUri = `${fe}/v3/auth/google/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    nonce,
  })
  // Link mode means "attach a *different* Google account to the one I'm
  // already signed into", so force the chooser — otherwise a user with a
  // single Google session gets bounced straight back with the identity
  // they already have. Plain sign-in deliberately omits it: letting
  // Google auto-select the sole logged-in account makes the round-trip
  // nearly invisible, which is the closest we get to the One Tap
  // experience the FedCM breakage cost us.
  if (isLinkMode) {
    params.set('prompt', 'select_account')
  }
  return sendRedirect(event, `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`, 302)
})
