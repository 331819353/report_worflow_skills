---
name: frontend-response-adapter-design
description: "Design frontend response adapters that convert backend API responses into stable UI view models. Use when API fields, nesting, enum values, units, precision, date formats, nullability, pagination envelopes, or error shapes differ from the existing mock/component props, and the frontend needs a service/composable/store adapter instead of rewriting visual components."
---

# Frontend Response Adapter Design

## Overview

Use this skill when backend responses differ from the existing UI/mock shape. The frontend should keep visual components stable and place conversion logic in a service, composable, store, data-source resolver, or adapter layer.

This skill is usually called by `$frontend-development-workflow` after API contract validation and before changing pages/components.

## Workflow

1. Identify stable UI view models.
   Record the shape currently consumed by components: field names, units, formatting expectations, table columns, chart series, KPI card props, empty-state inputs, and interaction payloads.

2. Identify API response shape.
   Record response envelope, data path, pagination metadata, field names, nesting, nullability, enum/status values, date/period fields, units, precision, and error shape.

3. Design adapter functions.
   Convert API rows into UI view models near the request/service layer. Keep components from knowing backend-specific names unless the project already uses that pattern.

4. Handle resilience.
   Normalize optional fields, empty arrays, nulls, missing values, enum fallbacks, precision, unit labels, and malformed rows without crashing the page. Record unsafe assumptions as missing information.

5. Keep request and response types together.
   In TypeScript projects, define API DTO types and UI view model types close to service functions or shared type modules. Avoid `any` where field mapping is important.

6. Verify adapters.
   Add sample tests or smoke checks for representative success, empty, partial, and malformed responses.

## Implementation Rules

- Prefer service/composable/store/data-source adapter layers over conversion inside visual components.
- Keep chart/table/card props stable unless a narrow refactor is clearly safer.
- Do not duplicate the same mapping in multiple components.
- Keep formatting that is purely visual in the component, but keep semantic conversion, enum mapping, unit conversion, and aggregation in the adapter or service layer.
- Remove stale mock imports after the adapter fully replaces them.

## Verification Checklist

- Components receive stable view models after mock replacement.
- API DTO and UI view model differences are explicit.
- Null, empty, missing optional fields, and enum fallback behavior are handled.
- Pagination metadata and list data are normalized consistently.
- Adapter behavior is covered by sample checks, tests, or browser smoke verification.
