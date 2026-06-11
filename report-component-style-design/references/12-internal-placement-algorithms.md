# Component Internal Placement Algorithms

Use this reference when a component design must define how every element sits inside its own container. It turns component descriptions into measurable placement contracts so the frontend can implement without guessing.

## Required Placement Chapter

Every reusable report component should include a chapter named `Positioning And Alignment Rules` or `位置排布与对齐规则`.

Minimum content:

| Required item | What to define |
| --- | --- |
| Coordinate system | Container origin, padding, content box, main axis, cross axis |
| Container variables | `W`, `H`, `P`, `CW = W - 2P`, `CH = H - 2P` |
| Anatomy slots | Required and optional elements, owned title/header/action areas, body, footer, state mask |
| Main visual center | Which element is the visual anchor and whether it centers in the content box or a sub-zone |
| Slot x/y algorithm | `x`, `y`, width, height, alignment, and reserved gap for each visible element |
| Size tiers | Small, standard, enhanced, wide, and what content is hidden, moved, or disclosed |
| Height budget | Padding, row line-heights, vertical gaps, fixed bands, and `requiredContentHeight <= H` |
| Horizontal budget | Text widths, icon slots, unit gaps, legend/control bands, and overflow fallback |
| Responsive degradation | Which element stays permanent, which moves to tooltip/drawer, which is hidden |
| State geometry | Loading, empty, error, no-permission, stale, and disabled states preserve the same slot geometry |

Avoid vague placement statements such as "center the content", "adjust responsively", or "align neatly" unless they are paired with measurable slot rules.

## Shared Coordinate Contract

Use this default coordinate system unless the component has a domain-specific coordinate model:

```text
containerWidth = W
containerHeight = H
padding = P
contentWidth = CW = W - 2P
contentHeight = CH = H - 2P
contentOrigin = (P, P)
centerX = P + CW / 2
centerY = P + CH / 2
```

Rules:

- The surrounding block/container owns the outer title/function band when present. Component body coordinates start after subtracting that block-owned title/action band.
- Every visual slot must have a reserved rectangle before rendering text, icons, charts, or controls.
- Main values, legends, labels, controls, and state messages cannot overlap their reserved rectangles.
- Hidden or abbreviated content needs tooltip, focus tooltip, drawer, fullscreen, expansion, or table fallback.
- `overflow: hidden` is not a placement algorithm. It is only acceptable after a disclosure path and fit proof exist.

## Component-Internal Local Filter Placement Algorithm

Use this for the fixed component spec section named `组件内筛选区 / 局部筛选区`. It is a component-scoped filter and affects only the current component or one explicitly declared block-scoped component group. It must not take over page/global filter, permission, pagination, aggregation, export, or backend query responsibilities.

### Scope And Option Rules

| Rule | Requirement |
| --- | --- |
| Scope | Only current component or declared local group |
| Default surface | Capsule sliding button / segmented control |
| Option count | `2-4` short options use capsule; `> 4` options use compact dropdown |
| Group count | Default one group; maximum two visible groups only in wide components |
| Priority | `time range -> metric口径/view -> display granularity -> sort/ranking` |
| Unsuitable fields | Region, channel, store, category, owner, status, permission, and other complex business dimensions unless proven component-local |
| Semantic boundary | A control that changes metric set, component role, table columns, first-level perspective, or domain vocabulary is not an ordinary local filter |

### Size And Fit

```text
filterH = clamp(24px, H * 0.08, 32px)
defaultFilterH = 28px
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + innerPadding * 2
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  render as single compact capsule dropdown
```

Style defaults:

- Capsule radius: `999px`.
- Capsule inner padding: `2px`.
- Text: `12px`, no wrapping.
- Option padding: `10-14px`.
- Option width: minimum `44-52px`, maximum `96-120px` depending on label length and component width.

### Header-Right Placement

Prefer the title/header right side when fit passes:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

Rules:

- Title keeps priority; it must remain readable before the filter is accepted.
- Definition/help icon follows the title rather than being pushed after the filter.
- Unit text moves to subtitle or chart metadata when title, unit, icon, actions, and filter compete.
- Detail/download/fullscreen/more actions collapse before the title becomes unreadable.

### Under-Title Placement

Use an under-title lightweight row only when title-right placement fails and the component has enough vertical space:

```text
filterX = P
filterY = P + titleH + 6px
filterRowH = filterH + 6px
titleAreaH = titleH + filterRowH
```

Do not add this row when `H < 180px`; collapse to a compact dropdown or selected-value pill instead.

### No-Overlay Rule

Component-local filters cannot sit over:

- KPI value or value/unit group.
- Bar/line/pie plot area.
- Axis labels, legend, or data labels.
- Table header, frozen columns, or pagination.
- Empty/loading/error/no-permission state messages.

The filter must be separated from the plot/body through the title, subtitle, metric strip, or legend band. It should read as a light switch, not a filter form.

### Responsive Collapse

| Condition | Behavior |
| --- | --- |
| `W >= 480px` | Header-right capsule may show when title fit passes |
| `320px <= W < 480px` | Header-right only when it fits; otherwise under-title row or dropdown |
| `240px <= W < 320px` | Single compact capsule dropdown |
| `W < 240px` | Selected value plus chevron, for example `本月 ▾` |
| `H < 180px` | No added row; inline or collapse |
| Option count `> 4` | Dropdown |
| More than one group | Collapse secondary group first; two visible groups require wide-component fit proof |

Every future component spec should include local filter fit, unsuitable filter types, style, placement, relationship with title/unit/legend/metrics, responsive collapse, and aesthetic simplicity.

## Analysis & Insight Component Placement Algorithm

Use this for conclusion cards, insight cards, anomaly/risk explanations, attribution summaries, recommendation cards, data-quality notes, definition cards, forecast notes, explanatory empty states, task cards, and chart annotations. These components are analysis surfaces, not decorative text blocks. They should turn data into judgment, reason, action, or trust context.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Type marker/status label | Yes | Top-left, weak label or slim status bar |
| Semantic icon | Optional | `14-18px`, aligned to title, never dominant |
| Title | Yes except summary bar | Top-left, names the subtype or question |
| Component-local filter | Optional | Header-right capsule/dropdown; current component only |
| Main conclusion | Yes | First readable body line, strongest text |
| Evidence | Required when data-backed | Metric, baseline, comparison, affected object, source, or reason |
| Recommended action/detail route | Required for recommendation/risk/task; optional elsewhere | Bottom-right or final line |
| Definition/confidence/freshness | Required for definition/data-quality/prediction; optional elsewhere | Bottom-left, tooltip, or drawer |
| Tooltip/detail payload | Required when anything is clamped | Hover/focus/click disclosure |

Implementation-ready components declare `analysisInsightContract` or equivalent metadata: subtype, insight family, conclusion, evidence, affected object, comparison/change value, reasons, recommended actions, confidence/definition/source/freshness, local filters, tooltip payload, detail route, and state rules.

### Size Tiers

| Tier | Width | Height | Permanent content | Move or hide |
| --- | ---: | ---: | --- | --- |
| Summary bar | `280-960px` | `36-56px` | one sentence, optional status | title, icon, secondary evidence |
| Small card | `220-360px` | `88-128px` | title, conclusion, one evidence line | action label, freshness, secondary reason |
| Standard card | `320-560px` | `120-180px` | title, conclusion, evidence, optional action | extra insights, long definition |
| Enhanced card | `480-720px` | `160-240px` | Top reasons/actions, confidence, detail route | long explanation to drawer |
| Side insight panel | `220-320px` | `240-480px` | `2-4` insight items | secondary action/source |
| Annotation bubble | `120-240px` | `40-96px` | short conclusion, optional value | title, long explanation |

### Padding And Line Budgets

```text
P = clamp(12px, W * 0.04, 24px)
headerH = 20-28px
conclusionLineH = 20-24px
bodyLineH = 18-20px
footerH = 0-32px
gapTitleBody = 8-12px
gapConclusionEvidence = 6-8px
gapBodyAction = 8-12px
```

Padding tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 280px` | `12px` |
| `280px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

Height check:

```text
requiredContentHeight =
  P * 2
  + headerH
  + visibleConclusionLines * conclusionLineH
  + visibleEvidenceLines * bodyLineH
  + visibleActionOrFooterH
  + sum(visibleGaps)

requiredContentHeight <= H
```

If the budget fails, remove optional content in this order: decorative icon, secondary evidence, freshness/source line, long action label, extra insight items. Do not hide the main conclusion or status meaning without tooltip/drawer access.

### Slot Position Rules

Header:

```text
headerX = P
headerY = P
iconSize = 14-18px
typeMarkerW = measuredText + 12px
filterMaxW = min(CW * 0.45, 280px)

titleX = P + visibleIconW + iconGap
titleMaxW = CW - visibleIconW - iconGap - visibleFilterW - 12px
filterX = W - P - filterW
filterY = P + (headerH - filterH) / 2
```

Body:

```text
conclusionX = P
conclusionY = P + headerH + gapTitleBody
conclusionW = CW

evidenceY = conclusionY + conclusionH + gapConclusionEvidence
evidenceW = CW
```

Footer/action:

```text
footerY = H - P - footerH
actionX = W - P - actionW
actionY = footerY + (footerH - actionH) / 2
metaX = P
metaW = max(0, CW - actionW - 12px)
```

Rules:

- The conclusion owns the first body line. Evidence never appears above it.
- Values inside evidence can right-align only when the evidence is rendered as a compact list.
- Actions and detail links cannot overlap evidence text; they move to a final row or icon button before shrinking the conclusion.
- Source/freshness/confidence should be weak, but discoverable.

### Local Filter Rules

Analysis & Insight local filters are optional and usually inherit page/global, Composite Panel, or chart filters first. Add a component-local filter only for explanation mode switches such as:

- `全部 / 异常 / 建议`
- `本月 / 本季 / 本年`
- `实际 / 预测`
- `高 / 中 / 低风险`
- `原因 / 影响 / 建议`

```text
filterH = 24-28px
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
```

When the capsule does not fit, collapse to a compact dropdown. The filter must not change global/page scope, metric口径, table schema, permission, pagination, export, or another component.

### Chart And Composite Placement

Chart-side insight:

```text
insightW = clamp(200px, W * 0.28, 320px)
mainChartW = W - insightW - gap
insightArea <= W * H * 0.25
```

Rules:

- Above-chart summary uses `36-56px` height and one sentence.
- Right-side insight panels use `2-4` items and do not exceed `25%` of a Composite Panel area unless the panel's declared purpose is explanation.
- Chart annotations use a bounded bubble and leader line:

```text
bubbleW = clamp(120px, textWidth + 32px, 240px)
bubbleH = clamp(40px, lineCount * 18px + 20px, 96px)
leaderLine = 12-48px
annotationCount <= 3
```

Annotations cannot cover axis labels, legends, selected marks, or the main anomaly point they explain.

### Responsive Degradation

| Condition | Behavior |
| --- | --- |
| `W < 280px` or `H < 96px` | Hide subtitle/evidence, hide or shrink icon, collapse action/filter, keep conclusion `1-2` lines |
| `280px <= W < 560px` and `H >= 120px` | Title, conclusion, one evidence line, weak status |
| `W >= 560px` and `H >= 160px` | Multi-insight list, Top3 reasons, action suggestions, confidence/source |
| `H < 120px` | No under-title filter row; use inline/collapsed control |
| Long explanation | Clamp to visible budget and disclose through tooltip/drawer |

### Subtype Fit Rules

- Conclusion card: `320-560px` wide, `96-144px` high, one conclusion plus one evidence line.
- Insight card: `2-4` insights by default, max `5`, item height `22-28px`.
- Anomaly/risk card: reserve object, metric, magnitude, and action; use weak warning tint or `3-4px` left bar, not full-card red.
- Attribution/impact card: Top `3` reasons by default, max `5`; contribution values align right.
- Target diagnosis card: current, target, and gap are mandatory; forecast text must be marked `预计`.
- Recommendation/task card: `1-3` actions; owner/deadline/status fit in footer or drawer.
- Definition/data-quality card: definition/source/freshness/confidence are mandatory; complex text opens popover/drawer.
- State explanation card: reason, impact, and next step are mandatory; not only `暂无数据`.

### State Geometry

- Loading: skeleton header plus `1-3` text rows in the same slots.
- Generating: stable message row `分析生成中`.
- Insufficient data: preserve conclusion slot with `当前数据不足以生成结论`, then show missing reason/action.
- Empty/filter no-result: state message occupies conclusion slot and names the condition.
- Data delay: use data-quality tone, freshness field, and retry/detail action.
- Error/no-permission: show reason and next step without masking unrelated sibling components.

## Metric Card Placement Algorithm

Use this for KPI cards, metric cards, target cards, comparison tiles, and mini-trend cards.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Metric title | Yes | Top-left, identifies the metric |
| Definition/help entry | Optional | Top-right icon, opens tooltip/drawer |
| Component-local filter | Optional | Header-right capsule/dropdown, affects only this card |
| Value group | Yes | Metric value plus unit, centered as one group |
| Comparison group | Yes | YoY/MoM or one priority comparison, centered below value |
| Target group | Yes when target exists | Target value, attainment, target gap, or progress |
| Sparkline | Optional | Secondary trend, full content width or centered reduced width |
| Summary | Optional | Short judgment, centered or left-aligned by card type |
| Description/metadata | Optional | Bottom weak text, source, freshness, or data delay |

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 200px` or `H < 110px` | title, value group, one priority comparison | target, sparkline, summary, description |
| Standard | `200px <= W < 360px` and `120px <= H < 180px` | title, value group, YoY/MoM, target text | sparkline only when height allows; description in tooltip |
| Enhanced | `W >= 360px` and `H >= 180px` | title, value group, YoY/MoM, target, optional sparkline, short summary | long definition in tooltip/drawer |
| Wide | `W >= 480px` | left primary value zone plus right auxiliary zone | keep value centered within the left zone, not the full card |

Recommended card ranges:

| Type | Width | Height | Use |
| --- | ---: | ---: | --- |
| Small card | `160-220px` | `96-120px` | value plus one comparison |
| Standard card | `220-320px` | `120-160px` | value, comparison, target |
| Enhanced card | `320-480px` | `160-220px` | value, comparison, target, sparkline or summary |
| Wide card | `480px+` | `160-240px` | split primary and auxiliary information |

### Padding And Slot Heights

```text
P = clamp(12px, W * 0.05, 24px)
titleHeight = clamp(20px, H * 0.16, 28px)
valueHeight = clamp(36px, H * 0.35, 64px)
compareHeight = clamp(20px, H * 0.18, 32px)
targetHeight = clamp(22px, H * 0.18, 36px)
sparkHeight = clamp(28px, H * 0.22, 56px)
descriptionHeight = clamp(18px, H * 0.18, 40px)
```

Padding tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 200px` | `12px` |
| `200px <= W < 320px` | `16px` |
| `320px <= W < 480px` | `20px` |
| `W >= 480px` | `24px` |

### Default Vertical Flow

```text
currentY = P

titleY = currentY
currentY += titleHeight

currentY += 8-12px
valueY = currentY
currentY += valueHeight

currentY += 8-10px
compareY = currentY
currentY += compareHeight

if sparkline is visible:
  currentY += 8-12px
  sparkY = currentY
  currentY += sparkHeight

currentY += 8-12px
targetY = currentY
currentY += targetHeight

if summary is visible:
  currentY += 6-8px
  summaryY = currentY
```

Before accepting the layout, compute:

```text
requiredContentHeight =
  P * 2
  + titleHeight
  + valueHeight
  + compareHeight
  + visibleSparkHeight
  + targetHeight
  + visibleSummaryOrDescriptionHeight
  + sum(verticalGaps)

requiredContentHeight <= H
```

If the budget fails, remove or move optional content in this order: description, summary, sparkline, second comparison, target progress bar. Do not shrink primary value text below readable size.

### Slot Position Rules

Title:

```text
titleX = P
titleY = P
titleWidth = CW - helpIconWidth - helpGap
titleHeight = 20-28px
horizontalAlign = left
verticalAlign = center
```

Definition/help icon:

```text
iconSize = 14-16px
helpX = W - P - iconSize
helpY = P + (titleHeight - iconSize) / 2
```

Component-local filter:

```text
filterH = 24-28px
filterW = min(actualFilterWidth, CW * 0.45)
filterX = W - P - filterW
filterY = P
titleMaxW = CW - filterW - 8px
```

Rules:

- Metric cards allow at most one visible local filter group by default, and the group should normally have no more than three short options.
- Suitable filters include `今日 / 本周 / 本月`, `同比 / 环比`, `实际 / 目标 / 完成率`, or `金额 / 数量`.
- On small cards, collapse to a single capsule dropdown such as `本月 ▾`.
- The local filter must not change the visual center of the primary value: keep `centerX = P + CW / 2` for value, comparison, and target groups unless the card intentionally uses the wide split layout.
- If the title, help icon, and filter do not fit, keep title plus selected filter value; move help/definition to tooltip, drawer entry, or card metadata.

Value group:

```text
valueGroupWidth = valueTextWidth + unitGap + unitTextWidth
valueGroupX = centerX - valueGroupWidth / 2
valueGroupY = valueY
unitGap = 4-6px
```

The value and unit are centered as one group. Do not center the number and then attach the unit far away.

Unit:

```text
unitX = valueTextX + valueTextWidth + 4-6px
unitY = baseline-aligned with value, or 2-4px lower
unitFontSize = valueFontSize * 0.4-0.5
```

Comparison group:

```text
compareGroupWidth = yoyWidth + comparisonGap + momWidth
compareGroupX = centerX - compareGroupWidth / 2
compareGroupY = valueY + valueHeight + 8-10px
comparisonGap = 8-16px
```

Each comparison item uses:

```text
[label] [directionIcon] [signedValue]
labelIconGap = 4px
iconValueGap = 2-4px
```

Target group:

```text
targetGroupWidth = targetTextWidth + targetGap + attainmentTextWidth
targetGroupX = centerX - targetGroupWidth / 2
targetGroupY = compareY + compareHeight + 8-12px
targetGap = 8-16px
```

Progress bar:

```text
progressWidth = CW * 0.8-1.0
progressX = centerX - progressWidth / 2
progressY = targetTextBottom + 6-8px
progressHeight = 4-6px
progressFillWidth = min(attainmentRate, 100%) * progressWidth
```

Sparkline:

```text
sparkWidth = CW for standard/enhanced cards
sparkWidth = CW * 0.85 for narrow cards when needed
sparkX = centerX - sparkWidth / 2
sparkY = compareY + compareHeight + 8-12px
sparkHeight = clamp(28px, H * 0.22, 56px)
```

Summary:

```text
summaryX = P
summaryY = targetY + targetHeight + 6-8px
summaryWidth = CW
```

Alignment:

- Small cards hide summary.
- Standard cards may center a short summary.
- Enhanced cards may center or left-align summary based on business tone.
- Wide business-analysis cards prefer left-aligned summary.

Description and freshness:

```text
descX = P
descY = H - P - descriptionHeight
descWidth = CW
```

Description is left-aligned by default. Freshness metadata may align bottom-right when it is short and noncritical.

### Wide Metric Card Split

For `W >= 480px`, use a two-zone layout only when the right side has meaningful auxiliary information.

```text
leftWidth = CW * 0.45-0.55
columnGap = 16-24px
rightWidth = CW - leftWidth - columnGap
leftX = P
rightX = P + leftWidth + columnGap
leftCenterX = leftX + leftWidth / 2
```

Rules:

- Value group, comparison group, and primary target status center around `leftCenterX`.
- Sparkline, detailed target, and summary may sit in the right zone.
- Right-zone content can be left-aligned for readability.
- Do not center the primary value against the full card when the card is split; center it inside the left primary zone.

### Typography Fit

```text
valueFontSize = clamp(24px, W * 0.11, 36px) by default
valueFontSize may reach 40px only for wide or top-priority primary metric cards after fit proof
unitFontSize = valueFontSize * 0.4-0.5
```

