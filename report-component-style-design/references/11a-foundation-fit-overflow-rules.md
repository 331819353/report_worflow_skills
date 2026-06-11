# Foundation Fit And Overflow Rules

This file was split from `11-detailed-style-rules.md`. Load it only for this focused rule group; use `11-detailed-style-rules.md` as the routing index.

## Universal Component Principles

Apply these rules to every report component:

- Wrap every component in the shared card base, including text summaries, KPI groups, charts, tables, and empty states.
- Start from available size: before designing or implementing a component, obtain the component's usable width and height, then choose layout density, typography, chart orientation, legend position, table columns, and content hierarchy according to that size.
- Use the same card base by default: `#FFFFFF` background in light enterprise pages, 8px radius, `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)`, no hard default border, and 24px internal padding.
- For explicitly dark or cockpit themes, use the same card geometry and hierarchy with an approved dark panel token; do not mix unrelated glass, gradient, border, or shadow styles inside one page.
- Center by default: align the component's main content horizontally and vertically within its visual body unless the component type requires top-left scanning, such as tables and long text.
- Fit the viewport: use the assigned block as the visible container. Do not let inner content overflow, clip, or depend on hard-coded size.
- Preserve readability: labels, values, legends, axes, and text must remain legible and not overlap graphics.
- Avoid truncation: truncate only low-priority metadata and provide tooltip/full text; never truncate core KPI values, key labels, warnings, or action text.
- Keep contrast sufficient: avoid text, gridlines, or labels that are too pale to read.
- Keep style unified: all components on the same page should share radius, border, shadow, typography, color semantics, spacing, and control style.
- Prefer restrained internet style: clean surfaces, subtle borders, crisp icons, soft status color, compact controls, and clear interaction states.
- Prioritize meaning over decoration: component style should help scanning, comparison, and action.


## Available Size First

Every component design must begin by measuring the real usable area. Do this before choosing the visual form or filling in content.

Measure these layers separately:

- Assigned block size: the resolved grid columns, rows, row height, gaps, and responsive container width.
- Card inner size: assigned block minus card padding, border, and reserved safe space.
- Header/action/footer size: title, subtitle, status badge, actions, legend, notes, and pagination.
- Body viewport size: the remaining width and height available to the chart, table, KPI group, text, or diagram.
- Minimum viable component size: the smallest size that can show core values, units, labels, warnings, axes, legends, controls, and essential evidence without clipping or unreadable text.

Design from those numbers:

- If the body viewport is narrow, reduce columns, stack secondary metadata, move legends below or into a menu, switch horizontal charts to vertical lists, or use tooltip/drawer for secondary details.
- If the body viewport is short, reduce noncritical rows, move notes/actions to header or drawer, use pagination/internal scroll for repeated records, or increase row span.
- If both width and height are insufficient for the component's minimum viable size, do not force the component into that block. Expand the grid span, split the component into multiple blocks, or move secondary content to drawer/fullscreen.
- Do not solve insufficient size by shrinking core KPI values, labels, warnings, action text, or chart/table text below readable limits.

Implementation expectations:

- Use `ResizeObserver`, container query logic, or template-provided viewport dimensions to know the component's width and height.
- Initialize ECharts, AntV S2, custom SVG/canvas, and complex diagrams only after their body viewport has measurable width and height.
- Recompute layout when filters, tabs, drawers, fullscreen state, or grid span changes alter the available size.
- In design output, state the required minimum body size or required span for any component at risk of clipping.


## Global Style Contract

Use this contract as the default for any generated frontend component unless an existing product design system gives stricter tokens.

### Cards And Containers

- Every component must sit in one unified card container; do not leave standalone charts, text blocks, filters, or tables floating directly on the page.
- Light theme card: `background: #FFFFFF`, `border-radius: 8px`, `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)`, `border: 0`, `padding: 24px`.
- Avoid nested visual cards inside the card body. If a component needs grouping, use spacing, subtle dividers, or table/grid structure before adding another framed card.
- The block title is plain text at the top-left of the card, not a boxed header. A small accent line/divider is allowed if it does not look like a second container.
- The component body inherits the card background; do not create a smaller inset background that leaves a white or mismatched gap around the safety line.

