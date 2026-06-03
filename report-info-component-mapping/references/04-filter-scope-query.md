# 04 Filter Scope Query

Use this reference to design report filters, filter option data, defaults, cascades, query behavior, permissions, and cross-component filtering.

## Filter Principles

- Put high-frequency filters in the main filter bar.
- Move low-frequency or field-heavy filters into advanced filters.
- Provide strong defaults so the first screen is useful.
- Make active filters visible as chips or compact state text.
- Keep filter labels business-friendly, not database-field-oriented.
- Design filters around user decisions, not all available fields.
- Preserve filter state across drilldown, drawer, jump, export, refresh, and back navigation.
- Never show filter options that the user has no permission to query.

## Filter Taxonomy

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

Use the main filter bar for time period, organization scope, primary object/business line, status/severity when it changes the whole report, and keyword search for detail-heavy reports.

Use advanced filters for amount ranges, low-frequency statuses, secondary dimensions, owner/creator/approver/source, tags, custom fields, data version, and audit filters.

Avoid more than 5-7 controls in the first row. Collapse or group the rest.

## Defaults

- Status overview: current month or latest complete period, full authorized organization.
- Analysis diagnostic: selected problem period plus comparison period.
- Detail query: latest period plus all authorized statuses, or last used query.
- Performance evaluation: current assessment period, comparable organization scope.
- Review recap: reporting period such as month, quarter, or year.
- Anomaly monitoring: open anomalies, current period, severity sorted high to low.
- Operational execution: current user's tasks or active tasks by default.
- Reconciliation traceability: latest reconciliation batch or open differences.

If a user preference exists, load it only when it does not conflict with permission, report context, or shared-link parameters.

## Cascading Rules

Typical cascades:

- Organization: group -> region -> subsidiary -> department/store/person.
- Business: business unit -> product line -> product/SKU.
- Customer: customer type -> customer -> contract/order/project.
- Status: status group -> status detail -> reason.
- Risk: severity -> anomaly type -> rule.
- Source: system -> data version -> batch -> source object.

When a parent filter changes:

- Clear invalid child selections.
- Keep valid child selections.
- Show disabled options only if they explain unavailable states; otherwise hide them.
- Update option counts when helpful.
- Avoid silently keeping stale values.

## Option Data Schema

Every filter option should include:

- `id`: stable query/routing value.
- `label`: user-facing name.
- `parent_id`: for cascades.
- `level`: hierarchy level when applicable.
- `sort_order`: stable display order.
- `count`: optional current result count.
- `disabled`: whether it can be selected.
- `reason`: why disabled, if shown.
- `permission_scope`: optional data access marker.
- `meta`: optional tags, owner, region, type, or status.

Do not use display names as query keys if names can change.

## Option Source Rules

- Time, organization, product, customer, project, owner, source-system, data-version, store, department, and business-object filters must derive options from dimension data, fact data, or a resolver.
- Do not hardcode options for data-bearing filters unless the values are stable business enums.
- Static options are allowed for stable enums such as status groups, risk levels, severity, fixed period granularity, view mode, or yes/no toggles.
- Dynamic options must define source, label field, value field, parent field, permission scope, and count behavior.
- Filter option counts must be calculated from the current filtered dataset and permission scope.
- A filter value must not appear selectable when no component or dataset can consume it.

For bundled templates:

- Prefer `filters[].source` for data-derived options.
- Use `filters[].options` only for static enums or clearly marked early shell placeholders.
- Time options should come from `dim_time` or fact periods.
- Organization and object filters should come from dimensions or matching fact rows.

## Query Behavior

- Use stable IDs in URL/query state.
- Keep labels separate from query values.
- Support multi-select when users compare or batch inspect objects.
- Support single-select when the page represents one focused scope.
- Debounce keyword search.
- Apply expensive filters only after user confirmation when needed.
- Reset should return to business default, not necessarily empty state.
- Export should use the same active filter state as the visible result.
- Apply global/page-level and permission filters as early as possible in the SQL `WHERE`, source/provider/repository/query path. Component-internal filters such as local tabs, legend toggles, in-component quick search, or display slicing may operate on the already fetched component dataset. Do not design a page-level full-materialize-then-filter path that builds or fetches all candidate records and then narrows them in component code, static data helpers, stores, or adapters.

Shared links must include enough parameters to reproduce report state without exposing unauthorized data.

## Linkage Contract

For each filter, define:

- Filter ID and display label.
- Query value type: single, multiple, range, keyword, date, or tree path.
- Data binding: exact field name, resolver parameter, permission scope, or explicit mapping.
- Execution stage: SQL `WHERE`/source query, provider query, repository query, resolver param, precompute/cache, Redis/cache read, or component-internal local filtering over already fetched component data.
- Affected components: KPI, chart, table, drawer, export, jump, fullscreen, or local block.
- Cascade dependencies and invalid-child reset behavior.
- Empty-result behavior and reset target.

No filter is complete until at least one expected component change is defined and testable.

Force-check rules:

- A runnable prototype must fail validation when a primary filter has no explicit component binding.
- A widget affected by filters must declare `filterFields`, `requiredFilters`, or equivalent `filterMap`.
- A runnable prototype must fail validation when a global/page-level or permission filter is applied only after building or fetching the full dataset. Component-internal filters must be labeled local and tested against already fetched component data.
- If a component intentionally ignores a filter, declare that relationship and label the scope difference.
- Multi-period filters are not acceptable unless affected data includes all selectable periods.

## Permissions

- Users should only see authorized organization options.
- Restricted fields should not appear as filterable fields.
- Filter counts must not leak unauthorized totals.
- Jump targets must preserve permission scope.
- Export must apply both filters and permissions.
- Saved views created by one role may need validation before another role uses them.
