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

After choosing a span, calculate its actual pixel size with `block-size-constraints.md`, especially for `1920 * 1080` and `1280 * 768` viewports.

## 2. Scroll And Row Height

For scrollable page templates and blank scrollable report pages:

- Each resolved content block should be at least 220px tall.
- A one-row block therefore needs a resolved row height of at least 220px.
- If `N * rowHeight + gaps + vertical offsets` exceeds the current viewport height, keep row/block heights and enable vertical scrolling.
- Do not shrink blocks below usable size to force everything into the first viewport.
- Page design may focus on the visible content display area, but implementation must allow the report's total height to grow with `N`.

Fixed sci-fi/big-screen cockpit layouts are exempt from the 220px rule because they must fit the fixed 1920*1080 canvas.

## 3. Recommended Spans

Use these common spans:

- Hero summary or main chart: 8 columns.
- KPI strip: four cards at 2 columns each, or eight compact cards at 1 column each.
- Primary chart + side insight: 5+3 or 6+2 columns.
- Two balanced panels: 4+4 columns.
- Three panels: 3+3+2 or 2+3+3 when visual weight remains balanced.
- Table or task list: usually 8 columns.
- Secondary cards: 2 or 4 columns.

Use `block-size-constraints.md` before finalizing dense blocks, composite widgets, tables, or any block containing 2/4/6/8 visible subcomponents.

## 4. Legal Span Matrix

Use legal top-level block spans unless the user explicitly extends the matrix for a special component. When one block contains multiple subcomponents, choose the span and `visualType` by the dominant or most layout-demanding subcomponent.

| Component type | Allowed spans |
| --- | --- |
| Line / bar / K-line / heatmap | `2*1`, `2*2`, `3*2`, `3*3`, `4*2`, `4*3`, `4*4` |
| Pie / radar / path / gauge / dashboard | `1*1`, `2*2`, `2*3`, `3*2`, `3*3`, `4*4` |
| Scatter / boxplot / parallel coordinates | `3*1`, `2*2`, `3*2`, `2*3`, `3*3`, `2*4`, `3*4`, `4*2`, `4*3`, `4*4` |
| Map / relationship / tree / treemap / sankey / funnel | `2*2`, `3*2`, `3*3`, `4*3`, `4*4` |
| KPI card | `1*1`, `2*1` |
| Table | `3*2`, `4*2`, `5*2`, `3*3`, `4*3`, `5*3`, `6*3`, `7*3`, `8*3`, `4*4`, `5*4`, `6*4`, `7*4`, `8*4` |
| Text summary / abstract / conclusion | `4*1`, `5*1`, `6*1`, `7*1`, `8*1`, `3*2` |
| Other component | `2*1`, `2*2`, `3*2`, `3*3`, `4*2`, `4*3`, `4*4` |

Rules:

- Treat spans as a legal placement set, not loose inspiration.
- Text-led components should use `text-summary` as runnable `visualType`.
- If a title, legend, axis, toolbar, or data density cannot fit, move to a larger legal span or switch component type.
- Do not shrink text, hide overflow, or overlap legends to force a too-small span.
- For runnable templates, declare `visualType` so validation can check `layoutRows` span legality.
- Composite widgets with multiple subcomponents must still declare one `visualType`; use the dominant visual type, or `other` only when no supported visual type dominates.

## 5. Block Internal Anatomy

Each content block separates frame from component body:

- Block frame: unified card background, radius, shadow, safe padding, optional actions.
- Header/title area: title, subtitle, unit, status tag, small actions.
- Component body: the only viewport where charts, tables, KPI groups, text, empty states, diagrams, and business components render.
- Optional footer: source, pagination, note, or legend only when reserved height exists.

Hard rules:

- Module title sits top-left as plain text: 16px, `font-weight: 600`, deep gray on light theme.
- Do not put the title in a boxed nested card.
- Component body must fill the body rectangle and not create an unnecessary inner moat.
- The body viewport must have explicit `min-width: 0`, `min-height: 0`, and a defined overflow strategy.
- ECharts and AntV S2 instances must mount and resize against the body viewport, not the whole card frame.
- If the body contains multiple internal subcomponents, each subcomponent needs its own stable internal viewport and must remain visually subordinate to the block title.
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
