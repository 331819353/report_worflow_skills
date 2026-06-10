# 04 Filter Scope Query

Use this reference to design report filters, filter option data, defaults, cascades, query behavior, permissions, and cross-component filtering.

## Filter Principles

- Put high-frequency filters in the main filter surface. In bundled templates, this means the template `filters[]` plus native trigger/panel/popover/drawer, not a new standalone filter bar.
- Move low-frequency or field-heavy filters into advanced filters.
- Provide strong defaults so the first screen is useful.
- Make active filters visible as chips or compact state text.
- Keep filter labels business-friendly, not database-field-oriented.
- Design filters around user decisions, not all available fields.
- Preserve filter state across drilldown, drawer, jump, export, refresh, and back navigation.
- Never show filter options that the user has no permission to query.
- Classify controls before treating them as filters. A control that changes metric collection, component semantics, report subject, business-domain wording, table schema, or metric口径 is a perspective/navigation control, not an ordinary filter.

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

## Control Semantics Before Filter Design

Every visible or implicit control must be classified before placement:

- `perspective-switch`: changes the business domain, report theme, management object, subject area, metric set, component set, component semantics, table schema, metric口径, or domain vocabulary. It belongs in navigation, route, tab, segment, view switcher, or explicit perspective state.
- `global-filter`: applies a horizontal constraint to the same report meaning, such as time, organization, status, risk level, owner, or product scope. It narrows rows or values without changing metric names, component collection, table headers, or口径.
- `local-filter`: affects one component or parent block over an already fetched component dataset, such as local tabs, legend toggles, in-card category filters, or quick search inside a detail table.
- `drilldown-param`: is emitted after a user action and scopes a drawer, modal, detail route, or lower-level query.

Hard boundary:

- Anything that changes 指标集合, 组件语义, 领域话术, 报表主题, 管理对象, 表头/分组表头, 维度集合, or 指标口径 cannot be placed in an ordinary global/local filter.
- A perspective switch may update default filters internally, but the visible contract must still identify it as `perspective-switch`.
- `componentSchemaImpact` must state whether the switch changes metric names, component set, table headers, dimensions, formulas/口径, domain vocabulary, or only row scope.

## Main Filter Surface Vs Advanced Filter

Use the main filter surface for time period, organization scope, primary object/business line, status/severity when it changes the whole report, and keyword search for detail-heavy reports.

Use advanced filters for amount ranges, low-frequency statuses, secondary dimensions, owner/creator/approver/source, tags, custom fields, data version, and audit filters.

Avoid more than 5-7 controls in the first row. Collapse or group the rest.

For bundled templates, do not allocate a new visual first row just because the filter model has main filters. The selected template's existing filter trigger, popover, drawer, panel, active chips, or compact state text is the visual surface. A literal persistent filter bar is allowed only for custom shells or explicit template-level redesign.

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

`meta` boundary:

- `meta` may contain only dimensional attributes: display aliases, stable category tags, owner/type/region descriptors, permission flags, disabled reason, description, icon, or stable UI hints.
- `meta` must not contain dynamic metrics, KPI values, percentages, rankings, traffic-light/status-light values, period-sensitive counts, satisfaction scores, completion rates, or risk scores.
- Dynamic metrics for option labels, perspective navigation, badges, and status lights must come from business fact datasets, aggregate datasets, or a resolver with declared lineage.
- If a value in `meta` is intentionally static display copy, label it as static and do not use it for KPI, sorting, ranking, status, or cross-component consistency.

## Option Source Rules

- Time, organization, product, customer, project, owner, source-system, data-version, store, department, and business-object filters must derive options from dimension data, fact data, or a resolver.
- Do not hardcode options for data-bearing filters unless the values are stable business enums.
- Static options are allowed for stable enums such as status groups, risk levels, severity, fixed period granularity, view mode, or yes/no toggles.
- Dynamic options must define source, label field, value field, parent field, permission scope, and count behavior.
- Filter option counts must be calculated from the current filtered dataset and permission scope.
- A filter value must not appear selectable when no component or dataset can consume it.
- Perspective navigation metrics such as percentages, rankings, and status lights must not be stored in `filterData.meta`. They require `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.

For bundled templates:

- Treat `filters[]` as the main filter surface contract. Add, remove, relabel, source, and scope filters there instead of generating a standalone filter toolbar.
- Treat template `filters[]` as horizontal constraint controls only. Business domain, report theme, management object, subject area, and first-level perspective belong in nav/page/tab/segment/route/perspective configuration, not in `filters[]`, unless the accepted contract proves they are row-scope-only.
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
- A runnable prototype must fail validation when a schema-changing perspective is modeled only as a normal filter.
- A binding matrix must fail validation when `controlSemantics` or `componentSchemaImpact` is missing for controls that affect a component.
- A runnable prototype or spec must fail validation when dynamic navigation KPIs are stored in filter option `meta` instead of a fact dataset, aggregate dataset, or resolver.
- A widget affected by filters must declare `filterFields`, `requiredFilters`, or equivalent `filterMap`.
- A widget expected to react to a global/page filter must not declare that same filter in `ignoredFilters`. Use `ignoredFilters` only when the component is intentionally invariant under the filter, and record the reason and visible scope label.
- Primary filter validation must prove data changed in affected components. Selected-state change alone is not enough.
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
