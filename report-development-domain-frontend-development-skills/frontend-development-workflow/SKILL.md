---
name: frontend-development-workflow
description: "Run the end-to-end frontend development workflow for 前端, 可视化, 报表页面, 仪表盘, 数据大屏, dashboard, report page, visualization page, and prototype projects that receive prototype source files plus API/interface documentation. Use when Codex must inspect a frontend/可视化/报表页面 prototype, locate mock/static data, validate API contracts against mock/display expectations, map mock fields to documented HTTP APIs, replace mock data with real request calls, design response adapters, perform 接口联调, wire request parameters, preserve page interactions, audit functional and user-facing copy issues left from the prototype, verify env/proxy/deployment behavior, check install/build/dev-server/browser runnability, and keep repairing compile, runtime, proxy, CORS, request, UI, copy, and interaction issues until the project runs or a concrete external blocker remains."
---

# Frontend Development Workflow

## Overview

Use this skill as the top-level workflow for frontend implementation after prototype design. The normal input is a runnable or nearly runnable prototype project plus API documentation; the required output is a frontend that reads from documented HTTP interfaces instead of mock data and has been verified through install, build, startup, browser/runtime checks, and a post-integration review of functional behavior and user-facing copy.

For mock-to-HTTP implementation details, read [references/mock-to-http-integration.md](references/mock-to-http-integration.md).

Use the frontend specialty skills as guardrails inside this workflow:

- Use `$frontend-api-contract-validation` before and after replacing mock data with APIs, especially when response fields, params, empty states, pagination, sorting, filters, or auth behavior must match frontend expectations.
- Use `$frontend-response-adapter-design` when backend responses differ from current mock/component view models and conversion should live in services, composables, stores, or data-source adapters.
- Use `$frontend-runtime-qa-validation` for browser/runtime QA after implementation, mock replacement, visual fixes, or before final handoff.
- Use `$frontend-env-deployment-verification` when configuring env values, API base URLs, proxies, base paths, build/preview/deploy behavior, or final URLs.

## Default Flow

1. Discover the project context.
   Inspect the uploaded prototype files, API documents, package files, lockfiles, environment files, build config, router, state management, existing request utilities, mock data files, and component data usage. Prefer `rg` and targeted reads. Follow the existing stack and structure before introducing new patterns.

2. Run a baseline check before large edits.
   Install dependencies if needed, then run the project's existing validation commands such as typecheck, lint, test, and build. Start the dev server when feasible. Record baseline failures so later work does not hide pre-existing project problems.

3. Inventory mock data.
   Locate all mock/static data, fixture JSON, hard-coded arrays, localStorage seeds, artificial `Promise.resolve` calls, fake timers, and data files under `src/data`, `mock`, `fixtures`, or template-specific data modules. For each mock source, identify the consuming pages/components, fields, filters, pagination, sorting, drilldowns, exports, charts, and tables.

4. Analyze API documentation.
   Extract endpoint method/path, base URL, auth requirement, request params/body, response schema, error shape, pagination/sort/filter rules, and sample responses. Do not invent endpoints that are not documented; if a needed endpoint is missing, mark it as a blocker or implement a clearly isolated temporary adapter only when the user asks.

5. Create a mock-to-API mapping.
   Before editing, map every mock data source to one or more HTTP APIs. Define request parameter sources from the UI state, response-to-view-model transforms, field renames, enum/status normalization, empty-state behavior, and error/loading behavior.
   Use `$frontend-api-contract-validation` to compare the mock/display contract with documented API params and response samples before code changes.

6. Add or reuse the request layer.
   Prefer the project's existing HTTP client, interceptors, env config, proxy config, and error handling. If none exists, add a small `api` client with base URL, timeout, token/header hooks, normalized errors, and typed service functions. Keep business components from calling raw endpoints directly when the project has a service layer pattern.

7. Replace mock data with HTTP calls.
   Update pages, composables, stores, and widgets to call documented APIs. Preserve existing layout and interactions. Keep response adapters close to the service or data-source layer so UI components still receive stable view models. Remove mock imports when they are no longer needed.
   Use `$frontend-response-adapter-design` when API DTOs differ from existing mock/component props.

8. Wire cross-cutting behavior.
   Ensure filters, search, date ranges, organization selectors, pagination, sorting, tabs, drilldowns, refresh, export/download, and linked charts pass correct query/body values. Add loading, empty, failed, and retry states where the mock prototype previously assumed data was always present.

