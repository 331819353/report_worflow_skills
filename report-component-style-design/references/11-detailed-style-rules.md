# Detailed Style Rules Migrated From SKILL.md

Use this file only when the focused component references are insufficient or when preserving legacy detailed behavior matters. Prefer `00-component-reference-index.md` in this directory first.

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
- Pie/donut/rose charts: if slices exceed a readable count, use Top N plus "others", hide low-value slice labels, use legend/tooltip for details, or switch to bar/table. Small-card donut/pie defaults to bottom legend; right-side legend requires a passing width budget and outside labels disabled or key-label-only. Compact donut/pie must declare `legendBandHeight`, `labelLineBudget`, `radius`, and `center`. Do not let outside labels, guide lines, legends, titles, or center text form a dense ring or collide.
- Scatter/bubble charts: when points are dense, label only selected/outlier points, use tooltip, brush, visualMap, and zoom. Do not print labels for every point.
- Heatmap/calendar/map: prefer tooltip and selected labels; label only major regions or high-risk cells when space allows.
- Tree/Sankey/flow/decomposition charts: collapse low-priority branches, provide zoom/pan/fullscreen, and label only visible nodes whose boxes can fully contain text.
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

- Configure `tooltip` for every business chart: use `trigger: 'axis'` for line/bar comparison and `trigger: 'item'` for pie, scatter, map, tree, sankey, funnel, and node-like charts unless another trigger is clearly better.
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

## Block Fit Rules

When placing a component into a grid block, first estimate its minimum viable size.

Minimum viable size includes:

- Header: title, subtitle, unit, status, actions.
- Body: chart plot, table rows, cards, text, or diagram viewport.
- Labels: axes, legends, values, annotations.
- Footer: source, pagination, notes, or operation hint.
- Padding: safe space on all sides.

If the minimum viable size is larger than the assigned block:

- Give the component more columns or rows.
- Reduce optional labels or move them to tooltip.
- Move secondary narrative to drawer.
- Switch chart to table/list if exact reading matters.
- Enable zoom/pan for complex diagrams.
- Split the component into multiple grid-aligned rectangles.

Do not solve fit problems by simply shrinking typography below readability.

### Default Span And Fit Rules

When the page uses an `8 * N` grid, use `$report-visual-layout-design` for default span distribution and block-size constraints, then check whether the assigned body viewport remains readable after padding, title, legend, axes, controls, table headers, and footer are reserved.

Rules:

- Keep the default span when the component fits.
- If the assigned viewport fails fit, try a larger default candidate span, split, paginate, collapse, aggregate, or move details to drilldown.
- For scrollable page templates, final spans are valid only after the row-height rule is satisfied: every resulting block must be at least 220px tall.
- Do not calculate row height by dividing the viewport height by `N`; increase `N`, scroll, split, or paginate.

If the selected default span still feels cramped after validation, choose a larger candidate span or redesign the component placement.

## Complex Diagram Viewport Rules

Some components cannot naturally fit, such as:

- DuPont analysis diagrams.
- Metric trees and decomposition trees.
- Data lineage graphs.
- Sankey diagrams.
- Organization/process flow diagrams.
- Large topology, relation, or dependency graphs.

For these, treat the assigned grid block as a viewport:

- The component's block is the visible window.
- The diagram itself may have an internal logical size larger than the block.
- Provide zoom in, zoom out, reset, fit-to-screen, and drag/pan.
- Provide minimap or breadcrumbs when the diagram is large.
- Default to fit-to-screen while keeping labels readable.
- Allow node focus to center the selected branch.
- Keep key controls pinned inside the component header or corner.
- Do not let the diagram force the page layout to expand horizontally.
- Do not shrink labels below readability just to fit the whole diagram.

For print/export, provide a fit-to-page version, a split-by-section version, or a high-resolution export.

## Component Style System

Keep all report components visually related.

Use shared rules:

