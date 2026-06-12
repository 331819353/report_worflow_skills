# Viewport Formulas And Span Checks

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

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
scrollHeight <= clientHeight + 2
scrollWidth <= clientWidth + 2
```

- If the measured result is `scrollHeight > clientHeight + 2` or `scrollWidth > clientWidth + 2`, record a clipping defect.
- Screenshot review can find visual symptoms, but it cannot replace the DOM overflow check above.
- If the navigation design intentionally uses a horizontal scroll track, the scroll track may be wider than its container only when the interaction is explicit and accessible; each visible item/card content viewport inside the track must still pass `scrollHeight <= clientHeight + 2` and `scrollWidth <= clientWidth + 2`.
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
