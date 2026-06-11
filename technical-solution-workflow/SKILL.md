---
name: technical-solution-workflow
description: "运行技术方案阶段，把需求、业务目标、指标、数据源、原型数据契约或mock转成专业可评审的技术方案。覆盖系统边界、技术架构设计、技术选型/ADR、数据架构、API与集成架构、运行时模型、性能/安全/可观测/部署回滚、实施路线、API清单、数据模型、指标治理、权限矩阵、数据质量规则、缺口台账、版本链路和后续交付门禁。用户提到技术方案、技术架构、架构设计、技术选型、实现路径、实施方案、默认技术栈、Vue3/TypeScript/ECharts/Element Plus/Axios/AntV S2、Python/Flask/连接池/Redis、接口规划、API清单、snapshotDate/dataVersion/loadBatch、快照接口、接口依赖、数据建模、字段映射、更换数据源/数据表、API返回字段保持不变、新增字段规范命名、筛选前数据完整性、指标口径、权限矩阵、质量规则、开发前梳理、mock转接口时触发。"
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
| UI/design baseline | `$frontend-design-improvement-workflow`, `$report-design-system-governance`, `$haier-enterprise-app-ui-design-spec` |
| Data/source/model mapping | `$data-model-source-mapping` |
| API inventory | `$api-inventory-design` |
| Metric governance | `$metric-governance-lineage` |
| Permission matrix | `$permission-matrix-validation` |
| Data quality rules | `$data-quality-validation` |
| Gaps and assumptions | `$gap-ledger-management` |
| Performance/runtime constraints | `$performance-optimization` |
| Version alignment | `$delivery-version-management` |
| Quality gates | `$quality-gate-validation` |

## Architecture Scope

Production-bound solutions should decide business capability, system context, logical modules, data architecture, API/integration, runtime/deployment, security/permission, operations/observability, roadmap, testing, release, rollback, and owner actions.

## Workflow

1. Inventory inputs: requirements, source metadata, metric lists, prototype/mock contracts, API candidates, permissions, environments, constraints, and prior versions.
2. Normalize rough inputs and classify delivery type: demo/prototype, internal tool, production report, platform service, migration/replacement, or mixed.
3. Classify UI/design baseline for page-bearing work: report/dashboard, common enterprise app, or mixed.
4. Run `$quality-gate-validation` when inputs conflict on source authority, metric口径, grain, field meaning, permission, UI baseline, architecture boundary, runtime assumption, or response shape.
5. Build architecture views: business, system context, logical modules, data flow, integration/API, runtime/deployment, security, operations, and roadmap.
6. Make technology-selection/ADR decisions with default stack and override reasons.
7. Define data-service runtime model: sync/async boundary, pools, Redis/cache/precompute, invalidation, timeout/fallback, observability, and capacity assumptions.
8. Define data architecture and source authority with `$data-model-source-mapping`.
9. Define backend-friendly API boundaries, response compatibility, data-version/snapshot contract, and data-vs-presentation boundary.
10. Add metric dictionary/lineage, permission matrix, data quality rules, performance constraints, and gap ledger when in scope.
11. Build API inventory and implementation roadmap.
12. Align versioned handoffs and run readiness gates before marking consumable.

## Required Output

- Executive summary, scope, architecture approach, key decisions, readiness, and blockers.
- Architecture blueprint and ADR/technology-selection table.
- UI/design baseline decision for page-bearing work.
- Data-service runtime model and backend structured logging plan when backend/data-service is in scope.
- Data architecture/source mapping and API/response compatibility plan.
- Security/permission, data quality, performance, observability, test, release, rollback, and owner-action plan.
- API inventory, model/metric/permission/quality references, gaps, version links, and readiness status.

## Quality Gate

- Do not hand off API清单 plus 数据模型 alone as a production-ready technical solution.
- Do not hide unresolved source, metric, permission, runtime, deployment, ownership, or response-shape gaps as assumptions.
- Do not mark page-bearing work ready without a UI/design baseline decision.
- Do not mark backend/data-service work ready without runtime, performance, observability, error, and logging decisions.
- Load `05-technical-solution-gates.md` before finalizing a production-bound technical solution.
