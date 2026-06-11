# Line Trend Chart Placement Algorithm
This file was split from `12c-placement-basic-charts.md`. Load it only when this exact component family is present; use `12c-placement-basic-charts.md` as the routing index.


Use this for line and area charts that show a metric over time, sequence, or another ordered continuous category. Do not use a line chart for unordered category comparison.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Subtitle/definition | Optional | Time range,口径, filter context, or definition entry |
| Component-local filter | Optional | Title-right capsule/dropdown for current trend only |
| Unit | Yes | Top-right beside title when one unit applies to the whole chart |
| Metric strip | Optional | Current value, target, average, peak, low, change-rate |
| Legend/control | Required for multiple series | Above plot, right-aligned by default; may become selector when many series |
| Y-axis labels | Yes | Left of plot, right-aligned to ticks |
| Plot area | Yes | Lines, points, grid lines, target/average/warning lines, anomaly markers |
| X-axis labels | Yes | Under plot, centered with data points |
| Data labels | Optional | Key points only: latest/current, first/last, max/min, anomaly, selected |
| Target/average label | Optional | Right side of reference line, with reserved gap |
| Footer metadata | Optional | Source/freshness, left/right aligned |
| Tooltip | Yes | Full period, values, unit, target, attainment, YoY/MoM/change-rate |

### Line Type Choice

| Type | Use when | Avoid when |
| --- | --- | --- |
| Single metric line | One metric trend over time or ordered sequence | Only comparing unordered categories |
| Multi-series line | `2-5` comparable series with shared x-axis and unit | More than 5 default visible series; use selector, Top N, facets, or small multiples |
| Actual line + target/reference line | Target, budget, warning, SLA, or average matters | Target is missing or not comparable to actual |
| Area line | Single metric or at most two series where magnitude matters | Dense multi-series comparison or volatility needs precise reading |

Line smoothing is optional. Use straight segments by default. Smooth only when the business question is broad trend shape; do not smooth when volatility, spikes, or operational anomalies are important.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 240px` | title, unit, core line, first/last x labels, reduced y ticks, tooltip | subtitle, metric strip, normal labels, complex legend, footer; target label may hide |
| Standard | `320px <= W < 720px` and `H >= 280px` | title, metric strip, legend, y-axis, x-axis, line, target line if present, tooltip | labels only for first/last/max/min/anomaly |
| Large | `W >= 720px` and `H >= 360px` | full structure, key labels, target/average labels, anomaly markers, optional brush/zoom | still avoid all-point labels on dense series |
| Many points | `N > 90` | line, sampled x labels, tooltip, dataZoom/brush/aggregation | permanent points and dense labels |

### Container And Plot Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleH = 28-48px
metricH = 0-64px
legendH = 20-28px
xAxisH = 28-56px
footerH = 0-24px

titleMetricGap = 8-12px
metricLegendGap = 8-12px
legendPlotGap = 8-12px
plotXAxisGap = 6-10px
```

Recommended default:

```text
titleH = 36px
metricH = 48px when summary metrics are visible, otherwise 0px
legendH = 24px
xAxisH = 36px
footerH = 0px or 20px
```

Plot layout:

```text
yAxisW = clamp(36px, maxYAxisLabelWidth + 8px, 80px)
rightGap = 40-64px when target/average labels sit outside the plot
rightGap = 8-16px otherwise

chartTotalWidth = yAxisW + plotWidth + rightGap
chartX = P + (CW - chartTotalWidth) / 2
plotX = chartX + yAxisW

if chartTotalWidth > CW:
  chartX = P
  plotWidth = CW - yAxisW - rightGap

plotY = P + titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
plotHeight = H - P - xAxisH - footerH - plotY
```

For a single ECharts-owned chart surface, translate the budget into `grid`:

```text
grid.left = yAxisW
grid.right = rightGap
grid.top = titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
grid.bottom = xAxisH + footerH
grid.containLabel = true
```

If title, metric strip, unit, or legend are approved DOM outside ECharts, subtract those bands before mounting ECharts and set `grid` relative to the measured plot viewport. ECharts still owns lines, area fills, points, axes, reference lines, tooltip, axisPointer, brush/dataZoom, and emphasis.

