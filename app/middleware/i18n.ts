export default defineNuxtRouteMiddleware((to, from) => {
  try {
    const locale = to.path.split('/')[1] || ''
    if (locales.includes(locale)) {
      return
    }
    if (from.path !== to.path) {
      return
    }

    const cookie = useCookie('locale')
    if (cookie.value && locales.includes(locale)) {
      return navigateTo(`/${cookie.value}${to.path}`, { redirectCode: 302 })
    }

    const headers = useRequestHeaders()
    let preferredLanguages = ['en']
    try {
      if (headers['accept-language']) {
        preferredLanguages = headers['accept-language'].split(',').map(d => d.split(';')[0] || '')
      }
    }
    catch (error) {
      console.error(error)
    }

    for (const preferredLanguage of preferredLanguages) {
      let trueLanguage = preferredLanguage
      if (trueLanguage === 'zh-HK' || trueLanguage === 'zh') {
        trueLanguage = 'zh-CN'
      }
      else if (trueLanguage === 'ja-JP' || trueLanguage === 'ja') {
        trueLanguage = 'ja'
      }

      if (trueLanguage !== 'en' && locales.includes(trueLanguage)) {
        return navigateTo(`/${trueLanguage}${to.path}`, { redirectCode: 302 })
      }
    }
    return navigateTo(`/en${to.path}`, { redirectCode: 302 })
  }
  catch (error) {
    console.error(error)
    return navigateTo(`/en${to.path}`, { redirectCode: 302 })
  }
})
