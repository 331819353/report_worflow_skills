---
name: report-design-workflow
description: "运行通用报表、仪表盘、数据大屏、页面原型的设计和可运行原型编排。用户明确提到原型、页面原型、报表原型、仪表盘原型、大屏原型、demo、样机、截图/HTML还原、HTML源码原型、mock数据原型、模板原型、可运行URL、本地预览、部署预览、Vue报表原型，且没有明确要求自助分析、指标看板、分析报告、明细报表专项 workflow 时触发；默认加载通用原型设计思路，开发过程中执行行动前自省，并默认用内置报表模板和 Vue3 + TypeScript + ECharts + AntV S2 + Element Plus + axios；HTML中的SVG/canvas标准图表只作证据，应重建为ECharts，除非用户指定栈、现有项目权威、要求自定义/精确复刻，或模板无法满足。"
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
| Code file ledgers | `$code-change-ledger-management` |
| Delivery/version index | `$delivery-version-management` |
| Delivery pipeline governance | `$report-delivery-pipeline-governance` |
| Artifact readability | `$artifact-readability-standard` |
| Environment profile contract | `$environment-profile-contract` |
| Quality gates | `$quality-gate-validation` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |

## Reference Loading

- Stage gates and modes: `references/01-workflow-modes-and-stage-gates.md`
- Preflight understanding gate: `$quality-gate-validation` `references/preflight-understanding-gate.md`
- Default prototype design thinking: `$report-prototype-design-thinking` before display theme, report type, layout, or template decisions.
- Startup/deployment self-check: `references/02-self-check-startup-deployment.md`
- Output quality and avoid list: `references/03-output-quality-and-avoid.md`
- Display themes and pattern chain: `references/04-common-display-theme-pattern-chain.md`
- Detailed prototype implementation gates: `references/05-prototype-implementation-gates.md`
- Code-file ledger: `$code-change-ledger-management` before code edits.
- Delivery pipeline handoff: `$report-delivery-pipeline-governance` when a prototype feeds technical solution, backend, frontend, testing, release, or retest work.
- Environment profile contract: `$environment-profile-contract` when a runnable URL or deployable profile is part of the handoff.
- Report anti-AI and report-decision gates: `$report-design-system-governance` relevant references for any report/dashboard/BI/detail-query/cockpit/topic-analysis/report-designer prototype.

## Workflow

1. Run the Preflight understanding gate before layout, template, styling, or code. Name the workflow mode, evidence inventory, authority order, affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm prototype intent and mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
3. Run the anti-laziness execution gate from `$quality-gate-validation` for design routing, implementation, repair, HTML restoration, QA, or handoff. Keep `LAZY-*` findings visible until evidence closes them.
4. Before each non-trivial mode, template, visual-source, component, renderer, or source-code action, run the action reflection loop from `$quality-gate-validation` `references/preflight-understanding-gate.md`; revise or stop when the action fails hard constraints or design reasonableness.
5. Load `$report-prototype-design-thinking` as the default generic thinking layer. Do not branch into 自助分析、指标看板、分析报告、or 明细报表 inside this workflow; those are separate workflow skills.
6. Normalize rough requirements when needed.
7. Choose one `displayTheme`, one primary report type, and a small reusable pattern-card set. Record rejected competing themes.
8. Run anti-AI and report-decision gates before layout, styling, or code.
9. Use `$report-info-component-mapping` to produce answer atoms, component bundles, datasets, filters, interactions, binding matrix, and a filter/value semantics table.
10. Decide `pageShellPath`: default `template`; use `custom` only for explicit custom/free design, exact restoration, existing shell preservation, or documented template limitation.
11. If HTML/source is provided, classify any SVG/canvas/DOM chart marks as sample evidence, not standard-chart implementation. Standard charts must be rebuilt with ECharts/data-driven options unless an explicit custom-diagram exception is documented.
12. Use `$report-visual-layout-design` for shell, navigation, filter surface, grid, block sizing, responsive plan, and page规范.
13. Use `$report-prototype-template-management` for template selection/copy/validation and bundled assets.
14. Route chart, table, filter, component-placement, and reusable component work to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, `$report-component-placement-spec`, or `$report-component-design-spec` whenever those surfaces are affected.
15. Use `$report-component-style-design` and `$report-component-design-spec` for component fit, chart/table/KPI readability, and reusable component rules.
16. Apply Haier UI as the company-level application baseline for Haier/enterprise report pages, then apply report design-system rules as report-specific extensions. Skip Haier baseline only for explicit non-Haier/native sample/neutral brand decisions.
17. Before implementation or repair touches source, read/create code ledgers for every changed file through `$code-change-ledger-management`; append version entries after edits.
18. Start/verify the prototype when a runnable URL is requested and route runtime findings through `$frontend-runtime-qa-validation`.
19. For handoff artifacts, apply `$artifact-readability-standard` and `$report-delivery-pipeline-governance` so downstream technical solution, backend, frontend, and testing workflows know the entry conditions.

