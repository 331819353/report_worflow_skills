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
4. Read `template-layout-design-system.md` when changing `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, title band, or content range.
5. Calculate the actual block width/height with `$report-visual-layout-design`.
6. Verify each span can hold its chart/table/KPI/composite content at the target viewport size.
7. Keep or add vertical scrolling when the report needs more rows than the first viewport can show.
8. Rename widget keys to match changed block ids.
9. Run `npm run validate:dashboard`.

### Add A Data-Bound Widget

1. Create/register the widget.
2. Add static/mock rows in `src/data/dashboard.dataset.json`, configure `widget.data.id: 'apiData'` with `widget.data.api`, or register a custom API/provider resolver in `dataSources/registry.ts` for complex providers. Do not create TS fixture modules for mock rows.
3. Configure `widget.data`.
4. Add `filterFields`, `requiredFilters`, API params, resolver params, or `requiredParams` for every affecting global/page filter. Use `ignoredFilters` plus `ignoredFilterReasons` only for filters the widget intentionally does not consume.
5. If mock/offline mode is used, ensure non-default filter values return different rows or values when the business state should change; add a custom resolver when plain rows cannot model the scenario.
6. For line, area, and category-axis charts, sort row tuples first and derive labels, values, tooltip payloads, and click payloads from the same sorted rows.
7. Render from the `data` prop inside the widget.

### Add Component Interaction

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the widget.
3. Implement popup, navigation, drilldown, and detail behavior inside the widget or hosting product module.
4. Use `actions/registry.ts` only for shell-level utilities or host-system event observation.
5. Keep global filters immutable from component actions unless the host product intentionally wires that behavior.

### Change Visual Style

- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Shared template layout style such as block gap, card radius, block title band, cell padding, and hover/focus feedback follows `template-layout-design-system.md`.
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
- Affecting filters are bound through `filterFields`, `requiredFilters`, API params, or resolver params; `ignoredFilters` is used only for intentionally invariant widgets and each ignored filter has `ignoredFilterReasons`.
- Non-default primary filter states visibly change affected widget data in JSON/API/resolver mode, or the widget is clearly labeled static/invariant.
- Block spans match the size and component-count constraints from `$report-visual-layout-design`.
- Layout tokens match the selected template family or deviations are documented: content range, `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, and 32px block title band.
- Outer block validation does not replace component-internal fit checks. Composite widgets must be reviewed with `$report-component-style-design` for summary columns, nested KPI grids, text wrapping, min-height, and no critical nowrap/ellipsis clipping.
- `1920 * 1080` and `1280 * 768` are used as viewport checks, not total report height caps.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after the minimal required dependencies are installed.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