- Card base: white background, 8px radius, 24px padding, and `0 2px 10px rgba(0, 0, 0, 0.05)` shadow in light enterprise pages.
- Border radius: 8px by default, 12px only when the page style intentionally uses softer cards.
- Border: no hard default border on cards. Use subtle dividers inside dense tables/lists only when needed.
- Shadow: light and consistent; do not mix heavy shadows, glows, and borders across components.
- Background: white card surfaces for light theme; controlled dark blue/black panels only for explicitly dark monitoring or cockpit cases.
- Spacing: 8px rhythm, with 24px card padding as the default component safe area.
- Typography: consistent label, value, title, helper, and metadata sizes.
- Icon style: consistent stroke width and size.
- Status labels: same color semantics across all components.
- Hover/focus/selected/disabled states: visible and consistent.

Use component variants intentionally:

- Primary: core component on the page.
- Secondary: supporting component.
- Warning: risk/exception component.
- Actionable: component with direct operation.
- Evidence: component for details, proof, or source trace.

## Component Title Rules

Every component title area should be deliberate. Do not rely on generic card titles such as "Chart" or "Data".

Title structure:

- Main title: what this component shows.
- Optional subtitle: scope,口径, unit, or comparison baseline.
- Optional status tag: warning, updated, locked, delayed, high risk.
- Optional actions: more, fullscreen, download, settings, refresh, explain.

Title rules:

- Keep titles short and specific.
- Put long definitions in popovers.
- Align all layout-owned block titles consistently, usually top-left inside the block header.
- Vertically center title text with header actions.
- Do not let title text overlap action icons.
- Do not wrap ordinary component titles in a visible boxed title card. Use plain text plus a subtle underline/divider/accent mark unless a very specific visual system asks for boxed headers.
- Do not truncate decision-critical titles; wrap to two lines or shorten wording.
- If a template provides a one-line block title, the title must have `min-width: 0`, ellipsis, and full-title tooltip. If that hides decision-critical meaning, shorten the title or move口径 into subtitle/popover instead of letting it overflow.
- Use a layout-owned title only when it helps scanning. Tiny KPI cards may use a compact label in the layout/header area.
- For charts, the layout-owned title should state the measure and comparison dimension, such as "收入完成率 by 区域"; do not repeat it inside the chart option body.
- For tables, the layout-owned title should describe the record set, such as "逾期回款明细"; table body should start with headers/rows, not another title.
- For text summaries, the layout-owned title can be omitted if the summary itself starts with a clear conclusion.

Recommended title hierarchy:

- Layout/block title: 14-16px, semibold.
- Component subtitle/helper: 12-13px, regular, medium contrast.
- Metadata such as unit/source/update: 12px, muted but readable.

## Background Rules

Use background layers to separate content without visual noise.

Recommended light-theme layers:

- Page background: very light neutral, such as `#F5F7FA` or `#F7F8FA`.
- Component background: white or near-white, such as `#FFFFFF`.
- Subtle nested area: very light neutral, such as `#F8FAFC`, used sparingly.
- Hover row/card: light blue or neutral tint.
- Selected state: light blue tint with clear border or indicator.
- Warning background: very light semantic tint, never saturated blocks unless urgency is high.

Dark-theme or monitoring/presentation components:

- Use dark background only when the report mode requires it.
- Use the white Haier logo if a logo appears.
- Keep text and labels high contrast.
- Avoid pure black; use deep neutral or navy-like backgrounds.

Rules:

- Do not stack many background colors inside one component.
- Do not use decorative gradients as primary component backgrounds.
- Avoid transparent backgrounds that make text hard to read.
- Use subtle backgrounds to group related fields, not to decorate.

## Font Size And Typography Rules

Use a small, consistent type scale.

Recommended desktop scale:

- Page/report title: 20-24px.
- Section title: 16-18px.
- Layout/block title: 14-16px.
- KPI value: 24-36px depending on card size and importance.
- Secondary metric value: 18-24px.
- Body/table text: 13-14px.
- Label/helper/metadata: 12-13px.
- Tiny annotation: 11-12px only when non-critical and still readable.

Rules:

