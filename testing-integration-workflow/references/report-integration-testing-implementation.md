# Report Integration Testing Implementation And Optimization

Use this shared reference whenever a report, BI, dashboard, large-screen, or report data service is integration-tested, accepted for UAT, prepared for release, or retested after defects.

Report integration testing is not an API `200` check. It proves that the chain below is accurate, stable, permission-safe, traceable, and operable:

```text
source data
-> warehouse/model layers
-> metric definitions
-> backend APIs
-> auth and permissions
-> cache and async jobs
-> frontend charts/tables/details
-> exports
-> audit, monitoring, rollback, and regression
```

It complements:

- `$performance-optimization` for OLAP model grain, metric additivity, lineage, concurrency, cache, pool, timeout, retry, degradation, and observability.
- `$backend-development-workflow` for report query APIs, cache, permissions, export, and audit.
- `$frontend-development-workflow` for chart/table/KPI semantics and runtime visual QA.
- `$quality-gate-validation` for `.env.test` and `.env.production` runtime separation.

## Core Principle

A report can render correctly while still being wrong. Treat these as high-risk failures:

- Page value looks normal but the metric formula is wrong.
- API returns `200` but row/field/tenant permissions are bypassed.
- Chart unit or percentage format is wrong.
- Export succeeds but does not match the page filters, fields, units, or permissions.
- Cache returns another user's, tenant's, role's, or report version's data.
- Same named metric has different values across pages without an approved口径 version.
- A failing query exposes raw SQL/database errors to users.

Stable testing sequence:

```text
confirm metric口径
-> prepare golden data
-> validate model/reconciliation
-> validate API contract and backend behavior
-> validate frontend display and interactions
-> validate permissions, cache, export, performance, and exceptions
-> run UAT, release smoke, monitoring, rollback, and regression
```

## Required Integration Testing Decisions

Document or verify these decisions before claiming report integration readiness.

| Area | Required Decisions |
| --- | --- |
| Scope | Report/page/API/component/export/config versions under test, environment profile, source mode, and release target. |
| Metric口径 | Formula, filters, time field, grain, unit, precision, numerator/denominator, boundary cases, owner, and version. |
| Golden data | Seed dataset, expected values, dimensions, roles, tenants, edge records, source snapshot, and refresh/reset method. |
| Data chain | Source -> ODS -> DWD -> DWS -> ADS/API/frontend/export reconciliation path and accepted tolerances. |
| API contract | Path, method, params, enums, defaults, fields, types, units, nulls, error codes, paging, sorting, auth, permissions, empty behavior. |
| Frontend binding | Component-to-endpoint mapping, adapter rules, chart/table/KPI format, filters, drilldown, detail, refresh, and states. |
| Permissions | Report/menu/component/metric/field/row/export/tenant rules, masking, direct API denial, and audit expectations. |
| Cache | Key dimensions, user/tenant/permission/report-version/data-version isolation, invalidation, freshness, warmup, degradation. |
| Export | Sync/async flow, task states, active filters, fields, units, sorting, permissions, max rows, file expiry, retry, audit. |
| Performance | Latency targets, concurrency, large-query guardrails, timeout, rate/concurrency limits, export limits, pressure scenarios. |
| Resilience | Data source failure, query timeout, cache failure, auth service failure, task delay, data not ready, last-success fallback. |
| Regression | Core reports, metrics, APIs, snapshots, baseline update rule, automation coverage, and retest closure criteria. |
| Production | UAT sign-off, pre-release smoke, monitoring/alerts, rollback targets, release version, and owner contacts. |

## Test Layers

Design cases by layer instead of only by screen:

- Metric口径 tests: formula, filters, time口径, deduplication, nulls, zero denominator, permission-filtered result, page/export consistency.
- Data model tests: fact grain, primary key uniqueness, required fields, dimension join hit rate, summary-vs-detail reconciliation, late-arriving data, duplicate data, unknown dimensions.
- SQL/query tests: safe projection, parameter validation, sort/page behavior, large-range guardrails, source-side filters, plan evidence for risky queries.
- API contract tests: schema, type, unit, percentage representation, date format, pagination base, error envelope, no-permission/empty behavior.
- Backend behavior tests: normal query, no data, illegal params, oversized params, no permission, field permission, cache hit/miss, data source timeout, SQL failure.
- Frontend integration tests: metadata, filter options, query params, component binding, chart/table format, drilldown, stale mock detection, state coverage.
- Permission tests: report/menu/component/metric/field/row/export/tenant/masking/direct API/cross-role/cross-tenant behavior.
- Cache tests: key isolation, invalidation, refresh, warmup, version/data update behavior, last-success fallback.
- Export tests: task lifecycle, active filters, data consistency, permissions, large file behavior, retry, expiry, audit.
- Performance and stability tests: P95 latency, concurrent users, dashboard auto-refresh, simultaneous exports, cache stampede, slow data source, queue buildup.
- UAT/release tests: business口径 confirmation, pre-release smoke, post-release monitoring, rollback and regression.

