export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event: _ }) => {
    html.head.push(`<script type="text/javascript">!(function () {
      const e = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const t = localStorage.getItem('scheme') || 'auto'; (t === 'dark' || e && t !== 'light')
        ? document.documentElement.dataset.scheme = 'dark'
        : document.documentElement.dataset.scheme = 'light'
    }())
    </script>`)
  })
})
