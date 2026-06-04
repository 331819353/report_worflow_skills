# ECharts Chart Rules

Use for standard charts built with ECharts: bar, line, area, pie, radar, scatter, heatmap, map, funnel, waterfall, and mixed charts.

## Base Option Contract

- Set `grid.containLabel: true` for Cartesian charts.
- Reserve explicit space for title, legend, axes, axis labels, data labels, dataZoom, and notes before sizing the plot.
- Axis labels must be readable and generally larger than permanent data-label values.
- Use page-level semantic palette. Do not rely on default random chart colors.
- Keep tooltip complete enough to recover hidden labels and exact values.
- Resize charts on container resize, tab activation, drawer open/close, fullscreen, and legend toggles.

## Axis Labels

- X/Y axis font: 12-13px minimum; data labels: 11-12px.
- Axis text must not touch the container edge or tick marks.
- Use `axisLabel.hideOverlap`, calculated `interval`, wrapping, two-line labels, or 30-45 degree rotation only when still readable.
- If category labels still collide, use dataZoom, horizontal scroll, pagination, Top N, or a table fallback.
- Do not rotate labels to 60-90 degrees in dense business dashboards unless there is no better component choice.

## Data Labels

- Default dense chart strategy: hide permanent data labels and reveal exact values through tooltip.
- Show permanent labels only for current/latest, max/min, Top N, target gap, anomalies, selected item, first/last, or explicitly highlighted points.
- When too many values would overlap, retain key values and hide the rest. Hovering or focusing the mark must show full value.
- Use `labelLayout: { hideOverlap: true }` where supported.
- Use `emphasis.label.show: true` for hover labels when permanent labels are hidden.

## Bar And Column Charts

- Keep enough bar width for visual comparison. If bars become too thin, use scroll/dataZoom or Top N.
- End labels must not collide with bar ends, axis edge, or neighboring bars.
- For long category names, prefer horizontal bars with a label column and value column.
- Use `label column + visual column + value column` for ranked bars when exact values matter.

## Line And Area Charts

- Sort the source row tuples before deriving `xAxis.data`, `series.data`, tooltip payloads, and click payloads. Do not sort category labels independently while series values still map the unsorted rows.
- Do not label every point on dense time series.
- Permanently label endpoints, anomalies, max/min, or selected points.
- For one data point, center the point in the plot area.
- For two data points, place them symmetrically around center.
- Use axis pointer and tooltip for exact period values.

## Pie, Donut, Rose

- Use only when category count is small and proportions matter.
- If slices exceed readable count, use Top N plus `其他`.
- Hide labels for low-value slices and expose details in tooltip/legend.
- Do not allow outside labels and guide lines to form a dense ring.
- Switch to bar/table when exact comparison matters.

## Radar

- Use only for a small number of dimensions, normally 3-6 and rarely 7.
- Keep indicator names short. Abbreviate long names and show full text in tooltip.
- Reserve separate zones for radar labels and legend.
- Set `axisName`, `nameGap`, `radar.center`, and `radar.radius` deliberately.
- If radar labels collide with title, edge, or legend, reduce radius, move legend, increase span, or switch chart type.

## Scatter, Bubble, Heatmap, Map

- Label only selected, outlier, high-risk, or major region points/cells.
- Use tooltip, visualMap, brush, zoom, and selection for detail.
- Dense maps and heatmaps should show exact value on hover and avoid permanent labels in every cell.

## Funnel, Waterfall, Contribution

- Reserve side space for long stage/category labels and positive/negative values.
- If labels or values exceed width, abbreviate visible label and show full label in tooltip.
- Use consistent sign, color, and baseline semantics across the chart.