## Required Output

- Workflow mode, Preflight understanding matrix, input inventory, prototype design-thinking output, target user/scenario/decision/action, `displayTheme`, pattern cards, report type, and core question.
- Action reflection checkpoints for non-trivial mode/template/component/renderer/source-code decisions, especially when HTML/source samples are used.
- Anti-laziness execution result: local/source evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Affected-surface to owning-skill routing, including chart/table/filter/component-placement/design-system skills when applicable.
- Anti-AI and report-decision gate result.
- Component/data/filter/control/interaction binding matrix.
- Filter/value semantics table with `detailValue`, `aggregateValue`, `emptyFilterValue`, display label, data-row role, query behavior, and primary-key eligibility.
- Layout plan, selected template/custom reason, filter surface mapping, perspective-layer mapping, baseline inheritance decision, and implementation target path.
- Files changed, code-ledger proof, verification commands, URL or blocker.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not skip `$report-prototype-design-thinking` for new prototype work unless the user provides an already structured prototype design brief.
- Do not start implementation, repair, layout, or template copying before the Preflight understanding gate has a `ready-to-start` or bounded `partial-start` decision.
- Do not continue from the initial preflight into implementation on autopilot. Non-trivial template, component, renderer, data, layout, HTML conversion, and readiness actions require action reflection; revise or stop when the action conflicts with constraints or design reasonableness.
- Do not treat Haier UI and report design-system baselines as alternatives for Haier/enterprise report pages; inherit Haier application tokens/base controls and then apply report-specific rules.
- Do not rely only on this top-level workflow when a chart, table, filter, component-placement, or reusable component standard is affected; route to the specific front-door skill before implementation or acceptance.
- Do not implement before display theme, report type, binding matrix, layout, and template/custom shell decision exist.
- Do not reuse one sentinel value such as `all` for detail rows, aggregate rows, and empty/no-filter state. "All detail rows", "aggregate row", and "empty filter value" must be declared as separate semantics before implementation.
- Do not choose custom development when a bundled template can satisfy the request.
- Template-native filters and shell slots must be reused unless template-level redesign is explicitly requested.
- Standard charts must be real ECharts option/series/runtime components; S2-class analytical tables must use S2/project-equivalent behavior.
- HTML-provided SVG/canvas/DOM chart marks are visual/source evidence only. Do not copy or keep them as standard chart implementation; rebuild standard charts as ECharts data-driven components unless a named custom-diagram exception is approved.
- Changed prototype source files require code-ledger read/create evidence and post-change version entries.
- Do not mark prototype/design work ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, available local evidence was not inspected, or the conclusion only says "optimized/looks good/implemented" without proof.
- Load `05-prototype-implementation-gates.md` before implementing, repairing, or accepting runnable prototypes.
