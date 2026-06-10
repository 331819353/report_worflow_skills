# Stage Contract And Artifacts

Use this reference to keep the 技术方案 stage professional, explicit, and handoff-ready.

## Stage Boundary

The 技术方案 stage produces architecture and planning artifacts. It does not write backend code, frontend code, database DDL, production SQL jobs, or test automation unless the user explicitly asks for those deliverables.

Allowed outputs:

- 技术方案总览: business goal, scope, assumptions, key decisions, readiness, blockers.
- 技术架构设计: business capability view, system context, logical architecture, data flow, integration/API view, runtime/deployment view, security/permission view, operations view.
- 技术选型说明 / ADR: frontend, backend/data-service, data/storage, cache, deployment/runtime, observability, testing, and override decisions.
- 技术实现路径: phase roadmap, dependency order, owner actions, migration/backfill plan, release gate, rollback plan, acceptance evidence.
- API清单.
- 数据模型文件.
- 待补充数据模型清单 / 缺口台账.
- 指标治理包, 权限矩阵, 数据质量规则, 性能约束, risk register when in scope.
- Data-service runtime model: sync/async boundary, resource pools, Redis/cache/precompute strategy, invalidation, rate/concurrency limits, timeout/fallback, observability, capacity assumptions, release safety.
- Backend-friendly API design plan: reusable endpoint families, common request models, common response envelopes, error model, query context, service-layer mapping, and justified custom endpoint exceptions.
- API boundary and parameter-driven data-version contract: snapshot/latest-period context, snapshot role/reuse, request/query params, backend-injected permission/data scope, source-side predicates or precompute/snapshot lookups, cache key dimensions, and invalidation behavior.
- Handoff notes for 数据服务, 前端联调, 测试集成, 运维/上线.

Not allowed by default:

- Full API文档 with complete examples for every endpoint. That belongs to 数据服务/API文档阶段.
- Backend route implementation.
- Frontend request adapter implementation.
- Real database query implementation.
- Production migration scripts or database DDL.
- Test automation implementation.

## Professional Artifact Order

Use this order unless the user asks for a specialized artifact:

1. Human-readable executive summary.
2. Scope, source authority, constraints, and assumptions.
3. Architecture blueprint.
4. Technology selection and ADR table.
5. Data architecture and source/model mapping.
6. API and integration design.
7. Runtime, security, non-functional, and production readiness.
8. Implementation roadmap and release strategy.
9. Structured delivery artifacts: API清单, 数据模型文件, metric/permission/quality/performance matrices.
10. Gaps, risks, readiness, and next-stage owner actions.

Do not place API清单 before architecture decisions unless the user explicitly requests a quick API-only draft.

## Input Inventory Template

| Input ID | Type | File/path or source | Version/date | Owner | Coverage | Authority | Uncertainty |
| --- | --- | --- | --- | --- | --- | --- | --- |
| IN-001 | requirement / data-doc / metric-list / prototype-code / architecture-note / supporting |  |  |  | pages, models, metrics, APIs, runtime, or permissions covered | authoritative / supporting / obsolete / TBD | missing, stale, ambiguous, or confirmed |

Rules:

- Assign an `IN-*` ID to every source of truth.
- Prefer the user's file names and page/module names. Do not rename business objects unless the original name is unusable.
- If a file is absent but expected, add a pending item instead of silently skipping it.
- When sources conflict, identify the authoritative source or create `GAP-*`; do not resolve by taste.

## Architecture Blueprint Template

| View ID | View | Decision | Evidence/source | Impacted artifacts | Gaps/status |
| --- | --- | --- | --- | --- | --- |
| ARC-001 | Business capability | target users, business process, pages/modules, acceptance boundary | IN-* | API清单, 数据模型文件, roadmap | ready / partial / blocked |
| ARC-002 | System context | browser/client, API service, data service, auth/IAM, source systems, export/file service, scheduler, monitoring | IN-* | architecture, API清单, runtime model | ready / partial / blocked |
| ARC-003 | Logical modules | frontend modules, controllers, domain services, query planner, repositories/source adapters, cache service, formatter, export/task service | IN-* | API清单, service mapping | ready / partial / blocked |
| ARC-004 | Data flow | source -> logical model -> response model -> component, data-version and permission injection points | IN-* | 数据模型文件, API清单 | ready / partial / blocked |
| ARC-005 | Runtime/deployment | sync/async, pools, Redis/cache/precompute, task lifecycle, environments, scaling, rollback | IN-* | performance, ops handoff | ready / partial / blocked |
| ARC-006 | Security/operations | identity, role/data scope, masking, audit, logs, metrics, alerts, runbook boundary | IN-* | 权限矩阵, observability | ready / partial / blocked |