Recommended values:

| Container width | Value font |
| ---: | ---: |
| `W < 200px` | `24px` |
| `200px <= W < 280px` | `28px` |
| `280px <= W < 360px` | `32px` |
| `360px <= W < 480px` | `36px` |
| `W >= 480px` | `36px`, or `40px` only for wide/top-priority primary metric cards |

Text rules:

- Metric title: `13-14px`, `18-22px` line-height.
- Value: `24-36px` by default, up to `40px` only for wide/top-priority primary metric cards, `1.1-1.2` line-height, tabular numerals.
- Unit: `12-16px`, `16-20px` line-height.
- Comparison label/value: `12-13px`, `16-18px` line-height.
- Target and attainment: `12-13px`, `16-18px` line-height.
- Summary: `12-13px`, `18-20px` line-height, usually one line.
- Description/freshness: `11-12px`, `16-18px` line-height.

Long value fallback:

1. Use approved display units such as `万`, `亿`, `K`, or `M`.
2. Reduce decimals based on metric precision rules.
3. Widen the card or move secondary content.
4. Use tooltip for exact raw value.

### Comparison And Target Semantics

- Show at least one of YoY or MoM when comparison data exists. If space is tight, keep the comparison most relevant to the business cadence, often MoM for short-term monitoring.
- Chinese report change-rate and variance-rate indicators use `%`.
- For Chinese report change-rate indicators, default to positive-red-up and negative-green-down unless the metric dictionary or company standard defines another convention.
- For cost, complaint, failure, return, overdue, risk, and other business-negative metrics, the value direction must follow the metric dictionary. Do not color by raw sign alone.
- Target describes attainment, target gap, or progress. Do not force it into up/down semantics unless the business defines target movement that way.

### State Geometry

| State | Metric card behavior |
| --- | --- |
| Loading | Skeleton preserves title, value, comparison, and target slots |
| Empty | Value shows `--`; hide invalid comparison and target calculations; keep the card height |
| Error | Show concise affected metric and retry path when available |
| No permission | Keep title and explain permission condition without leaking value |
| Target missing | Show `暂无目标` or hide target slot with a documented height fallback |
| YoY/MoM missing | Hide the missing comparison and recenter remaining comparison |
| Previous period is zero | Show comparison as `--` with tooltip explaining denominator is zero |
| Value is zero | Display `0` normally; do not treat zero as empty data |
| Stale data | Show freshness or delay metadata in the description/freshness slot |

## Target/Actual Bar Chart Placement Algorithm

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

## Line Trend Chart Placement Algorithm

Use this for line and area charts that show a metric over time, sequence, or another ordered continuous category. Do not use a line chart for unordered category comparison.

### Anatomy

| Slot | Required | Default behavior |
| --- | ---: | --- |
| Chart title | Yes | Block-owned title or component top-left title; do not duplicate both |
| Subtitle/definition | Optional | Time range,口径, filter context, or definition entry |
| Component-local filter | Optional | Title-right capsule/dropdown for current trend only |
| Unit | Yes | Top-right beside title when one unit applies to the whole chart |
| Metric strip | Optional | Current value, target, average, peak, low, change-rate |
| Legend/control | Required for multiple series | Above plot, right-aligned by default; may become selector when many series |
| Y-axis labels | Yes | Left of plot, right-aligned to ticks |
| Plot area | Yes | Lines, points, grid lines, target/average/warning lines, anomaly markers |
| X-axis labels | Yes | Under plot, centered with data points |
| Data labels | Optional | Key points only: latest/current, first/last, max/min, anomaly, selected |
| Target/average label | Optional | Right side of reference line, with reserved gap |
| Footer metadata | Optional | Source/freshness, left/right aligned |
| Tooltip | Yes | Full period, values, unit, target, attainment, YoY/MoM/change-rate |

### Line Type Choice

| Type | Use when | Avoid when |
| --- | --- | --- |
| Single metric line | One metric trend over time or ordered sequence | Only comparing unordered categories |
| Multi-series line | `2-5` comparable series with shared x-axis and unit | More than 5 default visible series; use selector, Top N, facets, or small multiples |
| Actual line + target/reference line | Target, budget, warning, SLA, or average matters | Target is missing or not comparable to actual |
| Area line | Single metric or at most two series where magnitude matters | Dense multi-series comparison or volatility needs precise reading |

Line smoothing is optional. Use straight segments by default. Smooth only when the business question is broad trend shape; do not smooth when volatility, spikes, or operational anomalies are important.

### Size Tiers

| Tier | Condition | Permanent content | Move or hide |
| --- | --- | --- | --- |
| Small | `W < 320px` or `H < 240px` | title, unit, core line, first/last x labels, reduced y ticks, tooltip | subtitle, metric strip, normal labels, complex legend, footer; target label may hide |
| Standard | `320px <= W < 720px` and `H >= 280px` | title, metric strip, legend, y-axis, x-axis, line, target line if present, tooltip | labels only for first/last/max/min/anomaly |
| Large | `W >= 720px` and `H >= 360px` | full structure, key labels, target/average labels, anomaly markers, optional brush/zoom | still avoid all-point labels on dense series |
| Many points | `N > 90` | line, sampled x labels, tooltip, dataZoom/brush/aggregation | permanent points and dense labels |

### Container And Plot Budget

```text
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P

titleH = 28-48px
metricH = 0-64px
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
metricH = 48px when summary metrics are visible, otherwise 0px
legendH = 24px
xAxisH = 36px
footerH = 0px or 20px
```

Plot layout:

```text
yAxisW = clamp(36px, maxYAxisLabelWidth + 8px, 80px)
rightGap = 40-64px when target/average labels sit outside the plot
rightGap = 8-16px otherwise

chartTotalWidth = yAxisW + plotWidth + rightGap
chartX = P + (CW - chartTotalWidth) / 2
plotX = chartX + yAxisW

if chartTotalWidth > CW:
  chartX = P
  plotWidth = CW - yAxisW - rightGap

plotY = P + titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
plotHeight = H - P - xAxisH - footerH - plotY
```

For a single ECharts-owned chart surface, translate the budget into `grid`:

```text
grid.left = yAxisW
grid.right = rightGap
grid.top = titleH + titleMetricGap + metricH + metricLegendGap + legendH + legendPlotGap
grid.bottom = xAxisH + footerH
grid.containLabel = true
```

If title, metric strip, unit, or legend are approved DOM outside ECharts, subtract those bands before mounting ECharts and set `grid` relative to the measured plot viewport. ECharts still owns lines, area fills, points, axes, reference lines, tooltip, axisPointer, brush/dataZoom, and emphasis.

### Header, Metric Strip, And Legend

Header:

```text
titleX = P
titleY = P
filterH = 28px when local filter is visible
filterW = min(actualFilterWidth, CW * 0.48, 300px)
filterX = W - P - filterW
filterY = P + (titleLineHeight - filterH) / 2
titleMaxW = CW - filterW - 12px when filter is visible
unitX = W - P - unitTextWidth when no title-right filter is visible
unitY = P + (titleLineHeight - unitLineHeight) / 2
subtitleX = P
subtitleY = titleY + titleLineHeight + 2-4px
```

Component-local filter:

- Suitable filters include time range, time granularity, metric口径/view, and `同比 / 环比`.
- Priority is `time range -> granularity -> metric口径 -> YoY/MoM`.
- Use one visible group by default. Two groups are allowed only when `W >= 720px`: primary group title-right, secondary group subtitle-right or collapsed into a dropdown.
- Keep filter and legend separate. The filter changes state; the legend explains series.
- `titleAreaH = 40-48px` for inline filter, `60-72px` for two compact groups, and `68-80px` for a separate filter row.
- The line plot height should not fall below `CH * 0.45`. If it would, hide secondary metric values, collapse secondary filter, hide normal data labels, reduce legend height, or enlarge the component before compressing the line plot.
- Responsive behavior: `W >= 720px` may show one or two groups; `480px <= W < 720px` one group; `320px <= W < 480px` main filter with at most three options; `W < 320px` dropdown; `H < 260px` no added filter row.

Metric strip:

```text
metricCount = M
metricGap = 12-24px
metricX = P
metricY = P + titleH + titleMetricGap
metricItemW = (CW - metricGap * (M - 1)) / M
```

Recommended metric strip content: current value, target, average, peak/low, and change-rate. If width is tight, keep current value and change-rate first; move peak/low/average to tooltip or summary.

Legend:

```text
legendX = P + CW - legendWidth
legendY = P + titleH + titleMetricGap + metricH + metricLegendGap
legendLineWidth = 16-24px
legendIconTextGap = 4-6px
legendItemGap = 12-16px
```

For `6-8` series, default to a highlighted focus series plus muted secondary series or a selector. For more than `8` series, use filtering, facets, or small multiples rather than rendering every line at equal weight.

### Point And Line Geometry

Point x-position:

```text
N = dataPointCount
if N = 1:
  pointX(0) = plotX + plotWidth / 2
elif N = 2:
  sparseMargin = plotWidth * 0.25
  pointX(0) = plotX + sparseMargin
  pointX(1) = plotX + plotWidth - sparseMargin
else:
  pointGap = plotWidth / (N - 1)
  pointX(i) = plotX + i * pointGap
```

For sparse line/area charts, one point must center in the plot area and two points should be placed symmetrically around center. In ECharts, `xAxis.type: 'category'` with `boundaryGap: true` is preferred when it creates this symmetric sparse placement. Do not pin sparse category points to the left edge.

Point y-position:

```text
pointY(value) = plotY + plotHeight * (1 - (value - yMin) / (yMax - yMin))
```

Line and point style:

| Element | Default |
| --- | ---: |
| Primary line width | `2px` |
| Emphasis line width | `2.5-3px` |
| Secondary line width | `1.5px` |
| Normal point radius | `3-4px` when visible |
| Hover point radius | `5-6px` |
| Area fill opacity | `8%-16%` |

Point visibility:

| Data point count | Display strategy |
| ---: | --- |
| `N <= 12` | Points may be visible |
| `13-30` | Hide normal points; show on hover/emphasis |
| `31-100` | Hide normal points and most labels; use tooltip |
| `101-500` | Use zoom/brush or aggregation |
| `N > 500` | Sample, aggregate, paginate, or virtualize |

### Y-Axis Range And Zero Baseline

Default:

```text
yMin = 0
yMax = niceMax(max(dataValues, targetValues, referenceValues) * 1.1)
```

For metrics where a non-zero baseline improves trend readability, such as temperature, conversion rate, margin, inventory ratio, or other bounded/ratio metrics:

```text
range = maxValue - minValue
yMin = niceMin(minValue - range * 0.1)
yMax = niceMax(maxValue + range * 0.1)
```

Rules:

- If `yMin` is not `0`, the chart must not visually imply absolute magnitude comparison from a zero baseline. Add axis labels clearly, keep grid lines visible, and avoid over-dramatic slope styling.
- If negative values exist, show a visible zero baseline.
- `tickCount = clamp(3, floor(plotHeight / 48px), 6)`.
- Keep long units in the title/unit slot, not inside an oversized y-axis label band.

### X-Axis Ordering And Labels

The x-axis must be ordered from source rows before deriving `xAxis.data`, every `series.data`, tooltip payloads, target/reference lines, and click payloads.

Time axes default to ascending chronological order. Period granularity must stay consistent; do not mix day/week/month in one axis unless the component explicitly describes the aggregation.

Label placement:

```text
xLabelCenterX = pointX(i)
xLabelY = plotY + plotHeight + plotXAxisGap
maxLabelCount = floor(plotWidth / minLabelWidth)
minLabelWidth = 44-64px
labelStep = ceil(N / maxLabelCount)
```

Label strategy:

| Data point count | X-axis label strategy |
| ---: | --- |
| `N <= 8` | Show all labels |
| `9-16` | Show all or interval labels |
| `17-30` | Show every `2-4` labels and preserve first/last |
| `31-90` | Show weekly/monthly or business milestone labels |
| `N > 90` | Use zoom, aggregation, brush, or sampled labels |

Preserve first/last labels and key business dates before ordinary sampled labels.

### Reference Lines And Labels

Unified target line:

```text
targetY = pointY(targetValue)
targetLineX = plotX
targetLineWidth = plotWidth
targetLabelX = plotX + plotWidth + 4-8px
targetLabelY = targetY - targetLabelHeight / 2
```

Average line:

```text
avgValue = sum(values) / N
avgY = pointY(avgValue)
```

Rules:

- Target, average, warning, upper/lower limit, and forecast split lines use ECharts `markLine`, `markArea`, or data-driven line series. Do not hand-draw them outside ECharts.
- Target/warning lines outrank point value labels if they collide.
- Average lines should be visually weaker than target/warning lines.
- Forecast or estimated segments should use a different line style, such as dashed, with legend/tooltip explanation.

### Data Labels And Change-Rate Labels

Value label:

```text
labelX = pointX
labelY = pointY - 4-6px
```

Rate label:

```text
rateLabelX = pointX
rateLabelY = pointY - valueLabelHeight - 8px
```

Rules:

- `N <= 8`: all labels may show if collision checks pass.
- `9-20`: show first/last, max, min, anomaly, selected, or latest labels only.
- `N > 20`: hide permanent labels and use tooltip.
- Multi-series line charts hide ordinary data labels by default.
- Point change-rate labels default to tooltip. Show them only for latest/current, max growth, max drop, anomaly, or selected points.
- If labels exceed plot top, move them below the point or hide them with tooltip disclosure.
- Keep at least `6-8px` between labels.

### Tooltip, Axis Pointer, Zoom, And State Geometry

Tooltip must include:

```text
Period or ordered category
Series name
Value + unit
Target/reference value when relevant
Attainment or target gap when relevant
YoY/MoM/change-rate when available
Source/period context when relevant
```

For multi-series tooltips, sort series values by value when useful, highlight the hovered series, and visually mute secondary series through ECharts emphasis/blur. Tooltip and legend behavior must agree.

Use `axisPointer` for trend reading. Use brush/dataZoom when points exceed the visible label budget or when users need range inspection.

State behavior:

| State | Line chart behavior |
| --- | --- |
| Loading | Skeleton preserves title, metric strip, legend, plot, and axis bands |
| Empty | Plot area shows empty state; header/metric structure remains stable |
| Error | Plot area shows failure message and retry when available |
| No permission | Preserve geometry and explain permission without leaking values |
| Target missing | Hide target/reference line and keep actual line |
| Current value missing | Break the line at the missing point or show gap; do not convert to `0` |
| Value is zero | Draw zero normally on the zero baseline |
| Change-rate denominator zero | Show `--` and explain denominator is zero in tooltip |
| Negative values | Show visible zero baseline |
| Partial missing series | Break only the missing series at missing points; do not connect across unknown values |
| Too many points | Use sampled labels, dataZoom/brush, aggregation, or fallback table |

## Combo Chart Placement Algorithm

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

## Pie And Donut Chart Placement Algorithm

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

## Path / User Journey / Process Path Placement Algorithm

Use this for business paths, user journeys, conversion paths, approval flows, work-order flows, task handoffs, abnormal paths, and drop-off paths. Geographic routes follow map/geographic flow rules. Entity association networks follow relation/network graph rules.

### Anatomy

| Slot | Required | Notes |
| --- | --- | --- |
| Title | Yes | Path subject |
| Component-local filter | Optional | Scope, metric basis, period, path type, Top N, depth |
| Subtitle / definition | Optional | Period, sample, dedup rule, path口径 |
| Metric strip | Optional | At most `3` items such as total, conversion rate, drop-off rate, main path share |
| Legend | Optional | Main path, secondary path, drop-off path, abnormal path, node type, width meaning |
| Main path canvas | Yes | Start, middle steps, end, branches, arrows |
| Tooltip | Yes | Node and transition exact details |
| Detail panel | Optional | Node, transition, drop-off, or path evidence |
| Footer / update note | Optional | Source, updated time, definition |
| State mask | Yes | Loading, empty, error, no-permission, too many paths/nodes |

### Fit Gate

Use a path chart when the decision is about ordered flow:

- Where users, leads, tasks, orders, or applications come from.
- Which key steps they pass through.
- Where conversion, branch, drop-off, rollback, or abnormal movement happens.
- Which path is the main path and which branches are secondary.

Do not use a path chart when:

- The user only needs ranking, composition, trend, or exact row audit.
- Steps have no clear order.
- The relationship is "who relates to whom" rather than "where it flows".
- The data is a geographic route or trajectory.
- Node/path counts cannot be bounded by Top N, aggregation, filtering, or pagination.

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
| Tiny | `W < 360` or `H < 260` | Title, single dropdown filter, main path, key nodes, tooltip | Subtitle, metric strip, legend, path labels, footer, ordinary branches |
| Standard | `360 <= W < 720` and `H >= 320` | Title, filter, metric strip, main path, Top branches, key labels, tooltip | Secondary labels, low-weight branches |
| Large | `W >= 720` and `H >= 420` | Full standard structure, Top `5-10` paths, drop-off branches, expand/collapse, optional search | Full all-path rendering still forbidden when dense |

### Slot Height Budget

```text
titleAreaH = 36-56px, default 44px
metricH = 0-48px
legendH = 0-28px
footerH = 0-24px

pathAreaH =
  CH
  - titleAreaH
  - metricH
  - legendH
  - footerH
  - gaps
```

Main path budget:

```text
pathAreaH >= CH * 0.52
```

If the budget fails, collapse in this order:

1. Hide footer/update note.
2. Reduce metric strip to `<= 2` items or hide it.
3. Collapse legend to `图例` dropdown.
4. Collapse local filter to single dropdown.
5. Hide path labels.
6. Hide secondary branch nodes or merge them into `其他`.
7. Switch to horizontal scroll, pagination, Sankey, relation graph, or table fallback.

### Component-Local Filter

Suitable local filters:

- Scope: all, main path, abnormal path.
- Period: 7 days, 30 days, 90 days.
- Metric basis: users, count, amount.
- Path type: visit path, conversion path, drop-off path.
- Top N: Top3, Top5, Top10.
- Depth: direct, two-hop, three-hop.
- Segment: new users, returning users, only when it does not change page/global scope.

Unsuitable local filters:

- Region + channel + user type + page type + time + depth + status in one component.
- Controls that change page/global scope, permission, export, backend aggregation, or path schema.

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

When `filterW > filterMaxW`, use a single capsule dropdown. Do not add a new filter row before protecting path body width and height.

Filter and legend separation:

- Filter = operational scope, such as all/main/abnormal or Top5.
- Legend = visual semantics, such as main path, secondary path, drop-off path, abnormal path, width meaning.
- Do not mix filter options and legend items in one row.

### Path Viewport

```text
pathAreaX = P
pathAreaY = P + titleAreaH + metricH + legendH + topGaps
pathAreaW = CW
pathAreaH = H - P - footerH - pathAreaY

pathInnerPaddingX = clamp(12px, pathAreaW * 0.04, 32px)
pathInnerPaddingY = clamp(12px, pathAreaH * 0.08, 32px)

canvasX = pathAreaX + pathInnerPaddingX
canvasY = pathAreaY + pathInnerPaddingY
canvasW = pathAreaW - 2 * pathInnerPaddingX
canvasH = pathAreaH - 2 * pathInnerPaddingY

mainPathY = canvasY + canvasH / 2
```

The path viewport must not be compressed by title, filters, metrics, or legend. If the path cannot fit, use scroll/fullscreen/fallback rather than shrinking text below the readable scale.

### Metric Strip

Recommended metrics:

- Total users/count/amount.
- Total conversion rate.
- Total drop-off rate.
- Average path length.
- Main path share.
- Abnormal path count.
- Completed end count.

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

### Linear Path Layout

Use for fixed-step conversion, approval, progress, or workflow paths.

```text
N = main path node count
nodeW = clamp(72px, canvasW / (N * 1.6), 132px)
nodeH = clamp(32px, H * 0.09, 48px)
stepGap = (canvasW - N * nodeW) / (N - 1)
```

