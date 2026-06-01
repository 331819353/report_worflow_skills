---
name: api-inventory-design
description: "Design reusable API清单 / endpoint inventory artifacts for data-driven pages, services, and integration work. Use when requirements, metric lists, data models, data-source metadata, prototype data code, frontend contracts, backend notes, or testing findings must be converted into an API inventory before API documentation, implementation, integration, or validation. Covers endpoint grouping, method/path, business purpose, triggers, request parameters, response model, filters, pagination, sorting, auth, source-model dependency, priority, status, and unresolved API questions."
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

Loading guidance:

- For any generated or updated API清单, read all four references.
- For a quick endpoint review, read `02-endpoint-patterns-and-splitting.md` and `04-api-stability-gate.md`.
- For export, action, permission, pagination, or dynamic filter APIs, `03-request-response-auth-rules.md` is mandatory.

## Workflow

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
   If an endpoint depends on unknown data models, formulas, enums, filter options, permission rules, or owner decisions, record the gap with `$missing-model-management` or in a pending column.

## Hard Constraints

- Each API must trace to a visible page need, interaction, export, dynamic option, or system action.
- Each API must trace to one response model and at least one source/logical model unless explicitly pending.
- Filter option APIs are first-class APIs when options are dynamic, permission-limited, cascaded, or source-driven.
- Export APIs must state whether they reuse list filters and whether they return file streams, task IDs, or async download links.
- Mutation/action APIs must define idempotency, permission, success state, failure state, and audit need.
- Do not create "万能接口" that mixes unrelated grains, permission scopes, or refresh cadences.
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

## Quick Quality Gate

- All prototype/mock data consumers are represented by an API or documented as static/offline.
- API names and paths are stable enough for downstream API documentation, implementation, or validation.
- Request params cover all required filters, drilldowns, pagination, sorting, exports, and actions.
- Response model names match the 数据模型文件.
- Missing model/source/formula/enum/permission items are visible instead of hidden in notes.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
