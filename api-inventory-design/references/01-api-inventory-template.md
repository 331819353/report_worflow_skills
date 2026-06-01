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

| API ID | Page/module | Business purpose | Method and path | Trigger | Request params | Response model | Source model dependency | Auth/permission | Pagination/sort/filter | Performance/cache/SLA | Priority | Status | Pending questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Column Rules

- `API ID`: use `API-001`, `API-002`, or keep existing stable IDs.
- `Page/module`: use the page, tab, card, table, drawer, export, or action name from requirements/prototype.
- `Business purpose`: write the decision or task this API supports.
- `Method and path`: use stable REST-like paths when no convention exists.
- `Trigger`: use controlled values from the trigger list.
- `Request params`: list path/query/body params at inventory level.
- `Response model`: use `RSP-*` or response model names from 数据模型文件.
- `Source model dependency`: use `SRC-*`, `LGM-*`, or `TBD(GAP-*)`.
- `Auth/permission`: state auth need and data scope, or `TBD(GAP-*)`.
- `Pagination/sort/filter`: state applicable rules or `none`.
- `Performance/cache/SLA`: state latency target, expected volume, cache/precompute rule, export limit, timeout/retry note, or `TBD(GAP-*)`.
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

- `ready`: request params, response model, source dependency, permission, performance/cache/SLA, and priority are clear.
- `partial`: safe assumptions exist and are linked to gap IDs.
- `blocked`: source, formula, permission, grain, response model, performance/cache/SLA, or required interaction is unknown.
