# API Inventory Template

Use this exact table for API清单.

## Document Metadata

| Field | Value |
| --- | --- |
| Document version | TBD(GAP-*) |
| Updated at | TBD(GAP-*) |
| Owner | TBD(GAP-*) |
| Decision source | TBD(GAP-*) |
| Overall status | partial |
| Gap IDs | TBD(GAP-*) |

## API Inventory Table

| API ID | Page/module/component | Business purpose | Method and path | Trigger | Request params | Response model | Source model dependency | Auth/permission | Pagination/sort/filter | Filter/sort/page execution stage | SQL/index strategy | Frontend compute policy | Performance/cache/SLA | Priority | Status | Pending questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Column Rules

- `API ID`: use `API-001`, `API-002`, or keep existing stable IDs.
- `Page/module/component`: use the page, tab, and concrete data-bearing component or interaction name from requirements/prototype. Prefer one API row per component unless the endpoint splitting rules justify a component group.
- `Business purpose`: write the decision or task this API supports.
- `Method and path`: use stable REST-like paths when no convention exists.
- `Trigger`: use controlled values from the trigger list.
- `Request params`: list path/query/body params at inventory level.
- `Response model`: use `RSP-*` or response model names from 数据模型文件.
- `Source model dependency`: use `SRC-*`, `LGM-*`, or `TBD(GAP-*)`.
- `Auth/permission`: state auth need and data scope, or `TBD(GAP-*)`.
- `Pagination/sort/filter`: state applicable rules or `none`; distinguish global/page-level filters from component-internal local filters.
- `Filter/sort/page execution stage`: state source/provider/repository/precompute execution for global filters, sorting, pagination, ranking, grouping, aggregation, Top/Bottom, and counts. Use `TBD(GAP-*)` when unknown. Do not use `ready` when the plan depends on full-materialize-then-filter behavior. Component-internal filters may be `bounded-local` only when they operate on the already fetched component dataset.
- `SQL/index strategy`: for database-backed APIs, state SQL pushdown scope and index-friendly predicates for filters/sorts, such as `org_id = ?`, `biz_date >= ? AND biz_date < ?`, or `TBD(GAP-*)`; use `none` when not database-backed.
- `Frontend compute policy`: state `component-ready`, `format-only`, or `TBD(GAP-*)`. Use `component-ready` when the backend/API returns the fields, totals, series, ranking, pagination, and formulas needed by that component. Use `format-only` only when the frontend is limited to display formatting, enum labels, null handling, or trivial unit presentation.
- `Performance/cache/SLA`: state latency target, expected volume, Redis/cache/precompute rule, database connection-pool behavior, export limit, timeout/retry note, or `TBD(GAP-*)`.
- `Priority`: `P0`, `P1`, or `P2`.
- `Status`: `ready`, `partial`, or `blocked`.
- `Pending questions`: list `GAP-*` IDs and one short question.

Required cells must not be blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.

## Controlled Trigger Values

- `initial-load`
- `filter-change`
- `drilldown`
- `export`
- `action`
- `scheduled`

## Priority Rules

- `P0`: needed for first usable page, first-screen conclusion, required dynamic filters, required detail, or required permission behavior.
- `P1`: important drilldown, secondary chart/table, normal export, or advanced filter.
- `P2`: enhancement, optional export, non-core action, or future expansion.

## Status Rules

- `ready`: request params, response model, source dependency, permission, filter/sort/page execution stage, SQL/index strategy when database-backed, frontend compute policy, performance/cache/SLA, and priority are clear.
- `partial`: safe assumptions exist and are linked to gap IDs.
- `blocked`: source, formula, permission, grain, response model, filter/sort/page execution stage, SQL/index feasibility, frontend compute policy, performance/cache/SLA, or required interaction is unknown.
