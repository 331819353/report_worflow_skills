---
name: backend-development-workflow
description: "运行数据服务/后端阶段，把API清单和数据模型转成API文档，或在用户明确要求时实现后端接口和本地服务。用户提到后端、服务端、数据服务、接口实现、接口开发、API文档、Flask/FastAPI/Spring/Express、数据库/上游API接入、鉴权中间件、Haier IAMA、启动后端、本地后端URL时触发。"
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
- Treat API docs as the contract source of truth for downstream frontend/testing. Implemented routes, examples, errors, auth behavior, and docs must stay aligned after every change.
- When consumer evidence, API docs, models, routes, source samples, env/auth notes, or runtime traces disagree, run `$quality-gate-validation`; run `$api-contract-validation` before and after route or response changes.
- For report/database endpoints, push global filters, permission scope, sorting, pagination, joins, aggregation, counts, Top/Bottom, and export scope into the source/repository/query layer. Broad load-then-filter behavior is blocked except for tiny static enums or documented component-internal display filters.
- Mock-derived backend implementation must use a SQLite fixture database with schema, seed rows, indexes, and parameter-varying behavior. JSON or in-memory arrays are examples/assertions only, not the API data source.
- Missing source, formula, enum, auth, env, permission, quality, or performance facts must be captured through `$gap-ledger-management` or a standard artifact, not hidden in code comments.
- Production readiness requires source-mode proof, health/smoke evidence, auth/config handling, observability, performance/pagination/export limits, deployment/rollback notes, and testing handoff.

## Workflow

1. Choose mode: API documentation, backend implementation, or backend repair/debug.
2. Inspect project stack, API inventory, data model, env/auth notes, source evidence, and existing routes.
3. Run `$quality-gate-validation` when docs, models, routes, source samples, runtime traces, or frontend contracts conflict.
4. In documentation mode, use `$api-documentation-design` and mark partial/blocked endpoints visibly.
5. In implementation mode, design transformations with `$data-transformation-adapter-design`, validate contracts with `$api-contract-validation`, and record gaps with `$gap-ledger-management`.
6. Use `$data-quality-validation` when real data trust, refresh SLA, completeness, uniqueness, accuracy, anomalies, drift, or cross-source reconciliation affects the backend/API handoff.
7. Use `$haier-sso-integration` when Haier IAM/IAMA auth or `Application-Key`/`Access-Token` validation is in scope.
8. Use `$performance-optimization` for SQL, pagination, cache, connection pool, export, or latency concerns.
9. Keep API docs, implemented routes, examples, auth behavior, errors, and missing-info notes consistent.
10. Run focused tests/smoke checks and start the service when a URL is requested.
11. Use `$production-observability-feedback` for production-bound monitoring and feedback closure.

## Required Output

- Mode, inputs, and project stack.
- API文档 and/or implemented backend changes.
- Contract validation and transformation notes.
- Auth/SSO behavior when relevant.
- Gaps, performance limits, observability notes.
- SQLite fixture/source-mode notes when simulation or mock-derived backend work is used.
- Verification commands and backend URL or blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not implement backend code when the user only asked for API documentation.
- Do not publish broad unbounded list endpoints without pagination/performance notes.
- Do not hide source/formula/auth/env gaps in code comments only.
- Do not claim production readiness without source mode, auth/config, health, contract, performance, and testing handoff evidence.
