# Output And Checklist

## 1. Output Format

When asked to design a report visual layout, use this structure:

1. 页面定位: report type, user, core question, usage scenario, custom shell or template-based.
2. 页面路径、样式来源、品牌模式与视觉模式: declare `pageShellPath`, `pageStyleSource`, exactly one `brandMode`, and exactly one `visualMode`; when custom, declare `customDesignPath` and exactly one `customLayoutPattern`.
3. 页面外壳: unified page identity/navigation/filter control surface for custom pages, or the selected template's native shell/navigation/filter slots for template-based pages; include logo placement, actions, and template mapping if applicable.
4. 品牌风格: Haier logo asset discovery result, logo variant or placeholder, Haier blue/white palette, typography, spacing, density, surfaces.
5. 内容结构: summary, breakdown, evidence, detail, action, or another report-appropriate flow.
6. 栅格方案: `8 * N` parent block grid, parent spans, internal sub-block plan when used, row height/scroll strategy, chart/table/container/complex-diagram safety.
7. 关键组件: parent block -> sub-block -> component placement for KPI cards, charts, tables, Analysis & Insight components, text summaries, drawers/popovers, toolbar actions.
8. 模板路由: chosen template and config files to adjust.
9. 交互与状态: filters, drilldown, drawer/modal, refresh/export/fullscreen, empty/loading/error/no-permission, responsive behavior.
10. 视角导航验收: domain navigation, Tabs, Segments, or other first-level perspective controls; include `1920x1080` and `1280x768` DOM no-clipping results.
11. 设计校验: first-viewport value, sample fidelity when applicable, brand correctness, grid correctness, visual restraint, no clipping/overlap.

## 2. Quality Checklist

Before finalizing, verify:

