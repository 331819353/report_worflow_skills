---
name: frontend-backend-integration-test-validation
description: "用于已有前端URL和后端URL时执行独立的前后端运行联调验证。用户提到联调验证、集成验证、前后端一起测、运行URL测试、SSO验证、token/clientId请求头、接口连通性、页面展示与API对比、mock替换验收、筛选联动、交互流程、端到端报表QA、联调缺陷复现时触发，输出证据化测试结论和修复建议。"
---

# Frontend Backend Integration Test Validation

## Overview

Use this skill independently in the testing phase after frontend and backend development are both runnable. The goal is to prove that login/auth, backend API responses, frontend displayed data, and filters work as one system, not merely that the page can render.

This standalone skill embeds the required URL smoke, SSO/auth, API/display consistency, filter-linkage, interaction, and evidence-reporting checks. Do not require another testing skill before producing a usable validation result.

When a larger workflow is present, this skill's output can be handed off as runtime validation evidence, but the checks below remain self-contained.

## Shared References

- Read `references/standalone-quality-gates.md#production-closed-loop-readiness` when this validation is used for production acceptance, release readiness, or defect retest closure.
- Read `references/standalone-quality-gates.md#readiness-and-handoff-contract` for shared readiness values and defect handoff requirements.

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
   Identify the running frontend URL and backend base/API URL. Confirm the URLs are reachable, belong to the intended environment, and are aligned to the version under test. If source or Git inputs are also provided, record them as optional diagnostics inputs rather than primary test targets.

2. Confirm the test environment.
   Record frontend URL, backend base URL, SSO environment, test account or role, browser, build version, API document version, source commit/version if known, and any mock data still intentionally retained. If any item is missing, capture it as a blocker or missing-information item instead of guessing silently.

3. Check backend runtime readiness.
   Verify backend health endpoints or representative APIs before opening the frontend. If backend readiness fails, use optional source/Git inputs only to diagnose configuration or startup causes.

4. Validate SSO entry and storage.
   Start from a clean browser state. Open the frontend URL and verify unauthenticated access triggers the expected SSO flow. After login, confirm the browser stores the agreed `clientId` and `token` values or the project-specific equivalent keys.

5. Validate authenticated backend requests.
   Inspect network requests from page load and interactions. Confirm every protected backend request carries the agreed auth headers, such as `clientId`/`token`, `Application-Key`/`Access-Token`, or the names documented by the project. Confirm tokens are not sent through unsafe locations such as query strings unless explicitly required by the backend contract.

6. Validate SSO failure and recovery.
   Test expired, missing, malformed, or backend-rejected tokens when possible. The backend should reject invalid auth consistently, and the frontend should clear invalid auth state, avoid request loops, and trigger SSO again. Also check no-permission responses show an appropriate permission state rather than stale business data.

7. Run SSO logic tests.
   Independently test first access, existing valid token, missing token, expired token, invalid token, permission denied, route refresh, and logout when the system supports those operations. Confirm frontend storage state, request headers, backend status codes, and user-facing behavior are consistent.

8. Build the backend data baseline.
   For each report page or tab, capture the backend API calls, request parameters, response payloads, and response adapter outputs if present. Save representative samples for KPI cards, charts, tables, detail drawers, exports, and any drilldown endpoints.

9. Compare frontend display with backend data.
   Traverse the page in Z-shaped reading order from the first component. For each component, identify its backend endpoint, request params, response fields, adapter rules, and displayed fields. Verify numbers, dimensions, sorting, top N, totals, ratios, units, date/period formats, rounding, null handling, and empty states match the backend contract.

10. Run data consistency logic tests.
    Calculate or derive expected display values from backend responses for each component. Check aggregation, unit conversion, date conversion, precision, percentage formatting, sorting, top N, total/subtotal, null/empty display, and chart/table binding. Record every field-level mismatch.

11. Detect stale mock or prototype residue.
   Confirm the page no longer uses old static mock data for API-backed components. Search for stale prototype wording, placeholder titles, hardcoded demo values, disconnected chart series, and labels that do not match the backend metric definition.

