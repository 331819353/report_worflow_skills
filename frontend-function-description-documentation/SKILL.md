---
name: frontend-function-description-documentation
description: "用于生成前端功能说明/交付说明，服务测试、验收、运维和二次开发。用户提到前端功能说明、页面功能清单、交付文档、测试依据、验收说明、维护文档、路由模块说明、数据来源、接口/SDK/静态数据映射、筛选前数据完整性、筛选交互、组件行为、指标单位/百分比显示、运行验证、已知问题、阻塞项时触发；不做运行QA本身。"
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
- Read `$code-change-ledger-management` and changed-file sidecar ledgers when the function description must include feature inventory, code ranges, modified content, or version traceability.
- Read `$metric-number-display-contract` when documenting metric units, percentage/rate scaling, rounding, tooltip/export precision, or formatter ownership.
- Read `$haier-enterprise-app-ui-design-spec` when documenting Haier/enterprise application pages, including report applications, so testers can verify page shell, standard components, tokens, typography, color, spacing, states, feedback, brand/logo, and cross-platform behavior against the company UI baseline.
- Read `$report-design-system-governance` `references/03-report-development-guidelines-index.md` and relevant report guideline reference(s) when documenting report/dashboard/BI/data-screen/analysis pages so testers can verify metric口径, layout hierarchy, chart/table formatting, filters, states, performance, export, and acceptance.

## Inputs

- Frontend source project or changed files.
- Code file sidecar ledgers under `__change_logs__`, when available.
- API documentation, SDK/static-data notes, data-source mapping notes, or provider contract notes.
- Prototype source or original mock contract, if relevant.
- Runtime QA notes, build/startup result, screenshots, or known blockers.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Identify scope.
   List pages, routes, menus, tabs, drawers, modals, exports, and major components included in the current frontend delivery.

2. Classify the UI/design baseline.
   Mark each page/module as Haier/enterprise app, report/dashboard, or mixed. For Haier/enterprise report pages, record both inherited Haier application baseline and report-specific baseline as part of the test and acceptance basis.

3. Extract functional behavior.
   For each page/module, describe user purpose, visible controls, control semantics, filters, data display, interactions, drilldowns, refresh, export/download, empty/error/loading states, and permission behavior.

4. Extract code traceability from sidecar ledgers.
   For changed frontend/prototype code files, read their `__change_logs__/<file>.changes.md` files and summarize feature list, functional code ranges, modified content, affected contracts, version entries, verification, and rollback notes. Mark missing ledgers as handoff gaps instead of reconstructing history from memory.

5. Map data providers to features.
   Link each functional module to endpoint names/paths, SDK calls, static files, GraphQL operations, data-source IDs, request params, response adapter, displayed fields, raw/display value rules, and metric units. Do not repeat the whole provider document; reference it and summarize the frontend binding.

6. Record control, data, and filter behavior.
   Explain control semantics first, then data completeness before filter binding, then filter behavior. For every perspective switch, record `componentSchemaImpact` and the expected metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels for default and non-default perspectives. For every affecting filter, record option sources, default data, non-default data or response branch, required fields, empty/no-permission state when relevant, cascades, reset behavior, pagination, sorting, search, cross-component linkage, state persistence, and which visible component values/rows/series should change for non-default filters. Mark invariant components and retained mock/offline data explicitly.
   When perspective navigation shows percentages, rankings, or status lights, document `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`. Also document cross-perspective consistency checks across navigation percentages, overview KPIs, journey cards, and chart summaries, including at least one field-level assertion.

7. Record interaction behavior.
   Cover chart clicks, KPI/card clicks, table row actions, drawer/modal content, page jumps, parameter passing, back behavior, fullscreen, download, and refresh.

8. Record verification and limitations.
   Include commands run, URL verified, browser/runtime checks, known blockers, intentionally retained mock/offline data, and features not covered.

## Required Output

Produce the function description using the standard frontend function document structure from `$delivery-artifact-template-management`.

## Quality Checklist

- Testers can derive test cases from the function description without rereading source code.
- Feature inventory and code ranges are sourced from sidecar code ledgers when code changed; missing ledgers are listed as gaps.
- Each data-backed feature names its provider, source file, SDK call, endpoint, or document section.
- Each page/module states whether the Haier/company application baseline, report development baseline, or inherited dual baseline is the acceptance basis.
- Filters, interactions, permissions, edge states, and exports are not omitted.
- Control semantics are documented: perspective switches, global filters, local filters, drilldown params, and schema impact.
- Navigation metric lineage is documented for perspective percentages, rankings, and status lights, and dynamic KPI values are not described as filter option metadata.
- Cross-perspective consistency is documented with at least one field-level assertion, such as navigation satisfaction equals current `experienceProfiles.satisfaction`.
- Displayed metric units, percentage/rate scaling, rounding, and forbidden display terms are documented when KPI/chart/table values contain rates or changes.
- Filter documentation states data completeness before binding: option rows, default/non-default data, required fields, and provider/API/resolver branch coverage.
- Filter binding evidence is clear enough for testers to verify more than selected-state changes.
- Non-default perspective behavior is clear enough for testers to verify labels/schema and not only values.
- Stale prototype wording, mock-only behavior, and temporary assumptions are clearly marked.
- The document distinguishes implemented behavior from blocked, deferred, or not-tested behavior.
