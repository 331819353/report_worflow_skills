---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、替换mock、去掉mock、接真实接口、API接入、响应适配、筛选参数联动、代理/CORS、环境变量、登录态、Haier IAM、启动前端、修复编译/请求/展示错误时触发。"
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
| Runtime/browser QA | `$frontend-runtime-qa-validation` |
| Function handoff docs | `$frontend-function-description-documentation` |
| Performance | `$performance-optimization` |
| Quality gates | `$quality-gate-validation` |

## Reference Loading

- Read `references/mock-to-provider-integration.md` or `references/mock-to-http-integration.md` when replacing mock/static data with provider/API calls.
- Read `references/provider-gap-ledger.md` when provider fields, auth, environment, or ownership are incomplete.
- Read `references/report-data-visualization-frontend-implementation.md` when the frontend is a report/BI/dashboard decision interface, or when production readiness depends on first-screen conclusion, chart/table semantics, provider mapping, edge states, freshness/quality display, performance, theme/accessibility, or runtime QA evidence.

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
10. Use `$performance-optimization` when data volume, first screen, API latency, chart/table rendering, or export performance matters.
11. Run `$frontend-runtime-qa-validation`, then produce `$frontend-function-description-documentation` for handoff.

## Required Output

- Source/target path decision.
- Provider mapping and changed data flow.
- Contract validation and adapter notes.
- Env/auth/deployment notes.
- Files changed and verification commands.
- Runtime QA and function description.
- Frontend URL or exact blocker.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not edit upstream prototype source unless explicitly designated as target.
- Do not leave production paths on unapproved mocks.
- Do not fetch broad data then apply global filters/pagination/sorting only in components.
- Do not claim handoff readiness without build/runtime evidence or a precise blocker.
