---
name: backend-data-transformation-design
description: "Design and verify backend source-to-response data transformations for APIs, services, integrations, analytics endpoints, reports, exports, and adapters. Use when source files, database rows, upstream APIs, event payloads, or mocks do not match the target API/consumer contract, including date/period normalization such as YYYYMMDD to YYYYMM, aggregation grain changes, field renames, enum mapping, unit conversion, derived formulas, precision, default-fill behavior, sorting, grouping, reconciliation, and sample-based verification."
---

# Backend Data Transformation Design

## Overview

Use this skill independently when backend/API work needs shaped data rather than raw source rows or raw upstream payloads. The service or adapter layer owns the transformation from source model to target response contract whenever consumers expect a different field shape, period grain, unit, enum label, formula, nesting, ordering, or aggregation.

Typical inputs are source data, data models, database rows, upstream payloads, event schemas, API response expectations, frontend/prototype contracts, metric formulas, and sample rows. The output is a source-to-target transformation mapping with verification samples.

## Core Workflow

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

6. Define business derivations.
   Write formulas for rates, gaps, scores, status, risk level, aging, contribution, YoY/MoM, and other derived fields.

7. Add verification samples.
   Every non-trivial transformation needs at least one input-to-output sample, focused test, or runtime assertion.

## References

- Read [references/01-boundary-and-mapping.md](references/01-boundary-and-mapping.md) when defining the source, target, grain, field mapping, required status, defaults, and missing fields.
- Read [references/02-time-aggregation-derivation.md](references/02-time-aggregation-derivation.md) when handling period conversion, aggregation, formulas, ranking, totals, and reconciliation.
- Read [references/03-implementation-and-verification.md](references/03-implementation-and-verification.md) when placing transformation logic in code and creating samples/tests.

## Verification Checklist

- Target response fields match the API/consumer contract.
- Every renamed, converted, aggregated, derived, rounded, filled, or sorted field has a documented rule.
- Source quality assumptions and malformed/duplicate/late data handling are documented or captured as missing information.
- Date/period examples such as `YYYYMMDD -> YYYYMM` are verified by sample, test, or runtime evidence.
- Aggregates, totals, counts, and derived KPIs reconcile with source rows.
- Unknown rules are captured in missing-information documentation, using `$backend-missing-info-management` when available.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
