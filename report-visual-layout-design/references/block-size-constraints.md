# Block Size Constraints

Use this reference whenever a report layout must decide how large each `8 * N` content block should be and what component combinations can safely fit inside it.

The skill normally checks two practical viewport baselines:

- `1920 * 1080`: desktop prototype, large report viewport, cockpit design baseline.
- `1280 * 768`: smaller laptop/browser preview viewport baseline.

These are not total report size limits. They describe the visible window used for first-viewport planning, screenshot review, and component density checks. Ordinary report pages may be taller than `1080px` or `768px` and should scroll vertically.

## 1. Viewport Versus Report Height

Separate these concepts:

- Viewport size: the visible browser/screen window, usually `1920 * 1080` or `1280 * 768`.
- Content display area: the report's usable grid area after header, nav, filters, sidebar, and margins.
- Report height: the full height produced by all `8 * N` rows. It may exceed the viewport.
- First viewport: the portion visible before scrolling. It should show the core answer, but it does not need to contain the entire report.

Design principle:

- Plan block width and row height from the active viewport.
- Let `N` grow with business content.
- Keep row/block heights usable.
- Enable vertical scrolling when total grid height exceeds the viewport.
- Do not compress charts, tables, cards, or text just to fit the whole report into one screen.

Only the sci-fi cockpit template is normally fixed to one `1920 * 1080` screen. Do not apply that fixed-height behavior to ordinary report pages.

## 2. Size Formula

Compute the actual top-level block size before choosing the component:

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

Default report cards:

- 1920 viewport baseline: `horizontalPadding = 20-24`, `headerHeight = 44-56`.
- 1280 viewport baseline: `horizontalPadding = 16-20`, `headerHeight = 40-48`.
- Dense sci-fi blocks: padding may be smaller, but title, legend, and chart viewport must still have fixed space.

## 3. Practical Presets

Use these rounded values for planning visible block size. Exact implementation may use CSS variables from the selected template, but the layout decision must remain consistent with these limits. These presets do not cap total report height.

### Full-Width 1920 Viewport

Applies to custom pages and `single-page-dashboard-template`.

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

Applies to `left-nav-analytics-dashboard-template` with expanded sidebar.

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

Applies to `sci-fi-dashboard-template` when the content area starts near `Y = 118` and uses 3 visible grid rows.

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

Applies to small custom pages and small `single-page-dashboard-template` previews.

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

At `1280 * 768`, prefer collapsed or low-intrusion navigation. With a collapsed `80px` sidebar:

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

## 4. Component Capacity By Span

Use the table below to decide what a top-level block can safely carry. Larger spans may hold simpler components, but smaller spans must not inherit dense components from larger spans.

| Top-level span | Safe component content | Avoid |
| --- | --- | --- |
| `1*1` | One KPI, status tile, icon/value/delta, tiny sparkline. | Standard charts, tables, multiple metrics with labels, long titles. |
| `2*1` | KPI plus sparkline, two small metrics, compact progress/gauge, mini status list. | Axis-heavy charts, wide legends, tables, more than two subcomponents. |
| `3*1` | KPI trio, short conclusion text, compact horizontal bar, small status distribution. | Dense chart labels, table columns, chart plus ranking. |
| `4*1` | Summary strip, 3-4 KPIs, concise conclusion with 1 small visual, compact timeline. | Full analytical table, two independent charts. |
| `8*1` | Full-width KPI strip with 4-8 compact items, headline conclusion, period/status strip. | Dense table or complex chart unless it is intentionally shallow. |
| `2*2` | Small pie/gauge/radar, Top 5 bar, 2-4 KPI group, text plus mini chart. | Standard table, long axis labels, chart plus table. |
| `3*2` | Small/medium chart, 3-5 column small table, chart plus small tags, diagnostic text plus evidence. | More than one primary chart, 6+ table columns. |
| `4*2` | Standard chart, pie plus legend, chart plus ranking, small table, 2-3 subcomponents. | Dense S2 table, complex map/tree, 4+ equal subcomponents. |
| `5*2` / `6*2` | Primary chart plus side insight, medium table, chart plus short evidence list, map plus legend. | 6+ internal panels, very dense dimensions. |
| `8*2` | Full-width primary chart, chart plus table, table with 6-8 columns, 4-subcomponent composite. | Complex multi-level S2 analysis that needs vertical depth. |
| `4*3` / `4*4` | Tall chart, flow/funnel/tree, table with scroll, decomposition panel. | More than one dense table. |
| `6*3` / `8*3` | Main table, complex chart, map plus detail panel, decomposition tree, diagnostic workspace. | Forcing everything into one block when separate questions exist. |
| `8*4+` | Full analysis workspace, detailed table, traceability view, multi-step drilldown area. | First-viewport-only design; use vertical scroll deliberately. |

