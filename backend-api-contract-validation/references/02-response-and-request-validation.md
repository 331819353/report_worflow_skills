# Response And Request Validation

Use this reference for detailed contract checks.

## Response Checks

- Required and optional fields.
- Field names, casing, aliases, and deprecated fields.
- Object/array nesting and item shape.
- Types, nullability, default values, units, precision, rounding, and enum values.
- Date/time/period format, timezone, fiscal/calendar assumptions, and sorting order.
- Empty-state shape, no-data shape, no-permission-scoped shape, and omitted-field behavior.
- Derived fields, aggregation values, totals, subtotals, and reconciliation with detail rows.

## Request Checks

- Path, query, header, and body parameter names.
- Required status, defaults, allowed values, multi-select behavior, and validation rules.
- Pagination names, defaults, maximums, total-count behavior, and out-of-range behavior.
- Sorting syntax, default sort, allowed fields, stable ordering, and invalid sort behavior.
- Filter names, date-range inclusivity, timezone, hierarchy filters, search behavior, and permission-scoped defaults.
- Upload/download content types, filenames, streaming behavior, and export limits.

## Error And Auth Checks

- HTTP status and business code.
- Error envelope shape, message, detail, trace id, and recoverability.
- Invalid-param, unauthorized, token-expired, token-invalid, valid-token/no-permission, rate-limit, timeout, upstream failure, and data-source failure behavior.
- Whether sensitive values such as credentials, tokens, secrets, or raw upstream payloads are excluded from errors and logs.

## Performance Checks

- Default and maximum page size.
- Export row/file limits.
- Timeout, retry, circuit-breaker, and fallback behavior.
- Cache/precompute assumptions and invalidation.
- Large result handling and known expensive filters or joins.
