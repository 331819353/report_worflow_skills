# Handoff Quality Gate

Use this reference before delivering the API document or handing it to frontend, backend, QA, or downstream documentation work.

## Readiness Checks

- Every expected endpoint is documented or explicitly removed with a reason.
- Common conventions are defined before endpoint details.
- Each endpoint has method, path, purpose, trigger, auth, request parameters, response schema, examples, errors, performance notes, status, and pending items.
- Each data-bearing endpoint identifies the component or justified component group it serves.
- Each response schema traces to implementation, model/source, upstream API, frontend contract, or explicit design decision.
- Each transformation rule is documented inline, linked to a local transformation note, or marked with `TBD(GAP-*)` plus owner/impact.
- Each missing decision is recorded in pending items with a stable `GAP-*` ID, owner question, impact, and blocking status.
- Endpoint examples are usable by frontend integration and integration-test case design.
- Error and empty-state shapes are consistent across endpoints.
- Pagination, sorting, filtering, export, and drilldown rules use stable names and defaults.
- Global/page-level filters for database-backed endpoints are mapped to SQL `WHERE` or equivalent source/provider predicates; component-internal local filters are explicitly scoped to already fetched component datasets.
- Database-backed endpoints document SQL pushdown scope, direct predicate/filter mapping, index support, and any non-sargable filter blockers.
- Endpoints document the execution stage for filters, sorting, pagination, ranking, Top/Bottom, grouping, aggregation, and counts; any full-materialize-then-filter behavior is `partial` or `blocked` unless the input is a documented tiny static enum or bounded lookup.
- Database-backed implementation handoff documents connection-pool behavior or confirms the runtime/project already owns pooling.
- Redis/cache behavior is documented when used for hot or expensive queries, including key dimensions, TTL, invalidation, permission safety, and fallback.
- Collection/list/table endpoints document bounded pagination, default/max page size, stable sorting, total-count behavior, and large-result/export handling.
- Backend/API implementation handoff that needs mock data uses SQLite fixture databases for simulation; JSON files are response examples only, not data sources.
- Frontend compute policy is explicit. APIs should return component-ready values, series, rows, totals, ranks, and formula fields; any frontend-side business calculation exception is bounded and documented.
- Async jobs, callbacks, webhooks, streams, imports, or exports have lifecycle, retry, idempotency, retention, and failure behavior documented when relevant.
- Production-bound documents include source authority, runtime/environment notes, auth/permission behavior, health/runtime evidence, observability, performance/export limits, version compatibility, and testing handoff.

## Status Labels

- `ready`: enough detail exists for implementation, frontend integration, and tests.
- `partial`: usable with documented assumptions or limited behavior.
- `blocked`: missing source, permission, model, auth, environment, or business rule prevents reliable implementation/integration.
- `deprecated`: retained for compatibility but not recommended for new use.

For production-bound delivery, do not use `ready` when source authority, auth/permission, environment/base URL, runtime/health evidence, observability, performance/export limits, version compatibility, or testing handoff is missing.

## Handoff Summary

End delivery with:

- Ready endpoint count.
- Partial endpoint count and assumptions.
- Blocked endpoint count and exact blockers.
- Production closed-loop readiness and missing controls when applicable.
- Required owner confirmations.
- Suggested next validation activity, such as backend contract validation, frontend contract validation, or integration-test design, described as a handoff note rather than a prerequisite skill call.