- Do not scale font size directly with viewport width.
- Do not use negative letter spacing.
- Use tabular numerals for KPI rows, tables, rankings, and financial values when possible.
- Keep line height around 1.35-1.6 for Chinese text.
- Values should be visually stronger than labels.
- Labels should remain readable; avoid ultra-light gray.
- Do not use more than 3-4 font sizes inside one component.

Responsive behavior:

- Step down typography only within safe bounds.
- Wrap or move secondary information before shrinking core values.
- For narrow cards, keep value readable and move trend/baseline below.

## Color Specification Rules

Define colors by role, not by decoration.

Recommended semantic roles:

- Primary action/selection: Haier blue or product primary blue.
- Text primary: near-black neutral.
- Text secondary: medium neutral.
- Text muted: muted neutral with readable contrast.
- Border: light neutral.
- Background: page neutral and component white.
- Success: green.
- Warning: orange/yellow.
- Danger: red.
- Info: blue.

Rules:

- Use Haier blue as the brand/primary accent, not as the only chart color.
- Use status colors consistently across every component.
- Use chart palettes with enough distinction and sufficient contrast.
- Do not make labels, axis text, legend text, or helper text too pale.
- Keep gridlines subtle but visible.
- Use tint backgrounds for low-intensity status; use strong fills only for severe alerts or selected elements.
- When encoding multiple categories, avoid relying on red/green only.

Minimum contrast intent:

- Primary text must be clearly readable on its background.
- Secondary text must remain readable without strain.
- Disabled text may be muted but should still be distinguishable.
- White text on colored backgrounds should be used only when contrast is strong.

## Border And Shadow Rules

Use borders and shadows to clarify hierarchy, not to decorate.

Recommended border style:

- Component border: 1px solid light neutral.
- Table row divider: 1px subtle neutral.
- Selected border: 1px or 2px primary/semantic color.
- Warning border: semantic color only when attention is required.

Recommended radius:

- Components/cards: 6-8px.
- Buttons/inputs/tags: follow product system, usually 4-8px.
- Tables: outer container radius only; avoid rounding every cell.

Recommended shadow:

- Default components: no shadow or very subtle shadow.
- Hover/elevated cards: low shadow.
- Drawers/modals/popovers: stronger but clean elevation.
- Sticky headers/toolbars: subtle shadow or border separator.

Avoid:

- Heavy dark shadows.
- Multiple shadow layers on dense dashboards.
- Thick borders on every component.
- Excessively rounded cards that feel playful instead of enterprise-grade.

## Color Rules

Use a neutral base with semantic accents:

- Blue: selection, neutral information, primary action.
- Green: achieved, healthy, closed, improved.
- Orange: warning, attention, approaching deadline.
- Red: severe risk, failure, overdue, high-priority anomaly.
- Yellow: watch, moderate attention.
- Gray: metadata, disabled, closed, low priority.

Rules:

- Do not use color only; pair with labels, icons, signs, or text.
- Avoid overly pale labels, axes, legends, and gridlines.
- Use red sparingly for true urgency.
- Keep chart palettes distinct but not noisy.
- Avoid overusing gradients; use flat or subtle fills.
- Ensure selected/active states are clearly distinguishable.

## Text And Label Rules

Text must be readable and complete where it matters.

Rules:

- Core labels and values must not be truncated.
- Long names can wrap to two lines or use tooltip/full-text drawer.
- Keep unit close to value.
- Use consistent precision for numbers.
- Align decimal and currency values in comparison-heavy components.
- Use concise labels; avoid paragraph-length chart labels.
- Put explanations in popovers, not directly on crowded graphics.
- Keep chart annotations short and anchored.

For multilingual or Chinese-heavy labels, allow wrapping and use adequate line height.

## Filter Component Rules

Filters should be fast and calm.

Design:

- Controls vertically centered and same height.
- High-frequency filters visible.
- Advanced filters collapsible.
- Active filters shown as chips.
- Reset/apply/save view actions easy to find.
- Date range, organization, status, owner, metric, baseline filters use familiar controls.
- Avoid squeezing too many filters into one row; wrap in grid-aligned rows.

