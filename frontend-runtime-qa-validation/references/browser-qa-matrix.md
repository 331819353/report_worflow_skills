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

## Headless Screenshot And Multimodal Visual Review

- Use a headless browser or browser automation tool to capture screenshots before declaring layout status.
- Capture first viewport and full page for the primary route.
- Capture additional screenshots after representative filter changes, tab switches, drawer/modal opening, drilldown, fullscreen, export preview, and relevant empty/error/auth states.
- Send screenshots to a multimodal model using `../../workflow-shared-references/visual-multimodal-browser-check.md`.
- Record `VIS-*` findings for layout offset, excessive blank area, text overlap, graphic overlap, chart/table/card too small, clipping, unreadable labels, nonblank rendering failures, broken proportions, stale prototype residue, and broken scroll behavior.
- Re-capture and re-review affected screenshots after repairing `blocker` or `major` findings.

## Route And Surface Checks

- Direct entry, refresh, navigation, route params, tabs, drawers, modals, back/close, and fullscreen behavior.
- For embedded or micro-frontend pages, host mount point and base path behavior.

## Layout Checks

- Charts, tables, legends, labels, KPI cards, buttons, drawers, modals, sticky areas, table scrollbars, and toolbars fit their containers.
- Verify dense data, long text, empty states, and loading states do not resize fixed-format UI unexpectedly.
- Check target desktop and mobile/tablet viewports when the page is responsive or embedded in variable containers.
- For ECharts, AntV S2, canvas, and virtualized tables, verify nonblank rendering, resize behavior after container changes, and cleanup/dispose behavior after route changes or tab switches.
- Check keyboard focus, visible focus states, close/back escape behavior, and basic screen-reader labels for custom controls when those controls are part of the delivered workflow.
