# Shared Foundation Rules

Apply these rules to every component before applying component-specific rules.

## Viewport Contract

- Treat the assigned parent block body or internal sub-block as the component viewport. Inner content must not escape this viewport.
- Measure usable `width` and `height` after subtracting card padding, header, actions, legends, notes, and pagination.
- The surrounding block/container owns the visible title when it provides one. Do not render a duplicate title inside ECharts, AntV S2, SVG/canvas diagrams, KPI groups, or table bodies when the surrounding block already has one.
- Use `min-width: 0`, `min-height: 0`, and an explicit overflow policy on every component body.
- If the component is placed inside an internal sub-block, the sub-block must also have `min-width: 0`, `min-height: 0`, a stable grid/flex track, `5px` parent inset, `5px` gap to siblings, and an explicit overflow policy.
- Mount ECharts, AntV S2, SVG, canvas, and custom diagrams only after the viewport has measurable size.
- Recalculate layout after filters, tabs, drawer state, fullscreen, legend toggles, or grid span changes.

## Aspect Ratio And Geometry Integrity

- Treat charts, SVG, canvas, maps, gauges, paths, icons, and complex diagrams as geometry, not as stretchable backgrounds.
- Define a canonical design size and coordinate system for any custom graphic: SVG `viewBox`, canvas logical width/height, ECharts graphic group bounds, or diagram layout coordinate range.
- Preserve that coordinate system with equal scaling. Use `preserveAspectRatio="xMidYMid meet"`, CSS `aspect-ratio`, or an inner fit box where `scale = min(containerWidth / designWidth, containerHeight / designHeight)` and the graphic is centered.
- Avoid independent X/Y scaling such as CSS `transform: scaleX(...) scaleY(...)`, `object-fit: fill`, stretched `<img>`/`svg` without `viewBox`, or canvas drawing that multiplies x and y coordinates by unrelated scale factors.
- For canvas, set backing-store size from measured CSS size and `devicePixelRatio`, then redraw from logical coordinates on resize; do not let the browser bitmap-scale a stale canvas.
- For ECharts or custom diagrams, call resize/re-layout after the real body viewport is measurable. Do not initialize from zero height, hidden tabs, collapsed drawers, or placeholder dimensions and then rely on CSS stretching.
- If the assigned block aspect ratio is incompatible with the intended shape, center the graphic with safe empty space, switch to a responsive layout variant, or choose a different component. Do not fill the rectangle by warping the shape.
- Runtime QA must compare the rendered geometry against the intended shape: circles remain circles, gauges keep arc proportions, paths keep curvature, maps do not stretch, and nodes/edges keep their relative spacing.

## Typography Hierarchy

- Block-owned title: 16px, weight 600. Component bodies should not add a second visible title when the block already has one.
- Axis text and table headers: 12-13px, readable neutral. Axis text must be larger than chart data-label values when both appear together.
- Chart data labels and annotation values: 11-12px. Do not shrink below 11px to force density.
- Body text and table cells: 12-14px.
- Helper text, units, metadata: 12px minimum.
- Core KPI value: 24-36px by default depending on block importance and available space; up to 40px is allowed only for wide or top-priority primary metric cards after the height budget proves it fits.
- Use tabular numerals for values that need comparison.
- Fixed-height component text must declare explicit `line-height`, especially domain names, metric names, KPI values, percentage values, badges, helper text, and footer labels. Do not rely on browser default line boxes for large numbers or compact card rows.

## Global UI And Metric Semantics

- Components inherit the page/global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and control styles. HTML/source/custom layouts may control structure, but they must not introduce one-off local colors or surfaces that conflict with the global UI.
- Rate, completion, variance-rate, YoY, MoM, and change labels use `%` in visible Chinese UI. Do not show `pt`, `p.p.`, or `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up and negative-green-down semantics: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.
- Color is not enough for rate/change state; pair color with sign, icon, text, badge, or shape.

## Non-Overflow Rules

- Core labels, KPI values, warning text, action text, and decision-critical fields must not overflow their containers.
- Long names may wrap to two lines, use a stable fixed-width column, or move full text to tooltip/drawer.
- Never rely on `overflow: hidden` alone for labels or values. Hidden content must have a hover/focus/click disclosure path.
- Do not combine `overflow: hidden`, `white-space: nowrap`, and `text-overflow: ellipsis` for decision-critical metric labels, summary titles, KPI values, status text, or action text unless the full content is available by tooltip, focus, drawer, or expansion.
- Long metric titles and summary labels should wrap to one or two reserved lines before truncation. Reserve the line height so wrapping does not shift neighboring tiles.
- Units must stay visually attached to values. If a value is too long, reduce precision, use compact notation, widen the value zone, or move secondary text away.
- Badges must not compress their text below readability. If status wording is long, use icon plus short label and show full status in tooltip.

## Fixed-Height Budget

Before accepting fixed-height cards, navigation items, KPI tiles, compact summaries, and fixed-height controls, calculate the internal height budget:

```text
requiredContentHeight =
  paddingTop
  + paddingBottom
  + sum(explicitLineHeight * reservedLineCount)
  + sum(verticalGaps)
  + fixedBadgeStatusFooterHeights