### Typography Hierarchy

- Module title: 16px, `font-weight: 600`, color `#333333` in light theme, one line unless the block is deliberately narrative.
- Core KPI value: 28-32px, numeric font or clean sans-serif, color brand primary or near-black.
- Unit, helper label, YoY/MoM label, source, and metadata: 12-14px, lighter neutral such as `#888888`.
- Text summaries are left-aligned. KPI numbers inside comparison tables/lists are right-aligned so magnitudes compare vertically.
- Do not shrink text below readability to force a crowded layout; choose a larger final span or move details to drawer/tooltip.

### Semantic Color System

- Define one global palette per page. Do not let every chart choose unrelated colors.
- HTML/source/custom layouts may preserve structure and module rhythm, but colors, typography, spacing, radius, shadows, semantic states, and controls should still come from the selected global UI tokens unless exact restoration is explicitly requested.
- Current/actual/completed values use the brand primary color.
- Target, baseline, plan, and reference values use neutral gray or a pale brand tint.
- Negative/risk/unreached/warning states use one red family; positive/healthy/reached/growth states use one green family.
- The red/green business semantics must be globally unique on the page. If the company uses red for growth, apply that consistently and document it in the style output.
- Color is never the only signal: pair semantic color with text, icon, sign, badge, or shape.
- In Chinese report UI, rate/completion/change labels use `%` rather than `pt`, `p.p.`, or `percentage point` unless explicitly requested.
- Change-rate and variance-rate indicators follow positive-red-up / negative-green-down semantics: positive value uses red text plus upward SVG/icon, negative value uses green text plus downward SVG/icon, and zero uses neutral styling.

### Visualization Clarity

- Any chart with multiple data series must show a clear legend at the top-right or bottom-center, outside the plot area.
- Weak gridlines by default: hide outer chart borders and vertical gridlines; use very light dashed horizontal gridlines such as `#EEEEEE`.
- ECharts options should reserve space for legend, axis labels, and labels through `grid`, `legend`, `axisLabel`, and component-specific spacing.
- Gauge charts must reserve body space for one bounded metric, center value/unit, arc, min/max ticks, target marker, threshold/status labels, and tooltip hit area. Keep `gaugeAreaH >= CH * 0.50`, use ECharts `series.type: 'gauge'`, and avoid decorative fixed arcs or needles.
- Table status text such as "预警大差", "同比下滑", "已逾期", "未达标" must render as a badge/pill or icon+text, not plain unstyled text.
- Badge defaults: rounded pill, 12px label, 4-8px horizontal padding, soft semantic background, darker semantic text.

### Structure And Noise Control

- Remove repeated words inside one component. If several metrics share "完成率", "同比", "万元", or "%", promote the common label to a header, axis, unit label, or column title.
- Use grid/table layout for repeated metric groups instead of repeating labels beside every number.
- Diagnostic summary, executive conclusion, abstract, and insight text components should be visually stronger than ordinary lists: prefer full-width spans or a very pale brand-tint background inside the card.
- When a component becomes crowded, grow its final span, split it, or move details to drawer. Do not patch the symptom with random colors, tiny type, or overlapping labels.


## Fit And Alignment Rules

Every component should define:

- Container: the assigned grid block or viewport.
- Safe padding: inner spacing that prevents labels and graphics from touching edges.
- Header box: reserved title/action/status area when the block has a visible title.
- Content box: the area where the main visual or text lives.
- Header area: optional title, subtitle, metric unit, or actions.
- Footer area: optional notes, data source, pagination, or legend.

Default alignment:

- KPI cards: value and label vertically centered as a group, with status/trend aligned to the right or bottom.
- Charts: plot area centered after reserving space for axes, labels, legends, and title.
- Text summaries: vertically centered for short conclusions; top-aligned for multi-line narratives.
- Filters: vertically centered controls, consistent height, aligned labels.
- Tables: top-left content alignment, but cell text vertically centered.
- Empty/loading states: center icon/text/action in the component body.
- Drawers/forms: top-aligned content with aligned fields and sticky action area.

If the component cannot fit cleanly, reduce nonessential labels, move legends, enable scroll/zoom, or increase the grid span. Do not squeeze until text becomes unreadable.


## Block Header And Body Rules

When a component is placed in a report block, distinguish the block header from the component body.

Rules:

- The component may only render inside the block body viewport. It must not position charts, icons, legends, labels, empty states, or canvases across the header/title area.
- The block body must be a measurable container with `width: 100%`, `height: 100%`, `min-width: 0`, `min-height: 0`, and a deliberate overflow policy.
- The business component must render inside an explicit component viewport layer under the block body. The viewport owns background, clipping, scroll, and resize bounds; the business component must not bypass it with fixed dimensions or page-level positioning.
- The body and component viewport background must extend to the body edge. Do not inset the visible background to a safety line, and do not leave a white or unrelated-color band between the frame and content background.
- Do not add a default nested border around the component body; use the block frame, background, and clipping for containment.
- ECharts canvases, AntV S2 tables, custom SVGs, and diagram canvases must mount to the body viewport and resize from that viewport.
- Component-level internal titles are not rendered when the block header already names the component. Treat the title as layout/header metadata, and avoid duplicate visible titles inside the body viewport.
- If the business component needs its own toolbar, place it inside the body top edge with reserved space, or promote the action to the block header.
- Empty, loading, and no-data states are body content. They should be centered in the body and explain the state without hiding the block title.
- In templates, the DOM should make this separation explicit, such as `block > header/title + body > widget`.


## Anti-Overlap Rules

Before finalizing any component, check:

- Chart labels do not overlap each other.
- Axis labels do not collide with tick marks or chart edges.
- Legends do not cover data marks.
- Tooltips do not obscure the hovered item in a way that prevents reading.
- KPI values do not collide with units, trend icons, or status badges.
- Table cell text does not overlap icons, tags, or operations.
- Filter labels do not collide with input values.
- Text summary lines do not overflow or cover adjacent components.
- Diagram nodes and edges do not cover labels.

Preferred solutions:

- Reserve label zones.
- Use label collision avoidance.
- Move legends to top/right/bottom according to available space.
- Rotate, abbreviate, wrap, or stagger axis labels only when still readable.
- Use tooltips for secondary details.
- Use responsive font sizes within defined min/max bounds.
- Increase component span or enable zoom/pan for complex visuals.


## Chart Label Density Rules

When a chart has many elements, labels must be density-managed before rendering. Do not render every label and then rely on clipping, tiny fonts, or hidden overflow.

Before choosing label strategy, calculate a label budget from the real chart viewport:

- Available category slots: plot width or height divided by the minimum readable label footprint.
- Minimum readable text: normally 11-12px for axis/legend text and 12px+ for data labels; never shrink below readability to fit more labels.
- Minimum gaps: keep at least 4px between adjacent text boxes and between text and marks.
- Plot viability: if reserved label/legend/axis zones leave too little plot area, expand the component, enable zoom/scroll, split the chart, or switch to table/list/summary.

Density strategies:

