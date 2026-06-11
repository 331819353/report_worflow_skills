# Layout Acceptance Gates

Detailed layout rules moved out of `SKILL.md`. Load this for implementation-ready page layout, page规范, visual repair, or layout readiness decisions.

## Hard Rules

- Page layout does not design block title areas. Each block owns its own title/function/local-filter area and body viewport. Component bodies should not duplicate a visible block-owned title when the surrounding block already has one.
- Layout must be driven by user task, business priority, real content density, and next action. A page that only looks modern, clean, high-end, or "科技感" without a clear task path fails layout design.
- Do not default to a generic dashboard composition such as four KPI cards, two big charts, three small charts, a right list, and one top date filter. Use that pattern only when it is justified by the metric tree and decision path.
- Report layout must encode a diagnostic sequence: current state -> target/baseline gap -> movement -> driver/dimension contribution -> abnormality/trust signal -> detail records -> owner/action. Overview-only first screens must still expose a route to diagnosis or detail.
- Reserve visible or discoverable space for data updated time, source, statistical period/snapshot/batch/version, metric口径, permission scope, export scope, anomaly notes, and owner/action when the report is implementation-ready.
- Do not spend primary layout real estate on decorative charts, equal-weight chart variety, or visual atmosphere while detail tables, drilldowns, owner/action blocks, or trust details are missing.
- Report-designer/editor layouts must include data-binding and validation workflow areas, not only component library, canvas, property panel, preview, save, and publish buttons.
- Do not use generic SaaS/AI page structures such as oversized hero, three-column feature cards, uniform decorative sections, pricing/testimonial/FAQ blocks, or floating card strips in a report/task interface unless the business workflow explicitly requires them.
- Do not use decorative gradient/orb/glass/neon backgrounds as layout glue. Visual atmosphere must come from approved brand/template tokens and report hierarchy.
- Avoid average-weight layouts where every section/card has similar height, spacing, and emphasis. The first viewport must show a deliberate priority order and the downstream reading path.
- Do not treat desktop first-screen appearance as completion. Scroll depth, lower sections, mobile/tablet, long text, empty/error/no-permission states, and real data density are part of layout acceptance.
- Block-owned title/function areas default to a two-zone contract inside the block: left title and right function area. The page layout may list the required title, local filters, links, or actions for the block, but the block/template/component implements their placement and fit.
- Component-local filter control selection belongs to the block/component rules: `2-4` short values with fit proof use a sliding capsule/segmented pill; `>4` values, long labels, or insufficient width use a compact dropdown/select; multiple local filter groups use a filter panel/popover/drawer trigger.
- Component-local filters affect only the current block/component and must not replace the page/global filter surface. Their geometry is checked inside the block, not designed as a page-layout title strip.
- Top-level blocks must occupy legal rectangular `8 * N` spans.
- A top-level `8 * N` block is a parent container, not a one-component limit. Parent blocks may contain internal sub-blocks, and each sub-block may contain one component or one tightly related micro-group.
- Internal sub-blocks must remain inside the parent block body viewport. They do not create nested page-grid blocks, do not create page-level title areas, and must use local grid/flex tracks with `5px` parent inset, `5px` sibling gaps, explicit min sizes, and overflow rules.
- Analysis & Insight blocks are sized as decision-support components, not decorative copy. Summary bars, insight cards, anomaly/risk cards, recommendation cards, definition/data-quality notes, chart annotations, explanatory empty states, and task notes need enough room for conclusion, evidence, action/trust/source/freshness, tooltip/detail, and state geometry. Chart-side insights use `insightW = clamp(200px, W * 0.28, 320px)` and normally stay within `25%` of a Composite Panel or chart block area.
- Composite Panel parent blocks must prove they are one business analysis unit before internal composition is approved: one shared title/function/local-filter handoff, one primary child, default `2-3` visible children and normal max `4`, primary child `50-70%` visual weight, `contentH >= CH * 0.60`, shared legend/unit/filter context, linked interaction, child min-size checks, and responsive collapse from P4 to P1. If child components answer different questions or need independent full title/filter/action bands, split them into separate page-grid blocks.
- No-data masks in composed parent blocks are hierarchical. If a sub-block has no data, first check every sibling sub-block in the same parent block. When all sub-blocks are no-data, show one parent-block mask over the whole parent block. When only some sub-blocks are no-data, show masks only on those affected sub-blocks. A sub-block mask must cover the sub-block label/title/control area and component body together; it must not mask only the chart/table body and leave the sub-block title active.
- Treat `1920x1080` and `1280x768` as viewport baselines, not maximum report height.
- First-level perspective controls such as domain navigation, Tabs, and Segments must pass no-clipping DOM checks at both `1920x1080` and `1280x768`. For each visible navigation/control item or card content viewport, acceptance requires `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`; if `scrollHeight > clientHeight` or `scrollWidth > clientWidth`, the layout fails even when screenshots look acceptable. Screenshot inspection cannot replace this DOM check.
- Fixed-height navigation/cards must declare a height budget before acceptance: `paddingTop + paddingBottom + sum(explicit line-height * reserved lines) + sum(gaps) + fixed badges/status/footer heights <= cardHeight`. Auto layout alone is not acceptable for fixed-height components.
- Domain names, metric names, percentages/core values, badges, footer labels, and bottom focus labels inside fixed-height navigation/cards must have explicit `line-height`; large numbers must not rely on browser default line boxes.
- First-level navigation should carry `domain + one core indicator` by default. Navigation cards may carry at most two layers of primary information. If one navigation card needs domain name, metric name, value, and focus point at the same time, redesign it as a two-line structure, intentional horizontal navigation pattern, dropdown perspective selector, selected-state summary, or move detail into tooltip/overview content.
- Do not divide viewport height by row count to make everything fit; increase rows, split sections, scroll, tab, drawer, or fullscreen.
- Filters, toolbar, legends, table headers, labels, chart marks, and diagram nodes must not overlap or clip.
- Detail Table blocks must reserve title/local-filter handoff, optional metric strip/search/tools, fixed header, table body rows, optional summary row, pagination/total, and state-message zones. Allocate enough height for `tableBodyAreaH >= CH * 0.55` and at least `4-6` visible rows by default; if fewer than `3` rows fit, enlarge, split, or convert to a preview with a detail route.
- Pivot Table blocks must reserve title/local-filter handoff, optional metric strip, row dimension header, multi-level column headers, measure headers, data body, subtotal/grand-total bands, scroll/virtual viewport, tooltip/drilldown trigger zones, and state-message zones. Allocate enough height for `pivotAreaH >= CH * 0.55` and at least `4` visible body rows; if this fails, enlarge, split, use fullscreen/detail route, reduce dimensions/measures, or convert to a summary plus drilldown.
- Blocks containing complex/grouped table headers must reserve multi-level header height before approving the block span: default `2` levels, maximum `3` levels, `headerRowH = 32-40px`, parent groups plus leaf headers, optional unit/subtext, fixed whole-header band, row-dimension/primary frozen columns when horizontal scroll exists, and enough remaining body height for at least `4` useful rows. If the header consumes the body, enlarge/split, collapse groups, remove header subtext, move to fullscreen/detail, or redesign.
- Template-based pages must not introduce a standalone filter toolbar, persistent filter bar, or extra filter drawer when the selected template already has a filter trigger/panel/popover/drawer. Treat "筛选工具栏" requirements as `filters[]` and filter-binding work unless the user explicitly requests template-level redesign.
- Shape- or density-sensitive visuals such as gauges, radar, maps, pies, Combo charts, funnel charts, sunburst charts, treemap/rectangular tree maps, parallel-coordinate charts, path/user/process paths, Sankey diagrams, tree/hierarchical trees, relation/network graphs, flow paths, SVG/canvas diagrams, and custom ECharts graphics need an aspect-compatible or axis-density-compatible block plus fullscreen/fit-box strategy. Do not allocate them to a mismatched rectangle and rely on non-uniform stretching, unreadable axis compression, false dual-axis compression, or collapsed stage labels.
- Detail Table blocks need row/column-density-compatible spans. Default tables show `5-8` columns and `4-6` rows; large blocks may show `8-12` columns; more columns require horizontal scroll, frozen primary/action columns, column settings, detail drawer, or S2-class analytical table routing.
- Pivot Table blocks need analytical-table spans. Default pivots show `1-2` row levels, `1-2` column levels, and `1-3` measures; large blocks may show up to `5` measures. More rows/columns require S2 scroll/virtualization, frozen row headers, fixed column headers, metric switch, dimension reduction, fullscreen, split table, heatmap, or Detail Table drilldown.
- Combo chart blocks must reserve left/right axis width, legend, local-filter/title-function area, x-axis label band, target/reference right-gap, and a dominant plot body; keep `plotH >= CH * 0.48` or enlarge/split/collapse optional labels before accepting the layout.
- Gauge blocks must reserve title/local-filter, center value/unit, arc, min/max ticks, target marker, threshold/status labels, and state-message zones; keep `gaugeAreaH >= CH * 0.50` or enlarge/split/collapse optional labels before accepting the layout.
- Hover/focus effects in fixed `8 * N` blocks must not move, scale, or visually escape components. Prefer in-bounds border glow/inset glow and route component-level motion details to `$report-component-style-design`.
- Complex diagrams need diagram-owned title/label bands and at least 16px safe spacing between titles, nodes, labels, and connectors.
- Main filter controls should use the project design system or Element Plus-style controls; naked native selects are not final visual surfaces.
- Haier-branded pages must reserve a visible logo slot and use a correct light/dark logo asset supplied by the project or `$report-prototype-template-management`.

