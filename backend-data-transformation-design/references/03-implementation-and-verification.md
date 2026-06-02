# Implementation And Verification

Use this reference when translating transformation rules into code, tests, and examples.

## Placement Rules

- Put raw file/database/upstream parsing in repository, data-access, client, or adapter code.
- Put source-to-target conversion, aggregation, and business formulas in service or transformation modules.
- Put final response validation in schemas, DTOs, serializers, response helpers, or contract tests.
- Keep transformations deterministic and documented.
- Do not hide business formulas or source-specific cleanup inside route handlers.
- Preserve raw values only when the target contract explicitly needs them.

## Verification Sample Template

- Scenario:
- Request params:
- Source rows or upstream payload:
- Transformation rules exercised:
- Source quality cases:
- Expected response fields:
- Reconciliation notes:
- Status: pass / partial / fail

## Test Guidance

- Add focused tests for non-trivial field renames, date/period conversion, aggregation, formulas, enum mapping, unit conversion, rounding, default fill, sorting, and empty states.
- Add source quality tests for missing keys, duplicate rows, malformed values, invalid enums, invalid dates, late-arriving data, and reject/quarantine behavior when those risks exist.
- Include at least one negative or missing-data sample when the rule has fallback behavior.
- Compare representative runtime responses against the target API contract when implementation exists, and record field/request/error mismatches with reproducible evidence.
- Record unknown rules or temporary defaults in a local transformation gap ledger with stable `GAP-*` IDs, owner, impact, assumption, and retest criteria.
