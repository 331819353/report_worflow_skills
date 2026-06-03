---
name: frontend-development-workflow
description: "运行前端开发/前端联调阶段，用于把原型或前端源码接入真实数据并交付可运行页面。用户提到前端、页面开发、可视化开发、报表页面、仪表盘、大屏、替换mock、去掉mock、接真实接口、API接入、接口对接、请求封装、响应适配、筛选参数联动、组件联动、代理/CORS、环境变量、登录态、SSO前端接入、启动前端、修复编译/请求/展示错误时触发。"
---

# Frontend Development Workflow

## Positioning

Use this skill as the top-level workflow for the 数据可视化/frontend stage after prototype design, technical solution, or provider-contract preparation. The normal input is a runnable or nearly runnable frontend/prototype project plus enough provider evidence to decide how data should reach the UI.

Standard stage contract:

- Inputs: 原型源码 or 前端源码, plus provider evidence. API文档 is common but not mandatory.
- Outputs: provider-integrated 前端源码 and 前端功能说明.
- Production paths should use the intended runtime provider unless the user explicitly requests offline/demo mode.

## Reference Map

- Read `../workflow-shared-references/report-delivery-pipeline-contract.md` for cross-workflow routing, readiness values, and handoff requirements.
- Read `../workflow-shared-references/entry-input-consistency-gate.md` when frontend/prototype source, requirements, HTML/source samples, API docs, provider samples, env/auth notes, or runtime traces may conflict.
- Read `../workflow-shared-references/design-reasonableness-gate.md` when UI/data/provider/interaction/layout decisions may be internally consistent but unreasonable for the business question or handoff.
- Read `../workflow-shared-references/visual-multimodal-browser-check.md` before visual QA pass/fail judgment for any runnable frontend/prototype; use deterministic screenshot/baseline diff for repeatable regression and multimodal review for explanatory findings.
- Read `../workflow-shared-references/production-closed-loop-readiness.md` when frontend integration is part of production acceptance or a production-like pilot.
- Read `references/mock-to-provider-integration.md` for generic mock/static-to-provider integration.
- Read `references/mock-to-http-integration.md` only when the chosen provider is REST/BFF HTTP.
- Read `references/provider-gap-ledger.md` whenever provider, field, env, auth, permission, or test evidence is missing.

Use the frontend specialty skills as guardrails inside this workflow:

- Use `$frontend-api-contract-validation` before and after replacing mock/static data with runtime provider data.
- Use `$frontend-response-adapter-design` when provider payloads differ from current mock/component view models.
- Use `$frontend-env-deployment-verification` before runtime wiring when env, provider URL, SDK init, proxy, route base, build, deploy, or final URL behavior matters.
- Use `$haier-iam-frontend-script-sso` when Haier account-center IAM/SSO is required. That child skill chooses the correct frontend SSO path, including script tag, package-based SDK, iHaier/Feishu container, micro-frontend/iframe/webview, or retrofit.
- Use `$frontend-runtime-qa-validation` for browser/runtime QA after provider integration, environment changes, visual fixes, or before final handoff.
- Use `$frontend-function-description-documentation` to produce 前端功能说明 after runtime verification.

## Child Skill Call Checklist

| Child skill | Must call when | May skip when |
| --- | --- | --- |
| `$frontend-api-contract-validation` | Runtime provider replaces mock/static data or API fields affect UI state. | Pure copy/style fix with no data contract change. |
| `$frontend-response-adapter-design` | Provider payload shape differs from component view model. | Provider already matches existing typed UI model. |
| `$frontend-env-deployment-verification` | Env, proxy, route base, SDK init, auth, build, deployment, or URL behavior can affect runtime. | Pure local component-only change with no runtime provider. |
| `$haier-iam-frontend-script-sso` | Haier IAM/SSO is required or auth behavior is unclear. | Auth is explicitly disabled or handled by a non-Haier already-confirmed mechanism. |
| `$frontend-runtime-qa-validation` | Provider integration, env/auth change, visual fix, or handoff URL is in scope. | Static documentation-only task. |
| `$frontend-function-description-documentation` | Handoff to testing/integration is needed. | The user asks only for a narrow code patch and no test handoff. |

