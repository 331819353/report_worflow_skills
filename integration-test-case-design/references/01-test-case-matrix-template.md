# Test Case Matrix Template

Use this template when integration test cases need to be handed off as a runnable matrix.

## Coverage Matrix

| Feature/Page | Related API | Filters | Interactions | Permission | State Coverage | Case IDs |
| --- | --- | --- | --- | --- | --- | --- |

## Test Case Columns

| Case ID | Category | Priority | Feature/Page | Related API | Preconditions | Steps | Test Data/Params | Expected Frontend Result | Expected Backend/API Result | Evidence | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Required Categories

- Runtime URL smoke and environment alignment.
- SSO/auth: first access, valid token, invalid token, no permission, logout when supported.
- API/display consistency for KPI cards, charts, tables, drawers, and exports.
- Filter behavior: default, single change, combined filters, reset, cascade, no-result, permission-limited option.
- Interaction behavior: drilldown, drawer, modal, page jump, pagination, sorting, refresh, export/download.
- Edge states: loading, empty, error, timeout, null, partial data, missing optional fields.
- Defect retest: blocker/high/major defects after a fix, with original defect ID, fix version, retest environment, and closure criteria.
- Production acceptance: runtime environment, version alignment, auth mode, source mode, critical data paths, and known-risk regression points.

## Readiness Rules

- Mark a case `blocked` when URL, account, data seed, permission, API document, or acceptance rule is missing.
- Do not remove blocked cases from the matrix.
- Each executable case needs expected frontend behavior, expected backend/API behavior, evidence to capture, and pass/fail criteria.
- Do not mark production acceptance `pass` when required retest cases are still `open`, `fixed` without retest, or `blocked`.
