# 01 Workflow Modes And Stage Gates

## Workflow Modes

Choose the mode before starting.

Before choosing a mode, enforce the trigger gate. Do not let adjacent words such as `报表`, `页面`, `模板`, `部署`, `筛选联动`, `mock 数据`, `自检`, or `返回URL` activate this workflow by themselves; they must appear in a request that also includes `原型`.

Before implementation, also choose exactly one `pageShellPath`, exactly one `pageStyleSource`, exactly one `brandMode`, and exactly one `visualMode`: `haierEnterprise`, `sampleRestore`, or `sciFiCockpit`. These are blocking decisions, not later polish choices.

### 1. Prototype-Oriented Design Mode

Use when the user asks for a concrete report prototype plan but has not yet requested code.

Deliver:

- Display theme and selected reusable pattern cards.
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
- Display theme and pattern-card set.
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
- Display theme, pattern-card-to-component mapping, and pattern acceptance cases.
- Technical architecture based on `TypeScript + Vue 3 + Element Plus + ECharts`, with ECharts standard charts including Combo through shared `xAxis` plus `bar` and `line`/`markLine` series, funnel through `series.type: 'funnel'` or a data-driven horizontal `bar` funnel, parallel coordinates through `parallelAxis` plus `series.type: 'parallel'`, and AntV S2 installed and used only when the binding matrix contains S2-class analytical tables.
- Template choice.
- Data files or mock data.
- Component implementation.
- Self-check report and repair loop, repeated up to 3 cycles when unresolved issues remain.
- Automatic deployment when requested or when a shareable prototype URL is part of the task.
- Automatic local server startup on an available port when a runnable prototype should be shown.
- Local verification.
- Public URL or local preview URL.
- Screenshot or browser QA when applicable.

Do not treat the word "report" as a single-page constraint. A report may be a one-page summary, a multi-chapter report suite, or a big-screen cockpit. Choose the template by content volume, chapter/view count, interaction density, and display scenario. Use the bundled template assets under `report-prototype-template-management/assets/templates/`: `topbar-light-scroll-dashboard-template` or `topbar-dark-scroll-dashboard-template` for compact focused reports, `left-nav-analytics-workbench-template` for multi-chapter analytics workbenches, and `frozen-title-sci-fi-cockpit-template` for fixed 1920x1080 cockpit screens. Topbar and left-nav templates may exceed 1080px and scroll vertically. Only select a template with `nav[]` when the content can be redesigned into multiple substantial nav pages; never use a navigation template while populating only the homepage. All bundled implementation paths use `TypeScript + Vue 3 + Vite + Element Plus + ECharts` as the base stack; add AntV S2 dependencies only when a generated component actually needs S2.

### 4. Review And Repair Mode

Use when the user provides an existing screenshot or page and asks what is wrong or how to optimize it.

Deliver:

- Visible issues.
- Requirement/display-theme/type interpretation.
- Layout and component diagnosis.
- Data/filter/interaction gaps.
- Concrete repair plan.
- Updated implementation if requested.

## Stage Gate Workflow

### Stage 0: Determine Scope

Clarify or infer:

- Is the user asking for thinking, design proposal, actual prototype, or repair?
- Is there a specific report page or a report category?
- Which of the six display themes is primary: 明细、汇总统计、经营看板、分析探索、管理报告/专题报告, or 监控告警?
- Is the expected output text, specification, code, or both?
- Which standard inputs are present: 需求文档, 指标清单, optional screenshot/image, optional HTML源码?
- If screenshot/image input is present, is it a full page, first viewport, partial component, modal/drawer, mobile view, export page, or style reference?
- If HTML源码 is present, is it a layout reference, full static page, partial component, or source of mock/chart configuration?
- Is the page a single-page top-bar report, standard enterprise sidebar dashboard, or sci-fi/big-screen cockpit?
- Does the user need automatic deployment, automatic local startup, and a returned URL?

Before moving to design or implementation, write two explicit statements: `User Intent` (what the user is trying to accomplish and decide) and `Design Thinking` (the report logic and layout direction you will use to satisfy that intent). Keep them concise, but do not skip them for prototype work.

