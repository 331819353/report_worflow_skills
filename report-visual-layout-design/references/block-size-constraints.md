# Block Size Constraints

Use this reference whenever a report layout must decide how large each `8 * N` content block should be and what component combinations can safely fit inside it.

The skill normally checks two practical viewport baselines:

- `1920x1080`: desktop prototype, large report viewport, cockpit design baseline.
- `1280x768`: smaller laptop/browser preview viewport baseline.

These are not total report size limits. They describe the visible window used for first-viewport planning, screenshot review, and component density checks. Ordinary report pages may be taller than `1080px` or `768px` and should scroll vertically.

## 1. Viewport Versus Report Height

Separate these concepts:

- Viewport size: the visible browser/screen window, usually `1920x1080` or `1280x768`.
- Content display area: the report's usable grid area after header, nav, filters, sidebar, and margins.
- Report height: the full height produced by all `8 * N` rows. It may exceed the viewport.
- First viewport: the portion visible before scrolling. It should show the core answer, but it does not need to contain the entire report.

Design principle:

- Plan block width and row height from the active viewport.
- Let `N` grow with business content.
- Keep row/block heights usable.
- Enable vertical scrolling when total grid height exceeds the viewport.
- Do not compress charts, tables, cards, or text just to fit the whole report into one screen.

Only the sci-fi cockpit template is normally fixed to one `1920x1080` screen. Do not apply that fixed-height behavior to ordinary report pages.

## 1.1 Perspective Navigation Viewport Checks

First-level perspective controls include domain navigation, top or side perspective cards, `Tabs`, `Segments`, and any control that switches business domain, report theme, management object, subject area, or statistical口径.

Required viewport checks:

- Run layout checks at both `1920x1080` and `1280x768`.
- For each visible navigation/control item or card content viewport, the DOM acceptance condition is:

```text
scrollHeight <= clientHeight
scrollWidth <= clientWidth
```

- If the measured result is `scrollHeight > clientHeight` or `scrollWidth > clientWidth`, record a clipping defect. Do not downgrade it only because the screenshot hides a 1-3px crop.
- Screenshot review can find visual symptoms, but it cannot replace the DOM overflow check above.
- If the navigation design intentionally uses a horizontal scroll track, the scroll track may be wider than its container only when the interaction is explicit and accessible; each visible item/card content viewport inside the track must still pass `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
- If a Tab/Segment label, status light, badge, percentage, or focus label fails the DOM check, use a larger container, two-line item, dropdown perspective selector, intentional horizontal navigation pattern, tooltip, or overview detail area instead of shrinking text below baseline readability.

Fixed-height navigation/card height budget:

```text
requiredContentHeight =
  paddingTop
  + paddingBottom
  + sum(explicitLineHeight * reservedLineCount)
  + sum(verticalGaps)
  + fixedBadgeStatusFooterHeights

requiredContentHeight <= cardHeight
```

- The budget must be declared for fixed-height perspective cards, navigation cards, KPI strips, compact summary cards, and fixed-height control items.
- Every text row in the budget must have an explicit `line-height`: domain name, metric name, percentage/core value, status badge, bottom label, and footer/focus text. Large percentage or KPI numbers need their own explicit line box instead of relying on browser default line-height.
- Auto layout is allowed only after the budget proves the intended content fits. It is not a substitute for budgeting fixed-height components.
- If the budget does not fit, reduce visible information, increase height, use a two-line structure with reserved rows, use intentional horizontal navigation, switch to dropdown perspective selection, or move detail into hover/focus tooltip, selected-state summary, or overview area.

Navigation information density:

- One navigation card may carry at most two layers of primary information.
- First-level navigation defaults to `domain + one core indicator`.
- `domain name + metric name + value + focus point` is too dense for one single-line card. Convert it to a two-line structure, horizontal scroll, dropdown perspective selector, selected-state summary, or move the extra detail into tooltip/overview content.
- Do not rely on `overflow: hidden`, ellipsis, or screenshots that appear acceptable while DOM `scrollWidth`/`scrollHeight` still proves clipping.

## 2. Size Formula

Compute the actual top-level block size after choosing a default candidate span from `grid-containers.md`.

```text
columnWidth = (contentWidth - (8 - 1) * gap) / 8
blockWidth(cols) = columnWidth * cols + gap * (cols - 1)
blockHeight(rows) = rowHeight * rows + gap * (rows - 1)
```

Then estimate usable body size:

```text
bodyWidth = blockWidth - horizontalPadding * 2
bodyHeight = blockHeight - headerHeight - verticalPadding * 2
totalGridHeight = rowCount * rowHeight + (rowCount - 1) * gap
```

If `totalGridHeight` is taller than the available viewport height, keep the block sizes and let the report scroll vertically.

Do not calculate `rowHeight` by dividing the viewport height by `N`. `rowHeight` is a configured minimum. When content needs more vertical space, add rows, split the content, allow scrolling, or paginate.

Default report cards:

- 1920 viewport baseline: `horizontalPadding = 20-24`, `headerHeight = 44-56`.
- 1280 viewport baseline: `horizontalPadding = 16-20`, `headerHeight = 40-48`.
- Dense sci-fi blocks: padding may be smaller, but title, legend, and chart viewport must still have fixed space.

## 3. Default Span Selection And Size Check

Use this order:

1. Pick a default candidate span from `grid-containers.md` by component type.
2. Check the component's base minimum size in the detailed size table.
3. Add complexity requirements for labels, legends, rows, columns, nodes, edges, depth, markers, tasks, or text length.
4. Calculate the selected span's outer size and usable body size.
5. If the body size is enough, keep the selected span.
6. If it is not enough, try the next larger candidate span from the same default distribution row.
7. If no candidate span can hold the content, split the component, use tabs, paginate, move details to drawer/fullscreen, aggregate the data, or change the component type.

Required size is calculated as:

```text
final_required_width_px =
base_min_outer_width_px + complexity_width_addition_px

