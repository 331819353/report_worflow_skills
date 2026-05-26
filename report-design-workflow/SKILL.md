---
name: report-design-workflow
description: "Run the end-to-end workflow for business report prototypes and runnable dashboard prototypes. Use when a task asks to build, generate, implement, redesign, repair, optimize, deploy, or return a URL for a report prototype, dashboard prototype, Vue report page, runnable analytics page, screenshot-to-prototype conversion, mock-data-backed demo, or implementation-ready report page. Trigger strongly on 原型, 页面原型, 报表原型, 仪表盘原型, 单页报表, 顶部栏报表, 可运行页面, 生成页面, 实现报表, 落地报表, 重构页面, 截图还原, 自动部署, 部署URL, 返回URL, demo, mock 数据, Vue 报表, template implementation, 数据联动, 筛选联动, and 组件联动准确性. For pure methodology questions, prefer the relevant report-type skill. Orchestrates requirement extraction, report-type skills, mapping, mock data, filters, interactions, data/filter/component linkage gates, visual/component design, TypeScript + Vue 3 + ECharts + AntV S2 implementation, templates, deployment, and URL return."
---

# Report Design Workflow

## Core Positioning

Use this as the top-level orchestration skill for report prototype work.

Trigger this skill primarily when the user wants a concrete prototype, implementation-ready page, runnable dashboard, screenshot repair, or template-backed build. For pure conceptual questions such as "状态总览型报表应该如何设计", use the relevant report-type skill directly.

It does not replace the report-type or horizontal skills. It decides:

- Which skill should be used first.
- Which steps are required for the user's current task.
- What each step must output before moving on.
- When to skip a step.
- How to verify the final design or prototype.

The default flow is:

`需求提取 -> 类型判断 -> 信息映射 -> 报表类型设计 -> 数据设计 -> 筛选设计 -> 数据交互设计 -> 数据/筛选/组件联动门禁 -> 视觉布局 -> 组件样式 -> 技术实现 -> 自动部署/URL返回 -> 质量验收`

## Workflow Modes

Choose the mode before starting.

### 1. Prototype-Oriented Design Mode

Use when the user asks for a concrete report prototype plan but has not yet requested code.

Deliver:

- Report type judgment.
- Design logic.
- Content blocks.
- Component mapping.
- Interactions.
- Visual/style guidance.
- Validation checklist.

Mock data, filters, and interaction state should be included at planning level. Code and templates are optional unless requested.

### 2. Prototype Specification Mode

Use when the user wants an implementation-ready report prototype specification.

Deliver:

- Structured requirement.
- Report type and secondary roles.
- Page layout.
- Component list.
- Mock data plan.
- Filters and interactions.
- Visual style and responsive rules.
- Implementation-ready notes.

### 3. Implementation Mode

Use when the user wants code, a Vue dashboard, or an actual runnable page.

Deliver:

- All prototype design outputs.
- Technical architecture based on `TypeScript + Vue 3 + ECharts + AntV S2`.
- Template choice.
- Data files or mock data.
- Component implementation.
- Automatic deployment when requested or when a shareable prototype URL is part of the task.
- Local verification.
- Public URL or local preview URL.
- Screenshot or browser QA when applicable.

Use `single-page-dashboard-template` for single-page report prototypes with light/dark layouts, a centered top-bar title, top-left logo, right-side theme switch, refresh, filter, download, and 8*N content grid. Use `left-nav-analytics-dashboard-template` for standard enterprise analytics dashboards with sidebar navigation. Use `sci-fi-dashboard-template` for fixed 1920x1080 sci-fi cockpit screens. All bundled implementation paths use `TypeScript + Vue 3 + Vite + ECharts + AntV S2`.

### 4. Review And Repair Mode

Use when the user provides an existing screenshot or page and asks what is wrong or how to optimize it.

Deliver:

- Visible issues.
- Requirement/type interpretation.
- Layout and component diagnosis.
- Data/filter/interaction gaps.
- Concrete repair plan.
- Updated implementation if requested.

## Stage Gate Workflow

### Stage 0: Determine Scope

Clarify or infer:

- Is the user asking for thinking, design proposal, actual prototype, or repair?
- Is there a specific report page or a report category?
- Is the expected output text, specification, code, or both?
- Is the page a single-page top-bar report, standard enterprise sidebar dashboard, or sci-fi/big-screen cockpit?
- Does the user need automatic deployment and a returned URL?

Do not block if missing details can be safely assumed.

