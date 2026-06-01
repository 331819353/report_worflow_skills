# API Stability Gate

Use this gate before finalizing API清单.

## Required Traceability

Every API row must trace:

- Page/module or interaction.
- Trigger.
- Request params.
- Response model.
- Source/logical model dependency.
- Auth/permission rule.
- Performance/cache/SLA rule.
- Priority and status.
- Gap IDs for unresolved items.

## No-Invention Checks

Create a `GAP-*` item instead of inventing:

- Physical source dependency.
- Formula dependency.
- Enum/filter option source.
- Permission rule.
- Response model fields not present in 数据模型文件.
- Performance/cache/SLA behavior for P0 APIs.
- Expected volume, export limit, timeout, or retry behavior when it affects implementation or validation.
- Action success/failure behavior.

## Path Naming

If no existing convention exists, use:

- Prefix: `/api/reports/{domain}`
- Summary: `/summary`
- Trend: `/trend`
- Ranking: `/ranking`
- Table/list: `/records`
- Detail: `/records/{id}`
- Filter options: `/filter-options`
- Export: `/export`
- Action: `/actions/{actionName}`

Keep paths stable, lowercase, and noun-led. Do not mix Chinese and English path segments.

## Readiness Decision

Mark an API:

- `ready`: response model, source dependency, request params, permission, performance/cache/SLA, and priority are clear.
- `partial`: assumptions exist but are linked to gaps and do not block API documentation.
- `blocked`: missing source, model, formula, permission, performance/cache/SLA, or interaction rule prevents reliable API documentation.

If any P0 API is `blocked`, the overall API清单 is not ready for downstream API documentation, implementation, integration, or validation.

## Blank Cell Rule

Do not leave required API inventory cells blank.

- Use `none` when a column is intentionally not applicable.
- Use `TBD(GAP-*)` when the value is unknown.
- A row with `TBD(GAP-*)` cannot be `ready`.