Do not block if missing details can be safely assumed.

### Hard Gate: Shell Path, Style Source, Brand Mode, Visual Mode, Brand Assets, And Sample Fidelity

Run this gate before Stage 8 visual layout and before Stage 10 implementation.

Shell path:

- Declare exactly one `pageShellPath`: `template` or `custom`.
- Use `pageShellPath: template` when no page style is specified and no HTML/source/sample styling is provided.
- Use `pageShellPath: custom` only when the user requests custom/free design, provides HTML/source/sample styling, or a template limitation is documented.
- If `pageShellPath: custom`, declare exactly one `customDesignPath`: `htmlReplica` or `freeDesign`.
- Use `customDesignPath: htmlReplica` when replicating provided HTML/source/sample structure.
- Use `customDesignPath: freeDesign` when creating a custom shell from requirements without source visual authority.
- Custom Haier pages default to `brandMode: haierBranded` and must configure a real bundled Haier logo before final delivery; explicit `sampleNative` or `neutral` pages must record why Haier branding is not required.

Style source:

- Declare exactly one `pageStyleSource`: `templateDefault`, `userSpecified`, or `sampleProvided`.
- Use `templateDefault` when no page style is specified and no HTML/source/sample styling is provided; choose a bundled template by scenario.
- Use `userSpecified` when the user names a page style, shell, or design direction; follow that direction unless it violates hard gates.
- Use `sampleProvided` when screenshot, image, HTML source, or display sample supplies the page structure; follow the provided design unless the user asks for optimization or redesign.
- Do not choose a custom shell merely because style requirements are absent.

Brand mode:

