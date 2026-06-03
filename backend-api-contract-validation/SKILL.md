---
name: backend-api-contract-validation
description: "用于验证后端/API契约是否与文档、前端期望、mock、数据库/上游数据、OpenAPI、运行样例一致。用户提到接口契约校验、请求响应不一致、字段缺失、类型/单位/精度/枚举错误、分页排序筛选、空态/错误码/鉴权、数据库返回与页面不符、接口回归、mock替换前验证、联调问题定位时触发，输出字段级差异和修复/阻塞结论。"
---

# Backend API Contract Validation

## Overview

Use this skill independently to prevent APIs from being technically valid but unusable by downstream consumers. A contract includes route shape, request semantics, response schema, examples, empty states, errors, auth, pagination, sorting, filters, transformations, and performance boundaries.

Typical inputs are API documentation, frontend clients, mock/display contracts, SQLite fixture databases, JSON response examples, OpenAPI schemas, implemented routes, upstream samples, database-backed responses, runtime responses, and transformation rules. The output is a pass/partial/fail contract validation note.

## Core Workflow

1. Collect contracts to compare.
   Identify all available contracts and choose or record the authoritative source.

   When API docs, frontend clients, mock/display contracts, SQLite fixtures, JSON response examples, OpenAPI schemas, route code, upstream samples, database responses, runtime samples, or env/auth notes contradict each other, run `references/standalone-quality-gates.md#entry-input-consistency-gate`. Do not mark pass or repair affected contracts/code while unresolved `P0`/`P1` `ENTRY-*` findings need user confirmation.

   When contracts agree but the API shape, transformation, error behavior, auth rule, pagination/export model, or source strategy would be unreasonable for the consumer workflow, run `references/standalone-quality-gates.md#design-reasonableness-gate` and record `DESIGN-*` findings.

2. Compare response shape field by field.
   Check fields, nesting, types, units, precision, enums, date/period formats, ordering, nullability, and empty-state shape.

3. Validate request behavior.
   Check query/path/body params, filters, defaults, pagination, sorting, search, date ranges, permission scope, and invalid-param errors.

4. Validate transformation samples.
   For documented source-to-response transformation rules, confirm representative sample inputs produce expected response values.

5. Validate runtime/source alignment.
   Compare documented contracts, local fixtures, implemented responses, upstream responses, and database-backed responses according to the project source strategy.

6. Validate errors and auth.
   Check error envelope, HTTP status, business code, message, auth failure, token-invalid behavior, no-permission behavior, and upstream/data-source failure behavior.

7. Validate performance and scale.
   Check default page size, maximum page size, stable sort, total-count behavior, cursor/keyset need, export limit, timeout behavior, Redis/cache/precompute strategy, database connection-pool behavior, retry behavior, and large result handling. Fail or mark partial any collection/list/table endpoint without bounded pagination, with an unbounded synchronous full-list response, or with page/API-level full-materialize-then-filter behavior.

8. Validate production-readiness evidence when applicable.
   Apply `references/standalone-quality-gates.md#production-closed-loop-readiness` for production-bound contracts. Check runtime URL/health, source mode, API version alignment, auth/permission, environment/config, observability/log evidence, performance/export limits, and testing handoff before marking contract validation as production-ready.

## References

- Read [references/01-contract-sources-and-authority.md](references/01-contract-sources-and-authority.md) when gathering artifacts, resolving conflicts, or deciding authoritative behavior.
- Read [references/standalone-quality-gates.md#entry-input-consistency-gate](references/standalone-quality-gates.md#entry-input-consistency-gate) when contract sources contradict each other and a user-confirmed authority decision is needed.
- Read [references/standalone-quality-gates.md#design-reasonableness-gate](references/standalone-quality-gates.md#design-reasonableness-gate) when API contract shape affects consumer usability, data correctness, permission behavior, or testability.
- Read [references/standalone-quality-gates.md#production-closed-loop-readiness](references/standalone-quality-gates.md#production-closed-loop-readiness) when validation evidence is used for production acceptance.
- Read [references/02-response-and-request-validation.md](references/02-response-and-request-validation.md) for field-level, request, filter, error, auth, and performance checks.
- Read [references/03-runtime-source-validation.md](references/03-runtime-source-validation.md) when comparing mocks, SQLite fixtures, upstream services, database responses, and live runtime responses.
- Read [references/04-validation-note-template.md](references/04-validation-note-template.md) when producing the validation note.

## Required Output

Produce a compact validation note in the API document, PR, issue, test report, or task response. Include evidence when a status depends on runtime behavior: environment, URL or operation, request command/tool, sample response location or excerpt, timestamp, and test command/result.

## Verification Checklist

- Every endpoint or operation in scope has a status: pass, partial, fail, or not tested.
- Entry conflicts across docs, clients, mocks, SQLite fixtures, schemas, route code, upstream/database/runtime samples, and env/auth notes are resolved or marked with `ENTRY-*`; unresolved `P0`/`P1` findings block pass status.
- Design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings block pass status or keep the operation `partial`.
- No consumer-required field is missing or renamed without a documented adapter/contract decision.
- Empty, no-data, invalid-param, unauthenticated, token-invalid, no-permission, and upstream-failure responses match the expected handling.
- Pagination, sorting, filters, exports, and defaults use documented names and behavior; list/table endpoints have bounded pagination, maximum page size, stable sort, and large-result handling.
- Global/page-level filters, sorting, pagination, ranking, Top/Bottom, grouping, aggregation, and counts execute at SQL/source/provider/repository/cache stage; page/API-level full-materialize-then-filter implementations fail or stay `partial` except documented component-internal filters over already fetched component data, tiny static enums, or bounded lookups.
- Database-backed runtime uses a connection pool or documents externally managed pooling.
- Redis/cache behavior is validated when used: key dimensions, TTL, invalidation, permission safety, stampede protection, and fallback.
- Mock-derived backend/API implementations use SQLite fixtures as the simulation source. JSON files or in-memory arrays are not accepted as API data sources, though JSON response examples may be validated as examples.
- Runtime/source comparisons are performed when sample or live responses are available.
- Runtime pass/partial/fail statuses include enough evidence to reproduce or review the result.
- Production-bound pass status includes runtime URL/health, source mode, API version alignment, auth/env behavior, observability/performance evidence, and testing handoff; otherwise use `partial` or `not tested`.
- Contract failures are fixed or captured in backend missing-information documentation with owner, impact, current assumption, and retest criteria.