final_required_height_px =
base_min_outer_height_px + complexity_height_addition_px
```

The selected span passes when:

```text
computed_outer_width_px >= final_required_width_px
computed_outer_height_px >= final_required_height_px
```

For viewport breakpoints, use the computed body size rather than the breakpoint name alone. Two nearby widths such as `1279px` and `1281px` should not produce contradictory choices when the actual body size is effectively the same.

## 4. Pixel Calculation Details

For an 8-column page:

```text
availableWidth = pageWidth - 2 * pagePadding
columnWidth = (availableWidth - 7 * gridGap) / 8
outerWidth = colSpan * columnWidth + (colSpan - 1) * gridGap
outerHeight = rowSpan * rowHeight + (rowSpan - 1) * gridGap
contentWidth = outerWidth - 2 * componentPadding
contentHeight = outerHeight - 2 * componentPadding - reservedVerticalSpace
```

Common reserved vertical space:

```text
simpleKpiReserve = titleHeight + subtitleHeight
richKpiReserve = titleHeight + subtitleHeight + innerGap
chartReserve = titleHeight + legendHeight + axisReservedHeight
compositePanelReserve = titleHeight + optionalSubtitleHeight + optionalMetricStripHeight
tableReserve = titleHeight + tableHeaderHeight
groupedHeaderHeight = headerDepth * groupedHeaderRowHeight
groupedTableReserve = titleHeight + groupedHeaderHeight
textReserve = titleHeight
```

Default calculation constants when the selected template does not provide more specific tokens:

| Token | Default | Compact below 1280px | Minimum |
| --- | ---: | ---: | ---: |
| `gridColumns` | 8 | 8 | 8 |
| `pagePadding` | 32px | 24px | 24px |
| `gridGap` | 16px | 12px | 12px |
| `componentPadding` | 16px | 14px | 12px |
| `innerGap` | 8px | 8px | 8px |
| `rowHeight` | template value | template value | 96px; 220px for scrollable templates |
| `titleHeight` | 24px | 24px | 20px |
| `subtitleHeight` | 20px | 20px | 18px |
| `optionalSubtitleHeight` | 18px | 18px | 0px |
| `optionalMetricStripHeight` | 48px | 40px | 0px |
| `legendHeight` | 28px | 28px | 24px |
| `axisReservedHeight` | 32px | 32px | 28px |
| `tableHeaderHeight` | 36px | 36px | 32px |
| `groupedHeaderRowHeight` | 36px | 36px | 32px |
| `tableRowHeight` | 36px | 36px | 32px |

Do not reduce padding, gap, row height, or line height below the minimums to force a failed block to pass.

## 5. Extended Component Size Requirements

Classify every component into one of the following component types. `min_outer_width_px` and `min_outer_height_px` are base size checks used after selecting a default candidate span. `size_check_hint` helps judge whether the default span is likely to pass; it does not replace the default span distribution in `grid-containers.md`.

| component_type | min_outer_width_px | min_outer_height_px | size_check_hint | notes |
| --- | ---: | ---: | --- | --- |
| `title` | 600 | 56 | `8x1` | Page main title |
| `section_header` | 360 | 48 | `8x1` | Section or chapter title |
| `filter_bar` | 600 | 64 | `8x1` | Filter and query controls |
| `tab_bar` | 500 | 56 | `8x1` | Tabs or dimension switch |
| `simple_kpi` | 220 | 120 | `2x1_or_2x2` | Single metric card |
| `rich_kpi` | 300 | 160 | `3x2` | Multi-line KPI with comparison |
| `mini_chart_kpi` | 320 | 180 | `3x2` | KPI with sparkline or mini chart |
| `progress_kpi` | 260 | 140 | `2x2_or_3x2` | KPI with progress bar |
| `gauge_kpi` | 300 | 220 | `3x3` | Gauge-style KPI |
| `kpi_group` | 600 | 180 | `8x2` | Group of KPI cards |
| `composite_panel` | 640 | 360 | `6x4_or_8x4` | Multi-component analysis card with one shared topic and one primary child |
| `line_chart` | 420 | 280 | `4x3` | Line chart |
| `area_chart` | 420 | 300 | `4x3` | Area or stacked area chart |
| `bar_chart` | 420 | 300 | `4x3` | Vertical bar chart |
| `horizontal_bar_chart` | 460 | 300 | `4x3_or_5x3` | Horizontal bar chart; left labels need room |
| `stacked_bar_chart` | 480 | 320 | `4x4` | Stacked or percentage bar chart |
| `combo_chart` | 520 | 340 | `5x4` | Bar-line combo or dual-axis chart |
| `scatter_chart` | 460 | 320 | `4x4` | Scatter plot |
| `bubble_chart` | 480 | 340 | `4x4` | Bubble chart |
| `parallel_coordinates` | 560 | 360 | `6x4_or_8x4` | Parallel coordinates need multi-axis width |
| `pie_chart` | 320 | 320 | `3x3_or_4x3` | Pie chart needs near-square plot |
| `donut_chart` | 360 | 320 | `3x3_or_4x3` | Donut chart, often with center metric |
| `funnel_chart` | 420 | 300 | `4x3` | Ordered conversion funnel; horizontal bar default |
| `waterfall_chart` | 520 | 320 | `5x4` | Waterfall or attribution chart |
| `radar_chart` | 360 | 340 | `4x4` | Radar chart |
| `treemap_chart` | 420 | 320 | `4x3` | Treemap chart |
| `sunburst_chart` | 420 | 360 | `4x4` | Multi-level sunburst hierarchy |
| `heatmap_chart` | 480 | 340 | `5x4` | Matrix heatmap |
| `calendar_heatmap` | 640 | 280 | `6x3_or_8x3` | Calendar heatmap |
| `boxplot_chart` | 480 | 320 | `4x4` | Boxplot |
| `histogram_chart` | 420 | 280 | `4x3` | Histogram or distribution chart |
| `table` | 720 | 360 | `8x4` | Standard data table; Detail Tables need row and column budget |
| `grouped_table` | 760 | 400 | `8x4_or_8x5` | Table with complex/grouped headers; header depth and body rows both need budget |
| `pivot_table` | 760 | 360 | `8x4_or_8x5` | Pivot or cross-summary table |
| `ranking_table` | 420 | 300 | `4x3` | Ranking list or Top N table |
| `matrix_table` | 520 | 360 | `5x4_or_6x4` | Matrix, score, or 2D metric table |
| `detail_list` | 360 | 240 | `4x3` | Detail, event, or log summary list |
| `text_block` | 360 | 180 | `4x2` | Analysis text |
| `insight_block` | 420 | 200 | `4x2` | Insight card |
| `conclusion_block` | 600 | 180 | `8x2` | Conclusion section |
| `recommendation_block` | 600 | 220 | `8x3` | Recommendations, actions, next steps |
| `analysis_summary_bar` | 280 | 56 | `4x1_or_8x1` | One-line analysis summary or conclusion strip |
| `analysis_insight_card` | 320 | 128 | `3x2_or_4x2` | One conclusion with evidence/action |
| `analysis_diagnosis_card` | 480 | 180 | `4x2_or_5x2` | Anomaly, attribution, risk, target diagnosis |
| `analysis_side_panel` | 220 | 240 | `2x3_or_3x3` | Chart-side insight list, max 25% of parent area |
| `analysis_annotation_bubble` | 120 | 40 | `chart_overlay` | Chart annotation, max 240x96 and max 3 visible |
| `path_chart` | 560 | 320 | `6x4_or_8x4` | User/business/process path chart |
| `conversion_path` | 560 | 320 | `6x4_or_8x4` | Conversion or drop-off path |
| `relationship_graph` | 560 | 420 | `6x5_or_8x5` | Entity relationship graph |
| `dependency_graph` | 560 | 420 | `6x5_or_8x5` | Dependency graph or impact chain |
| `sankey_chart` | 640 | 360 | `6x4_or_8x4` | Sankey flow chart |
| `flow_chart` | 560 | 360 | `6x4` | Business process flow |
| `org_chart` | 640 | 420 | `8x5` | Organization chart |
| `tree_diagram` | 600 | 420 | `6x5_or_8x5` | Tree diagram |
| `topology_graph` | 640 | 460 | `8x5` | System topology or architecture graph |
| `timeline` | 640 | 220 | `8x3` | Timeline or milestones |
| `gantt_chart` | 760 | 360 | `8x4_or_8x5` | Gantt chart |
| `duPont_chart` | 720 | 420 | `8x5` | DuPont financial decomposition chart |
| `map` | 480 | 360 | `4x4_or_8x4` | Map visualization |
| `geo_heatmap` | 560 | 420 | `6x5_or_8x5` | Geographic heatmap |

### Analysis & Insight Component Rules

- Analysis & Insight blocks include conclusion cards, insight cards, anomaly/risk cards, attribution summaries, recommendation/task cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, and permission/no-result/delay notes.
- A valid block carries `analysisInsightContract` in the component mapping or widget config: subtype, insight family, conclusion, evidence, affected object, action/trust/source/freshness, local-filter scope, tooltip/detail path, and state rules.
- Reserve conclusion, evidence, action/trust/source/freshness, optional local filter, tooltip/detail, and state-message zones before span acceptance.
- Summary bars stay `36-56px` high and use one sentence. Small cards stay `88-128px` high, standard cards `120-180px`, enhanced diagnosis cards `160-240px`.
- Chart-side insight panels use `insightW = clamp(200px, W * 0.28, 320px)` and should not exceed `25%` of the chart/Composite Panel area unless the parent is explicitly an explanation panel.
- Annotation bubbles use `120-240px` width and `40-96px` height, with `12-48px` leader line and max `3` visible annotations. They cannot cover axis labels, legends, selected marks, or the anomaly point they explain.
- If an analysis block needs more than `5` body rows, split it, shorten copy, turn it into a side panel, or move detail to drawer/fullscreen. Do not shrink text below baseline readability.
- Explanatory empty/no-permission/data-delay states need reason, impact, and next step, not only `暂无数据`.

### Composite Panel Rules

- `composite_panel` blocks are parent blocks that contain one business analysis unit, not a free collection of widgets. Require one shared topic, one primary child, child roles/priorities, and a declared `compositePanelContract` before span acceptance.
- Recommended outer size is `640-960px` wide and `360-560px` high. Minimum outer size is `320x260px` only after subtitle, auxiliary child, detail preview, shared legend, and footer have collapsed.
- Reserve title/function/local-filter, optional subtitle/unit/source, optional metric strip, main child, auxiliary child area, optional short detail preview, shared legend, tooltip/detail route, and state-message zones.
- Content body must remain dominant: `contentH >= CH * 0.60`. If it fails, hide footer, reduce metric strip, collapse local filter, hide shared legend, collapse detail preview, then hide auxiliary children before shrinking the primary child.
- Default visible child count is `2-3`; normal maximum is `4`. More than `4` visible analytical children require split blocks, tabs, drawer/fullscreen, or a documented large-container exception.
- Primary child visual weight should be `50-70%`. Auxiliary area should stay `20-35%`. Notes, definitions, and footer actions should stay `5-10%`.
- Main/side layouts require `W >= 640px` and `H >= 320px`; `2 x 2` matrix layouts require `W >= 720px` and `H >= 420px`; metric + main + side + bottom detail requires roughly `W >= 960px` and `H >= 540px`.
- Detail preview stays short: `3-6` rows and `3-5` columns. Larger details need a full Detail Table block, drawer, fullscreen, or route.
- Child minimums: metric `120x72`, line `220x140`, bar `240x160`, pie/donut `180x160`, Top list `140x120`, detail preview `240x120`, heatmap `240x160`, map `280x220`, gauge `180x160`.
- Split the block when children answer different questions, need independent full title/filter/action bands, or internal scrolling becomes the main way to understand the panel.

### Detail Table Rules

- `table` blocks that represent Detail Tables need title/function/local-filter, optional metric strip, optional compact search/tools, fixed header, body rows, optional summary row, pagination/total, tooltip/detail, and state-message zones before span acceptance.
- The body must remain dominant: `tableBodyAreaH >= CH * 0.55`. Default visible rows should be `4-6`; fewer than `3` visible rows fails unless the block is explicitly a small preview with a detail route.
- Recommended outer size is `560-960px` wide and `360-560px` high. Minimum preview size is `280x220px` only when subtitle, metric strip, toolbar, low-priority columns, footer, and full pagination are collapsed.
- Default visible columns are `5-8`; large blocks may show `8-12`; `11-16` columns require horizontal scroll plus frozen primary column; `>16` columns require column settings/drawer/split; `>24` should not be one flat table.
- Row height defaults to `40px`; compact rows are `32-36px`; relaxed rows are `48-56px` only for avatar/two-line content. Do not shrink text or row height below readability just to pass the span.

### Grouped Table Header Rules

- `grouped_table`, wide Detail Table, metric matrix, financial grid, or table blocks with `>8` visible columns/natural field groups need a grouped-header budget before span acceptance.
- Reserve title/function/local-filter, optional subtitle/metric strip, grouped header rows, leaf header row, body rows, optional summary row, pagination/total, tooltip/detail, and state-message zones.
- Header depth defaults to `2`, max accepted display depth is `3`; `headerRowH = 32-40px`; total header height is roughly `64-80px` for two levels and `96-116px` for three levels.
- The table body must still show at least `4` useful rows by default. If grouped headers leave fewer than `3` rows, enlarge/split, collapse groups, remove header subtext, compact rows, use fullscreen/detail, or redesign.
- Leaf columns `<=8` display directly; `9-16` may use horizontal scroll; `17-30` need frozen key columns plus column settings; `31-50` need group collapse or settings; `>50` needs redesign, pivot, column paging, or configuration view.
- The whole multi-level header fixes during vertical body scroll. When horizontal scroll exists, the top-left grouped header and row-dimension/primary columns freeze together.
- Component-local filters sit in the component-owned title/function area and must not be confused with leaf-column filter icons inside the grouped header.

### Pivot Table Rules

- `pivot_table` or visualType `pivot` blocks need title/function/local-filter, optional metric strip, row dimension header, multi-level column header, measure header, data body, subtotal/grand-total bands, scroll/virtual viewport, tooltip/drilldown, and state-message zones before span acceptance.
- The pivot body must remain dominant: `pivotAreaH >= CH * 0.55`. At least `4` body rows should be visible unless the block is a named preview with fullscreen/detail route.
- Recommended outer size is `640-1200px` wide and `360-640px` high. Minimum preview size is `320x240px` only when subtitle, metric strip, toolbar, footer, low-priority measures, and full pagination are collapsed.
- Default row dimension depth is `1-2`; default column dimension depth is `1-2`; default visible measures are `1-3` and maximum visible measures are `5`.
- Rows `<=50` and columns `<=12` can display directly. Rows `51-200` or columns `13-24` require fixed headers and scroll. Rows `>200` require row virtualization. Columns `>24` require horizontal scroll and frozen row dimension columns. Columns `>50` require dimension reduction, column paging, fullscreen, or redesign.
- Percentage/rate totals need formula space and tooltip evidence; do not accept a layout that hides aggregation definitions or makes subtotal/grand-total semantics ambiguous.
- Conditional formatting must not dominate the matrix. Reserve it for `1-2` core measures; if every cell family needs color, consider heatmap or split views.

### Combo Chart Rules

- `combo_chart` blocks need more axis and legend budget than ordinary bar or line charts: reserve title/function/local-filter area, optional metric strip, legend, left y-axis, optional right y-axis, x-axis label band, target/reference right-gap, tooltip guide, and state-message zone before accepting the span.
- Recommended outer size is `560-960px` wide and `360-480px` high; minimum is `320x240px` only when subtitle, metric strip, ordinary labels, footer, and secondary legend items are collapsed.
- The inner plot remains dominant: `plotH >= CH * 0.48`. Collapse footer, secondary metric strip, legend detail, component-local filters, ordinary data labels, and line points before shrinking the plot.
- Combo blocks are valid only when bar and line/target metrics share one ordered category/time axis. If the relationship is weak or exact audit is the task, allocate separate bar/line/table blocks instead of forcing a dual-axis chart.
- Use `4x3` only for simple one-bar + one-line states with short labels. Use `5x4`, `6x4`, or larger when dual axes, target labels, grouped/stacked bars, or `N > 12` categories are present.

### Gauge Rules

- `gauge_kpi` or Gauge chart blocks need enough width and height for title/local filter, center value, arc geometry, min/max ticks, target marker, and optional status text. Treat the table minimum above as the outer block minimum; the inner Gauge body still needs `gaugeAreaH >= CH * 0.50`.
- Default to a semicircle Gauge in ordinary report blocks. Circular or `240deg` gauges require larger height and a documented monitoring/display reason.
- Preserve a centered fit box: semicircle/circle arcs must not be stretched independently on X/Y. If the body ratio fails, use a KPI card, progress bar, bullet/target card, or larger block before distorting the Gauge.
- Center value plus unit is the visual anchor. Hide footer, metric strip, middle ticks, threshold text, target label, and legend before reducing the center value below readable size.
- Recommended Gauge block: `280-420px` wide and `240-340px` high; minimum usable body is about `220x180px` only when subtitle, metric strip, legend, and target labels are hidden.
- Threshold segments stay `3-4` by default and `<=5`; target label is optional, but target tick and tooltip should remain when target is business-critical.
- Multiple Gauge blocks in one view must share range, gauge type, typography, status colors, radius ratio, and threshold semantics. Otherwise use KPI cards or a comparison table.

### Funnel Rules

- `funnel_chart` needs enough width for left stage labels, the bar/funnel body, and right value/share labels. Treat the table minimum above as the outer block minimum; the inner funnel body still needs `funnelAreaH >= CH * 0.52`.
- Default to a horizontal bar funnel in report blocks. A traditional trapezoid funnel needs a larger display/storytelling block, short labels, and few stages.
- `3-5` stages are the clearest, `6-7` may fit the minimum block, `8-10` requires compact mode or folding, and `>10` should use process table, path chart, Sankey, or scroll/folded detail.
- Preserve `stageLabelW = 56-120px`, `valueLabelW = 72-160px`, `barGap = 12-16px`, and `stageH >= 20px`. If any budget fails, enlarge the span or remove optional footer/metric/legend/loss labels before shrinking text.
- Component-local filters must stay in the title/header area and collapse before they reduce the funnel body below the height floor.
- Legend is normally omitted for a single funnel; comparison/target legends require a width/height budget and at most two visible groups.
- Do not place funnel charts in narrow strips where stage names, conversion values, or exact-value tooltip targets become unreadable.

### Treemap Rules

- `treemap_chart` needs enough body height for parent groups, child rectangles, label thresholds, legend/visualMap, breadcrumb, and component-local filters. Treat the table minimum above as the outer block minimum; the inner treemap body still needs `treemapAreaH >= CH * 0.55`.
- `leaf_count <= 12`: full display may fit in the minimum block when labels pass thresholds.
- `13 <= leaf_count <= 30`: use Top N and hide small labels.
- `31 <= leaf_count <= 80`: use Top N + `其他`; consider a wider/taller span when parent labels matter.
- `leaf_count > 80`: use drilldown, search, pagination, fullscreen, ranked bar, or table fallback before declaring the layout valid.
- `depth > 2`: require breadcrumb/drilldown; `depth > 3` should not render all levels in one block.
- Negative values, rate-only metrics, scores, or unclear hierarchy cannot use treemap area. Route to bar, waterfall, table, tree, or relation graph as appropriate.
- If tiny rectangles dominate or permanent labels cannot pass `48px * 28px`, aggregate long-tail leaves, reduce visible levels, or enlarge the block.

### Sunburst Rules

- `sunburst_chart` needs enough body height for center content, visible rings, sector label thresholds, legend/visualMap, breadcrumb, and component-local filters. Treat the table minimum above as the outer block minimum; the inner sunburst body still needs `sunburstAreaH >= CH * 0.55`.
- The sunburst viewport should be aspect-compatible and centered. Do not allocate a narrow strip and stretch the radial chart; use a centered fit box, a larger span, fullscreen, or another component.
- Visible levels default to `2-3`; `4` levels require a large block and key-only labels; `5+` levels require drilldown, search, table detail, or another view.
- Ring budget must pass: `innerR = outerR * 0.22-0.34`, default `0.28`, `ringGap = 1-3px`, and `ringW >= 18px`. If `ringW < 18px`, reduce visible levels or enlarge the block before shrinking text.
- `node_count <= 20`: direct display may fit in the minimum block when sector labels pass thresholds.
- `21 <= node_count <= 50`: use Top N + `其他`.
- `51 <= node_count <= 100`: use drilldown or only two visible levels.
- `node_count > 100`: do not render full sunburst by default; use search, table/detail, Treemap, or drilldown.
- `children_per_parent > 12`: hide small/deep labels or use Top N; `> 20` requires Top N plus drilldown/search/detail.
- Negative values, rate-only metrics, scores, or unclear hierarchy cannot use sunburst angle. Route to bar, waterfall, table, tree, relation graph, or Treemap as appropriate.
- If tiny sectors dominate or permanent labels cannot pass `sectorAngle >= 10deg`, `ringW >= 22px`, and arc-length fit, aggregate long-tail sectors, reduce visible levels, or enlarge the block.

### Parallel Coordinates Rules

- `parallel_coordinates` needs enough body width for `3-12` vertical axes, axis titles, line density, highlighted objects, brush ranges, legend, and component-local filters. Treat the table minimum above as the outer block minimum; the inner plot still needs `plotH >= CH * 0.48`.
- Axis spacing must pass `axisGap = plotW / (dimension_count - 1)`. Minimum `axisGap` is `56px`, and long axis titles should use `72-96px`. If the gap fails, reduce visible dimensions, use horizontal scroll, enlarge to an `8x4` span, or switch to table/scatter/bar fallback.
- `dimension_count < 3` should not use parallel coordinates; use scatter, bar, KPI, or table. `3-5` dimensions are clearest, `6-8` are the recommended upper range, `9-12` require short labels and tick reduction, and `>12` requires dimension filtering or another component.
- Sample count controls density: `<=30` lines may display normally, `31-100` lowers ordinary-line opacity, `101-500` needs very low opacity plus brush/filter, and `>500` needs sampling, aggregation, density view, or detail table fallback.
- Collapse footer, secondary metric strip, legend, and local filters before shrinking the plot. Axis titles and exact-value tooltip/detail access are not optional.

## 6. Complexity-Based Size Expansion Rules

After applying the component type's base minimum size, expand the required size according to content complexity.

### KPI Rules

If a KPI contains any of the following, it is not `simple_kpi`:

- more than one secondary metric;
- sparkline;
- progress bar;
- gauge;
- multiline explanation;
- more than two comparison values.

Reclassify it as `rich_kpi`, `mini_chart_kpi`, `progress_kpi`, or `gauge_kpi`.

### Chart Rules

For charts:

```text
if legend_item_count > 4:
  min_outer_height_px += 40

