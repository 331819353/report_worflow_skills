---
name: filter-linkage-completeness-test
description: "Test report filter completeness and linkage. Use for 过滤功能测试, 筛选项完整性, filter option data, defaults, reset, cascades, query params, filter-to-component binding, mock option coverage, backend-supported values, pagination/sorting/drilldown/export filter inheritance, and filter interaction evidence."
---

# Filter Linkage Completeness Test

## Overview

Use this skill to verify that report filters are complete, valid, and correctly linked to backend requests and frontend components. Filters are tested as data logic, UI controls, and cross-component state.

## References

- Read `references/01-filter-linkage-matrix-template.md` when the task needs a reusable matrix/template or standardized evidence structure.

## Required Inputs

- Running frontend URL.
- Running backend URL or captured filter-related API calls.

Optional inputs: filter design documentation, API documentation, permission rules, source/Git diagnostics links, mock option data.

## Workflow

1. Inventory filters.
   List all visible and hidden filters: time, organization, region, industry, product, customer, brand, status, owner, keyword, advanced filters, saved queries, and page/tab scoped filters.

2. Verify option data.
   Check option loading, labels, values, default selected values, disabled options, permission-limited options, empty options, search options, and backend-supported enum/value coverage.

3. Verify request mapping.
   For each filter, change one value at a time and inspect backend requests. Confirm param name, location, format, encoding, multi-select behavior, date format, default omission/inclusion, and invalid value handling.

4. Verify cascades.
   Test parent-child filters such as region-city, category-product, organization-department, and period granularity. Child options must refresh and stale child values must be cleared or validated.

5. Verify component binding.
   Build a filter-to-component matrix. Confirm each filter updates intended KPI cards, charts, tables, drawers, drilldowns, exports, and route jumps while unrelated components remain stable.

6. Verify combined cases.
   Test default filters, single filter changes, combined filters, reset, all option, empty option, multi-select, date range boundaries, permission-limited values, and repeated changes.

7. Verify state persistence.
   Check whether active filters persist across pagination, sorting, tab switching, drilldown, drawer open/close, refresh, export/download, back navigation, and page jumps according to requirements.

8. Verify display after filtering.
   Confirm loading, empty, error, no-permission, and stale-selection states render correctly and do not show mixed old/new data.

## Required Output

- Filter inventory:
- Option source and completeness:
- Default/reset behavior:
- Request parameter mapping:
- Cascade behavior:
- Filter-to-component matrix:
- Combined filter cases:
- Persistence behavior:
- Defects/blockers:

## Pass Criteria

- Every filter has valid options, defaults, reset behavior, and documented request mapping.
- Filter option values are supported by backend APIs and available data or explicitly permission-limited.
- Changing filters changes the expected backend request and affected components.
- Cascades clear or refresh dependent values correctly.
- Active filters are preserved or reset consistently across interactions.
