# Shared Foundation Rules

Apply these rules to every component before applying component-specific rules.

## Viewport Contract

- Treat the assigned block body as the component viewport. Inner content must not escape this viewport.
- Measure usable `width` and `height` after subtracting card padding, header, actions, legends, notes, and pagination.
- The page/block layout owns the visible component title. Do not render a duplicate title inside ECharts, AntV S2, SVG/canvas diagrams, KPI groups, or table bodies when the surrounding block already has one.
- Use `min-width: 0`, `min-height: 0`, and an explicit overflow policy on every component body.
- Mount ECharts, AntV S2, SVG, canvas, and custom diagrams only after the viewport has measurable size.
- Recalculate layout after filters, tabs, drawer state, fullscreen, legend toggles, or grid span changes.

## Typography Hierarchy

- Layout-owned title: 16px, weight 600. Component bodies should not add a second visible title when the block already has one.
- Axis text and table headers: 12-13px, readable neutral. Axis text must be larger than chart data-label values when both appear together.
- Chart data labels and annotation values: 11-12px. Do not shrink below 11px to force density.
- Body text and table cells: 12-14px.
- Helper text, units, metadata: 12px minimum.
- Core KPI value: 24-36px depending on block importance and available space.
- Use tabular numerals for values that need comparison.

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

## Density And Collision Rules

- Calculate a visible label budget from the real viewport before rendering labels.
- Reserve separate collision boxes for section titles, layer/stage/lane titles, card titles, badges, values, legends, and diagram nodes before drawing or positioning content.
- Parent/group titles must not overlap, touch, or visually attach to child cards or chart nodes. Keep at least 16px vertical and horizontal safe spacing between a group/layer title and the nearest card border, node border, connector line, or label.
- Business-question text, conclusion text, labels, legends, chart marks, table cells, cards, controls, state messages, diagram nodes, and connectors must never overlap, stack, or visually merge.
- If a component is too narrow, too small, or crowded for readable labels/values/legends/axes, increase its span or height, split it, use scroll/zoom/fullscreen/drawer/table fallback, or reduce visible label density. Do not solve crowding by overlap, unreadable font sizes, or hidden critical data.
- Repeated peer tiles inside one large block should use internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, columns `M >= N`, and minimal `M - N` among valid factor pairs. Then check whether the parent block must grow vertically with `heightExpansionRows = ceil(N * 2 / 3)`. Do not add arbitrary empty placeholders; the only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data. Split the peer group when the factor pair creates an unreadable strip.
- Composite widgets need an internal fit pass after the outer block grid passes. Summary columns, nested KPI grids, comparison tiles, and inline metric cells must be measured against their real sub-container width/height; widen, wrap, stack, scroll, or split before accepting clipped text.
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
- Error states should include the affected component, retry action if available, and concise failure cause.
