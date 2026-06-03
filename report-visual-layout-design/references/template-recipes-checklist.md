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
2. Add static/mock rows in `src/data/dashboard.dataset.json`, configure `widget.data.id: 'apiData'` with `widget.data.api`, or register a custom API/provider resolver in `dataSources/registry.ts` for complex providers.
3. Configure `widget.data`.
4. Add `filterFields`, `requiredFilters`, `ignoredFilters`, or `requiredParams`.
5. Render from the `data` prop inside the widget.

### Add Component Interaction

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the widget.
3. Implement popup, navigation, drilldown, and detail behavior inside the widget or hosting product module.
4. Use `actions/registry.ts` only for shell-level utilities or host-system event observation.
5. Keep global filters immutable from component actions unless the host product intentionally wires that behavior.

### Change Visual Style

- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Keep Haier blue/white as the primary style for ordinary report pages.
- For sci-fi, keep a dark cockpit theme with controlled semantic colors.

## Verification Checklist

- Template choice matches report scope and usage scenario.
- Logo variant matches background.
- `dashboard.config.ts` owns layout, filters, widgets, actions, and assets.
- Business data is not stored directly in config.
- Standard API endpoints are configured with `apiData` / `httpData`; custom resolvers are reserved for complex providers.
- Every widget has `visualType`.
- Widgets without data have `dataPolicy`.
- Filter scope and data field mapping are explicit.
- Block spans match the size and component-count constraints in `block-size-constraints.md`.
- `1920 * 1080` and `1280 * 768` are used as viewport checks, not total report height caps.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after the minimal required dependencies are installed.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
