---
name: test-evidence-defect-reporting
description: "Produce structured test evidence and defect reports for report integration testing. Use for 测试报告, 缺陷报告, evidence capture, screenshots, network logs, reproduction steps, expected/actual result, owner classification, blocker/missing information, pass/partial/fail conclusion, and handoff-ready QA summaries."
---

# Test Evidence Defect Reporting

## Overview

Use this skill to turn runtime testing into a handoff-ready report. Every failure should be reproducible, evidence-backed, and classified by likely owner side when possible.

## Evidence Rules

- Prefer direct runtime evidence: screenshot, browser console, network request/response, API response sample, visible UI value, storage snapshot, and exact URL.
- Include source/Git evidence only when it explains a runtime issue.
- Avoid vague statements such as "data is wrong" without expected value, actual value, endpoint, params, and component location.
- Mark missing accounts, missing API docs, inaccessible backend, unavailable SSO, or absent data as blockers or missing information rather than silently passing.

## Defect Classification

Classify each defect into one primary category:

- Environment: URL unreachable, wrong environment, build/version mismatch, proxy/CORS, gateway, timeout, or deployment issue.
- SSO/auth: login redirect, token storage, auth headers, backend validation, invalid-token recovery, permission handling, or logout.
- API contract: endpoint, params, response shape, type, enum, unit, precision, pagination, sorting, error envelope, or transformation mismatch.
- Frontend binding: wrong API call, stale mock, wrong adapter, display calculation, chart/table binding, empty state, or interaction binding.
- Filter: option data, default, reset, cascade, request params, component binding, persistence, export/drilldown inheritance.
- Layout/data visibility: clipping, overlap, truncation, table ellipsis hiding required values, missing scroll, or unreadable data.
- Missing information: unavailable account, undocumented rule, unknown field meaning, absent test data, or inaccessible system.

## Report Template

Use this compact structure:

- Test summary:
- Test environment:
- Running frontend URL:
- Running backend URL:
- Account/role:
- Version/build/source reference:
- Test modules executed:
- Overall conclusion: pass / partial pass / fail / blocked

For each module:

- Module:
- Cases executed:
- Passed:
- Failed:
- Blocked:
- Evidence:
- Notes:

For each defect:

- ID:
- Category:
- Severity: blocker / high / medium / low
- Component or API:
- Reproduction steps:
- Expected result:
- Actual result:
- Evidence:
- Likely owner: frontend / backend / SSO / data / environment / unclear
- Missing information:
- Suggested next action:

## Pass Criteria

- The report states exactly what was tested and what was not tested.
- Every failed or blocked case has evidence and reproduction steps.
- The conclusion distinguishes pass, partial pass, fail, and blocked.
- Defects can be handed to frontend, backend, SSO, data, or environment owners without re-investigation.
