# Component Internal Placement Algorithms

This file is now an index for the split placement references. Load the smallest matching file instead of loading all placement algorithms.

## Shared Rule

Every implementation-ready component spec must include a `Positioning And Alignment Rules` / `位置排布与对齐规则` section with container variables, slot rectangles, alignment, size tiers, responsive degradation, and state geometry.

## Split Reference Map

| Need | Read |
| --- | --- |
| Required placement chapter, coordinate variables, local-filter geometry | `12a-placement-foundation-controls.md` |
| Analysis & Insight, metric cards, KPI cards | `12b-placement-insight-kpi.md` |
| Basic charts | `12c-placement-basic-charts.md`, then exact `12c1`-`12c4` file |
| Specialized charts | `12d-placement-specialized-charts.md`, then exact `12d1`-`12d8` file |
| Flow/hierarchy charts | `12e-placement-flow-hierarchy-charts.md`, then exact `12e1`-`12e7` file |
| Composite Panel and tables | `12f-placement-composite-tables.md`, then exact `12f1`-`12f5` file |

## Loading Guidance

- Start with `12a-placement-foundation-controls.md` for any component-local filter or coordinate-system task.
- Add only the exact component-family placement file that matches the current component. Prefer the `12c1`/`12d1`/`12e1`/`12f1` split file over loading a family index when the chart/table type is already known.
- Also load the visual/content reference for the same family, such as `05-echarts-charts.md`, `06-analytical-tables.md`, `03-text-summary.md`, or `04-kpi-metric-cards.md`.
- Do not load all split files for a single-component fix.
