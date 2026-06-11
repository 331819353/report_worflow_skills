# Composite Panel And Table Placement Algorithms

This file was split from `12-internal-placement-algorithms.md`. Load it only when the matching component family is present.

## Composite Panel Placement Algorithm

Use this for multi-component analysis cards where one report component container combines several child components into one decision unit. A Composite Panel is not a whole dashboard and is not the same as a Combo Chart. It is a single block that lets the user read one small analysis loop:

```text
summary -> main trend/structure -> contribution/exception -> brief detail/action
```

Valid examples:

- KPI strip + line chart.
- KPI strip + target/actual bar chart + short exception table.
- Main trend chart + Top list.
- Target attainment gauge + target/actual bar chart + variance list.
- Main chart + auxiliary composition chart.

Reject a Composite Panel when:

- Only one metric or one chart is needed.
- Child components answer different business questions.
- Every child needs its own full title, filter, action, or drilldown path.
- The component would need more than four visible analytical child components in a normal report card.
- The user expects a freeform dashboard canvas or drag-and-drop layout.
- The child components are only placed together for visual richness.

### Required Contract

Implementation-ready Composite Panels declare `compositePanelContract` or an equivalent local structure:

```ts
type CompositeChildRole =
  | 'primary-metric'
  | 'main-visual'
  | 'auxiliary-visual'
  | 'top-list'
  | 'detail-preview'
  | 'insight'
  | 'legend'
  | 'state';

type CompositePanelContract = {
  topic: string;
  analysisSequence: Array<'summary' | 'trend' | 'structure' | 'contribution' | 'exception' | 'detail' | 'action'>;
  layoutPattern: 'metric-main' | 'main-side' | 'main-detail' | 'main-two-side' | 'two-by-two' | 'metric-main-side';
  primaryChildId: string;
  children: Array<{
    id: string;
    role: CompositeChildRole;
    visualType: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    minW: number;
    minH: number;
    title?: string;
    datasetId?: string;
    unit?: string;
    localFilterScope?: 'panel' | 'child-only';
  }>;
  sharedLocalFilters?: string[];
  childLocalFilterException?: string;
  sharedLegend?: boolean;
  sharedUnit?: string;
  linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
  detailRoute?: string;
  responsiveFallback: string[];
  stateRules: string[];
};
```

### Anatomy

| Element | Required | Placement |
| --- | ---: | --- |
| Panel title | Yes | Top-left; names the business analysis topic |
| Panel local filter | Optional | Top-right capsule/dropdown; affects the whole panel by default |
| Subtitle/unit/source | Optional | Under title, weak text |
| Metric strip | Recommended | Under header; max `3` metrics |
| Main child | Yes | Largest body region, primary reading anchor |
| Auxiliary child | Optional | Right side or bottom, weaker than main child |
| Detail preview | Optional | Bottom or side; `3-6` rows and `3-5` columns |
| Shared legend | Optional | Main visual top/right or content top/right |
| Tooltip | Yes | Child tooltip by default; composite insight on click or selected state |
| Definition/source/freshness | Optional | Subtitle, footer, or tooltip |
| Loading/empty/error/no-permission states | Yes | Parent or affected child scope |

The title should say `销售经营分析`, `渠道表现诊断`, or `风险监控概览`. Do not title the panel `销售额趋势 + 品类占比 + Top 商品`; that is a list of tools, not the shared question.

### Coordinate System

```text
W = container width
H = container height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2P
CH = H - 2P
componentGap = clamp(8px, W * 0.015, 20px)
```

Width tiers:

| Container width | Padding |
| ---: | ---: |
| `W < 320px` | `12px` |
| `320px <= W < 480px` | `16px` |
| `480px <= W < 720px` | `20px` |
| `W >= 720px` | `24px` |

### Header And Local Filter

Composite Panels use one panel-level local filter group by default:

- Suitable: period, metric, actual/target/attainment, all/exception/unreached, amount/count/share, day/week/month.
- Unsuitable: region + channel + category + store + user type + time + status. Put complex filters in the page/global filter surface.
- Child-level filters are discouraged. If required, allow at most one child-only filter; it must be visually weaker, placed beside that child label, scoped to that child only, and disclosed in the tooltip or child label.

Filter sizing:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPaddingX * 2
filterMaxW = min(CW * 0.45, 280px)
```

When `filterW > filterMaxW`, collapse to a single capsule dropdown such as `本月 v`. Do not create a new filter row before trying this collapse.

Filter and title placement:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleX = P
titleY = P
titleMaxW = CW - filterW - 12px
```

Legends must not mix with filters. The title area owns filters; the main visual or content top owns shared legends.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-56px
toolbarH = 0-32px
footerH = 0-24px

