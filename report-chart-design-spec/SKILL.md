---
name: report-chart-design-spec
description: "用于报表/仪表盘/BI/数据大屏中的图表设计规范、ECharts图表规范和图表可读性评审。用户提到图表规范、图表设计、ECharts、柱状图、折线图、组合图、饼图、雷达图、仪表盘、散点图、地图、K线、箱线图、热力图、桑基图、漏斗图、树图、关系图、旭日图、矩形树图、图例、坐标轴、标签过密、tooltip、图形变形、canvas/SVG/ECharts比例失真时触发；不负责整页布局或后端数据口径。"
---

# Report Chart Design Spec

## Positioning

Use this as the direct front door for chart-family design standards and chart readability. It promotes chart references that were previously reachable only through `$report-component-style-design`.

Use `$report-component-style-design` when the task covers mixed component families; use this skill when the task is clearly about chart choice, chart anatomy, ECharts option fidelity, label/legend/tooltip density, or chart placement.

## Reference Map

| Need | Read |
| --- | --- |
| Chart source map and exact placement files | `references/01-chart-reference-map.md` |
| Shared chart visual rules | `$report-component-style-design` `references/05-echarts-charts.md` |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Placement and dense acceptance | `$report-component-style-design` references: `12-internal-placement-algorithms.md`, `12-component-acceptance-gates.md` |

## Workflow

1. Identify chart family, business question, grain, series count, category/time density, exact-value need, interaction, and container size.
2. Load `references/01-chart-reference-map.md`, then load only the chart-family visual and placement files it names.
3. Confirm chart type is fit for the task before styling labels or colors.
4. Define chart anatomy: title, subtitle/definition, unit, metric strip, legend, axes, plot area, labels, tooltip, local filters, footer/source, and states.
5. Verify ECharts ownership: standard ECharts charts should use ECharts series/options/runtime behavior rather than hand-drawn SVG/canvas marks.
6. Run acceptance gates before marking dense or implementation-ready charts as ready.

## Required Output

- Chart family and selected references.
- Chart choice rationale and rejected alternatives when relevant.
- Anatomy, placement, label/legend/tooltip, density, state, and responsive rules.
- Data contract: fields, units, precision, grain, filters, and exact-value path.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not choose a decorative chart when a simpler chart answers the business question better.
- Do not accept labels, legends, axis names, or tooltips that overlap, truncate critical evidence, or hide units/precision.
- Do not distort geographic, radial, proportional, network, or flow geometry.
- Do not mark chart work ready without state handling for loading, empty, error, no-permission, stale, and dense data.
