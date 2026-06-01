# Component Style Reference Index

Use this index to load only the component rules needed for the current task.

## Loading Order

1. Always read `01-shared-foundation.md` for viewport, typography, overflow, density, and hover disclosure rules.
2. Read the files matching the requested component types.
3. If the component is mixed, such as a KPI card with a mini chart, read every relevant file and apply the stricter fit rule.
4. If the component cannot satisfy the relevant rules inside its current block, recommend a larger span, split component, drawer, fullscreen, internal scroll, zoom/pan, or table fallback.

## Component File Map

| Component type | Read this reference | Use when |
| --- | --- | --- |
| Shared containers, titles, labels, units, badges, empty states | `01-shared-foundation.md` | Any component style task |
| Filters, query bars, filter chips, advanced filter popovers | `02-filter-controls.md` | Date, organization, status, owner, metric, baseline, or advanced filters |
| Text summaries, conclusion blocks, insight cards | `03-text-summary.md` | Executive conclusion, diagnosis, risk explanation, recommendation |
| KPI cards, pyramid KPI cards, metric groups, comparison tiles, mini trends | `04-kpi-metric-cards.md` | KPI, target attainment, YoY/MoM, target, sparkline, status, submetric tile |
| ECharts charts, axes, legends, data labels, tooltips | `05-echarts-charts.md` | Bar, line, pie, radar, scatter, map, heatmap, funnel, waterfall |
| AntV S2 and analytical tables | `06-analytical-tables.md` | Pivot table, cross table, metric matrix, detail table, financial grid |
| Cards, lists, task cards, anomaly cards, status badges | `07-cards-lists-tasks.md` | Object cards, ranking lists, alert cards, task boards, status chips |
| Drawers, modals, detail panels, evidence panels | `08-drawers-detail-panels.md` | Row detail, evidence, logs, source trace, object profile |
| Complex diagrams, trees, decomposition, Sankey, flows | `09-complex-diagrams.md` | Tree, path, process, DuPont, attribution, relation, flow diagrams |
| In-component capsule switches and dropdowns | `10-in-component-controls.md` | Component-level view mode, metric switch, period switch, dimension select, ranking scope, chart/table mode |

## Mandatory Decision Record

For every component style output, state:

- Which reference files were applied.
- The component viewport size assumption or minimum viable size.
- The visible labels or values that remain permanent.
- The hidden labels or values and how users inspect them, such as hover tooltip, focus tooltip, click drawer, fullscreen, table fallback, or internal scroll.
- The overflow strategy for long text, long labels, many marks, wide tables, or dense diagrams.
- The in-component controls used, their placement, selected state, dropdown behavior, and what content each control changes.
