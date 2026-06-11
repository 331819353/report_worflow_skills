# Basic Chart Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

## Target/Actual Bar Chart Placement Algorithm

Use this for column/bar charts that compare actual values against targets and optionally show unit, attainment, gap, YoY, MoM, or other change-rate context.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Subtitle/definition | Optional | Under title, left-aligned; definition entry may sit top-right |
| Component-local filter | Optional | Title-right capsule/dropdown for current chart only |
| Unit | Yes | Top-right beside title when one unit applies to the whole chart |
| Metric strip | Yes | Actual, target, attainment, change-rate, and optional gap |
| Legend | Recommended | Above plot, right-aligned by default; explains actual and target encoding |
| Y-axis labels | Yes | Left of plot, right-aligned to ticks |
| Plot area | Yes | Actual bars, target line/ticks/bars, grid lines, anomaly markers |
| X-axis labels | Yes | Under plot, centered to category group or bar center |
| Data labels | Optional | Above bar only when they fit; otherwise tooltip |
| Target label | Optional | At target line/tick, with reserved right-side gap |
| Footer metadata | Optional | Bottom-left explanation/source and bottom-right freshness |
| Tooltip | Yes | Full category, actual, target, attainment, gap, unit, YoY/MoM |

### Target Encoding Choice

Choose the target encoding from the data shape and reading task:

| Encoding | Use when | ECharts implementation |
| --- | --- | --- |
| Actual bar + unified target line | All categories share one target, or a single business threshold matters | One `bar` series plus ECharts `markLine` or a constant `line` series. Do not hand-draw the line with DOM/SVG. |
| Actual bar + category target tick | Each category has its own target and the main task is target attainment | One `bar` series plus an ECharts `custom` series that draws short horizontal ticks at each category target coordinate. |
| Actual bar + target bar | Category count is small and exact target/actual gap comparison matters | Two grouped `bar` series, actual solid and target muted/outline/low-emphasis. |

Do not use target bars when category count is large and the bars become too narrow. Use target line/ticks, scroll/dataZoom, Top N, or table fallback instead.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 240px` | title, unit, actual/target/change metrics, bars, x-axis labels, tooltip | subtitle, dense legend, data labels, footer; reduce y-axis ticks to 3 |
| Standard | `320px <= W < 720px` and `H >= 280px` | title, metric strip, legend, y-axis, x-axis, target line/ticks, tooltip | sample labels when categories are many |
| Large | `W >= 720px` and `H >= 360px` | full structure, right-aligned legend, target label, key data labels, anomaly markers | dense per-bar labels still require fit proof |
| Many categories | `N > 30` | bars, tooltip, sampled x labels, dataZoom/scroll | permanent data labels; consider horizontal bar, Top N, or pagination |

### Container And Area Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleH = 28-48px
metricH = 36-64px
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
metricH = 48px
legendH = 24px
xAxisH = 36px
footerH = 0px or 20px
```

Plot budget:

```text
yAxisW = clamp(36px, maxYAxisLabelWidth + 8px, 80px)
rightGap = 40-64px when target labels sit outside the plot
rightGap = 8-16px when no outside target label exists

plotX = P + yAxisW
plotY = P + titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
plotWidth = W - P - rightGap - plotX
plotHeight = H - P - xAxisH - footerH - plotY
```

For a single ECharts-owned chart surface, translate the budget into `grid` instead of drawing axes, bars, target lines, or legends by hand:

```text
grid.left = yAxisW
grid.right = rightGap
grid.top = titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
grid.bottom = xAxisH + footerH
grid.containLabel = true
```

If the title, metric strip, or legend is rendered by the approved page/component DOM outside ECharts, subtract those DOM bands before mounting ECharts and set `grid` relative to the measured plot viewport. ECharts still owns the actual bars, axes, target line/ticks/bars, tooltip, emphasis, and data labels.

`plotHeight` must remain large enough for at least three readable y-axis ticks. If it does not, remove optional footer, hide data labels, reduce metric strip rows, enlarge the component, or switch to a compact summary/table.

