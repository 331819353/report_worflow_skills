---
name: backend-development-workflow
description: "运行数据服务/后端阶段，把API清单和数据模型转成API文档，或在用户明确要求时实现后端接口和本地服务。用户提到后端、服务端、数据服务、接口实现、接口开发、API文档、默认后端技术栈、Python、Flask、连接池、Redis、筛选前数据完整性、数据库/上游API接入、鉴权中间件、Haier IAMA、启动后端、本地后端URL时触发。"
---

# Backend Development Workflow

## Positioning

Use this workflow for data-service/backend work. Default mode is API documentation from API inventory and data model. Implementation mode starts only when the user asks for code, routes, database access, or a running backend service.

## Child Skills

| Stage | Skill |
| --- | --- |
| API documentation | `$api-documentation-design` |
| Contract validation | `$api-contract-validation` |
| Data transformation | `$data-transformation-adapter-design` |
| Standard artifact templates | `$delivery-artifact-template-management` |
| Gaps and blockers | `$gap-ledger-management` |
| Data quality | `$data-quality-validation` |
| Haier SSO | `$haier-sso-integration` |
| Performance | `$performance-optimization` |
| Production observability | `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `references/report-data-service-backend-implementation.md` when the backend is a report/BI/dashboard query service, or when production readiness depends on metadata, source/SQL mapping, permission injection, component-ready response shape, async export, audit, cache safety, or slow-report governance.
- Existing backend document/missing-info references are legacy handoff aids; prefer `$api-documentation-design`, `$gap-ledger-management`, and `$delivery-artifact-template-management` for new standardized artifacts.

## Reinforced Constraints

- Choose exactly one mode before editing: API documentation, backend implementation, or backend repair/debug. Do not enter implementation mode unless the user asks for code, routes, database access, or a running service.
- For default backend/data-service work without an authoritative existing stack or user-specified override, use `Python + Flask + database/upstream connection pools + Redis`. Flask owns HTTP routing and service composition; connection pools own database/upstream resource control; Redis owns cache/precompute/session-like transient state, hot query acceleration, stampede protection, and rate/concurrency support when needed.
- Treat API docs as the contract source of truth for downstream frontend/testing. Implemented routes, examples, errors, auth behavior, and docs must stay aligned after every change.
- When consumer evidence, API docs, models, routes, source samples, env/auth notes, or runtime traces disagree, run `$quality-gate-validation`; run `$api-contract-validation` before and after route or response changes.
- For report/database endpoints, push global filters, permission scope, sorting, pagination, joins, aggregation, counts, Top/Bottom, and export scope into the source/repository/query layer. Broad load-then-filter behavior is blocked except for tiny static enums or documented component-internal display filters.
- Before implementing or accepting filter-bound endpoints, prove data completeness first: filter option rows, source/provider rows, required fields, default and non-default request/response states, empty/no-permission states when relevant, and resolver/API branches must exist at the required grain.
- Mock-derived backend implementation must use a SQLite fixture database with schema, seed rows, indexes, and parameter-varying behavior. JSON or in-memory arrays are examples/assertions only, not the API data source.
- Missing source, formula, enum, auth, env, permission, quality, or performance facts must be captured through `$gap-ledger-management` or a standard artifact, not hidden in code comments.
- Production readiness requires source-mode proof, health/smoke evidence, auth/config handling, observability, performance/pagination/export limits, deployment/rollback notes, and testing handoff.

## Workflow

1. Choose mode: API documentation, backend implementation, or backend repair/debug.
2. Inspect project stack, API inventory, data model, env/auth notes, source evidence, and existing routes. If no existing backend stack is authoritative, align the solution or implementation to the default `Python + Flask + connection pools + Redis` stack.
3. Run `$quality-gate-validation` when docs, models, routes, source samples, runtime traces, or frontend contracts conflict.
4. In documentation mode, use `$api-documentation-design` and mark partial/blocked endpoints visibly.
5. In implementation mode, design transformations with `$data-transformation-adapter-design`, validate contracts with `$api-contract-validation`, and record gaps with `$gap-ledger-management`.
6. For filter-bearing endpoints, run or cite data-completeness checks before binding or route acceptance. Add SQLite seed rows, query branches, resolver branches, or upstream samples for default and non-default states before treating filter linkage as ready.
7. Use `$data-quality-validation` when real data trust, refresh SLA, completeness, uniqueness, accuracy, anomalies, drift, or cross-source reconciliation affects the backend/API handoff.
8. Use `$haier-sso-integration` when Haier IAM/IAMA auth or `Application-Key`/`Access-Token` validation is in scope.
9. Use `$performance-optimization` for SQL, pagination, cache, connection pool, export, or latency concerns.
10. Keep API docs, implemented routes, examples, auth behavior, errors, and missing-info notes consistent.
11. Run focused tests/smoke checks and start the service when a URL is requested.
12. Use `$production-observability-feedback` for production-bound monitoring and feedback closure.

## Required Output

- Mode, inputs, and project stack.
- Backend stack decision: Python/Flask, connection-pool ownership, Redis/cache role, and override reason if not using the default stack.
- API文档 and/or implemented backend changes.
- Contract validation and transformation notes.
- Filter data-completeness proof before binding: options, rows/responses, fields, default/non-default states, and resolver/API branches.
- Auth/SSO behavior when relevant.
- Gaps, performance limits, observability notes.
- SQLite fixture/source-mode notes when simulation or mock-derived backend work is used.
- Verification commands and backend URL or blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not implement backend code when the user only asked for API documentation.
- Do not leave the backend stack vague or switch to FastAPI/Spring/Express/Node by default; use Python/Flask with connection pools and Redis unless the user or existing project explicitly overrides it.
- Do not publish broad unbounded list endpoints without pagination/performance notes.
- Do not claim filter-bound backend/API readiness when the data completeness check was skipped or only a single default snapshot exists for an affecting filter.
- Do not hide source/formula/auth/env gaps in code comments only.
- Do not claim production readiness without source mode, auth/config, health, contract, performance, and testing handoff evidence.
