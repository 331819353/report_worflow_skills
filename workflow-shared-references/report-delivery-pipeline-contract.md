# Report Delivery Pipeline Contract

Use this shared contract from every top-level workflow. It keeps the report delivery pipeline consistent across prototype design, technical solution, backend/data service, frontend integration, and testing.

Before a top-level workflow builds, repairs, documents, or hands off artifacts from mixed entry materials, run `entry-input-consistency-gate.md`. User requirements, HTML/source samples, screenshots, API docs, data models, mock data, frontend/backend code, env/auth notes, and runtime traces may contradict each other; unresolved `P0` and `P1` entry conflicts keep the affected scope `partial` or `blocked` and require user confirmation only before the affected repair or implementation proceeds.

Before a workflow finalizes design, API/model contracts, frontend/backend wiring, visual repair, test cases, or handoff readiness, run `design-reasonableness-gate.md` when design decisions are in scope. A design can be input-consistent but still unreasonable if it fails the business question, report type, component necessity, data/API feasibility, interaction closure, layout, or testability checks.

Before a workflow marks technical architecture, data service/backend, frontend integration, or testing acceptance as production-ready, run `production-closed-loop-readiness.md`. A stage can be document-complete or locally runnable while still only `partial` if source authority, environment, auth, deployment, observability, performance, testability, or defect retest closure is missing.

When a request changes an existing delivered or in-progress artifact, route first through `$change-impact-analysis`. Do not patch one document or code surface while leaving affected metrics, API contracts, data models, frontend bindings, tests, permissions, screenshots, or delivery versions unknown.

When artifacts span more than one iteration, maintain a delivery version chain through `$delivery-version-management`. Every prototype/API/model/backend/frontend/test/release artifact should state which upstream version it consumes and which downstream version validated it.

## Stage Routing Matrix

All expected user inputs are Chinese. Prefer the Chinese trigger words below when deciding the top-level workflow.

| 中文意图/触发词 | Workflow | Required Inputs | Primary Outputs | Do Not Use For |
| --- | --- | --- | --- | --- |
| `原型`、`报表原型`、`页面原型`、`仪表盘原型`、`大屏原型`、`原型设计`、`生成原型`、`搭建原型`、`实现原型`、`还原原型`、`截图还原`、`HTML源码还原`、`优化原型`、`修复原型`、`部署原型`、`启动原型`、`返回访问地址`、`本地预览` | `report-design-workflow` | Requirements, metrics, screenshots/HTML/source when available | Prototype source/spec, binding matrix, mock/data/filter/interaction contract, self-check, URL when runnable | Pure theory or production frontend integration without prototype intent |
| `技术方案`、`技术架构`、`接口规划`、`接口清单`、`API清单`、`数据建模`、`数据模型`、`数据模型文件`、`数据源映射`、`字段映射`、`指标口径映射`、`原型数据代码分析`、`mock数据转接口`、`待补充数据模型清单`、`需求转API`、`需求转数据模型` | `technical-solution-workflow` | Requirements, data docs, metric list, prototype data code | `API清单`, `数据模型文件`, `待补充数据模型清单` | API document writing or backend implementation |
| `数据服务`、`后端开发`、`服务端`、`接口文档`、`API文档`、`接口实现`、`接口开发`、`后端接口`、`数据接口`、`接口契约`、`启动后端`、`后端服务`、`Flask服务`、`鉴权中间件`、`SSO后端接入`、`Access-Token校验` | `backend-development-workflow` | `API清单` + `数据模型文件` for docs; API docs/source/env for implementation | `API文档`, backend code when requested, runnable backend URL when possible | Requirement-to-API inventory planning |
| `前端开发`、`前端联调`、`前端接入接口`、`替换mock`、`去掉mock`、`接真实接口`、`接口对接`、`报表页面联调`、`前端数据接入`、`请求封装`、`响应适配`、`筛选参数联动`、`组件联动`、`代理配置`、`CORS`、`SSO前端接入`、`页面运行`、`启动前端`、`修复编译错误`、`修复请求错误` | `frontend-development-workflow` | Frontend/prototype source plus API docs/provider/env/auth evidence | Provider-integrated frontend source, `前端功能说明`, runnable frontend URL when possible | Business report prototype design from scratch |
| `测试`、`联调测试`、`集成测试`、`前后端联调验证`、`测试样例`、`测试用例`、`测试结果`、`验收标准`、`冒烟测试`、`URL可用性验证`、`接口连通性验证`、`SSO登录测试`、`鉴权测试`、`权限测试`、`前后端数据一致性`、`筛选联动测试`、`交互测试`、`导出测试`、`缺陷报告`、`问题复现`、`阻塞项` | `testing-integration-workflow` | `API文档`, `前端功能说明`, optional runtime URLs/accounts/data | `测试样例`, `测试结果`, defects/blockers | Building or repairing source code unless defect follow-up is requested |
| `需求变更`、`变更影响`、`改指标`、`改口径`、`改筛选`、`改权限`、`改接口`、`字段调整`、`回归范围` | `change-impact-analysis` | Change request plus current artifacts/version index when available | Impact matrix, affected artifacts, regression scope, version update plan | New greenfield design without existing artifacts |
| `指标字典`、`口径版本`、`指标血缘`、`指标权限`、`跨报表一致性`、`同名指标不同口径` | `metric-governance-lineage` | Metric list, data model/source evidence, consuming reports | Metric dictionary, definition versions, lineage, quality rules, consistency findings | One-off chart styling or layout |
| `交付版本`、`版本链路`、`交付物索引`、`prototype-v1`、`api-v1`、`test-v1`、`发布包清单` | `delivery-version-management` | Artifact paths, versions, release/change IDs | Delivery index, version chain, stale/missing artifact list | Single artifact drafting with no version relationship |
| `数据质量`、`完整性`、`唯一性`、`及时性`、`准确性`、`异常值`、`重复数据`、`数据延迟`、`口径漂移`、`跨源一致性` | `data-quality-validation` | Source/model/API/data samples, metric rules, SLA | Quality rule matrix, execution result, trust conclusion | Pure API reachability smoke test |
| `权限矩阵`、`多角色验收`、`字段可见性`、`数据范围`、`操作权限`、`导出权限`、`行级权限`、`列级权限` | `permission-matrix-validation` | Role list, org scopes, pages/APIs/fields/actions | Permission matrix, multi-role test cases, evidence/blockers | Basic SSO login flow only |
| `报表设计系统`、`视觉规范`、`颜色规范`、`字号`、`间距`、`图表规范`、`空态`、`异常态`、`响应式规范` | `report-design-system-governance` | Existing reports/screens/components/theme rules | Reusable design-system spec and adoption plan | One narrow page bug without reusable standard |
| `上线后监控`、`接口监控`、`前端错误监控`、`性能监控`、`访问埋点`、`用户反馈`、`异常告警`、`数据刷新SLA` | `production-observability-feedback` | Runtime URLs/APIs/SLA/release version/monitoring platform | Monitoring matrix, instrumentation, alert and feedback loop | Pre-release mock-only testing |