## Default Flow

1. Discover the project context.
   Inspect source files, package files, lockfiles, env files, build config, router, state management, request/client utilities, data-source registries, mock/static data, and component data usage. Prefer `rg` and targeted reads. Follow the existing stack and structure before introducing new patterns.

   Run the entry input consistency gate when source code, HTML/sample-derived UI, API docs/provider evidence, env/auth notes, mock/static data, or requirements disagree. Unresolved `P0`/`P1` `ENTRY-*` findings must be confirmed by the user before replacing mock data, changing adapters, changing auth/env behavior, or repairing affected UI logic.

   Run the design reasonableness gate when a source-to-provider replacement, adapter, filter behavior, interaction, retained mock, or visual repair could make the page less useful even if it compiles. Repair or record `DESIGN-*` findings before wiring affected behavior.

2. Run a baseline check before large edits.
   Detect the package manager from lockfiles and package scripts, install dependencies if needed, then run available typecheck, lint, test, and build commands. Start the dev server when feasible. Record baseline failures so later work does not hide pre-existing project problems.

3. Inventory current data paths.
   Locate mock/static data, fixture JSON, hard-coded arrays, localStorage/sessionStorage seeds, artificial `Promise.resolve` calls, fake timers, existing HTTP/GraphQL/SDK calls, generated data modules, realtime subscriptions, and dashboard data-source configs. For each source, identify consumers, fields, filters, pagination, sorting, drilldowns, exports, charts, tables, and interaction payloads.

4. Classify provider evidence.
   Decide whether each target data path should use REST/BFF HTTP, GraphQL, SDK/client package, static/generated files, local fixture mode, realtime feed, data-source registry, or an explicitly retained offline/demo source. Use `references/provider-gap-ledger.md` for anything missing or ambiguous.

5. Decide env and auth before runtime wiring.
   Identify provider base URLs, SDK keys, app/client IDs, auth headers, SSO requirements, proxy needs, route base, asset base, and deployment mode before editing components. Use `$frontend-env-deployment-verification` and SSO skills early enough that request/client code is not built around the wrong assumptions.

6. Create a provider mapping and validate the contract.
   Map every changed mock/static source to a provider call, file, query, SDK method, subscription, or retained offline mode. Define UI state to provider inputs, provider payload to UI view model, empty/error/auth behavior, pagination, sorting, refresh, export, and stale-selection behavior. Use `$frontend-api-contract-validation` before code changes.

7. Add or reuse the data access layer.
   Prefer the project's existing request client, GraphQL client, SDK wrapper, store, composable, data-source resolver, parser, or subscription layer. If none exists, add the smallest project-native abstraction that handles env config, auth/client initialization, normalized errors, and typed provider functions.

8. Replace or isolate mock data.
   Update pages, composables, stores, widgets, and data-source configs to call the intended provider. Preserve layout and interactions. Keep adapters close to the provider boundary so UI components receive stable view models. Remove stale mock imports from production paths; keep offline/demo mocks only when explicitly required.

9. Wire interaction and data lifecycle behavior.
   Ensure filters, search, date ranges, organization selectors, pagination, sorting, tabs, drilldowns, refresh, export/download, and linked charts pass correct inputs. Handle loading, empty, failed, retry, partial, no-permission, token-invalid, stale selection, rapid filter changes, request cancellation or sequence guards, cache invalidation, and realtime unsubscribe/cleanup when applicable.