## Golden Dataset

For production-bound report integration, prefer a small but complete golden dataset whose expected results can be manually calculated. Random mock data is acceptable for UI smoke, but it is not enough to prove metric correctness.

Golden data should include:

- normal, cancelled, unpaid, paid, failed, partially refunded, fully refunded, cross-day, cross-month, and cross-year records
- multi-item, multi-coupon, multi-channel, missing-dimension, zero-amount, extreme-amount, decimal, duplicate, late-arriving, and sensitive-field records
- multiple roles, tenants, data scopes, field permissions, export permissions, and no-permission users
- dimensions such as channel, city, category, product, organization, owner, and status
- expected KPI totals, ratios, rankings, trends, table rows, export rows, and permission-filtered results

Record the seed path/source snapshot, reset method, expected values, and accepted tolerance. If no golden data is available, mark metric/data acceptance `partial` or `blocked` instead of relying on "looks right".

## Metric And Ratio Tests

Each P0/P1 metric needs tests for:

- formula and source field
- inclusion/exclusion conditions
- time field and date boundary
- de-duplication and grain
- null/empty/default handling
- unit and precision
- permission-filtered result
- page/API/export consistency

Ratio metrics must test numerator, denominator, division rule, zero denominator, null denominator, and display convention separately. Do not aggregate ratios by simple `SUM` or average unless the metric definition explicitly allows it.

## Data Model And Reconciliation Tests

Use a layered reconciliation path:

```text
source system
-> ODS
-> DWD
-> DWS
-> ADS
-> API
-> frontend
-> export
```

Check counts, amounts, dimension hit rates, duplicate keys, missing required fields, referential integrity, and summary-vs-detail consistency. Differences are acceptable only when the transformation rule and tolerance are documented.

Common high-risk data findings:

- one-to-many joins multiply amounts
- many-to-many tags/coupons/activities duplicate facts
- time fields differ between order, payment, refund, and net transaction metrics
- current dimension values overwrite historical reporting needs
- late-arriving data or backfill changes previous periods without a baseline update note

## API And Backend Tests

Backend report APIs must cover more than the happy path:

- valid query, no data, invalid parameter, missing required parameter, future date, oversized date range
- page size over limit, negative page, last page, empty page, deep page behavior
- invalid sort field, unauthorized sort field, invalid sort order
- no permission, field no permission, row-scope filtering, tenant isolation
- cache hit, miss, refresh, invalidation, stale fallback
- data source timeout, SQL/query failure, metadata/config error, data not ready

Error responses should use product-level codes such as `NO_PERMISSION`, `INVALID_PARAM`, `QUERY_TIMEOUT`, `QUERY_TOO_HEAVY`, `DATASOURCE_ERROR`, `EXPORT_LIMIT_EXCEEDED`, `EXPORT_FAILED`, or `DATA_NOT_READY`. Do not expose raw SQL or stack traces to users.

## Frontend Integration Tests

Do not start by validating an entire page as one blob. Integrate in stages:

```text
metadata API
-> filter option API
-> query API
-> KPI/chart/table display
-> linkage and drilldown
-> permission states
-> export and exception states
```

For each component, verify endpoint, params, backend fields, adapter mapping, unit, precision, sorting, Top N, null handling, tooltip/legend/axis semantics, freshness display, and active-filter inheritance.

Charts require semantic checks, not only rendering checks:

- KPI cards: name, value, unit, precision, comparison, direction, color/icon semantics, freshness.
- Trend charts: continuous time axis, missing dates, unit, tooltip,同比/环比 alignment, anomaly markers.
- Ranking/bar charts: sort order, Top N, other bucket, long label handling, click/drill behavior.
- Tables: column order/name, right-aligned numeric fields, sorting, pagination, frozen columns, column visibility, export parity.

## Filter Tests

Filters must be tested as UI controls, request params, backend queries, component state, and export/drill context.

Cover default, single-select, multi-select, all, empty, invalid, required, search, range, date boundary, cascade, reset, permission-limited option, no-result, repeated changes, and persistence across pagination/sort/drill/export/refresh/page jumps.

For date ranges, confirm whether the contract is closed-closed or closed-open. Prefer backend execution like:

```text
time >= start_time
and time < next_day_or_next_period_end
```

## Permission Tests

Report permissions should cover:

- report/menu/page access
- component and metric visibility
- field visibility and masking
- row-level data scope
- tenant isolation
- operation/export permission
- direct API calls and deep links
- cache and export isolation

Backend/API filtering must be validated separately from frontend hiding. Field or row permissions cannot rely only on hidden UI.

## Cache Tests

Cache keys for permission-sensitive report queries should include business and security dimensions such as:

- report id and report version
- tenant id
- user/role/data-scope or permission hash
- dimensions, metrics, filters, sorts, page
- data version or freshness marker

Test same user/same params hit, different user/permission/tenant isolation, report publish invalidation, data update refresh, semantic param-order normalization, cache failure, and last-success fallback.

## Export Tests

