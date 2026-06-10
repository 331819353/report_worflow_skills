---
name: technical-solution-workflow
description: "运行技术方案阶段，把需求、业务目标、指标、数据源、原型数据契约或mock转成专业可评审的技术方案。覆盖系统边界、技术架构设计、技术选型/ADR、数据架构、API与集成架构、运行时模型、性能/安全/可观测/部署回滚、实施路线、API清单、数据模型、指标治理、权限矩阵、数据质量规则、缺口台账、版本链路和后续交付门禁。用户提到技术方案、技术架构、架构设计、技术选型、实现路径、实施方案、默认技术栈、Vue3/TypeScript/ECharts/Element Plus/Axios/AntV S2、Python/Flask/连接池/Redis、接口规划、API清单、snapshotDate/dataVersion/loadBatch、快照接口、接口依赖、数据建模、字段映射、更换数据源/数据表、API返回字段保持不变、新增字段规范命名、筛选前数据完整性、指标口径、权限矩阵、质量规则、开发前梳理、mock转接口时触发。"
---

# Technical Solution Workflow

## Positioning

Use this workflow before implementation to produce a professional technical solution that can be reviewed by product, backend, frontend, data, QA, operations, and delivery owners.

The stage answers four questions before it generates inventories:

1. What business and delivery problem are we solving?
2. What architecture, boundaries, and runtime model will support it?
3. Why are these technologies and contracts the right choices?
4. How will the team implement, verify, release, operate, and evolve it?

It does not implement backend APIs, frontend pages, SQL jobs, or tests unless the user explicitly requests implementation. Its job is to make downstream implementation specific, traceable, and hard to misread.

## Professional Solution Principles

- Start from business capability and delivery constraints, then derive architecture and contracts. Do not start with endpoint names alone.
- Make system boundaries explicit: frontend, API service, domain/service layer, data adapter, cache/precompute, data source, identity/permission, external systems, scheduled jobs, file/export services, observability, deployment.
- Use architecture views, not one flat list: business context, system context, logical modules, data flow, runtime/deployment, security, integration, operations, and implementation roadmap.
- Treat technology selection as a decision record. State the selected stack, alternatives considered when relevant, reasons, tradeoffs, override source, and downstream impact.
- Design non-functional requirements as first-class deliverables: performance, capacity, availability, timeout, fallback, cache invalidation, concurrency, export scale, security, privacy, observability, deployment, rollback, and testability.
- Keep all contracts traceable: each API/model/metric/permission/quality rule must connect to a page, component, business process, source model, response model, gap, and readiness status.
- Prefer reusable backend patterns: common request context, common response envelope, endpoint families, service-layer mapping, cache policy, error model, health/status model, and justified exceptions.
- Use stable IDs and exact statuses across architecture decisions, API清单, 数据模型文件, 缺口台账, version index, and downstream handoffs. Artifact/API readiness values are `ready`, `partial`, or `blocked`.

## Reference Files

Load only the references needed for the current request:

- `references/01-stage-contract-and-artifacts.md` for stage boundary, artifact roles, architecture/ADR/runtime/roadmap templates, and handoff meaning.
- `references/02-consistency-gate.md` before finalizing any technical solution or handoff.
- `references/03-generation-stability.md` when stable IDs, section order, controlled statuses, or deterministic output is needed.
- `references/04-professional-solution-template.md` when the user asks for a full 技术方案, 技术架构设计, 技术选型, 实现路径, or production-bound implementation plan.

## Child Skills

