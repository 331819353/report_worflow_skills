# Map And Geographic Chart Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


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
