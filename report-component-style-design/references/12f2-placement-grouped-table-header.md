# Grouped Table Header Placement Algorithm
This file was split from `12f-placement-composite-tables.md`. Load it only when this exact component family is present; use `12f-placement-composite-tables.md` as the routing index.


Use this for complex table headers, multi-level headers, grouped table headers, metric matrices, financial grids, wide comparison tables, and the header bands inside Detail Tables or Pivot Tables. A grouped header organizes column relationships; it must not become a heavy field-configuration surface.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown; affects the whole current table only |
| Subtitle/unit/freshness | Optional | Under title; global unit, period,口径, source, or update time |
| Metric strip | Optional | At most `3`: total, attainment, exception count, max item, row count, column count |
| Header group rows | Yes | Parent groups such as sales data, target data, change data |
| Leaf header row | Yes | Real data fields; owns sort/filter/definition icons |
| Row-dimension header | Optional | Left top corner; spans header depth when row dimension/primary column is fixed |
| Header unit/subtext | Optional | Short unit or口径 under leaf title |
| Sort/filter icons | Optional | Leaf headers only by default |
| Data body | Yes | The body keeps priority over header height |
| Tooltip | Recommended | Header definition, group explanation, exact cell path/value |
| State mask | Yes | Loading, empty, filter-empty, error, no-permission |

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Width-tier padding:

| Width | P |
| --- | ---: |
| `<320px` | `12px` |
| `320-480px` | `16px` |
| `480-720px` | `20px` |
| `>=720px` | `24px` |

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px

tableAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless search/column tools are required
paginationH = 32-40px when paginated
footerH = 0px or 20px
```

Grouped headers consume vertical space, so protect body rows first. If body rows fail, reduce optional elements in this order: footer, secondary metric items, subtitle, toolbar text, secondary local filters, low-priority columns, header subtext, then header depth.

### Header Depth And Height

```text
headerLevel = L
headerRowH = 32-40px, default 36px
headerH = L * headerRowH

if a header row contains unit/subtext:
  headerRowH += 4-8px
```

Recommended totals:

| Header depth | Total header height |
| ---: | ---: |
| `1` | `36-44px` |
| `2` | `64-80px` |
| `3` | `96-116px` |
| `4` | Not recommended; collapse or restructure |
| `>4` | Do not show in report display mode |

Table geometry:

```text
tableX = P
tableY = P + titleAreaH + metricH + toolbarH + topGaps
tableW = CW
tableH = H - P - paginationH - footerH - tableY

bodyH = tableH - headerH - summaryRowH
visibleRowCount = floor(bodyH / rowH)
```

Acceptance:

- `visibleRowCount >= 4` for grouped analytical tables by default.
- `visibleRowCount < 3` fails unless the table is a named tiny preview with a detail/fullscreen route.
- If depth `3` plus pagination leaves too little body, use compact rows, collapse groups, remove subtext, or enlarge/split the block.

### Column Tree Contract

Represent grouped headers as a column tree:

```ts
type ColumnNode = {
  id: string;
  title: string;
  field?: string; // required for leaf columns
  children?: ColumnNode[];
  unit?: string;
  definition?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  priority?: number;
  fixed?: 'left' | 'right';
};
```

Rules:

- Parent nodes describe groups only; leaf nodes own data fields, formatting, sort, filter, and tooltip payload.
- Group labels must be business groups, not arbitrary visual buckets.
- Do not create a grouped header for `4-5` unrelated simple fields.
- If fields naturally group or visible leaf columns exceed `8`, grouped headers are the default; a flat header needs an explicit exception.

### Span Calculation

Given `maxDepth`:

```text
if node has visible children:
  colSpan = sum(leaf descendants)
  rowSpan = 1
else:
  colSpan = 1
  rowSpan = maxDepth - currentDepth + 1