contentY = P + titleAreaH + metricH + toolbarH + topGaps
contentX = P
contentW = CW
contentH = H - P - footerH - contentY
```

Default:

```text
titleAreaH = 44px
metricH = 0-48px
toolbarH = 0-24px
footerH = 0 or 20px
contentH >= CH * 0.60
```

If `contentH < CH * 0.60`, degrade in this order:

1. Hide footer/long notes.
2. Reduce metric strip to one or two metrics.
3. Collapse panel filter to dropdown.
4. Hide secondary legends and persistent labels.
5. Hide or collapse detail preview.
6. Hide auxiliary child.
7. Keep only P1 metric/main visual.

### Child Priority And Count

Recommended child count:

| Visible analytical children | Rule |
| ---: | --- |
| `1` | Not a Composite Panel; use a normal component |
| `2` | Clearest default |
| `3` | Recommended upper default |
| `4` | Large-container maximum |
| `5+` | Split into separate blocks, tabs, drawer, or dashboard sections |

Priority:

```text
P1 = primary metric or main visual
P2 = key auxiliary visual
P3 = Top list or detail preview
P4 = definition, footer, update time, optional notes
```

Responsive shrink order is `P4 -> P3 -> P2 -> P1`.

### Child Minimum Sizes

| Child type | Min width | Min height |
| --- | ---: | ---: |
| Metric card | `120px` | `72px` |
| Line chart | `220px` | `140px` |
| Bar chart | `240px` | `160px` |
| Pie/donut | `180px` | `160px` |
| Top list | `140px` | `120px` |
| Detail preview | `240px` | `120px` |
| Heatmap | `240px` | `160px` |
| Map | `280px` | `220px` |
| Gauge | `180px` | `160px` |

If a child falls below its minimum, convert it to a metric summary, hide labels/legend, collapse it, or move it to a detail route. Do not render an unreadable miniature chart.

### Layout Pattern A: Metric Strip + Main Visual

Use for simple operating trends.

```text
metricH = clamp(36px, CH * 0.15, 56px)
mainX = contentX
mainY = contentY + metricH + componentGap
mainW = contentW
mainH = contentH - metricH - componentGap
```

Fit range: `W = 360-720px`, `H = 280-420px`.

### Layout Pattern B: Main Visual + Right Auxiliary

Use for trend plus Top list, small composition chart, or summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap

mainX = contentX
mainY = contentY
mainH = contentH

sideX = contentX + mainW + componentGap
sideY = contentY
sideH = contentH
```

Fit range: `W >= 640px`, `H >= 320px`. Main child should occupy `65-75%` of content width.

### Layout Pattern C: Main Visual + Bottom Detail

Use for trend plus exception list or brief evidence table.

```text
detailH = clamp(80px, contentH * 0.28, 140px)
mainH = contentH - detailH - componentGap

mainX = contentX
mainY = contentY
mainW = contentW

detailX = contentX
detailY = contentY + mainH + componentGap
detailW = contentW
```

Require:

```text
mainH >= contentH * 0.55
detail rows = 3-6
detail columns = 3-5
```

### Layout Pattern D: Main Visual + Two Side Cards

Use for main trend plus one composition and one Top/summary card.

```text
sideW = clamp(160px, contentW * 0.28, 260px)
mainW = contentW - sideW - componentGap
sideItemH = (contentH - componentGap) / 2
```

The two side items must be P2/P3 and visually weaker than the main child.

### Layout Pattern E: Two By Two Matrix

Use only in a large container when four child views are truly necessary.

```text
cellW = (contentW - componentGap) / 2
cellH = (contentH - componentGap) / 2
```

Requirements:

```text
W >= 720px
H >= 420px
one child remains visually primary
```

If the container is smaller, use a main/side or main/detail layout. Do not make four equal-weight mini charts.

### Layout Pattern F: Metric Strip + Main Visual + Right Insight

Use for large operating cockpit modules.

```text
metricRowH = clamp(48px, contentH * 0.18, 72px)
bottomH = contentH - metricRowH - componentGap

sideW = clamp(180px, contentW * 0.26, 280px)
mainW = contentW - sideW - componentGap
```

The metric strip summarizes the whole panel, not each child. Show at most `3` metrics in normal report cards.

### Metrics, Units, And Legends

Metric strip:

- Use total, change rate, target attainment, exception count, Top contribution, or average.
- Default maximum is `3` metrics.
- Small cards keep only `1-2` metrics.

Unit rules:

- Same unit across the panel: place it in the subtitle.
- Different child units: put primary unit in subtitle and child units near child label or axis.
- Do not repeat the unit beside every value.

Legend rules:

- If multiple child charts share series such as actual/target/YoY, use one shared legend.
- Place shared legend at the main visual top-right or content top-right.
- Never merge legend items into the local filter capsule.

Color rules:

- The same metric keeps the same color meaning across all children.
- Target/reference uses one consistent line/tick style.
- Exception/status colors follow the report semantic palette.
- Do not recolor the same metric differently in the main chart, auxiliary chart, and table.

### Text Rules

| Text | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Panel title | `14-16px` | `600` | `20-24px` |
| Subtitle | `12px` | `400` | `16-18px` |
| Filter text | `12px` | `400-500` | `16px` |
| Metric label | `11-12px` | `400` | `16px` |
| Metric value | `18-24px` | `600-700` | `22-28px` |
| Child label | `12-13px` | `500-600` | `16-18px` |
| Axis label | `11-12px` | `400` | `14-16px` |
| Legend | `12px` | `400` | `16-18px` |
| Table text | `12-13px` | `400` | `18-20px` |
| Tooltip | `12px` | `400` | `18px` |

### Linked Interaction

Hover on the main child may:

- Highlight the same category/time/object in auxiliary children.
- Update metric strip preview values.
- Highlight matching detail rows.
- Show a child tooltip.

Click selection may:

- Pin the selected category/time/object.
- Filter or highlight auxiliary child content.
- Show a composite insight panel or update detail preview.

Click selection must have a clear exit:

- Click the selected item again.
- Click blank space.
- Use a visible reset/clear selection control when the selected state persists.

Default tooltip behavior:

- Hover shows child tooltip only.
- Click or selected state may show composite insight.
- Avoid long hover tooltips that list every child value.

### Responsive Rules

| Size | Rule |
| --- | --- |
| `W < 360px` or `H < 280px` | Keep title, single dropdown filter, core metric, and one main visual. Hide subtitle, auxiliary child, detail preview, shared legend, and footer. |
| `360px <= W < 720px`, `H >= 320px` | Use vertical layout. Keep title/filter, metric strip, main child, and one auxiliary child. Hide complex detail and secondary notes. |
| `W >= 720px`, `H >= 420px` | Full structure can show `3-4` child components, main/side layouts, shared legend, and detail preview. |
| `W >= 960px`, `H >= 540px` | Metric strip + main visual + right auxiliary + bottom detail can be used, but child count still needs a clear primary visual and should not exceed `5` even in exceptional large modules. |

### State Rules

| State | Behavior |
| --- | --- |
| Loading | Skeleton preserves title/filter, metric strip, main child, auxiliary child, and detail preview geometry |
| Empty all children | Show one parent-level empty state over the panel body |
| Partial child empty | Show a child-local empty state covering that child label/control plus body |
| Error all children | Parent-level error with retry when supported |
| Partial child error | Child-level error with local retry or link to detail |
| Filter empty | `当前筛选无结果`, with reset path when supported |
| Too many children | Auto-collapse P4/P3/P2 or split into separate blocks |
| Container too small | Keep P1 metric/main visual only |
| Unit mismatch | Child-level unit near label/axis plus exact unit in tooltip |
| Linked selection no match | Affected child shows `无匹配数据` without clearing the selected context silently |
| No permission | Only unauthorized child shows permission state unless the whole panel is unauthorized |

### Default Specification

```text
recommendedW = 640-960px
recommendedH = 360-560px
minW = 320px
minH = 260px
defaultChildCount = 2-3
maxRecommendedChildCount = 4
P = 16-20px
titleAreaH = 44px
filterH = 28px
metricH = 40-56px
componentGap = 12-16px
contentH >= CH * 0.60
mainVisualWeight = 50-70%
auxiliaryWeight = 20-35%
detailH = 80-140px
metricCount <= 3
mainVisualCount = 1
auxiliaryVisualCount <= 2
detailRows <= 6
```

### Acceptance Checks

- The panel has one business topic and one analysis sequence; it is not a bag of unrelated widgets.
- One child is visibly primary and owns the largest area or strongest value hierarchy.
- Child count defaults to `2-3`, stays `<=4` for normal cards, and has a split/tab/fullscreen reason when larger.
- Panel-level local filters affect the whole panel by default. Any child-only filter is labeled, weak, and scoped.
- `contentH >= CH * 0.60`, or fallback removes footer, metrics, filters, detail, and auxiliary children before shrinking P1.
- Every child satisfies its minimum viewport or is collapsed/replaced by summary/detail route.
- Shared legends and shared units are not duplicated inside every child.
- Detail preview uses `3-6` rows and `3-5` columns, with a `查看全部` or drilldown route when more detail is needed.
- Hover/click linkage preserves active filter, selected category/object, tooltip, detail, and export context.
- Loading, empty, error, no-permission, partial-data, and filter-empty states use correct parent vs child scope.

## Grouped Table Header Placement Algorithm

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

## Pivot Table Placement Algorithm

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

## Detail Table Placement Algorithm

Use this for row-level record tables such as order lists, customer lists, product/store details, transaction records, tickets, budget rows, metric details, anomaly evidence, and audit records. A Detail Table is for lookup, comparison, status location, row detail, and light action; it is not a place to expose every source-table field at once.

### Anatomy

| Slot | Required | Placement rule |
| --- | --- | --- |
| Title | Yes | Top-left or block-owned title |
| Component-local filter | Optional | Title-right capsule/dropdown, affects only this table's already loaded bounded data |
| Subtitle/unit/freshness | Optional | Under title; states period, scope, source, update time, or default sort |
| Metric strip | Optional | At most `3` values: total count, selected count, sum, anomaly count, average, completion |
| Search/tool area | Optional | Compact top-right or icon; never competes with filter/header |
| Table header | Yes | Top of table; fixed when body scrolls |
| Table body | Yes | Row viewport with stable row height |
| Primary key column | Recommended | Left side, frozen when horizontal scroll is needed |
| Status column | Optional | Lightweight badge or icon+text |
| Operation column | Optional | Right side, fixed only when row action is required |
| Summary row | Optional | Bottom of table body or above pagination |
| Pagination/load-more | Optional | Bottom-right; total/summary bottom-left |
| Tooltip/detail drawer | Recommended | Full long text, formula/threshold, row evidence |
| State mask | Yes | Loading, empty, error, filter-empty, no-permission |

### Container Variables

```text
W = component outer width
H = component outer height
P = clamp(12px, W * 0.04, 24px)
CW = W - 2 * P
CH = H - 2 * P
```

Width tier padding:

| Width | P |
| --- | ---: |
| `<320px` | `12px` |
| `320-480px` | `16px` |
| `480-720px` | `20px` |
| `>=720px` | `24px` |

Recommended size:

- Default `W = 560-960px`, `H = 360-560px`.
- Minimum `W = 280px`, `H = 220px` only for compact preview.
- Small `W < 360px` or `H < 260px` keeps title, collapsed filter, core `3-4` columns, compact rows, body, and simple previous/next pagination.

### Vertical Budget

```text
titleAreaH = 36-56px
metricH = 0-48px
toolbarH = 0-36px
paginationH = 0-40px
footerH = 0-24px
tableBodyAreaH = CH - titleAreaH - metricH - toolbarH - paginationH - footerH - gaps
require tableBodyAreaH >= CH * 0.55
```

Default:

```text
titleAreaH = 44px
metricH = 0-40px
toolbarH = 0px unless search/tooling is truly needed
paginationH = 32-40px when paginated
footerH = 0px or 20px
```

If `tableBodyAreaH` fails:

1. Hide footer/source row or move it to tooltip/detail.
2. Reduce metric strip to the primary value or remove it.
3. Collapse local filter to one dropdown capsule.
4. Collapse search to an icon.
5. Simplify pagination to previous/next or hide it for a small bounded preview.
6. Switch to compact row height.
7. Hide low-priority columns or move them to row drawer/column settings.
8. Enlarge/split the table before accepting fewer than `3` visible rows.

### Header, Filter, And Search

```text
titleX = P
titleY = P
titleLineH = 22-24px
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + outerPadding
filterMaxW = min(CW * 0.45, 280px)
filterX = W - P - min(filterW, filterMaxW)
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - min(filterW, filterMaxW) - 12px
```

Component-local filter:

- Suitable: `全部 / 异常 / 正常`, `待处理 / 已完成`, `今日 / 本周 / 本月`, `订单 / 退款 / 售后`, `Top / 全部 / 低表现`.
- Unsuitable: large region/channel/category/person/status/time/amount-range combinations that change query scope, export scope, pagination, permission, or table schema.
- If `filterW > filterMaxW`, collapse to a dropdown such as `异常 ▾`.
- Keep filter, search, column settings, export, and operation tools separated. Do not put capsule filter, search box, export, column settings, and more menu all in the title-right zone.

Search:

```text
searchH = 28-32px
searchW = 160-240px
```

- Standard/large tables may place compact search above/right of the table.
- Small tables collapse search to an icon.
- If title-right space is limited, preserve the local status filter and collapse search/tools first.

### Metric Strip

Metric strip is optional and capped at `3` items.

```text
metricX = P
metricY = P + titleAreaH + 8px
metricW = CW
metricH = 36-48px
metricGap = clamp(12px, CW * 0.04, 24px)
metricItemW = (CW - metricGap * (metricCount - 1)) / metricCount
```

Recommended items:

- Total count such as `总订单 12,846`.
- Sum such as `金额 1234万`.
- Exception count such as `异常 26`.
- Selection state such as `已选 12` when selection exists.

### Table Area

```text
tableX = P
tableY = P + titleAreaH + metricH + toolbarH + topGaps
tableW = CW
tableH = H - P - paginationH - footerH - tableY
headerH = 36-44px
summaryRowH = hasSummary ? 36-44px : 0
bodyH = tableH - headerH - summaryRowH
```

Row density:

```text
compactRowH = 32-36px
standardRowH = 40-44px
relaxedRowH = 48-56px
rowH = 40px by default
visibleRowCount = floor(bodyH / rowH)
```

Acceptance:

- Detail Tables should show at least `4-6` rows by default.
- `visibleRowCount < 3` fails except for intentionally tiny previews with a visible detail route.
- Row height is stable. Two-line primary/secondary content requires `rowH >= 48px`.
- Loading skeleton rows, empty messages, and error states preserve the same table/header geometry.

### Column Width And Alignment

Default column widths:

| Column type | Width | Alignment |
| --- | ---: | --- |
| Row number | `44-56px` | center |
| Checkbox | `40-48px` | center |
| Primary key / object | `140-220px` | left |
| Normal text | `100-160px` | left |
| Short text | `72-100px` | left or center |
| Numeric | `96-140px` | right |
| Percent | `80-120px` | right |
| Status | `80-120px` | center or left |
| Time | `140-180px` | left or right |
| Actions | `80-120px` | right |

```text
totalColumnW = sum(columnW)
minColumnW = 72px
minPrimaryColumnW = 120px
minActionColumnW = 72px
```

If `totalColumnW <= tableW`:

```text
extraW = tableW - totalColumnW
flexColumnW = baseW + extraW * flexWeight / totalFlexWeight
```

- Assign flex only to primary/text columns.
- Do not over-stretch numeric, status, time, or operation columns.

If `totalColumnW > tableW`:

- Enable horizontal scroll.
- Freeze the primary key/object column.
- Freeze the right operation column only when actions are required.
- Hide low-priority columns or expose column settings when column count exceeds budget.

Column count:

| Visible columns | Behavior |
| ---: | --- |
| `<=6` | Full display |
| `7-10` | Full display if widths pass |
| `11-16` | Horizontal scroll + frozen primary column |
| `>16` | Hide low-priority columns + column settings |
| `>24` | Group, split, drawer/detail page, or redesign |

### Header, Cells, And Status

Header:

- `headerH = 36-44px`, default `40px`.
- Header text `12px`, weight `500/600`, line height `16-18px`, weak background, and bottom divider.
- Header alignment follows the cell alignment.
- Sorting icons are `12-14px`, `4px` from header text, and appear only on sortable columns.
- Default sort is required: latest time desc, amount desc, exception first, low completion first, or another named business order.