- Partial label display is the default once labels exceed the readable budget. Show only the labels that matter most, such as current/latest, max/min, target gap, anomaly/risk, selected item, Top N, first/last, or evenly sampled ticks. The rest must remain available through hover tooltip, selection, drawer, fullscreen, or table fallback.
- Do not display all label values when doing so causes overlap. Hiding nonessential labels is better than creating unreadable text, as long as exact values are available on hover or focus.
- Axis labels: use `axisLabel.hideOverlap`, calculated `interval`, wrapping, two-line labels, or 30-45 degree rotation only when still readable. If labels still collide, enable `dataZoom`, horizontal scroll, pagination, or show fewer categories.
- Data labels: default to hidden for dense series. Show only key points such as latest, max, min, target gap, anomaly, selected item, or hovered item.
- Bar/column charts: when bar width becomes too small for labels, move exact values to tooltip, show end labels only for Top N or highlighted bars, or switch to horizontal bars with scroll.
- Line/area charts: do not label every point. Label endpoints, anomalies, max/min, or selected comparison points; use tooltip and axis pointer for exact reading.
- Pie/donut/rose charts: pie/donut requires part-to-whole data, `2-6` preferred categories, `<=8` categories before merge, deterministic Top N plus `其他`, no negative values, and no fake all-zero shares. Hide low-value slice labels, use legend/tooltip for details, or switch to bar/table when exact comparison or too many categories matter. Small-card donut/pie defaults to bottom legend; right-side legend requires a passing width budget and outside labels disabled or key-label-only. Compact donut/pie must declare `legendBandHeight`, `labelLineBudget`, `radius`, `innerRadius` for donut, and `center`. Do not let outside labels, guide lines, legends, titles, or center text form a dense ring or collide.
- Scatter/bubble charts: require explicit X/Y metric names and units, declared axis range/baseline behavior, point-count density tiers, and exact-value tooltip. Label only Top/selected/outlier/hover points; do not print labels for every point. Bubble charts require a bounded square-root size mapping, size metric disclosure, and overlap handling. Use weak target/average/quadrant/trend encodings, brush/zoom/sampling/aggregation for dense points, and table/detail fallback when exact row reading matters.
- Parallel coordinates: use for `3+` metric object pattern, similarity, anomaly, or feature exploration, not `1-2` metric comparison, single ranking, or exact row audit. Require object id/name, dimension fields, dimension order, axis unit/range/direction, independent-axis or standardized display rule, `plotH >= CH * 0.48`, `axisGap >= 56px`, dimension count `3-8` preferred and `<=12` without filtering/scroll, sample-count opacity/sampling/aggregation rules, Top/anomaly/selected highlight semantics, optional brush behavior, legend/filter separation, and tooltip access to every visible dimension's original value and scale context.
- Matrix/time/calendar/correlation heatmaps: use for two-dimensional intensity, density, cohort, utilization, or correlation patterns, not one-dimensional ranking or small exact comparisons. Require row dimension, column dimension, value metric, aggregation grain, unit, visualMap/color-scale rule, missing-vs-zero encoding, row/column density strategy, label sampling, cell-size budget, and tooltip exact values. Show permanent cell values only when cells are large enough; do not fill every cell with text by default.
- Treemap/rectangular tree maps: use for hierarchical composition and scale/share reading, not trend, exact ranking, ordinary tree expansion, or many-to-many relationships. Require hierarchy fields, parent/leaf aggregation, non-negative additive area metric, optional color metric semantics, Top N plus `其他`, `treemapAreaH >= CH * 0.55`, rectangle label thresholds, parent labels only when space allows, breadcrumb/drilldown for deep levels, and tooltip access to full path, value, percent of total, percent of parent, rank, source, and aggregation rule. Never force text into tiny rectangles or use negative/rate/score values as area.
- Sunburst charts: use for hierarchical path plus composition, not single-level share, trend, exact ranking, decorative multi-ring pie, or dense/deep hierarchies without drilldown. Require hierarchy fields or `children`, non-negative additive angle metric, total-share and parent-share formulas, `sunburstAreaH >= CH * 0.55`, visible levels `2-3` by default and `<= 4` without drilldown, `ringW >= 18px`, Top N plus `其他`, sector labels only when angle/ring/arc-length thresholds pass, center content, breadcrumb/drilldown, and tooltip access to full path, value, percent of total, percent of parent, rank, source, and aggregation rule. Never use negative/rate/score values as sector angle.
- Path/user/process path charts: use for ordered movement from start to end, not unordered entity relationships, simple ranking, composition, or geographic routes. Require step/node schema, directed transition schema, start/end, order/layer, metric basis, conversion/drop-off formulas, path depth, Top N rule, node/link density strategy, main-path/branch strategy, path-width mapping, label limits, legend/filter separation, and tooltip/detail access. Do not render all branches, all path labels, or decorative journey lines without transition evidence.
- Relation/network graphs: use for entity relationship structure, not simple ranking/trend/detail lookup. Require node and edge schemas, relationship direction, layout type, node/edge density strategy, node category and edge type limits, node-size and edge-width mapping, label limits, legend/filter separation, fitView/zoom/drag behavior, and node/edge tooltip/detail access. Do not render hairball graphs, all-node labels, all-edge labels, or dense networks without filtering, aggregation, neighborhood focus, or fullscreen.
- Map/geographic heat layers: require a real geography field, region-code or lon/lat binding, declared map resource/projection, aspect-safe fitBounds, weak basemap, visualMap/legend semantics, clustering/heatmap/TopN fallback for dense points or flows, and exact values in tooltip/detail.
- Candlestick/K-line charts: use only for ordered OHLC data. Require `open/high/low/close`, unit, market rise/fall color convention, valid OHLC relationships, price range padding, visible candle-count density strategy, main/volume/indicator height budget, crosshair tooltip, and dataZoom/recent-window fallback for dense histories. Do not replace a simple single-value trend with K-line, overload technical indicators, show OHLC labels on every candle, or hand-draw candles while claiming ECharts candlestick.
- Boxplot charts: use only for distribution comparison. Require sample count, Q1/median/Q3/IQR, declared whisker/outlier rule, unit, category/group density strategy, outlier display strategy, and tooltip with five-number summary. Do not use boxplot for single aggregate ranking, unspecified outlier rules, tiny samples without fallback, all-stat labels on every category, or hand-drawn boxes while claiming ECharts boxplot.
- Tree/Sankey/flow/decomposition charts: collapse low-priority branches, provide zoom/pan/fullscreen, and label only visible nodes whose boxes can fully contain text. Sankey diagrams specifically require node/link data with `source`/`target`/`value`, layer/stage order, non-negative flow values, Top N/`其他` aggregation, `sankeyAreaH >= CH * 0.55`, main-flow emphasis, hidden ordinary link labels, legend/filter separation, and tooltip access to exact source-target shares before styling. Tree/hierarchical tree charts specifically require a root node, parent-child fields, visible-depth/default-expanded rules, Top N/`+N` child aggregation, expand/collapse behavior, and tooltip access to full node context before styling.
- Multi-series charts: use legend toggling, series grouping, small multiples, or tabs when the legend or labels become too dense.

