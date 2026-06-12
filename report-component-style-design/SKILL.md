---
name: report-component-style-design
description: "用于报表组件级设计规范、组件规范、视觉样式、响应式和可读性设计/评审/修复。用户提到提高前端设计、前端设计提升、组件设计规范、组件优化、KPI卡/指标卡、文本总结、分析洞察、Composite Panel、多组件组合、筛选控件、按钮/标签/弹窗/抽屉、ECharts图表、AntV S2表格、透视表、复杂表头、图例/标签/tooltip、hover/focus动效、图形变形、组件溢出/裁切/对齐、移动端适配、视觉优化时触发；不负责整页布局或模板工程。"
---

# Report Component Style Design

## Core Positioning

Use this skill for one component or one component family: design, critique, repair, or implementation-ready component guidance for report/dashboard/BI/business-analysis surfaces.

Keep this `SKILL.md` as the router. Load only the references for the component family that actually appears in the task. For reusable component-system standards, use `$report-component-design-spec`; for chart-only standards use `$report-chart-design-spec`; for table-only standards use `$report-table-design-spec`; for filter-control standards use `$report-filter-control-design-spec`; for implementation-ready component coordinates use `$report-component-placement-spec`; for page shell/layout use `$report-visual-layout-design`; for whole-system governance use `$report-design-system-governance`.

When common enterprise Web components are involved, load `$haier-enterprise-app-ui-design-spec` for company-level tokens and base controls. For report, dashboard, cockpit, data-screen, BI, or business-analysis components, load `$report-design-system-governance` as the report baseline before applying component-specific fit rules.

## Reference Library

Start with `references/00-component-reference-index.md`, then load the smallest matching set.

| Need | Read |
| --- | --- |
| Shared viewport, typography, overflow, states | `references/01-shared-foundation.md` |
| Filter bars, query controls, chips, advanced filters | `references/02-filter-controls.md` |
| Text summaries, conclusions, Analysis & Insight | `references/03-text-summary.md` |
| KPI cards, metric groups, comparison tiles | `references/04-kpi-metric-cards.md` |
| ECharts chart rules and chart-family fit | `references/05-echarts-charts.md` |
| Detail tables, Pivot/S2, complex/grouped headers | `references/06-analytical-tables.md` |
| Cards, lists, task/status blocks | `references/07-cards-lists-tasks.md` |
| Drawers, modals, evidence/detail panels | `references/08-drawers-detail-panels.md` |
| Flow, tree, relation, Sankey, hierarchy diagrams | `references/09-complex-diagrams.md` |
| Component-internal local filters and controls | `references/10-in-component-controls.md` |
| Legacy detailed rules not yet migrated | `references/11-detailed-style-rules.md` |
| Placement routing index | `references/12-internal-placement-algorithms.md` |
| Local-filter coordinate rules | `references/12a-placement-foundation-controls.md` |
| Analysis & Insight and KPI placement | `references/12b-placement-insight-kpi.md` |
| Basic chart placement: bars, trends, combo, donut/pie | `references/12c-placement-basic-charts.md` |
| Specialized chart placement: radar, gauge, scatter, parallel coordinates, map, K-line, boxplot, heatmap | `references/12d-placement-specialized-charts.md` |
| Flow/hierarchy placement: path, sunburst, treemap, tree, relation graph, Sankey, funnel | `references/12e-placement-flow-hierarchy-charts.md` |
| Composite Panel and table placement | `references/12f-placement-composite-tables.md` |
| Implementation-ready acceptance gates | `references/12-component-acceptance-gates.md` |
| Direct chart front door | `$report-chart-design-spec` |
| Direct table front door | `$report-table-design-spec` |
| Direct filter-control front door | `$report-filter-control-design-spec` |
| Direct component-placement front door | `$report-component-placement-spec` |
| Report chart/table/filter/status baseline | `$report-design-system-governance` relevant guideline references |
| Cross-stage design reasonableness or readiness | `$quality-gate-validation` |