12. Validate filter inventory.
   List every visible and hidden filter: time, organization, region, industry, product, customer, brand, status, owner, keyword, advanced filters, and saved queries. Confirm options load successfully, default values are valid, reset works, disabled/loading/empty states are handled, and option labels/values match backend-supported values.

13. Validate filter-to-request behavior.
   For each filter, change one value at a time and confirm the expected request parameter changes. Verify date formats, multi-select encoding, cascaded parent/child values, empty selections, all selections, invalid values, and permission-limited values. Confirm backend responses reflect the selected filters.

14. Validate filter-to-component binding.
    Confirm each filter updates exactly the intended components, and unaffected components remain stable. Check KPI cards, charts, tables, drawers, drilldowns, exports, downloads, pagination, sorting, and page jumps all inherit or preserve active filters as required.

15. Run filter logic tests.
    Independently test default filter, single filter change, combined filters, cascade filters, reset, invalid/empty option, all option, multi-select, date range boundary, permission-limited option, and filter persistence across pagination, sorting, drilldown, refresh, export, and page jumps.

16. Validate interaction consistency.
    Click chart marks, KPI cards, table rows, tabs, drilldowns, modal/drawer actions, export/download buttons, refresh controls, and reset controls. Verify interactions use the current auth state and active filters, pass the correct parameters, and render updated data without stale loading or mixed old/new values.

17. Validate layout capacity during testing.
    While comparing data, check whether all returned metrics fit the page and component containers. Flag any compressed, clipped, truncated, overlapped, or ellipsis-hidden business data. Tables must adapt columns to content and use horizontal scrolling when needed instead of hiding required values.

18. Produce evidence-backed test output.
    Consolidate pass/fail/blocker conclusions, reproduction steps, expected/actual results, screenshots or network evidence, likely owner side, and missing information.

19. Maintain production acceptance and retest closure when applicable.
    Apply `references/standalone-quality-gates.md#production-closed-loop-readiness` for production-bound validation. Record frontend/backend versions, account/data used, retained mock status, open/fixed/retest/closed/blocked defect counts, and retest evidence. Do not mark acceptance `ready` while blocker/high/major defects are open, fixed without retest evidence, or blocked by missing URL/account/data/env.

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
- Retest closure:
- Production closed-loop readiness:
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
- Vue report pages using Element Plus have loaded component CSS, usable select/date/cascader poppers, and unblocked dialog/drawer overlays after API-driven data updates.
- API-backed rate/change/completion fields display Chinese `%` units and change-rate indicators follow positive-red-up / negative-green-down SVG/icon semantics after response adaptation.
- HTML-replica or custom pages keep global UI token consistency after API-driven data updates; backend data length or sign changes do not expose one-off copied styles.
- Production acceptance includes environment/version/account/data, retained mock status, defect retest evidence, and final readiness before claiming `ready`.

## Failure Handling

When a check fails, classify it before fixing or reporting:

- SSO defect: login redirect, storage, token refresh, backend validation, invalid-token handling, permission handling, or logout.
- API contract defect: missing field, wrong type, wrong enum, wrong unit, wrong date format, wrong error shape, or undocumented transformation.
- Frontend binding defect: wrong endpoint, wrong params, stale mock data, wrong adapter, wrong rounding, wrong component state, or missed interaction binding.
- Filter defect: missing option, wrong default, wrong param name, cascade mismatch, incomplete component coverage, reset failure, or export/drilldown not inheriting filters.
- Layout defect: block size too small, component compression, clipped data, table ellipsis hiding required values, missing scroll behavior, wrong `%`/trend styling, or copied one-off visual tokens overriding the page UI.

Every unresolved failure must include reproduction steps, expected result, actual result, evidence source, owner side if identifiable, and missing information if the owner side cannot be determined.

Closed blocker, high, or major defects must include retest environment/version and evidence; otherwise keep the status `fixed`, `retest`, or `blocked`, not closed.
