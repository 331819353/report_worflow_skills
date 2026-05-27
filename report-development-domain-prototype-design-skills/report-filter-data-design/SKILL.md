---
name: report-filter-data-design
description: "Design report filter components, filter option data, default values, cascades, query behavior, permissions, and cross-component filtering for business dashboards and reports. Use when defining time, organization, business dimension, status, owner, risk, amount, keyword, saved query, advanced-filter behavior, filter-to-field mapping, affected-component matrices, or filter linkage accuracy for report pages."
---

# Report Filter Data Design

## Core Positioning

Use this skill to design the filter layer of a report.

Filters are not just UI controls. They define the user's data scope, permission boundary, query context, and component linkage.

This skill answers:

- Which filters should appear on the first screen.
- Which filters belong in advanced search.
- What options and defaults should be provided.
- How filters cascade and affect each other.
- How filter state is passed to charts, tables, drawers, jumps, exports, and refresh.
- How permissions limit visible options and data.

## Filter Design Principles

- Put high-frequency filters in the main filter bar.
- Move low-frequency or field-heavy filters into advanced filters.
- Provide strong defaults so the first screen is immediately useful.
- Make active filters visible as chips or compact state text.
- Keep filter labels business-friendly, not database-field-oriented.
- Design filters around user decisions, not around all available fields.
- Preserve filter state across drilldown, drawer, jump, export, refresh, and back navigation.
- Never show filter options that the user has no permission to query.

## Filter Taxonomy

Common report filters:

- Time: date range, month, quarter, year, rolling 7/30/90 days, comparison period.
- Organization: group, region, subsidiary, department, store, team, person.
- Business unit: business line, product line, channel, customer type, project type.
- Object: project, customer, supplier, contract, order, store, task, anomaly.
- Status: normal, abnormal, overdue, pending, processing, closed, voided.
- Risk: severity, red/yellow/green, anomaly type, SLA status, recurrence.
- Metric condition: amount range, completion rate range, gap range, score range.
- Owner: responsible person, department, role, handler, approver.
- Source: system, data version, source table, report version, upload batch.
- Keyword: object name, code, document number, customer, project, comment.
- Saved view: common filter schemes, personal favorites, meeting presets.

## Main Bar Vs Advanced Filter

Use the main filter bar for:

- Time period.
- Organization scope.
- Primary business object or business line.
- Status or severity if it changes the whole report.
- Search keyword for detail-heavy reports.

Use advanced filters for:

- Amount ranges.
- Multiple low-frequency statuses.
- Secondary dimensions.
- Owner, creator, approver, source system.
- Tags, attributes, custom fields.
- Data version and audit filters.

Avoid more than 5-7 controls in the first row. Collapse or group the rest.

## Default Value Rules

Default filters should match the report's use scenario:

- Status overview: current month or latest complete period, full authorized organization.
- Analysis diagnostic: selected problem period plus comparison period.
- Detail query: latest period plus all authorized statuses, or last used query.
- Performance evaluation: current assessment period, comparable organization scope.
- Review recap: reporting period such as month, quarter, or year.
- Anomaly monitoring: open anomalies, current period, severity sorted high to low.
- Operational execution: current user's tasks or active tasks by default.
- Reconciliation traceability: latest reconciliation batch or open differences.

If a user previously saved a preference, load it only when it does not conflict with permission, report context, or shared link parameters.

## Cascading Rules

Design filter cascades explicitly:

- Organization cascade: group -> region -> subsidiary -> department/store/person.
- Business cascade: business unit -> product line -> product/SKU.
- Customer cascade: customer type -> customer -> contract/order/project.
- Status cascade: status group -> status detail -> reason.
- Risk cascade: severity -> anomaly type -> rule.
- Source cascade: system -> data version -> batch -> source object.

When a parent filter changes:

- Clear invalid child selections.
- Keep valid child selections.
- Show disabled options only if they explain unavailable states; otherwise hide them.
- Update option counts when helpful.
- Avoid silently keeping stale values.

## Filter Option Data Design

Every filter option should include:

- `id`: stable value used for query and routing.
- `label`: user-facing name.
- `parent_id`: for cascade filters.
- `level`: hierarchy level when applicable.
- `sort_order`: stable display order.
- `count`: optional current result count.
- `disabled`: whether it can be selected.
- `reason`: why disabled, if shown.
- `permission_scope`: optional data access marker.
- `meta`: optional tags, owner, region, type, or status.

