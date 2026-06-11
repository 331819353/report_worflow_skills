---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、自开发前端、Vue3、TypeScript、ECharts、Element Plus、Axios、AntV S2、替换mock、去掉mock、接真实接口、API接入、snapshotDate/dataVersion/loadBatch、响应适配、筛选参数联动、模板筛选复用、指标单位/百分比显示、pt改%、代理/CORS、环境变量、登录态、Haier IAM、启动前端、修复编译/请求/展示错误时触发。"
---

# Frontend Development Workflow

## Positioning

Use this workflow for frontend/provider integration and runnable page delivery after a prototype, API doc, provider contract, or existing frontend target is available. It edits the frontend target, not upstream prototype evidence, unless the user explicitly designates the prototype as the target.

If the request is vague design improvement rather than implementation, route first through `$frontend-design-improvement-workflow`.

## Child Skills

| Stage | Skill |
| --- | --- |
| Design-improvement routing | `$frontend-design-improvement-workflow` |
| Vue3 visualization sample architecture | `$vue3-visualization-project-architecture` |
| API/provider contract validation | `$api-contract-validation` |
| Response adapter / data shaping | `$data-transformation-adapter-design` |
| Env/proxy/build/deploy verification | `$frontend-env-deployment-verification` |
| Haier SSO | `$haier-sso-integration` |
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` |
| Report design-system baseline | `$report-design-system-governance` |
| Page layout | `$report-visual-layout-design` |
| Component style | `$report-component-style-design` |
| Runtime/browser QA | `$frontend-runtime-qa-validation` |
| Function handoff docs | `$frontend-function-description-documentation` |
| Delivery/code versioning | `$delivery-version-management` |
| Performance and observability | `$performance-optimization`, `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Mock/provider integration: `references/mock-to-provider-integration.md`
- Mock/http integration: `references/mock-to-http-integration.md`
- Provider gaps: `references/provider-gap-ledger.md`
- Report frontend implementation: `references/report-data-visualization-frontend-implementation.md`
- Detailed implementation/readiness gates: `references/frontend-implementation-gates.md`
- Vue3 visualization sample architecture: `$vue3-visualization-project-architecture` when the target should follow the uploaded Vue3 + TypeScript + Vite + Pinia + Vue Router + Element Plus + ECharts + Axios project structure.
- Code-file ledger: `$delivery-version-management` `references/code-file-change-ledger.md`
- Common app baseline: `$haier-enterprise-app-ui-design-spec`
- Report baseline, numeric precision rules, and anti-AI/report-decision gates: `$report-design-system-governance`

## Workflow

1. Resolve `prototypeSourcePath` and `frontendTargetPath`. Treat upstream prototypes as read-only unless explicitly targeted.
2. Inspect stack, package manager, env, router, request utilities, stores/composables, mock/static data, component consumers, and runnable scripts.
3. If the target is a Vue3 data-visualization project or should follow the uploaded sample, load `$vue3-visualization-project-architecture` before file placement and request/env decisions.
4. Classify UI baseline: common enterprise app, report/dashboard, or mixed. Load the matching baseline before implementation decisions.
5. Run install/typecheck/lint/test/build when feasible and record pre-existing failures.
6. Validate provider/API contracts, then design response adapters if payloads differ from UI view models.
7. Verify env/proxy/base path/auth/SSO behavior before wiring requests.
8. Before each source edit, read or create the sidecar code ledger for the scoped file.
9. Replace or isolate mock data, wire provider calls, numeric format contracts, filters, pagination, sorting, exports, refresh, interactions, and state handling.
10. Use component/layout/design-system skills when visual, metric, chart/table, state, or design baseline behavior is touched.
11. Append code-ledger version entries after edits.
12. Run build/start and `$frontend-runtime-qa-validation`; then produce frontend function docs when handoff is needed.

## Required Output

- Source/target decision and stack decision.
- Provider mapping, adapter notes, env/auth/deployment notes.
- Numeric display/precision proof: formatter ownership, value type, raw/display unit, scale, screen/tooltip/export precision, rounding, null/zero/denominator-zero, and `%` wording when relevant.
- Vue3 sample-architecture alignment when applicable: directory placement, Axios/request pattern, env mode, route/store/component ownership, and build commands.
- Changed files, code-ledger proof, and verification commands.
- Data completeness and control semantics proof for filters/perspectives.
- UI baseline applied and component/layout/design exceptions.
- Runtime QA result, URL or exact blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not edit upstream prototype source unless it is the explicit frontend target.
- Do not mark changed frontend code ready without sidecar code-ledger read/create evidence and a post-change version entry.
- Do not leave production paths on unapproved mocks, fake timers, generated rows, or demo-only SDKs.
- Do not claim filter integration until option data, business rows, required fields, default/non-default states, and resolver/API branches are proven or recorded as gaps.
- Standard ECharts requirements need ECharts-owned options/series/runtime behavior, not hand-authored chart marks plus an import.
- Report interfaces must preserve metric口径, numeric display contracts, data story, filter/drilldown/export context, trust details, realistic data states, and `%` wording for Chinese rate/change labels unless explicitly overridden.
- Do not mark frontend work ready when governed report metrics are formatted through scattered `toFixed`, `Math.round`, `parseInt`, string slicing, ad hoc `%` concatenation, or component-local decimal assumptions instead of a central formatter/metadata contract.
- Load `frontend-implementation-gates.md` before changing frontend code or judging production/readiness.
