# Grid And Containers

## 1. 8*N Rectangular Grid

All report content display areas must use an `8 * N` rectangular block grid:

- The content display area is divided into 8 equal columns and N rows.
- N is flexible and grows with page length.
- `1920 * 1080` and `1280 * 768` are viewport baselines, not report height limits.
- Every top-level content block occupies one or more complete grid blocks.
- Every top-level content block's occupied area must be rectangular.
- A top-level content block may contain multiple internal subcomponents, but those subcomponents do not count as page-grid blocks. See `block-composition.md`.
- Major sections may occupy full-width 8-column rows.
- Dense work surfaces may use 2-column, 4-column, or mixed spans, but all spans must align to the 8-column grid.
- Drawers and modals are overlays and do not count as content-grid blocks.

Do not use masonry, staggered, diagonal, floating, or irregular component shapes.

After choosing a preferred span, calculate its actual pixel size with `block-size-constraints.md`, especially for `1920 * 1080` and `1280 * 768` viewports. The preferred span is not final until it satisfies the component type minimum and pixel/content validation.

## 2. Scroll And Row Height

For scrollable page templates and blank scrollable report pages:

- Each resolved content block should be at least 220px tall.
- A one-row block therefore needs a resolved row height of at least 220px.
- If `N * rowHeight + gaps + vertical offsets` exceeds the current viewport height, keep row/block heights and enable vertical scrolling.
- Do not shrink blocks below usable size to force everything into the first viewport.
- Page design may focus on the visible content display area, but implementation must allow the report's total height to grow with `N`.
- Do not calculate row height as `availableViewportHeight / N`. Increase `N`, scroll, split, or paginate instead of compressing rows.

Fixed sci-fi/big-screen cockpit layouts are exempt from the 220px rule because they must fit the fixed 1920*1080 canvas.

## 3. Recommended Spans

Use these common preferred spans, then validate and upgrade them before finalizing:

- Hero summary or main chart: 8 columns.
- KPI strip: four cards at 2 columns each; eight KPIs should use two rows, a full-width internal strip that passes pixel validation, tabs, or pagination.
- Primary chart + side insight: 5+3 or 6+2 columns.
- Two balanced panels: 4+4 columns.
- Three panels: 3+3+2 or 2+3+3 when visual weight remains balanced.
- Table or task list: usually 8 columns and at least 4 rows.
- Secondary cards: 2 or 4 columns.

Use `block-size-constraints.md` before finalizing dense blocks, composite widgets, tables, or any block containing 2/4/6/8 visible subcomponents.

For peer component groups, prefer a balanced `M * N` distribution where `M` means columns and `N` means rows:

- 4 peers: `2 * 2`.
- 6 peers: `3 * 2`.
- 8 peers: `4 * 2`.
- 9 peers: `3 * 3`.
- Prefer `M > N` when possible; square layouts are acceptable when the count naturally fits.
- Avoid one long strip or one narrow column unless the component is explicitly a timeline, KPI strip, or navigation.

## 4. Preferred And Final Span Matrix

Use `block-size-constraints.md` as the source of truth for component type, base minimum outer size, complexity expansion, and recommended minimum span. When one block contains multiple subcomponents, choose the component class by the dominant or most layout-demanding subcomponent.

A recommended span in the component table is still invalid if it fails computed pixel/content-size validation after complexity expansion.

Rules:

- Treat candidate spans as starting points, not proof of fit.
- Classify by the 50-type table before mapping to any runnable `visualType`.
- If title, legend, axes, toolbar, or data density cannot fit, grow the span, split the component, or change component type.
- Do not shrink text, hide overflow, or overlap legends to force a too-small span.
- Composite widgets with multiple subcomponents must still declare one `visualType`; use the dominant visual type, or `other` only when no supported visual type dominates.
- Do not render any business component as `1*1`. A `1*1` cell may be an empty placeholder or icon-only status marker only when no widget is mounted.
- `2*1` is only valid for simple KPI cards that pass pixel validation.

## 5. Block Internal Anatomy

Each content block separates frame from component body:

- Block frame: unified card background, radius, shadow, safe padding, optional actions.
- Header/title area: title, subtitle, unit, status tag, small actions.
- Component body: the only viewport where charts, tables, KPI groups, text, empty states, diagrams, and business components render.
- Optional footer: source, pagination, note, or legend only when reserved height exists.

Hard rules:

- Module title sits top-left as plain text: 16px, `font-weight: 600`, deep gray on light theme.
- Do not put the title in a boxed nested card.
- The block header owns the visible component title. ECharts/S2/custom component bodies must not render a duplicate visible title inside the body viewport when the block already has one.
- Section, group, layer, stage, lane, and column titles must occupy a reserved title band. They must stay at least 16px away from card borders, node boxes, connector paths, legends, badges, and child labels.
- When a diagram has top layer titles such as `L1/L2/L3`, subtract the reserved title band from the body viewport before placing the first node row. Do not draw nodes upward into the title band.
- Component body must fill the body rectangle and not create an unnecessary inner moat.
- The body viewport must have explicit `min-width: 0`, `min-height: 0`, and a defined overflow strategy.
- ECharts and AntV S2 instances must mount and resize against the body viewport, not the whole card frame.
- If the body contains multiple internal subcomponents, each subcomponent needs its own stable internal viewport and must remain visually subordinate to the block title.
- Internal subcomponents may use legends, axis names, column names, chips, or short labels, but not duplicate block-level titles.
- Empty/loading/no-permission states stay centered inside the body viewport and must not replace the title area.

## 6. Overflow Rules

The page should not be visually cut off by the browser viewport, sidebar, or grid container.

- The outer shell should separate sidebar and main content with stable grid/flex layout.
- Main content must use `min-width: 0` behavior so wide children do not push it outside the viewport.
- The report content display area should scroll vertically as a whole unless a component explicitly owns internal scroll.
- Avoid page-level horizontal overflow.
- Wide tables, timelines, and complex diagrams may scroll or pan inside their own viewport.
- Tables should use content-aware widths, wrapping, table-level horizontal scroll, and sticky/frozen key columns when needed.
- Tables must not expand the grid block or rely on page-level horizontal overflow.
