# Report Data Service Backend Implementation And Optimization

Use this shared reference whenever a report, BI, dashboard, or data-visualization backend/data service is planned, documented, implemented, validated, or reviewed for production readiness.

This reference is about the report backend as a controlled query service. It complements:

- `$performance-optimization` for OLAP business process, grain, fact/dimension, metric, serving-model design, SQL query shape, execution-plan risk, concurrency, cache, pools, async work, timeout, limits, and observability.

## Core Principle

A report backend is not a CRUD wrapper and not a thin SQL proxy. It must control the full query chain:

```text
report definition
-> permission check
-> parameter validation
-> metric and dimension governance
-> query planning
-> safe SQL/source query generation
-> execution
-> cache/precompute
-> result formatting
-> pagination/export
-> audit and monitoring
-> slow-report governance
```

Frontends choose report, dimension, metric, filter, sort, page, drilldown, and export options by stable codes. Frontends must not send raw SQL, table names, column expressions, arbitrary operators, or permission scope.

## Default Backend Stack

For default report backend/data-service planning or implementation, use `Python + Flask + database/upstream connection pools + Redis` unless the user specifies another stack or an existing project has an authoritative backend stack.

- Flask owns HTTP routing, request validation handoff, service composition, error envelopes, health/readiness endpoints, and auth middleware integration.
- Database/upstream connection pools own bounded resource usage, acquire timeout, idle/validation behavior, and overload protection.
- Redis owns cache/precompute, hot query acceleration, dictionary/permission cache where safe, stampede protection, stale fallback, and rate/concurrency support when needed.
- Document an override reason before choosing FastAPI, Spring, Express, Node, or another backend stack by default.

## Required Backend Responsibilities

For each production-bound or production-like report data service, document or implement these responsibilities.

| Area | Required Decisions |
| --- | --- |
| Report metadata | Report definition, report type, dataset, dimensions, metrics, filters, sort fields, display/format metadata, cache policy, timeout, max rows, status, version, owner. |
| Dataset contract | Table/view/API/file source, source authority, source owner, grain, freshness, quality status, source version, data-source type, SQL dialect, and source-specific limits. |
| Query API | Query endpoint, metadata endpoint, filter-option endpoint, dashboard/widget endpoint when needed, async export endpoints, subscription/snapshot/admin endpoints when in scope. |
| Query planner | Selected dimensions/metrics, filter tree, permission predicates, tenant predicates, pagination, sorting, Top N, aggregation, count strategy, query grade, and sync/async decision. |
| SQL/source query builder | Field/metric/operator/sort whitelist, parameter binding, SQL dialect adaptation, tenant/permission injection, generated optional predicates, and safe aliases. |
| Permission model | Menu/report access, row-level data scope, field visibility/masking, export permission, tenant isolation, and no-permission response behavior. |
| Parameter guardrails | Required filters, date-range limits, max dimensions, max metrics, max `IN` values, keyword length, default/max page size, max page depth, max export rows, and invalid-param errors. |
| Cache/precompute | Metadata cache, permission/dictionary cache, result cache, dashboard/widget cache, export-file cache, warmup, invalidation, versioned keys, permission/tenant/user safety, stale fallback. |
| Pagination/count | Bounded pages, stable sort, cursor/keyset need, `hasNext` vs exact total, total-count cost, and deep-page/export handoff. |
| Export | Separate async export lifecycle, batch/stream write, file retention/expiry, row/field permission recheck, watermark/approval when sensitive, audit, and isolated worker pool. |
| Result contract | Component-ready payload, column metadata, units, precision, enum labels, empty/no-permission shape, data freshness, data quality warnings, query time, cache status, and trace/request id. |
| Security and compliance | Sensitive-field masking, secret/config handling, datasource credential encryption, audit logs, download logs, report config change logs, and permission change logs. |
| Stability and governance | Query timeout, rate/concurrency limits, query grading, slow-report monitoring, hot-report/cache-hit monitoring, source isolation, downgrade behavior, release/publish/rollback/offline flow. |

## Recommended Query-Service Layers

Keep controllers thin. A maintainable report backend normally separates these responsibilities:

```text
ReportController
ReportService
ReportMetadataService
ReportPermissionService
ReportParamValidator
ReportQueryPlanner
ReportSqlBuilder / SourceQueryBuilder
ReportQueryExecutor
ReportCacheService
ReportResultFormatter
ReportExportService
ReportAuditService
ReportMonitorService
```

Implementation packages may differ, but controller-level SQL concatenation, permission checks, cache key construction, export logic, and result formatting should not be mixed into one handler.

