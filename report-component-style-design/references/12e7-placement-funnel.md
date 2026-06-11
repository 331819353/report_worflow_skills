# Funnel Chart Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


Use this for funnel/conversion charts that show ordered stage retention, conversion, and drop-off. The default report component is a horizontal bar funnel. Traditional centered trapezoid funnels are allowed only for large display/report storytelling with few stages and explicit area-reading caveats.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Top-left, describes the conversion/process task |
| Component-local filter | Optional | Title-right capsule/dropdown, affects only this funnel |
| Subtitle/definition | Optional | Unit, period, denominator, de-duplication, or口径 note under title |
| Metric strip | Optional | Entry value, final value, total conversion, or key loss, maximum `3` items |
| Funnel body | Yes | Horizontal ordered stage bars by default |
| Stage labels | Yes | Left column, one line with tooltip for full stage name |
| Value/share labels | Yes | Right column, value plus entry share by default |
| Stage conversion | Recommended | Tooltip by default; permanent only when space allows |
| Loss marker | Optional | Only max/key loss permanent by default |
| Target marker | Optional | Per-stage short target tick/line or metric-strip target |
| Legend | Optional | Only for target/actual, current/previous, normal/abnormal, or compare mode |
| Tooltip | Yes | Exact stage and between-stage evidence |
| Footer metadata | Optional | Source, update time, or caveat; hidden first when tight |

### Validity And Density

```text
stageCount = N
best = 3-5 stages
acceptable = 6-7 stages
compact = 8-10 stages
fallback = N > 10 -> fold/scroll, process table, path chart, or Sankey when branching exists
```

Rules:

- Stages must have a real order and a shared population or documented cohort logic.
- The metric basis and unit stay consistent across stages. Do not mix people, orders, and amount as if they were one funnel.
- Required formulas are entry share, stage conversion, drop value/rate, and total conversion.
- Non-decreasing values may render when repeat counts, backflow, or re-entry are part of the口径; add a tooltip/subtitle口径 note instead of forcing decreasing data.

### Container And Area Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleAreaH = 36-56px
metricH = 0-48px
legendH = 0-24px
footerH = 0-24px
```

Width tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 320px` | `12px` |
| `320px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

Funnel body budget:

```text
funnelAreaX = P
funnelAreaY = P + titleAreaH + metricH + legendH + topGaps
funnelAreaW = CW
funnelAreaH = H - P - footerH - funnelAreaY

require funnelAreaH >= CH * 0.52
```

If `funnelAreaH` is too small, degrade in this order:

1. Hide footer metadata.
2. Reduce metric strip to one priority metric or remove it.
3. Collapse component-local filter to a compact dropdown.
4. Hide loss markers and permanent stage conversion.
5. Hide legend when encoding remains clear.
6. Compress stage gaps within the allowed range.
7. Enlarge the block or use a table/folded fallback.

Do not shrink stage/value text below readable size to make the chart fit.

### Header, Filter, Metric Strip, And Legend

Component-local filter:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + padding
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  render compact dropdown such as "人数 ▾"

filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Suitable local filters:

- Metric basis: `人数 / 金额 / 订单数`.
- Period: `本周 / 本月 / 本季`.
- Object type: `新客 / 老客`.
- Path scope: `全部 / 主路径 / 异常路径`.
- View: `实际 / 目标 / 完成率`.
- Small compare selector: channel A/B/C only when bounded and component-local.

Complex filters such as region + channel + category + user type + status + device belong to the page/global filter layer, not the funnel body.

Metric strip:

```text
metricCount <= 3
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
```

Recommended metric sets:

- Monitoring: entry value, final value, total conversion.
- Diagnosis: total conversion, max loss stage, target/attainment.
- Comparison: current total conversion, previous total conversion, delta.

Legend:

- Default no legend for a single-series funnel.
- Use legend only for actual vs target, current vs previous, normal vs abnormal, or max two comparison groups.
- Keep legend separate from local filters; legend explains encoding, filters change component-local data/view.

### Horizontal Bar Funnel Geometry

Column budget:

```text
stageLabelW = clamp(56px, maxStageNameWidth + 8px, 120px)
valueLabelW = clamp(72px, maxValueTextWidth + conversionRateWidth + 16px, 160px)
barGap = 12-16px
barAreaW = funnelAreaW - stageLabelW - valueLabelW - barGap * 2

stageLabelX = funnelAreaX
barAreaX = funnelAreaX + stageLabelW + barGap
valueLabelX = barAreaX + barAreaW + barGap
```

Stage rows:

```text
rowGap = clamp(6px, funnelAreaH * 0.025, 14px)
stageH = (funnelAreaH - rowGap * (N - 1)) / N
stageH = clamp(20px, stageH, 44px)