## Artifact Roles

| Artifact | Owns | Must not own |
| --- | --- | --- |
| 技术架构设计 | business/system/logical/data/runtime/security/operations views, boundaries, major constraints, data and control flow, deployment and release assumptions | endpoint-level JSON schemas, backend route code, UI pixel layout |
| 技术选型说明 / ADR | selected stack, alternatives, reasons, tradeoffs, override source, compatibility/test/migration/rollback impact, status | marketing claims, unowned preferences, implementation code |
| 技术实现路径 | phase plan, dependency order, owner actions, migration/backfill/release/rollback/test evidence, readiness gates | sprint micro-task breakdown unless requested |
| API清单 | Endpoint candidates, page/module coverage, backend reuse pattern, common request/response model family, request params at inventory level, response model names, source model dependencies, auth/permission notes, global SQL/source filter execution, component-internal local filter scope, SQL query-writing expectations for database-backed APIs, pagination/performance/resilience/cache/SLA notes, concurrency model expectation, Redis/cache/precompute expectation, connection-pool expectation, async/offline job expectation for long-running work, timeout/retry/fallback expectation, rate/concurrency-limit expectation, priority, status, SQLite fixture need when mock-derived implementation is expected | Full JSON schema examples for every response, backend implementation details |
| 数据模型文件 | Business analysis matrix, subject areas, business processes/objects, source models, logical models, response/view models, layer/type/grain decisions, field mapping, metric formulas/additivity/time口径, data-version fields such as snapshotDate/latestPeriod/loadBatch/dataVersion, transformations, security/masking rules, summary/wide-table decisions, history/SCD rules, many-to-many rules, quality rules, lineage, ownership, freshness | UI layout decisions, backend code, undocumented API response payloads as source models for other APIs |
| 待补充数据模型清单 / 缺口台账 | Missing or assumed requirement/source/model/metric/enum/join/sample/permission/security/performance-resilience/runtime/deployment items, owner questions, impact, status | Completed decisions without source, vague TODOs |

## Technology Selection Template

| ADR ID | Layer | Selected decision | Default or override | Reason | Alternatives/tradeoffs | Compatibility impact | Test/release impact | Owner/source | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ADR-001 | frontend | Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2 | default |  |  |  |  | IN-* / owner | ready / partial / blocked |
| ADR-002 | backend/data-service | Python + Flask + connection pools + Redis | default |  |  |  |  | IN-* / owner | ready / partial / blocked |
| ADR-003 | cache/precompute | Redis cache-aside / precompute table / materialized snapshot / none | default / override |  |  |  |  | IN-* / owner | ready / partial / blocked |

Default technology architecture:

- Self-developed frontend: `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2`. Use AntV S2 for pivot/cross/wide analytical tables, frozen-header grids, and dense metric matrices.
- Backend/data service: `Python + Flask + database/upstream connection pools + Redis`. Flask owns HTTP service composition; pools own database/upstream resource control; Redis owns cache/precompute, hot query acceleration, stampede protection, distributed locks, lightweight job/progress state, and rate/concurrency support when needed.

When a default is overridden, record the source of the override, affected artifacts, compatibility impact, regression scope, and rollback or migration decision.

## Data-Service Runtime Model

For production-bound or production-like backend/data-service design, the technical solution must state:

- sync vs async/offline boundary: which endpoints return synchronously, which export/report jobs use a task lifecycle, queue limits, retry/dead-letter, retention, and user-visible status;
- connection-pool ownership: database, upstream HTTP/API, Redis/cache pool sizes, acquire/connect/read timeouts, idle validation, saturation behavior, and health checks;
- Redis role: metadata/dictionary cache, permission cache, result cache, dashboard/widget cache, canonical snapshot cache, rate limit, distributed lock, idempotency key, job progress, or explicitly `none`;
- cache/precompute decision: cache-aside, precompute table, materialized snapshot, stale last-success fallback, warmup, or no cache with reason;
- cache-key dimensions: tenant/user/role/data-scope, report/source/data version, filters, pagination/sort, locale/unit, field visibility, and feature flags;
- invalidation/freshness: TTL, jitter, source-version invalidation, publish/rollback invalidation, manual refresh, stale tolerance, and freshness metadata returned to the client;
- traffic protection: rate limit, concurrency limit, request-size limit, max page/export rows, overload response, and backpressure;
- observability: request id, latency percentiles, cache hit ratio, Redis errors/latency, pool usage, queue length, slow query, stale fallback count, data freshness, and alert owner.