requiredContentHeight <= componentHeight
```

- Count every visible row: domain/object name, metric label, core value/percentage, unit, status badge, helper text, bottom label, footer, and selected-state marker.
- Auto, flex, or grid layout may distribute the rows only after the budget proves they fit.
- If the budget fails, reduce visible information, increase height, split rows, use horizontal scroll with explicit affordance, or move secondary detail into tooltip, selected-state summary, drawer, or overview area.
- Runtime QA must also measure DOM overflow. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is a clipping failure for fixed-height content.

## Density And Collision Rules

- Every component declares a display budget before styling acceptance. The budget must name the bounded count it controls, such as visible summary items, KPI tiles, journey cards, list rows, table columns, table body rows, chart categories, chart series, labels, annotations, nodes, links, hierarchy depth, or local-filter options.
- The display budget must also declare the overflow strategy: Top N + other, aggregation, label sampling, internal scroll, pagination, collapse, drilldown/drawer, fullscreen, zoom/pan, split component, or table/detail fallback. "Auto", "fit content", or hidden overflow alone is not a strategy.
- Default family budgets unless a narrower component reference overrides them: `text-summary` visible decision items `<=3`; repeated peer cards or journey cards `<=6` in one fixed block; KPI peer tiles `<=6` before grouping/splitting; local-filter visible options `<=4`; permanent chart annotations `<=3`; chart visible series normally `<=4`; table first-view columns `5-8` and large-table columns `8-12`; table body rows `4-6` before pagination/scroll.
- Calculate a visible label budget from the real viewport before rendering labels.
- Reserve separate collision boxes for section titles, layer/stage/lane titles, card titles, badges, values, legends, and diagram nodes before drawing or positioning content.
- Parent/group titles must not overlap, touch, or visually attach to child cards or chart nodes. Keep at least 16px vertical and horizontal safe spacing between a group/layer title and the nearest card border, node border, connector line, or label.
- Business-question text, conclusion text, labels, legends, chart marks, table cells, cards, controls, state messages, diagram nodes, and connectors must never overlap, stack, or visually merge.
- If a component is too narrow, too small, or crowded for readable labels/values/legends/axes, increase its span or height, split it, use scroll/zoom/fullscreen/drawer/table fallback, or reduce visible label density. Do not solve crowding by overlap, unreadable font sizes, or hidden critical data.
- Repeated peer tiles inside one large parent block or sub-block group should use internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, columns `M >= N`, and minimal `M - N` among valid factor pairs. Then check whether the parent block must grow vertically with `heightExpansionRows = ceil(N * 2 / 3)`. Do not add arbitrary empty placeholders; the only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data. Split the peer group when the factor pair creates an unreadable strip.
- Composite widgets and parent blocks with internal sub-blocks need an internal fit pass after the parent block grid passes. Summary columns, nested KPI grids, comparison tiles, inline metric cells, and chart/table sub-blocks must be measured against their real sub-container width/height; widen, wrap, stack, scroll, or split before accepting clipped text.
- Internal fit measurement must subtract `5px` parent inset on each edge and `5px` sibling gaps before deciding whether labels, values, legends, charts, or tables fit.
- A fixed two-column internal grid is allowed only when each cell can hold its longest expected label/value/unit/helper text at readable size. Otherwise use responsive columns, minmax tracks, wrapping, larger min-height, or fewer visible cells.
- When values or labels overlap, keep only key labels visible: latest/current, max, min, Top N, target gap, anomaly, selected item, first/last, or evenly sampled ticks.
- Hide the rest by default and reveal full values on hover, focus, click, tooltip, drawer, fullscreen, or table fallback.
- Preserve at least 4px between text boxes and between labels and marks.
- If hiding labels would remove essential meaning, increase span, split the component, switch chart orientation, use scroll/zoom, or replace the chart with table/list.

## Hover And Exact Value Disclosure

- Every hidden or abbreviated value must be inspectable.
- Tooltip must show full name, exact value, unit, period/dimension, comparison value, and status when relevant.
- Hover emphasis may reveal one temporary label, but it must not move surrounding layout.
- In fixed grid blocks, KPI cards, chart/table containers, and compact controls, hover/focus feedback should use stable border color, outline, inset glow, or an in-bounds pseudo-element. Avoid hover `translate`, `scale`, or outer shadows that can be clipped by `overflow: hidden` or shift visual alignment.
- If a parent block clips overflow, keep the glow inside the component bounds with `box-shadow: inset ...` or `outline-offset: -1px`; do not rely on an outside shadow to communicate interactivity.
- `focus-visible` should mirror the hover glow so keyboard users get the same non-shifting state.
- Touch devices need click, tap, or focus alternatives to hover.

## Empty, Loading, Error

- Preserve the same component geometry in empty, loading, and error states.
- Center simple empty/loading states inside the body viewport.
- For components inside an internal sub-block, do not decide no-data mask scope in isolation. If every sibling sub-block under the same parent block is no-data, the parent block owns one whole-block mask. If only this sub-block is no-data, the sub-block owns the mask.
- A sub-block no-data mask must cover the complete sub-block surface, including its local label/title/control strip and the component body. Do not mask only the ECharts/S2/SVG/canvas/table viewport.
- Error states should include the affected component, retry action if available, and concise failure cause.
