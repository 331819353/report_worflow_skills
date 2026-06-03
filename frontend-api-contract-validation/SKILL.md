---
name: frontend-api-contract-validation
description: "用于前端接入数据前验证数据源/API契约，尤其在替换mock、联调前提前介入。用户提到前端接口契约、API字段校验、响应字段、嵌套结构、类型、单位、精度、枚举、分页、排序、筛选、空态、错误态、loading、鉴权头、REST/GraphQL/BFF/SDK/本地JSON/实时数据接入、样例响应核对时触发，确认前端可安全接入。"
---

# Frontend API Contract Validation

## Positioning

Use this skill independently or from a larger frontend workflow before replacing frontend mock data and again after wiring runtime data. The goal is to prove that a data provider can satisfy the current UI contract, not merely that an endpoint or file returns JSON.

This skill is not bound to 数据服务. It covers HTTP APIs, BFFs, GraphQL, SDK/client calls, static JSON/files, generated fixtures, realtime feeds, and already implemented data-source modules. When 数据服务/API文档 exists, use it as authoritative provider evidence.

## Reference Map

- Read `references/source-contract-types.md` when deciding what kind of provider evidence is available.
- Read `references/comparison-checklist.md` for field, request, state, and interaction checks.
- Read `references/contract-note-template.md` when producing the handoff note.

## Workflow

1. Collect the frontend UI contract.
   Identify mock/static source files, consuming components/pages, current view model fields, filters, route params, pagination, sorting, table columns, chart series, empty states, and interaction payloads.

2. Collect provider evidence.
   Use API docs, sample responses, schema files, SDK types, static files, network traces, data-source registry entries, or implementation code depending on the provider type.

3. Compare field by field.
   Check required fields, optional fields, nesting, array/object shape, type, unit, precision, enum/status values, date/period format, sort order, and empty-state shape.

4. Compare request behavior.
   Ensure UI state maps to documented query/path/body params: filters, date ranges, organization selectors, keyword search, pagination, sorting, drilldown params, export params, and route params.

5. Decide adapter, implementation, or blocker status.
   If differences are safe, document the response adapter. If data is missing or endpoint behavior is unclear, mark it as a blocker or missing information instead of hiding it inside component code.

6. Validate after implementation.
   Use browser network results, SDK/file traces, mock comparison, or saved sample responses to confirm the wired page receives the expected shape and handles empty/error/loading/auth states.

## Required Output

Produce a compact contract note using `references/contract-note-template.md`.

## Verification Checklist

- Every mock/static source replaced by runtime data has provider evidence and request/query/input mapping.
- No frontend-required field is missing without a documented adapter or blocker.
- Pagination, sorting, filters, drilldown, refresh, and export use documented params.
- Empty, failed, unauthorized, no-permission, and loading states have expected shapes.
- Auth headers or client credentials such as `Application-Key`, `Access-Token`, cookies, app keys, or SDK init values are included when required.