### Header, Unit, Metric Strip, And Legend

Header:

```text
titleX = P
titleY = P
filterH = 28px when local filter is visible
filterW = min(actualFilterWidth, CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineHeight - filterH) / 2
titleMaxW = CW - filterW - 12px when filter is visible
unitX = W - P - unitTextWidth when no title-right filter is visible
unitY = P + (titleLineHeight - unitLineHeight) / 2
subtitleX = P
subtitleY = titleY + titleLineHeight + 2-4px
```

Component-local filter:

- Suitable filters include `实际 / 目标 / 完成率`, `销售额 / 订单量 / 利润`, `同比 / 环比`, `按金额 / 按完成率`, or `Top5 / Top10 / 全部`.
- The filter belongs in the title area, not in the metric strip. Correct hierarchy is: title + filter, metric strip = summary values, legend = encoding explanation, plot = bars.
- If the filter occupies the title-right area, move the unit into subtitle/metadata instead of crowding title + filter + unit together.
- `titleAreaH = 40-48px` for inline filter; `68-80px` for an under-title filter row.
- The bar plot height should not fall below `CH * 0.45`. If it would, collapse the filter, hide secondary metric-strip items, remove footer, or enlarge the component before compressing the plot.
- Responsive behavior: `W >= 600px` may show a full capsule; `420px <= W < 600px` keeps at most three visible options; `320px <= W < 420px` moves under title or collapses; `W < 320px` uses one dropdown; `H < 260px` cannot add a filter row.

Metric strip:

```text
metricCount = M
metricGap = 12-24px
metricX = P
metricY = P + titleH + titleMetricGap
metricWidth = CW
metricHeight = metricH
metricItemW = (CW - metricGap * (M - 1)) / M
itemX = metricX + index * (metricItemW + metricGap)
itemY = metricY
```

When `M = 4` and width is sufficient, use one row: actual, target, attainment, change-rate. When width is tight, use two rows: actual/target first, attainment/change-rate second. Business dashboards usually left-align metric items; compact cards may center them.

Legend:

```text
legendX = P + CW - legendWidth
legendY = P + titleH + titleMetricGap + metricH + metricLegendGap
legendItemGap = 12-16px
legendIconTextGap = 4-6px
```

If the legend competes with the metric strip or title, move it to the title-right area or hide it only when tooltip and encoding remain unambiguous.

### Bar And Target Geometry

Category band:

```text
N = categoryCount
groupBand = plotWidth / N
groupGap = clamp(8px, groupBand * 0.28, 28px)
barWidth = clamp(8px, groupBand - groupGap, 48px)

barX = plotX + i * groupBand + (groupBand - barWidth) / 2
barCenterX = plotX + i * groupBand + groupBand / 2
barY = valueToY(actualValue)
baselineY = valueToY(0)
barHeight = abs(baselineY - barY)
```

Recommended bar width by category count:

| Category count | Bar width | Rule |
| ---: | ---: | --- |
| `1-3` | `32-48px` | Avoid oversized columns |
| `4-8` | `20-36px` | Standard readable range |
| `9-16` | `12-24px` | Keep labels selective |
| `17-30` | `8-16px` | Sample x-axis labels, hide data labels |
| `30+` | `4-10px` | Use horizontal scroll, dataZoom, or another component |

Unified target line:

```text
targetY = valueToY(targetValue)
targetLineX = plotX
targetLineY = targetY
targetLineWidth = plotWidth
targetLabelX = plotX + plotWidth + 4-8px
targetLabelY = targetY - targetLabelHeight / 2
```

Category target tick:

```text
targetTickWidth = min(barWidth + 8px, groupBand * 0.75)
targetTickX = barCenterX - targetTickWidth / 2
targetTickY = valueToY(targetValue)
```

Grouped actual/target bars:

```text
seriesCount = 2
innerGap = 4-8px
barWidth = clamp(6px, (groupBand - groupGap - innerGap) / 2, 32px)
actualBarX = groupX + (groupBand - 2 * barWidth - innerGap) / 2
targetBarX = actualBarX + barWidth + innerGap
```

