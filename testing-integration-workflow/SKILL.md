---
name: testing-integration-workflow
description: "运行测试联调/集成验证阶段，用于联调前后设计用例、执行验证、自动化测试生成、权限/数据质量验收、缺陷证据和回归闭环。用户提到测试、联调测试、集成测试、验收测试、测试用例、自动化测试脚本、API自动化、E2E测试、截图回归、CI执行脚本、测试结果、冒烟测试、URL可用性、接口连通性、SSO/鉴权/权限测试、权限矩阵、多角色验收、数据质量、前后端数据一致性、筛选联动、交互/导出测试、问题复现、证据截图、阻塞项时触发。"
---

# Testing Integration Workflow

## Overview

Use this as the top-level workflow for the 测试联调 stage. It starts from API文档 and 前端功能说明, designs test cases, then executes what can be executed with the available runtime environment.

If running frontend/backend URLs, accounts, or data are unavailable, still produce 测试样例 and mark runtime 测试结果 as not run or blocked with exact missing inputs.

## Standard Inputs

- API文档: endpoint contracts, request/response schemas, auth, examples, errors, filters, pagination, sorting, and pending items.
- 前端功能说明: pages, modules, controls, filters, interactions, states, exports, permissions, verification notes, and known limitations.
- 权限矩阵 and 数据质量规则 when multi-role acceptance or production data trust is in scope.

Optional execution inputs:

- Running frontend URL, running backend URL, test account, role/permission, environment name, source version, seed data, and browser/tooling access.
- Automation target/output inputs: desired test matrix file, generated test project directory, CI platform preference, frontend/backend start commands, screenshot baseline policy, and whether generated scripts should be executed now or only handed off.

## Reference Map

- Read `../workflow-shared-references/report-delivery-pipeline-contract.md` for cross-workflow routing, readiness values, defect feedback, and handoff requirements.
- Read `../workflow-shared-references/entry-input-consistency-gate.md` when API文档、前端功能说明、runtime URLs, test data, env/auth notes, or source evidence may conflict before test design or repair routing.
- Read `../workflow-shared-references/design-reasonableness-gate.md` when API文档、前端功能说明、test cases, runtime behavior, or defect routing may reveal an unreasonable design rather than a simple implementation bug.
- Read `../workflow-shared-references/visual-multimodal-browser-check.md` when executing frontend visual/layout testing from a runnable URL; use deterministic screenshot/baseline diff for repeatable regression and multimodal review for explanatory findings.
- Read `../workflow-shared-references/production-closed-loop-readiness.md` when testing is used as production acceptance or when defects must be repaired and retested before closure.

## Specialty Skills

