---
name: backend-development-workflow
description: "Run the end-to-end backend development workflow for requests containing backend-development intent or keywords such as 后端, 数据服务, 接口, API, 服务端, Flask, 数据接口, 接口文档, 后台服务, backend, data service, or API service. Use when Codex must inspect input files, identify data sources, infer raw and response data models, transform source data into frontend/API display contracts, design final APIs with request and response contracts, output API documentation plus missing-information documentation, implement in the existing backend stack or default to Python Flask only for new unconstrained services, integrate default SSO when authentication is not explicitly disabled, start the backend service after development, and return a runnable local URL."
---

# Backend Development Workflow

## Overview

Use this skill as the top-level workflow for backend development. The backend may receive user-provided files, generated mock files, database exports, API samples, configuration files, or frontend contract files; always analyze these inputs before designing APIs or writing Flask code.

The required output is not only a running backend. It must include a clear data-source analysis, raw data-model analysis, source-to-response transformation rules with verification samples, final API list, request and response contracts, frontend/mock contract alignment notes, an API document, and a missing-information document. Use [references/api-document-template.md](references/api-document-template.md) for API docs and [references/missing-info-template.md](references/missing-info-template.md) for unresolved data/API/business gaps.

Use the backend specialty skills as guardrails inside this workflow:

- Use `$backend-data-transformation-design` when source data must be converted, aggregated, renamed, normalized, derived, rounded, or filled before becoming an API response.
- Use `$backend-api-contract-validation` when implemented endpoints must replace frontend mock data or prove compatibility with a documented frontend/API display contract.
- Use `$backend-missing-info-management` whenever a source field, business definition, transformation rule, enum, filter option, auth/config value, deployment value, performance limit, or contract decision is missing, ambiguous, temporary, or assumed.

## Default Flow

1. Discover the project context.
   Inspect the repository structure, existing backend code, dependency files, frontend API calls, mock data, documentation, and supplied files. Prefer `rg` and targeted file reads. If a backend already exists, follow its language, framework, routing style, dependency manager, config pattern, auth middleware, tests, and deployment structure before introducing new layout. Default to Flask only for a new service with no existing stack or explicit user constraint.

2. Inventory received files.
   List each relevant file, format, purpose, key fields, sample records, encoding, update frequency if known, and whether it is an input source, derived output, config, fixture, or documentation. For spreadsheets, CSV, JSON, YAML, SQL, and text files, inspect enough content to infer schema and relationships.

3. Analyze data sources.
   Identify where each API's data comes from: uploaded files, local static files, generated mock data, database tables, third-party APIs, SSO identity, environment config, or computed aggregates. Mark the authoritative source, raw field shape, join keys, filter dimensions, refresh strategy, and fallback behavior for empty or malformed data.

4. Analyze data models.
   Produce entity models before coding. For each model, define raw source fields, API response fields, types, required status, enum values, relationships, IDs, time fields, validation rules, derived fields, and sample objects. Separate the upstream/source model from the frontend-facing response model when their shapes differ.

5. Define source-to-response transformations.
   Compare source data, data models, mock data, and frontend display expectations before designing the final response. If the source shape differs from the mock/API display shape, define deterministic transformations in the backend service or schema layer. Examples include converting `YYYYMMDD` source dates to `YYYYMM` period fields, aggregating daily rows into monthly rows, renaming fields, mapping enum codes to labels, converting units, calculating completion/gap/rate fields, rounding precision, filling missing display fields, and sorting/grouping rows. Do not expose raw upstream formats just because they are easier to read; the API should return the documented contract expected by the frontend.
   For every non-trivial transformation, define at least one verification sample or focused test case: input row(s), request params, expected response field(s), and reconciliation notes. Date conversion, aggregation grain, derived formulas, enum mapping, unit conversion, rounding, and default-fill behavior must be testable, not only described.
   Use `$backend-data-transformation-design` for this stage when any source-to-response conversion is needed.

6. Design the final APIs.
   Generate the complete endpoint list before implementation. For every endpoint define method, path, purpose, auth requirement, query/path/body parameters, response schema, error shape, pagination/sorting/filter rules, and example request/response. Include file upload/download endpoints when the backend receives or returns files. For endpoints replacing frontend mock data, perform field-level alignment against the mock/display contract: required fields, field names, nesting, list shape, empty-state shape, units, precision, sort order, and filter option values must match or have a documented adapter decision.
   Use `$backend-api-contract-validation` to compare endpoint contracts against frontend mock/display expectations before implementation and again after implementation.

7. Apply authentication defaults.
   If the service has any authenticated flow and the user has not explicitly disabled SSO, use SSO by default. When Haier IAMA SSO is needed, use `$haier-iama-backend-sso`: first exchange code through `{baseUrl}/api/oauth/code/get/v2`, then validate users in later jumps, page changes, route transitions, and business API requests through `{baseUrl}/api/oauth/token/check`. Business endpoints should read frontend headers `Application-Key` and `Access-Token`, validate them through IAMA, allow valid requests, and return 401/token-invalid for invalid tokens so the frontend can re-trigger SSO.

8. Implement in the project-native backend stack.
   Use the existing backend framework when one is present, such as Flask, FastAPI, Django, Spring Boot, Express, NestJS, or another project-native service stack. For a new unconstrained Python service, use Flask as the default. Keep the implementation small but production-shaped: app factory or clear app entry, route modules, service layer, data access/parsing layer, schemas or validation helpers, consistent error responses, CORS if the frontend requires it, and environment-based config. Put raw parsing in `repositories/`, business aggregation and source-to-response transformations in `services/`, and final response shaping/validation in `schemas/` or response DTO helpers.