### Stage 1: Requirement Extraction

Use `report-requirement-structure-extraction`.

Output must include:

- Report theme.
- Primary and secondary report types.
- Users and scenario.
- Core questions.
- Business objects and grain.
- Metrics, dimensions, baselines.
- Content blocks.
- Data, filter, interaction, visual, and component needs.
- Assumptions and missing information.

Skip only when the user already provides a clean structured brief.

### Stage 2: Report Type Routing

Choose one primary report-type skill:

- `status-overview-report-design`: current status, health, target, variance, risk entry.
- `analysis-diagnostic-report-design`: why a metric changed, driver, cause, attribution.
- `detail-query-report-design`: records, fields, filters, sorting, export, row detail.
- `performance-evaluation-report-design`: target completion, scoring, ranking, fairness, improvement.
- `review-recap-report-design`: period story, conclusion, evidence, risk, action, meeting output.
- `anomaly-monitoring-report-design`: anomaly rules, severity, owner, SLA, handling.
- `operational-execution-report-design`: task, owner, progress, evidence, acceptance, closure.
- `reconciliation-traceability-report-design`: data correctness, differences, source, lineage, version, audit.

Use secondary report-type skills only for local blocks or follow-up flows. Do not invent extra report types for maps, funnels, tables, or charts.

### Stage 3: Business Design

Apply the primary report-type skill.

Output must include:

- Design positioning.
- Business logic.
- Metric and dimension logic.
- Layout layers.
- Chart/component rationale.
- Interactions.
- Conclusion pattern.
- Type-specific checklist.

This stage owns business purpose. It does not finalize mock data, filters, visual shell, or component style.

### Stage 4: Information To Component Mapping

Use `report-info-component-mapping`.

Output must include:

- Information inventory.
- Semantic roles.
- Content block mapping.
- Component/chart/table/card mapping.
- Interaction entry points.
- Mock data needs.
- Filter data needs.
- Layout and style constraints.

This is the bridge from business thinking to implementable page structure.

### Stage 5: Data Design

Use `report-mock-data-design` when prototype data, demo data, or chart-ready data is needed.

Output must include:

- Data story.
- Dataset list.
- Row grain.
- Dimension schema.
- Fact schema.
- Derived formulas.
- Rollup rules.
- Edge cases.
- Validation checks.

Skip only for pure methodology answers where no prototype or example data is needed.

### Stage 6: Filter Design

Use `report-filter-data-design` when report scope can change by time, organization, status, object, owner, source, or keyword.

Output must include:

- Main filter bar.
- Advanced filters.
- Defaults.
- Option schema.
- Cascades.
- Query parameters.
- Permission rules.
- Reset/export/shared-link behavior.

Almost all operational reports need this stage.

### Stage 7: Data Interaction Design

Use `report-data-interaction-design` when any data object is clickable or navigable.

Output must include:

- Clickable and non-clickable objects.
- Drilldown paths.
- Popover/drawer/modal contents.
- Cross-filtering rules.
- Jump targets.
- Parameter passing.
- State preservation.
- Permission and failure states.
- Back/return behavior.

Skip only for static export-only reports with no interaction.

### Hard Gate: Data, Filter, And Component Linkage Accuracy

Apply this gate for every prototype or implementation, including pages that do not use the bundled templates.

Before visual polish or final delivery, require an explicit linkage contract:

- Every component declares its data source, row grain, required fields, formulas, filter dependencies, refresh trigger, and empty state.
- Every filter maps to a real data field, resolver parameter, or permission scope. If names differ, define an explicit filter-to-field mapping.
- Filter changes update KPI cards, charts, tables, drawers, exports, downloads, fullscreen views, and jump parameters consistently.
- Summary counts, table row counts, chart totals, and drawer records reconcile under the same active filters.
- Selected chart marks, rows, drawers, and drill paths reset or show stale-selection state when the selected object leaves the filtered scope.
- Cross-filtering, drilldown, jumps, shared links, and returns pass the same period, organization, object, metric, permission, and filter context.
- No component may show stale data after a filter, refresh, drilldown, permission, or mock-data update.

For custom implementations without a template, define the equivalent adapter contract in code or specification:

- `dataSource`: where each component reads data.
- `filterMap`: how each filter maps to data fields or query parameters.
- `componentBindings`: which components subscribe to which filters and interaction state.
- `updateTriggers`: when components recompute, refetch, resize, reset, or clear selection.

For bundled template implementations, use the template contracts instead of ad hoc wiring:

