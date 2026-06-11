---
name: report-component-style-design
description: "用于报表组件级视觉样式、响应式和可读性设计/评审/修复。用户提到KPI卡、指标卡、文本总结、筛选控件、按钮/标签/弹窗/抽屉、ECharts、AntV S2、表格、图例、标签过密、tooltip、hover/focus动效、边框发光、复杂图形、树/漏斗/流程、SVG/canvas图形变形、比例失真、组件溢出、对齐、缩放、移动端适配、视觉优化时触发；不负责整页布局或模板工程。"
---

# Report Component Style Design

## Core Positioning

Use this skill to design, critique, or repair the visual style and responsive behavior of business report components. It covers Element Plus filters/forms/buttons/tabs/tags/popovers/dialogs/drawers, summaries, KPI cards, ECharts charts, AntV S2 analytical tables, cards/lists/tasks, complex diagrams, and in-component controls.

Keep `SKILL.md` as the routing and quality gate. Load detailed references only for the component types actually present in the task.

When component styling includes common enterprise Web components such as buttons, inputs, selects, forms, menus, PageHeader, tables, empty states, feedback, or cross-platform adaptation, load `$haier-enterprise-app-ui-design-spec` for base tokens and standard rules. This skill should only add report-component fit, chart/table readability, and data-density rules on top.

For every report, dashboard, cockpit, data-screen, BI, or business-analysis component task, load `$report-design-system-governance` report guideline references for chart/table/filter/status/font/color/format standards before applying component-specific fit rules. This applies even when the user asks only for frontend repair, QA, or visual optimization.

## Reference Library

Start with `references/00-component-reference-index.md`, then load only the matching component references:

