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
| Filter source map | `references/01-filter-reference-map.md` |
| Page/global filter visuals | `$report-component-style-design` `references/02-filter-controls.md` |
| Component-local controls | `$report-component-style-design` `references/10-in-component-controls.md` |
| Local-filter geometry | `$report-component-style-design` `references/12a-placement-foundation-controls.md` |
| Report filter/states acceptance baseline | `$report-design-system-governance` `references/06-report-filters-states-engineering-acceptance.md` |

## Workflow

1. Classify each control as page/global, module/tab scoped, component-local, or table-column scoped.
2. Define option source, default value, reset behavior, cascade rule, permission-limited options, empty/no-permission state, and backend/query ownership.
3. Place page/global filters in the page shell or template-native filter surface; place component-local filters in the component header/title-right area.
4. Check whether filter changes affect metrics, chart series, table rows, export scope, pagination, drilldown, and cache/query context.
5. Hand off testing cases to `$filter-linkage-completeness-test` when runtime verification is needed.

## Required Output

- Filter scope and ownership matrix.
- Control type, default/reset/cascade behavior, option source, and query/API impact.
- Placement rules for page/global and component-local controls.
- Runtime test handoff items when behavior must be verified.

## Quality Gate

- Do not hide a perspective switch or schema-changing view switch as an ordinary filter.
- Component-local filters cannot silently change page/global scope, export scope, backend aggregation, or other components.
- Filter controls are not ready until default, non-default, empty, no-permission, reset, and cascade states are defined or explicitly blocked.
