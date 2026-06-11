# Skill Capability Inventory

Last updated: 2026-06-11

## Current Shape

- Skills: 41
- Reference files: 188
- Agents metadata files: 41
- New skills added in this pass:
  - `frontend-design-improvement-workflow`
  - `report-component-design-spec`

## Capability Map

### Requirement And Planning

- `report-requirement-structure-extraction`: turns rough ideas, notes, screenshots, indicators, and unclear scope into a developable requirement package.
- `report-type-design`: chooses report business type and subtype, including status overview, diagnostic analysis, detail query, evaluation, recap, anomaly monitoring, execution, and reconciliation.
- `change-impact-analysis`: evaluates downstream impact when requirements, metrics, fields, filters, APIs, permissions, or tests change.
- `gap-ledger-management`: records unresolved fields, sources, formulas, permissions, environments, assumptions, blockers, and owner actions.

### Design, Prototype, And UI Standards

- `frontend-design-improvement-workflow`: routes vague requests such as "提高前端设计" into page规范, 组件规范, design-system baseline, common app UI baseline, implementation, and runtime QA.
- `report-design-system-governance`: governs reusable report design systems, tokens, page standards, component standards, states, engineering handoff, and migration.
- `report-visual-layout-design`: owns report page shell, navigation, filter area, toolbar, `8 * N` grid, block sizing, responsive layout, overlap, and page规范.
- `report-component-design-spec`: creates or audits reusable component-family standards for KPI, chart, table, filter, Analysis & Insight, Composite Panel, Pivot/S2, and complex headers.
- `report-component-style-design`: designs, reviews, or repairs a concrete report component or component family with placement, fit, visual, state, and acceptance rules.
- `report-info-component-mapping`: maps business questions to answer atoms, parent blocks, components, datasets, filters, interactions, and binding matrices.
- `report-design-workflow`: orchestrates report/dashboard/prototype work from requirement to runnable URL.
- `report-prototype-template-management`: selects, copies, customizes, validates, and starts bundled Vue/Vite report templates.
- `haier-enterprise-app-ui-design-spec`: provides the Haier common enterprise Web app UI baseline for non-report or mixed app surfaces.

### Technical, Data, API, Backend, Frontend

- `technical-solution-workflow`: produces architecture, ADR, runtime model, data/API/security/observability/roadmap, and downstream handoff.
- `data-model-source-mapping`: creates source/logical/response/view models, metric formulas, lineage, grain, quality rules, and source replacement mappings.
- `data-transformation-adapter-design`: defines source-to-response and response-to-view-model transformation, unit/precision/date/enum/null/default rules.
- `api-inventory-design`: plans backend-friendly API inventory from requirements, models, prototypes, mock data, pages, and source contracts.
- `api-documentation-design`: produces handoff-ready API documentation.
- `api-contract-validation`: verifies API contracts against docs, frontend expectations, routes, mocks, OpenAPI, source samples, and runtime responses.
- `backend-development-workflow`: designs/documents/implements data-service and backend routes, including pools, Redis/cache, permissions, logging, environment, and URL verification.
- `frontend-development-workflow`: implements frontend/provider integration, adapters, filters, env/auth, design baselines, code ledgers, runtime QA, and handoff docs.
- `frontend-env-deployment-verification`: verifies frontend env, API base URL, proxy/CORS, build, preview, deployment, and static asset paths.
- `frontend-function-description-documentation`: produces frontend function/handoff documentation from source, routes, data bindings, interactions, and verification.
- `performance-optimization`: optimizes SQL, API, Redis/cache, pools, pagination, export, frontend loading, charts, and tables.

### Quality, Testing, Delivery, Operations

