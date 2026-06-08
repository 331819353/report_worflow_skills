---
name: data-transformation-adapter-design
description: "用于设计和校验数据从源头到消费端的转换与适配逻辑。用户提到字段映射、源表到响应、上游到API、mock到数据库、response adapter、响应适配、筛选前数据完整性、筛选数据粒度、嵌套拉平、枚举翻译、单位/精度/日期转换、百分比/比例显示、汇总聚合、粒度转换、公式派生、null默认值、组件view model、前后端结构不一致时触发。"
---

# Data Transformation Adapter Design

## Positioning

Use this skill when source data, API response data, and UI view models do not naturally match. It covers both backend transformation and frontend response adapters, while keeping their boundaries explicit.

Backend transformation owns source-to-API correctness. Frontend adapter owns provider-payload-to-UI-model stability.

## Reference Loading

- Backend boundary, source-to-target mapping, required/default fields: `references/backend-boundary-and-mapping.md`
- Time conversion, aggregation, formula, ranking, totals, reconciliation: `references/backend-time-aggregation-derivation.md`
- Backend implementation and verification notes: `references/backend-implementation-and-verification.md`
- Frontend adapter placement: `references/frontend-adapter-placement-patterns.md`
- Frontend mapping resilience: `references/frontend-mapping-resilience-rules.md`
- Adapter output template: `references/frontend-adapter-output-template.md`

## Workflow

1. Identify source payload, target API contract, and UI/view model contract.
2. Define grain, required fields, optional fields, defaults, null behavior, precision, units, enum dictionaries, date/time formats, and locale labels.
3. For rate/percentage/change fields, keep calculation value, display value, display unit, rounding, and label wording explicit. Chinese report UI display values should render `%` for rates unless the user or contract intentionally requires another term.
4. Decide execution boundary: SQL/source query, backend service/DTO, API gateway/BFF, frontend adapter, or component-local display formatting.
5. Verify filter data support before adapter binding.
   For every filter that should affect the transformed output, define option source, input param, source/provider field, row grain, required fields, default example, non-default example, empty/no-permission example when relevant, and resolver/API branch behavior. If the source only has one default snapshot, classify it as a data-completeness gap before designing UI binding or adapter-side filtering.
6. Specify transformations: rename, flatten, group, aggregate, derive, rank, sort, paginate, reconcile, mask, filter, and permission scope.
7. Provide representative before/after examples and edge cases.
8. Define verification cases for default, filtered, empty, abnormal, missing, permission-limited, and large-result states.

## Required Output

- Source contract, target contract, and owner boundary.
- Field mapping table with formulas, units, precision, enums, defaults, and required status.
- Transformation/adaptation rules and examples.
- Filter data support proof before binding: option source, row grain, default/non-default examples, fields, and resolver/API branch coverage.
- Verification cases and unresolved gaps.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not hide business aggregation, global filtering, pagination, or permission scope inside a frontend adapter unless explicitly bounded.
- Do not let backend publish fields whose source, formula, enum, or unit is unknown.
- Adapter output must keep component view models stable or document the exact refactor.
- Examples must prove the transformation for at least one non-default case when filters or formulas matter.
- Do not claim a filter-aware adapter is ready until data completeness is proven first; missing non-default rows, fields, option data, or resolver/API branches are data gaps.
- Do not collapse raw numeric values and formatted display strings into one ambiguous field when downstream calculations, sorting, tooltips, exports, or tests need the original value.
- Do not use a frontend adapter to fake filter variation over one default snapshot; add provider/resolver branches, query params, or row grain that proves non-default states.
