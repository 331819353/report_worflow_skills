# KPI And Metric Card Rules

Use for KPI cards, pyramid KPI cards, metric groups, comparison tiles, submetric tiles, and mini trends.

## Structure

- Required zones: label, value, unit, status/trend, and optional baseline/target.
- The value is the visual anchor. Status and trend support the value without competing with it.
- The core value zone must be visually centered in the card body and occupy at least 40% of the card's main visual height. Do not stack title, subtitle, notes, or helper copy at the top in a way that leaves a large empty middle/lower area.
- Implementation-ready metric cards must also follow `12-internal-placement-algorithms.md`: declare `W`, `H`, `P`, `CW`, `CH`, the card content origin, the main visual center, and every slot's x/y, width, height, alignment, and responsive fallback.
- Cards in the same group share height, padding, value baseline, unit placement, and status position.
- Fixed-height KPI cards must declare a height budget before style acceptance: padding + label line-height + value line-height + comparison/status/footer line-heights + gaps must be `<=` card body height. The value, label, unit, trend, and footer rows all need explicit `line-height`.
- Clickable KPI cards need hover, active, selected, loading, and disabled states when applicable.

## Standard Metric Card Placement

Default metric cards use a centered-value layout:

- Metric title sits top-left; definition/help entry sits top-right and does not affect the main content center.
- The primary value plus unit is centered as one group, not as a number with a detached unit.
- YoY/MoM, target text, progress, and sparkline align around the content center unless the card is explicitly split into a wide two-zone layout.
- Summary and description are weaker than the value. Summary may center in standard cards; explanation and freshness metadata default to bottom-left or bottom-right based on content.

Default coordinate variables:

```text
W = card width
H = card height
P = clamp(12px, W * 0.05, 24px)
CW = W - 2P
CH = H - 2P
contentOrigin = (P, P)
centerX = P + CW / 2
```

Slot algorithm:

```text
titleX = P
titleY = P
titleWidth = CW - helpIconWidth - helpGap

helpIconSize = 14-16px
helpX = W - P - helpIconSize
helpY = P + (titleHeight - helpIconSize) / 2

valueGroupWidth = valueTextWidth + 4-6px + unitTextWidth
valueGroupX = centerX - valueGroupWidth / 2

compareGroupX = centerX - compareGroupWidth / 2
targetGroupX = centerX - targetGroupWidth / 2
sparkX = centerX - sparkWidth / 2
progressX = centerX - progressWidth / 2
```

Size tiers:

| Tier | Condition | Required display |
| --- | --- | --- |
| Small | `W < 200px` or `H < 110px` | title, value group, one priority comparison |
| Standard | `200px <= W < 360px` and `120px <= H < 180px` | title, value group, YoY/MoM, target text |
| Enhanced | `W >= 360px` and `H >= 180px` | title, value group, YoY/MoM, target, optional sparkline, short summary |
| Wide | `W >= 480px` | split primary value zone and auxiliary zone only when meaningful |

Vertical fit must be proven before adding optional content:

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

When the fit fails, remove or move optional content in this order: description, summary, sparkline, second comparison, target progress bar. Do not shrink the primary value below readable size or detach the unit from the centered value group.

## Component-Internal Local Filter

Use a `组件内筛选区 / 局部筛选区` section when a KPI card has its own time,口径, target, or unit switch.

Suitable filters:

- `今日 / 本周 / 本月`
- `同比 / 环比`
- `实际 / 目标 / 完成率`
- `金额 / 数量`

Rules:

- The filter affects only this KPI card or an explicitly declared local KPI group.
- Default to one visible group with no more than three short options. Use capsule/segmented control when it fits; collapse to a single capsule dropdown on small cards.
- Do not use component-local filters for region, channel, store, owner, permission, backend aggregation, pagination, or export scope.
- The filter sits in the header/title right side and must not change the visual center of the value. Keep `centerX = P + CW / 2` for value, comparison, and target unless the card uses an intentional wide split layout.
- If title + help + filter do not fit, keep title and selected filter value; move help/definition or secondary actions to tooltip/drawer/more.

Placement:

```text
filterH = 24-28px
filterW = min(actualFilterWidth, CW * 0.45)
filterX = W - P - filterW
filterY = P
titleMaxW = CW - filterW - 8px
```

Small-card fallback:

```text
W < 240px or H < 110px:
  show selected value pill, for example `本月 ▾`
```

## Pyramid KPI Card Pattern

Use this pattern when a card needs one dominant indicator plus YoY, MoM, target, and sparkline context.

Structure from top to bottom:

- Apex metric zone: KPI label, dominant value, unit, and optional status badge. This zone owns the strongest visual weight.
- Comparison band: three compact cells for `同比`, `环比`, and `目标`. Each cell contains a short label, signed value, trend icon, and optional helper such as `较目标差`.
- Sparkline band: one full-width mini trend with actual line, optional target/reference line, latest point, and hover tooltip.
- Footer metadata: optional period, source, or update time only when space remains.

Recommended proportions:

- Full pyramid card: body viewport at least 260px wide and 180px high. Apex 42%, comparison band 28%, sparkline 30%.
- Compact pyramid card: body viewport at least 220px wide and 140px high. Apex 48%, comparison band 32%, sparkline 20%; hide footer.
- Micro KPI: below 220px wide or 130px high, show apex value plus one priority comparison. Move target and sparkline to tooltip/drawer.

Layout rules:

- Center the apex value visually at the top. Keep label and unit close enough that users can read the KPI as one phrase.
- Use a stable three-column comparison band. Cells must keep equal widths so `同比`, `环比`, and `目标` compare cleanly.
- The comparison band can wrap to two rows only in a wider but short card; it must not wrap labels inside each cell.
- Sparkline is secondary and must not compete with the apex value. Use thin strokes, no permanent point labels, and tooltip for exact period values.
- Do not place sparkline behind the main value unless contrast and tooltip access remain excellent.

Fit and overflow rules:

- Main KPI value, unit, and primary trend/status must sit in a centered value group. If the card has a header/title, reserve it separately and keep the value group centered within the remaining body viewport.
- A KPI card fails fit QA when the title/description cluster consumes the top while the core number is small, off-center, or visually below 40% of the card body height.
- A KPI card fails placement QA when it lacks slot coordinates or when the value, unit, comparison, target, sparkline, summary, or metadata relies on vague auto layout without a measured fallback.
- Apex value, unit, and status badge must never overlap. If the value is long, reduce precision, switch unit, or widen the card before shrinking below readable size.
- `同比`, `环比`, and `目标` labels stay permanently visible. Long helper text moves to tooltip.
- Comparison values use compact signed notation such as `+8.2%`, `-3.1%`, `达成 96%`, or `差 320万`.
- If three comparison cells cannot fit at 12px text, show two cells and put the least important cell in tooltip/drawer.
- Sparkline hidden values must be available through hover/focus/tap tooltip.

Semantic rules:

- `同比` and `环比` describe movement. Use up/down icon plus signed value.
- In Chinese report UI, rate/change/completion labels use `%`; do not render `pt`, `p.p.`, or `percentage point` labels unless explicitly requested.
- For change-rate and variance-rate indicators, positive values use red text plus an upward SVG/icon, negative values use green text plus a downward SVG/icon, and zero values use neutral styling.
- `目标` describes attainment. Use progress wording, target gap, or attainment rate; do not force it into up/down semantics unless the business defines it that way.
- Up is not always good. For non-change status such as health, risk, completion, and target attainment, color follows business meaning. For change-rate and variance-rate values, use the required positive-red-up / negative-green-down convention unless the user explicitly supplies another company standard.

## Trend Icon SVG Assets

Use the bundled SVG assets when the project does not already have an approved icon set:

- `assets/icons/trend-up.svg`
- `assets/icons/trend-down.svg`

Icon style:

- 16px viewbox, 1.8px rounded stroke, no fill, `currentColor`, and `vector-effect: non-scaling-stroke`.
- Use inside a 16px or 18px square inline-flex icon slot.
- Pair the icon with text such as `同比 +8.2%`; never rely on the icon alone.
- Keep icon color equal to the semantic value color, not a decorative accent.

Suggested CSS tokens:

```css
:root {
  --kpi-trend-positive: #dc2626;
  --kpi-trend-negative: #16a34a;
  --kpi-trend-neutral: #64748b;
  --kpi-target-good-bg: #ecfdf3;
  --kpi-target-risk-bg: #fef2f2;
}

.metric-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
}

.metric-trend svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.metric-trend.is-positive { color: var(--kpi-trend-positive); }
.metric-trend.is-negative { color: var(--kpi-trend-negative); }
.metric-trend.is-neutral { color: var(--kpi-trend-neutral); }
```

## Typography And Fit

- Main KPI value: 24-36px by default. Up to 40px is allowed only for wide or top-priority primary metric cards after fit proof. Do not shrink below 22px for primary KPIs.
- Unit: 12-14px and placed close to the value baseline.
- Label: 12-14px. Long labels wrap to two lines or move full name to tooltip.
- Trend and status: 12px minimum with icon or sign.
- The value, unit, and status must remain visible together.
- Main values, percentages, and large numerals use explicit line-height sized to the intended visual box; do not rely on browser default line-height or `normal`.

## Overflow Rules

- Values must not overflow the card width. Use compact notation, controlled precision, or a wider value zone before reducing font size.
- Large currency values should use consistent units, such as 万元 or 亿元, instead of long raw numbers.
- If a KPI card contains submetric tiles, calculate whether the main value plus submetric grid fits. If not, reduce visible submetrics, split the group, or move submetrics to drawer.
- Submetric tiles need their own minimum height and wrapping policy. Do not force four long-titled metrics into two columns when the cell width causes title/value clipping; widen the metric area, wrap to two lines, stack into one column, or show fewer tiles with drilldown.
- Avoid `nowrap + ellipsis` on metric titles that carry business meaning. If truncation is unavoidable, reserve tooltip/focus disclosure and keep the title readable enough to identify the metric.
- Nested KPI groups wrap to additional rows or scroll internally with clear affordance. They must not clip lower rows.

## Mini Trends

- Mini line/bar trends are secondary. Hide point labels by default.
- For one-point mini trends, center the point and show exact value in tooltip.
- For two-point mini trends, keep the two marks center-symmetric unless the full time range is represented.
- Show latest, max/min, or anomaly label only when it fits without colliding with the KPI value.
- In pyramid KPI cards, sparkline may show only the latest point marker and optional target/reference line. All other point values appear in tooltip.

## Comparison And Status

- Use consistent positive/negative semantics across all KPI cards.
- For change-rate and variance-rate values, consistency means positive-red-up and negative-green-down, with `%` display in Chinese UI.
- Do not use color alone. Pair color with sign, icon, label, or badge.
- Baseline and target text move below the value or into tooltip when the card is narrow.
- For pyramid KPI cards, comparison cells must use one consistent order across the page, normally `同比`, `环比`, `目标`.
