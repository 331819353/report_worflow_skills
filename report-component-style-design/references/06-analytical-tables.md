# Analytical Table Rules

Use for AntV S2, pivot tables, cross tables, wide metric matrices, financial grids, and detailed record tables. AntV S2 is an on-demand runtime dependency, not a default template dependency; install `@antv/s2` and `@antv/s2-vue` only when the implemented table actually needs S2 behavior.

## Detail Tables

Use Detail Tables for row-level records such as orders, customers, products, stores, transactions, tickets, budget rows, metric details, and audit evidence. The table's job is record lookup, row-to-row comparison, anomaly/status location, detail drill-through, and light row action. It is not a decorative dense database dump.

Business fit:

- Use a Detail Table when the user needs to inspect exact records, compare rows, locate exceptions, sort/filter rows, export evidence, or open a row detail drawer.
- Do not use a Detail Table when one KPI, trend, composition chart, or aggregate ranking answers the question better.
- Default visible fields are `5-8` core columns. Large tables may show `8-12` columns. `11-16` columns require horizontal scroll and a frozen primary column; `>16` columns need hidden low-priority fields and column settings; `>24` columns should be grouped, moved to a drawer/detail page, or redesigned.
- The first visible columns should be primary key/object identity, key dimensions, core numeric metrics, status/risk, time, and only then operations.

Required data and option contract:

- Row id/key field, display primary field, row grain, total row count, default sort, and row-level permission/action state.
- Column metadata: field id, label, type, width, min width, alignment, priority, sortable/filterable status, visibility, tooltip/formatter, unit/precision for numeric columns, and status semantics when present.
- Pagination or virtual-scroll contract for large datasets. Global search, sorting, pagination, export, and permission scope must be provider/API/resolver inputs, not client-only filtering over all data, unless the dataset is explicitly bounded and already loaded for this component.
- Component-local filters are allowed only for the current table over an already fetched bounded dataset and must not change pagination scope, export scope, permission scope, or table schema.

Anatomy and fit:

- Required: title or block-owned title, table header, table body, loading/empty/error states, and exact value disclosure for truncated cells.
- Recommended: subtitle/freshness/口径, up to `3` metric summaries, fixed header when body scrolls, primary key column, status column, row detail action, pagination or load-more, and export when the report task needs evidence.
- Optional: row number, selection checkbox, search, summary row, fixed left primary column, fixed right operation column, column settings, expand row, row drawer.
- The table body must stay dominant: `tableBodyAreaH >= CH * 0.55` and `visibleRowCount = floor(bodyH / rowH)` should be at least `4-6` rows. Fewer than `3` visible rows fails as a useful Detail Table unless it is an intentionally tiny embedded preview with a separate detail route.
- Default row height is `40px`; compact `32-36px`; relaxed `48-56px` only when rows need avatar/two-line content. Row height must be stable; no unpredictable auto-growing rows.

Columns and widths:

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

- `minColumnW = 72px`, `minPrimaryColumnW = 120px`, and `minActionColumnW = 72px`.
- If `totalColumnW <= tableW`, distribute extra width only to declared flexible primary/text columns. Do not over-stretch numeric or action columns.
- If `totalColumnW > tableW`, enable horizontal scroll, freeze the primary key column, and freeze the action column only when row actions are required.
- Text cells are single-line with ellipsis plus tooltip by default. Two-line primary/secondary cells require a declared row height of at least `48px`.
- Numeric and percent cells use right alignment, tabular numerals, consistent precision, and explicit units. Do not color ordinary amount/count values; reserve color for change direction, risk, target failure, status, or exception.

Header, sorting, status, and operations:

- Header height `36-44px`, default `40px`; header text `12px`, weight `500/600`, weak background, and bottom divider.
- Header alignment follows cell alignment. Sorting icons appear only on sortable numeric, percent, ranking, or time columns. Do not put sort icons on every column.
- Every table should declare a default sort such as latest time desc, amount desc, exception first, or low completion first.
- Status uses a lightweight badge or icon+text: `20-24px` high, `11-12px` text, weak background, and restrained semantic color. Avoid full-row strong red fills.
- Operations are capped at `1` primary action plus `More` when there are more than `2` actions. Do not render many inline row operations.

Component-internal local filter and search:

- Suitable local filters: `全部 / 异常 / 正常`, `全部 / 待处理 / 已完成`, `今日 / 本周 / 本月`, `订单 / 退款 / 售后`, `金额 / 数量 / 完成率`, `Top / 全部 / 低表现`.
- Unsuitable local filters: many region/channel/category/person/status/time/amount-range controls that change page or backend query scope. Move those to page/global filters or advanced search.
- Default filter control is a title-right capsule for `2-4` short values; collapse to dropdown when options or width fail.
- Search is optional. Prefer a compact icon or `160-240px` search box above/right of the table; when space is limited, keep the status capsule and collapse search to an icon.

