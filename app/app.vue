<script setup lang="ts">
import { client } from '@/api/v3/client.gen'

// Configure the API client BEFORE any data fetching. Must run first so
// that all subsequent API calls (including the initial user fetch) use
// the correct base URL, credentials, and error handling.
//
// The Nuxt backend now owns every `/v3/*` path (see
// `server/routes/v3/...`) and the SDK targets the same origin as the
// page. The legacy `api.codetime.dev` host is still reachable for the
// VSCode plugin and the LemonSqueezy webhook until edge routing flips
// to a proxy, but the browser bundle no longer dispatches anything to
// it directly.
// SSR has no document to resolve a relative URL against: undici rejects
// `/v3/users/42` with "Failed to parse URL", which surfaced as a hard 500
// on every server-rendered page that awaits the SDK (the annual report)
// and as a blank first paint on the ones that swallow the error (public
// profiles). Give the server run an absolute origin — the request's own
// by default, `NUXT_SSR_API_ORIGIN` when the public host is not routable
// from the box. The origin is constant per deployment, so re-running
// setConfig on this module-level singleton per request is a no-op.
const ssrOrigin = import.meta.server
  ? (process.env.NUXT_SSR_API_ORIGIN || useRequestURL().origin)
  : ''

client.setConfig({
  // Empty string = same origin as the current page (browser only).
  baseUrl: ssrOrigin,
  credentials: 'include',
  throwOnError: true,
})

const { data: user, status } = await fetchUser()
provide('user', user)
// Provide the status ref itself so consumers (e.g. the dashboard layout)
// can reactively bind their skeleton state to the real auth-fetch lifecycle
// instead of relying on a timed autoResetRef.
provide('user-status', status)
provide('user-pending', computed(() => status.value === 'pending' || status.value === 'idle'))

// Preload Berkeley Mono Bold — the font used by the LandingTitle (LCP element
// on /). Fetching in parallel with HTML parsing avoids the late-discovery
// FOIT that pushes LCP past 4s on cold loads.
//
// Scoped to the landing route only. Dashboard / docs / user-profile pages
// don't render the bold mono face, so an unconditional preload triggered
// Chrome's "preloaded but not used within a few seconds" warning everywhere
// else. The preconnect stays global — the regular-weight @font-face below
// still fetches from cdn.jannchie.com on every page.
const route = useRoute()
const isLanding = computed(() => /^\/?[a-z-]{2,7}\/?$/i.test(route.path))
useHead(() => ({
  link: [
    ...(isLanding.value
      ? [{
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: 'https://cdn.jannchie.com/fonts/BerkeleyMono-Bold.woff2',
          crossorigin: 'anonymous',
        }]
      : []),
    { rel: 'preconnect', href: 'https://cdn.jannchie.com', crossorigin: 'anonymous' },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@font-face {
  font-family: 'Berkeley Mono';
  src: url('https://cdn.jannchie.com/fonts/BerkeleyMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Berkeley Mono';
  src: url('https://cdn.jannchie.com/fonts/BerkeleyMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Metric-matched fallback: while Berkeley Mono is loading, system monospace
   takes its place at the same effective size. Eliminates the layout shift
   that previously moved the LCP title and the live-counter row when the
   webfont swapped in (was the dominant CLS contributor on /). */
@font-face {
  font-family: 'Berkeley Mono Fallback';
  src: local('SFMono-Regular'), local('Menlo'), local('Consolas'), local('Liberation Mono');
  ascent-override: 80%;
  descent-override: 20%;
  line-gap-override: 0%;
  size-adjust: 96%;
}

/* Token-driven surface tints. Reading from --ct-* keeps these classes
   cohesive across light/dark without duplicating overrides per scheme. */
.line-btn,
.line-input,
.token-bar,
.lang-trigger,
.acc-avatar,
.layout-foot,
.badge-style-btn:hover {
  background-color: var(--ct-surface-1);
}

.line-btn:hover,
.line-input:hover,
.token-bar:hover,
.lang-trigger:hover,
.lang-trigger-open {
  background-color: var(--ct-surface-2);
}

.line-input:focus {
  background-color: var(--ct-surface-2);
}

/* Pill markers (e.g. FREE / PRO badge in account settings). */
.acc-pill {
  background-color: var(--ct-surface-2);
  color: var(--ct-fg-muted);
}

.acc-pill-primary {
  background-color: var(--ct-primary-soft);
  color: var(--ct-primary);
}
</style>