- Widget data must use `widget.data.id`, `params`, `filterFields`, `requiredFilters`, `requiredParams`, and `ignoredFilters` rather than hidden filtering inside the visual component.
- Every configured widget must either declare `data` or explicitly declare `dataPolicy: 'static' | 'external'`; unbound first-screen cards are not allowed.
- Dynamic filters should return stable `id`/`label` options and may return `disabled`, `reason`, `count`, `parentId`, `level`, `sortOrder`, `permissionScope`, and `meta` for cascades, permissions, and result counts.
- Widget code should render from the `data` prop and `context`; it should not maintain a separate copy of active filters unless that state is explicitly reset on filter changes.
- Widget interactions should emit `dashboard-action`; modal, setFilters, navigation, refresh, fullscreen, and URL jumps stay in the shell/action layer.
- If a component intentionally ignores a global filter, configure `ignoredFilters` and make the scope difference visible in title, subtitle, or helper text.
- Run `npm run validate:dashboard` before `npm run build`; the bundled templates also run this check automatically inside `build`.

For custom implementations without a bundled template, build the same runtime contract explicitly:

- A single source of truth for `activeFilters`, selected object, drill path, modal/drawer state, permission scope, and refresh timestamp.
- A deterministic data resolver layer that accepts `(filters, params, permissionScope)` and returns normalized rows.
- A component registry or binding table that declares each component's dataset, fields, formulas, affected filters, ignored filters, required filters, interaction outputs, and stale behavior.
- A shared action dispatcher for drilldown, cross-filtering, drawer, modal, jump, export, refresh, and fullscreen so components do not invent incompatible state.

Template and custom implementations must both pass the same audit:

- Mock data audit: default state, filtered state, empty state, and permission-limited state all have matching component outputs.
- Filter audit: every primary filter has at least one visible affected component and at least one validation case.
- Interaction audit: every drawer, modal, drilldown, jump, export, and fullscreen view inherits or explicitly overrides filter context.
- Component audit: every component declares affected filters, ignored filters, required fields, formulas, and stale-state behavior.
- Layout-body audit: every visual block separates title/header from component body; charts, tables, icons, empty states, and custom canvases render only inside the body viewport.
- Regression audit: changing one filter cannot leave any KPI, chart, table, drawer, or export on the previous scope.

Minimum smoke tests before delivery:

- `npm run validate:dashboard` passes for bundled templates, or an equivalent custom validation checklist is completed.
- Default filters load and all visible components show data from the same scope.
- Each primary filter changes at least one KPI/chart/table/list and reconciles the related counts or totals.
- A filter combination with no data shows empty states without stale numbers.
- A disabled or unauthorized filter option cannot be selected and does not leak counts.
- Opening a drawer/modal, then changing a filter, either synchronizes or shows a stale-selection state.
- Export/download/jump/fullscreen receives the same filter context as the source component.
- Block body QA passes: titles remain readable, and charts/tables/empty states do not overlap the header after default and filtered data changes.
- Radar/chart label QA passes: category labels, dimension labels, legends, and graphics do not overlap after default and filtered data changes.

### Stage 8: Visual Layout Design

Use `report-visual-layout-design`.

Output must include:

- Page shell choice.
- Haier logo usage.
- Header, filter bar, toolbar, sidebar/menu, footer decisions.
- 8*N rectangular grid structure.
- Content pattern: 总分总, 总分, 分总, 明细优先, 告警处理, 执行闭环, or recap narrative.
- Visual style preset.
- Empty/loading/error states.
- Block header/body separation and chart/table body viewport rules.
- Responsive and overflow rules.

Always respect the bundled Haier logo rule: original color on light backgrounds and white on dark backgrounds.

### Stage 9: Component Style Design

Use `report-component-style-design`.

Output must include:

- Component title style.
- Background, typography, color, border, shadow.
- Alignment and centering.
- Label and legend rules.
- Header/body fit rules for every component viewport.
- Overflow/clipping strategy.
- Complex diagram viewport behavior.
- Table/card/chart/drawer style rules.
- Visual QA checklist.

This stage prevents overlap, truncation, low contrast, and component sizing failures.

### Stage 10: Template Or Implementation

Use this stage only when the user asks for runnable files, page implementation, or a prototype.

Default technical architecture:

