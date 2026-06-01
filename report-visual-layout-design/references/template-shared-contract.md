# Template Shared Contract

Use this file when copying a template, locating extension points, or deciding which files should own a change.

## Common Project Shape

All three template assets share these extension points:

- `src/config/dashboard.config.ts`: title, logo, nav/page definitions, `layoutRows`, widgets, filters, actions, modals, theme.
- `src/data/dashboard.data.ts`: static/mock business rows.
- `src/dataSources/registry.ts`: data resolvers, dynamic filter option resolvers, API adapters.
- `src/widgets/templates/WidgetTemplate.vue`: starter file for every business widget.
- `src/widgets/components/`: business widget components.
- `src/widgets/types.ts`: widget prop contracts and registry types.
- `src/widgets/registry.ts`: component registration.
- `src/actions/registry.ts`: custom business action handlers.
- `src/styles.css`: template shell styles only.
- `public/`: logo and static assets.
- `scripts/validate-dashboard-contract.mjs`: dashboard contract validator.
- `scripts/start-available-port.mjs`: local port helper for `dev:auto` / `preview:auto`.

## Basic Create Loop

1. Copy `assets/templates/<template-id>/` to the target project.
2. Run `npm install`.
3. Edit `src/config/dashboard.config.ts`.
4. Put data in `dashboard.data.ts` or `dataSources/registry.ts`.
5. Add widgets through `components/`, `types.ts`, and `registry.ts`.
6. Run `npm run validate:dashboard`.
7. Run `npm run build`.
8. Start with `npm run dev:auto -- --port <port>` or `npm run preview:auto -- --port <port>` when a preview is needed.

## Edit Boundaries

Prefer config/data/widget layers:

- Requirements -> `dashboard.config.ts`.
- Static/mock data -> `dashboard.data.ts`.
- Dynamic options/API-like resolvers -> `dataSources/registry.ts`.
- Business visuals -> `src/widgets/components/*.vue`.
- Business action handlers -> `src/actions/registry.ts`.

Avoid framework edits unless intentionally changing the template itself:

- `src/components/DashboardShell.vue`
- `src/widgets/WidgetRenderer.vue`
- `src/widgets/WidgetViewport.vue`
- `src/utils/dashboardExpressions.ts`
- validation/start scripts

Template assets intentionally exclude `node_modules` and `dist`.

