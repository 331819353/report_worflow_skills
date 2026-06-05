---
name: api-documentation-design
description: "用于生成或重构可交付的API/接口文档。用户提到接口文档、API文档、接口说明、OpenAPI、Swagger、前后端接口约定、请求响应示例、鉴权、错误码、分页、筛选、字段口径、已有路由补文档、接口交付验收时触发；只写文档契约，不实现后端代码或前端接入。"
---

# API Documentation Design

## Overview

Use this skill independently when the task is to turn known or inferred API intent into precise API documentation. The input can be an API inventory, backend routes, product requirements, frontend integration needs, source/data models, OpenAPI fragments, tests, or prior docs.

Do not implement backend code merely because this skill is triggered. Produce documentation that is ready for implementation, frontend integration, testing, or delivery.

## Core Workflow

1. Collect inputs and select the documentation mode.
   Use inventory-to-document, route-to-document, requirement-to-contract, contract-refresh, async-job, webhook/callback, streaming, or file-transfer mode based on the available artifacts.

   When multiple input authorities exist, run `$quality-gate-validation` before documenting endpoint behavior. API inventories, requirements, frontend contracts, source/data models, OpenAPI snippets, implemented routes, and runtime samples must not be merged silently when they conflict; unresolved `P0`/`P1` `ENTRY-*` findings keep the affected endpoint `partial` or `blocked` and require user confirmation only before the affected API document is repaired.

   When the API document will drive frontend, backend, or tests, run `$quality-gate-validation`. Check that endpoint boundaries, response models, pagination/sorting/filter rules, auth, errors, examples, global SQL/source filtering, component-internal local filtering, SQL/index feasibility, Redis/cache decisions, connection-pool behavior, and performance limits reasonably support the consuming business flow.

2. Establish shared conventions.
   Define base URL, version, auth, headers, response envelope, errors, pagination, sorting, filters, date/time format, enum format, file behavior, default/max page size, global filter execution, component-internal filter scope, Redis/cache expectations, connection-pool expectations, large-result handling, and export limits before documenting endpoint details.

3. Document endpoint behavior.
   For each endpoint, capture purpose, trigger, method/path, auth, request params/body, response schema, examples, errors, pagination/performance limits, source mode, compatibility notes, and status.

4. Trace dependencies.
   Link response fields to models, routes, repositories, source systems, upstream APIs, formulas, or explicit pending items. Avoid silently inventing fields or business rules.

5. Expose unresolved items.
   Mark partial or blocked endpoint behavior when source fields, formulas, auth values, permissions, samples, or performance decisions are missing.

6. Prepare handoff.
   Include enough examples and edge states for frontend contract validation, backend implementation, integration tests, runtime QA, and delivery review.

7. Mark production readiness when the API document is production-bound.
   Apply `$quality-gate-validation` before calling the API document production-ready. API documentation is only `partial` when authoritative source, auth/permission, environment/base URL, health/runtime evidence, observability, performance/export limits, version compatibility, or testing handoff is missing.

## References

- Read `$quality-gate-validation` for artifact readability and extractable endpoint-contract checks.
- Read [references/01-inputs-and-traceability.md](references/01-inputs-and-traceability.md) when identifying source artifacts, authority, dependency trace, or unresolved model/API items.
- Read `$quality-gate-validation` when API docs are built from conflicting requirements, API inventories, model docs, frontend contracts, route code, OpenAPI snippets, or runtime samples.
- Read `$quality-gate-validation` when API design choices affect business fit, data/API feasibility, frontend usability, or testability.
- Read `$quality-gate-validation` when API docs feed production delivery or release acceptance.
- Read `$delivery-artifact-template-management` when creating the API document skeleton, common conventions, overview tables, and appendix.
- Read [references/03-endpoint-detail-rules.md](references/03-endpoint-detail-rules.md) when writing endpoint-level request, response, example, auth, error, performance, and compatibility sections.
- Read [references/04-handoff-quality-gate.md](references/04-handoff-quality-gate.md) before final delivery or when preparing frontend/backend/testing handoff.

## Required Outputs

- API documentation grouped by module, domain, page, resource, or service boundary.
- Common conventions plus endpoint details.
- Dependency trace from endpoint response to the relevant implementation/model/source/contract artifacts.
- Design reasonableness status with `DESIGN-*` findings when endpoint design affects downstream usability.
- Production closed-loop readiness when the API document is production-bound.
- Unresolved item list with endpoint impact and owner/confirmation question.

## Quality Checklist

- Every expected endpoint appears in the API document or is explicitly removed with a reason.
- Entry conflicts across requirements, API inventories, data/source models, frontend contracts, route code, OpenAPI snippets, and runtime samples are resolved or listed as `ENTRY-*`; unresolved `P0`/`P1` findings keep affected endpoints `partial` or `blocked`.
- API design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected endpoints `partial` or `blocked`.
- Request params cover required filters, drilldowns, pagination, sorting, exports, defaults, and invalid-param behavior.
- Database-backed request params document SQL predicate shape, index support, and SQL pushdown scope for global/page-level filters; unresolved index or non-sargable filter behavior keeps the endpoint `partial` or `blocked`.
- API docs state where global filters, component-internal filters, sorting, pagination, ranking, Top/Bottom, and aggregation execute. Page/API-level full-materialize-then-filter behavior keeps the endpoint `partial` or `blocked` unless it is a documented component-internal filter over already fetched component data, tiny static enum, or bounded lookup.
- Collection/list/table endpoints document default page size, maximum page size, stable sort, total-count behavior, cursor/keyset need when applicable, and large-result handling. Missing pagination/performance behavior keeps production-bound endpoints `partial` or `blocked`.
- API implementation documents may use JSON only as response examples. If local/mock data is needed for backend/API development, the documented simulation source is SQLite with schema, seed rows, and indexes rather than JSON files.
- Each data-bearing endpoint identifies the served component/component group and frontend compute policy; broad page-level responses that require frontend business calculation stay `partial` or `blocked`.
- Response schemas include field names, types, nullability, units, precision, enums, nesting, empty states, and examples.
- Auth, permission, no-data, invalid-param, unauthorized, no-permission, and upstream/backend failure behavior are documented when relevant.
- Production-bound API documents include source authority, runtime/environment notes, auth/permission behavior, Redis/cache and connection-pool behavior when relevant, observability/performance constraints, version compatibility, and testing handoff before `ready`.
- Pending items remain visible and do not masquerade as confirmed API behavior.
