# General Chart Rules

This file was split from `05-report-charts-tables-format-guidelines.md`. Load it only for this focused rule group; use `05-report-charts-tables-format-guidelines.md` as the routing index.

## General Chart Rules

Title format:

```text
指标 + 分析维度/时间范围 + 分析关系
```

Examples:

| Avoid | Prefer |
| --- | --- |
| 趋势图 | 近 12 个月销售收入趋势 |
| 对比分析 | 各区域本月销售收入对比 |
| 占比 | 产品类型销售收入占比 |

Unit must appear in at least one of:

- Title: `销售收入趋势（单位：万元）`
- Y-axis: `销售收入（万元）`
- Table header: `销售收入（万元）`
- KPI card note: `单位：万元`

Legend:

- Default bottom-center.
- Full legend when series count is small.
- Scroll, filter, or interaction-hide when many series.
- Legend labels use business names, not API fields.
- For charts with x-axis labels and bottom legends, reserve a clear safe distance between legend and axis labels. In ECharts implementations, require `grid.containLabel = true` and `grid.bottom >= 56px`.

ECharts lifecycle:

- Standard charts must use data-driven ECharts options/series rather than hand-authored SVG/DOM marks.
- Mount only after the chart body has measurable width and height.
- Update through `setOption` or the project wrapper when data, filter, theme, tab, or route context changes.
- Resize through `ResizeObserver` on the chart body/container, or through documented equivalent hooks for window resize, tab activation, drawer/fullscreen open-close, keep-alive activation, and grid span changes.
- Dispose the instance and disconnect observers/listeners on unmount or final deactivation.
- Acceptance must distinguish `container-resize-safe` from `viewport-responsive`: fixed design-width pages with scrolling are not viewport-responsive unless breakpoints or reflow are proven.

Plot viability and anti-squeeze:

- Full axis charts must reserve a readable plot area after title, subtitle, unit, legend, local filters, tabs, metric strips, axis labels, footer, and table/list previews are allocated.
- Standard line/bar/combo charts need chart body height `>=180px` and plot height `>= max(120px, chartBodyH * 0.45)`.
- Dense combo charts, dual-axis charts, target/reference charts, or chart + table/list cards need chart body height `>=220px` and plot height `>= max(140px, chartBodyH * 0.48)`.
- Sparkline is the only small-height exception: axes, legends, dense labels, and table/list previews are hidden intentionally, and exact values remain available through tooltip/detail.
- Y-axis labels must not overlap; horizontal gridlines must not visually merge into a stripe. If `grid.top + grid.bottom > chartBodyH * 0.55`, the reserved bands are too heavy for the available chart height.
- A chart and table/list/detail preview may share one card only when both the chart plot floor and at least `3` visible preview rows fit. Otherwise move the preview to Top3, drawer, tab, detail route, split block, or larger span.
- Failure IDs: `VIS-CHART-SQUEEZED`, `VIS-AXIS-LABEL-STACKED`, `VIS-CHART-TABLE-CROWDING`.

Axis:

- Axis text should be concise; long text truncates with tooltip.
- Numeric axis uses reasonable business range.
- Column/bar charts start from `0`.
- Dual-axis charts should be used carefully and must show both units clearly.

Data labels:

- Show only key values, max/min, anomalies, or user-focused values.
- Hide dense labels by default and show on hover.
- Label format follows unified number format.

Tooltip must include:

- Dimension name.
- Metric name.
- Metric value.
- Unit.
- YoY/MoM or derived metrics when present.
- Data time or range when present.

Links:

- Secondary/detail link is placed bottom-right of chart.
- Link color is `#0073E5`.
- Link copy should be explicit, such as `查看明细`, `查看详情`, `进入分析`.
