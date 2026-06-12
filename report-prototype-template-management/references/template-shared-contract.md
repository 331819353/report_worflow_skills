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
- `scripts/update-code-ledger.mjs`: sidecar code change ledger helper for copied template projects.
- `scripts/start-available-port.mjs`: local port helper for `dev:auto` / `preview:auto`.

## Basic Create Loop

1. Copy `assets/templates/<template-id>/` to the target project.
2. Install only the dependencies needed by the current component set. Start with the base `package.json`; add `@antv/s2` and `@antv/s2-vue` only when the implementation contains pivot tables, cross tables, wide metric matrices, frozen-header analytical tables, or equivalent S2-class table needs.
3. Before editing any copied source file, run or manually follow the code ledger trigger: `npm run ledger:code -- --file <source-file> --stage before`. Read the sidecar ledger before changing the file.
4. Edit `src/config/dashboard.config.ts` incrementally from the copied template baseline. Keep the selected template's native nav/page shape, filter trigger/panel/popover pattern, toolbar placement, theme fields, and shell-owned state unless the user explicitly asks for a template-level redesign. Map requirement-document title/filter/navigation/toolbar intent into these existing config slots instead of recreating the requirement shell.
5. Put default/offline data in `src/data/dashboard.dataset.json`, or configure `data.id: 'apiData'` / `source.id: 'apiData'` with an `api` block in `dashboard.config.ts`. Register custom API/provider resolvers in `src/dataSources/registry.ts` for complex providers or filter-driven scenario data that cannot be represented by plain JSON rows. Do not add `src/widgets/*Data.ts`, `src/data/*.ts`, or other TS fixture modules for mock rows.
6. Add widgets through `components/`, `types.ts`, and `registry.ts`.
7. After each source-file edit, append the sidecar ledger entry: `npm run ledger:code -- --file <source-file> --stage after --summary "<change>" --ranges "L10-L42"`.
8. Run `npm run validate:dashboard`.
9. Run `npm run build`.
10. Start with `npm run dev:auto -- --port <port>` or `npm run preview:auto -- --port <port>` when a preview is needed.

## Edit Boundaries

Prefer config/data/widget layers:

