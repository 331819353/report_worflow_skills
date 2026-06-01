---
name: frontend-function-description-documentation
description: "Create frontend function descriptions for handoff across dashboards, data-visualization pages, business apps, prototypes, or API-integrated frontend projects. Use when source code, routes, modules, data providers, API/SDK/static data mapping, filters, interactions, runtime verification, or known blockers must be summarized into 前端功能说明 for testing, delivery, business review, or maintenance. Data service is optional; document whichever provider model the frontend actually uses."
---

# Frontend Function Description Documentation

## Positioning

Use this skill independently after frontend implementation, API/data-source integration, or runtime validation when the required output includes 前端功能说明. The document should help testers, reviewers, business owners, and maintainers understand what the frontend does and what behavior should be verified.

This skill is not bound to 数据服务. If data-service APIs exist, document them. If the page uses SDKs, static files, local fixtures, GraphQL, generated data modules, or realtime feeds, document those provider bindings instead.

## Reference Map

- Read `references/document-structure.md` to choose the output structure.
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
   Link each functional module to endpoint names/paths, SDK calls, static files, GraphQL operations, data-source IDs, request params, response adapter, and displayed fields. Do not repeat the whole provider document; reference it and summarize the frontend binding.

4. Record data and filter behavior.
   Explain default filters, option sources, cascades, reset behavior, pagination, sorting, search, cross-component linkage, and state persistence.

5. Record interaction behavior.
   Cover chart clicks, KPI/card clicks, table row actions, drawer/modal content, page jumps, parameter passing, back behavior, fullscreen, download, and refresh.

6. Record verification and limitations.
   Include commands run, URL verified, browser/runtime checks, known blockers, intentionally retained mock/offline data, and features not covered.

## Required Output

Produce the function description using `references/document-structure.md`.

## Quality Checklist

- Testers can derive test cases from the function description without rereading source code.
- Each data-backed feature names its provider, source file, SDK call, endpoint, or document section.
- Filters, interactions, permissions, edge states, and exports are not omitted.
- Stale prototype wording, mock-only behavior, and temporary assumptions are clearly marked.
- The document distinguishes implemented behavior from blocked, deferred, or not-tested behavior.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
