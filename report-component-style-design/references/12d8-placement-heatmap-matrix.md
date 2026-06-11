# Matrix / Time / Calendar / Correlation Heatmap Placement Algorithm
This file was split from `12d-placement-specialized-charts.md`. Load it only when this exact component family is present; use `12d-placement-specialized-charts.md` as the routing index.


Use this for non-geographic heatmaps: matrix heatmaps, weekday-hour or category-time heatmaps, calendar heatmaps, cohort heatmaps, utilization heatmaps, risk grids, and correlation matrices. Geographic heat layers belong to the map/geographic placement section.

### Anatomy

| Slot | Required | Notes |
| --- | --- | --- |
| Title | Yes | Business question or heatmap subject |
| Component-local filter | Optional | Metric, period, aggregation grain, actual/rate/change, anomaly-only |
| Subtitle / unit / definition | Optional but recommended | Unit, period, aggregation, color rule |
| Metric strip | Optional | At most `3` items such as peak, average, anomaly cells, high period |
| Row labels | Yes | Y dimension |
| Column labels | Yes | X dimension |
| Heat cells | Yes | Color is the primary mark |
| Color legend / visualMap | Yes | Sequential, stepped, or diverging |
| Cell value labels | Optional | Only when cell size passes threshold |
| Highlight marks | Optional | Max, min, anomaly, selected cell |
| Tooltip | Yes | Exact value and context |
| Footer / update note | Optional | Source, updated time, color rule note |
| State mask | Yes | Loading, empty, error, no-permission, missing cells, all-equal values |

### Fit Gate

Use heatmap when the decision is to locate a two-dimensional pattern:

- High/low concentration.
- Time-of-week or hour-of-day activity.
- Cross-category intensity.
- Resource utilization.
- Risk hotspots.
- Cohort or retention pattern.
- Metric correlation structure.

Do not use heatmap when:

- Only one dimension exists.
- The user needs exact comparison of a few values.
- A simple ranking is the task.
- Value variance is too small for color to carry meaning.
- Row/column cardinality is unbounded and no aggregation or scroll exists.
- Missing values cannot be distinguished from zero.

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
| Tiny | `W < 320` or `H < 260` | Title, single dropdown local filter, sampled labels, matrix, simplified legend, tooltip | Subtitle, metric strip, footer, cell values |
| Standard | `320 <= W < 720` and `H >= 300` | Title, filter, optional metric strip, labels, matrix, legend, tooltip | Cell values unless large enough |
| Large | `W >= 720` and `H >= 420` | Full structure, anomaly highlights, selected row/column, optional value labels | All-cell values still conditional |

### Slot Height Budget

```text
titleAreaH = 36-56px, default 44px
metricH = 0-48px
colLabelH = 20-40px, default 24px
legendH = 24-40px, default 28px
footerH = 0-24px
gapTitleMetric = 8-12px
gapMetricLabel = 8-12px
gapLabelMatrix = 6-10px
gapMatrixLegend = 12-16px

matrixH =
  CH
  - titleAreaH
  - metricH
  - colLabelH
  - legendH
  - footerH
  - gaps
```

Main matrix budget:

```text
matrixH >= CH * 0.45
```

If the budget fails, collapse in this order:

1. Hide footer/update note.
2. Reduce or hide metric strip.
3. Simplify color legend.
4. Collapse local filter to single dropdown.
5. Hide cell value labels.
6. Sample row/column labels.
7. Use scroll, pagination, aggregation, Top N, virtual rendering, or table fallback.

### Component-Local Filter

Suitable local filters:

- Metric: orders, sales, conversion, error count, utilization rate.
- Period: week, month, quarter.
- Aggregation grain: hour, day, week.
- Value mode: actual, rate, change, attainment.
- Scope: all, Top 10, anomalies.

Unsuitable local filters:

- Region + channel + category + store + status + long date range + aggregation grain in one component.
- Controls that change page/global scope, permission scope, export scope, row grain, or backend aggregation.

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

When `filterW > filterMaxW`, use a single capsule dropdown. Do not create a new filter row before protecting matrix height.

### Metric Strip

Recommended metrics:

- Peak value.
- Average value.
- Anomaly cell count.
- Peak time/category.
- Coverage cell count.
- Change versus previous period.

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

### Matrix Geometry

Variables:

```text
R = row count
C = column count
rowLabelW = clamp(40px, maxRowLabelTextW + 8px, 120px)
labelGap = 8-12px
rightLegendW = 0 or 40-80px

heatmapAreaX = P + rowLabelW + labelGap
heatmapAreaY = P + titleAreaH + metricH + colLabelH + topGaps
heatmapAreaW = CW - rowLabelW - labelGap - rightLegendW
heatmapAreaH = matrixH
```

Whole matrix centering:

```text
matrixTotalW = rowLabelW + labelGap + actualHeatmapW + rightLegendW
matrixX = P + (CW - matrixTotalW) / 2
```

If space is tight:

```text
matrixX = P
heatmapAreaW = CW - rowLabelW - labelGap - rightLegendW
```

### Cell Size

```text
cellW = heatmapAreaW / C
cellH = heatmapAreaH / R
cellMinSize = 12px
cellMaxSize = 44px
cellSizeW = clamp(12px, cellW, 44px)
cellSizeH = clamp(12px, cellH, 44px)
```

When square cells are required:

```text
cellSize = min(cellSizeW, cellSizeH)
actualHeatmapW = cellSize * C
actualHeatmapH = cellSize * R
heatmapX = heatmapAreaX + (heatmapAreaW - actualHeatmapW) / 2
heatmapY = heatmapAreaY + (heatmapAreaH - actualHeatmapH) / 2
```

For rectangular time heatmaps, use:

```text
actualHeatmapW = cellSizeW * C
actualHeatmapH = cellSizeH * R
```

Cell coordinates:

```text
cellX = heatmapX + c * cellSizeW
cellY = heatmapY + r * cellSizeH
cellCenterX = cellX + cellSizeW / 2
cellCenterY = cellY + cellSizeH / 2
```

### Cell Drawing

```text
cellGap = clamp(1px, min(cellSizeW, cellSizeH) * 0.08, 4px)
drawCellW = cellSizeW - cellGap
drawCellH = cellSizeH - cellGap
drawCellX = cellX + cellGap / 2
drawCellY = cellY + cellGap / 2
cellRadius = 1-4px
```

Cell minimums:

| Scenario | Minimum |
| --- | ---: |
| With value labels | `28px` |
| Color only | `12-16px` |
| Calendar heatmap | `10-14px` |
| Large screen | `18-24px` |

If `cellW < 24px` or `cellH < 18px`, hide cell value labels.

### Color Scale / VisualMap

Sequential scale:

```text
normalized = (value - minValue) / (maxValue - minValue)
color = colorScale(normalized)
```

Use for positive magnitude metrics such as order count, sales, visits, users, alerts, and usage.

Stepped scale:

```text
value -> business threshold bucket -> fixed color
```

Use for low/medium/high, normal/warning/critical, or below/near/above target.

Diverging scale:

```text
negative values -> one hue
0 -> neutral
positive values -> opposite hue
```

Use for deltas, deviation, profit/loss, and correlation. Correlation heatmaps must use `-1..1` with `0` as the center.

Range:

```text
colorMin = min(values)
colorMax = max(values)
```

For outlier-heavy datasets:

```text
colorMin = percentile(values, 5)
colorMax = percentile(values, 95)
```

Values outside the range clamp to the end colors. Tooltip still shows the exact raw value.

All-equal values use one weak color and an explanatory tooltip/state note. Missing values use neutral blank/hatch and never share the zero color.

### Color Legend

Default bottom legend:

```text
legendX = heatmapX
legendY = heatmapY + actualHeatmapH + 12px
legendW = min(actualHeatmapW, 240px)
legendH = 24-32px
```

Legend forms:

- Continuous: `low -> gradient -> high`.
- Stepped: discrete swatches.
- Diverging: negative -> neutral -> positive.
- Compact: `low - high` when width is tight.

Size tokens:

| Item | Value |
| --- | ---: |
| Legend height | `24-32px` |
| Swatch height | `8-10px` |
| Swatch width | `18-28px` |
| Gradient width | `120-200px` |
| Legend font | `11-12px` |

