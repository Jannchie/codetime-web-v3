// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://api.codetime.dev',
      githubClientId: process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID || '978fe1a6f0c5d12f5beb',
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '1020029657488-f66ubcmj6qqg4h4ptjk505ljmkv55jkv.apps.googleusercontent.com',
    },
  },
  site: {
    url: 'https://codetime.dev',
    name: 'Code Time',
  },
  // ogImage: {
  //   fonts: [
  //     'Noto+Sans+SC:400', // Too big for workers
  //   ],
  // },
  gtag: {
    id: 'G-36N091FBKT',
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  imports: {
    dirs: [
      'composables/**',
      'utils/**',
      'i18n/**',
    ],
  },

  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@nuxtjs/robots', '@nuxt/image', 'nuxt-gtag', [
    '@nuxtjs/google-fonts',
    {
      download: true,
      families: {
        'Share Tech Mono': true,
      },
    },
  ], 'nuxt-og-image'],
  compatibilityDate: '2024-10-13',
})
