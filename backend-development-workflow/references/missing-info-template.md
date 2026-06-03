# Missing Information Document Template

Use this structure when backend work must output unresolved or assumed information alongside the API document.

## 1. Overview

- Service name:
- Related API document:
- Date:
- Author:
- Current status: `open` / `partially resolved` / `no known missing items`

## 2. Missing Information Summary

| ID | Area | Missing Or Assumed Item | Impact | Current Handling | Production Readiness Impact | Owner/Question | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MI-001 | Data transformation | Confirm whether source `YYYYMMDD` should become response `YYYYMM` by truncation or calendar aggregation. | Monthly trend may be inaccurate if aggregation rule is wrong. | Temporarily aggregate by first six characters and sum numeric measures. | Production readiness remains partial until aggregation rule is confirmed. | Confirm with data owner. | Open |

## 3. Data Source Gaps

Document unavailable files, missing tables, incomplete rows, malformed values, unknown refresh cadence, missing join keys, or unclear authoritative sources.

When backend work starts from mock data, authoritative source replacement gaps are blockers for full completion:

- Missing authoritative source type:
- Missing database type, upstream API, file/object-store path, event topic, or service client:
- Missing credentials or environment variables:
- Missing table/view names, endpoint paths, object keys, topic names, or client methods:
- Missing SQL, query rules, request contract, file format, event schema, or client contract:
- Missing index metadata, composite index rules, generated/normalized columns, full-text index availability, or query-plan evidence for required filters/sorts:
- Missing sample rows for validation:
- Missing join keys:
- Missing permissions/network access:
- Unknown default data-source mode:
- Missing SQLite fixture schema, seed rows, indexes, or query rules for mock-derived API implementation:
- Reason SQLite fixture remains temporary:

## 4. Data Model And Field Gaps

Document source fields that have no response mapping, response fields missing from source data, unknown field types, nullable rules, ID semantics, enum dictionaries, units, precision, or validation rules.

## 5. Transformation Gaps

Document unresolved conversion and aggregation rules, including:

- Date/period conversion such as `YYYYMMDD -> YYYYMM`.
- Daily-to-monthly or row-to-summary aggregation.
- Formula definitions for derived metrics.
- Unit conversion and rounding.
- Enum code-to-label mapping.
- Fill/default behavior for missing display fields.
- Sort, grouping, ranking, and Top/Bottom rules.

For every temporary transformation assumption, keep the same rule in code defaults, the API document, and this missing-information document.

## 6. API Contract Gaps

Document unclear request parameters, pagination/sort/filter behavior, response examples, error codes, file upload/download details, rate limits, or compatibility requirements from the frontend.

When replacing frontend mock data, record any mismatch between the mock/display contract and the backend response contract:

- Missing frontend-required fields:
- Different field names or nesting:
- Unit or precision mismatch:
- Empty-state response mismatch:
- Unknown filter option values:
- Sort/order mismatch:

## 7. Performance And Scale Gaps

Document unknown or unconfirmed performance limits:

- Default and maximum page size:
- Stable default sort:
- Total-count behavior:
- Cursor/keyset pagination need:
- Maximum export rows:
- Cache or precompute requirement:
- Redis/cache need, cache key dimensions, TTL, invalidation, and permission safety:
- Database connection pool configuration, max connections, timeout, and health-check behavior:
- Refresh cadence:
- Timeout/retry behavior:
- Large-file, database, or upstream API failure behavior:
- SQL pushdown feasibility for filters, pagination, sorting, joins, aggregation, Top/Bottom, and counts:
- Missing distinction between global SQL `WHERE` filters and component-internal local filters:
- Full-materialize-then-filter risk or missing proof that filters/sort/page/aggregation execute before response construction:
- Index support for required filters/sorts:
- Any unavoidable non-sargable predicates, such as `FUNCTION(field) = ?`, date extraction, arithmetic on indexed columns, or leading-wildcard search:

## 8. Auth, Config, And Deployment Gaps

Document missing SSO values, token/header contracts, environment variables, proxy/CORS decisions, ports, database credentials, deployment targets, or network dependencies.

Also document production-readiness gaps:

- Missing health/readiness endpoint:
- Missing runtime URL or deployment target:
- Missing startup command or config profile:
- Missing log/request ID/trace/metric behavior:
- Missing alert owner or failure escalation path:
- Missing rollback or restore path:
- Missing retest criteria or retest evidence for blocker/major defects:

## 9. Resolution Log

| Date | ID | Decision | Changed Files/APIs | Remaining Risk |
| --- | --- | --- | --- | --- |
