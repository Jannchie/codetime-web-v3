import { locales } from '~/i18n'

export default defineSitemapEventHandler(async () => {
  const urls = []
  
  // Add homepage for all locales
  for (const locale of locales) {
    urls.push({
      loc: `/${locale}`,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    })
  }
  
  // Add static pages for all locales
  const staticPages = [
    '/dashboard',
    '/dashboard/workspace', 
    '/dashboard/leaderboard',
    '/dashboard/badges',
    '/dashboard/tags',
    '/dashboard/settings',
    '/demo'
  ]
  
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        loc: `/${locale}${page}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      })
    }
  }
  
  // TODO: Add dynamic user profile pages
  // This would require API calls to get user list
  // for now we skip them as they might be private
  
  return urls
})