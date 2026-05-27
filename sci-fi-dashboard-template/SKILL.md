---
name: sci-fi-dashboard-template
description: Use this skill when creating, copying, adapting, or auto-starting a TypeScript + Vue 3 + Vite + ECharts + AntV S2 fixed 1920x1080 sci-fi dashboard/cockpit template for command centers, monitoring walls, exhibition screens, leadership cockpit presentations, and high-visual-impact big-screen demos. It covers multi-page cockpit navigation, dashboard.config.ts layout configuration, independent data files, widget data-source binding, scoped filters, configurable actions, modal drilldowns, pan/zoom widget viewport setup, and automatic free-port local preview. Do not use it for ordinary enterprise workbenches or lightweight single-page top-bar reports.
---

# Sci-Fi Dashboard Template

Use this skill to produce a clean, reusable sci-fi big-screen dashboard template. The bundled asset is a TypeScript + Vue 3 + Vite project designed around a fixed 1920x1080 canvas, multi-page navigation, independent data files, data-source-backed widgets and filters, scoped filters, configurable actions, modal drilldowns, and WidgetTemplate-driven custom content.

## When To Use

Choose this template when:

- The target is a large display, monitoring wall, command center, exhibition booth, leadership cockpit, or presentation screen.
- The user asks for 大屏, 驾驶舱, 指挥中心, 科技风, 监控屏, 展示屏, or 1920x1080 fixed cockpit.
- The page is meant to be viewed full-screen from a distance, with strong dark visual framing and high-impact status signals.
- Real-time or near-real-time monitoring is more important than dense daily office operation.
- Interaction should be relatively shallow: switch page, filter, inspect drawer/modal, fullscreen, or jump to handling/detail pages.

Do not choose this template when:

- The page is a normal enterprise analytics workbench with dense tables, forms, or repeated office use; use `left-nav-analytics-dashboard-template`.
- The user asks for a compact focused single report with top menu only; use `single-page-dashboard-template`.
- The user asks for one report but the content is long, chaptered, or table-heavy for office use; use `left-nav-analytics-dashboard-template`.
- The main goal is maximum readability for long text, wide tables, or frequent editing rather than large-screen scanning.

## Technical Architecture

Use this stack for report prototypes built from this template:

- TypeScript + Vue 3 single-file components with Composition API.
- Vite for development, build, and preview.
- ECharts for standard charts: KPI trends, bars, lines, heatmaps, scatter, maps, waterfalls, funnels, gauges, and mixed cockpit visuals.
- AntV S2 through `@antv/s2` and `@antv/s2-vue` for analytical tables, pivot tables, cross tables, frozen headers, dense comparison grids, and wide metric matrices.
- Keep business data in `src/data/` or data-source resolvers. Keep visual widgets typed and scoped.
- Use template-level dashboard actions for drilldown, modal, filter mutation, fullscreen, print, URL navigation, and cross-widget behavior.

## Quick Workflow

1. Copy `assets/dashboard-template/` into the target project, or merge its `src/`, `public/`, and config files into an existing Vue 3 + TypeScript + Vite app.
2. Run `npm install` if dependencies are not present.
3. Configure pages in `src/config/dashboard.config.ts`.
   - `nav` controls page count and navigation labels.
   - `layoutRows` controls the block layout for each page.
   - `filters` controls the right-side filter drawer.
   - `assets` controls logo, title background, and tiled page background.
4. Create business widgets by copying `src/widgets/templates/WidgetTemplate.vue` into `src/widgets/components/MyWidget.vue`.
   - Use ECharts inside chart widgets.
   - Use AntV S2 inside analytical table or pivot widgets.
5. Register the widget in three places:
   - Add `MyWidgetProps` and `WidgetPropsRegistry.MyWidget` in `src/widgets/types.ts`.
   - Import and register `MyWidget` in `src/widgets/registry.ts`.
   - Mount it under the matching page block key in `dashboard.config.ts` through `nav[].widgets`.