Pagination, summary, and selection:

- `<=50` rows may scroll without pagination. `51-500` rows normally paginate. `500+` rows use pagination or virtual scroll. Realtime/detail streams use load-more or virtual scroll.
- Default page sizes are `10 / 20 / 50`. Compact containers show only previous/next instead of full page numbers.
- Pagination sits bottom-right; total/summary text sits bottom-left.
- Summary row height is `36-44px`; numeric summary cells right-align, text cells show `合计`, and non-summary cells remain empty. Complex statistics belong in the metric strip or detail drawer.
- Selection checkbox appears only when batch action, batch export, assignment, or linked analysis exists. Otherwise do not show a checkbox column.

Interactions and states:

- Row hover uses a light background and may reveal/enhance row actions without changing row height.
- Row click may open detail, select the row, or link sibling components, but it must not conflict with action-column clicks.
- Selected row uses a fine left line or light background rather than a strong full-row color.
- Expand rows are optional and should be used only for nested details such as exception reason, child tasks, or approval history; do not use expand rows as a workaround for too many default columns.
- Loading preserves header and shows row skeletons. Empty shows `暂无数据` in the body. Filter-empty shows `当前筛选无结果`. Errors show `数据获取失败` with retry when supported. Missing fields display `--`; real zero displays `0`.

## Pivot Tables

Use Pivot Tables for multidimensional aggregated cross summaries: row dimensions * column dimensions * measures. A Pivot Table compares aggregated values, subtotals, grand totals, and high/low/exception cells across dimensions. It is not a Detail Table and should not display raw records one by one.

Business fit:

- Use a Pivot Table for region by month sales, channel by category GMV, department by quarter actual/target/attainment, cost type by month budget/actual/variance, or team by person performance/rank.
- Do not use a Pivot Table for raw record lookup, one simple KPI, trend-first tasks, visual pattern discovery better served by heatmap, or tiny spaces that cannot show row/column context.
- If the user needs one record, use a Detail Table. If the user needs multidimensional cross-summary, use a Pivot Table. If the user needs color pattern scanning across many cells, consider a heatmap.

Required data and option contract:

- Row dimensions, column dimensions, measures, aggregation grain, source dataset, period/freshness, and permission scope.
- Measure metadata: id, label, unit, precision, aggregation function, numerator/denominator when the measure is a rate, weighted-average rule when applicable, and whether subtotal/grand-total formulas differ from leaf formulas.
- Row and column hierarchy metadata: field id, label, level order, display order, natural time order when relevant, expand/collapse state, subtotal behavior, and empty value labels such as `未分类` or `未分组`.
- Sorting contract: row sorting by business order, dimension label, total value, or selected cell/measure; time columns keep natural chronological order unless a named business rule says otherwise.
- Totals contract: subtotal rows/columns and grand-total row/column are explicit; percentage/rate metrics must use formula recomputation such as `sum(numerator) / sum(denominator)` rather than naive sum or unweighted average.

Anatomy and fit:

- Required: title or block-owned title, row dimension area, column dimension header, measure value area, data cells, loading/empty/error/no-permission states, and exact cell tooltip.
- Recommended: subtitle with unit/period/口径, up to `3` metric summaries, subtotal rows/columns, grand-total row/column, fixed column headers, frozen row dimension columns, expand/collapse for row hierarchy, and conditional formatting for one or two core measures.
- Optional: component-local metric/period/display-mode capsule, column settings, value formatting switch, pagination, virtual scroll, drilldown to Detail Table, export, and field configuration entry in edit mode.
- The pivot body must stay dominant: `pivotAreaH >= CH * 0.55` and `visibleRowCount = floor(dataH / rowH)` should be at least `4` rows. If this fails, remove subtitle/metric strip, collapse filters, use compact row height, enlarge the block, or convert to a preview with fullscreen/detail route.
- Default row height is `40px`; compact `32-36px`; relaxed `44-48px` only when multi-measure headers or readability requires it.

Row, column, and measure density:

- Default row dimension depth is `1-2` levels; default column dimension depth is `1-2` levels. More depth requires expand/collapse, drilldown, or a larger analytical workspace.
- Default measures are `1-3`; maximum recommended visible measures are `5`. More measures should use component-local metric switch, column settings, split tables, or a dedicated analysis page.
- Suggested scale: rows `<=50` and columns `<=12` can show directly; rows `51-200` or columns `13-24` require fixed headers and scrolling; rows `>200` require row virtualization; columns `>24` require horizontal scroll and frozen row headers; columns `>50` should reduce the column dimension, paginate columns, or redesign.
- Row dimension width: `140-260px`. Measure columns: `88-140px`; amount columns `100-140px`; percent columns `80-120px`; total columns `100-150px`.

