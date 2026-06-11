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
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `references/report-integration-testing-implementation.md` when validating a report/BI/dashboard data chain, frontend/backend pair, export, permission path, cache path, UAT, release smoke, or defect retest closure.
- Read `$haier-enterprise-app-ui-design-spec` when the test target includes common enterprise application UI surfaces such as forms, lists, detail pages, tables, navigation, dialogs, empty/error/feedback states, or cross-platform adaptation.
- Read `$report-design-system-governance` `references/03-report-development-guidelines-index.md` and the relevant report guideline reference(s) when the test target includes report/dashboard/BI/data-screen/analysis pages.

## Reinforced Constraints

- Test basis should include versioned API docs and frontend function description. Missing or conflicting basis artifacts become blockers for affected cases, even if a draft matrix can still be produced.
- Keep case design, automation generation, runtime execution, and acceptance conclusion separate. Generated scripts or smoke checks cannot turn unexecuted cases into passes.
- Automation must preserve case IDs and list unsupported, manual-step, selector, account, data, credential, and environment gaps as `blocked`, `manual-step`, or `not run`.
- Visual/layout judgment requires captured screenshots first; run deterministic baseline diff when baselines exist and record multimodal/browser QA findings when available.
- Regression scope must include recently discovered delivery defects when relevant: selected-state-only filters, schema-changing perspectives hidden as ordinary filters, non-default perspectives with default labels/schema, single-snapshot mock/provider data, wrong percentage display terms, internal KPI/summary/card text clipping, fixed-height navigation/card DOM clipping, and backend `ApiError` connection-pool leaks.
- Acceptance scope must include the matching UI baseline by page type: common enterprise app baseline for app pages, report development baseline for report/dashboard/analysis pages, or both for mixed pages.
- For filter linkage, test data completeness before UI/component binding: option data, default rows, non-default rows or provider responses, required fields, empty/no-permission states, and resolver/API branches must exist before a filter-binding case can pass.
- For perspective switching, test every non-default business domain/theme/management-object/subject-area view for metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels, not only values.
- For cross-perspective consistency, switch every domain and statistical口径 and verify navigation percentages, overview KPIs, journey cards, and chart summaries use the same data chain; include at least one field-level equality assertion.
- Every failure or blocker needs evidence, likely owner workflow, reproduction, expected/actual result, and retest criteria.
- Production acceptance requires defect closure evidence: `open -> fixed -> retest -> closed`, or a visible `blocked` state. Missing URL, account, data, env, permission, source evidence, or quality threshold prevents `ready`.

## Workflow

1. Inventory test basis: API docs, frontend function description, permission matrix, data-quality rules, URLs, accounts, env, data, and versions.
2. Classify the UI baseline for each test target: common enterprise app, report/dashboard, or mixed, then load the matching baseline references.
3. Run `$quality-gate-validation` when test basis, runtime URLs, data, env/auth notes, screenshots, baseline expectations, or source evidence conflict.
4. Design the test matrix with `$integration-test-case-design`, including explicit cases for control semantics, filter-linked data variation, non-default perspective schema/wording changes, cross-perspective data-chain consistency, metric display text, component internal fit, fixed-height card/navigation height budget plus DOM overflow, backend `ApiError` pool-release behavior when database/upstream pools exist, and matching UI baseline acceptance when those surfaces exist.
5. Generate automation with `$automated-test-generation` when requested or useful for repeatable regression. Prefer generated forbidden-text and value-change assertions for defects that can be expressed by selectors.
6. If runtime inputs are missing, mark execution `not run` or `blocked` with exact missing inputs.
7. If runtime is available, run `$runtime-url-smoke-test`, `$sso-auth-flow-test`, `$data-quality-validation`, `$frontend-backend-data-consistency-test`, `$filter-linkage-completeness-test`, and `$permission-matrix-validation` as applicable. For filter defects, execute or cite data completeness checks before filter-linkage conclusions.
8. Use `$frontend-runtime-qa-validation` for visual/layout/browser checks on runnable frontend URLs.
9. Consolidate results with `$test-evidence-defect-reporting`.
10. Route defects to owner workflow and define retest criteria.

## Required Output

- Test matrix and coverage map.
- Regression coverage for control semantics, filter binding, non-default perspective behavior, cross-perspective consistency, metric display, internal component fit, and fixed-height card/navigation DOM clipping when in scope.
- UI baseline coverage: common enterprise app baseline, report development baseline, or mixed, with acceptance cases or blocker notes.
- Data completeness result before filter-binding result when filters are in scope.
- Runtime environment and execution status.
- Automation project path/commands when generated.
- Evidence summary: screenshots, network/API samples, console logs, traces, or blocker notes.
- Defect list with severity, owner, reproduction, expected/actual, and retest criteria.
- Retest/production acceptance closure matrix when acceptance or defect repair is in scope.
- Acceptance readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not claim pass for unexecuted cases.
- Do not claim filter-linkage pass when data completeness was not checked first or when non-default filter data is missing.
- Do not claim perspective-switch pass when only numeric values changed and metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, or口径 labels were not verified.
- Do not claim cross-perspective consistency pass without at least one field-level assertion tying navigation percentages to overview/journey/chart data under the same active filters and period behavior.
- Do not claim fixed-height navigation/card fit pass without height-budget evidence and DOM overflow assertions at `1920x1080` and `1280x768`.
- Do not claim backend resilience pass when repeated `ApiError`/timeout/exception after connection acquire can exhaust the database/upstream pool or lacks release/close evidence.
- Every failure needs evidence and likely owner side.
- Missing URL/account/data/env/permission is a blocker, not a pass.
- Production acceptance cannot be `ready` while blocker/high defects are open or fixed without retest evidence.
