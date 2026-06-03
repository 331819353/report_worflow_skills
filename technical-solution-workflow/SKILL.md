---
name: technical-solution-workflow
description: "运行技术方案阶段，用于在编码前把需求、数据源、指标、原型或mock数据转成开发交付物。用户提到技术方案、技术架构、接口规划、API清单、数据建模、数据模型、数据源映射、字段映射、指标口径、原型数据代码分析、mock数据转接口、需求转API、需求转数据模型、待补充数据模型清单、开发前先梳理时触发，输出API清单、数据模型和缺口清单。"
---

# Technical Solution Workflow

## Core Positioning

Use this as the top-level workflow for the 技术方案 stage. It turns business requirements, data-source metadata, metric definitions, and prototype data-code contracts into technical handoff artifacts for the data-service stage.

This workflow does not implement backend APIs, frontend pages, SQL jobs, or data pipelines. Its job is to define what should be built, what model supports it, and which model/source information is still missing.

## Standard Inputs

- 需求文档: business scenario, users, pages, interactions, conclusions, permissions, and constraints.
- 数据文档: source systems, tables/views/files/APIs, metadata, owners, refresh cadence, permissions, sample fields, and source notes.
- 指标清单: metric names, formulas, dimensions, grain, units, precision, baselines, thresholds, and ownership.
- 原型数据代码: data files, mock modules, data-source resolvers, TypeScript interfaces, component data props, filter mappings, and fixture JSON produced by prototype design.

If an input is absent, continue only when the missing part can be safely inferred. Otherwise record it through `$missing-model-management`.

## Specialty Skills

