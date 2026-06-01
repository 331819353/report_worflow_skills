# Template Recipes And Checklist

Use this file for common adjustments and final verification after changing a template project.

## Common Recipes

### Change Logo

- Single-page: update `assets.logoSrc`.
- Left-nav: update `assets.logoSrc`.
- Sci-fi: update `assets.logoSrc`, usually to the white logo.
- Light background uses original color logo. Dark background uses white logo.

### Change Page Title

- Single-page: update `screen.title`.
- Left-nav: update `nav[].label` and any page title config exposed by the template.
- Sci-fi: update cockpit title/page label in config and title asset use if present.

### Change Layout Blocks

1. Edit `layoutRows`.
2. Keep 8 columns per row unless the template explicitly supports another grid.
3. Keep repeated characters rectangular.
4. Calculate the actual block width/height with `block-size-constraints.md`.
5. Verify each span can hold its chart/table/KPI/composite content at the target viewport size.
6. Keep or add vertical scrolling when the report needs more rows than the first viewport can show.
7. Rename widget keys to match changed block ids.
8. Run `npm run validate:dashboard`.

### Add A Data-Bound Widget

1. Create/register the widget.
2. Add static data in `dashboard.data.ts` or resolver in `dataSources/registry.ts`.
3. Configure `widget.data`.
4. Add `filterFields`, `requiredFilters`, `ignoredFilters`, or `requiredParams`.
5. Render from the `data` prop inside the widget.

### Add A Drilldown

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the widget.
3. Use `openModal`, `setFilters`, `switchNav`, `navigateUrl`, `fullscreen`, `print`, or a custom action.
4. Define modal content in `modals`.
5. Use `context.isStale` in modal widgets when filters change after open.

### Change Visual Style

- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Keep Haier blue/white as the primary style for ordinary report pages.
- For sci-fi, keep a dark cockpit theme with controlled semantic colors.

## Verification Checklist

- Template choice matches report scope and usage scenario.
- Logo variant matches background.
- `dashboard.config.ts` owns layout, filters, widgets, modals, and assets.
- Business data is not stored directly in config.
- Every widget has `visualType`.
- Widgets without data have `dataPolicy`.
- Filter scope and data field mapping are explicit.
- Block spans match the size and component-count constraints in `block-size-constraints.md`.
- `1920 * 1080` and `1280 * 768` are used as viewport checks, not total report height caps.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after `npm install`.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
