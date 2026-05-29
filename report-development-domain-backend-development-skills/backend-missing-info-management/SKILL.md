---
name: backend-missing-info-management
description: "Create, update, and validate missing-information documentation for backend/data-service/API work. Use when data sources, fields, business definitions, source-to-response transformation rules, enum dictionaries, formulas, filter options, auth headers, environment config, deployment values, performance limits, or frontend contract decisions are missing, ambiguous, temporary, or assumed."
---

# Backend Missing Info Management

## Overview

Use this skill to make backend assumptions visible and actionable. Any unresolved data, model, transformation, API, auth, config, deployment, or performance issue should be documented instead of being buried in code, comments, or final prose.

This skill is usually called by `$backend-development-workflow` during data analysis, transformation design, API contract validation, and final handoff.

## Workflow

1. Collect missing or assumed items.
   Scan data-source analysis, raw/response models, transformation mappings, API contracts, tests, auth setup, config, deployment, and frontend/mock alignment. Treat temporary defaults as missing information until confirmed.

2. Classify the gap.
   Use areas such as data source, data model, transformation, API contract, frontend compatibility, auth/config, deployment, performance, or business definition.

3. Record impact and current handling.
   For each item, state what can go wrong, what the current implementation does, whether it is safe for demo/local use, and what will need to change after confirmation.

4. Add owner or confirmation question.
   Write a concrete question for the data owner, backend owner, frontend owner, or product/business owner. Avoid vague notes like "need confirm"; say exactly what must be confirmed.

5. Keep assumptions consistent.
   Temporary rules must match across implementation defaults, API documentation, tests/samples, and the missing-information document.

6. Close or update items.
   When a decision is received, update the resolution log and any affected code/API docs/tests.

## Document Location

Prefer `docs/missing-info.md`. If the project has no docs folder, use `MISSING_INFO.md`. For a template, use `references/missing-info-template.md` from `$backend-development-workflow`.

## Required Categories

- Data source gaps: missing files/tables, malformed rows, refresh cadence, authoritative source, join keys.
- Data model gaps: missing fields, unknown types, nullable rules, IDs, enum dictionaries, units, precision.
- Transformation gaps: date/period conversion, aggregation, formulas, unit conversion, rounding, default-fill, sorting/grouping.
- API contract gaps: params, pagination, sorting, filters, response examples, errors, upload/download, frontend compatibility.
- Auth/config/deployment gaps: SSO values, headers, environment variables, ports, CORS/proxy, credentials, network.
- Performance gaps: page limits, export limits, cache/precompute, timeout, retry, large-data handling.

## Verification Checklist

- A missing-information document exists even when there are no known missing items.
- Every temporary default in code appears in the document with the same rule and fallback behavior.
- Every unresolved transformation or API contract mismatch has impact, current handling, owner/question, and status.
- Resolved items include a resolution log entry and the affected docs/code/tests are updated.