### Value Mapping

```text
yMin = 0 by default
yMax = niceMax(max(actualValue, targetValue) * 1.1)
```

If negative values exist:

```text
yMin = niceMin(min(actualValue, targetValue) * 1.1)
yMax = niceMax(max(actualValue, targetValue) * 1.1)
```

Coordinate mapping:

```text
valueToY(value) = plotY + plotHeight * (1 - (value - yMin) / (yMax - yMin))
barHeight = abs(valueToY(value) - valueToY(0))
```

When all values are zero, keep a fallback range such as `0-1` or a business default like `0-100` so the axis remains readable.

### Axis And Label Rules

X-axis labels:

```text
labelCenterX = plotX + i * groupBand + groupBand / 2
labelY = plotY + plotHeight + plotXAxisGap
maxLabelCount = floor(plotWidth / minLabelWidth)
minLabelWidth = 44-64px
labelStep = ceil(N / maxLabelCount)
```

Rules:

- Category labels align with the category group center.
- `N <= 8`: show all x-axis labels and data labels if they fit.
- `9 <= N <= 16`: show all bars; x labels may tilt `30-45deg` or sample; data labels show only key values.
- `17 <= N <= 30`: sample labels and hide permanent data labels.
- `N > 30`: use horizontal scroll/dataZoom or condensed mode.
- `N > 50`: prefer horizontal bar, pagination, or Top N.

Y-axis:

```text
yLabelX = plotX - 6px
yLabelY = tickY
tickCount = clamp(3, floor(plotHeight / 48px), 6)
```

Keep long units in the title/unit slot rather than forcing the y-axis label band wider.

Data labels:

```text
valueLabelX = barX + barWidth / 2
valueLabelY = barY - 4-6px
rateLabelX = barX + barWidth / 2
rateLabelY = valueLabelY - rateLabelHeight - 2px
```

Rules:

- Value label to bar top: `4-6px`.
- Value label to target line: at least `6px`.
- Value label to plot top: at least `4px`.
- If a label exceeds the plot top, move it inside the bar or hide it and use tooltip.
- Category change-rate labels default to tooltip. Show them permanently only when `N <= 6` and collision checks pass.
- If target and value labels collide, preserve the target label first and move value to tooltip.

### Tooltip And State Geometry

Tooltip must include:

```text
Category
Actual value + unit
Target value + unit
Attainment rate
Target gap
YoY/MoM/change rate when available
Period/source when relevant
```

State behavior:

| State | Bar chart behavior |
| --- | --- |
| Loading | Skeleton preserves title, metric strip, legend, plot, and axis bands |
| Empty | Plot area shows empty state; header and metric strip remain stable |
| Error | Plot area shows failure message and retry when available |
| No permission | Preserve header/metric/plot geometry and explain permission without leaking values |
| Target missing | Hide target line/ticks/bars and keep actual bars; tooltip states target unavailable |
| Actual missing | Do not draw a fake zero bar; show missing state for that category in tooltip/table |
| Actual is zero | Draw zero normally; do not treat it as missing |
| Change-rate denominator zero | Show `--` and explain denominator is zero in tooltip |
| Negative values | Keep visible zero baseline; bars extend up/down from it |
| Too many categories | Use sampled labels, dataZoom/scroll, Top N, or fallback chart/table |

## Line Trend Chart Placement Algorithm

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

## Combo Chart Placement Algorithm

Use this for Combo charts that show a real relationship between scale and trend/rate/target on one shared category or time axis, such as `销售额 + 增长率`, `订单量 + 转化率`, `收入 + 利润率`, `实际值 + 目标线`, `流量 + CTR`, or `成本 + ROI`. A Combo chart is not a way to place unrelated charts in one card.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown, affects only this Combo |
| Subtitle/unit | Optional | Under title or beside axis names |
| Metric strip | Optional | Max `3` summary metrics; hide before plot shrink |
| Legend | Yes | Above plot or title-function area; separate from filter |
| Plot area | Yes | Bars, lines, target/reference, grid, tooltip guide |
| Left y-axis | Yes | Amount/count/scale metric |
| Right y-axis | Conditional | Rate/percent/efficiency when dual axis is justified |
| X-axis | Yes | Shared categories/time periods |
| Footer/source | Optional | Weak bottom text; hide first when height fails |

