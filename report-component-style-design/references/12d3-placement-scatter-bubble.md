# Scatter And Bubble Chart Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


Use this for scatter charts that show the relationship between two numeric variables, such as customer price and conversion rate, sales and profit margin, visits and purchase rate, or cost and return. Bubble charts add a third numeric metric through point size. Scatter charts are for relationship, clustering, outliers, and quadrant diagnosis; they are not for single-metric comparison, time trend, part-to-whole structure, or dense detail lookup without aggregation.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current scatter only |
| Subtitle/unit/definition | Optional | X/Y metric names, units, period, and口径 |
| Metric strip | Optional | At most `3` items such as sample count, X average, Y average, outlier count, high-value count |
| Legend | Optional | Required when color encodes category |
| Bubble-size legend | Required for bubble chart when space allows | Separate from color legend; can hide on small cards with tooltip explanation |
| X axis | Yes | Numeric axis with unit and range |
| Y axis | Yes | Numeric axis with unit and range |
| Plot area | Yes | Grid, points/bubbles, reference lines, quadrants, trend line |
| Scatter points | Yes | Each object/sample is centered at mapped X/Y coordinates |
| Point labels | Optional | Top, outlier, selected, and hover labels only |
| Target/average lines | Optional | X/Y reference lines for thresholds or mean values |
| Quadrant labels/background | Optional | Weak labels/background when both X and Y references exist |
| Trend line | Optional | Weak line for correlation analysis |
| Tooltip | Yes | Full object, X/Y, size metric, category, target gap, quadrant, period/source |
| Footer metadata | Optional | Source/freshness/note, weak text |
| State mask | Yes | Loading, empty, error, no-permission, missing values, extreme values, too-many-points |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| Only one numeric metric | Do not use scatter; use bar/KPI/table |
| Need time movement | Use line/bar by period |
| Need part-to-whole structure | Use donut/stacked bar/table |
| Need exact row audit | Use table/detail drawer; scatter may be overview |
| `N <= 50` points | Normal scatter, selected/key labels allowed |
| `51 <= N <= 300` | Hide ordinary labels, use hover and transparency |
| `301 <= N <= 1000` | Lower opacity, hide labels, consider sampling/zoom |
| `N > 1000` | Aggregate, sample, density plot, hexbin, or table/detail flow |
| Third metric is size | Bubble chart with sqrt radius mapping and size legend |
| No aggregation strategy for dense points | Scatter is not implementation-ready |

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 260px` | title, compact selected filter, axes, scatter points, tooltip | subtitle, metric strip, legend, point labels, footer; target labels may hide |
| Standard | `320px <= W < 720px` and `H >= 300px` | title, one filter group, metric strip, color legend, axes, scatter, target lines, tooltip | labels only for Top/outlier/selected; size legend may hide |
| Large | `W >= 720px` and `H >= 420px` | full structure, quadrant labels/background, trend line, key labels, right/top legend, bubble-size legend | still avoid all-point labels |
| Dense | `N > 300` | axes, grid, points with lower opacity, tooltip, zoom/brush or aggregation | permanent labels, decorative quadrant fill, heavy reference labels |

### Container And Plot Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleAreaH = 36-56px
metricH = 0px or 36-48px
legendH = 0px or 20-28px
xAxisH = 36-56px
footerH = 0px or 16-24px

titleMetricGap = 8-12px
metricLegendGap = 6-10px
legendPlotGap = 8-12px
plotXAxisGap = 6-10px
```

Recommended defaults:

```text
titleAreaH = 44px
metricH = 40px when summary metrics are visible, otherwise 0px
legendH = 24px when color legend is visible, otherwise 0px
xAxisH = 44px
footerH = 0px or 20px
```

Plot geometry:

```text
yAxisW = clamp(40px, maxYAxisLabelWidth + 8px, 80px)
rightGap = 12-24px

plotX = P + yAxisW
plotY = P + titleAreaH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
plotWidth = W - P - rightGap - plotX
plotHeight = H - P - xAxisH - footerH - plotY
```

If a right legend is used:

```text
legendW = clamp(120px, CW * 0.22, 200px)
legendGap = 16-24px
plotWidth = CW - yAxisW - rightGap - legendW - legendGap
```

