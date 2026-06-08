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
- `src/widgets/chartDataUtils.ts`: optional chart row sorting/series helper; this is not a mock data file.
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
3. Edit `src/config/dashboard.config.ts` incrementally from the copied template baseline. Keep the selected template's native nav/page shape, filter trigger/panel/popover pattern, toolbar placement, theme fields, and shell-owned state unless the user explicitly asks for a template-level redesign. Map requirement-document title/filter/navigation/toolbar intent into these existing config slots instead of recreating the requirement shell.
4. Put default/offline data in `src/data/dashboard.dataset.json`, or configure `data.id: 'apiData'` / `source.id: 'apiData'` with an `api` block in `dashboard.config.ts`. Register custom API/provider resolvers in `src/dataSources/registry.ts` for complex providers or filter-driven scenario data that cannot be represented by plain JSON rows. Do not add `src/widgets/*Data.ts`, `src/data/*.ts`, or other TS fixture modules for mock rows.
5. Add widgets through `components/`, `types.ts`, and `registry.ts`.
6. Run `npm run validate:dashboard`.
7. Run `npm run build`.
8. Start with `npm run dev:auto -- --port <port>` or `npm run preview:auto -- --port <port>` when a preview is needed.

## Edit Boundaries

Prefer config/data/widget layers:

- Requirements -> `dashboard.config.ts`.
- Shell navigation/filter changes -> existing `nav`/`page`, `filters`, `screen.controls`, and theme fields in `dashboard.config.ts`; patch or extend them instead of generating a separate nav/filter shell.
- Requirement-document title/header/filter/navigation/toolbar sketches -> existing template title/logo, `nav`/`page`, `filters`, `screen.controls`, `actions`, and theme slots. Preserve business labels, defaults, options, and behaviors, but adapt the structure to the selected template.
- Static/mock data -> `dashboard.dataset.json`.
- Standard API endpoint/query binding -> `widget.data.api` or `filters[].source.api` in `dashboard.config.ts`.
- Response adapters and custom API/provider resolvers -> `dataSources/registry.ts`.
- Business visuals -> `src/widgets/components/*.vue`.
- Chart row sorting and series helpers -> `src/widgets/chartDataUtils.ts` or a similarly named utility file, never a data-bearing `*Data.ts` module.
- Component-owned popup/jump/drilldown -> component implementation.
- Shell-level event observation or external integration hooks -> `src/actions/registry.ts`.

Avoid framework edits unless intentionally changing the template itself:

- `src/components/DashboardShell.vue`
- `src/widgets/WidgetRenderer.vue`
- `src/widgets/WidgetViewport.vue`
- `src/utils/dashboardExpressions.ts`
- validation/start scripts

Avoid shell replacement in generated projects:

- Do not replace a left-nav template's `nav` array with a single-page `page` object, or replace a topbar template's single `page` object with a new sidebar.
- Do not implement new persistent filter bars, sidebars, or drawers inside widgets when the template already owns filter invocation.
- Do not add duplicate title bars, filter regions, navigation layers, sidebars, or toolbars because a requirement document shows a different shell. Use template-level fields and document any adaptation.
- Do not create standalone `FilterToolbar`, `FilterBar`, persistent header filter rows, or extra filter drawers for bundled templates. A requirement that says "主筛选栏", "筛选工具栏", or "filter bar" maps to template `filters[]` plus the native trigger/panel/popover/drawer unless the user explicitly approves a template-level redesign.
- Do not drop default fields such as `defaultTheme`, `defaultNavOpen`, `defaultFiltersOpen`, `screen.controls`, or the template's logo slot while rewriting business labels.
- Dark template pages must load Element Plus dark CSS variables and toggle the Element Plus `.dark` class with the template theme, or provide equivalent `--el-*` token overrides. Changing only `screen.defaultTheme` is not enough: update logo variant, `screen.grid.innerBackgroundColor`, card surfaces, and component scoped input/control backgrounds to the same theme tokens.

Layout design rules:

- Use `template-layout-design-system.md` for shared page layout, block spacing, block inner padding, radius, title band, hover/focus, and template-token decisions.
- Change layout tokens through `dashboard.config.ts` first: `contentGap`, `contentStartY`, `contentEndY`, `rowHeight`, `cellPadding`, `dominantTitleColor`, and `innerBackgroundColor`.
- Keep the common block anatomy: `placeholder-cell` -> `placeholder-cell-inner` -> 32px title band -> body viewport -> `widget-renderer`.
- Do not solve business-widget density by rewriting template shell padding, title band height, or card radius. Route component fit to `$report-component-style-design`.

Filter binding rules:

- Template filter UI is shell-owned. Add, remove, relabel, source, and scope global/page filters through `filters[]`; bind component-local title-band controls through `localFilters[]`.
- If a global/page filter should affect a widget, configure `widget.data.filterFields`, `requiredFilters`, API query/body mapping, or a custom resolver param.
- Use `widget.data.ignoredFilters` only for widgets that are intentionally invariant under that filter. Record each scope reason in `widget.data.ignoredFilterReasons`; do not use it because mock rows lack the filter field or because the resolver is missing.
- Offline/mock rows or custom resolvers must produce different affected widget data for meaningful non-default filter states such as view, snapshot date, month, organization, industry, or scenario.
- After binding filters, test at least one non-default option and verify a visible KPI/chart/table/list value changes, not only the filter selected state.

Interaction feedback rules:

- Template-level hover/focus styles for cards, blocks, toolbar buttons, nav items, filter options, and local chips should preserve geometry.
- Prefer border-color changes, inset glow, in-bounds pseudo-elements, or stable background changes.
- Do not use hover `translate`, `scale`, or outside-only shadows in fixed `8 * N` blocks, overflow-hidden cells, or compact shell controls unless screenshots prove the effect is not clipped.

Template assets intentionally exclude `node_modules` and `dist`.

Dependency rule: if install stalls for more than 120 seconds, stop the install, remove unused heavy packages from the generated project and lockfile, then retry with the minimal dependency set needed for the current prototype.
