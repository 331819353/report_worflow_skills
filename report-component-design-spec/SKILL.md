---
name: report-component-design-spec
description: "用于创建、审计、合并或沉淀可复用的报表组件设计规范/组件规范/组件设计标准。用户提到组件设计规范、组件规范、图表规范、表格规范、KPI卡规范、筛选控件规范、Analysis & Insight规范、Composite Panel规范、透视表/复杂表头规范、ECharts组件规范、AntV S2组件规范、组件库沉淀、前端组件设计标准、提高前端设计中的组件规范时触发；不替代单个组件修复、整页布局或完整报表设计系统治理。"
---

# Report Component Design Spec

## Positioning

Use this skill when the output should be a reusable component-family standard, not a one-off component repair. It packages component anatomy, data contract, placement, visual rules, states, interactions, acceptance gates, and implementation handoff into a predictable spec.

It sits between `$report-design-system-governance` and `$report-component-style-design`: governance owns the whole design system; this skill owns component-family standards; component-style owns single component execution and detailed fit rules.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Component-family source map | `references/01-component-spec-source-map.md` |
| Reusable component spec template | `references/02-component-spec-template.md` |
| Report design-system baseline | `$report-design-system-governance` relevant references |
| Detailed component family rules | `$report-component-style-design` matching references |
| Chart/table/filter standards | `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec` |
| Placement and acceptance gates | `$report-component-placement-spec` and `$report-component-style-design` `references/12-component-acceptance-gates.md` |
| Haier/company tokens and base components | `$haier-enterprise-app-ui-design-spec` for Haier/enterprise report and common-app surfaces |
| Readiness/conflict gate | `$quality-gate-validation` |

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name component-family scope, source-of-truth hierarchy, inherited baselines, affected surfaces, hard constraints, missing evidence, and start decision.
2. Define component-standard scope: component families, target report types, surfaces, libraries, devices, and source-of-truth hierarchy.
3. Load the report/common-app baseline and the smallest matching component-family references.
4. For each component family, define anatomy, required/optional slots, data contract, metric/formula/unit/source needs, interaction contract, states, accessibility, responsive behavior, and exact-value disclosure.
5. Define placement rules through `$report-component-placement-spec`: coordinate variables, slot ownership, main visual center, local-filter geometry, size tiers, fallback order, and state geometry.
6. Define visual tokens and variants as semantic rules, not one-off colors or decorative effects.
7. Add implementation handoff: ECharts/S2/Element Plus usage, config fields, API/view-model expectations, QA crops, DOM overflow checks, and version/adoption notes.
8. Run component acceptance gates and list any gaps, deprecated patterns, or project exceptions.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus scope, source-of-truth hierarchy, and inherited Haier/report baselines.
- Component-family standard matrix.
- Per-family spec: purpose, anatomy, data contract, placement, visual tokens, states, interactions, responsive behavior, accessibility, and implementation notes.
- Acceptance gates and QA evidence requirements.
- Governance fields: owner, version, status, allowed variants, deprecated patterns, exceptions, and migration notes.

## Quality Gate

- Do not write a component spec that only lists colors, font sizes, radius, and shadows.
- Do not create or accept a reusable component standard before component-family scope, source-of-truth hierarchy, inherited baseline, and implementation surface are clear.
- Do not accept a component family without business purpose, data grain, exact-value path, states, and placement rules.
- Do not accept Haier/enterprise report component standards that define report-specific rules but omit inherited Haier typography, color, spacing, radius, shadow, state, and base-control tokens.
- Do not duplicate Haier or report design-system tokens; inherit them and state only component-specific extensions.
- Do not merge page layout rules into component specs except for the component's own parent/container assumptions.
- Load `references/02-component-spec-template.md` before delivering a reusable component design spec.
