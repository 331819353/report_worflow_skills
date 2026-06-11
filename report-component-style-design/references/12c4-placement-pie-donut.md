# Pie And Donut Chart Placement Algorithm
This file was split from `12c-placement-basic-charts.md`. Load it only when this exact component family is present; use `12c-placement-basic-charts.md` as the routing index.


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
