---
name: single-page-dashboard-template
description: Use this skill when creating, copying, adapting, or auto-starting a TypeScript + Vue 3 + Vite + ECharts + AntV S2 standalone single-page business dashboard/report template. Choose it for compact focused report content, top-bar navigation only, no sidebar, direct first-screen answers, light/dark layouts, centered title, Haier logo, right-side theme/refresh/filter/download controls, automatic free-port local preview, and an 8*N content grid. Do not use it for large multi-chapter reports, dense report suites, or command-center big-screen presentation pages.
---

# Single Page Dashboard Template

Use this skill to produce a reusable single-page report dashboard template. The bundled asset is a TypeScript + Vue 3 + Vite project designed around a fixed 1920x1080 canvas, light/dark layout themes, a top menu bar, one 8*N page content grid, independent data files, data-source-backed widgets and filters, scoped filters, configurable actions, modal drilldowns, and WidgetTemplate-driven custom content.

## When To Use

Choose this template when:

- The output is one compact standalone report page, not a large report suite.
- The user asks for 单页, 顶部栏, 无侧边栏, or a lightweight page shell.
- The page should answer one focused business question quickly, such as a single 总览, 诊断, 明细查询, 复盘, or核对 page.
- The content can be reasonably carried by one 8*N grid, usually 1-3 sections and about 4-12 components.
- The report can be understood through one 8*N content grid with optional drawers/modals, rather than navigation across many pages.
- The page may be embedded, shared as a preview URL, used in a meeting, or opened as a focused prototype.

Do not choose this template when:

- The report has multiple chapters, many tables/components, or separate views even if it is still one report theme; use `left-nav-analytics-dashboard-template`.
- The product needs several report pages or modules; use `left-nav-analytics-dashboard-template`.
- The screen is a command-center, exhibition, monitoring wall, or sci-fi cockpit; use `sci-fi-dashboard-template`.
- Users need persistent sidebar navigation, saved workbench behavior, or frequent switching between related reports.

## Technical Architecture

Use this stack for report prototypes built from this template:

- TypeScript + Vue 3 single-file components with Composition API.
- Vite for development, build, and preview.
- ECharts for standard charts: KPI trends, bars, lines, heatmaps, scatter, maps, waterfalls, funnels, gauges, and mixed report visuals.
- AntV S2 through `@antv/s2` and `@antv/s2-vue` for analytical tables, pivot tables, cross tables, frozen headers, dense comparison grids, and wide metric matrices.
- Keep business data in `src/data/` or data-source resolvers. Keep visual widgets typed and scoped.
- Use template-level dashboard actions for drilldown, modal, filter mutation, fullscreen action handling, print/download, URL navigation, and cross-widget behavior.

## Quick Workflow

1. Copy `assets/dashboard-template/` into the target project, or merge its `src/`, `public/`, and config files into an existing Vue 3 + TypeScript + Vite app.
2. Run `npm install` if dependencies are not present.
3. Configure the single page in `src/config/dashboard.config.ts`.
   - `screen.title` controls the centered top-bar title.
   - `page.layoutRows` controls the 8*N content grid.
   - `page.widgets` mounts widgets under matching grid block keys.
   - `filters` controls the right-side filter drawer.
   - `assets.logoSrc` controls the top-left logo.
   - `screen.defaultTheme` chooses whether the template opens in the dark or light layout.
4. Create business widgets by copying `src/widgets/templates/WidgetTemplate.vue` into `src/widgets/components/MyWidget.vue`.
   - Use ECharts inside chart widgets.
   - Use AntV S2 inside analytical table or pivot widgets.
5. Register the widget in three places:
   - Add `MyWidgetProps` and `WidgetPropsRegistry.MyWidget` in `src/widgets/types.ts`.
   - Import and register `MyWidget` in `src/widgets/registry.ts`.
   - Mount it under the matching page block key in `dashboard.config.ts` through `page.widgets`.