## 5. Internal Component Count Limits

When one block contains multiple subcomponents, the count includes visible KPI tiles, charts, lists, tables, and text panels inside the block body.

### Two Subcomponents

Minimum practical spans:

- 1920: `3*2` for text plus chart, KPI plus chart, chart plus small ranking.
- 1280: prefer `4*2` for the same combinations.
- KPI-only pairs may use `2*1` or `2*2`.

Allowed combinations:

- KPI + sparkline.
- Conclusion + evidence chart.
- Chart + Top N ranking.
- Table + small summary strip.
- Map + legend/status explanation.

### Four Subcomponents

Minimum practical spans:

- KPI/status-only: `4*1` or `8*1`.
- Mixed chart/list/text: `4*2` at 1920, `6*2` or `8*2` at 1280.
- Table plus three helpers: `8*2` minimum; prefer `8*3`.
- When four peer tiles are shown simultaneously, prefer a balanced `2 * 2` internal distribution unless the content is explicitly a shallow KPI strip.

Allowed combinations:

- Four KPI cards in one summary strip.
- Chart + ranking + two key insights.
- Table + summary strip with 2-3 metrics.
- Four compact status buckets.

Do not place four equal analytical charts inside one `4*2` block. Use tabs, a drawer, or split into separate grid blocks.

### Six Subcomponents

Minimum practical spans:

- KPI/status-only: `8*1` if each item is very compact; `8*2` is safer.
- Mixed components: `8*2` minimum at 1920, `8*3` at 1280.
- Any table/chart-heavy composition: `8*3` or split.
- When six peer tiles are shown simultaneously, prefer `3 * 2`; avoid `6 * 1` except for compact KPI/status strips.

Allowed combinations:

- Six KPI/status tiles.
- One primary chart + five compact reason/status tags.
- One table + five summary indicators only when the table body keeps enough height.

Do not use six subcomponents when each needs a separate title or interaction. Split the business questions.

### Eight Subcomponents

Minimum practical spans:

- KPI-only strip: `8*1`.
- Compact card grid: `8*2`.
- Mixed chart/list/table: usually split; if kept together, use `8*3` or larger with one primary component and subordinate helpers.
- When eight peer tiles are shown simultaneously, prefer `4 * 2`; avoid narrow columns or dense `8 * 1` analytical strips.

Allowed combinations:

- Eight compact KPI/status tiles.
- Four KPIs + four small status tags.
- One main chart + seven tiny legend/reason chips only when labels remain readable.

Avoid eight visible analytical panels in one block. That is usually a section, not a block.

### Nine Subcomponents

Minimum practical spans:

- KPI/status-only: `8*3` or split by section.
- Mixed chart/list/table: split into multiple blocks, tabs, or drawers.

When nine peer tiles are shown simultaneously, use `3 * 3` only if each tile remains readable at the active viewport. Do not force nine analytical charts into one crowded block.

## 6. Hard Layout Constraints

- The page-grid span belongs to the top-level block; internal subcomponents must not create nested page grids.
- Do not treat `1920 * 1080` or `1280 * 768` as the report's maximum height.
- Do not reduce `N`, row height, title space, chart body height, or table body height to force the full report into one viewport.
- Do not duplicate block titles inside chart/table/KPI bodies.
- Do not make peer components too narrow, tiny, crowded, or unreadable; use balanced `M * N` layouts, split sections, or move details to drawer/fullscreen.
- Do not put a normal table into `1*1`, `2*1`, `2*2`, or `3*1`.
- Do not place axis-heavy charts into `1*1` or `2*1`.
- Do not place chart plus table into anything smaller than `8*2`.
- Do not place more than one primary chart in a block smaller than `4*2`.
- Do not use more than one internal scroll area in one block.
- If a title, legend, axis label, table column, toolbar, or status tag does not fit, increase the span or simplify the component.
- On `1280 * 768`, promote mixed components by at least one span tier compared with 1920 planning.
- If a block needs long explanations, detailed table review, or multiple independent actions, use a drawer/detail page instead of expanding the card forever.

## 7. Selection Workflow

1. Choose the business question for the block.
2. Decide whether the block is single-component or composite.
3. Count visible internal subcomponents.
4. Pick a legal span from `grid-containers.md`.
5. Check the practical size table for the active viewport.
6. Verify the component capacity table and internal component count limits.
7. If total report height exceeds the first viewport, keep the grid and enable vertical scrolling.
8. If the block fails any constraint, either:
   - increase the span,
   - switch simultaneous subcomponents to tabs/segmented views,
   - move details to a drawer/modal,
   - or split into separate `8 * N` blocks.