stageY[i] = funnelAreaY + i * (stageH + rowGap)
stageCenterY[i] = stageY[i] + stageH / 2
```

If `stageH < 20px`, hide secondary stage details, fold tail stages, add local scroll, or reduce optional bands before accepting the component.

Value mapping:

```text
entryValue = value[0]
finalValue = value[N - 1]
entryRate[i] = value[i] / entryValue
stepConversionRate[i] = i == 0 ? 100% : value[i] / value[i - 1]
dropValue[i] = value[i] - value[i + 1]
dropRate[i] = 1 - value[i + 1] / value[i]
totalConversionRate = finalValue / entryValue
```

Bar drawing:

```text
maxValue = entryValue
minBarW = 4-8px
barW[i] = barAreaW * value[i] / maxValue
barW[i] = value[i] > 0 ? max(barW[i], minBarW) : 0

barX[i] = barAreaX
barH = clamp(12px, stageH * 0.62, 28px)
barY[i] = stageCenterY[i] - barH / 2
barRadius = min(6px, barH / 2)
```

Left-aligned bars are the default for BI/report cards because they preserve value comparison. Center-aligned bars are optional only for large display storytelling.

### Traditional Trapezoid Funnel Geometry

Use only when `N <= 5`, labels are short, and the component is large enough for internal labels or a side label rail.

```text
funnelBodyW = barAreaW
centerX = barAreaX + funnelBodyW / 2
segmentH = (funnelAreaH - rowGap * (N - 1)) / N

topW[i] = funnelBodyW * value[i] / maxValue
bottomW[i] = i < N - 1 ? funnelBodyW * value[i + 1] / maxValue : topW[i] * 0.75

topX[i] = centerX - topW[i] / 2
bottomX[i] = centerX - bottomW[i] / 2
topY[i] = funnelAreaY + i * (segmentH + rowGap)
bottomY[i] = topY[i] + segmentH
```

If a segment width cannot hold the label/value, move labels to side columns or tooltip. Do not make narrow inner labels unreadable.

### Labels, Targets, And Comparisons

Stage name:

```text
stageNameX = stageLabelX
stageNameY = stageCenterY - lineHeight / 2
font = 12px, weight 400-500
```

Value/share label:

```text
valueText = formattedValue + " · " + formattedEntryRate
valueX = valueLabelX
valueY = stageCenterY - lineHeight / 2
font = 12-13px
```

Loss marker:

```text
lossMarkerY[i] = (stageCenterY[i] + stageCenterY[i + 1]) / 2
lossMarkerX = valueLabelX
show permanent marker only for max loss or selected stage
font = 11-12px
```

Target marker:

```text
targetW[i] = barAreaW * targetValue[i] / maxValue
targetX[i] = barAreaX + targetW[i]
targetY[i] = barY[i] - 2px
targetH[i] = barH + 4px
targetLineW = 1-1.5px
```

Comparison mode:

- Use at most two groups in one funnel.
- Current period uses solid bars; previous/target uses muted background, outline, or target tick.
- If more than two groups are needed, use faceted funnels, grouped horizontal bars, or a table.

### Responsive Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 240px` | title, compact filter, stage name, bar, value, tooltip | subtitle, metrics, legend, footer, loss markers |
| Standard | `320px <= W < 720px` and `H >= 280px` | title/filter, optional metrics, stage name, value, entry share, max loss, tooltip | dense stage conversion, footer |
| Large | `W >= 720px` and `H >= 360px` | full structure, target lines, compare mode, selected loss, richer tooltip | dense labels still need fit proof |

### Interaction And States

Hover:

- Current stage highlights and right value strengthens.
- Other stages dim to `45%-70%`.
- Tooltip appears and flips inside viewport.

Click:

- May pin selected stage.
- May open detail table/drawer or filter sibling components when an event contract exists.

Tooltip payload:

```text
stage, value + unit, entry share, stage conversion, drop value, drop rate,
target/attainment, comparison delta, period, source, denominator/cohort note
```

States:

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title/filter/metric/funnel bars |
| Empty | `暂无数据` or `当前筛选下暂无转化数据` in the funnel body |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in funnel body |
| `entryValue = 0` | Conversion displays `--`; tooltip explains denominator is zero |
| Stage value `0` | Empty or minimum-height neutral bar, value remains `0` |
| Missing stage | Show `--` or hide with documented stage completeness note |
| Missing target | Hide target marker; do not reserve ghost target labels |
| Too many stages | Fold/scroll/table fallback |
| Long labels/values | Abbreviate visible text and expose exact text/value in tooltip |
