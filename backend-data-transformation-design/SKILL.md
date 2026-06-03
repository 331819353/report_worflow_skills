---
name: backend-data-transformation-design
description: "用于设计和验证后端从数据源到接口响应/导出的转换逻辑。用户提到数据清洗、字段映射、源表到响应、上游接口到API、mock到数据库、YYYYMMDD转月份、汇总口径、粒度转换、单位换算、枚举映射、公式派生、精度处理、默认填充、排序分组、对账校验、转换样例时触发，提前明确后端实现和验证规则。"
---

# Backend Data Transformation Design

## Overview

Use this skill independently when backend/API work needs shaped data rather than raw source rows or raw upstream payloads. The service or adapter layer owns the transformation from source model to target response contract whenever consumers expect a different field shape, period grain, unit, enum label, formula, nesting, ordering, or aggregation.

Typical inputs are source data, data models, database rows, SQLite fixture rows, upstream payloads, event schemas, API response expectations, frontend/prototype contracts, metric formulas, and sample rows. The output is a source-to-target transformation mapping with verification samples.

## Core Workflow

0. Establish source and target authority.
   Name which artifact owns the raw source shape, which artifact owns the target API/consumer contract, and which artifact owns metric formula or enum meaning. If source rows, API docs, frontend expectations, samples, or metric definitions conflict, record the conflict before designing a conversion rule.

1. Identify the transformation boundary.
   Separate raw source fields from target API/consumer fields. Name the authoritative source, source grain, target grain, and target contract.

2. Check source quality assumptions.
   Confirm required keys, uniqueness, nullability, freshness, malformed values, duplicate handling, late-arriving data, and reject/quarantine behavior before designing target fields.

3. Build a source-to-response mapping.
   For every target field, define source field(s), conversion rule, required status, unit, precision, default-fill behavior, and error behavior.

4. Normalize time and period fields.
   Explicitly define parsing, timezone, calendar/fiscal rules, grain conversion, output format, and invalid-date behavior.

5. Define aggregation and reconciliation.
   Define source row, grouped row, summary, ranking, total/subtotal, nested, and export behavior as needed.

   When the source is database-backed or SQLite-fixture-backed, global/page-level filtering, permission scope, sorting, pagination, grouping, aggregation, ranking, Top/Bottom, and counts belong in SQL `WHERE`/repository queries. Do not design transformations that require broad in-memory row loading for business filtering or aggregation. Reject full-materialize-then-filter transformations: never build a full target dataset, component view model, or export-sized row list before applying request scope. Component-internal filters may run after response shaping only when they operate on the already fetched component dataset and are not used for global scope, permission, pagination, ranking, aggregation, or counts.

6. Define business derivations.
   Write formulas for rates, gaps, scores, status, risk level, aging, contribution, YoY/MoM, and other derived fields.

7. Add verification samples.
   Every non-trivial transformation needs at least one input-to-output sample, focused test, or runtime assertion.

   If mock data is used for backend/API implementation, verification samples should come from SQLite fixture rows or API responses produced by SQLite queries. JSON examples may show expected responses but must not be the transformation source.

## References

- Read [references/01-boundary-and-mapping.md](references/01-boundary-and-mapping.md) when defining the source, target, grain, field mapping, required status, defaults, and missing fields.
- Read [references/02-time-aggregation-derivation.md](references/02-time-aggregation-derivation.md) when handling period conversion, aggregation, formulas, ranking, totals, and reconciliation.
- Read [references/03-implementation-and-verification.md](references/03-implementation-and-verification.md) when placing transformation logic in code and creating samples/tests.
- Read [references/standalone-quality-gates.md#entry-input-consistency-gate](references/standalone-quality-gates.md#entry-input-consistency-gate) only when multiple artifacts disagree on source authority, target contract, metric formula, enum meaning, or permission behavior.

## Required Output

Produce a transformation design note with:

1. Source authority, target contract authority, and any unresolved source/target conflicts.
2. Field-level source-to-target mapping with conversion, default, precision, unit, enum, and error rules.
3. Time, aggregation, derivation, reconciliation, sorting, and export rules when applicable.
4. Verification samples or test cases for non-trivial transformations.
5. Missing information or blocked decisions that prevent safe implementation.

## Verification Checklist

- Target response fields match the API/consumer contract.
- Source and target authorities are named; conflicts are visible rather than hidden in conversion rules.
- Every renamed, converted, aggregated, derived, rounded, filled, or sorted field has a documented rule.
- Source quality assumptions and malformed/duplicate/late data handling are documented or captured as missing information.
- Date/period examples such as `YYYYMMDD -> YYYYMM` are verified by sample, test, or runtime evidence.
- Aggregates, totals, counts, and derived KPIs reconcile with source rows.
- Pagination, sorting, grouping, aggregation, and counts are pushed into SQL for database/SQLite-backed sources instead of broad in-memory calculation.
- No transformation depends on full-materialize-then-filter behavior; request scope is applied at the repository/source boundary before response shaping.
- Component-internal local filtering is documented separately from global SQL `WHERE` filtering.
- Mock-derived backend/API transformations use SQLite fixture data for verification; JSON files are examples or assertions only.
- Unknown rules are captured in a local missing-information note or backend gap ledger with owner, impact, current assumption, and blocking status.
