---
name: api-inventory-design
description: "用于在开发前把需求、指标、原型、mock数据、数据源或前端页面梳理成API清单/接口规划。用户提到接口清单、API清单、接口规划、接口拆分、后端好开发、后端复用、接口复用、快照接口、snapshotDate/dataVersion/loadBatch、接口依赖、页面需要哪些接口、mock转接口、需求转API、方法路径、请求参数、响应模型、筛选分页排序、筛选前数据完整性、默认后端技术栈、Python/Flask/连接池/Redis、鉴权、接口优先级时触发；只做清单规划，不写完整API文档或后端代码。"
---

# API Inventory Design

## Core Positioning

Use this as a reusable artifact skill when the required deliverable is an API清单 rather than full API documentation, backend code, frontend code, or test cases.

The inventory is a planning and alignment artifact. It defines the API surface, model dependency, request scope, response model names, and unresolved questions. It can be used by 技术方案, 数据服务, 前端联调, backend implementation, and testing workflows. Detailed request/response examples belong to downstream API documentation when that deliverable is requested.

## Inputs

- Requirements or page/module descriptions.
- Metric list and dimension/filter definitions.
- 数据模型文件 or source metadata, if available.
- Prototype data code, mock/display data, TypeScript types, data-source registry, or component field usage. If the inventory will feed backend/API implementation with simulated data, plan a SQLite fixture database rather than a JSON data source.
- Existing API notes or backend constraints, if provided.

## Reference Map

Read only the reference files needed for the current task:

| Need | Read |
| --- | --- |
| Produce the exact API清单 table and required columns | `$delivery-artifact-template-management` |
| Decide endpoint boundaries, common endpoint patterns, and when to split or merge APIs | `references/02-endpoint-patterns-and-splitting.md` |
| Define inventory-level request params, response model references, auth, pagination, sorting, filters, exports, and actions | `references/03-request-response-auth-rules.md` |
| Design APIs that make backend implementation simple, efficient, and reusable | `references/05-backend-friendly-api-design.md` |
| Run API traceability, status, no-invention, and gap-linking checks | `references/04-api-stability-gate.md` |
| Resolve authority conflicts when requirements, prototype data code, existing APIs, source metadata, or testing evidence disagree | `$quality-gate-validation` |
| Audit whether endpoint boundaries and API inventory design reasonably support the business question, UI contract, data model, permissions, and tests | `$quality-gate-validation` |

Loading guidance:

- For any generated or updated API清单, load the API inventory template from `$delivery-artifact-template-management` plus the three local references below.
- For a quick endpoint review, read `02-endpoint-patterns-and-splitting.md`, `05-backend-friendly-api-design.md`, and `04-api-stability-gate.md`.
- For export, action, permission, pagination, or dynamic filter APIs, `03-request-response-auth-rules.md` is mandatory.

## Workflow

0. Check source authority.
   When multiple artifacts influence the inventory, identify which source owns business scope, visible UI needs, existing API behavior, source model facts, and testing evidence. If artifacts conflict on endpoint scope, request params, response fields, metric grain, permission, or API availability, record `ENTRY-*` findings instead of silently choosing one.

1. Build page and module coverage.
   List every page, tab, card, chart, table, drawer, export, drilldown, filter option, and action that needs data.

2. Identify data access patterns.
   Separate summary KPIs, trends, rankings, lists, analytical tables, detail drawers, filter options, exports, and operational actions. Avoid forcing all data into one endpoint when grain, refresh, filters, or permissions differ.

3. Define endpoint candidates.
   For each API, state method, path, page/module, purpose, trigger, request source, response model, source model dependency, auth need, cache/performance/SLA expectation, priority, and status.

3a. Assign backend reuse patterns.
   For every production-bound or repeated endpoint, classify the backend implementation family: `metadata`, `filter-options`, `query`, `dashboard/snapshot`, `export`, `action`, or `health/status`. Record which common request model, response envelope, query context, permission service, cache/precompute family, pagination/export flow, or formatter can be reused. Mark `DESIGN-*` when an endpoint would require a one-off controller/query without a clear reason.

4. Define request contracts at inventory level.
   Capture path/query/body params, filters, period format, organization scope, pagination, sorting, keyword search, drilldown params, export params, and default values. Separate client-supplied params from backend-defaulted params and backend-injected permission/data-scope params.

5. Define data-version and endpoint dependency contracts.
   When a report has snapshot/latest-period semantics, first classify the snapshot role: overview-only payload, canonical/shared snapshot dataset, reusable response for a bounded component group, or local/demo artifact. State which endpoint or metadata source exposes `snapshotDate`, `latestPeriod`, `loadBatch`, `dataVersion`, or equivalent fields, and require every related snapshot, metrics, trend, ranking, table, export, and health API to consume the applicable data-version and scope values as backend query context or to explicitly reuse the declared snapshot dataset. Define whether each value is client-supplied, backend-defaulted, or backend-injected from auth/permission. Do not leave metrics/trend/table dependency on `/snapshot`, controller-level memory, or previous frontend call order implicit. Each data-bearing API must either filter its own source/logical model, repository query, precompute table, or Redis key with the shared version context and correct business/permission scope, or document that it derives from the canonical snapshot and why the grain/scope/version match.

6. Define filter data support at inventory level.
   Before marking filter-bearing APIs ready for downstream implementation, capture option source, source/provider execution stage, required fields, row grain, default state, non-default state, empty/no-permission state when relevant, and resolver/API branch need. Record a `GAP-*` when the planned API can only produce one default snapshot for an affecting filter.