ECharts expectations:

- Set `grid.containLabel: true` and reserve enough `grid` margins for axes and labels.
- Use `labelLayout: { hideOverlap: true }` where supported; for vertical collisions, use `moveOverlap` only when it does not mislead reading order.
- Use `dataZoom` (`inside` and/or `slider`) when categories exceed the visible label budget.
- Keep `tooltip` complete enough that hidden labels and hidden label values can still be inspected.
- Use emphasis/selection state to reveal labels on hover or click.
- For dense ECharts series, prefer `label.show: false` plus `emphasis.label.show: true` for important marks instead of permanent labels for every mark.

Required design decision:

- If a component's chart has more marks or categories than the label budget allows, explicitly state the chosen strategy: Top N, aggregation, label sampling, hidden data labels with tooltip, dataZoom, internal scroll, fullscreen, split chart, small multiples, or table fallback.
- When using partial label display, state which labels remain visible and how users inspect hidden exact values.


## Sparse Line And Trend Chart Rules

Line, area, and trend charts must remain visually centered when the dataset has only a few points. Do not let one or two points sit against the left edge of the plot.

Positioning rules:

- One data point: place the point at the horizontal center of the plot area.
- Two data points: place the two points symmetrically around the center, with equal left and right visual margins.
- Three or more sparse points: distribute points around the center with equal spacing and equal outer margins.
- More categories than the visible budget: switch from sparse centering to the dense-chart strategy, such as `dataZoom`, scroll, sampling, or Top N.

