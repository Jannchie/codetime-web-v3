# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Codetime Web V3 is a Nuxt.js web application for code time analytics, running at <https://codetime.dev>. This is the third iteration, evolved from Vue SPA to Next.js and now to Nuxt.js, with visualization switched from ECharts to Observable Plot.

## Development Commands

- **Install dependencies:** `pnpm install` (preferred package manager)
- **Development server:** `pnpm run dev` (runs on port 3001 with .env.dev)
- **Build for production:** `pnpm run build`
- **Lint and fix:** `pnpm run lint` (uses @jannchie/eslint-config with UnoCSS support)
- **Generate static site:** `pnpm run generate`
- **Preview production build:** `pnpm run preview`
- **Update API SDK:** `pnpm openapi` (regenerates from OpenAPI spec at test.codetime.dev)
- **Deploy:** `pnpm deploy` (updates API, builds, and starts with PM2)

## Architecture

### Framework Stack

- **Frontend:** Nuxt.js 4 with Vue 3 and TypeScript
- **Styling:** UnoCSS with @roku-ui/preset and @roku-ui/vue components
- **API:** Auto-generated TypeScript SDK from OpenAPI spec
- **Deployment:** PM2 cluster mode with health checks
- **Visualization:** Observable Plot for charts and data visualization

### Directory Structure

- `app/` - Main application code (Nuxt 4 app directory structure)
  - `api/v3/` - Auto-generated API client (ignored by ESLint)
  - `components/` - Vue components organized by feature
  - `composables/` - Shared reactive logic
  - `i18n/` - Internationalization with support for 12+ languages
  - `layouts/` - Page layouts (default, dashboard, landing, user)
  - `pages/` - File-based routing with locale support
  - `utils/` - Helper functions and data formatters
- `public/` - Static assets including VSCode icons
- `server/` - Server-side code

### Key Patterns

- **Routing:** File-based with locale parameter `[locale]/dashboard/workspace.vue`
- **State Management:** Vue's ref/computed + composables (no Vuex/Pinia)
- **Data Fetching:** `useAsyncData` composable with API client
- **Internationalization:** Translation keys via `useI18N()` composable
- **LRU Cache:** Custom `useLRU` composable for recent selections
- **Type Safety:** Strict TypeScript with `@typescript-eslint/consistent-type-definitions`

### Component Organization

- `Badge/` - Badge and card components
- `Dashboard/` - Dashboard-specific components (calendar, stats, filters)
- `Landing/` - Landing page components
- `Polt/` - Observable Plot chart wrappers
- `Tag/` - Tag management and statistics
- `R/` - Reusable UI components (buttons, inputs, etc.)

### API Integration

- Auto-generated SDK from OpenAPI spec at `https://test.codetime.dev/v3/docs/openapi.json`
- Client configured with credentials and error handling in `app.vue`
- Base URL configurable via `NUXT_PUBLIC_API_HOST` environment variable

### Styling Conventions

- UnoCSS utility-first approach with Roku UI preset
- Safelist includes platform icons (`i-mdi-apple`, `i-mdi-microsoft-windows`, etc.)
- Font stack: Inter for Latin, HarmonyOS Sans for CJK languages
- VSCode file type icons available in `public/vscode-icons/`

### Deployment Configuration

- PM2 cluster mode with 2 instances
- Health checks on port 3000 at `/en` endpoint
- Memory limit: 500MB with automatic restart
- Production server runs on port 3001

## Development Guidelines

### Code Quality

- ESLint with strict TypeScript rules enforced
- Type definitions prefer `type` over `interface`
- Auto-generated API code excluded from linting
- Binary operators indentation rule disabled for readability

### Internationalization

- Support for 12+ languages (en, zh-CN, zh-TW, ja, de, es, fr, it, ru, ua, ms, pt-BR)
- All UI text must use translation keys
- Locale-aware routing with `[locale]` parameter

### Data Visualization

- Observable Plot for charts (daily distribution, language stats, flame charts)
- Custom plot components in `components/Polt/`
- D3.js available for advanced visualizations

### Performance

- UnoCSS for optimized CSS
- Nuxt image optimization enabled
- Auto-imports for composables and utilities
- Code splitting via Nuxt's built-in features
