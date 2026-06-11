# Pivot Table Placement Algorithm
This file was split from `12f-placement-composite-tables.md`. Load it only when this exact component family is present; use `12f-placement-composite-tables.md` as the routing index.


Use this for S2-class multidimensional aggregated tables: pivot tables, cross tables, target/actual matrices, period-by-dimension summaries, and wide metric matrices. A Pivot Table expresses row dimensions * column dimensions * measures; it is not a raw record list.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown for metric, period, display mode, or exception state |
| Subtitle/unit/freshness | Optional | Under title; states period, unit, aggregation grain, source, or口径 |
| Metric strip | Optional | At most `3`: total, max item, exception count, average, row count, column count |
| Field/settings action | Optional | Icon or lightweight link; do not expose full drag field wells in report display mode |
| Row dimension header | Yes | Left top corner, frozen when horizontal scroll exists |
| Column dimension header | Yes | Top header band, fixed when vertical scroll exists |
| Measure header | Required when multi-measure | Below column dimension header or merged into column header |
| Data cells | Yes | Main cross-summary area, right-aligned numeric values |
| Subtotal row/column | Recommended | Light emphasis at group end by default |
| Grand-total row/column | Recommended | Stronger but restrained emphasis at bottom/right |
| Expand/collapse | Optional | Inside row dimension column for hierarchy |
| Tooltip/drilldown | Recommended | Exact path, formula, share, period, and source evidence |
| State mask | Yes | Loading, empty, filter-empty, error, no-permission, aggregation error |

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Recommended size:

- Default `W = 640-1200px`, `H = 360-640px`.
- Minimum `W = 320px`, `H = 240px` only for compact preview.
- Large analytical workspace `W >= 720px` and `H >= 420px` can carry multi-level rows/columns and `3-5` visible measures.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px
pivotAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
require pivotAreaH >= CH * 0.55
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless field/settings/search is required
paginationH = 32-40px when paginated or virtualized
footerH = 0px or 20px
```

If `pivotAreaH < CH * 0.55`, remove optional content in this order: footer, secondary metric items, subtitle, toolbar text, secondary local filters, low-priority measures. Then use compact row height or enlarge/split the block.

### Pivot Area Geometry

```text
pivotX = P
pivotY = P + titleAreaH + metricH + toolbarH + topGaps
pivotW = CW
pivotH = H - P - paginationH - footerH - pivotY

headerRowH = 32-40px, default 36px
measureHeaderH = 32-36px
columnHeaderH = columnDimensionDepth * headerRowH + visibleMeasureHeaderH

rowHeaderW = clamp(120px, maxRowLabelTextW + levelIndent * maxRowDepth + 32px, 260px)

dataX = pivotX + rowHeaderW
dataY = pivotY + columnHeaderH
dataW = pivotW - rowHeaderW
dataH = pivotH - columnHeaderH
```

Rules:

- Column dimension parent headers merge across child columns and center-align.
- Measure headers center-align below the column dimension level when multiple measures exist.
- Row dimension headers and labels remain left-aligned.
- Data cells, subtotal cells, and grand-total cells right-align.

### Local Filter Placement

Allowed local filters:

- Metric口径: `销售额 / 订单数 / 完成率`.
- Period shortcut: `本月 / 本季 / 本年` when it affects only the current pivot.
- Display mode: `实际 / 目标 / 差额`, `金额 / 数量 / 占比`.
- Exception state: `全部 / 异常 / 未达标`.
- Row dimension switch such as `区域 / 渠道 / 品类` only when it is explicitly component-local and does not change the page schema.

Fit:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding * 2
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  collapse to one capsule dropdown, for example 销售额 ▾
```

Do not add a new filter row before protecting `pivotAreaH`; Pivot Tables need body space for row and column context.

### Row Hierarchy

```text
levelIndent = 16-20px
iconSize = 14-16px
rowTextX = pivotX + cellPaddingX + level * levelIndent
expandIconX = rowTextX
labelX = expandIconX + iconSize + 4px
```

States:

- Collapsed: `▸`.
- Expanded: `▾`.
- Leaf: no icon.
- Lazy loading: small row-local loading indicator.

Default row dimension depth is `1-2`. More levels require expand/collapse, drilldown, or a larger analysis page.