7. Define response contracts at inventory level.
   Reference a response model name and summarize required field groups, grain, list/envelope shape, empty state, and error behavior. Do not duplicate the full API document here.

8. Mark gaps.
   If an endpoint depends on unknown data models, formulas, enums, filter options, permission rules, or owner decisions, record the gap in the pending column with a stable `GAP-*` ID, impact, owner question, and blocking status.

9. Run the design reasonableness gate.
   Check whether endpoint boundaries, split/merge choices, response model references, request params, dynamic options, exports, actions, auth, and performance notes reasonably support the consuming page and tests. Record unreasonable API inventory choices as `DESIGN-*` findings.

## Hard Constraints

- Each API must trace to a visible page need, interaction, export, dynamic option, or system action.
- Do not turn conflicting artifacts into endpoint assumptions; unresolved `P0`/`P1` authority conflicts keep affected APIs `partial` or `blocked`.
- Each API must trace to one response model and at least one source/logical model unless explicitly pending.
- Filter option APIs are first-class APIs when options are dynamic, permission-limited, cascaded, or source-driven.
- Export APIs must state whether they reuse list filters and whether they return file streams, task IDs, or async download links.
- Mutation/action APIs must define idempotency, permission, success state, failure state, and audit need.
- Do not create "万能接口" that mixes unrelated grains, permission scopes, or refresh cadences.
- Do not create one-off endpoint shapes when a reusable backend pattern fits. A custom route is acceptable only when the inventory states why common metadata/filter/query/export/action patterns do not apply.
- Do not keep an API inventory shape that is traceable but unreasonable. Use `DESIGN-*` findings for endpoint grouping, grain, filter, permission, export, action, or performance choices that would make downstream implementation or frontend integration awkward or incorrect.
- Do not make one data-bearing API a hidden runtime prerequisite for another. A snapshot/dashboard aggregate API can provide first-screen component data, data-version metadata, and even a canonical shared dataset when the contract says so. Metrics/trends/rankings/tables/drilldowns/exports may reuse that snapshot only when the inventory records the source role, grain, filters, permission scope, data-version params, cache key, and invalidation rule. Shared `snapshotDate/latestPeriod/loadBatch/dataVersion` belongs in request/response/cache context, not in hidden endpoint state.
- Do not mark data-bearing APIs `ready` when data-version, business filters, or permission scope are response-only metadata. They must drive backend params, source/provider predicates, precompute lookup keys, declared snapshot reuse rules, or Redis/cache keys.
- Do not mark an API `ready` when its response model, formula, permission, or source dependency is missing.
- Do not mark a P0 API `ready` when performance/cache/SLA, expected volume, or export limit is unknown and undocumented.
- Do not mark collection/list/table APIs `ready` without pagination, maximum page size, stable sort, and large-result handling.
- Do not mark APIs `ready` when global/page-level filters, sorting, pagination, ranking, Top/Bottom, grouping, aggregation, or counts require page/API-level full-materialize-then-filter behavior. The inventory must push global narrowing to SQL/source/provider/repository/cache stage, or mark a `GAP-*`. Component-internal filters must be separately scoped to already fetched component data.
- Do not mark filter-bearing APIs `ready` until data completeness is proven before filter binding: option source, source/provider rows, required fields, default/non-default states, empty/no-permission states when relevant, and resolver/API branch behavior are present or linked to `GAP-*`.
- When the inventory feeds default backend/API implementation, assume `Python + Flask + database/upstream connection pools + Redis` and record cache/pool expectations. Use another backend stack only when the user or existing project explicitly overrides it.
- Do not plan JSON files as the simulation data source for backend/API implementation. Use SQLite schema, seed rows, and indexes for mock-derived local APIs.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.

## Required Output

Use a table with these columns:

- API ID.
- Page/module.
- Business purpose.
- Method and path.
- Trigger.
- Request params.
- Response model.
- Source model dependency.
- Backend reuse pattern and common request/response model.
- Snapshot role, data-version context, backend filter params, and endpoint dependency/reuse rule.
- Auth/permission.
- Pagination/sort/filter.
- Filter data support: option source, row grain, default/non-default states, resolver/API branch need.
- Filter/sort/page execution stage.
- Performance/cache/SLA.
- Backend stack/cache/pool expectation and override reason when not using the default backend stack.
- Priority.
- Status.
- Pending questions.
- Design reasonableness status and linked `DESIGN-*` findings when applicable.

## Quick Quality Gate

- All prototype/mock data consumers are represented by an API or documented as static/offline.
- API names and paths are stable enough for downstream API documentation, implementation, or validation.
- Every production-bound API row has a backend reuse pattern or an explicit reason for a custom route/query.
- API inventory design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected APIs `partial` or `blocked`.
- Snapshot/latest-period reports declare the snapshot role and shared data-version context; API rows either declare valid snapshot reuse or avoid hidden dependency on undocumented runtime payload, frontend call order, or controller memory.
- Data-version, business filter, and permission scope values are mapped to backend query params, source-side predicates/precompute lookups, and cache keys for every data-bearing API.
- Request params cover all required filters, drilldowns, pagination, sorting, exports, and actions.
- Filter-bearing APIs prove data completeness before downstream binding; missing non-default data, option rows, fields, or resolver/API branches are visible `GAP-*` items.
- List/table APIs have bounded pagination and documented default/max page size.
- API rows do not depend on page/API-level full-materialize-then-filter behavior; global SQL/source/provider/repository/cache execution and component-internal local filter scope are explicit or linked to a `GAP-*`.
- Response model names match the 数据模型文件.
- Missing model/source/formula/enum/permission items are visible instead of hidden in notes.
