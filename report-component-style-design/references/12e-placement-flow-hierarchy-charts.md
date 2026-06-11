# Flow And Hierarchy Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

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