- The entry mode is clear: custom report page or template-based page.
- `pageShellPath` is declared as `template` or `custom`.
- `pageStyleSource` is declared. If no page style and no HTML/source/sample styling is provided, `pageShellPath: template` and a bundled template are selected by default.
- `brandMode` is declared as `haierBranded`, `sampleNative`, or `neutral`; logo and global-token implications are explicit.
- User-specified design style or provided sample/HTML source is followed unless it violates hard gates or the user asks for optimization.
- Exactly one `visualMode` is declared before implementation.
- If `pageShellPath: custom`, exactly one `customDesignPath` is declared: `htmlReplica` or `freeDesign`.
- Custom page shells declare exactly one `customLayoutPattern`: `symmetricBalance`, `threePart`, `masterDetail`, or `narrativeStack`.
- Custom `htmlReplica` and `freeDesign` pages with `brandMode: haierBranded` use a real bundled Haier logo in the header, unified title/control area, or sidebar brand area; placeholder does not pass final acceptance.
- `sampleRestore` preserves the source page shell, module order, container hierarchy, main control count, layer structure, and card proportions unless the user explicitly asks for redesign.
- Any added filter, summary card, detail table, matrix, drawer, or jump in `sampleRestore` is labeled as an enhancement and does not change the first viewport or main body layout.
- Any added conclusion, insight, or status summary in `sampleRestore` is embedded into an existing sample-equivalent region; a new standalone horizontal band fails unless the source has an equivalent band.
- HTML-replica and custom layouts use global UI tokens for palette, typography, spacing, radius, semantic colors, shadows, and control states unless exact color restoration is explicitly requested.
- Custom pages use one coherent page identity/navigation/filter control area when possible, instead of mechanically splitting three independent strips.
- Template-based pages follow the selected template's shell, logo slot, navigation, filter pattern, and grid mechanics.
- Template-based pages do not add a standalone filter toolbar, persistent filter bar, or extra filter drawer when the selected template already owns filter invocation. The filter plan maps to `filters[]`, native trigger/panel/popover/drawer, component-owned local filters, and binding rules.
- If a template is used, the chosen template is justified: topbar dark scroll, topbar light scroll, left-nav workbench, or frozen-title sci-fi cockpit.
- Template adjustment points are named: `dashboard.config.ts`, `dashboard.dataset.json`, `dashboard.loader.ts`, `dataSources/registry.ts`, `demo/config-templates.ts`, widget files, registry/types, actions, styles, and assets as relevant.
- The first viewport reaches the report's core question.
- Logo asset discovery has been completed before implementation.
- The Haier logo is present in the custom-page title/control area or the template logo slot.
- Logo variant is correct: original color on light backgrounds, white on dark backgrounds.
- If logo assets are missing, a visible placeholder remains in the logo slot and the missing asset is listed as a gap.
- The page uses Haier blue and white as the main palette.
- Red/orange/yellow/green colors are used only for semantic status and are not overused.
- Rate/change fields use `%` in visible Chinese UI, not `pt`, `p.p.`, or `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up / negative-green-down icon semantics.
- Redundant information, decorative elements, and visual noise are removed.
- The content area uses an `8 * N` rectangular grid.
- Every top-level parent block occupies complete rectangular page-grid cells.
- Components may be placed inside internal sub-blocks of a parent block; sub-blocks are local layout regions and do not count as page-grid cells.
- Page layout owns page shell identity and block placement, not block title-area design. Business components own visible title/function/local-filter areas inside their widget viewport.
- Every chosen block span has been checked against `1920x1080` or `1280x768` practical viewport constraints.
- `1920x1080` and `1280x768` are not treated as total report height limits.
- If one parent grid block contains multiple sub-blocks/components, the composite parent component carries one clear business title/control area and the internal sub-block labels/components remain visually subordinate.
- Every sub-block has a declared purpose, component owner, local size, `5px` parent inset, `5px` sibling gap, state behavior, and overflow rule.
- Analysis & Insight blocks declare `analysisInsightContract`, reserve conclusion/evidence/action/trust/source/freshness/state zones, fit summary bars/cards/side panels/annotation bubbles to their size tier, and stay visually subordinate to the primary chart/table unless the block is explicitly explanation-first.
- Composite Panel blocks declare one shared topic, one primary child, child roles/priorities/min sizes, default `2-3` children and normal max `4`, primary child visual weight `50-70%`, `contentH >= CH * 0.60`, shared local filter/legend/unit, linked interaction, detail-preview limit, responsive fallback, and parent/child state scope before layout acceptance.
- Peer component groups inside one large block use the internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, they use a small-group layout. When the algorithm applies, prime `actualTotal` first becomes `layoutTotal = actualTotal + 1`, `layoutTotal = M * N`, `M` is columns, `N` is internal rows, `M >= N`, and `M - N` is minimal among valid factor pairs.
- Blocks with repeated internal sub-blocks/components obey the `actualTotal > 4` threshold, expand the parent block with `heightExpansionRows = ceil(N * 2 / 3)` when more height is needed, and are split, tabbed, paginated, or moved to drawers when the valid factor pair is too dense.
- Components are not narrow, tiny, crowded, or forced into cramped spans. Increase span/height, split content, add scroll/zoom/fullscreen, or reduce visible labels before accepting the layout.
- Shape- or density-sensitive visuals such as gauges, radar, maps, pies, Combo charts, funnel charts, sunburst charts, treemap/rectangular tree maps, parallel-coordinate charts, path/user/process paths, tree/hierarchical trees, relation/network graphs, SVG/canvas diagrams, flow paths, and custom ECharts graphics use aspect-compatible or axis-density-compatible blocks or centered uniform fit boxes. A warped curve, stretched map, oval radar/circle, squeezed gauge, false/compressed dual axis, clipped/overcrowded Combo, clipped/overcrowded funnel, clipped/overcrowded sunburst, clipped/overcrowded treemap, clipped/overcrowded parallel-axis plot, clipped/overcrowded path, all-expanded/clipped tree, or clipped/hairball relation graph fails layout QA.
- Parallel-coordinate blocks reserve plot height, axis-title and bottom-label bands, legend/filter zones, `axisGap >= 56px`, `plotH >= CH * 0.48`, and fallback to dimension filtering, horizontal scroll, sampling/aggregation, fullscreen, or table/scatter/bar when dimensions or sample lines exceed readability.
- Scrollable report pages keep usable row/block heights and support vertical scrolling when content exceeds the first viewport.
- Navigation is present only when it helps orientation and remains low-intrusion.
- Domain navigation, Tabs, and Segments are checked at `1920x1080` and `1280x768`; each visible navigation/control item or card content viewport passes `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`.
- Screenshot evidence does not replace DOM no-clipping evidence for first-level perspective navigation.
- Fixed-height navigation/cards include a height budget: declared height, padding, explicit line-height for each text row, row count, gaps, badge/status/footer heights, and a `requiredContentHeight <= cardHeight` calculation.
- A navigation/card DOM check where `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is recorded as clipping, even when the screenshot looks visually acceptable.
- A navigation card carries at most two primary information layers. Default first-level navigation is `domain + one core indicator`. If it needs domain name, metric name, value, and focus point, the design uses a two-line structure, intentional horizontal navigation, dropdown perspective selector, selected-state summary, tooltip, or overview detail area.
- Filters are easy to invoke and active conditions are visible.
- Template-based pages preserve the selected template's native navigation/filter mechanism; config changes patch `nav`/`page`, `filters`, toolbar labels, and theme fields instead of replacing the shell.
- Requirement wording such as "主筛选栏", "筛选工具栏", or "filter bar" is not enough to create a separate visual surface in template mode; it must be adapted into the template's native filter mechanism.
- Filter changes have visible, layout-safe effects across cards, charts, tables, drawers, and export/fullscreen states.
- Hover/focus effects are layout-safe: cards, KPI tiles, chart/table containers, nav items, and toolbar controls do not move, scale, or require external shadow space that can be clipped by the grid/container.
- Interactive block emphasis uses in-bounds border glow, inset glow, outline, or stable color change rather than offset/scale animation when the component sits inside an `overflow: hidden` grid/card.
- Toolbar actions are grouped by frequency and importance.
- Tables, charts, cards, and drawers each have a clear job.
- ECharts and AntV S2 containers have stable dimensions and resize against the body viewport.
- Line, area, bar, and other category-axis charts explicitly sort the x-axis; labels, points, values, tooltips, and click payloads all come from the same sorted row order.
- Element Plus controls are used for filters, form fields, buttons, tabs, tags, popovers, dialogs, drawers, pagination, and simple tables unless a project design system explicitly supersedes them.
- Template validation and build commands are planned or run when code is changed.
- The right edge and bottom edge of every component are checked for clipping.
- No component crosses into another component's rectangle.
- Business-question text, titles, labels, legends, chart marks, diagrams, tables, KPI values, controls, and cards do not overlap, stack, or visually merge.
- Analysis text, insight conclusions, evidence lines, action links, definition/source/freshness labels, and chart annotation bubbles do not overlap each other or the chart/table they explain; generic `智能洞察`/`建议关注` copy without evidence/action/trust context fails layout acceptance.
- SVG/canvas/ECharts/custom graphics preserve proportions after responsive resizing; visual proportion defects are repaired before acceptance.
- Section headers, group captions, layer labels, stage titles, lane titles, and column captions are checked as independent layout elements. They must not overlap, touch, or visually attach to card borders, node cards, node titles, connector paths, chart marks, legends, or child labels.
- Complex diagram layer/stage titles reserve a separate top/side title band with at least 16px spacing from the nearest node/card/connector. A screenshot like a title sitting on the top edge of a node card fails visual QA.
- Flow, Sankey, graph, tree, decomposition, and lineage visuals keep layer numbers, stage/layer/lane titles, group captions, labels, nodes, connectors, ribbons, and edges at least 16px apart and reserve rail, title-band, node, label, ribbon, and edge-bend space.
- Detail Table blocks keep title/local filter, subtitle/freshness, optional metric strip, optional compact search/tools, fixed header, body rows, summary row, pagination/total, tooltip/detail trigger zones, and state messages in reserved zones; preserve `tableBodyAreaH >= CH * 0.55`, show `4-6` rows by default, never accept fewer than `3` visible rows unless it is a named preview with a detail route, and use horizontal scroll/frozen columns/column settings/drawer/S2 fallback when column density exceeds the span.
- Complex/grouped table-header blocks keep parent group rows, leaf header rows, unit/subtext, sort/filter/definition icons, fixed whole-header behavior, frozen row/primary columns, body rows, pagination, and state messages in reserved zones; preserve default depth `2`, maximum depth `3`, at least `4` useful body rows, and group-to-leaf alignment. If leaf columns or header height exceed the span, use horizontal scroll, group collapse, column settings, fullscreen/detail, split table, Pivot Table, or redesign.
- Pivot Table blocks keep title/local filter, subtitle/unit/aggregation note, optional metric strip, row dimension header, multi-level column headers, measure headers, data cells, subtotal/grand-total bands, scroll/virtual viewport, tooltip/drilldown trigger zones, and state messages in reserved zones; preserve `pivotAreaH >= CH * 0.55`, at least `4` visible body rows, frozen row dimensions for horizontal scroll, fixed column headers for vertical scroll, and fallback to metric switch, dimension reduction, fullscreen, split table, heatmap, or Detail Table drilldown when row/column/measure density exceeds the span.
- Gauge blocks keep title, local filter, subtitle, metric strip, center value/unit, progress arc, target marker, threshold labels, min/max ticks, status label, legend, tooltip trigger zones, and state messages in reserved zones; preserve `gaugeAreaH >= CH * 0.50`, centered aspect-safe arc geometry, and center-value priority before accepting the block.
- Combo chart blocks keep title/local filter, subtitle/unit, optional metric strip, legend, left/right axes, target/reference labels, x-axis labels, tooltip guide, and state messages in reserved zones; preserve `plotH >= CH * 0.48`, show both axis units when dual axis is used, limit total visible series to `<=4`, and split the chart when label density or false-correlation risk fails.
- Funnel blocks keep stage labels, bar/funnel body, value/share labels, conversion/loss markers, target markers, local filters, metric strip, legends, tooltip trigger zones, and state messages in reserved zones; preserve `funnelAreaH >= CH * 0.52`, prefer `3-6` stages, fold/scroll/fallback when `>10`, and do not compress labels or hide exact conversion evidence.
- Sankey blocks use at least a `3*2` span, preserve `sankeyAreaH >= CH * 0.55`, declare source-target-value links and layer order, aggregate long-tail nodes/links with Top N/`其他`, keep labels key-only, and collapse legend/filters before compressing the flow body.
- Treemap blocks keep parent groups, child rectangles, breadcrumbs, legends/visualMap, local filters, metric strip, labels, tooltip trigger zones, and body viewport in reserved zones; `1*1` treemap blocks are not accepted. If the body cannot preserve readable parent groups and label thresholds, use Top N/`其他`, drilldown, ranked bar/table, or fullscreen instead of forcing tiny rectangles.
- Sunburst blocks keep center content, visible rings, sector labels, breadcrumbs, legends/visualMap, local filters, metric strip, tooltip trigger zones, and body viewport in reserved zones; `1*1` sunburst blocks are not accepted. If the body cannot preserve `sunburstAreaH >= CH * 0.55`, `ringW >= 18px`, and sector label thresholds, use Top N/`其他`, drilldown, Treemap, ranked bar/table, or fullscreen instead of forcing tiny arcs.
- Path charts keep start, middle steps, end, branches, arrows, labels, legends, local filters, and path body in reserved zones; `1*1` path blocks are not accepted. If only a tiny main-path-only state fits, use a KPI/list/step summary instead of calling it a path chart.
- Tree charts keep root, visible levels, child branches, connectors, expand/collapse controls, search, labels, legends, local filters, and tree body in reserved zones; dense trees must collapse, search, scroll, or switch to tree list instead of expanding every node in a fixed block.
- Main filter controls are Element Plus or project design-system select/dropdown/date/cascader controls, or a styled native select that declares baseline-only acceptance.
- Dark template pages load Element Plus dark variables and set the `.dark` class or equivalent `--el-*` overrides; logo variant, `screen.grid.innerBackgroundColor`, cards, form/filter controls, and popovers do not render as white islands.
- Advanced visual acceptance for option menus uses a custom popover select, not the operating system's native dropdown menu.
- Screenshot evidence covers the logo/header area, filter controls, complex diagrams when present, and sample-restoration first viewport when applicable.
- Empty, loading, error, delayed-data, and no-permission states are handled.

