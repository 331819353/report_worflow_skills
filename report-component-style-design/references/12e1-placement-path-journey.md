# Path / User Journey / Process Path Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
| Standard | `360 <= W < 720` and `H >= 320` | Title, filter, metric strip, main path, up to `6` visible journey cards/nodes, Top branches, key labels, tooltip | Secondary labels, low-weight branches |
| Large | `W >= 720` and `H >= 420` | Full standard structure, up to `6` visible journey cards/nodes plus Top `5-10` paths, drop-off branches, expand/collapse, optional search | Full all-path rendering still forbidden when dense |

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

Display budget:

```text
visibleJourneyCards <= 6
visibleBranchGroups <= 3 by default
ordinaryPermanentLabels = key-only
```

When a journey has more than `6` visible steps/cards, keep start, end, selected/anomaly/drop-off, and the most important middle steps visible; aggregate the rest into `+N`, pagination, horizontal scroll, fullscreen, Sankey/relation fallback, or a detail table.

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

- Scope: all paths, main path, abnormal path. If "all paths" means no constraint, use the declared `emptyFilterValue` sentinel rather than a business row key.
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