Do not let:

```text
plotHeight < CH * 0.48
```

If it fails, hide footer, reduce metric strip, collapse local filter, move/collapse legend, hide point labels, hide reference labels, or enlarge the component before shrinking the plot.

### Header And Component-Local Filter

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

- Suitable filters include `本月 / 本季 / 本年`, `全部 / Top50 / 异常点`, one metric口径 switch, one object-scope switch, or one category dimension switch.
- Priority is `time range -> object scope -> metric口径 -> category dimension`.
- Unsuitable filters include complex combinations such as `地区 + 渠道 + 品类 + 门店 + 时间 + 状态`; those belong to page/global filters.
- Keep filter and legend separate. Filter changes the dataset/view; legend explains point color/size encoding.
- Collapse to a compact dropdown when options exceed `4`, labels are long, or `filterW > filterMaxW`.

### Metric Strip And Legend

Metric strip:

```text
M = metricCount
M <= 3 by default
metricGap = 12-24px
metricX = P
metricY = P + titleAreaH + titleMetricGap
metricW = CW
metricH = 36-48px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended metrics:

- Sample count.
- X average.
- Y average.
- Outlier count.
- Correlation coefficient or high-value count only when it supports the analysis.

Color legend:

```text
legendX = P + CW - legendW
legendY = P + titleAreaH + titleMetricGap + metricH + 4px
legendItemGap = 12-16px
legendIconTextGap = 6px
legendFontSize = 12px
```

Rules:

- Color legend should normally have `<= 5` visible categories.
- More than `5` categories uses dropdown, Top categories, muted secondary groups, or another component.
- Bubble-size legend is separate from color legend. In small components, hide size legend and explain size metric in tooltip/subtitle.

### Axis Range And Coordinate Mapping

X range:

```text
xMin = niceMin(min(xValues))
xMax = niceMax(max(xValues))
xPadding = (xMax - xMin) * 0.08
xMin = niceMin(xMin - xPadding)
xMax = niceMax(xMax + xPadding)
```

If X is a positive magnitude metric such as amount, count, or visits and the business task needs absolute comparison:

```text
xMin = 0
xMax = niceMax(max(xValues) * 1.1)
```

Y range:

```text
yMin = niceMin(min(yValues))
yMax = niceMax(max(yValues))
yPadding = (yMax - yMin) * 0.08
yMin = niceMin(yMin - yPadding)
yMax = niceMax(yMax + yPadding)
```

If Y is a positive magnitude metric:

```text
yMin = 0
yMax = niceMax(max(yValues) * 1.1)
```

If all X or all Y values are equal, add a fallback range around the value so points do not collapse into one axis line. If negative values exist, keep a visible zero baseline.

Coordinate mapping:

```text
pointX = plotX + plotWidth * (xValue - xMin) / (xMax - xMin)
pointY = plotY + plotHeight * (1 - (yValue - yMin) / (yMax - yMin))
```

The scatter mark is centered on `(pointX, pointY)`. It is not positioned by a top-left corner.

Axis titles and units:

- Prefer subtitle form: `X：客单价 / 元 · Y：转化率 / %`.
- If axis titles are visible, place X title at bottom-right and Y title above/left of the plot:

```text
xAxisTitleX = plotX + plotWidth
xAxisTitleY = plotY + plotHeight + 28px
yAxisTitleX = plotX
yAxisTitleY = plotY - 8px
```

### Point And Bubble Geometry

Scatter point radius:

| Point count | Radius |
| ---: | ---: |
| `N <= 50` | `5-6px` |
| `51-300` | `3-5px` |
| `N > 300` | `2-3px` |
| Hover | normal radius + `2px` |

Default:

```text
pointRadius = 4px
hoverRadius = 6px
normalOpacity = 65%-85%
highlightOpacity = 100%
mutedOpacity = 20%-35%
```

Rules:

- Use transparency to reveal overlap.
- Do not add heavy borders to every point; use `1px` border only for focus/outlier/selected points.
- When points are dense, lower opacity, hide labels, use zoom/brush, aggregate, sample, density plot, hexbin, or table fallback.

Bubble radius:

```text
minR = 4px
maxR = 20px
bubbleR = minR + sqrt((sizeValue - sizeMin) / (sizeMax - sizeMin)) * (maxR - minR)
```

Rules:

- Use sqrt mapping so large values do not dominate visually.
- In small components, `maxR <= 16px`; in large components, `maxR <= 24px`.
- Bubble opacity should be `45%-70%`.
- Hover/selected bubbles move to top.
- If bubbles obscure too many points, reduce `maxR`, switch to plain scatter, filter Top N, or use tooltip/table.

### Reference Lines, Quadrants, And Trend Line

X target/reference line:

```text
targetX = plotX + plotWidth * (xTarget - xMin) / (xMax - xMin)
labelX = targetX + 4px
labelY = plotY + 4px
```

Y target/reference line:

```text
targetY = plotY + plotHeight * (1 - (yTarget - yMin) / (yMax - yMin))
labelX = plotX + plotWidth + 4px
labelY = targetY - labelHeight / 2
```

Rules:

- Target lines use `1-1.5px`; average lines use weaker dashed lines.
- Target lines are stronger than average lines.
- Do not show too many reference lines at once.
- If target labels collide with points, axis labels, or edges, hide the label and keep details in tooltip/legend/metadata.

Quadrants:

- Four-quadrant analysis requires both X and Y reference lines.
- Quadrant labels sit in quadrant corners with `8-12px` edge padding.
- Quadrant label font: `11-12px`, weak color.
- Background tint opacity: `4%-8%`; no strong colored blocks that compete with points.

Trend line:

- Use only when relationship/correlation is the task.
- Line width: `1.5-2px`.
- Opacity: `50%-70%`.
- Do not over-emphasize the trend line over the actual point cloud.
- Statistical labels such as `R²` are optional and should appear only for analytical audiences.

### Point Labels

Default label strategy:

| Point count | Label strategy |
| ---: | --- |
| `N <= 20` | All or key labels may show if collision checks pass |
| `21-100` | Show Top, outliers, selected points only |
| `101-500` | Hide by default; show on hover |
| `>500` | Hide by default; use density/aggregation |

Recommended permanent labels:

- Top 3.
- Outliers.
- Current selected point.
- Hover point.

Label position:

```text
labelX = pointX + pointRadius + 4px
labelY = pointY - pointRadius - 4px
```

Fallback:

- If label exceeds right edge, move to point left.
- If label exceeds top edge, move below the point.
- If labels overlap, hide lower-priority labels.

Spacing:

```text
pointLabelGap = 4-6px
labelMinGap = 6-8px
labelEdgeGap = 4px
```

### Tooltip, Grid, And State Geometry

Tooltip must include:

```text
Object name
X metric + unit
Y metric + unit
Bubble size metric when present
Category/color group when present
Target/average comparison when present
Quadrant name when present
YoY/MoM/change-rate when available
Source/period/filter context when relevant
```

Tooltip sizing:

```text
minWidth = 160px
maxWidth = 300px
padding = 8-12px
fontSize = 12px
lineHeight = 18px
```

Grid lines:

- Horizontal grid lines are recommended.
- Vertical grid lines are allowed and should be weaker than horizontal grid lines.
- Grid line width: `1px`.
- Grid lines align with ticks and use weak contrast.

State behavior:

| State | Scatter/bubble behavior |
| --- | --- |
| Loading | Skeleton preserves title, filter, metric strip, legend, axes, grid, and point placeholders |
| Empty | Plot area shows `暂无数据`; axes may remain as structural placeholder |
| Error | Plot area shows failure message and retry when available |
| No permission | Preserve geometry and explain permission without leaking values |
| X missing | Do not draw that point |
| Y missing | Do not draw that point |
| Size missing | Use default point size and explain in tooltip when needed |
| Category missing | Use default category or `未分类` |
| All X or Y values identical | Add fallback axis range |
| Extreme values | Mark as outlier or use zoom/brush/sampling |
| Too many points | Hide labels, lower opacity, aggregate, sample, or density/hexbin |
| Target missing | Hide target/reference line |
| Negative values | Draw normally and show visible zero baseline |