Constraint:

```text
stepGap >= 32px
```

When `stepGap < 32px`, use compact mode:

- Reduce `nodeW`.
- Hide node secondary value.
- Show key nodes only.
- Enable horizontal scroll.
- Split the path or move to fullscreen.

Node coordinates:

```text
nodeX[i] = canvasX + i * (nodeW + stepGap)
nodeY[i] = mainPathY - nodeH / 2

nodeCenterX[i] = nodeX[i] + nodeW / 2
nodeCenterY[i] = nodeY[i] + nodeH / 2
```

Link coordinates:

```text
sourceX = nodeX[i] + nodeW
sourceY = nodeCenterY[i]
targetX = nodeX[i + 1]
targetY = nodeCenterY[i + 1]
arrowTipX = targetX - 2px
arrowTipY = targetY
```

### Branch Path Layout

Use for behavior paths, page jump paths, workflow branching, abnormal paths, and drop-off analysis.

```text
D = layer count
L[d] = node count in layer d
layerGap = canvasW / max(D - 1, 1)
nodeW = clamp(80px, layerGap * 0.45, 140px)
```

When layers are dense:

```text
nodeW = clamp(64px, layerGap * 0.4, 112px)
```

Layer coordinates:

```text
layerX[d] = canvasX + d * layerGap
nodeX[d,n] = layerX[d] - nodeW / 2
nodeX[0,n] = canvasX
nodeX[D-1,n] = canvasX + canvasW - nodeW
```

Layer vertical coordinates:

```text
nodeH = 32-44px
rowGap = clamp(12px, canvasH / (L * 1.5), 32px)
layerContentH = L * nodeH + (L - 1) * rowGap
layerStartY = canvasY + (canvasH - layerContentH) / 2
nodeY[d,n] = layerStartY + n * (nodeH + rowGap)
```

Ordering rules:

- Main path nodes stay nearest `mainPathY`.
- Higher-flow nodes stay closer to the centerline.
- Drop-off nodes prefer below the source node.
- Anomaly nodes may sit above or below, but they must not cross or cover the main path.
- Branches sort by weight and show Top `3-5` by default.

### Node Contract And Style

Node fields:

```text
id
name
type
order / layer
status
value
conversionRate
dropoffRate
isStart
isEnd
isMainPath
isDropoff
isAnomaly
```

Node content:

```text
node name
one value
```

Do not place name, count, share, YoY, MoM, rank, status, and reason all inside one node. Tooltip/detail carries the full payload.

Size:

| Type | Width | Height |
| --- | ---: | ---: |
| Small | `64-88px` | `28-36px` |
| Standard | `88-132px` | `36-44px` |
| Key | `112-160px` | `44-56px` |

Style:

- Radius `8-12px`.
- Padding `8-12px`.
- Weak `1px` border when needed.
- Main path uses theme shallow fill.
- Ordinary branch uses neutral shallow fill.
- Drop-off uses restrained warning fill/stroke.
- Anomaly uses border or corner marker.
- Selected node strengthens border and related links.

### Link Contract And Style

Link fields:

```text
source
target
value
conversionRate
dropoffRate
pathRank
status
period
isMainPath
isDropoff
isAnomaly
isAggregated
```

Bezier default:

```text
source = (sourceX, sourceY)
target = (targetX, targetY)

controlX1 = sourceX + (targetX - sourceX) * 0.45
controlY1 = sourceY

controlX2 = sourceX + (targetX - sourceX) * 0.55
controlY2 = targetY
```

Width mapping:

```text
linkW = minW + sqrt((value - minValue) / (maxValue - minValue)) * (maxW - minW)
minW = 1.5px
maxW = 10px
```

Large components may use `maxW = 14px`; small components cap at `8px`. Path width must not overpower nodes.

Opacity:

| Link | Opacity |
| --- | ---: |
| Main path | `80%-100%` |
| Ordinary branch | `35%-60%` |
| Weak path | `15%-30%` |
| Hovered path | `100%` |

Arrow:

```text
arrowSize = 5-8px
```

Arrowheads stop at the target node edge. If all paths flow left-to-right or links are very thick, arrows can be subtle or hidden.

### Label Rules

Node labels:

- Node names prefer `2-6` Chinese characters.
- `<= 6` characters show normally.
- `7-10` characters truncate on one line.
- `> 10` characters use abbreviation plus tooltip.
- Small size shows only node name.
- Dense paths show labels only for main path nodes.

Path labels:

- Font `11-12px`.
- Default labels: main path conversion rate, key drop-off amount/rate, anomaly marker.
- `E <= 5`: may show main labels.
- `6 <= E <= 12`: show Top labels only.
- `E > 12`: hide default path labels and use tooltip.

Label position:

```text
labelX = (sourceX + targetX) / 2
labelY = (sourceY + targetY) / 2 - 6px
```

For curves, use Bezier `t = 0.5`. Keep label-to-path gap `4-6px`. Hide low-weight labels when collisions occur.

### Legend

Legend can explain:

- Main path.
- Secondary path.
- Drop-off path.
- Abnormal path.
- Node type.
- Path width meaning.

Defaults:

```text
legendX = P + CW - legendW
legendY = P + titleAreaH + metricH + 4px
legendItems <= 4
legendRows <= 1
```

If too many legend items exist, collapse to `图例` dropdown. Do not place legend over the path canvas unless a safe empty corner is proven.

### Density Control

Node density:

| Nodes | Treatment |
| ---: | --- |
| `N <= 8` | Full path allowed |
| `9-20` | Key labels only |
| `21-40` | Show Top paths, aggregate low-weight nodes |
| `> 40` | Filter, paginate, Sankey, relation graph, or table fallback |

Transition density:

| Links | Treatment |
| ---: | --- |
| `E <= 8` | Full links allowed |
| `9-20` | Top path labels only |
| `21-50` | Filter low-weight links |
| `> 50` | Aggregate or switch visualization |

Default:

- Show Top `5` paths.
- Limit depth to `<= 5`.
- Hide share `< 1%` paths.
- Show Top `3` drop-off paths.
- Preserve abnormal paths when relevant.

Other node:

- Merge low-weight branches into `其他`.
- Render `其他` weaker than main nodes.
- Tooltip lists merged detail.

### Interaction

- Hover path: highlight current path and endpoints; dim unrelated paths to `10%-25%` and unrelated nodes to `30%-50%`.
- Click node: lock selection, highlight inbound/outbound/drop-off links, open node detail when needed.
- Click link: lock selected transition, show exact path detail, optionally expand next step.
- Expand/collapse: show `+N` or `更多` near a crowded node; default branches remain Top `3-5`.
- Search/locate: optional for high node count; use an icon or compact input in small components.

### Tooltip

Node tooltip includes:

- Node name.
- Node value.
- Share of total.
- Inbound path count.
- Outbound path count.
- Conversion/drop-off metrics.
- Period/source.

Link tooltip includes:

- Source and target.
- Transition value.
- Conversion rate.
- Drop-off rate.
- Average dwell/time when present.
- Change when present.
- Period/source.
- Aggregation rule when link includes `其他`.

Tooltip geometry:

```text
minW = 180px
maxW = 320px
padding = 8-12px
rowGap = 4-6px
fontSize = 12px
lineHeight = 18px
```

Auto-flip near right/top/bottom edges.

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, nodes, and links |
| Empty | Show "暂无路径数据" in path area |
| Error | Show "数据获取失败" |
| No permission | Show scoped permission state |
| Missing start | Show "缺少起点数据" |
| Missing end | Show known path and end as "未知" |
| Too many paths | Show Top N and aggregate rest |
| Too many nodes | Merge low-weight nodes |
| Zero-value path | Do not draw the path |
| Conversion unavailable | Show `--` |
| Change unavailable | Show `--` |
| Isolated node | Hide or weaken by default |
| Circular path | Use loop line, but do not expand many loops by default |

## Sunburst / Sunburst Chart Placement Algorithm

Use this for sunburst charts, hierarchy composition rings, category/cost/user/resource decomposition, and any report component where sector angle represents a non-negative additive value inside a hierarchy.

### Task Boundary

Sunburst answers:

- How the whole is split by first-level branches.
- How each parent branch splits into children.
- Which path contributes most to the total.
- Whether long-tail branches are material enough to investigate.

Sunburst does not answer:

- Single-level composition; use donut/pie or bar.
- Time trend.
- Exact ranking across many similar values.
- Negative-value comparison when the negative metric is the angle.
- Deep full-tree reading; use tree/list/drilldown.
- Dense leaf comparison where Treemap or table is clearer.

### Required Inputs

```text
W = component width
H = component height
P = component inner padding
CW = W - 2P
CH = H - 2P
D = visibleDepth
N = visible node count
```

Data contract:

- Hierarchy: `id`, `name`, `parentId` or `path`/`children`.
- Node metadata: `depth`, `parent`, `childCount`, `rank`, `period`, `source`.
- Angle metric: one non-negative additive metric such as amount, orders, quantity, users, cost, inventory, visits, or file size.
- Optional color metric: status, change rate, risk, attainment, or another numeric measure.
- Derived values: `totalValue`, `parentValue`, `percentOfTotal`, `percentOfParent`.
- Aggregation: Top N rule and `其他` count/value.

Reject the chart before layout when the angle metric is a rate, score, satisfaction, conversion rate, profit rate, signed change, negative value, or non-additive field.

### Area Budget

Slots:

| Slot | Required | Rule |
| --- | --- | --- |
| Header/title | Yes | Block/header owns title when present |
| Component-local filter | Optional | Header right or collapsed dropdown |
| Subtitle/source/unit | Optional | Weak text under title |
| Metric strip | Optional | Max 3 metrics |
| Legend/breadcrumb | Optional | Bottom, top-right, or right side |
| Sunburst body | Yes | Dominant radial area |
| Footer/definition | Optional | Weak line only |

Recommended slot heights:

```text
titleAreaH = 36-56px
metricH = 0-48px
legendH = 0-32px
footerH = 0-24px
sunburstAreaH >= CH * 0.55
```

Collapse order when height is tight:

1. Footer.
2. Secondary metrics.
3. Legend into compact text.
4. Filter into one dropdown capsule.
5. Deep labels.
6. Visible depth through drilldown.

### Component-Local Filter

Allowed local filters:

- Angle metric: `销售额 / 订单量 / 利润`.
- Period: `本月 / 本季 / 本年`.
- Hierarchy: `品类 / 渠道 / 区域`.
- Display: `实际值 / 占比 / 变化`.
- Density: `Top10 / Top20 / 全部`.
- Visible level: `1层 / 2层 / 3层`.

Filter geometry:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

If the filter does not fit, collapse to one dropdown. Do not shrink the radial body below the radius/ring budget to keep visible filter chips.

### Sunburst Body

Default body coordinates:

```text
sunburstAreaX = P
sunburstAreaY = P + titleAreaH + metricH + legendH + topGaps
sunburstAreaW = CW
sunburstAreaH = H - P - footerH - sunburstAreaY
sunburstInnerPadding = clamp(8px, min(sunburstAreaW, sunburstAreaH) * 0.04, 28px)
```

If using a right legend:

```text
legendW = clamp(120px, CW * 0.24, 200px)
plotW = sunburstAreaW - legendW - 12px
plotH = sunburstAreaH
plotX = sunburstAreaX
legendX = sunburstAreaX + plotW + 12px
```

Otherwise:

```text
plotX = sunburstAreaX
plotW = sunburstAreaW
plotH = sunburstAreaH
```

Center:

```text
centerX = plotX + plotW / 2
centerY = sunburstAreaY + plotH / 2
```

### Radius And Rings

```text
labelReserve = 0-24px
outerR = min(plotW, plotH) / 2 - labelReserve - sunburstInnerPadding
outerR = clamp(72px, outerR, 220px)
innerR = outerR * 0.28
ringGap = 1-3px
ringW = (outerR - innerR - ringGap * (D - 1)) / D
ringW = clamp(18px, ringW, 44px)
levelInnerR[d] = innerR + d * (ringW + ringGap)
levelOuterR[d] = levelInnerR[d] + ringW
```

Depth policy:

- `D = 1-2`: clear.
- `D = 3`: default upper bound.
- `D = 4`: only in large cards with restrained labels.
- `D >= 5`: use drilldown, visible-depth control, or another view.

If `ringW < 18px`, reduce visible levels before reducing font size. If `outerR < 72px`, switch to bar/table or enlarge the block.

### Angle Mapping

```text
total = sum(level1 value)
parentValue = providedParentValue || sum(childValue)
level1Angle = value / total * 360deg
childAngle = childValue / parentValue * parentAngle
startAngle = -90deg
endAngle = 270deg
```

Rules:

- Sector values must be non-negative and additive.
- If parent value conflicts with child sum, prefer child sum for geometry or disclose the reconciliation rule in tooltip.
- Sector gap is `0.5-1.5deg`; use `1-1.5deg` for `<= 12` sectors, `0.5-1deg` for `13-30`, and do not render full density above `30` visible siblings.
- Sectors below `1%` of the relevant parent are merged into `其他`, hidden from permanent labels, or moved behind drilldown.

### Label Strategy

Default: center label plus major sector labels. Do not create an outside-label ring by default.

Internal label threshold:

```text
midRadius = (innerR + outerR) / 2
arcLength = midRadius * sectorAngleRad
showLabel = sectorAngle >= 10deg
  && ringW >= 22px
  && arcLength >= labelTextWidth + 8px
```

Permanent label priority:

1. First-level branches.
2. Largest second-level branches.
3. Current selected path.
4. Top branches or anomalies.
5. Everything else moves to tooltip/detail.

Recommended permanent labels are `<= 8-12` by default and `<= 20` only in large components. Labels show name plus share at most; exact value belongs in tooltip.

External labels are allowed only when first-level categories are few, sectors are large, and right/bottom legend budget still passes:

```text
labelGap = 12-24px
labelR = outerR + labelGap
labelX = centerX + cos(midAngle) * labelR
labelY = centerY + sin(midAngle) * labelR
```

### Center Content

Center may show total, current node, selected path, Top branch, or all-zero/empty state.

```text
centerValueFontSize = clamp(18px, innerR * 0.36, 28px)
centerTextMaxW = innerR * 1.5
centerSubFontSize = 11-12px
```

Shorten unit, decimal precision, and label first. If the center text still does not fit, move full text to tooltip/detail; do not enlarge `innerR` until rings become unreadable.

### Color And Legend

- First-level nodes use stable distinct colors.
- Children inherit the parent hue and vary lightness/saturation.
- If color encodes another metric, legend text must distinguish angle from color, for example `角度：销售额 / 颜色：同比变化率`.
- Category colors should stay `<= 6` visible first-level groups by default; additional branches use Top N and neutral `其他`.
- Status colors stay `<= 4`; diverging colors require a declared zero/midpoint.

### Density And Aggregation

Total nodes:

| Count | Behavior |
| --- | --- |
| `<= 20` | Direct rendering allowed |
| `21-50` | Top N + `其他` |
| `51-100` | Drilldown or show only 2 levels |
| `> 100` | Do not render full sunburst by default |

Children per parent:

| Count | Behavior |
| --- | --- |
| `<= 6` | Show all children |
| `7-12` | Hide small labels |
| `13-20` | Top N + `其他` |
| `> 20` | Top N plus drilldown/search/detail |

Default Top N:

```text
small = Top5 + 其他
standard = Top8 + 其他
large = Top10 + 其他
otherValue = parentValue - sum(TopN)
```

`其他` stays last, uses weak/neutral color, and tooltip exposes included count, total, and aggregation rule. If `其他` is the largest branch, show fragmentation as a finding and prefer drilldown or table detail.

### Interaction

- Hover sector: current sector opacity `100%`, ancestors `90%`, descendants `80%-90%`, unrelated sectors `25%-45%`.
- Click sector: select/detail or drill down according to the declared behavior.
- Breadcrumb: required for deep drilldown; each segment returns to that level.
- Center click: returns to parent when drilldown is active.
- Animation: `150-250ms` radius/angle transition; avoid decorative rotation loops.

### Tooltip

Tooltip includes:

- Full path.
- Node value and unit.
- Percent of total.
- Percent of parent.
- Parent summary when useful.
- Rank among siblings.
- Color metric when present.
- Period/source.
- Active local filter.
- Aggregation rule for `其他`.
- Parent-child total reconciliation rule when applicable.

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton rings or radial shimmer inside body |
| Empty | Center state `暂无数据` |
| Error | Show retry/error state in sunburst body |
| No permission | Show scoped permission state |
| All zero | Center state `暂无有效占比` |
| Negative angle | Block rendering and show invalid metric state |
| Zero node | No angle; keep in detail/tooltip if needed |
| Tiny sectors | Merge, hide label, or require drilldown |
| Too many nodes | Top N + `其他` or drilldown |
| Too many levels | Show current layers with breadcrumb |
| Parent mismatch | Disclose reconciliation in tooltip |
| Label overflow | Hide permanent label and preserve tooltip |
| Missing color metric | Fall back to category color |
| Drilldown leaf | Disable child drilldown affordance |
| Aggregated `其他` | Tooltip exposes count and total |

## Treemap / Rectangular Tree Map Placement Algorithm

Use this for rectangular tree maps, area tree maps, hierarchy composition cards, cost/category/product/file-size structure maps, and any report component where rectangle area represents hierarchical value share.

### Task Boundary

Treemap answers:

- Which parts compose the whole.
- Which parent or leaf contributes the most.
- How value is distributed inside each parent group.
- Whether long-tail items are material enough to investigate.

Treemap does not answer:

- Time trend.
- Exact ranking across many similar values.
- Negative-value comparison when the negative metric is the area.
- Ordinary expand/collapse hierarchy reading.
- Many-to-many relationships.
- Full detail audit.

Route those tasks to line, bar/table, tree, relation graph, or detail table instead.

### Anatomy

| Slot | Required | Placement rule |
| --- | ---: | --- |
| Title | Yes | Block-owned or component top-left |
| Component-local filter | Optional | Header-right capsule/dropdown, current component only |
| Subtitle/unit | Recommended | Under title, includes unit, period, TopN/aggregation |
| Metric strip | Optional | Max `3` summary metrics |
| Breadcrumb | Required when drilldown | Left of legend band |
| Legend/visualMap | Required when color encodes data | Right of breadcrumb or bottom when long |
| Treemap body | Yes | Dominant body area |
| Parent groups | Required for multi-level | Weak boundary, top-left parent label when space allows |
| Child rectangles | Yes | Area by value, label by threshold |
| Tooltip/detail | Yes | Exact path/value/share disclosure |
| Footer/source | Optional | Collapse before body shrinks |

### Coordinate Contract

```text
W = containerWidth
H = containerHeight
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
```

| Tier | Condition | Behavior |
| --- | --- | --- |
| Small | `W < 360px` or `H < 260px` | Keep title, one compact filter, treemap body, tooltip; hide subtitle, metrics, legend, footer; show only top `3-5` labels |
| Standard | `360px <= W < 720px` and `H >= 320px` | Keep title, filter, optional metrics, main labels, optional legend; `1-2` visible levels; Top20 + `其他` |
| Large | `W >= 720px` and `H >= 420px` | Full structure, breadcrumb/drilldown, more parent and child labels; Top30 + `其他` |

### Slot Heights And Body Budget

```text
titleAreaH = clamp(36px, H * 0.12, 56px)
metricH = visibleMetricStrip ? clamp(32px, H * 0.10, 48px) : 0
legendH = visibleLegendOrBreadcrumb ? clamp(20px, H * 0.08, 32px) : 0
footerH = visibleFooter ? clamp(16px, H * 0.06, 24px) : 0
gapTitleMetric = metricH > 0 ? 8px : 0
gapMetricLegend = metricH > 0 && legendH > 0 ? 6px : 0
gapLegendBody = legendH > 0 ? 8px : 0
gapBodyFooter = footerH > 0 ? 8px : 0
```

