# Document Structure

Use this reference when creating the API document skeleton.

## Recommended Structure

1. Document metadata
   - Title, version, date, owner, status, environment, related artifacts, and change notes.
2. Common conventions
   - Base URL, versioning, auth, headers, response envelope, error envelope, pagination, sorting, filtering, date/time, enums, file upload/download, idempotency, and rate/performance limits.
3. Endpoint overview table
   - API id, module/domain, name, method, path, purpose, auth, response model, priority, status, and pending items.
4. Endpoint details
   - Full detail for each endpoint. Use `03-endpoint-detail-rules.md`.
5. Model and dependency trace
   - Response models, source models, upstream systems, transformation notes, formulas, refresh cadence, data quality assumptions, and permission dependencies.
6. Appendix
   - Enums, error codes, common examples, unresolved items, glossary, and compatibility notes.

## Grouping Options

- By page/module when APIs are consumed by frontend pages or report modules.
- By domain/resource when APIs are REST-like or service-owned.
- By workflow step when APIs support a business process.
- By bounded service when documenting multiple backend services.
- By interaction style when documenting synchronous APIs, async jobs, webhook/callbacks, streaming/SSE, batch imports, or file exports.

## Common Convention Checklist

- Base URL per environment.
- Auth headers and token refresh/expiration behavior.
- Common request headers such as trace id, locale, tenant, app id, or client id.
- Common response envelope, including success and failure examples.
- Error envelope with HTTP status, business code, message, detail, trace id, and recoverability.
- Pagination names, defaults, maximums, and total-count behavior.
- Sorting syntax, allowed sort fields, and default sort.
- Filter syntax, date range inclusivity, timezone, enum values, and default filters.
- File upload/download content type, filename, streaming, and export size limits.
- Async job, callback, webhook, streaming, or batch-processing conventions when relevant.
- Backward compatibility and deprecation notes.
