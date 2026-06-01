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

- State whether pagination is required.
- State default sort field and order.
- State allowed sort fields.
- State which filters are server-side.
- State whether keyword search is fuzzy, exact, or TBD.

For charts:

- State whether result ordering is meaningful.
- State whether top N and "others" aggregation exist.

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
- Timeout and retry behavior if relevant.
- Export row limit or async threshold when the API can export.
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
