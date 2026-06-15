---
name: report-chart-design-spec
description: "用于报表/仪表盘/BI/数据大屏中的图表设计规范、ECharts图表规范和图表可读性评审。用户提到图表规范、图表设计、ECharts、HTML源码里的SVG图表、手写SVG/canvas图表转ECharts、柱状图、折线图、组合图、饼图、雷达图、仪表盘、散点图、地图、K线、箱线图、热力图、桑基图、漏斗图、树图、关系图、旭日图、矩形树图、图例、坐标轴、标签过密、tooltip、图形变形、canvas/SVG/ECharts比例失真时触发；不负责整页布局或后端数据口径。"
---

# Report Chart Design Spec

## Positioning

Use this as the direct front door for chart-family design standards and chart readability. It promotes chart references that were previously reachable only through `$report-component-style-design`.

Use `$report-component-style-design` when the task covers mixed component families; use this skill when the task is clearly about chart choice, chart anatomy, ECharts option fidelity, label/legend/tooltip density, or chart placement.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Chart source map and exact placement files | `references/01-chart-reference-map.md` |
| Shared chart visual rules | `$report-component-style-design` `references/05-echarts-charts.md` |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Placement and dense acceptance | `$report-component-style-design` references: `12-internal-placement-algorithms.md`, `12-component-acceptance-gates.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name chart family candidates, data/metric contracts, parent container, affected labels/legend/axis/tooltip surfaces, hard constraints, missing evidence, and start decision.
2. Identify chart family, business question, grain, series count, category/time density, exact-value need, interaction, and container size.
3. Before selecting or accepting a renderer, run the action reflection loop from `$quality-gate-validation` `references/preflight-understanding-gate.md`; confirm the renderer matches the chart family, source authority, data contract, and design reasonableness.
4. If the source evidence is HTML with SVG/canvas/DOM chart marks, treat those marks as visual/config clues only. Extract labels, approximate layout, categories, series names, and colors when useful, then define an ECharts data-driven implementation for standard charts.
5. Load `references/01-chart-reference-map.md`, then load only the chart-family visual and placement files it names.
6. Confirm chart type is fit for the task before styling labels or colors.
7. Define chart anatomy: title, subtitle/definition, unit, metric strip, legend, axes, plot area, labels, tooltip, local filters, footer/source, and states.
8. Verify ECharts ownership and lifecycle: standard ECharts charts must use ECharts series/options/runtime behavior rather than hand-drawn SVG/canvas marks, and must initialize, update, resize, and dispose from a measurable chart body viewport.
9. Run acceptance gates before marking dense or implementation-ready charts as ready.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus chart family and selected references.
- Renderer/action reflection result, including any HTML/SVG source conversion decision.
- Chart choice rationale and rejected alternatives when relevant.
- Anatomy, placement, label/legend/tooltip, density, state, and responsive rules.
- Data contract: fields, units, precision, grain, filters, and exact-value path.
- Option/runtime proof obligations when implementation or URL exists: renderer owner, `option`/series fields, legend/axis/grid/tooltip settings, chart body dimensions, plot-height floor, axis-label overlap checks, resize trigger/cleanup path, before/after resize geometry, DOM/SVG collision checks, screenshot/crop evidence, and non-default state coverage.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not choose a decorative chart when a simpler chart answers the business question better.
- Do not repair or accept chart visuals before the chart family, parent container, data grain, units, renderer ownership, and affected chart anatomy are known.
- Do not copy hand-authored chart SVG/canvas/DOM from an HTML prototype into a standard report chart implementation. Use ECharts options/series/runtime behavior, or document an explicit data-driven custom-diagram exception before implementation.
- Do not accept labels, legends, axis names, or tooltips that overlap, truncate critical evidence, or hide units/precision.
- Do not accept chart readiness by checking only that `legend`, `tooltip`, or `series` exists. Dense or implementation-ready ECharts charts must prove the relevant option details and rendered geometry. For a top-centered Combo legend, verify `legend.left: 'center'` or equivalent centering plus `grid.top` reserved space and measured/cropped legend position; a right-anchored legend fails unless the spec explicitly asks for it.
- Do not leave chart-engine, data contract, axis/legend/grid/tooltip, exact-value access, state coverage, or renderer ownership as advisory language. These are `MUST/fail` constraints when the chart is implementation-ready or runtime-verifiable.
- Do not accept ECharts responsiveness claims without naming the level. `container-resize-safe` requires non-zero mount size, `setOption` updates, `ResizeObserver` or equivalent container/visibility hooks, cleanup, and a browser resize check. `viewport-responsive` additionally requires page/component breakpoints or reflow proof. A fixed design-width shell with horizontal/vertical scrolling may be container-resize-safe but is not viewport-responsive by itself.
- Do not accept a full line/bar/combo axis chart when it is visually squeezed. Standard axis charts need chart body `>=180px` and plot height `>= max(120px, chartBodyH * 0.45)` after title, legend, tabs, filters, metric strip, axes, x labels, footer, and any table/list preview are reserved. Dense combo, dual-axis, target/reference, or chart + table/list cards need chart body `>=220px` and plot height `>= max(140px, chartBodyH * 0.48)`. If y-axis labels stack, gridlines merge into a stripe, or the table/list preview leaves only a thin chart band, split/enlarge/collapse optional content before accepting.
- Do not distort geographic, radial, proportional, network, or flow geometry.
- Do not mark chart work ready without state handling for loading, empty, error, no-permission, stale, and dense data.
