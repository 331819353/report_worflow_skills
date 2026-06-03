# Request Response Auth Rules

Use this reference to define API inventory-level contracts.

## Request Params

List params by location:

- `path`: resource IDs or required drilldown identifiers.
- `query`: filters, period, org scope, pagination, sorting, keyword search.
- `body`: complex filters, export config, action payload, batch IDs.

Required filter details:

- Param name.
- Type.
- Required or optional.
- Default value.
- Source filter/control.
- Affected model/API behavior.
- Filter scope: global/page-level, permission-scope, route/drilldown, or component-internal.
- Source field or SQL predicate shape, such as `org_id = ?`, `biz_date >= ? AND biz_date < ?`, or `status IN (...)`.
- Index support: indexed / composite-indexed / function-indexed / full-text / unknown / not indexed.
- Execution stage: source/provider/repository query, precompute/cache, or explicitly bounded client/service post-process. Use `TBD(GAP-*)` when unknown.
- Gap ID if enum/options/default are unknown.

## Common Params

Use stable names unless the project already defines alternatives:

- `periodType`
- `startDate`
- `endDate`
- `orgId`
- `regionId`
- `productId`
- `customerId`
- `projectId`
- `keyword`
- `pageNo`
- `pageSize`
- `sortBy`
- `sortOrder`

## Response Contract At Inventory Level

Do not write full API docs here. State:

- Response model ID/name.
- Envelope shape if known, such as `data`, `list + total`, or `taskId`.
- Row grain.
- Required field groups.
- Empty state behavior.
- Error behavior only when special.

## Pagination, Sort, Filter

For list/table APIs:

- State pagination as required unless the result is a confirmed single-object lookup or small fixed enum.
- State `pageNo`/`pageSize` or project-specific pagination names, default page size, maximum page size, out-of-range behavior, and total-count behavior.
- State default sort field and order.
- State allowed sort fields.
- State which filters are server-side.
- State that global/page-level filters for database-backed APIs use SQL `WHERE` predicates or equivalent source/provider predicates. Component-internal filters may be local only when they operate on the already fetched component dataset and are not required for global scope, permission scope, pagination, ranking, aggregation, or counts.
- State that global filters, sorting, pagination, ranking, Top/Bottom, counts, and table slicing are applied before response construction. Page/API-level full-materialize-then-filter behavior is not acceptable for list/table APIs except documented component-internal filters over already fetched component data, tiny static enums, or bounded lookups.
- State whether keyword search is fuzzy, exact, or TBD.
- State whether each database-backed filter can use a direct indexed predicate. Avoid inventory designs that require `FUNCTION(field) = ?` on indexed columns; rewrite date/month filters to range predicates and mark unknown index support with a `GAP-*`.

For charts:

- State whether result ordering is meaningful.
- State whether top N and "others" aggregation exist.
- State whether grouping, aggregation, Top/Bottom, and counts are computed by SQL/database query or by an explicitly bounded non-database source. For database authoritative sources, default to SQL pushdown rather than in-memory calculation. Do not plan a chart API that builds the full component dataset and then filters/ranks/groups it after construction.

For mock-derived backend/API implementation:

- State the planned SQLite fixture database/table(s), seed-data coverage, and indexes.
- Do not use JSON files as the API data source. JSON can remain as response examples or assertion snapshots only.

## Auth And Permission

Auth/permission must include:

- Whether authentication is required.
- User identity source if known.
- Data scope: org, region, product, project, customer, role, or field-level.
- No-permission behavior: empty data, hidden field, 403, or hidden action.
- Sensitive-field behavior: full value, masked value, field hidden, role-limited, or `TBD(GAP-*)`.
- Gap ID when unknown.

## Performance Cache SLA

For every P0 API, state:

- Expected data volume or row count range.
- Latency target or SLA if known.
- Cache, precompute, or real-time expectation.
- Redis/cache expectation when useful for hot or expensive queries, including cache key dimensions, TTL, invalidation, stampede protection, permission safety, and fallback.
- Database connection-pool expectation: existing pool / new pool / externally managed, with max size and timeout assumptions.
- Timeout and retry behavior if relevant.
- Export row limit or async threshold when the API can export.
- Index or precompute requirement for P0 filters, sorts, joins, and aggregations.
- Pagination/default page size/maximum page size for every list/table API.
- Proof that P0 filters, sorts, pagination, ranking, grouping, and aggregations are source-side or provider-side, not full-materialize-then-filter.
- Gap ID when any required performance decision is unknown.

## Export APIs

State:

- Reused filters from list/table API.
- Export format.
- Sync file stream, async task ID, or download URL.
- Max row limit if known.
- Async threshold, timeout, and retry behavior when known.
- Permission behavior.

## Action APIs

State:

- Action payload.
- Idempotency key or duplicate-submission behavior.
- Permission rule.
- Success state.
- Failure state.
- Audit/log requirement.
