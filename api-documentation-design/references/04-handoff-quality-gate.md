# Handoff Quality Gate

Use this reference before delivering the API document or handing it to frontend, backend, QA, or downstream documentation work.

## Readiness Checks

- Every expected endpoint is documented or explicitly removed with a reason.
- Common conventions are defined before endpoint details.
- Each endpoint has method, path, purpose, trigger, auth, request parameters, response schema, examples, errors, performance notes, status, and pending items.
- Each response schema traces to implementation, model/source, upstream API, frontend contract, or explicit design decision.
- Each transformation rule is documented or linked to `$backend-data-transformation-design`.
- Each missing decision is recorded or linked to `$backend-missing-info-management`.
- Endpoint examples are usable by frontend integration and integration-test case design.
- Error and empty-state shapes are consistent across endpoints.
- Pagination, sorting, filtering, export, and drilldown rules use stable names and defaults.
- Async jobs, callbacks, webhooks, streams, imports, or exports have lifecycle, retry, idempotency, retention, and failure behavior documented when relevant.

## Status Labels

- `ready`: enough detail exists for implementation, frontend integration, and tests.
- `partial`: usable with documented assumptions or limited behavior.
- `blocked`: missing source, permission, model, auth, environment, or business rule prevents reliable implementation/integration.
- `deprecated`: retained for compatibility but not recommended for new use.

## Handoff Summary

End delivery with:

- Ready endpoint count.
- Partial endpoint count and assumptions.
- Blocked endpoint count and exact blockers.
- Required owner confirmations.
- Suggested next validation skill, such as `$backend-api-contract-validation`, `$frontend-api-contract-validation`, or integration-test design.
