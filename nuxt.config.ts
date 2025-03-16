// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://api.codetime.dev',
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