6. Keep business data out of `dashboard.config.ts`. Put static/mock rows in `src/data/dashboard.data.ts` or register API resolvers in `src/dataSources/registry.ts`, then reference them through `widget.data`.
7. Set `widget.visualType` for every widget so `validate:dashboard` can check its `layoutRows` span against the legal component span matrix.
8. Use `filterScope` on widgets and `scope` on filters when a filter should affect only part of the page.
9. Make filters affect data at the data-source layer:
   - For `staticData`, filter values automatically match row fields with the same name as the filter id.
   - If field names differ, configure `widget.data.filterFields`, for example `{ org: 'regionId', cycle: ['period', 'cycle'] }`.
   - If a widget must respond to a filter, configure `widget.data.requiredFilters` so field-mapping mistakes do not fail silently.
   - If fixed `params` should filter static rows, configure `widget.data.requiredParams` so param-field mistakes do not fail silently.
   - If a widget intentionally ignores a global filter, configure `widget.data.ignoredFilters` and make that scope difference visible in the component title or subtitle.
   - Use filter option id `all` or `__all` when a filter should mean "no filtering".
10. For interactions, make widgets emit `dashboard-action` events and configure `widgets[block].actions` in `dashboard.config.ts`. Keep modal, filter mutation, print, fullscreen action handling, and URL navigation in the framework layer.
11. Register dynamic filter option data sources in `src/dataSources/registry.ts`, then reference them through `filters[].source`. Dynamic options may include `disabled`, `reason`, `count`, `parentId`, `level`, `sortOrder`, `permissionScope`, and `meta`.
12. Configure modal drilldowns in `modals`. Modals use the same `layoutRows + widgets` model as the page. If filters change after a modal opens, the shell marks `context.isStale`; widgets must clear old selections or show a stale-state message.
13. Use `navigateUrl` for jumps. It appends active filters to URL query parameters by default; set `includeFilters: false` only for targets that must not receive filter context.
14. For large widgets such as DuPont analysis, relation graphs, or wide canvases, configure `viewport` in `dashboard.config.ts` instead of implementing pan/zoom inside the widget.
15. Keep widget-specific CSS inside each widget's `<style scoped>` block. Keep `src/styles.css` for the dashboard shell only.
16. Run `npm run validate:dashboard` before handoff. This blocks unbound widgets, missing filter contracts, invalid action configs, and unsafe radar chart options.
17. Run `npm run build` before handing off; build runs the same dashboard contract validation first.
18. Run the self-check report and repair loop. Check data completeness, filter configuration, interaction usability, configuration completeness, and visual/runtime behavior; fix issues and repeat up to 3 cycles before handoff.
19. If the workflow requires deployment, deploy the Vite `dist` directory through the configured static hosting target and return the deployed URL. If deployment is blocked, return the local preview URL and state the blocker.
20. For local handoff, detect an available port, start the dev or preview server automatically, verify the URL, and return it instead of asking the user to start the project.

## Self-Check And Repair Loop

- Produce a self-check report after implementation and after every repair cycle.
- Check data completeness: every first-screen widget has `data` or explicit `dataPolicy`, stable mock records, required fields, units, formulas, empty states, and reconciled KPI/chart/table/drawer totals.
- Check filter configuration: every filter has a stable id, default, option source, scope, visible active state, reset behavior, and exact mapping through same-name fields or `widget.data.filterFields`.
- Check interactions: `dashboard-action` events, modal targets, `navigateUrl`, filter mutation, fullscreen, refresh, download, stale-state handling, and close/back flows work with active filter context.
- Check configuration completeness: `dashboard.config.ts`, `layoutRows`, widget registry, widget props/types, `visualType`, `filterScope`, data-source registry, filter sources, modals, assets, logo, theme, and toolbar controls are complete.
- Check visual/runtime behavior: run `npm run validate:dashboard`, run `npm run build`, start or preview the page on an available port when useful, and verify no component overflows outside the block body or component-area background.
- Severity levels are `Blocker`, `Major`, and `Minor`. Repair all unresolved issues and re-run the report; stop early only when the latest report has no unresolved issues. Stop after 3 cycles and report any remaining issues clearly.