States:

- Default.
- Hover/focus.
- Selected.
- Disabled.
- Loading options.
- No options.
- Error loading options.

## Text Summary Component Rules

Text summary components should be short, useful, and visually stable.

Use for:

- Executive conclusion.
- Diagnostic finding.
- Risk explanation.
- Data trust conclusion.
- Action recommendation.

Design:

- Short summaries may be vertically centered.
- Longer summaries should be top-aligned with clear line height.
- Highlight only key numbers or status words.
- Use status icon/color only when it adds meaning.
- Keep paragraphs within the component; expand/collapse when needed.
- Do not let text overlap charts or actions.

Fit rules:

- In an 8*N grid, text explanation, abstract, and conclusion components must use `visualType: 'text-summary'` and a final span of at least `4*2`.
- One-row text is allowed only for title, filter, status, or KPI-strip surfaces with their own validated type; narrative text summaries should use `4*2`, `5*2`, `6*2`, `8*2`, or larger. Use a drawer or wider section for longer narrative.
- Short conclusions may use 2-3 lines; longer explanation should move to drawer, expandable area, or lower full-width section.
- If the component is in a narrow right column, use concise sentence fragments and avoid long unbroken text.
- Use line clamp only for supporting explanation, never for the main conclusion.
- Keep action buttons below or beside text with reserved space, not floating over the text.

## KPI And Metric Card Rules

KPI cards should be immediately scannable.

Structure:

- Label.
- Value.
- Unit.
- Baseline or target.
- Change/trend.
- Status.
- Optional mini trend.

Rules:

- Value is the visual anchor.
- The core value zone must be visually centered in the card body and occupy at least 40% of the card's main visual height. A KPI card fails when title/description text crowds the top and leaves a large blank lower area.
- Label and value align consistently across cards.
- Cards in the same row share height and internal rhythm.
- Status color and trend icon are consistent.
- If the card is clickable, show hover and active states.
- If content is too dense, move detail to tooltip or drawer.

Fit rules:

- KPI cards in a nested grid must wrap to additional rows instead of being clipped.
- Do not place more KPI cards in one row than the available width can support.
- Keep the main value, unit, and status visible together.
- If the card is narrow, move baseline/trend text below the value or into tooltip.
- If two rows of KPI cards are needed inside a hero panel, the hero panel must grow or the KPI group must scroll internally with clear affordance.
- For KPI panels with submetric tiles, calculate the body viewport height first. If the main value plus submetric grid cannot fit, increase the card row span, reduce the number of visible submetrics, split submetrics into a separate block, or move secondary submetrics to a drawer. Do not let submetric tiles crop numbers or overlap the main KPI value.

## Chart Component Rules

Use ECharts as the default chart engine for runnable prototypes. Configure it so the visual stays inside the component viewport:

- Standard charts must be rendered by ECharts option/series through `echarts.init` or the approved project wrapper. Importing ECharts while hand-drawing chart marks with SVG/HTML/CSS/canvas fails the ECharts implementation contract.
- Hand-authored SVG/canvas is allowed for icons, logos, decorative assets, or explicitly approved custom diagrams; ECharts `renderer: 'svg'` remains valid because ECharts owns the generated SVG.
- Initialize only after the container has measurable width and height.
- Resize on container changes, tab activation, fullscreen changes, and drawer open/close when relevant.
- Reserve space for title, axes, labels, legends, and data zoom before calculating plot area.
- Prefer ECharts dataZoom, tooltip, legend, and visualMap over custom ad hoc controls when they fit the task.
- Keep ECharts option data-driven; do not hard-code mock values inside component styling.
- Keep ECharts interactive by default: tooltip, hover emphasis, selected state for clickable marks, and restrained entrance/update animation.

Charts must prioritize legibility.

Rules:

