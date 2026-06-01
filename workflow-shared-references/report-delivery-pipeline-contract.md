# Report Delivery Pipeline Contract

Use this shared contract from every top-level workflow. It keeps the report delivery pipeline consistent across prototype design, technical solution, backend/data service, frontend integration, and testing.

## Stage Routing Matrix

All expected user inputs are Chinese. Prefer the Chinese trigger words below when deciding the top-level workflow.

| 中文意图/触发词 | Workflow | Required Inputs | Primary Outputs | Do Not Use For |
| --- | --- | --- | --- | --- |
| `原型`、`报表原型`、`页面原型`、`仪表盘原型`、`大屏原型`、`原型设计`、`生成原型`、`搭建原型`、`实现原型`、`还原原型`、`截图还原`、`HTML源码还原`、`优化原型`、`修复原型`、`部署原型`、`启动原型`、`返回访问地址`、`本地预览` | `report-design-workflow` | Requirements, metrics, screenshots/HTML/source when available | Prototype source/spec, binding matrix, mock/data/filter/interaction contract, self-check, URL when runnable | Pure theory or production frontend integration without prototype intent |
| `技术方案`、`技术架构`、`接口规划`、`接口清单`、`API清单`、`数据建模`、`数据模型`、`数据模型文件`、`数据源映射`、`字段映射`、`指标口径映射`、`原型数据代码分析`、`mock数据转接口`、`待补充数据模型清单`、`需求转API`、`需求转数据模型` | `technical-solution-workflow` | Requirements, data docs, metric list, prototype data code | `API清单`, `数据模型文件`, `待补充数据模型清单` | API document writing or backend implementation |
| `数据服务`、`后端开发`、`服务端`、`接口文档`、`API文档`、`接口实现`、`接口开发`、`后端接口`、`数据接口`、`接口契约`、`启动后端`、`后端服务`、`Flask服务`、`鉴权中间件`、`SSO后端接入`、`Access-Token校验` | `backend-development-workflow` | `API清单` + `数据模型文件` for docs; API docs/source/env for implementation | `API文档`, backend code when requested, runnable backend URL when possible | Requirement-to-API inventory planning |
| `前端开发`、`前端联调`、`前端接入接口`、`替换mock`、`去掉mock`、`接真实接口`、`接口对接`、`报表页面联调`、`前端数据接入`、`请求封装`、`响应适配`、`筛选参数联动`、`组件联动`、`代理配置`、`CORS`、`SSO前端接入`、`页面运行`、`启动前端`、`修复编译错误`、`修复请求错误` | `frontend-development-workflow` | Frontend/prototype source plus API docs/provider/env/auth evidence | Provider-integrated frontend source, `前端功能说明`, runnable frontend URL when possible | Business report prototype design from scratch |
| `测试`、`联调测试`、`集成测试`、`前后端联调验证`、`测试样例`、`测试用例`、`测试结果`、`验收标准`、`冒烟测试`、`URL可用性验证`、`接口连通性验证`、`SSO登录测试`、`鉴权测试`、`权限测试`、`前后端数据一致性`、`筛选联动测试`、`交互测试`、`导出测试`、`缺陷报告`、`问题复现`、`阻塞项` | `testing-integration-workflow` | `API文档`, `前端功能说明`, optional runtime URLs/accounts/data | `测试样例`, `测试结果`, defects/blockers | Building or repairing source code unless defect follow-up is requested |

## Stage Handoff Requirements

Every stage output must include:

- `Stage`: workflow name.
- `Artifact version/source`: file paths, source URLs, commit, or user-provided document names when known.
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

## Cross-Stage Artifact Contract

### Report Design To Technical Solution

Required handoff bundle when a prototype feeds technical solution:

- Prototype theme, user scenario, report type, and core business questions.
- Component binding matrix: component ID, business question, data source, row grain, required fields, filters, interactions, and empty state.
- Mock/data-source contract: dataset IDs, field names, sample rows, formulas, units, enums, and derived values.
- Filter contract: filter IDs, defaults, option source, field/query mapping, affected components, permission behavior.
- Interaction contract: event names, payload fields, target drawer/modal/route/export/action, stale-selection behavior.
- Visual/layout constraints that affect data shape or export behavior.
- Assumptions and gaps that affect model/API design.

### Technical Solution To Backend Development

Required handoff bundle:

- `API清单` with API ID, page/module, method/path candidate, purpose, trigger, request params, response model, auth, priority, and status.
- `数据模型文件` with source/logical/response models, fields, formulas, joins, ownership, freshness, permission and quality rules.
- `待补充数据模型清单` with `GAP-*` IDs, impact, owner questions, assumptions, and blocked/partial status.
- Consistency result: every API maps to a response model, and every response field maps to a source/formula/enum/gap.

### Backend Development To Frontend Development

Required handoff bundle:

- `API文档` with base URL, auth headers, endpoint details, request/response examples, errors, empty/no-permission behavior, pagination/sorting/filter rules, and pending items.
- Runtime backend URL when implementation exists.
- Auth/SSO contract: header names, token rules, 401/token-invalid response, 403 response, public allowlist.
- Known partial/blocked endpoints and accepted assumptions.
- Sample responses or fixtures for frontend adapter validation.

### Frontend Development To Testing Integration

Required handoff bundle:

- `前端功能说明` with pages/modules, provider mapping, filters, interactions, states, permissions, exports, verification evidence, and known limitations.
- Frontend URL when runnable.
- Backend/API base URL used by the frontend.
- Environment/auth/proxy/deployment notes.
- Headless browser screenshot evidence and multimodal `VIS-*` visual findings from runtime QA when visual behavior was verified.
- Known gaps, retained offline/demo sources, and not-yet-verified behaviors.

### Testing Integration To Repair Workflows

Required feedback bundle for every defect:

- Defect ID, severity, likely owner workflow: report design, technical solution, backend, frontend, SSO/security, data, environment, or unclear.
- Expected result, actual result, evidence, reproduction steps, and affected artifact/API/page/component.
- Screenshot path and multimodal visual finding when the defect is visual/layout related.
- Retest criteria and required input to unblock.
- Status: `open`, `fixed`, `retest`, `blocked`, or `accepted`.

## Missing Input Handling

When information is missing:

1. Classify severity: `Blocker`, `High`, `Medium`, or `Low`.
2. Decide artifact readiness: `ready`, `partial`, or `blocked`.
3. Record the exact assumption only when safe.
4. Ask one owner/source question for each blocker.
5. Keep the same gap ID and wording across all affected artifacts.

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
