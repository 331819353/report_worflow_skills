---
name: frontend-backend-integration-test-validation
description: "Run standalone runtime frontend/backend integration validation from already running frontend and backend URLs. Focus on SSO, frontend display data versus backend API data consistency, complete filter behavior, interactions, and evidence-backed QA. Use during testing when URLs are available for runtime URL verification, SSO validation, token/clientId headers, API response comparison, mock replacement verification, filter completeness, filter-to-component binding, and end-to-end report QA. Frontend/backend source files or Git URLs are optional diagnostics inputs for root-cause analysis."
---

# Frontend Backend Integration Test Validation

## Overview

Use this skill independently in the testing phase after frontend and backend development are both runnable. The goal is to prove that login/auth, backend API responses, frontend displayed data, and filters work as one system, not merely that the page can render.

Use these focused testing skills when their scope is needed:

- `$runtime-url-smoke-test` for running URL readiness.
- `$sso-auth-flow-test` for SSO and auth logic.
- `$frontend-backend-data-consistency-test` for API/display value consistency.
- `$filter-linkage-completeness-test` for filter completeness and linkage.
- `$test-evidence-defect-reporting` for evidence-backed QA output.

It also complements `$testing-integration-workflow`, `$integration-test-case-design`, `$frontend-runtime-qa-validation`, `$frontend-api-contract-validation`, `$backend-api-contract-validation`, `$report-info-component-mapping`, and SSO-specific frontend/backend skills.

## Required Inputs

The standard test input is a running frontend/backend pair:

- Running frontend URL: the page URL that users can open in a browser.
- Running backend URL: backend base URL, API gateway URL, or representative API endpoint base.

Optional but useful inputs:

- API documentation, SSO documentation, test account, role/permission expectations, deployment notes, database/sample data, frontend source file/directory/Git URL, backend source file/directory/Git URL, branch, and commit.

Use source files or Git URLs only as diagnostic evidence after a runtime failure or mismatch is found. If source or Git input is provided, record the repository/path, branch, commit, and checkout path before using it to locate configuration, request adapters, mock residues, routes, or auth middleware.

## Test Scope

Cover these three primary goals:

- SSO works from first access through token validation, refresh, invalidation, and re-login.
- Frontend displayed data is consistent with backend API data after response adapters, aggregation, units, precision, and formatting.
- Filters are complete: options, defaults, parameters, cascades, component bindings, backend queries, display refresh, reset, and edge states.

## Diagnosis Strategy

The runtime diagnosis method is the same regardless of whether source code is available: use the running URL, browser network, backend API responses, and visible UI to verify behavior.

Source or Git diagnostics are different: they do not replace runtime testing. Use them to locate root causes after a runtime issue appears, such as wrong API base URL, stale mock data, missing response adapter, incorrect filter parameter mapping, or backend auth middleware mismatch.

SSO, data consistency, and filters must each have separate logic tests. They are cross-cutting behaviors and cannot be fully validated by a simple page-load or visual inspection.

## Workflow

1. Resolve runtime inputs.
   Use `$runtime-url-smoke-test` to identify the running frontend URL and backend base/API URL. Confirm the URLs are reachable, belong to the intended environment, and are aligned to the version under test. If source or Git inputs are also provided, record them as optional diagnostics inputs rather than primary test targets.

2. Confirm the test environment.
   Record frontend URL, backend base URL, SSO environment, test account or role, browser, build version, API document version, source commit/version if known, and any mock data still intentionally retained. If any item is missing, capture it with `$test-evidence-defect-reporting` as a blocker or missing information instead of guessing silently.

3. Check backend runtime readiness.
   Use `$runtime-url-smoke-test` to verify backend health endpoints or representative APIs before opening the frontend. If backend readiness fails, use optional source/Git inputs only to diagnose configuration or startup causes.

4. Validate SSO entry and storage.
   Use `$sso-auth-flow-test`. Start from a clean browser state. Open the frontend URL and verify unauthenticated access triggers the expected SSO flow. After login, confirm the browser stores the agreed `clientId` and `token` values or the project-specific equivalent keys.

5. Validate authenticated backend requests.
   Inspect network requests from page load and interactions. Confirm every protected backend request carries the agreed auth headers, such as `clientId`/`token`, `Application-Key`/`Access-Token`, or the names documented by the project. Confirm tokens are not sent through unsafe locations such as query strings unless explicitly required by the backend contract.

6. Validate SSO failure and recovery.
   Test expired, missing, malformed, or backend-rejected tokens when possible. The backend should reject invalid auth consistently, and the frontend should clear invalid auth state, avoid request loops, and trigger SSO again. Also check no-permission responses show an appropriate permission state rather than stale business data.

7. Run SSO logic tests.
   Use `$sso-auth-flow-test` to independently test first access, existing valid token, missing token, expired token, invalid token, permission denied, route refresh, and logout when the system supports those operations. Confirm frontend storage state, request headers, backend status codes, and user-facing behavior are consistent.

