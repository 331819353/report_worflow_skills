---
name: backend-development-workflow
description: "运行数据服务/后端阶段，把技术方案、API清单和数据模型转成专业数据服务设计、API文档，或在用户明确要求时实现后端接口和本地服务。覆盖数据服务架构、查询服务链路、元数据驱动、API契约、数据转换适配、连接池、Redis/cache/precompute、权限注入、参数护栏、异步导出、观测审计、环境部署、生产准备、契约校验和运行URL。用户提到后端、服务端、数据服务、数据服务设计、接口实现、接口开发、API文档、默认后端技术栈、Python、Flask、连接池、Redis、snapshotDate/dataVersion/loadBatch、快照接口、接口依赖、筛选前数据完整性、数据库/上游API接入、更换数据源/数据表、API返回字段保持不变、新增字段规范命名、鉴权中间件、Haier IAMA、启动后端、本地后端URL时触发。"
---

# Backend Development Workflow

## Positioning

Use this workflow for data-service/backend work after, or alongside, the technical solution stage.

Choose exactly one mode before editing:

1. `data-service-design`: produce a backend/data-service design from a technical solution, API inventory, data model, or prototype contract. This mode does not implement code.
2. `api-documentation`: turn API inventory and data models into API documentation and handoff contracts.
3. `backend-implementation`: implement routes, database/upstream access, auth, cache, tests, or a running backend service. Use only when the user asks for code, routes, database access, or a service URL.
4. `backend-repair-debug`: inspect and fix an existing backend/API/runtime issue.

The professional data-service design answers:

- What service boundary and backend architecture will own the API contract?
- How will query context, permissions, metadata, source access, cache/precompute, and result formatting work?
- How will the service stay compatible when source tables/upstreams change?
- How will it perform, fail, recover, observe, export, deploy, and hand off to frontend/testing/operations?

## Reference Files

Load only the references needed for the current request:

- `references/data-service-design-template.md` for full data-service design outputs.
- `references/report-data-service-backend-implementation.md` for report/BI/dashboard query services, metadata-driven APIs, Redis, snapshots, export, audit, and slow-report governance.
- `references/api-document-template.md` only for legacy/simple API-document formatting; prefer `$api-documentation-design` for new standardized API docs.
- `references/missing-info-template.md` when unresolved backend/source/runtime facts must travel with the handoff.
- `$performance-optimization` references when Redis, cache, precompute, SQL, export, concurrency, connection pools, timeout, or capacity are in scope.

## Child Skills