## 3. Avoid

- Do not treat custom pages and template-based pages as the same layout problem.
- Do not choose a custom shell merely because the user did not specify page style.
- Do not mark a custom page complete with only a logo placeholder.
- Do not redesign a selected template's shell unless the task explicitly asks for template-level changes.
- Do not overwrite a template's original navigation/filter shell with newly generated standalone controls.
- Do not generate a new filter toolbar/bar for a bundled template unless the user explicitly requested template-level redesign and the adaptation is documented.
- Do not choose a template without explaining why it fits the report scope and usage scenario.
- Do not force page identity, navigation, and page/global filters into three separate areas when a unified control area is cleaner.
- Do not omit the Haier logo from a `brandMode: haierBranded` custom page's title/control area or a template's logo slot.
- Do not omit the `brandMode` decision when a sample or custom shell might conflict with Haier branding.
- Do not silently remove the logo slot when the logo asset is missing.
- Do not use the original blue logo on dark backgrounds or the white logo on light backgrounds.
- Do not introduce many accent colors that compete with Haier blue and white.
- Do not let copied HTML inline colors or one-off custom styles override the selected global UI token system.
- Do not add a sidebar, nav, footer, or logo just to fill space.
- Do not make navigation visually dominant when compact tabs, breadcrumbs, segmented controls, or drawer navigation are enough.
- Do not accept clipped domain navigation, Tabs, or Segments based on screenshots alone; DOM overflow checks are required.
- Do not pack domain name, metric name, value, and focus point into one overcrowded navigation card.
- Do not expose a large permanent filter region when a filter trigger, popover, drawer, or bottom sheet can carry the task.
- Do not use naked native `<select>` controls as the final visual surface for primary filters.
- Do not use masonry, staggered, irregular, diagonal, or non-rectangular component layouts.
- Do not duplicate a block/page title inside the component body.
- Do not force every component into its own top-level `8 * N` block when a parent block with clear internal sub-blocks better answers one business question.
- Do not make components too narrow, too small, or crowded when internal sub-block layout plus parent-block expansion can carry the content.
- Do not let section/stage/layer/lane titles collide with or sit on top of component cards, node cards, connector lines, or child labels.
- Do not let business-question text, labels, legends, chart marks, treemap rectangles, cards, or diagram nodes overlap, stack, or visually merge.
- Do not create a marketing-style hero for operational reports.
- Do not bury filters or primary actions.
- Do not use many unrelated cards and charts with no visual hierarchy.
- Do not rely on color alone for status.
- Do not show positive change rates with green/down styling or negative change rates with red/up styling.
- Do not use heavy gradients, oversized decoration, or big shadows.
- Do not make every report look like a dark monitoring wall unless the use case requires it.
- Do not optimize for prettiness at the cost of scanning, comparison, and action.
