---
name: api-documentation-design
description: "用于生成或重构可交付的API/接口文档。用户提到接口文档、API文档、接口说明、OpenAPI、Swagger、前后端接口约定、后端好开发、接口复用、通用请求响应模型、请求响应示例、鉴权、错误码、分页、筛选、筛选前数据完整性、snapshotDate/dataVersion/loadBatch、快照接口、接口依赖、更换数据源/数据表后响应字段保持不变、新增字段规范命名、默认后端技术栈、Python/Flask/连接池/Redis、字段口径、已有路由补文档、接口交付验收时触发；只写文档契约，不实现后端代码或前端接入。"
---

# API Documentation Design

## Overview

Use this skill independently when the task is to turn known or inferred API intent into precise API documentation. The input can be an API inventory, backend routes, product requirements, frontend integration needs, source/data models, OpenAPI fragments, tests, or prior docs.

Do not implement backend code merely because this skill is triggered. Produce documentation that is ready for implementation, frontend integration, testing, or delivery.

## Core Workflow

1. Collect inputs and select the documentation mode.
   Use inventory-to-document, route-to-document, requirement-to-contract, contract-refresh, async-job, webhook/callback, streaming, or file-transfer mode based on the available artifacts.

   When multiple input authorities exist, run `$quality-gate-validation` before documenting endpoint behavior. API inventories, requirements, frontend contracts, source/data models, OpenAPI snippets, implemented routes, and runtime samples must not be merged silently when they conflict; unresolved `P0`/`P1` `ENTRY-*` findings keep the affected endpoint `partial` or `blocked` and require user confirmation only before the affected API document is repaired.

   When the API document will drive frontend, backend, or tests, run `$quality-gate-validation`. Check that endpoint boundaries, backend reuse pattern, common request/response model family, pagination/sorting/filter rules, auth, errors, examples, global SQL/source filtering, component-internal local filtering, SQL/index feasibility, Redis/cache decisions, connection-pool behavior, and performance limits reasonably support the consuming business flow. If Redis is named, document role, key template, TTL/invalidation, permission-safety dimensions, miss/stampede behavior, fallback, pool/timeouts, and observability.

2. Establish shared conventions.
   Define base URL, version, auth, headers, common request model groups, response envelope, errors, pagination, sorting, filters, date/time format, enum format, file behavior, default/max page size, global filter execution, component-internal local filter scope, Redis/cache expectations, connection-pool expectations, large-result handling, and export limits before documenting endpoint details. Redis/cache expectations must be specific enough for implementation, not a placeholder.

   For filter-bearing endpoints, document data completeness before binding: option source, source/provider execution stage, required response fields, row grain, default request/response example, at least one non-default request/response example, empty/no-permission example when relevant, and resolver/API branch behavior. If only one default snapshot exists for an affecting filter, keep the endpoint `partial` or `blocked`.

   When the API document will drive default backend implementation, state the default backend stack as `Python + Flask + database/upstream connection pools + Redis`, including which layer owns routing, pool configuration, Redis cache/precompute, timeout/fallback, and observability. Use another stack only with a user/existing-project override reason.

   Define response-field compatibility conventions before endpoint details. Existing response field names, nesting, types, units, precision, enum meanings, nullability, formulas, grain, and empty/no-permission behavior are stable across source/table/upstream replacement. New fields are additive by default and must follow the project naming convention; if no convention exists, use stable English lowerCamel field codes. Breaking changes require versioning, deprecation/migration notes, and downstream impact.

   For snapshot/latest-period reports, document the snapshot role and shared data-version context before endpoint details: `snapshotDate`, `latestPeriod`, `loadBatch`, `dataVersion`, report version, or source version. Related data-bearing endpoints must consume that context through request params, backend-defaulted params, backend-injected scope, or an explicitly declared canonical/shared snapshot dataset before querying or deriving results, and include it in source/provider predicates, precompute lookups, and cache keys. A snapshot/dashboard aggregate endpoint may be reused by metrics, trends, rankings, tables, drilldowns, or exports only when the document states the matching grain, filters, permission scope, fields, cache key, and invalidation behavior.

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
- Backend reuse pattern and common request/response model family for production-bound endpoints.
- Response compatibility rules for source/table replacement: unchanged fields, additive fields, naming convention, deprecation/versioning, and compatibility notes.
- Parameter-driven data-version, scope-filtering, snapshot role/reuse, and endpoint-dependency contract when snapshot/latest-period semantics exist.
- Backend stack/cache/pool notes when the document feeds backend implementation.
- Dependency trace from endpoint response to the relevant implementation/model/source/contract artifacts.
- Design reasonableness status with `DESIGN-*` findings when endpoint design affects downstream usability.
- Production closed-loop readiness when the API document is production-bound.
- Unresolved item list with endpoint impact and owner/confirmation question.