- `quality-gate-validation`: runs cross-stage readiness gates and assigns `ready`, `partial`, or `blocked`.
- `testing-integration-workflow`: orchestrates integration testing from cases to smoke, SSO, permissions, data consistency, filters, runtime QA, evidence, and retest.
- `integration-test-case-design`: designs integration/acceptance test cases and matrices.
- `automated-test-generation`: generates runnable API/E2E/screenshot regression/CI test projects from test matrices.
- `runtime-url-smoke-test`: checks basic frontend/backend URL reachability, health, assets, proxy/CORS, and network status.
- `frontend-runtime-qa-validation`: runs browser QA, screenshots, DOM overflow checks, console/network checks, interactions, visual defects, and readiness notes.
- `frontend-backend-data-consistency-test`: compares frontend rendered values with API responses field-by-field.
- `filter-linkage-completeness-test`: verifies filter options, defaults, reset, cascade, query params, component binding, export/drilldown/pagination inheritance.
- `sso-auth-flow-test`: validates runtime SSO login, token, auth headers, 401/403, refresh, deep links, logout, and recovery.
- `haier-sso-integration`: implements or reviews Haier IAM/IAMA frontend/backend SSO integration.
- `permission-matrix-validation`: designs and validates role/page/field/action/data/export permissions.
- `data-quality-validation`: designs or executes completeness, uniqueness, timeliness, accuracy, anomaly, duplicate, missing, and cross-source consistency checks.
- `metric-governance-lineage`: manages metric dictionary,口径, versions, lineage, permissions, quality rules, and change audit.
- `delivery-artifact-template-management`: manages reusable templates for API inventory, API docs, data model, permissions, quality, tests, defects, function docs, and version index.
- `delivery-version-management`: manages version links, delivery index, release package lists, and code-file sidecar ledgers.
- `test-evidence-defect-reporting`: produces structured QA evidence, defects, screenshots, reproduction, expected/actual, owners, blockers, and retest criteria.
- `production-observability-feedback`: designs production monitoring, frontend errors, API logs, performance, user feedback, refresh SLA, alerts, and feedback closure.

## Main Workflow Chain

1. Requirement intake: `report-requirement-structure-extraction`
2. Business report shape: `report-type-design`
3. Technical solution: `technical-solution-workflow`
4. Data/API groundwork: `data-model-source-mapping`, `api-inventory-design`, `api-documentation-design`, `api-contract-validation`
5. Prototype and design: `report-design-workflow`, `report-prototype-template-management`, `report-design-system-governance`, `report-visual-layout-design`, `report-component-design-spec`, `report-component-style-design`
6. Backend and frontend implementation: `backend-development-workflow`, `frontend-development-workflow`
7. QA and testing: `testing-integration-workflow`, `frontend-runtime-qa-validation`, `filter-linkage-completeness-test`, `frontend-backend-data-consistency-test`, `sso-auth-flow-test`
8. Delivery and production: `delivery-version-management`, `test-evidence-defect-reporting`, `production-observability-feedback`
9. Cross-stage gates: `quality-gate-validation` can run at any handoff or conflict point.

## Predictable Trigger Rules

- "提高前端设计", "前端设计提升", "页面更专业", "UI优化" -> `frontend-design-improvement-workflow`
- "页面规范", "页面布局", "页面壳", "8*N网格", "首屏层级", "元素重叠" -> `report-visual-layout-design`
- "组件规范", "组件设计规范", "图表规范", "表格规范", "KPI卡规范" -> `report-component-design-spec`
- Single component repair or visual defect -> `report-component-style-design`
- "报表设计系统", "tokens", "风格一致", "可复用报表规范" -> `report-design-system-governance`
- "原型", "可运行URL", "模板原型", "Vue报表原型" -> `report-design-workflow`
- "模板选择", "复制模板", "dashboard.config.ts", "validate-dashboard-contract" -> `report-prototype-template-management`

## Refactor Notes

- Split `report-component-style-design/references/12-internal-placement-algorithms.md` from a 9,338-line monolith into a small index plus six focused placement references: `12a` through `12f`.
- Moved detailed gates out of oversized `SKILL.md` files into references for component style, component mapping, design system, visual layout, frontend implementation, prototype implementation, runtime QA, quality gates, template management, technical solution, and backend workflow.
- Shortened oversized `agents/openai.yaml` default prompts so UI metadata remains a trigger hint, not a duplicate rulebook.
- Added `frontend-design-improvement-workflow` so broad phrases like "提高前端设计" reliably route to page规范 and组件规范.
- Added `report-component-design-spec` so reusable component standards are independent from one-off component repair.