| Stage | Skill |
| --- | --- |
| API documentation | `$api-documentation-design` |
| Contract validation | `$api-contract-validation` |
| Data transformation | `$data-transformation-adapter-design` |
| Data/source/model mapping | `$data-model-source-mapping` |
| Change impact | `$change-impact-analysis` |
| Standard artifact templates | `$delivery-artifact-template-management` |
| Gaps and blockers | `$gap-ledger-management` |
| Data quality | `$data-quality-validation` |
| Haier SSO | `$haier-sso-integration` |
| Performance/runtime | `$performance-optimization` |
| Production observability | `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Data-Service Architecture Scope

Every production-bound data service should decide these layers and boundaries:

| Layer | Required design decisions |
| --- | --- |
| API/controller layer | endpoint families, auth middleware, request validation, error envelope, health/readiness, versioning |
| Application/service layer | use-case orchestration, query context builder, permission injection, idempotency, audit hooks |
| Metadata/governance layer | report/dataset/dimension/metric/filter/sort metadata, whitelist, formula ownership, publish/rollback |
| Query/planning layer | source selection, parameter guardrails, sync/async decision, query grade, pagination/count/export strategy |
| Repository/source-adapter layer | database/upstream/file/client access, SQL/source predicate mapping, pooling, retries, source authority |
| Transformation/formatter layer | source-to-response mapping, DTO serializer, unit/precision/enum/default/null rules, component-ready shape |
| Cache/precompute layer | Redis roles, key dimensions, TTL/invalidation, warmup, stale fallback, stampede protection, permission safety |
| Async/export layer | task lifecycle, worker/queue limits, streaming/batch write, retention, download permission, audit |
| Security/permission layer | identity, tenant/org/data scope, row/field/action/export permission, masking, secrets/config |
| Operations layer | logs, metrics, traces, request id, slow query/report, pool/cache/queue monitoring, alert owner, runbook |
| Deployment/runtime layer | env profiles, config/secrets, startup, health checks, scaling, rollback, source-mode proof |

## Reinforced Constraints

- Data-service design mode must consume upstream technical-solution decisions when available: architecture blueprint, ADR, implementation roadmap, API清单, 数据模型文件, runtime/NFR, permission strategy, and gaps. If missing, mark the design `partial` or create `GAP-*`.
- For default backend/data-service work without an authoritative existing stack or user-specified override, use `Python + Flask + database/upstream connection pools + Redis`. Flask owns HTTP routing and service composition; connection pools own database/upstream resource control; Redis owns cache/precompute/session-like transient state, hot query acceleration, stampede protection, distributed locks where appropriate, idempotency keys, job progress, and rate/concurrency support when needed.
- Treat API docs as the contract source of truth for downstream frontend/testing. Implemented routes, examples, errors, auth behavior, and docs must stay aligned after every change.
- When consumer evidence, API docs, models, routes, source samples, env/auth notes, technical-solution decisions, or runtime traces disagree, run `$quality-gate-validation`; run `$api-contract-validation` before and after route or response changes.
- Treat the API response model as the external compatibility contract. When replacing a database table, upstream API, SQLite fixture, or data source path, keep existing response field names, nesting, types, units, precision, enum meanings, nullability, grain, formulas, empty/no-permission behavior, and display semantics stable unless an approved versioned breaking change is documented. Source column/table names must be absorbed by the mapping/adapter layer, not leaked into existing API fields.
- New response fields are additive by default and must follow the existing project naming convention; if none exists, use stable English lowerCamel field codes. Document source, meaning, type, unit, nullability, permission/sensitivity, and compatibility status before exposing them. Do not rename an old field to a better new name without deprecation/versioning.
- Data services should output structured data, metadata, status codes, dictionaries, and necessary machine-readable facts by default. Do not assemble presentation text, business conclusions, paragraphs, rich text, HTML/Markdown, combined value+unit strings, or style-implied labels in backend responses unless the contract explicitly requires a server-owned legal/audit/notification/error message or a governed business explanation. Prefer fields such as `value`, `unit`, `trendDirection`, `thresholdLevel`, `reasonCode`, `messageKey`, and `messageParams` so frontend can control copy, styling, localization, emphasis, and layout.
- For snapshot/latest-period report services, classify the snapshot role before design or implementation. Data-bearing endpoints may be independent query-service entry points or may derive from a declared canonical/shared snapshot when the contract proves matching data-version, filters, permission scope, grain, fields, cache key, and invalidation. Do not make metrics/trend/table/export routes depend on undocumented snapshot route responses, controller memory, or frontend call order.
- Build a backend query context before querying: validated client params, backend-defaulted data-version params, backend-injected tenant/user/role/data-scope params, pagination/sort, and route/drilldown params. Pass that context into repository/source/provider/precompute/cache lookups so the correct data version and scope are enforced by parameters.
- When Redis is used, document its exact role and operational contract: key template, TTL/invalidation, permission-safety dimensions, miss/stampede behavior, stale/fallback behavior, connection pool/timeouts, and observability. Do not leave Redis as a generic "cache" note.
- For report/database endpoints, push global filters, permission scope, sorting, pagination, joins, aggregation, counts, Top/Bottom, and export scope into the source/repository/query layer. Broad load-then-filter behavior is blocked except for tiny static enums or documented component-internal display filters.
- Before implementing or accepting filter-bound endpoints, prove data completeness first: filter option rows, source/provider rows, required fields, default and non-default request/response states, empty/no-permission states when relevant, and resolver/API branches must exist at the required grain.
- Mock-derived backend implementation must use a SQLite fixture database with schema, seed rows, indexes, and parameter-varying behavior. JSON or in-memory arrays are examples/assertions only, not the API data source.
- Missing source, formula, enum, auth, env, permission, quality, performance, deployment, or operations facts must be captured through `$gap-ledger-management` or a standard artifact, not hidden in code comments.
- Production readiness requires source-mode proof, health/smoke evidence, auth/config handling, observability, performance/pagination/export limits, deployment/rollback notes, and testing handoff.

## Workflow

1. Choose mode: `data-service-design`, `api-documentation`, `backend-implementation`, or `backend-repair-debug`.
2. Inspect technical solution, project stack, API inventory, data model, env/auth notes, source evidence, existing routes, runtime traces, and frontend contracts. If no existing backend stack is authoritative, align the solution or implementation to the default `Python + Flask + connection pools + Redis` stack.
3. Run `$quality-gate-validation` when docs, models, routes, source samples, runtime traces, frontend contracts, or upstream technical-solution decisions conflict.
4. In `data-service-design` mode, define service boundary, layered architecture, runtime model, metadata/query chain, source-adapter strategy, compatibility strategy, security/permission strategy, observability, deployment/rollback, and handoff readiness. Use `references/data-service-design-template.md`.
5. In `api-documentation` mode, use `$api-documentation-design` and mark partial/blocked endpoints visibly.
6. In `backend-implementation` mode, design transformations with `$data-transformation-adapter-design`, validate contracts with `$api-contract-validation`, and record gaps with `$gap-ledger-management`.
7. In `backend-repair-debug` mode, compare implementation, docs, response contracts, source samples, logs, and consumer expectations before patching. Keep the fix scoped to the failing contract.
8. When a source table/upstream/fixture is replaced, create a compatibility mapping before route changes: existing response field -> old source -> new source -> transformation/default/null rule -> verification evidence. Route source mapping questions to `$data-model-source-mapping`; route breaking/API-field decisions to `$change-impact-analysis` and `$api-documentation-design`.
9. For filter-bearing endpoints, run or cite data-completeness checks before binding or route acceptance. Add SQLite seed rows, query branches, resolver branches, or upstream samples for default and non-default states before treating filter linkage as ready.
10. Use `$data-quality-validation` when real data trust, refresh SLA, completeness, uniqueness, accuracy, anomalies, drift, or cross-source reconciliation affects the backend/API handoff.
11. Use `$haier-sso-integration` when Haier IAM/IAMA auth or `Application-Key`/`Access-Token` validation is in scope.
12. Use `$performance-optimization` for SQL, pagination, cache, connection pool, export, latency, concurrency, rate limit, or capacity concerns.
13. Keep API docs, implemented routes, examples, auth behavior, errors, runtime notes, and missing-info notes consistent.
14. Run focused tests/smoke checks and start the service when a URL is requested.
15. Use `$production-observability-feedback` for production-bound monitoring and feedback closure.

## Required Output

- Mode, inputs, upstream technical-solution linkage, and project stack.
- Data-service design summary: service boundary, design scope, selected architecture, backend stack decision, readiness, and blockers.
- Backend stack decision: Python/Flask, connection-pool ownership, Redis/cache role, and override reason if not using the default stack.
- Layered data-service architecture: controller/API, service/use-case, metadata/governance, query planner, repository/source adapter, transformation/formatter, cache/precompute, async/export, security, observability, deployment/runtime.
- Query-service chain design: report metadata, dimension/metric/filter/sort whitelist, parameter guardrails, permission injection, query plan, source/precompute/cache lookup, result formatting, audit, and monitoring.
- Data-service runtime model: sync/async boundary, source and cache pools, Redis role matrix, cache/precompute/invalidation strategy, rate/concurrency limits, timeout/fallback, stale policy, and observability.
- Backend-friendly API design or implementation plan: endpoint families, common request/response models, service-layer mapping, error envelope, health/status endpoints, and custom endpoint exceptions.
- Data-vs-presentation boundary: which fields are raw/structured data, which metadata supports frontend display, which text is server-owned by exception, and which conclusions/copy must be composed by frontend.
- Source/table replacement compatibility matrix when source changes: old source, new source, unchanged response fields, additive fields, transforms/defaults, and breaking-change/versioning decisions.
- Parameter-driven data-version, scope-filtering, snapshot role/reuse, and endpoint-dependency proof when snapshot/latest-period endpoints exist.
- Security and permission design: identity/auth, tenant/org/data scope, row/field/action/export permission, masking, audit, secrets/config.
- Export and long-running-work design: async task lifecycle, queue/worker bounds, retention, download permission, audit, retry/dead-letter, and overload behavior.
- API文档 and/or implemented backend changes when the selected mode requires them.
- Contract validation and transformation notes.
- Filter data-completeness proof before binding: options, rows/responses, fields, default/non-default states, and resolver/API branches.
- Auth/SSO behavior when relevant.
- Gaps, risks, performance limits, observability notes, deployment/rollback notes.
- SQLite fixture/source-mode notes when simulation or mock-derived backend work is used.
- Verification commands and backend URL or blocker when implementation/runtime work is in scope.
- Readiness: `ready`, `partial`, or `blocked`, with next owner actions.

## Quality Gate

- Do not implement backend code when the user only asked for data-service design or API documentation.
- Do not leave the backend stack vague or switch to FastAPI/Spring/Express/Node by default; use Python/Flask with connection pools and Redis unless the user or existing project explicitly overrides it.
- Data-service design cannot be `ready` when service boundaries, layered architecture, query-service chain, runtime model, security/permission, observability, deployment/rollback, and downstream handoff are missing for production-bound scope.
- Do not accept a production-bound API handoff that would require one custom controller/query/DTO shape per similar widget unless the custom reason is explicit.
- Do not change existing API response field names, nesting, type/unit/precision/enum/nullability semantics, formulas, grain, or empty/no-permission behavior just because the backend source table, upstream API, or fixture changed. Use an adapter/mapping repair or versioned deprecation plan instead.
- Do not expose newly discovered source columns as API fields until they are named by the project convention, documented as additive fields, traced to source/model, and covered by contract validation.
- Do not make data services assemble avoidable display text, conclusions, HTML/Markdown, or combined text/value/unit payloads that prevent frontend styling, localization, responsive layout, or emphasis control. Return structured facts and metadata instead; document any server-owned text exception and why it cannot be composed safely by the frontend.
- Do not implement metrics/trends/rankings/tables/drilldowns/exports by reading an undocumented snapshot API response or app-memory snapshot. Declared canonical/shared snapshot reuse is allowed; hidden response-payload dependency is not.
- Do not use Redis without key dimensions, TTL/invalidation, permission safety, miss/stampede behavior, fallback, pool/timeouts, and observability.
- Do not return correct-looking version/scope metadata while querying unscoped or default-only data. Data-version, business filters, and permission/data scope must be part of repository/source/precompute/cache parameters.
- Do not publish broad unbounded list endpoints without pagination/performance notes.
- Do not claim filter-bound backend/API readiness when the data completeness check was skipped or only a single default snapshot exists for an affecting filter.
- Do not hide source/formula/auth/env gaps in code comments only.
- Do not claim production readiness without source mode, auth/config, health, contract, performance, deployment/rollback, observability, and testing handoff evidence.