Header, hierarchy, and alignment:

- Column header row height `32-40px`, default `36px`. Multi-level column headers use merged cells; parent headers and measure headers center-align.
- Row dimension text left-aligns and indents by hierarchy: `levelIndent = 16-20px`. Expand/collapse icons are `14-16px` and sit before the row label.
- Numeric, amount, percent, rate, rank, subtotal, and total cells right-align with tabular numerals, consistent precision, and explicit units.
- Subtotal rows/columns use a light background and weight `500`. Grand-total rows/columns use a clearer but still restrained background and weight `600`.
- Sorting icons appear only on sortable dimension or measure headers, not every header cell.

Conditional formatting:

- Apply conditional formatting only to `1-2` core measures by default.
- Allowed encodings: light heat background for high/low, in-cell data bar for same-column comparison, status tag for attainment/exception, and semantic positive/negative color for YoY/MoM.
- Do not color every measure or every cell family. Too much color turns the pivot into a noisy chessboard and hides hierarchy.

Interactions and states:

- Hover highlights the current cell plus its row and column lightly, and shows tooltip with full row path, column path, measure, exact value, row share, column share, YoY/MoM, formula, period, and source when available.
- Cell click may select the cell, link sibling charts, open drilldown Detail Table, or open a formula/detail drawer. It must not conflict with expand/collapse on row dimensions.
- Field configuration belongs to edit mode. In report display mode, expose only a light metric switch, column/measure settings icon, or fullscreen/detail action when necessary; do not show Excel-like drag field wells by default.
- Loading preserves row/column header skeletons and grid skeletons. Empty shows `暂无数据`. Filter-empty shows `当前筛选无结果`. Missing cell values show `--`; real zero shows `0`. Aggregation errors show a tooltip/detail state rather than silently calculating a wrong total.

## Grouped / Multi-Level Table Headers

Use grouped headers when a table has many fields or natural business groups: metric families, actual/target/variance, current/YoY/MoM, amount/count/rate, period groups, region/channel/product groups, financial statement groups, or pivot columns. A grouped header organizes field relationships; it is not a place to expose every configuration control.

Business fit:

- Use grouped headers for Detail Tables, Pivot Tables, metric matrices, financial grids, operating summary tables, target-attainment tables, and multi-metric comparison tables when fields have clear group relationships.
- Use a flat one-row header when there are only `4-5` simple fields, no meaningful grouping, row-level lookup is the only task, or the component is too small to preserve body rows.
- If a table has more than `8` visible columns or naturally grouped fields, a grouped header is the default. A flat header needs an explicit reason.
- Header hierarchy should make comparison easier. It should answer: which fields belong together, what unit/口径 applies, and which fields should be compared horizontally.

Required data and option contract:

- `columnTree` or equivalent grouped-column metadata. Each node declares `id`, `title`, optional `children`, `unit`, `definition`, `sortable`, `filterable`, `align`, `width/minWidth/maxWidth`, `priority`, and fixed/frozen behavior.
- Leaf columns carry the real data fields. Parent group widths and `colSpan` are derived from visible leaf columns, not hand-entered decoration.
- Maximum recommended header depth is `3`. Depth `4` requires collapse/restructure/fullscreen; depth `>4` should not appear in report display mode.
- Declare row-dimension header and fixed columns when horizontal scroll exists. The top-left corner header, left row-dimension columns, and the whole multi-level top header must stay synchronized.
- Declare which controls are component-local filters and which are per-column header filters. Component-local filters affect the whole table and use title-right capsule/dropdown; column filters affect one leaf column and use a small icon near the leaf header.

Geometry:

```text
headerLevel = L
headerRowH = 32-40px, default 36px
headerH = L * headerRowH

if a header row contains unit/subtext:
  headerRowH += 4-8px
```

- Recommended total header height: one level `36-44px`, two levels `64-80px`, three levels `96-116px`.
- Preserve the table body: `bodyH = tableH - headerH` and `visibleRowCount = floor(bodyH / rowH)`. If `visibleRowCount < 4`, reduce optional metrics, collapse local filters, lower header depth, use compact row height, enlarge the block, or move to fullscreen/detail.
- Parent group width is the sum of visible leaf widths. Parent group x-position is the first visible leaf x-position.

Column tree span rules:

```text
if node has children:
  colSpan = sum(leaf descendants)
  rowSpan = 1
else:
  colSpan = 1
  rowSpan = maxDepth - currentDepth + 1
```

