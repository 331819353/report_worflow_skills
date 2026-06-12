---
name: report-filter-control-design-spec
description: "用于报表页面级筛选和组件内筛选控件设计规范。用户提到筛选控件规范、筛选器设计、过滤器设计、查询栏、筛选栏、筛选项、默认值、重置、级联筛选、筛选联动、组件内筛选、local filter、胶囊切换、下拉筛选、日期/组织/状态筛选、筛选太乱、筛选影响范围不清时触发；不执行筛选测试或后端接口实现。"
---

# Report Filter Control Design Spec

## Positioning

Use this as the direct front door for filter-control standards. It separates filter design from filter testing and API implementation.

Use `$filter-linkage-completeness-test` when the task is runtime testing; use this skill when designing or reviewing filter control semantics, visual placement, local/global scope, defaults, reset, cascade, and component ownership.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Filter source map | `references/01-filter-reference-map.md` |
| Page/global filter visuals | `$report-component-style-design` `references/02-filter-controls.md` |
| Component-local controls | `$report-component-style-design` `references/10-in-component-controls.md` |
| Local-filter geometry | `$report-component-style-design` `references/12a-placement-foundation-controls.md` |
| Report filter/states acceptance baseline | `$report-design-system-governance` `references/06-report-filters-states-engineering-acceptance.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name filter scope candidates, option/data authority, affected components, query/export/pagination impact, hard constraints, missing evidence, and start decision.
2. Classify each control as page/global, module/tab scoped, component-local, or table-column scoped.
3. Define option source, default value, reset behavior, cascade rule, permission-limited options, empty/no-permission state, and backend/query ownership.
4. Place page/global filters in the page shell or template-native filter surface; place component-local filters in the component header/title-right area.
5. Check whether filter changes affect metrics, chart series, table rows, export scope, pagination, drilldown, and cache/query context.
6. Convert filter rules into proof obligations when implementation or URL exists: option-source evidence, default/non-default/reset/cascade state, query/API/provider params, export/pagination/drilldown context, template/component control ownership, and screenshot/DOM evidence for placement.
7. Hand off testing cases to `$filter-linkage-completeness-test` when runtime verification is needed.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus filter scope and ownership matrix.
- Control type, default/reset/cascade behavior, option source, and query/API impact.
- Placement rules for page/global and component-local controls.
- Proof obligations: scope classification, option-source evidence, default/non-default/reset/cascade states, query/export/pagination/drilldown impact, template-native surface or component-local ownership, and runtime handoff checks.
- Runtime test handoff items when behavior must be verified.

## Quality Gate

- Do not hide a perspective switch or schema-changing view switch as an ordinary filter.
- Do not design, repair, or accept filters before filter scope, option source, default/reset behavior, and affected component/query contracts are known.
- Component-local filters cannot silently change page/global scope, export scope, backend aggregation, or other components.
- Filter controls are not ready until default, non-default, empty, no-permission, reset, and cascade states are defined or explicitly blocked.
- Template-based pages must not duplicate page/global filter surfaces. Page/global filters belong in the template-native filter trigger/panel/popover/drawer or a named redesign exception; component-local filters must prove current-component scope.
- Advisory filter wording is not enough for readiness. Scope, source, default/reset/cascade, query/API impact, export/pagination/drilldown context, and permission behavior are `MUST/fail` constraints with proof obligations.