ECharts implementation expectations:

- For sparse category-axis line/area charts, do not use a configuration that pins the first category to the left boundary. Prefer `xAxis.type: 'category'` with `boundaryGap: true` when it gives symmetric category bands.
- If category-axis behavior is still not centered, use a value axis with centered synthetic x positions, such as `x = index - (pointCount - 1) / 2`, and set symmetric `xAxis.min`/`xAxis.max` padding. Keep real period/category labels in the formatter or tooltip; do not show fake helper labels.
- For one-point trend charts, render a visible symbol and optional short reference line or annotation so the point does not look like a broken line.
- For two-point charts, keep the connecting segment centered and avoid stretching it from edge to edge unless the time range explicitly represents the full viewport.
- For time-axis charts with one or two timestamps, expand the time domain symmetrically around the data instead of letting the point sit at the first tick. Use the business period grain, such as day/month/quarter, to choose the padding.
- Tooltips, axis labels, and selected states must continue to show the real business category/time and value.

Avoid:

- Do not add visible fake categories just to create padding.
- Do not hide the axis to disguise a left-pinned point.
- Do not convert a one-point trend into an empty-looking line; if trend shape is not meaningful, use a KPI value with a centered point marker or mini card instead.


## Motion And Hover Feedback Rules

Runnable prototype components should feel alive and inspectable. Do not deliver charts or KPI components that look like static screenshots unless the user explicitly asks for a static export.

Baseline feedback:

- Charts must have entrance and update animation unless the dataset is so large that animation harms performance.
- Charts must have hover or focus feedback for readable marks: highlight the hovered mark, dim unrelated series when useful, and show the exact value.
- When data labels are hidden to control density, tooltip or hover reveal becomes mandatory.
- KPI cards, task cards, anomaly cards, table rows, and clickable list items must show hover, active, selected, disabled, and loading states when those states exist.
- Clickable chart marks or rows must use a pointer cursor and visible selected state after click.
- Animations should be restrained: 150-500ms, ease-out or similar, no distracting loops unless representing live monitoring.
- Respect reduced-motion needs: if motion is disabled, keep hover/selection state and tooltip value inspection available.

ECharts interaction defaults:

- Configure `tooltip` for every business chart: use `trigger: 'axis'` for line/bar comparison and `trigger: 'item'` for pie, gauge, scatter, map, tree, sankey, funnel, and node-like charts unless another trigger is clearly better.
- Set `tooltip.confine: true` or an equivalent container-safe strategy so the tooltip stays readable inside the viewport.
- Tooltip content must include category/name, series/metric name, value, unit, ratio/percentage when relevant, comparison/baseline when relevant, and active filter/time context when ambiguity is possible.
- Configure `axisPointer` for axis charts and `emphasis`/`select`/`blur` states for mark-level charts.
- Use `animation`, `animationDuration`, `animationDurationUpdate`, and `animationEasing` intentionally; avoid globally disabling animation because it makes state changes hard to perceive.
- Use hover labels through `emphasis.label` only for important marks; keep permanent labels density-managed.
- Use legend hover/selection where multi-series comparison is present.

Custom SVG/canvas interaction:

- Implement hit testing for marks that should reveal values.
- Provide a tooltip layer or popover with exact values.
- Keep hover target size usable; tiny marks should have a larger invisible hit area.
- Animate data transitions or selection changes unless performance or accessibility requires static rendering.


## Adaptive Sizing Rules

Use responsive sizing, not arbitrary fixed dimensions.

Component size behavior:

- Width follows the assigned block.
- Height follows the assigned row span or content rules.
- In scrollable page templates, the resolved height of any report block must be at least 220px. If a one-row block would be shorter, increase the grid row height or choose a larger row span.
- Typography uses a small set of fixed semantic sizes and may step down within bounds.
- Charts recalculate plot area after title, axes, legends, and labels.
- Tables first adapt column widths to content and viewport. When full column content cannot fit, use internal horizontal scrolling instead of ellipsis or clipped text.
- Cards wrap secondary metadata before shrinking core values.
- Buttons keep minimum tap/click target size.

