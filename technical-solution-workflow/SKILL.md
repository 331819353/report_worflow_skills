---
name: technical-solution-workflow
description: "运行报表项目的技术方案阶段。用于中文请求要求把需求、数据源、指标或原型数据代码梳理成技术交付物，例如：技术方案、技术架构、接口规划、接口清单、API清单、数据建模、数据模型、数据模型文件、数据源映射、字段映射、指标口径映射、原型数据代码分析、mock数据转接口、待补充数据模型清单、需求转API、需求转数据模型。标准输入为需求文档、数据源/元数据文档、指标清单、原型数据代码；输出为API清单、数据模型文件、待补充数据模型清单。不要用于编写完整API文档、实现后端服务、前端联调或测试执行。"
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

## Hard Constraints

- Do not invent endpoints, fields, formulas, enum values, joins, permissions, or source ownership. If uncertain, mark a pending item.
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
- Stage handoff summary following `../workflow-shared-references/report-delivery-pipeline-contract.md`: readiness, next stage, usable artifacts, blockers, and owner questions.

## Default Output Structure

1. 输入清单.
2. 页面/模块与数据契约.
3. 指标与维度契约.
4. API清单.
5. 数据模型文件完整内容或文件路径 + 摘要.
6. 待补充数据模型清单.
7. 一致性校验结果.
8. 下一阶段交接说明: what the data-service stage can consume directly and what remains blocked.

## Quick Quality Gate

- API清单、数据模型文件、待补充数据模型清单 are mutually traceable.
- Prototype mock/view-model/filter/interaction contracts are not ignored.
- API items are not invented without a page/module/business need.
- Data models include source metadata, not only frontend response fields.
- Ambiguous formulas, joins, enums, refresh rules, and permission constraints are captured as pending items.
- The output is ready for `$api-documentation-design` or clearly marked as blocked.
- `API清单`, `数据模型文件`, and `待补充数据模型清单` use the shared readiness values `ready`, `partial`, or `blocked`, and state whether backend development can consume them directly.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. 范围与中文触发可靠性：确认用户请求确实匹配本 skill。通用报表设计类 skill 不要因为 `原型设计`、`技术方案`、`前端开发`、`后端开发`、`测试` 等流程词误触发；workflow 类 skill 只有在这些词表达真实阶段意图时才使用。
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
