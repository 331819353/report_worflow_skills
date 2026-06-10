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

## Headless Screenshot, Baseline Diff, And Multimodal Review

- Use a headless browser or browser automation tool to capture screenshots before declaring layout status.
- Capture first viewport and full page for the primary route.
- Capture additional screenshots after representative filter changes, tab switches, drawer/modal opening, drilldown, fullscreen, export preview, and relevant empty/error/auth states.
- Run deterministic baseline image diff when approved baselines exist. Record baseline path, current screenshot path, diff path, thresholds, masked regions, and `VDIFF-*` findings.
- If no baseline exists, save baseline candidates and record deterministic regression as `baseline missing`, not pass.
- Send screenshots to a multimodal model using `$quality-gate-validation` when the model/service is available and explanatory visual review is in scope.
- Record `VIS-*` findings for layout offset, excessive blank area, text overlap, graphic overlap, chart/table/card too small, clipping, unreadable labels, nonblank rendering failures, broken proportions, stale prototype residue, and broken scroll behavior.
- Record `VIS-*` findings for SVG/canvas/ECharts/custom-graphic distortion: warped curves, stretched maps, elliptical circles/radars, squeezed gauges, non-uniformly scaled icons, or paths whose curvature changes when the container resizes.
- Record `VIS-*` findings for duplicate component titles, cramped/narrow/tiny components, unbalanced peer-component strips, and text-graphic collisions where business-question text, labels, legends, chart marks, cards, or diagram nodes overlap or visually merge.
- Record `VIS-*` findings for title-node collisions: section headers, stage/layer/lane titles, group captions, or column labels sitting on top of cards, node cards, connector paths, badges, legends, or child labels. The page cannot pass visual QA when this affects a key diagram or first-viewport component.
- Re-capture, re-diff, and re-review affected screenshots after repairing `blocker` or `major` `VDIFF-*` or `VIS-*` findings.

## Route And Surface Checks

- Direct entry, refresh, navigation, route params, tabs, drawers, modals, back/close, and fullscreen behavior.
- For embedded or micro-frontend pages, host mount point and base path behavior.

## Layout Checks

- Charts, tables, legends, labels, KPI cards, buttons, drawers, modals, sticky areas, table scrollbars, and toolbars fit their containers.
- Page/block titles are not duplicated inside component bodies through chart/table/KPI internal title options.
- Peer component groups use balanced `M * N` layouts where possible, such as 4 -> `2 * 2`, 6 -> `3 * 2`, 8 -> `4 * 2`, and 9 -> `3 * 3`; components are not narrow, tiny, crowded, or unreadable.
- Business-question text, conclusion text, labels, legends, chart marks, table cells, cards, diagrams, and controls do not overlap, stack, or visually merge.
- Section headers, group captions, layer/stage/lane labels, and column titles reserve independent title bands and maintain at least 16px safe spacing from the nearest card, node, connector, chart mark, legend, or child label.
- Verify dense data, long text, empty states, and loading states do not resize fixed-format UI unexpectedly.
- Verify hover and `focus-visible` states for interactive cards, KPI tiles, chart/table containers, navigation items, toolbar controls, and local filter chips. They should preserve geometry and use in-bounds border/outline/glow; clipped borders, cut shadows, or offset/scale animation at grid edges are `VIS-*` defects.
- Check target desktop and mobile/tablet viewports when the page is responsive or embedded in variable containers.
- For ECharts, AntV S2, canvas, and virtualized tables, verify nonblank rendering, resize behavior after container changes, and cleanup/dispose behavior after route changes or tab switches.
- For components mapped or labeled as ECharts standard charts, verify chart-engine fidelity: source/runtime uses an ECharts instance or approved wrapper, visible marks come from data-driven ECharts `option`/`series`, and tooltip/legend/emphasis behavior is available when relevant. Import-only ECharts paired with hand-authored SVG/HTML/CSS/canvas bars, lines, pies, gauges, maps, axes, or legends is a `VIS-*`/implementation QA failure.
- For SVG, canvas, ECharts custom graphics, maps, gauges, radars, graphs, Sankey, and complex diagrams, verify aspect-ratio preservation at target viewports. Shape-sensitive graphics should scale uniformly or relayout responsively, not stretch to fill both axes.
- For Element Plus controls, verify CSS/theme is loaded, popper overlays attach above the report shell, select/date/cascader dropdowns are not clipped by card overflow, dialogs/drawers preserve filter context, focus states are visible, and disabled/loading/error states render correctly.
- For Chinese report metrics, verify rate/change/completion labels show `%` rather than `pt`, `p.p.`, or `percentage point` unless explicitly required.
- Verify change-rate and variance-rate indicators use positive-red-up and negative-green-down SVG/icon+text semantics, with neutral styling for zero.
- For HTML-replica or custom layouts, verify the page uses global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and control styling instead of copied one-off inline colors.
- Check keyboard focus, visible focus states, close/back escape behavior, and basic screen-reader labels for custom controls when those controls are part of the delivered workflow.
