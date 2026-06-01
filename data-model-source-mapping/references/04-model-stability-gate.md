# Model Stability Gate

Use this gate before finalizing a 数据模型文件.

## Required Traceability

Every row must be traceable:

- Response field -> source field, logical field, metric ID, static enum, or gap ID.
- Metric -> source fields, formula, grain, dimensions, period logic, or gap ID.
- Logical model -> source model and relationship rule, or gap ID.
- Data quality rule -> model/field target.
- Permission rule -> identity scope and data scope, or gap ID.
- Sensitive field -> sensitivity value, masking rule, field-level permission, or gap ID.

## No-Invention Checks

Create a gap instead of inventing:

- Table/view/file/API physical names.
- Field names that do not appear in source docs or prototype code.
- Join keys.
- Formula components.
- Enum dictionaries.
- Owner names.
- Refresh cadence.
- Permission rule details.
- Sample values presented as real source data.
- Sensitivity level, masking behavior, or field-level permission.

## Stable Output Checks

- Use IDs: `SRC-*`, `LGM-*`, `RSP-*`, `MET-*`, `GAP-*`.
- Use status values: `ready`, `partial`, `blocked`.
- Put `Gap IDs` in a dedicated column where uncertainty exists.
- Avoid duplicate response field definitions across models unless the models intentionally differ.
- Use the same model names later in API清单.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.
- A row with `TBD(GAP-*)` cannot be `ready`.

## Priority Note

If API priorities exist, use `P0/P1/P2` from the API清单. If no API清单 exists yet, treat first-screen, required response, core metric, permission, source, and join items as `core/required` for readiness decisions.

## Readiness Decision

Mark the model file:

- `ready`: all P0 or core/required response fields, core metrics, source mappings, joins, permissions, and security rules are confirmed.
- `partial`: assumptions exist but are documented and do not block API documentation.
- `blocked`: unknown formula, source, join, permission, security rule, or grain prevents reliable API documentation.
