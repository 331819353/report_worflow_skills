---
name: frontend-development-workflow
description: "Run the end-to-end frontend development workflow for 前端, 可视化, 报表页面, 仪表盘, 数据大屏, dashboard, report page, visualization page, and prototype projects that receive prototype source files plus API/interface documentation. Use when Codex must inspect a frontend/可视化/报表页面 prototype, locate mock/static data, map mock fields to documented HTTP APIs, replace mock data with real request calls, perform 接口联调, wire request parameters and response adapters, preserve page interactions, check install/build/dev-server/browser runnability, and keep repairing compile, runtime, proxy, CORS, request, and UI issues until the project runs or a concrete external blocker remains."
---

# Frontend Development Workflow

## Overview

Use this skill as the top-level workflow for frontend implementation after prototype design. The normal input is a runnable or nearly runnable prototype project plus API documentation; the required output is a frontend that reads from documented HTTP interfaces instead of mock data and has been verified through install, build, startup, and browser/runtime checks.

For mock-to-HTTP implementation details, read [references/mock-to-http-integration.md](references/mock-to-http-integration.md).

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

6. Add or reuse the request layer.
   Prefer the project's existing HTTP client, interceptors, env config, proxy config, and error handling. If none exists, add a small `api` client with base URL, timeout, token/header hooks, normalized errors, and typed service functions. Keep business components from calling raw endpoints directly when the project has a service layer pattern.

7. Replace mock data with HTTP calls.
   Update pages, composables, stores, and widgets to call documented APIs. Preserve existing layout and interactions. Keep response adapters close to the service or data-source layer so UI components still receive stable view models. Remove mock imports when they are no longer needed.

8. Wire cross-cutting behavior.
   Ensure filters, search, date ranges, organization selectors, pagination, sorting, tabs, drilldowns, refresh, export/download, and linked charts pass correct query/body values. Add loading, empty, failed, and retry states where the mock prototype previously assumed data was always present.

9. Apply authentication when required.
   If the API docs or project require Haier account-center SSO and the user has not disabled it, use the existing project auth layer. For script-tag IAM access, use `$haier-iam-frontend-script-sso`; normally place the SDK script in `index.html` and initialization/login in `App.vue` or an IAM adapter imported by `App.vue`.

10. Configure local API access.
    Use environment variables and dev-server proxy settings for API base URLs instead of hard-coding private domains throughout components. Preserve the production build path and make local CORS/proxy behavior explicit.

11. Verify and repair until runnable.
    Run typecheck/lint/tests/build as available, start the dev or preview server, and open the page in a browser when a visual frontend is involved. Fix compile errors, runtime exceptions, request failures, proxy mistakes, CORS symptoms, malformed response adapters, missing fields, and UI regressions. Repeat the run-and-repair loop until the app runs successfully or the only remaining issue is a concrete external dependency such as unavailable API credentials, VPN, network, or backend service.

12. Return a verified URL.
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
- `API Mapping`: mock source to endpoint, request params, response adapter, and auth need.
- `Changed Data Flow`: files changed and how UI state now reaches APIs.
- `Verification`: commands run, server URL, browser smoke checks, remaining blockers if any.

## Verification Checklist

- Every mock data source used by the target pages is either replaced by an API call or intentionally retained for an explicit offline/demo mode.
- Every implemented request is traceable to the provided API documentation.
- Filters, pagination, sorting, refresh, drilldown, export, and route parameters feed the documented request params.
- Loading, empty, error, and retry states behave without layout breakage.
- Typecheck, lint, test, and build are run when available, or skipped with a clear reason.
- The frontend starts locally on an available port.
- Browser/runtime verification reaches the target page and confirms there are no blocking console/runtime failures.
- The final answer includes the verified local URL or a precise external blocker.
