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

0. Run `npm run ledger:code -- --file src/config/dashboard.config.ts --stage before` and read the sidecar ledger before editing.
1. Edit `layoutRows`.
2. Keep 8 columns per row unless the template explicitly supports another grid.
3. Keep repeated characters rectangular.
4. Read `template-layout-design-system.md` when changing `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, component title/control handoff, or content range.
5. Calculate the actual block width/height with `$report-visual-layout-design`.
6. Verify each span can hold its chart/table/KPI/composite content at the target viewport size.
7. Keep or add vertical scrolling when the report needs more rows than the first viewport can show.
8. Rename widget keys to match changed block ids.
9. Append the config ledger entry with changed layout ranges and affected widget/filter contracts.
10. Run `npm run validate:dashboard`.

### Add A Data-Bound Widget

1. Read/create sidecar ledgers before editing each planned source file, usually `dashboard.config.ts`, `dashboard.dataset.json`, `src/widgets/types.ts`, `src/widgets/registry.ts`, and the new component file.
2. Create/register the widget.
3. Add static/mock rows in `src/data/dashboard.dataset.json`, configure `widget.data.id: 'apiData'` with `widget.data.api`, or register a custom API/provider resolver in `dataSources/registry.ts` for complex providers. Do not create TS fixture modules for mock rows.
4. Verify data completeness before binding filters: every affecting primary/global filter has option rows, matching business rows or API/resolver support, required fields, default and non-default states, and empty/no-permission coverage when relevant.
5. Configure `widget.data`.
6. Add `filterFields`, `requiredFilters`, API params, resolver params, or `requiredParams` for every affecting global/page filter. Use `ignoredFilters` plus `ignoredFilterReasons` only for filters the widget intentionally does not consume.
7. If mock/offline mode is used, ensure non-default filter values return different rows or values when the business state should change; add a custom resolver when plain rows cannot model the scenario.
8. For line, area, and category-axis charts, sort row tuples first and derive labels, values, tooltip payloads, and click payloads from the same sorted rows.
9. Render from the `data` prop inside the widget.
10. Append sidecar ledger entries for every changed source file with feature list, code ranges, affected data/filter/API contracts, and verification.

### Add Or Change First-Level Perspective

1. Classify the control as `perspective-switch` when it changes business domain, report theme, management object, metric set, component set, table schema,口径, or domain wording.
2. Put the switch in `nav[]`, page route, tab/segment control, or explicit perspective state. Do not place it in `filters[]` unless the binding matrix proves it only narrows row scope.
3. Add `componentSchemaImpact` to the binding matrix and list whether metric names, component collection, table headers, dimensions, formulas/口径, or domain vocabulary change.
4. Add navigation metric lineage when the perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
5. Add mock/API/resolver data for default and non-default perspectives, including one personalized metric and one risk focus per domain. Dynamic navigation KPIs must come from `businessData`, aggregate data, API/provider fields, or resolver output, not `filterData.meta`.
6. Add a QA case that switches every non-default perspective and checks labels/schema as well as values.

### Add Component Interaction

1. Widget emits `dashboard-action`.
2. Configure `actions[eventName]` on the widget.
3. Implement popup, navigation, drilldown, and detail behavior inside the widget or hosting product module.
4. Use `actions/registry.ts` only for shell-level utilities or host-system event observation.
5. Keep global filters immutable from component actions unless the host product intentionally wires that behavior.

### Change Visual Style

- Read/create the target source file ledger before editing `src/styles.css` or a widget scoped style; append after editing with style range, affected component state, and screenshot/build verification.
- Shell-level changes go in `src/styles.css`.
- Widget-level changes go in the widget scoped style.
- Shared template layout style such as block gap, card radius, component title/control handoff, cell padding, and hover/focus feedback follows `template-layout-design-system.md`.
- Keep Haier blue/white as the primary style for ordinary report pages.
- For sci-fi, keep a dark cockpit theme with controlled semantic colors.

## Verification Checklist

- Template choice matches report scope and usage scenario.
- Logo variant matches background.
- `dashboard.config.ts` owns layout, filters, widgets, actions, and assets.
- Each component-owned title/control area follows a stable structure chosen by the component: title remains readable; component-local filters use capsule/dropdown/panel rules by option count and fit; lightweight links cover detail actions.
- Business data is not stored directly in config.
- Standard API endpoints are configured with `apiData` / `httpData`; custom resolvers are reserved for complex providers.
- Every widget has `visualType`.
- Widgets without data have `dataPolicy`.
- Data completeness is verified before filter binding: filter option rows, business/API rows, required fields, default/non-default states, and resolver/API branches exist or are documented as gaps.
- First-level perspective switches are not hidden in `filters[]`; domain/theme/management-object controls use nav/page/route/tab/segment/perspective state unless explicitly row-scope-only.
- Binding matrix includes `controlSemantics` and `componentSchemaImpact` for controls that affect widgets.
- Navigation percentages, rankings, and status lights have lineage and are not stored in `filterData.meta` unless explicitly static display copy.
- Filter scope and data field mapping are explicit.
- Affecting filters are bound through `filterFields`, `requiredFilters`, API params, or resolver params; `ignoredFilters` is used only for intentionally invariant widgets and each ignored filter has `ignoredFilterReasons`.
- Non-default primary filter states visibly change affected widget data in JSON/API/resolver mode, or the widget is clearly labeled static/invariant.
- Non-default perspective states update metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, and口径 when specified by `componentSchemaImpact`; value-only changes are not enough.
- Block spans match the size and component-count constraints from `$report-visual-layout-design`.
- Layout tokens match the selected template family or deviations are documented: content range, `contentGap`, `rowHeight`, `cellPadding`, card padding/radius, and component-owned title/control handoff.
- Outer block validation does not replace component-internal fit checks. Composite widgets must be reviewed with `$report-component-style-design` for summary columns, nested KPI grids, text wrapping, min-height, and no critical nowrap/ellipsis clipping.
- Composite widget no-data masks are scoped by child data states: if all child sub-blocks are no-data, show one parent-block mask; if only some child sub-blocks are no-data, mask only those sub-blocks and include their title/control area plus component body.
- `1920 * 1080` and `1280 * 768` are used as viewport checks, not total report height caps.
- Layout blocks do not clip titles, legends, charts, tables, empty states, or controls.
- `npm run validate:dashboard` runs after the minimal required dependencies are installed.
- Every changed source file has a sidecar code ledger under `__change_logs__`, the ledger was read before editing, and a post-change version entry records feature/function list, changed code ranges, affected widget/data/filter/API contracts, verification, and rollback notes.
- If npm dependency installation is blocked by domestic network access, retry with a temporary command-level mirror such as `npm install --registry=https://registry.npmmirror.com` or `npm install <package-name> --registry=https://registry.npmmirror.com`; if unavailable, replace the registry URL with `https://npm.aliyun.com/`, `https://mirrors.cloud.tencent.com/npm/`, `https://mirrors.ustc.edu.cn/npm/`, or `https://mirrors.tuna.tsinghua.edu.cn/npm/`. Do not persist registry changes unless explicitly requested.
- `npm run build` runs before handoff when implementation code changed.
- A local dev/preview URL is started and verified when a runnable project is part of the task.
