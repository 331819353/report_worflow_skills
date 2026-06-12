---
name: testing-integration-workflow
description: "运行测试联调/集成验证阶段，设计测试用例并在有URL、账号和数据时执行联调验证。用户提到测试、联调测试、集成测试、验收测试、测试用例、自动化测试、API测试、E2E、截图回归、冒烟测试、SSO/鉴权/权限、数据一致性、筛选联动、缺陷证据、回归闭环时触发。"
---

# Testing Integration Workflow

## Positioning

Use this workflow for testing and integration validation. It can stop at test-case design when runtime inputs are missing, or execute runtime validation when frontend/backend URLs, accounts, permissions, and data are available.

## Child Skills

| Stage | Skill |
| --- | --- |
| Case/matrix design | `$integration-test-case-design` |
| URL smoke | `$runtime-url-smoke-test` |
| SSO/auth testing | `$sso-auth-flow-test` |
| API/display consistency | `$frontend-backend-data-consistency-test` |
| Filter linkage | `$filter-linkage-completeness-test` |
| Permission validation | `$permission-matrix-validation` |
| Data quality | `$data-quality-validation` |
| Automation generation | `$automated-test-generation` |
| Evidence and defects | `$test-evidence-defect-reporting` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |
| Visual regression evidence | `$visual-browser-regression-check` |
| Environment profile contract | `$environment-profile-contract` |
| Metric number display | `$metric-number-display-contract` |
| Delivery pipeline readiness | `$report-delivery-pipeline-governance` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `$quality-gate-validation` `references/preflight-understanding-gate.md` before test-case design, automation generation, runtime execution, defect retest, or acceptance conclusion.
- Read `references/report-integration-testing-implementation.md` when validating a report/BI/dashboard data chain, frontend/backend pair, export, permission path, cache path, UAT, release smoke, or defect retest closure.
- Read `$environment-profile-contract` when test/production profile, runtime URL, API base URL, proxy/CORS, source mode, or mock isolation affects execution.
- Read `$metric-number-display-contract` when cases cover units, rates, percentages, rounding, tooltip/export precision, or frontend/backend numeric consistency.
- Read `$visual-browser-regression-check` when the task specifically requires screenshot regression, baseline diff, component crops, or `VIS-*` findings.
- Read `$report-delivery-pipeline-governance` for release acceptance, retest closure, or cross-stage readiness.
- Read `$haier-enterprise-app-ui-design-spec` when the test target is a Haier/enterprise Web surface, including report/dashboard pages, so color, typography, spacing, base controls, states, brand/logo, and cross-platform baseline are covered.
- Read `$report-design-system-governance` `references/03-report-development-guidelines-index.md` and the relevant report guideline reference(s) when the test target includes report/dashboard/BI/data-screen/analysis pages.

## Reinforced Constraints

- Test basis should include versioned API docs and frontend function description. Missing or conflicting basis artifacts become blockers for affected cases, even if a draft matrix can still be produced.
- Keep case design, automation generation, runtime execution, and acceptance conclusion separate. Generated scripts or smoke checks cannot turn unexecuted cases into passes.
- Automation must preserve case IDs and list unsupported, manual-step, selector, account, data, credential, and environment gaps as `blocked`, `manual-step`, or `not run`.
- Visual/layout judgment requires captured screenshots first; run deterministic baseline diff when baselines exist and record multimodal/browser QA findings when available.
- Regression scope must include recently discovered delivery defects when relevant: selected-state-only filters, schema-changing perspectives hidden as ordinary filters, non-default perspectives with default labels/schema, single-snapshot mock/provider data, wrong percentage display terms, internal KPI/summary/card text clipping, fixed-height navigation/card DOM clipping, and backend `ApiError` connection-pool leaks.
- Acceptance scope must include baseline inheritance by page type: Haier application UI baseline for Haier/enterprise Web pages, report development baseline for report/dashboard/analysis pages, and both for Haier/enterprise report pages.
- For filter linkage, test data completeness before UI/component binding: option data, default rows, non-default rows or provider responses, required fields, empty/no-permission states, and resolver/API branches must exist before a filter-binding case can pass.
- For perspective switching, test every non-default business domain/theme/management-object/subject-area view for metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels, not only values.
- For cross-perspective consistency, switch every domain and statistical口径 and verify navigation percentages, overview KPIs, journey cards, and chart summaries use the same data chain; include at least one field-level equality assertion.
- Every failure or blocker needs evidence, likely owner workflow, reproduction, expected/actual result, and retest criteria.
- Production acceptance requires defect closure evidence: `open -> fixed -> retest -> closed`, or a visible `blocked` state. Missing URL, account, data, env, permission, source evidence, or quality threshold prevents `ready`.

