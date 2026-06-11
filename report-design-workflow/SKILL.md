---
name: report-design-workflow
description: "运行报表、仪表盘、数据大屏、页面原型的设计和可运行原型编排。用户明确提到原型、页面原型、报表原型、仪表盘原型、大屏原型、demo、样机、截图/HTML还原、mock数据原型、模板原型、可运行URL、本地预览、部署预览、Vue报表原型时触发；默认使用内置报表模板和 Vue3 + TypeScript + ECharts + AntV S2 + Element Plus + axios 技术栈，除非用户指定其他栈、现有项目已有技术栈、要求自定义开发/精确复刻，或模板能力无法满足；不用于纯需求梳理、纯API/后端/前端生产联调或单独样式规范。"
---

# Report Design Workflow

## Positioning

Use this workflow only when the user asks for a report/page/dashboard prototype, runnable demo, screenshot/HTML restoration, template-based prototype, or preview URL. It orchestrates atomic skills and keeps implementation details in the owning skills.

Default runnable prototype policy:

- Use `pageShellPath: template` by default and select one bundled report template by scenario.
- Use `pageShellPath: custom` only when the user explicitly asks for custom/free design, explicitly asks for exact screenshot/HTML/source restoration, provides an existing shell that must be kept, or a documented requirement cannot be met by any bundled template.
- If the user gives a loose sample/reference without asking for exact restoration, treat it as hierarchy, density, and tone evidence, then choose the closest bundled template.
- Unless the user specifies another stack or the existing project already uses another stack, implement runnable prototypes with Vue 3 single-file components + TypeScript + Vite + Element Plus + ECharts + AntV S2 + axios.
- Install/use AntV S2 only for S2-class analytical tables such as pivot tables, cross tables, frozen headers, dense comparison grids, or wide metric matrices.
- If selecting a template with `nav[]`, such as `left-nav-analytics-workbench-template` or `frozen-title-sci-fi-cockpit-template`, redesign the content into multiple substantial nav pages. Do not choose a navigation template and implement only a homepage.
- When using a bundled template, map requirement-document title, filter, navigation, toolbar, and shell-layout intent into the template's existing slots and config. Do not recreate the requirement document's shell structure when it conflicts with the selected template.
- When using a bundled template with filter functionality, do not generate a separate filter toolbar, persistent filter bar, or extra filter drawer. A requested "main filter bar" becomes template `filters[]`, native trigger/panel/popover/drawer behavior, local title-band filters, and filter-to-widget/API/resolver bindings.
- Template-native filter surfaces carry horizontal constraints only. Business domain, report theme, management object, subject area, and first-level analysis perspective belong in navigation, tabs, routes, segments, or an explicit perspective layer when they change metrics, components, table schema,口径, or domain wording.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Reusable design standards | `$report-design-system-governance` |
| Haier enterprise app UI standard | `$haier-enterprise-app-ui-design-spec` |
| Quality gates | `$quality-gate-validation` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |

## Reference Loading

- For every report prototype design, specification, implementation, optimization, or repair, load `references/04-common-display-theme-pattern-chain.md` before component mapping. It supplies the six display themes, the 120-card pattern catalog, and the ten-stage prototype-to-development chain.
- The display theme is a page-form axis, not a replacement for `$report-type-design`. Carry both `displayTheme` and primary report type into the binding matrix.
- For every prototype design, implementation, optimization, or repair that touches layout, copy, styling, frontend implementation, or QA, load `$report-design-system-governance` `references/08-anti-ai-design-gate.md` and keep its result in the handoff/readiness notes.
- For every report/dashboard/BI/detail-query/cockpit/topic-analysis/report-designer prototype, load `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` and keep its result in the handoff/readiness notes.
- Load `references/01-workflow-modes-and-stage-gates.md` for stage sequencing, `references/02-self-check-startup-deployment.md` for runnable verification, and `references/03-output-quality-and-avoid.md` for output and QA gates as needed by the request.

## Reinforced Constraints