## Stage Handoff Requirements

Every stage output must include:

- `Stage`: workflow name.
- `Artifact version/source`: file paths, source URLs, commit, or user-provided document names when known.
- `Delivery version chain`: upstream/downstream version mapping when the artifact participates in an iteration or release.
- `Entry consistency`: `pass`, `partial`, `blocked`, or `not needed`, with unresolved `ENTRY-*` IDs when applicable.
- `Design reasonableness`: `pass`, `partial`, `blocked`, or `not needed`, with unresolved `DESIGN-*` IDs when applicable.
- `Production closed loop`: `ready`, `partial`, `blocked`, or `not needed`, with missing production controls or open retest items when applicable.
- `Readiness`: one of `ready`, `partial`, or `blocked`.
- `Assumptions`: accepted temporary assumptions with affected artifacts.
- `Blockers`: missing item, impact, owner/source needed, and next question.
- `Next stage`: intended consuming workflow and what it can use directly.
- `Out of scope`: work intentionally deferred.

## Readiness Values

Use these values consistently:

- `ready`: The next stage can proceed without inventing core business, data, auth, environment, or testing behavior.
- `partial`: The next stage can proceed with explicit assumptions or limited scope; unresolved items are non-blocking for the stated target.
- `blocked`: The next stage cannot produce a reliable result until listed blockers are resolved.
- `not run`: Runtime validation was applicable but could not be executed. Use only in testing/verification sections, not as an artifact readiness value.

Do not mark an artifact `ready` when a P0 metric, API, data source, permission rule, SSO contract, or runtime URL required by the next stage is unknown.

Do not mark an artifact `ready` when an unresolved `P0` or `P1` `ENTRY-*` conflict affects the next stage's scope, source authority, metric口径, API contract, permission/auth behavior, environment, or runtime data path.

Do not mark an artifact `ready` when an unresolved `P0` `DESIGN-*` finding exists, or when an unresolved `P1` `DESIGN-*` finding would affect user-visible behavior, data correctness, API/model feasibility, permissions, layout comprehension, or testability in the next stage.

Do not mark a production-bound artifact `ready` when required source authority, runtime URL/health, auth/permission, deployment/config, observability, performance/capacity, testing evidence, or blocker/major/high defect retest closure is missing.

## Cross-Stage Artifact Contract

### Report Design To Technical Solution

Required handoff bundle when a prototype feeds technical solution:

- Prototype theme, user scenario, report type, and core business questions.
- Component binding matrix: component ID, business question, data source, row grain, required fields, filters, interactions, and empty state.
- Mock/data-source contract: dataset IDs, field names, sample rows, formulas, units, enums, and derived values.
- Filter contract: filter IDs, defaults, option source, field/query mapping, global SQL/source execution stage, component-internal local filter scope, affected components, permission behavior, and bounded-local exception if any.
- Interaction contract: event names, payload fields, target drawer/modal/route/export/action, stale-selection behavior.
- Visual/layout constraints that affect data shape or export behavior.
- Assumptions and gaps that affect model/API design.

### Technical Solution To Backend Development

