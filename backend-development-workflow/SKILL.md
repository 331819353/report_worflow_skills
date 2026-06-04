---
name: backend-development-workflow
description: "运行数据服务/后端开发阶段，用于接口文档落地到后端实现或本地服务交付。用户提到后端、服务端、数据服务、Flask、接口实现、接口开发、后端接口、数据接口、启动后端、本地后端、接口联调准备、鉴权中间件、JWT、Access-Token校验、SSO后端接入、数据库/文件/上游API接入时触发；标准输入为API文档/清单和数据模型，输出后端代码、API文档、运行URL或阻塞项。"
---

# Backend Development Workflow

## Overview

Use this as the top-level workflow for the 数据服务 stage and optional backend implementation work.

Default stage contract:

- Inputs: API清单 and 数据模型文件.
- Required output: API文档.
- Primary helper: `$api-documentation-design`.

Routing boundary:

- `需求/数据源/指标/原型数据代码 -> API清单 + 数据模型文件` belongs to `technical-solution-workflow`.
- `API清单 + 数据模型文件 -> API文档` belongs to this workflow's API Documentation Mode.
- `API文档/source/env -> backend code + runnable service` belongs to this workflow's Backend Implementation Mode only when implementation is explicitly requested.

When the user asks for an actual service implementation, extend the workflow into backend implementation mode. Do not implement a backend merely because the data-service stage asks for API documentation.

## Workflow Modes

### 1. API Documentation Mode

Use this mode when the user provides or asks for API清单 + 数据模型文件 -> API文档.

Deliver:

- API document grouped by page/module/domain.
- Common conventions: base URL, headers, auth, envelope, errors, pagination, sorting, filters, enum/date formats.
- Endpoint details with request params, response schema, examples, data model trace, transformation notes, performance notes, and pending items.
- A clear list of blocked or partial endpoints when model/source information is incomplete.

Use `$api-documentation-design` for the API document.

### 2. Backend Implementation Mode

Use this mode only when the user asks for backend code, a running service, route implementation, database access, Flask/FastAPI/Spring/Express work, or local backend URL.

Deliver:

- Implemented backend in the existing project stack, or Flask only for a new unconstrained Python service.
- API documentation kept consistent with implemented routes.
- SQLite-backed simulation database when a real runtime source is unavailable but mock data is needed for API development or local verification.
- Missing-information documentation for unresolved data/API/config/auth items.
- Contract validation and a runnable local URL when startup is possible.

## Specialty Skills

