---
name: report-prototype-template-management
description: "用于管理可运行报表原型模板资产，选择、复制、二开和校验 Vue/Vite 报表模板。报表原型默认走内置模板，只有用户明确自定义/精确复刻/保留现有壳或模板无法满足时才走 custom。用户提到报表模板、页面模板、模板布局token、分块内外间距、圆角、标题带/标题位置、模板筛选、筛选工具栏、独立筛选栏、选择模板、复制模板、模板二开、topbar、left nav、暗色/亮色模板、固定1920大屏、Haier logo、hover/focus模板动效、dashboard.config.ts、dashboard.dataset.json、validate-dashboard-contract、启动预览URL时触发；不负责业务报表类型判断或组件视觉细节。"
---

# Report Prototype Template Management

## Positioning

Use this skill when the task needs a runnable report prototype template or must modify an existing bundled template. It owns template asset selection, copy strategy, extension points, validation scripts, local startup helpers, and template-specific implementation boundaries.

It does not own report-type business logic, component-level styling, API documentation, or production frontend integration.

Default routing:

- Default to `pageShellPath: template` for runnable report prototypes.
- Choose `pageShellPath: custom` only when the user explicitly asks for custom/free design, explicitly asks for exact screenshot/HTML/source restoration, an existing shell must be preserved, or a documented requirement cannot be met by any bundled template.
- If the user provides only a loose sample/reference, use it as hierarchy/density/tone evidence and still choose the closest bundled template.
- If the upstream prototype workflow supplies `displayTheme` and selected pattern cards, use them as scenario evidence for template routing, but do not choose a template from display theme alone. Content volume, navigation depth, interaction density, and display environment still decide.
- If the upstream workflow supplies a report decision anti-AI result, carry `reportDecisionRisk`, `RPT-*` gaps, metric tree, data story, realistic data needs, linkage/action/trust details, and report-designer requirements into template routing. If it is missing for a report surface, record a routing gap instead of assuming a generic dashboard template is sufficient.
- Bundled templates use Vue 3 + TypeScript + Vite + Element Plus + ECharts + axios, with AntV S2 added for S2-class analytical tables.
- In bundled templates, standard chart widgets must use ECharts through an actual chart component/wrapper and data-driven `option`/`series`. Do not implement standard charts by importing ECharts but drawing the bars, lines, pies, gauges, maps, sunburst arcs, treemap rectangles, Sankey ribbons, tree nodes/connectors, relation graph nodes/edges, axes, or legends with hand-authored SVG/HTML/CSS/canvas. Gauge widgets must use ECharts `series.type: 'gauge'` and carry one bounded metric, min/max, current value, unit, target/threshold/status semantics, overflow behavior, center value, and exact tooltip evidence, not fixed decorative arcs or needles. Path/user/process path widgets must be driven by declared step/link data, not fixed decorative journey lines. Sankey widgets must be driven by node/link data with `source`/`target`/`value`, layer/stage order, metric unit, Top N/`其他`, flow-width mapping, hover path highlight, and exact node/link tooltip evidence, not fixed decorative ribbons. Treemap/rectangular tree map widgets must be driven by hierarchy data, a non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, breadcrumb/drilldown when deep, and exact path/value/share tooltip evidence, not fixed decorative rectangle mosaics. Sunburst widgets must be driven by hierarchy data, a non-negative additive angle metric, visible depth/ring-width budget, Top N/`其他`, sector label thresholds, center content, color semantics, breadcrumb/drilldown when deep, and exact path/value/total-share/parent-share tooltip evidence, not decorative multi-ring pies. Tree/hierarchical tree widgets must be driven by root/parent-child data, visible-depth/expand-collapse state, and Top N/`+N` aggregation, not fixed decorative org-chart boxes.
- If a selected template has `nav[]`, every nav item must map to a substantial business page. Do not ship a navigation template with only the homepage populated.
- Requirement-document shell details must be adapted into the selected template's existing title/logo, `nav`/`page`, `filters`, controls, toolbar, and action slots. Do not add duplicate shell structures that fight the template.
- When a selected template already owns filter invocation, filter design means editing `filters[]`, `filters[].source/options`, active-state display, and widget/API/resolver bindings. Do not create a standalone filter toolbar, persistent filter bar, or extra filter drawer unless the user explicitly asks for a template-level redesign.
- Template `filters[]` is reserved for horizontal constraints that keep the same component schema. Business domain, report theme, management object, subject area, or first-level analysis perspective must use nav/page/route/tab/segment/perspective state when it changes metric names, component set, table headers, metric口径, or domain vocabulary.
- Dynamic perspective-navigation metrics such as percentages, rankings, status lights, satisfaction scores, completion rates, and risk scores must not be stored in `filterData.meta`; use `businessData`, aggregate datasets, API/provider fields, or custom resolvers with declared lineage.
- Detail Table widgets must declare row grain, primary key/object field, default sort, column metadata, visible column priority, search/sort/pagination/export scope, row detail/action payload, local-filter behavior, and states. Use Element Plus/project table for ordinary row-level details; add AntV S2 only for pivot/cross/wide-matrix/frozen analytical table needs.
- Pivot Table widgets must use visualType `pivot`, declare row dimensions, column dimensions, measures, aggregation formulas/functions, rate numerator/denominator rules, subtotal/grand-total rules, hierarchy depth, sort behavior, density fallback, tooltip/drilldown payload, local metric/display controls, and states. Add AntV S2 only when such S2-class analytical behavior is actually implemented; do not use a hand-rolled merged HTML table for a real pivot.
- Complex/grouped table-header widgets must declare a grouped-column contract when visible columns exceed `8` or fields naturally group. Use Element Plus/project grouped columns for ordinary row tables and S2/project analytical headers for pivot/cross/wide matrices. The widget must preserve `columnTree`, leaf field metadata, units/definitions, computed `colSpan`/`rowSpan`, max depth `<=3` by default, fixed multi-level header, frozen row/primary columns during horizontal scroll, component-local filter vs per-column header-filter separation, tooltip definitions, density fallback, and stable states. Do not fake merged headers with absolute positioned labels or decorative color bands detached from data fields.
- Analysis & Insight widgets may use `visualType: 'text-summary'`, but when they are conclusion cards, insight cards, anomaly/risk explanations, attribution/recommendation cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, permission/no-result/delay notes, or task notes, they must declare `analysisInsightContract` or equivalent props with subtype, conclusion, evidence, affected object, action/detail path, confidence/definition/source/freshness, local-filter scope, tooltip payload, and states. Do not ship generic "智能洞察" copy without evidence/action/trust context.
- Composite Panel widgets must be implemented as one business widget with an internal layout contract, not as unrelated top-level `layoutRows` cells. Declare `compositePanelContract`, shared topic, analysis sequence, primary child id, child roles/priorities/min sizes, default `2-3` children and normal max `4`, primary visual weight `50-70%`, `contentH >= CH * 0.60`, panel-level local filters, child-only filter exceptions, shared legend/unit behavior, linked hover/click state, detail-preview limit, responsive fallback, and parent/child loading/empty/error/no-permission states. Do not create nested card shells or equal-weight mini dashboard collages inside a widget.