### Header, Metric Strip, And Legend

Header:

```text
titleX = P
titleY = P
filterH = 28px when local filter is visible
filterW = min(actualFilterWidth, CW * 0.48, 300px)
filterX = W - P - filterW
filterY = P + (titleLineHeight - filterH) / 2
titleMaxW = CW - filterW - 12px when filter is visible
unitX = W - P - unitTextWidth when no title-right filter is visible
unitY = P + (titleLineHeight - unitLineHeight) / 2
subtitleX = P
subtitleY = titleY + titleLineHeight + 2-4px
```

Component-local filter:

- Suitable filters include time range, time granularity, metric口径/view, and `同比 / 环比`.
- Priority is `time range -> granularity -> metric口径 -> YoY/MoM`.
- Use one visible group by default. Two groups are allowed only when `W >= 720px`: primary group title-right, secondary group subtitle-right or collapsed into a dropdown.
- Keep filter and legend separate. The filter changes state; the legend explains series.
- `titleAreaH = 40-48px` for inline filter, `60-72px` for two compact groups, and `68-80px` for a separate filter row.
- The line plot height should not fall below `CH * 0.45`. If it would, hide secondary metric values, collapse secondary filter, hide normal data labels, reduce legend height, or enlarge the component before compressing the line plot.
- Responsive behavior: `W >= 720px` may show one or two groups; `480px <= W < 720px` one group; `320px <= W < 480px` main filter with at most three options; `W < 320px` dropdown; `H < 260px` no added filter row.

Metric strip:

```text
metricCount = M
metricGap = 12-24px
metricX = P
metricY = P + titleH + titleMetricGap
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended metric strip content: current value, target, average, peak/low, and change-rate. If width is tight, keep current value and change-rate first; move peak/low/average to tooltip or summary.

Legend:

```text
legendX = P + CW - legendWidth
legendY = P + titleH + titleMetricGap + metricH + metricLegendGap
legendLineWidth = 16-24px
legendIconTextGap = 4-6px
legendItemGap = 12-16px
```

For `6-8` series, default to a highlighted focus series plus muted secondary series or a selector. For more than `8` series, use filtering, facets, or small multiples rather than rendering every line at equal weight.

### Point And Line Geometry

Point x-position:

```text
N = dataPointCount
if N = 1:
  pointX(0) = plotX + plotWidth / 2
elif N = 2:
  sparseMargin = plotWidth * 0.25
  pointX(0) = plotX + sparseMargin
  pointX(1) = plotX + plotWidth - sparseMargin
else:
  pointGap = plotWidth / (N - 1)
  pointX(i) = plotX + i * pointGap
