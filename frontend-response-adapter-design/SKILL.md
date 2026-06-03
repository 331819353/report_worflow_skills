---
name: frontend-response-adapter-design
description: "用于设计前端响应适配器，把不同数据源载荷转换为稳定UI视图模型。用户提到response adapter、响应适配、字段改名、嵌套拉平、枚举翻译、单位/精度/日期格式转换、null默认值、分页包裹、错误结构、REST/GraphQL/BFF/SDK/本地JSON/实时流接入、mock结构与真实接口不一致、组件props不想改时触发。"
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
