---
name: backend-development-workflow
description: "Run the end-to-end backend development workflow for requests containing backend-development intent or keywords such as 后端, 数据服务, 接口, API, 服务端, Flask, 数据接口, 接口文档, 后台服务, backend, data service, or API service. Use when Codex must inspect input files, identify data sources, infer data models, design final APIs with request and response contracts, output API documentation, implement a Python Flask backend, integrate default SSO when authentication is not explicitly disabled, start the backend service after development, and return a runnable local URL."
---

# Backend Development Workflow

## Overview

Use this skill as the top-level workflow for backend development. The backend may receive user-provided files, generated mock files, database exports, API samples, configuration files, or frontend contract files; always analyze these inputs before designing APIs or writing Flask code.

The required output is not only a running backend. It must include a clear data-source analysis, data-model analysis, final API list, request and response contracts, and an API document. Use [references/api-document-template.md](references/api-document-template.md) as the default documentation shape.

## Default Flow

1. Discover the project context.
   Inspect the repository structure, existing backend code, dependency files, frontend API calls, mock data, documentation, and supplied files. Prefer `rg` and targeted file reads. If a backend already exists, follow its structure before introducing new layout.

2. Inventory received files.
   List each relevant file, format, purpose, key fields, sample records, encoding, update frequency if known, and whether it is an input source, derived output, config, fixture, or documentation. For spreadsheets, CSV, JSON, YAML, SQL, and text files, inspect enough content to infer schema and relationships.

3. Analyze data sources.
   Identify where each API's data comes from: uploaded files, local static files, generated mock data, database tables, third-party APIs, SSO identity, environment config, or computed aggregates. Mark the authoritative source, join keys, filter dimensions, refresh strategy, and fallback behavior for empty or malformed data.

4. Analyze data models.
   Produce entity models before coding. For each model, define fields, types, required status, enum values, relationships, IDs, time fields, validation rules, derived fields, and sample objects. Keep model names and field names consistent with the received files and existing frontend expectations.

5. Design the final APIs.
   Generate the complete endpoint list before implementation. For every endpoint define method, path, purpose, auth requirement, query/path/body parameters, response schema, error shape, pagination/sorting/filter rules, and example request/response. Include file upload/download endpoints when the backend receives or returns files.

6. Apply authentication defaults.
   If the service has any authenticated flow and the user has not explicitly disabled SSO, use SSO by default. When Haier IAMA SSO is needed, use `$haier-iama-backend-sso`: first exchange code through `{baseUrl}/api/oauth/code/get/v2`, then validate users in later jumps, page changes, and route transitions through `{baseUrl}/api/oauth/token/check`.

7. Implement with Flask as the primary framework.
   Use Python Flask unless the user explicitly asks for a different backend stack. Keep the implementation small but production-shaped: app factory or clear app entry, route modules, service layer, data access/parsing layer, schemas or validation helpers, consistent error responses, CORS if the frontend requires it, and environment-based config.

8. Output API documentation.
   Create or update a project API document, usually `docs/api.md` or `API.md` if the repo has no docs convention. The document must match the implemented endpoints and include data source/model summaries, endpoint contracts, auth notes, examples, and startup instructions.

9. Verify and start the backend.
   Run focused tests or smoke checks where available. After development, start the Flask backend in the background on an available port, then return the local URL. Do not end with only code changes unless startup is blocked; if blocked, state the exact blocker.

## Flask Implementation Defaults

Prefer this layout for new services when the repository has no stronger convention:

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
- `services/` owns business logic, aggregation, SSO orchestration, and model conversion.
- `repositories/` owns file, database, or external API access.
- `schemas/` owns request validation and response shaping.
- `errors.py` owns shared error responses.
- `data/` stores local sample data or parsed fixtures only when the project needs file-backed behavior.

For small prototypes, a flatter layout is acceptable, but keep data parsing, business logic, and routes separated enough that API contracts remain clear.

## Required Analysis Output

Before or alongside the implementation, produce these sections in the work product or API document:

- `Input Files`: file name, format, role, key fields, sample size, and parsing notes.
- `Data Sources`: source name, source type, owner/upstream, freshness, auth need, join keys, and failure fallback.
- `Data Models`: model name, field table, relationships, validations, and example JSON.
- `API Inventory`: method, path, purpose, auth, data source, and response model.
- `API Contracts`: detailed input/output schemas and examples.
- `Startup`: dependency install command, run command, port, and health check URL.

## Verification Checklist

Use this checklist before final response:

- Every implemented endpoint appears in the API document.
- Every API response can be traced to a data source and data model.
- Required request params and body fields are validated.
- File parsing handles missing files, empty files, malformed rows, and unsupported formats.
- Authenticated flows use SSO by default unless explicitly disabled.
- Flask starts successfully in the background, or the blocker is stated clearly.
- The final answer includes the backend URL when startup succeeds.