Exports are first-class integration paths. Test them early.

Async export should verify:

```text
submit task
-> task id
-> pending/running/success/failed/canceled/expired
-> download
-> file expiry/audit/retry
```

The exported file must inherit active filters, permissions, field masking, units, sorting, and metric口径. For large files, verify max rows, batching/streaming, memory stability, progress, timeout, retry, and corrupted-file handling.

## Performance And Stability Tests

Define explicit targets by report type, such as ordinary report P95, large-screen component latency, metadata/filter latency, cache-hit latency, complex aggregation timeout, and export async behavior.

Pressure scenarios should include:

- one user repeating queries
- many users opening a daily dashboard at the same time
- multiple users querying heavy reports
- concurrent large exports
- dashboard auto-refresh
- cache stampede or cache unavailable
- slow data source or saturated connection pool
- complex permission predicates

Guardrails should verify max time range, max rows, max export rows, max dimensions/metrics, max `IN` size, per-user/per-tenant concurrency, timeout, and heavy-query async/degradation behavior.

## Regression, Automation, And Snapshots

Maintain a regression set for core reports, core metrics, core APIs, and high-risk permission/export/cache paths.

Snapshot regression can store a stable report id, date, params, expected hash/count/metric values, field set, sort order, and allowed tolerance. When an approved metric口径 changes, update the baseline with a reason and version link.

Automation should prioritize:

- API contract and schema tests
- core metric tests against golden data
- permission and parameter validation
- cache key and isolation tests
- export lifecycle tests
- snapshot regression and data-quality reconciliation
- E2E checks for filters, drilldown, and export

Automation results must preserve case IDs and must not hide manual gaps such as unavailable accounts, missing golden data, absent selectors, or missing screenshot baselines.

## Defect Localization

When a value is wrong, trace it by chain:

```text
frontend display
-> API response
-> backend query/result processing
-> ADS
-> DWS
-> DWD
-> ODS
-> source system
```

Typical ownership:

- Frontend display wrong, API response right: adapter, formatting, binding, chart/table state.
- API response wrong, generated SQL/source query right: backend transformation/result processing.
- Query result wrong, ADS wrong: data mart/model layer.
- ADS wrong, DWS right: ADS transformation.
- DWS wrong, DWD right: aggregation logic.
- DWD wrong, ODS right: cleansing/dedup/sync transform.
- ODS wrong: source sync or source system issue.

Every defect should record report name/id, environment, account/role, tenant/scope, request params, expected value, actual value, screenshot/API sample/query id, freshness time, cache hit status, likely layer, owner, and retest criteria.

## UAT, Release Smoke, Monitoring, And Rollback

UAT should confirm business meaning, not only UI quality:

- core metric names and口径
- default time range and filters
-同比/环比 rules
- refund/cancel/failure boundary rules
- sorting and ranking
- export fields and format
- permission scope
- freshness and anomaly explanation

Pre-release smoke should open core dashboards, query default filters, switch date/channel, inspect chart/table/detail, export a small file, test permission/no-permission users, verify freshness, and check logs.

Post-release monitoring should include QPS, latency, error rate, timeout rate, cache hit rate, export task count/failure/backlog, slow queries, data delay, core metric anomalies, permission errors, and user access.

Rollback targets may include code version, report config version, metric config version, data job, cache version, frontend assets, and permission config. A release is not production-ready if rollback or baseline recovery is unknown.

## Readiness Rules

Mark report integration testing readiness:

- `ready`: metric口径, golden/baseline data, model reconciliation, API/backend behavior, frontend binding, filters, permissions, cache, export, performance, exceptions, UAT/smoke, monitoring, rollback, automation/regression, evidence, and defect retest closure are confirmed for the stated scope.
- `partial`: non-prod/demo or limited scope can proceed with named gaps, unexecuted cases, missing optional automation, limited data, or accepted UAT/monitoring limitations.
- `blocked`: P0 metric口径, source authority, golden/baseline data, API contract, runtime URL, account/permission, environment profile, data reconciliation, cache/export/permission safety, performance target, or blocker/major retest evidence is missing for a production-bound scope.

## Handoff Evidence

Testing reports and production handoffs should include:

- Tested scope, report/API/component/export/config versions, environment profile/config file, frontend/backend URLs, source mode, account/role/tenant.
- Golden dataset or baseline evidence, expected values, tolerance, and reset/source snapshot method.
- Case matrix covering metric, model, API, frontend, filter, permission, cache, export, performance, exception, UAT, smoke, regression, and automation scope.
- Execution results: pass/fail/blocked/not run counts by category.
- Data reconciliation evidence across source/model/API/frontend/export.
- Network/API samples, screenshots, export files or hashes, query IDs, cache hit/miss evidence, freshness timestamps, logs, and monitoring snapshots when available.
- Defect ledger: severity, owner layer, expected/actual, reproduction, evidence, status, fix version, retest criteria, and retest evidence.
- Final conclusion: pass, partial pass, fail, or blocked, with remaining risk and next owner action.
