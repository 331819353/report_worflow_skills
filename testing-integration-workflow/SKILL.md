---
name: testing-integration-workflow
description: "运行测试联调/集成验证阶段。用于中文请求包含：测试、联调测试、集成测试、前后端联调验证、测试样例、测试用例、测试结果、验收标准、冒烟测试、URL可用性验证、接口连通性验证、SSO登录测试、鉴权测试、权限测试、前后端数据一致性、页面数据核对、筛选联动测试、交互测试、导出测试、缺陷报告、问题复现、证据截图、阻塞项。标准输入为API文档和前端功能说明，可选运行中的前端URL、后端URL、测试账号和测试数据；输出为测试样例、测试结果、缺陷/阻塞清单和回归标准。不要用于编写生产代码，除非用户明确要求根据缺陷回流修复。"
---

# Testing Integration Workflow

## Overview

Use this as the top-level workflow for the 测试联调 stage. It starts from API文档 and 前端功能说明, designs test cases, then executes what can be executed with the available runtime environment.

If running frontend/backend URLs, accounts, or data are unavailable, still produce 测试样例 and mark runtime 测试结果 as not run or blocked with exact missing inputs.

## Standard Inputs

- API文档: endpoint contracts, request/response schemas, auth, examples, errors, filters, pagination, sorting, and pending items.
- 前端功能说明: pages, modules, controls, filters, interactions, states, exports, permissions, verification notes, and known limitations.

Optional execution inputs:

- Running frontend URL, running backend URL, test account, role/permission, environment name, source version, seed data, and browser/tooling access.

## Reference Map

- Read `../workflow-shared-references/report-delivery-pipeline-contract.md` for cross-workflow routing, readiness values, defect feedback, and handoff requirements.
- Read `../workflow-shared-references/visual-multimodal-browser-check.md` when executing frontend visual/layout testing from a runnable URL.

## Specialty Skills

- Use `$integration-test-case-design` to create test cases from API文档 and 前端功能说明.
- Use `$runtime-url-smoke-test` when frontend/backend URLs are provided.
- Use `$sso-auth-flow-test` to design SSO/auth cases whenever auth is in scope; execute them when credentials/access are available, otherwise mark runtime execution as blocked.
- Use `$frontend-backend-data-consistency-test` for API/display value checks.
- Use `$filter-linkage-completeness-test` for filter options, params, cascades, and component binding.
- Use `$frontend-backend-integration-test-validation` for direct runtime validation when both URLs are running.
- Use `$frontend-runtime-qa-validation` when a runnable frontend URL needs screenshot-based visual/layout validation.
- Use `$test-evidence-defect-reporting` to consolidate evidence, defects, blockers, and conclusion.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$integration-test-case-design` | Any testing stage starts from API docs and frontend function description. | Never skip for a testing workflow. |
| `$runtime-url-smoke-test` | Frontend or backend URLs are provided. | Runtime URLs are absent; mark runtime execution blocked/not run. |
| `$sso-auth-flow-test` | Auth/SSO is in scope. | Auth is explicitly out of scope or disabled. |
| `$frontend-backend-data-consistency-test` | Displayed values must match backend/API data. | UI has no runtime data or data consistency is explicitly out of scope. |
| `$filter-linkage-completeness-test` | Filters, cascades, query params, or component bindings exist. | The page has no dynamic filters. |
| `$frontend-backend-integration-test-validation` | Both frontend and backend URLs are running and end-to-end validation is requested. | Only docs/cases are available. |
| `$frontend-runtime-qa-validation` | Runnable frontend URL is available and visual/layout acceptance is in scope. | No frontend runtime is available; mark visual execution blocked/not run. |
| `$test-evidence-defect-reporting` | Any case is executed, blocked, or fails. | Only a raw test-case design is requested. |

## Workflow

1. Validate input documents.
   Confirm API文档 and 前端功能说明 are present, versioned, and aligned. If either is missing, produce a blocker and list the exact missing document.

2. Build the feature/API matrix.
   Map pages/modules/features to endpoint contracts, request params, response fields, filters, interactions, exports, auth, and edge states.

3. Design test cases.
   Use `$integration-test-case-design`. Output a case matrix covering smoke, SSO/auth, API contract, data consistency, filters, interactions, edge states, permissions, export/download, layout/data visibility, and regression.

4. Decide execution mode.
   If running URLs and accounts are available, execute runtime tests. If not, stop after case design and produce a blocked/not-run result section with missing execution inputs.

5. Execute runtime readiness checks.
   Use `$runtime-url-smoke-test` to verify frontend/backend reachability, environment alignment, assets, console, network, proxy/CORS, and API base URL.

6. Capture screenshots and run multimodal visual checks.
   When a runnable frontend URL is available, use a headless browser or browser automation tool to capture screenshots before judging visual/layout results. Apply `../workflow-shared-references/visual-multimodal-browser-check.md` or `$frontend-runtime-qa-validation` to detect layout offset, excessive blank area, text overlap, graphic overlap, clipping, tiny charts/tables/cards, unreadable labels, blank rendering, broken proportions, stale prototype residue, and scroll issues. Record all `VIS-*` findings as test evidence or defects.

7. Execute auth, data, and filter tests.
   Use `$sso-auth-flow-test`, `$frontend-backend-data-consistency-test`, and `$filter-linkage-completeness-test` as applicable. Capture screenshots, network payloads, API samples, visible values, storage/header evidence, and reproduction steps.

8. Execute integration behavior checks.
   Validate drilldowns, drawers, modals, tabs, route jumps, export/download, refresh, pagination, sorting, loading/empty/error states, and permission behavior against the designed cases.

9. Produce test results.
   Use `$test-evidence-defect-reporting` to summarize executed cases, pass/fail/blocker counts, defects, likely owner side, missing information, and final conclusion.

10. Route defects back to owner workflows.
   For every failure or blocker, assign likely owner workflow from `report-design-workflow`, `technical-solution-workflow`, `backend-development-workflow`, `frontend-development-workflow`, SSO/security, data, or environment. Include retest criteria following `../workflow-shared-references/report-delivery-pipeline-contract.md`.

## Required Output

- 测试样例: case matrix with category, priority, feature, API, preconditions, steps, expected frontend/API result, evidence, and status.
- 测试结果: execution environment, executed cases, pass/fail/blocker counts, screenshot evidence, multimodal visual findings, evidence summary, defects, missing information, and conclusion.
- Defect feedback bundle: defect ID, severity, likely owner workflow, evidence, reproduction steps, retest criteria, and blocker owner question.

## Quality Checklist

- Test cases are derived from both API文档 and 前端功能说明.
- Runtime results never claim pass for cases that were not executable.
- Every failure has expected result, actual result, evidence, and likely owner side.
- Runnable frontend visual/layout testing captures screenshots first and runs multimodal visual recognition before claiming pass.
- `blocker` and `major` visual findings become defects with screenshot path, component/region, owner, and retest criteria.
- SSO/auth, data consistency, filter linkage, interactions, edge states, and export/download are covered when in scope.
- Blockers name the missing URL, account, data, permission, document, or environment dependency.
- Runtime results never claim `ready` when required execution is `not run`; use `partial` or `blocked` with missing inputs.