## Workflow

1. Run the Preflight understanding gate before test design, automation, runtime execution, or acceptance. Name test goal, basis artifacts, authority order, affected surfaces, owning validation skills, missing runtime inputs, and start decision.
2. Inventory test basis: API docs, frontend function description, permission matrix, data-quality rules, URLs, accounts, env, data, and versions.
3. Classify the UI baseline for each test target: Haier/enterprise app, report/dashboard, or mixed. Load Haier application baseline for Haier/enterprise Web targets and report baseline for report targets.
4. Run `$quality-gate-validation` when test basis, runtime URLs, data, env/auth notes, screenshots, baseline expectations, or source evidence conflict.
5. Design the test matrix with `$integration-test-case-design`, including explicit cases for control semantics, filter-linked data variation, non-default perspective schema/wording changes, cross-perspective data-chain consistency, metric display text, component internal fit, fixed-height card/navigation height budget plus DOM overflow, backend `ApiError` pool-release behavior when database/upstream pools exist, and matching UI baseline acceptance when those surfaces exist.
6. Generate automation with `$automated-test-generation` when requested or useful for repeatable regression. Prefer generated forbidden-text and value-change assertions for defects that can be expressed by selectors.
7. If runtime inputs are missing, mark execution `not run` or `blocked` with exact missing inputs.
8. If runtime is available, run `$runtime-url-smoke-test`, `$sso-auth-flow-test`, `$data-quality-validation`, `$frontend-backend-data-consistency-test`, `$filter-linkage-completeness-test`, and `$permission-matrix-validation` as applicable. For filter defects, execute or cite data completeness checks before filter-linkage conclusions.
9. Use `$frontend-runtime-qa-validation` for complete visual/layout/browser checks on runnable frontend URLs; use `$visual-browser-regression-check` for focused screenshot diff or visual regression evidence.
10. Consolidate results with `$test-evidence-defect-reporting`.
11. Route defects to owner workflow, define retest criteria, and use `$report-delivery-pipeline-governance` when results affect release or next-stage readiness.

## Required Output

- Preflight understanding matrix, test matrix, and coverage map.
- Regression coverage for control semantics, filter binding, non-default perspective behavior, cross-perspective consistency, metric display, internal component fit, and fixed-height card/navigation DOM clipping when in scope.
- UI baseline coverage: Haier application baseline, report development baseline, or inherited dual baseline, with acceptance cases or blocker notes.
- Data completeness result before filter-binding result when filters are in scope.
- Runtime environment and execution status.
- Automation project path/commands when generated.
- Evidence summary: screenshots, network/API samples, console logs, traces, or blocker notes.
- Defect list with severity, owner, reproduction, expected/actual, and retest criteria.
- Retest/production acceptance closure matrix when acceptance or defect repair is in scope.
- Acceptance readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not claim pass for unexecuted cases.
- Do not design cases, generate automation, execute runtime checks, or give acceptance conclusions before the Preflight understanding gate identifies basis artifacts, affected surfaces, validation owners, and missing runtime inputs.
- Do not claim Haier/enterprise report UI acceptance when only report-specific checks ran and Haier application baseline checks are missing.
- Do not claim filter-linkage pass when data completeness was not checked first or when non-default filter data is missing.
- Do not claim perspective-switch pass when only numeric values changed and metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, or口径 labels were not verified.
- Do not claim cross-perspective consistency pass without at least one field-level assertion tying navigation percentages to overview/journey/chart data under the same active filters and period behavior.
- Do not claim fixed-height navigation/card fit pass without height-budget evidence and DOM overflow assertions at `1920x1080` and `1280x768`.
- Do not claim backend resilience pass when repeated `ApiError`/timeout/exception after connection acquire can exhaust the database/upstream pool or lacks release/close evidence.
- Every failure needs evidence and likely owner side.
- Missing URL/account/data/env/permission is a blocker, not a pass.
- Production acceptance cannot be `ready` while blocker/high defects are open or fixed without retest evidence.
