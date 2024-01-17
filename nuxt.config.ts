// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://api.codetime.dev',
      mode: 'development',
    },
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
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    ['@nuxtjs/google-fonts', {
      preload: true,
      download: true,
      families: {
        'Share Tech Mono': true,
        'Noto Sans JP': true,
        'Noto Sans SC': true,
      },
    }],
    '@nuxt/image',
  ],
})
