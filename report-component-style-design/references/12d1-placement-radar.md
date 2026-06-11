# Radar Chart Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


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
