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
- Missing-information documentation for unresolved data/API/config/auth items.
- Contract validation and a runnable local URL when startup is possible.

## Specialty Skills

- Use `$api-documentation-design` when the requested output is API文档 from API清单 and 数据模型文件.
- Use `$backend-data-transformation-design` when source models differ from API/consumer response models.
- Use `$backend-api-contract-validation` before and after implementation, or when validating API docs against frontend/prototype contracts.
- Use `$backend-missing-info-management` when source fields, formulas, enums, filters, auth/config, performance limits, runtime source details, or contract decisions are missing or assumed.
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

0. Run entry input consistency when needed.
   If API清单, 数据模型文件, API文档, frontend/prototype contracts, source samples, or implemented routes are all present, read `../workflow-shared-references/entry-input-consistency-gate.md`. Do not write or repair API docs/code while unresolved `P0` or `P1` `ENTRY-*` conflicts affect endpoint scope, response models, source authority, formulas, permissions, auth, or runtime source behavior.

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

4. Design and validate API contracts.
   Generate or update endpoint contracts from the API文档. Use `$backend-api-contract-validation` to compare routes against consumer/mock/API expectations, including fields, filters, empty states, errors, pagination, sorting, auth, and performance.

   Use the design reasonableness gate before implementation when a route shape, DTO, transformation, source strategy, auth rule, or error behavior technically works but would not reasonably serve the consumer workflow.

5. Execute mock-to-fixture-to-authoritative-source flow when mock data exists.
   First validate the mock/display contract, then generate canonical JSON fixtures for examples/tests/local fallback, then replace the mock/fixture source with the authoritative runtime source such as database repository/query, upstream API, file service, event-derived store, or existing service client. Database-backed responses are only mandatory when the database is the confirmed authoritative source.

6. Apply authentication.
   If authenticated flow is required and not explicitly disabled, integrate the project auth layer. For Haier IAMA, use `$haier-iama-backend-sso`: exchange codes through `{baseUrl}/api/oauth/code/get/v2`, validate tokens through `{baseUrl}/api/oauth/token/check`, and enforce protected business endpoints.

7. Implement in the project-native stack.
   Keep route, service, repository, schema/DTO, config, error, CORS, and auth concerns separated. Do not introduce Flask when an existing backend stack is present.

8. Update docs and missing information.
   Keep API文档, missing-info docs, examples, and implementation defaults consistent. Temporary assumptions must appear in docs and code with the same behavior.

9. Verify and start.
   Run focused tests/smoke checks, validate response contracts, confirm the authoritative runtime source mode when relevant, start the backend on an available port, and return the URL. If blocked, state the exact external blocker.

10. Check production closed-loop readiness.
   Apply `../workflow-shared-references/production-closed-loop-readiness.md` before calling implementation work production-ready. Include backend URL/health evidence, source mode proof, contract validation, auth behavior, config/env handling, observability, performance/capacity limits, deployment/rollback notes, missing-info status, and testing handoff. Local/demo-only services remain `partial` unless the user explicitly accepts them as the target.

## Mandatory Mock To Fixture To Authoritative Source Flow

When backend implementation starts from frontend/prototype mock data, use this forced sequence:

1. Mock contract validation.
   Treat the mock/display shape as the frontend contract. Validate fields, types, units, precision, enums, filters, empty states, sort order, and response nesting.

2. Canonical JSON fixture generation.
   Generate stable JSON fixtures for tests, examples, and local fallback. JSON fixtures are not the final production data source.

3. Authoritative source replacement.
   Implement the confirmed runtime source and make it the default business data source. The source may be a database, upstream API, file/object store, event-derived read model, existing service client, or explicitly approved file-backed source.

4. Multi-source verification.
   Compare mock contract, JSON fixture response, and authoritative runtime-source response for representative requests. Record allowed differences and failures in API docs and missing-info docs.

Hard rules:

- Do not stop after JSON fixture generation when a real runtime source is expected.
- Do not leave production-mode APIs reading generated JSON by default unless the user explicitly requests and documents a file-backed service.
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
- Verification commands and runnable URL or exact blocker.
- Production closed-loop readiness: health/smoke evidence, source-mode proof, auth/config notes, observability/performance limits, deployment/rollback notes, test handoff, and open blocker status.
- Stage handoff summary: backend URL, API doc version, auth/SSO contract, known partial endpoints, and testing blockers.

## Quality Checklist

- In data-service mode, API文档 is produced from API清单 and 数据模型文件 without silently inventing endpoints or models.
- Contradictions across API清单、数据模型文件、API文档、mock/display contracts, source/env/auth notes, implemented routes, and runtime traces use `ENTRY-*` findings; unresolved `P0`/`P1` findings block affected API docs/code.
- Backend/API design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings block affected API docs/code or keep them `partial`.
- Every endpoint response traces to a response model and source/logical model or a pending item.
- Request params cover filters, drilldowns, pagination, sorting, exports, and defaults.
- Error, empty, auth, and no-permission behavior are documented.
- Implementation mode is only used when backend code/startup is requested.
- Mock-derived backend work completes mock-to-fixture-to-authoritative-source replacement or clearly reports the source blocker.
- Production-bound data services include health/smoke evidence, source-mode proof, auth/config notes, observability/performance limits, deployment/rollback notes, and testing handoff before `ready`.
- The final output uses shared readiness values `ready`, `partial`, or `blocked`, and states whether frontend development and testing can consume the backend artifacts.