### Row And Column Labels

Row labels:

```text
rowLabelX = heatmapX - labelGap
rowLabelY = cellCenterY
align = right center
fontSize = 11-12px
```

Column labels:

```text
colLabelX = cellCenterX
colLabelY = heatmapY - 6px
align = center bottom
fontSize = 11-12px
```

Column labels may sit below the matrix for category-heavy heatmaps:

```text
colLabelY = heatmapY + actualHeatmapH + 6px
```

Sampling:

```text
minLabelW = 36-56px
maxColLabelCount = floor(actualHeatmapW / minLabelW)
colLabelStep = ceil(C / maxColLabelCount)
```

Keep first/last labels, time boundaries, week/month boundaries, and selected labels before generic step labels.

Density:

| Size | Rule |
| --- | --- |
| `R <= 12`, `C <= 12` | Full labels may show |
| `R <= 20`, `C <= 24` | Sample labels and hide cell values |
| `R > 20` or `C > 30` | Scroll, paginate, aggregate, or Top N |
| `R * C > 600` | Avoid full direct rendering; use aggregation or virtual scroll |

### Cell Value Labels

Default: do not show every value.

Show values only when:

```text
cellW >= 36px and cellH >= 24px
```

For correlation:

```text
cellW >= 36px and cellH >= 28px
```

Label geometry:

```text
valueLabelX = cellCenterX
valueLabelY = cellCenterY
align = center
fontSize = 10-12px
```

Text color must respond to background luminance:

- Dark cell: light text.
- Light cell: dark text.

Long values reduce decimals or abbreviate on the surface; tooltip shows the complete value.

### Highlight And Selection

Maximum/minimum:

- At most Top `3` highlighted cells.
- Use subtle border for max/high risk.
- Keep min weaker unless it is business-critical.

Anomaly:

- Border, corner marker, or light stroke.
- No large icons, blinking effects, or blanket red blocks.
- Declare anomaly rule: business threshold, mean + `2 * stddev`, P95, or model flag.

Selection:

```text
selected cell > same row/column > other cells
```

Selected cell uses stronger border; same row/column labels highlight; other cells may lower opacity slightly. Tooltip may pin.

### Calendar Heatmap

Use for daily metrics across weeks and weekdays, not complex categories.

```text
dayCellSize = clamp(8px, CW / 60, 16px)
dayCellGap = 2-4px
calendarW = 53 * dayCellSize + 52 * dayCellGap
calendarH = 7 * dayCellSize + 6 * dayCellGap
```

Labels:

- Month labels on top.
- Weekday labels show only key days such as Monday/Wednesday/Friday or Monday/Sunday.
- No numeric values inside day cells.
- Tooltip owns date and exact value.

### Correlation Heatmap

Required:

- Diverging scale.
- Range `[-1, 1]`.
- Center `0`.
- Tooltip explains positive, negative, or weak relation.

Matrix forms:

- Full matrix for general readers.
- Lower or upper triangle for expert analysis and duplicate reduction.

Do not imply causality. Add a note or tooltip language when correlation is exploratory.

### Tooltip

Base tooltip:

```text
row dimension and value
column dimension and value
metric name
formatted value and unit
share / rank / change when present
aggregation grain
period / source
color-scale rule
missing or zero state
anomaly / threshold reason when present
```

Correlation tooltip:

```text
metric A
metric B
correlation coefficient
relation direction
period / sample context
```

Tooltip geometry:

```text
minWidth = 160px
maxWidth = 300px
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
| Loading | Skeleton for title, filter, matrix cells, legend |
| Empty | Empty message in matrix viewport |
| Error | Error message and retry/action when available |
| No permission | Permission message in matrix viewport |
| Missing cell | Blank/neutral/hatch cell with tooltip |
| Zero cell | Lowest color as real value, not empty |
| All values equal | Single weak color plus tooltip/state note |
| Extreme values dominate | Percentile or clipped scale, with visualMap note |
| Too many rows/columns | Sample labels, scroll, aggregate, paginate, or fallback |
| Unit missing | Hide unit text but preserve subtitle geometry |
| Invalid color range | Use fallback range and show note |