Do not use display names as query keys if names can change.

## Filter Option Source Rules

Filter options should be data-driven by default.

Hard rules:

- Time, organization, product, customer, project, owner, source-system, data-version, store, department, and business-object filters must derive options from dimension data, fact data, or an API/data-source resolver.
- Do not hardcode options for data-bearing filters unless the values are stable business enums and do not depend on available rows or permissions.
- Static options are allowed for stable enums such as status groups, risk levels, severity, fixed period granularity (`day/month/quarter`), view mode, or yes/no toggles.
- If a filter uses static options, label it as a static enum in the specification or config comments, and ensure every static option either maps to data or is disabled with a reason.
- If a filter uses dynamic options, define its data source, label field, value field, parent field for cascades, permission scope, and count behavior.
- Filter option counts, when shown, must be calculated from the current filtered dataset and permission scope; never hardcode displayed counts.
- A filter value must not appear selectable when no component or dataset can consume it.

For bundled templates:

- Prefer `filters[].source` for data-derived options. `source.id` should point to a resolver in `src/dataSources/registry.ts` or a dimension dataset in `src/data/`.
- Use `filters[].options` only for static enums, presentation modes, or early shell placeholders that are clearly marked and not shipped as final business filters.
- Time filter options should come from `dim_time` or fact periods when the report has month/quarter/year switching.
- Organization and object filters should come from `dim_org`, `dim_project`, `dim_customer`, or matching fact rows so permissions and empty states are testable.

For runnable prototypes, option metadata must be wired into behavior:

- Disabled options cannot be selected.
- Disabled options should explain why through `reason`.
- Option `count` must reconcile to the current filtered result when displayed.
- Parent-child option relationships must reset invalid child selections when the parent changes.
- Permission-blocked options should be hidden or disabled without leaking unauthorized totals.

## Query Behavior

Define how filter values become query parameters:

- Use stable IDs in URL/query state.
- Keep display labels separate from query values.
- Support multi-select when users compare or batch inspect objects.
- Support single-select when the page represents one focused scope.
- Debounce keyword search.
- Apply expensive filters only after the user confirms, if needed.
- Reset should return to business default, not necessarily empty state.
- Export should use the same active filter state as the visible result.

For shared links, include enough parameters to reproduce the report state without exposing unauthorized data.

## Coordination With Other Skills

This skill owns filter design and query state. It does not own the report's full data model or click behavior.

- Use `report-mock-data-design` when synthetic option data, row data, counts, or filter-compatible datasets are needed.
- Use `report-data-interaction-design` when filter state must be passed through drilldowns, drawers, jumps, breadcrumbs, shared links, and return paths.
- Use `report-info-component-mapping` to decide which blocks need global filters, local filters, or no filters.
- Use `report-component-style-design` for the visual treatment of filter controls, chips, labels, density, and overflow.

## Cross-Component Linkage

Filters should update:

- KPI cards.
- Trends.
- Structure charts.
- Rankings.
- Alert lists.
- Task lists.
- Detail tables.
- Drawers when the selected object remains valid.

When a filter invalidates an open drawer or selected chart point, close it or show a clear "selection no longer in scope" state.

## Data And Component Accuracy Gate

Filter design must include a binding contract, not only control definitions. This applies whether the page uses a template, a custom Vue page, or only a specification.

For each filter, define:

- Filter ID and display label.
- Query value type: single, multiple, range, keyword, date, or tree path.
- Data binding: exact field name, resolver parameter, permission scope, or explicit mapping when names differ.
- Affected components: KPI, chart, table, drawer, export, jump, fullscreen, or local block.
- Cascade dependencies and invalid-child reset behavior.
- Empty-result behavior and reset target.

For each affected component, verify:

- It recomputes or refetches when the filter changes.
- Its totals, row counts, labels, legends, and selected state use the same active filters.
- Open drawers and selected rows remain only when their object is still in scope.
- Export, download, shared link, refresh, and fullscreen use the same filtered result as the visible page.
- Filters that must affect the component are marked required in the data contract.
- Filters intentionally ignored by the component are declared and visibly explained through title, subtitle, or scope label.

No filter is complete until at least one expected component change is defined and testable.

Force-check rule:

- A runnable prototype must fail validation when a primary filter has no explicit component binding.
- A data widget affected by filters must declare its binding through `filterFields`, `requiredFilters`, or an equivalent custom `filterMap`.
- If a filter is intentionally ignored by a component, the ignored relationship must be declared and visible to the user.
- Filter controls are not acceptable if they only change UI state but do not refetch, recompute, clear selection, update export scope, or pass query parameters.
- Multi-period filters are not acceptable unless the affected data includes all selectable periods. A single-month dataset cannot back a multi-month filter.

Template implementation contract:

- Use `filters[].options` for static options and `filters[].source` for dynamic options.
- Use `widget.filterScope` plus `filters[].scope` for local filter behavior.
- Use `widget.data.filterFields` when a filter ID differs from the dataset field.
- Use `widget.data.requiredFilters` to prevent required filters from silently missing the dataset.
- Use `widget.data.requiredParams` when fixed params should filter `staticData`.
- Use `widget.data.ignoredFilters` for intentionally ignored global filters, and label that scope difference in the UI.

Custom implementation contract:

- Keep `activeFilters` as a single runtime object, not duplicated independently inside components.
- Keep a `filterMap` table from filter IDs to data fields, API query params, permission scopes, and affected components.
- Keep a cascade/reset function that clears invalid child values and selected objects.
- Keep exports, jumps, fullscreen views, drawers, and modals reading from the same filtered context as the visible component.

## Permission Rules

Filter data must respect permissions:

- Users should only see authorized organization options.
- Restricted fields should not appear as filterable fields.
- Filter counts must not leak unauthorized totals.
- Jump targets must preserve permission scope.
- Export must apply both filters and permissions.
- Saved views created by one role may need validation before another role uses them.

If a user lacks access, show an empty or disabled state with a business-readable reason.

## Component Selection

Use these filter components:

- Date picker: exact date or date range.
- Month/quarter selector: financial and management reports.
- Tree selector: organization hierarchy.
- Cascader: strict parent-child hierarchy.
- Multi-select dropdown: statuses, types, owners, products.
- Segmented control: small mutually exclusive states such as all/open/closed.
- Search input: keyword or code search.
- Range input: amount, rate, score, days overdue.
- Toggle/checkbox: include closed, only abnormal, only overdue.
- Saved-view menu: reusable filter schemes.
- Filter chips: visible active state and quick removal.

Use labels, placeholders, and option names that match business language.

## Report Type Filter Patterns

- Status overview: period, organization, business line, comparison baseline.
- Analysis diagnostic: diagnostic metric, period, comparison period, organization, dimension path.
- Detail query: rich filters, keyword search, saved views, export-compatible state.
- Performance evaluation: period, object level, peer group, scoring version, ranking metric.
- Review recap: reporting period, organization, chapter/topic, version.
- Anomaly monitoring: severity, type, status, owner, SLA, time, recurrence.
- Operational execution: task status, owner, priority, deadline, source, current user.
- Reconciliation traceability: source system, batch, version, difference type, status, rule.

## Output Format

When using this skill, provide:

1. Filter goals and user scenario.
2. Main filter bar fields.
3. Advanced filter fields.
4. Default values.
5. Option data schema.
6. Cascading relationships.
7. Query parameter model.
8. Component linkage rules.
9. Filter-to-field or filter-to-query mapping table.
10. Affected component matrix.
11. Permission rules.
12. Empty, reset, export, and shared-link behavior.

## Quality Checklist

Before finalizing filter design, verify:

- First-screen filters are few, high-value, and business-readable.
- Defaults produce a useful first view.
- Cascades cannot leave stale child selections.
- Query keys are stable IDs, not labels.
- Data-bearing filters derive options from data sources or dimensions; static options are limited to true stable enums.
- Time filters have matching data coverage for every enabled period option.
- Permissions apply to options, results, counts, drawers, jumps, and exports.
- Active filters are visible and removable.
- Reset, refresh, export, and shared links preserve predictable behavior.
- Filter changes cannot cause contradictory KPI, chart, and table states.
- Each primary filter has a real data-field, resolver-parameter, or permission-scope binding.
- Each affected component updates, clears selection, or shows stale-selection state when the filter changes.
- KPI totals, chart totals, table rows, drawer records, and export counts reconcile under the same filter state.
