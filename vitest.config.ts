import { defineConfig } from 'vitest/config'

// Deliberately plain — no Nuxt plugin. The units under test here are
// framework-free (`server/utils/agent-pricing*`), and booting Nuxt to
// exercise them would trade seconds per run for nothing. Anything that
// genuinely needs the Nitro context belongs in its own project entry.
export default defineConfig({
  test: {
    include: ['server/**/*.test.ts'],
    environment: 'node',
  },
})