## Report Types And Execution Strategy

Classify the report before selecting API and execution behavior.

| Report Type | Backend Strategy |
| --- | --- |
| Fixed report | Stable SQL/template or generated query, strong parameter validation, cache, permission injection. |
| Configurable report | Metadata-driven dimension/metric/filter/sort whitelist, query planner, versioned publish/rollback. |
| Self-service analysis | Strict max dimension/metric/date/result limits, dataset whitelist, query grading, async or refusal for dangerous queries. |
| Detail report | Mandatory time or scope filters, bounded pagination, stable sort, field permissions, async export. |
| Summary/OLAP report | Governed metrics, aggregation pushdown, pre-aggregation/cache when useful, ratio numerator/denominator trace. |
| Realtime/high-frequency dashboard | Short TTL or precomputed cache, widget-level cache, source protection, stale last-success fallback. |
| Large export/report generation | Async job, batch query, streaming file write, isolated workers, retention, audit, retry/dead-letter. |
| Snapshot/reporting close report | Persisted snapshot/file for historical correctness, versioned result, audit and retention. |

## Metadata-Driven Query Contract

Prefer metadata-driven report definitions instead of one custom controller per report.

Minimum useful metadata includes:

- `report_definition`: report code/name/type, dataset, status, version, owner, cache TTL, timeout, max rows.
- `report_dataset`: source type, base table/view/query/API, datasource, dataset status, version, source grain.
- `report_dimension`: code/name, source expression, type, visibility, filterability, groupability, permission/sensitivity.
- `report_metric`: code/name, aggregate expression or metric reference, type, unit, format, additivity, owner.
- `report_filter`: code/name, source expression, operator whitelist, type, required/default, option source.
- `report_permission`: subject, report permission, data scope, field/export permission when separated.

Metric expressions and column expressions must be owned by backend configuration or a governed metric dictionary. User input may select codes only.

## Safe Query Rules

- Do not accept raw SQL, table names, column expressions, arbitrary operators, or arbitrary sort strings from the frontend.
- Map frontend codes to backend-owned metadata and reject unknown, hidden, non-filterable, non-groupable, or non-sortable fields.
- Use parameter binding for values. Never concatenate user values into SQL/source query strings.
- Inject tenant and data-permission predicates on the backend, not from frontend-supplied scope.
- Generate optional predicates according to the actual request. Avoid broad nullable-OR templates for high-volume endpoints.
- Apply global filters, permission scope, sorting, pagination, Top/Bottom, grouping, aggregation, and counts at the source/provider/repository/precompute/cache stage, not after full materialization in application memory.
- Apply `$performance-optimization` for database-backed endpoints and capture plan evidence for risky P0/high-volume queries.

## Parameter Guardrails

Every query endpoint must have explicit guardrails. Use project-specific limits, but do not leave the behavior open-ended.

- Required filters and defaults, especially time, tenant, organization, region, account, product, or dataset scope.
- Date/time range limits, expressed as left-closed/right-open ranges for timestamp queries when appropriate.
- Maximum dimension count, metric count, sort fields, `IN` values, keyword length, page size, page depth, returned rows, export rows, and file size.
- Query grade: light query can return synchronously; medium query may return synchronously with cache; heavy query goes async; dangerous query is rejected or requires approval.
- Error codes for invalid filters, heavy query, timeout, no permission, source unavailable, and export-limit exceeded.

## Permission And Cache Safety

Report permissions normally include menu, report, field, row/data-scope, export, admin/config, and subscription/snapshot permissions.

## Snapshot Role, Version Context, And Reuse

Snapshot/reporting-close semantics should be modeled as an explicit role plus a data-version contract, not guessed from the endpoint name.

- Snapshot/dashboard aggregate endpoints may return component-ready first-screen data for one data cut, expose a canonical/shared snapshot dataset, or both.
- The shared context is metadata such as `snapshotDate`, `latestPeriod`, `loadBatch`, `dataVersion`, report version, source version, tenant, permission hash, and filter values.
- Metrics, trends, rankings, tables, drilldowns, exports, and health endpoints may read from source queries, repository queries, precompute tables, Redis/cache entries, or a declared canonical snapshot filtered by that context.
- Declared snapshot reuse is valid when the contract documents matching grain, fields, filters, permission scope, version params, cache key, and invalidation behavior.
- Do not implement "call `/snapshot`, keep an undocumented payload in memory, then let `/metrics` read it" for production or production-like services.
- Application memory may hold bounded static definitions, whitelists, local ephemeral cache, or declared local/demo payloads only when the scope and correctness boundary are explicit. Production business data used across endpoints should be source-backed, precomputed, or stored in shared cache with explicit keys and invalidation.

