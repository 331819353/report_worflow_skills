# Component Family Style Rules

This file was split from `11-detailed-style-rules.md`. Load it only for this focused rule group; use `11-detailed-style-rules.md` as the routing index.

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
- For funnel charts, reserve a left stage-label column, a bar/funnel body column, and a right value/share column; declare ordered stage data, shared population/cohort logic, entry share, stage conversion, drop value/rate, total conversion, and tooltip detail before accepting the visual.
- For line, area, and mini trend charts with sparse data, apply the Sparse Line And Trend Chart Rules so one point is centered and two points are center-symmetric.
- If labels cannot fit, use Top N, abbreviation with tooltip, scroll, zoom, or fullscreen.
- For dense charts, prefer partial label/value display plus hover tooltip over crowded permanent labels.
- Do not place long explanatory paragraphs inside the plot area.

For dense charts:

- Use data zoom, brush, scroll, pagination, or small multiples.
- Allow series toggling.
- Use Top N plus `其他` instead of unreadable long tails.
- Hide nonessential labels by default and reveal details through tooltip, hover, selection, drawer, or fullscreen.
- When exact value reading matters, prefer table/list/detail drawer over a visually saturated chart.
- Switch to table when exact reading matters more than shape.

### Small-Card Donut Rules

- Donut charts inside small cards must reserve legend width/band before radius is chosen.
- Reduce radius after reserving legend and label zones; do not let the donut consume the legend area.
- Configure label maximum width, wrapping or truncation disclosure, `labelLayout.hideOverlap`, `bleedMargin`, and `edgeDistance` where supported.
- If label/legend/center/title collision remains, move detail to tooltip/legend, enlarge the card, or switch to bar/table.

### Radar Chart Rules

Radar charts are high risk for label, legend, and scale collision. Use them only when dimensions share a defensible score scale and the component has enough space for an outer label ring.

Rules:

- Do not place a radar chart in a narrow or shallow card if it also needs an internal legend.
- Reserve separate zones for title, component-local filter, metric strip, radar dimension labels, plot area, legend, and state message.
- Keep the legend separate from component-local filters. Filters change chart state; legends explain actual, target, previous, or object series.
- Recommended dimension count is `5-8`; `9-10` is allowed only with short labels and key-only value labels; `>10` should become a scorecard, horizontal bar group, facet, or matrix table.
- Keep visible series to `1-2` by default and `<=3` maximum. More objects require a selector, facets, or another chart.
- Plot standardized scores when raw metrics use different units, and expose raw values through tooltip/detail.
- Put the legend outside the plot area, usually above/right of the plot band or centered in narrow cards; never let the legend sit on top of radar axis labels.
- Keep `indicator.name` labels short. If a label exceeds 4-6 Chinese characters or 8-10 Latin characters, abbreviate it and provide tooltip/full text.
- Configure ECharts radar label spacing explicitly with `axisName`/`nameGap`; do not rely on defaults.
- Set `radar.center` and `radar.radius` after reserving legend and label space, and preserve a circular coordinate system. Do not stretch the radar into an ellipse to fill a wide or tall card.
- If top/bottom labels collide with title or legend, move the legend, reduce radius, shift center, or increase the block span. Do not hide overflow.
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
