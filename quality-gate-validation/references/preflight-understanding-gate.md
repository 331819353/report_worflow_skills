# Preflight Understanding Gate

Use this gate before any workflow starts irreversible design, implementation, repair, runtime QA, or final readiness judgment.

The goal is to stop agents from starting work with only a broad workflow in mind while missing the specific owning skills, evidence, constraints, and acceptance gates.

## When To Run

Run this gate when any of these are true:

- The task asks to implement, repair, optimize, redesign, integrate, test, or accept an artifact.
- The task touches a report/dashboard/BI/data-screen page, chart, table, filter, component placement, frontend/backend code, API, data model, runtime URL, or handoff artifact.
- The user reports a defect after a prior model or workflow already attempted the work.
- Multiple skills could own part of the work and the boundary is not trivial.

If the task is a tiny read-only answer with one clear source and no downstream action, record `Preflight understanding: not needed` and continue.

## Required Preflight Matrix

Before starting affected work, produce or internally maintain this matrix. Include it in handoff or final notes when the work is non-trivial, risky, or was previously mishandled.

| Area | Required decision |
| --- | --- |
| User goal | What outcome is requested: design, implementation, repair, QA, documentation, or review. |
| Workflow mode | Which workflow owns the top-level stage and whether code/source changes are allowed. |
| Evidence inventory | Requirements, screenshots, source files, APIs, mock data, runtime URL, logs, prior ledgers, and versions. |
| Authority order | Which artifact wins when requirement, screenshot, code, API, data, or runtime evidence disagree. |
| Baseline inheritance | Whether the surface is Haier-branded/enterprise, report/dashboard, common app, or mixed; which company-level UI baseline and report-specific baseline both apply. |
| Affected surfaces | Page shell, block sizing, chart, table, filter, component placement, data/API, auth/env, runtime QA, handoff. |
| Owning skills | The smallest required skill set for each affected surface. |
| Hard constraints | Viewports, design canvas, data grain, units, formula, permission, states, renderer/library, template shell, code-ledger rule. |
| Missing evidence | Facts that cannot be discovered locally and whether they block the current scope. |
| Confirmation need | Exact P0/P1 decisions requiring the user; no broad open-ended questioning. |
| Start decision | `ready-to-start`, `partial-start`, or `blocked`, with the safe work scope. |

## Design Skill Routing

For report/dashboard/BI/data-screen work, classify the affected surface before editing or accepting:

| Surface or risk | Required owning skill |
| --- | --- |
| Haier-branded or enterprise Web application baseline, including report/dashboard apps | `$haier-enterprise-app-ui-design-spec` for color, typography, spacing, radius, shadows, base controls, states, brand/logo, and cross-platform rules |
| Whole report baseline, reusable rules, anti-AI/report-decision gate | `$report-design-system-governance` for report-specific hierarchy, visualization, metric, chart/table/filter, state, and engineering acceptance rules |
| Page shell, navigation, global filters, first viewport, `8 * N` grid | `$report-visual-layout-design` |
| Parent block/container height, width, overflow, viewport fit | `$report-layout-size-constraint-spec` |
| Chart type, ECharts option fidelity, legend, axis, labels, tooltip, plot budget | `$report-chart-design-spec` |
| Detail/pivot/grouped tables, column width, alignment, row height, pagination, fixed columns | `$report-table-design-spec` |
| Page/global or component-local filter semantics and placement | `$report-filter-control-design-spec` |
| Implementation-ready component slots, x/y/width/height, collision geometry | `$report-component-placement-spec` |
| Reusable component-family standard or component library rule | `$report-component-design-spec` |
| Common enterprise app forms/lists/details/dialogs/workbench | `$haier-enterprise-app-ui-design-spec` |
| Runnable visual/browser evidence, DOM overlap/overflow, component crops | `$frontend-runtime-qa-validation` |

If a defect mentions a chart, table, filter, or component-internal overlap, do not route only to a broad workflow or page layout skill. Load the specific front-door skill and its required references before repair or acceptance.

For Haier or enterprise report/dashboard/BI/data-screen work, do not treat `$haier-enterprise-app-ui-design-spec` and `$report-design-system-governance` as alternatives. Load both unless the user explicitly requests a non-Haier/native sample/neutral brand. Haier owns the application-level UI baseline; report skills own report-specific analytical rules.

## Start Decision Rules

- `ready-to-start`: Goal, writable target, authority order, affected surfaces, owning skills, and hard constraints are known; no unresolved P0/P1 conflict affects the first edit or design decision.
- `partial-start`: Some work is safe, but a bounded missing fact or conflict affects another scope. Continue only non-conflicting discovery, documentation, or isolated edits.
- `blocked`: The next action would bake in a P0/P1 assumption about scope, source authority, metric/formula/grain, permission/auth, implementation target, or visual source.

## Quality Gate

- Do not start implementation or repair from a top-level workflow alone when a surface-specific skill is required.
- Do not treat "understand requirements" as complete until the affected surfaces and owning skills are named.
- Do not mark the baseline decision complete for Haier/enterprise report pages unless both the Haier application UI baseline and report-specific baseline are accounted for, or an explicit non-Haier exception is recorded.
- Do not rely on screenshots alone when source/runtime/API evidence exists or can be inspected.
- Do not rely on code alone when business meaning, metric口径, permission, or visual acceptance is disputed.
- Do not mark readiness `ready` when the preflight matrix is absent for non-trivial implementation, repair, QA, or acceptance work.
- Do not ask the user broad clarification questions before inspecting local evidence that can answer the question.
- Do ask the minimum confirmation question when unresolved P0/P1 conflicts remain after evidence inspection.
