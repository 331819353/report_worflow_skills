# Component Internal Placement Algorithms

This file is now an index for the split placement references. Load the smallest matching file instead of loading all placement algorithms.

## Shared Rule

Every implementation-ready component spec must include a `Positioning And Alignment Rules` / `位置排布与对齐规则` section with container variables, slot rectangles, alignment, size tiers, responsive degradation, and state geometry.

## Split Reference Map

| Need | Read |
| --- | --- |
| Required placement chapter, coordinate variables, local-filter geometry | `12a-placement-foundation-controls.md` |
| Analysis & Insight, metric cards, KPI cards | `12b-placement-insight-kpi.md` |
| Target/actual bars, line trends, combo charts, pie/donut | `12c-placement-basic-charts.md` |
| Radar, gauge, scatter/bubble, parallel coordinates, maps, K-line, boxplot, heatmap | `12d-placement-specialized-charts.md` |
| Path, sunburst, treemap, tree, relation graph, Sankey, funnel | `12e-placement-flow-hierarchy-charts.md` |
| Composite Panel, grouped headers, pivot tables, detail tables, acceptance checks | `12f-placement-composite-tables.md` |

## Loading Guidance

- Start with `12a-placement-foundation-controls.md` for any component-local filter or coordinate-system task.
- Add only the component-family placement file that matches the current component.
- Also load the visual/content reference for the same family, such as `05-echarts-charts.md`, `06-analytical-tables.md`, `03-text-summary.md`, or `04-kpi-metric-cards.md`.
- Do not load all split files for a single-component fix.