### Row Height And Visible Rows

| Mode | Row height | Use |
| --- | ---: | --- |
| Compact | `32-36px` | Dense data |
| Standard | `40px` | Default |
| Relaxed | `44-48px` | Multi-measure or easier reading |

```text
rowH = 40px default
visibleRowCount = floor(dataH / rowH)
```

If `visibleRowCount < 4`, reduce optional bands, use compact rows, enable scroll, enlarge the block, or convert to preview/fullscreen. Do not accept a pivot that only shows one or two rows while pretending to support cross analysis.

### Column Width And Visible Columns

```text
measureColumnW = clamp(88px, textWidth + 32px, 140px)
amountColumnW = 100-140px
percentColumnW = 80-120px
totalColumnW = 100-150px
visibleDataColumnCount = floor(dataW / measureColumnW)
```

Density tiers:

| Scale | Behavior |
| --- | --- |
| Rows `<=50`, columns `<=12` | Direct display |
| Rows `51-200`, columns `<=24` | Fixed header + scroll |
| Rows `>200` | Row virtualization |
| Columns `>24` | Horizontal scroll + frozen row dimension column |
| Columns `>50` | Reduce column dimension, paginate columns, or redesign |
| Measures `>5` | Metric switch, column settings, split, or dedicated analysis page |

When `totalDataColumnW > dataW`, horizontal scroll is required and row dimension columns stay frozen. Grand-total column may freeze right only in large blocks; in small blocks it consumes too much width.

### Subtotal, Grand Total, And Aggregation

- Subtotal rows default to group end; group-start subtotal is allowed only when it matches the business reading habit.
- Grand-total row sits at bottom. It may freeze bottom in large blocks; it should not freeze in tiny blocks if it steals body height.
- Grand-total column sits at right. It may freeze right in large blocks when it does not collapse the data body.
- Supported aggregation: `sum`, `avg`, `count`, `max`, `min`, optional `median`, and declared custom formulas.
- Rate metrics recompute from source components, for example:

```text
completionRate = sum(actual) / sum(target)
conversionRate = sum(convertedUsers) / sum(visitedUsers)
avgOrderValue = sum(amount) / sum(orderCount)
```

Never subtotal percentages by simple sum. Do not average percentages unless the business口径 explicitly says unweighted average.

### Conditional Formatting

Use conditional formatting only when it helps users locate high, low, abnormal, not-target, or changing cells.

Allowed default encodings:

- Light heat background for one core measure.
- In-cell data bar for same-column comparison.
- Status tag for attainment/exception.
- Positive/negative color for YoY/MoM.

Limits:

- Default `1-2` formatted measures.
- Do not color the whole table with unrelated palettes.
- Color is secondary; right-aligned exact values remain primary.

### Tooltip And Drilldown

Cell tooltip should expose:

```text
row path, column path, measure, exact value + unit,
row share, column share, subtotal/grand-total context,
YoY/MoM when present, aggregation function,
formula or numerator/denominator for rates,
period, source, permission or data-quality note
```

Cell click may select, link sibling components, open Detail Table drilldown, or open a formula/detail drawer. Row dimension click may expand/collapse, select a row, or drill down. Header click may sort or show definition, but report display mode should not expose heavy Excel-like field operations.

### Responsive And State Rules

| Condition | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | Title, single dropdown metric filter, row dimension, core `2-3` columns, compact row height, frozen row dimension; hide subtitle, metric strip, footer, low-priority measures |
| `360 <= W < 720` and `H >= 300px` | Title/filter, optional metrics, row dimension, core measures, totals, horizontal scroll, fixed row dimension |
| `W >= 720` and `H >= 420px` | Full structure, multi-level rows/columns, `3-5` measures, fixed headers, frozen row dimension, optional total freeze, expand/collapse, conditional formatting |
| Loading | Preserve header and show row/column grid skeleton |
| Empty | `暂无数据` centered in pivot body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action when supported |
| No permission | Permission message in pivot body; no leaked cells |
| Missing cell | `--`; tooltip/source note when needed |
| Real zero | `0` with normal numeric formatting |
| Missing row dimension | `未分类` |
| Missing column dimension | `未分组` |
| Aggregation error | Tooltip/detail explains口径异常; do not silently calculate |