## Quality Checklist

- Every expected endpoint appears in the API document or is explicitly removed with a reason.
- Entry conflicts across requirements, API inventories, data/source models, frontend contracts, route code, OpenAPI snippets, and runtime samples are resolved or listed as `ENTRY-*`; unresolved `P0`/`P1` findings keep affected endpoints `partial` or `blocked`.
- API design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected endpoints `partial` or `blocked`.
- Production-bound endpoints identify backend reuse pattern, reusable request model, reusable response envelope, and service-layer mapping, or explain why a custom shape is required.
- Request params cover required filters, drilldowns, pagination, sorting, exports, defaults, and invalid-param behavior.
- Filter-bearing endpoints include data-completeness evidence before frontend binding: option data, row grain, fields, default/non-default examples, empty/no-permission examples when relevant, and resolver/API branch behavior.
- Database-backed request params document SQL predicate shape, index support, and SQL pushdown scope for global/page-level filters; unresolved index or non-sargable filter behavior keeps the endpoint `partial` or `blocked`.
- API docs state where global filters, component-internal filters, sorting, pagination, ranking, Top/Bottom, and aggregation execute. Page/API-level full-materialize-then-filter behavior keeps the endpoint `partial` or `blocked` unless it is a documented component-internal filter over already fetched component data, tiny static enum, or bounded lookup.
- Snapshot/latest-period API docs state shared data-version fields, classify the snapshot role, and prove that metrics/trends/rankings/tables/drilldowns/exports either validly reuse the declared snapshot or avoid undocumented dependency on frontend call order/controller memory.
- Data-bearing endpoint docs show how data-version, business filters, and backend-injected permission/data scope become source-side predicates, upstream provider params, precompute lookup keys, declared snapshot reuse rules, or Redis/cache key segments. Response-only metadata does not satisfy this check.
- Default-backend API documents include Python/Flask, connection-pool, and Redis/cache ownership, or a named override reason.
- Redis-backed endpoint docs include Redis role, key dimensions, TTL/invalidation, permission safety, miss/stampede behavior, fallback, pool/timeouts, and observability.
- Collection/list/table endpoints document default page size, maximum page size, stable sort, total-count behavior, cursor/keyset need when applicable, and large-result handling. Missing pagination/performance behavior keeps production-bound endpoints `partial` or `blocked`.
- API implementation documents may use JSON only as response examples. If local/mock data is needed for backend/API development, the documented simulation source is SQLite with schema, seed rows, and indexes rather than JSON files.
- Each data-bearing endpoint identifies the served component/component group and frontend compute policy; broad page-level responses that require frontend business calculation stay `partial` or `blocked`.
- Response schemas include field names, types, nullability, units, precision, enums, nesting, empty states, and examples.
- Response schemas preserve existing field contracts across source/table/upstream replacement. Any rename, removal, type/unit/precision/enum/nullability/formula/grain drift, or empty/no-permission behavior change is documented as a breaking change with version/deprecation/migration notes before `ready`.
- Newly added response fields are additive, conventionally named, source-traced, typed, permission/sensitivity-aware, and documented as stable/experimental/deprecated/pending before handoff.
- Auth, permission, no-data, invalid-param, unauthorized, no-permission, and upstream/backend failure behavior are documented when relevant.
- Production-bound API documents include source authority, runtime/environment notes, auth/permission behavior, Redis/cache and connection-pool behavior when relevant, observability/performance constraints, version compatibility, and testing handoff before `ready`.
- Pending items remain visible and do not masquerade as confirmed API behavior.
