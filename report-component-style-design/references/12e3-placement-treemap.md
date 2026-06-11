# Treemap / Rectangular Tree Map Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
