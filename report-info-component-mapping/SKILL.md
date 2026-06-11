---
name: report-info-component-mapping
description: "用于把报表业务问题映射为组件、数据集、筛选、交互和绑定矩阵。用户提到指标怎么放、业务问题怎么变组件、图表选择、组件规划、页面信息架构、组件设计规范前置、卡片/表格/图形组合、数据集设计、mock字段、筛选查询、联动状态、钻取路径、组件绑定矩阵、实现配置、页面信息架构落地时触发；不负责页面模板复制或组件视觉细节。"
---

# Report Info Component Mapping

## Core Positioning

Use this skill as the bridge from business meaning to implementable report components:

`business question -> answer atoms -> component bundle -> data model -> control semantics -> filter/query model -> interaction state -> binding matrix`

It does not choose the whole report type and does not style the component. It decides which components are needed, what data each one consumes, how filters and interactions affect them, and what validation proves the mapping.

## Reference Map

Read only the files needed for the current task. Files are ordered by workflow stage.

| Need | Read |
| --- | --- |
| Answer atoms, content blocks, chart/table/component selection | `references/01-question-component-flow.md` |
| Typical scenario bundles and component sets | `references/02-business-bundle-patterns.md` |
| Mock data, dimensions, facts, formulas, edge cases | `references/03-mock-data-modeling.md` |
| Filters, option sources, query params, permissions, linkage | `references/04-filter-scope-query.md` |
| Drilldown, cross-filtering, drawer/modal/jump/export states | `references/05-interaction-state-flow.md` |
| Implementation-ready component contracts and binding matrix | `references/06-binding-implementation-contract.md` |
| Report-type routing, layout/style constraints, output checklist | `references/07-routing-layout-quality.md` |
| Controlled vocabularies, stable IDs, deterministic generation | `references/08-generation-stability.md` |
| Detailed implementation gates for mapping decisions | `references/09-component-mapping-gates.md` |
| Number precision/display baseline | `$report-design-system-governance` `references/11-number-precision-display-rules.md` |
| Report requirement/metric/layout baseline | `$report-design-system-governance` relevant guideline references |

Loading guidance:

- For conceptual mapping, use this `SKILL.md` plus `01-question-component-flow.md`.
- For implementation-ready specs, widget configs, mock data, API-facing contracts, or generated files, `06-binding-implementation-contract.md`, `08-generation-stability.md`, and `09-component-mapping-gates.md` are mandatory.
- For report/dashboard/BI/detail-query/topic-analysis work, also apply the report decision gate from `$report-design-system-governance`.

## Workflow

1. Normalize the report theme, audience, primary question, decision, time/org/object scope, metrics, dimensions, baselines, risks, tasks, source, permissions, and acceptance target.
2. Decompose the question into answer atoms such as state, target gap, trend, structure, ranking, process, cause, anomaly, detail, action, evidence, and data trust.
3. Map answer atoms to parent blocks, optional sub-blocks, and component bundles with `must-have`, `should-have`, or `optional` priority.
4. Define data before controls: datasets, row grain, formulas, rollups, numeric display contracts, edge cases, realistic dirty-data cases, default/non-default states, empty/no-permission states, and resolver/API branch needs.
5. Classify every control as `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param`; never hide metric/schema-changing perspectives inside ordinary filters.
6. Define filter/query behavior after the data model proves it can support option data, defaults, cascades, permissions, affected components, and non-default variations.
7. Define interactions: tooltip/value reveal, cross-filter, drilldown, drawer, modal, jump, export, refresh, fullscreen, batch action, owner/action flow, and stale-state behavior.
8. Produce the binding matrix linking business question, answer atom, parent block, component, dataset, fields, formulas, controls, filters, interactions, update triggers, and validation cases.
9. Route to report-type, layout, component-style, API/model, frontend, and test skills as needed.

## Required Output

- Theme, user scenario, primary question, decision, and report-decision risks or gaps.
- Answer atom decomposition and component bundle map.
- Dataset/mock model with grain, fields, formulas, numeric display contracts, realistic edge cases, and reconciliation rules.
- Control semantics model and filter/query model.
- Interaction and state model.
- Unified binding matrix with stable IDs, controlled vocabularies, and validation cases.
- Routing notes for report type, layout, component style, API/model, frontend, and testing.

## Quality Gate

- Every component must answer a named business question and participate in a decision path.
- Primary metric-bearing components need formula/denominator, grain, period, source/freshness, numeric display contract, baseline, and owner/action notes when implementation-ready.
- Numeric display contracts must define value type, raw/display unit, display scale, precision, tooltip/export precision, rounding mode, null/zero/denominator-zero behavior, negative-zero handling, and formula precision policy before API/frontend handoff.
- Data completeness must be checked before filter binding.
- KPI totals, chart totals, table rows, drawers, exports, jumps, and refresh must share the same active context.
- Exact-value tasks need table/card/drawer support; cause-analysis tasks need decomposition support; action tasks need owner/status/closure evidence.
- Generated IDs, dataset names, filter IDs, visual types, action types, and matrix columns must follow `08-generation-stability.md`.
- Load `09-component-mapping-gates.md` before finalizing implementation-ready component contracts, mock data, or binding matrices.
