---
name: backend-api-contract-validation
description: "Validate backend API contracts against frontend mock/display expectations, API documentation, and implemented responses. Use when replacing mock data with real backend APIs, checking response fields, nesting, types, units, precision, empty-state shape, pagination, sorting, filtering, error contracts, transformation samples, and performance limits before frontend integration or handoff."
---

# Backend API Contract Validation

## Overview

Use this skill to prevent backend APIs from being technically valid but unusable by the frontend. The contract is not only a route and JSON schema; it includes the frontend/mock display shape, filter behavior, empty states, errors, pagination, sorting, transformations, and performance boundaries.

This skill is usually called by `$backend-development-workflow` after API implementation and before startup handoff or frontend联调.

## Workflow

1. Collect contracts to compare.
   Read frontend mock data, existing API calls, API documentation, route implementation, serializers/DTOs, and sample responses. If contracts conflict, identify the authoritative one or record the conflict as missing information.

2. Compare response shape field by field.
   Check required fields, optional fields, nesting, array/object shape, type, unit, precision, enum values, date/period format, sort order, and empty-state response shape.

3. Validate request behavior.
   Check query/path/body params, filter names, default values, pagination, sorting, search, date ranges, permissions, and invalid-param errors.

4. Validate transformation samples.
   For each source-to-response rule from `$backend-data-transformation-design`, confirm at least one sample request returns the expected transformed response.

5. Validate errors and auth.
   Check error envelope, HTTP status, business code, message, auth failure, token-invalid behavior, no-permission behavior, and upstream/data-source failure behavior.

6. Validate performance and scale.
   Check default page size, maximum page size, export limit, timeout behavior, cache/precompute strategy, and large result handling.

## Required Output

Produce a compact contract validation note in the API document or task response:

- Endpoint:
- Frontend/mock source:
- Contract status: pass / partial / fail
- Field differences:
- Request/filter differences:
- Transformation sample results:
- Empty/error/auth results:
- Performance limits:
- Remaining missing information:

## Verification Checklist

- Every endpoint replacing mock data has a mock/display comparison.
- No frontend-required field is missing or renamed without a documented adapter decision.
- Empty, no-data, invalid-param, unauthenticated, and no-permission responses match the frontend's expected handling.
- Pagination, sorting, filters, and exports use the same parameter names and defaults documented for the frontend.
- Contract failures are fixed or captured by `$backend-missing-info-management`.