### Type Choice

| Type | Use when | Limit |
| --- | --- | --- |
| Bar + line | Scale and rate/trend must be read together | Default Combo |
| Bar + target/reference line | Actual values need a standard/target benchmark | Target may be `markLine` or constant line |
| Grouped bar + line | Up to two scale series plus one rate line | Bar series `<=2`, categories normally `<=12` |
| Stacked bar + line | Composition contributes to a total and one efficiency line matters | Stacked parts `<=4`, line series `<=1` |
| Dual y-axis | Units differ and the relationship is explicit | Both axes show units and tooltip exact values |

Reject Combo and split the view when metrics are unrelated, series exceed `4` visible items, the right axis implies false correlation, labels cannot fit, or the user needs exact audit over relationship reading.

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Width tier padding:

| Width | P |
| --- | ---: |
| `<320px` | `12px` |
| `320-480px` | `16px` |
| `480-720px` | `20px` |
| `>=720px` | `24px` |

Recommended size:

- Default `W = 560-960px`, `H = 360-480px`.
- Minimum `W = 320px`, `H = 240px`.
- Small `W < 360px` or `H < 260px` keeps only title, collapsed filter, main bar, main line/target, axes, and tooltip.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
legendH = 20-28px
xAxisH = 32-56px
footerH = 0-24px
plotH = CH - titleAreaH - metricH - legendH - xAxisH - footerH - gaps
require plotH >= CH * 0.48
```

If `plotH` fails:

1. Hide footer/source row.
2. Reduce metric strip to the primary value or remove it.
3. Collapse legend to key series or `图例 ▾`.
4. Collapse local filter to one dropdown capsule.
5. Hide ordinary data labels and line points.
6. Sample x-axis labels or add dataZoom.
7. Enlarge/split the component before accepting a smaller plot.

### Header And Component-Local Filter

```text
titleX = P
titleY = P
titleLineH = 22-24px
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - min(filterW, filterMaxW)
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - min(filterW, filterMaxW) - 12px
```

Component-local filter:

- Suitable: `销售额 / 订单量 / 利润`, `月 / 季 / 年`, `日 / 周 / 月`, `实际 / 目标 / 完成率`, `同比 / 环比`, `金额 / 数量 / 占比`.
- Unsuitable: large region, channel, category, store, user, status, or permission-scope filters that change page/query scope.
- If `filterW > filterMaxW`, collapse to a compact dropdown such as `销售额 ▾`.
- Keep filter and legend separate: filter changes the component state; legend explains visual encodings.

### Metric Strip

Metric strip is optional and should not repeat the chart's whole story. Use at most `3` items such as total value, latest line value/change, and target attainment.

```text
metricX = P
metricY = P + titleAreaH + 8px
metricH = 36-48px
metricGap = clamp(12px, CW * 0.04, 24px)
metricItemW = (CW - metricGap * (metricCount - 1)) / metricCount
```

Hide secondary metrics before shrinking the plot.

### Legend

```text
legendW = measuredLegendWidth
legendH = 20-28px
legendX = P + CW - legendW
legendY = P + titleAreaH + metricH + 4px
```

Rules:

- Required items normally include `■ 销售额`, `— 增长率`, and optional `┄ 目标`.
- Recommended legend items `<=4`, hard max `5`.
- Legend click may toggle series, but it must retain at least one primary bar/scale series and one valid comparison/target story, or the component must switch to an explicit split/empty state instead of showing a misleading orphan line.
- If legend and filter compete, collapse the legend to key series or a dropdown; do not merge legend and filter into one control.

### Plot And Axes

```text
leftAxisW = clamp(40px, maxLeftAxisLabelWidth + 8px, 80px)
rightAxisW = hasRightAxis ? clamp(36px, maxRightAxisLabelWidth + 8px, 72px) : 0
rightGap = hasTargetRightLabel ? 40-64px : 8-16px
plotX = P + leftAxisW
plotY = P + titleAreaH + metricH + legendH + topGaps
plotW = W - P - rightGap - rightAxisW - plotX
plotH = H - P - xAxisH - footerH - plotY
```

Left y-axis:

- Default min is `0`.
- Max is `niceMax(max(barValues, targetValues) * 1.1)`.
- Negative values require a visible zero baseline and `niceMin/niceMax`.

Right y-axis:

- Use only for percent/rate/growth/efficiency when units differ and the relationship is explicit.
- Percent/rate may start from `0`; growth can include negative values with a visible zero baseline.
- Axis unit labels must be visible or stated in subtitle/tooltip.

### X-Axis And Category Density

```text
bandW = plotW / N
categoryCenterX[i] = plotX + i * bandW + bandW / 2
xLabelY = plotY + plotH + 6-10px
minLabelW = 44-64px
maxLabelCount = floor(plotW / minLabelW)
labelStep = ceil(N / maxLabelCount)
```

Density:

- `N <= 8`: all labels.
- `9-16`: tilt or sample labels.
- `17-30`: sample labels and hide ordinary labels.
- `>30`: add scroll/dataZoom, aggregate, or switch to a trend/table fallback.

### Bar, Line, And Target Geometry

Single bar:

```text
barW = clamp(8px, bandW * 0.48, 40px)
barX[i] = categoryCenterX[i] - barW / 2
barBaseY = leftValueToY(0)
barY[i] = leftValueToY(value)
```

Grouped bars:

```text
innerGap = 4-8px
barW = clamp(6px, (bandW * 0.72 - innerGap * (S - 1)) / S, 28px)
groupW = S * barW + (S - 1) * innerGap
barX[i,s] = categoryCenterX[i] - groupW / 2 + s * (barW + innerGap)
```

Line:

```text
linePointX[i] = categoryCenterX[i]
linePointY[i] = rightOrLeftValueToY(value)
lineWidth = 2px
emphasisLineWidth = 2.5-3px
pointR = 3-4px
hoverPointR = 5-6px
```

When `N > 20`, hide normal points and show them on hover/emphasis only.

Target/reference:

```text
targetLineW = 1-1.5px
targetLineStyle = dashed
targetLabelX = plotX + plotW + 4-8px
targetLabelFont = 11-12px
```

If the right gap cannot hold the target label, move target text to legend/tooltip.

Draw order:

```text
grid -> bars -> target/reference -> line -> points -> key labels -> tooltip guide
```

### Labels And Tooltip

Labels:

- Bar labels are not all-on by default. `N <= 6` may show all if fit; `7-12` shows max/min/anomaly/selected; `>12` hides ordinary labels.
- Line labels show latest, max/min, selected, or anomaly.
- Minimum label gap is `6-8px`; labels keep `4px` from plot top and `6px` from target/reference lines.
- If labels collide, preserve key line/target labels and hide ordinary bar labels.

Tooltip:

- Required with axis trigger.
- Width `180-320px`, padding `8-12px`, font `12px`, line height `18px`.
- Order matches legend: bar metrics first, line/rate metrics second, target/reference last.
- Include category/period, values, units, target/gap/attainment when relevant, active local filter, source/period, and denominator-zero or missing-value notes.
- Position near the pointer and flip left/down/up when near the right, top, or bottom boundary; do not clip tooltip content inside the chart card.

### Responsive And States

| State / size | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | Keep title, collapsed filter, main bar, main line/target, axes; hide subtitle, metric strip, ordinary labels, footer; collapse legend |
| Standard `360 <= W < 720`, `H >= 300px` | Keep title/filter/legend/bar/line/axes, key labels, target/reference, and clear dual-axis labels |
| Large `W >= 720`, `H >= 380px` | Full metric strip, dual-axis, target labels, anomaly labels, legend toggle |
| Loading | Skeleton preserves title/filter and bar+line plot zones |
| Empty | `暂无数据` centered in plot body |
| Error | `数据获取失败` with retry when supported |
| Missing category | Do not draw the bar; line breaks instead of becoming zero |
| Real zero | Draw at baseline |
| Missing right-axis metric | Hide right axis and line; keep bar if useful |
| Too many categories | Sample labels, add scroll/dataZoom, aggregate, or split |

## Pie And Donut Chart Placement Algorithm

Use this for pie and donut charts that explain part-to-whole composition, such as channel share, user type distribution, cost structure, order status, traffic source, or Top category contribution. In report components, donut is the default because the center can carry total, selected category, or key share without making the chart heavier. Pie/donut charts explain structure; they are not for precise ranking, trend, negative values, or complex diagnosis.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current pie/donut only |
| Subtitle/unit/definition | Optional | Period, scope, unit, or definition entry |
| Metric strip | Optional | At most `2-3` items such as total, max category, category count, or change-rate |
| Pie/donut body | Yes | Donut by default; pie only when center content is unnecessary or space is tight |
| Slices | Yes | Each category as one slice; no negative values |
| Legend | Recommended | Category + percent by default; value only when space passes |
| Center metric | Donut optional | Total, selected category, core share, completion rate, or empty message |
| Outside labels | Optional | Only for large charts with `<= 5` categories |
| Inside labels | Optional | Percent only when slice angle is large enough |
| Tooltip | Yes | Full category, value, percent, rank, change-rate, source/period |
| Footer metadata | Optional | Source/freshness/note, weak text |
| State mask | Yes | Loading, empty, error, no-permission, all-zero, too-many-categories |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| Category count `2-4` | Best fit for pie/donut |
| Category count `5-6` | Acceptable; legend is preferred over outside labels |
| Category count `7-8` | Use cautiously; merge small items or show legend only |
| Category count `> 8` | Use `Top5 + 其他`, bar chart, table, or detail view |
| Need exact comparison | Prefer bar chart/table |
| Shares are very similar | Prefer bar chart/table |
| Need time trend | Use line/bar by period |
| Negative values exist | Pie/donut is invalid |
| All values are `0` | Show empty/all-zero state, not a broken full chart |

Merge rule:

```text
sort categories by value desc
keep TopN, default TopN = 5
otherValue = total - sum(TopN)
merge when categoryCount > 6 or singleCategoryPercent < 3%
```

Rules:

- `其他` stays last and uses a weaker/neutral color.
- If `其他` becomes the largest item, the chart should warn that categories are too fragmented or switch to a ranked bar/table.
- Zero-value categories do not draw slices; disclose them in tooltip/legend/detail when needed.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Tiny | `W < 260px` or `H < 220px` | title, compact selected filter, donut/pie body, center total when possible, tooltip | metric strip, footer, outside labels, full legend |
| Small | `W < 320px` or `H < 260px` | title, single capsule filter, donut/pie, center total/core share, `2-3` legend items or tooltip | subtitle, metric strip, outside labels, footer |
| Standard | `320px <= W < 640px` and `H >= 300px` | title, one filter group, optional metric strip, donut, bottom legend, tooltip | outside labels hidden by default |
| Large | `W >= 640px` and `H >= 360px` | title, filter, `2-3` metrics, donut, right legend, center metric, optional outside labels for `<=5` categories | still merge/replace when categories exceed budget |

### Container And Chart-Area Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleAreaH = 36-56px
metricH = 0px or 32-44px
footerH = 0px or 16-24px

titleMetricGap = 8-12px
metricChartGap = 8-12px
chartFooterGap = 8-12px
```