## Bundled Assets

Template assets live under `assets/templates/<template-id>/`:

- `topbar-dark-scroll-dashboard-template`: dark topbar, scrollable `8 * N` grid.
- `topbar-light-scroll-dashboard-template`: light topbar, scrollable `8 * N` grid.
- `left-nav-analytics-workbench-template`: multi-page left-nav analytics workbench.
- `frozen-title-sci-fi-cockpit-template`: fixed 1920 * 1080 cockpit screen.

Brand assets live under `assets/brand/`:

- `haier-logo.svg`
- `haier-logo-white.svg`
- `haier-logo-original.svg`

All template directories must be copied with their full project structure: `package.json`, lockfile, Vite/TS config, `index.html`, `.vscode`, `demo`, `scripts`, `public`, and `src`.

## Reference Loading

- Choose a template: `references/template-routing.md`
- Copy/edit extension points: `references/template-shared-contract.md`
- Shared layout, spacing, radius, block title, and template design tokens: `references/template-layout-design-system.md`
- Topbar template details: `references/template-single-page.md`
- Left-nav template details: `references/template-left-nav.md`
- Fixed cockpit template details: `references/template-sci-fi.md`
- Template use modes: `references/template-usage-modes.md`
- Template redevelopment: `references/template-redevelopment-playbook.md`
- Recipe and verification checklist: `references/template-recipes-checklist.md`
- Report decision anti-AI gate when a template must carry metric tree, data story, realistic data states, drilldown/action/trust details, or report-designer behavior: `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md`
- Code file change ledger for every copied/edited prototype source file: `$delivery-version-management` `references/code-file-change-ledger.md`

