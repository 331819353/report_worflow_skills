# Boxplot / Box-And-Whisker Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


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