## Parameter-Driven Query Context

Every data-bearing route should build a query context before reading business data:

- client-supplied stable params: report id, date/version filters, business filters, route/drilldown params, pagination, sorting, and keyword;
- backend-defaulted params: latest available snapshot date, latest period, load batch, data version, source partition, or report version when the client omits them;
- backend-injected scope: tenant id, user id, role/data-permission hash, organization/data-range predicates, field visibility, masking, and export permission;
- validated guardrails: allowed values, max date range, max page size, max `IN` size, sortable/filterable whitelist, and invalid-param behavior.

The query context must be passed into the repository/source/provider/precompute/cache layer. For database-backed endpoints, data-version, business filters, and permission scope map to SQL predicates or joins before aggregation, ranking, pagination, totals, and export. For precomputed or Redis-backed endpoints, the same values map to lookup keys or cache-key segments. Response metadata should echo the executed context; it must not be invented after an unscoped query.

Cache keys for report results and dashboard widgets must include all dimensions that can change the response:

- report id/code and report version
- dataset/source version or freshness partition
- snapshot date, latest period, load batch, data version, or equivalent data-cut identifier when relevant
- tenant id
- user/role/data-permission hash when data scope differs
- selected dimensions, metrics, filters, sorts, pagination, locale/unit/format, and feature flags

Never share permission-sensitive or tenant-scoped cache entries across users/tenants/roles. Export files also need tenant/user/report/task scoping and expiry.

## Endpoint Patterns

Use project naming conventions when available. Otherwise these report data-service endpoints are a stable starting point:

```http
POST /api/reports/{reportId}/query
GET  /api/reports/{reportId}/metadata
GET  /api/reports/{reportId}/filters
GET  /api/dashboards/{dashboardId}
POST /api/reports/{reportId}/exports
GET  /api/report-exports/{taskId}
GET  /api/report-exports/{taskId}/download
POST /api/admin/reports/{reportId}/publish
POST /api/admin/reports/{reportId}/rollback
POST /api/admin/reports/{reportId}/offline
GET  /api/admin/report-query-logs
GET  /api/admin/report-monitor/slow-reports
```

Dashboard endpoints may return a coherent widget group when widgets share filter scope, permission scope, refresh cadence, and lifecycle. Use widget-level cache internally when possible. Do not force the frontend to call many endpoints that repeatedly load the same metadata, permissions, dictionaries, or source data unless the split has a clear lifecycle or ownership reason.

If a dashboard endpoint is named `snapshot`, do not infer the role from the name alone. It may be a widget-group response, a canonical shared data cut used by trend/metric/table/export endpoints, or both. If other endpoints reuse it, document the reuse contract; otherwise those endpoints should receive or default the same version/scope params and query their own source/precompute/cache data.

## Result Shape

Report responses should be component-ready and self-describing enough for frontend integration and export consistency.

Include when applicable:

- `columns`: code, label/name, type, unit, precision, format, enum dictionary, sortable/filterable, sensitivity/masking.
- `rows`, `series`, `kpi`, `ranking`, `totals`, `subtotals`, or widget data needed by the component.
- `page`: page number/size, cursor, `hasNext`, total only when precise total is affordable and useful.
- `meta`: `fromCache`, query time, report version, data freshness time, data delay, data quality status/warnings, request id/trace id.

Do not leave KPI formulas, ranking, grouping, chart-series derivation, permission filtering, or multi-component splitting as implicit frontend work unless the exception is small, bounded, and documented.

## Export And Long-Running Work

Large exports and heavy report generation must not reuse the synchronous query route by adding `export=true`.

Export requirements:

- Create task -> return task id -> poll status/progress -> download result.
- Query and write in batches/streams. Do not load all rows into memory before writing a file.
- Run export in an isolated bounded worker pool and queue.
- Enforce max rows, max file size, timeout, retry/dead-letter policy, result retention, cleanup, and queue-full behavior.
- Recheck view/export/field/data permissions at task creation and result download.
- Audit who exported, report/version, filters, fields, row count, file, IP/device, download time, and failure reason.
- Apply masking, watermark, approval, expiry, and download-count limits for sensitive reports when required.

## Freshness, Quality, Precision, And Time