Required handoff bundle:

- `API清单` with API ID, page/module, method/path candidate, purpose, trigger, request params, response model, auth, priority, and status.
- `数据模型文件` with source/logical/response models, fields, formulas, joins, ownership, freshness, permission and quality rules.
- `待补充数据模型清单` with `GAP-*` IDs, impact, owner questions, assumptions, and blocked/partial status.
- Filter/sort/page execution evidence: API rows and models must state whether global filters, sorting, pagination, ranking, grouping, aggregation, Top/Bottom, and counts run in SQL/source/provider/repository/precompute/cache, and must not rely on page/API-level full-materialize-then-filter behavior. Component-internal filters must be separately scoped to already fetched component data.
- Consistency result: every API maps to a response model, and every response field maps to a source/formula/enum/gap.
- Production architecture readiness when intended for real delivery: runtime topology, frontend/backend/data boundaries, source authority, environment/auth/security assumptions, observability/performance/deployment concerns, testing handoff, and open blockers.

### Backend Development To Frontend Development

Required handoff bundle:

- `API文档` with base URL, auth headers, endpoint details, request/response examples, errors, empty/no-permission behavior, pagination/sorting/filter rules, filter/sort/page execution stage, default/max page size, and pending items.
- Runtime backend URL when implementation exists.
- Auth/SSO contract: header names, token rules, 401/token-invalid response, 403 response, public allowlist.
- Backend health/smoke evidence, source-mode proof, environment/config notes, version/API-doc alignment, and deployment/rollback notes when implementation exists.
- Observability and performance constraints: log/error identifiers, timeout/export limits, expected volume, Redis/cache strategy, database connection-pool behavior, pagination/aggregation constraints, max page size, total-count strategy, source-side/provider-side execution proof, component-local filter boundary, full-materialize-then-filter absence for global scope, and known capacity risks.
- Known partial/blocked endpoints and accepted assumptions.
- Sample responses for frontend adapter validation, plus SQLite fixture/source-mode notes when backend simulation data is used.

### Frontend Development To Testing Integration

Required handoff bundle:

- `前端功能说明` with pages/modules, provider mapping, filters, interactions, states, permissions, exports, verification evidence, and known limitations.
- Frontend URL when runnable.
- Backend/API base URL used by the frontend.
- Environment/auth/proxy/deployment notes.
- Headless browser screenshot evidence, deterministic baseline diff artifacts / `VDIFF-*` findings, and multimodal `VIS-*` visual findings from runtime QA when visual behavior was verified.
- Known gaps, retained offline/demo sources, and not-yet-verified behaviors.

### Testing Integration To Repair Workflows

Required feedback bundle for every defect:

- Defect ID, severity, likely owner workflow: report design, technical solution, backend, frontend, SSO/security, data, environment, or unclear.
- Expected result, actual result, evidence, reproduction steps, and affected artifact/API/page/component.
- Screenshot path, baseline/current/diff path when available, deterministic `VDIFF-*` finding, and multimodal `VIS-*` finding when the defect is visual/layout related.
- Retest criteria and required input to unblock.
- Status: `open`, `fixed`, `retest`, `closed`, `blocked`, or `accepted`.
- Retest evidence and environment/version for every closed blocker/major/high defect.

### Production Closed-Loop Handoff

Required when the delivery target is real production use, release acceptance, or a production-like pilot:

- Technical architecture: confirmed runtime boundaries, source authority, security/auth assumptions, deployment/config approach, observability, performance/capacity risks, and testing strategy.
- Data service/backend: API doc version, runtime backend URL or deployment target, health/readiness evidence, authoritative source mode, auth/permission behavior, config/env handling, error/log behavior, performance/export limits, and rollback notes.
- Frontend integration: frontend URL/build, backend base URL, provider mode, SSO/auth behavior, retained mock/demo sources if any, browser/runtime QA evidence, and known gaps.
- Testing integration: environment/version/account/data used, executed case counts, evidence paths, defect statuses, retest closure matrix, remaining risks, and final readiness.

If any required production handoff item is unknown, mark production closed loop `partial` or `blocked` and name the owner/source needed.

## Missing Input Handling

When information is missing:

1. Classify severity: `Blocker`, `High`, `Medium`, or `Low`.
2. Decide artifact readiness: `ready`, `partial`, or `blocked`.
3. Record the exact assumption only when safe.
4. Ask one owner/source question for each blocker.
5. Keep the same gap ID and wording across all affected artifacts.

When information is contradictory rather than merely missing, use `entry-input-consistency-gate.md` and `ENTRY-*` IDs. Do not downgrade a real contradiction into a silent assumption.

When the information is available but the proposed structure is unreasonable, use `design-reasonableness-gate.md` and `DESIGN-*` IDs. Do not downgrade a design flaw into a vague missing-input item.

## Child Skill Call Checklist

Top-level workflows must call child skills when their trigger conditions are met, and must state why a relevant child skill was skipped when skipping creates risk.

Use this pattern:

```text
Child skill:
Trigger:
Used / skipped:
Reason:
Output or evidence:
```
