---
name: frontend-response-adapter-design
description: "Design frontend data adapters that convert provider payloads into stable UI view models. Use when REST, GraphQL, BFF, SDK, static files, local data modules, realtime feeds, or backend API responses differ from existing mock/component props in fields, nesting, enum values, units, precision, date formats, nullability, pagination envelopes, stream events, or error shapes. Data service is optional; keep adapters provider-aware and components UI-stable."
---

# Frontend Response Adapter Design

## Positioning

Use this skill independently when provider payloads differ from the existing UI/mock shape. The frontend should keep visual components stable and place conversion logic in a service, composable, store, data-source resolver, selector, or adapter layer.

This skill is not bound to 数据服务. It applies equally to backend APIs, BFFs, GraphQL, SDKs, local files, generated fixtures, and realtime feeds.

## Reference Map

- Read `references/adapter-placement-patterns.md` to choose where adapter logic should live.
- Read `references/mapping-resilience-rules.md` for conversion, fallback, and type-safety rules.
- Read `references/adapter-output-template.md` when producing the adapter design note.

## Workflow

1. Identify stable UI view models.
   Record the shape currently consumed by components: field names, units, formatting expectations, table columns, chart series, KPI card props, empty-state inputs, and interaction payloads.

2. Identify provider payload shape.
   Record response envelope or data path, pagination metadata, event structure, field names, nesting, nullability, enum/status values, date/period fields, units, precision, and error shape.

3. Design adapter functions.
   Convert provider rows/events into UI view models near the data boundary. Keep components from knowing provider-specific names unless the project already uses that pattern.

4. Handle resilience.
   Normalize optional fields, empty arrays, nulls, missing values, enum fallbacks, precision, unit labels, and malformed rows without crashing the page. Record unsafe assumptions as missing information.

5. Keep provider and UI types together.
   In TypeScript projects, define provider DTO/event types and UI view model types close to adapter functions or shared type modules. Avoid `any` where field mapping is important.

6. Verify adapters.
   Add sample tests or smoke checks for representative success, empty, partial, and malformed responses.

## Required Output

Produce an adapter design note using `references/adapter-output-template.md`.

## Verification Checklist

- Components receive stable view models after mock replacement.
- Provider DTO/event/file shape and UI view model differences are explicit.
- Null, empty, missing optional fields, and enum fallback behavior are handled.
- Pagination metadata and list data are normalized consistently.
- Adapter behavior is covered by sample checks, tests, or browser smoke verification.