- Reserve space for title, legend, axes, labels, and tooltip.
- Keep plot area centered within remaining space.
- Avoid overlapping data labels; show labels only when they add value.
- Apply the Chart Label Density Rules whenever categories, slices, points, nodes, or series exceed the readable label budget.
- Charts with multiple data series must show a legend. Keep legends close to the chart but outside the plot area unless intentionally embedded with reserved space.
- Hide chart outer borders and vertical gridlines by default; use very light dashed horizontal gridlines such as `#EEEEEE`.
- Use the page-level palette for actual, target, positive, negative, selected, and disabled states. Do not rely on ECharts default random color order.
- Use tooltips for detailed values; moving over a chart mark must reveal the exact value unless the chart is explicitly non-interactive.
- Show empty/no-data state clearly.
- Provide fullscreen when a chart has many series or labels.
- Provide download image/data when useful.

Layout rules:

- Reserve explicit zones for chart title/actions, legend, plot, axes, labels, and notes.
- For ECharts Cartesian charts with visible x-axis labels and a bottom legend, set `grid.containLabel = true`, set `grid.bottom >= 56px`, and keep a clear safe distance between legend and axis-label bands.
- Use `label column + visual column + value column` structure for horizontal bar/list charts so end values never collide with bars.
- For waterfall, funnel, decomposition, and contribution charts, reserve extra side padding for labels and negative/positive values.
- For line, area, and mini trend charts with sparse data, apply the Sparse Line And Trend Chart Rules so one point is centered and two points are center-symmetric.
- If labels cannot fit, use Top N, abbreviation with tooltip, scroll, zoom, or fullscreen.
- For dense charts, prefer partial label/value display plus hover tooltip over crowded permanent labels.
- Do not place long explanatory paragraphs inside the plot area.

For dense charts:

- Use data zoom, brush, scroll, pagination, or small multiples.
- Allow series toggling.
- Use Top N plus "others" instead of unreadable long tails.
- Hide nonessential labels by default and reveal details through tooltip, hover, selection, drawer, or fullscreen.
- When exact value reading matters, prefer table/list/detail drawer over a visually saturated chart.
- Switch to table when exact reading matters more than shape.

### Small-Card Donut Rules

- Donut charts inside small cards must reserve legend width/band before radius is chosen.
- Reduce radius after reserving legend and label zones; do not let the donut consume the legend area.
- Configure label maximum width, wrapping or truncation disclosure, `labelLayout.hideOverlap`, `bleedMargin`, and `edgeDistance` where supported.
- If label/legend/center/title collision remains, move detail to tooltip/legend, enlarge the card, or switch to bar/table.

### Radar Chart Rules

Radar charts are high risk for label and legend collision. Use them only for a small number of dimensions and only when the component has enough space.

Rules:

- Do not place a radar chart in a narrow or shallow card if it also needs an internal legend.
- Reserve separate zones for title, radar dimension labels, plot area, and legend.
- Put the legend outside the plot area, usually below or to the right; never let the legend sit on top of radar axis labels.
- Keep `indicator.name` labels short. If a label exceeds 4-6 Chinese characters or 8-10 Latin characters, abbreviate it and provide tooltip/full text.
- Configure ECharts radar label spacing explicitly with `axisName`/`nameGap`; do not rely on defaults.
- Set `radar.center` and `radar.radius` after reserving legend and label space. As a rule of thumb, keep radius at or below 45%-55% when there are 5+ dimensions or long labels.
- If top/bottom labels collide with title or legend, move the legend, reduce radius, shift center, or increase the block span. Do not hide overflow.
- If there are more than 6-7 dimensions, use a scorecard, horizontal bar group, or matrix table instead of radar.
- In runnable templates, radar components must pass `validate:dashboard`: radar options must include `axisName`/`nameGap` and legend handling.

## Table Component Rules

Tables are work surfaces.

Use AntV S2 as the default analytical table engine for runnable prototypes when the table is a pivot table, cross table, wide metric matrix, financial comparison grid, frozen-header analytical table, or dense group-by table. Install `@antv/s2` and `@antv/s2-vue` only for those S2-class table cases; keep them out of chart-only, KPI-only, simple-list, and simple-detail-table prototypes.

