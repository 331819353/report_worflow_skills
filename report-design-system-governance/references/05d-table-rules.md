# Table Rules

This file was split from `05-report-charts-tables-format-guidelines.md`. Load it only for this focused rule group; use `05-report-charts-tables-format-guidelines.md` as the routing index.

## Table Rules

Use tables for:

- Detail data.
- Rankings.
- Audit/operation lists.
- Multi-field precise comparison.
- Chart drilldown results.
- Exportable data.

### Detail Table

Use Detail Tables for row-level lookup, comparison, exception location, row evidence, and light operation flows such as order, customer, product, store, transaction, ticket, budget, and metric-detail records.

Required contract:

- Row grain, row id/primary key, display object field, total count, default sort, data source, period/freshness, and row-level permission/action state.
- Column metadata: user-facing label, field name, data type, unit/precision, width/min width, alignment, priority, sortable/filterable/fixed/visible state, tooltip formatter, status semantics, and permission visibility.
- Search/sort/pagination/export execution scope. Global search, sort, pagination, permission, and export scope should be provider/API/resolver inputs. Component-local filters may only narrow the current table's already loaded bounded data.
- Row-detail or row-action contract when the table is an evidence/action surface.

Fit and density:

- Default visible columns: `5-8`. Large blocks may show `8-12`.
- `11-16` columns require horizontal scroll plus fixed primary key column.
- `>16` columns require low-priority hidden columns and column settings.
- `>24` columns should be grouped, moved into a drawer/detail page, or redesigned; do not show a single flat table.
- Table body should remain dominant: `tableBodyAreaH >= CH * 0.55`.
- Recommended visible rows: `4-6` minimum by default. Fewer than `3` visible rows is only acceptable for an explicitly small preview with a detail route.
- Default row height `40px`; compact `32-36px`; relaxed `48-56px` only for avatar/two-line rows. Row height must stay stable.

Detail-table alignment and behavior:

- Primary key/object and text columns left-align.
- Amount, count, rate, completion, YoY/MoM, variance, and ranking columns right-align with tabular numerals.
- Status columns use lightweight tags or icon+text, not large saturated backgrounds.
- Operation column keeps `1` primary action plus `更多` when actions exceed `2`.
- Checkbox columns appear only when batch action/export/assignment/linked selection exists.
- Header is fixed when body scrolls. Primary key column freezes when horizontal scroll is needed; operation column freezes only when row actions are required.
- Long text uses single-line ellipsis plus tooltip. Missing fields show `--`; real zero displays `0`.
- Sorting icons appear only on sortable numeric/time/ranking/status columns. Do not add sort controls to every header.
- Empty/loading/error/filter-empty/no-permission states preserve header/body geometry.

Tooling:

- Component-local filters use `2-4` short status/time/type options as title-right capsules, collapse to dropdown when width fails, and do not replace page/global filters.
- Search is optional. Use a compact icon or `160-240px` search field; when space is limited, preserve the local status filter and collapse search first.
- Pagination sits bottom-right; total/summary text sits bottom-left. Compact mode may show only previous/next.
- Summary rows are `36-44px`, numeric cells right-align, and complex statistics move to the metric strip or detail drawer.

Renderer choice:

- Use Element Plus or the project table component for simple row-level Detail Tables.
- Use AntV S2 only for pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, dense comparison grids, or S2-class analysis behavior. Do not add S2 merely because the component is a table.

### Analysis & Insight Components

Use Analysis & Insight components when the report must explain what happened, why it happened, how large the impact is, whether it is abnormal, what to do next, or whether the data/metric口径 is trustworthy. They may render as `visualType: 'text-summary'`, but they are not generic narrative copy.

Required contract:

- `analysisInsightContract` or equivalent metadata with subtype, insight family, conclusion, evidence, affected object, comparison/change value when relevant, reason fields, action/detail route, confidence/definition/source/freshness, local filters, tooltip payload, and state rules.
- One component, one main point. Use `2-4` insight items for multi-insight lists and max `5`.
- Conclusion appears before evidence. Evidence can be a metric, baseline, affected object, cause, source, freshness, or definition.
- Recommendations and risks include concrete next action. Definition, data-quality, and prediction notes include trust context.