- Language and framework: TypeScript + Vue 3 single-file components with Composition API.
- Build tool: Vite.
- Charting: ECharts for KPI trends, bars, lines, scatter, heatmaps, maps, waterfalls, funnels, gauges, and most dashboard charts.
- Analytical tables: AntV S2 through `@antv/s2` and `@antv/s2-vue` for pivot tables, cross tables, wide metric matrices, frozen headers, dense comparison grids, and analysis-style tables.
- Icons and controls: use the template's existing icon/control system; keep business widgets typed and scoped.
- Data: keep mock/static data in data files or data-source resolvers, not inside visual components.
- Interactions: emit typed dashboard actions from widgets and keep navigation, drilldown, modal, filter mutation, fullscreen, and URL navigation in the framework layer.
- Linkage accuracy: implement explicit data-source, filter-map, component-binding, and update-trigger contracts even when not using a bundled template.

Template choice:

- Use `single-page-dashboard-template` for one focused report page whose frame is a top menu bar with centered title, left logo, right-side theme switch/refresh/filter/download, light/dark layouts, and an 8*N content grid.
- Use `left-nav-analytics-dashboard-template` for enterprise analytics report suites or workbenches with multiple pages/modules, sidebar navigation, filters, 8*N cards, business widgets, and standard repeated-use behavior.
- Use `sci-fi-dashboard-template` for fixed 1920x1080 big-screen cockpit, command-center, exhibition, or leadership presentation screens where full-screen visual impact matters more than daily office efficiency.
- If the existing project already has a framework, follow the existing project patterns instead of forcing a template.

Template selection rules:

| Situation | Choose | Why |
| --- | --- | --- |
| One report topic, no page navigation, users need a direct first-screen answer and a compact top toolbar | `single-page-dashboard-template` | It keeps the frame light and lets the 8*N content grid carry the report. |
| Multiple report pages, modules, or views such as 总览 / 诊断 / 明细 / 任务 / 核对 | `left-nav-analytics-dashboard-template` | Sidebar navigation makes a report suite feel stable and discoverable. |
| Daily operational analysis, dense tables, repeated filtering, saved workbench behavior, or several related reports in one app | `left-nav-analytics-dashboard-template` | It is optimized for enterprise work rather than showpiece display. |
| Large screen, monitoring wall, command center, exhibition, leadership cockpit, or presentation scenario | `sci-fi-dashboard-template` | It is optimized for fixed 1920x1080 full-screen viewing and high visual impact. |
| The user explicitly asks for 单页 / 顶部栏 / 无侧边栏 | `single-page-dashboard-template` | Respect the requested shell unless existing code forces another pattern. |
| The user explicitly asks for 大屏 / 驾驶舱 / 指挥中心 / 科技风 | `sci-fi-dashboard-template` | These terms indicate presentation or monitoring display. |

Selection priority:

1. Existing project framework and user-stated shell.
2. Display scenario: big-screen/presentation uses `sci-fi-dashboard-template`.
3. Information architecture: multi-page/report-suite uses `left-nav-analytics-dashboard-template`.
4. Standalone focused report uses `single-page-dashboard-template`.

Do not choose a template only because it "looks better"; choose by scenario, navigation depth, interaction density, and display environment.

Implementation must:

- Keep business data out of config when the template expects data files or data sources.
- Use stable IDs for filters, interactions, and mock records.
- Implement the data/filter/component linkage contract in the template config or custom runtime before visual polish.
- Run the template `validate:dashboard` script or equivalent custom checks to block unbound widgets, missing filter contracts, invalid action configs, and unsafe radar chart options.
- Use ECharts before custom SVG/canvas for standard charts.
- Use AntV S2 before hand-rolled tables for analytical tables, cross tables, pivot tables, and dense metric matrices.
- Implement component overflow and responsive behavior from earlier stages.
- Run and verify the page when a dev server is required.

### Stage 11: Automatic Deployment And URL Return

Use this stage when the user asks for deployment, shareable URL, public preview, demo link, or "return URL".

Deployment workflow:

1. Build locally.
   Run dependency installation if needed, then run the project build command, usually `npm run build`.

2. Verify production output.
   Confirm the Vite output directory exists, usually `dist`. Run a local preview when useful, usually `npm run preview -- --host 0.0.0.0`, and inspect the page if browser tools are available.

3. Choose deployment target.
   - If the project already has deployment configuration, use it.
   - If a hosting CLI is installed and authenticated, deploy non-interactively to that platform.
   - If no deployment target exists, prefer static hosting for the Vite `dist` directory and add only minimal config required by the chosen platform.
   - Prefer installed and authenticated static-site deployment tools such as Vercel, Netlify, Cloudflare Pages, GitHub Pages, or the project's own deployment script.
   - Do not stop at local build when the user asked for a deployed URL; attempt deployment first, then fall back only when blocked.
   - If public deployment is blocked by missing auth, missing platform configuration, or network failure, return the local preview URL and state the blocker clearly.