- Do not fake merged cells with absolute text overlays. Use the table/S2/project table header model so scrolling, fixed columns, sort, filter, tooltip, and accessibility states remain consistent.
- Leaf column widths follow the table column rules: row dimension `140-260px`, numeric `96-140px`, percent `80-120px`, text `100-160px`, status `80-120px`, action `80-120px`.
- When total leaf width exceeds table width, enable horizontal scroll and freeze the left row-dimension or primary key column. Freeze the right operation column only when action workflow exists.

Visual hierarchy:

- Header text `12px`, group title weight `600`, leaf title weight `500/600`, subtext/unit `11px` with weak color.
- Parent group background is slightly stronger than leaf header background; both stay restrained. Do not use strong color blocks or thick borders to separate groups.
- Weak vertical dividers are recommended when merged cells are used, because they help users trace group ownership.
- Header visual weight must stay below the data body. "Clear but lighter than data" is the default.

Units, definitions, sort, and filter:

- If the whole table shares one unit, put it in the subtitle such as `单位：万元`.
- If units differ by column, place a short subtext under the leaf header and expose the complete definition in tooltip.
- Only core metrics show a definition icon permanently; secondary metrics reveal it on hover/focus.
- Sort icons appear only on sortable leaf headers for numeric, percent, time, ranking, or total columns. Parent group headers should not sort by default.
- Header filter icons appear only on filterable leaf headers such as status, category, region, or owner. Do not make every header cell a visible filter surface.
- If sort and filter both exist, use `title -> sort icon -> filter icon`; if space fails, collapse to a more/menu icon.

Interactions and states:

- Hovering a leaf header lightly highlights the current column and its parent group. Hovering a group header lightly highlights all visible child columns and may show a group definition tooltip.
- Group collapse/expand is allowed when leaf columns exceed `12` or metric groups exceed `4`. Collapsed groups keep the group title and optional key summary column.
- Loading preserves the grouped header skeleton and body skeleton. Empty and error states keep the header visible when useful. Long headers use one-line ellipsis plus tooltip. Missing column fields hide the column or show the field key only as a documented fallback.

Density thresholds:

| Condition | Default behavior |
| --- | --- |
| Header levels `1-2` | Normal display |
| Header level `3` | Accept with height budget |
| Header level `4` | Collapse, split, fullscreen, or redesign |
| Leaf columns `<=8` | Full display |
| Leaf columns `9-16` | Horizontal scroll if needed |
| Leaf columns `17-30` | Freeze key column and support horizontal scroll/column settings |
| Leaf columns `31-50` | Collapse groups or column settings |
| Leaf columns `>50` | Do not show directly; pivot, paginate columns, configure view, or redesign |
| Groups `2-4` | Best readability |
| Groups `5-6` | Accept with collapse or large span |
| Groups `>6` | Split table or collapse groups |

## Viewport

- The table body is the viewport. The table must scroll inside the block instead of expanding the page.
- Mount S2 only after width and height are measurable.
- Synchronize S2 width/height with the assigned grid block and resize on container changes.
- Keep header, pagination, and toolbar outside the scrollable data body when possible.
- For simple row-level Detail Tables, use Element Plus or the project's table component unless the table needs S2-class pivot/cross/wide-matrix behavior. Do not install or render AntV S2 merely because the component is a table.
- For Pivot Tables, use AntV S2 or a project S2-equivalent analytical table renderer. A hand-rolled HTML table is acceptable only for a tiny static preview with no scrolling, hierarchy, virtual scrolling, merged headers, or interaction requirements.

## Columns And Width

- Use complex/grouped headers by default when a table has more than 8 visible columns or when fields naturally group by subject, period, metric family, amount/rate/count, region/channel/product, target/actual/variance, or current/YoY/MoM. A flat header is acceptable only when columns are few and have no meaningful grouping.
- Freeze key identifier columns when horizontal scroll is needed.
- Text/name columns get more width and may wrap to two lines.
- Numeric, percent, status, date, and action columns use stable compact widths.
- Do not compress all columns until values are unreadable. Prefer horizontal scroll.
- Ellipsis is allowed only with tooltip/full text and never as the only access to decision-critical content.

## Typography And Alignment

- Header: 12-13px, weight 600.
- Cell text: 12-13px minimum.
- Text left-aligns, numbers right-align, status aligns center or left with icon/text.
- Financial and percentage values use tabular numerals and consistent precision.
- Row height must be stable. Wrapping rows should use a defined two-line height rather than auto-growing unpredictably.

## Tags, Status, And Operations

- Status text renders as badge or icon plus text, not plain colored text.
- Too many colored tags create noise. Show primary status permanently and move secondary tags to hover/detail.
- Operation buttons must keep a stable column width and not wrap awkwardly.
- Risk/warning cells need tooltip explaining rule, threshold, or source when available.

## Empty, Loading, Error

- Preserve columns and header where useful so users know what data is missing.
- Loading rows should not resize the component.
- Error state should offer retry and not destroy table scroll layout.