Fit and density:

- Summary bar: `280-960px` wide, `36-56px` high.
- Small insight card: `220-360px` wide, `88-128px` high.
- Standard insight card: `320-560px` wide, `120-180px` high.
- Enhanced diagnosis card: `480-720px` wide, `160-240px` high.
- Side insight panel: `220-320px` wide, `240-480px` high.
- Annotation bubble: `120-240px` wide, `40-96px` high, with `12-48px` leader line.
- Chart-side insights use `insightW = clamp(200px, W * 0.28, 320px)` and stay within `25%` of a Composite Panel area unless the panel is explicitly an explanation panel.

Visual and copy rules:

- Title `2-8` Chinese characters; main conclusion `12-32`; explanation `1-2` visible lines; actions `1-3`; tooltip `3-6` short lines.
- Use weak neutral or semantic tint, `1px` weak border, radius `8-12px`, and semantic icons `14-18px`.
- Warnings use weak tint or `3-4px` left bar, never full-card red.
- Component-local filters are optional and current-component scoped; use capsule/dropdown rules and never change global scope, metric口径, table schema, permission, pagination, export, or another component.
- Loading, generating, insufficient-data, empty/filter-no-result, data-delay, error, no-permission, and long-content states preserve card geometry.

Anti-patterns:

- Generic `智能洞察`, `建议关注`, `数据有所波动`, or "overall good" text with no evidence.
- Essay-like explanation blocks inside compact report cards.
- Every explanation card owning its own independent filter.
- Insight cards visually stronger than the primary chart/table.
- Data-quality warnings presented as business anomalies without distinction.

### Composite Panels / Multi-Component Analysis Cards

Use Composite Panels when several child components work together to answer one small business question, such as `核心指标 + 趋势 + Top 列表`, `目标完成率 + 实际目标对比 + 差额明细`, or `主趋势图 + 构成图 + 异常明细`. They are not whole dashboards and are not Combo Charts.

Required contract:

- One shared business topic and one analysis sequence, such as summary -> trend/structure -> contribution/exception -> detail/action.
- `compositePanelContract` or equivalent metadata with layout pattern, primary child id, child roles, child priorities, child minimum sizes, shared filters, linked interaction, responsive fallback, and state rules.
- One primary child. The primary child should own `50-70%` of visual weight; auxiliary children stay `20-35%`; notes/actions stay `5-10%`.
- Default child count is `2-3`; normal maximum is `4`. More than `4` visible analytical child components should become separate blocks, tabs, drawer/fullscreen, or a redesigned page section.
- Panel-level local filters affect the whole panel by default. Allow at most one child-only filter exception, visually weaker and clearly scoped.
- Shared legends and units are consolidated. Do not repeat the same legend or unit inside every child.
- Detail preview is small: `3-6` rows and `3-5` columns, with `查看全部`, drilldown, drawer, or full Detail Table when more evidence is needed.
- Hover/click linkage preserves context: hover may highlight matching child values; click may pin a category/object and update auxiliary/detail children; selected state needs a clear reset.

Fit rules:

- Recommended outer size is `640-960px` wide and `360-560px` high; minimum is `320x260px` only after auxiliary content has collapsed.
- Content body should keep `contentH >= CH * 0.60`.
- Common layouts: metric strip + main visual; main visual + right auxiliary; main visual + bottom detail; main visual + two side cards; large-only `2 x 2`; metric strip + main visual + right insight.
- Shrink order is P4 note/footer -> P3 detail/Top list -> P2 auxiliary -> P1 primary child. Do not shrink the primary child below its minimum viewport to keep decorative secondary content.
- Small size keeps title, single dropdown filter, core metric, and one main visual. Standard size keeps one auxiliary child. Large size may show `3-4` child components.