| Stage | Skill |
| --- | --- |
| Rough requirement normalization | `$report-requirement-structure-extraction` |
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` when the solution includes forms, lists, detail pages, tables, navigation, dialogs, or workbench pages |
| Report/page baseline | `$report-design-system-governance` when the solution includes report, dashboard, BI, data-screen, or analysis pages |
| Data/source/model mapping | `$data-model-source-mapping` |
| API inventory | `$api-inventory-design` |
| Metric governance | `$metric-governance-lineage` |
| Permission matrix | `$permission-matrix-validation` |
| Data quality rules | `$data-quality-validation` |
| Gaps and assumptions | `$gap-ledger-management` |
| Quality gates | `$quality-gate-validation` |
| Performance/runtime constraints | `$performance-optimization` |
| Version alignment | `$delivery-version-management` |

## Architecture Scope

Every technical solution should decide which of these views are in scope. For production-bound work, all are expected unless explicitly out of scope.

| View | Required decisions |
| --- | --- |
| Business capability view | target users, business processes, report/page/module scope, success metrics, acceptance boundaries |
| System context view | upstream/downstream systems, browser/client, API service, data service, auth/IAM, database/warehouse/lake, file/export service, scheduler, monitoring |
| Logical architecture view | frontend modules, API controllers/families, domain services, query/planning layer, repositories/source adapters, cache service, formatter/DTO layer, export/task service |
| Data architecture view | source authority, source/logical/response models, grain, keys, partitions, metric formulas, lineage, data-version fields, snapshot/precompute role |
| Integration/API view | endpoint families, request context, response envelope, error model, pagination/sorting/filtering, compatibility/versioning, contract validation |
| Runtime/deployment view | sync/async boundary, pools, Redis/cache/precompute, task queue/export lifecycle, timeout/fallback, scaling, environment, deployment/rollback |
| Security/permission view | identity source, role/org/data scope, row/field/action/export permission, masking, audit, sensitive-data decision |
| Operations view | logs, metrics, tracing, request id, cache hit ratio, pool usage, queue length, slow query, data freshness, alert owner, runbook boundary |
| Delivery roadmap view | phase plan, milestone outputs, dependency order, migration/backfill strategy, test strategy, release gate, owner actions |

## Reinforced Constraints

- When requirements, source metadata, metric lists, prototype/mock contracts, previous API plans, architecture assumptions, or permission notes disagree, run `$quality-gate-validation` before producing final artifacts. Affected rows stay `partial` or `blocked` until the conflict is resolved.
- Default technology architecture must be explicit. For self-developed frontend delivery, use `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2` as the default stack, with AntV S2 used for pivot/cross/wide analytical tables and dense metric matrices. For default backend/data-service delivery, use `Python + Flask + database/upstream connection pools + Redis` for API service, cache/precompute, rate/concurrency protection, distributed locks where appropriate, hot query acceleration, stale fallback, and lightweight job/progress state when needed. Override only when the user specifies another stack or an existing project has an authoritative stack, and record the reason.
- Technology selection must include at least: selected stack, decision owner/source, reason, tradeoffs, rejected alternatives when meaningful, compatibility impact, testing impact, and rollback/migration impact.
- When a technical solution includes frontend/page delivery, classify the UI/design baseline before API/model handoff. Report/dashboard/BI/data-screen/analysis pages use `$report-design-system-governance`; common enterprise app pages use `$haier-enterprise-app-ui-design-spec` or the project-supplied product/design baseline when that is the authoritative source. Treat the matching baseline as a downstream design, frontend, QA, testing, and acceptance constraint even when the user did not say "规范".
- Technical solutions must define a data-service runtime model before backend/API handoff: synchronous vs async/offline work, source/pool ownership, cache vs precompute choice, Redis role, cache invalidation, rate/concurrency limits, timeout/fallback, observability, and production readiness boundaries. Do not treat performance and Redis as implementation afterthoughts.
- Technical solutions must define backend-friendly API design before backend/API handoff: endpoint reuse pattern, common request model, common response envelope, query context, filter/export/action/status reuse, service-layer mapping, and reasons for any custom one-off endpoint shape.
- Technical solutions must define API response compatibility before backend/API handoff. Existing response fields are stable contracts across source/table/upstream/fixture replacement; source naming changes must be handled by mapping/adapter logic. New response fields must be additive, conventionally named, source-traced, and documented before handoff. Breaking response changes require versioning, deprecation/migration notes, downstream impact, and regression scope.
- Technical solutions must define the data-vs-presentation boundary for data services. Data APIs should output structured data, metadata, status codes, dictionaries, and necessary facts; avoid backend-assembled display text, conclusions, HTML/Markdown, or combined value+unit strings unless a server-owned legal/audit/notification/error/governed-explanation exception is documented.
- Default to component-aligned APIs. Merge components only when grain, global filters, permission scope, refresh cadence, source dependency, and response lifecycle are coherent.
- Snapshot is a role that must be classified, not a universally forbidden or required dependency. It may be an overview-card/component-ready response, a canonical materialized snapshot/shared dataset for one data cut, or a project-specific local/demo artifact. Metrics, trends, rankings, tables, drilldowns, and exports may reuse a snapshot only when the contract declares the snapshot as their source or shared dataset, and the reuse matches data-version, filter, permission, grain, cache, and invalidation rules.
- Shared data-version context must be explicit when a report has snapshot semantics: `snapshotDate`, `latestPeriod`, `loadBatch`, `dataVersion`, or equivalent fields define the common data cut for snapshot, metrics, filters, exports, and health endpoints. Sharing a declared snapshot dataset or component payload is valid when the consumer scope is explicit; hidden controller memory, unscoped app-memory payloads, or undocumented frontend call-order dependencies are not.
- Data-version and scope correctness must be parameter-driven. For every data-bearing endpoint, define the backend query context: client request params, backend-defaulted version params, backend-injected permission/data-scope params, validation/defaulting rules, source predicate or precompute lookup, and Redis/cache key dimensions. Returning a version field in the response is not enough unless the same value also constrains the backend query or cache lookup.
- Global filters, permission scope, pagination, sorting, Top/Bottom, aggregation, totals, and export scope must declare source/API execution. Frontend compute exceptions must be bounded and recorded as provider/API gaps.
- Filter support must be designed data-first: before downstream filter binding is accepted, the solution must identify filter option sources, source/provider row grain, required fields, default and non-default states, empty/no-permission states when relevant, and resolver/API branch behavior.
- Mock-derived backend handoff requires a SQLite fixture plan that covers parameter-driven behavior, totals, empty states, pagination, drilldowns, sorting, rankings, and permission scope. Do not hand off JSON files as the backend simulation source.
- Production-bound technical solutions need service/data-flow boundaries, source authority, env/auth/security, observability, performance/capacity, deployment/rollback, testability notes, release criteria, and owner actions. API清单 plus 数据模型文件 alone is not production-ready.

## Workflow

1. Inventory inputs: requirements, business goals, source metadata, metric lists, prototype/mock contracts, API candidates, permissions, existing architecture, environments, constraints, and previous versions.
2. Normalize rough inputs when needed with `$report-requirement-structure-extraction`. State business capability, users, scope, out-of-scope items, assumptions, and acceptance objectives.
3. Classify delivery type and architecture depth: demo/prototype, internal tool, production report, platform service, migration/replacement, or mixed. Production-bound work must include runtime, security, observability, deployment, and rollback decisions.
4. Build the architecture blueprint: system context, logical modules, data flow, integration boundaries, runtime/deployment topology, security boundary, and operations boundary. Use `TBD(GAP-*)` when facts are missing.
5. Classify UI/design baseline for page-bearing work: report/dashboard/BI/data-screen/analysis, common enterprise app, or mixed. Attach the matching baseline to downstream frontend/testing/acceptance constraints.
6. Run `$quality-gate-validation` when inputs conflict on source authority, metric口径, grain, field meaning, permission, baseline expectation, architecture boundary, runtime assumption, or response shape.
7. Make technology selection decisions: self-developed frontend stack, backend/data-service stack, cache/pool model, Redis role, storage/source access pattern, deployment/runtime assumptions, override reason, decision tradeoffs, and downstream implementation owner.
8. Define the data-service runtime model with `$performance-optimization`: sync/async boundary, connection pools, Redis/cache/precompute strategy, invalidation, rate/concurrency limits, timeout/fallback, observability, capacity assumptions, and release safety.
9. Define data architecture and source authority with `$data-model-source-mapping`: source/logical/response model layers, grain, key, lineage, metric formulas, transformation rules, data-version fields, quality checks, and source replacement rules.
10. Define backend-friendly API boundaries: endpoint reuse pattern, common request/response models, query context, metadata/filter/query/dashboard/export/action/status families, service-layer mapping, error envelope, and custom endpoint exceptions.
11. Define source replacement and API response compatibility rules: stable existing response fields, additive new fields, naming convention, adapter/mapping ownership, breaking-change versioning, migration/deprecation notes, and contract validation plan.
12. Define the API boundary and parameter-driven data-version contract: the snapshot role, which endpoint exposes or defaults the current `snapshotDate/latestPeriod/loadBatch/dataVersion`, which endpoints consume or reuse the snapshot/shared dataset, which permission/data-scope params the backend injects, and which source/logical/precompute/cache object each endpoint filters against.
13. Add metric dictionary/lineage, permission matrix, data quality rules, and performance constraints when in scope.
14. Add data-quality rules for filter-support completeness when filters are in scope: option rows, fact/business rows, fields, default/non-default data, empty/no-permission data, and resolver/API branches.
15. Build the API inventory with `$api-inventory-design`, tracing every endpoint to page/module need, backend reuse pattern, response/source model, permission rule, quality rule, performance rule, and gap IDs.
16. Define implementation roadmap: phase order, dependency graph, backend/frontend/data/QA/ops owner actions, migration/backfill approach, release gate, rollback plan, and acceptance evidence.
17. Capture missing facts, risks, and blockers with `$gap-ledger-management`. Do not hide unresolved architecture, source, metric, permission, performance, security, deployment, or ownership facts as assumptions.
18. Align versioned handoffs with `$delivery-version-management` when multiple artifacts or iterations exist.
19. Run readiness gates before marking the solution consumable by backend/frontend/testing/operations.

## Required Output

- Technical-solution executive summary: business goal, scope, key decisions, architecture approach, implementation route, readiness, and blockers.
- Input inventory and source authority: `IN-*` sources, version/date, owner, coverage, uncertainty, and authoritative source decision.
- Architecture blueprint: business capability view, system context, logical architecture, data flow, integration/API view, runtime/deployment view, security/permission view, operations view, and out-of-scope boundaries.
- Technology selection and ADR table: selected frontend/backend/data/cache/deployment stack, default vs override, reasons, tradeoffs, alternatives, compatibility impact, testing impact, migration/rollback impact, owner/source, status.
- UI/design baseline decision for page-bearing work: report development, common enterprise app/project baseline, or mixed, and downstream constraints for frontend, QA, testing, and acceptance.
- Data-service runtime model: sync/async boundary, connection-pool ownership, Redis/cache/precompute usage, cache-key and invalidation rules, rate/concurrency limits, timeout/fallback, freshness/stale policy, observability, capacity assumptions, release and rollback notes.
- Data architecture and source mapping: source authority, source/logical/response models, grain, keys, metric formulas, lineage, transformation/adapter rules, data-version fields, quality rules, security/masking rules, and source replacement compatibility.
- Backend-friendly API design plan: metadata/filter/query/dashboard/export/action/status families, common request models, common response envelopes, error model, service-layer mapping, and custom endpoint exceptions.
- API response compatibility plan: source/table replacement mapping, unchanged response fields, additive fields, naming convention, adapter ownership, version/deprecation decision, and regression scope.
- Data-vs-presentation boundary: structured data/metadata returned by data services, frontend-owned copy/conclusion composition, and documented server-owned text exceptions.
- API boundary and parameter-driven data-version contract: snapshot/aggregate endpoint role, `snapshotDate/latestPeriod/loadBatch/dataVersion` source/defaulting, consuming/reusing endpoints, backend query params, permission/data-scope params, source predicates or precompute lookups, cache-key dimensions, and proof that snapshot reuse is explicit and not hidden runtime state.
- Security and permission strategy: identity source, role/org/data scope, row/field/action/export permission, sensitive fields, masking, audit, and no-sensitive-data decisions.
- Non-functional and production readiness plan: performance/capacity, concurrency, rate limit, timeout/retry/fallback, idempotency, cache stampede protection, availability, observability, alert ownership, environment/config, deployment, rollback, backup/recovery when relevant.
- Implementation roadmap: phase/milestone plan, dependency order, owner actions, migration/backfill plan, release gate, test/acceptance evidence, and downstream handoff route.
- API清单.
- 数据模型文件.
- 指标治理包, 权限矩阵, 数据质量规则, 性能约束 when in scope.
- 缺口台账 and risk register.
- Source-side execution policy, frontend compute policy, and SQLite/authoritative-source handoff plan when implementation is downstream.
- Filter data-completeness plan before binding: option source, row grain, fields, default/non-default states, empty/permission states, resolver/API branches, and linked gaps.
- Version/handoff index when in scope.
- Backend/API-documentation/frontend/testing/operations handoff status: consumable, partial, or blocked, with exact blockers and next owner actions.
- Readiness: `ready`, `partial`, or `blocked`, with next-stage owner actions.

## Quality Gate

- The solution cannot be `ready` if it only contains API清单 and 数据模型文件 but lacks architecture blueprint, technology selection, runtime model, security/permission strategy, implementation roadmap, and production readiness decisions for production-bound work.
- Architecture views must be internally consistent: business scope, system context, logical modules, data flow, API boundary, runtime/deployment, security, and operations cannot contradict each other.
- Technology selections cannot be vague. A self-developed frontend or default backend in scope requires an explicit stack decision; any deviation from defaults requires a named override reason and downstream impact.
- API inventory, data model, gaps, permissions, metrics, quality rules, runtime decisions, and architecture decisions must be mutually traceable.
- Page-bearing work cannot be `ready` without a matching report/design/project baseline decision.
- Production-bound work cannot be `ready` when data-service runtime decisions are missing: connection pools, Redis/cache/precompute choice, cache-key dimensions, invalidation, timeout/fallback, rate/concurrency limits, async/export strategy, and observability.
- Production-bound APIs cannot be `ready` without backend reuse pattern, common request/response model family, service-layer mapping, error model, health/status model, or custom endpoint justification.
- Source/table replacement cannot drift existing API response fields. Additive fields require naming/source/type/unit/nullability/permission documentation and contract validation scope.
- Data-service responses cannot be considered `ready` when avoidable backend-composed copy, conclusions, rich text, or style-implied strings prevent frontend styling, localization, responsive layout, or emphasis control.
- Snapshot/aggregate API reuse cannot be unclear, undocumented, mismatched in grain/scope/version, or dependent on hidden controller/frontend call order. Data-version context must constrain backend params, source-side filtering, precompute lookup, or cache keys.
- Filter-bearing API/model handoffs cannot be consumable until data completeness is proven before binding or linked to blocking `GAP-*` items.
- Security-sensitive work cannot be `ready` while identity source, role/data scope, sensitive fields, masking, export limits, audit, or no-sensitive-data decisions are `TBD`.
- Production-bound work cannot be `ready` without deployment/rollback, observability, performance/capacity, release gate, and acceptance evidence expectations.
- Missing source/formula/permission/performance/security/deployment facts cannot be hidden as assumptions.
- Backend/API-documentation/frontend/testing/operations handoff cannot be marked consumable while blocking source, model, permission, formula, data-quality, runtime, security, or performance gaps remain.
