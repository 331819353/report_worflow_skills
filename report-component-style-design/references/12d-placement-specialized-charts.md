# Specialized Chart Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

## Radar Chart Placement Algorithm

Use this for radar charts that show one object across several comparable dimensions, such as operating health, capability assessment, product competitiveness, channel scoring, user profile, or actual-vs-target score. A radar chart is for reading shape, balance, strengths, weaknesses, and target gaps. It is not the default for exact value comparison.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current radar only |
| Subtitle/unit/definition | Optional | Explains period, score model, `单位：分 · 满分100`, or definition entry |
| Metric strip | Optional | At most three summary metrics such as score, target, attainment, or change-rate |
| Legend | Required for multiple series | Separate from filter; explains actual, target, previous, or object series |
| Radar grid | Yes | Circular coordinate system with polygon grid by default |
| Dimension axes | Yes | Evenly distributed radial axes |
| Dimension labels | Yes | Outside outer ring, quadrant-aligned |
| Actual polygon | Yes | Solid line plus light fill |
| Target/previous polygon | Optional | Dashed or weaker outline; no heavy fill |
| Data points | Optional | Actual points visible by default for single/dual-series small radars |
| Value labels | Optional | Key values only; exact values default to tooltip |
| Footer metadata | Optional | Source/freshness/note, weak text |
| Tooltip | Yes | Dimension, actual, target, attainment, change-rate, raw value when standardized |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| `N = 3-4` dimensions | Allowed, but shape information is weak |
| `N = 5-8` dimensions | Recommended |
| `N = 9-10` dimensions | Allowed only with short labels, no dense value labels, and tooltip disclosure |
| `N > 10` dimensions | Do not use radar; split dimensions, use facets, bar chart, or table |
| Series count `1-2` | Recommended |
| Series count `3` | Maximum normal visible count |
| Series count `> 3` | Use component-local selector, facets, table, or another chart |
| Mixed raw units | Standardize to a shared score such as `0-100` before plotting |
| User needs exact comparison | Use table, bar chart, or detail drawer instead of relying on radar shape |