Anti-patterns:

- A panel title that is a concatenation of child chart names.
- Four equal-weight mini charts with no primary visual.
- Nested card shells or independent shadows inside the panel.
- Separate filters on every child, making the active口径 unclear.
- Using a Composite Panel to avoid page-grid layout work or to make a report look more complete.

### Complex / Grouped Table Headers

Use complex headers when table fields naturally group by business meaning: metric family, actual/target/variance, current/YoY/MoM, amount/count/rate, time period, finance section, region/channel/product, or pivot column hierarchy. A grouped header makes wide tables easier to understand; it should not make a simple table look complex.

Trigger rules:

- Tables with `>8` visible columns or natural field groups use grouped headers by default.
- Keep a flat header for `4-5` simple unrelated fields, small preview tables, or row-level lookup surfaces where grouping adds no meaning.
- Default grouped-header depth is `2`; maximum recommended depth is `3`. Depth `4` requires collapse, split, fullscreen, or redesign; depth `>4` is not accepted in report display mode.

Required contract:

- `columnTree` or equivalent grouped-column metadata with business group nodes and leaf field nodes.
- Leaf fields declare field id, label, unit, definition/口径, width/minWidth/maxWidth, alignment, priority, sortable/filterable status, formatter, fixed behavior, and tooltip payload.
- `colSpan` is computed from visible leaf descendants; `rowSpan` is computed from `maxDepth`. Parent group width equals the sum of visible leaf widths.
- Component-local filters and per-column header filters are separate. Component-local filters sit in the title/function area as capsule/dropdown controls; column filters are small icons on relevant leaf headers only.

Fit and behavior:

- Header row height is `32-40px`; two levels are normally `64-80px`; three levels are `96-116px`.
- The table must preserve useful body rows. If grouped headers leave fewer than `4` visible body rows, remove optional metrics/subtitles, collapse filters, reduce header depth, compact rows, enlarge, split, or use fullscreen/detail.
- The entire multi-level header stays fixed during vertical body scroll. When horizontal scroll exists, the top-left header and row dimension/primary columns freeze together.
- Parent group backgrounds are restrained, leaf headers are lighter, and weak dividers can show group boundaries. Do not use strong color blocks, thick borders, or every-column icons.
- Group collapse is appropriate when leaf columns exceed `12` or metric groups exceed `4`; collapsed groups retain group title and optional key summary column.
- Header tooltips expose group meaning, field definition, unit, formula/aggregation, period/freshness, and source. Long headers use ellipsis plus tooltip.

### Pivot Table

Use Pivot Tables for multidimensional aggregated cross summaries, not row-level record lookup. A valid Pivot Table has row dimensions, column dimensions, and measures, and it helps users compare aggregated values, subtotals, grand totals, and high/low/exception cells across dimensions.

Required contract:

- Row dimensions, column dimensions, measures, aggregation grain, source dataset, period/freshness, permission scope, and renderer choice.
- Measure metadata: label, unit, precision, aggregation function, numerator/denominator for rate metrics, weighted-average rule when applicable, and subtotal/grand-total formula.
- Row/column hierarchy metadata: level order, display order, expand/collapse behavior, subtotal behavior, natural time order, and empty labels such as `未分类` or `未分组`.
- Sorting: row sort by business order, dimension label, total value, or selected cell/measure; time columns use natural chronological order unless a named business rule overrides it.

Fit and density:

- `pivotAreaH >= CH * 0.55`; fewer than `4` visible body rows is not useful except for a declared preview with fullscreen/detail route.
- Default row dimension depth `1-2`, column dimension depth `1-2`.
- Default measures `1-3`; maximum visible measures `5`. More measures use metric switch, column settings, split table, or a dedicated analysis page.
- Rows `<=50` and columns `<=12` can display directly; rows `51-200` or columns `13-24` require fixed headers and scrolling; rows `>200` require row virtualization; columns `>24` require horizontal scroll and frozen row headers; columns `>50` require dimension reduction, column paging, or redesign.