```text
treemapAreaX = P
treemapAreaY = P + titleAreaH + gapTitleMetric + metricH + gapMetricLegend + legendH + gapLegendBody
treemapAreaW = CW
treemapAreaH = H - P - treemapAreaY - gapBodyFooter - footerH
```

Acceptance floor:

```text
treemapAreaH >= CH * 0.55
```

If the floor fails, collapse in this order:

1. Footer/source.
2. Metric strip.
3. Legend into compact `图例 ▾`.
4. Local filter into compact dropdown.
5. Child value labels.
6. Child name labels below threshold.
7. Extra visible levels.
8. Move to larger block/fullscreen/table fallback.

### Component-Local Filter

Treemap local filters may switch area metric, period, hierarchy dimension, display metric, TopN scope, or unit. They should not carry complex global scope such as region + channel + category + store + status + owner in the chart header.

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

If `filterW > filterMaxW`, use one dropdown. Do not add a second filter row until `treemapAreaH >= CH * 0.55` still passes.

### Metric Strip

Keep at most `3` metrics.

| Metric | Example |
| --- | --- |
| Total | `总计 1234万` |
| Largest category | `最大 服饰 32%` |
| Top N share | `Top5 占比 68%` |
| Category count | `共 24 类` |
| Other share | `其他 12%` |
| Change rate | `同比 +12.5%` |
| Abnormal count | `异常 6 项` |

```text
metricX = P
metricY = P + titleAreaH + 8px
metricGap = clamp(12px, W * 0.03, 24px)
metricItemW = (CW - metricGap * (M - 1)) / M
```

### Breadcrumb And Legend

Breadcrumb appears when `depth > 2` or drilldown is enabled.

```text
breadcrumbX = P
breadcrumbY = P + titleAreaH + metricH + 6px
legendX = P + CW - legendW
legendY = breadcrumbY
```

Rules:

- Breadcrumb left, legend/visualMap right when both fit.
- If legend is long, move it below the body or collapse to `图例 ▾`.
- Legend explains color and/or area, for example `面积：销售额 · 颜色：同比`.
- Legend is not a filter. Local filters and legend items must not be mixed in one control row.

### Area Metric Contract

Area metric must be non-negative, additive, and meaningful as a share of a total.

Suitable area metrics: amount, quantity, users, orders, cost, inventory, file size.

Unsuitable area metrics: negative values, change rate, satisfaction, conversion rate, score, rank. These may appear as color metrics or tooltip fields.

```text
totalValue = sum(leaf.value where value > 0)
parentValue = sum(child.value)
percentOfTotal = value / totalValue
percentOfParent = value / parentValue
```

If `totalValue == 0`, show all-zero/empty state instead of fake rectangles. If negative values exist, do not use them directly as area; filter them, move them to tooltip/color, use absolute value only with explicit approval, or switch to bar/waterfall/table.

### Treemap Body

```text
treemapInnerPadding = clamp(4px, min(treemapAreaW, treemapAreaH) * 0.015, 12px)
plotX = treemapAreaX + treemapInnerPadding
plotY = treemapAreaY + treemapInnerPadding
plotW = treemapAreaW - 2 * treemapInnerPadding
plotH = treemapAreaH - 2 * treemapInnerPadding
plotArea = plotW * plotH
area[i] = value[i] / totalValue * plotArea
```

Default layout is Squarified Treemap:

1. Sort children by value descending.
2. Fill the shorter side first.
3. Add items to the current row/column while the worst aspect ratio improves.
4. Commit the row/column when adding the next item worsens aspect ratio.
5. Recurse inside each parent group.

Target:

```text
aspectRatio <= 4
```

When rectangles become too narrow or too small, aggregate long-tail values into `其他`, reduce visible levels, or switch to drilldown/detail table.

### Parent Group Geometry

```text
parentPadding = 6-12px
parentHeaderH = 18-24px
childrenX = parentX + parentPadding
childrenY = parentY + parentHeaderH + parentPadding
childrenW = parentW - 2 * parentPadding
childrenH = parentH - parentHeaderH - 2 * parentPadding
```

Parent label:

```text
parentLabelX = parentX + 8px
parentLabelY = parentY + 6px
```

Show parent label only when:

```text
parentW >= 80px && parentH >= 48px
```

If parent is smaller, hide parent label and disclose parent path in tooltip.

Parent styling:

- Boundary: weak.
- Background: slight tint or same-hue lightness.
- Radius: `6-10px`, reduced to `1-2px` for tiny groups.
- Font: `12-13px`, weight `500-600`, line-height `16-18px`.

### Child Rectangle Geometry

```text
cellGap = clamp(1px, min(cellW, cellH) * 0.04, 4px)
drawX = cellX + cellGap / 2
drawY = cellY + cellGap / 2
drawW = cellW - cellGap
drawH = cellH - cellGap
```

| Size | Gap |
| --- | ---: |
| Small cells | `1px` |
| Standard cells | `2px` |
| Large cells | `3-4px` |

```text
childRadius = clamp(1px, min(drawW, drawH) * 0.08, 6px)
```

Do not use large radius on tiny rectangles because it distorts area perception.

### Child Labels

Labels align to the rectangle top-left.

```text
labelX = cellX + 6px
labelY = cellY + 6px
valueX = labelX
valueY = labelY + labelLineH + 2px
```

Do not center labels by default. Top-left alignment scans more reliably when rectangles vary in size.

| Rectangle size | Permanent content |
| --- | --- |
| `W >= 96px && H >= 56px` | Name + value + share |
| `W >= 72px && H >= 40px` | Name + value |
| `W >= 48px && H >= 28px` | Name only |
| `W < 48px || H < 28px` | No permanent label, tooltip only |
| `W < 16px || H < 16px` | Color block only or aggregate |

| Text | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Parent label | `12-13px` | `500-600` | `16-18px` |
| Child name | `11-12px` | `500` | `14-16px` |
| Child value | `11-12px` | `400-500` | `14-16px` |
| Share label | `10-11px` | `400` | `12-14px` |

Recommended child name length is `2-8` Chinese characters. Long labels truncate with tooltip; if space is still insufficient, hide value first, then hide all permanent text.

```text
if backgroundLuminance < 0.5:
  labelColor = lightText
else:
  labelColor = darkText
```

### Color And Encoding

```text
area = primary metric
color = category | status | change rate | attainment | risk | secondary numeric metric
```

Rules:

- Parent category color: parent groups use distinct families; child rectangles vary by same-hue depth.
- Parent categories should be `<= 6` visible color families. Above that, use neutral base plus Top/highlight colors.
- Continuous positive values use sequential light-to-dark scale.
- Signed change/deviation uses diverging scale with `0` as midpoint.
- Status color uses at most `4` levels. Warning/error colors only mark true exceptions.
- The page must not become a full warning-color mosaic.

### Density And Aggregation

| Leaf count | Treatment |
| ---: | --- |
| `<= 12` | Full display allowed |
| `13-30` | Top N, small labels hidden |
| `31-80` | Top N + `其他` required |
| `> 80` | Drilldown, search, pagination, or table fallback |

```text
small: Top10 + 其他
standard: Top20 + 其他
large: Top30 + 其他
otherValue = total - sum(TopN)
```

`其他` appears last inside its parent, uses weaker/neutral color, and tooltip lists included count and total. If `其他` share is high, expose a fragmentation note and offer drilldown/detail.

### Interaction

- Hovered rectangle opacity `100%`; same parent `90%`; other parents `45%-65%`.
- Hover border or outline strengthens without changing geometry.
- Parent click drills into next level when drilldown is enabled.
- Leaf click selects the leaf or opens detail.
- Breadcrumb click returns to that level.
- Selected path or parent remains highlighted.

```text
duration = 150-250ms
style = fade + area transition
```

Animation must be light enough that users keep spatial orientation.

### Tooltip

Leaf tooltip includes:

- Full path.
- Value + unit.
- Percent of total.
- Percent of parent.
- Color metric when present.
- Rank.
- Period/source.
- Aggregation rule when applicable.

Parent tooltip includes:

- Parent name.
- Parent value + unit.
- Child count.
- Percent of total.
- Largest child and share.
- Color metric summary when present.
- Period/source.

Tooltip geometry:

```text
minWidth = 180px
maxWidth = 320px
padding = 8-12px
lineGap = 4-6px
fontSize = 12px
lineHeight = 18px
offset = 8-12px
```

### States

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title, filter, metric strip, and rectangle blocks |
| Empty | `暂无数据` in treemap viewport |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in treemap viewport |
| All zero | `暂无有效占比` instead of fake rectangles |
| Negative values | Do not render as area; show invalid-area state or switch chart |
| Zero leaf | No area; disclose through tooltip/detail/table |
| Too many leaves | Top N + `其他` or drilldown/search |
| Too many levels | Current-level drilldown with breadcrumb |
| Tiny rectangles | Hide labels, aggregate, or detail on hover |
| Missing hierarchy | Show data-gap state |
| Color metric missing | Fall back to category color and note in tooltip |
| Drilldown no child | Disable drilldown and disclose in tooltip |
| Aggregated `其他` | Show count and detail/drilldown affordance |

## Tree / Hierarchical Tree Placement Algorithm

Use this for node-and-connector hierarchy charts: organization trees, category trees, product/module trees, metric decomposition trees, cost structures, permission trees, directory structures, task breakdown, data lineage, and upstream/downstream trees. This section does not cover Treemap area charts. If a node has many cross-links or multiple parents, use relation graph rules instead.

### Anatomy

| Slot | Required | Notes |
| --- | --- | --- |
| Title | Yes | Tree subject |
| Component-local filter | Optional | All/key/abnormal, visible depth, current/history, metric basis, expanded/collapsed |
| Subtitle / definition | Optional | Hierarchy scope, period,口径 |
| Metric strip | Optional | At most `3` items: node count, depth, expanded nodes, abnormal nodes, leaf count, total value |
| Legend | Optional | Normal, abnormal, key, collapsed, leaf |
| Search / locate | Optional | Required when dense node count needs navigation |
| Main tree canvas | Yes | Root, branch nodes, leaf nodes, parent-child connectors, expand/collapse |
| Tooltip | Yes | Full node and hierarchy evidence |
| Detail panel | Optional | Node detail, child list, evidence table |
| Footer / update note | Optional | Source, updated time, method note |
| State mask | Yes | Loading, empty, error, no-permission, missing root, too many nodes |

### Fit Gate

Use tree/hierarchical tree when the decision depends on:

- What the root is.
- Which levels exist.
- Which node belongs to which parent.
- Which branch is important, abnormal, or expanded.
- How a metric, organization, permission, dependency, or category decomposes by hierarchy.

Do not use tree/hierarchical tree when:

- A node has many cross-links or multiple parents and relationship connectivity is the decision.
- The primary task is part-to-whole area comparison; use Treemap.
- The task is simple ranking, trend, composition, or row audit.
- The design expands every node even though density rules require collapse, search, or a tree list.

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
| Tiny | `W < 360` or `H < 260` | Title, single dropdown local filter, root, first level, tooltip | Subtitle, metric strip, legend, node values, footer, deep levels |
| Standard | `360 <= W < 720` and `H >= 320` | Title, filter, optional metric strip, main tree, expand/collapse, key labels | Ordinary node values, secondary legend, footer |
| Large | `W >= 720` and `H >= 420` | `3-4` levels, node values for key nodes, search/locate, expand/collapse, optional scroll/fullscreen | Full expansion still limited by density |

### Slot Height Budget

```text
titleAreaH = 36-56px, default 44px
metricH = 0-48px
legendH = 0-28px
footerH = 0-24px

treeAreaH =
  CH
  - titleAreaH
  - metricH
  - legendH
  - footerH
  - gaps
```

Main tree budget:

```text
treeAreaH >= CH * 0.55
```

If the budget fails, collapse in this order:

1. Hide footer/update note.
2. Reduce metric strip to `<= 2` items or hide it.
3. Collapse legend to a compact `图例` dropdown or remove it when only one state exists.
4. Collapse local filter to single dropdown.
5. Hide node values.
6. Show only root plus `1-2` levels.
7. Switch to tree list, search-first view, pagination, or fullscreen.

### Component-Local Filter

Suitable local filters:

- Scope: all, key, abnormal.
- Visible depth: level 1, level 2, level 3.
- Expand mode: expanded, collapsed, current path.
- Metric basis: amount, count, share, completion.
- Period: current, history.
- Object type: organization, metric, cost, product, permission.

Unsuitable local filters:

- Region + department + status + time + level + type + person in one component.
- Filters that change page/global scope, permission, export scope, backend aggregation, or schema.

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

When `filterW > filterMaxW`, collapse to a single capsule dropdown. Protect tree height before creating another filter row.

Filter and legend separation:

- Filter = operation scope or visible depth.
- Legend = node/status semantics.
- Do not mix items such as `正常 / 异常 / 全部 / 重点` in one row.

### Tree Viewport

```text
treeAreaX = P
treeAreaY = P + titleAreaH + metricH + legendH + topGaps
treeAreaW = CW
treeAreaH = H - P - footerH - treeAreaY

treeInnerPaddingX = clamp(12px, treeAreaW * 0.04, 32px)
treeInnerPaddingY = clamp(12px, treeAreaH * 0.08, 32px)
canvasX = treeAreaX + treeInnerPaddingX
canvasY = treeAreaY + treeInnerPaddingY
canvasW = treeAreaW - 2 * treeInnerPaddingX
canvasH = treeAreaH - 2 * treeInnerPaddingY
```

The tree canvas is the pan/scroll/fit viewport. It must not expand the page.

### Orientation Choice

| Shape | Default | Reason |
| --- | --- | --- |
| Deep hierarchy, long labels, lineage, dependency | Horizontal `LR` | Depth is easier to scan left-to-right |
| Shallow org/category tree, broad first level | Vertical `TB` | Stable organization structure |
| Many nodes, exact names, check/search | Indented tree list | Saves space and improves reading |
| Few levels, presentation-only global view | Radial | Exception; not default for BI reports |

### Horizontal Tree Layout

Definitions:

```text
D = visible depth count
L[d] = visible node count at layer d
```

Node size:

```text
nodeW = clamp(88px, canvasW / (D * 1.8), 148px)
nodeH = clamp(32px, H * 0.09, 48px)
```

If node only shows name, use `nodeH = 32-36px`. If it shows name plus one value, use `nodeH = 40-52px`.

Layer gap:

```text
levelGap = (canvasW - D * nodeW) / max(D - 1, 1)
levelGap >= 32px
```

When `levelGap < 32px`, reduce node width, hide node values, reduce visible depth, or enable horizontal scroll.

Layer x coordinate:

```text
levelX[d] = canvasX + d * (nodeW + levelGap)
nodeX[d,n] = levelX[d]
```

Vertical placement:

```text
nodeGapY = canvasH / max(L[d], 1)
nodeCenterY[d,n] = canvasY + nodeGapY * n + nodeGapY / 2
nodeY[d,n] = nodeCenterY[d,n] - nodeH / 2
```

Preferred subtree placement:

1. Place visible leaf nodes in display order.
2. For each parent, compute `parentCenterY = average(childCenterY)`.
3. Place collapsed or leaf parent without visible children into its layer's available slot.
4. Resolve overlaps by increasing gaps, collapsing lower-priority branches, or switching to scroll/list.

### Vertical Tree Layout

Node size:

```text
nodeW = clamp(88px, canvasW / maxLayerNodeCount * 0.65, 148px)
nodeH = 36-52px
```

Layer gap:

```text
levelGapY = (canvasH - D * nodeH) / max(D - 1, 1)
levelGapY >= 28px
```

If depth is too large, switch to horizontal tree or vertical scroll.

Layer y coordinate:

```text
levelY[d] = canvasY + d * (nodeH + levelGapY)
```

Horizontal placement:

```text
nodeGapX = canvasW / max(L[d], 1)
nodeCenterX[d,n] = canvasX + nodeGapX * n + nodeGapX / 2
nodeX[d,n] = nodeCenterX[d,n] - nodeW / 2
parentCenterX = average(childCenterX)
```

### Connectors

Horizontal orthogonal connector:

```text
parentRightX = parentX + nodeW
parentCenterY = parentY + nodeH / 2
childLeftX = childX
childCenterY = childY + nodeH / 2
midX = parentRightX + (childLeftX - parentRightX) / 2

path =
  (parentRightX, parentCenterY)
  -> (midX, parentCenterY)
  -> (midX, childCenterY)
  -> (childLeftX, childCenterY)
```

Vertical orthogonal connector:

```text
parentBottomX = parentX + nodeW / 2
parentBottomY = parentY + nodeH
childTopX = childX + nodeW / 2
childTopY = childY
midY = parentBottomY + (childTopY - parentBottomY) / 2

path =
  (parentBottomX, parentBottomY)
  -> (parentBottomX, midY)
  -> (childTopX, midY)
  -> (childTopX, childTopY)
```

Connector style:

```text
lineWidth = 1px
importantPathLineWidth = 1.5-2px
defaultOpacity = 45%-65%
weakOpacity = 15%-30%
```

Connectors remain weaker than nodes and must stop at node edges.

### Node Design

Standard node content:

- Node name.
- Optional one core value.
- Optional status marker.
- Optional child count through a small `+N` capsule.

Node size tiers:

| Node type | Width | Height |
| --- | ---: | ---: |
| Compact | `72-96px` | `28-36px` |
| Standard | `96-132px` | `36-48px` |
| Information | `120-160px` | `48-64px` |
| Root | standard + `8-16px` | standard height |

Node style:

```text
radius = 8-12px
padding = 8-12px
border = 1px subtle border
```

Root nodes may use slightly stronger text, border, or background. Leaf nodes use weaker background/border and no expand control.

### Expand / Collapse

Control placement:

- Horizontal tree: right side of node.
- Vertical tree: below or right-bottom of node.

Control size:

```text
controlSize = 16-20px
fontSize = 11-12px
radius = 999px
gapToNode = 4-6px
```

States:

| State | Display |
| --- | --- |
| Expandable | `▸` or `+N` |
| Expanded | `▾` |
| Leaf | no control |
| Child loading | small loading state at control position |
| Collapsed | child count such as `+12` |

Expand/collapse animation is `150-250ms`, affects opacity/position lightly, and must not shift unrelated sections.

### Labels

Node label rules:

- Node name font `12px`, weight `500`.
- Node value font `11-12px`, weight `400/500`.
- Full node value count inside a node is limited to one core value.
- Long labels: `<= 8` Chinese characters show normally, `9-14` ellipsize with tooltip, `> 14` abbreviate or use tree list/detail.
- Dense trees keep permanent labels only for root, current path, selected, Top, abnormal, or sparse nodes.

### Metrics

Recommended metric strip items:

- Node count.
- Depth.
- Expanded nodes.
- Abnormal nodes.
- Leaf count.
- Max branch.
- Total value.
- Completion rate.

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

### Legend

Show a legend only when node color/shape/status needs explanation.

Recommended legend items:

- Normal node.
- Abnormal node.
- Key node.
- Collapsed node.
- Leaf node.

Limits:

```text
legendItems <= 4 recommended
legendItems <= 6 maximum
```

Default placement:

```text
legendX = P + CW - legendW
legendY = P + titleAreaH + metricH + 4px
```

### Density Rules

Node count:

| Count | Behavior |
| ---: | --- |
| `N <= 30` | Visible tree can be complete |
| `31-80` | Default expand `2-3` levels; collapse deeper branches |
| `81-150` | Require expand/collapse, search/locate, and Top N child display |
| `N > 150` | Use indented tree list, virtual scroll, pagination, or search-first view |

Depth:

| Depth | Behavior |
| ---: | --- |
| `D <= 4` | Complete levels allowed |
| `5-6` | Horizontal tree preferred; partial collapse |
| `7-10` | Tree list, horizontal scroll, or search/locate |
| `D > 10` | Avoid ordinary static tree |

Children per node:

| Child count | Behavior |
| ---: | --- |
| `<= 5` | May expand |
| `6-12` | Sort children and keep spacing |
| `13-30` | Show Top N; collapse remainder as `+N` |
| `> 30` | Aggregate as `其他` or use list/table |

Default child display:

```text
small block: Top 3
standard block: Top 5
large block: Top 8
```

Sort order:

1. Abnormal nodes.
2. Key nodes.
3. High-value nodes.
4. Business-defined order.

### Interaction

Hover node:

- Current node opacity `100%`.
- Parent/child path and related connectors `90%`.
- Unrelated nodes `25%-45%`.
- Unrelated connectors `10%-25%`.
- Tooltip opens without moving layout.

Click node:

- Fix selected state.
- Highlight root-to-current path.
- Open node detail, child list, or related table when available.

Search/locate:

- Use when node count is high.
- Placement: legend/control band left side or tree viewport top-left.
- Search input `28-32px` high, `140-220px` wide; small components may show search icon first.
- Search expands to the target, highlights root-to-target path, and scrolls/zooms into view.

### Tooltip

Tooltip payload:

- Node name.
- Level/depth.
- Parent node.
- Child count.
- Leaf/collapsed state when useful.
- Metric value, unit, share of parent when useful.
- Status/anomaly reason.
- Owner/person if allowed and relevant.
- Period/source/update time.
- Aggregation rule for `其他`/`+N`.

Tooltip geometry:

```text
minWidth = 180px
maxWidth = 320px
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
| Loading | Skeleton for title, filter, nodes, and connectors |
| Empty | `暂无层级数据` in tree viewport |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in tree viewport |
| Missing root | `缺少根节点`; do not draw orphan tree |
| Empty children | Hide expand control |
| Child loading | Loading indicator at expand control |
| Too many nodes | Default collapsed state plus search/list fallback |
| Too many levels | Limit visible depth; offer tree list/search |
| Branch too dense | Show Top N and `+N`/`其他` |
| Circular reference | Stop traversal and surface data defect |
| Multiple parent conflict | Treat as data defect or switch to relation graph |
| Long node name | Ellipsis/abbreviation with tooltip |
| Search no result | `未找到节点` |
| Aggregated children | Show `+N`/`其他` with detail tooltip |

## Relation / Network Graph Placement Algorithm

Use this for entity-relationship and network diagrams: people, enterprises, accounts, devices, systems, APIs, transactions, knowledge graphs, dependencies, collaboration networks, and risk clusters. Trees, Sankey flows, maps, and simple process diagrams use their own rules unless the primary task is network connectivity.

### Anatomy

| Slot | Required | Notes |
| --- | --- | --- |
| Title | Yes | Relation graph subject |
| Component-local filter | Optional | Scope, relationship type, period, direction, abnormality |
| Subtitle / definition | Optional | Data range, relationship threshold, graph口径 |
| Metric strip | Optional | At most `3` items such as node count, edge count, core node, anomaly count |
| Legend | Recommended | Node type, edge type, status, relationship strength |
| Search / locate | Optional | Useful when node count is high |
| Main graph canvas | Yes | Nodes, edges, arrows, groups, labels |
| Zoom / reset controls | Recommended | Pan, zoom, fit view, reset |
| Tooltip | Yes | Node and edge exact details |
| Detail panel | Optional | Node or edge evidence |
| Footer / update note | Optional | Source, updated time, method note |
| State mask | Yes | Loading, empty, error, no-permission, too many nodes/edges |

### Fit Gate

Use relation graph when the decision is about structure:

- Who connects to whom.
- Which node is central.
- Which nodes form a community or group.
- Which relationships are strong, weak, abnormal, upstream, downstream, or circular.
- Which dependency path or relationship neighborhood matters.

Do not use relation graph when:

- The user only needs ranking or value comparison.
- The task is trend, composition, or exact row audit.
- Node/edge count is too high without filter, aggregation, or local exploration.
- Relationship density is so high that the graph becomes a hairball.

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
| Tiny | `W < 360` or `H < 280` | Title, single dropdown local filter, core node, key edges, tooltip, optional reset | Subtitle, metric strip, ordinary legend, ordinary labels, edge labels, footer |
| Standard | `360 <= W < 720` and `H >= 320` | Title, filter, metric strip, compact legend, core/anomaly labels, main graph, hover/click/zoom | Ordinary labels and edge labels |
| Large | `W >= 720` and `H >= 420` | Full structure, grouped areas, search, node expand/collapse, detail card | Full graph still limited by density |

### Slot Height Budget

```text
titleAreaH = 36-56px, default 44px
metricH = 0-48px
legendH = 0-32px
footerH = 0-24px

graphH =
  CH
  - titleAreaH
  - metricH
  - legendH
  - footerH
  - gaps
```

Main graph budget:

```text
graphH >= CH * 0.55
```

If the budget fails, collapse in this order:

1. Hide footer/update note.
2. Reduce metric strip to `<= 2` items or hide it.
3. Collapse legend to `图例` dropdown.
4. Collapse local filter to single dropdown.
5. Hide ordinary node labels.
6. Hide edge labels.
7. Switch to local exploration, aggregation, or fullscreen.

### Component-Local Filter

Suitable local filters:

- Scope: all, direct, two-hop.
- Strength: all, strong, weak.
- Period: 7 days, 30 days, 90 days.
- Mode: nodes, relationships, anomalies.
- Type: transaction, investment, employment, control, dependency, upstream, downstream.

Unsuitable local filters:

- Region + industry + person + status + relationship type + time + layer + weight in one component.
- Controls that change page/global scope, permission, export, backend aggregation, or graph schema.

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

When `filterW > filterMaxW`, use a single capsule dropdown. Do not create a new filter row before protecting graph height.

Filter and legend separation:

- Filter = operation scope.
- Legend = node/edge/status semantics.
- Do not mix items such as `客户 / 账户 / 全部 / 直接 / 二度` in one row.

### Graph Viewport

```text
graphX = P
graphY = P + titleAreaH + metricH + legendH + topGaps
graphW = CW
graphH = H - P - footerH - graphY

graphInnerPadding = clamp(12px, min(graphW, graphH) * 0.05, 32px)
canvasX = graphX + graphInnerPadding
canvasY = graphY + graphInnerPadding
canvasW = graphW - 2 * graphInnerPadding
canvasH = graphH - 2 * graphInnerPadding
```

The canvas must be an explicit pan/zoom viewport. It must not expand page size.

### Metric Strip

Recommended metrics:

- Node count.
- Edge count.
- Core node.
- Anomaly node/edge count.
- Average degree.
- Max-degree node.
- Community count.
- Risk count.

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

### Node Contract And Style

Node fields:

```text
id
name
type
status optional
value optional for size
group optional
degree optional
isCore optional
isAnomaly optional
```

Visible node types:

```text
3-5 preferred
>5 merge types, filter, or disclose detailed type in tooltip
```

Shape:

- Circle by default.
- Rounded rectangle for system, organization, page, or module.
- Diamond only for risk/decision nodes when the semantic is important.
- Use at most `2-3` shapes in one graph.

Node radius:

```text
normal nodeR = 5-10px
coreNodeR = 12-18px
minR = 5px
maxR = 18px
nodeR = minR + sqrt((value - minValue) / (maxValue - minValue)) * (maxR - minR)
```

Dense graph:

```text
minR = 3px
maxR = 10px
```

Selection opacity:

```text
selected node = 100%
neighbor node = 90%
unrelated node = 15%-30%
selected/related edge = 90%
unrelated edge = 8%-15%
```

### Edge Contract And Style

Edge fields:

```text
source
target
type
direction optional
weight optional
status optional
time optional
```

Invalid edges:

- Missing source or target node: do not draw as normal; expose count/detail as data gap.
- Self-link: draw a small loop only when meaningful.
- Circular relation: use curved edges or directional highlighting.

Default edge style:

```text
edgeWidth = 1px
edgeOpacity = 35%-60%
weak edgeWidth = 0.75-1px
weak edgeOpacity = 20%-35%
important edgeWidth = 1.5-3px
smallComponentMaxEdgeWidth = 2.5px
```

Weight mapping:

```text
edgeWidth = minW + sqrt((weight - minWeight) / (maxWeight - minWeight)) * (maxW - minW)
minW = 1px
maxW = 4px
```

Directional arrows:

```text
arrowSize = 5-8px
direction = normalize(target - source)
targetEdgePoint = target - direction * targetNodeR
arrowTip = targetEdgePoint
```

Multiple relations:

```text
single edge = straight line
multi edge = slight curve
bidirectional edge = two opposite curves
curveOffset = 8-20px
```

Edges must stay visually weaker than nodes. Do not let edge color or thickness dominate the graph.

### Label Rules

Node labels:

```text
core labels = always visible
Top/anomaly/selected labels = visible
ordinary labels = hover only
permanent labels <= 10 normally
large graph permanent labels <= 20
```

Label placement:

```text
labelX = nodeX + nodeR + 6px
labelY = nodeY
align = left center
```

Near right edge:

```text
labelX = nodeX - nodeR - 6px - labelW
align = right center
```

Label text:

| Length | Behavior |
| --- | --- |
| `<= 8` Chinese chars | One line |
| `9-14` Chinese chars | One-line ellipsis |
| `>14` Chinese chars | Abbreviation + tooltip |
| Small size | Core labels only |
| Collision | Hide lower-priority labels |

Edge labels:

- Hidden by default.
- Show on hover, selected edge, or key relationships only.
- Position at edge midpoint or curve midpoint.

### Layout Algorithms

Force layout:

```text
linkDistance = clamp(48px, min(canvasW, canvasH) * 0.12, 120px)
nodeRepulsion = 120-400
centerForce = 0.05-0.2
collisionRadius = nodeR + labelReserve + 4px
```

When node count increases:

- Reduce link distance.
- Reduce visible labels.
- Reduce node radius.
- Increase repulsion moderately.

Radial core layout:

```text
coreX = canvasX + canvasW / 2
coreY = canvasY + canvasH / 2
r1 = min(canvasW, canvasH) * 0.22-0.30
r2 = min(canvasW, canvasH) * 0.36-0.44
angleStep = 360deg / nodesInRing
nodeX = coreX + r * cos(angle)
nodeY = coreY + r * sin(angle)
```

Use for direct/two-hop subject analysis.

Hierarchical layout:

```text
levelGap = clamp(80px, canvasW / levelCount * 0.6, 180px)
nodeGap = clamp(32px, canvasH / maxNodesInLevel, 80px)
nodeX = canvasX + levelIndex * levelGap
nodeY = canvasY + orderInLevel * nodeGap
```

For top-to-bottom layouts, swap X/Y logic.

Grouped layout:

```text
groupAreaW = canvasW / groupCount
groupGap = 16-32px
groupPadding = 12-24px
groupRadius = 8-12px
groupFillOpacity = 4%-8%
```

Use light grouping backgrounds; never let groups overpower nodes.

### FitView And Boundary Protection

After layout, compute graph bounding box:

```text
graphBBoxW = graphMaxX - graphMinX
graphBBoxH = graphMaxY - graphMinY
scale = min(canvasW / graphBBoxW, canvasH / graphBBoxH) * 0.9
scale = clamp(0.4, scale, 1.4)
offsetX = canvasX + canvasW / 2 - (graphMinX + graphBBoxW / 2) * scale
offsetY = canvasY + canvasH / 2 - (graphMinY + graphBBoxH / 2) * scale
```

Boundary clamp:

```text
nodeX = clamp(nodeX, canvasX + nodeR, canvasX + canvasW - nodeR)
nodeY = clamp(nodeY, canvasY + nodeR, canvasY + canvasH - nodeR)
labelX >= canvasX
labelX + labelW <= canvasX + canvasW
labelY >= canvasY
labelY + labelH <= canvasY + canvasH
```

The graph should be centered, not clipped, and not hidden under title, legend, controls, or footer.

### Legend And Controls

Legend content:

- Node types.
- Edge types.
- Node status.
- Edge strength.
- Risk level.

Limits:

```text
node legend <= 5 items
edge legend <= 3 items
total legend <= 8 items
```

Overflow:

- Merge types.
- Collapse to `图例` dropdown.
- Move secondary details to tooltip/definition.

Legend geometry:

```text
legendX = P + CW - legendW
legendY = P + titleAreaH + metricH + 4px
legendFont = 12px
legendLineH = 16-18px
legendDot = 8-10px
legendLine = 16-24px
legendItemGap = 12-16px
```

Zoom controls:

```text
controlSize = 28-32px
controlRadius = 6-8px
controlX = graphX + graphW - controlSize - 12px
controlY = graphY + 12px
minZoom = 0.4
maxZoom = 2.5
```

Search:

```text
searchH = 28-32px
searchW = 120-200px
```

When small, show only a search icon that expands. Search result focuses node, highlights it, and fitViews to its neighborhood.

### Density Control

Node count:

| Nodes | Behavior |
| ---: | --- |
| `N <= 30` | Full graph may show |
| `31-80` | Hide ordinary labels; keep core/anomaly labels |
| `81-150` | Aggregate low-weight nodes and preserve key edges |
| `151-300` | Must filter, aggregate, or layered-load |
| `>300` | Do not show full graph by default |

Edge count:

| Edges | Behavior |
| ---: | --- |
| `E <= 50` | Full edges may show |
| `51-150` | Weaken ordinary edges; hide edge labels |
| `151-300` | Show key edges or selected neighborhoods |
| `>300` | Aggregate, filter, or local exploration |

Default filtering:

- Top N relationship weight.
- Direct/two-hop scope.
- Hide low-weight edges.
- Hide isolated nodes.
- Preserve anomaly nodes.

Aggregation:

- Merge same-type nodes.
- Merge same-group nodes.
- Low-weight nodes become `其他`.
- Aggregated node shows count and can expand or open detail.

### Tooltip

Node tooltip:

```text
node name
node type
relation count / degree
key metric
status / risk
latest relation time
period / source
```

Edge tooltip:

```text
relationship type
source node
target node
direction
count / weight / amount
start time or latest time
status
period / source
```

Group tooltip:

```text
group name
node count
edge count
core node
anomaly count
```

Tooltip geometry:

```text
minWidth = 180px
maxWidth = 320px
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
| Loading | Skeleton for title, filter, node/edge placeholders |
| Empty | `暂无关系数据` in graph viewport |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in graph viewport |
| Missing node | Do not draw affected node/edge; expose count/detail |
| Missing relationship | Show nodes with `暂无连接关系` |
| Too many nodes | Show aggregation/filter/local-explore state |
| Isolated nodes | Hide by default or place weakly at edge |
| Circular relation | Use curves or directional highlight |
| Self-link | Small loop when meaningful |
| Layout failure | Fallback circular/radial layout |
| Search no result | `未找到节点` |
| Aggregated nodes | Show count and expand/detail affordance |

## Sankey Placement Algorithm

Use this for source-target flow, allocation, transfer, conversion, loss, traffic, fund, order-status, customer-pipeline, inventory-flow, or energy-flow diagrams. A Sankey component is valid only when each flow row has a directed `source`, `target`, and non-negative `value`; if the task is simple ranking use bar/table, if it is single-level composition use donut/bar/table, and if it is a single ordered cohort use funnel/stage table.

### Required Inputs

```text
W = component outer width
H = component outer height
P = inner padding
CW = W - 2P
CH = H - 2P
nodes = [{ id, name, layer, type?, status?, value? }]
links = [{ source, target, value, unit, stage?, path?, share?, conversionRate?, lossRate? }]
L = visible layer count
N[l] = node count at layer l
```

Padding:

```text
if W < 320: P = 12
if 320 <= W < 480: P = 16
if 480 <= W < 720: P = 20
if W >= 720: P = 24
```

### Slot Budget

```text
titleAreaH = 36-56
subtitleH = 0-24
metricH = 0-48
legendH = 0-28
footerH = 0-24
sankeyAreaH = CH - titleAreaH - subtitleH - metricH - legendH - footerH - gaps
```

Acceptance:

```text
sankeyAreaH >= CH * 0.55
```

If this fails, collapse in order:

1. Footer notes.
2. Metric strip.
3. Subtitle.
4. Legend to `图例 ▾`.
5. Local filters to compact dropdown.
6. Link labels.
7. Long-tail nodes/links into `其他`.
8. Fullscreen, drilldown, or table fallback.

### Header And Local Filters

Component-local filters affect only this Sankey's already fetched/bounded dataset. Suitable filters are metric basis (`人数`/`金额`/`次数`), path scope (`全部`/`主流向`/`异常流向`), Top N (`Top5`/`Top10`/`Top20`), stage, and period comparison. Page-level time, organization, permission, and cross-widget controls stay outside the component.

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + horizontalPadding
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

If `filterW > filterMaxW` or `titleMaxW < 120px`, collapse the filter to a compact dropdown such as `金额 ▾`. Do not add a new persistent filter row unless the component height still preserves `sankeyAreaH >= CH * 0.55`.

### Sankey Area

```text
sankeyAreaX = P
sankeyAreaY = P + titleAreaH + subtitleH + metricH + legendH + gaps
sankeyAreaW = CW
sankeyAreaH = H - P - footerH - sankeyAreaY
sankeyPaddingX = clamp(12px, sankeyAreaW * 0.04, 32px)
sankeyPaddingY = clamp(12px, sankeyAreaH * 0.08, 32px)
plotX = sankeyAreaX + sankeyPaddingX
plotY = sankeyAreaY + sankeyPaddingY
plotW = sankeyAreaW - 2 * sankeyPaddingX
plotH = sankeyAreaH - 2 * sankeyPaddingY
```

For narrow components, reserve label columns:

```text
leftLabelW = 56-96px
rightLabelW = 56-96px
actualFlowX = plotX + leftLabelW
actualFlowW = plotW - leftLabelW - rightLabelW
```

If `actualFlowW < 180px`, use simplified mode: title, one compact local filter, Top5 flows, key nodes only, no metric strip, no legend row, no permanent link labels.

### Node Values And Layers

```text
nodeInValue = sum(inbound link value)
nodeOutValue = sum(outbound link value)
nodeValue = max(nodeInValue, nodeOutValue)
startNodeValue = nodeOutValue
endNodeValue = nodeInValue
```

Flow conservation is encouraged but not assumed. If flow is not conserved, expose `流失`, `未知去向`, `未知来源`, or `其他` nodes so flow does not visually disappear.

```text
nodeW = clamp(8px, plotW * 0.018, 20px)
layerGap = (plotW - nodeW) / max(L - 1, 1)
nodeX[l] = plotX + l * layerGap
```

If `L = 1`, center the only layer:

```text
nodeX[0] = plotX + plotW / 2 - nodeW / 2
```

Density:

```text
visible layers default = 3-4
visible layers max without drilldown = 5
nodes <= 12: full nodes allowed
13-30: label only Top nodes
31-60: aggregate long tail
> 60: filter, drilldown, pagination, or table fallback
links <= 20: full links allowed
21-50: hide ordinary link labels and weaken long tail
51-100: Top N + 其他 required
> 100: do not render as one full Sankey
```

### Node Height And Position

```text
nodeGap = clamp(6px, plotH * 0.025, 20px)
valueScale = min((plotH - nodeGap * (N[l] - 1)) / layerTotalValue[l] for every layer)
nodeH[i] = max(4-8px, nodeValue[i] * valueScale)
layerHeight = sum(nodeH in layer l) + nodeGap * (N[l] - 1)
layerStartY = plotY + (plotH - layerHeight) / 2
nodeY[l,n] = layerStartY + sum(previous nodeH) + n * nodeGap
```

Sort nodes by descending flow value. Keep main-path nodes near the visual centerline, place loss nodes lower, and place anomalies lower or to the side without interrupting the main flow.

### Link Width And Curves

```text
linkW = clamp(1-2px, value * valueScale, plotH * 0.28)
sourceX = sourceNodeX + nodeW
sourceY = sourceNodeY + sourceOffsetY + linkW / 2
targetX = targetNodeX
targetY = targetNodeY + targetOffsetY + linkW / 2
controlX1 = sourceX + (targetX - sourceX) * 0.45
controlY1 = sourceY
controlX2 = sourceX + (targetX - sourceX) * 0.55
controlY2 = targetY
```