## Workflow

1. Decide whether the task needs a bundled template, an existing project shell, or custom development; default to bundled template unless a hard custom/restoration/existing-shell/template-limitation reason exists.
2. Select exactly one template when bundled assets are appropriate, using `displayTheme`, selected pattern cards, content volume, navigation depth, interaction density, and display environment together.
3. Verify report decision compatibility before copying: the selected template must be able to express the metric tree/data story path, detail/action/trust areas, realistic data states, and report-designer behavior when applicable. If not, choose a better template, document a template limitation, or route to custom only when the limitation is real.
4. For templates with `nav[]`, define the nav-page content plan before copying or editing: each nav item needs its own question, widgets, dataset scope, filters/interactions, and enough page density.
5. Copy the full template directory into the target project or merge it into an existing Vue 3 + Vite app.
6. Keep shell-owned behavior in `src/config/dashboard.config.ts`, `src/data/dashboard.dataset.json`, `src/dataSources/registry.ts`, `src/actions/registry.ts`, and template shell components. Place first-level perspective state in nav/page/route/tab/segment/perspective config, not in `filters[]`, when it changes schema or domain meaning.
7. Add business widgets through `src/widgets/components/`, `src/widgets/types.ts`, and `src/widgets/registry.ts`.
8. Before editing any copied template source file, read or create its sidecar code ledger using `$delivery-version-management` `references/code-file-change-ledger.md`; copied bundled templates include `npm run ledger:code` for this trigger.
9. For every standard chart widget, implement ECharts fidelity: ECharts instance/wrapper, data-driven `option`/`series`, update/resize lifecycle, and relevant tooltip/legend/emphasis behavior. Use hand-authored SVG/canvas only for explicit custom diagrams, icons, logos, or decorations.
10. Keep mock/offline rows in `src/data/dashboard.dataset.json`; use `src/dataSources/registry.ts` custom resolvers only when filter-driven scenarios or provider behavior cannot be represented by plain rows. Do not create TS fixture modules for data rows.
11. Before configuring filter bindings, verify the data is complete enough for filtering: filter option rows, business rows, required fields, default/non-default values, empty/no-permission states when relevant, and resolver/API branches exist for every affecting primary/global filter.
12. For every primary/global filter that should affect a widget, bind it with `filterFields`, `requiredFilters`, API query/body params, or a resolver param. Use `ignoredFilters` only for intentionally invariant widgets and pair every ignored filter with `ignoredFilterReasons`; never use it to cover missing data grain.
13. After every copied template source-code edit, append the sidecar ledger version entry with changed feature, code ranges, affected widget/data/filter/API contracts, verification, and rollback notes.
14. When changing layout spacing, block padding, radius, title band, right function area, row height, hover/focus surfaces, or no-data mask scope in composite blocks, follow `references/template-layout-design-system.md` and record deviations as template-level design decisions.
15. Install dependencies with the minimal package set needed by the current template. If npm install is blocked by domestic network access, use a temporary command-level mirror: `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Use `npm ci --registry=<registry-url>` only when restoring an existing lockfile exactly.
16. Run `npm run validate:dashboard`, build, and use `npm run dev:auto` or `npm run preview:auto` when a local URL is required.

## Required Output

- Selected template ID and reason.
- Display theme and selected pattern-card compatibility notes when supplied by the upstream prototype workflow.
- Report decision compatibility when applicable: `reportDecisionRisk`, `RPT-*` gaps that affect template selection, metric tree/data story fit, detail/action/trust capacity, realistic data-state support, and report-designer capability support.
- Nav-page content plan when the selected template has `nav[]`.
- Shell compatibility decisions for title, filters, navigation, toolbar, and controls.
- Asset copy/merge path.
- Files or extension points to edit.
- Brand/logo asset decision.
- Data binding mode: JSON, API, custom resolver, or retained offline mode.
- Data completeness proof before filter binding: option rows, business rows/API response, required fields, default/non-default states, and resolver/API branch coverage.
- Filter-to-widget binding decision: `filterFields`, `requiredFilters`, API params, resolver params, or intentionally labeled `ignoredFilters` with `ignoredFilterReasons`.
- Navigation metric lineage when perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
- Chart engine fidelity decision for standard chart widgets: ECharts instance/wrapper, data-driven option/series, update/resize path, and any explicit non-ECharts custom diagram exceptions.
- Filter surface mapping when filters exist: template-native trigger/panel/popover/drawer, local title-band filter, or explicit template-redesign exception. Do not output a separate filter toolbar for bundled templates.
- Perspective-layer mapping when business domain, report theme, management object, subject area, or first-level view switching exists; do not describe it only as a template filter unless it is row-scope-only.
- Template layout-token decisions when changed: `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, title band, content range, and hover/focus feedback.
- Block title function-area decision when used: component-local filter capsule/dropdown/panel trigger, detail link, more menu, or no right-side control.
- Composite block no-data mask decision when used: all sub-blocks empty -> parent-block mask; partial empty -> affected sub-block mask covering sub-block title/control plus component.
- Dependency install command and temporary registry fallback used, if any.
- Code file ledger proof for changed prototype source files: code file path, sidecar ledger path, pre-change read/create status, appended version, changed code ranges/stable anchors, affected widget/data/filter/API contracts, and verification.
- Validation and startup commands.
- Any template limitation or custom-development gap.