- Requirements -> `dashboard.config.ts`.
- Shell navigation/filter changes -> existing `nav`/`page`, `filters`, `screen.controls`, and theme fields in `dashboard.config.ts`; patch or extend them instead of generating a separate nav/filter shell.
- First-level perspective changes -> existing `nav`/`page`, route, tabs, segment controls, or explicit perspective state in `dashboard.config.ts`; do not bury schema-changing domain/theme/management-object choices in `filters[]`.
- Requirement-document title/header/filter/navigation/toolbar sketches -> existing template title/logo, `nav`/`page`, `filters`, `screen.controls`, `actions`, and theme slots. Preserve business labels, defaults, options, and behaviors, but adapt the structure to the selected template.
- Static/mock data -> `dashboard.dataset.json`.
- Standard API endpoint/query binding -> `widget.data.api` or `filters[].source.api` in `dashboard.config.ts`.
- Response adapters and custom API/provider resolvers -> `dataSources/registry.ts`.
- Business visuals -> `src/widgets/components/*.vue`.
- KPI/metric card visuals -> `src/widgets/components/*.vue` with explicit title ownership. Use `widget.title` or `props.displayTitle` for the reader-facing block/card title, `props.metricName` for tooltip/export/口径/detail payloads, and `props.showBodyMetricLabel` only when a body label is truly needed. When a block-owned title exists, `showBodyMetricLabel` defaults to `false` if the body metric label is the same or near-same text as the block title. Do not render both `title` and `metric.label` visibly for a single-metric KPI card.
- Standard chart visuals -> ECharts component/wrapper inside `src/widgets/components/*.vue`, with data-driven `option`/`series`, lifecycle update, and resize. Do not draw standard chart marks, parallel-coordinate axes/lines, sunburst arcs, treemap rectangles, Combo bars/lines/axes, or relation graph nodes/edges by hand with SVG/HTML/CSS/canvas while merely importing ECharts. Combo visuals must use one shared `xAxis`, one or two declared `yAxis` definitions, ECharts `bar` plus `line`/`markLine`/reference series, legend, axisPointer, exact tooltip, paired business relationship, axis units, visible series limits, and category-density fallback. Gauge visuals must use ECharts `series.type: 'gauge'` and expose one bounded metric, min/max, current value, unit, target/threshold/status semantics, overflow behavior, center value, and exact tooltip evidence. Parallel-coordinate visuals must use `parallelAxis` plus `series.type: 'parallel'` and expose object/sample data, `3-12` ordered dimensions, per-axis unit/range/direction, line density, highlight/brush, and exact object tooltip evidence. Funnel visuals must be driven by ordered stage rows; use ECharts `series.type: 'funnel'` for traditional trapezoids or ECharts horizontal `bar` series for report-default bar funnels, and expose value/unit, entry share, stage conversion, drop value/rate, total conversion, target/comparison evidence, and denominator-zero states. Path chart visuals must be driven by step/link data and expose node/link tooltip evidence. Treemap visuals must be driven by hierarchy data, non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, breadcrumb/drilldown when deep, and exact path/value/share tooltip evidence. Sunburst visuals must be driven by hierarchy data, non-negative additive angle metric, visible depth/ring-width budget, Top N/`其他`, sector label thresholds, center content, color semantics, breadcrumb/drilldown when deep, and exact path/value/total-share/parent-share tooltip evidence. Tree chart visuals must be driven by root/parent-child data, visible-depth/expand-collapse state, Top N/`+N` child aggregation, and node tooltip evidence.
- Detail Table visuals -> Element Plus/project table inside `src/widgets/components/*.vue` for ordinary row-level details, with row grain, primary key, default sort, column metadata, visible-column priority, search/sort/pagination/export scope, row detail/action payload, local-filter behavior, fixed header/frozen columns when needed, and stable states. Use AntV S2 only for pivot/cross/wide-matrix/frozen analytical table behavior.
- Complex/grouped table-header visuals -> Element Plus/project grouped-column table for ordinary row-level tables, or AntV S2/project S2-equivalent for pivot/cross/wide analytical matrices. Declare `columnTree`, business group nodes, leaf field metadata, units/definitions, computed `colSpan`/`rowSpan`, max depth `<=3` by default, fixed multi-level header, frozen row/primary columns when horizontally scrolling, component-local filter vs leaf-column header-filter separation, sort/filter icon limits, tooltip definitions, density fallback, and stable states.
- Analysis & Insight visuals -> use `visualType: 'text-summary'` when the component is a conclusion card, insight card, anomaly/risk explanation, attribution/recommendation card, definition/data-quality/forecast note, chart annotation, explanatory empty state, permission/no-result/delay note, or task note. Declare `analysisInsightContract` or equivalent props with subtype/family, conclusion, evidence, affected object, comparison/change value when relevant, action/detail route, confidence/definition/source/freshness, local filters, tooltip payload, and state rules. Do not satisfy this with generic static copy.
- Composite Panel visuals -> one business widget in `src/widgets/components/*.vue` with an internal layout, not multiple unrelated top-level template cells. Declare `compositePanelContract`, shared topic, analysis sequence, layout pattern, primary child id, child roles/priorities/min sizes, default `2-3` children and normal max `4`, primary visual weight `50-70%`, `contentH >= CH * 0.60`, panel-level local filters, child-only filter exceptions, shared legend/unit behavior, linked hover/click state, detail-preview limit, responsive fallback, and parent/child states.
- Pivot Table visuals -> AntV S2 or project S2-equivalent inside `src/widgets/components/*.vue` with visualType `pivot`, row dimensions, column dimensions, measures, aggregation formulas/functions, rate numerator/denominator rules, subtotal/grand-total rules, hierarchy depth, natural time sorting, frozen row/column headers, density fallback, conditional-formatting limits, tooltip/drilldown payload, and stable states. Add `@antv/s2`/`@antv/s2-vue` only when the pivot component is implemented.
- Chart row sorting and series helpers -> `src/widgets/chartDataUtils.ts` or a similarly named utility file, never a data-bearing `*Data.ts` module.
- Component-owned popup/jump/drilldown -> component implementation.
- Shell-level event observation or external integration hooks -> `src/actions/registry.ts`.
- Code change ledgers -> same-directory sidecars under `__change_logs__/<code-file-name>.changes.md`. Read before each scoped source edit and append after each scoped source edit. Do not store file-level change history only in chat, commit messages, PR descriptions, or broad delivery indexes.

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
- Do not satisfy a chart widget requirement by importing ECharts but rendering the chart as hand-authored `<svg>`, `<path>`, `<rect>`, positioned `<div>`, CSS gradient, or raw canvas marks. Use ECharts option/series for standard charts, including Combo through shared `xAxis` plus `bar` and `line`/`markLine` series, Gauge through ECharts `series.type: 'gauge'`, parallel coordinates through ECharts `parallelAxis` plus `series.type: 'parallel'`, funnel through ECharts `series.type: 'funnel'` or a data-driven horizontal `bar` funnel, Sankey through ECharts `series.type: 'sankey'` with node/link `source`/`target`/`value`, treemap through ECharts `series.type: 'treemap'`, sunburst through ECharts `series.type: 'sunburst'`, and relation/network graphs through ECharts `graph`; path/user/process path charts may use ECharts sankey/graph/custom series or an explicitly declared data-driven custom diagram. Reserve handmade SVG/canvas for logos, icons, decorations, or approved custom diagrams.
- Do not satisfy a Detail Table widget by rendering all source fields in one flat table without row grain, primary key, prioritized columns, default sort, row detail/action, pagination/search/export scope, and overflow behavior. Do not install S2 for simple row tables.
- Do not satisfy a complex/grouped table-header requirement with absolute-positioned labels over a flat table, strong decorative header bands, or every-column icons. Grouped headers must be driven by the same column tree that drives leaf fields, widths, fixed columns, sort/filter behavior, tooltip definitions, and states.
- Do not satisfy an Analysis & Insight requirement with generic "智能洞察", "建议关注", "有所变化", or static marketing-like copy. Decision-support text needs `analysisInsightContract`, conclusion-before-evidence, affected object/evidence, action/trust/source/freshness where relevant, tooltip/detail path, and loading/insufficient/empty/error/no-permission/data-delay states.
- Do not satisfy a Composite Panel requirement by scattering unrelated widgets across `layoutRows`, nesting decorative cards, or giving every child equal visual weight. A Composite Panel needs one widget-local contract, one shared topic, one primary child, shared filter/legend/unit context, linked interaction, and parent/child state handling.
- Do not satisfy a Pivot Table widget with a decorative static matrix, a raw record list, or a hand-rolled merged-header table when row/column hierarchy, scrolling, totals, virtualization, or interaction is required. Do not expose Excel-like field wells in report display mode unless the task is an editor.
- Dark template pages must load Element Plus dark CSS variables and toggle the Element Plus `.dark` class with the template theme, or provide equivalent `--el-*` token overrides. Changing only `screen.defaultTheme` is not enough: update logo variant, `screen.grid.innerBackgroundColor`, card surfaces, and component scoped input/control backgrounds to the same theme tokens.

