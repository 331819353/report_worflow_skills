---
name: frontend-backend-data-consistency-test
description: "用于核对前端页面展示数据与后端/API返回是否一致。用户提到前后端数据一致性、页面数据核对、接口返回与图表/表格不一致、字段映射、响应适配、单位精度、日期格式、汇总口径、合计、排序、TopN、筛选后数据、mock残留、组件绑定错误、联调验收时触发；不负责通用契约设计。"
---

# Frontend Backend Data Consistency Test

## Overview

Use this skill to verify that each API-backed report component displays the same business meaning as the backend response. The check must account for adapters, transformations, units, precision, formatting, sorting, and empty states.

## References

- Use `$delivery-artifact-template-management` when the task needs a reusable data-consistency matrix/template or standardized evidence structure.

## Required Inputs

- Running frontend URL.
- Running backend URL or API calls captured from the browser.
- API documentation or backend response samples when available.

Optional inputs: source/Git diagnostics links, mock data files, metric definitions, expected rounding and unit rules.

## Workflow

1. Build a component inventory.
   Traverse the page in Z-shaped reading order. List KPI cards, charts, tables, drawers, tabs, drilldowns, exports, and hidden components that load data.

2. Capture API evidence.
   For each component, record endpoint, method, request params, active filters, response payload, status code, and timing. Capture adapter output if the frontend exposes it or if it can be inferred.

3. Map fields to display.
   For every displayed value, identify backend field, adapter rule, raw scale, display scale, unit conversion, date/period conversion, precision rule, null/empty rule, and label/legend meaning. Rate/change/completion fields in Chinese report UI should visibly use `%` unless the accepted contract says otherwise.

4. Recalculate expected values.
   Independently derive displayed KPIs, ratios, totals, subtotals, chart series, table cells, ranking, top N, and trend values from backend responses.

5. Compare component output.
   Check value equality or documented tolerance, ordering, grouping, series/category alignment, legend labels, color/category semantics, pagination counts, and table totals.

6. Prove filter-bound data changes.
   For every primary/global filter that should affect a component, capture a default and non-default state. Selected control state alone is not a pass; visible value, row set, series, total, API payload, or adapter output must change or the component must be documented as invariant.

7. Check mock residue.
   Verify API-backed components do not display stale static mock values, hardcoded demo data, placeholder metric names, or prototype-only copy.

8. Check edge states.
   Validate zero, null, empty array, partial data, error response, timeout, and no-permission responses show the expected frontend state.

## Required Output

- Components checked in Z order:
- Endpoint and field mapping:
- Backend response samples:
- Expected display calculations:
- Matched values:
- Mismatched values:
- Filter-state proof:
- Mock residue:
- Edge-state result:
- Defects/blockers:

## Pass Criteria

- Every API-backed component has a known endpoint, request params, response fields, and display mapping.
- Frontend values match backend values after documented transformations.
- Units, precision, percentages, date formats, sorting, and totals are consistent.
- Visible Chinese report rate/change/completion labels use `%`, not `pt`, `p.p.`, or `percentage point`, unless that wording is explicitly required.
- Affected components show real data variation for non-default filter states, or are explicitly scoped as invariant.
- No stale mock or hardcoded demo value appears in API-backed components.
- Mismatches include enough evidence to identify whether the likely owner is frontend adapter, backend contract, data source, or documentation.