Recommended defaults:

```text
titleAreaH = 44px
metricH = 40px when summary metrics are visible, otherwise 0px
footerH = 0px or 20px
```

Chart area:

```text
chartAreaY = P + titleAreaH + titleMetricGap + metricH + metricChartGap
chartAreaH = H - P - footerH - chartFooterGap - chartAreaY
chartAreaW = CW
```

Do not let:

```text
chartAreaH < CH * 0.50
```

If it fails, hide footer, reduce metric strip, collapse local filter, use bottom/compact legend, hide outside labels, or enlarge the component before shrinking the pie/donut body.

### Header And Component-Local Filter

Header:

```text
titleX = P
titleY = P
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding * 2
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px when filter is visible
subtitleX = P
subtitleY = titleY + titleLineH + 2-4px
```

Component-local filter:

- Suitable filters include `金额 / 订单数 / 用户数`, `本月 / 本季 / 本年`, one category dimension switch such as `渠道 / 品类 / 区域`, `实际 / 目标`, or one status口径 such as `支付 / 退款 / 完成`.
- Priority is `metric口径 -> time range -> category dimension`.
- Unsuitable filters include complex combinations such as `地区 + 门店 + 渠道 + 品类 + 状态 + 时间`; those belong to page/global filters.
- Use capsule sliding buttons for `2-4` short options. Use a compact dropdown when options exceed `4`, labels are long, or `filterW > filterMaxW`.
- Do not add a new full filter row for long titles in ordinary cards. Collapse to a single capsule before compressing the donut/pie body.