4. Capture URL.
   Read the deployment command output and capture the final HTTPS URL. If the platform returns both draft and production URLs, return the URL that matches the user's request; otherwise prefer the shareable preview URL.

5. Final response requirement.
   Always include:
   - Deployment status.
   - Public URL when deployment succeeds.
   - Local preview URL when public deployment is unavailable.
   - Build/verification status.

Do not claim deployment succeeded without a returned URL from the deployment tool or a verified reachable preview URL.

## Skip Rules

Skip a stage only when it clearly does not apply:

- Skip mock data for pure conceptual guidance.
- Skip filter design for fixed-scope static reports.
- Skip data interaction for static PDF/PPT-only reports.
- Skip template implementation when the user only asks for design thinking.
- Skip report type classification only when the user explicitly gives the report type and it is consistent with the goal.

If skipping a stage creates risk, say what is being deferred.

## Output Formats

### Design Proposal Output

Use this structure:

1. 流程模式.
2. 报表主题与类型.
3. 用户与核心问题.
4. 业务设计思路.
5. 信息区块与组件映射.
6. 数据策略.
7. 筛选策略.
8. 数据交互策略.
9. 视觉布局策略.
10. 组件风格策略.
11. 质量验收清单.
12. 假设与缺口.

### Implementation Plan Output

Use this structure:

1. Scope and selected workflow mode.
2. Skills used and why.
3. Files/components/data to create or modify.
4. Mock data and filter state plan.
5. Interaction state and parameter plan.
6. Visual layout and component style plan.
7. Technical architecture: TypeScript, Vue 3, ECharts, AntV S2, and template choice.
8. Automatic deployment plan and expected URL source.
9. Verification plan.

### Review/Repair Output

Use this structure:

1. Visible problems.
2. Root design causes.
3. Affected components/blocks.
4. Fix strategy by workflow stage.
5. Concrete implementation changes if requested.
6. Verification checks.

## End-To-End Quality Checklist

Before final delivery, verify:

- The primary report type is clear and not confused with a chart type.
- Secondary report types only appear where they change a block or flow.
- The core user question is answered in the first meaningful viewport.
- Metrics include baselines, direction, unit, and formulas where needed.
- Mock data, if used, reconciles with KPI cards, charts, tables, and filters.
- Filters have defaults, stable IDs, cascades, permission rules, and visible active state.
- Every filter has an explicit field/query mapping, and every component declares whether it is affected by that filter.
- Changing any primary filter updates all dependent KPIs, charts, tables, drawers, exports, downloads, jumps, and fullscreen views without stale values.
- Filtered KPI totals, chart totals, table rows, summary counts, and drawer records reconcile against the same dataset and permission scope.
- Interactions preserve period, scope, object, metric, filters, permissions, and return path.
- Open drawers, selected rows, chart marks, and drill paths reset or show stale-selection state when filters remove the selected object.
- Layout follows the 8*N rectangular grid.
- Haier logo usage follows light/dark rules.
- Components do not overlap, clip, truncate critical text, or use low-contrast labels.
- Dense tables, lineage graphs, diagrams, maps, and Gantt charts have scroll, zoom, pan, drawer, or fullscreen strategy.
- Export, refresh, download, share, and fullscreen actions respect filters and permissions.
- Empty, loading, no-permission, error, and stale-selection states are defined.
- Implementation uses existing project patterns and is verified locally when built.
- Runnable prototypes use TypeScript + Vue 3 + ECharts + AntV S2 unless the existing project has an explicit conflicting stack.
- Deployment, when requested, builds successfully and returns a public URL or explains why only a local preview URL is available.

## Avoid

- Do not start from visual layout before classifying the report purpose.
- Do not use every skill for every task; use the smallest complete path.
- Do not duplicate detailed rules from child skills; route to them.
- Do not invent new report categories when one of the eight categories fits.
- Do not treat mock data as random values.
- Do not design filters or jumps without permission and state behavior.
- Do not finish an implementation without checking for overlap, clipping, and broken layout.
- Do not replace ECharts or AntV S2 with ad hoc chart/table code for standard report components.
- Do not say deployment is done without returning a URL or a concrete deployment blocker.
