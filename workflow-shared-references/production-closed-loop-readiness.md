# Production Closed Loop Readiness

Use this reference for technical architecture, data-service/backend, and testing-integration workflows when artifacts are expected to support real production delivery rather than only a prototype, demo, or one-off document.

The goal is to make the architecture -> data service -> frontend integration -> testing -> defect repair -> retest loop explicit and usable in production.

## Closed Loop Model

Production delivery is closed only when these links are traceable:

1. Requirement/prototype contract -> technical architecture.
2. Technical architecture -> API inventory, data model, source strategy, and risk/gap ledger.
3. API inventory + data model -> API documentation and backend implementation.
4. Backend implementation -> contract validation, runtime URL, health/smoke evidence, and consumer examples.
5. Frontend integration -> function description, runtime URL, API base, auth/env notes, and visual/runtime QA evidence.
6. Testing integration -> executable cases, evidence-backed results, defects routed to owner workflows.
7. Repair workflow -> retest evidence, status update, and closure criteria.

If any link is missing, the stage may still be `partial`, but it is not production-closed.

## Production Readiness Dimensions

Check these dimensions before marking a technical solution, data service, or testing package `ready` for production:

- Architecture decision: selected runtime topology, service boundary, data flow, dependency ownership, and why alternatives were rejected when relevant.
- Authoritative data source: source system/table/API/file owner, access method, refresh cadence, quality rule, fallback behavior, and sample evidence.
- API/model contract: endpoint boundary, request params, response model, transformations, error envelope, pagination/sorting/export, versioning, and backward compatibility.
- Security and permissions: SSO/auth, token/header rules, row/field/operation permission, masking, audit log, no-permission behavior, secret/config handling.
- Environment and deployment: dev/test/prod base URLs, config variables, proxy/CORS, route/base path, deployment target, startup command, health endpoint, rollback or restore path.
- Reliability and observability: logging, request IDs, metrics, traces, health checks, timeout/retry, upstream failure handling, alert owner, and SLA/SLO where needed.
- Performance and capacity: expected volume, latency target, cache/precompute rule, pagination/export limits, slow-query risk, concurrency or batch behavior.
- Testability: seed data, test account/role, executable case matrix, smoke checks, API/display consistency checks, filter/permission/export cases, and visual regression evidence.
- Defect closure: every blocker/major defect has owner, reproduction, expected/actual, evidence, fix location, retest criteria, and final status.

## Minimal Production Skill Chain

Using fewer skills is acceptable only when the skipped areas are truly out of scope or already proven by evidence. For production-bound delivery, these skill groups form the minimal closed loop:

| Stage | Minimal skill chain | Production risk if skipped |
| --- | --- | --- |
| Requirement and technical architecture | `$report-requirement-structure-extraction` when inputs are rough, then `$data-model-source-mapping`, `$api-inventory-design`, `$missing-model-management` | API/model artifacts may be traceable on paper but miss business scope, source authority, permissions, or model gaps. |
| Data service and backend | `$api-documentation-design`, `$backend-data-transformation-design` when mappings/formulas differ, `$backend-api-contract-validation`, `$backend-missing-info-management`, SSO skill when auth is in scope | API docs or services may run locally but lack authoritative source, auth/config, runtime evidence, or contract proof. |
| Frontend integration handoff | `$frontend-api-contract-validation`, `$frontend-response-adapter-design` when provider shape differs, `$frontend-env-deployment-verification`, `$frontend-runtime-qa-validation`, `$frontend-function-description-documentation` | Testing may receive a URL without knowing provider mode, retained mocks, auth/env behavior, visual/runtime evidence, or blockers. |
| Testing and release acceptance | `$integration-test-case-design`, `$runtime-url-smoke-test`, `$sso-auth-flow-test` when auth is in scope, `$frontend-backend-data-consistency-test`, `$filter-linkage-completeness-test`, `$test-evidence-defect-reporting` | Results may become a one-time smoke report instead of executable acceptance with evidence, owner routing, and retest closure. |

Do not add child skills mechanically. Add the skill when its trigger condition exists; otherwise record why the area is out of scope, already evidenced, or intentionally deferred.

## Status Rules

- `ready`: all production readiness dimensions needed by the stated scope are confirmed, implemented or documented, and tested enough for the next stage to proceed without inventing behavior.
- `partial`: the stage can proceed for limited scope or non-prod/demo use, with named assumptions, accepted risks, or missing production controls.
- `blocked`: a missing or failed production readiness item prevents reliable downstream use.

Do not mark production readiness `ready` when any of these are unknown for a production-bound scope: authoritative source, P0 metric口径, auth/permission, API version/contract, runtime URL/health, environment config, rollback path, or retest criteria for open blocker/major defects.

## Required Production Handoff

For technical architecture / technical solution:

- Architecture overview: service boundary, runtime topology, data flow, dependencies, environments, and key decisions.
- API inventory, data model, and gap ledger.
- Nonfunctional requirements: auth, permissions, performance, observability, deployment, rollback, and testability.
- Production readiness status and blockers.

For data service / backend:

- API document and implementation status.
- Runtime backend URL or startup blocker.
- Health/smoke evidence, contract validation, source mode, transformation validation, auth behavior, and missing-info document.
- Deployment/config notes, observability notes, performance limits, and rollback notes.

For testing integration:

- Test case matrix, execution result, environment/version/account, frontend/backend URLs, evidence, and defect list.
- Retest loop status: open/fixed/retest/closed/blocked for every blocker/major defect.
- Final readiness: pass, partial pass, fail, or blocked with exact production risk.

## Defect Retest Loop

Every blocker or major defect must move through:

1. `open`: evidence captured and owner assigned.
2. `fixed`: owner reports a fix with changed artifact/version.
3. `retest`: tester reruns the exact retest criteria.
4. `closed`: expected result verified with evidence.
5. `blocked`: retest cannot run due to named missing URL/account/data/env/permission.

Do not close a defect from a statement alone; closure needs retest evidence.
