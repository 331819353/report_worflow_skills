# Insight And KPI Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

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
