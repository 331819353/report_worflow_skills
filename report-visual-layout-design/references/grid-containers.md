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

After choosing a default span, calculate its actual pixel size with `block-size-constraints.md`, especially for `1920 * 1080` and `1280 * 768` viewports. Keep the default span when the content fits; enlarge, split, or move detail content only when the size check fails.

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

Use these common spans before detailed size checks:

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

## 4. Default Span Distribution

Start with the default span distribution below. When one block contains multiple subcomponents, choose the row by the dominant or most layout-demanding subcomponent.

| Component type | Default candidate spans |
| --- | --- |
| 折线图 / 柱状图 / K 线图 / 热力图 | `2*1`, `2*2`, `3*2`, `3*3`, `4*4`, `4*2`, `4*3` |
| 饼图 / 雷达图 / 路径图 / 旭日图 / 仪表盘 | `1*1`, `2*2`, `3*2`, `2*3`, `3*3`, `4*4` |
| 散点图 / 盒须图 / 平行坐标系 | `3*1`, `2*2`, `3*2`, `2*3`, `3*3`, `2*4`, `4*4`, `4*2`, `4*3`, `3*4` |
| 地图 / 关系图 / 树图 / 矩形树图 / 桑基图 / 漏斗图 | `2*2`, `3*2`, `3*3`, `4*3`, `4*4` |
| 指标卡 | `1*1`, `2*1` |
| 表格 | `3*2`, `4*2`, `5*2`, `3*3`, `4*3`, `5*3`, `6*3`, `7*3`, `8*3`, `4*4`, `5*4`, `6*4`, `7*4`, `8*4` |
| 其他组件 | `2*1`, `2*2`, `3*2`, `3*3`, `4*4`, `4*2`, `4*3` |

Rules:

- Pick the smallest span that matches the component's importance and expected density.
- Validate the selected span with `block-size-constraints.md`.
- If the selected span fits, keep it.
- If it does not fit, try the next larger candidate span in the same row.
- If no candidate span fits, split the content, use tabs, move details to drawer/fullscreen, or change the component type.
- Do not shrink text, hide overflow, or overlap legends to force a too-small span.
- Composite widgets with multiple subcomponents must still declare one `visualType`; use the dominant visual type, or `other` only when no supported visual type dominates.

## 5. Block Internal Anatomy

Each content block separates frame from component body:

- Block frame: unified card background, radius, shadow, safe padding, optional actions.
- Header/title area: title, subtitle, unit, status tag, small actions.
- Component body: the only viewport where charts, tables, KPI groups, text, empty states, diagrams, and business components render.
- Optional footer: source, pagination, note, or legend only when reserved height exists.

Rules:

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