## Quality Gate

- The selected template matches display scenario, navigation depth, density, and fixed/scroll behavior.
- Copied/edited prototype source files pass the file-level ledger rule: every changed `.vue`, `.ts`, `.js`, `.mjs`, `.css`, `.json` config/data-source behavior file, validation script, or action/data registry code file has a sidecar ledger that was read before editing and appended after editing. Generic final summaries, commit messages, or delivery indexes do not replace the sidecar ledger.
- The selected template is not justified by display theme alone; it also matches content volume, navigation depth, interaction density, and display environment.
- The selected template is not justified by dashboard appearance alone. It must support the report decision path, including metric tree, data story, detail/action/trust areas, realistic data states, and report-designer behavior when applicable.
- Do not choose a template that forces unresolved `RPT-TEMPLATE-LAYOUT`, `RPT-NO-DATA-STORY`, `RPT-STATIC-FILTERS`, `RPT-NO-ACTION`, or `RPT-DESIGNER-SHELL` findings unless the limitation is recorded and the delivery readiness is `partial` or `blocked`.
- Templates with `nav[]` are used only when multiple substantial nav pages are implemented; if only one page can be populated, do not choose or retain a nav template.
- Requirement-document title/filter/navigation/toolbar ideas are mapped into existing template slots instead of implemented as duplicate shell layers.
- If template filters are present or needed, they are configured through the template's native `filters[]` and existing invocation surface; standalone filter toolbars/bars are rejected unless a named template-redesign decision exists.
- Template `filters[]` contains horizontal constraints only. Schema-changing domain/theme/management-object/perspective controls are rejected as ordinary filters unless `componentSchemaImpact: row-scope-only` is explicitly proven.
- `filterData.meta` contains only static dimensional attributes. Dynamic navigation KPIs in `filterData.meta` are rejected unless explicitly marked as static display copy and excluded from KPI/consistency checks.
- Template project structure remains complete after copying.
- Native shell navigation, filters, toolbar, theme, and logo slots are preserved unless explicitly redesigned.
- Block-owned title/function bands preserve the template anatomy: left-aligned title and right function area. Single component-local filter with `2-4` short values and fit proof uses capsule; single local filter with `>4` values, long labels, or failed width fit uses dropdown; multiple local filter groups use panel trigger; detail actions use lightweight links.
- `localFilters[]` affect only the current component's already loaded data. They must not replace template `filters[]`, page/global query scope, permission scope, backend aggregation, pagination, export scope, or other widgets.
- Analysis & Insight widgets pass contract validation: subtype/family, conclusion-before-evidence, evidence or insufficiency state, affected object when relevant, action/trust/source/freshness when relevant, local-filter scope, tooltip/detail path, and loading/empty/error/no-permission/data-delay states. Generic explanation copy without this contract fails.
- Shared template layout tokens from `template-layout-design-system.md` are reused instead of rediscovered from source code or changed ad hoc.
- Template shell hover/focus feedback for cards, toolbar buttons, nav items, and filter chips preserves geometry. Prefer in-bounds border glow or inset glow; do not use hover translate/scale that can clip borders/shadows in fixed grid or overflow-hidden containers.
- Data completeness is checked before filter binding; missing option rows, missing business rows, missing fields, single-snapshot mock data, or missing resolver/API branches are data gaps and cannot be hidden with `ignoredFilters`.
- Composite block no-data masks pass hierarchy checks: parent mask only when all child sub-blocks are empty; otherwise child masks cover affected child title/control plus component body.
- Validation scripts and start helpers remain available.
- Template asset paths in workflow or layout skills point to this skill, not to layout skill assets.
- Primary/global filters that should change business data are not placed in `ignoredFilters`; mock/API/resolver data proves at least one affected widget value changes for non-default filter states.
- Standard chart widgets are not accepted when they only import ECharts but draw chart marks with hand-authored SVG/HTML/CSS/canvas. ECharts SVG renderer is allowed only when generated by ECharts options; Combo charts require a shared x-axis, ECharts `bar` plus `line`/`markLine` series, paired business relationship, bar/line metric units, left/right axis mapping, visible series limits, category-density fallback, and exact tooltip evidence; Gauge charts require ECharts `series.type: 'gauge'`, one bounded metric, min/max, current value, unit, target/threshold/status semantics, center value, overflow behavior, and exact tooltip evidence; parallel-coordinate charts require `parallelAxis`, `series.type: 'parallel'`, object/sample data, ordered dimensions, per-axis unit/range/direction, line density, highlight/brush, and exact object tooltip evidence; funnel charts require ordered stage data, shared population/cohort logic, value/unit, entry share, stage conversion, drop value/rate, total conversion, tooltip evidence, and either ECharts `series.type: 'funnel'` or a data-driven ECharts horizontal `bar` funnel; path/user/process path charts require declared step/link data and transition evidence, Sankey diagrams require ECharts `series.type: 'sankey'` or a declared data-driven custom exception plus `source`/`target`/`value` links, layer/stage order, Top N/`其他`, flow-width mapping, hover path highlight, and exact node/link tooltip evidence, treemap/rectangular tree maps require hierarchy data, non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, and exact path/value/share tooltip evidence, sunburst charts require hierarchy data, non-negative additive angle metric, visible depth/ring-width budget, Top N/`其他`, sector label thresholds, center content, breadcrumb/drilldown, and exact path/value/total-share/parent-share tooltip evidence, tree/hierarchical tree charts require declared root/parent-child data, expand-collapse, and node evidence, and relation/network graphs use ECharts `graph` unless an explicit custom-diagram exception is recorded.
- Table widgets are not accepted when `visualType: 'table'` is only a generic list of fields. Detail Tables require row grain, primary key, prioritized visible columns, type-specific width/alignment, default sort, table-body row budget, fixed header/frozen-column behavior when needed, provider/API/resolver scope for global search/sort/pagination/export, local-filter limits, row detail/action payload, and stable empty/loading/error/no-permission states.
- Pivot widgets are not accepted when `visualType: 'pivot'` is only a decorative matrix or raw rows reshaped as columns. They require row dimensions, column dimensions, measures, aggregation formulas/functions, subtotal/grand-total rules, rate numerator/denominator recomputation, S2/project analytical renderer, frozen headers, row/column density fallback, tooltip/drilldown payload, and stable empty/loading/error/no-permission states.