Layout design rules:

- Use `template-layout-design-system.md` for shared page layout, block spacing, block inner padding, radius, component-owned title/control handoff, hover/focus, and template-token decisions.
- Change layout tokens through `dashboard.config.ts` first: `contentGap`, `contentStartY`, `contentEndY`, `rowHeight`, `cellPadding`, `dominantTitleColor`, and `innerBackgroundColor`.
- Keep the common block anatomy: `placeholder-cell` -> `placeholder-cell-inner` -> body viewport -> `widget-renderer`.
- For composite parent blocks, keep the same outer anatomy and define internal sub-blocks inside `widget-renderer`; use `padding: 5px` for parent-to-sub-block inset and `gap: 5px` between sub-blocks. Do not create additional `layoutRows` cells or nested card shells for sub-blocks.
- Do not solve business-widget density by rewriting template shell padding or card radius. Route component title/control/body fit to `$report-component-style-design`.

Filter binding rules:

- Template filter UI is shell-owned only for global/page filters. Add, remove, relabel, source, and scope global/page filters through `filters[]`; bind component-local controls through `localFilters[]` and render those controls inside the component.
- Template `filters[]` is only for horizontal constraints that preserve the same component schema, metric set, table headers, and metric口径 while narrowing row scope.
- Business domain, report theme, management object, subject area, or first-level perspective belongs in `nav[]`, page route, tab/view segment, or explicit perspective state when it changes metric names, component collection, table headers, dimensions,口径, or domain vocabulary.
- Controls with schema impact must declare `controlSemantics: perspective-switch` and `componentSchemaImpact` in the binding matrix and implementation handoff.
- `filterData` option `meta` is for static dimensional attributes only: aliases, sort order, permission, description, icon, stable category, disabled reason, or UI hints.
- Do not store dynamic KPI values, percentages, rankings, status lights, satisfaction scores, completion rates, or risk scores in `filterData.meta`. Perspective-navigation indicators must come from `businessData`, aggregate datasets, API/provider fields, or custom resolvers with lineage.
- Component-owned title/control areas use a clear title and compact function area when needed. Use that component area for `localFilters[]`, filter-panel triggers, and lightweight links such as `查看详情` / `查看明细`; the template shell must not add its own title band for these controls.
- For metric widgets, separate visible title and metric identity: `displayTitle` is for the card/block title, `metricName` is for tooltip/export/口径/detail, and `showBodyMetricLabel?: boolean` controls whether the body repeats a metric label. Default `showBodyMetricLabel` to `false` when a block-owned title exists and the body label is identical or highly similar after normalization.
- `localFilters[]` display rules inside the component: one component-local filter with `2-4` short values and fit proof uses sliding capsule/segmented pill; one local filter with `>4` values, long labels, or failed width fit uses compact dropdown/select; multiple local filter groups use a filter panel/popover/drawer trigger with active count or summary.
- `localFilters[]` affect only the current widget's already loaded data. They must not replace template `filters[]`, page/global scope, permission scope, backend aggregation, pagination, export scope, or other widgets.
- Empty/no-filter values are configurable data-source semantics, not business row keys. Use `source.emptyFilterValues` or `api.emptyFilterValues` when a template, API, or legacy config needs a value such as `__all`, `''`, or a legacy `all` to mean "omit this constraint". Do not rely on a hardcoded universal `all`.
- Aggregate, subtotal, total, and rollup rows need a distinct `aggregateValue`, `rowRole`, typed id, or adapter-normalized key. They should not use `all` as a business primary key because that collides with no-filter semantics and export/drilldown identity.
- If an upstream API forces `all`, isolate the meaning in one adapter or data-source config and document whether it is `emptyFilterValue` or `aggregateValue`; never let the same raw value mean both in one binding matrix.
- If a global/page filter should affect a widget, configure `widget.data.filterFields`, `requiredFilters`, API query/body mapping, or a custom resolver param.
- Use `widget.data.ignoredFilters` only for widgets that are intentionally invariant under that filter. Record each scope reason in `widget.data.ignoredFilterReasons`; do not use it because mock rows lack the filter field or because the resolver is missing.
- Offline/mock rows or custom resolvers must produce different affected widget data for meaningful non-default filter states such as view, snapshot date, month, organization, industry, or scenario.
- After binding filters, test at least one non-default option and verify a visible KPI/chart/table/list value changes, not only the filter selected state.
- After binding synthetic all/total options, test the no-filter state and aggregate-row state separately. Query omission, server aggregation, row filtering, export keys, and drilldown payloads must preserve their declared semantics.

