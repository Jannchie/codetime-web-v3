import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { iconMap } from './utils/icon'

export default defineConfig({
  theme: {
    colors: {
      frontground: 'var(--color-frontground)',
      background: 'var(--color-background)',
      primary: {
        1: 'var(--color-primary-1)',
        2: 'var(--color-primary-2)',
        3: 'var(--color-primary-3)',
      },
      border: {
        1: 'var(--color-border-1)',
        2: 'var(--color-border-2)',
        3: 'var(--color-border-3)',
      },
      back: {
        1: 'var(--color-bg-1)',
        2: 'var(--color-bg-2)',
        3: 'var(--color-bg-3)',
      },
      error: {
        1: 'var(--color-error-1)',
        2: 'var(--color-error-2)',
        3: 'var(--color-error-3)',
      },
      success: {
        1: 'var(--color-success-1)',
        2: 'var(--color-success-2)',
        3: 'var(--color-success-3)',
      },
      warning: {
        1: 'var(--color-warning-1)',
        2: 'var(--color-warning-2)',
        3: 'var(--color-warning-3)',
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