if legend_item_count > 8:
  min_outer_width_px += 80
  min_outer_height_px += 60

if x_axis_label_count > 6:
  min_outer_height_px += 32

if x_axis_label_count > 12:
  min_outer_width_px += 80
  min_outer_height_px += 48

if y_axis_label_max_length > 8 Chinese characters:
  min_outer_width_px += 48
```

Never solve chart overcrowding only by reducing font size. Increase span, reduce label density with a reversible interaction, split, or paginate.

### Table Rules

For tables:

```text
if column_count > 6:
  min_outer_width_px = max(min_outer_width_px, 760)

if column_count > 10:
  min_outer_width_px = max(min_outer_width_px, 900)
  use horizontal scroll, column hiding, or pagination

if row_count > 20:
  min_outer_height_px += 96
  prefer pagination or virtual scrolling

if visible_rows < 5:
  increase row_span or paginate
```

### Path Chart Rules

For `path_chart`, `conversion_path`, `flow_chart`, and similar ordered path components:

```text
if node_count <= 8 and link_count <= 8:
  use base minimum size

if 9 <= node_count <= 20 or 9 <= link_count <= 20:
  min_outer_width_px += 120
  min_outer_height_px += 60
  hide ordinary path labels before shrinking path viewport

if 21 <= node_count <= 40 or 21 <= link_count <= 50:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 420)
  prefer 8-column full-width layout
  require Top N, aggregation, pagination, or horizontal scroll

