# Visualization Development Practices

Use this reference when adding pages, charts, stores, routes, or API integration to a sample-like Vue3 data-visualization project.

## Development Flow

1. Add or update API declarations in `src/api/<domain>/api.ts`.
2. Use `src/utils/request.ts` for all HTTP calls so token injection, 401 recovery, 429 handling, and response normalization stay consistent.
3. Add route entries in `src/router/modules/<module>.ts` and route-level pages in `src/views`.
4. Store cross-page user/token/global state in Pinia modules under `src/stores/modules`.
5. Add reusable visual components to `src/components`.
6. Use `ChartRenderer.vue` or equivalent reusable chart wrapper for ECharts lifecycle and option rendering.
7. Keep page components responsible for orchestration: loading data, mapping API response to view model, passing props/options into reusable components, and handling page-level state.
8. Keep global styles and Element Plus overrides in `src/styles`.

## ChartRenderer Expectations

The uploaded sample lists `src/components/ChartRenderer.vue` as the shared chart renderer. When following this architecture:

- Centralize ECharts initialization, `setOption`, resize, and disposal in the renderer or a shared chart utility.
- Pass chart options/data through props rather than hardcoding business data inside the renderer.
- Let route pages or feature components prepare business-specific chart options.
- Preserve tooltip, legend, resize, loading, empty, and error states.
- Route chart readability and fit decisions to `$report-component-style-design` when labels, legends, axes, or canvas/SVG geometry become dense.
- The renderer must mount ECharts only after the chart body has measurable width and height. Prefer `ResizeObserver` on the chart body/container and call `chart.resize()` when the body changes size. Add equivalent hooks for hidden tabs, drawers, fullscreen, route keep-alive activation, or grid-span changes when those states exist.
- Watch option/data/theme/filter props and call `setOption` or the wrapper's equivalent update path after DOM updates. Do not recreate the instance for ordinary data changes unless the project wrapper requires it.
- Disconnect observers/listeners and call `dispose()` on unmount or final deactivation. Repeated navigation must not create duplicate chart instances.
- A chart wrapper that only listens to `window.resize` is incomplete for cards, tabs, drawers, and grid layouts whose container can resize without a window resize. Document the exception or route the chart to `$report-chart-design-spec` for lifecycle repair.
- The chart wrapper or owning page must expose enough DOM hooks for anti-squeeze QA: measured chart body, generated SVG/canvas bounds, legend/title/axis bands, and plot area. Full axis charts are not ready when resize works but the plot is compressed below the chart-family floor.
- When a chart shares a card with table/list/detail preview, compute the split before rendering. Do not let the preview consume the chart body; if the chart plot floor and at least `3` preview rows cannot both fit, route the preview to Top3, drawer, tab, detail page, or split the block.

## API And View Model Boundary

- API modules describe backend endpoints and request parameters.
- Request utilities own transport behavior and auth/error handling.
- Pages/stores own orchestration and mapping from API response to component view model.
- Chart components own rendering, not data fetching.
- Shared types in `src/types` should describe API responses, route params, and component props when reused.

## Element Plus Usage

- Prefer Element Plus for filters, forms, buttons, date pickers, selects, dialogs, drawers, messages, pagination, and simple tables.
- Keep Element Plus theme overrides in `src/styles/element/index.scss`.
- Use `ElMessage` from the request layer for global request errors; page-level validation errors may use local form feedback.

## Verification

Before handoff:

- Run `pnpm dev` for local startup when a URL is needed.
- Run `pnpm build:test` or `pnpm build:prod` according to target environment.
- Run `pnpm preview` after build when preview behavior matters.
- Verify `VITE_API_BASE_URL` points to the intended environment.
- Verify `Access-Token` is present for authenticated API requests.
- Verify 401 behavior clears token/user info and triggers login recovery.
- Verify chart components resize and dispose correctly when route/page changes.
- Verify chart resize at two sizes or states when a chart is implemented: the chart body has non-zero dimensions, the generated SVG/canvas follows the body within 2px, the chart is nonblank after resize, and no duplicate instances/listeners remain after unmount/navigation.
- Verify full line/bar/combo charts are not visually squeezed: standard chart body `>=180px`, dense or chart + table/list body `>=220px`, plot-height floor is met, y-axis labels do not overlap, gridlines do not merge into a stripe, and shared chart/table cards keep at least `3` preview rows without compressing the chart.