Radar values must share one comparable scale. If dimensions come from different units such as amount, rate, cost, and risk count, plot standardized scores and expose raw values in tooltip/detail. Do not draw unrelated raw units on the same radar radius.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 260px` | title, compact selected filter, radar, dimension labels, tooltip | subtitle, metric strip, footer, ordinary value labels, complex legend |
| Standard | `320px <= W < 720px` and `H >= 300px` | title, one filter group, up to three metrics, legend, radar, dimension labels | value labels only for max/min/anomaly |
| Large | `W >= 720px` and `H >= 420px` | full structure, `2-3` summary metrics, actual/target/previous, key value labels | still keep series `<= 3` and dimensions `<= 10` |
| Too small | `W < 280px` or `H < 240px` | selected value plus tooltip or compact list | consider table/list fallback instead of radar |

### Container And Plot Budget

```text
P = clamp(16px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleAreaH = 40-48px for inline title/filter/subtitle
titleAreaH = 64-80px when an under-title filter row is unavoidable
metricH = 0px or 36-48px
legendH = 0px or 20-24px
footerH = 0px or 16-20px

titleMetricGap = 8-12px
metricLegendGap = 6-10px
legendPlotGap = 8-12px
plotFooterGap = 8-12px
```

Plot layout:

```text
plotX = P
plotY = P + titleAreaH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
plotW = CW
plotH = H - P - footerH - plotFooterGap - plotY

centerX = plotX + plotW / 2
centerY = plotY + plotH / 2
```

If title, metric strip, and legend make the radar visually too low, the center may move upward by at most:

```text
centerY = plotY + plotH / 2 - min(4px, plotH * 0.04)
```

Do not let `plotH < CH * 0.50` for a normal radar chart. If it would, collapse the filter, hide the metric strip/footer/value labels, reduce legend height, or enlarge the component before compressing the radar body.

### Header, Local Filter, Metric Strip, And Legend

Header:

```text
titleX = P
titleY = P
filterH = clamp(24px, H * 0.08, 32px)
filterW = min(actualFilterWidth, CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px when filter is visible
subtitleX = P
subtitleY = titleY + titleLineH + 2-4px
```

Component-local filter:

- Suitable filters include `本月 / 本季 / 本年`, `实际 / 达成率 / 评分`, `本期 / 上期`, one small object switch such as `部门A / 部门B / 部门C`, or one metric口径 switch.
- Priority is `time range -> object switch -> metric口径 -> comparison method`.
- Unsuitable filters include complex combinations such as `地区 + 渠道 + 门店 + 品类 + 时间 + 状态`; those belong to page/global filters.
- Use capsule sliding buttons for `2-4` short options. Use a single capsule dropdown when options exceed `4`, labels are long, or `filterW > min(CW * 0.45, 280px)`.
- Keep filter and legend separate. Correct: filter `本月/本季/本年`, legend `实际/目标`. Wrong: one mixed row `实际 目标 本月 本季 本年`.
- If `H < 240px`, do not add a separate filter row.

Metric strip:

```text
metricCount = M
M <= 3 by default
metricGap = 12-24px
metricX = P
metricY = P + titleAreaH + titleMetricGap
metricW = CW
metricH = 36-48px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended content: `综合分`, `目标`, `达成率`, or one `较上期` change-rate. Do not show score, target, attainment, change-rate, highest, lowest, mean, and rank at the same time. When width is tight, keep two metrics or move strongest/weakest dimensions to tooltip/summary.

Legend:

```text
legendX = P + CW - legendW
legendY = P + titleAreaH + titleMetricGap + metricH + metricLegendGap
legendItemGap = 12-16px
legendIconTextGap = 4-6px
```

Rules:

- Legend is required for `2+` series and optional for a single unambiguous actual series.
- Maximum normal visible legend items: `3`.
- If legend items exceed `3`, use a selector/dropdown, facets, or small multiples instead of rendering every series at equal weight.
- Legend should sit above the plot, right-aligned by default. In narrow components, center it or collapse secondary series before shrinking the radar.

### Radius And Polar Coordinates

Reserve label space before choosing radius:

```text
labelOuterGap = 12-20px
labelMaxH = 16-32px
labelMaxW = 48-80px

R = min(
  plotW / 2 - labelMaxW - labelOuterGap,
  plotH / 2 - labelMaxH - labelOuterGap
)

R = clamp(48px, R, 180px)
```

Recommended ranges:

| Container | Radar radius |
| --- | ---: |
| Small | `48-72px` |
| Standard | `72-120px` |
| Large | `120-180px` |
| Big-screen | `180px+`, only with deliberate label/legend proof |

Coordinate model:

```text
N = dimensionCount
startAngle = -90deg
angleStep = 360deg / N
theta[i] = -PI / 2 + i * 2PI / N

r(value) = R * (value - minValue) / (maxValue - minValue)

pointX[i] = centerX + r(value[i]) * cos(theta[i])
pointY[i] = centerY + r(value[i]) * sin(theta[i])
```

Default scale:

```text
minValue = 0
maxValue = 100
```

If the score scale differs, declare it in the subtitle/unit and tooltip. Do not let ECharts auto-scale each dimension independently unless the metric model explicitly defines different `indicator.max` values and the tooltip explains comparability.

### Grid, Axis, And Shape

Grid layers:

| Radius | Ring count |
| ---: | ---: |
| `R < 70px` | `3` |
| `70px <= R < 120px` | `4` |
| `R >= 120px` | `5` |

Default grid:

- BI reports use polygon grid by default.
- Big-screen or softer display variants may use circular grid, but the radar coordinate system must remain circular.
- Axis lines extend from center to outer ring with weak grid color and `1px` line width.
- Do not stretch the radar into an ellipse. Use uniform scale and center/letterbox inside the assigned plot area.

ECharts mapping:

```text
radar.center = [centerXWithinChart, centerYWithinChart]
radar.radius = R
radar.shape = 'polygon' by default
radar.splitNumber = ringCount
radar.nameGap = labelGap
```

### Dimension Labels

Dimension labels sit outside the outer ring:

```text
labelGap = 12-20px
labelR = R + labelGap
labelX[i] = centerX + labelR * cos(theta[i])
labelY[i] = centerY + labelR * sin(theta[i])
```

Gap by label length:

| Label length | Gap |
| --- | ---: |
| `2-4` Chinese chars | `12px` |
| `4-6` Chinese chars | `14-16px` |
| `> 6` Chinese chars | `18-20px` |
| Small radar | `10-12px` |

Alignment:

```text
if cos(theta) > 0.2: textAlign = left
if cos(theta) < -0.2: textAlign = right
else: textAlign = center

if sin(theta) > 0.2: verticalAlign = top
if sin(theta) < -0.2: verticalAlign = bottom
else: verticalAlign = middle
```

Label length rules:

- Preferred dimension label length: `2-6` Chinese characters.
- `<= 6` characters: one line.
- `7-10` characters: two-line wrap is allowed if collision checks pass.
- `> 10` characters: abbreviate and expose full name in tooltip.
- If labels collide, increase `labelGap`, simplify labels, reduce dimensions, enlarge the component, or switch chart type. Do not shrink labels below `11px`.

### Series, Points, And Value Labels

Actual series:

| Element | Default |
| --- | ---: |
| Actual line width | `2px` |
| Actual fill opacity | `8%-18%` |
| Actual point radius | `3-4px` |
| Hover point radius | `5-6px` |

Target/previous series:

- Per-dimension target: dashed polygon outline, `1.5px`, no fill or very weak fill.
- Unified target such as `80分`: target ring at `targetR = R * targetValue / maxValue`.
- Previous period: dashed/weak line, no heavy fill.
- Multi-object radar: maximum `3` objects; for more, use selector, facets, small multiples, bar chart, or table.

Data point visibility:

| Scenario | Point strategy |
| --- | --- |
| Single series | Show all points when `N <= 8` |
| Actual vs target | Show actual points; target points may hide |
| Multi-series | Hide ordinary points by default; show on hover/emphasis |
| `N > 8` | Reduce point radius or show points only on hover |

Value labels are not default:

| Scenario | Value label strategy |
| --- | --- |
| `N <= 5` | All labels allowed only if collision checks pass |
| `6-8` dimensions | Show max, min, anomaly, or selected values only |
| `N > 8` | Hide permanent labels; use tooltip |
| Multi-series | Hide ordinary value labels |
| Actual vs target | Tooltip carries actual, target, attainment, and gap |

Value label position:

```text
valueLabelR = actualR[i] + 6px
valueLabelX = centerX + valueLabelR * cos(theta[i])
valueLabelY = centerY + valueLabelR * sin(theta[i])
```

If value labels overlap dimension labels, legend, title, or other value labels, hide them and keep exact values in tooltip.

### Tooltip And State Geometry

Tooltip is the primary exact-value reading path. It should include:

```text
Dimension name
Actual score/value + unit
Target score/value when available
Attainment rate or target gap when available
Previous/current comparison when available
Raw value when the radar plots standardized score
Period/source context when relevant
```

Tooltip sizing:

```text
minWidth = 160px
maxWidth = 280px
padding = 8-12px
fontSize = 12px
lineHeight = 18px
```

Position should flip away from right/top/bottom edges so it does not hide the hovered axis label or leave the component.

State behavior:

| State | Radar behavior |
| --- | --- |
| Loading | Skeleton preserves title, filter, metric strip, legend, plot, and label area |
| Empty | Plot area shows empty state without moving header/metric geometry |
| Error | Plot area shows failure message and retry when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Dimension missing | Do not invent a point; tooltip/state explains the missing dimension |
| Value is zero | Draw near the center; do not treat zero as missing |
| Target missing | Hide target outline/ring and keep actual series |
| Unit mismatch | Plot standardized score and expose raw values in tooltip |
| Too many dimensions | Prompt for filtering/splitting or use another chart |
| Too many series | Keep focus series and move others to selector/facet/table |

## Gauge Placement Algorithm

Use this for Gauge charts that show one bounded metric's current status, progress, target gap, or threshold state. Gauge is not a full dashboard page, not a multi-metric comparison view, and not a decorative mechanical dial.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Top-left or block-owned title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current Gauge only |
| Subtitle/unit/definition | Optional | Period, unit, range, denominator, or口径 note |
| Metric strip | Optional | Target, current, gap, change, or status; maximum `3` items |
| Gauge body | Yes | Semicircle by default in report components |
| Background track | Yes | Weak full range |
| Progress arc | Yes | Current value ratio, status/brand color |
| Center value + unit | Yes | Primary visual anchor, centered as one measured group |
| Status label | Recommended | Under center value |
| Min/max labels | Recommended | Arc endpoints or tooltip if space is tight |
| Threshold segments | Optional | `3-4` recommended, `<=5` maximum |
| Target marker | Optional | Short radial tick by default; label only when fit passes |
| Pointer | Optional | Monitoring/risk/load only; not default for completion/progress |
| Legend | Optional | Only when threshold segments need explanation |
| Tooltip | Yes | Exact current/range/target/status evidence |
| Footer metadata | Optional | Source, update time, caveat; hidden first when tight |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| One bounded progress/status metric | Gauge is allowed |
| No min/max range | Use KPI card, progress bar, or table until range is defined |
| User needs trend | Use line/area/bar by period |
| User compares objects/categories | Use bar/table; avoid many same-weight gauges |
| User needs exact audit | Use KPI + table/detail instead of Gauge only |
| Many gauges on one screen | Use unified range/type/colors or switch to KPI/table comparison |
| Completion/progress | Semicircle progress arc; pointer is normally unnecessary |
| Risk/load/temperature/pressure/health score | Pointer or segmented Gauge may be valid |

Gauge must define whether values outside the range are allowed and how they display. The arc is clamped to `0-1`, but the center value may show the true value such as `126%`.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 280px` or `H < 220px` | title, compact selected filter, center value, progress arc, tooltip | subtitle, metric strip, legend, middle ticks, footer, target label |
| Standard | `280px <= W < 560px` and `H >= 240px` | title/filter, subtitle or metrics, center value, arc, min/max, target tick, status label | threshold text, dense ticks, footer |
| Large | `W >= 560px` and `H >= 320px` | full structure, up to three metrics, threshold segments, target label, legend if needed | still keep labels sparse |
| Too small | `W < 220px` or `H < 180px` | KPI/progress fallback preferred | Gauge only if the center value and arc remain readable |

### Container And Area Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleAreaH = 36-56px
metricH = 0-48px
statusH = 0-32px
footerH = 0-24px
```

Recommended default:

```text
titleAreaH = 44px
metricH = 0-40px
statusH = 20-28px
footerH = 0px or 20px
```

Gauge body budget:

```text
gaugeAreaX = P
gaugeAreaY = P + titleAreaH + metricH + topGaps
gaugeAreaW = CW
gaugeAreaH = H - P - footerH - statusH - gaugeAreaY

require gaugeAreaH >= CH * 0.50
```

If `gaugeAreaH` is too small, degrade in this order:

1. Hide footer metadata.
2. Reduce metric strip to one or two priority metrics.
3. Collapse local filter to a compact dropdown.
4. Hide middle ticks and threshold text.
5. Hide target label but keep target tick/tooltip.
6. Hide legend when center status is clear.
7. Use KPI/progress/table fallback.

Do not shrink center value below readable size to preserve optional ticks or labels.

### Header, Local Filter, Metric Strip, And Legend

Component-local filter:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + padding
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  render compact dropdown such as "本月 ▾"

filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Suitable local filters:

- Time range: `本日 / 本周 / 本月`, `本月 / 本季 / 本年`.
- Metric view: `实际 / 目标 / 完成率`, `金额 / 数量 / 占比`.
- Object scope: `整体 / 新客 / 老客`.
- Scenario: `当前 / 预测`.

Complex dimensions such as region + channel + category + store + status belong to page/global filters.

Metric strip:

```text
metricCount <= 3
metricGap = 12-24px
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended sets:

- Target completion: target, current, gap.
- Monitoring: current, status, change.
- Risk/health: current score, threshold, level.

Legend:

- Default no legend.
- Add legend only for threshold segments and keep items `<=4`, maximum `5`.
- If center status text already explains the state, prefer no legend.

### Semicircle Gauge Geometry

Default report Gauge:

```text
startAngle = 180deg
endAngle = 0deg
totalAngle = 180deg
```

Large display variant:

```text
startAngle = 210deg
endAngle = -30deg
totalAngle = 240deg
```

Inner plot:

```text
gaugePadding = clamp(8px, min(gaugeAreaW, gaugeAreaH) * 0.04, 24px)
plotX = gaugeAreaX + gaugePadding
plotY = gaugeAreaY + gaugePadding
plotW = gaugeAreaW - 2 * gaugePadding
plotH = gaugeAreaH - 2 * gaugePadding
```

Center and radius:

```text
centerX = plotX + plotW / 2
centerY = plotY + plotH * 0.72 for 180deg semicircle
centerY = plotY + plotH * 0.58-0.64 for 240deg arc

radiusByWidth = plotW / 2
radiusByHeight = plotH * 0.82
labelReserve = 16-28px
R = min(radiusByWidth, radiusByHeight) - labelReserve
R = clamp(44px, R, 220px)
```

Arc width:

```text
arcW = clamp(8px, R * 0.12, 22px)
```

Recommended ranges:

| Radius | Arc width |
| ---: | ---: |
| `R < 72px` | `8-10px` |
| `72px <= R < 120px` | `10-14px` |
| `120px <= R < 180px` | `14-18px` |
| `R >= 180px` | `18-22px` |

### Value, Target, And Threshold Mapping

```text
ratio = (currentValue - minValue) / (maxValue - minValue)
drawRatio = clamp(0, ratio, 1)
currentAngle = startAngle + drawRatio * (endAngle - startAngle)

targetRatio = (targetValue - minValue) / (maxValue - minValue)
targetRatio = clamp(0, targetRatio, 1)
targetAngle = startAngle + targetRatio * (endAngle - startAngle)
```

Target marker:

```text
targetX = centerX + R * cos(targetAngle)
targetY = centerY - R * sin(targetAngle)
targetMarkLength = arcW + 4-8px
targetMarkWidth = 1.5-2px
targetLabelR = R + 14-24px
targetLabelX = centerX + targetLabelR * cos(targetAngle)
targetLabelY = centerY - targetLabelR * sin(targetAngle)
```

Threshold segment:

```text
segmentStartRatio = (segmentMin - minValue) / (maxValue - minValue)
segmentEndRatio = (segmentMax - minValue) / (maxValue - minValue)
segmentStartAngle = startAngle + segmentStartRatio * (endAngle - startAngle)
segmentEndAngle = startAngle + segmentEndRatio * (endAngle - startAngle)
segmentGapAngle = 1-2deg
```

### Center Value, Ticks, Pointer, And Labels

Center value for semicircle:

```text
valueX = centerX
valueY = centerY - R * 0.38
valueFontSize = clamp(24px, R * 0.32, 42px)
unitFontSize = valueFontSize * 0.45-0.55
unitGap = 4-6px
valueGroupWidth = valueTextWidth + unitGap + unitTextWidth
valueGroupX = centerX - valueGroupWidth / 2
statusY = valueY + valueLineH + 4-6px
```

For circular Gauge:

```text
centerY = plotY + plotH / 2
R = min(plotW, plotH) / 2 - labelReserve
R = clamp(56px, R, 200px)
innerR = R - arcW
valueY = centerY - 4px
```

Ticks:

- Keep min/max labels by default.
- Optional midpoint only when space passes.
- Tick label font is `11-12px`; tick line is weaker than the arc.
- Hide middle ticks in small components.

Pointer:

```text
pointerLength = R - arcW * 0.8
pointerWidth = clamp(2px, R * 0.025, 6px)
centerDotR = clamp(3px, R * 0.04, 8px)
pointerAngle = currentAngle
```

Use pointer only for monitoring/risk/load/temperature/pressure/health-score cases. Keep progress/completion gauges pointer-free by default.

### Interaction And States

Tooltip payload:

```text
metric, current value + unit, min/max, target, gap,
status/threshold interval, change rate, period, source, overflow or denominator note
```

Hover:

- Progress arc highlights.
- Background track weakens.
- Target marker strengthens on hover and shows target tooltip.

Click:

- Optional pin tooltip, open metric detail, or emit linked-filter event when contract exists.

States:

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title/filter/arc/value |
| Empty | Center shows `--` or `暂无数据`; progress arc not drawn |
| Error | `数据获取失败` in Gauge body |
| Missing current | Center `--`; progress arc hidden |
| Missing target | Hide target marker |
| `maxValue == minValue` | Use fallback range and explain in tooltip |
| Value above max | Arc full; center shows real value |
| Value below min | Arc empty; center shows real value |
| Missing thresholds | Single-color progress arc |
| Missing unit | Show value only |

## Scatter And Bubble Chart Placement Algorithm

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

## Parallel Coordinates Placement Algorithm

Use this for parallel coordinate charts that compare many objects across multiple metrics, such as store performance, product profile, user feature analysis, risk samples, operating diagnosis, and model-feature exploration.

### Task Boundary

Parallel coordinates answer:

- How multiple objects perform across `3+` metrics.
- Which objects have similar multi-metric patterns.
- Which objects are abnormal on one or more dimensions.
- Which high-value objects share a common profile.
- Whether adjacent indicators show linked behavior.

Parallel coordinates do not answer:

- `1-2` metric relationship; use scatter or bar.
- Single metric ranking; use sorted bar/table.
- Precise row audit; use table/S2/detail drawer.
- Very wide dimensions without filtering.
- Very large sample lines without opacity, sampling, or aggregation.

### Required Inputs

```text
W = component width
H = component height
P = component inner padding
CW = W - 2P
CH = H - 2P
D = visible dimension count
N = visible sample/object count
```

Data contract:

- Object fields: `id`, `name`, optional `group`, `status`, `rank`, `highlightReason`.
- Dimension fields: `field`, `label`, `unit`, `min`, `max`, `scaleMin`, `scaleMax`, `reverseAxis`, `lowerIsBetter`, `displayMode`.
- Sample values: one numeric or declared categorical value per visible dimension.
- Scale policy: independent axes by default, optional standardized `0-100` or `0-1`.
- Interaction state: selected object, hovered object, active brush ranges, active local filter.
- Source context: period, scope, freshness, aggregation/sampling rule.

Reject the chart before layout when `D < 3`, the user needs only one ranking, exact value reading is primary, or `D > 12`/`N > 500` has no filtering, sampling, aggregation, or scroll plan.

### Area Budget

Slots:

| Slot | Required | Rule |
| --- | --- | --- |
| Header/title | Yes | Block/header owns title when present |
| Component-local filter | Optional | Header right or collapsed dropdown |
| Subtitle/unit/scale note | Optional | Must state independent axes or standardization |
| Metric strip | Optional | Max 3 items |
| Legend/control band | Optional | Group/status meaning, separate from filter |
| Axis title band | Yes | One title per visible dimension |
| Plot | Yes | Dominant multi-axis line area |
| Bottom axis label band | Optional | Min labels/unit hints |
| Footer/definition | Optional | Weak note only |

Recommended slot heights:

```text
titleAreaH = 36-56px
metricH = 0-48px
legendH = 0-28px
axisTitleH = 24-40px
axisBottomH = 20-36px
footerH = 0-24px
plotH >= CH * 0.48
```

Collapse order when height is tight:

1. Footer.
2. Secondary metrics.
3. Legend into compact dropdown.
4. Filter into one dropdown capsule.
5. Axis tick labels except first/last/hovered axis.
6. Non-critical dimensions.
7. Ordinary sample lines through sampling/aggregation.

### Component-Local Filter

Allowed local filters:

- Sample scope: `全部 / Top / 异常`.
- Period: `近7日 / 近30日 / 近90日`.
- Display mode: `原始值 / 标准化`.
- Object type: `门店 / 商品 / 用户`.
- Segment: `高价值 / 低价值`.

Filter geometry:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

If the filter exceeds budget, collapse to one capsule dropdown. Do not add a tall filter row before protecting horizontal axis spacing.

### Plot Coordinates

```text
leftReservedW = 24-40px
rightReservedW = 24-40px
leftReservedW = 40-56px when full tick labels are visible
rightReservedW = 40-56px when full tick labels are visible

plotX = P + leftReservedW
plotY = P + titleAreaH + metricH + legendH + axisTitleH + topGaps
plotW = CW - leftReservedW - rightReservedW
plotH = H - P - footerH - axisBottomH - plotY
```

Axis range:

```text
axisTopY = plotY
axisBottomY = plotY + plotH
```

### Dimension Axis Layout

```text
if D > 1:
  axisGap = plotW / (D - 1)
  axisX[j] = plotX + j * axisGap
else:
  axisX[0] = plotX + plotW / 2
```

Axis spacing:

```text
minAxisGap = 56-72px
minAxisGap = 72-96px when dimension titles are long
```

If `axisGap < minAxisGap`, reduce dimensions, abbreviate labels with tooltip, enable horizontal scroll, or switch to table/scatter/bar. Do not solve the failure by shrinking axis text below readable size.

Dimension count:

| Count | Behavior |
| --- | --- |
| `3-5` | Clearest |
| `6-8` | Recommended upper range |
| `9-12` | Abbreviated labels and sparse ticks |
| `>12` | Dimension filter, horizontal scroll, or another view |

Dimension order must be meaningful: business process order, causal order, importance order, or correlation-neighbor order. Random dimension order fails the component fit check.

### Value Mapping

Default independent-axis mapping:

```text
valueToY(value, j) =
  axisBottomY - (value - min[j]) / (max[j] - min[j]) * plotH
```

For lower-is-better metrics:

```text
reverseAxis[j] = true
valueToY(value, j) =
  axisTopY + (value - min[j]) / (max[j] - min[j]) * plotH
```

All-same values:

```text
if max[j] == min[j]:
  pointY = axisTopY + plotH / 2
  show axis note "数值全相同"
```

Standardized display:

```text
normalizedValue = (value - min[j]) / (max[j] - min[j])
displayRange = 0-100 or 0-1
```

When standardized display is active, subtitle states the rule and tooltip shows original values.

Percentile scaling:

```text
scaleMin[j] = P5
scaleMax[j] = P95
```

Values outside the percentile range clamp near the axis edge and show outlier markers/tooltip context.

Categorical dimensions are allowed only when they are few:

```text
categoryDimensionCount <= 2
categoryCountPerDimension <= 6
```

### Line Geometry

Sample point:

```text
point[j] = (axisX[j], valueToY(value[j], j))
```

Line:

```text
point[0] -> point[1] -> ... -> point[D - 1]
```

Use straight segments by default. Smooth curves are allowed only when broad profile shape matters more than exact crossing interpretation.

Line width:

```text
ordinaryLineW = 1px
highlightLineW = 2-3px
hoverLineW = 2-3px
```

Opacity by sample count:

| Samples | Ordinary opacity |
| ---: | ---: |
| `<= 30` | `45%-70%` |
| `31-100` | `25%-45%` |
| `101-500` | `8%-25%` |
| `> 500` | `3%-10%` plus sampling/aggregation |

Draw order:

1. Ordinary lines.
2. Group lines.
3. Anomaly lines.
4. Hover/selected lines.

Do not give every line a unique color. Ordinary lines use neutral/low-saturation color; Top/selected/anomaly lines carry semantic emphasis.

### Axis Labels And Ticks

Axis title:

```text
axisTitleX[j] = axisX[j]
axisTitleY = plotY - 8px
align = center
fontSize = 11-12px
lineHeight = 14-16px
```

Long titles use one-line ellipsis plus tooltip. Axis title gap from axis top is `6-8px`.

Ticks:

- Default: min and max only.
- Optional: `25%`, `50%`, `75%`.
- Maximum: `2-4` ticks per axis.
- Dense axis mode: show ticks only on first axis, last axis, hovered axis, or selected brush axis.

Tick label position:

```text
tickLabelX = axisX[j] + 4px
tickLabelY = valueToY(tickValue, j)
```

### Brush

Brush covers one dimension axis:

```text
brushW = 16-24px
brushX = axisX[j] - brushW / 2
brushY = selectedRangeTopY
brushH = selectedRangeBottomY - selectedRangeTopY
```

Brush style:

- Weak fill.
- Clear border.
- Top/bottom drag handles.

Brush behavior:

- Matching lines stay normal or highlighted.
- Non-matching lines dim to `5%-15%`.
- Metric strip updates selected sample count.
- Multiple axis brushes default to intersection.
- Brush tooltip states dimension, selected range, and hit count.

### Legend And Metrics

Legend:

- Explains line group/status, not filter state.
- Default position is above plot right.
- Visible legend items `<= 5`; absolute maximum `8`.
- More groups collapse to dropdown, merge groups, or move to local filter.

Metric strip:

- Max 3 items.
- Recommended: sample count, dimension count, anomaly count, selected count, group count, average score.
- Brush updates selected count.

### Tooltip

Sample tooltip includes:

- Object name/id.
- Every visible dimension value and unit.
- Standardized value when active.
- Group/status/highlight reason.
- Active brush hit/miss state.
- Period/source/filter context.
- Missing-value handling.

Axis tooltip includes:

- Metric name.
- Unit.
- Direction: higher-is-better or lower-is-better.
- Range/min/max or percentile range.
- Current brush range.

Tooltip sizing:

```text
minW = 180px
maxW = 340px
padding = 8-12px
rowGap = 4-6px
fontSize = 12px
lineHeight = 18px
```

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, axes, and line placeholders |
| Empty | Plot area shows `暂无数据` |
| Error | Plot area shows `数据获取失败` |
| No permission | Preserve geometry and explain permission |
| Dimensions fewer than 3 | Recommend scatter/bar/table fallback |
| Too many dimensions | Dimension filter, horizontal scroll, or hidden dimensions |
| Too many samples | Sampling, aggregation, low opacity, or density mode |
| Missing dimension value | Break that segment or exclude the sample by rule |
| All same axis values | Use middle-line fallback and tooltip note |
| Unit mismatch | Use independent axes or standardized mode |
| Brush no result | Show `无匹配样本` and keep brush editable |
| Aggregated display | Show group median/mean/P25-P75 rule in subtitle/tooltip |

## Map And Geographic Chart Placement Algorithm

Use this for map and geographic-coordinate charts that answer a spatial question: where values are high/low, where objects cluster, where abnormal regions appear, how coverage differs, or how origin-destination flow moves. The map is the spatial evidence layer, not decorative scenery. If geography is not the decision dimension, use bar, table, line, or scatter instead.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current map only |
| Subtitle/unit/definition | Optional | Period, unit, geography level, metric口径, and map scope |
| Metric strip | Optional | At most `3` items such as total, Top region, covered regions, abnormal count, attainment |
| Base map | Yes | Administrative boundary, simplified basemap, or registered geographic shape; weak visual weight |
| Data layer | Yes | Choropleth, point, bubble, heat, flow, or coverage layer |
| Visual legend | Yes | Color scale, size legend, category legend, or flow-width legend |
| Region/point labels | Optional | Key regions/points only: Top, selected, hover, abnormal |
| Zoom/reset controls | Optional | Only when pan/zoom/drilldown/exploration is supported |
| Drilldown breadcrumb | Optional | For `country -> province -> city -> district` navigation |
| Tooltip | Yes | Full region/point/flow data, unit, rank, target gap, source, period |
| Footer metadata | Optional | Source, freshness, map resource, missing-coordinate count |
| State mask | Yes | Loading, empty, map-resource error, no-permission, missing geo fields, too-many-points |

### Fit Gate And Map Type Choice

| Condition | Decision |
| --- | --- |
| No real geography field, region code, or longitude/latitude | Do not use a map |
| Only comparing a few named regions with no spatial reading task | Prefer bar/table |
| Exact ranking/audit is primary | Use bar/table; map can be overview only |
| Container is narrower than `280px` or shorter than `240px` | Use compact fallback or another component |
| Administrative area metric by province/city/district | Choropleth map |
| Exact locations such as stores/devices/users/sites | Point map |
| Location plus magnitude | Bubble map with sqrt radius mapping and size legend |
| Dense event or activity distribution | Heatmap; do not imply exact point values |
| Origin-destination amount | Flow map with Top N limit; avoid in small cards |
| Point count `N <= 100` | Normal point/bubble map; key labels allowed |
| `101 <= N <= 500` | Hide ordinary labels, lower opacity, use hover |
| `501 <= N <= 2000` | Use clustering or heatmap; optional zoom |
| `N > 2000` | Use heatmap, bins, server-side aggregation, sampling, or table/detail flow |
| Flow count exceeds budget | Show Top N only and disclose remaining flows in tooltip/table |
| Geography shape cannot fit without distortion | Preserve aspect ratio and letterbox; do not stretch |

### Size Tiers

| Tier | Condition | Keep | Remove/collapse first |
| --- | --- | --- | --- |
| Tiny | `W < 320` or `H < 260` | Title, single dropdown filter, map, compact legend, tooltip | Subtitle, metric strip, labels, footer, zoom controls |
| Standard | `320 <= W < 720` and `H >= 300` | Title, one local filter, optional metric strip, map, legend, key labels, tooltip | Secondary metrics, ordinary labels, complex controls |
| Large | `W >= 720` and `H >= 420` | Full map structure, key labels, zoom/reset, drilldown breadcrumb, optional side detail | All-label display still forbidden unless sparse |

Minimum recommended component size:

```text
minW = 280px
minH = 240px
recommendedW = 480-720px
recommendedH = 320-460px
```

### Layout Variables

```text
W = component width
H = component height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
gap = 8-12px
```

Recommended bands:

```text
titleAreaH = 36-56px
metricH = 0-48px
legendOuterH = 0-40px
footerH = 0-24px
```

Map-area requirement:

```text
mapAreaH = CH - titleAreaH - metricH - legendOuterH - footerH - gaps
mapAreaH >= CH * 0.55
```

If `mapAreaH < CH * 0.55`, degrade in this order:

1. Hide footer metadata and move it to tooltip/detail.
2. Reduce metric strip to one or two items.
3. Collapse local filter to single dropdown.
4. Move legend from outer band to compact in-map legend.
5. Hide ordinary labels.
6. Enlarge the component or switch to bar/table.

### Slot Geometry

```text
titleX = P
titleY = P
filterH = clamp(24px, H * 0.08, 32px)
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

For title overflow, collapse the filter before adding a new filter row. Maps need vertical area more than extra header height.

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricItemW = (CW - metricGap * (M - 1)) / M

mapAreaX = P
mapAreaY = P + titleAreaH + metricH + topGaps
mapAreaW = CW
mapAreaH = H - P - mapAreaY - footerH - bottomGaps

mapInnerPadding = clamp(8px, min(mapAreaW, mapAreaH) * 0.04, 24px)
mapViewportX = mapAreaX + mapInnerPadding
mapViewportY = mapAreaY + mapInnerPadding
mapViewportW = mapAreaW - 2 * mapInnerPadding
mapViewportH = mapAreaH - 2 * mapInnerPadding
```

The base map and all geographic data layers fit inside `mapViewport`. Extra horizontal or vertical whitespace is acceptable when needed to preserve geography.

### Component-Local Filters

Suitable local filters:

- Metric口径: `销售额 / 订单数 / 达成率`.
- Comparison view: `实际 / 目标 / 达成率`.
- Period: `本月 / 本季 / 本年`.
- Geography level: `省级 / 市级 / 区县`.
- Object scope: `全部 / Top10 / 异常区域`.

Unsuitable local filters:

- Large multi-condition combinations such as region + channel + category + store + status + time.
- Filters that change page/global scope, permission scope, export scope, backend aggregation, or other components.

Control sizing:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + 4px
filterMaxW = min(CW * 0.45, 280px)
```

When `filterW > filterMaxW`, collapse to one compact dropdown such as `销售额 ▾`. Use one visible local filter group by default.

### Geographic Projection And Fit

For point maps, source rows need:

```text
longitude
latitude
value
optional category/status/name/address
```

For administrative maps, source rows need stable geography keys:

```text
regionCode preferred
regionName allowed only with a declared matching table
value
unit
optional target/change/rank/status
```

Use region codes over display names whenever possible. Missing coordinates or unmatched region codes are excluded from the layer and reported in tooltip, footer metadata, or QA evidence.

For local/simple coordinate mapping:

```text
lonMin/lonMax/latMin/latMax = data or geometry bounds
scaleX = mapViewportW / (lonMax - lonMin)
scaleY = mapViewportH / (latMax - latMin)
scale = min(scaleX, scaleY)
offsetX = (mapViewportW - (lonMax - lonMin) * scale) / 2
offsetY = (mapViewportH - (latMax - latMin) * scale) / 2
pointX = mapViewportX + (lon - lonMin) * scale + offsetX
pointY = mapViewportY + (latMax - lat) * scale + offsetY
```

Latitude is inverted because screen y increases downward.

For larger geographic extents, prefer Web Mercator or the project map engine's projection:

```text
x = (lon + 180) / 360
y = 0.5 - ln((1 + sin(latRad)) / (1 - sin(latRad))) / (4 * PI)
scale = min(mapViewportW / (xMax - xMin), mapViewportH / (yMax - yMin))
screenX = mapViewportX + (x - xMin) * scale + offsetX
screenY = mapViewportY + (y - yMin) * scale + offsetY
```

For administrative shapes:

```text
geoBounds = bbox(all visible region paths)
scale = min(mapViewportW / geoBoundsWidth, mapViewportH / geoBoundsHeight)
mapOffsetX = mapViewportX + (mapViewportW - geoBoundsWidth * scale) / 2
mapOffsetY = mapViewportY + (mapViewportH - geoBoundsHeight * scale) / 2
```

The map must remain centered and proportionally scaled. Do not use independent X/Y stretching, CSS `object-fit: fill`, or transform scaling that warps provinces, coastlines, routes, or point positions.

### Choropleth Map

Use choropleth for administrative-region value, attainment, or risk distribution.

Data mapping:

```text
regionCode/regionName -> value -> color bin
```

Color bins:

```text
levelCount = 5 or 6
business metrics = quantile bins by default
risk/status metrics = named business thresholds
negative + positive values = divergent scale with zero midpoint
```

State rules:

- `0` is a valid low value.
- All-zero values show a low-value scale or an explicit `暂无有效分布` state; do not fake variation.
- Missing values use neutral/no-data fill and remain available in tooltip as missing.
- Negative values require a divergent color scale or a clearly labeled signed metric.

Base map style:

```text
boundaryWidth = 0.5-1px
hoverBoundaryWidth = 1-1.5px
selectedBoundaryWidth = 1.5-2px
baseFill = weak neutral
dataFill = visually stronger than base map
```

### Point, Bubble, And Cluster Maps

Point density:

| Count | Radius | Label behavior |
| ---: | ---: | --- |
| `N <= 50` | `5-6px` | Top/selected/abnormal labels allowed |
| `51-300` | `3-5px` | Ordinary labels hidden |
| `301-1000` | `2-3px` | Opacity down, hover only, consider zoom |
| `>1000` | cluster/heatmap | Labels hidden |

Bubble radius:

```text
minR = 4px
maxR = 20px
bubbleR = minR + sqrt((value - valueMin) / (valueMax - valueMin)) * (maxR - minR)
```

Use `maxR <= 14px` for small components and `maxR <= 24px` for large components. A bubble map must have a size legend or tooltip disclosure that names the size metric and unit.

Opacity:

```text
pointOpacity = 65%-85%
bubbleOpacity = 45%-70%
hoverOpacity = 100%
mutedOpacity = 20%-35%
```

When points overlap severely, lower opacity, cluster, switch to heatmap, or add zoom/detail. Do not solve dense maps by keeping every label visible.

Cluster points:

```text
clusterRadius = 10-24px
clusterTextSize = 11-12px
clusterTextAlign = center
zoomedOut = cluster
zoomedIn = expand
```

### Heatmap Layer

Use heatmap for density and activity intensity, not exact point reading.

```text
heatRadius = clamp(12px, mapViewportW * 0.03, 36px)
heatIntensity = value / maxValue
maxOpacity = 60%-80%
minOpacity = 10%-20%
```

Radius by count:

| Count | Heat radius |
| ---: | ---: |
| `<100` | `24-36px` |
| `100-1000` | `16-28px` |
| `>1000` | `12-20px` |

Do not stack ordinary point labels on top of a heatmap. Use tooltip or a linked detail list for exact areas.

### Flow Map

Use flow maps only when origin-destination movement is the actual question.

```text
lineWidth = minW + sqrt((value - minValue) / (maxValue - minValue)) * (maxW - minW)
minW = 1px
maxW = 6px
lineOpacity = 35%-70%
```

Flow count limits:

| Component size | Default visible flows |
| --- | ---: |
| Small | Top `5` |
| Standard | Top `10` |
| Large | Top `20` |

Use curved lines and optional arrows. If routes form an unreadable bundle, filter to Top N, split by origin/destination, use an OD table, or move the flow map to a large/detail view.

### Labels

Permanent map labels are not the default. Show only:

- Top `3-5` regions or points.
- Selected or hovered item.
- Abnormal/high-risk item.
- Current drilldown focus.

Placement:

```text
regionLabelX = regionCentroidX
regionLabelY = regionCentroidY
pointLabelX = pointX + pointRadius + 4px
pointLabelY = pointY - pointRadius - 4px
```

If a point label leaves the viewport, flip it to the other side. If labels collide, hide lower-priority labels. Labels should generally be `11-12px` with `14-16px` line height.

### Legends And Controls

Legend types:

- Color scale for choropleth/heat.
- Size legend for bubble/flow width.
- Category legend for point category/status.

Default legend location:

```text
legendW = measured
legendH = 20-32px
legendX = mapAreaX + mapAreaW - legendW - 12px
legendY = mapAreaY + mapAreaH - legendH - 12px
```

Use a weak translucent background only when the legend sits on the map. If the legend covers high-value regions, dense points, or key routes, move it to the bottom-left or outside-bottom band. Never place a legend in the map center.

Zoom controls:

```text
controlSize = 28-32px
controlGap = 4px
controlX = mapAreaX + mapAreaW - controlSize - 12px
controlY = mapAreaY + 12px
```

Show zoom/reset only for maps that support exploration, drilldown, or dense point navigation. Static KPI maps can keep only hover tooltip.

### Tooltip And Detail Payload

Choropleth tooltip:

```text
Region, value + unit, target, attainment/gap, YoY/MoM, rank, status, period, source
```

Point/bubble tooltip:

```text
Object name, address or region, value + unit, size metric when present, category/status, change, period, source
```

Heatmap tooltip:

```text
Area or nearby cluster, density/intensity, aggregated count/value, period, source
```

Flow tooltip:

```text
Origin, destination, flow value + unit, share/rank, direction, period, source
```

Tooltip width is `160-300px`, padding `8-12px`, text `12px/18px`, and flips away from the viewport edge.

### State Geometry

| State | Behavior |
| --- | --- |
| Loading | Preserve title/filter/metric/map/legend skeleton geometry |
| Empty | Map area shows `暂无数据` without moving header/legend |
| Map resource missing | Show `地图资源加载失败` and preserve the map viewport |
| Missing longitude/latitude | Skip affected points and expose missing count |
| Region code mismatch | Neutral fill for unmatched region; expose mismatch count |
| All zero values | Show low-value scale or `暂无有效分布`; do not fake differences |
| Negative values | Use divergent scale or explicit signed metric semantics |
| Too many points | Cluster, heatmap, aggregate, sample, or require zoom/detail |
| Too many flows | Top N plus table/detail fallback |
| No permission | Preserve geometry and explain permission without leaking values |

## Candlestick / K-Line Chart Placement Algorithm

Use this for financial, price, quote, exchange-rate, commodity, or market-like data where each time point has `open`, `high`, `low`, and `close`. A candlestick chart is valid only when OHLC volatility matters. If the user only needs a single price trend, use a line chart instead.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current candlestick only |
| Subtitle/unit/definition | Optional | Instrument, market, period, unit, adjustment mode, and delay |
| Metric strip | Recommended | At most `3-4` items such as latest price, change, change rate, volume, amplitude |
| Indicator legend | Optional | MA5/MA10/MA20, volume, or one optional technical indicator |
| Main candlestick plot | Yes | Candles, wicks, moving averages, price axis, crosshair |
| Price Y axis | Yes | Right side by market convention, left side allowed by product convention |
| Time X axis | Yes | Date/time labels sampled by density |
| Volume subplot | Optional, recommended default | Shares the same x positions as candles |
| Technical indicator subplot | Optional | MACD/KDJ/RSI only for professional scenes; off by default |
| High/low markers | Optional | Current visible-range highest and lowest only |
| Crosshair / axis pointer | Recommended | Vertical and horizontal reading aid with current time/price labels |
| Brush / dataZoom | Optional | Required for dense visible history |
| Tooltip | Yes | Time, open, high, low, close, change, change rate, volume, MA values, unit/source |
| Footer metadata | Optional | Source/freshness/delay/adjustment note |
| State mask | Yes | Loading, empty, error, no-permission, missing OHLC, equal prices, insufficient MA |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| Missing any of `open/high/low/close` | Do not use candlestick; use line/table or mark data gap |
| Only one price/value per time point | Use line/area instead |
| No ordered time dimension | Do not use candlestick |
| User is not expected to understand OHLC and volatility is not the task | Use line/KPI/table |
| Need exact audit of all rows | Add table/detail; candlestick is overview |
| Need composition, ranking, relationship, or geography | Use the matching chart family |
| `N <= 30` visible candles | Wide candles, sparse labels allowed |
| `31 <= N <= 80` | Standard candlestick |
| `81 <= N <= 150` | Narrow body, sampled time labels |
| `151 <= N <= 300` | Use brush/dataZoom; thin body |
| `N > 300` | Default to recent window plus dataZoom, aggregation, or detail table |

### Size Tiers

| Tier | Condition | Keep | Remove/collapse first |
| --- | --- | --- | --- |
| Tiny | `W < 360` or `H < 260` | Title, single dropdown filter, main candlestick, price axis, sampled time axis, tooltip | Subtitle, secondary metrics, volume, legend, high/low labels, footer |
| Standard | `360 <= W < 720` and `H >= 320` | Title, one filter, metric strip, main candlestick, volume, price/time axes, tooltip | Secondary MA lines, brush, technical indicators |
| Large | `W >= 720` and `H >= 420` | Full structure, volume, up to `3` MA lines, brush, crosshair, optional one technical subplot | Ordinary per-candle labels still forbidden |

Minimum recommended size:

```text
minW = 320px
minH = 260px
recommendedW = 560-960px
recommendedH = 360-520px
```

### Layout Variables

```text
W = component width
H = component height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
gap = 6-12px
```

Recommended bands:

```text
titleAreaH = 36-56px
metricH = 0-52px
legendH = 0-28px
xAxisH = 24-36px
brushH = 0-28px
footerH = 0-24px
```

Chart height:

```text
chartTopY = P + titleAreaH + metricH + legendH + topGaps
chartH = H - P - chartTopY - xAxisH - brushH - footerH - bottomGaps
```

Main candlestick budget:

```text
mainChartH >= CH * 0.45
```

If `mainChartH < CH * 0.45`, degrade in this order:

1. Hide footer metadata and move it to tooltip/detail.
2. Reduce metric strip to `2-3` items.
3. Hide secondary MA lines and collapse legend to `指标 ▾`.
4. Hide volume subplot.
5. Collapse local filters to one dropdown.
6. Enlarge the component or switch to line/table.

### Slot Geometry

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + 4px
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Collapse the filter to one dropdown before adding an extra filter row. Candlestick charts need vertical plot area.

Metric strip:

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
M = 3 or 4
metricGap = 12-24px
metricItemW = (CW - metricGap * (M - 1)) / M
```

Main plot:

```text
yAxisW = clamp(44px, maxPriceLabelW + 8px, 80px)
leftGap = 8-16px
rightGap = 8-16px
plotX = P + leftGap
plotW = CW - leftGap - yAxisW - rightGap
plotY = chartTopY
priceAxisX = plotX + plotW + 6px
```

Financial market convention prefers the price axis on the right. BI report variants may place it on the left if the product standard requires that.

When volume is present:

```text
volumeH = chartH * 0.22-0.28
mainChartH = chartH - volumeH - volumeGap
volumeGap = 6-10px
volumePlotX = plotX
volumePlotY = plotY + mainChartH + volumeGap
volumePlotW = plotW
volumePlotH = volumeH
```

When one technical indicator subplot is present:

```text
mainChartH = chartH * 0.60-0.66
volumeH = chartH * 0.16-0.20
indicatorH = chartH * 0.16-0.20
volumeH + indicatorH <= chartH * 0.38
```

Do not show multiple technical subplots in a compact report card.

### Component-Local Filters

Suitable local filters:

- Period granularity: `分时 / 日K / 周K / 月K`.
- Range: `1日 / 5日 / 1月 / 6月 / 1年`.
- Adjustment: `不复权 / 前复权 / 后复权`.
- View metric: `价格 / 涨跌幅`, `成交量 / 成交额`.
- Indicator: `MA / MACD / KDJ / RSI` as a compact selector.

Unsuitable local filters:

- Complex instrument discovery such as exchange + sector + industry + symbol + adjustment + indicator + period.
- Filters that change page/global market scope, permission scope, export scope, or other components.

Use one visible filter group by default. Two groups are allowed only when `W >= 720px` and title/subtitle fit passes; otherwise keep period as the visible control and move range to brush/dataZoom or dropdown.

### OHLC Data Contract

Each row must include:

```text
time
open
high
low
close
optional volume
optional change
optional changeRate
```

Validation:

```text
high >= max(open, close)
low <= min(open, close)
time rows sorted ascending before rendering
open/high/low/close numeric and same price unit
```

Invalid OHLC rows are not drawn as normal candles. Mark them as data gaps and expose count/detail in tooltip, footer, or QA evidence.

Time continuity must be declared:

- Trading-calendar mode: missing non-trading days are ignored.
- Real-time mode: gaps show actual elapsed time.
- Unknown mode is a design gap for financial/market charts.

### X Distribution And Candle Geometry

```text
N = visibleDataCount
bandW = plotW / N
candleCenterX[i] = plotX + i * bandW + bandW / 2
bodyW = clamp(3px, bandW * 0.55, 14px)
```

When the chart is very wide and `N` is small, `bodyW <= 18px`. When `bandW < 3px`, switch to thin-line mode, show fewer visible candles, or require dataZoom.

Price range:

```text
priceMin = min(lowValues, maValues)
priceMax = max(highValues, maValues)
pricePadding = max((priceMax - priceMin) * 0.08, priceMax * 0.005)
yMin = niceMin(priceMin - pricePadding)
yMax = niceMax(priceMax + pricePadding)
```

If all prices are equal, expand the fallback range around the price rather than drawing a flat line on the edge.

Coordinate mapping:

```text
priceToY(value) = plotY + mainChartH * (1 - (value - yMin) / (yMax - yMin))
openY = priceToY(open)
closeY = priceToY(close)
highY = priceToY(high)
lowY = priceToY(low)
```

Wick and body:

```text
wickX = candleCenterX
wickY1 = highY
wickY2 = lowY
wickWidth = 1px
bodyX = candleCenterX - bodyW / 2
bodyY = min(openY, closeY)
bodyH = max(1px, abs(openY - closeY))
```

Open equals close renders as a thin body or horizontal mark, not as missing data.

### Rise/Fall Color Semantics

Candlestick colors must be configurable by market convention:

```text
riseColor
fallColor
flatColor
```

Direction:

```text
close > open => rise
close < open => fall
close == open => flat
```

Chinese market convention usually uses red for rise and green for fall. International market convention often uses green for rise and red for fall. The component must name the convention; do not silently use generic positive/negative report colors if the market uses the opposite convention.

### Volume Subplot

Volume bars share candle centers:

```text
volumeBarCenterX[i] = candleCenterX[i]
volumeBarW = bodyW
volumeMax = niceMax(max(volumeValues))
volumeBarH = volumePlotH * volume / volumeMax
volumeBarY = volumePlotY + volumePlotH - volumeBarH
```

Volume color follows candle direction with lower opacity:

```text
volumeOpacity = 45%-70%
```

Missing volume behavior must be declared: hide volume subplot, draw zero, or show missing state. Do not silently mix missing volume with real zero volume.

### Moving Averages And Technical Indicators

Default moving averages:

```text
MA5
MA10
MA20
```

Do not show more than `3` MA lines by default. More indicators require legend toggles, dropdown, fullscreen, or professional-analysis mode.

```text
MA_N[i] = average(close of latest N rows)
maX[i] = candleCenterX[i]
maY[i] = priceToY(MA_N[i])
```

If fewer than `N` rows exist, do not draw the early MA points, or start drawing from the first valid point.

MA style:

```text
lineWidth = 1-1.5px
hoverLineWidth = 2px
opacity = 80%-100%
```

MA lines must not overpower the candles.

Technical indicators such as MACD/KDJ/RSI are optional and off by default unless the component is explicitly for professional market analysis.

### Axes And Label Density

Price ticks:

```text
tickCount = clamp(3, floor(mainChartH / 48px), 6)
```

Recommended:

| Main height | Price ticks |
| ---: | ---: |
| `<160px` | `3` |
| `160-240px` | `4` |
| `240-360px` | `5` |
| `>360px` | `5-6` |

Time label sampling:

```text
minLabelW = 56-72px
maxLabelCount = floor(plotW / minLabelW)
labelStep = ceil(N / maxLabelCount)
```

Keep first/last labels and important month/year boundaries before regular sampling. Time labels align to candle centers.

### High/Low Markers

Show at most the visible-range highest high and lowest low by default.

```text
highLabelX = candleCenterX[highestIndex]
highLabelY = priceToY(highestValue) - 6px
lowLabelX = candleCenterX[lowestIndex]
lowLabelY = priceToY(lowestValue) + 6px
```

Markers flip away from chart edges. Do not label every candle's high/low.

### Crosshair, DataZoom, And Tooltip

Crosshair:

```text
lineWidth = 1px
lineStyle = dashed or thin solid
opacity = 50%-70%
```

The crosshair should expose current time and price labels without dominating the chart.

Use brush/dataZoom when `N > 80`; for `N > 150`, default to a recent visible window. Brush stays at the bottom:

```text
brushX = plotX
brushY = H - P - brushH
brushW = plotW
brushH = 20-28px
```

Tooltip payload:

```text
time
open/high/low/close + unit
change and changeRate
volume
MA values when present
adjustment mode
source/period/delay
```

Tooltip width is `180-320px`, padding `8-12px`, text `12px/18px`, and flips away from viewport edges. A fixed top-left/right tooltip is allowed in professional market charts only if it does not cover the newest candles.

### State Geometry

| State | Behavior |
| --- | --- |
| Loading | Preserve title/filter/metric/main/volume/axis skeleton geometry |
| Empty | Main plot shows `暂无数据`; axes/legend geometry remains stable |
| Error | Preserve geometry and show retry/detail when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Missing OHLC | Skip invalid candles and expose count/detail |
| Missing volume | Hide volume, draw zero, or state missing according to contract |
| Equal prices | Expand y-axis fallback range |
| Time discontinuity | Use declared trading-calendar or real-time spacing mode |
| Adjustment data missing | Hide adjustment filter and note unavailable state |
| Insufficient MA period | Start MA only after enough rows exist |
| Delayed data | Show delay in subtitle or footer |

## Boxplot / Box-And-Whisker Placement Algorithm

Use this for distribution comparison across categories: median, Q1/Q3, IQR, whiskers, outliers, spread, and stability. A boxplot is valid when the business question is about distribution, variance, stability, or abnormal samples. If the user only needs ranking or one aggregate value, use bar, table, or KPI instead.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Component-local filter | Optional | Title-right capsule/dropdown for current boxplot only |
| Subtitle/unit/definition | Optional | Period, unit, sample scope, and outlier rule such as `1.5 * IQR` |
| Metric strip | Optional | At most `3` items such as sample count, global median, IQR, outlier count |
| Legend | Required when multi-series or special marks exist | Outlier, mean, target/reference, series colors |
| Category axis | Yes | X axis for vertical boxplot, Y axis for horizontal boxplot |
| Value axis | Yes | Numeric scale and unit |
| Box body | Yes | Q1-Q3 interval |
| Median line | Yes | Clearer than box border |
| Whiskers and caps | Yes | Normal range by declared rule |
| Outlier points | Recommended | Values outside whisker rule; key/aggregated when dense |
| Mean point | Optional | Weaker than median; only when mean is useful |
| Target/reference line | Optional | SLA, target, industry average, warning threshold |
| Data labels | Optional | Key median, target, extreme outlier only |
| Tooltip | Yes | Full five-number summary, sample count, IQR, outlier count, target gap |
| Footer metadata | Optional | Source/freshness/statistical rule note |
| State mask | Yes | Loading, empty, error, no-permission, sample too small, all equal, too many categories |

### Fit Gate And Chart Type Choice

| Condition | Decision |
| --- | --- |
| Only one aggregate value per category | Do not use boxplot; use bar/KPI/table |
| User does not need distribution/spread/outliers | Do not use boxplot |
| Sample size too small for distribution | Show sample-too-small state or point/line fallback |
| Category count `N <= 8` | Vertical boxplot with all labels |
| `9 <= N <= 16` | Tilt/sample labels, horizontal boxplot, or scroll |
| `17 <= N <= 30` | Horizontal boxplot, scroll, pagination, or Top N |
| `N > 30` | Filter, paginate, Top N, or distribution summary table |
| Long category names | Prefer horizontal boxplot |
| Multi-series comparison | Use grouped boxplot only when series `S <= 3` and categories `N <= 8` |
| Need raw sample audit | Add table/detail drawer; boxplot is summary |
| Need trend over time | Use line/control chart unless distribution by time bucket is required |

### Size Tiers

| Tier | Condition | Keep | Remove/collapse first |
| --- | --- | --- | --- |
| Tiny | `W < 320` or `H < 260` | Title, single dropdown filter, boxplot body, axes, tooltip | Subtitle, metric strip, legend, labels, footer |
| Standard | `320 <= W < 720` and `H >= 300` | Title, filter, optional metrics, axes, boxes, outliers, tooltip | Mean point, secondary labels, extra legend items |
| Large | `W >= 720` and `H >= 420` | Full structure, mean point, target line, key outlier labels, grouped boxplot | All-value labels still forbidden |

Minimum recommended size:

```text
minW = 280px
minH = 240px
recommendedW = 480-720px
recommendedH = 320-460px
```

### Layout Variables

```text
W = component width
H = component height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Recommended bands:

```text
titleAreaH = 36-56px
metricH = 0-48px
legendH = 0-28px
xAxisH = 32-60px
footerH = 0-24px
```

Plot requirement:

```text
plotH = CH - titleAreaH - metricH - legendH - xAxisH - footerH - gaps
plotH >= CH * 0.50
```

If `plotH < CH * 0.50`, degrade in this order:

1. Hide footer metadata and move it to tooltip/detail.
2. Reduce metric strip to `1-2` items.
3. Collapse legend to compact/tooltip disclosure.
4. Collapse filter to dropdown.
5. Hide median/outlier value labels.
6. Switch to horizontal/scroll/table or enlarge the component.

### Slot Geometry

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + 4px
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Collapse the filter before adding a new filter row because the plot needs height for distribution reading.

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
metricGap = 12-24px
metricItemW = (CW - metricGap * (M - 1)) / M

yAxisW = clamp(40px, maxYLabelW + 8px, 80px)
rightGap = 12-24px
rightGap = 40-64px when target labels sit outside the plot
plotX = P + yAxisW
plotY = P + titleAreaH + metricH + legendH + topGap
plotW = W - P - rightGap - plotX
plotH = H - P - xAxisH - footerH - plotY
```

### Component-Local Filters

Suitable local filters:

- Metric: `金额 / 时长 / 成本`.
- Period: `本周 / 本月 / 本季`.
- Category dimension: `按渠道 / 按区域 / 按团队`.
- Scope: `全部 / Top10 / 异常样本`.
- View metric: `实际 / 达成率 / 偏差`.
- Outlier rule only when the audience understands it: `1.5IQR / Min-Max`.

Unsuitable local filters:

- Large combinations such as region + channel + category + person + time + status + outlier rule.
- Filters that change page/global scope, permission scope, export scope, or other components.

### Statistical Contract

Each category needs either raw samples or precomputed statistics with the same declared rule.

Raw-sample contract:

```text
category
value
unit
sampleId optional for outlier detail
series optional
```

Precomputed contract:

```text
category
sampleCount
min
q1
median
q3
max
lowerWhisker
upperWhisker
outlierCount
outliers optional
mean optional
```

Default Tukey rule:

```text
IQR = Q3 - Q1
lowerFence = Q1 - 1.5 * IQR
upperFence = Q3 + 1.5 * IQR
lowerWhisker = min(value >= lowerFence)
upperWhisker = max(value <= upperFence)
outlier = value < lowerFence or value > upperFence
```

Min/max whiskers are allowed only when explicitly declared as `须线规则：Min-Max`; they do not support the same outlier meaning as Tukey.

Sample-size rule:

| Sample count per category | Behavior |
| ---: | --- |
| `0` | Empty/missing category |
| `1` | Draw point or short line; tooltip says sample too small |
| `2-4` | Partial distribution only; avoid strong comparison claims |
| `>=5` | Boxplot allowed |

### Value Axis And Mapping

Axis range covers whiskers, outliers, and target/reference:

```text
dataMin = min(lowerWhisker, outliers, targetValue)
dataMax = max(upperWhisker, outliers, targetValue)
padding = (dataMax - dataMin) * 0.08
yMin = niceMin(dataMin - padding)
yMax = niceMax(dataMax + padding)
```

For positive magnitude metrics such as amount, count, and duration, `yMin = 0` is allowed when absolute scale reading matters. Negative values require a visible zero baseline.

```text
valueToY(value) = plotY + plotH * (1 - (value - yMin) / (yMax - yMin))
q1Y = valueToY(Q1)
medianY = valueToY(Median)
q3Y = valueToY(Q3)
lowerWhiskerY = valueToY(lowerWhisker)
upperWhiskerY = valueToY(upperWhisker)
```

### Category And Box Geometry

Single series:

```text
N = categoryCount
bandW = plotW / N
categoryCenterX[i] = plotX + i * bandW + bandW / 2
boxW = clamp(16px, bandW * 0.45, 48px)
boxX = categoryCenterX[i] - boxW / 2
boxY = q3Y
boxH = q1Y - q3Y
```

Whisker caps:

```text
whiskerCapW = boxW * 0.65
capX1 = categoryCenterX - whiskerCapW / 2
capX2 = categoryCenterX + whiskerCapW / 2
```

Grouped boxplot:

```text
S = seriesCount
S <= 3
N <= 8
innerBandW = bandW * 0.72
innerGap = 4-8px
boxW = clamp(10px, (innerBandW - innerGap * (S - 1)) / S, 32px)
groupStartX = categoryCenterX - innerBandW / 2
boxCenterX[i,s] = groupStartX + s * (boxW + innerGap) + boxW / 2
```

Horizontal boxplot mirrors the geometry: categories use vertical bands, values map to X, and long category labels get a reserved label band.

### Box, Median, Whisker, Outlier, Mean

Box style:

```text
borderWidth = 1-1.5px
fillOpacity = 8%-18%
radius = 2-4px optional
```

The box should not read as a heavy bar. Median line is the key mark:

```text
medianLineWidth = 1.5-2px
medianLineX1 = boxX
medianLineX2 = boxX + boxW
```

Whiskers:

```text
centerLineX = categoryCenterX
centerLine from upperWhiskerY to q3Y and from q1Y to lowerWhiskerY
whiskerLineWidth = 1px
```

Outliers:

```text
outlierX = categoryCenterX + jitter
outlierY = valueToY(outlierValue)
jitter = stableHash(sampleId) mapped to [-boxW * 0.25, boxW * 0.25]
radius = 2.5-4px
opacity = 70%-90%
hoverRadius = radius + 1.5px
```

When outliers are dense, aggregate, lower opacity, show Top extreme outliers only, or move raw samples to detail. Do not show every raw point by default.

Mean point:

```text
meanX = categoryCenterX
meanY = valueToY(mean)
radius = 3-4px or small diamond
```

Mean is optional and weaker than the median.

### Labels, Legend, And Reference Lines

Permanent labels are not default. Allowed labels:

- Target/reference line label.
- Median label when space allows.
- Largest/smallest outlier or selected outlier.
- Selected/hover category.

Do not print Q1/Q3/median/whisker/outlier values for every category. Tooltip owns full statistics.

Target/reference line:

```text
targetY = valueToY(targetValue)
targetLineX = plotX
targetLineW = plotW
targetLabelX = plotX + plotW + 4-8px
targetLabelY = targetY - targetLabelH / 2
```

Use `1-1.5px` dashed line. Keep it weaker than the boxes and median.

Legend is unnecessary for single-series standard boxplots unless outlier/mean/target marks need explanation. Multi-series legends must stay separate from filters and fit in no more than two lines.

### Tooltip And Detail Payload

Box tooltip:

```text
category
sampleCount
max
upperWhisker
Q3
median
Q1
lowerWhisker
min
IQR
outlierCount
target/gap when present
unit, period, source, outlier rule
```

Outlier tooltip:

```text
sampleId or anonymized label
category
value + unit
outlier type high/low
gap above upperWhisker or below lowerWhisker
```

Tooltip width is `180-320px`, padding `8-12px`, text `12px/18px`, and flips away from viewport edges.

### State Geometry

| State | Behavior |
| --- | --- |
| Loading | Preserve title/filter/metric/axis/box skeleton geometry |
| Empty | Plot shows `暂无数据`; axes/legend geometry remains stable |
| Error | Preserve geometry and show retry/detail when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Sample too small | Show `样本不足`; draw point/short line only when useful |
| Category sample too small | Draw point/short line and explain in tooltip |
| No outliers | Hide outlier marks and keep legend stable or remove outlier legend |
| All values equal | Box degenerates into a line with tooltip explanation |
| Negative values | Draw normally and show visible zero baseline |
| Unit missing | Hide unit text but preserve subtitle geometry |
| Too many outliers | Aggregate outliers or show extreme Top N |

## Matrix / Time / Calendar / Correlation Heatmap Placement Algorithm

Use this for non-geographic heatmaps: matrix heatmaps, weekday-hour or category-time heatmaps, calendar heatmaps, cohort heatmaps, utilization heatmaps, risk grids, and correlation matrices. Geographic heat layers belong to the map/geographic placement section.

### Anatomy

| Slot | Required | Notes |
| --- | --- | --- |
| Title | Yes | Business question or heatmap subject |
| Component-local filter | Optional | Metric, period, aggregation grain, actual/rate/change, anomaly-only |
| Subtitle / unit / definition | Optional but recommended | Unit, period, aggregation, color rule |
| Metric strip | Optional | At most `3` items such as peak, average, anomaly cells, high period |
| Row labels | Yes | Y dimension |
| Column labels | Yes | X dimension |
| Heat cells | Yes | Color is the primary mark |
| Color legend / visualMap | Yes | Sequential, stepped, or diverging |
| Cell value labels | Optional | Only when cell size passes threshold |
| Highlight marks | Optional | Max, min, anomaly, selected cell |
| Tooltip | Yes | Exact value and context |
| Footer / update note | Optional | Source, updated time, color rule note |
| State mask | Yes | Loading, empty, error, no-permission, missing cells, all-equal values |

### Fit Gate

Use heatmap when the decision is to locate a two-dimensional pattern:

- High/low concentration.
- Time-of-week or hour-of-day activity.
- Cross-category intensity.
- Resource utilization.
- Risk hotspots.
- Cohort or retention pattern.
- Metric correlation structure.

Do not use heatmap when:

- Only one dimension exists.
- The user needs exact comparison of a few values.
- A simple ranking is the task.
- Value variance is too small for color to carry meaning.
- Row/column cardinality is unbounded and no aggregation or scroll exists.
- Missing values cannot be distinguished from zero.

### Coordinate System

```text
W = container width
H = container height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
```

Padding tiers:

| Width | Padding |
| ---: | ---: |
| `W < 320px` | `12px` |
| `320px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

### Size Tiers

| Tier | Condition | Keep | Drop first |
| --- | --- | --- | --- |
| Tiny | `W < 320` or `H < 260` | Title, single dropdown local filter, sampled labels, matrix, simplified legend, tooltip | Subtitle, metric strip, footer, cell values |
| Standard | `320 <= W < 720` and `H >= 300` | Title, filter, optional metric strip, labels, matrix, legend, tooltip | Cell values unless large enough |
| Large | `W >= 720` and `H >= 420` | Full structure, anomaly highlights, selected row/column, optional value labels | All-cell values still conditional |

### Slot Height Budget

```text
titleAreaH = 36-56px, default 44px
metricH = 0-48px
colLabelH = 20-40px, default 24px
legendH = 24-40px, default 28px
footerH = 0-24px
gapTitleMetric = 8-12px
gapMetricLabel = 8-12px
gapLabelMatrix = 6-10px
gapMatrixLegend = 12-16px

matrixH =
  CH
  - titleAreaH
  - metricH
  - colLabelH
  - legendH
  - footerH
  - gaps
```

Main matrix budget:

```text
matrixH >= CH * 0.45
```

If the budget fails, collapse in this order:

1. Hide footer/update note.
2. Reduce or hide metric strip.
3. Simplify color legend.
4. Collapse local filter to single dropdown.
5. Hide cell value labels.
6. Sample row/column labels.
7. Use scroll, pagination, aggregation, Top N, virtual rendering, or table fallback.

### Component-Local Filter

Suitable local filters:

- Metric: orders, sales, conversion, error count, utilization rate.
- Period: week, month, quarter.
- Aggregation grain: hour, day, week.
- Value mode: actual, rate, change, attainment.
- Scope: all, Top 10, anomalies.

Unsuitable local filters:

- Region + channel + category + store + status + long date range + aggregation grain in one component.
- Controls that change page/global scope, permission scope, export scope, row grain, or backend aggregation.

Default filter geometry:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + horizontalOuterPadding
filterMaxW = min(CW * 0.45, 280px)

filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

When `filterW > filterMaxW`, use a single capsule dropdown. Do not create a new filter row before protecting matrix height.

### Metric Strip

Recommended metrics:

- Peak value.
- Average value.
- Anomaly cell count.
- Peak time/category.
- Coverage cell count.
- Change versus previous period.

Defaults:

```text
M <= 3
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
metricGap = 12-24px
metricItemW = (CW - metricGap * (M - 1)) / M
```

### Matrix Geometry

Variables:

```text
R = row count
C = column count
rowLabelW = clamp(40px, maxRowLabelTextW + 8px, 120px)
labelGap = 8-12px
rightLegendW = 0 or 40-80px

heatmapAreaX = P + rowLabelW + labelGap
heatmapAreaY = P + titleAreaH + metricH + colLabelH + topGaps
heatmapAreaW = CW - rowLabelW - labelGap - rightLegendW
heatmapAreaH = matrixH
```

Whole matrix centering:

```text
matrixTotalW = rowLabelW + labelGap + actualHeatmapW + rightLegendW
matrixX = P + (CW - matrixTotalW) / 2
```

If space is tight:

```text
matrixX = P
heatmapAreaW = CW - rowLabelW - labelGap - rightLegendW
```

### Cell Size

```text
cellW = heatmapAreaW / C
cellH = heatmapAreaH / R
cellMinSize = 12px
cellMaxSize = 44px
cellSizeW = clamp(12px, cellW, 44px)
cellSizeH = clamp(12px, cellH, 44px)
```

When square cells are required:

```text
cellSize = min(cellSizeW, cellSizeH)
actualHeatmapW = cellSize * C
actualHeatmapH = cellSize * R
heatmapX = heatmapAreaX + (heatmapAreaW - actualHeatmapW) / 2
heatmapY = heatmapAreaY + (heatmapAreaH - actualHeatmapH) / 2
```

For rectangular time heatmaps, use:

```text
actualHeatmapW = cellSizeW * C
actualHeatmapH = cellSizeH * R
```

Cell coordinates:

```text
cellX = heatmapX + c * cellSizeW
cellY = heatmapY + r * cellSizeH
cellCenterX = cellX + cellSizeW / 2
cellCenterY = cellY + cellSizeH / 2
```

### Cell Drawing

```text
cellGap = clamp(1px, min(cellSizeW, cellSizeH) * 0.08, 4px)
drawCellW = cellSizeW - cellGap
drawCellH = cellSizeH - cellGap
drawCellX = cellX + cellGap / 2
drawCellY = cellY + cellGap / 2
cellRadius = 1-4px
```

Cell minimums:

| Scenario | Minimum |
| --- | ---: |
| With value labels | `28px` |
| Color only | `12-16px` |
| Calendar heatmap | `10-14px` |
| Large screen | `18-24px` |

If `cellW < 24px` or `cellH < 18px`, hide cell value labels.

### Color Scale / VisualMap

Sequential scale:

```text
normalized = (value - minValue) / (maxValue - minValue)
color = colorScale(normalized)
```

Use for positive magnitude metrics such as order count, sales, visits, users, alerts, and usage.

Stepped scale:

```text
value -> business threshold bucket -> fixed color
```

Use for low/medium/high, normal/warning/critical, or below/near/above target.

Diverging scale:

```text
negative values -> one hue
0 -> neutral
positive values -> opposite hue
```

Use for deltas, deviation, profit/loss, and correlation. Correlation heatmaps must use `-1..1` with `0` as the center.

Range:

```text
colorMin = min(values)
colorMax = max(values)
```

For outlier-heavy datasets:

```text
colorMin = percentile(values, 5)
colorMax = percentile(values, 95)
```

Values outside the range clamp to the end colors. Tooltip still shows the exact raw value.

All-equal values use one weak color and an explanatory tooltip/state note. Missing values use neutral blank/hatch and never share the zero color.

### Color Legend

Default bottom legend:

```text
legendX = heatmapX
legendY = heatmapY + actualHeatmapH + 12px
legendW = min(actualHeatmapW, 240px)
legendH = 24-32px
```

Legend forms:

- Continuous: `low -> gradient -> high`.
- Stepped: discrete swatches.
- Diverging: negative -> neutral -> positive.
- Compact: `low - high` when width is tight.

Size tokens:

| Item | Value |
| --- | ---: |
| Legend height | `24-32px` |
| Swatch height | `8-10px` |
| Swatch width | `18-28px` |
| Gradient width | `120-200px` |
| Legend font | `11-12px` |

### Row And Column Labels

Row labels:

```text
rowLabelX = heatmapX - labelGap
rowLabelY = cellCenterY
align = right center
fontSize = 11-12px
```

Column labels:

```text
colLabelX = cellCenterX
colLabelY = heatmapY - 6px
align = center bottom
fontSize = 11-12px
```

Column labels may sit below the matrix for category-heavy heatmaps:

```text
colLabelY = heatmapY + actualHeatmapH + 6px
```

Sampling:

```text
minLabelW = 36-56px
maxColLabelCount = floor(actualHeatmapW / minLabelW)
colLabelStep = ceil(C / maxColLabelCount)
```

Keep first/last labels, time boundaries, week/month boundaries, and selected labels before generic step labels.

Density:

| Size | Rule |
| --- | --- |
| `R <= 12`, `C <= 12` | Full labels may show |
| `R <= 20`, `C <= 24` | Sample labels and hide cell values |
| `R > 20` or `C > 30` | Scroll, paginate, aggregate, or Top N |
| `R * C > 600` | Avoid full direct rendering; use aggregation or virtual scroll |

### Cell Value Labels

Default: do not show every value.

Show values only when:

```text
cellW >= 36px and cellH >= 24px
```

For correlation:

```text
cellW >= 36px and cellH >= 28px
```

Label geometry:

```text
valueLabelX = cellCenterX
valueLabelY = cellCenterY
align = center
fontSize = 10-12px
```

Text color must respond to background luminance:

- Dark cell: light text.
- Light cell: dark text.

Long values reduce decimals or abbreviate on the surface; tooltip shows the complete value.

### Highlight And Selection

Maximum/minimum:

- At most Top `3` highlighted cells.
- Use subtle border for max/high risk.
- Keep min weaker unless it is business-critical.

Anomaly:

- Border, corner marker, or light stroke.
- No large icons, blinking effects, or blanket red blocks.
- Declare anomaly rule: business threshold, mean + `2 * stddev`, P95, or model flag.

Selection:

```text
selected cell > same row/column > other cells
```

Selected cell uses stronger border; same row/column labels highlight; other cells may lower opacity slightly. Tooltip may pin.

### Calendar Heatmap

Use for daily metrics across weeks and weekdays, not complex categories.

```text
dayCellSize = clamp(8px, CW / 60, 16px)
dayCellGap = 2-4px
calendarW = 53 * dayCellSize + 52 * dayCellGap
calendarH = 7 * dayCellSize + 6 * dayCellGap
```

Labels:

- Month labels on top.
- Weekday labels show only key days such as Monday/Wednesday/Friday or Monday/Sunday.
- No numeric values inside day cells.
- Tooltip owns date and exact value.

### Correlation Heatmap

Required:

- Diverging scale.
- Range `[-1, 1]`.
- Center `0`.
- Tooltip explains positive, negative, or weak relation.

Matrix forms:

- Full matrix for general readers.
- Lower or upper triangle for expert analysis and duplicate reduction.

Do not imply causality. Add a note or tooltip language when correlation is exploratory.

### Tooltip

Base tooltip:

```text
row dimension and value
column dimension and value
metric name
formatted value and unit
share / rank / change when present
aggregation grain
period / source
color-scale rule
missing or zero state
anomaly / threshold reason when present
```

Correlation tooltip:

```text
metric A
metric B
correlation coefficient
relation direction
period / sample context
```

Tooltip geometry:

```text
minWidth = 160px
maxWidth = 300px
padding = 8-12px
lineGap = 4-6px
fontSize = 12px
lineHeight = 18px
offset = 8-12px
```

Tooltip flips away from right, top, and bottom viewport edges.

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, matrix cells, legend |
| Empty | Empty message in matrix viewport |
| Error | Error message and retry/action when available |
| No permission | Permission message in matrix viewport |
| Missing cell | Blank/neutral/hatch cell with tooltip |
| Zero cell | Lowest color as real value, not empty |
| All values equal | Single weak color plus tooltip/state note |
| Extreme values dominate | Percentile or clipped scale, with visualMap note |
| Too many rows/columns | Sample labels, scroll, aggregate, paginate, or fallback |
| Unit missing | Hide unit text but preserve subtitle geometry |
| Invalid color range | Use fallback range and show note |