10. Audit functions, copy, and visual behavior.
    Traverse the updated app page by page and component by component. Check controls, route jumps, tabs, drawers, modals, table operations, chart clicks, export, refresh, and edge states. Clean user-facing copy left from the prototype, including titles, menus, breadcrumbs, labels, button text, placeholders, tooltips, document title, download names, and error messages containing `原型`, `mock`, `demo`, `示例`, placeholder names, or stale descriptions. Use `$frontend-runtime-qa-validation` for the structured browser pass. For visual QA, first capture headless browser screenshots, run deterministic baseline diff when a baseline exists, then run multimodal visual anomaly recognition when available. Route `VDIFF-*` and `VIS-*` findings back into frontend repair or final QA notes.

11. Verify build, preview, and deployment behavior.
    Run validation commands, build, start dev or preview server, and open the target page in a browser when visual frontend behavior is involved. Repair compile errors, runtime exceptions, provider failures, proxy mistakes, CORS symptoms, malformed adapters, missing fields, broken interactions, stale copy, and UI regressions until runnable or blocked by a concrete external dependency.

12. Produce frontend function description.
    Use `$frontend-function-description-documentation` to document pages, modules, provider mapping, filters, interactions, states, permissions, exports, verification evidence, known limitations, and unresolved gaps. This document is the standard input for testing/integration handoff.

13. Return a verified URL.
    For local handoff, start the frontend on an available port and return the verified local URL. If startup is blocked, state the exact command, error, attempted fixes, and remaining external blocker.

14. Check production closed-loop readiness when applicable.
    For production-bound frontend integration, apply `../workflow-shared-references/production-closed-loop-readiness.md`. Record frontend URL/build, backend base URL, provider/source mode, auth behavior, env/config, runtime QA evidence, retained offline/demo sources, testing handoff, and open blockers. Do not mark the frontend handoff `ready` when production paths still depend on unapproved mocks or unverified provider/auth/runtime behavior.

## Implementation Defaults

- Use the repository's package manager and framework conventions. Do not convert stacks.
- Keep provider contracts typed where the project uses TypeScript.
- For Vue report/prototype pages, preserve or introduce Element Plus as the default UI control layer for filters, forms, buttons, tabs, tags, popovers, dialogs, drawers, pagination, and simple tables unless the existing project design system explicitly supersedes it.
- For Chinese report UI, render rate/change/completion fields with `%` instead of `pt`, `p.p.`, or `percentage point` labels unless explicitly required; change-rate and variance-rate indicators use positive-red-up and negative-green-down icon+text semantics.
- Preserve global UI tokens when implementing HTML-replica or custom layouts: copied structure may remain, but palette, typography, spacing, radius, shadows, semantic colors, and control states should not become one-off local styles.
- Prefer service/composable/store/client/data-source integration over provider calls scattered inside templates.
- Keep mock fallback only when the user requests offline/demo mode or when a documented external blocker prevents runtime integration.
- Normalize provider payload fields into the existing UI data shape instead of rewriting the whole page around provider naming.
- Avoid broad visual redesign while replacing data sources unless broken states require small UI fixes.
- Keep secrets, tokens, cookies, SDK credentials, and private endpoints out of code and logs.
- Preserve existing route paths, component names, and user-facing behavior unless the provider contract requires a change.

## Required Work Product

Maintain these notes in the task response or project docs when useful:

