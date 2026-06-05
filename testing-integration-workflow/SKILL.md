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

## Reinforced Constraints

- Test basis should include versioned API docs and frontend function description. Missing or conflicting basis artifacts become blockers for affected cases, even if a draft matrix can still be produced.
- Keep case design, automation generation, runtime execution, and acceptance conclusion separate. Generated scripts or smoke checks cannot turn unexecuted cases into passes.
- Automation must preserve case IDs and list unsupported, manual-step, selector, account, data, credential, and environment gaps as `blocked`, `manual-step`, or `not run`.
- Visual/layout judgment requires captured screenshots first; run deterministic baseline diff when baselines exist and record multimodal/browser QA findings when available.
- Every failure or blocker needs evidence, likely owner workflow, reproduction, expected/actual result, and retest criteria.
- Production acceptance requires defect closure evidence: `open -> fixed -> retest -> closed`, or a visible `blocked` state. Missing URL, account, data, env, permission, source evidence, or quality threshold prevents `ready`.

## Workflow

1. Inventory test basis: API docs, frontend function description, permission matrix, data-quality rules, URLs, accounts, env, data, and versions.
2. Run `$quality-gate-validation` when test basis, runtime URLs, data, env/auth notes, screenshots, or source evidence conflict.
3. Design the test matrix with `$integration-test-case-design`.
4. Generate automation with `$automated-test-generation` when requested or useful for repeatable regression.
5. If runtime inputs are missing, mark execution `not run` or `blocked` with exact missing inputs.
6. If runtime is available, run `$runtime-url-smoke-test`, `$sso-auth-flow-test`, `$frontend-backend-data-consistency-test`, `$filter-linkage-completeness-test`, `$permission-matrix-validation`, and `$data-quality-validation` as applicable.
7. Use `$frontend-runtime-qa-validation` for visual/layout/browser checks on runnable frontend URLs.
8. Consolidate results with `$test-evidence-defect-reporting`.
9. Route defects to owner workflow and define retest criteria.

## Required Output

- Test matrix and coverage map.
- Runtime environment and execution status.
- Automation project path/commands when generated.
- Evidence summary: screenshots, network/API samples, console logs, traces, or blocker notes.
- Defect list with severity, owner, reproduction, expected/actual, and retest criteria.
- Retest/production acceptance closure matrix when acceptance or defect repair is in scope.
- Acceptance readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not claim pass for unexecuted cases.
- Every failure needs evidence and likely owner side.
- Missing URL/account/data/env/permission is a blocker, not a pass.
- Production acceptance cannot be `ready` while blocker/high defects are open or fixed without retest evidence.