- Use `$integration-test-case-design` to create test cases from API文档 and 前端功能说明.
- Use `$runtime-url-smoke-test` when frontend/backend URLs are provided.
- Use `$sso-auth-flow-test` to design SSO/auth cases whenever auth is in scope; execute them when credentials/access are available, otherwise mark runtime execution as blocked.
- Use `$frontend-backend-data-consistency-test` for API/display value checks.
- Use `$filter-linkage-completeness-test` for filter options, params, cascades, and component binding.
- Use `$permission-matrix-validation` when roles, menu/page visibility, field visibility, data scope, operations, exports, or multi-role acceptance are in scope.
- Use `$data-quality-validation` when production-like data, refresh SLA, completeness, uniqueness, timeliness, accuracy, outliers, or cross-source consistency must be trusted.
- Use `$frontend-backend-integration-test-validation` for direct runtime validation when both URLs are running.
- Use `$frontend-runtime-qa-validation` when a runnable frontend URL needs screenshot-based visual/layout validation.
- Use `$automated-test-generation` when a test matrix should be converted into runnable API tests, E2E tests, screenshot regression tests, local execution scripts, or CI workflow files.
- Use `$test-evidence-defect-reporting` to consolidate evidence, defects, blockers, and conclusion.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$integration-test-case-design` | Any testing stage starts from API docs and frontend function description. | Never skip for a testing workflow. |
| `$runtime-url-smoke-test` | Frontend or backend URLs are provided. | Runtime URLs are absent; mark runtime execution blocked/not run. |
| `$sso-auth-flow-test` | Auth/SSO is in scope. | Auth is explicitly out of scope or disabled. |
| `$frontend-backend-data-consistency-test` | Displayed values must match backend/API data. | UI has no runtime data or data consistency is explicitly out of scope. |
| `$filter-linkage-completeness-test` | Filters, cascades, query params, or component bindings exist. | The page has no dynamic filters. |
| `$permission-matrix-validation` | Multi-role, data-scope, field/action/export permission, or permission acceptance is in scope. | The product explicitly has one role and no permission-sensitive data/actions. |
| `$data-quality-validation` | Real or production-like data trust, refresh SLA, duplicates, missing values, outliers, drift, or cross-source reconciliation is in scope. | Only static mock UI testing is requested and data trust is out of scope. |
| `$frontend-backend-integration-test-validation` | Both frontend and backend URLs are running and end-to-end validation is requested. | Only docs/cases are available. |
| `$frontend-runtime-qa-validation` | Runnable frontend URL is available and visual/layout acceptance is in scope. | No frontend runtime is available; mark visual execution blocked/not run. |
| `$automated-test-generation` | The user asks to generate/execute automation scripts, CI scripts, API/E2E/screenshot regression tests, or convert the test matrix into runnable tests. | The task is only manual case design or manual execution reporting. |
| `$test-evidence-defect-reporting` | Any case is executed, blocked, or fails. | Only a raw test-case design is requested. |

## Workflow

1. Validate input documents.
   Confirm API文档 and 前端功能说明 are present, versioned, and aligned. If either is missing, produce a blocker and list the exact missing document.

   Run the entry consistency gate when API文档, 前端功能说明, runtime URLs, test data, env/auth notes, screenshots, or source evidence disagree. Do not finalize pass/fail cases around one disputed behavior or route a repair to the wrong owner while `P0`/`P1` `ENTRY-*` conflicts remain unresolved; mark affected cases `partial` or `blocked`, continue unaffected cases, and ask for the exact confirmation needed.

   Run the design reasonableness gate when the test basis appears complete but the workflow, API/UI contract, filter behavior, interaction, permission, layout, or acceptance rule is unreasonable. Route `DESIGN-*` findings back to the owning design/API/frontend/backend workflow instead of treating them as ordinary test-data gaps.

2. Build the feature/API matrix.
   Map pages/modules/features to endpoint contracts, request params, response fields, filters, interactions, exports, auth, and edge states.

3. Design test cases.
   Use `$integration-test-case-design`. Output a case matrix covering smoke, SSO/auth, API contract, data consistency, filters, interactions, edge states, permissions, export/download, layout/data visibility, and regression.

4. Generate automation scripts when requested or useful for repeatable regression.
   Use `$automated-test-generation` after the test matrix is available. Generate a runnable test project containing API tests, E2E browser tests, screenshot regression tests, local execution scripts, and CI workflow files. Preserve case IDs so automated results can be traced back to the matrix.

   If the user asks for "全流程自动化测试", first generate the automation project, then execute the generated scripts only when runtime URL/account/auth/data and local tooling are available. If selectors, test data, credentials, or running services are missing, still produce the scripts and mark affected automated cases as `blocked`, `manual-step`, or `not run` with exact missing inputs.

5. Decide execution mode.
   If running URLs and accounts are available, execute runtime tests. If not, stop after case design and produce a blocked/not-run result section with missing execution inputs.

6. Execute runtime readiness checks.
   Use `$runtime-url-smoke-test` to verify frontend/backend reachability, environment alignment, assets, console, network, proxy/CORS, and API base URL.

7. Capture screenshots, run deterministic diff, and run multimodal visual checks.
   When a runnable frontend URL is available, use a headless browser or browser automation tool to capture screenshots before judging visual/layout results. Apply `../workflow-shared-references/visual-multimodal-browser-check.md` or `$frontend-runtime-qa-validation` to run deterministic baseline diff when baselines exist, and to detect layout offset, excessive blank area, text overlap, graphic overlap, clipping, tiny charts/tables/cards, unreadable labels, blank rendering, broken proportions, stale prototype residue, and scroll issues through multimodal review when available. Record all `VDIFF-*` and `VIS-*` findings as test evidence or defects.

8. Execute auth, data, and filter tests.
   Use `$sso-auth-flow-test`, `$frontend-backend-data-consistency-test`, and `$filter-linkage-completeness-test` as applicable. Capture screenshots, network payloads, API samples, visible values, storage/header evidence, and reproduction steps.

9. Execute permission and data-quality checks when in scope.
   Use `$permission-matrix-validation` for role/page/field/action/data-scope/export behavior. Use `$data-quality-validation` for completeness, uniqueness, timeliness, accuracy, abnormal values,口径漂移, and cross-source consistency. Treat missing accounts, unclear role scope, absent quality thresholds, or unavailable source evidence as blockers rather than passing the case.

10. Execute generated automation when requested and feasible.
   Run generated API/E2E/visual scripts from `$automated-test-generation` when the generated project exists and environment variables are available. Treat generated test output, Playwright report, traces, screenshots, API response evidence, and CI logs as runtime evidence. Do not override manual/multimodal findings with generated pass results if the generated case only covers a smoke-level assertion.

11. Execute integration behavior checks.
   Validate drilldowns, drawers, modals, tabs, route jumps, export/download, refresh, pagination, sorting, loading/empty/error states, and permission behavior against the designed cases.

12. Produce test results.
   Use `$test-evidence-defect-reporting` to summarize executed cases, pass/fail/blocker counts, defects, likely owner side, missing information, and final conclusion.

13. Route defects back to owner workflows.
   For every failure or blocker, assign likely owner workflow from `report-design-workflow`, `technical-solution-workflow`, `backend-development-workflow`, `frontend-development-workflow`, SSO/security, data, or environment. Include retest criteria following `../workflow-shared-references/report-delivery-pipeline-contract.md`.

14. Maintain defect repair and retest closure.
   Apply `../workflow-shared-references/production-closed-loop-readiness.md` for production-bound testing. Track each blocker/major/high defect as `open -> fixed -> retest -> closed` or `blocked`, and do not mark acceptance `ready` until retest evidence confirms the defect no longer reproduces in the stated environment/version. If retest cannot run, the result is `partial` or `blocked`, not passed.

## Required Output

- 测试样例: case matrix with category, priority, feature, API, preconditions, steps, expected frontend/API result, evidence, and status.
- 自动化测试脚本包 when requested: generated project path, source matrix path, generated API/E2E/visual/CI files, environment variables, local commands, CI setup notes, unsupported/manual-step cases, and screenshot baseline update policy.
- 权限与数据质量验收结果 when in scope: role matrix evidence, data-quality rule execution, blockers, and owner-side classification.
- 测试结果: execution environment, entry consistency status, design reasonableness status, executed cases, pass/fail/blocker counts, screenshot evidence, deterministic baseline diff artifacts, multimodal visual findings, evidence summary, defects, missing information, and conclusion.
- Defect feedback bundle: defect ID, severity, likely owner workflow, evidence, reproduction steps, retest criteria, and blocker owner question.
- Production acceptance / retest closure matrix when applicable: environment, frontend/backend versions, open/fixed/retest/closed/blocked defect counts, retest evidence, remaining risks, and readiness value.

## Quality Checklist

- Test cases are derived from both API文档 and 前端功能说明.
- Entry conflicts between API文档、前端功能说明、runtime URLs, test data, env/auth notes, screenshots, or source evidence are resolved or listed with `ENTRY-*` IDs before pass/fail conclusions are finalized.
- Design reasonableness issues are listed with `DESIGN-*` IDs and routed to the owner workflow before final acceptance.
- Runtime results never claim pass for cases that were not executable.
- Every failure has expected result, actual result, evidence, and likely owner side.
- Runnable frontend visual/layout testing captures screenshots first and runs deterministic baseline diff when baselines exist before claiming deterministic visual regression pass; multimodal visual recognition is recorded as pass or not run.
- `blocker` and `major` `VDIFF-*` or `VIS-*` findings become defects with screenshot path, diff path when available, component/region, owner, and retest criteria.
- SSO/auth, data consistency, filter linkage, interactions, edge states, and export/download are covered when in scope.
- Permission testing distinguishes frontend hiding from backend/API filtering and export contents.
- Data-quality testing distinguishes API availability from data trust.
- Automation generation never hides manual gaps: selector gaps, account gaps, missing seed data, absent screenshot baselines, and natural-language steps are listed as blocked/manual/not run.
- Generated automation results keep original case IDs and separate API, E2E, visual, and CI execution evidence.
- Blockers name the missing URL, account, data, permission, document, or environment dependency.
- Runtime results never claim `ready` when required execution is `not run`; use `partial` or `blocked` with missing inputs.
- Production acceptance never claims `ready` while blocker/major/high defects are still `open`, `fixed` without retest evidence, or `blocked` by missing environment/account/data.
