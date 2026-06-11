# Gauge Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


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