- `Input Files`: frontend/prototype files, provider docs/samples, env/auth/config files, and their roles.
- `Entry Consistency Audit`: status, checked artifacts, `ENTRY-*` conflicts, user-confirmed decisions, and affected frontend/API/auth/data contracts when mixed inputs were checked.
- `Design Reasonableness Audit`: status, checked dimensions, `DESIGN-*` findings, repairs, accepted limitations, and affected frontend/API/auth/data contracts.
- `Current Data Inventory`: mock/static/runtime source, consumers, fields, and affected interactions.
- `Provider Classification`: REST/BFF, GraphQL, SDK, static file, generated data, realtime, data-source registry, retained offline mode, or blocker.
- `Frontend Missing Info`: unresolved provider, field, enum, formula, env, auth, permission, deployment, or testing gaps.
- `Contract Validation`: provider coverage, input mapping, response field comparison, adapter/blocker decisions, and edge-state behavior.
- `Provider Mapping`: source to provider call/query/file/subscription, input params, adapter, auth/client setup, and verification case.
- `Response Adapters`: provider payload to UI view model mapping, enum/unit/date/null/default behavior, lifecycle behavior, and sample verification.
- `Changed Data Flow`: files changed and how UI state now reaches providers.
- `Runtime QA`: route/page/component checks, interaction cases, provider evidence, headless screenshot paths, deterministic baseline diff status/artifacts, multimodal visual findings, visual/layout checks, stale copy removed, and remaining questions.
- `Frontend Function Description`: pages, modules, provider mapping, filters, interactions, states, permissions, exports, verification scope, and limitations.
- `Environment And Deployment`: env variables, provider config, proxy, base path, build/preview/deploy URL, and external blockers.
- `Production Closed Loop`: frontend URL/build, backend base URL, provider/source mode, auth behavior, runtime QA evidence, retained offline/demo source status, testing handoff, readiness, and blockers when applicable.
- `Stage Handoff`: readiness, frontend URL, backend/API base used, auth/SSO contract, retained offline/demo sources, testing blockers, and next-stage owner questions.

## Verification Checklist

- Every target mock/static source is either replaced by the intended provider or intentionally retained for offline/demo mode.
- Entry-material contradictions across requirements, HTML/sample UI, frontend source, API docs/provider samples, env/auth notes, mocks, or runtime traces are resolved or keep affected work `partial`/`blocked`; no `P0`/`P1` conflict is silently repaired.
- Frontend design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings do not get hidden behind adapter code, retained mocks, or visual polish.
- Every implemented runtime provider is traceable to docs, source code, schema, SDK types, sample files, runtime traces, or a documented assumption.
- Every replaced source has field-level contract validation against the UI/display shape.
- Missing provider, field, auth, env, permission, and deployment information is captured in a visible gap ledger.
- Response adapters keep existing component view models stable or document a deliberate narrow refactor.
- Filters, pagination, sorting, refresh, drilldown, export, and route parameters feed provider inputs correctly.
- Rapid filter changes, stale responses, cache invalidation, retries, and realtime cleanup are handled where applicable.
- Each page/component has been checked for broken controls, dead routes, invalid interactions, and edge states that stopped working after provider integration.
- User-facing text no longer exposes prototype-only wording unless the requirement explicitly keeps it.
- Loading, empty, error, partial, no-permission, token-invalid, and retry states behave without layout breakage.
- Rate/change indicators use `%` in visible Chinese UI and follow positive-red-up / negative-green-down SVG/icon semantics.
- HTML-replica and custom pages preserve global UI token consistency instead of leaking copied inline colors or one-off component surfaces.
- Env, proxy, provider config, auth, base path, static assets, route mode, build output, and preview/deploy URL behavior are verified or have a precise external blocker.
- 前端功能说明 exists or the final response includes the same page/module/provider/filter/interaction/testing-handoff content.
- Typecheck, lint, test, and build are run when available, or skipped with a clear reason.
- The frontend starts locally on an available port when local startup is part of the request.
- Browser/runtime verification reaches the target page and confirms there are no blocking console/runtime failures.
- Runnable visual verification includes headless browser screenshots and deterministic baseline diff status before claiming deterministic visual regression pass. Multimodal review is recorded when available; if unavailable and visual explanation is required, overall visual QA is `partial`.
- Production-bound frontend handoff includes provider/source mode, backend base URL, auth/env behavior, runtime QA evidence, retained mock status, and testing handoff before `ready`.
- The final answer includes the verified local URL or a precise external blocker.
- The final output uses shared readiness values `ready`, `partial`, or `blocked`, and states whether testing integration can consume the frontend artifacts.
