# Combo Chart Placement Algorithm
This file was split from `12c-placement-basic-charts.md`. Load it only when this exact component family is present; use `12c-placement-basic-charts.md` as the routing index.


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
