---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、自开发前端、Vue3、TypeScript、ECharts、Element Plus、Axios、AntV S2、替换mock、去掉mock、接真实接口、API接入、snapshotDate/dataVersion/loadBatch、响应适配、筛选参数联动、模板筛选复用、指标单位/百分比显示、pt改%、代理/CORS、环境变量、登录态、Haier IAM、启动前端、修复编译/请求/展示错误时触发。"
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
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` |
| Report development UI baseline | `$report-design-system-governance` |
| Runtime/browser QA | `$frontend-runtime-qa-validation` |
| Function handoff docs | `$frontend-function-description-documentation` |
| Performance | `$performance-optimization` |
| Production observability | `$production-observability-feedback` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `references/mock-to-provider-integration.md` or `references/mock-to-http-integration.md` when replacing mock/static data with provider/API calls.
- Read `references/provider-gap-ledger.md` when provider fields, auth, environment, or ownership are incomplete.
- Read `references/report-data-visualization-frontend-implementation.md` when the frontend is a report/BI/dashboard decision interface, or when production readiness depends on first-screen conclusion, chart/table semantics, provider mapping, edge states, freshness/quality display, performance, theme/accessibility, or runtime QA evidence.
- For common enterprise application pages, read `$haier-enterprise-app-ui-design-spec` as the full-process UI baseline before implementation, visual repair, runtime QA handoff, or acceptance notes. This applies to forms, lists, detail pages, tables, navigation, dialogs, empty/error/feedback states, workbench pages, and cross-platform adaptation even when the user did not say "规范".
- For report, dashboard, cockpit, BI, data-screen, business-analysis, detail-query, or topic-analysis frontends, read `$report-design-system-governance` `references/03-report-development-guidelines-index.md` and the smallest relevant report guideline references before styling, data display formatting, state handling, performance handoff, QA, or acceptance.

## Reinforced Constraints

- Resolve `prototypeSourcePath` and `frontendTargetPath` before file edits. Treat upstream prototype source as read-only unless the user explicitly designates it as the frontend target.
- For self-developed frontend work without an authoritative existing stack or user-specified override, use `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2` as the default report frontend stack. Use AntV S2 for pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, and dense comparison grids; use Element Plus for controls/forms/tables/pagination/dialogs; use ECharts for standard charts.
- Treat the default stack as an implementation contract, not a dependency checklist. When a component is mapped as an ECharts standard chart, it must instantiate ECharts or the existing project ECharts wrapper, build a data-driven `option`/`series` from the component view model, call the normal render/update/resize path, and keep ECharts tooltip/legend/emphasis behavior available. Do not satisfy an ECharts chart requirement by importing `echarts` while drawing the chart marks with hand-authored SVG/HTML/CSS/canvas.
- Hand-authored SVG is allowed for logos, icons, small trend arrows, decorative assets, or explicitly approved custom diagrams that ECharts cannot reasonably express. ECharts configured with `renderer: 'svg'` is still valid because ECharts owns the generated SVG; manually encoded bars, lines, pies, gauges, maps, or axes are not valid standard chart implementation.
- Run baseline install/typecheck/lint/test/build when feasible before large edits, and record pre-existing failures so integration work does not hide them.
- Classify provider/source mode, env/proxy/base path, and auth/SSO behavior before replacing mocks or wiring request clients.
- Validate provider/API contracts and design adapters before changing production data paths. Missing provider, field, enum, formula, env, auth, permission, deployment, or testing facts must be visible gaps.
- Before wiring or accepting filter linkage, verify data completeness first: option data, provider/mock/business rows, required fields, default and non-default filter states, empty/no-permission states, and resolver/API branches must exist at the grain required by every affecting filter.
- Global filters, search, permission scope, pagination, sorting, drilldown, refresh, export, rankings, and aggregation must feed provider/API/resolver inputs. Component-internal filters may only operate on an already fetched component dataset.
- For snapshot/latest-period API groups, frontend may read `snapshotDate/latestPeriod/loadBatch/dataVersion` from filters, health, metadata, or snapshot response metadata and pass that context into metrics/trend/table/export requests. The backend remains responsible for using those params plus backend-injected permission/data scope to filter the source/precompute/cache/snapshot query. Frontend may reuse snapshot business payload arrays only when the API contract explicitly labels the payload as a reusable canonical snapshot or bounded component-group payload for those components.
- A filter that should affect a component must be wired to provider/API/resolver params, `filterFields`, `requiredFilters`, or an equivalent mapping. Do not leave it in `ignoredFilters`; selected-state-only filter changes are failed integration.
- When the target is a bundled report template or copied template project, preserve the template's native filter trigger/panel/popover/drawer and `filters[]` contract. Do not add a standalone filter toolbar, persistent filter bar, or extra filter drawer unless the user explicitly asks for template-level redesign.
- Use `$report-component-style-design` for report component fit, KPI/chart/table readability, and metric display semantics. In visible Chinese report UI, rate, completion, variance-rate, YoY, MoM, and change labels display `%`, not `pt`, `p.p.`, or `percentage point`, unless the user explicitly requests that term.
- Classify the frontend surface as common enterprise app, report/dashboard, or mixed before implementation. Apply `$haier-enterprise-app-ui-design-spec` for common app surfaces and `$report-design-system-governance` for report surfaces as baseline references throughout implementation and handoff.
- Production paths cannot depend on unapproved mocks, offline providers, fake timers, generated rows, or demo-only SDKs. Any retained mock/offline source must be named, scoped, and excluded from `ready` production handoff unless explicitly accepted.
- Runtime readiness needs build/start evidence and browser QA evidence. Production-bound frontend work also needs monitoring/feedback/SLA notes through `$production-observability-feedback`.

## Workflow

1. Discover source and target paths. If prototype source is upstream evidence, copy or identify a writable frontend target before editing.
2. Inspect stack, package manager, env files, router, request utilities, stores/composables, mock/static data, and component consumers. If this is self-developed work and no existing stack is authoritative, align implementation to the default `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2` stack.
3. Classify the UI baseline: common enterprise app, report/dashboard, or mixed. Load `$haier-enterprise-app-ui-design-spec` and/or `$report-design-system-governance` according to the surface before implementation decisions.
4. Run baseline install/build/test when feasible and record pre-existing failures.
5. Run `$quality-gate-validation` when source code, API docs, provider samples, env/auth notes, requirements, design baseline, or runtime traces conflict.
6. Validate provider/API contract with `$api-contract-validation`.
7. Design adapters with `$data-transformation-adapter-design` when provider payloads differ from UI view models.
8. Verify env/proxy/base path/build/deploy behavior with `$frontend-env-deployment-verification`.
9. Use `$haier-sso-integration` for Haier account-center login or auth header behavior.
10. Verify data completeness for filters before linkage: data source mode, option sources, row grain, required fields, default/non-default/empty/permission states, and resolver/API branches.
11. Replace or isolate mock data, wire filters/interactions/pagination/sorting/export/refresh to provider inputs, preserve template-native filter surfaces when applicable, and keep component view models stable.
12. Use `$report-component-style-design` when KPI cards, charts, tables, summaries, metric units, Chinese `%` display, overflow, truncation, responsiveness, or visual readability are touched or affected by provider data.
13. Verify chart engine fidelity for every standard chart: dependency/import is not enough; source must contain an ECharts instance/wrapper and data-driven options, and runtime must show ECharts-owned rendering and interaction instead of hand-authored SVG chart marks.
14. Use `$performance-optimization` when data volume, first screen, API latency, chart/table rendering, or export performance matters.
15. Use `$production-observability-feedback` when production-bound delivery needs monitoring, runtime error/performance metrics, data refresh SLA visibility, analytics, alerts, or feedback closure.
16. Run `$frontend-runtime-qa-validation`, then produce `$frontend-function-description-documentation` for handoff.

## Required Output

- Source/target path decision.
- Frontend stack decision and override reason if not using the default self-developed stack.
- Provider mapping and changed data flow.
- Contract validation and adapter notes.
- Env/auth/deployment notes.
- Files changed and verification commands.
- Runtime QA and function description.
- Component style and metric-display checks, including `%` vs `pt/p.p./percentage point` when Chinese rate/change indicators are present.
- UI baseline applied: common enterprise app baseline, report development baseline, or mixed, with loaded reference names and any deliberate exceptions.
- Production observability and retained mock/offline-source notes when production handoff is in scope.
- Data completeness proof before filter binding: option data, row grain, required fields, default/non-default data states, and resolver/API coverage.
- Filter binding proof for non-default filter states, including visible data changes or intentionally invariant component scope.
- Template filter-surface preservation note when the frontend target is a bundled/copy template.
- Chart engine fidelity note for standard charts: ECharts instance/wrapper, data-driven `option`/`series`, resize/update path, tooltip/legend/emphasis behavior, and any explicitly approved non-ECharts custom diagram exceptions.
- Frontend URL or exact blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not edit upstream prototype source unless explicitly designated as target.
- Do not start a self-developed report frontend on an unspecified or ad hoc stack. Use the default stack or document the user/existing-project override before implementation.
- Do not leave production paths on unapproved mocks.
- Do not claim filter integration until data completeness has been checked first. Missing option rows, missing fact/business rows, missing provider fields, single-snapshot mock data, or missing resolver/API branches must be recorded as data gaps before binding is judged.
- Do not fetch broad data then apply global filters/pagination/sorting only in components.
- Do not replace missing metrics/trend/table APIs by deriving them from an undocumented snapshot response payload. Declared canonical/shared snapshot or bounded component-group payload reuse is valid; accidental frontend-side derivation is not.
- Do not treat version/scope display metadata as frontend-side correctness. If a filter or version changes business data, the frontend must send the stable params required by the API contract and verify the backend response reflects that query context.
- Do not treat a filter as integrated when it only changes selected UI state and affected component data remains unchanged. Classify `ignoredFilters` or missing mapping as binding gaps after data completeness is proven; classify single-snapshot mock/provider data or missing non-default branches as data gaps first.
- Do not add a new filter toolbar/bar to a template-based frontend when the template already owns filter invocation; update `filters[]`, native filter UI, and provider bindings instead.
- Do not claim frontend readiness when visible Chinese rate/change/completion/YoY/MoM/variance-rate indicators still use `pt`, `p.p.`, or `percentage point` instead of `%`, unless the user explicitly requested that wording.
- Do not claim frontend readiness when a common enterprise app page or report page ignores its matching UI/design baseline, unless the exception is explicitly scoped and accepted.
- Do not claim frontend readiness when a standard chart merely imports ECharts but renders the visual with hand-authored SVG/HTML/CSS/canvas chart marks. Rework it to ECharts option/series or document an explicit custom-diagram exception before marking ready.
- Do not mark production handoff `ready` without provider/source mode, backend/API base, env/auth behavior, runtime QA evidence, retained mock status, and testing/observability handoff.
- Do not claim handoff readiness without build/runtime evidence or a precise blocker.