| Need | Read |
| --- | --- |
| Shared layout, typography, overflow, labels, hover disclosure, empty/loading/error states | `references/01-shared-foundation.md` |
| Filter bars, chips, query controls, advanced filters | `references/02-filter-controls.md` |
| Text summaries, insight blocks, conclusion cards | `references/03-text-summary.md` |
| KPI cards, metric groups, comparison tiles, mini trends | `references/04-kpi-metric-cards.md` |
| ECharts axes, legends, labels, tooltips, chart density | `references/05-echarts-charts.md` |
| AntV S2 tables, analytical grids, wide metric matrices | `references/06-analytical-tables.md` |
| Cards, lists, tasks, anomaly/status blocks | `references/07-cards-lists-tasks.md` |
| Drawers, modals, evidence/detail panels | `references/08-drawers-detail-panels.md` |
| Trees, Sankey, attribution, DuPont, flows, complex diagrams | `references/09-complex-diagrams.md` |
| Capsule switches, segmented controls, dropdowns inside components | `references/10-in-component-controls.md` |
| Legacy detailed rules not yet covered by focused references | `references/11-detailed-style-rules.md` |
| Haier enterprise app UI tokens and standard components | `$haier-enterprise-app-ui-design-spec` |
| Report UI guideline chart/table/format/filter/state rules | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` and `$report-design-system-governance` `references/06-report-filters-states-engineering-acceptance.md` |
| Leadership-friendly KPI/chart/table sample patterns and reading-path alignment | `$report-design-system-governance` `references/07-exemplary-report-design-patterns.md` |
| Anti-AI visual, copy, state, accessibility, and engineering-smell gate | `$report-design-system-governance` `references/08-anti-ai-design-gate.md` |
| Report decision anti-AI gate for metric systems, data story, realistic data, chart/table choice, linkage/action, and trust details | `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` |
| Cross-stage design reasonableness when component style choices affect business comprehension, density, exact values, or interaction closure | `$quality-gate-validation` |

## Workflow

1. Identify every component type, its data density, viewport size, interaction needs, and business priority.
2. Load `references/00-component-reference-index.md` plus the smallest matching reference set.
3. Reserve stable component dimensions before styling: parent block body, internal sub-block viewport when present, header, actions, legend, body viewport, footer, pagination, state messages, and aspect-ratio boxes for SVG/canvas/custom geometry.
4. Apply shared fit rules first, then component-specific rules. If rules conflict, use the stricter no-duplicate-title/no-overlap/no-truncation/no-hidden-critical-data rule.
5. Run design reasonableness checks when a component choice may weaken the business answer, hide exact values, duplicate another component, overload the container, or block the next action.
6. Run the anti-AI component gate: detect generic gradients/glass/glow/oversized-radius styling, empty copy, generic icons/assets, decorative motion, missing states, weak accessibility, and sample-like hardcoded styling.
7. Run the report decision component gate for report components: verify metric口径 display/support, chart/table task fit, data story role, realistic data states, filter/drilldown/export/action linkage, trust details, and industry vocabulary. Record `RPT-*` issues when styling hides or replaces decision evidence.
8. Define overflow and exact-value disclosure: tooltip, drawer, fullscreen, zoom/pan, scroll, table fallback, or label sampling.
9. Specify visual tokens: typography, color semantics, borders, shadows, spacing, states, hover/focus, and responsive behavior.
10. Verify the component inside its real parent block or sub-block container after filters, tab switches, data updates, drawer/fullscreen changes, and window resize.

## Hard Constraints

- Do not style a component until its business purpose, data grain, key fields, filter scope, and interaction state are known.
- Do not use generic "AI/SaaS polish" as a component style: purple-blue gradients, glass panels, black neon, glow buttons, floating decorative cards, oversized radius, abstract AI icons/3D assets, or particle/grid decoration require a named brand/template/sample rationale.
- Component copy must be concrete. Titles, subtitles, CTAs, empty states, errors, and helper text must name the user action, data object, condition, owner, source, period, or next step. Generic words such as "赋能", "智能化", "一站式", "重新定义", "无缝", or "提升效率" are not enough.
- KPI cards, metric groups, chart blocks, and summary components must not be styled as generic metric shells. Every primary metric-bearing component must preserve visible or discoverable formula/denominator, grain, period, source/freshness, unit/precision, baseline, and owner/action context when the surface is implementation-ready.
- Do not add chart variety for decoration. A chart/table choice must serve a specific task such as target gap, trend, ranking, composition, distribution, relationship, driver diagnosis, abnormality, detail, or action. Otherwise record `RPT-DECORATIVE-CHART`.
- Visual treatment must not compete with data reading. Gradients, glass, glow, illustration, large shadows, and high-saturation decorative colors fail when they reduce numeric hierarchy, axis/legend readability, anomaly visibility, table scanning, or exact-value access.
- Report components that show a result must expose the next step or evidence path: tooltip, detail table, drawer, drilldown, export, owner/action, annotation, or runbook. A polished result card with no action path is `RPT-NO-ACTION`.
- Prototype or mock component states must not imply unrealistically clean performance. All-green/all-up KPIs, perfectly smooth trends, balanced shares, and no missing/zero/extreme states should be marked `RPT-TOO-CLEAN-DATA` unless the source evidence proves that reality.
- Icon-only and decorative components are not accepted when they carry decision-critical meaning without labels, tooltips, data, or accessible names.
- Motion must communicate state, feedback, hierarchy, loading, selection, or transition. Decorative movement that distracts from scanning or has no reduced-motion behavior fails component style QA.
- Do not accept a polished component that is unreasonable for the task. Use `DESIGN-*` findings when a chart should be a table, a dense component needs drilldown/fullscreen, a component duplicates another message, or the style hides the user's decision-critical value.
- Do not hide decision-critical labels, units, warnings, or values without a hover/focus/click disclosure path.
- Do not let ECharts, S2, SVG, canvas, or custom diagrams mount into a zero-size or unstable parent block or sub-block container.
- When a component is a standard ECharts chart, implement it as an ECharts chart: project wrapper or `echarts.init`, data-driven `option`/`series`, normal `setOption`/update/resize, and ECharts tooltip/legend/emphasis behavior. Do not import ECharts while hand-drawing bars, lines, pies, gauges, maps, axes, or legends with SVG/HTML/CSS/canvas.
- Hand-authored SVG/canvas is allowed only for icons, logos, trend arrows, decorative assets, or explicitly named custom diagrams/graphics that are not standard charts. ECharts output using `renderer: 'svg'` is valid because ECharts owns the generated SVG.
- Do not stretch SVG, canvas, ECharts custom graphics, gauges, maps, radar, flow paths, or generated decorative geometry with independent X/Y scaling. Preserve geometry with a canonical `viewBox`, `preserveAspectRatio="xMidYMid meet"`, CSS `aspect-ratio`, or a measured inner fit box using `scale = min(containerWidth / designWidth, containerHeight / designHeight)`.
- Do not use CSS `transform: scaleX/scaleY`, `object-fit: fill`, or raw `width: 100%; height: 100%` SVG/canvas stretching when the graphic shape has business meaning. Center/letterbox inside the assigned viewport or redesign the graphic for the actual aspect ratio.
- For ECharts line, area, bar, and other category-axis charts, the x-axis categories must be ordered explicitly. Time/period axes default to ascending chronological order unless the user or business rule explicitly requires reverse/custom order.
- Do not sort only x-axis labels, categories, or `xAxis.data` while series values still map the unsorted source rows. Sort the row tuples first, then derive `xAxis.data`, every `series.data`, tooltip payloads, and click payloads from the same ordered rows.
- For ECharts Cartesian charts with visible x-axis labels and a bottom legend, `grid.containLabel` must be `true`, `grid.bottom >= 56px`, and the legend must keep an explicit safe distance from x-axis labels.
- For donut/pie charts inside small cards or compact sub-blocks, bottom legend is the default. When outside labels are enabled, a right-side legend is allowed only after a width budget proves the card is wide enough; otherwise use a bottom legend.
- Donut/pie space budgets must declare `legendBandHeight`, `labelLineBudget`, `radius`, and `center` before acceptance. Right-side legends must also declare a legend width budget. Do not accept vague wording such as "adjust legend position" without these numbers/config fields.
- Right-side donut/pie legends are allowed only when the card is wide enough and outside labels are disabled or limited to key labels. Small-share categories may hide permanent outside labels; full category names, values, and percentages must remain available through tooltip and legend.
- Donut/pie labels, label lines, legends, center text, and card titles must not collide, squeeze each other, or leave the card bounds. Use label thresholds, `labelLayout.hideOverlap`, `bleedMargin`, `edgeDistance`, smaller radius, bottom legend, tooltip/legend disclosure, or a bar/table fallback before accepting the component.
- KPI cards must visually center the core value zone in the card body. The main value region must occupy at least 40% of the card's main visual height, and title/description text must not crowd the top while leaving a large empty lower area.
- Tables with more than 8 visible columns or natural field groups must use complex/grouped headers by default. A flat header needs an explicit reason.
- Do not solve density by shrinking text below readable sizes; use sampling, scrolling, zoom/pan, drawer, fullscreen, split components, or table fallback.
- Do not create one-off component styles that conflict with the page shell, Haier branding, or existing design system.
- Do not duplicate Haier enterprise UI tokens or standard component rules inside report component guidance; load `$haier-enterprise-app-ui-design-spec` whenever common enterprise Web components or app-surface behavior are present.
- Do not render a duplicate visible component title inside the chart/table/KPI/custom component body when the page or block layout already provides a title. Component body titles are allowed only for explicitly standalone components without a layout-owned title, and then title height must be reserved before measuring the viewport.
- Do not accept components that are too narrow, too small, or crowded for their labels, values, legends, axes, controls, pagination, and state messages. Enlarge the container, split the component, use scroll/zoom/fullscreen/drawer/table fallback, or reduce visible label density before final acceptance.
- Passing the outer `8 * N` parent block grid is not enough. Internal sub-blocks, composite widgets, summary areas, nested KPI grids, comparison tiles, and custom small cards must pass their own internal fit check inside the real sub-block/component viewport.
- Fixed-height cards, KPI tiles, navigation cards, compact summaries, and fixed-height control items must declare a height budget before component style acceptance: padding + explicit line-height rows + vertical gaps + badge/status/footer heights must be `<=` the component height. Auto layout alone is not a fit proof.
- Domain names, metric names, percentages/core values, KPI values, units, badges, helper text, and footer labels inside fixed-height components must have explicit `line-height`; large numbers need a deliberately sized line box.
- A sub-block is a local viewport inside a parent block. It may hold one component or one tightly related micro-group; it must have a declared min size, `5px` parent inset, `5px` sibling gap, overflow rule, and state behavior before component styling is accepted.
- For no-data masks inside composite parent blocks, component styling must respect layout-owned hierarchy: all sibling sub-blocks empty means one parent-block mask; partial empty means masks only on affected sub-blocks. A sub-block mask covers the sub-block title/label/control area and component body, not only the inner chart/table viewport.
- Do not force small metric groups into a fixed two-column grid when titles, values, units, or helper text cannot fit. Widen the summary zone, allow wrapping, increase min height, reduce visible tiles, stack, scroll, or move detail to tooltip/drawer.
- Do not combine `overflow: hidden`, `white-space: nowrap`, and `text-overflow: ellipsis` on decision-critical metric titles, summary labels, values, or action text unless a full text disclosure path is present. Prefer one- or two-line wrapping with stable height for long metric titles.
- For repeated peer cards/charts/tiles inside a component, sub-block group, or large parent block, use the internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, calculate from `layoutTotal`: normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose columns `M >= N`, and the smallest `M - N` among valid factor pairs where `layoutTotal = M * N`. After the internal matrix is chosen, the parent block uses `heightExpansionRows = ceil(N * 2 / 3)` as the height expansion baseline; expand the parent block instead of squeezing child tiles. Do not add arbitrary empty slots; the only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data. Split the group if the matrix becomes unreadable.
- Text summaries, conclusions, and insight blocks must inherit the surrounding page shell tokens for surface, spacing, typography, radius, and semantic colors. Do not introduce a new standalone visual surface, grid rhythm, or density that conflicts with adjacent sections.
- In `sampleRestore`, added conclusions must sit inside an existing sample-equivalent region and reuse its spacing, border, typography, and surface tokens; a new standalone horizontal band fails style QA unless the sample already has one.
- In fixed-grid report cards, KPI cards, chart/table containers, and compact controls, hover/focus feedback should use border color, outline, inset glow, or stable box-shadow. Do not use hover `translate`, `scale`, or outer-shadow effects when the parent container may clip borders/shadows or when the effect changes perceived block alignment.
- Hover/focus glow must not require extra layout space. Prefer `box-shadow: inset 0 0 0 1px ...`, subtle inner glow, or an absolutely positioned pseudo-element inside the component bounds. `focus-visible` should share the same non-shifting feedback as hover.
- Rate/change indicators in Chinese report UI display `%`, not `pt`, `p.p.`, or `percentage point`, unless the user explicitly requests that term.
- Change-rate and variance-rate indicators use positive-red-up / negative-green-down semantics with icon+text pairing: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.
- Do not use naked native `<select>` controls as the final visual surface for primary filters.
- Do not hand-roll Vue controls that Element Plus already provides unless the existing project design system explicitly supersedes Element Plus or the interaction is unsupported.
- Do not accept flow, Sankey, graph, tree, decomposition, lineage, DuPont, or process-chain diagrams until rail, node, label, gutter, and edge-bend spacing has been calculated.
- Do not accept layouts where section titles, layer/stage/lane titles, group captions, or parent labels overlap, touch, or visually attach to component cards, node cards, borders, connector lines, or child labels. Treat this as a `VIS-*` visual defect and repair spacing before handoff.
- Do not accept overlap or stacking between business-question text, conclusion text, component text, legends, labels, chart marks, table cells, cards, diagram nodes, connector lines, controls, or state messages. Treat text-text, text-graphic, and graphic-graphic collisions as `VIS-*` defects.

## Output Format

When using this skill, provide:

1. Component inventory and loaded reference files.
2. Viewport and size assumptions for each component, including parent block and sub-block viewport when relevant.
3. Style decisions: typography, spacing, color, border/shadow, state, and interaction feedback.
4. Anti-AI component gate: visual cliché scan, copy specificity, state/accessibility coverage, and any approved exceptions.
5. Report decision component gate when applicable: `reportDecisionRisk`, `RPT-*` findings, metric口径 support, chart/table task fit, data story role, realistic data state, linkage/action/trust proof, and industry vocabulary check.
6. Fit decisions: label density, overflow, exact-value disclosure, scroll/zoom/fullscreen/drawer/table fallback.
7. Design reasonableness status and any `DESIGN-*` findings that affected component choice or fit.
8. Implementation notes for ECharts/S2/DOM/CSS behavior where relevant.
9. Self-check result: overlap, clipping, truncation, contrast, resize, aspect-ratio/geometry integrity, hover/focus/touch, loading/empty/error states.

## Quality Checklist

- Each component has a stable body viewport and explicit overflow policy.
- Each component passes the anti-AI style gate: style choices are tokenized and product-specific, copy is concrete, imagery/icons are meaningful, and motion is stateful rather than decorative.
- Report components pass the report decision gate: primary metrics have口径 and trust context, chart/table choices answer a named task, realistic data states are supported, and detail/action paths are not hidden by visual polish.
- Unresolved `RPT-METRIC-SHELL`, `RPT-DECORATIVE-CHART`, `RPT-VISUAL-OVER-DATA`, or `RPT-NO-ACTION` findings block component acceptance for implementation-ready report work.
- Primary component text does not use generic AI/SaaS slogans without concrete behavior or evidence.
- Each internal sub-block has a stable viewport and explicit overflow/state policy before component acceptance.
- Sub-block viewports preserve `5px` spacing from the parent body edge and `5px` spacing from sibling sub-blocks.
- No-data masks inside composite blocks pass hierarchy checks: all child sub-blocks empty uses one parent mask; partial empty uses affected sub-block masks that cover sub-block title/label/control plus component body.
- Component titles are layout-owned by default; chart/table/KPI bodies do not duplicate the block/page title.
- Component choice is reasonable for the business task and data shape; unresolved `P0`/`P1` `DESIGN-*` findings are not styled over.
- Component size is sufficient for the selected visual type and data density; cramped/narrow/small components are enlarged, split, scrolled, zoomed, or moved to fullscreen/drawer before pass.
- Fixed-height cards/KPI tiles/navigation items pass the internal height-budget check: declared padding, explicit line-height rows, row count, vertical gaps, badge/status/footer heights, and `requiredContentHeight <= componentHeight`.
- DOM overflow checks fail when a fixed-height card/navigation item has `scrollHeight > clientHeight` or `scrollWidth > clientWidth`, even if screenshot review misses the crop.
- Standard charts mapped to ECharts use actual ECharts options/series and runtime interaction; there is no dependency-only ECharts import paired with hand-authored SVG/HTML/CSS/canvas chart marks.
- SVG/canvas/ECharts/custom graphics preserve their intended aspect ratio; curves, gauges, maps, nodes, and icons are not squeezed, stretched, or warped by the container.
- Nested summary/KPI/tile layouts pass internal fit for long labels, values, units, helper text, and action text; no decision-critical content is clipped by nowrap/ellipsis without disclosure.
- Line, area, bar, and other category-axis charts have an explicitly sorted x-axis, and labels/points/values/tooltips are derived from the same sorted row order.
- ECharts charts with visible x-axis labels plus bottom legends pass the reserved-space check: `grid.containLabel = true`, `grid.bottom >= 56px`, and legend-to-axis-label distance is visually clear.
- Small-card donut/pie charts pass the legend/label fit check: bottom legend is used by default; right legend has a width budget and is used only when the card is wide enough and outside labels are closed or key-label-only; `legendBandHeight`, `labelLineBudget`, `radius`, and `center` are declared; low-value labels may be hidden from permanent outside labels but remain available through tooltip/legend; no title/legend/label-line/label/center collision or out-of-bounds rendering exists.
- KPI cards pass the value-anchor check: core value zone is centered in the body, occupies at least 40% of main visual height, and title/description placement does not create large unused blank space.
- Tables with more than 8 visible columns or natural grouped fields use complex/grouped headers, or the flat-header exception is documented.
- Repeated peer cards/charts/tiles use internal exact `M * N` distribution only when `actualTotal > 4`; prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M >= N`, and `M - N` is minimal among valid factor pairs; sub-block viewports pass min-size checks and parent blocks pass the height-capacity check with `heightExpansionRows = ceil(N * 2 / 3)`.
- Titles, units, labels, legends, controls, pagination, and states fit without overlapping data marks.
- Business-question text, conclusion text, component labels, chart marks, diagrams, tables, and cards do not overlap, stack, or visually merge.
- Section titles, layer/stage/lane titles, and group captions have their own reserved title band and at least 16px safe spacing from the nearest card, node, connector, or label.
- Hidden or abbreviated values are inspectable.
- Dense charts use label budgets and tooltips; dense tables use S2 or horizontal scroll.
- Complex diagrams use zoom/pan, minimap, drawer, or fullscreen instead of overflowing.
- Complex diagrams keep layer numbers, stage/layer/lane titles, group captions, labels, nodes, connectors, and edges at least 16px apart and reserve rail, title-band, and edge-bend space.
- Primary filters use Element Plus or project design-system select/dropdown/date/cascader controls, or a fully styled native select only for baseline prototype acceptance.
- Controls inside components have clear selected/hover/disabled/loading states and do not resize the block.
- Hover/focus states for cards, KPI tiles, chart/table containers, and compact controls do not move, scale, or visually escape the assigned viewport; border glow or inset glow is preferred over offset animation.
- Text summaries and conclusions inherit the surrounding layout tokens and do not look like unrelated inserted bands.
- Change-rate indicators pass positive-red-up / negative-green-down semantics and use `%` in Chinese UI.
- Loading, empty, error, no-permission, and stale states preserve geometry.
- Runtime resize or visual verification is performed when the component is implemented, including at least one viewport/container size different from the design baseline for graphics that use SVG, canvas, ECharts custom paths, maps, gauges, or complex diagrams.

## Avoid

- Do not duplicate detailed reference rules in final answers; cite the loaded references and apply their decisions.
- Do not use decorative cards, gradients, or visual noise when the component's job is analytical scanning.
- Do not make components look "premium" by adding generic gradients, glass, glow, huge radii, abstract AI imagery, or ornamental animation.
- Do not accept generic empty copy in component headings, helper text, empty states, or errors.
- Do not use charts as visual variety when a table, detail drawer, decomposition, or action block is the actual decision support.
- Do not hide metric口径, source/freshness, baseline, anomaly marker, or owner/action context merely to keep a KPI/chart card cleaner.
- Do not add internal chart/table/card titles that duplicate the page or block title.
- Do not make a component look compact by making it too narrow, too small, crowded, or unreadable.
- Do not hide required table columns, action text, KPI values, or alert labels merely to make the layout look cleaner.
- Do not use a chart when the exact-value task requires a table or detail list.
