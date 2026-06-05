---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、替换mock、去掉mock、接真实接口、API接入、响应适配、筛选参数联动、指标单位/百分比显示、pt改%、代理/CORS、环境变量、登录态、Haier IAM、启动前端、修复编译/请求/展示错误时触发。"
---

# Frontend Development Workflow

## Positioning

Use this workflow for frontend/provider integration and runnable page delivery after prototype, API docs, or provider evidence exists. It edits the frontend target, not the upstream prototype source, unless the user explicitly designates the prototype as the target.

## Child Skills

| Stage | Skill |
| --- | --- |
| API/provider contract validation | `$api-contract-validation` |
| Response adapter / data shaping | `$data-transformation-adapter-design` |
| Env/proxy/build/deploy verification | `$frontend-env-deployment-verification` |
| Haier SSO | `$haier-sso-integration` |
| Component style and metric display | `$report-component-style-design` |
| Runtime/browser QA | `$frontend-runtime-qa-validation` |
| Function handoff docs | `$frontend-function-description-documentation` |
| Performance | `$performance-optimization` |
| Production observability | `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `references/mock-to-provider-integration.md` or `references/mock-to-http-integration.md` when replacing mock/static data with provider/API calls.
- Read `references/provider-gap-ledger.md` when provider fields, auth, environment, or ownership are incomplete.
- Read `references/report-data-visualization-frontend-implementation.md` when the frontend is a report/BI/dashboard decision interface, or when production readiness depends on first-screen conclusion, chart/table semantics, provider mapping, edge states, freshness/quality display, performance, theme/accessibility, or runtime QA evidence.

## Reinforced Constraints

- Resolve `prototypeSourcePath` and `frontendTargetPath` before file edits. Treat upstream prototype source as read-only unless the user explicitly designates it as the frontend target.
- Run baseline install/typecheck/lint/test/build when feasible before large edits, and record pre-existing failures so integration work does not hide them.
- Classify provider/source mode, env/proxy/base path, and auth/SSO behavior before replacing mocks or wiring request clients.
- Validate provider/API contracts and design adapters before changing production data paths. Missing provider, field, enum, formula, env, auth, permission, deployment, or testing facts must be visible gaps.
- Global filters, search, permission scope, pagination, sorting, drilldown, refresh, export, rankings, and aggregation must feed provider/API/resolver inputs. Component-internal filters may only operate on an already fetched component dataset.
- A filter that should affect a component must be wired to provider/API/resolver params, `filterFields`, `requiredFilters`, or an equivalent mapping. Do not leave it in `ignoredFilters`; selected-state-only filter changes are failed integration.
- Use `$report-component-style-design` for report component fit, KPI/chart/table readability, and metric display semantics. In visible Chinese report UI, rate, completion, variance-rate, YoY, MoM, and change labels display `%`, not `pt`, `p.p.`, or `percentage point`, unless the user explicitly requests that term.
- Production paths cannot depend on unapproved mocks, offline providers, fake timers, generated rows, or demo-only SDKs. Any retained mock/offline source must be named, scoped, and excluded from `ready` production handoff unless explicitly accepted.
- Runtime readiness needs build/start evidence and browser QA evidence. Production-bound frontend work also needs monitoring/feedback/SLA notes through `$production-observability-feedback`.

## Workflow

1. Discover source and target paths. If prototype source is upstream evidence, copy or identify a writable frontend target before editing.
2. Inspect stack, package manager, env files, router, request utilities, stores/composables, mock/static data, and component consumers.
3. Run baseline install/build/test when feasible and record pre-existing failures.
4. Run `$quality-gate-validation` when source code, API docs, provider samples, env/auth notes, requirements, or runtime traces conflict.
5. Validate provider/API contract with `$api-contract-validation`.
6. Design adapters with `$data-transformation-adapter-design` when provider payloads differ from UI view models.
7. Verify env/proxy/base path/build/deploy behavior with `$frontend-env-deployment-verification`.
8. Use `$haier-sso-integration` for Haier account-center login or auth header behavior.
9. Replace or isolate mock data, wire filters/interactions/pagination/sorting/export/refresh to provider inputs, and keep component view models stable.
10. Use `$report-component-style-design` when KPI cards, charts, tables, summaries, metric units, Chinese `%` display, overflow, truncation, responsiveness, or visual readability are touched or affected by provider data.
11. Use `$performance-optimization` when data volume, first screen, API latency, chart/table rendering, or export performance matters.
12. Use `$production-observability-feedback` when production-bound delivery needs monitoring, runtime error/performance metrics, data refresh SLA visibility, analytics, alerts, or feedback closure.
13. Run `$frontend-runtime-qa-validation`, then produce `$frontend-function-description-documentation` for handoff.

## Required Output

- Source/target path decision.
- Provider mapping and changed data flow.
- Contract validation and adapter notes.
- Env/auth/deployment notes.
- Files changed and verification commands.
- Runtime QA and function description.
- Component style and metric-display checks, including `%` vs `pt/p.p./percentage point` when Chinese rate/change indicators are present.
- Production observability and retained mock/offline-source notes when production handoff is in scope.
- Filter binding proof for non-default filter states, including visible data changes or intentionally invariant component scope.
- Frontend URL or exact blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not edit upstream prototype source unless explicitly designated as target.
- Do not leave production paths on unapproved mocks.
- Do not fetch broad data then apply global filters/pagination/sorting only in components.
- Do not treat a filter as integrated when it only changes selected UI state and affected component data remains unchanged because of `ignoredFilters`, missing mapping, or single-snapshot mock data.
- Do not claim frontend readiness when visible Chinese rate/change/completion/YoY/MoM/variance-rate indicators still use `pt`, `p.p.`, or `percentage point` instead of `%`, unless the user explicitly requested that wording.
- Do not mark production handoff `ready` without provider/source mode, backend/API base, env/auth behavior, runtime QA evidence, retained mock status, and testing/observability handoff.
- Do not claim handoff readiness without build/runtime evidence or a precise blocker.
