// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiHost: 'http://localhost:8081',
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    ['@nuxtjs/google-fonts', {
      preload: true,
      families: {
        'Share Tech Mono': true,
      },
    }],
    '@nuxt/image',
  ],
})