S2 rules:

- Mount S2 only after the container has measurable width and height.
- Keep S2 width and height synchronized with the assigned grid block.
- Never let the S2 logical table size expand the report block. The block body is the viewport; S2 handles horizontal/vertical scrolling inside it.
- Use frozen rows/columns for identifiers and key dimensions.
- Preserve readable cell text; do not shrink cells until values become unreadable, and do not rely on ellipsis for key business values.
- When a table is wider than the body viewport, enable S2 horizontal scrolling and keep identifier columns frozen instead of compressing every column.
- Use S2 tooltip, hierarchy, totals, and interaction states before custom table overlays.
- Keep S2 data, fields, meta, and conditions in typed data/config files where possible.

Rules:

- Header sticky when table scrolls.
- Use complex/grouped headers by default when a table has more than 8 visible columns or when fields naturally group by subject, period, metric family, amount/rate/count, target/actual/variance, current/YoY/MoM, or region/channel/product.
- Key columns frozen when the table is wide.
- Columns adapt to content type: identifiers and long names get larger/wrapping columns; numeric, percent, status, and action columns use stable compact widths.
- Full table cell content should be visible by wrapping, widening, or horizontal scroll. Do not use省略号/ellipsis as the primary way to hide undisplayed content.
- Cell content vertically centered.
- Text alignment follows data type: text left, numbers right, status centered or left with label.
- Status tags do not overwhelm text.
- Row height is consistent.
- Operations are stable and do not shift layout.
- Empty/loading/error states preserve table structure.
- Horizontal scroll is acceptable whenever full columns cannot fit, and core identifiers should remain frozen.

Avoid:

- Tiny text.
- Too many colored tags.
- Action buttons that wrap awkwardly.
- Hidden overflow for critical fields.
- Ellipsis-only table cells for business fields, metric values, object names, warning reasons, owners, dates, statuses, or actions.

## Card/List/Task Component Rules

Use cards for repeated objects when visual scanning matters.

Rules:

- Same card type uses same height, padding, and metadata order.
- Main status, owner, deadline, and priority are easy to find.
- Use badges sparingly.
- Provide clear click target and hover state.
- Do not stuff table-level detail into cards.
- For task cards, show status, owner, deadline, latest update, and next action.

## Drawer And Detail Component Rules

Drawers should preserve context.

Rules:

- Drawer width adapts to content complexity.
- Header includes object title, status, and primary action.
- Body uses sections, not a wall of fields.
- Important actions are sticky at bottom or header.
- Long detail content scrolls inside drawer, not the whole page unexpectedly.
- Evidence, logs, attachments, and source links use consistent list/table style.

## Output Format

When asked to define or apply component style, use this structure:

Start with `引用规则`: list the reference files applied and any stricter component-specific rules selected.

1. 组件范围: list component types involved, such as filters, text summary, KPI cards, charts, tables, drawers.
2. 可用尺寸: state each component's assigned block size, card inner size, body viewport width/height, and minimum viable size.
3. 标题规范: define title, subtitle, metadata, status tag, and action placement.
4. 背景规范: define page/component/nested/hover/selected/warning backgrounds.
5. 字号规范: define title, value, label, body, table, helper, and annotation sizes.
6. 色彩规范: define brand, text, border, semantic, chart, selected, and disabled colors.
7. 边框阴影: define radius, border, divider, selected border, hover elevation, drawer/modal shadow.
8. 统一风格: define spacing, icon style, control style, states, and component variants.
9. 居中与自适应: explain how each component centers, fits, wraps, scrolls, zooms, or pans inside its block.
10. 溢出策略: define when to grow span, wrap, scroll, clamp, use drawer, fullscreen, zoom, or split component.
11. 防重叠规则: define label, legend, axis, tooltip, text, and graphic collision handling.
12. 复杂图形策略: specify viewport, zoom, drag, reset, fit-to-screen, minimap, and export behavior when needed.
13. 组件内控制器: define capsule switches, dropdowns, compact menus, placement, selected state, option overflow, and affected content.
14. 可读性校验: contrast, font size, truncation, labels, units, precision, and responsive limits.
15. 组件清单: describe each component's structure and states.
16. 最终校验: confirm no overlap, no unreadable labels, no overflow, no inconsistent style.

