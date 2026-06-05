# Endpoint Detail Rules

Use this reference when writing each endpoint section.

## Endpoint Section Template

- API ID and name:
- Business module, resource, page, or service:
- Served component or component group:
- Purpose and trigger:
- Method and path:
- Auth and permission:
- Request headers:
- Path/query/body parameters:
- Response schema:
- Data/model/source trace:
- Report data-service backend contract:
- Transformation rules:
- Filter/sort/page execution stage:
- Global filter SQL `WHERE` rules:
- SQL query-writing strategy:
- Component-internal local filter scope:
- Concurrency/thread/worker model:
- Async/offline job strategy:
- Redis/cache strategy:
- Resource pools:
- Timeout/retry/fallback behavior:
- Rate/concurrency limits:
- Health/readiness and observability:
- Frontend compute policy:
- Success example:
- Empty/no-data example:
- Error examples:
- Performance limits:
- Source mode:
- Compatibility notes:
- Status and pending items:

## Interaction Style

Choose the style before writing the endpoint body:

- Synchronous request/response: document request, response, empty/error examples, and latency expectations.
- Async job: document job creation, job id, status/progress polling, cancellation when allowed, timeout, retry/replay, dead-letter behavior, queue/worker limits, idempotency, retention/expiry, result download or callback, permission checks, and failure states.
- Webhook or callback: document event type, delivery URL, signature/auth, retry policy, idempotency key, ordering, duplicate handling, and dead-letter behavior.
- Streaming or SSE: document connection setup, event schema, heartbeat, reconnect, backpressure, timeout, and terminal events.
- Batch import/export: document file format, encoding, max size, validation errors, partial success, generated artifact retention, and download behavior.

## Request Parameters

For each parameter, document:

- Name, location, type, required status, default, allowed values, example, and description.
- Validation rule and invalid-param error behavior.
- Filter semantics such as inclusive/exclusive date range, timezone, fuzzy search, multi-select, hierarchy selection, and permission-scoped defaults.
- Filter scope: mark each filter as `global/page-level`, `permission-scope`, `route/drilldown`, or `component-internal`. Global/page-level and permission filters for database-backed endpoints must map to SQL `WHERE` predicates or an equivalent source/provider query. Component-internal filters may operate on the already fetched component dataset when the dataset is bounded by the endpoint contract.
- Database query mapping when the source is database-backed: source column, predicate shape, whether it uses a normal/composite/function/full-text index, type consistency, date/range rewrite, optional-filter generation behavior, and any known non-sargable condition.
- Execution stage: whether each filter, sort, pagination, ranking, Top/Bottom, grouping, aggregation, and count is handled by source query, repository query, upstream provider, precompute/cache, or an explicitly bounded client/service post-process.
- Pagination, sorting, export, drilldown, and search behavior when supported. Collection/list/table endpoints must define pagination unless they are provably bounded by a small fixed enum or single-object lookup.
- Whether the response is component-ready or only format-ready for the frontend. Component-ready means KPI totals, chart series, table rows, ranks, pagination metadata, and business formula fields are already returned by the API.
- For report/BI/dashboard endpoints, document report type, report metadata or fixed-contract source, dimension/metric/filter/sort whitelist source, backend-owned SQL/source expression mapping, parameter guardrails, backend-injected tenant/data/field/export permission behavior, cache key permission safety, result freshness/quality metadata, query/export audit behavior, and slow-report governance expectation.

## Response Schema

For each response field, document:

- Field name, type, required/nullability, description, unit, precision, enum dictionary, example, and compatibility notes.
- Array/object nesting, stable ordering, empty-state shape, and omitted-field behavior.
- Derived fields, aggregation grain, formula, rounding, default fill, and source trace.
- Whether the field is stable, experimental, deprecated, or pending confirmation.

For report/dashboard APIs, document the component-facing view model. Do not leave required component formulas, grouping, ranking, filtering, or chart/table series derivation as implicit frontend work unless the exception is bounded and listed as partial.

Also document column/result metadata when applicable: field code, display name, type, unit, precision, format, enum label source, sensitivity/masking, sort/filter capability, data freshness time, data delay, data quality status, cache status, query time, and request/trace id.

## Examples

Include compact examples for:

- Successful response with representative data.
- Empty or no-permission-scoped data.
- Invalid parameter.
- Unauthorized or token expired.
- Valid token but no permission.
- Upstream/backend/data-source failure when relevant.

## Performance Notes

Document expected QPS/concurrency, latency targets, default and maximum page size, stable default sort, total-count behavior, cursor/keyset pagination need, export limits, timeout expectations, concurrency/thread/worker model, async/offline job strategy for long-running work, Redis/cache/precompute behavior, resource-pool behavior, timeout/retry/fallback behavior, rate/concurrency limits, large result handling, and any known slow filters or joins.

