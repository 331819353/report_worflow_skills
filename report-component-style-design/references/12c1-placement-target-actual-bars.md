# Target/Actual Bar Chart Placement Algorithm
This file was split from `12c-placement-basic-charts.md`. Load it only when this exact component family is present; use `12c-placement-basic-charts.md` as the routing index.


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