## Quality Checklist

Before finalizing, verify:

- The needed files from this directory were loaded according to `00-component-reference-index.md`.
- Component-specific display rules from the relevant reference files are reflected in the design or implementation.
- Each component has measured or explicitly estimated usable width and height before its content layout is chosen.
- The selected component form, grid span, font hierarchy, chart/table density, legend position, and metadata count match the measured body viewport.
- Main content is horizontally and vertically centered when appropriate.
- Component title, subtitle, metadata, and actions are aligned and readable.
- Background layers are defined and do not create visual noise.
- Font sizes follow a consistent hierarchy and remain readable.
- Color roles are explicit and contrast is sufficient.
- Borders, radius, shadows, and dividers are consistent and restrained.
- Component content fits inside its assigned block or viewport.
- Each component has an explicit overflow strategy: grow, wrap, scroll, clamp, drawer, fullscreen, zoom/pan, or split.
- If the component cannot carry its content at the available size, the design expands the block, splits the content, or moves secondary details to drawer/fullscreen instead of clipping or squeezing.
- Labels, legends, axes, values, graphics, and actions do not overlap.
- Dense charts use partial label display; hidden label values are available through hover/focus tooltip or another explicit detail surface.
- Axis labels remain readable and are larger than permanent data-label values when both appear.
- Label values, tags, and key text do not overflow their container; any hidden or abbreviated content has full-value disclosure.
- Radar dimension labels, category labels, and legends have separate reserved zones and do not overlap.
- Sparse line/area/trend charts center one point and symmetrically place two or more sparse points instead of pinning the first point to the left edge.
- Core text and values are not truncated.
- Low-priority truncation has tooltip or full-text access.
- Colors are readable and not too pale.
- Typography has minimum readable sizes and consistent hierarchy.
- Filters, text summaries, charts, cards, tables, and drawers share the same visual language.
- In-component capsule switches and dropdowns share one UI style, have clear selected states, and do not overlap titles, legends, axes, tables, KPI values, or empty states.
- Component-level controls state exactly which component content they change and do not behave like hidden page-level filters unless explicitly designed that way.
- Components remain readable after filter-driven data changes, including empty results, long labels, changed totals, hidden series, and stale selections.
- Drawers, fullscreen views, exports, and refreshed components visually reflect the same active filter state as their source component.
- Charts and clickable components have visible entrance/update animation unless intentionally disabled for performance or accessibility.
- Hovering a chart mark, KPI submetric, table row, or interactive graphic reveals exact values or explanatory details through tooltip, emphasis label, popover, or drawer.
- Hidden dense labels remain inspectable through tooltip, hover, selection, fullscreen, or detail drawer.
- Complex diagrams use viewport, zoom, pan, reset, and fit-to-screen instead of forcing page overflow.
- Responsive behavior is defined for narrow and wide blocks.
- Screenshots at target width, narrower laptop width, and fullscreen show no clipped right edge, hidden bottom content, or component collision.

## Avoid

- Do not create fixed-size components that ignore their grid block.
- Do not omit component title, background, typography, color, border, and shadow decisions when defining a component system.
- Do not leave overflow behavior undefined.
- Do not let graphics overlap labels or labels overlap each other.
- Do not shrink text until it becomes unreadable.
- Do not use pale labels or low-contrast chart elements.
- Do not use heavy shadows, thick borders, or decorative backgrounds to compensate for weak hierarchy.
- Do not truncate core values, warnings, task names, or decision-critical labels.
- Do not allow complex diagrams to expand the page layout horizontally.
- Do not mix multiple unrelated visual styles on one page.
- Do not make component styling decorative at the cost of scanning and action.
- Do not deliver static-looking charts with no animation, hover emphasis, or tooltip value inspection unless explicitly required.