Do not mark collection/list/table APIs `ready` when pagination is missing, the maximum page size is unknown, or a synchronous endpoint can return export-sized/unbounded results.

Do not mark report/BI/dashboard APIs `ready` when the frontend can send raw SQL, table names, column expressions, arbitrary operators, arbitrary sort strings, unregistered metric formulas, or tenant/data-permission scope. Frontend input must select stable codes; backend metadata/config must own source expressions, permission predicates, guardrails, and result formatting.

Do not mark endpoints `ready` when the documented or implemented path builds or loads a complete candidate dataset/component payload and then applies global filters, permission scope, sorting, pagination, ranking, Top/Bottom, grouping, aggregation, or count logic afterward. Treat page/API-level full-materialize-then-filter as a performance and correctness blocker except for documented component-internal filters over already fetched component data, tiny static enums, or bounded lookup sets.

Component-internal local filtering is allowed only when the endpoint has already applied global/page-level SQL `WHERE` filters and the returned component dataset is intentionally complete for that component's local interaction scope. Document the difference so frontend teams do not turn global filters into local filtering.

For database-backed endpoints, also document:

- Whether filtering, sorting, pagination, aggregation, joins, Top/Bottom, and counts are pushed down to SQL/database views/repository queries.
- Selected-column/projection rule, including explicit avoidance of `SELECT *` for list/table/chart APIs.
- Which filters are global SQL `WHERE` predicates and which are component-internal local filters over already fetched component data.
- Which request filters map to direct indexed predicates such as `field = ?`, `field IN (...)`, or `field >= ? AND field < ?`.
- Any avoided or unavoidable non-sargable predicates, especially `FUNCTION(field) = ?`, `DATE(field) = ?`, `YEAR(field) = ?`, `TO_CHAR(field) = ?`, `LOWER(field) = ?`, casts, arithmetic on filtered/joined columns, or leading-wildcard search.
- Rewrite rules, such as `DATE(created_at) = ?` becoming `created_at >= ? AND created_at < ?`, and month filters becoming bounded date/time ranges.
- Optional-filter behavior. Avoid high-volume nullable-OR templates such as `(:param IS NULL OR col = :param)`; document generated predicates and safe parameter binding.
- Join keys/cardinality, including tenant/org/partition/composite keys, one-to-many multiplication risk, aggregation-before-join need, and whether `EXISTS`/`NOT EXISTS` is more appropriate than joins for existence checks.
- Dedup/order/set behavior: whether `DISTINCT`, `ORDER BY`, `UNION`, `UNION ALL`, and stable tie-breakers are required.
- Aggregation/window behavior: `WHERE` before `HAVING` where possible, minimal `GROUP BY` columns, filter-before-window expectations, and Top N limit pushdown.
- Plan evidence expectation for risky P0/high-volume queries: `EXPLAIN` / `EXPLAIN ANALYZE`, scanned rows, access method, join order, sort/temp/materialization, and row-estimate risk.
- Required indexes, composite indexes, generated/normalized columns, full-text indexes, or precompute tables when direct predicates cannot support the requested filter at expected volume.
- Connection-pool owner/config, pool min/max, acquire timeout, idle timeout, validation query/health behavior, and whether pooling is managed by the framework/runtime.
- Redis/cache use when applicable: cache key dimensions, TTL, invalidation trigger, permission/user/tenant safety, warmup, stampede protection, and stale/fallback behavior.

For production-bound or upstream-dependent endpoints, also document:

- Bounded worker/thread/executor or runtime-managed concurrency model, including queue/backpressure/overload behavior.
- Async/offline job contract when long-running work exists: create/status/progress/cancel/result endpoints, queue/worker limit, retry/dead-letter policy, idempotency, result retention/expiry, and sample lifecycle.
- Upstream HTTP/API/client pool owner/config, connect/read/overall timeout, bounded retry with backoff/jitter, circuit-breaker or failure-threshold behavior, and fallback/degraded response shape.
- Rate limit, concurrency limit, request-size limit, async/offline export strategy, and overload status/error body for expensive endpoints.
- Observability metrics: request ID, latency percentiles, error rate, timeout/retry count, cache hit ratio, pool usage, queue length, and slow-query evidence where available.

## Simulation Source Notes

- If backend/API implementation needs mock data, document SQLite as the simulation source with schema/table names, seed-data coverage, indexes, and query responsibility.
- JSON examples are allowed for human-readable success/error samples, contract assertions, or OpenAPI examples, but must not be documented as the API data source for local simulation.