- Return or expose data freshness and quality status for production-bound report data. Users should know whether a number is realtime, hourly, daily, delayed, or from a stale fallback.
- Use decimal-safe numeric handling for money and ratios. Avoid floating-point rounding drift in financial or KPI outputs.
- Avoid premature rounding before aggregation. Format display precision at the response/metadata layer or final presentation layer.
- Ratio metrics should preserve enough lineage to explain numerator, denominator, zero-division behavior, and additivity.
- Define the business time field and timezone. Prefer left-closed/right-open timestamp ranges for date selection and state whether `dt` is business date, event date, payment date, refund date, completion date, or ingestion date.

## Multi-Tenant, Sensitive Data, And Audit

- Tenant isolation applies to queries, cache keys, export files, audit logs, datasource routing, and subscriptions.
- Sensitive fields need metadata such as sensitivity level, masking mode, export allowed status, and role exceptions.
- Audit query, export, download, report config change, permission change, datasource change, subscription, and snapshot behavior when in scope.
- Logs should store SQL hash, query id, redacted SQL/parameter summary, duration, row count, cache hit, status, and error summary. Do not log secrets, tokens, raw sensitive payloads, or full SQL with sensitive literals.

## Monitoring And Governance

Track enough signals to govern report health after release:

- slowest reports, hottest reports, highest failure rate, highest export count, lowest cache hit rate
- average, P95, and P99 latency
- timeout count, query-too-heavy count, source unavailable count
- returned rows, scanned range when available, export rows/files
- cache hit ratio, stale fallback count, queue length, worker saturation, pool usage
- unused or deprecated reports for cleanup

Typical repairs include cache/precompute, query rewrite, summary table, query limit, async conversion, report split, dimension reduction, field removal, metric-governance repair, or report offline.

## Anti-Patterns

Treat these as findings unless explicitly scoped to a tiny non-production demo:

- Controller directly concatenates SQL or implements the full query chain.
- Frontend sends SQL, table names, column expressions, raw operators, or permission scope.
- Every report is a one-off controller with duplicated metric/filter/permission logic.
- All reports, exports, scheduled jobs, and heavy queries run synchronously in the default request pool.
- No required time/scope filter, unbounded page size, unbounded export, or unlimited `IN` list.
- Cache key omits tenant, permission scope, report version, dataset/source version, or user/role scope.
- Metrics, trends, rankings, tables, exports, or drilldowns read an undocumented snapshot/dashboard API response or application-memory snapshot as their data source instead of using a declared snapshot/source/precompute/shared-cache contract by data-version context.
- Response metadata echoes `snapshotDate/dataVersion` or scope values, but the repository/source/precompute/cache query did not use those values as params, predicates, or key segments.
- Query/export opens a new physical database connection per request instead of using a bounded pool.
- Export loads all rows into memory before writing.
- Core metrics are recalculated differently by each report.
- No audit log for sensitive query/export/download/config changes.
- Report configuration changes take effect in production without draft/preview/publish/version/rollback controls.

## Readiness Rules

Mark report data-service backend readiness:

- `ready`: metadata, parameter-driven query context, query chain, snapshot role/reuse rule, data-version context, permissions, parameter guardrails, source mapping, API/result contract, cache/export, audit, freshness/quality, SQL strategy, performance/resilience, environment, and production handoff decisions are confirmed, documented or implemented, and testable for the stated scope.
- `partial`: local/demo/test scope can proceed with named limitations, or production scope lacks non-blocking controls such as complete monitoring, warmup, snapshot, subscription, or slow-report governance.
- `blocked`: the service would accept unsafe SQL/source inputs, has unknown source authority or metric口径, relies on undocumented data-bearing endpoint-to-endpoint runtime dependencies, lacks data-version context or snapshot reuse rules for snapshot/latest-period semantics, cannot show how data-version/business/permission scope params constrain source/precompute/cache/snapshot queries, lacks permission/tenant isolation, lacks bounded pagination/export, keeps risky heavy work synchronous, has no cache-permission safety, lacks required audit for sensitive data, or cannot document how global filters/query limits execute before response construction.

## Handoff Evidence

Backend/API documentation, implementation notes, and validation reports should include:

- Report type and execution strategy.
- Metadata model or explicit reason why a fixed endpoint is acceptable.
- Query chain ownership and layer mapping.
- Endpoint list with served component/widget group.
- Request guardrails and error codes.
- Permission, tenant, field masking, and export-permission behavior.
- Cache key dimensions, TTL, invalidation, warmup, stale fallback, and permission safety.
- Pagination/count/export strategy.
- Async export/job lifecycle evidence when applicable.
- Result metadata for columns, precision, freshness, quality, cache status, and trace id.
- Audit and monitoring evidence.
- Linked `$performance-optimization` findings or pass status.
