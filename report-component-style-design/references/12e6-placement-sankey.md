# Sankey Placement Algorithm
This file was split from `12e-placement-flow-hierarchy-charts.md`. Load it only when this exact component family is present; use `12e-placement-flow-hierarchy-charts.md` as the routing index.


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
