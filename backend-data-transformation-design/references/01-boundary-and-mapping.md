# Boundary And Mapping

Use this reference when defining the transformation boundary and field-level mapping.

## Boundary Definition

Name these items before writing rules:

- Target endpoint, operation, export, event, or adapter.
- Target consumer or contract.
- Authoritative source: file, database table/view, upstream API, event stream, fixture, or generated data.
- Source grain: raw row, transaction, day, month, user, org, order, project, product, region, or other unit.
- Target grain: detail row, grouped row, KPI card, trend point, ranking item, tree node, export row, nested object, or summary.
- Transformation owner: repository, service, adapter, serializer, DTO, view, SQL, or upstream dependency.

## Field Mapping Template

For each target field, record:

- Target field:
- Source field(s):
- Source-to-target rule:
- Type:
- Required/nullability:
- Unit:
- Precision/rounding:
- Enum/date/format:
- Default-fill behavior:
- Error behavior:
- Source trace:
- Status: ready / partial / blocked

## Source Quality Gate

Before finalizing field rules, check:

- Required source keys and join keys exist.
- Primary keys or grouping keys are unique when the target contract assumes uniqueness.
- Nullability and default-fill rules are known for required target fields.
- Malformed rows, invalid dates, invalid enum codes, negative values, and outliers have an explicit handling rule.
- Duplicate rows, late-arriving data, and source refresh cadence have an explicit reconciliation rule.
- Reject, quarantine, skip, or partial-success behavior is documented for rows that cannot be transformed.

## Missing Field Handling

- Mark a field blocked when no source, formula, default, or explicit constant can produce it.
- Mark a field partial when a temporary default or assumption is used.
- Do not invent a business formula only to satisfy the target contract.
- Record missing source fields, enum dictionaries, units, IDs, nullable rules, and precision in a local transformation gap ledger with stable `GAP-*` IDs, owner, impact, assumption, and blocking status.