Do not call a backend/data-service plan `ready` when Redis is named but key dimensions, TTL/invalidation, permission safety, stampede protection, and fallback behavior are unknown.

## Backend-Friendly API Design Plan

Before backend/API handoff, state how API design supports simple, efficient, reusable backend implementation:

- endpoint families: metadata, filter-options, query, dashboard/snapshot, detail/drilldown, export, action, and health/status;
- common request models: query context, page request, selection request, export request, action request;
- common response envelopes: page, option item, KPI card, series data, column metadata, task status, meta, error;
- service-layer mapping: validator, permission service, query planner, repository/source adapter, cache service, formatter, export service, action service, audit/monitoring;
- custom endpoint exceptions: which endpoints require a bespoke controller/query/DTO shape and why common patterns do not fit.

A plan that creates a new controller/query/DTO for every similar widget is not backend-friendly unless the widgets truly have different grain, permission, source, lifecycle, or SLA.

## API Boundary And Parameter-Driven Data-Version Contract

For reports with current/latest/snapshot semantics, the technical solution must state:

- the snapshot role: overview-only component payload, canonical/shared snapshot dataset, endpoint response reused by a bounded component group, or local/demo artifact;
- which field names represent the data cut, such as `snapshotDate`, `latestPeriod`, `loadBatch`, `dataVersion`, report version, or source version;
- where those values come from, such as a filter-options endpoint, health endpoint, metadata endpoint, source partition, or release/snapshot table;
- which endpoints consume them as request/query context and which endpoints or components may reuse the snapshot/shared dataset, including snapshot/dashboard aggregate, metrics/trend, ranking, table, drilldown, export, and health endpoints;
- which business filters, organization filters, route params, and backend-injected permission/data-scope params constrain each endpoint;
- how the backend validates/defaults params before querying, including what happens when the client omits the data-version field;
- which source/logical/precompute/cache object each endpoint reads and which predicate, partition, lookup key, or Redis/cache key the params map to;
- cache-key dimensions and invalidation triggers;
- whether a snapshot response or materialized snapshot is allowed as a declared source for other metrics, and the exact grain, fields, filters, permission scope, cache key, and invalidation rules for that reuse.

A `snapshot` API can be a first-screen aggregate view, a canonical shared data cut, or both. When it is canonical, other metrics may reuse it; when it is only an overview payload, other endpoints should query their own source/precompute/cache data with the same request/defaulted params and backend-injected scope. Hidden in-memory or call-order-only reuse is not a stable contract.

## Implementation Roadmap Template

| Phase ID | Phase | Goal | Key tasks | Dependencies | Owner | Output | Acceptance evidence | Risk/GAP | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ROAD-001 | architecture and contract freeze | confirm architecture, stack, model, API families, permission, NFRs |  | IN-*/GAP-* |  | signed technical solution | review record / readiness table | RISK-* / GAP-* | ready / partial / blocked |
| ROAD-002 | backend/data-service implementation | implement API families, adapters, cache, auth, health |  | ADR-*/API-*/LGM-* |  | API docs and service | smoke/API tests | RISK-* / GAP-* | ready / partial / blocked |
| ROAD-003 | frontend integration | bind APIs, filters, tables/charts, states |  | API docs, response models |  | integrated page | browser QA evidence | RISK-* / GAP-* | ready / partial / blocked |
| ROAD-004 | testing and release | integration, performance, security, rollback, observability |  | runtime env, test data |  | release package | test report / monitor check | RISK-* / GAP-* | ready / partial / blocked |

## Risk Register Template

| Risk ID | Category | Description | Impact | Probability | Mitigation | Owner | Linked artifacts | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RISK-001 | source / metric / permission / performance / security / deployment / schedule |  | High / Medium / Low | High / Medium / Low |  |  | IN-*/ADR-*/API-*/LGM-*/GAP-* | open / mitigated / accepted / blocked |

## Handoff Meaning

Use these readiness labels:

- `ready`: Enough information exists for the next stage to document or implement without inventing core architecture, data, API, security, or runtime behavior.
- `partial`: Work can continue with explicit assumptions, but at least one non-blocking architecture/data/model/API/security/runtime decision remains open.
- `blocked`: A missing item prevents reliable API documentation, implementation, validation, release planning, or production operation.

Never label the whole stage `ready` when any P0 API, core metric, source relationship, permission rule, security boundary, runtime model, deployment/rollback requirement, or production readiness gate is `blocked`.
