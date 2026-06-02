# Browser QA Matrix

## Build And Startup

- Typecheck, lint, test, build, dev, preview, or static serve commands available in the project.
- Record skipped commands only when undefined or externally blocked.
- Confirm the served URL and route entry.

## Browser Basics

- Page loads without blocking runtime errors.
- Console has no blocking errors, repeated warnings, hydration failures, or asset load failures.
- Static assets, chunks, fonts, images, workers, and downloaded templates resolve under the intended base path.
- Layout appears at target viewport sizes without obvious clipping or overlap.

## Headless Screenshot, Baseline Diff, And Multimodal Review

- Use a headless browser or browser automation tool to capture screenshots before declaring layout status.
- Capture first viewport and full page for the primary route.
- Capture additional screenshots after representative filter changes, tab switches, drawer/modal opening, drilldown, fullscreen, export preview, and relevant empty/error/auth states.
- Run deterministic baseline image diff when approved baselines exist. Record baseline path, current screenshot path, diff path, thresholds, masked regions, and `VDIFF-*` findings.
- If no baseline exists, save baseline candidates and record deterministic regression as `baseline missing`, not pass.
- Send screenshots to a multimodal model using `../references/standalone-quality-gates.md#visual-browser-and-multimodal-check` when the model/service is available and explanatory visual review is in scope.
- Record `VIS-*` findings for layout offset, excessive blank area, text overlap, graphic overlap, chart/table/card too small, clipping, unreadable labels, nonblank rendering failures, broken proportions, stale prototype residue, and broken scroll behavior.
- Re-capture, re-diff, and re-review affected screenshots after repairing `blocker` or `major` `VDIFF-*` or `VIS-*` findings.

## Route And Surface Checks

- Direct entry, refresh, navigation, route params, tabs, drawers, modals, back/close, and fullscreen behavior.
- For embedded or micro-frontend pages, host mount point and base path behavior.

## Layout Checks

- Charts, tables, legends, labels, KPI cards, buttons, drawers, modals, sticky areas, table scrollbars, and toolbars fit their containers.
- Verify dense data, long text, empty states, and loading states do not resize fixed-format UI unexpectedly.
- Check target desktop and mobile/tablet viewports when the page is responsive or embedded in variable containers.
- For ECharts, AntV S2, canvas, and virtualized tables, verify nonblank rendering, resize behavior after container changes, and cleanup/dispose behavior after route changes or tab switches.
- For Element Plus controls, verify CSS/theme is loaded, popper overlays attach above the report shell, select/date/cascader dropdowns are not clipped by card overflow, dialogs/drawers preserve filter context, focus states are visible, and disabled/loading/error states render correctly.
- For Chinese report metrics, verify rate/change/completion labels show `%` rather than `pt`, `p.p.`, or `percentage point` unless explicitly required.
- Verify change-rate and variance-rate indicators use positive-red-up and negative-green-down SVG/icon+text semantics, with neutral styling for zero.
- For HTML-replica or custom layouts, verify the page uses global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and control styling instead of copied one-off inline colors.
- Check keyboard focus, visible focus states, close/back escape behavior, and basic screen-reader labels for custom controls when those controls are part of the delivered workflow.