Opacity:

```text
main flow = 70%-90%
ordinary flow = 35%-60%
long-tail flow = 15%-30%
hovered flow = 100%
unrelated flow on hover = 8%-20%
unrelated node on hover = 30%-50%
```

Color defaults to the source node/category. Target/status coloring is allowed only when the decision emphasizes final state. Loss and anomaly flows use restrained warning color or a weak dashed edge, not saturated red/purple on every ribbon.

### Labels

Node labels:

```text
if nodeH >= 28px: show name + value
if 16px <= nodeH < 28px: show name
if nodeH < 16px: hide label, tooltip only
per layer visible labels = Top 5-8
```

Source-layer labels sit left of nodes and align right. Middle/target labels sit right of nodes and align left.

Link labels are off by default except main flow, loss flow, or anomaly flow:

```text
linkLabelX = (sourceX + targetX) / 2
linkLabelY = Bezier(t=0.5).y - 4px
show link label only when linkW >= 8px and label does not overlap
```

### Metrics, Legend, Tooltip, And States

Metric strip shows at most `3` items such as total flow, conversion rate, loss rate, largest flow, node count, link count, `其他` share, or anomaly count.

Legend explains node type, flow status, color meaning, or width meaning. It does not mix with filters. Keep legend items `<= 5` by default and `<= 8` maximum; otherwise collapse to `图例 ▾` or explain in tooltip.

Tooltip is mandatory:

```text
node tooltip: node, layer, inbound, outbound, loss, conversion, total share, period, source
link tooltip: source, target, value + unit, source share, target share, total share, change, period, source, aggregation rule
```

States:

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title/filter/node/ribbon placeholders |
| Empty | `暂无流向数据` or `当前筛选下暂无流向数据` in Sankey area |
| Error | `数据获取失败` plus retry/action when available |
| No permission | Permission message in Sankey area |
| Missing source | Normalize to `未知来源` |
| Missing target | Normalize to `未知去向` |
| `value = 0` | Do not draw the link; expose count/state in tooltip/detail |
| `value < 0` | Invalid for Sankey; route to another chart |
| Too many nodes/links | Apply Top N + `其他`, filtering, drilldown, or table fallback |
| Non-conserved flow | Show loss/unknown/other nodes |
| Label overflow | Hide/summarize label; tooltip carries full text |

## Funnel Chart Placement Algorithm

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

## Composite Panel Placement Algorithm

Use this for multi-component analysis cards where one report component container combines several child components into one decision unit. A Composite Panel is not a whole dashboard and is not the same as a Combo Chart. It is a single block that lets the user read one small analysis loop:

```text
summary -> main trend/structure -> contribution/exception -> brief detail/action
```

Valid examples:

- KPI strip + line chart.
- KPI strip + target/actual bar chart + short exception table.
- Main trend chart + Top list.
- Target attainment gauge + target/actual bar chart + variance list.
- Main chart + auxiliary composition chart.

Reject a Composite Panel when:

- Only one metric or one chart is needed.
- Child components answer different business questions.
- Every child needs its own full title, filter, action, or drilldown path.
- The component would need more than four visible analytical child components in a normal report card.
- The user expects a freeform dashboard canvas or drag-and-drop layout.
- The child components are only placed together for visual richness.

### Required Contract

Implementation-ready Composite Panels declare `compositePanelContract` or an equivalent local structure:

```ts
type CompositeChildRole =
  | 'primary-metric'
  | 'main-visual'
  | 'auxiliary-visual'
  | 'top-list'
  | 'detail-preview'
  | 'insight'
  | 'legend'
  | 'state';

type CompositePanelContract = {
  topic: string;
  analysisSequence: Array<'summary' | 'trend' | 'structure' | 'contribution' | 'exception' | 'detail' | 'action'>;
  layoutPattern: 'metric-main' | 'main-side' | 'main-detail' | 'main-two-side' | 'two-by-two' | 'metric-main-side';
  primaryChildId: string;
  children: Array<{
    id: string;
    role: CompositeChildRole;
    visualType: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    minW: number;
    minH: number;
    title?: string;
    datasetId?: string;
    unit?: string;
    localFilterScope?: 'panel' | 'child-only';
  }>;
  sharedLocalFilters?: string[];
  childLocalFilterException?: string;
  sharedLegend?: boolean;
  sharedUnit?: string;
  linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
  detailRoute?: string;
  responsiveFallback: string[];
  stateRules: string[];
};
```

### Anatomy

| Element | Required | Placement |
| --- | ---: | --- |
| Panel title | Yes | Top-left; names the business analysis topic |
| Panel local filter | Optional | Top-right capsule/dropdown; affects the whole panel by default |
| Subtitle/unit/source | Optional | Under title, weak text |
| Metric strip | Recommended | Under header; max `3` metrics |
| Main child | Yes | Largest body region, primary reading anchor |
| Auxiliary child | Optional | Right side or bottom, weaker than main child |
| Detail preview | Optional | Bottom or side; `3-6` rows and `3-5` columns |
| Shared legend | Optional | Main visual top/right or content top/right |
| Tooltip | Yes | Child tooltip by default; composite insight on click or selected state |
| Definition/source/freshness | Optional | Subtitle, footer, or tooltip |
| Loading/empty/error/no-permission states | Yes | Parent or affected child scope |

The title should say `销售经营分析`, `渠道表现诊断`, or `风险监控概览`. Do not title the panel `销售额趋势 + 品类占比 + Top 商品`; that is a list of tools, not the shared question.

### Coordinate System

```text
W = container width
H = container height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
componentGap = clamp(8px, W * 0.015, 20px)
```

Width tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 320px` | `12px` |
| `320px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

### Header And Local Filter

Composite Panels use one panel-level local filter group by default:

- Suitable: period, metric, actual/target/attainment, all/exception/unreached, amount/count/share, day/week/month.
- Unsuitable: region + channel + category + store + user type + time + status. Put complex filters in the page/global filter surface.
- Child-level filters are discouraged. If required, allow at most one child-only filter; it must be visually weaker, placed beside that child label, scoped to that child only, and disclosed in the tooltip or child label.

Filter sizing:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPaddingX * 2
filterMaxW = min(CW * 0.45, 280px)
```

When `filterW > filterMaxW`, collapse to a single capsule dropdown such as `本月 v`. Do not create a new filter row before trying this collapse.

Filter and title placement:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Legends must not mix with filters. The title area owns filters; the main visual or content top owns shared legends.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-56px
toolbarH = 0-32px
footerH = 0-24px

contentY = P + titleAreaH + metricH + toolbarH + topGaps
contentX = P
contentW = CW
contentH = H - P - footerH - contentY
```

Default:

```text
titleAreaH = 44px
metricH = 0-48px
toolbarH = 0-24px
footerH = 0 or 20px
contentH >= CH * 0.60
```

If `contentH < CH * 0.60`, degrade in this order:

1. Hide footer/long notes.
2. Reduce metric strip to one or two metrics.
3. Collapse panel filter to dropdown.
4. Hide secondary legends and persistent labels.
5. Hide or collapse detail preview.
6. Hide auxiliary child.
7. Keep only P1 metric/main visual.

### Child Priority And Count

Recommended child count:

| Visible analytical children | Rule |
| ---: | --- |
| `1` | Not a Composite Panel; use a normal component |
| `2` | Clearest default |
| `3` | Recommended upper default |
| `4` | Large-container maximum |
| `5+` | Split into separate blocks, tabs, drawer, or dashboard sections |

Priority:

```text
P1 = primary metric or main visual
P2 = key auxiliary visual
P3 = Top list or detail preview
P4 = definition, footer, update time, optional notes
```

Responsive shrink order is `P4 -> P3 -> P2 -> P1`.

### Child Minimum Sizes

| Child type | Min width | Min height |
| --- | ---: | ---: |
| Metric card | `120px` | `72px` |
| Line chart | `220px` | `140px` |
| Bar chart | `240px` | `160px` |
| Pie/donut | `180px` | `160px` |
| Top list | `140px` | `120px` |
| Detail preview | `240px` | `120px` |
| Heatmap | `240px` | `160px` |
| Map | `280px` | `220px` |
| Gauge | `180px` | `160px` |

If a child falls below its minimum, convert it to a metric summary, hide labels/legend, collapse it, or move it to a detail route. Do not render an unreadable miniature chart.

### Layout Pattern A: Metric Strip + Main Visual

Use for simple operating trends.

```text
metricH = clamp(36px, CH * 0.15, 56px)
mainX = contentX
mainY = contentY + metricH + componentGap
mainW = contentW
mainH = contentH - metricH - componentGap
```

Fit range: `W = 360-720px`, `H = 280-420px`.

### Layout Pattern B: Main Visual + Right Auxiliary

Use for trend plus Top list, small composition chart, or summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap

mainX = contentX
mainY = contentY
mainH = contentH

sideX = contentX + mainW + componentGap
sideY = contentY
sideH = contentH
```

Fit range: `W >= 640px`, `H >= 320px`. Main child should occupy `65-75%` of content width.

### Layout Pattern C: Main Visual + Bottom Detail

Use for trend plus exception list or brief evidence table.

```text
detailH = clamp(80px, contentH * 0.28, 140px)
mainH = contentH - detailH - componentGap

mainX = contentX
mainY = contentY
mainW = contentW

detailX = contentX
detailY = contentY + mainH + componentGap
detailW = contentW
```

Require:

```text
mainH >= contentH * 0.55
detail rows = 3-6
detail columns = 3-5
```

### Layout Pattern D: Main Visual + Two Side Cards

Use for main trend plus one composition and one Top/summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap
sideItemH = (contentH - componentGap) / 2
```

The two side items must be P2/P3 and visually weaker than the main child.

### Layout Pattern E: Two By Two Matrix

Use only in a large container when four child views are truly necessary.

```text
cellW = (contentW - componentGap) / 2
cellH = (contentH - componentGap) / 2
```

Requirements:

```text
W >= 720px
H >= 420px
one child remains visually primary
```

If the container is smaller, use a main/side or main/detail layout. Do not make four equal-weight mini charts.

### Layout Pattern F: Metric Strip + Main Visual + Right Insight

Use for large operating cockpit modules.

```text
metricRowH = clamp(48px, contentH * 0.18, 72px)
bottomH = contentH - metricRowH - componentGap

sideW = clamp(180px, contentW * 0.26, 280px)
mainW = contentW - sideW - componentGap
```

The metric strip summarizes the whole panel, not each child. Show at most `3` metrics in normal report cards.

### Metrics, Units, And Legends

Metric strip:

- Use total, change rate, target attainment, exception count, Top contribution, or average.
- Default maximum is `3` metrics.
- Small cards keep only `1-2` metrics.

Unit rules:

- Same unit across the panel: place it in the subtitle.
- Different child units: put primary unit in subtitle and child units near child label or axis.
- Do not repeat the unit beside every value.

Legend rules:

- If multiple child charts share series such as actual/target/YoY, use one shared legend.
- Place shared legend at the main visual top-right or content top-right.
- Never merge legend items into the local filter capsule.

Color rules:

- The same metric keeps the same color meaning across all children.
- Target/reference uses one consistent line/tick style.
- Exception/status colors follow the report semantic palette.
- Do not recolor the same metric differently in the main chart, auxiliary chart, and table.

### Text Rules

| Text | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Panel title | `14-16px` | `600` | `20-24px` |
| Subtitle | `12px` | `400` | `16-18px` |
| Filter text | `12px` | `400-500` | `16px` |
| Metric label | `11-12px` | `400` | `16px` |
| Metric value | `18-24px` | `600-700` | `22-28px` |
| Child label | `12-13px` | `500-600` | `16-18px` |
| Axis label | `11-12px` | `400` | `14-16px` |
| Legend | `12px` | `400` | `16-18px` |
| Table text | `12-13px` | `400` | `18-20px` |
| Tooltip | `12px` | `400` | `18px` |

### Linked Interaction

Hover on the main child may:

- Highlight the same category/time/object in auxiliary children.
- Update metric strip preview values.
- Highlight matching detail rows.
- Show a child tooltip.

Click selection may:

- Pin the selected category/time/object.
- Filter or highlight auxiliary child content.
- Show a composite insight panel or update detail preview.

Click selection must have a clear exit:

- Click the selected item again.
- Click blank space.
- Use a visible reset/clear selection control when the selected state persists.

Default tooltip behavior:

- Hover shows child tooltip only.
- Click or selected state may show composite insight.
- Avoid long hover tooltips that list every child value.

### Responsive Rules

| Size | Rule |
| --- | --- |
| `W < 360px` or `H < 280px` | Keep title, single dropdown filter, core metric, and one main visual. Hide subtitle, auxiliary child, detail preview, shared legend, and footer. |
| `360px <= W < 720px`, `H >= 320px` | Use vertical layout. Keep title/filter, metric strip, main child, and one auxiliary child. Hide complex detail and secondary notes. |
| `W >= 720px`, `H >= 420px` | Full structure can show `3-4` child components, main/side layouts, shared legend, and detail preview. |
| `W >= 960px`, `H >= 540px` | Metric strip + main visual + right auxiliary + bottom detail can be used, but child count still needs a clear primary visual and should not exceed `5` even in exceptional large modules. |

### State Rules

| State | Behavior |
| --- | --- |
| Loading | Skeleton preserves title/filter, metric strip, main child, auxiliary child, and detail preview geometry |
| Empty all children | Show one parent-level empty state over the panel body |
| Partial child empty | Show a child-local empty state covering that child label/control plus body |
| Error all children | Parent-level error with retry when supported |
| Partial child error | Child-level error with local retry or link to detail |
| Filter empty | `当前筛选无结果`, with reset path when supported |
| Too many children | Auto-collapse P4/P3/P2 or split into separate blocks |
| Container too small | Keep P1 metric/main visual only |
| Unit mismatch | Child-level unit near label/axis plus exact unit in tooltip |
| Linked selection no match | Affected child shows `无匹配数据` without clearing the selected context silently |
| No permission | Only unauthorized child shows permission state unless the whole panel is unauthorized |

### Default Specification

```text
recommendedW = 640-960px
recommendedH = 360-560px
minW = 320px
minH = 260px
defaultChildCount = 2-3
maxRecommendedChildCount = 4
P = 16-20px
titleAreaH = 44px
filterH = 28px
metricH = 40-56px
componentGap = 12-16px
contentH >= CH * 0.60
mainVisualWeight = 50-70%
auxiliaryWeight = 20-35%
detailH = 80-140px
metricCount <= 3
mainVisualCount = 1
auxiliaryVisualCount <= 2
detailRows <= 6
```

### Acceptance Checks

- The panel has one business topic and one analysis sequence; it is not a bag of unrelated widgets.
- One child is visibly primary and owns the largest area or strongest value hierarchy.
- Child count defaults to `2-3`, stays `<=4` for normal cards, and has a split/tab/fullscreen reason when larger.
- Panel-level local filters affect the whole panel by default. Any child-only filter is labeled, weak, and scoped.
- `contentH >= CH * 0.60`, or fallback removes footer, metrics, filters, detail, and auxiliary children before shrinking P1.
- Every child satisfies its minimum viewport or is collapsed/replaced by summary/detail route.
- Shared legends and shared units are not duplicated inside every child.
- Detail preview uses `3-6` rows and `3-5` columns, with a `查看全部` or drilldown route when more detail is needed.
- Hover/click linkage preserves active filter, selected category/object, tooltip, detail, and export context.
- Loading, empty, error, no-permission, partial-data, and filter-empty states use correct parent vs child scope.

## Grouped Table Header Placement Algorithm

Use this for complex table headers, multi-level headers, grouped table headers, metric matrices, financial grids, wide comparison tables, and the header bands inside Detail Tables or Pivot Tables. A grouped header organizes column relationships; it must not become a heavy field-configuration surface.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown; affects the whole current table only |
| Subtitle/unit/freshness | Optional | Under title; global unit, period,口径, source, or update time |
| Metric strip | Optional | At most `3`: total, attainment, exception count, max item, row count, column count |
| Header group rows | Yes | Parent groups such as sales data, target data, change data |
| Leaf header row | Yes | Real data fields; owns sort/filter/definition icons |
| Row-dimension header | Optional | Left top corner; spans header depth when row dimension/primary column is fixed |
| Header unit/subtext | Optional | Short unit or口径 under leaf title |
| Sort/filter icons | Optional | Leaf headers only by default |
| Data body | Yes | The body keeps priority over header height |
| Tooltip | Recommended | Header definition, group explanation, exact cell path/value |
| State mask | Yes | Loading, empty, filter-empty, error, no-permission |

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Width-tier padding:

| Width | P |
| --- | ---: |
| `<320px` | `12px` |
| `320-480px` | `16px` |
| `480-720px` | `20px` |
| `>=720px` | `24px` |

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px

tableAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless search/column tools are required
paginationH = 32-40px when paginated
footerH = 0px or 20px
```

Grouped headers consume vertical space, so protect body rows first. If body rows fail, reduce optional elements in this order: footer, secondary metric items, subtitle, toolbar text, secondary local filters, low-priority columns, header subtext, then header depth.

### Header Depth And Height

```text
headerLevel = L
headerRowH = 32-40px, default 36px
headerH = L * headerRowH

if a header row contains unit/subtext:
  headerRowH += 4-8px
```

Recommended totals:

| Header depth | Total header height |
| ---: | ---: |
| `1` | `36-44px` |
| `2` | `64-80px` |
| `3` | `96-116px` |
| `4` | Not recommended; collapse or restructure |
| `>4` | Do not show in report display mode |

Table geometry:

```text
tableX = P
tableY = P + titleAreaH + metricH + toolbarH + topGaps
tableW = CW
tableH = H - P - paginationH - footerH - tableY

bodyH = tableH - headerH - summaryRowH
visibleRowCount = floor(bodyH / rowH)
```

Acceptance:

- `visibleRowCount >= 4` for grouped analytical tables by default.
- `visibleRowCount < 3` fails unless the table is a named tiny preview with a detail/fullscreen route.
- If depth `3` plus pagination leaves too little body, use compact rows, collapse groups, remove subtext, or enlarge/split the block.

### Column Tree Contract

Represent grouped headers as a column tree:

```ts
type ColumnNode = {
  id: string;
  title: string;
  field?: string; // required for leaf columns
  children?: ColumnNode[];
  unit?: string;
  definition?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  priority?: number;
  fixed?: 'left' | 'right';
};
```

Rules:

- Parent nodes describe groups only; leaf nodes own data fields, formatting, sort, filter, and tooltip payload.
- Group labels must be business groups, not arbitrary visual buckets.
- Do not create a grouped header for `4-5` unrelated simple fields.
- If fields naturally group or visible leaf columns exceed `8`, grouped headers are the default; a flat header needs an explicit exception.

### Span Calculation

Given `maxDepth`:

```text
if node has visible children:
  colSpan = sum(leaf descendants)
  rowSpan = 1
else:
  colSpan = 1
  rowSpan = maxDepth - currentDepth + 1