6. Keep business data out of `dashboard.config.ts`. Put static/mock rows in `src/data/dashboard.data.ts` or register API resolvers in `src/dataSources/registry.ts`, then reference them through `widget.data`.
7. Set `widget.visualType` for every widget so `validate:dashboard` can check its `layoutRows` span against the legal component span matrix.
8. Use `filterScope` on widgets and `scope` on filters when a filter should affect only part of the dashboard.
9. Make filters affect data at the data-source layer:
   - For `staticData`, filter values automatically match row fields with the same name as the filter id.
   - If field names differ, configure `widget.data.filterFields`, for example `{ org: 'regionId', cycle: ['period', 'cycle'] }`.
   - If a widget must respond to a filter, configure `widget.data.requiredFilters` so field-mapping mistakes do not fail silently.
   - If fixed `params` should filter static rows, configure `widget.data.requiredParams` so param-field mistakes do not fail silently.
   - If a widget intentionally ignores a global filter, configure `widget.data.ignoredFilters` and make that scope difference visible in the component title or subtitle.
   - Use filter option id `all` or `__all` when a filter should mean "no filtering".
10. For interactions, make widgets emit `dashboard-action` events and configure `widgets[block].actions` in `dashboard.config.ts`. Keep navigation, drilldown, modal, filter mutation, print, fullscreen, and URL navigation in the framework layer.
11. Register dynamic filter option data sources in `src/dataSources/registry.ts`, then reference them through `filters[].source`. Dynamic options may include `disabled`, `reason`, `count`, `parentId`, `level`, `sortOrder`, `permissionScope`, and `meta`.
12. Configure modal drilldowns in `modals`. Modals use the same `layoutRows + widgets` model as pages. If filters change after a modal opens, the shell marks `context.isStale`; widgets must clear old selections or show a stale-state message.
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
- Check interactions: `dashboard-action` events, modal targets, `navigateUrl`, filter mutation, page navigation, fullscreen, refresh, download, stale-state handling, and close/back flows work with active filter context.
- Check configuration completeness: `dashboard.config.ts`, `layoutRows`, `nav`, widget registry, widget props/types, `visualType`, `filterScope`, data-source registry, filter sources, modals, assets, logo, theme, cockpit background assets, and toolbar controls are complete.
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
- The title area is fixed and floats above the tiled background.
- Each `layoutRows` string is one grid row. Each character is one grid cell. Adjacent equal characters merge into one block; `.` and spaces create empty cells.
- The template should ship without demo business components. Empty blocks are valid placeholders until registered widgets are added.

## Widget Rules

- `WidgetRenderer.vue` and `WidgetViewport.vue` are framework pieces. Do not ask users to import them from business widgets.
- `WidgetRenderer` reads `dashboard.config.ts`, finds the component in `widgetRegistry`, injects `context`, and creates the full-size component viewport under the block body.
- The component viewport is the only area where business widgets may paint. It owns clipping, table scrolling, and chart/canvas bounds so widgets cannot overflow the component-area background.
- `WidgetViewport` handles drag, zoom, reset, and initial centering when `viewport` is enabled.
- Business widgets should receive data through typed props and `context`, fill their parent with `width: 100%; height: 100%`, and own their private styles locally.
- Widget `data` is resolved by the shell and passed as a `data` prop. `context.filters` contains only filters visible to that widget's `filterScope`; `context.allFilters` contains every filter.
- A widget without `data` must declare `dataPolicy: 'static' | 'external'`; otherwise `validate:dashboard` fails.
- Every widget must declare `visualType`: `line`, `bar`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `table`, or `other`.
- Business widgets should emit `dashboard-action` with `{ name, payload }` for cross-widget behavior. The shell executes configured actions.
- In modal widgets, read `context.isStale` to detect that active filters changed after the modal opened.

## References

Read `references/template-structure.md` when you need the file map, registration checklist, or more detailed configuration rules.
