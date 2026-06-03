---
name: api-inventory-design
description: "用于在开发前把需求、指标、原型、mock数据、数据源或前端页面梳理成API清单/接口规划。用户提到接口清单、API清单、接口规划、接口拆分、页面需要哪些接口、mock转接口、需求转API、接口优先级、接口分组、方法路径、参数响应、筛选分页排序、鉴权、未定接口问题时触发，为API文档、后端实现、前端联调和测试提供入口。"
---

# API Inventory Design

## Core Positioning

Use this as a reusable artifact skill when the required deliverable is an API清单 rather than full API documentation, backend code, frontend code, or test cases.

The inventory is a planning and alignment artifact. It defines the API surface, model dependency, request scope, response model names, and unresolved questions. It can be used by 技术方案, 数据服务, 前端联调, backend implementation, and testing workflows. Detailed request/response examples belong to downstream API documentation when that deliverable is requested.

## Inputs

- Requirements or page/module descriptions.
- Metric list and dimension/filter definitions.
- 数据模型文件 or source metadata, if available.
- Prototype data code, mock JSON, TypeScript types, data-source registry, or component field usage.
- Existing API notes or backend constraints, if provided.

## Reference Map

Read only the reference files needed for the current task:

| Need | Read |
| --- | --- |
| Produce the exact API清单 table and required columns | `references/01-api-inventory-template.md` |
| Decide endpoint boundaries, common endpoint patterns, and when to split or merge APIs | `references/02-endpoint-patterns-and-splitting.md` |
| Define inventory-level request params, response model references, auth, pagination, sorting, filters, exports, and actions | `references/03-request-response-auth-rules.md` |
| Run API traceability, status, no-invention, and gap-linking checks | `references/04-api-stability-gate.md` |
| Resolve authority conflicts when requirements, prototype data code, existing APIs, source metadata, or testing evidence disagree | `references/standalone-quality-gates.md#entry-input-consistency-gate` |
| Audit whether endpoint boundaries and API inventory design reasonably support the business question, UI contract, data model, permissions, and tests | `references/standalone-quality-gates.md#design-reasonableness-gate` |

Loading guidance:

- For any generated or updated API清单, read all four references.
- For a quick endpoint review, read `02-endpoint-patterns-and-splitting.md` and `04-api-stability-gate.md`.
- For export, action, permission, pagination, or dynamic filter APIs, `03-request-response-auth-rules.md` is mandatory.

## Workflow

0. Check source authority.
   When multiple artifacts influence the inventory, identify which source owns business scope, visible UI needs, existing API behavior, source model facts, and testing evidence. If artifacts conflict on endpoint scope, request params, response fields, metric grain, permission, or API availability, record `ENTRY-*` findings instead of silently choosing one.

1. Build page and module coverage.
   List every page, tab, card, chart, table, drawer, export, drilldown, filter option, and action that needs data.

2. Identify data access patterns.
   Separate summary KPIs, trends, rankings, lists, analytical tables, detail drawers, filter options, exports, and operational actions. Avoid forcing all data into one endpoint when grain, refresh, filters, or permissions differ.

3. Define endpoint candidates.
   For each API, state method, path, page/module, purpose, trigger, request source, response model, source model dependency, auth need, cache/performance/SLA expectation, priority, and status.

4. Define request contracts at inventory level.
   Capture path/query/body params, filters, period format, organization scope, pagination, sorting, keyword search, drilldown params, export params, and default values.

5. Define response contracts at inventory level.
   Reference a response model name and summarize required field groups, grain, list/envelope shape, empty state, and error behavior. Do not duplicate the full API document here.

6. Mark gaps.
   If an endpoint depends on unknown data models, formulas, enums, filter options, permission rules, or owner decisions, record the gap in the pending column with a stable `GAP-*` ID, impact, owner question, and blocking status.

7. Run the design reasonableness gate.
   Check whether endpoint boundaries, split/merge choices, response model references, request params, dynamic options, exports, actions, auth, and performance notes reasonably support the consuming page and tests. Record unreasonable API inventory choices as `DESIGN-*` findings.

## Hard Constraints

- Each API must trace to a visible page need, interaction, export, dynamic option, or system action.
- Do not turn conflicting artifacts into endpoint assumptions; unresolved `P0`/`P1` authority conflicts keep affected APIs `partial` or `blocked`.
- Each API must trace to one response model and at least one source/logical model unless explicitly pending.
- Filter option APIs are first-class APIs when options are dynamic, permission-limited, cascaded, or source-driven.
- Export APIs must state whether they reuse list filters and whether they return file streams, task IDs, or async download links.
- Mutation/action APIs must define idempotency, permission, success state, failure state, and audit need.
- Do not create "万能接口" that mixes unrelated grains, permission scopes, or refresh cadences.
- Do not keep an API inventory shape that is traceable but unreasonable. Use `DESIGN-*` findings for endpoint grouping, grain, filter, permission, export, action, or performance choices that would make downstream implementation or frontend integration awkward or incorrect.
- Do not mark an API `ready` when its response model, formula, permission, or source dependency is missing.
- Do not mark a P0 API `ready` when performance/cache/SLA, expected volume, or export limit is unknown and undocumented.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.

## Required Output

Use a table with these columns:

- API ID.
- Page/module.
- Business purpose.
- Method and path.
- Trigger.
- Request params.
- Response model.
- Source model dependency.
- Auth/permission.
- Pagination/sort/filter.
- Performance/cache/SLA.
- Priority.
- Status.
- Pending questions.
- Design reasonableness status and linked `DESIGN-*` findings when applicable.

## Quick Quality Gate

- All prototype/mock data consumers are represented by an API or documented as static/offline.
- API names and paths are stable enough for downstream API documentation, implementation, or validation.
- API inventory design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected APIs `partial` or `blocked`.
- Request params cover all required filters, drilldowns, pagination, sorting, exports, and actions.
- Response model names match the 数据模型文件.
- Missing model/source/formula/enum/permission items are visible instead of hidden in notes.
