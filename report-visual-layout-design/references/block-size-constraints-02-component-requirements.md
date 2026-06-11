# Component Size Requirements

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

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
