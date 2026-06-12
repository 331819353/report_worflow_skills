---
name: vue3-visualization-project-architecture
description: "用于按上传的 Vue3 数据可视化样例沉淀项目架构、目录结构、组件开发约定和工程使用技巧。用户提到 Vue3数据可视化项目、Vue3项目目录结构、前端脚手架、Vite/TypeScript/Pinia/Vue Router、Element Plus、ECharts、ChartRenderer、Axios封装、Access-Token、Haier token、VITE_API_BASE_URL、多环境配置、pnpm build:test/build:prod、nginx/Docker部署、按样例开发前端页面或接入接口时触发。"
---

# Vue3 Visualization Project Architecture

## Positioning

Use this skill as the architecture baseline for Vue3 data-visualization frontend development based on the uploaded sample project. It captures project structure, request/auth patterns, environment conventions, reusable component placement, naming rules, and build/deploy commands.

It complements `$frontend-development-workflow`: load this skill when the frontend target should follow the sample Vue3 + TypeScript + Vite + Pinia + Vue Router + Element Plus + ECharts + Axios architecture. Use `$report-component-style-design` for visual/chart fit and `$frontend-runtime-qa-validation` for browser QA.

## Reference Map

| Need | Read |
| --- | --- |
| Stack, directory structure, directory responsibilities, naming rules | `references/01-project-structure-and-conventions.md` |
| Axios, token, response handling, Vite env, proxy, commands, gitignore | `references/02-request-env-build.md` |
| Visualization component placement, ChartRenderer expectations, development workflow | `references/03-visualization-development-practices.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Confirm whether the target is a new Vue3 visualization project, an existing sample-like project, or a migration into this architecture.
2. Inspect stack and package manager. Prefer the sample stack when no project-authoritative stack overrides it: Vue3, TypeScript, Vite, Pinia, Vue Router, Element Plus, ECharts, Axios, Day.js, Sass.
3. Align directories to the sample responsibility model: API in `src/api`, reusable components in `src/components`, pages in `src/views`, store modules in `src/stores/modules`, request/auth utilities in `src/utils`, routes in `src/router/modules`, global styles in `src/styles`, and shared types in `src/types`.
4. Use the request pattern from `src/utils/request.ts`: one Axios instance, token injection through Pinia store, `Access-Token` header, response normalization to `res.data`, and consistent 401/429/error handling.
5. Use Vite env conventions for API base URLs and build modes. Keep client-visible variables prefixed with `VITE_`.
6. Place chart rendering through reusable component abstractions such as `ChartRenderer.vue` instead of scattering ECharts initialization across pages.
7. Before coding, decide which APIs, stores, routes, views, components, env files, and styles must change; keep new files in the directory layer that owns the responsibility.
8. Verify with the project commands available in `package.json`, especially `pnpm dev`, `pnpm build:test`, `pnpm build:prod`, and `pnpm preview` when present.

## Required Output

- Target project mode: new, existing sample-like, migration, or repair.
- Stack and package-manager decision.
- Directory/file plan with ownership layer.
- API/request/env/auth plan.
- Visualization component plan, including reusable chart wrapper usage.
- Commands to run and any blockers.
- Handoff notes for `$frontend-development-workflow`, `$report-component-style-design`, or `$frontend-runtime-qa-validation` when needed.

## Quality Gate

- Do not put API calls directly inside chart components when they belong in `src/api` plus page/store orchestration.
- Do not create ad hoc request clients that bypass the shared `src/utils/request.ts` pattern unless the existing project already has an authoritative replacement.
- Do not expose non-`VITE_` env variables to client code.
- Do not scatter ECharts setup across unrelated pages when a reusable chart renderer/component can own chart lifecycle.
- Do not mix page, API, store, route, style, and type responsibilities in one file for convenience.
- Do not claim sample-architecture alignment until directory placement, request/auth behavior, env mode, build command, and chart component ownership are explicit.
