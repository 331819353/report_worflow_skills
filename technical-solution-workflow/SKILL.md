---
name: technical-solution-workflow
description: "运行技术方案阶段，把需求、指标、数据源、原型数据契约或mock转成可交付的API清单、数据模型、指标治理、权限矩阵、数据质量规则、缺口台账、性能约束和版本链路。用户提到技术方案、技术架构、默认技术栈、Vue3/TypeScript/ECharts/Element Plus/Axios/AntV S2、Python/Flask/连接池/Redis、接口规划、API清单、数据建模、字段映射、筛选前数据完整性、指标口径、权限矩阵、质量规则、开发前梳理、mock转接口时触发。"
---

# Technical Solution Workflow

## Positioning

Use this workflow before implementation. It defines what should be built and what is still missing. It does not implement backend APIs, frontend pages, SQL jobs, or tests.

## Child Skills

| Stage | Skill |
| --- | --- |
| Rough requirement normalization | `$report-requirement-structure-extraction` |
| Data/source/model mapping | `$data-model-source-mapping` |
| API inventory | `$api-inventory-design` |
| Metric governance | `$metric-governance-lineage` |
| Permission matrix | `$permission-matrix-validation` |
| Data quality rules | `$data-quality-validation` |
| Gaps and assumptions | `$gap-ledger-management` |
| Quality gates | `$quality-gate-validation` |
| Performance constraints | `$performance-optimization` |
| Version alignment | `$delivery-version-management` |

## Reinforced Constraints

- When requirements, source metadata, metric lists, prototype/mock contracts, previous API plans, or permission notes disagree, run `$quality-gate-validation` before producing final API/model artifacts. Affected rows stay `partial` or `blocked` until the conflict is resolved.
- Use stable IDs and exact statuses across API清单, 数据模型文件, 缺口台账, version index, and downstream handoffs. Artifact/API readiness values are `ready`, `partial`, or `blocked`.
- Every API row must trace to a page/module/component need, response model, source/logical model or gap, permission rule when relevant, quality rule when relevant, and performance constraint when relevant.
- Default technology architecture must be explicit. For self-developed frontend delivery, use `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2` as the default stack, with AntV S2 used for pivot/cross/wide analytical tables and dense metric matrices. For default backend/data-service delivery, use `Python + Flask + database/upstream connection pools + Redis` for API service, cache/precompute, rate/concurrency protection, and hot query acceleration. Override only when the user specifies another stack or an existing project has an authoritative stack, and record the reason.
- Default to component-aligned APIs. Merge components only when grain, global filters, permission scope, refresh cadence, source dependency, and response lifecycle are coherent.
- Global filters, permission scope, pagination, sorting, Top/Bottom, aggregation, totals, and export scope must declare source/API execution. Frontend compute exceptions must be bounded and recorded as provider/API gaps.
- Filter support must be designed data-first: before downstream filter binding is accepted, the solution must identify filter option sources, source/provider row grain, required fields, default and non-default states, empty/no-permission states when relevant, and resolver/API branch behavior.
- Mock-derived backend handoff requires a SQLite fixture plan that covers parameter-driven behavior, totals, empty states, pagination, drilldowns, sorting, rankings, and permission scope. Do not hand off JSON files as the backend simulation source.
- Production-bound technical solutions need service/data-flow boundaries, source authority, env/auth/security, observability, performance/capacity, deployment/rollback, and testability notes. API清单 plus 数据模型文件 alone is not production-ready.

## Workflow

1. Inventory inputs: requirements, source metadata, metric lists, prototype/mock contracts, API candidates, permissions, and previous versions.
2. Normalize rough inputs when needed.
3. Run `$quality-gate-validation` when inputs conflict on source authority, metric口径, grain, field meaning, permission, or response shape.
4. Set the default technology architecture or record an override reason: self-developed frontend stack, backend/data-service stack, cache/pool model, and downstream implementation owner.
5. Build or update the data model with `$data-model-source-mapping`.
6. Add data-quality rules for filter-support completeness when filters are in scope: option rows, fact/business rows, fields, default/non-default data, empty/no-permission data, and resolver/API branches.
7. Add metric dictionary/lineage, permission matrix, data quality rules, and performance constraints when in scope.
8. Build the API inventory with `$api-inventory-design`, tracing every endpoint to page/module need and response/source model.
9. Capture missing facts and blockers with `$gap-ledger-management`.
10. Align versioned handoffs with `$delivery-version-management` when multiple artifacts or iterations exist.
11. Run readiness gates before marking the solution consumable by backend/frontend/testing.

## Required Output

- Technical-solution summary and input inventory.
- Technology architecture decision: self-developed frontend stack, backend stack, cache/connection-pool model, and override reason if not using the defaults.
- API清单.
- 数据模型文件.
- 指标治理包, 权限矩阵, 数据质量规则, 性能约束 when in scope.
- 缺口台账.
- Source-side execution policy, frontend compute policy, and SQLite/authoritative-source handoff plan when implementation is downstream.
- Filter data-completeness plan before binding: option source, row grain, fields, default/non-default states, empty/permission states, resolver/API branches, and linked gaps.
- Version/handoff index when in scope.
- Backend/API-documentation handoff status: consumable, partial, or blocked, with exact blockers and next owner actions.
- Readiness: `ready`, `partial`, or `blocked`, with next-stage owner actions.

## Quality Gate

- API inventory, data model, gaps, permissions, metrics, and quality rules must be mutually traceable.
- Technical solutions cannot be `ready` when a self-developed frontend or default backend is in scope but the stack decision is missing, vague, or different from the default without a named override reason.
- Filter-bearing API/model handoffs cannot be consumable until data completeness is proven before binding or linked to blocking `GAP-*` items.
- Missing source/formula/permission/performance facts cannot be hidden as assumptions.
- Backend/API-documentation handoff cannot be marked consumable while blocking source, model, permission, formula, data-quality, or performance gaps remain.
- API/model artifacts cannot be `ready` while blocking gaps or high-impact input conflicts remain.
