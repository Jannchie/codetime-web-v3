export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event: _ }) => {
    html.head.push(`<script>!function() {var e = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; t = localStorage.getItem("theme") || "auto";("dark" === t || e && "light" !== t) ? document.documentElement.setAttribute("data-scheme", "dark") : document.documentElement.setAttribute("data-scheme", "light")}()</script>`)
  })
})