Cells:

- `cellPaddingX = 12-16px`; compact `8-12px`; relaxed `16-20px`.
- Text cells are left-aligned, single-line, ellipsized, and reveal full content in tooltip.
- Numeric, amount, count, percent, completion, YoY/MoM, and variance cells are right-aligned with tabular numerals and consistent precision.
- Ordinary amount/count values remain neutral; use color only for change direction, abnormal status, failed target, risk, or warning.
- Missing fields show `--`; real zero stays `0`.

Status:

```text
statusTagH = 20-24px
statusTagPaddingX = 8-10px
statusFont = 11-12px
statusRadius = 999px or 4-6px
```

- Normal/success, processing/info, warning/error, and disabled statuses use weak backgrounds plus text/icon.
- Exception rows may use a fine left line or light background. Do not make whole rows strong red.

Operations:

- Keep only the key operation such as `查看`, `详情`, or `处理`.
- More than `2` actions become `1` primary action + `更多`.
- Operation column width stays stable and actions do not wrap.

### Pagination, Summary, And Selection

Pagination:

```text
paginationH = 32-40px
paginationX = tableX + tableW - paginationW
paginationY = tableY + tableH + 8px
```

- `<=50` rows may use table-body scroll without pagination.
- `51-500` rows normally paginate.
- `500+` rows use pagination or virtual scroll.
- Realtime streams use load-more or virtual scroll.
- Compact containers show previous/next instead of full page numbers.

Summary:

- Summary row height is `36-44px`.
- Numeric summaries right-align; text columns show `合计`; non-summary cells stay empty.
- Complex statistics move to the metric strip or detail drawer.

Selection:

- Checkbox column appears only for batch action, batch export, assignment, or linked analysis.
- Selected state shows selected count and optional batch actions without taking over the header.

### Tooltip And Row Detail

Tooltip:

```text
tooltipMinW = 160px
tooltipMaxW = 320px
tooltipPadding = 8-12px
tooltipFont = 12px
tooltipLineH = 18px
```

- Use for long primary keys, names, addresses, remarks, exception reasons, formulas, thresholds, and status rules.
- Tooltip flips away from card boundaries and must not be clipped by table/body overflow.

Row detail:

- Row click may open drawer/detail, select row, or link sibling components only when the event contract exists.
- If the whole row is clickable, cursor/focus state is clear and action-column clicks do not double-trigger row click.
- Expand row is optional for extra row evidence such as child tasks or approval history, not a workaround for unlimited visible columns.

### Responsive And States

| State / size | Behavior |
| --- | --- |
| `W < 360px` or `H < 260px` | title, single dropdown filter, core `3-4` columns, compact rows `32-36px`, simple previous/next; hide subtitle, metrics, toolbar, low-priority columns, footer |
| Standard `360 <= W < 720`, `H >= 300px` | title/filter, optional metrics, core `5-7` columns, fixed header, optional frozen primary column, pagination |
| Large `W >= 720`, `H >= 420px` | full structure, `8-12` columns, up to `3` metrics, search, frozen primary/action columns, pagination or virtual scroll |
| Loading | Preserve table header and show several row skeletons |
| Empty | `暂无数据` centered in table body |
| Filter-empty | `当前筛选无结果` with reset path when supported |
| Error | `数据获取失败` plus retry/action when supported |
| No permission | Hide or disable forbidden operations; body state explains permission |
| Field missing | Cell shows `--` and tooltip/source note when needed |
| Text too long | Single-line ellipsis plus tooltip |
| Columns too many | Horizontal scroll, low-priority hidden columns, column settings, or detail drawer |

## Acceptance Checks

