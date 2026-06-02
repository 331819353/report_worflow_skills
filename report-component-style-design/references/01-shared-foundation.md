# Shared Foundation Rules

Apply these rules to every component before applying component-specific rules.

## Viewport Contract

- Treat the assigned block body as the component viewport. Inner content must not escape this viewport.
- Measure usable `width` and `height` after subtracting card padding, header, actions, legends, notes, and pagination.
- Use `min-width: 0`, `min-height: 0`, and an explicit overflow policy on every component body.
- Mount ECharts, AntV S2, SVG, canvas, and custom diagrams only after the viewport has measurable size.
- Recalculate layout after filters, tabs, drawer state, fullscreen, legend toggles, or grid span changes.

## Typography Hierarchy

- Title: 16px, weight 600.
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
- Units must stay visually attached to values. If a value is too long, reduce precision, use compact notation, widen the value zone, or move secondary text away.
- Badges must not compress their text below readability. If status wording is long, use icon plus short label and show full status in tooltip.

## Density And Collision Rules

- Calculate a visible label budget from the real viewport before rendering labels.
- When values or labels overlap, keep only key labels visible: latest/current, max, min, Top N, target gap, anomaly, selected item, first/last, or evenly sampled ticks.
- Hide the rest by default and reveal full values on hover, focus, click, tooltip, drawer, fullscreen, or table fallback.
- Preserve at least 4px between text boxes and between labels and marks.
- If hiding labels would remove essential meaning, increase span, split the component, switch chart orientation, use scroll/zoom, or replace the chart with table/list.

## Hover And Exact Value Disclosure

- Every hidden or abbreviated value must be inspectable.
- Tooltip must show full name, exact value, unit, period/dimension, comparison value, and status when relevant.
- Hover emphasis may reveal one temporary label, but it must not move surrounding layout.
- Touch devices need click, tap, or focus alternatives to hover.

## Empty, Loading, Error

- Preserve the same component geometry in empty, loading, and error states.
- Center simple empty/loading states inside the body viewport.
- Error states should include the affected component, retry action if available, and concise failure cause.
