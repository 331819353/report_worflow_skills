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
- Transformation rules:
- Filter/sort/page execution stage:
- Global filter SQL `WHERE` rules:
- Component-internal local filter scope:
- Redis/cache strategy:
- Database connection pool:
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
- Async job: document job creation, job id, status polling, cancellation, timeout, retention, result download, and failure states.
- Webhook or callback: document event type, delivery URL, signature/auth, retry policy, idempotency key, ordering, duplicate handling, and dead-letter behavior.
- Streaming or SSE: document connection setup, event schema, heartbeat, reconnect, backpressure, timeout, and terminal events.
- Batch import/export: document file format, encoding, max size, validation errors, partial success, generated artifact retention, and download behavior.

## Request Parameters

For each parameter, document:

- Name, location, type, required status, default, allowed values, example, and description.
- Validation rule and invalid-param error behavior.
- Filter semantics such as inclusive/exclusive date range, timezone, fuzzy search, multi-select, hierarchy selection, and permission-scoped defaults.
- Filter scope: mark each filter as `global/page-level`, `permission-scope`, `route/drilldown`, or `component-internal`. Global/page-level and permission filters for database-backed endpoints must map to SQL `WHERE` predicates or an equivalent source/provider query. Component-internal filters may operate on the already fetched component dataset when the dataset is bounded by the endpoint contract.
- Database query mapping when the source is database-backed: source column, predicate shape, whether it uses a normal/composite/function/full-text index, and any known non-sargable condition.
- Execution stage: whether each filter, sort, pagination, ranking, Top/Bottom, grouping, aggregation, and count is handled by source query, repository query, upstream provider, precompute/cache, or an explicitly bounded client/service post-process.
- Pagination, sorting, export, drilldown, and search behavior when supported. Collection/list/table endpoints must define pagination unless they are provably bounded by a small fixed enum or single-object lookup.
- Whether the response is component-ready or only format-ready for the frontend. Component-ready means KPI totals, chart series, table rows, ranks, pagination metadata, and business formula fields are already returned by the API.

## Response Schema

For each response field, document:

- Field name, type, required/nullability, description, unit, precision, enum dictionary, example, and compatibility notes.
- Array/object nesting, stable ordering, empty-state shape, and omitted-field behavior.
- Derived fields, aggregation grain, formula, rounding, default fill, and source trace.
- Whether the field is stable, experimental, deprecated, or pending confirmation.

For report/dashboard APIs, document the component-facing view model. Do not leave required component formulas, grouping, ranking, filtering, or chart/table series derivation as implicit frontend work unless the exception is bounded and listed as partial.

## Examples

Include compact examples for:

- Successful response with representative data.
- Empty or no-permission-scoped data.
- Invalid parameter.
- Unauthorized or token expired.
- Valid token but no permission.
- Upstream/backend/data-source failure when relevant.

## Performance Notes

Document default and maximum page size, stable default sort, total-count behavior, cursor/keyset pagination need, export limits, timeout expectations, Redis/cache/precompute behavior, database connection-pool behavior, large result handling, and any known slow filters or joins.

Do not mark collection/list/table APIs `ready` when pagination is missing, the maximum page size is unknown, or a synchronous endpoint can return export-sized/unbounded results.

Do not mark endpoints `ready` when the documented or implemented path builds or loads a complete candidate dataset/component payload and then applies global filters, permission scope, sorting, pagination, ranking, Top/Bottom, grouping, aggregation, or count logic afterward. Treat page/API-level full-materialize-then-filter as a performance and correctness blocker except for documented component-internal filters over already fetched component data, tiny static enums, or bounded lookup sets.

Component-internal local filtering is allowed only when the endpoint has already applied global/page-level SQL `WHERE` filters and the returned component dataset is intentionally complete for that component's local interaction scope. Document the difference so frontend teams do not turn global filters into local filtering.

For database-backed endpoints, also document:

- Whether filtering, sorting, pagination, aggregation, joins, Top/Bottom, and counts are pushed down to SQL/database views/repository queries.
- Which filters are global SQL `WHERE` predicates and which are component-internal local filters over already fetched component data.
- Which request filters map to direct indexed predicates such as `field = ?`, `field IN (...)`, or `field >= ? AND field < ?`.
- Any avoided or unavoidable non-sargable predicates, especially `FUNCTION(field) = ?`, `DATE(field) = ?`, `YEAR(field) = ?`, `TO_CHAR(field) = ?`, `LOWER(field) = ?`, arithmetic on indexed columns, or leading-wildcard search.
- Rewrite rules, such as `DATE(created_at) = ?` becoming `created_at >= ? AND created_at < ?`, and month filters becoming bounded date/time ranges.
- Required indexes, composite indexes, generated/normalized columns, full-text indexes, or precompute tables when direct predicates cannot support the requested filter at expected volume.
- Connection-pool owner/config, pool min/max, acquire timeout, idle timeout, validation query/health behavior, and whether pooling is managed by the framework/runtime.
- Redis/cache use when applicable: cache key dimensions, TTL, invalidation trigger, permission/user/tenant safety, warmup, stampede protection, and stale/fallback behavior.

## Simulation Source Notes

- If backend/API implementation needs mock data, document SQLite as the simulation source with schema/table names, seed-data coverage, indexes, and query responsibility.
- JSON examples are allowed for human-readable success/error samples, contract assertions, or OpenAPI examples, but must not be documented as the API data source for local simulation.
