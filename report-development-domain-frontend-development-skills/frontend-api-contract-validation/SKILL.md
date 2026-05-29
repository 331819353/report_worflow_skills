---
name: frontend-api-contract-validation
description: "Validate whether documented or implemented backend APIs can replace frontend mock/static data. Use when mapping mock data to HTTP APIs, checking endpoint availability, request params, response fields, nesting, types, units, precision, enum/status values, pagination, sorting, filters, empty/error/loading states, auth headers, and sample responses before or during frontend integration."
---

# Frontend API Contract Validation

## Overview

Use this skill before replacing frontend mock data and again after wiring requests. The goal is to prove that an API can satisfy the current UI contract, not merely that the endpoint returns JSON.

This skill is usually called by `$frontend-development-workflow` during mock inventory, API mapping, and final联调.

## Workflow

1. Collect the frontend contract.
   Identify mock source files, consuming components/pages, current view model fields, filters, route params, pagination, sorting, table columns, chart series, empty states, and interaction payloads.

2. Collect the API contract.
   Read API docs, sample responses, request parameters, auth headers, error envelope, pagination/sort/filter rules, and backend base URL/proxy requirements.

3. Compare field by field.
   Check required fields, optional fields, nesting, array/object shape, type, unit, precision, enum/status values, date/period format, sort order, and empty-state shape.

4. Compare request behavior.
   Ensure UI state maps to documented query/path/body params: filters, date ranges, organization selectors, keyword search, pagination, sorting, drilldown params, export params, and route params.

5. Identify adapter or blocker decisions.
   If differences are safe, document the response adapter. If data is missing or endpoint behavior is unclear, mark it as a blocker or missing information instead of hiding it inside component code.

6. Validate after implementation.
   Use browser network results, mock comparison, or saved sample responses to confirm the wired page receives the documented shape and handles empty/error/loading/auth states.

## Required Output

Produce a compact contract note:

- Mock source and consumer:
- Endpoint:
- Request mapping:
- Response field mapping:
- Adapter needed:
- Empty/error/auth behavior:
- Contract status: pass / partial / blocked
- Missing information:

## Verification Checklist

- Every mock source replaced by API has an endpoint and request mapping.
- No frontend-required field is missing without a documented adapter or blocker.
- Pagination, sorting, filters, drilldown, refresh, and export use documented params.
- Empty, failed, unauthorized, no-permission, and loading states have expected shapes.
- Auth headers such as `Application-Key` and `Access-Token` are included when required.