- Use `$api-documentation-design` when the requested output is API文档 from API清单 and 数据模型文件.
- Use `$backend-data-transformation-design` when source models differ from API/consumer response models.
- Use `$backend-api-contract-validation` before and after implementation, or when validating API docs against frontend/prototype contracts.
- Use `$backend-missing-info-management` when source fields, formulas, enums, filters, auth/config, performance limits, runtime source details, or contract decisions are missing or assumed.
- Use `$data-quality-validation` when backend/API implementation depends on real data trust, refresh SLA, completeness, uniqueness, accuracy, anomalies, drift, or cross-source reconciliation.
- Use `$production-observability-feedback` when backend/API output is production-bound and needs monitoring for availability, latency, error rate, logs, refresh SLA, alerting, or feedback closure.
- Use `$haier-iama-backend-sso` when backend endpoints must validate Haier IAMA `Application-Key` and `Access-Token` values. That child skill chooses the correct backend SSO path, including Java SDK, direct API, local session/JWT bridge, middleware retrofit, or multi-client/tenant-aware flow.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$api-documentation-design` | API documentation is requested or API docs must be updated after implementation. | Narrow backend debugging without API contract changes. |
| `$backend-data-transformation-design` | Source model differs from response/display model, or formulas/aggregation/date/unit/enum conversion are involved. | Passthrough endpoint with confirmed identical source and response model. |
| `$backend-api-contract-validation` | Implementing routes, changing response fields, or validating docs against frontend/prototype expectations. | Pure API document drafting with no consumer evidence. |
| `$backend-missing-info-management` | Source/auth/env/performance/contract information is missing or assumed. | All required fields and decisions are confirmed and traceable. |
| `$haier-iama-backend-sso` | Haier IAMA SSO or `Application-Key`/`Access-Token` validation is required. | The product explicitly disables SSO/auth for the service. |

## API Documentation Mode Flow

0. Run entry input consistency when multiple entry artifacts exist.
   If two or more of API清单, 数据模型文件, API文档, frontend/prototype contracts, source samples, or implemented routes are present, read `../workflow-shared-references/entry-input-consistency-gate.md`. Do not write or repair API docs/code while unresolved `P0` or `P1` `ENTRY-*` conflicts affect endpoint scope, response models, source authority, formulas, permissions, auth, or runtime source behavior.

1. Read API清单.
   Confirm endpoint id, page/module, method/path, purpose, trigger, request params, response model, source model dependency, auth need, priority, and status.

2. Read 数据模型文件.
   Confirm source models, logical models, response/view models, data-source metadata, relationships, metric formulas, transformation rules, quality rules, and pending model items.

3. Check traceability.
   Every endpoint must reference a response model. Every response model must trace to logical/source models or a pending model item.

   Run `../workflow-shared-references/design-reasonableness-gate.md` when endpoint boundaries, response models, transformations, auth, permissions, pagination, sorting, filters, exports, or error behavior may be unreasonable for the consuming report/frontend/testing workflow. Record `DESIGN-*` findings before writing final API docs.

4. Create API文档.
   Use `$api-documentation-design`. Include common conventions, endpoint overview, endpoint details, request/response examples, errors, auth, performance constraints, and model traceability.

5. Mark unresolved items.
   Any missing source field, formula, enum, join key, sample row, permission rule, or environment value must be visible in the API文档 as partial/blocked behavior.

6. Handoff.
   State whether the API document is ready for data-visualization integration and testing, or which exact data model gaps block downstream work.

7. Check production closed-loop readiness when the target is real delivery.
   Apply `../workflow-shared-references/production-closed-loop-readiness.md` before marking the data-service stage production-ready. API docs alone are `partial` unless source authority, auth/permission, environment/config, error behavior, observability, performance/export constraints, versioning/backward compatibility, and testing handoff are explicit or intentionally out of scope.

## Backend Implementation Mode Flow

1. Discover project context.
   Inspect backend stack, package files, environment config, route structure, existing auth, data access, docs, tests, and provided inputs. Prefer the existing stack and conventions.

   Run the entry consistency gate when API docs, source/env/auth notes, mock/display contracts, data models, implemented routes, or runtime traces disagree. Ask for user confirmation before editing affected backend contracts or code for unresolved `P0`/`P1` findings.

2. Analyze data sources and models.
   Identify file/database/upstream sources, raw models, response models, ownership, freshness, joins, sample rows, permissions, and data quality. Record missing or assumed items through `$backend-missing-info-management`.

3. Design transformations.
   Compare source data, data models, mock data, API docs, and consumer display expectations. Use `$backend-data-transformation-design` for date/period conversion, aggregation, field renames, enum mapping, unit conversion, formulas, precision, defaults, sorting, grouping, and reconciliation.

   For database-backed endpoints, push global/page-level filtering, permission scope, sorting, pagination, aggregation, joins, Top/Bottom, and count calculations into SQL `WHERE`/`JOIN`/`GROUP BY`/`ORDER BY`/`LIMIT` clauses, database views, or repository queries whenever the database is the authoritative source. Do not fetch broad result sets and calculate business results in memory except for small DTO formatting, enum label mapping, or explicitly bounded post-processing. Reject full-materialize-then-filter designs: the service must not build/load the complete candidate dataset, component view model, or page payload and then apply global filters, sorting, pagination, Top/Bottom, or business aggregation in memory. Component-internal filters are a separate scope: local tabs, legend toggles, small in-component search, and display-only slicing may run on the component's already fetched dataset after global SQL filtering, but must not become a substitute for global SQL `WHERE` filtering. Every list/table endpoint must have bounded pagination, stable sorting, and a documented default/max page size before implementation is considered complete.

4. Design and validate API contracts.
   Generate or update endpoint contracts from the API文档. Use `$backend-api-contract-validation` to compare routes against consumer/mock/API expectations, including fields, filters, empty states, errors, pagination, sorting, auth, and performance.

   Use the design reasonableness gate before implementation when a route shape, DTO, transformation, source strategy, auth rule, or error behavior technically works but would not reasonably serve the consumer workflow.

5. Execute mock-to-SQLite-to-authoritative-source flow when mock data exists.
   First validate the mock/display contract, then create a local SQLite fixture database with schema, seed rows, indexes, constraints, and representative edge cases. Implement local/demo API routes against SQLite queries instead of JSON or in-memory arrays. JSON may be used only as response examples in documentation or test assertions, not as the API data source. Then replace the SQLite fixture source with the authoritative runtime source such as database repository/query, upstream API, event-derived store, or existing service client when that source is available.

   SQLite simulation may use fewer rows than production, but data quality must stay high. Seed data must be dense enough to make request parameter changes visibly affect API results: filters, date ranges, organization/region/product/customer dimensions, status enums, permission scope, sorting, pagination, Top/Bottom, drilldown IDs, empty states, abnormal values, and aggregate totals must each have matching and non-matching rows. Do not generate a thin fixture where all parameters return the same shape, identical totals, or only default-state data. Treat SQLite responses as experience-equivalent to the real interface for local frontend/integration testing.

   When real table metadata is available, implement the authoritative path by mapping real table/view fields into the prototype/API response model, applying formula, enum, unit, date, permission, and aggregation transformations in SQL/repository queries. After source authority, join keys, permission scope, performance constraints, and contract validation are confirmed, the real SQL-backed interface can be the default publishable service without a SQLite handoff step.

6. Apply authentication.
   If authenticated flow is required and not explicitly disabled, integrate the project auth layer. For Haier IAMA, use `$haier-iama-backend-sso`: exchange codes through `{baseUrl}/api/oauth/code/get/v2`, validate tokens through `{baseUrl}/api/oauth/token/check`, and enforce protected business endpoints.

7. Implement in the project-native stack.
   Keep route, service, repository, schema/DTO, config, error, CORS, and auth concerns separated. Do not introduce Flask when an existing backend stack is present.

   Database filters must be index-friendly. Prefer direct column predicates such as `field = ?`, `field IN (...)`, `field >= ? AND field < ?`, and anchored prefix search where supported. Avoid `FUNCTION(field) = ?`, `DATE(field) = ?`, `YEAR(field) = ?`, `TO_CHAR(field) = ?`, `LOWER(field) = ?`, arithmetic on indexed columns, or leading-wildcard `LIKE` on large tables unless a matching function-based/generated-column/full-text index is explicitly confirmed. Rewrite date/month filters as ranges, and record any unindexed or non-sargable filter as a performance gap.

   Implement pagination for every collection/list/table endpoint. Use `pageNo` + `pageSize` or the project convention for ordinary bounded lists, and prefer cursor/keyset pagination for high-volume, frequently updated, or deep-scroll result sets. Enforce a maximum page size, define default sorting for stable pages, return pagination metadata, and optimize total-count behavior. Do not expose unbounded full-list APIs or export-sized responses through synchronous list endpoints.

   Use database connection pooling for database-backed implementations. Reuse the project pool when one exists; otherwise configure a bounded pool with min/max size, acquire timeout, idle timeout, validation/health behavior, and safe shutdown. Do not open a new physical database connection per request or per component call.

   Consider Redis or the project cache layer for hot, repeated, expensive, or permission-scoped queries. Cache keys must include global filters, permission scope, user/tenant scope when relevant, pagination/sort params, source version, and locale/unit options that affect the response. Document TTL, invalidation, stampede protection, fallback behavior, and sensitive-data rules before marking cached behavior production-ready.

   Return component-ready response models for report/dashboard endpoints. Each data-bearing route should serve one component or a justified coherent component group and return the KPI values, chart series, table rows, totals, ranks, pagination metadata, and derived formula fields needed by that component. Do not offload business aggregation, ranking, filtering, formula calculation, or multi-component response splitting to frontend code unless the exception is explicitly bounded and documented. Do not implement a broad all-data endpoint and rely on the frontend or service layer to narrow it after full construction.

8. Update docs and missing information.
   Keep API文档, missing-info docs, examples, and implementation defaults consistent. Temporary assumptions must appear in docs and code with the same behavior.

9. Verify and start.
   Run focused tests/smoke checks, validate response contracts, confirm the authoritative runtime source mode when relevant, start the backend on an available port, and return the URL. If blocked, state the exact external blocker.

10. Check production closed-loop readiness.
   Apply `../workflow-shared-references/production-closed-loop-readiness.md` before calling implementation work production-ready. Include backend URL/health evidence, source mode proof, contract validation, auth behavior, config/env handling, observability, performance/capacity limits, deployment/rollback notes, missing-info status, and testing handoff. Local/demo-only services remain `partial` unless the user explicitly accepts them as the target.

## Mandatory Mock To SQLite To Authoritative Source Flow

When backend implementation starts from frontend/prototype mock data, use this forced sequence:

1. Mock contract validation.
   Treat the mock/display shape as the frontend contract. Validate fields, types, units, precision, enums, filters, empty states, sort order, and response nesting.

2. SQLite fixture database generation.
   Create a local SQLite database, schema DDL, seed data, indexes, and representative rows for default, filtered, empty, permission-limited, abnormal, and pagination states. SQLite fixtures are the required simulation source for API development; JSON files are allowed only for response examples or assertion snapshots.

   Fixture rows must cover every request parameter that changes the response. Keep row count modest, but include enough combinations for filter narrowing, cross-period comparison, grouping, ranking, pagination, drilldown, permission-limited visibility, empty result, and abnormal value scenarios. A parameter that cannot change fixture results must be documented as unsupported or blocked, not silently accepted.

3. Authoritative source replacement.
   Implement the confirmed runtime source and make it the default business data source. The source may be a production database, upstream API, event-derived read model, existing service client, or explicitly approved bounded source. Do not promote SQLite fixtures to production source unless the user explicitly defines a SQLite-backed deliverable.

   For real database sources, transform the confirmed table/view structure into the prototype/API field contract through SQL, views, repository queries, or a bounded response adapter. If the field mapping, formulas, permissions, quality rules, and performance checks are ready, the real table-backed API is publishable directly; do not keep SQLite as the default source after the real source path is validated.

4. Multi-source verification.
   Compare mock contract, SQLite query/API response, and authoritative runtime-source response for representative requests. Record allowed differences and failures in API docs and missing-info docs.

Hard rules:

- Do not use JSON files, Python/JS arrays, or in-memory collections as the API data source for local simulation when backend/API implementation is requested.
- Do not build/load all fixture rows or authoritative rows before applying request filters, sort, pagination, ranking, or aggregation. SQLite simulation and production sources must both query the narrowed result set at the repository/source boundary.
- Do not accept low-quality SQLite fixtures where request parameters do not change totals, rows, rankings, empty states, pagination, drilldowns, or permission-limited responses as the real API would.
- Do not stop after SQLite fixture generation when a real runtime source is expected.
- Do not leave production-mode APIs reading SQLite fixtures by default unless the user explicitly requests and documents a SQLite-backed service.
- If source credentials, tables/views, SQL, upstream endpoint contracts, file paths, permissions, join keys, event topics, service clients, network access, or sample rows are missing, mark authoritative source replacement as blocked or partial.

## References

- Read [../workflow-shared-references/report-delivery-pipeline-contract.md](../workflow-shared-references/report-delivery-pipeline-contract.md) for cross-workflow routing, readiness values, and handoff requirements.
- Read [../workflow-shared-references/entry-input-consistency-gate.md](../workflow-shared-references/entry-input-consistency-gate.md) when API清单、数据模型文件、API文档、source/env/auth notes、mock/display contracts、implemented routes, or runtime traces may conflict.
- Read [../workflow-shared-references/design-reasonableness-gate.md](../workflow-shared-references/design-reasonableness-gate.md) when backend/API design choices affect consumer usability, data correctness, permissions, runtime behavior, or testability.
- Read [../workflow-shared-references/production-closed-loop-readiness.md](../workflow-shared-references/production-closed-loop-readiness.md) before marking API docs or backend implementation production-ready.
- Read [references/api-document-template.md](references/api-document-template.md) when implementation mode needs an in-repo API document template.
- Read [references/missing-info-template.md](references/missing-info-template.md) when implementation mode needs a missing-information document template.

## Required Outputs

For API documentation mode:

- API文档.
- Entry consistency status, unresolved `ENTRY-*` findings, and user-confirmed decisions when mixed input artifacts were checked.
- Design reasonableness status, unresolved `DESIGN-*` findings, and repairs or accepted limitations.
- API/model traceability summary.
- Production closed-loop readiness when the API document is intended for real delivery.
- Pending/blocker list if any.
- Stage handoff summary: readiness, frontend/testing consumability, blockers, and next-stage owner questions.

For backend implementation mode:

- Implemented backend changes.
- Updated API文档.
- Entry consistency status and decisions that affected routes, DTOs, auth, data sources, or examples.
- Design reasonableness status and decisions that affected routes, DTOs, transformations, auth, data sources, or examples.
- Missing-information document.
- Contract validation notes.
- SQLite fixture schema/seed/index files and source-mode notes when simulation data is used.
- Verification commands and runnable URL or exact blocker.
- Production closed-loop readiness: health/smoke evidence, source-mode proof, auth/config notes, observability/performance/pagination limits, deployment/rollback notes, test handoff, and open blocker status.
- Stage handoff summary: backend URL, API doc version, auth/SSO contract, known partial endpoints, and testing blockers.

## Quality Checklist

- In data-service mode, API文档 is produced from API清单 and 数据模型文件 without silently inventing endpoints or models.
- Contradictions across API清单、数据模型文件、API文档、mock/display contracts, source/env/auth notes, implemented routes, and runtime traces use `ENTRY-*` findings; unresolved `P0`/`P1` findings block affected API docs/code.
- Backend/API design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings block affected API docs/code or keep them `partial`.
- Every endpoint response traces to a response model and source/logical model or a pending item.
- Request params cover filters, drilldowns, pagination, sorting, exports, and defaults.
- Database-backed endpoints push global/page-level filtering, permission scope, sorting, pagination, aggregation, joins, and counts into SQL/repository queries instead of broad in-memory calculation.
- Component-internal filters are explicitly scoped to already fetched component datasets after global SQL filtering; they do not replace database `WHERE` filters for page/global criteria.
- Full-materialize-then-filter behavior is blocked: no endpoint may build/load the complete candidate dataset or component/page payload before applying global filters, sorting, pagination, ranking, Top/Bottom, or business aggregation, except for explicitly bounded static enums, tiny lookup sets, or documented component-internal filters over already fetched component data.
- Database filters are index-friendly direct predicates; any unavoidable `FUNCTION(field) = ?`, leading-wildcard search, or unindexed filter is documented as partial/blocked with a performance gap.
- Database-backed implementations use a connection pool or document why the existing runtime manages pooling externally.
- Redis/cache usage is evaluated for hot or expensive queries, with cache key, TTL, invalidation, permission safety, and fallback behavior documented when used.
- Collection/list/table endpoints implement bounded pagination, maximum page size, stable sorting, and large-result handling; unbounded synchronous full-list APIs are partial or blocked.
- Report/dashboard endpoints are component-aligned and return component-ready response models; frontend business computation exceptions are documented as partial scope.
- Error, empty, auth, and no-permission behavior are documented.
- Implementation mode is only used when backend code/startup is requested.
- Mock-derived backend work uses SQLite fixture databases for simulation and completes mock-to-SQLite-to-authoritative-source replacement or clearly reports the source blocker.
- Production-bound data services include health/smoke evidence, source-mode proof, auth/config notes, observability/performance/pagination limits, deployment/rollback notes, and testing handoff before `ready`.
- The final output uses shared readiness values `ready`, `partial`, or `blocked`, and states whether frontend development and testing can consume the backend artifacts.
