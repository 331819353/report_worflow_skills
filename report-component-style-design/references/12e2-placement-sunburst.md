# Sunburst / Sunburst Chart Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