- When multiple artifacts influence the prototype, run `$quality-gate-validation` before locking scope, visual source, API/mock contract, or implementation target. Unresolved high-impact conflicts keep the affected scope `partial` or `blocked`.
- Before implementation, lock one workflow mode, one `displayTheme`, one primary report type, one selected reusable pattern set, one `pageShellPath`, one template/custom reason, and one writable target path. Add brand/visual mode decisions when branding, restoration, or cockpit style is in scope.
- Do not confuse display theme with report business type. For example, a monitoring-alert display theme may still have `primaryReportType: anomaly-monitoring`, while a management-report display theme may still carry review-recap or reconciliation-traceability evidence blocks.
- Selected pattern cards must trace into the component/data/filter/control/interaction binding matrix, API/mock handoff, or acceptance cases. Do not list pattern names as inspiration only.
- The workflow must resist AI-looking output: generic "现代/高级/科技感" aesthetics, empty slogans, interchangeable assets, screenshot-only completion, missing states, missing accessibility, and sample-like engineering are blockers for `ready` unless explicitly approved as scoped exceptions.
- The workflow must also resist report-specific AI-looking output: generic metrics, dashboard-template layout, decorative charts, no data story, too-clean mock data, static filters, missing drilldown/detail/action, missing口径/source/freshness, no industry sense, and report-designer shells without data-binding behavior.
- The first meaningful viewport must answer one named business question. Every must-have component, dataset, filter, and interaction must appear in the binding matrix before visual polish or code.
- Template selection and asset copying belong to `$report-prototype-template-management`; page shell/grid fit belongs to `$report-visual-layout-design`; component readability belongs to `$report-component-style-design`.
- The default Vue/ECharts prototype stack means standard charts are implemented with real ECharts options and series. Do not accept a prototype that only installs/imports ECharts while drawing standard chart marks with hand-authored SVG/HTML/CSS/canvas; use a named custom-diagram exception only when ECharts is not the intended renderer.
- For every report, dashboard, cockpit, BI, data-screen, or analysis prototype workflow, load `$report-design-system-governance` report guideline references as the report-specific baseline before page layout, component styling, frontend implementation, QA, or acceptance planning. This applies even when the user did not say "规范".
- When the report prototype also contains common enterprise app shell, navigation, forms, dialogs, or cross-platform application surfaces, load `$haier-enterprise-app-ui-design-spec` as the company-level token/component/layout baseline. Do not duplicate those tokens inside report-specific skills.
- Data completeness is checked before filter binding after implementation or repair. Required rows/options/fields/default and non-default states/resolver branches must exist before `filterFields`, `requiredFilters`, API params, or resolver params can be accepted as working.
- A primary/global filter is not accepted until affected components have filter-field/query/resolver binding and non-default filter values prove visible data changes. Selected-state-only behavior is a failed prototype.
- In template mode, filter design is a shell-config and binding problem, not permission to add a new filter toolbar. Only explicit template-level redesign may add a new persistent filter surface.
- In template mode, the native `filters[]` contract must not be used to hide first-level perspective switching. Domain/theme/management-object controls must be modeled as nav/page/tab/segment/route/perspective state unless the binding matrix proves `componentSchemaImpact: row-scope-only`.
- Template `8 * N` validation covers top-level parent blocks only. A parent block may contain internal sub-blocks and components; those internals, summary text areas, nested KPI grids, chart/table sub-blocks, and small metric cells must pass `$report-visual-layout-design` composition rules and `$report-component-style-design` fit rules.
- Missing API, model, field, formula, source, permission, or acceptance facts must be recorded as assumptions or gaps. Do not implement unsupported behavior as final prototype logic.
- When the prototype feeds technical solution, produce a handoff bundle: component binding, mock/data-source contract, filter contract, interaction payload, data/model assumptions or gaps, and readiness value.

## Workflow

