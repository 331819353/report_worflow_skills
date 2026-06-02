# Handoff Quality Gate

Use this reference before delivering the API document or handing it to frontend, backend, QA, or downstream documentation work.

## Readiness Checks

- Every expected endpoint is documented or explicitly removed with a reason.
- Common conventions are defined before endpoint details.
- Each endpoint has method, path, purpose, trigger, auth, request parameters, response schema, examples, errors, performance notes, status, and pending items.
- Each response schema traces to implementation, model/source, upstream API, frontend contract, or explicit design decision.
- Each transformation rule is documented inline, linked to a local transformation note, or marked with `TBD(GAP-*)` plus owner/impact.
- Each missing decision is recorded in pending items with a stable `GAP-*` ID, owner question, impact, and blocking status.
- Endpoint examples are usable by frontend integration and integration-test case design.
- Error and empty-state shapes are consistent across endpoints.
- Pagination, sorting, filtering, export, and drilldown rules use stable names and defaults.
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
