// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    'radix-vue/nuxt',
  ],
})
