# Metrics Transformations Quality

Use this reference for metric口径, transformations, permissions, and data quality.

## Metric Formula Requirements

Each metric needs:

- Metric ID and name.
- Formula in business words.
- Numerator and denominator, when applicable.
- Aggregation grain.
- Supported dimensions.
- Period logic: day, week, month, quarter, year, rolling period, MTD, QTD, YTD, custom.
- Baseline and threshold.
- Direction: higher-is-better, lower-is-better, neutral, or range.
- Unit and precision.
- Source dependency.
- Reconciliation rule or comparison source.

If a formula says only "按业务口径计算", create a `GAP-*` item.

## Transformation Rules

Document transformations explicitly:

| Transformation type | Required detail |
| --- | --- |
| Date conversion | Source timezone, output format, period boundary |
| Period aggregation | Grouping field, period type, partial-period behavior |
| Unit conversion | Source unit, output unit, scale, rounding |
| Enum mapping | Source values, display labels, unknown handling |
| Hierarchy rollup | Parent key, rollup rule, missing parent handling |
| Deduplication | Dedup key, order rule, duplicate handling |
| Default fill | Fill value, affected fields, whether shown to users |
| Permission filtering | User scope, org/project/region rule, no-permission behavior |

## Data Quality Rules

Use these rule types:

- `uniqueness`: primary key or natural key uniqueness.
- `completeness`: required fields not null.
- `enum-validation`: values belong to allowed dictionary.
- `range-check`: numeric/date values in valid range.
- `freshness`: refresh time within allowed SLA.
- `referential-integrity`: join keys match parent/child models.
- `reconciliation`: totals match trusted source or known tolerance.

Severity:

- `Blocker`: invalidates core metric or source traceability.
- `High`: can show wrong business result, permission leak, or misleading trend.
- `Medium`: affects secondary filters, examples, or edge cases.
- `Low`: naming, copy, or non-blocking metadata.

## Permission Rules

Permission cannot be a vague note. State:

- Auth source or identity type.
- User scope field.
- Data scope field.
- Whether scope is inherited from org, project, region, product, or role.
- No-permission behavior: empty result, masked field, error, or hidden API.
- Field-level sensitivity and masking rule for sensitive fields.

If permission is unknown, link a `GAP-*` item and do not mark affected APIs/models `ready`.

## Security And Masking Rules

For sensitive fields, document:

- Sensitivity: `public`, `internal`, `confidential`, `sensitive`, or `unknown`.
- Whether the field can be returned through APIs.
- Whether the field is masked, hidden, aggregated, or role-limited.
- Masking format, such as partial phone, partial name, hidden amount, bucketed value, or `TBD(GAP-*)`.
- Whether export behavior differs from screen display.

If sensitivity is unknown, create a `data-security` gap.
