# Endpoint Detail Rules

Use this reference when writing each endpoint section.

## Endpoint Section Template

- API ID and name:
- Business module, resource, page, or service:
- Purpose and trigger:
- Method and path:
- Auth and permission:
- Request headers:
- Path/query/body parameters:
- Response schema:
- Data/model/source trace:
- Transformation rules:
- Success example:
- Empty/no-data example:
- Error examples:
- Performance limits:
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
- Pagination, sorting, export, drilldown, and search behavior when supported.

## Response Schema

For each response field, document:

- Field name, type, required/nullability, description, unit, precision, enum dictionary, example, and compatibility notes.
- Array/object nesting, stable ordering, empty-state shape, and omitted-field behavior.
- Derived fields, aggregation grain, formula, rounding, default fill, and source trace.
- Whether the field is stable, experimental, deprecated, or pending confirmation.

## Examples

Include compact examples for:

- Successful response with representative data.
- Empty or no-permission-scoped data.
- Invalid parameter.
- Unauthorized or token expired.
- Valid token but no permission.
- Upstream/backend/data-source failure when relevant.

## Performance Notes

Document default and maximum page size, export limits, timeout expectations, cache/precompute behavior, large result handling, and any known slow filters or joins.
