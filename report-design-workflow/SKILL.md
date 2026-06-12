---
name: report-design-workflow
description: "运行通用报表、仪表盘、数据大屏、页面原型的设计和可运行原型编排。用户明确提到原型、页面原型、报表原型、仪表盘原型、大屏原型、demo、样机、截图/HTML还原、mock数据原型、模板原型、可运行URL、本地预览、部署预览、Vue报表原型，且没有明确要求自助分析、指标看板、分析报告、明细报表专项 workflow 时触发；默认加载通用原型设计思路，并默认用内置报表模板和 Vue3 + TypeScript + ECharts + AntV S2 + Element Plus + axios，除非用户指定栈、现有项目权威、要求自定义/精确复刻，或模板无法满足。"
---

# Report Design Workflow

## Positioning

Use this workflow only when the user asks for a report/page/dashboard prototype, runnable demo, screenshot/HTML restoration, template-based prototype, or preview URL. It orchestrates atomic skills and keeps implementation details in the owning skills.

Default policy: load `$report-prototype-design-thinking` for the generic design-thinking layer, then use a bundled report template and `Vue 3 + TypeScript + Vite + Element Plus + ECharts + AntV S2 + axios` unless the user specifies another stack, an existing project is authoritative, exact restoration is required, or no bundled template can satisfy the requirement.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Prototype design thinking | `$report-prototype-design-thinking` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Frontend design-improvement routing | `$frontend-design-improvement-workflow` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Reusable component standards | `$report-component-design-spec` |
| Reusable design standards | `$report-design-system-governance` |
| Haier enterprise app UI standard | `$haier-enterprise-app-ui-design-spec` |
| Delivery/code versioning | `$delivery-version-management` |
| Quality gates | `$quality-gate-validation` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |

## Reference Loading

- Stage gates and modes: `references/01-workflow-modes-and-stage-gates.md`
- Default prototype design thinking: `$report-prototype-design-thinking` before display theme, report type, layout, or template decisions.
- Startup/deployment self-check: `references/02-self-check-startup-deployment.md`
- Output quality and avoid list: `references/03-output-quality-and-avoid.md`
- Display themes and pattern chain: `references/04-common-display-theme-pattern-chain.md`
- Detailed prototype implementation gates: `references/05-prototype-implementation-gates.md`
- Code-file ledger: `$delivery-version-management` `references/code-file-change-ledger.md` before code edits.
- Report anti-AI and report-decision gates: `$report-design-system-governance` relevant references for any report/dashboard/BI/detail-query/cockpit/topic-analysis/report-designer prototype.

## Workflow

1. Confirm prototype intent and mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
2. Load `$report-prototype-design-thinking` as the default generic thinking layer. Do not branch into 自助分析、指标看板、分析报告、or 明细报表 inside this workflow; those are separate workflow skills.
3. Normalize rough requirements when needed.
4. Choose one `displayTheme`, one primary report type, and a small reusable pattern-card set. Record rejected competing themes.
5. Run anti-AI and report-decision gates before layout, styling, or code.
6. Use `$report-info-component-mapping` to produce answer atoms, component bundles, datasets, filters, interactions, binding matrix, and a filter/value semantics table.
7. Decide `pageShellPath`: default `template`; use `custom` only for explicit custom/free design, exact restoration, existing shell preservation, or documented template limitation.
8. Use `$report-visual-layout-design` for shell, navigation, filter surface, grid, block sizing, responsive plan, and page规范.
9. Use `$report-prototype-template-management` for template selection/copy/validation and bundled assets.
10. Use `$report-component-style-design` and `$report-component-design-spec` for component fit, chart/table/KPI readability, and reusable component rules.
11. Apply report design-system and Haier UI baselines when in scope.
12. Before implementation or repair touches source, read/create code ledgers for every changed file; append version entries after edits.
13. Start/verify the prototype when a runnable URL is requested and route runtime findings through `$frontend-runtime-qa-validation`.

## Required Output

- Workflow mode, input inventory, prototype design-thinking output, target user/scenario/decision/action, `displayTheme`, pattern cards, report type, and core question.
- Anti-AI and report-decision gate result.
- Component/data/filter/control/interaction binding matrix.
- Filter/value semantics table with `detailValue`, `aggregateValue`, `emptyFilterValue`, display label, data-row role, query behavior, and primary-key eligibility.
- Layout plan, selected template/custom reason, filter surface mapping, perspective-layer mapping, and implementation target path.
- Files changed, code-ledger proof, verification commands, URL or blocker.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not skip `$report-prototype-design-thinking` for new prototype work unless the user provides an already structured prototype design brief.
- Do not implement before display theme, report type, binding matrix, layout, and template/custom shell decision exist.
- Do not reuse one sentinel value such as `all` for detail rows, aggregate rows, and empty/no-filter state. "All detail rows", "aggregate row", and "empty filter value" must be declared as separate semantics before implementation.
- Do not choose custom development when a bundled template can satisfy the request.
- Template-native filters and shell slots must be reused unless template-level redesign is explicitly requested.
- Standard charts must be real ECharts option/series/runtime components; S2-class analytical tables must use S2/project-equivalent behavior.
- Changed prototype source files require code-ledger read/create evidence and post-change version entries.
- Load `05-prototype-implementation-gates.md` before implementing, repairing, or accepting runnable prototypes.