### Metric Strip

```text
M = metricCount
M <= 3 by default
metricGap = 12-24px
metricX = P
metricY = P + titleAreaH + titleMetricGap
metricW = CW
metricH = 32-44px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended metrics: total, max category/share, category count, change-rate, or `其他` share. Keep `2` metrics by default. Do not show total, max, category count, change-rate, `其他`, rank, and average together.

### Main Layout Variants

Right legend, for wide components:

```text
condition: W >= 480px

legendW = clamp(120px, CW * 0.28, 200px)
chartGap = 16-24px
pieAreaX = P
pieAreaY = chartAreaY
pieAreaW = CW - legendW - chartGap
pieAreaH = chartAreaH

pieCenterX = pieAreaX + pieAreaW / 2
pieCenterY = pieAreaY + pieAreaH / 2

legendX = pieAreaX + pieAreaW + chartGap
legendY = chartAreaY + (chartAreaH - legendH) / 2
```

Bottom legend, for standard/narrow components:

```text
condition: W < 480px

legendH = 36-56px
legendBandGap = 12px
pieAreaX = P
pieAreaY = chartAreaY
pieAreaW = CW
pieAreaH = chartAreaH - legendH - legendBandGap

pieCenterX = pieAreaX + pieAreaW / 2
pieCenterY = pieAreaY + pieAreaH / 2