- Before `visualMode`, declare exactly one `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
- Use `haierBranded` for Haier enterprise pages, Haier-branded report prototypes, and custom report pages unless the user clearly asks for non-Haier/native sample branding.
- Use `sampleNative` only when a provided sample/HTML/source is explicitly non-Haier and the user asks to keep the source-native brand/style.
- Use `neutral` only when the user explicitly asks for a generic non-branded report.
- If `brandMode: haierBranded`, configure the Haier logo and global UI tokens without changing the sample's main hierarchy.
- If `brandMode: sampleNative` or `neutral`, do not inject a Haier logo only because `pageShellPath: custom`; record "no Haier brand required by input".

Visual mode:

- Declare exactly one `visualMode`.
- Use `sampleRestore` when the input is a display sample, screenshot, image, or HTML source and the user asks to restore, follow, or build from it without explicit redesign.
- Use `haierEnterprise` for ordinary business report prototypes, enterprise report pages, and Haier/brand-unified pages.
- Use `sciFiCockpit` only for explicit big-screen, cockpit, command-center, exhibition, monitoring-wall, or fixed 1920*1080 presentation scenarios.
- If instructions conflict, first apply the entry consistency gate from `$quality-gate-validation`. Explicit user direction wins when it resolves the conflict; unresolved `P0`/`P1` entry conflicts require confirmation before implementation. Otherwise sample/source restoration wins over generic enterprise styling, sci-fi wins for explicit big-screen display, and all remaining business reports default to `haierEnterprise`.

Brand assets:

- For Haier/branded pages, search for logo assets in the existing project, selected template `public` path, and `report-prototype-template-management/assets/brand`.
- Configure the logo in the header, unified title area, sidebar brand area, or template logo slot before implementing components.
- If no usable asset exists, render an explicit logo placeholder in that slot and record the missing asset. Do not silently omit the logo.
- For `pageShellPath: custom` with `brandMode: haierBranded`, placeholder state is a blocker. Do not pass visual QA until `haier-logo.svg`, `haier-logo-original.svg`, or `haier-logo-white.svg` is actually configured.

Sample fidelity:

- In `sampleRestore`, the source page shell, module order, container hierarchy, main control count, layer structure, and card proportions are acceptance constraints.
- Any new filter, summary card, detail table, matrix, drawer, jump, or extra toolbar action is an enhancement. Label it as an enhancement and keep it from changing the sample's first viewport and main body layout unless the user asks for optimization or reconstruction.
- Classify each visible sample/source module as `businessRequired`, `sampleStructure`, or `optionalEnhancement`. Source visibility alone is not enough to make a component `must-have`.
- Added conclusions, insights, and status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not add a new standalone horizontal band unless the source has an equivalent band.
- In `haierEnterprise`, a sample/source may inform information architecture, visible metrics, and interaction intent, but it is not allowed to override the chosen Haier enterprise shell unless explicitly requested.

Global UI and Chinese metric display:

- When layout/style follows HTML, screenshot, or custom design, palette, typography, spacing, radius, shadows, semantic states, and Element Plus/control styling must still come from global UI tokens unless exact visual restoration is explicitly requested.
- For rate/change/completion fields, display values with `%` in Chinese UI. Do not show `pt`, `p.p.`, or `percentage point` labels on the visible page unless the user explicitly requires that term.
- For change-rate and variance-rate indicators, positive values use red text plus an upward SVG/icon; negative values use green text plus a downward SVG/icon; zero values use neutral text/icon treatment.

Blocking behavior:

- Stop before implementation if `visualMode` is not declared.
- Stop before implementation if `brandMode` is not declared.
- Stop before implementation if `pageShellPath` is not declared.
- Stop before implementation if `pageStyleSource` is not declared.
- Stop before implementation if `pageShellPath: custom` and `customDesignPath` is not declared.
- Stop before implementation if `pageShellPath: custom`, `brandMode: haierBranded`, and the page has no real Haier logo asset configured.
- Stop before implementation if a required logo slot has neither asset nor placeholder.
- Stop before implementation if `sampleRestore` additions would alter the sample's first viewport without an explicit user request.

Custom layout pattern:

- If a custom shell is used, declare exactly one `customLayoutPattern`.
- Allowed values: `symmetricBalance` 对称式, `threePart` 三部式, `masterDetail` 主从式, and `narrativeStack` 分层叙事式.
- Record why the selected pattern fits the report and how it preserves the `8 * N` grid.

### Screenshot Or Image Source Handling

Use this stage when the task asks for 截图还原原型, 图片还原原型, visual repair from screenshot, or screenshot-based prototype completion.

Extract before designing:

- Page shell: title, logo, navigation, filters, toolbar actions, tabs, sidebars, drawers, modals, footer, and visible states.
- Content structure: first-viewport answer, section order, card/table/chart grouping, hierarchy, and repeated blocks.
- Component inventory: KPI cards, Analysis & Insight components, text summaries, Composite Panels, charts, tables, lists, task cards, alerts, comparison panels, controls, and legends.
- Data intent: visible metric names, units, comparison baselines, dimensions, row grain, chart axes, table columns, status labels, and totals.
- Interaction clues: clickable controls, active filters, selected tabs, highlighted marks, buttons, download/fullscreen/refresh/share actions, and disabled states.
- Visual style: palette, typography scale, spacing, radius, shadow, density, contrast, and any brand/logo rules.

Hard rules:

- Do not paste a screenshot into the page as the implementation.
- Do not invent hidden data or interactions from the screenshot without marking assumptions.
- Default to `visualMode: sampleRestore` for screenshot/image/HTML-source restoration unless the user explicitly asks for enterprise redesign, optimization, or reconstruction.
- Preserve page shell, module order, container hierarchy, main control count, layer structure, and card proportions in `sampleRestore`.
- Mark all added filters, summary cards, details, matrices, drawers, jumps, and extra actions as enhancements.
- If the screenshot conflicts with report-type logic, classify the conflict with `ENTRY-*`. For `P0`/`P1`, confirm the intended authority before repair; for lower-severity conflicts, preserve the business intent and repair the information architecture rather than copying the flawed layout.
- Convert visible text, metrics, controls, and blocks into the same binding matrix required by `report-info-component-mapping`.
- Verification must compare the rebuilt page against the screenshot for structure, hierarchy, key text, visible component count, spacing, and no overlap; exact pixel matching is not required unless explicitly requested.

### Stage 1: Requirement Extraction

Use `report-requirement-structure-extraction`.

Output must include:

- Report theme.
- Display theme and selected/rejected theme rationale.
- User intent.
- Design thinking.
- Primary and secondary report types.
- Users and scenario.
- Core questions.
- Business objects and grain.
- Metrics, dimensions, baselines.
- Content blocks.
- Data, filter, interaction, visual, and component needs.
- Assumptions and missing information.

Skip only when the user already provides a clean structured brief.

### Stage 1.5: Display Theme And Pattern Routing

Use `references/04-common-display-theme-pattern-chain.md`.

Output must include:

- `displayTheme`: `detail-table`, `summary-stat`, `business-dashboard`, `exploratory-analysis`, `management-report`, or `monitoring-alert`.
- Competing display themes and why they were rejected or kept as local blocks.
- Selected pattern cards with `patternId`, `patternName`, `patternRole`, and priority.
- How each selected pattern affects component mapping, mock/API design, filter/interaction behavior, export/share, acceptance, or operations.
- Any selected source pattern that cannot be implemented in the current scope, marked as `gap` or `futurePattern`.

Rules:

- Display theme is a page-form decision; it does not replace the primary report type from `$report-type-design`.
- Use 3-7 pattern cards for a design proposal and 5-12 for an implementation-ready spec or runnable page.
- Each selected pattern must map to at least one binding matrix row, data/API requirement, or validation case before implementation.

### Stage 2: Report Type Routing

Choose one primary report-type skill:

- `report-type-design`: current status, health, target, variance, risk entry.
- `report-type-design`: why a metric changed, driver, cause, attribution.
- `report-type-design`: records, fields, filters, sorting, export, row detail.
- `report-type-design`: target completion, scoring, ranking, fairness, improvement.
- `report-type-design`: period story, conclusion, evidence, risk, action, meeting output.
- `report-type-design`: anomaly rules, severity, owner, SLA, handling.
- `report-type-design`: task, owner, progress, evidence, acceptance, closure.
- `report-type-design`: data correctness, differences, source, lineage, version, audit.

Use secondary report-type skills only for local blocks or follow-up flows. Do not invent extra report types for maps, funnels, tables, or charts.

Do not route by domain keyword alone. If the request says `产业`, `区域`, `国家`, `品牌`, `渠道`, or similar domain words, first identify the user's decision question:

- Use `report-type-design` when the question is "整体是否健康、是否达标、风险在哪里".
- Use `report-type-design` when the question is "为什么变化、问题来自哪里、哪些因素驱动".
- Use `report-type-design` when the question is "谁表现更好、如何排名/评分/评价".
- Use `report-type-design` when the question is "查哪些记录、字段、明细、导出".
- Use `report-type-design` when the question is "周期内发生了什么、如何汇报复盘".
- Use `report-type-design` when the question is "哪些对象异常、严重程度与处理状态".
- Use `report-type-design` when the question is "任务如何推进、责任与闭环如何跟踪".
- Use `report-type-design` when the question is "数据是否一致、差异如何追溯".

Domain words then become dimensions, filters, decomposition paths, table fields, hierarchy levels, or narrative context in later stages.

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
- Display theme and selected pattern-card influence.
- Semantic roles.
- Content block mapping.
- Component/chart/table/card mapping.
- `sourcePatternIds` and pattern acceptance points for affected components or interactions.
- Interaction entry points.
- Mock data needs.
- Filter data needs.
- Layout and style constraints.

This is the bridge from business thinking to implementable page structure.

### Stage 5: Data Design

Use `$report-info-component-mapping` when prototype data, demo data, or chart-ready data is needed. Let the child skill decide which internal data-modeling reference to load.

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

Use `$report-info-component-mapping` when report scope can change by time, organization, status, object, owner, source, or keyword. Let the child skill decide which internal filter reference to load.

Output must include:

- Main filter surface. For bundled templates, this means template `filters[]` plus the native trigger/panel/popover/drawer, not a standalone visual filter bar.
- Advanced filters.
- Defaults.
- Option schema.
- Cascades.
- Query parameters.
- Permission rules.
- Reset/export/shared-link behavior.

Almost all operational reports need this stage.

Template note: Stage 6 designs filter contracts and placement decisions. It must not force a new filter toolbar into a bundled template that already owns filter invocation.

### Stage 7: Data Interaction Design

Use `$report-info-component-mapping` when any data object is clickable or navigable. Let the child skill decide which internal interaction reference to load.

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

- Every selected pattern card maps to at least one component, filter/control, interaction, dataset/API requirement, or validation case; unmapped patterns are backlog/gaps, not completed scope.
- Every component declares its data source, row grain, required fields, formulas, filter dependencies, refresh trigger, and empty state.
- Every filter maps to a real data field, resolver parameter, or permission scope. If names differ, define an explicit filter-to-field mapping.
- Every primary/global filter expected to affect a component must prove a visible data change for at least one non-default state. Selected-state-only behavior fails the linkage gate.
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
- If a component intentionally ignores a global filter, configure `ignoredFilters` and make the scope difference visible in title, subtitle, or helper text. Do not use `ignoredFilters` when the real issue is missing `filterFields`, missing mock grain, or an unimplemented resolver branch.
- Run `npm run validate:dashboard` before `npm run build`; the bundled templates also run this check automatically inside `build`.

For custom implementations without a bundled template, build the same runtime contract explicitly:

- A single source of truth for `activeFilters`, selected object, drill path, modal/drawer state, permission scope, and refresh timestamp.
- A deterministic data resolver layer that accepts `(filters, params, permissionScope)` and returns normalized rows.
- A component registry or binding table that declares each component's dataset, fields, formulas, affected filters, ignored filters, required filters, interaction outputs, and stale behavior.
- A shared action dispatcher for drilldown, cross-filtering, drawer, modal, jump, export, refresh, and fullscreen so components do not invent incompatible state.

Template and custom implementations must both pass the same audit:

- Mock data audit: default state, filtered state, empty state, and permission-limited state all have matching component outputs. Affecting primary filters require matching rows or resolver logic for non-default options.
- Filter audit: every primary filter has at least one visible affected component and at least one validation case.
- Interaction audit: every drawer, modal, drilldown, jump, export, and fullscreen view inherits or explicitly overrides filter context.
- Component audit: every component declares affected filters, ignored filters, required fields, formulas, and stale-state behavior.
- Layout-body audit: every visual block separates title/header from component body; charts, tables, icons, empty states, and custom canvases render only inside the body viewport.
- Component viewport audit: every rendered widget has a full-size viewport layer between block body and business component; the viewport owns background, clipping, scroll, and resize bounds.
- Span audit: every component declares `visualType` and uses one of the legal `columns * rows` spans from `report-visual-layout-design`.
- Block-height audit: for scrollable page templates, every resolved content block is at least 220px tall; when the total grid height exceeds 1080px, the page or content region scrolls vertically instead of shrinking blocks. Fixed sci-fi/big-screen templates are exempt.
- Table viewport audit: every native table, Detail Table, Pivot Table, AntV S2 table, wide matrix, and comparison grid declares `visualType: 'table'` or `visualType: 'pivot'` as appropriate, mounts inside the block body, and scrolls internally instead of expanding or clipping the block; Detail Tables preserve row grain, primary key, default sort, column priority, row budget, pagination/search/export scope, and row detail/action behavior; complex/grouped table headers preserve `columnTree`/nested columns, leaf fields, computed spans/depth, fixed whole-header behavior, frozen row/primary columns, filter separation, tooltip definitions, and useful body rows; Pivot Tables preserve row/column dimensions, measures, aggregation formulas, subtotal/grand-total rules, frozen headers, density fallback, and exact cell tooltip/drilldown behavior.
- Download/print audit: scrollable pages taller than 1080px export or print their full resolved height across multiple 1920x1080 pages; no print/download path may clip to only the first viewport.
- Regression audit: changing one filter cannot leave any KPI, chart, table, drawer, or export on the previous scope.

Minimum smoke tests before delivery:

- `npm run validate:dashboard` passes for bundled templates, or an equivalent custom validation checklist is completed.
- Default filters load and all visible components show data from the same scope.
- Each primary filter changes at least one KPI/chart/table/list and reconciles the related counts or totals.
- A filter combination with no data shows empty states without stale numbers.
- A disabled or unauthorized filter option cannot be selected and does not leak counts.
- Opening a drawer/modal, then changing a filter, either synchronizes or shows a stale-selection state.
- Export/download/jump/fullscreen receives the same filter context as the source component.
- Download/print of a page taller than 1080px includes the lower content on later PDF/print pages.
- Block body QA passes: titles remain readable, and charts/tables/empty states do not overlap the header after default and filtered data changes.
- Component viewport QA passes: charts, tables, KPI cards, text blocks, canvases, SVGs, and empty states do not paint outside the component-area background.
- Table body QA passes: each table shows either all columns within the block or a visible internal horizontal scroll path; no table content is silently clipped at the right or bottom edge. Detail Tables show only prioritized first-view columns by default and disclose secondary fields through tooltip, column settings, drawer, export, or a detail page. Complex/grouped table headers keep parent groups aligned to leaf columns, fix the whole multi-level header during vertical scroll, and keep the top-left header synchronized with frozen row/primary columns during horizontal scroll. Pivot Tables keep row and column context visible through frozen row dimensions, fixed column headers, and tooltip/drilldown for hidden or scrolled cells.
- Radar/chart label QA passes: category labels, dimension labels, legends, and graphics do not overlap after default and filtered data changes.
- Component span QA passes: line/bar/K-line/heatmap, pie/radar/path/sunburst/gauge, scatter/box/parallel, map/graph/tree/treemap/sankey/funnel, metric cards, tables, and other components all use their legal span sets.

### Stage 8: Visual Layout Design

Use `report-visual-layout-design`.

Output must include:

- `visualMode` and conflict resolution.
- `displayTheme`, selected pattern set impact, and first-screen theme structure.
- `pageShellPath`, `pageStyleSource`; if custom, `customDesignPath` and `customLayoutPattern`.
- Brand asset discovery result, configured logo path, logo variant, or placeholder gap.
- Page shell choice.
- Haier logo usage.
- Header, native/template filter surface or custom filter bar, toolbar, sidebar/menu, footer decisions.
- 8*N rectangular grid structure.
- Legal component span matrix and each component's selected `columns * rows` span.
- Block-height and overflow rule: for scrollable page templates, all resolved blocks are at least 220px tall, and grids taller than 1080px use vertical scrolling. Fixed sci-fi/big-screen templates are exempt.
- Content pattern: 总分总, 总分, 分总, 明细优先, 告警处理, 执行闭环, or recap narrative.
- Visual style preset.
- Empty/loading/error states.
- Block header/body separation and chart/table body viewport rules.
- Sample fidelity notes when input is a screenshot, display sample, or HTML source.
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
- UI component framework: Element Plus for page controls, filters, form fields, buttons, tabs, tags, popovers, dropdowns, dialogs, drawers, tooltips, pagination, and simple data tables or Detail Tables unless an existing project design system explicitly supersedes it.
- Charting: ECharts for KPI trends, bars, lines, scatter, Gauge through `series.type: 'gauge'` with one bounded progress/status metric, heatmaps, maps, funnel through `series.type: 'funnel'` or a data-driven horizontal `bar` funnel, Sankey through `series.type: 'sankey'` with node/link `source`/`target`/`value`, treemap through `series.type: 'treemap'`, sunburst through `series.type: 'sunburst'`, path/user/process paths through sankey/graph/custom series when appropriate, tree/hierarchical trees through `series.type: 'tree'` or a declared data-driven hierarchy component, relation/network graphs, waterfalls, and most dashboard charts.
- Analytical tables: install and use AntV S2 through `@antv/s2` and `@antv/s2-vue` only for pivot tables, cross tables, wide metric matrices, frozen headers, dense comparison grids, and analysis-style tables.
- Icons and controls: use the template's existing icon/control system; keep business widgets typed and scoped.
- Data: keep mock/static data in data files or data-source resolvers, not inside visual components.
- Interactions: emit typed dashboard actions from widgets and keep navigation, drilldown, modal, filter mutation, fullscreen, and URL navigation in the framework layer.
- Linkage accuracy: implement explicit data-source, filter-map, component-binding, and update-trigger contracts even when not using a bundled template.

Template choice:

- The four bundled templates now live under `report-prototype-template-management/assets/templates/`; use `topbar-light-scroll-dashboard-template`, `topbar-dark-scroll-dashboard-template`, `left-nav-analytics-workbench-template`, and `frozen-title-sci-fi-cockpit-template` as template asset ids, not as separate skills.

- Report is a content form, not a template decision. A "报告/报表/复盘/诊断" request can use any template after judging content volume and usage.
- Use `topbar-light-scroll-dashboard-template` for a compact focused office-readable report and detail/query-heavy handoff pages.
- Use `topbar-dark-scroll-dashboard-template` for a compact focused dark Haier-branded overview or diagnosis cockpit that still scrolls.
- Use `left-nav-analytics-workbench-template` for enterprise analytics reports, multi-chapter report suites, or dense workbenches with multiple pages/modules, and populate every `nav[]` page.
- Use `frozen-title-sci-fi-cockpit-template` for fixed 1920x1080 big-screen cockpit, command-center, exhibition, or leadership presentation screens where full-screen visual impact matters more than daily office efficiency, and populate every retained `nav[]` page.
- If the existing project already has a framework, follow the existing project patterns instead of forcing a template.

Template selection rules:

| Situation | Choose | Why |
| --- | --- | --- |
| Primary type is analysis/diagnostic and the user does not explicitly ask for sidebar, multi-page suite, workbench, big screen, or fixed 1920x1080 cockpit | `topbar-light-scroll-dashboard-template` or `topbar-dark-scroll-dashboard-template` | Analysis pages should default to one focused reading flow; choose light for office readability and dark for cockpit atmosphere. |
| Compact report: one decision question, usually 1-3 sections, roughly 4-12 components, no persistent page navigation, and users need a direct first-screen answer | `topbar-light-scroll-dashboard-template` or `topbar-dark-scroll-dashboard-template` | A topbar shell keeps the frame light and lets one 8*N content grid carry the report. |
| Large report: one report theme but multiple chapters, more than 3-4 sections, many components/tables, or separate views such as 总览 / 诊断 / 明细 / 任务 / 核对 | `left-nav-analytics-workbench-template` | Sidebar navigation can represent report chapters as well as different report modules, but each nav page must be substantial. |
| Daily operational analysis, dense tables, repeated filtering, saved workbench behavior, or several related reports in one app | `left-nav-analytics-workbench-template` | It is optimized for enterprise work rather than showpiece display, provided the workbench pages are all populated. |
| Large screen, monitoring wall, command center, exhibition, leadership cockpit, or presentation scenario | `frozen-title-sci-fi-cockpit-template` | It is optimized for fixed 1920x1080 full-screen viewing and high visual impact; retained nav pages must all be substantial. |
| The user explicitly asks for 单页 / 顶部栏 / 无侧边栏 | topbar template | Respect the requested shell unless existing code forces another pattern. |
| The user explicitly asks for 大屏 / 驾驶舱 / 指挥中心 / 科技风 | `frozen-title-sci-fi-cockpit-template` | These terms indicate presentation or monitoring display. |

Selection priority:

1. Existing project framework and user-stated shell.
2. Display scenario: big-screen/presentation uses `frozen-title-sci-fi-cockpit-template` only when its `nav[]` pages can all be meaningful and substantial.
3. Analysis/diagnostic default: if the primary report type is analysis/diagnostic and the user has not explicitly requested another shell, use a topbar scroll template even when the page needs to scroll beyond 1080px.
4. Content volume and information architecture: explicit multi-chapter or dense workbench reports use `left-nav-analytics-workbench-template` only when the content plan has multiple substantial nav pages, even if the user calls it one report.
5. Standalone compact report uses a topbar scroll template.

Do not choose a template only because it "looks better"; choose by scenario, navigation depth, interaction density, and display environment.

Implementation must:

- Install dependencies on demand. Before running `npm install`, compare `package.json`, existing imports, and the component binding matrix. Keep base template dependencies minimal; add heavy packages such as `@antv/s2` and `@antv/s2-vue` only when current code imports them or the mapped component set requires them. If install hangs past 120 seconds, stop, remove unused heavy dependencies from the generated project and lockfile, and retry the minimal install path. If domestic network access blocks npm, use a temporary command-level mirror such as `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Do not make registry changes persistent unless explicitly requested.
- Keep business data out of config when the template expects data files or data sources.
- Declare `brandMode`, `visualMode`, and pass brand asset discovery before changing files.
- Declare `pageShellPath`; if custom, declare `customDesignPath`.
- Declare `pageStyleSource`; if no page style and no HTML/source/sample styling is provided, use a bundled template by default.
- Preserve the selected `displayTheme` and `sourcePatternIds` in component IDs, widget comments/spec rows, or handoff notes so QA can trace why a component exists.
- If using a template with `nav[]`, declare the nav-page information architecture before implementation and populate every nav page with distinct widgets, data scope, and relevant interactions. If only a homepage can be populated, switch to a non-nav template.
- If choosing a bundled template, adapt requirement-document title, filter, navigation, and toolbar requirements into the selected template's existing config and shell slots. Do not implement duplicate shell layers from the original requirement document when they conflict with the template.
- In bundled-template mode, do not implement a standalone filter toolbar/bar for "main filter bar" wording. Implement filter scope through `filters[]`, native template invocation, and data/filter/component binding.
- If implementing a `brandMode: haierBranded` custom shell, configure a real bundled Haier logo before final delivery. For HTML replication, add the Haier logo even if the source HTML lacks it while preserving the source hierarchy.
- If implementing `brandMode: sampleNative` or `neutral`, record why Haier branding is not required rather than silently omitting the logo.
- If implementing a custom shell, declare `customLayoutPattern` from the allowed set before changing files.
- Preserve sample shell/module order/control count/layering/card proportions when `visualMode: sampleRestore`; label any enhancements.
- Classify sample/source modules as `businessRequired`, `sampleStructure`, or `optionalEnhancement`; do not make a component `must-have` only because it appears visually.
- Embed added conclusions into existing sample-equivalent regions; do not add standalone horizontal bands unless the source has an equivalent band.
- Keep HTML-replica and custom layouts on global UI tokens for palette, typography, spacing, radius, shadows, semantic colors, and controls unless exact restoration is explicitly requested.
- Render rate/change/completion labels with `%` in Chinese UI, and use positive-red-up / negative-green-down SVG/icon semantics for change-rate indicators.
- Use stable IDs for filters, interactions, and mock records.
- Implement the data/filter/component linkage contract in the template config or custom runtime before visual polish.
- Run the template `validate:dashboard` script or equivalent custom checks to block unbound widgets, missing filter contracts, invalid action configs, and unsafe radar chart options.
- Avoid naked native `<select>` in primary filters; use Element Plus `ElSelect`/`ElTreeSelect`/`ElCascader`/`ElDatePicker` or project design-system equivalents. Fully styled native select is allowed only for baseline non-final prototypes.
- For funnel, flow, Sankey, graph, tree, decomposition, lineage, DuPont, and process-chain visuals, reserve stage/rail, node, label, gutter, value, and edge-bend space before drawing.
- Use ECharts before custom SVG/canvas for standard charts; funnel uses ECharts `funnel` or a data-driven ECharts horizontal `bar` funnel, treemap uses ECharts `treemap`, sunburst uses ECharts `sunburst`, tree/hierarchical trees use ECharts `tree` or a declared data-driven hierarchy component, and relation/network graphs use ECharts `graph` unless a custom-diagram exception is documented.
- Use AntV S2 before hand-rolled tables for analytical tables, cross tables, pivot tables, and dense metric matrices.
- Use Element Plus before hand-rolled DOM for filters, forms, buttons, tabs, tags, tooltips, popovers, dialogs, drawers, pagination, and simple operation/detail tables; reserve AntV S2 for analytical matrix/pivot/cross-table needs.
- Implement component overflow and responsive behavior from earlier stages.
- Run the self-check report and repair loop in Stage 10.4 before deployment or final handoff; start or preview the page inside the loop when runtime visual checks are needed.
- Run and verify the page when a dev server is required. Do not finish by asking the user to start the project manually.
