# Tree / Hierarchical Tree Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
