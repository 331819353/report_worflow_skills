# Template Shared Contract

Use this file when copying a template, locating extension points, or deciding which files should own a change.

## Common Project Shape

All four template assets share these extension points:

- `src/config/dashboard.config.ts`: title, logo, nav/page definitions, `layoutRows`, widgets, filters, actions, and theme.
- `src/data/dashboard.dataset.json`: default JSON dataset with `filterData` and `businessData`.
- `src/data/dashboard.loader.ts`: JSON loader for filter and business data.
- `src/dataSources/registry.ts`: built-in JSON resolvers, built-in `apiData` / `httpData` resolver, response adapters, custom provider resolvers, and JSON/API switching points.
- `demo/config-templates.ts`: copyable configuration examples for JSON data binding, API data binding, filters, local filters, viewport, and action hooks.
- `src/widgets/templates/WidgetTemplate.vue`: starter file for every business widget.
- `src/widgets/components/`: business widget components.
- `src/widgets/types.ts`: widget prop contracts and registry types.
- `src/widgets/registry.ts`: component registration.
- `src/actions/registry.ts`: shell-level action hook registry. Business popup, navigation, drilldown, and deep interactions stay inside components.
- `src/styles.css`: template shell styles only.
- `public/`: logo and static assets.
- `scripts/validate-dashboard-contract.mjs`: dashboard contract validator.
- `scripts/start-available-port.mjs`: local port helper for `dev:auto` / `preview:auto`.

## Basic Create Loop

1. Copy `assets/templates/<template-id>/` to the target project.
2. Install only the dependencies needed by the current component set. Start with the base `package.json`; add `@antv/s2` and `@antv/s2-vue` only when the implementation contains pivot tables, cross tables, wide metric matrices, frozen-header analytical tables, or equivalent S2-class table needs.
3. Edit `src/config/dashboard.config.ts`.
4. Put default/offline data in `src/data/dashboard.dataset.json`, or configure `data.id: 'apiData'` / `source.id: 'apiData'` with an `api` block in `dashboard.config.ts`. Register custom API/provider resolvers in `src/dataSources/registry.ts` only for complex providers.
5. Add widgets through `components/`, `types.ts`, and `registry.ts`.
6. Run `npm run validate:dashboard`.
7. Run `npm run build`.
8. Start with `npm run dev:auto -- --port <port>` or `npm run preview:auto -- --port <port>` when a preview is needed.

## Edit Boundaries

Prefer config/data/widget layers:

- Requirements -> `dashboard.config.ts`.
- Static/mock data -> `dashboard.dataset.json`.
- Standard API endpoint/query binding -> `widget.data.api` or `filters[].source.api` in `dashboard.config.ts`.
- Response adapters and custom API/provider resolvers -> `dataSources/registry.ts`.
- Business visuals -> `src/widgets/components/*.vue`.
- Component-owned popup/jump/drilldown -> component implementation.
- Shell-level event observation or external integration hooks -> `src/actions/registry.ts`.

Avoid framework edits unless intentionally changing the template itself:

- `src/components/DashboardShell.vue`
- `src/widgets/WidgetRenderer.vue`
- `src/widgets/WidgetViewport.vue`
- `src/utils/dashboardExpressions.ts`
- validation/start scripts

Template assets intentionally exclude `node_modules` and `dist`.

Dependency rule: if install stalls for more than 120 seconds, stop the install, remove unused heavy packages from the generated project and lockfile, then retry with the minimal dependency set needed for the current prototype.
