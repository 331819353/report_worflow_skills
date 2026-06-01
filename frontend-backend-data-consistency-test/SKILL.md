---
name: frontend-backend-data-consistency-test
description: "Compare frontend displayed report data with backend API responses. Use for 前后端数据一致性, 接口数据与页面展示一致, API response comparison, component field mapping, response adapters, units, precision, date format, aggregation, totals, sorting, top N, chart/table binding, mock residue, and field-level mismatch evidence."
---

# Frontend Backend Data Consistency Test

## Overview

Use this skill to verify that each API-backed report component displays the same business meaning as the backend response. The check must account for adapters, transformations, units, precision, formatting, sorting, and empty states.

## References

- Read `references/01-data-consistency-matrix-template.md` when the task needs a reusable matrix/template or standardized evidence structure.

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
   For every displayed value, identify backend field, adapter rule, unit conversion, date/period conversion, precision rule, null/empty rule, and label/legend meaning.

4. Recalculate expected values.
   Independently derive displayed KPIs, ratios, totals, subtotals, chart series, table cells, ranking, top N, and trend values from backend responses.

5. Compare component output.
   Check value equality or documented tolerance, ordering, grouping, series/category alignment, legend labels, color/category semantics, pagination counts, and table totals.

6. Check mock residue.
   Verify API-backed components do not display stale static mock values, hardcoded demo data, placeholder metric names, or prototype-only copy.

7. Check edge states.
   Validate zero, null, empty array, partial data, error response, timeout, and no-permission responses show the expected frontend state.

## Required Output

- Components checked in Z order:
- Endpoint and field mapping:
- Backend response samples:
- Expected display calculations:
- Matched values:
- Mismatched values:
- Mock residue:
- Edge-state result:
- Defects/blockers:

## Pass Criteria

- Every API-backed component has a known endpoint, request params, response fields, and display mapping.
- Frontend values match backend values after documented transformations.
- Units, precision, percentages, date formats, sorting, and totals are consistent.
- No stale mock or hardcoded demo value appears in API-backed components.
- Mismatches include enough evidence to identify whether the likely owner is frontend adapter, backend contract, data source, or documentation.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
