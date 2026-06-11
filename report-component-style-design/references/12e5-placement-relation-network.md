# Relation / Network Graph Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
