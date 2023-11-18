import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { iconMap } from './utils/icon'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        1: 'var(--color-primary-1)',
        2: 'var(--color-primary-2)',
        3: 'var(--color-primary-3)',
      },
      front: {
        1: 'var(--color-fg-1)',
        2: 'var(--color-fg-2)',
        3: 'var(--color-fg-3)',
      },
      back: {
        1: 'var(--color-bg-1)',
        2: 'var(--color-bg-2)',
        3: 'var(--color-bg-3)',
      },
      border: {
        1: 'var(--color-board-1)',
        2: 'var(--color-board-2)',
        3: 'var(--color-board-3)',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: [
    ...iconMap.values(),
    ...['i-mdi-apple', 'i-mdi-microsoft-windows', 'i-codicon-terminal-linux', 'i-mdi-desktop-classic'],
  ],
  content: {
    pipeline: {
      include: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
    },
  },
})
