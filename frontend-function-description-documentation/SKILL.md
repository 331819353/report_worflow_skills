---
name: frontend-function-description-documentation
description: "用于生成前端功能说明/交付说明，服务测试、验收、运维和二次开发。用户提到前端功能说明、页面功能清单、交付文档、测试依据、验收说明、维护文档、路由模块说明、数据来源、接口/SDK/静态数据映射、筛选交互、组件行为、指标单位/百分比显示、运行验证、已知问题、阻塞项时触发；不做运行QA本身。"
---

# Frontend Function Description Documentation

## Positioning

Use this skill independently after frontend implementation, API/data-source integration, or runtime validation when the required output includes 前端功能说明. The document should help testers, reviewers, business owners, and maintainers understand what the frontend does and what behavior should be verified.

This skill is not bound to 数据服务. If data-service APIs exist, document them. If the page uses SDKs, static files, local fixtures, GraphQL, generated data modules, or realtime feeds, document those provider bindings instead.

## Reference Map

- Read `$quality-gate-validation` for artifact readability and extractable contract checks.
- Use `$delivery-artifact-template-management` to choose the frontend function description output structure.
- Read `references/feature-inventory-fields.md` for page/module and provider-binding fields.
- Read `references/handoff-quality-checklist.md` before finalizing the document.

## Inputs

- Frontend source project or changed files.
- API documentation, SDK/static-data notes, data-source mapping notes, or provider contract notes.
- Prototype source or original mock contract, if relevant.
- Runtime QA notes, build/startup result, screenshots, or known blockers.

## Workflow

1. Identify scope.
   List pages, routes, menus, tabs, drawers, modals, exports, and major components included in the current frontend delivery.

2. Extract functional behavior.
   For each page/module, describe user purpose, visible controls, filters, data display, interactions, drilldowns, refresh, export/download, empty/error/loading states, and permission behavior.

3. Map data providers to features.
   Link each functional module to endpoint names/paths, SDK calls, static files, GraphQL operations, data-source IDs, request params, response adapter, displayed fields, raw/display value rules, and metric units. Do not repeat the whole provider document; reference it and summarize the frontend binding.

4. Record data and filter behavior.
   Explain default filters, option sources, cascades, reset behavior, pagination, sorting, search, cross-component linkage, state persistence, and which visible component values/rows/series should change for non-default filters. Mark invariant components and retained mock/offline data explicitly.

5. Record interaction behavior.
   Cover chart clicks, KPI/card clicks, table row actions, drawer/modal content, page jumps, parameter passing, back behavior, fullscreen, download, and refresh.

6. Record verification and limitations.
   Include commands run, URL verified, browser/runtime checks, known blockers, intentionally retained mock/offline data, and features not covered.

## Required Output

Produce the function description using the standard frontend function document structure from `$delivery-artifact-template-management`.

## Quality Checklist

- Testers can derive test cases from the function description without rereading source code.
- Each data-backed feature names its provider, source file, SDK call, endpoint, or document section.
- Filters, interactions, permissions, edge states, and exports are not omitted.
- Displayed metric units, percentage/rate scaling, rounding, and forbidden display terms are documented when KPI/chart/table values contain rates or changes.
- Filter binding evidence is clear enough for testers to verify more than selected-state changes.
- Stale prototype wording, mock-only behavior, and temporary assumptions are clearly marked.
- The document distinguishes implemented behavior from blocked, deferred, or not-tested behavior.
