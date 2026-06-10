# Consistency Gate

Run this gate before finalizing any 技术方案 output.

## Architecture Traceability Matrix

Create or mentally verify this matrix:

| Business capability | Page/module/process | Architecture view | ADR ID | API ID | Response model | Logical model | Source model | Permission rule | NFR/runtime rule | Gap/Risk IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Minimum requirements:

- Every in-scope business capability has a page/module/process owner or an explicit out-of-scope decision.
- Every page/module/process that consumes data has an architecture boundary, API ID or static/offline decision, response model, logical model, source model, permission decision, runtime/NFR decision, and readiness status.
- Every architecture view (`business`, `system context`, `logical`, `data flow`, `API/integration`, `runtime/deployment`, `security`, `operations`, `roadmap`) is either populated or explicitly out of scope with a reason.
- Every technology choice has an ADR row with selected option, default/override, reason, tradeoff, compatibility impact, test/release impact, owner/source, and status.
- Every P0 API has a backend reuse pattern, common request/response family, service-layer mapping, permission rule, cache/precompute decision, timeout/fallback behavior, and observability expectation or linked `GAP-*`.
- Every response model traces to a logical model and source model, or to a gap ID.
- Every metric ID appears in a response model, transformation rule, lineage rule, or gap ID.
- Every reporting/BI/dashboard model has subject area, business process/object, layer/type, grain, key, business time口径, update mode, and data-version decision or a gap ID.
- Every reusable or core metric has additivity, numerator/denominator where needed, time口径, dedup rule, source dependency, reconciliation rule, and permission/scope decision or a gap ID.
- Every summary/wide/ADS model has a query pattern, reuse/application reason, dimensions retained, metrics retained, and traceability path or a gap ID.
- Every dynamic filter option has a source model, static enum, or gap ID.
- Every sensitive response field has a masking/field-permission rule or explicit no-sensitive-data decision.
- Every database-backed P0 API has SQL query-writing notes or a gap ID: projection, predicate shape, join cardinality, pagination/keyset strategy, and plan-evidence need.
- Every production-bound delivery has deployment/rollback, monitoring/alerting, release gate, and owner actions or linked gaps.

## Cross-Artifact Checks

Check these pairs:

- 技术架构设计 vs 技术实现路径: all architecture decisions have a downstream phase, owner, and acceptance evidence.
- 技术架构设计 vs 技术选型说明/ADR: selected stacks and runtime assumptions match system context, logical modules, data flow, deployment, and operations views.
- 技术架构设计 vs API清单: endpoint families, service-layer mapping, cache policy, permission boundary, error model, and health/status model match.
- 技术架构设计 vs 数据模型文件: data flow, model layers, grain, source authority, data-version fields, and lineage match.
- 技术选型说明/ADR vs API清单: chosen backend/cache/deployment stack supports async exports, concurrency, rate limits, cache invalidation, and health/status endpoints.
- 技术选型说明/ADR vs 缺口台账: every override, unclear runtime dependency, or missing owner has a gap or risk entry.
- API清单 vs 数据模型文件: response model names, field groups, source model dependencies, metric IDs, data-version fields, permission notes, quality rules.
- API清单 vs 待补充数据模型清单/缺口台账: every `partial` or `blocked` API has linked gap IDs.
- 数据模型文件 vs 待补充数据模型清单/缺口台账: every unmapped field, formula, enum, join, owner, refresh rule, grain, source authority, or permission item has a gap ID.
- Prototype data code vs 技术架构/API清单: every mock dataset, resolver, component prop, filter field, drawer, export, or action is represented or intentionally excluded.
- Requirement/prototype scope vs 技术实现路径: every required page, interaction, source dependency, acceptance rule, environment, and release dependency has a phase or gap.
- Runtime model vs 非功能/生产准备: pool, Redis/cache/precompute, timeout/fallback, rate/concurrency limits, async job lifecycle, observability, and release/rollback are consistent.
- Security/permission strategy vs API/model/export: role scope, organization scope, row/field/action/export permission, masking, audit, and sensitive data treatment match.

## Failure Handling

If a check fails:

1. Do not hide it in prose.
2. Add or update a gap item and, when it may harm delivery, a risk item.
3. Set the affected architecture view, ADR, API, model, roadmap item, or artifact status to `partial` or `blocked`.
4. State exactly what information or decision would make it `ready`.

## Common Red Flags

- The document jumps directly to API清单 and 数据模型文件 without architecture blueprint, technology selection, implementation roadmap, security, or production readiness.
- "技术架构" only lists frontend/backend names but has no system context, logical modules, data flow, runtime, security, or operations view.
- Technology selection states only "Vue/Flask/Redis" without reasons, tradeoffs, override source, compatibility impact, or test/release impact.
- Redis is mentioned without role, key dimensions, TTL/invalidation, permission-safety boundary, stampede protection, fallback, or monitoring.
- One API returns unrelated page sections with different grains, permissions, refresh needs, cache policy, or response lifecycle.
- Response fields are copied from mock data but have no source mapping or adapter ownership.
- A metric formula has numerator/denominator names but no filter scope, grain, time口径, or reconciliation rule.
- A metric is a ratio/rate/average but only stores the final value and has no numerator/denominator.
- A snapshot/semi-additive metric such as inventory or balance is summed across dates without a period rule.
- A source/logical model has fields but no business process, layer/type, grain, key, business time口径, or update mode.
- A data model mirrors source-system tables directly for reporting without DWD/DIM/DWS/ADS or accepted simplification.
- A many-to-many relationship is represented by comma-separated IDs or an unqualified join that can duplicate measures.
- An ADS/wide model tries to serve unrelated domains or has no field block/traceability strategy.
- A drilldown parameter is present in frontend interactions but absent from API request params.
- An export API is omitted even though the page has export behavior.
- Permission is described as "按权限" without identity source, role, organization scope, row-level data rule, field visibility, export rule, or audit rule.
- Security is described only as "登录后可访问" without token/session handling, role/data scope, sensitive fields, masking, and audit/export constraints.
- Performance is described as "正常返回" without latency target, volume, concurrency model, async/offline threshold for long-running work, cache/precompute, connection pool, timeout/retry/fallback, rate/concurrency limit, export limit, or SLA notes.
- Database-backed API rows say only "SQL查询" without selected columns, sargable predicates, join keys/cardinality, pagination/keyset strategy, or plan-evidence gap.
- Deployment is described as "发布上线" without environment, config/secrets, health check, monitoring, rollback, and release gate.
- Sensitive fields are exposed without masking, field-level permission, or explicit no-sensitive-data decision.
