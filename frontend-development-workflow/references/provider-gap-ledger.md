# Provider Gap Ledger Reference

Use this reference whenever frontend integration depends on information that is missing, ambiguous, temporary, or externally blocked. Keep the ledger visible in the task response, project docs, or handoff notes.

## Gap Categories

- Requirement: target page scope, supported user actions, acceptance criteria, or offline/demo expectations are unclear.
- Provider: provider type, endpoint/query/file/SDK method, sample response, schema, or runtime availability is missing.
- Field/model: required UI field, enum, formula, unit, precision, sort order, hierarchy, or identifier is unclear.
- Input/filter: filter options, default values, cascades, pagination, sorting, route params, or export params are unsupported or undocumented.
- Auth/permission: SSO, headers, cookies, client IDs, app IDs, roles, row-level permission, or no-permission behavior is unclear.
- Environment/deployment: base URL, proxy target, CORS, route base, asset base, deployment target, or credentials are missing.
- Runtime behavior: loading, empty, partial, retry, stale data, cancellation, cache invalidation, realtime reconnect, or unsubscribe behavior is undefined.
- Testing: sample data, expected display values, browser/container, account, VPN, backend health, or evidence requirements are missing.

## Severity

- Blocker: implementation or verification would be incorrect or impossible without the answer.
- Major: implementation can proceed with an explicit temporary adapter or assumption, but must be resolved before delivery.
- Minor: does not block implementation but affects polish, documentation, or test completeness.

## Ledger Template

```markdown
| ID | Category | Severity | Missing or ambiguous item | Impact | Current assumption/workaround | Owner/source needed | Status |
|---|---|---|---|---|---|---|---|
| FE-GAP-001 | Provider | Blocker |  |  |  |  | Open |
```

## Rules

- Do not hide gaps inside component constants or adapter fallbacks.
- Link each blocker to the page/component/provider it affects.
- When a gap is resolved, update the mapping, adapter, tests, and function description.
- If a user explicitly accepts an assumption, record it as accepted rather than leaving it as an open blocker.
