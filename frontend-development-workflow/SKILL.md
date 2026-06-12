---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、自开发前端、Vue3/TypeScript/ECharts/Element Plus/Axios/AntV S2、替换mock、接真实接口、API接入、响应适配、snapshotDate/dataVersion/loadBatch、筛选联动、指标单位/百分比显示、代理/CORS、环境变量、登录态、Haier IAM、启动前端、修复编译/请求/展示错误时触发。"
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
| Environment profile contract | `$environment-profile-contract` |
| Haier SSO | `$haier-sso-integration` |
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` |
| Report design-system baseline | `$report-design-system-governance` |
| Page layout | `$report-visual-layout-design` |
| Component style | `$report-component-style-design` |
| Runtime/browser QA | `$frontend-runtime-qa-validation` |
| Visual regression evidence | `$visual-browser-regression-check` |
| Function handoff docs | `$frontend-function-description-documentation` |
| Code file ledgers | `$code-change-ledger-management` |
| Delivery/version index | `$delivery-version-management` |
| Metric number display | `$metric-number-display-contract` |
| Performance and observability | `$performance-optimization`, `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Mock/provider integration: `references/mock-to-provider-integration.md`
- Mock/http integration: `references/mock-to-http-integration.md`
- Provider gaps: `references/provider-gap-ledger.md`
- Report frontend implementation: `references/report-data-visualization-frontend-implementation.md`
- Detailed implementation/readiness gates: `references/frontend-implementation-gates.md`
- Preflight understanding gate: `$quality-gate-validation` `references/preflight-understanding-gate.md`
- Cross-cutting contracts: load `$vue3-visualization-project-architecture`, `$code-change-ledger-management`, `$metric-number-display-contract`, or `$environment-profile-contract` only when the target architecture, code-change ledger, numeric display, or env profile is in scope.
- Company application UI baseline: `$haier-enterprise-app-ui-design-spec` for Haier/enterprise Web surfaces, including report/dashboard pages.
- Report baseline, numeric precision rules, and anti-AI/report-decision gates: `$report-design-system-governance`

## Workflow

1. Run the Preflight understanding gate before source edits. Name the user goal, writable target, evidence inventory, authority order, affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Resolve `prototypeSourcePath` and `frontendTargetPath`. Treat upstream prototypes as read-only unless explicitly targeted.
3. Inspect stack, package manager, env, router, request utilities, stores/composables, mock/static data, component consumers, and runnable scripts.
4. If the target is a Vue3 data-visualization project or should follow the uploaded sample, load `$vue3-visualization-project-architecture` before file placement and request/env decisions.
5. Classify UI baseline: Haier/enterprise app, report/dashboard, or mixed. For Haier/enterprise Web surfaces, load `$haier-enterprise-app-ui-design-spec` for application tokens/base controls and load `$report-design-system-governance` for report-specific rules when the page is report/dashboard/BI/data-screen.
6. Run install/typecheck/lint/test/build when feasible and record pre-existing failures.
7. Validate provider/API contracts, then design response adapters if payloads differ from UI view models.
8. Verify env/proxy/base path/auth/SSO behavior before wiring requests; use `$environment-profile-contract` when test/production profile separation or production readiness is in scope.
9. Before each source edit, read or create the sidecar code ledger for the scoped file through `$code-change-ledger-management`.
10. Replace or isolate mock data, wire provider calls, numeric format contracts, filters, pagination, sorting, exports, refresh, interactions, and state handling.
11. Use component/layout/design-system skills when visual, metric, chart/table, filter, component placement, state, or design baseline behavior is touched; use the specific chart/table/filter/placement front-door skill when those surfaces are affected.
12. Append code-ledger version entries after edits.
13. Run build/start and `$frontend-runtime-qa-validation`; use `$visual-browser-regression-check` for screenshot regression evidence when required; then produce frontend function docs when handoff is needed.

## Required Output

- Preflight understanding matrix, source/target decision, and stack decision.
- Affected-surface to owning-skill routing when UI/design behavior is touched.
- Provider mapping, adapter notes, env/auth/deployment notes.
- Numeric display/precision proof: formatter ownership, value type, raw/display unit, scale, screen/tooltip/export precision, rounding, null/zero/denominator-zero, and `%` wording when relevant.
- Vue3 sample-architecture alignment when applicable: directory placement, Axios/request pattern, env mode, route/store/component ownership, and build commands.
- Changed files, code-ledger proof, and verification commands.
- Data completeness and control semantics proof for filters/perspectives.
- UI baseline inheritance applied: Haier company UI baseline and report-specific baseline when the target is a Haier/enterprise report surface, plus component/layout/design exceptions.
- Runtime QA result, URL or exact blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not edit upstream prototype source unless it is the explicit frontend target.
- Do not edit frontend source before a `ready-to-start` or bounded `partial-start` Preflight understanding decision identifies the writable target and affected contracts.
- Do not implement or repair a Haier/enterprise report page while applying only report-specific design rules; Haier application tokens, typography, spacing, base controls, state, and brand rules must also be inherited or an explicit exception recorded.
- Do not repair chart/table/filter/component-placement issues through generic component edits alone; load the specific front-door skill before implementation and QA.
- Do not mark changed frontend code ready without sidecar code-ledger read/create evidence and a post-change version entry.
- Do not leave production paths on unapproved mocks, fake timers, generated rows, or demo-only SDKs.
- Do not claim filter integration until option data, business rows, required fields, default/non-default states, and resolver/API branches are proven or recorded as gaps.
- Standard ECharts requirements need ECharts-owned options/series/runtime behavior, not hand-authored chart marks plus an import.
- Report interfaces must preserve metric口径, numeric display contracts, data story, filter/drilldown/export context, trust details, realistic data states, and `%` wording for Chinese rate/change labels unless explicitly overridden.
- Do not mark frontend work ready when governed report metrics are formatted through scattered `toFixed`, `Math.round`, `parseInt`, string slicing, ad hoc `%` concatenation, or component-local decimal assumptions instead of `$metric-number-display-contract`.
- Load `frontend-implementation-gates.md` before changing frontend code or judging production/readiness.