1. Confirm prototype intent and choose mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
2. Normalize rough requirements with `$report-requirement-structure-extraction` when scope, users, metrics, screenshots, HTML, or acceptance rules are unclear.
3. Classify the six-way `displayTheme` and select a small reusable pattern set from `references/04-common-display-theme-pattern-chain.md`; record rejected competing themes.
4. Run the anti-AI design gate from `$report-design-system-governance` before layout/styling: record product context, real content, forbidden visual defaults, copy specificity, states, accessibility, and engineering readiness.
5. Run the report decision anti-AI gate from `$report-design-system-governance`: record five decision-question answers, metric tree, metric dictionary completeness, data story, realistic data, linkage, trust/action details, and industry/report-designer checks.
6. Run `$quality-gate-validation` when inputs conflict on scope, display theme, metric口径, visual source, API/mock contract, or implementation target.
7. Use `$report-type-design` to choose one primary report type and any secondary local blocks.
8. Use `$report-info-component-mapping` to produce answer atoms, selected pattern-to-component mapping, component bundles, datasets, filters, interactions, and binding matrix.
9. Declare `pageShellPath` as `template` or `custom`; default to `template` when no hard custom/restoration/existing-shell reason exists.
10. Use `$report-visual-layout-design` for page shell, header/navigation/native filter surface, `8 * N` grid, block sizing, and responsive layout.
11. Use `$report-prototype-template-management` for default bundled-template selection, copy/merge, Vue/Vite scaffold handling, and template validation.
12. Use `$report-component-style-design` for KPI/cards/charts/tables/drawers/complex-diagram style and readability.
13. Apply `$report-design-system-governance` report guideline references as the default report baseline for metrics, charts, tables, filters, states, engineering handoff, and acceptance.
14. Apply `$haier-enterprise-app-ui-design-spec` when the prototype also includes common enterprise app UI tokens, component rules, scene templates, or cross-platform adaptation.
15. Implement or repair the prototype in the selected target path when requested.
16. Run build/start/visual QA when a runnable URL is requested and route findings through `$frontend-runtime-qa-validation`.

## Required Output

- Workflow mode and input inventory.
- `displayTheme`, selected reusable pattern cards, rejected competing themes, primary report type, and core question.
- Anti-AI design gate result: `antiAiRisk`, cause IDs, visual cliché scan, copy specificity, state/accessibility coverage, and approved exceptions.
- Report decision anti-AI gate result: `reportDecisionRisk`, `RPT-*` causes, five decision-question answers, metric tree, data story path, realistic data proof, linkage proof, trust/action details, and industry/report-designer checks.
- Parent-block/sub-block/component/data/filter/control/interaction binding matrix with `controlSemantics` and `componentSchemaImpact`.
- Layout plan, parent `8 * N` grid, internal sub-block plan when used, `pageShellPath`, selected template/custom reason, filter surface mapping, nav-page content plan when a template with `nav[]` is selected, and default-stack override reason if any.
- Perspective-layer mapping when the report has multiple domains, themes, management objects, subject areas, or first-level views.
- Prototype-to-technical handoff bundle when the output will feed API/model/backend/frontend work.
- Files changed or created when implementation is requested.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.
- Verified URL, screenshot/QA evidence, or exact blocker.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not start implementation before display theme, selected pattern set, report type, binding matrix, layout, and template/custom shell decision exist.
- Do not choose or retain pattern cards that have no mapped component, control, dataset/API, interaction, or acceptance case.
- Do not claim readiness when unresolved AI-looking causes remain on primary surfaces: thin context, generic copy, generic SaaS/AI visuals, first-screen-only completion, missing states, missing accessibility, or sample-like engineering.
- Do not claim readiness when unresolved report decision causes remain: generic metric shell, no metric tree/口径, no data story, decorative charts, too-clean mock data, static filters, no drilldown/action, no trust details, no industry sense, or incomplete report-designer behavior.
- Do not default to custom development merely because the user omitted visual style; select a bundled template unless a hard custom/restoration/existing-shell/template-limitation reason exists.
- Do not use a non-Vue3/TypeScript/Vite/Element Plus/ECharts/axios stack for runnable prototypes unless the user specifies it or the existing project requires it.
- Do not select a navigation/sidebar template unless the content is reorganized into multiple meaningful nav pages, each with enough components, data, and interactions to stand on its own.
- Do not create a second title area, filter bar, sidebar, navigation layer, or toolbar inside an existing template because the requirement document showed one; adapt labels, options, defaults, and behavior through template config unless a template-level redesign is explicitly requested.
- Do not satisfy "筛选工具栏" or "主筛选栏" by rendering a new visual bar in bundled templates. Use the template's native filter entry and `filters[]` contract.
- Do not put business domain, report theme, management object, subject area, or first-level perspective into ordinary template filters when it changes metric names, component set, table headers, metric口径, or domain wording.
- Do not claim filter linkage is implemented when data completeness was not checked first, or when the only available data is a single default snapshot for an affecting filter.
- Do not keep template engineering inside layout; template work belongs to `$report-prototype-template-management`.
- Do not claim a runnable prototype satisfies the ECharts stack when standard charts are hand-drawn with SVG/HTML/CSS/canvas. ECharts SVG renderer is valid only when generated through ECharts options; manually encoded bars, lines, pies, gauges, axes, or maps fail readiness.
- Do not claim runnable delivery without build/start/visual evidence or a precise blocker.
