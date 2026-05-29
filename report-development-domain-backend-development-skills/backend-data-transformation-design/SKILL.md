---
name: backend-data-transformation-design
description: "Design and verify backend source-to-response data transformations for API/data-service work. Use when source files, database rows, upstream APIs, or generated mocks do not match the frontend/API display contract, including date/period normalization such as YYYYMMDD to YYYYMM, aggregation grain changes, field renames, enum mapping, unit conversion, derived formulas, precision, default-fill behavior, sorting, grouping, and reconciliation."
---

# Backend Data Transformation Design

## Overview

Use this skill when backend API responses need shaped data rather than raw source rows. The backend owns the transformation from source model to response model whenever the frontend/mock/display contract expects a different field shape, period grain, unit, enum label, formula, or nesting.

This skill is usually called by `$backend-development-workflow` after data source and model analysis, before final API implementation.

## Workflow

1. Identify the transformation boundary.
   Separate raw source fields from API response fields. Name the authoritative source, source grain, response grain, and frontend/mock contract that the response must satisfy.

2. Build a source-to-response mapping.
   For every response field, define source field(s), conversion rule, required status, unit, precision, default-fill behavior, and error behavior. Mark fields that cannot be produced from the current data source as missing information.

3. Normalize time and period fields.
   Explicitly define date parsing, timezone assumptions, calendar rules, and output period format. For example, do not silently expose `YYYYMMDD` when the response contract expects `YYYYMM`; decide whether the rule is truncation, calendar aggregation, fiscal-period mapping, or another business calendar.

4. Define aggregation and reconciliation.
   State whether the endpoint returns source rows, grouped rows, monthly summaries, ranking rows, totals, or nested structures. Define group keys, measure aggregation methods, denominator rules, sorting, Top/Bottom logic, and how totals reconcile with detail rows.

5. Define business derivations.
   Write formulas for completion, gap, rate, YoY/MoM, contribution, score, risk level, overdue days, DSO/DIO, or other derived fields. Keep formulas close to service-layer code and API docs.

6. Add verification samples.
   Every non-trivial transformation needs at least one input-to-output sample or focused test. Include source rows, request params, expected response fields, and reconciliation notes.

## Implementation Rules

- Put raw file/database/upstream parsing in repository/data-access code.
- Put aggregation and source-to-response conversion in the service layer.
- Put final response shape validation in schemas, DTOs, serializers, or response helpers.
- Keep transformations deterministic and documented; do not hide business rules in route handlers.
- Preserve raw values only when the response contract explicitly needs them.
- When a rule is unknown, use a temporary default only if it is safe, then record it in the missing-information document.

## Verification Checklist

- Response fields match the frontend/mock/API display contract.
- Every renamed, converted, aggregated, derived, rounded, filled, or sorted field has a documented rule.
- Date/period examples such as `YYYYMMDD -> YYYYMM` are verified by sample or test.
- Aggregates, totals, counts, and derived KPIs reconcile with source rows.
- Unknown rules are captured by `$backend-missing-info-management`.
