---
name: backend-development-workflow
description: "运行数据服务/后端阶段，把技术方案、API清单和数据模型转成专业数据服务设计、API文档，或在用户明确要求时实现后端接口和本地服务。覆盖数据服务架构、查询服务链路、元数据驱动、API契约、数据转换适配、连接池、Redis/cache/precompute、权限注入、参数护栏、异步导出、观测审计、环境部署、生产准备、契约校验和运行URL。用户提到后端、服务端、数据服务、数据服务设计、接口实现、接口开发、API文档、默认后端技术栈、Python、Flask、连接池、Redis、snapshotDate/dataVersion/loadBatch、快照接口、接口依赖、筛选前数据完整性、数据库/上游API接入、更换数据源/数据表、API返回字段保持不变、新增字段规范命名、鉴权中间件、Haier IAMA、启动后端、本地后端URL时触发。"
---

# Backend Development Workflow

## Positioning

Use this workflow for the backend/data-service stage: convert a technical solution, API inventory, data model, or source mapping into a backend design, API documentation, implementation plan, or runnable backend service when explicitly requested.

It owns data-service runtime boundaries, route/service/query layering, contracts, transformation adapters, pools/cache/precompute, permissions, logging/observability, environment, deployment, and backend readiness.

## Reference Files

- `references/data-service-design-template.md` for backend/data-service design output.
- `references/api-document-template.md` for API documentation.
- `references/report-data-service-backend-implementation.md` for implementation details.
- `references/missing-info-template.md` for blocked or partial backend handoff.
- `references/backend-development-gates.md` for detailed constraints, required outputs, and readiness blockers.

## Child Skills

| Stage | Skill |
| --- | --- |
| API documentation | `$api-documentation-design` |
| API contract validation | `$api-contract-validation` |
| Data model/source mapping | `$data-model-source-mapping` |
| Transformation adapters | `$data-transformation-adapter-design` |
| Performance and Redis/cache/pool design | `$performance-optimization` |
| SSO/auth integration | `$haier-sso-integration` |
| Runtime URL smoke test | `$runtime-url-smoke-test` |
| Production observability | `$production-observability-feedback` |
| Delivery/code versioning | `$delivery-version-management` |
| Quality gates | `$quality-gate-validation` |

## Data-Service Architecture Scope

Decide endpoint families, request context, response envelope, service/query/source-adapter layers, transformation boundaries, data-version/snapshot role, filters/pagination/sorting/export scope, permission injection, pool/cache/precompute strategy, error model, logging, health/status endpoints, deployment, and rollback.

## Workflow

1. Inventory technical solution, API inventory, model/source mapping, metric口径, permissions, env/auth, and existing code.
2. Run quality gates when source/API/model/frontend expectations conflict.
3. Define data-service design: boundaries, layers, request context, response model, data-version contract, permission scope, cache/precompute, and observability.
4. Produce or update API documentation through `$api-documentation-design`.
5. Validate contracts against frontend expectations, source samples, OpenAPI, mocks, routes, and runtime responses.
6. Design transformation adapters for source-to-response and response-to-view-model compatibility.
7. If implementation is requested, edit backend code with code-file ledger discipline and preserve existing project patterns.
8. Configure pools, Redis/cache, timeouts, errors, logging, health checks, and env profiles.
9. Run available tests/build/startup and `$runtime-url-smoke-test` when a URL is produced.
10. Produce backend handoff notes, gaps, readiness, and version links.

## Required Output

- Backend/data-service design or implemented service summary.
- API documentation/contract status.
- Source/model/adapter mapping and response compatibility notes.
- Runtime model: pools, Redis/cache/precompute, timeout/fallback, export/async behavior, env/auth, health, logging, observability.
- Code-ledger proof when backend source changed.
- Verification commands, URL/smoke result, blockers, and readiness.

## Quality Gate

- Do not implement routes from UI fields alone; trace endpoints to source/model/metric/permission contracts.
- Existing API response fields are stable across source/table/upstream replacement unless a versioned breaking change is documented.
- Data-bearing endpoints must use request/defaulted version params, backend-injected permission/data scope, source predicates or cache/precompute keys; echoing metadata is not enough.
- Backend/data-service readiness needs diagnosable structured logs, connection release on errors/timeouts, env separation, and runtime verification.
- Load `backend-development-gates.md` before implementing, documenting, or accepting backend/data-service work.