9. Output API and missing-information documentation.
   Create or update a project API document, usually `docs/api.md` or `API.md` if the repo has no docs convention. The document must match the implemented endpoints and include data source/model summaries, source-to-response transformation rules, endpoint contracts, auth notes, examples, performance constraints, and startup instructions. Also create or update a missing-information document, usually `docs/missing-info.md` or `MISSING_INFO.md`, that records every unresolved or assumed item discovered during data source analysis, model conversion, source-to-response transformation, API design, SSO integration, and deployment.
   Any temporary assumption must be consistent across code defaults, API documentation, and the missing-information document. Do not let an assumption exist only in code or only in prose.
   Use `$backend-missing-info-management` for the missing-information document and for assumption consistency checks.

10. Verify and start the backend.
   Run focused tests or smoke checks where available, including transformation samples and at least one API response comparison against the frontend mock/display shape when mock replacement is part of the task. After development, start the backend in the background on an available port, then return the local URL. Do not end with only code changes unless startup is blocked; if blocked, state the exact blocker.
   Use `$backend-api-contract-validation` for the final response-contract smoke check before handoff.

## Implementation Defaults

Prefer the repository's existing backend structure. For new Flask services when the repository has no stronger convention, use this layout:

```text
backend/
  app.py
  requirements.txt
  src/
    __init__.py
    config.py
    routes/
    services/
    repositories/
    schemas/
    errors.py
  data/
  docs/
```

Use these conventions:

- `routes/` owns HTTP paths and request parsing.
- `services/` owns business logic, aggregation, SSO orchestration, source-to-response transformations, and model conversion.
- `repositories/` owns file, database, or external API access.
- `schemas/` owns request validation, response shaping, and response contract validation.
- `errors.py` owns shared error responses.
- `data/` stores local sample data or parsed fixtures only when the project needs file-backed behavior.

For small prototypes, a flatter layout is acceptable, but keep data parsing, business logic, and routes separated enough that API contracts remain clear.

## Response Contract And Transformation Testing

When a backend replaces frontend mock data, treat the mock/display shape as an explicit response contract until the user or API docs replace it. Validate:

- Field-level compatibility: all frontend-required fields exist with the expected names, nesting, types, units, precision, and empty-state shape.
- Transformation samples: every date/period conversion, aggregation, formula, enum mapping, unit conversion, rounding rule, and default-fill rule has at least one input-to-output example or test.
- Reconciliation: aggregates, totals, counts, and derived KPIs can be traced back to source rows and formulas.
- Performance boundary: define pagination defaults, maximum page size, result limits, cache/precompute strategy, refresh cadence, and timeout behavior for large files, database tables, or expensive aggregations.
- Assumption consistency: any temporary default or unconfirmed rule appears in code, API docs, and the missing-information document with the same wording and fallback behavior.

## Required Analysis Output

Before or alongside the implementation, produce these sections in the work product or API document:

- `Input Files`: file name, format, role, key fields, sample size, and parsing notes.
- `Data Sources`: source name, source type, owner/upstream, freshness, auth need, join keys, and failure fallback.
- `Data Models`: raw model name, response model name, field tables, relationships, validations, and example JSON.
- `Transformation Mapping`: source fields to response fields, date/period normalization, aggregation grain, unit conversion, enum mapping, derived formulas, rounding, and fill/default behavior.
- `API Inventory`: method, path, purpose, auth, data source, and response model.
- `API Contracts`: detailed input/output schemas and examples.
- `Missing Information`: unresolved fields, ambiguous business definitions, missing dimensions/options, unknown transformation rules, unavailable source data, auth/config gaps, current assumptions, impact, fallback behavior, and questions for confirmation.
- `Contract Verification`: mock/display contract comparison, transformation test samples, reconciliation checks, and performance limits.
- `Startup`: dependency install command, run command, port, and health check URL.

## Verification Checklist

Use this checklist before final response:

- Every implemented endpoint appears in the API document.
- A missing-information document exists even when all items are resolved; in that case it should explicitly say there are no known missing items.
- Every API response can be traced to a data source and data model.
- Every endpoint replacing mock data has a field-level response comparison against the mock/display contract.
- Every API response field that differs from the source model has a documented transformation rule and a tested example, such as `YYYYMMDD -> YYYYMM`.
- Aggregation grain is explicit: daily-to-monthly, row-to-summary, multi-table join, and derived KPI calculations reconcile with the response examples.
- Missing source fields, unclear metric formulas, unknown enum mappings, unavailable filter option values, unconfirmed date/period conversion rules, and temporary defaults are captured in the missing-information document instead of being silently buried in code.
- Temporary assumptions are consistent across implementation defaults, API documentation, and missing-information documentation.
- Large-result behavior is defined: pagination, maximum page size, cache/precompute strategy when needed, timeout behavior, and file/database failure handling.
- Required request params and body fields are validated.
- File parsing handles missing files, empty files, malformed rows, and unsupported formats.
- Authenticated flows use SSO by default unless explicitly disabled.
- Flask starts successfully in the background, or the blocker is stated clearly.
- The final answer includes the backend URL when startup succeeds.
