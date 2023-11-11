const locales = ['en', 'zh-CN', 'ja']

export default defineNuxtRouteMiddleware((to) => {
  const { locale } = to.params as { locale: string }
  if (locales.includes(locale)) {
    return
  }

  // get preferred language from browser
  const headers = useRequestHeaders()
  try {
    const preferredLanguages = headers['accept-language'].split(',').map(d => d.split(';')[0])
    for (const preferredLanguage of preferredLanguages) {
      let trueLanguage = preferredLanguage
      if (trueLanguage === 'zh-TW' || trueLanguage === 'zh-HK' || trueLanguage === 'zh') {
        trueLanguage = 'zh-CN'
      }
      else if (trueLanguage === 'ja-JP' || trueLanguage === 'ja') {
        trueLanguage = 'ja'
      }
      if (trueLanguage !== 'en' && locales.includes(trueLanguage)) {
        return navigateTo(`/${trueLanguage}${to.path}`)
      }
    }
  }
  catch (e) {
    console.error(e)
  }
  return navigateTo(`/en${to.path}`)
})
