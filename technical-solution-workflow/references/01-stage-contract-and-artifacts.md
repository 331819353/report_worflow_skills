# Stage Contract And Artifacts

Use this reference to keep the 技术方案 stage small, explicit, and handoff-ready.

## Stage Boundary

The 技术方案 stage produces planning artifacts. It does not write backend code, frontend code, database DDL, SQL jobs, or test automation unless the user explicitly asks for those deliverables.

Allowed outputs:

- API清单.
- 数据模型文件.
- 待补充数据模型清单.
- Handoff notes for 数据服务, 前端联调, or 测试集成.

Not allowed by default:

- Full API文档 with complete examples for every endpoint. That belongs to 数据服务.
- Backend route implementation.
- Frontend request adapter implementation.
- Real database query implementation.

## Input Inventory Template

| Input ID | Type | File/path or source | Version/date | Owner | Coverage | Uncertainty |
| --- | --- | --- | --- | --- | --- | --- |
| IN-001 | requirement / data-doc / metric-list / prototype-code / supporting |  |  |  | pages, models, metrics, or APIs covered | missing, stale, ambiguous, or confirmed |

Rules:

- Assign an `IN-*` ID to every source of truth.
- Prefer the user's file names and page/module names. Do not rename business objects unless the original name is unusable.
- If a file is absent but expected, add a pending item instead of silently skipping it.

## Artifact Roles

| Artifact | Owns | Must not own |
| --- | --- | --- |
| API清单 | Endpoint candidates, page/module coverage, request params at inventory level, response model names, source model dependencies, auth/permission notes, global SQL/source filter execution, component-internal local filter scope, pagination/performance/cache/SLA notes, Redis/cache expectation, connection-pool expectation, priority, status, SQLite fixture need when mock-derived implementation is expected | Full JSON schema examples for every response, backend implementation details |
| 数据模型文件 | Source models, logical models, response/view models, field mapping, metric formulas, transformations, security/masking rules, quality rules, ownership, freshness | UI layout decisions, backend code |
| 待补充数据模型清单 | Missing or assumed requirement/source/model/metric/enum/join/sample/permission/security/performance items, owner questions, impact, status | Completed decisions without source, vague TODOs |

## Handoff Meaning

Use these readiness labels:

- `ready`: Enough information exists for the next stage to document or implement without inventing core data behavior.
- `partial`: Work can continue with explicit assumptions, but at least one non-blocking data/model decision remains open.
- `blocked`: A missing item prevents reliable API documentation, implementation, or validation.

Never label the whole stage `ready` when any P0 API, core metric, source relationship, or permission rule is `blocked`.