legendX = P
legendY = chartAreaY + pieAreaH + legendBandGap
legendW = CW
```

No legend with outside labels is allowed only when category count `<= 4`, the chart is large enough, and labels pass collision checks. It is not the default report pattern.

### Radius And Donut Ring

Outer radius:

```text
availableW = pieAreaW
availableH = pieAreaH
labelReserve = 0px when outside labels are hidden
labelReserve = 24-48px when outside labels are visible

outerR = min(availableW - 2 * labelReserve, availableH - 2 * labelReserve) / 2
outerR = clamp(48px, outerR, 160px)
```

Donut inner radius:

```text
innerR = outerR * 0.62
```

Ranges:

| Size | Inner radius ratio |
| --- | ---: |
| Small | `0.56-0.60` |
| Standard | `0.60-0.66` |
| Large | `0.64-0.70` |

Rules:

- Ring thickness should remain visually readable: `outerR - innerR = outerR * 0.32-0.42`.
- The center metric must fit inside the inner radius. If not, shorten unit, reduce decimals, use `万/亿`, or expose full value in tooltip.
- Do not increase radius until it touches legend, outside labels, title, or card edge. Shrink deliberately after reserving legend and label zones.

### Sector Geometry

```text
total = sum(value[i])
percent[i] = value[i] / total
angle[i] = percent[i] * 360deg
startAngle = -90deg
sectorStartAngle[i] = startAngle + sum(angle[0..i-1])
sectorEndAngle[i] = sectorStartAngle[i] + angle[i]
sectorMidAngle[i] = (sectorStartAngle[i] + sectorEndAngle[i]) / 2
```

Slice gap:

| Category count | Gap |
| ---: | ---: |
| `2-4` | `1.5-2deg` |
| `5-8` | `0.8-1.5deg` |
| `>8` | Merge or switch chart |

### Labels And Guide Lines

Default label strategy:

- Do not show all labels on the chart surface.
- Use legend for category + percent.
- Use tooltip for exact value, full name, rank, period, and change-rate.

Outside labels:

```text
condition: categoryCount <= 5 and large chart
labelGap = 12-24px
labelR = outerR + labelGap
labelX = pieCenterX + labelR * cos(sectorMidAngle)
labelY = pieCenterY + labelR * sin(sectorMidAngle)
```

Alignment:

```text
if cos(midAngle) > 0: textAlign = left
if cos(midAngle) < 0: textAlign = right
near top/bottom: textAlign = center
```

Guide line:

```text
lineStartR = outerR
lineMiddleR = outerR + 8px
lineEndR = outerR + 16px
lineStart = center + lineStartR * angleVector
lineMiddle = center + lineMiddleR * angleVector
lineEndX = labelX +/- 4px
lineEndY = labelY
```

Rules:

- Guide line width: `1px`, weak color.
- Do not use outside labels when category count exceeds `5`.
- Avoid guide-line crossing. If labels collide, hide outside labels and rely on legend/tooltip.

Inside labels:

- Only percent labels are allowed by default.
- Hide inside labels when slice angle `< 18deg`.
- Do not place long category names inside slices.

### Center Metric

Donut center content must align exactly to the donut center:

```text
centerTextX = pieCenterX
centerTextY = pieCenterY
centerTextMaxW = innerR * 1.5
centerValueFontSize = clamp(18px, outerR * 0.22, 28px)
centerSubFontSize = 11-12px
```

Recommended center content:

- Total value and `总计`/unit.
- Selected category and share on hover/selection.
- Core share such as `Top1 占比 42%`.
- Completion rate for a dedicated single-progress semi-donut, not mixed with normal composition.
- Empty/all-zero message when applicable.

Do not put multiple metrics, long definitions, or full口径 text in the donut center.

### Legend

Default legend item:

```text
color dot + category name + percent
```

Optional, only when space passes:

```text
color dot + category name + percent + value
```

Legend sizing:

```text
legendFontSize = 12px
legendLineHeight = 18-20px
dotSize = 8-10px
dotTextGap = 6px
legendItemVGap = 6-8px
legendItemHGap = 12-16px
minLegendItemW = 88-120px
legendColumnCount = floor(legendW / minLegendItemW)
```

Rules:

- Right legend for wide components; bottom legend for standard/narrow components; tooltip-only or top items for small components.
- Legend is the default permanent label surface. Avoid duplicating the same category/percent in legend, outside label, inside label, and center at the same time.
- If legend cannot fit all categories after `Top5 + 其他`, use scroll, tooltip, detail drawer, or switch to bar/table.

### Tooltip And State Geometry

Tooltip must include:

```text
Category
Value + unit
Percent
Change-rate when available
Rank when available
Source/period/filter context when relevant
```

Tooltip sizing:

```text
minWidth = 160px
maxWidth = 280px
padding = 8-12px
fontSize = 12px
lineHeight = 18px
```

State behavior:

| State | Pie/donut behavior |
| --- | --- |
| Loading | Skeleton preserves title, filter, metric strip, circular placeholder, and legend placeholder |
| Empty | Center or chart area shows `暂无数据`; header/legend geometry remains stable |
| Error | Chart area shows failure message and retry when available |
| No permission | Preserve geometry and explain permission without leaking values |
| All values zero | Show empty ring or `暂无有效占比`, not fake shares |
| One category | Draw full ring/slice and label `100%` |
| Category value zero | Do not draw slice; disclose in tooltip/legend/detail when needed |
| Negative value | Pie/donut invalid; switch chart or show data validation state |
| Too many categories | Merge as `Top5 + 其他` or switch to ranked bar/table |
| Change-rate denominator zero | Show `--` and explain denominator condition in tooltip |
