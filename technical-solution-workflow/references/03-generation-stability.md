# Generation Stability

Use this reference to make the output deterministic enough for weaker models.

## Stable Names

Use these artifact names exactly:

- `API清单`
- `数据模型文件`
- `待补充数据模型清单`

Use these ID prefixes:

- Inputs: `IN-001`
- APIs: `API-001`
- Source models: `SRC-001`
- Logical models: `LGM-001`
- Response models: `RSP-001`
- Metrics: `MET-001`
- Gaps: `GAP-001`

If the project already has stable IDs, keep them and only add missing IDs.

## Controlled Values

API trigger:

- `initial-load`
- `filter-change`
- `drilldown`
- `export`
- `action`
- `scheduled`

API priority:

- `P0`: required for first usable version.
- `P1`: important but not first-screen blocking.
- `P2`: enhancement, secondary drilldown, or non-core export.

API/artifact status:

- `ready`
- `partial`
- `blocked`

Pending item status:

- `open`
- `assumed`
- `blocked`
- `resolved`
- `obsolete`

Gap severity:

- `Blocker`
- `High`
- `Medium`
- `Low`

## No-Invention Rule

When source information is unknown, write `TBD` and create a gap item. Do not invent:

- Physical table/view/API names.
- Owner names.
- Metric formulas.
- Enum dictionaries.
- Join keys.
- Refresh cadence.
- Permission rules.
- Sample values that pretend to be real source data.

## Fallback Rule

If work can continue safely:

1. Mark the item `assumed`.
2. Write the exact assumption in one sentence.
3. Reuse that sentence in every affected artifact.
4. Link the same `GAP-*` ID.

If work cannot continue safely:

1. Mark the item `blocked`.
2. Explain the downstream blocker.
3. Ask one concrete owner question.

## Output Discipline

- Use tables for inventories, model fields, APIs, and gaps.
- Keep one row per model/API/gap. Do not merge unrelated issues into one row.
- Keep status and severity in dedicated columns, not buried in notes.
- Put assumptions next to the affected row.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.
- End with a short handoff verdict: `ready`, `partial`, or `blocked`.