```

For sparse line/area charts, one point must center in the plot area and two points should be placed symmetrically around center. In ECharts, `xAxis.type: 'category'` with `boundaryGap: true` is preferred when it creates this symmetric sparse placement. Do not pin sparse category points to the left edge.

Point y-position:

```text
pointY(value) = plotY + plotHeight * (1 - (value - yMin) / (yMax - yMin))
```

Line and point style:

| Element | Default |
| --- | ---: |
| Primary line width | `2px` |
| Emphasis line width | `2.5-3px` |
| Secondary line width | `1.5px` |
| Normal point radius | `3-4px` when visible |
| Hover point radius | `5-6px` |
| Area fill opacity | `8%-16%` |

Point visibility:

| Data point count | Display strategy |
| ---: | --- |
| `N <= 12` | Points may be visible |
| `13-30` | Hide normal points; show on hover/emphasis |
| `31-100` | Hide normal points and most labels; use tooltip |
| `101-500` | Use zoom/brush or aggregation |
| `N > 500` | Sample, aggregate, paginate, or virtualize |

### Y-Axis Range And Zero Baseline

Default:

```text
yMin = 0
yMax = niceMax(max(dataValues, targetValues, referenceValues) * 1.1)
```

For metrics where a non-zero baseline improves trend readability, such as temperature, conversion rate, margin, inventory ratio, or other bounded/ratio metrics:

```text
range = maxValue - minValue
yMin = niceMin(minValue - range * 0.1)
yMax = niceMax(maxValue + range * 0.1)
```

Rules:

- If `yMin` is not `0`, the chart must not visually imply absolute magnitude comparison from a zero baseline. Add axis labels clearly, keep grid lines visible, and avoid over-dramatic slope styling.
- If negative values exist, show a visible zero baseline.
- `tickCount = clamp(3, floor(plotHeight / 48px), 6)`.
- Keep long units in the title/unit slot, not inside an oversized y-axis label band.

### X-Axis Ordering And Labels

The x-axis must be ordered from source rows before deriving `xAxis.data`, every `series.data`, tooltip payloads, target/reference lines, and click payloads.

Time axes default to ascending chronological order. Period granularity must stay consistent; do not mix day/week/month in one axis unless the component explicitly describes the aggregation.

Label placement:

```text
xLabelCenterX = pointX(i)
xLabelY = plotY + plotHeight + plotXAxisGap
maxLabelCount = floor(plotWidth / minLabelWidth)
minLabelWidth = 44-64px
labelStep = ceil(N / maxLabelCount)
```

Label strategy:

| Data point count | X-axis label strategy |
| ---: | --- |
| `N <= 8` | Show all labels |
| `9-16` | Show all or interval labels |
| `17-30` | Show every `2-4` labels and preserve first/last |
| `31-90` | Show weekly/monthly or business milestone labels |
| `N > 90` | Use zoom, aggregation, brush, or sampled labels |

Preserve first/last labels and key business dates before ordinary sampled labels.

### Reference Lines And Labels

Unified target line:

```text
targetY = pointY(targetValue)
targetLineX = plotX
targetLineWidth = plotWidth
targetLabelX = plotX + plotWidth + 4-8px
targetLabelY = targetY - targetLabelHeight / 2
```

Average line:

```text
avgValue = sum(values) / N
avgY = pointY(avgValue)
```

Rules:

- Target, average, warning, upper/lower limit, and forecast split lines use ECharts `markLine`, `markArea`, or data-driven line series. Do not hand-draw them outside ECharts.
- Target/warning lines outrank point value labels if they collide.
- Average lines should be visually weaker than target/warning lines.
- Forecast or estimated segments should use a different line style, such as dashed, with legend/tooltip explanation.

### Data Labels And Change-Rate Labels

Value label:

```text
labelX = pointX
labelY = pointY - 4-6px
```

Rate label:

```text
rateLabelX = pointX
rateLabelY = pointY - valueLabelHeight - 8px
```

Rules:

- `N <= 8`: all labels may show if collision checks pass.
- `9-20`: show first/last, max, min, anomaly, selected, or latest labels only.
- `N > 20`: hide permanent labels and use tooltip.
- Multi-series line charts hide ordinary data labels by default.
- Point change-rate labels default to tooltip. Show them only for latest/current, max growth, max drop, anomaly, or selected points.
- If labels exceed plot top, move them below the point or hide them with tooltip disclosure.
- Keep at least `6-8px` between labels.

### Tooltip, Axis Pointer, Zoom, And State Geometry

Tooltip must include:

```text
Period or ordered category
Series name
Value + unit
Target/reference value when relevant
Attainment or target gap when relevant
YoY/MoM/change-rate when available
Source/period context when relevant
```

For multi-series tooltips, sort series values by value when useful, highlight the hovered series, and visually mute secondary series through ECharts emphasis/blur. Tooltip and legend behavior must agree.

Use `axisPointer` for trend reading. Use brush/dataZoom when points exceed the visible label budget or when users need range inspection.

State behavior:

| State | Line chart behavior |
| --- | --- |
| Loading | Skeleton preserves title, metric strip, legend, plot, and axis bands |
| Empty | Plot area shows empty state; header/metric structure remains stable |
| Error | Plot area shows failure message and retry when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Target missing | Hide target/reference line and keep actual line |
| Current value missing | Break the line at the missing point or show gap; do not convert to `0` |
| Value is zero | Draw zero normally on the zero baseline |
| Change-rate denominator zero | Show `--` and explain denominator is zero in tooltip |
| Negative values | Show visible zero baseline |
| Partial missing series | Break only the missing series at missing points; do not connect across unknown values |
| Too many points | Use sampled labels, dataZoom/brush, aggregation, or fallback table |