Recommended minimums:

- Icon button: at least 32px square on desktop.
- Standard control height: 32-40px.
- Small card body: at least enough for label, value, unit, and status.
- Chart plot area: keep enough room for the actual graphic after labels. If plot area becomes too small, switch to table/list/summary.
- Text contrast: avoid low-opacity text below readable contrast.

Avoid:

- Font sizes that scale directly with viewport width.
- Core values smaller than surrounding labels.
- Components that look empty because content is too small.
- Components that overflow because content keeps its own fixed size.


## Overflow And Clipping Rules

Every component must declare what happens when content exceeds its assigned block. Never leave overflow behavior accidental.

Default rule:

- Primary content should fit within the component.
- Secondary content may wrap, collapse, scroll, move to tooltip, or move to drawer.
- Critical content must not be clipped or hidden.

Use these strategies:

- Increase grid span when the component is structurally too important or too dense.
- Use internal vertical scroll for long lists, evidence tables, logs, and repeated records.
- Use horizontal scroll for tables when visible columns and full cell content cannot fit inside the body viewport; keep the scroll inside the table viewport, not the page.
- Use horizontal scroll only for true wide tables and complex diagrams, not ordinary text outside table components.
- Use line clamp only for secondary descriptions, with tooltip or drawer access.
- Use fullscreen/expand for dense charts, maps, trees, and diagrams.
- Use progressive disclosure: show summary first, details in drawer.

Rules:

- Do not set fixed component height when content length is variable unless internal scroll is defined.
- In scrollable page templates, do not let any assigned report block resolve below 220px tall. If the full grid becomes taller than 1080px, use vertical page/content scrolling instead of shrinking blocks.
- Do not hide overflow for charts, titles, KPI values, status labels, or action buttons.
- Do not let a component's child element define a width larger than the component viewport.
- Do not let legends, labels, controls, or values extend beyond component bounds.
- Do not allow right-column cards to crop text at the viewport edge.
- Do not let bottom rows or nested cards be partially visible unless the component clearly indicates scroll.
- Tables and analytical grids must declare `visualType: 'table'` in runnable templates so the shell can apply table-specific viewport behavior.
- Simple HTML tables must be wrapped by an internal viewport. Columns should be content-aware with explicit min/max widths, readable wrapping for text fields, and stable widths for numbers/status/actions.
- Do not use ellipsis as the way to express hidden table content. If the table cannot show every column and full cell value at the current width, enable table-level horizontal scroll and keep key identifier columns sticky/frozen.
- AntV S2 tables must size from the block body and use S2's own scroll/frozen-header behavior; do not place an S2 canvas in a fixed-size wrapper larger than the block body. Configure column widths/meta so cell content remains readable, and use S2 horizontal scrolling when width is insufficient.

Implementation-oriented expectations:

- Component containers should behave like viewports with `min-width: 0` and `min-height: 0` equivalents.
- Business component root nodes should fill the component viewport with `width: 100%`, `height: 100%`, `min-width: 0`, and `min-height: 0`; avoid `100vw`, `100vh`, fixed pixel widths, or absolute positioning against the page.
- Chart/table bodies should be allowed to shrink inside the card after title/action areas reserve space.
- Text should wrap before it overflows.
- Operations should collapse into an overflow menu before they overlap titles or content.
- ECharts components should call resize when their container, tab, drawer, fullscreen state, or grid span changes.
- AntV S2 components should receive explicit container dimensions or resize hooks so frozen headers, scrollbars, and cell text remain aligned.
- Native table fallback should prefer `table-layout: auto` or content-aware CSS grid columns inside a horizontal scroll viewport. Avoid `table-layout: fixed` plus ellipsis for meaningful data; compact fixed-column lists should wrap text, widen the table, or move low-priority fields to detail drawers.
