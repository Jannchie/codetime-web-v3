import fs from 'node:fs'
import { defineConfig } from 'unocss'
import { rokuPreset } from '@roku-ui/preset'

const file = fs.readFileSync('node_modules/@roku-ui/vue/dist/index.js', 'utf-8')

export default defineConfig({
  presets: [
    rokuPreset(),
  ],
  safelist: [
    ...['i-mdi-apple', 'i-mdi-microsoft-windows', 'i-codicon-terminal-linux', 'i-mdi-desktop-classic'],
  ],
  content: {
    inline: [file],
  },
})