```

Width:

```text
leafColumnW = clamp(minW, contentTextW + paddingX * 2, maxW)
groupHeaderW = sum(visible child leafColumnW)
groupHeaderX = first visible child leaf X
groupTitleCenterX = groupHeaderX + groupHeaderW / 2
```

Do not fake `colSpan`/`rowSpan` with absolutely positioned labels over a flat table. Use Element Plus/project table grouped columns or S2/project analytical header behavior so scroll, fixed columns, hover, tooltip, keyboard focus, and state geometry stay aligned.

### Column Widths And Alignment

| Column type | Width | Alignment |
| --- | ---: | --- |
| Row number | `44-56px` | center |
| Checkbox | `40-48px` | center |
| Row dimension / primary object | `140-260px` | left |
| Normal text | `100-160px` | left |
| Numeric | `96-140px` | right |
| Percent/rate | `80-120px` | right |
| Time | `120-180px` | left or right |
| Status | `80-120px` | center or left |
| Actions | `80-120px` | right |

```text
totalTableW = sum(visible leafColumnW)
```

If `totalTableW <= tableW`, distribute extra width only to declared flexible text/primary columns. Do not stretch numeric, percent, status, or action columns excessively.

If `totalTableW > tableW`, enable horizontal scroll. Freeze left row-dimension/primary columns, and freeze right action columns only when the action workflow is real.

### Header Text And Icons

Typography:

- Table title `14-16px`, weight `600`, line-height `20-24px`.
- Subtitle `12px`, weight `400`, line-height `16-18px`.
- Parent group header `12-13px`, weight `600`, line-height `16-18px`.
- Leaf header `12px`, weight `500/600`, line-height `16-18px`.
- Tertiary header or subtext `11-12px`, weight `500` for tertiary title and `400` for subtext.
- Body cell `12-13px`, line-height `18-20px`.

Spacing:

```text
headerCellPaddingX = 8-12px
headerCellPaddingY = 6-8px
headerTextIconGap = 4px
headerIconGap = 2-4px
subtextGap = 2-4px
```

Definition icon:

- `iconSize = 12-14px`.
- Core metric definitions may be always visible.
- Secondary metric definitions appear on hover/focus.
- Missing definitions hide the icon rather than showing an empty tooltip.

Sort/filter:

- Sort appears only on sortable leaf headers such as numeric, percent, time, ranking, or totals.
- Header filter appears only on filterable leaf headers such as status, category, region, or owner.
- Parent group headers do not sort by default.
- If both sort and filter exist and width fails, collapse to a more/menu icon.

### Component-Local Filter Vs Header Filter

Component-local filters affect the whole current table, for example metric, period, display mode, or exception state.

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding * 2
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - min(filterW, filterMaxW)
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - min(filterW, filterMaxW) - 12px
```

If `filterW > filterMaxW`, collapse to a single dropdown capsule such as `销售额 ▾`. Do not add a new filter row before protecting body height; grouped headers already consume height.

Header filters affect one leaf column and use small icons beside the leaf label. Do not render every header as a capsule button.

### Fixed Header And Fixed Columns

- When the body scrolls vertically, the whole grouped header band is fixed: parent rows, leaf rows, units, and the top-left row-dimension header.
- When data scrolls horizontally, the left row-dimension/primary columns are fixed and the top-left header area is fixed with them.
- The top grouped header, left fixed area, and body scroll positions must remain synchronized.
- A right fixed action column is optional and should be avoided in dense grouped-header tables unless row actions are required.

### Visual Treatment

- Parent group header background is slightly stronger than leaf header background.
- Leaf header background is close to body surface.
- Use weak `1px` horizontal dividers and optional weak vertical dividers for merged cells.
- Avoid strong color blocks, thick borders, heavy shadows, or header colors that overpower the data body.
- Totals/subtotals may use light background and slightly stronger weight, but should not dominate all data.

### Hover, Collapse, Tooltip, And States

Hover:

- Leaf header hover lightly highlights the leaf column and parent group.
- Group header hover lightly highlights all visible child columns and may weaken unrelated groups.
- Hover/focus may reveal definition, sort, or filter icons without changing cell size.

Collapse:

- Use group collapse when leaf columns exceed `12` or metric groups exceed `4`.
- Collapsed group keeps the group title and optional key summary column.
- Groups `2-4` are clearest; `5-6` needs collapse or large span; `>6` should split or tab.

Tooltip:

```text
tooltipMinW = 180px
tooltipMaxW = 340px
tooltipPadding = 8-12px
tooltipFont = 12px
tooltipLineH = 18px
```

- Header tooltip exposes field, unit, definition, formula, aggregation, period/freshness, and source when available.
- Group tooltip explains included child metrics and shared period/口径.
- Cell tooltip exposes full row path, column path, measure, exact value, unit, formula, comparison values, period, source, and permission/quality note when relevant.

States:

| State | Behavior |
| --- | --- |
| Loading | Skeleton for title/filter/metric strip, grouped header, and body rows |
| Empty | Keep header when useful; `暂无数据` centered in body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action |
| No permission | Permission message in body; no leaked cells |
| Missing leaf field | Hide the column or show field key only as a documented fallback |
| Long header | One-line ellipsis plus tooltip |
| Too many columns | Horizontal scroll, group collapse, column settings, split, pivot, or fullscreen |
| Missing cell | `--`; real zero remains `0` |

### Responsive Rules

| Condition | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | Title, single dropdown filter, core `3-4` columns, max `2` header levels, compact rows; hide subtitle, metric strip, header subtext, low-priority columns, and footer |
| `360 <= W < 720` and `H >= 300px` | Title/filter, optional metrics, `2-3` header levels, fixed left row dimension, horizontal scroll, definition icons on demand |
| `W >= 720` and `H >= 420px` | Full structure, `2-3` header levels, up to `3` metric-strip items, fixed header/left column, group collapse when dense |

Density thresholds:

| Scale | Behavior |
| --- | --- |
| Leaf columns `<=8` | Full display |
| Leaf columns `9-16` | Horizontal scroll if widths fail |
| Leaf columns `17-30` | Freeze key column and support scroll/column settings |
| Leaf columns `31-50` | Collapse groups or use column settings |
| Leaf columns `>50` | Redesign, pivot, paginate columns, or use configuration view |
| Header depth `4` | Collapse, split, fullscreen, or redesign |
| Header depth `>4` | Not accepted in report display mode |