## Workflow

1. Classify the component family, business purpose, data grain, viewport/container size, interaction state, and priority.
2. Load `00-component-reference-index.md`, shared foundation, the matching component reference, and the matching placement reference only. When the task is purely chart, table, filter, or coordinate placement, prefer the specific front-door skill above.
3. Confirm the data and decision contract before styling: metric/formula, field grain, source/freshness, numeric display contract, filter scope, exact-value path, state set, and next action.
4. Define `Positioning And Alignment Rules`: container variables, slot rectangles, main visual center, local-filter geometry, display budget, overflow strategy, size tiers, fallback order, and state geometry.
5. Apply inherited baseline tokens first, then component-specific typography, color semantics, borders, shadows, spacing, hover/focus, and responsive behavior.
6. Run the component acceptance gates when the output is implementation-ready or when a visual defect may hide decision evidence.
7. Verify the component inside its real parent block after resize, filter changes, tab switches, drawer/fullscreen changes, loading/empty/error/no-permission states, and data updates.

## Required Output

- Component family and loaded reference files.
- Business/data contract: purpose, grain, key fields, formulas/units, numeric display contract, source/freshness, filters, exact-value path, and owner/action path.
- Placement rules: container variables, slots, alignment, size tiers, display budget, responsive degradation, and state geometry.
- Visual and interaction rules: tokens, labels, legends, tooltips, hover/focus, overflow strategy, disclosure, and accessibility.
- Acceptance result: `ready`, `partial`, or `blocked`, with `DESIGN-*`, `RPT-*`, `VIS-*`, or implementation gaps when relevant.

## Quality Gate

- Do not style a component before the business purpose, data grain, key fields, filter scope, and interaction state are known.
- Implementation-ready specs must include measurable placement rules, not only CSS layout or visual adjectives.
- Every component family must declare a display budget before acceptance: maximum visible items/cards/rows/columns/categories/series/annotations/steps as applicable, the budget basis, and overflow strategy such as Top N + other, pagination, internal scroll, sampling, collapse, drawer/fullscreen, or table fallback.
- Component-internal filters must be current-component or declared local-group scoped; they cannot silently change page/global scope, backend aggregation, pagination, export scope, permission scope, or other components.
- Report components must preserve decision evidence: metric口径, source/freshness, numeric display contract, baseline, exact values, drilldown/detail/export/action path, and realistic data states.
- Metric-bearing components must declare value type, raw/display unit, display scale, screen precision, tooltip/export precision, rounding mode, null/zero/denominator-zero behavior, negative-zero handling, and formatter ownership; arbitrary decimals or component-local `toFixed` assumptions are not accepted.
- KPI/metric cards must pass actual rendered value-anchor checks, not only slot allocation: the measured value+unit group is centered in the value anchor viewport, the numeral has sufficient visual scale for the card size, and auxiliary title/status/source/target content does not push the primary value off center.
- KPI/metric card title ownership must be explicit. Do not visibly render both a block/card title and a body metric label when they normalize to the same or highly similar text; use `displayTitle` for the visible title and keep `metricName` for tooltip/export/口径 metadata unless `showBodyMetricLabel` is explicitly justified.
- Standard ECharts charts must be implemented with ECharts-owned options/series/runtime behavior; do not hand-draw standard charts while importing ECharts.
- ECharts Cartesian charts with legends, y-axis names, axis units, target labels, or local filters sharing an edge band must declare explicit slot budgets and collision checks. `grid.containLabel` alone is not sufficient evidence for legend/axis-name safety.
- SVG/canvas/ECharts/custom geometry must preserve aspect ratio and must not stretch, squeeze, or distort business shapes.
- Do not use generic AI/SaaS polish, decorative gradients/glass/glow, oversized radius, vague copy, or ornamental motion when it competes with data reading.
- Load `12-component-acceptance-gates.md` before accepting dense charts, tables, Composite Panels, Analysis & Insight, KPI cards, local filters, or shape-sensitive graphics for implementation.