## Required Output

- Page shell choice and layout rationale.
- Anti-AI layout gate result: `antiAiRisk`, product-context proof, forbidden-default scan, first-screen-only risk, and brand/product memory-point decision.
- Report decision layout gate when applicable: `reportDecisionRisk`, `RPT-*` findings, five decision-question answers, metric tree/diagnostic path, first-viewport decision answer, detail/action route, and trust-detail placement.
- Brand mode and logo placement.
- Header/navigation/filter/toolbar structure.
- Perspective navigation density and DOM no-clipping check plan for `1920x1080` and `1280x768`.
- Fixed-height navigation/card height budget: declared height, padding, explicit line heights, row count, gaps, footer/status heights, and pass/fail calculation.
- Block title/function handoff: block title text, required right-side controls, local-filter needs, and downstream owner (`template block`, `business widget`, or `$report-component-style-design`). Do not design the title area in page layout.
- Filter surface mapping: template-native page/global filter trigger/panel/popover/drawer, custom page/global filter bar, component-local filter handoff, or explicit redesign exception.
- First-viewport hierarchy.
- `8 * N` parent block grid, internal sub-block plan when used, component placement, and sizing notes.
- Empty/no-data mask scope plan: parent-block mask when all child sub-blocks have no data; affected sub-block mask including sub-block title plus component when only part of the parent is empty.
- Template layout-token family and deviations when template-based: `contentGap`, `cellPadding`, card padding/radius, block-owned title/function area token, content range, and row height.
- Responsive and state layout plan.
- Layout risks, gaps, and downstream handoffs.