if node_count > 40 or link_count > 50:
  do not render as a full path chart
  filter, paginate, aggregate into "other", switch to Sankey/relation graph, or provide a detail table
```

### Relationship Graph Rules

For `relationship_graph`, `dependency_graph`, `topology_graph`, and similar graph components:

```text
if node_count <= 30 and edge_count <= 50:
  use base minimum size

if 31 <= node_count <= 80 or 51 <= edge_count <= 150:
  min_outer_width_px += 120
  min_outer_height_px += 80
  hide ordinary labels before shrinking graph viewport

if 81 <= node_count <= 150 or 151 <= edge_count <= 300:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 520)
  prefer 8-column full-width layout
  require aggregation, filtering, neighborhood focus, or layered loading

if edge_count > node_count * 2:
  min_outer_width_px += 120
  min_outer_height_px += 80

if node_count > 150 or edge_count > 300:
  default to local exploration, aggregation, filtering, or fullscreen

if node_count > 300 or edge_count > 300:
  do not render as a dense single graph
  split by cluster, paginate, collapse nodes, or provide a summary table
```

### Sankey Rules

For `sankey_chart`:

```text
recommended_width_px = 560-960
recommended_height_px = 360-520
minimum_width_px = 320
minimum_height_px = 260

sankeyAreaH must be >= CH * 0.55