8. Build the backend data baseline.
   Use `$frontend-backend-data-consistency-test`. For each report page or tab, capture the backend API calls, request parameters, response payloads, and response adapter outputs if present. Save representative samples for KPI cards, charts, tables, detail drawers, exports, and any drilldown endpoints.

9. Compare frontend display with backend data.
   Traverse the page in Z-shaped reading order from the first component. For each component, identify its backend endpoint, request params, response fields, adapter rules, and displayed fields. Verify numbers, dimensions, sorting, top N, totals, ratios, units, date/period formats, rounding, null handling, and empty states match the backend contract.

10. Run data consistency logic tests.
    Use `$frontend-backend-data-consistency-test` to calculate or derive expected display values from backend responses for each component. Check aggregation, unit conversion, date conversion, precision, percentage formatting, sorting, top N, total/subtotal, null/empty display, and chart/table binding. Record every field-level mismatch.

11. Detect stale mock or prototype residue.
   Confirm the page no longer uses old static mock data for API-backed components. Search for stale prototype wording, placeholder titles, hardcoded demo values, disconnected chart series, and labels that do not match the backend metric definition.

12. Validate filter inventory.
   Use `$filter-linkage-completeness-test`. List every visible and hidden filter: time, organization, region, industry, product, customer, brand, status, owner, keyword, advanced filters, and saved queries. Confirm options load successfully, default values are valid, reset works, disabled/loading/empty states are handled, and option labels/values match backend-supported values.

13. Validate filter-to-request behavior.
   For each filter, change one value at a time and confirm the expected request parameter changes. Verify date formats, multi-select encoding, cascaded parent/child values, empty selections, all selections, invalid values, and permission-limited values. Confirm backend responses reflect the selected filters.

14. Validate filter-to-component binding.
    Confirm each filter updates exactly the intended components, and unaffected components remain stable. Check KPI cards, charts, tables, drawers, drilldowns, exports, downloads, pagination, sorting, and page jumps all inherit or preserve active filters as required.

15. Run filter logic tests.
    Use `$filter-linkage-completeness-test` to independently test default filter, single filter change, combined filters, cascade filters, reset, invalid/empty option, all option, multi-select, date range boundary, permission-limited option, and filter persistence across pagination, sorting, drilldown, refresh, export, and page jumps.

16. Validate interaction consistency.
    Click chart marks, KPI cards, table rows, tabs, drilldowns, modal/drawer actions, export/download buttons, refresh controls, and reset controls. Verify interactions use the current auth state and active filters, pass the correct parameters, and render updated data without stale loading or mixed old/new values.

17. Validate layout capacity during testing.
    While comparing data, check whether all returned metrics fit the page and component containers. Flag any compressed, clipped, truncated, overlapped, or ellipsis-hidden business data. Tables must adapt columns to content and use horizontal scrolling when needed instead of hiding required values.

18. Produce evidence-backed test output.
    Use `$test-evidence-defect-reporting` to consolidate pass/fail/blocker conclusions, reproduction steps, expected/actual results, screenshots or network evidence, likely owner side, and missing information.

## Required Test Report

Produce a concise test report:

- Test environment:
- Running frontend URL:
- Running backend URL:
- Optional source/Git diagnostics inputs:
- Source versions or commits if known:
- SSO result:
- SSO logic tests:
- Auth storage and request header result:
- Backend endpoints checked:
- Components checked in Z order:
- Frontend/backend data consistency:
- Data consistency logic tests:
- Filter inventory and completeness:
- Filter-to-request and filter-to-component binding:
- Filter logic tests:
- Interaction cases:
- Layout/data visibility issues:
- Defects:
- Blockers or missing information:
- Final conclusion: pass / partial pass / fail / blocked

## Pass Criteria

- First access, authenticated access, invalid token, and no-permission scenarios behave consistently.
- Protected backend requests carry the documented auth headers with stored `clientId` and `token` or the project-specific equivalents.
- Every API-backed component has a verified endpoint, parameter set, response binding, and display comparison.
- Frontend values match backend values after documented transformations, rounding, units, and formatting.
- No component displays stale mock values unless intentionally documented.
- Every filter has valid options, defaults, reset behavior, backend parameter mapping, and component binding.
- Active filters are preserved across drilldowns, pagination, sorting, refresh, export/download, and page jumps when required.
- Tables, cards, charts, and drawers do not clip or hide required business data.

## Failure Handling

When a check fails, classify it before fixing or reporting:

- SSO defect: login redirect, storage, token refresh, backend validation, invalid-token handling, permission handling, or logout.
- API contract defect: missing field, wrong type, wrong enum, wrong unit, wrong date format, wrong error shape, or undocumented transformation.
- Frontend binding defect: wrong endpoint, wrong params, stale mock data, wrong adapter, wrong rounding, wrong component state, or missed interaction binding.
- Filter defect: missing option, wrong default, wrong param name, cascade mismatch, incomplete component coverage, reset failure, or export/drilldown not inheriting filters.
- Layout defect: block size too small, component compression, clipped data, table ellipsis hiding required values, or missing scroll behavior.

Every unresolved failure must include reproduction steps, expected result, actual result, evidence source, owner side if identifiable, and missing information if the owner side cannot be determined.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