- Use `$report-requirement-structure-extraction` when inputs are rough business ideas, meeting notes, screenshots, partial PRDs, or otherwise not structured enough to safely create API/model artifacts.
- Use `$data-model-source-mapping` to create the 数据模型文件 with source metadata, logical models, response/view models, relationships, metrics, and transformation notes.
- Use `$api-inventory-design` to create the API清单 from requirements, model coverage, prototype data contracts, filters, and interactions.
- Use `$missing-model-management` whenever source tables, fields, formulas, enum values, grain, ownership, refresh cadence, join keys, samples, or permission rules are missing.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$report-requirement-structure-extraction` | Inputs are rough, partial, screenshot/meeting-note based, or do not yet define users, pages, metrics, dimensions, permissions, and missing facts clearly enough for API/model work. | Inputs are already structured into requirement, data, metric, and prototype contracts. |
| `$data-model-source-mapping` | A complete technical-solution output is requested, or any API/model artifact will be consumed by backend development. | Only doing a narrow routing/gap review that does not produce or update a data model. |
| `$api-inventory-design` | Any API list, endpoint inventory, request/response planning, or backend handoff is required. | Only assessing source/model gaps without designing API candidates. |
| `$missing-model-management` | Any source, field, formula, enum, join, grain, permission, sample, freshness, ownership, or performance fact is missing or assumed. | All required model and source facts are confirmed and traceable. |

## Reference Map

Read only the reference files needed for the current task:

| Need | Read |
| --- | --- |
| Cross-workflow stage routing, readiness values, and handoff requirements | `../workflow-shared-references/report-delivery-pipeline-contract.md` |
| Entry-material conflict detection across requirements, data docs, metric lists, prototype data code, API plans, and source evidence | `../workflow-shared-references/entry-input-consistency-gate.md` |
| Design reasonableness checks for API/model feasibility, page/data fit, metric support, filters, interactions, permissions, and testability | `../workflow-shared-references/design-reasonableness-gate.md` |
| Production closed-loop readiness for architecture, data service handoff, environment/auth/observability/performance/testability | `../workflow-shared-references/production-closed-loop-readiness.md` |
| Define stage boundaries, input inventory, artifact ownership, and handoff meaning | `references/01-stage-contract-and-artifacts.md` |
| Run cross-artifact traceability and consistency checks before final output | `references/02-consistency-gate.md` |
| Make output stable for weaker models: exact names, IDs, status values, fallback behavior, and no-invention rules | `references/03-generation-stability.md` |

Loading guidance:

- For any complete 技术方案 output, read all three references.
- For a quick review or gap diagnosis, read `references/02-consistency-gate.md` and `references/03-generation-stability.md`.
- For any task that writes or updates API清单、数据模型文件、待补充数据模型清单, `references/03-generation-stability.md` is mandatory.

## Workflow

0. Route rough or incomplete inputs.
   If the input is not already a structured requirement/data/metric/prototype contract, first use `$report-requirement-structure-extraction` to normalize business scenario, users, pages, metrics, dimensions, permissions, and missing information. Do not create final API or model artifacts directly from vague notes.

   When more than one entry artifact exists, run `../workflow-shared-references/entry-input-consistency-gate.md` before creating API清单 or 数据模型文件. If requirements, metric lists, data docs, prototype data code, HTML/source-derived contracts, or API plans conflict on source authority, metric口径, grain, filter scope, permission, response shape, or workflow scope, keep affected API/model artifacts `partial` or `blocked`, continue unaffected mapping, and ask for confirmation only on the exact `P0`/`P1` `ENTRY-*` decision.

1. Inventory inputs.
   List every received file/path and classify it as requirement, data document, metric list, prototype data code, or supporting material. Record version, owner, and uncertainty.

2. Extract business and page contracts.
   Identify pages, modules, report objects, user actions, filters, drilldowns, exports, permissions, and expected conclusions. Keep page/module names aligned with the prototype.

3. Extract metric and dimension contracts.
   Normalize each metric's formula, grain, dimension scope, period logic, unit, precision, baseline, threshold, and source dependency. Mark ambiguous metric口径 as a pending item.

4. Read prototype data code.
   Inspect data files, TypeScript interfaces, mock rows, data-source registries, component props, filter fields, and interaction payloads. Convert them into frontend data contracts: component, required fields, row grain, filters, expected response shape, empty state, and sample values.

5. Build the 数据模型文件.
   Use `$data-model-source-mapping`. Define source models, logical/business models, response/view models, joins, keys, dimensions, metrics, source-to-response mapping, quality checks, and ownership.

6. Build the API清单.
   Use `$api-inventory-design`. Define endpoint candidates with method, path, page/module, business purpose, request params, response model, source model dependencies, auth need, pagination/sorting/filter rules, and priority.

7. Build the 待补充数据模型清单.
   Use `$missing-model-management`. Every unresolved requirement/model/source/metric/enum/join/permission/sample/performance issue must have impact, owner question, current assumption, and whether it blocks downstream API documentation, implementation, integration, or validation.

8. Run the consistency gate.
   Verify every API item maps to at least one frontend need and one response model. Verify every response model traces to logical/source models or appears in the pending list. Verify every metric in the indicator list appears in an API, model, or pending item.

9. Run the design reasonableness gate.
   Check whether the API清单 and 数据模型文件 reasonably support the report question, component binding, metric口径, filters, interactions, permissions, exports, and tests. Record unreasonable API/model structures as `DESIGN-*` findings, not only as traceability gaps.

10. Run production closed-loop readiness when the output is expected to support real delivery.
   Use `../workflow-shared-references/production-closed-loop-readiness.md` to check architecture decisions, service boundaries, data flow, source authority, environment/auth, observability, performance, deployment/rollback, testability, and backend handoff completeness. Mark the technical solution `partial` or `blocked` when those production controls are missing.

## Hard Constraints

- Do not invent endpoints, fields, formulas, enum values, joins, permissions, or source ownership. If uncertain, mark a pending item.
- Do not turn contradictory entry artifacts into API/model assumptions. Use `ENTRY-*` IDs for conflicts and require confirmation for `P0`/`P1` findings before repairing the affected contract.
- Do not produce technically traceable but unreasonable API/model artifacts. Use `DESIGN-*` IDs when an endpoint boundary, response model, grain, source strategy, filter model, or permission design cannot reasonably support the consuming report.
- Do not call a technical architecture production-ready if it only contains API清单 and 数据模型文件. Production-bound architecture also needs runtime topology, service/data-flow boundaries, environment/auth/security, observability, performance, deployment/rollback, and testing readiness notes.
- Do not copy prototype mock fields as final source fields unless a source mapping confirms them.
- Every API must trace to a page/module need and a response model.
- Every response/view field must trace to a source field, formula, static enum, or pending item.
- Every assumption must use the same wording across API清单、数据模型文件、待补充数据模型清单, and downstream API docs.
- Use status values exactly: `ready`, `partial`, `blocked` for artifacts and APIs; `open`, `assumed`, `blocked`, `resolved`, `obsolete` for pending model items.
- If a missing item affects correctness, permission, metric口径, or source traceability, do not mark the artifact as `ready`.

## Required Output

Produce or update these artifacts:

- `API清单`: endpoint inventory table, grouped by page/module/domain, including performance/cache/SLA and linked gap IDs.
- `数据模型文件`: complete model definitions with data-source metadata, field tables, relationships, metrics, source-to-response mapping, security rules, examples, and quality rules. If the full artifact is written to a file, include the file path and a concise summary.
- `待补充数据模型清单`: missing requirement/model/source/field/formula/enum/join/sample/permission/performance/security items with status and owner questions.
- Entry consistency result with `ENTRY-*` conflicts, confirmation decisions, and affected API/model artifacts when mixed input materials were checked.
- Design reasonableness result with `DESIGN-*` findings, repairs, accepted limitations, and affected API/model artifacts.
- Production closed-loop readiness: architecture overview, nonfunctional controls, environment/deployment/observability/performance/testability notes, readiness status, and blockers.
- Stage handoff summary following `../workflow-shared-references/report-delivery-pipeline-contract.md`: readiness, next stage, usable artifacts, blockers, and owner questions.

## Default Output Structure

1. 输入清单.
2. 页面/模块与数据契约.
3. 指标与维度契约.
4. API清单.
5. 数据模型文件完整内容或文件路径 + 摘要.
6. 待补充数据模型清单.
7. 入口一致性审计、设计合理性审计与一致性校验结果.
8. 生产闭环准备度: architecture/data-service/testing readiness, production blockers, accepted partial scope.
9. 下一阶段交接说明: what the data-service stage can consume directly and what remains blocked.

## Quick Quality Gate

- API清单、数据模型文件、待补充数据模型清单 are mutually traceable.
- Entry-material conflicts are resolved, or unresolved `P0`/`P1` `ENTRY-*` findings keep affected artifacts `partial` or `blocked`.
- Design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected API/model artifacts `partial` or `blocked`.
- Production closed-loop readiness is checked for production-bound outputs; missing auth/source/env/observability/performance/deployment/testability controls keep the handoff `partial` or `blocked`.
- Prototype mock/view-model/filter/interaction contracts are not ignored.
- API items are not invented without a page/module/business need.
- Data models include source metadata, not only frontend response fields.
- Ambiguous formulas, joins, enums, refresh rules, and permission constraints are captured as pending items.
- The output is ready for `$api-documentation-design` or clearly marked as blocked.
- `API清单`, `数据模型文件`, and `待补充数据模型清单` use the shared readiness values `ready`, `partial`, or `blocked`, and state whether backend development can consume them directly.
