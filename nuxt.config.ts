// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://test.codetime.dev',
    },
  },
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
  ], '@nuxthub/core'],
  compatibilityDate: '2024-10-13',
})