if stages_count <= 4 and node_count <= 12 and link_count <= 20:
  use base minimum size

if node_count > 12 or link_count > 20:
  min_outer_width_px += 120
  min_outer_height_px += 80
  hide ordinary link labels before shrinking Sankey viewport

if 31 <= node_count <= 60 or 51 <= link_count <= 100:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_height_px = max(min_outer_height_px, 440)
  require Top N + "other", long-tail weakening, or local filtering

if node_count > 60 or link_count > 100:
  do not render as one full Sankey
  use aggregation, drilldown, fullscreen, path/funnel/table fallback, or split by stage

if stages_count > 4:
  min_outer_width_px = max(min_outer_width_px, 760)
  min_outer_width_px += 120
  use 8-column full-width layout

if stages_count > 5:
  use drilldown, pagination, path chart, or table fallback

if assigned_span is 2x2:
  reject; Sankey requires at least 3x2 because horizontal layer spacing is decision-critical

if actual_flow_width_px < 180:
  use simplified mode: title, compact local filter, Top5 flows, key nodes only, no metric strip, no legend row, no permanent link labels

node labels:
  nodeH >= 28px => name + value
  nodeH >= 16px => name only
  nodeH < 16px => tooltip only

link labels:
  show only for main/loss/anomaly flows
  require linkW >= 8px and no overlap

