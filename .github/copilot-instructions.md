# Copilot Instructions for Codetime Web V3

## Project Overview
- **Framework:** Nuxt.js (Vue 3, TypeScript)
- **Purpose:** Web dashboard for code time analytics, running at [codetime.dev](https://codetime.dev)
- **Key Features:** Project selection, workspace analytics, flame charts, branch/file stats, multi-language support

## Architecture & Patterns
- **Pages:** Located in `pages/`, use Nuxt file-based routing. Example: `pages/[locale]/dashboard/workspace.vue` for workspace analytics.
- **Components:** Modular Vue components in `components/`, grouped by feature (e.g., `Dashboard/`, `Badge/`, `Card/`).
- **API Layer:** All backend API calls are in `api/v3/` (e.g., `v3GetWorkspaceFiles`). Use composables for data fetching (`useAsyncData`).
- **Composables:** Shared logic in `composables/` (e.g., `useLRU`, `useLocale`).
- **i18n:** Language files in `i18n/`, with translation keys accessed via `useI18N()` composable.
- **State:** Use Vue's `ref`, `computed`, and composables for state management. No Vuex/Pinia.
- **Styling:** Utility-first CSS (Tailwind/UnoCSS). Use class utilities for layout and theming.

## Developer Workflows
- **Install:** Use `pnpm install` (preferred), or npm/yarn/bun.
- **Dev Server:** `pnpm run dev` (or npm/yarn/bun equivalent).
- **Build:** `pnpm run build` for production. Preview with `pnpm run preview`.
- **API Mocking:** Not present by default; real API endpoints expected.
- **Testing:** No explicit test framework or scripts found—add tests in `tests/` if needed.

## Conventions & Tips
- **Component Naming:** Use PascalCase for components. Group by feature for clarity.
- **Props/Events:** Use `v-model` for two-way binding (e.g., `ProjectSelect v-model="project"`).
- **Data Fetching:** Use `useAsyncData` for async server/client data. Watch relevant refs for reactivity.
- **Localization:** Always use translation keys, never hardcode UI text.
- **API Usage:** Import from `~/api/v3` and pass query params as objects.
- **LRU/History:** Use `useLRU` composable for recent selections (see workspace/project selection).
- **Charts:** Use Observable Plot for data visualization (see `components/Polt/`).

## Integration Points
- **External APIs:** All backend data via `api/v3/` endpoints.
- **Icons:** Use icon classes (e.g., `i-tabler-git-branch`) for UI icons.
- **Theming:** Theme utilities in `theme/` and CSS classes.

## Example: Adding a New Dashboard Widget
1. Create a new component in `components/Dashboard/`.
2. Fetch data using a composable or API from `api/v3/`.
3. Add to the relevant page in `pages/[locale]/dashboard/`.
4. Use translation keys for all text.

## Key Files/Dirs
- `pages/` — Nuxt pages/routes
- `components/` — UI components
- `api/v3/` — API client logic
- `composables/` — Shared logic
- `i18n/` — Localization
- `theme/` — Theming utilities
- `utils/` — Data formatting, helpers

---
For more, see `README.md` or ask for clarification on project-specific patterns.
