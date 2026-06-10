# Browser QA Matrix

## Build And Startup

- Typecheck, lint, test, build, dev, preview, or static serve commands available in the project.
- Record skipped commands only when undefined or externally blocked.
- Confirm the served URL and route entry.

## Browser Basics

- Page loads without blocking runtime errors.
- Console has no blocking errors, repeated warnings, hydration failures, or asset load failures.
- Network/provider traces do not show full-materialize-then-filter behavior for global/page scope: global filter/search/page/sort UI changes should update request/query/resolver params rather than fetching all candidate rows and narrowing locally. Component-internal filters may stay local when they operate only on already fetched component data.
- Before filter UI interaction is judged, confirm data completeness evidence exists: filter option data, default rows, at least one non-default filter dataset/response, required fields, and empty/no-permission state when relevant. If a data source has only one default snapshot, filter linkage cannot pass for affecting filters.
- Static assets, chunks, fonts, images, workers, and downloaded templates resolve under the intended base path.
- Layout appears at target viewport sizes without obvious clipping or overlap.
- Domain navigation, Tabs, Segments, and first-level perspective controls are checked at `1920x1080` and `1280x768` with DOM overflow assertions. For each visible item/card content viewport: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`. Screenshots can support findings but cannot replace these DOM checks.
- Fixed-height navigation/cards/KPI tiles/compact summaries are checked with DOM overflow assertions at `1920x1080` and `1280x768`. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is a clipping finding unless the element is an intentional visible scroll region.

## Headless Screenshot, Baseline Diff, And Multimodal Review

- Use a headless browser or browser automation tool to capture screenshots before declaring layout status.
- Capture first viewport and full page for the primary route.
- For report/dashboard pages, capture component-level crops in addition to full-page screenshots. Required crops when present: donut/pie chart, trend/cartesian chart, KPI card or KPI group, and table/analytical grid. Donut/pie charts must have their own crop; full-page evidence is not enough.
- Capture additional screenshots after representative filter changes, tab switches, drawer/modal opening, drilldown, fullscreen, export preview, and relevant empty/error/auth states.
- Run deterministic baseline image diff when approved baselines exist. Record baseline path, current screenshot path, diff path, thresholds, masked regions, and `VDIFF-*` findings.
- If no baseline exists, save baseline candidates and record deterministic regression as `baseline missing`, not pass.
- Send screenshots to a multimodal model using `$quality-gate-validation` when the model/service is available and explanatory visual review is in scope.
- Record `VIS-*` findings for layout offset, excessive blank area, text overlap, graphic overlap, chart/table/card too small, clipping, unreadable labels, nonblank rendering failures, broken proportions, stale prototype residue, and broken scroll behavior.
- Record `VIS-*` findings for SVG/canvas/ECharts/custom-graphic distortion: warped curves, stretched maps, elliptical circles/radars, squeezed gauges, non-uniformly scaled icons, or paths whose curvature changes when the container resizes.
- Record `VIS-*` findings for duplicate component titles, cramped/narrow/tiny components, unbalanced peer-component strips, and text-graphic collisions where business-question text, labels, legends, chart marks, cards, or diagram nodes overlap or visually merge.
- Record `VIS-*` findings from component crops when verifiable rules fail: trend chart bottom legend crowds x-axis labels, donut/pie labels/guide lines/legend/title/center text collide, squeeze each other, clip, or leave card bounds, KPI core value is not centered or occupies less than 40% of body height, or tables with more than 8 columns/natural groups use a flat header without reason.
- Record `VIS-*` findings for title-node collisions: section headers, stage/layer/lane titles, group captions, or column labels sitting on top of cards, node cards, connector paths, badges, legends, or child labels. The page cannot pass visual QA when this affects a key diagram or first-viewport component.
- Re-capture, re-diff, and re-review affected screenshots after repairing `blocker` or `major` `VDIFF-*` or `VIS-*` findings.

## Route And Surface Checks

- Direct entry, refresh, navigation, route params, tabs, drawers, modals, back/close, and fullscreen behavior.
- For embedded or micro-frontend pages, host mount point and base path behavior.

## Layout Checks

- Charts, tables, legends, labels, KPI cards, buttons, drawers, modals, sticky areas, table scrollbars, and toolbars fit their containers.
- Page/block titles are not duplicated inside component bodies through chart/table/KPI internal title options.
- Block title bands preserve the default left-title/right-function-area layout. Right function area uses capsule for one local filter with `< 3` values, dropdown for one local filter with `>= 3` values, filter panel for multiple filters, and lightweight links for detail actions; controls stay on one line and do not crowd the title.
- Peer component groups use balanced `M * N` layouts where possible, such as 4 -> `2 * 2`, 6 -> `3 * 2`, 8 -> `4 * 2`, and 9 -> `3 * 3`; components are not narrow, tiny, crowded, or unreadable.
- Business-question text, conclusion text, labels, legends, chart marks, table cells, cards, diagrams, and controls do not overlap, stack, or visually merge.
- Section headers, group captions, layer/stage/lane labels, and column titles reserve independent title bands and maintain at least 16px safe spacing from the nearest card, node, connector, chart mark, legend, or child label.
- Verify dense data, long text, empty states, and loading states do not resize fixed-format UI unexpectedly.
- For composite parent blocks with internal sub-blocks, verify no-data masks use the correct hierarchy: all child sub-blocks empty shows one whole parent-block mask; partial child emptiness masks only affected sub-blocks, including each affected sub-block title/control area plus component body.
- Verify hover and `focus-visible` states for interactive cards, KPI tiles, chart/table containers, navigation items, toolbar controls, and local filter chips. They should preserve geometry and use in-bounds border/outline/glow; clipped borders, cut shadows, or offset/scale animation at grid edges are `VIS-*` defects.
- Check target desktop and mobile/tablet viewports when the page is responsive or embedded in variable containers.
- For perspective navigation density, verify each nav card carries at most two layers of primary information. If domain name, metric name, value, and focus point all appear together, record a layout defect unless the design uses a two-line structure, intentional horizontal navigation, dropdown perspective selector, tooltip, or overview detail area.
- For fixed-height cards and navigation items, verify implementation evidence for height budget: padding, explicit line-height values, row count, gaps, badge/status/footer heights, and `requiredContentHeight <= componentHeight`. Missing budget evidence is a QA gap; failing budget or DOM overflow is a `VIS-*` defect.
- For ECharts, AntV S2, canvas, and virtualized tables, verify nonblank rendering, resize behavior after container changes, and cleanup/dispose behavior after route changes or tab switches.
- For components mapped or labeled as ECharts standard charts, verify chart-engine fidelity: source/runtime uses an ECharts instance or approved wrapper, visible marks come from data-driven ECharts `option`/`series`, and tooltip/legend/emphasis behavior is available when relevant. Import-only ECharts paired with hand-authored SVG/HTML/CSS/canvas bars, lines, pies, gauges, maps, axes, or legends is a `VIS-*`/implementation QA failure.
- For trend/cartesian ECharts charts with visible x-axis labels and bottom legends, inspect option/config and crop: `grid.containLabel` is `true`, `grid.bottom >= 56px`, and the legend has clear safe distance from axis labels.
- For donut/pie charts in small cards or compact sub-blocks, inspect option/config and crop: bottom legend is the default; right legend has a passing width budget and is used only when outside labels are disabled or key-label-only; `legendBandHeight`, `labelLineBudget`, `radius`, and `center` are declared; labels have max width/wrapping or truncation disclosure; low-share categories may hide permanent outside labels while tooltip/legend exposes full values; `hideOverlap` is enabled, `bleedMargin` and `edgeDistance` are configured where supported, and no title/legend/label-line/label/center collision or out-of-bounds rendering exists.
- For KPI card crops, verify the core value zone is visually centered and occupies at least 40% of the card body height; title/subtitle/helper copy must not crowd the top while leaving a large unused blank area.
- For table/analytical-grid crops, verify more than 8 visible columns or natural field groups use complex/grouped headers; otherwise record the flat-header exception.
- For SVG, canvas, ECharts custom graphics, maps, gauges, radars, graphs, Sankey, and complex diagrams, verify aspect-ratio preservation at target viewports. Shape-sensitive graphics should scale uniformly or relayout responsively, not stretch to fill both axes.
- For Element Plus controls, verify CSS/theme is loaded, popper overlays attach above the report shell, select/date/cascader dropdowns are not clipped by card overflow, dialogs/drawers preserve filter context, focus states are visible, and disabled/loading/error states render correctly.
- For Chinese report metrics, verify rate/change/completion labels show `%` rather than `pt`, `p.p.`, or `percentage point` unless explicitly required.
- Verify change-rate and variance-rate indicators use positive-red-up and negative-green-down SVG/icon+text semantics, with neutral styling for zero.
- For HTML-replica or custom layouts, verify the page uses global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and control styling instead of copied one-off inline colors.
- Check keyboard focus, visible focus states, close/back escape behavior, and basic screen-reader labels for custom controls when those controls are part of the delivered workflow.

## Evidence Quality

- QA notes must list the screenshot path for every full-page and component crop used in judgment.
- Findings must reference verifiable criteria, such as exact option fields, pixel/spacing requirement, collision/clipping evidence, column count, or crop path.
- Do not use only subjective wording such as "视觉舒适", "比较协调", or "看着正常" as a pass/fail basis.