Interaction feedback rules:

- Template-level hover/focus styles for cards, blocks, toolbar buttons, nav items, filter options, and local chips should preserve geometry.
- Prefer border-color changes, inset glow, in-bounds pseudo-elements, or stable background changes.
- Do not use hover `translate`, `scale`, or outside-only shadows in fixed `8 * N` blocks, overflow-hidden cells, or compact shell controls unless screenshots prove the effect is not clipped.

Template assets intentionally exclude `node_modules` and `dist`.

Dependency rule: if install stalls for more than 120 seconds, stop the install, remove unused heavy packages from the generated project and lockfile, then retry with the minimal dependency set needed for the current prototype.

Temporary npm registry fallback: when domestic network access blocks npm install or adding a one-off package, prefer a command-level mirror instead of changing global config:

```bash
npm install --registry=https://registry.npmmirror.com
npm install <package-name> --registry=https://registry.npmmirror.com
```

If the first mirror is unavailable, replace the registry URL with one of these alternatives:

```text
https://npm.aliyun.com/
https://mirrors.cloud.tencent.com/npm/
https://mirrors.ustc.edu.cn/npm/
https://mirrors.tuna.tsinghua.edu.cn/npm/
```

Use `npm ci --registry=<registry-url>` only when a trusted lockfile should be restored exactly. Do not commit `.npmrc` or persistent registry changes unless the user explicitly asks for a project-level mirror.
