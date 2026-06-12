---
name: frontend-design-improvement-workflow
description: "用于处理模糊的前端设计提升、页面优化、界面优化、视觉优化、UI优化、页面规范、组件规范、组件设计规范、前端设计规范、提高前端设计、让页面更专业/更好看/更统一/更像企业应用/更像报表系统等请求。它会按页面规范、组件规范、报表设计系统、海尔通用应用UI基线和运行QA进行路由；用户未明确是页面还是组件时触发。"
---

# Frontend Design Improvement Workflow

## Positioning

Use this as the router for vague frontend design-improvement requests. It decides which design baseline and downstream skills should be used before anyone edits UI, writes a spec, or judges visual quality.

This skill does not replace implementation skills. It creates the improvement route, scope, quality criteria, and required references so page-level and component-level work do not drift apart.

## Reference Map

| Need | Read |
| --- | --- |
| Trigger and routing rules | `references/01-trigger-routing.md` |
| Preflight understanding gate | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Design-improvement checklist | `references/02-design-improvement-checklist.md` |
| Report/dashboard design-system baseline | `$report-design-system-governance` |
| Report page layout/page规范 | `$report-visual-layout-design` |
| Report block size and viewport fit | `$report-layout-size-constraint-spec` |
| Report component design/组件规范 | `$report-component-design-spec` and `$report-component-style-design` |
| Chart/table/filter-specific component standards | `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec` |
| Implementation-ready component placement | `$report-component-placement-spec` |
| Common enterprise app UI baseline | `$haier-enterprise-app-ui-design-spec` |
| Runtime visual/browser QA | `$frontend-runtime-qa-validation` |
| Implementation or repair | `$frontend-development-workflow` |
| Cross-stage readiness | `$quality-gate-validation` |

## Workflow

1. Run the Preflight understanding gate before routing or editing. Name the requested improvement, evidence inventory, surface classification, affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Classify the surface: report/dashboard/BI/data-screen, common enterprise app, mixed app, or unknown.
3. Split the request into page-level, component-level, data/decision-readability, interaction/state, responsive, and runtime-QA work.
4. Load the correct baseline: Haier enterprise UI as the company-level application baseline for Haier/enterprise Web surfaces, including reports; report design system as the additional report-specific baseline for report/dashboard/BI/data-screen surfaces. Load both for Haier/enterprise report surfaces unless an explicit non-Haier/native/neutral exception exists.
5. Route page shell, navigation, grid, header/filter area, responsive, and overlap work to `$report-visual-layout-design`; route block size, height budget, fixed-card clipping, and viewport fit to `$report-layout-size-constraint-spec`.
6. Route reusable component standards to `$report-component-design-spec`; route chart, table, and filter-specific standards to `$report-chart-design-spec`, `$report-table-design-spec`, and `$report-filter-control-design-spec`.
7. Route implementation-ready x/y/slot/alignment work to `$report-component-placement-spec`; route mixed single-component review/repair to `$report-component-style-design`.
8. When code or a live URL exists, require runtime screenshot/DOM/interaction evidence through `$frontend-runtime-qa-validation` before marking visual work ready.
9. Return a short action plan or execute the implementation workflow when the user asked for changes, not only advice.

## Required Output

- Preflight understanding matrix, surface classification, and selected baseline.
- Baseline inheritance: Haier company UI baseline plus report-specific baseline when the surface is a Haier/enterprise report/dashboard.
- Page-level and component-level scope.
- Skills/references to load next, with why each is needed.
- Acceptance checklist: layout, component fit, data readability, states, responsive behavior, runtime evidence, and remaining gaps.

## Quality Gate

- Do not treat "提高前端设计" as only color/radius/shadow polish.
- Do not begin visual repair or implementation before the affected surfaces and owning skills are classified.
- Do not route report/dashboard design only to report-design skills when the page is a Haier/enterprise Web application; inherit Haier color, typography, spacing, base controls, states, and brand rules as well.
- Do not skip page规范 when the issue includes shell, navigation, grid, section order, filters, spacing, overlap, or responsive behavior.
- Do not skip组件规范 when the issue includes KPI cards, charts, tables, filters, summaries, dialogs, drawers, labels, tooltips, states, or local controls.
- Do not leave chart/table/filter/placement requests routed only to the broad component skill when a specific front-door skill exists.
- Do not mark a runnable UI ready without runtime evidence when code or URL is available.
