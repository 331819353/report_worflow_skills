---
name: technical-solution-workflow
description: "运行技术方案阶段，把需求、指标、数据源、原型数据契约或mock转成可交付的API清单、数据模型、指标治理、权限矩阵、数据质量规则、缺口台账、性能约束和版本链路。用户提到技术方案、技术架构、接口规划、API清单、数据建模、字段映射、指标口径、权限矩阵、质量规则、开发前梳理、mock转接口时触发。"
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
- Default to component-aligned APIs. Merge components only when grain, global filters, permission scope, refresh cadence, source dependency, and response lifecycle are coherent.
- Global filters, permission scope, pagination, sorting, Top/Bottom, aggregation, totals, and export scope must declare source/API execution. Frontend compute exceptions must be bounded and recorded as provider/API gaps.
- Mock-derived backend handoff requires a SQLite fixture plan that covers parameter-driven behavior, totals, empty states, pagination, drilldowns, sorting, rankings, and permission scope. Do not hand off JSON files as the backend simulation source.
- Production-bound technical solutions need service/data-flow boundaries, source authority, env/auth/security, observability, performance/capacity, deployment/rollback, and testability notes. API清单 plus 数据模型文件 alone is not production-ready.

## Workflow

1. Inventory inputs: requirements, source metadata, metric lists, prototype/mock contracts, API candidates, permissions, and previous versions.
2. Normalize rough inputs when needed.
3. Run `$quality-gate-validation` when inputs conflict on source authority, metric口径, grain, field meaning, permission, or response shape.
4. Build or update the data model with `$data-model-source-mapping`.
5. Add metric dictionary/lineage, permission matrix, data quality rules, and performance constraints when in scope.
6. Build the API inventory with `$api-inventory-design`, tracing every endpoint to page/module need and response/source model.
7. Capture missing facts and blockers with `$gap-ledger-management`.
8. Align versioned handoffs with `$delivery-version-management` when multiple artifacts or iterations exist.
9. Run readiness gates before marking the solution consumable by backend/frontend/testing.

## Required Output

- Technical-solution summary and input inventory.
- API清单.
- 数据模型文件.
- 指标治理包, 权限矩阵, 数据质量规则, 性能约束 when in scope.
- 缺口台账.
- Source-side execution policy, frontend compute policy, and SQLite/authoritative-source handoff plan when implementation is downstream.
- Version/handoff index when in scope.
- Backend/API-documentation handoff status: consumable, partial, or blocked, with exact blockers and next owner actions.
- Readiness: `ready`, `partial`, or `blocked`, with next-stage owner actions.

## Quality Gate

- API inventory, data model, gaps, permissions, metrics, and quality rules must be mutually traceable.
- Missing source/formula/permission/performance facts cannot be hidden as assumptions.
- Backend/API-documentation handoff cannot be marked consumable while blocking source, model, permission, formula, data-quality, or performance gaps remain.
- API/model artifacts cannot be `ready` while blocking gaps or high-impact input conflicts remain.