negative value:
  invalid for Sankey; choose another chart

unbalanced flow:
  expose "loss", "unknown", or "other" nodes rather than disappearing flow

local filters:
  collapse to dropdown before shrinking the Sankey body
  never mix with legend or page/global filters

recommended default:
  3-4 layers, Top10 + other, nodeW 10-14px, nodeGap 8-16px, link opacity 35%-60%, main flow 70%-90%
```

### Flow Chart Rules

For `flow_chart`:

```text
if step_count <= 5:
  use base minimum size

if step_count > 5:
  min_outer_width_px += 120
  min_outer_height_px += 80

if step_count > 10:
  use full-width layout or split into phases
```

### Org Chart / Tree Diagram Rules

For `org_chart`, `tree_diagram`, and `duPont_chart`:

```text
if tree_depth > 4:
  min_outer_height_px += 96

if max_nodes_per_level > 4:
  min_outer_width_px += 160

if total_node_count <= 30 and tree_depth <= 4:
  visible tree may be complete

if total_node_count > 30 or tree_depth > 4:
  default expand only 2-3 levels
  collapse deeper branches

if total_node_count > 80 or max_child_count > 12:
  require expand/collapse, search/locate, and Top N/+N child display

if total_node_count > 150 or tree_depth > 10 or max_child_count > 30:
  use indented tree list, virtual scroll, pagination, fullscreen, or table/detail fallback