## Quality Gate

- The first meaningful viewport answers the page's main question or exposes the main action.
- The layout passes the anti-AI gate: it is task-specific, content-specific, state-aware, responsive, and not a generic polished template.
- The layout passes the report decision gate for report surfaces: it is not a generic dashboard shell, the metric tree/diagnostic path is visible, and detail/action/trust areas are present or explicitly scoped out.
- Unresolved `RPT-TEMPLATE-LAYOUT`, `RPT-NO-DATA-STORY`, `RPT-NO-ACTION`, or `RPT-DESIGNER-SHELL` findings block implementation-ready layout acceptance.
- Any gradient, glow, glass, oversized radius, abstract imagery, or decorative atmosphere has an approved brand/template/sample rationale and does not replace information hierarchy.
- Sections and cards are not evenly weighted by default; priority and workflow path are visibly encoded.
- Every block with a title/function area declares a block-owned title/function handoff; component-local filters follow `2-4` capsule, `>4`/failed-fit dropdown, multi-group panel rules inside the block rather than as a page-layout title strip.
- Analysis & Insight blocks pass the size-role check: they have enough space for one conclusion and its evidence/action/trust context, do not become long essays, do not visually dominate the primary chart/table, and use explanatory states instead of plain `暂无数据`.
- Domain navigation, Tabs, and Segments pass DOM no-clipping checks at `1920x1080` and `1280x768`: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth` for each visible item/card content viewport. Screenshot-only evidence is insufficient.
- Fixed-height navigation/cards declare padding, explicit line-height, gaps, and height budget; `padding + line-height boxes + gaps <= card height` at both baseline viewports.
- Navigation/cards with `scrollHeight > clientHeight` or `scrollWidth > clientWidth` fail layout QA even if screenshot review does not show obvious clipping.
- Navigation cards do not exceed two primary information layers; default content is `domain + one core indicator`; domain name + metric name + value + focus point is split, scrolled intentionally, converted to dropdown perspective selection, moved to selected-state summary, or moved to tooltip/overview.
- Every block has a purpose, a size rationale, and a visible state plan.
- Every internal sub-block has a purpose, a size rationale, component owner, and visible state plan when parent-block composition is used.
- Composite Panel blocks pass the panel-fit check: one topic, one primary child, child roles/priorities, shared filter/legend/unit, linked interaction, child minimum sizes, `contentH >= CH * 0.60`, primary visual weight `50-70%`, default `2-3` children and normal max `4`, and fallback that collapses detail/auxiliary content before the primary child becomes unreadable.
- No-data masks are applied at the correct hierarchy: whole parent block only when every child sub-block is no-data, otherwise only the no-data child sub-blocks, covering each child sub-block title/label/control area plus its component body.
- Dense components have enough room or an overflow/fullscreen/drawer strategy.
- No title, label, legend, chart, table, card, node, connector, filter, or toolbar element overlaps or clips; block-owned title areas are included in visual QA but not designed by the page-layout layer.
- Detail Table blocks expose enough rows/columns for the task: primary key/object column remains readable, numeric/status/action columns align, pagination and header stay visible, and search/local filters do not compress the table body below its row budget.
- Pivot Table blocks expose enough row/column context for cross-summary: row dimensions stay readable/frozen, column headers and measure headers remain visible, totals do not consume the body, and local metric/display switches do not compress `pivotAreaH` below its budget.
- Complex/grouped table-header blocks expose the full group-to-leaf relationship: parent groups align to their leaf columns, the whole multi-level header stays visible during body scroll, frozen row/primary columns keep the top-left header synchronized, and local filters/header icons do not crowd or replace the table body.
- Template filter surfaces are reused instead of duplicated; no standalone filter toolbar/bar appears in a template-based layout without a named redesign decision.
- Shape- or density-sensitive charts and diagrams are assigned aspect-compatible spans or use centered uniform scaling/fullscreen; funnel charts preserve `funnelAreaH`, left stage-label width, bar body width, and right value/share label width; parallel-coordinate charts preserve readable axis spacing and line density, and Sankey diagrams preserve horizontal layer spacing and `sankeyAreaH` instead of being squeezed into narrow blocks.
- Hover/focus states for cards, blocks, navigation, and toolbar controls preserve geometry and are not clipped at block edges.
- Template-based layout tokens follow `$report-prototype-template-management` `template-layout-design-system.md`; deviations are deliberate and documented.
- Template engineering details are routed to `$report-prototype-template-management`, not embedded here.