## Local Startup And Port Selection

- Preferred dev command: `npm run dev:auto -- --port <port>`.
- Preferred production preview command: `npm run preview:auto -- --port <port>`.
- Fallback commands: `npm run dev -- --host 0.0.0.0 --port <port>` and `npm run preview -- --host 0.0.0.0 --port <port>`.
- Choose the candidate port from the user request, current browser URL, `.env`, Vite config, or fallback `5173`.
- On interrupted or resumed work, verify the current browser URL first; reuse a reachable same-project server instead of starting another process.
- Check the port before launch with `lsof -nP -iTCP:<port> -sTCP:LISTEN`; if that is unavailable, use `nc -z 127.0.0.1 <port>`.
- If the candidate port is occupied by another process, increment until a free port is found. Do not stop unrelated processes.
- If an existing same-project server is already serving correctly, reuse it and return its URL.
- After launch, verify `http://127.0.0.1:<port>/` before handoff. If it fails, inspect the server output, switch ports when needed, and retry once.
- The final response must include the verified local URL or the deployed public URL.

## Layout Rules

- The design canvas is fixed at 1920x1080. If the browser viewport is smaller, native scrollbars should expose the full canvas.
- The top menu bar is fixed at the top of the canvas.
- The top-bar title is centered.
- Top-left position one is the Haier logo.
- Right-side controls include theme switch, refresh, filter, and download.
- Top-right position one is download.
- Top-right position two is filter.
- Refresh is also on the right side, immediately before the filter/download group.
- The theme switch toggles the built-in light and dark layouts and persists the choice in `sessionStorage`.
- The content area starts below the top menu bar and uses the 8*N rule: each `layoutRows` string is one row, each character is one column, adjacent equal characters merge into a rectangular block, and `.` or spaces create empty cells.
- The template ships without demo business components. Empty blocks are valid placeholders until registered widgets are added.
- Every content block is split into a title/header zone and a component body zone.
- Business widgets render only inside the body zone. Charts, tables, icons, empty states, and custom canvases must never overlap or cover the block title/header.
- ECharts and AntV S2 widgets must size themselves from the body zone, not from the full block frame.
- If a widget needs more vertical room after reserving the title/header zone, increase its row span, remove duplicate internal titles, or enable the shared `viewport` behavior for large diagrams.

## Widget Rules

- `WidgetRenderer.vue` and `WidgetViewport.vue` are framework pieces. Do not ask users to import them from business widgets.
- `WidgetRenderer` reads `dashboard.config.ts`, finds the component in `widgetRegistry`, injects `context`, and creates the full-size component viewport under the block body.
- The component viewport is the only area where business widgets may paint. It owns clipping, table scrolling, and chart/canvas bounds so widgets cannot overflow the component-area background.
- `WidgetViewport` handles drag, zoom, reset, and initial centering when `viewport` is enabled.
- Business widgets should receive data through typed props and `context`, fill their parent with `width: 100%; height: 100%`, and own their private styles locally.
- Business widgets should treat their parent as the component body viewport. Use `min-width: 0`, `min-height: 0`, and internal layout that keeps labels, legends, tables, and empty states inside that viewport.
- Widget `data` is resolved by the shell and passed as a `data` prop. `context.filters` contains only filters visible to that widget's `filterScope`; `context.allFilters` contains every filter.
- A widget without `data` must declare `dataPolicy: 'static' | 'external'`; otherwise `validate:dashboard` fails.
- Every widget must declare `visualType`: `line`, `bar`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `table`, or `other`.
- Business widgets should emit `dashboard-action` with `{ name, payload }` for cross-widget behavior. The shell executes configured actions.
- In modal widgets, read `context.isStale` to detect that active filters changed after the modal opened.

## References

Read `references/template-structure.md` when you need the file map, registration checklist, or more detailed configuration rules.
