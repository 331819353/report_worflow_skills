# Component Style Reference Index

Use this index to load only the component rules needed for the current task.

## Loading Order

1. Always read `01-shared-foundation.md` for viewport, typography, overflow, density, and hover disclosure rules.
2. Read the files matching the requested component types.
3. Read `12-internal-placement-algorithms.md` whenever the task asks for component design, component restoration, component-internal local filters, or an implementation-ready component spec. It is now an index; load only the split placement file that matches the component family.
4. If the component is mixed, such as a KPI card with a mini chart, read every relevant file and apply the stricter fit rule.
5. If the component cannot satisfy the relevant rules inside its current block, recommend a larger span, split component, drawer, fullscreen, internal scroll, zoom/pan, or table fallback.

## Component File Map

| Component type | Read this reference | Use when |
| --- | --- | --- |
| Shared containers, titles, labels, units, badges, empty states, aspect-ratio integrity | `01-shared-foundation.md` | Any component style task, especially SVG/canvas/custom graphics that may deform |
| Filters, query bars, filter chips, advanced filter popovers | `02-filter-controls.md` | Page/global filters, date, organization, status, owner, metric, baseline, or advanced filters |
| Analysis & Insight components, text summaries, conclusion blocks, insight cards | `03-text-summary.md` | Executive conclusion, diagnosis, risk explanation, recommendation, data-quality note, definition note, chart annotation, explanatory empty state |
| KPI cards, pyramid KPI cards, metric groups, comparison tiles, mini trends | `04-kpi-metric-cards.md` | KPI, target attainment, YoY/MoM, target, sparkline, status, submetric tile |
| Composite Panel / multi-component analysis card | `12f-placement-composite-tables.md` plus each child component reference | KPI + chart + Top list/detail, main chart + auxiliary composition, target attainment mini-loop, diagnostic card with multiple coordinated child components |
| ECharts charts, axes, legends, data labels, tooltips, proportional geometry, chart-engine fidelity | `05-echarts-charts.md` | Bar, target/actual column, line/area trend, Combo/mixed bar-line chart, pie, radar, scatter, parallel coordinates, map, candlestick/K-line, boxplot, heatmap, Sankey, sunburst, treemap/rectangular tree map, path/user/process path, tree/hierarchical tree, relation/network graph, funnel, waterfall, gauge, custom path, or any case where ECharts may be imported but chart marks are hand-drawn |
| AntV S2 and analytical tables | `06-analytical-tables.md` | Pivot table, cross table, metric matrix, detail table, financial grid |
| Cards, lists, task cards, anomaly cards, status badges | `07-cards-lists-tasks.md` | Object cards, ranking lists, alert cards, task boards, status chips |
| Drawers, modals, detail panels, evidence panels | `08-drawers-detail-panels.md` | Row detail, evidence, logs, source trace, object profile |
| Complex diagrams, trees, decomposition, Sankey, flows, aspect-safe scaling | `09-complex-diagrams.md` | Tree, sunburst, treemap, path, process, DuPont, attribution, relation, flow diagrams, SVG/canvas diagrams |
| In-component capsule switches, dropdowns, and local filters | `10-in-component-controls.md` | Component-level local filter, view mode, metric switch, period switch, dimension select, ranking scope, chart/table mode |
| Component internal placement and coordinate algorithms | `12-internal-placement-algorithms.md` index, then the matching `12a`-`12f` split file | Any implementation-ready component design, component-local filter placement, KPI card coordinates, element x/y, alignment, size tiers, and state geometry |
| Component acceptance gates | `12-component-acceptance-gates.md` | Implementation-ready specs, dense chart/table acceptance, ECharts/S2 fidelity, local-filter scope, metric evidence, and anti-polish checks |

## Placement Split Map

| Need | Read |
| --- | --- |
| Coordinate variables and component-local filters | `12a-placement-foundation-controls.md` |
| Analysis & Insight and KPI cards | `12b-placement-insight-kpi.md` |
| Basic charts: target/actual bars, line trends, combo, pie/donut | `12c-placement-basic-charts.md` |
| Specialized charts: radar, gauge, scatter, parallel coordinates, map, K-line, boxplot, heatmap | `12d-placement-specialized-charts.md` |
| Flow/hierarchy charts: path, sunburst, treemap, tree, relation graph, Sankey, funnel | `12e-placement-flow-hierarchy-charts.md` |
| Composite Panel, grouped headers, Pivot Table, Detail Table | `12f-placement-composite-tables.md` |

## Mandatory Decision Record

For every component style output, state:

- Which reference files were applied.
- The component viewport size assumption or minimum viable size.
- The internal coordinate system, main visual center, slot rectangles, and alignment rules for implementation-ready components.
- The visible labels or values that remain permanent.
- The hidden labels or values and how users inspect them, such as hover tooltip, focus tooltip, click drawer, fullscreen, table fallback, or internal scroll.
- The overflow strategy for long text, long labels, many marks, wide tables, or dense diagrams.
- The aspect-ratio strategy for SVG/canvas/ECharts custom graphics, maps, gauges, radar, pies, paths, and complex diagrams.
- The in-component controls used, their placement, selected state, dropdown behavior, and what content each control changes.
- When component-local filters exist, the `组件内筛选区 / 局部筛选区` rules used: affected component only, suitable/unsuitable filters, `2-4` capsule vs `>4` dropdown decision, placement, title/unit/legend relationship, and responsive collapse.
