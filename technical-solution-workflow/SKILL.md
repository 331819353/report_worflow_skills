---
name: technical-solution-workflow
description: "运行技术方案阶段，把需求、业务目标、指标、数据源、原型数据契约或mock转成可评审技术方案。用户提到技术方案、技术架构、架构设计、技术选型/ADR、实现路径、实施方案、默认技术栈、Vue3/TypeScript/ECharts、Python/Flask、Java/Spring Boot、连接池/Redis、接口规划/API清单、数据建模/字段映射、快照接口、响应字段兼容、新增字段命名、筛选前数据完整性、指标口径、权限矩阵、质量规则、开发前梳理、mock转接口时触发。"
---

# Technical Solution Workflow

## Positioning

Use this workflow before implementation to produce a professional technical solution reviewable by product, backend, frontend, data, QA, operations, and delivery owners.

It does not implement backend APIs, frontend pages, SQL jobs, or tests unless the user explicitly asks for implementation. Its job is to make downstream implementation specific, traceable, and hard to misread.

## Reference Files

- `references/01-stage-contract-and-artifacts.md` for stage boundary, artifact roles, architecture/ADR/runtime/roadmap templates, and handoff meaning.
- `references/02-consistency-gate.md` before finalizing any solution or handoff.
- `references/03-generation-stability.md` for stable IDs, section order, controlled statuses, and deterministic output.
- `references/04-professional-solution-template.md` for a full 技术方案/技术架构/技术选型/实现路径 output.
- `references/05-technical-solution-gates.md` for detailed constraints, required outputs, and readiness blockers.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement normalization | `$report-requirement-structure-extraction` |
| Python Flask SSO multi-database backend baseline | `$python-flask-sso-multidatabase-backend` |
| Java Spring Boot backend baseline | `$java-springboot-backend-development` |
| UI/design baseline | `$frontend-design-improvement-workflow`, `$report-design-system-governance`, `$haier-enterprise-app-ui-design-spec` |
| Data/source/model mapping | `$data-model-source-mapping` |
| API inventory | `$api-inventory-design` |
| Metric governance | `$metric-governance-lineage` |
| Metric number display | `$metric-number-display-contract` |
| Permission matrix | `$permission-matrix-validation` |
| Data quality rules | `$data-quality-validation` |
| Gaps and assumptions | `$gap-ledger-management` |
| Performance/runtime constraints | `$performance-optimization`, `$sql-query-optimization`, `$redis-cache-design-patterns`, `$olap-data-modeling-optimization` |
| Environment profile contract | `$environment-profile-contract` |
| Delivery pipeline governance | `$report-delivery-pipeline-governance` |
| Artifact readability | `$artifact-readability-standard` |
| Version alignment | `$delivery-version-management` |
| Quality gates | `$quality-gate-validation` |

## Architecture Scope

Production-bound solutions should decide business capability, system context, logical modules, data architecture, API/integration, runtime/deployment, security/permission, operations/observability, roadmap, testing, release, rollback, and owner actions.

## Workflow

1. Inventory inputs: requirements, source metadata, metric lists, numeric display expectations, prototype/mock contracts, API candidates, permissions, environments, constraints, and prior versions.
2. Normalize rough inputs and classify delivery type: demo/prototype, internal tool, production report, platform service, migration/replacement, or mixed.
3. Classify UI/design baseline for page-bearing work: report/dashboard, common enterprise app, or mixed.
4. Run `$quality-gate-validation` when inputs conflict on source authority, metric口径, grain, field meaning, permission, UI baseline, architecture boundary, runtime assumption, or response shape.
5. Build architecture views: business, system context, logical modules, data flow, integration/API, runtime/deployment, security, operations, and roadmap.
6. Make technology-selection/ADR decisions with default stack and override reasons.
7. Define data-service runtime model: sync/async boundary, Python/Flask/SQLAlchemy or Java/Spring Boot baseline when applicable, SSO/auth flow, database role map, pools, Redis/cache/precompute, invalidation, timeout/fallback, observability, and capacity assumptions.
8. Define data architecture and source authority with `$data-model-source-mapping`.
9. Define backend-friendly API boundaries, response compatibility, numeric precision/display contract through `$metric-number-display-contract`, data-version/snapshot contract, and data-vs-presentation boundary.
10. Add metric dictionary/lineage, permission matrix, data quality rules, performance constraints, environment profile contracts, and gap ledger when in scope.
11. Build API inventory and implementation roadmap.
12. Align versioned handoffs through `$report-delivery-pipeline-governance` and `$delivery-version-management`; use `$artifact-readability-standard` when the solution becomes a handoff artifact; run readiness gates before marking consumable.

## Required Output

- Executive summary, scope, architecture approach, key decisions, readiness, and blockers.
- Architecture blueprint and ADR/technology-selection table.
- UI/design baseline decision for page-bearing work.
- Data-service runtime model and backend structured logging plan when backend/data-service is in scope.
- Python/Flask SSO and multi-database backend baseline when applicable: app factory, Blueprints, middleware, service/repository/db layers, `Access-Token`/optional `Application-Key`, 401/403 split, SQLite/MySQL/Oracle/StarRocks roles, SQLAlchemy engine/session ownership, dependencies, tests, and deployment entrypoints.
- Java/Spring Boot backend baseline when applicable: controller/service/mapper-or-repository layering, `ApiResponse<T>`, `BizException`/global exception handling, Spring Security/JWT/SSO, IAM/IAMA or local JWT bridge, DTO/Entity/VO boundaries, Profile YAML, Maven/Gradle, Docker, tests, and startup commands.
- Data architecture/source mapping and API/response compatibility plan.
- Numeric precision/display plan for metric-bearing fields: value type, raw/display unit, scale, precision, tooltip/export precision, rounding, null/zero/denominator-zero, and formatter ownership.
- Security/permission, data quality, performance, observability, test, release, rollback, and owner-action plan.
- API inventory, model/metric/permission/quality references, gaps, version links, and readiness status.

## Quality Gate

- Do not hand off API清单 plus 数据模型 alone as a production-ready technical solution.
- Do not hide unresolved source, metric, permission, runtime, deployment, ownership, or response-shape gaps as assumptions.
- Do not mark page-bearing work ready without a UI/design baseline decision.
- Do not mark metric-bearing work ready without a numeric precision/display contract that can be consumed by API, frontend, export, and QA.
- Do not mark backend/data-service work ready without runtime, stack, SSO/auth, database ownership, performance, observability, error, and logging decisions.
- Load `05-technical-solution-gates.md` before finalizing a production-bound technical solution.