```

Width:

```text
leafColumnW = clamp(minW, contentTextW + paddingX * 2, maxW)
groupHeaderW = sum(visible child leafColumnW)
groupHeaderX = first visible child leaf X
groupTitleCenterX = groupHeaderX + groupHeaderW / 2
```

Do not fake `colSpan`/`rowSpan` with absolutely positioned labels over a flat table. Use Element Plus/project table grouped columns or S2/project analytical header behavior so scroll, fixed columns, hover, tooltip, keyboard focus, and state geometry stay aligned.

### Column Widths And Alignment

| Column type | Width | Alignment |
| --- | ---: | --- |
| Row number | `44-56px` | center |
| Checkbox | `40-48px` | center |
| Row dimension / primary object | `140-260px` | left |
| Normal text | `100-160px` | left |
| Numeric | `96-140px` | right |
| Percent/rate | `80-120px` | right |
| Time | `120-180px` | left or right |
| Status | `80-120px` | center or left |
| Actions | `80-120px` | right |

```text
totalTableW = sum(visible leafColumnW)
```

If `totalTableW <= tableW`, distribute extra width only to declared flexible text/primary columns. Do not stretch numeric, percent, status, or action columns excessively.

If `totalTableW > tableW`, enable horizontal scroll. Freeze left row-dimension/primary columns, and freeze right action columns only when the action workflow is real.

### Header Text And Icons

Typography:

- Table title `14-16px`, weight `600`, line-height `20-24px`.
- Subtitle `12px`, weight `400`, line-height `16-18px`.
- Parent group header `12-13px`, weight `600`, line-height `16-18px`.
- Leaf header `12px`, weight `500/600`, line-height `16-18px`.
- Tertiary header or subtext `11-12px`, weight `500` for tertiary title and `400` for subtext.
- Body cell `12-13px`, line-height `18-20px`.

Spacing:

```text
headerCellPaddingX = 8-12px
headerCellPaddingY = 6-8px
headerTextIconGap = 4px
headerIconGap = 2-4px
subtextGap = 2-4px
```

Definition icon:

- `iconSize = 12-14px`.
- Core metric definitions may be always visible.
- Secondary metric definitions appear on hover/focus.
- Missing definitions hide the icon rather than showing an empty tooltip.

Sort/filter:

- Sort appears only on sortable leaf headers such as numeric, percent, time, ranking, or totals.
- Header filter appears only on filterable leaf headers such as status, category, region, or owner.
- Parent group headers do not sort by default.
- If both sort and filter exist and width fails, collapse to a more/menu icon.

### Component-Local Filter Vs Header Filter

Component-local filters affect the whole current table, for example metric, period, display mode, or exception state.

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding * 2
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - min(filterW, filterMaxW)
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - min(filterW, filterMaxW) - 12px
```

If `filterW > filterMaxW`, collapse to a single dropdown capsule such as `销售额 ▾`. Do not add a new filter row before protecting body height; grouped headers already consume height.

Header filters affect one leaf column and use small icons beside the leaf label. Do not render every header as a capsule button.

### Fixed Header And Fixed Columns

- When the body scrolls vertically, the whole grouped header band is fixed: parent rows, leaf rows, units, and the top-left row-dimension header.
- When data scrolls horizontally, the left row-dimension/primary columns are fixed and the top-left header area is fixed with them.
- The top grouped header, left fixed area, and body scroll positions must remain synchronized.
- A right fixed action column is optional and should be avoided in dense grouped-header tables unless row actions are required.

### Visual Treatment

- Parent group header background is slightly stronger than leaf header background.
- Leaf header background is close to body surface.
- Use weak `1px` horizontal dividers and optional weak vertical dividers for merged cells.
- Avoid strong color blocks, thick borders, heavy shadows, or header colors that overpower the data body.
- Totals/subtotals may use light background and slightly stronger weight, but should not dominate all data.

### Hover, Collapse, Tooltip, And States

Hover:

- Leaf header hover lightly highlights the leaf column and parent group.
- Group header hover lightly highlights all visible child columns and may weaken unrelated groups.
- Hover/focus may reveal definition, sort, or filter icons without changing cell size.

Collapse:

- Use group collapse when leaf columns exceed `12` or metric groups exceed `4`.
- Collapsed group keeps the group title and optional key summary column.
- Groups `2-4` are clearest; `5-6` needs collapse or large span; `>6` should split or tab.

Tooltip:

```text
tooltipMinW = 180px
tooltipMaxW = 340px
tooltipPadding = 8-12px
tooltipFont = 12px
tooltipLineH = 18px
```

- Header tooltip exposes field, unit, definition, formula, aggregation, period/freshness, and source when available.
- Group tooltip explains included child metrics and shared period/口径.
- Cell tooltip exposes full row path, column path, measure, exact value, unit, formula, comparison values, period, source, and permission/quality note when relevant.

States:

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title/filter/metric strip, grouped header, and body rows |
| Empty | Keep header when useful; `暂无数据` centered in body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action |
| No permission | Permission message in body; no leaked cells |
| Missing leaf field | Hide the column or show field key only as a documented fallback |
| Long header | One-line ellipsis plus tooltip |
| Too many columns | Horizontal scroll, group collapse, column settings, split, pivot, or fullscreen |
| Missing cell | `--`; real zero remains `0` |

### Responsive Rules

| Condition | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | Title, single dropdown filter, core `3-4` columns, max `2` header levels, compact rows; hide subtitle, metric strip, header subtext, low-priority columns, and footer |
| `360 <= W < 720` and `H >= 300px` | Title/filter, optional metrics, `2-3` header levels, fixed left row dimension, horizontal scroll, definition icons on demand |
| `W >= 720` and `H >= 420px` | Full structure, `2-3` header levels, up to `3` metric-strip items, fixed header/left column, group collapse when dense |

Density thresholds:

| Scale | Behavior |
| --- | --- |
| Leaf columns `<=8` | Full display |
| Leaf columns `9-16` | Horizontal scroll if widths fail |
| Leaf columns `17-30` | Freeze key column and support scroll/column settings |
| Leaf columns `31-50` | Collapse groups or use column settings |
| Leaf columns `>50` | Redesign, pivot, paginate columns, or use configuration view |
| Header depth `4` | Collapse, split, fullscreen, or redesign |
| Header depth `>4` | Not accepted in report display mode |

## Pivot Table Placement Algorithm

Use this for S2-class multidimensional aggregated tables: pivot tables, cross tables, target/actual matrices, period-by-dimension summaries, and wide metric matrices. A Pivot Table expresses row dimensions * column dimensions * measures; it is not a raw record list.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown for metric, period, display mode, or exception state |
| Subtitle/unit/freshness | Optional | Under title; states period, unit, aggregation grain, source, or口径 |
| Metric strip | Optional | At most `3`: total, max item, exception count, average, row count, column count |
| Field/settings action | Optional | Icon or lightweight link; do not expose full drag field wells in report display mode |
| Row dimension header | Yes | Left top corner, frozen when horizontal scroll exists |
| Column dimension header | Yes | Top header band, fixed when vertical scroll exists |
| Measure header | Required when multi-measure | Below column dimension header or merged into column header |
| Data cells | Yes | Main cross-summary area, right-aligned numeric values |
| Subtotal row/column | Recommended | Light emphasis at group end by default |
| Grand-total row/column | Recommended | Stronger but restrained emphasis at bottom/right |
| Expand/collapse | Optional | Inside row dimension column for hierarchy |
| Tooltip/drilldown | Recommended | Exact path, formula, share, period, and source evidence |
| State mask | Yes | Loading, empty, filter-empty, error, no-permission, aggregation error |

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Recommended size:

- Default `W = 640-1200px`, `H = 360-640px`.
- Minimum `W = 320px`, `H = 240px` only for compact preview.
- Large analytical workspace `W >= 720px` and `H >= 420px` can carry multi-level rows/columns and `3-5` visible measures.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px
pivotAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
require pivotAreaH >= CH * 0.55
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless field/settings/search is required
paginationH = 32-40px when paginated or virtualized
footerH = 0px or 20px
```

If `pivotAreaH < CH * 0.55`, remove optional content in this order: footer, secondary metric items, subtitle, toolbar text, secondary local filters, low-priority measures. Then use compact row height or enlarge/split the block.

### Pivot Area Geometry

```text
pivotX = P
pivotY = P + titleAreaH + metricH + toolbarH + topGaps
pivotW = CW
pivotH = H - P - paginationH - footerH - pivotY

headerRowH = 32-40px, default 36px
measureHeaderH = 32-36px
columnHeaderH = columnDimensionDepth * headerRowH + visibleMeasureHeaderH

rowHeaderW = clamp(120px, maxRowLabelTextW + levelIndent * maxRowDepth + 32px, 260px)

dataX = pivotX + rowHeaderW
dataY = pivotY + columnHeaderH
dataW = pivotW - rowHeaderW
dataH = pivotH - columnHeaderH
```

Rules:

- Column dimension parent headers merge across child columns and center-align.
- Measure headers center-align below the column dimension level when multiple measures exist.
- Row dimension headers and labels remain left-aligned.
- Data cells, subtotal cells, and grand-total cells right-align.

### Local Filter Placement

Allowed local filters:

- Metric口径: `销售额 / 订单数 / 完成率`.
- Period shortcut: `本月 / 本季 / 本年` when it affects only the current pivot.
- Display mode: `实际 / 目标 / 差额`, `金额 / 数量 / 占比`.
- Exception state: `全部 / 异常 / 未达标`.
- Row dimension switch such as `区域 / 渠道 / 品类` only when it is explicitly component-local and does not change the page schema.

Fit:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding * 2
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  collapse to one capsule dropdown, for example 销售额 ▾
```

Do not add a new filter row before protecting `pivotAreaH`; Pivot Tables need body space for row and column context.

### Row Hierarchy

```text
levelIndent = 16-20px
iconSize = 14-16px
rowTextX = pivotX + cellPaddingX + level * levelIndent
expandIconX = rowTextX
labelX = expandIconX + iconSize + 4px
```

States:

- Collapsed: `▸`.
- Expanded: `▾`.
- Leaf: no icon.
- Lazy loading: small row-local loading indicator.

Default row dimension depth is `1-2`. More levels require expand/collapse, drilldown, or a larger analysis page.

### Row Height And Visible Rows

| Mode | Row height | Use |
| --- | ---: | --- |
| Compact | `32-36px` | Dense data |
| Standard | `40px` | Default |
| Relaxed | `44-48px` | Multi-measure or easier reading |

```text
rowH = 40px default
visibleRowCount = floor(dataH / rowH)
```

If `visibleRowCount < 4`, reduce optional bands, use compact rows, enable scroll, enlarge the block, or convert to preview/fullscreen. Do not accept a pivot that only shows one or two rows while pretending to support cross analysis.

### Column Width And Visible Columns

```text
measureColumnW = clamp(88px, textWidth + 32px, 140px)
amountColumnW = 100-140px
percentColumnW = 80-120px
totalColumnW = 100-150px
visibleDataColumnCount = floor(dataW / measureColumnW)
```

Density tiers:

| Scale | Behavior |
| --- | --- |
| Rows `<=50`, columns `<=12` | Direct display |
| Rows `51-200`, columns `<=24` | Fixed header + scroll |
| Rows `>200` | Row virtualization |
| Columns `>24` | Horizontal scroll + frozen row dimension column |
| Columns `>50` | Reduce column dimension, paginate columns, or redesign |
| Measures `>5` | Metric switch, column settings, split, or dedicated analysis page |

When `totalDataColumnW > dataW`, horizontal scroll is required and row dimension columns stay frozen. Grand-total column may freeze right only in large blocks; in small blocks it consumes too much width.

### Subtotal, Grand Total, And Aggregation

- Subtotal rows default to group end; group-start subtotal is allowed only when it matches the business reading habit.
- Grand-total row sits at bottom. It may freeze bottom in large blocks; it should not freeze in tiny blocks if it steals body height.
- Grand-total column sits at right. It may freeze right in large blocks when it does not collapse the data body.
- Supported aggregation: `sum`, `avg`, `count`, `max`, `min`, optional `median`, and declared custom formulas.
- Rate metrics recompute from source components, for example:

```text
completionRate = sum(actual) / sum(target)
conversionRate = sum(convertedUsers) / sum(visitedUsers)
avgOrderValue = sum(amount) / sum(orderCount)
```

Never subtotal percentages by simple sum. Do not average percentages unless the business口径 explicitly says unweighted average.

### Conditional Formatting

Use conditional formatting only when it helps users locate high, low, abnormal, not-target, or changing cells.

Allowed default encodings:

- Light heat background for one core measure.
- In-cell data bar for same-column comparison.
- Status tag for attainment/exception.
- Positive/negative color for YoY/MoM.

Limits:

- Default `1-2` formatted measures.
- Do not color the whole table with unrelated palettes.
- Color is secondary; right-aligned exact values remain primary.

### Tooltip And Drilldown

Cell tooltip should expose:

```text
row path, column path, measure, exact value + unit,
row share, column share, subtotal/grand-total context,
YoY/MoM when present, aggregation function,
formula or numerator/denominator for rates,
period, source, permission or data-quality note
```

Cell click may select, link sibling components, open Detail Table drilldown, or open a formula/detail drawer. Row dimension click may expand/collapse, select a row, or drill down. Header click may sort or show definition, but report display mode should not expose heavy Excel-like field operations.

### Responsive And State Rules

| Condition | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | Title, single dropdown metric filter, row dimension, core `2-3` columns, compact row height, frozen row dimension; hide subtitle, metric strip, footer, low-priority measures |
| `360 <= W < 720` and `H >= 300px` | Title/filter, optional metrics, row dimension, core measures, totals, horizontal scroll, fixed row dimension |
| `W >= 720` and `H >= 420px` | Full structure, multi-level rows/columns, `3-5` measures, fixed headers, frozen row dimension, optional total freeze, expand/collapse, conditional formatting |
| Loading | Preserve header and show row/column grid skeleton |
| Empty | `暂无数据` centered in pivot body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action when supported |
| No permission | Permission message in pivot body; no leaked cells |
| Missing cell | `--`; tooltip/source note when needed |
| Real zero | `0` with normal numeric formatting |
| Missing row dimension | `未分类` |
| Missing column dimension | `未分组` |
| Aggregation error | Tooltip/detail explains口径异常; do not silently calculate |

## Detail Table Placement Algorithm

Use this for row-level record tables such as order lists, customer lists, product/store details, transaction records, tickets, budget rows, metric details, anomaly evidence, and audit records. A Detail Table is for lookup, comparison, status location, row detail, and light action; it is not a place to expose every source-table field at once.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown, affects only this table's already loaded bounded data |
| Subtitle/unit/freshness | Optional | Under title; states period, scope, source, update time, or default sort |
| Metric strip | Optional | At most `3` values: total count, selected count, sum, anomaly count, average, completion |
| Search/tool area | Optional | Compact top-right or icon; never competes with filter/header |
| Table header | Yes | Top of table; fixed when body scrolls |
| Table body | Yes | Row viewport with stable row height |
| Primary key column | Recommended | Left side, frozen when horizontal scroll is needed |
| Status column | Optional | Lightweight badge or icon+text |
| Operation column | Optional | Right side, fixed only when row action is required |
| Summary row | Optional | Bottom of table body or above pagination |
| Pagination/load-more | Optional | Bottom-right; total/summary bottom-left |
| Tooltip/detail drawer | Recommended | Full long text, formula/threshold, row evidence |
| State mask | Yes | Loading, empty, error, filter-empty, no-permission |

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

- Default `W = 560-960px`, `H = 360-560px`.
- Minimum `W = 280px`, `H = 220px` only for compact preview.
- Small `W < 360px` or `H < 260px` keeps title, collapsed filter, core `3-4` columns, compact rows, body, and simple previous/next pagination.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px
tableBodyAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
require tableBodyAreaH >= CH * 0.55
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless search/tooling is truly needed
paginationH = 32-40px when paginated
footerH = 0px or 20px
```

If `tableBodyAreaH` fails:

1. Hide footer/source row or move it to tooltip/detail.
2. Reduce metric strip to the primary value or remove it.
3. Collapse local filter to one dropdown capsule.
4. Collapse search to an icon.
5. Simplify pagination to previous/next or hide it for a small bounded preview.
6. Switch to compact row height.
7. Hide low-priority columns or move them to row drawer/column settings.
8. Enlarge/split the table before accepting fewer than `3` visible rows.

### Header, Filter, And Search

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

- Suitable: `全部 / 异常 / 正常`, `待处理 / 已完成`, `今日 / 本周 / 本月`, `订单 / 退款 / 售后`, `Top / 全部 / 低表现`.
- Unsuitable: large region/channel/category/person/status/time/amount-range combinations that change query scope, export scope, pagination, permission, or table schema.
- If `filterW > filterMaxW`, collapse to a dropdown such as `异常 ▾`.
- Keep filter, search, column settings, export, and operation tools separated. Do not put capsule filter, search box, export, column settings, and more menu all in the title-right zone.

Search:

```text
searchH = 28-32px
searchW = 160-240px
```

- Standard/large tables may place compact search above/right of the table.
- Small tables collapse search to an icon.
- If title-right space is limited, preserve the local status filter and collapse search/tools first.

### Metric Strip

Metric strip is optional and capped at `3` items.

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
metricGap = clamp(12px, CW * 0.04, 24px)
metricItemW = (CW - metricGap * (metricCount - 1)) / metricCount
```

Recommended items:

- Total count such as `总订单 12,846`.
- Sum such as `金额 1234万`.
- Exception count such as `异常 26`.
- Selection state such as `已选 12` when selection exists.

### Table Area

```text
tableX = P
tableY = P + titleAreaH + metricH + toolbarH + topGaps
tableW = CW
tableH = H - P - paginationH - footerH - tableY
headerH = 36-44px
summaryRowH = hasSummary ? 36-44px : 0
bodyH = tableH - headerH - summaryRowH
```

Row density:

```text
compactRowH = 32-36px
standardRowH = 40-44px
relaxedRowH = 48-56px
rowH = 40px by default
visibleRowCount = floor(bodyH / rowH)
```

Acceptance:

- Detail Tables should show at least `4-6` rows by default.
- `visibleRowCount < 3` fails except for intentionally tiny previews with a visible detail route.
- Row height is stable. Two-line primary/secondary content requires `rowH >= 48px`.
- Loading skeleton rows, empty messages, and error states preserve the same table/header geometry.

### Column Width And Alignment

Default column widths:

| Column type | Width | Alignment |
| --- | ---: | --- |
| Row number | `44-56px` | center |
| Checkbox | `40-48px` | center |
| Primary key / object | `140-220px` | left |
| Normal text | `100-160px` | left |
| Short text | `72-100px` | left or center |
| Numeric | `96-140px` | right |
| Percent | `80-120px` | right |
| Status | `80-120px` | center or left |
| Time | `140-180px` | left or right |
| Actions | `80-120px` | right |

```text
totalColumnW = sum(columnW)
minColumnW = 72px
minPrimaryColumnW = 120px
minActionColumnW = 72px
```

If `totalColumnW <= tableW`:

```text
extraW = tableW - totalColumnW
flexColumnW = baseW + extraW * flexWeight / totalFlexWeight
```

- Assign flex only to primary/text columns.
- Do not over-stretch numeric, status, time, or operation columns.

If `totalColumnW > tableW`:

- Enable horizontal scroll.
- Freeze the primary key/object column.
- Freeze the right operation column only when actions are required.
- Hide low-priority columns or expose column settings when column count exceeds budget.

Column count:

| Visible columns | Behavior |
| ---: | --- |
| `<=6` | Full display |
| `7-10` | Full display if widths pass |
| `11-16` | Horizontal scroll + frozen primary column |
| `>16` | Hide low-priority columns + column settings |
| `>24` | Group, split, drawer/detail page, or redesign |

### Header, Cells, And Status

Header:

- `headerH = 36-44px`, default `40px`.
- Header text `12px`, weight `500/600`, line height `16-18px`, weak background, and bottom divider.
- Header alignment follows the cell alignment.
- Sorting icons are `12-14px`, `4px` from header text, and appear only on sortable columns.
- Default sort is required: latest time desc, amount desc, exception first, low completion first, or another named business order.

Cells:

- `cellPaddingX = 12-16px`; compact `8-12px`; relaxed `16-20px`.
- Text cells are left-aligned, single-line, ellipsized, and reveal full content in tooltip.
- Numeric, amount, count, percent, completion, YoY/MoM, and variance cells are right-aligned with tabular numerals and consistent precision.
- Ordinary amount/count values remain neutral; use color only for change direction, abnormal status, failed target, risk, or warning.
- Missing fields show `--`; real zero stays `0`.

Status:

```text
statusTagH = 20-24px
statusTagPaddingX = 8-10px
statusFont = 11-12px
statusRadius = 999px or 4-6px
```

- Normal/success, processing/info, warning/error, and disabled statuses use weak backgrounds plus text/icon.
- Exception rows may use a fine left line or light background. Do not make whole rows strong red.

Operations:

- Keep only the key operation such as `查看`, `详情`, or `处理`.
- More than `2` actions become `1` primary action + `更多`.
- Operation column width stays stable and actions do not wrap.

### Pagination, Summary, And Selection

Pagination:

```text
paginationH = 32-40px
paginationX = tableX + tableW - paginationW
paginationY = tableY + tableH + 8px
```

- `<=50` rows may use table-body scroll without pagination.
- `51-500` rows normally paginate.
- `500+` rows use pagination or virtual scroll.
- Realtime streams use load-more or virtual scroll.
- Compact containers show previous/next instead of full page numbers.

Summary:

- Summary row height is `36-44px`.
- Numeric summaries right-align; text columns show `合计`; non-summary cells stay empty.
- Complex statistics move to the metric strip or detail drawer.

Selection:

- Checkbox column appears only for batch action, batch export, assignment, or linked analysis.
- Selected state shows selected count and optional batch actions without taking over the header.

### Tooltip And Row Detail

Tooltip:

```text
tooltipMinW = 160px
tooltipMaxW = 320px
tooltipPadding = 8-12px
tooltipFont = 12px
tooltipLineH = 18px
```

- Use for long primary keys, names, addresses, remarks, exception reasons, formulas, thresholds, and status rules.
- Tooltip flips away from card boundaries and must not be clipped by table/body overflow.

Row detail:

- Row click may open drawer/detail, select row, or link sibling components only when the event contract exists.
- If the whole row is clickable, cursor/focus state is clear and action-column clicks do not double-trigger row click.
- Expand row is optional for extra row evidence such as child tasks or approval history, not a workaround for unlimited visible columns.

### Responsive And States

| State / size | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | title, single dropdown filter, core `3-4` columns, compact rows `32-36px`, simple previous/next; hide subtitle, metrics, toolbar, low-priority columns, footer |
| Standard `360 <= W < 720`, `H >= 300px` | title/filter, optional metrics, core `5-7` columns, fixed header, optional frozen primary column, pagination |
| Large `W >= 720`, `H >= 420px` | full structure, `8-12` columns, up to `3` metrics, search, frozen primary/action columns, pagination or virtual scroll |
| Loading | Preserve table header and show several row skeletons |
| Empty | `暂无数据` centered in table body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action when supported |
| No permission | Hide or disable forbidden operations; body state explains permission |
| Field missing | Cell shows `--` and tooltip/source note when needed |
| Text too long | Single-line ellipsis plus tooltip |
| Columns too many | Horizontal scroll, low-priority hidden columns, column settings, or detail drawer |

## Acceptance Checks

- A placement chapter exists for the component.
- Every visible element has a slot rectangle, alignment, and responsive fallback.
- The main visual anchor is named and actually centered in the intended zone.
- Component-internal local filters are scoped to the current component, use capsule for `2-4` short options, collapse to dropdown when options/space exceed budget, and never overlay the value, plot, legend, axis, table header, or state message.
- Analysis & Insight components declare `analysisInsightContract` or equivalent metadata, keep one card to one main point, show conclusion before evidence, include action/trust/definition/source when relevant, stay within subtype copy budgets, and do not use vague insight copy, full-card red alerts, decorative icons, or essay-like explanations.
- Composite Panels declare `compositePanelContract` or equivalent metadata with one business topic, analysis sequence, layout pattern, primary child id, child roles/priorities/min sizes, shared local filters, shared legend/unit behavior, linked interaction, responsive fallback, and parent/child state rules.
- Composite Panels keep one visible primary child, default to `2-3` children and normal maximum `4`, allocate the primary child `50-70%` visual weight, preserve `contentH >= CH * 0.60`, and collapse P4/P3/P2 before shrinking P1 below its minimum viewport.
- Composite Panels separate panel-level local filters, child-only filter exceptions, shared legends, units, tooltips, and detail routes; they do not become equal-weight mini dashboards, nested-card stacks, or unrelated component collages.
- Grouped Table Headers declare a `columnTree` or equivalent grouped-column metadata, with parent groups, leaf fields, unit/definition metadata, sort/filter availability, width/alignment, priority, and fixed behavior before rendering.
- Grouped Table Headers compute `colSpan` from visible leaf descendants and `rowSpan` from `maxDepth`; parent group width equals the sum of visible leaf widths, and merged headers are implemented through the table/S2 header model rather than absolute text overlays.
- Grouped Table Headers keep depth `<=3` by default, preserve at least `4` useful body rows, fix the whole multi-level header when the body scrolls, freeze row-dimension/primary columns when horizontal scroll exists, and distinguish component-local filters from per-column header filters.
- Grouped Table Header density follows thresholds: visible leaf columns `<=8` display directly, `9-16` may scroll, `17-30` need frozen key columns and column settings, `31-50` need group collapse or settings, and `>50` requires redesign, pivot, column paging, or configuration view.
- Pivot Tables declare row dimensions, column dimensions, measures, aggregation grain, measure formulas/functions, subtotal/grand-total rules, row/column hierarchy depth, sort rules, fixed header/frozen row dimension behavior, local filter scope, tooltip/drilldown payload, and S2/project analytical-table renderer choice before rendering.
- Pivot Tables preserve `pivotAreaH >= CH * 0.55`, row headers, column headers, measure headers, body cells, subtotals, grand totals, pagination/scroll, tooltips, and loading/empty/error/no-permission states in reserved zones.
- Pivot Table measures default to `1-3` visible and `<=5` maximum; rows/columns follow density fallbacks, time columns keep natural order, percentage/rate totals recompute from numerator/denominator, conditional formatting is limited to `1-2` core measures, and exact path/formula values remain available through tooltip/drilldown/export.
- Detail Tables declare row grain, primary key, default sort, column metadata, local/global filter behavior, search/sort/pagination/export scope, and row-detail/action contract before rendering.
- Detail Tables preserve `tableBodyAreaH >= CH * 0.55`, stable header/body/pagination zones, fixed header when body scrolls, `visibleRowCount >= 4-6` by default and never `<3` except for an intentional preview with a detail route.
- Detail Table columns follow type-specific widths and alignment: primary/text left, numeric/percent right, status centered or left, operation right; visible columns default to `5-8`, `8-12` only in large blocks, and excess columns use horizontal scroll, frozen primary/action columns, column settings, drawer/detail, or split.
- Detail Table filters, metric strip, search/tools, header, body rows, summary row, pagination, status tags, operation column, tooltips, row hover/selection, and loading/empty/error/no-permission states stay in reserved zones; hidden long text, formulas, thresholds, source/freshness, permissions, and row evidence remain available through tooltip/detail/export.
- KPI/metric card value plus unit is centered as one group when the component is a metric card.
- Target/actual bar charts choose a target encoding that matches the data shape: unified target line, category target tick, or grouped target bar.
- Bar chart plot geometry reserves title, metric strip, legend, y-axis label band, right target-label gap, x-axis label band, and optional footer before choosing `grid` and `barWidth`.
- X-axis labels align to category centers and have sampling/rotation/scroll fallback before collision occurs.
- Target labels, value labels, category labels, legend, and axis labels do not collide; hidden values remain available in tooltip.
- Line/area charts use ordered source row tuples, preserve sparse point centering, declare y-axis baseline/range behavior, and define point/label density strategy before rendering.
- Line/area reference lines, point labels, x-axis labels, legend, and tooltip do not collide or imply unsupported precision; hidden point values remain available in tooltip.
- Combo charts declare a paired business relationship, primary bar metric, secondary line/target metric, shared category/time grain, left/right y-axis unit mapping, total visible series count, dual-axis rationale when used, category density, local-filter scope, legend/filter separation, and split-chart fallback before rendering.
- Combo charts preserve `plotH >= CH * 0.48`, align bars, line points, target/reference marks, x-axis labels, tooltip guide, and click payloads to the same ordered category centers, keep bar series `<=2`, line series `<=2`, target/reference `<=2`, total visible series `<=4`, and use sampling/scroll/dataZoom or split when category labels exceed budget.
- Combo filters, metric strip, legend, axes, data labels, target/reference labels, tooltips, footer notes, and state messages stay in reserved zones; hidden exact values, units, target gaps, attainment, denominator-zero, missing values, period, source, and active local filter remain available in tooltip/detail.
- Pie/donut charts declare category count, TopN/`其他` merge rule, legend position, `legendBandHeight` or side legend width, label-line budget, center, radius, inner radius, center metric, and tooltip payload before rendering.
- Pie/donut charts keep category count `2-6` preferred and `<= 8` maximum before merging, do not plot negative values, do not fake all-zero shares, and use tooltip/table/bar fallback for exact comparison.
- Pie/donut legends, center text, outside labels, guide lines, local filters, metric strips, and state messages stay in separate reserved zones; hidden exact values remain available in tooltip/detail.
- Radar charts declare dimension count, series count, shared score scale, standardized raw-value handling, plot budget, radius, center, ring count, label gap, and label alignment before rendering.
- Radar charts preserve a circular coordinate system, keep dimensions `<= 10`, visible series `<= 3`, and never plot mixed raw units directly on one radius.
- Radar filters, legends, metric strips, dimension labels, value labels, and tooltips stay in separate reserved zones; hidden exact values remain available in tooltip/detail.
- Gauge charts declare one bounded metric, min/max, unit, current value, clamp/overflow behavior, status color business direction, gauge type, angle span, radius, arc width, center value/unit placement, tick density, target/threshold behavior when present, local filter placement, and tooltip payload before rendering.
- Gauge charts preserve `gaugeAreaH >= CH * 0.50`, keep semicircle/circle geometry aspect-safe, make the center value the primary visual anchor, keep threshold segments `3-4` preferred and `<=5`, hide optional ticks/labels before shrinking the value, and avoid pointer use except for monitoring/risk/load cases.
- Gauge filters, metric strips, legends, center value/unit, status labels, min/max labels, target markers, threshold labels, tooltips, footer notes, and state messages stay in reserved zones; hidden exact current value, range, target, gap, threshold/status, period, source, overflow, and denominator notes remain available in tooltip/detail.
- Scatter/bubble charts declare X/Y metrics and units, axis ranges, plot budget, point density strategy, point or bubble radius mapping, reference-line/quadrant behavior, label strategy, legend separation, and tooltip payload before rendering.
- Scatter/bubble charts preserve `plotHeight >= CH * 0.48`, draw points centered on mapped X/Y coordinates, keep visible zero baselines when negative values exist, and avoid all-point labels except in sparse cases.
- Scatter/bubble filters, legends, size legends, point labels, reference lines, quadrant labels, trend lines, and state messages stay in reserved zones; hidden exact values remain available in tooltip/detail.
- Parallel coordinates declare object/sample fields, `3-12` dimension fields, dimension order, per-axis range/unit/direction, independent-axis or standardized scaling rule, plot budget, axis spacing, sample count, line-opacity density strategy, highlight/group semantics, brush behavior when present, legend/filter separation, and tooltip payload before rendering.
- Parallel coordinates preserve `plotH >= CH * 0.48`, keep `axisGap >= 56px`, keep visible dimensions `3-8` by default and `<=12` with filtering/scroll, hide ordinary sample labels, lower opacity as sample count grows, and use sampling/aggregation/density mode when `N > 500`.
- Parallel coordinate filters, metrics, legends, axis titles, tick labels, brush handles, sample lines, highlight lines, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden exact object values, original units, standardization rules, axis direction, and brush ranges remain available in tooltip/detail.
- Map/geographic charts declare geography keys or coordinates, map resource/projection, fitBounds behavior, map viewport budget, type choice, legend strategy, label density, tooltip payload, and missing-geo handling before rendering.
- Map/geographic charts preserve `mapAreaH >= CH * 0.55`, use uniform geographic scaling, center the map in the viewport, and never stretch administrative shapes, routes, or coordinates independently on X/Y.
- Map/geographic filters, legends, metric strips, labels, zoom/reset controls, drilldown breadcrumbs, and state messages stay in reserved zones; hidden exact region/point/flow values remain available in tooltip/detail.
- Candlestick/K-line charts declare OHLC fields, time ordering, unit, market color convention, price range, candle/body width, main/volume/indicator height budgets, axis label sampling, crosshair/tooltip payload, and dataZoom behavior before rendering.
- Candlestick/K-line charts preserve `mainChartH >= CH * 0.45`, align volume bars and MA points to candle centers, keep volume/indicator subplots secondary, and avoid per-candle value labels except high/low/selected/hover.
- Candlestick/K-line filters, metric strip, legend, price axis, time axis, volume subplot, brush, crosshair labels, high/low markers, and state messages stay in reserved zones; hidden OHLC/volume/MA values remain available in tooltip/detail.
- Boxplot charts declare sample or precomputed statistical contract, Q1/median/Q3/IQR/whisker/outlier rule, sample-count thresholds, unit, axis range, category/group density, box/whisker geometry, outlier strategy, label strategy, and tooltip payload before rendering.
- Boxplot charts preserve `plotH >= CH * 0.50`, align boxes to category centers, keep grouped series within `S <= 3` and `N <= 8` unless scrolling/fallback is declared, and avoid full-stat labels on every category.
- Boxplot filters, metric strip, legend, axes, box bodies, median lines, whiskers, outliers, target lines, labels, and state messages stay in reserved zones; hidden five-number summaries and outlier details remain available in tooltip/detail.
- Matrix/time/calendar/correlation heatmaps declare row dimension, column dimension, value metric, aggregation grain, unit, color-scale type, visualMap range, missing-vs-zero encoding, row/column count, cell size, label sampling, value-label threshold, highlight rule, and tooltip payload before rendering.
- Matrix/time/calendar/correlation heatmaps preserve `matrixH >= CH * 0.45`, keep color as the primary mark, distinguish missing cells from zero cells, and use sequential/stepped/diverging color scales according to metric semantics.
- Heatmap labels, local filters, metric strip, visualMap, row labels, column labels, cell values, highlights, tooltip, footer, and state messages stay in reserved zones; hidden exact cell values remain available in tooltip/detail.
- Path/user/process path charts declare path task, step/node fields, directed transition fields, start node, end node, order/layer, metric basis, conversion/drop-off formulas, path depth, Top N rule, node/link counts, main-path strategy, branch strategy, path-width mapping, label strategy, legend/filter separation, component-local filter placement, tooltip payload, and aggregation/fallback before rendering.
- Path/user/process path charts preserve `pathAreaH >= CH * 0.52`, keep the main path centered on `mainPathY`, keep branches bounded and sorted by weight, stop arrows at target-node edges, and avoid all-branch/all-label rendering beyond readable path density.
- Path chart filters, metrics, legends, nodes, links, arrows, path labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden node/transition details remain available in tooltip/detail.
- Funnel charts declare ordered stage fields, stage order, metric basis/unit, shared population/cohort logic, entry/final values, entry share, stage conversion, drop value/rate, total conversion, stage density, label strategy, target/comparison behavior when present, local filter placement, tooltip payload, and fallback before rendering.
- Funnel charts preserve `funnelAreaH >= CH * 0.52`, keep stage labels, bars/funnel body, value/share labels, target ticks, and loss markers in reserved zones, keep `3-6` stages preferred and `>10` folded/scrolled or moved to table/path/Sankey, and highlight only max/key loss by default.
- Funnel filters, metrics, legends, stage labels, bars, values, conversion/loss markers, target markers, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden exact stage values, entry share, stage conversion, drop value/rate, total conversion, target/comparison, period, source, and denominator/cohort notes remain available in tooltip/detail.
- Sankey diagrams declare flow task, node fields, directed link fields with `source`/`target`/`value`, layer/stage order, metric basis/unit, node-value rule, loss/unknown handling, Top N/`其他`, node/link counts, flow-width mapping, label strategy, legend/filter separation, component-local filter placement, tooltip payload, and aggregation/fallback before rendering.
- Sankey diagrams preserve `sankeyAreaH >= CH * 0.55`, keep visible layers at `3-4` by default and `<=5` without drilldown, keep main flows dominant, merge or weaken long-tail ribbons, hide ordinary link labels, and reject negative values or unexplained disappearing flow.
- Sankey filters, metrics, legends, nodes, ribbons, labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden source-target exact value, source share, target share, total share, conversion/loss, period, source, and aggregation details remain available in tooltip/detail.
- Treemap/rectangular tree maps declare hierarchy fields, parent/leaf aggregation, non-negative additive area metric, optional color metric, total/parent share formulas, visible depth, Top N/`其他` aggregation, node count, minimum rectangle and label thresholds, color semantics, legend/filter separation, breadcrumb/drilldown behavior, tooltip payload, and table/bar/tree fallback before rendering.
- Treemap/rectangular tree maps preserve `treemapAreaH >= CH * 0.55`, keep area as the primary encoding, keep parent groups readable, hide labels inside rectangles below threshold, aggregate tiny leaves before they create visual noise, and never use negative/rate/score values directly as area.
- Treemap filters, metrics, breadcrumbs, legends, parent labels, child labels, rectangles, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden leaf/parent path, value, total share, parent share, color metric, and aggregation details remain available in tooltip/detail.
- Sunburst charts declare hierarchy fields or `children`, non-negative additive angle metric, optional color metric, total/parent share formulas, visible depth/ring count, Top N/`其他` aggregation, node count, sector angle mapping, center content, sector/label thresholds, color semantics, legend/filter separation, breadcrumb/drilldown behavior, tooltip payload, and Treemap/bar/table fallback before rendering.
- Sunburst charts preserve `sunburstAreaH >= CH * 0.55`, keep sector angle as the primary encoding, keep visible levels at `2-3` by default and `<= 4` without drilldown, keep `ringW >= 18px`, fit center text within `innerR * 1.5`, aggregate tiny sectors before they create visual noise, and never use negative/rate/score values directly as angle.
- Sunburst filters, metrics, breadcrumbs, legends, center text, rings, sector labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden full path, value, total share, parent share, color metric, rank, and aggregation details remain available in tooltip/detail.
- Tree/hierarchical tree charts declare hierarchy task, tree node fields, root node, parent-child fields or children array, depth/layer, visible depth, default expanded levels, node count, max child count, Top N/`+N` aggregation, orientation, label strategy, legend/filter separation, expand/collapse/search behavior, tooltip payload, and tree-list/fallback before rendering.
- Tree/hierarchical tree charts preserve `treeAreaH >= CH * 0.55`, align parent nodes to visible child centers, keep connector paths weaker than nodes and stopped at node edges, keep default expansion within density rules, and avoid full-node expansion when `N`, `D`, or child count exceeds readable limits.
- Tree chart filters, metrics, legends, search, nodes, connectors, expand/collapse controls, node labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden node/parent/child/value/status details remain available in tooltip/detail.
- Relation/network graphs declare node fields, edge fields, graph task, layout type, node/edge counts, node categories, edge types/directions/weights, density strategy, node-size mapping, edge-width mapping, label strategy, legend/search/control placement, fitView/zoom/drag behavior, and tooltip payload before rendering.
- Relation/network graphs preserve `graphH >= CH * 0.55`, keep nodes visually stronger than edges, keep ordinary labels and edge labels hidden unless sparse/selected/hovered, and avoid full hairball rendering beyond readable node/edge density.
- Relation graph filters, metrics, legends, search, zoom controls, nodes, edges, arrows, group areas, labels, tooltips, detail panels, and state messages stay in reserved zones; hidden node/edge details remain available in tooltip/detail.
- `requiredContentHeight <= H` after optional content is chosen.
- Long labels, large values, missing data, zero values, and target/comparison absence have explicit behavior.
- Loading, empty, error, no-permission, and stale states preserve geometry.
- Runtime QA checks `scrollHeight <= clientHeight`, `scrollWidth <= clientWidth`, and screenshot collision for the smallest accepted tier.
