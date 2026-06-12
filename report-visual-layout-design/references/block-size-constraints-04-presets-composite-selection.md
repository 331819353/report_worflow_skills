# Presets Composite Checks And Selection

This file was split from `block-size-constraints.md`. Load it only for this focused rule group; use `block-size-constraints.md` as the routing index.

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
- Do not accept domain navigation, Tabs, or Segment controls whose visible item/card content viewport fails `scrollHeight <= clientHeight + 2` or `scrollWidth <= clientWidth + 2` at `1920x1080` or `1280x768`.
- Do not pack more than two primary information layers into one perspective navigation card.
- Do not accept fixed-height navigation/cards without a declared padding, line-height, gap, and height-budget calculation.
- Do not accept fixed-height navigation/cards whose measured DOM has `scrollHeight > clientHeight + 2` or `scrollWidth > clientWidth + 2`, even if the screenshot looks acceptable.
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
9. For domain navigation, Tabs, and Segments, run DOM no-clipping checks at `1920x1080` and `1280x768`: `scrollHeight <= clientHeight + 2` and `scrollWidth <= clientWidth + 2`.
10. Keep the default span if it passes; otherwise try the next larger candidate span or redesign the block.
11. If total report height exceeds the first viewport, keep block sizes and enable vertical scrolling.
12. If the block still fails any constraint, either:
   - increase the span,
   - switch simultaneous sub-blocks/components to tabs/segmented views,
   - move details to a drawer/modal,
   - or split into separate `8 * N` blocks.
