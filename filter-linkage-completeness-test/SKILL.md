---
name: filter-linkage-completeness-test
description: "用于测试报表筛选器完整性和筛选联动。用户提到筛选测试、过滤测试、筛选项完整性、筛选默认值、重置、级联、联动、查询参数、筛选到组件绑定、筛选前数据完整性、筛选项数据源、后端可选值、分页/排序/下钻/导出继承筛选、过滤条件不生效时触发；不做全量集成测试编排。"
---

# Filter Linkage Completeness Test

## Overview

Use this skill to verify that report filters are complete, valid, and correctly linked to backend requests and frontend components. Filters are tested as data logic, UI controls, and cross-component state.

## References

- Use `$delivery-artifact-template-management` when the task needs a reusable filter-linkage matrix/template or standardized evidence structure.
- Read `$quality-gate-validation` when filter linkage results are used for production acceptance or defect retest closure.

## Required Inputs

- Running frontend URL.
- Running backend URL or captured filter-related API calls.

Optional inputs: filter design documentation, API documentation, permission rules, source/Git diagnostics links, mock option data, mock/business data files, resolver code, provider samples, or database/API evidence.

## Workflow

1. Inventory filters and control semantics.
   List all visible and hidden controls, then classify each as `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param`. Filters include time, organization, region, industry, product, customer, brand, status, owner, keyword, advanced filters, saved queries, and page/tab scoped filters. Business domain, report theme, management object, subject area, and first-level perspective controls are not ordinary filters when they change metric names, component set, table headers, metric口径, or domain vocabulary.
   For component-internal `local-filter`, verify it is named/scoped as current component or declared local group only. It may update already loaded component data without a backend request; it must not change page/global scope, permission scope, backend aggregation, pagination, export scope, or unrelated components.

2. Verify data completeness before binding.
   Before judging UI linkage, confirm that every primary/global filter has enough underlying data grain to work: option rows, matching fact/business rows, required fields, default state, at least one non-default state, empty/no-permission state when relevant, and resolver/API branches for scenario-style filters such as view, snapshot date, month, period, organization, industry, status, or permission. If this fails, classify it as a data-completeness or data-grain defect first; do not mark the filter binding as pass or treat the issue as a display-only problem.

3. Verify option data.
   Check option loading, labels, values, default selected values, disabled options, permission-limited options, empty options, search options, and backend-supported enum/value coverage.

4. Verify request mapping.
   For each filter, change one value at a time and inspect backend requests. Confirm param name, location, format, encoding, multi-select behavior, date format, default omission/inclusion, and invalid value handling.

5. Verify cascades.
   Test parent-child filters such as region-city, category-product, organization-department, and period granularity. Child options must refresh and stale child values must be cleared or validated.

6. Verify component binding.
   Build a filter-to-component matrix. Confirm each filter updates intended KPI cards, charts, tables, drawers, drilldowns, exports, and route jumps while unrelated components remain stable.
   For template/config-driven pages, inspect or request evidence for `filterFields`, `requiredFilters`, API/resolver params, and `ignoredFilters`. Only judge binding after Step 2 data completeness has passed or a data gap has been explicitly recorded. An affecting filter listed in `ignoredFilters` or missing field mapping is a binding defect; single-snapshot mock/provider data, missing non-default rows, or missing resolver/API branches are data-completeness defects first.
   For component-internal local filters, confirm only the affected component/local group changes and that no page/global API/query param, export scope, pagination, or permission scope changes unless that behavior is separately specified as a global filter.

7. Verify data variation.
   For each primary filter, choose at least one non-default option and prove that an affected component's visible value, row set, series, total, or empty/no-permission state changes. Selected control state alone is not a pass.

8. Verify non-default perspectives.
   For each `perspective-switch`, switch away from the default and verify metric names, titles/summaries, table dimensions/headers, component collection, specialty metrics, risk focus, and口径 labels as well as values. If a schema-changing perspective is implemented as a normal filter, record a control-semantics defect before normal filter-linkage judgment.
   For each domain and statistical口径, verify cross-perspective consistency: navigation percentages, overview KPIs, journey cards, and chart summaries must use the same data chain. Record at least one concrete field equality assertion, such as navigation satisfaction equals current `experienceProfiles.satisfaction`.

9. Verify combined cases.
   Test default filters, single filter changes, combined filters, reset, all option, empty option, multi-select, date range boundaries, permission-limited values, and repeated changes.

10. Verify state persistence.
   Check whether active filters persist across pagination, sorting, tab switching, drilldown, drawer open/close, refresh, export/download, back navigation, and page jumps according to requirements.

11. Verify display after filtering.
   Confirm loading, empty, error, no-permission, and stale-selection states render correctly and do not show mixed old/new data.

12. Record production/retest context when applicable.
   For production-bound validation, record environment/version/account/data seed, permission role, backend/API source mode, evidence paths, defect ID when retesting, and closure criteria. Do not mark filter linkage `pass` when required filter options, backend-supported values, account permissions, or runtime evidence are missing.

## Required Output

- Filter/control inventory:
- Control semantics classification:
- Data completeness before binding:
- Option source and completeness:
- Default/reset behavior:
- Request parameter mapping:
- Cascade behavior:
- Filter-to-component matrix:
- Component-local filter scope proof:
- Data variation proof:
- Non-default perspective proof:
- Cross-perspective consistency proof:
- Combined filter cases:
- Persistence behavior:
- Production/retest context:
- Defects/blockers:

## Pass Criteria

- Every filter has valid options, defaults, reset behavior, and documented request mapping.
- Every control has a correct semantics classification, and schema-changing perspectives are not treated as ordinary filters.
- Data completeness is verified before filter binding: every affecting primary filter has matching option data, fact/business rows or API/resolver support, required fields, and at least one default plus one non-default validation case.
- Filter option values are supported by backend APIs and available data or explicitly permission-limited.
- Changing filters changes the expected backend request and affected components.
- Component-internal local filters are allowed to change only the component/local group without changing backend request params, provided they operate on already fetched bounded component data and are not standing in for page/global filtering.
- For every affecting primary filter, at least one visible affected component changes data for a non-default value, or the component is explicitly documented and tested as invariant.
- For every non-default perspective, metric names, titles/summaries, table dimensions/headers, component collection, specialty metrics, risk focus, and口径 labels update as specified.
- For every domain and statistical口径, navigation percentages, overview KPIs, journey cards, and chart summaries reconcile to the same data chain, with at least one field-level assertion recorded.
- `ignoredFilters` is not used for filters that should affect a component.
- Cascades clear or refresh dependent values correctly.
- Active filters are preserved or reset consistently across interactions.
- Production-bound pass includes environment/version/account/permission context, provider/source mode, reproducible evidence, and retest closure when applicable.
