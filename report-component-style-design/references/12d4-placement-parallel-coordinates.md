# Parallel Coordinates Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


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