Layout and behavior:

- Use AntV S2 or a project S2-equivalent analytical table renderer for real pivot/cross/wide analytical tables.
- Row dimension column width is `140-260px`; measure columns are `88-140px`; amount `100-140px`; percent `80-120px`; total `100-150px`.
- Column headers can be multi-level merged cells; parent and measure headers center-align.
- Row dimensions left-align and indent by `16-20px` per level. Expand/collapse icons are `14-16px`.
- Numeric, amount, percent, rate, rank, subtotal, and total cells right-align with tabular numerals and consistent precision.
- Subtotal rows/columns use light emphasis and `500` weight. Grand-total rows/columns use clearer but restrained emphasis and `600` weight.
- Fixed column headers are required when vertical scrolling exists; frozen row dimension columns are required when horizontal scrolling exists.

Aggregation and conditional formatting:

- Subtotals and grand totals are explicit. Percentage/rate metrics recompute from numerator/denominator, such as `sum(actual) / sum(target)`; do not sum percentages and do not average percentages unless the business口径 explicitly says unweighted average.
- Conditional formatting is limited to `1-2` core measures by default: light heat background, in-cell data bar, attainment/exception tag, or positive/negative YoY/MoM color.
- Do not color every cell family. The table should remain a readable cross-summary, not a noisy color grid.

Tooltip and drilldown:

- Cell tooltip includes row path, column path, measure, exact value and unit, row share, column share, subtotal/grand-total context, YoY/MoM when present, aggregation function, formula or numerator/denominator for rates, period, source, and data-quality/permission notes when relevant.
- Cell click may select, link sibling components, open a Detail Table drilldown, or open a formula/detail drawer. Field configuration belongs to edit mode; report display mode should not show Excel-style drag field wells by default.

Layout:

| Item | Rule |
| --- | --- |
| Header background | `#FAFAFA` |
| Border color | `#F0F0F0` |
| Default alignment | Left |
| Numeric/amount/rate fields | Right |
| Last column | Usually right |
| Operation column | Center or right by scenario |
| Horizontal scroll | Allowed when many fields |
| Fixed operation column | Float/fix operation column in first visible area when many fields |
| Complex/grouped header | Required by default when visible columns exceed 8 or fields naturally group by subject, period, metric family, amount/rate/count, target/actual/variance, current/YoY/MoM, region/channel/product |

Column contract:

| Field | Meaning |
| --- | --- |
| Column name | User-facing Chinese label |
| Field name | API field |
| Data type | Text/amount/quantity/rate/date/status/action |
| Unit | 万元/%/个/单 |
| Width | Default and min width |
| Alignment | Left/right/center |
| Wrapping | Prefer no wrap |
| Max chars | Truncate with tooltip |
| Sort/filter/fixed | Explicit yes/no and fixed side |
| Permission | Role-based visibility |

Content:

- Long content uses ellipsis plus tooltip.
- Date format stays unified, for example `YYYY-MM-DD HH:mm:ss`.
- Numeric fields right-align for vertical comparison.
- Status fields can use dot, tag, and color, but must have text.

Operations:

- High-frequency operations display directly.
- Low-frequency operations collapse into `更多`.
- Dangerous operations require confirmation.
- No-permission operations can hide or disable with reason.
- Operation copy uses verbs; `查看详情` is clearer than `详情`.

Pagination:

- Long lists must paginate; load one page at a time.
- Types: basic pagination, more pagination, quick jump.
- Default page size can be `10`, `20`, `50` by business need.
- Filter change resets to page 1.
- Selected page uses primary color `#0073E5`.
- Pagination is placed bottom-right of table.

Export:

- Clarify current page vs all query results.
- Respect data permission.
- Define whether hidden columns are included.
- Include filter conditions, export time, and exporter when needed.
- Large data export should be asynchronous.
- Recommended file name: `报表名称_筛选范围_导出日期.xlsx`, for example `销售收入明细_202606_20260609.xlsx`.
