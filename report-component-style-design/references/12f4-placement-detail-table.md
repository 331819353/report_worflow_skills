# Detail Table Placement Algorithm
This file was split from `12f-placement-composite-tables.md`. Load it only when this exact component family is present; use `12f-placement-composite-tables.md` as the routing index.


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
