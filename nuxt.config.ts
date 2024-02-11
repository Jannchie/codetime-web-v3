// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://test.codetime.dev',
      mode: 'development',
      paypalClientId: 'AXck1kiF-dt9WSHiBF3GlrZTHX3rcL4WJpR-LjJ3QUVtgVUvlTZ7UniOXLe9XPHZIRtIgqiVdQknmZES',
      YearlyPlanId: 'P-08J88880F9217380SMWWSZ6A',
      MonthlyPlanId: 'P-9GB45134DW5272217MWWSZ5Y',
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
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@nuxtjs/robots', ['@nuxtjs/google-fonts', {
    preload: false,
    download: true,
    families: {
      'Share Tech Mono': true,
      'Noto Sans JP': true,
      'Noto Sans SC': true,
    },
  }], '@nuxt/image', 'nuxt-gtag'],
})