9. Audit prototype functions and copy before deployment.
   Traverse the updated app page by page and component by component. Check that every visible control, route jump, tab, drawer, modal, table operation, chart click, export, refresh, and empty/error state still works after mock data is replaced. Also clean user-facing copy left from the prototype, including titles, menus, breadcrumbs, labels, button text, placeholder text, tooltips, document title, download names, and error messages that still contain words such as `原型`, `mock`, `demo`, `示例`, or irrelevant placeholder descriptions. Fix dead controls, mismatched titles, stale explanatory text, malformed units, wrong field names, and any copy that no longer matches the real API-backed page.
   Use `$frontend-runtime-qa-validation` for the structured browser QA pass.

10. Apply authentication when required.
   If the API docs or project require Haier account-center SSO and the user has not disabled it, use the existing project auth layer. For script-tag IAM access, use `$haier-iam-frontend-script-sso`; normally place the SDK script in `index.html` and initialization/login in `App.vue` or an IAM adapter imported by `App.vue`. After login succeeds, persist browser `clientId` and token, and make the shared request layer send `Application-Key: {clientId}` and `Access-Token: {token}` on authenticated backend requests. On 401/token-invalid, clear stale auth state and re-trigger SSO.

11. Configure local API access.
    Use environment variables and dev-server proxy settings for API base URLs instead of hard-coding private domains throughout components. Preserve the production build path and make local CORS/proxy behavior explicit.
    Use `$frontend-env-deployment-verification` for env, proxy, base path, build, preview, deployment, and final URL behavior.

12. Verify and repair until runnable.
    Run typecheck/lint/tests/build as available, start the dev or preview server, and open the page in a browser when a visual frontend is involved. Fix compile errors, runtime exceptions, request failures, proxy mistakes, CORS symptoms, malformed response adapters, missing fields, broken interactions, stale prototype wording, and UI regressions. Repeat the run-and-repair loop until the app runs successfully or the only remaining issue is a concrete external dependency such as unavailable API credentials, VPN, network, or backend service.
    Use `$frontend-api-contract-validation` and `$frontend-runtime-qa-validation` for final network, interaction, response-shape, and browser checks.

13. Return a verified URL.
    For local handoff, start the frontend on an available port and return the verified local URL. If startup is blocked, state the exact command, error, attempted fixes, and remaining external blocker.

## Implementation Defaults

- Use the repository's package manager and framework conventions. Do not convert stacks.
- Keep API contracts typed where the project uses TypeScript.
- Prefer service/composable/store integration over endpoint calls scattered inside templates.
- Keep mock fallback only when the user requests offline demo mode; otherwise remove stale mock dependencies from production paths.
- Normalize backend response fields into the existing UI data shape instead of rewriting the whole page around backend naming.
- Avoid broad visual redesign while replacing data sources unless broken states require small UI fixes.
- Keep secrets, tokens, cookies, and private credentials out of code and logs.
- Preserve existing route paths, component names, and user-facing behavior unless the API contract requires a change.

## Required Work Product

Before or alongside implementation, maintain these notes in the task response or project docs when useful:

- `Input Files`: prototype files, API docs, config files, and their roles.
- `Mock Inventory`: mock source, consumers, fields, and affected interactions.
- `API Contract Validation`: endpoint coverage, request mapping, response field comparison, adapter/blocker decisions, and empty/error/auth behavior.
- `API Mapping`: mock source to endpoint, request params, response adapter, and auth need.
- `Response Adapters`: API DTO to UI view model mapping, enum/unit/date/null/default behavior, and sample verification.
- `Changed Data Flow`: files changed and how UI state now reaches APIs.
- `Prototype QA`: route/page/component checks, functional issues fixed, stale prototype wording removed, and any remaining product copy questions.
- `Environment And Deployment`: env variables, proxy, base path, build/preview/deploy URL, and remaining external blockers.
- `Verification`: commands run, server URL, browser smoke checks, remaining blockers if any.

## Verification Checklist

- Every mock data source used by the target pages is either replaced by an API call or intentionally retained for an explicit offline/demo mode.
- Every implemented request is traceable to the provided API documentation.
- Every implemented request replacing mock data has passed field-level contract validation against the mock/display shape.
- Response adapters keep existing component view models stable or document a deliberate narrow refactor.
- Filters, pagination, sorting, refresh, drilldown, export, and route parameters feed the documented request params.
- Each page/component has been checked for broken controls, dead routes, invalid interactions, and states that stopped working after mock replacement.
- User-facing text no longer exposes prototype-only wording such as `原型`, `mock`, `demo`, `示例`, placeholder titles, or stale descriptions unless the business requirement explicitly keeps them.
- Loading, empty, error, and retry states behave without layout breakage.
- Env, proxy, base path, static assets, route mode, build output, and preview/deploy URL behavior are verified or have a precise external blocker.
- Typecheck, lint, test, and build are run when available, or skipped with a clear reason.
- The frontend starts locally on an available port.
- Browser/runtime verification reaches the target page and confirms there are no blocking console/runtime failures.
- The final answer includes the verified local URL or a precise external blocker.