- A placement chapter exists for the component.
- Every visible element has a slot rectangle, alignment, and responsive fallback.
- The main visual anchor is named and actually centered in the intended zone.
- Component-internal local filters are scoped to the current component, use capsule for `2-4` short options, collapse to dropdown when options/space exceed budget, and never overlay the value, plot, legend, axis, table header, or state message.
- Analysis & Insight components declare `analysisInsightContract` or equivalent metadata, keep one card to one main point, show conclusion before evidence, include action/trust/definition/source when relevant, stay within subtype copy budgets, and do not use vague insight copy, full-card red alerts, decorative icons, or essay-like explanations.
- Composite Panels declare `compositePanelContract` or equivalent metadata with one business topic, analysis sequence, layout pattern, primary child id, child roles/priorities/min sizes, shared local filters, shared legend/unit behavior, linked interaction, responsive fallback, and parent/child state rules.
- Composite Panels keep one visible primary child, default to `2-3` children and normal maximum `4`, allocate the primary child `50-70%` visual weight, preserve `contentH >= CH * 0.60`, and collapse P4/P3/P2 before shrinking P1 below its minimum viewport.
- Composite Panels separate panel-level local filters, child-only filter exceptions, shared legends, units, tooltips, and detail routes; they do not become equal-weight mini dashboards, nested-card stacks, or unrelated component collages.
- Grouped Table Headers declare a `columnTree` or equivalent grouped-column metadata, with parent groups, leaf fields, unit/definition metadata, sort/filter availability, width/alignment, priority, and fixed behavior before rendering.
- Grouped Table Headers compute `colSpan` from visible leaf descendants and `rowSpan` from `maxDepth`; parent group width equals the sum of visible leaf widths, and merged headers are implemented through the table/S2 header model rather than absolute text overlays.
- Grouped Table Headers keep depth `<=3` by default, preserve at least `4` useful body rows, fix the whole multi-level header when the body scrolls, freeze row-dimension/primary columns when horizontal scroll exists, and distinguish component-local filters from per-column header filters.
- Grouped Table Header density follows thresholds: visible leaf columns `<=8` display directly, `9-16` may scroll, `17-30` need frozen key columns and column settings, `31-50` need group collapse or settings, and `>50` requires redesign, pivot, column paging, or configuration view.
- Pivot Tables declare row dimensions, column dimensions, measures, aggregation grain, measure formulas/functions, subtotal/grand-total rules, row/column hierarchy depth, sort rules, fixed header/frozen row dimension behavior, local filter scope, tooltip/drilldown payload, and S2/project analytical-table renderer choice before rendering.
- Pivot Tables preserve `pivotAreaH >= CH * 0.55`, row headers, column headers, measure headers, body cells, subtotals, grand totals, pagination/scroll, tooltips, and loading/empty/error/no-permission states in reserved zones.
- Pivot Table measures default to `1-3` visible and `<=5` maximum; rows/columns follow density fallbacks, time columns keep natural order, percentage/rate totals recompute from numerator/denominator, conditional formatting is limited to `1-2` core measures, and exact path/formula values remain available through tooltip/drilldown/export.
- Detail Tables declare row grain, primary key, default sort, column metadata, local/global filter behavior, search/sort/pagination/export scope, and row-detail/action contract before rendering.
- Detail Tables preserve `tableBodyAreaH >= CH * 0.55`, stable header/body/pagination zones, fixed header when body scrolls, `visibleRowCount >= 4-6` by default and never `<3` except for an intentional preview with a detail route.
- Detail Table columns follow type-specific widths and alignment: primary/text left, numeric/percent right, status centered or left, operation right; visible columns default to `5-8`, `8-12` only in large blocks, and excess columns use horizontal scroll, frozen primary/action columns, column settings, drawer/detail, or split.
- Detail Table filters, metric strip, search/tools, header, body rows, summary row, pagination, status tags, operation column, tooltips, row hover/selection, and loading/empty/error/no-permission states stay in reserved zones; hidden long text, formulas, thresholds, source/freshness, permissions, and row evidence remain available through tooltip/detail/export.
- KPI/metric card value plus unit is centered as one group when the component is a metric card.
- Target/actual bar charts choose a target encoding that matches the data shape: unified target line, category target tick, or grouped target bar.
- Bar chart plot geometry reserves title, metric strip, legend, y-axis label band, right target-label gap, x-axis label band, and optional footer before choosing `grid` and `barWidth`.
- X-axis labels align to category centers and have sampling/rotation/scroll fallback before collision occurs.
- Target labels, value labels, category labels, legend, and axis labels do not collide; hidden values remain available in tooltip.
- Line/area charts use ordered source row tuples, preserve sparse point centering, declare y-axis baseline/range behavior, and define point/label density strategy before rendering.
- Line/area reference lines, point labels, x-axis labels, legend, and tooltip do not collide or imply unsupported precision; hidden point values remain available in tooltip.
- Combo charts declare a paired business relationship, primary bar metric, secondary line/target metric, shared category/time grain, left/right y-axis unit mapping, total visible series count, dual-axis rationale when used, category density, local-filter scope, legend/filter separation, and split-chart fallback before rendering.
- Combo charts preserve `plotH >= CH * 0.48`, align bars, line points, target/reference marks, x-axis labels, tooltip guide, and click payloads to the same ordered category centers, keep bar series `<=2`, line series `<=2`, target/reference `<=2`, total visible series `<=4`, and use sampling/scroll/dataZoom or split when category labels exceed budget.
- Combo filters, metric strip, legend, axes, data labels, target/reference labels, tooltips, footer notes, and state messages stay in reserved zones; hidden exact values, units, target gaps, attainment, denominator-zero, missing values, period, source, and active local filter remain available in tooltip/detail.
- Pie/donut charts declare category count, TopN/`其他` merge rule, legend position, `legendBandHeight` or side legend width, label-line budget, center, radius, inner radius, center metric, and tooltip payload before rendering.
- Pie/donut charts keep category count `2-6` preferred and `<= 8` maximum before merging, do not plot negative values, do not fake all-zero shares, and use tooltip/table/bar fallback for exact comparison.
- Pie/donut legends, center text, outside labels, guide lines, local filters, metric strips, and state messages stay in separate reserved zones; hidden exact values remain available in tooltip/detail.
- Radar charts declare dimension count, series count, shared score scale, standardized raw-value handling, plot budget, radius, center, ring count, label gap, and label alignment before rendering.
- Radar charts preserve a circular coordinate system, keep dimensions `<= 10`, visible series `<= 3`, and never plot mixed raw units directly on one radius.
- Radar filters, legends, metric strips, dimension labels, value labels, and tooltips stay in separate reserved zones; hidden exact values remain available in tooltip/detail.
- Gauge charts declare one bounded metric, min/max, unit, current value, clamp/overflow behavior, status color business direction, gauge type, angle span, radius, arc width, center value/unit placement, tick density, target/threshold behavior when present, local filter placement, and tooltip payload before rendering.
- Gauge charts preserve `gaugeAreaH >= CH * 0.50`, keep semicircle/circle geometry aspect-safe, make the center value the primary visual anchor, keep threshold segments `3-4` preferred and `<=5`, hide optional ticks/labels before shrinking the value, and avoid pointer use except for monitoring/risk/load cases.
- Gauge filters, metric strips, legends, center value/unit, status labels, min/max labels, target markers, threshold labels, tooltips, footer notes, and state messages stay in reserved zones; hidden exact current value, range, target, gap, threshold/status, period, source, overflow, and denominator notes remain available in tooltip/detail.
- Scatter/bubble charts declare X/Y metrics and units, axis ranges, plot budget, point density strategy, point or bubble radius mapping, reference-line/quadrant behavior, label strategy, legend separation, and tooltip payload before rendering.
- Scatter/bubble charts preserve `plotHeight >= CH * 0.48`, draw points centered on mapped X/Y coordinates, keep visible zero baselines when negative values exist, and avoid all-point labels except in sparse cases.
- Scatter/bubble filters, legends, size legends, point labels, reference lines, quadrant labels, trend lines, and state messages stay in reserved zones; hidden exact values remain available in tooltip/detail.
- Parallel coordinates declare object/sample fields, `3-12` dimension fields, dimension order, per-axis range/unit/direction, independent-axis or standardized scaling rule, plot budget, axis spacing, sample count, line-opacity density strategy, highlight/group semantics, brush behavior when present, legend/filter separation, and tooltip payload before rendering.
- Parallel coordinates preserve `plotH >= CH * 0.48`, keep `axisGap >= 56px`, keep visible dimensions `3-8` by default and `<=12` with filtering/scroll, hide ordinary sample labels, lower opacity as sample count grows, and use sampling/aggregation/density mode when `N > 500`.
- Parallel coordinate filters, metrics, legends, axis titles, tick labels, brush handles, sample lines, highlight lines, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden exact object values, original units, standardization rules, axis direction, and brush ranges remain available in tooltip/detail.
- Map/geographic charts declare geography keys or coordinates, map resource/projection, fitBounds behavior, map viewport budget, type choice, legend strategy, label density, tooltip payload, and missing-geo handling before rendering.
- Map/geographic charts preserve `mapAreaH >= CH * 0.55`, use uniform geographic scaling, center the map in the viewport, and never stretch administrative shapes, routes, or coordinates independently on X/Y.
- Map/geographic filters, legends, metric strips, labels, zoom/reset controls, drilldown breadcrumbs, and state messages stay in reserved zones; hidden exact region/point/flow values remain available in tooltip/detail.
- Candlestick/K-line charts declare OHLC fields, time ordering, unit, market color convention, price range, candle/body width, main/volume/indicator height budgets, axis label sampling, crosshair/tooltip payload, and dataZoom behavior before rendering.
- Candlestick/K-line charts preserve `mainChartH >= CH * 0.45`, align volume bars and MA points to candle centers, keep volume/indicator subplots secondary, and avoid per-candle value labels except high/low/selected/hover.
- Candlestick/K-line filters, metric strip, legend, price axis, time axis, volume subplot, brush, crosshair labels, high/low markers, and state messages stay in reserved zones; hidden OHLC/volume/MA values remain available in tooltip/detail.
- Boxplot charts declare sample or precomputed statistical contract, Q1/median/Q3/IQR/whisker/outlier rule, sample-count thresholds, unit, axis range, category/group density, box/whisker geometry, outlier strategy, label strategy, and tooltip payload before rendering.
- Boxplot charts preserve `plotH >= CH * 0.50`, align boxes to category centers, keep grouped series within `S <= 3` and `N <= 8` unless scrolling/fallback is declared, and avoid full-stat labels on every category.
- Boxplot filters, metric strip, legend, axes, box bodies, median lines, whiskers, outliers, target lines, labels, and state messages stay in reserved zones; hidden five-number summaries and outlier details remain available in tooltip/detail.
- Matrix/time/calendar/correlation heatmaps declare row dimension, column dimension, value metric, aggregation grain, unit, color-scale type, visualMap range, missing-vs-zero encoding, row/column count, cell size, label sampling, value-label threshold, highlight rule, and tooltip payload before rendering.
- Matrix/time/calendar/correlation heatmaps preserve `matrixH >= CH * 0.45`, keep color as the primary mark, distinguish missing cells from zero cells, and use sequential/stepped/diverging color scales according to metric semantics.
- Heatmap labels, local filters, metric strip, visualMap, row labels, column labels, cell values, highlights, tooltip, footer, and state messages stay in reserved zones; hidden exact cell values remain available in tooltip/detail.
- Path/user/process path charts declare path task, step/node fields, directed transition fields, start node, end node, order/layer, metric basis, conversion/drop-off formulas, path depth, Top N rule, node/link counts, main-path strategy, branch strategy, path-width mapping, label strategy, legend/filter separation, component-local filter placement, tooltip payload, and aggregation/fallback before rendering.
- Path/user/process path charts preserve `pathAreaH >= CH * 0.52`, keep the main path centered on `mainPathY`, keep branches bounded and sorted by weight, stop arrows at target-node edges, and avoid all-branch/all-label rendering beyond readable path density.
- Path chart filters, metrics, legends, nodes, links, arrows, path labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden node/transition details remain available in tooltip/detail.
- Funnel charts declare ordered stage fields, stage order, metric basis/unit, shared population/cohort logic, entry/final values, entry share, stage conversion, drop value/rate, total conversion, stage density, label strategy, target/comparison behavior when present, local filter placement, tooltip payload, and fallback before rendering.
- Funnel charts preserve `funnelAreaH >= CH * 0.52`, keep stage labels, bars/funnel body, value/share labels, target ticks, and loss markers in reserved zones, keep `3-6` stages preferred and `>10` folded/scrolled or moved to table/path/Sankey, and highlight only max/key loss by default.
- Funnel filters, metrics, legends, stage labels, bars, values, conversion/loss markers, target markers, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden exact stage values, entry share, stage conversion, drop value/rate, total conversion, target/comparison, period, source, and denominator/cohort notes remain available in tooltip/detail.
- Sankey diagrams declare flow task, node fields, directed link fields with `source`/`target`/`value`, layer/stage order, metric basis/unit, node-value rule, loss/unknown handling, Top N/`其他`, node/link counts, flow-width mapping, label strategy, legend/filter separation, component-local filter placement, tooltip payload, and aggregation/fallback before rendering.
- Sankey diagrams preserve `sankeyAreaH >= CH * 0.55`, keep visible layers at `3-4` by default and `<=5` without drilldown, keep main flows dominant, merge or weaken long-tail ribbons, hide ordinary link labels, and reject negative values or unexplained disappearing flow.
- Sankey filters, metrics, legends, nodes, ribbons, labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden source-target exact value, source share, target share, total share, conversion/loss, period, source, and aggregation details remain available in tooltip/detail.
- Treemap/rectangular tree maps declare hierarchy fields, parent/leaf aggregation, non-negative additive area metric, optional color metric, total/parent share formulas, visible depth, Top N/`其他` aggregation, node count, minimum rectangle and label thresholds, color semantics, legend/filter separation, breadcrumb/drilldown behavior, tooltip payload, and table/bar/tree fallback before rendering.
- Treemap/rectangular tree maps preserve `treemapAreaH >= CH * 0.55`, keep area as the primary encoding, keep parent groups readable, hide labels inside rectangles below threshold, aggregate tiny leaves before they create visual noise, and never use negative/rate/score values directly as area.
- Treemap filters, metrics, breadcrumbs, legends, parent labels, child labels, rectangles, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden leaf/parent path, value, total share, parent share, color metric, and aggregation details remain available in tooltip/detail.
- Sunburst charts declare hierarchy fields or `children`, non-negative additive angle metric, optional color metric, total/parent share formulas, visible depth/ring count, Top N/`其他` aggregation, node count, sector angle mapping, center content, sector/label thresholds, color semantics, legend/filter separation, breadcrumb/drilldown behavior, tooltip payload, and Treemap/bar/table fallback before rendering.
- Sunburst charts preserve `sunburstAreaH >= CH * 0.55`, keep sector angle as the primary encoding, keep visible levels at `2-3` by default and `<= 4` without drilldown, keep `ringW >= 18px`, fit center text within `innerR * 1.5`, aggregate tiny sectors before they create visual noise, and never use negative/rate/score values directly as angle.
- Sunburst filters, metrics, breadcrumbs, legends, center text, rings, sector labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden full path, value, total share, parent share, color metric, rank, and aggregation details remain available in tooltip/detail.
- Tree/hierarchical tree charts declare hierarchy task, tree node fields, root node, parent-child fields or children array, depth/layer, visible depth, default expanded levels, node count, max child count, Top N/`+N` aggregation, orientation, label strategy, legend/filter separation, expand/collapse/search behavior, tooltip payload, and tree-list/fallback before rendering.
- Tree/hierarchical tree charts preserve `treeAreaH >= CH * 0.55`, align parent nodes to visible child centers, keep connector paths weaker than nodes and stopped at node edges, keep default expansion within density rules, and avoid full-node expansion when `N`, `D`, or child count exceeds readable limits.
- Tree chart filters, metrics, legends, search, nodes, connectors, expand/collapse controls, node labels, tooltips, detail panels, footer notes, and state messages stay in reserved zones; hidden node/parent/child/value/status details remain available in tooltip/detail.
- Relation/network graphs declare node fields, edge fields, graph task, layout type, node/edge counts, node categories, edge types/directions/weights, density strategy, node-size mapping, edge-width mapping, label strategy, legend/search/control placement, fitView/zoom/drag behavior, and tooltip payload before rendering.
- Relation/network graphs preserve `graphH >= CH * 0.55`, keep nodes visually stronger than edges, keep ordinary labels and edge labels hidden unless sparse/selected/hovered, and avoid full hairball rendering beyond readable node/edge density.
- Relation graph filters, metrics, legends, search, zoom controls, nodes, edges, arrows, group areas, labels, tooltips, detail panels, and state messages stay in reserved zones; hidden node/edge details remain available in tooltip/detail.
- `requiredContentHeight <= H` after optional content is chosen.
- Long labels, large values, missing data, zero values, and target/comparison absence have explicit behavior.
- Loading, empty, error, no-permission, and stale states preserve geometry.
- Runtime QA checks `scrollHeight <= clientHeight`, `scrollWidth <= clientWidth`, and screenshot collision for the smallest accepted tier.