```

### Gantt Chart Rules

For `gantt_chart`:

```text
if task_count > 8:
  min_outer_height_px += 96

if task_count > 16:
  use pagination or vertical scrolling

if time_bucket_count > 8:
  min_outer_width_px = max(min_outer_width_px, 900)
  use full-width layout
```

### Map Rules

For `map` and `geo_heatmap`:

```text
if region_label_count > 8:
  min_outer_width_px += 80
  min_outer_height_px += 60

if marker_count > 50:
  use clustering

if marker_count > 200:
  do not render all markers directly
  use aggregation, clustering, or heatmap
```

### Text Capacity Rule

Estimate text height before rendering:

```text
average_char_width_px =
font_size_px * 0.9 for Chinese text
font_size_px * 0.55 for English text
font_size_px * 0.75 for mixed text

estimated_lines =
ceil(text_character_count * average_char_width_px / component_content_width_px)

estimated_text_height_px =
estimated_lines * line_height_px
```

If estimated text height exceeds content height, increase span, shorten text, split, collapse secondary text, or move details to drawer.

## 7. Practical Presets

Use these rounded values for planning visible block size. Exact implementation may use CSS variables from the selected template, but the layout decision must remain consistent with these limits. These presets do not cap total report height.

### Full-Width 1920 Viewport

Applies to custom pages, `topbar-dark-scroll-dashboard-template`, and `topbar-light-scroll-dashboard-template`.

- `contentWidth = 1920`
- `gap = 14`
- `rowHeight = 316`
- `columnWidth = 228`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `1*N` | 228 | 316 | 646 | 976 |
| `2*N` | 470 | 316 | 646 | 976 |
| `3*N` | 711 | 316 | 646 | 976 |
| `4*N` | 953 | 316 | 646 | 976 |
| `5*N` | 1195 | 316 | 646 | 976 |
| `6*N` | 1437 | 316 | 646 | 976 |
| `7*N` | 1678 | 316 | 646 | 976 |
| `8*N` | 1920 | 316 | 646 | 976 |

### Left-Nav 1920 Viewport

Applies to `left-nav-analytics-workbench-template` with expanded sidebar.

- `contentWidth = 1664`
- `gap = 16`
- `rowHeight = 320`
- `columnWidth = 194`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `1*N` | 194 | 320 | 656 | 992 |
| `2*N` | 404 | 320 | 656 | 992 |
| `3*N` | 614 | 320 | 656 | 992 |
| `4*N` | 824 | 320 | 656 | 992 |
| `5*N` | 1034 | 320 | 656 | 992 |
| `6*N` | 1244 | 320 | 656 | 992 |
| `7*N` | 1454 | 320 | 656 | 992 |
| `8*N` | 1664 | 320 | 656 | 992 |

### Sci-Fi 1920 Cockpit

Applies to `frozen-title-sci-fi-cockpit-template` when the content area starts near `Y = 118` and uses 3 visible grid rows.

- `contentWidth = 1920`
- `gap = 10`
- `availableContentHeight = 962`
- `rowHeight ~= 314`
- `columnWidth = 231`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `1*N` | 231 | 314 | 638 | 962 |
| `2*N` | 473 | 314 | 638 | 962 |
| `3*N` | 714 | 314 | 638 | 962 |
| `4*N` | 955 | 314 | 638 | 962 |
| `5*N` | 1196 | 314 | 638 | 962 |
| `6*N` | 1438 | 314 | 638 | 962 |
| `7*N` | 1679 | 314 | 638 | 962 |
| `8*N` | 1920 | 314 | 638 | 962 |

If a sci-fi page needs 4 visible rows, row height drops to about `233px`; only compact KPI, status, and simple chart blocks should use one row.

### Full-Width 1280 Viewport

Applies to small custom pages and small topbar scroll template previews.

- `contentWidth = 1280`
- `gap = 10`
- `rowHeight = 220`
- `columnWidth = 151`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `1*N` | 151 | 220 | 450 | 680 |
| `2*N` | 313 | 220 | 450 | 680 |
| `3*N` | 474 | 220 | 450 | 680 |
| `4*N` | 635 | 220 | 450 | 680 |
| `5*N` | 796 | 220 | 450 | 680 |
| `6*N` | 958 | 220 | 450 | 680 |
| `7*N` | 1119 | 220 | 450 | 680 |
| `8*N` | 1280 | 220 | 450 | 680 |

### Left-Nav 1280 Viewport

At `1280x768`, prefer collapsed or low-intrusion navigation. With a collapsed `80px` sidebar:

- `contentWidth = 1200`
- `gap = 10`
- `rowHeight = 220`
- `columnWidth = 141`

| Span | Width | 1 row | 2 rows | 3 rows |
| --- | ---: | ---: | ---: | ---: |
| `1*N` | 141 | 220 | 450 | 680 |
| `2*N` | 293 | 220 | 450 | 680 |
| `3*N` | 444 | 220 | 450 | 680 |
| `4*N` | 595 | 220 | 450 | 680 |
| `5*N` | 746 | 220 | 450 | 680 |
| `6*N` | 898 | 220 | 450 | 680 |
| `7*N` | 1049 | 220 | 450 | 680 |
| `8*N` | 1200 | 220 | 450 | 680 |

Do not keep a wide 256px sidebar permanently open on a 1280-wide work surface unless the report is navigation-first and content density is intentionally reduced.

## 8. Composite Block Checks

When one parent block contains internal sub-blocks, check the parent block against the most demanding sub-block plus the required `5px` parent-to-sub-block inset, `5px` sibling sub-block gaps, headers, dividers, controls, legends, and state surfaces. Then check every sub-block against the component it owns.

For composed parent blocks:

```text
subBlockInset = 5px
subBlockGap = 5px
usableSubBlockAreaWidth = parentBodyWidth - subBlockInset * 2
usableSubBlockAreaHeight = parentBodyHeight - subBlockInset * 2
```

If the internal layout has multiple columns or rows, subtract `subBlockGap * (columnCount - 1)` from the width axis and `subBlockGap * (rowCount - 1)` from the height axis before calculating each sub-block viewport.

Split into separate parent grid blocks, tabs, drawer, fullscreen, or drilldown when:

- sub-blocks answer different business questions;
- each sub-block needs an independent block-level title, filter, action, or drilldown path;
- any sub-block's final validated size cannot be safely represented inside the parent block;
- there are more than four analytical sub-blocks visible at once unless they are repeated peers that pass the internal `M * N` and parent-height checks;
- internal scrolling becomes the main way to understand the block.

KPI/status peers should use the exact internal sub-block layout rule only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout. When the algorithm applies, prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M >= N`, and `M - N` is minimal among valid factor pairs. Every tile/sub-block still needs pixel validation; split the group when the factor pair is unreadable.

For a composed large parent block, the internal matrix feeds the parent height decision. If the internal peer layout has `N` rows, calculate the parent block height expansion with:

```text
heightExpansionRows = ceil(N * 2 / 3)
```

Then calculate the parent block body height needed as:

```text
requiredParentBodyHeight =
  subBlockInset * 2
  + heightExpansionRows * childMinOuterHeight
  + max(0, heightExpansionRows - 1) * subBlockGap
  + internalControlsOrDividerReserve
```

If the current parent body height is smaller, expand the parent block's row span until it passes. In practical terms, a block that could carry one row of child tiles uses roughly `N * 2 / 3` as the height expansion baseline when the internal matrix has `N` rows; convert fractional results to whole page-grid rows by rounding up. Do not reduce row height, padding, title height, or child chart/table body height to make the current parent block pass.

## 9. Layout Rules

- The page-grid span belongs to the top-level parent block; internal sub-blocks must not create nested page grids.
- Internal sub-blocks are local layout regions inside the parent body. They may use local grid/flex tracks, but they must have explicit min size, gap, overflow, and state behavior.
- Internal sub-blocks use `5px` inset from the parent body and `5px` sibling gaps. Do not silently collapse these gaps to make a cramped block pass.
- Do not treat `1920x1080` or `1280x768` as the report's maximum height.
- Do not reduce `N`, row height, title space, chart body height, or table body height to force the full report into one viewport.
- Do not divide available viewport height by `N` to create smaller rows.
- Do not skip the default span distribution before size checking.
- Do not render any component whose computed outer size or content viewport is smaller than its final required size.
- Do not accept domain navigation, Tabs, or Segment controls whose visible item/card content viewport fails `scrollHeight <= clientHeight` or `scrollWidth <= clientWidth` at `1920x1080` or `1280x768`.
- Do not pack more than two primary information layers into one perspective navigation card.
- Do not accept fixed-height navigation/cards without a declared padding, line-height, gap, and height-budget calculation.
- Do not accept fixed-height navigation/cards whose measured DOM has `scrollHeight > clientHeight` or `scrollWidth > clientWidth`, even if the screenshot looks acceptable.
- Do not duplicate block titles inside chart/table/KPI bodies.
- Do not make peer components too narrow, tiny, crowded, or unreadable; when `actualTotal > 4`, use internal exact `M * N` layouts, expand the parent block, split sections, or move details to drawer/fullscreen.
- Do not use a generic `chart`, `table`, `map`, or `other` label when a precise component type exists.
- Do not use more than one internal scroll area in one block.
- If a title, legend, axis label, table column, toolbar, or status tag does not fit, increase the span or simplify the component.
- On `1280x768`, promote mixed components by at least one span tier compared with 1920 planning.
- If a block needs long explanations, detailed table review, or multiple independent actions, use a drawer/detail page instead of expanding the card forever.

## 10. Selection Steps

1. Choose the business question for the block.
2. Decide whether the parent block is single-component or internally sub-blocked.
3. If internally sub-blocked, define sub-blocks, component owner, local tracks, `5px` parent inset, `5px` sibling gap, and state behavior.
4. Pick a default candidate parent span from `grid-containers.md`.
5. Classify the dominant component with the detailed size table and validate every sub-block component against its own minimum.
6. Apply base minimum size and complexity expansion.
7. Compute actual parent outer/body pixel size and sub-block viewport sizes.
8. For fixed-height navigation/cards, declare padding, explicit line-height, row count, gaps, and footer/status heights; verify `requiredContentHeight <= cardHeight`.
9. For domain navigation, Tabs, and Segments, run DOM no-clipping checks at `1920x1080` and `1280x768`: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
10. Keep the default span if it passes; otherwise try the next larger candidate span or redesign the block.
11. If total report height exceeds the first viewport, keep block sizes and enable vertical scrolling.
12. If the block still fails any constraint, either:
   - increase the span,
   - switch simultaneous sub-blocks/components to tabs/segmented views,
   - move details to a drawer/modal,
   - or split into separate `8 * N` blocks.
