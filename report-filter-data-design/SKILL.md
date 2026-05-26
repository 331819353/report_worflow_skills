---
name: report-filter-data-design
description: "Design report filter components, filter option data, default values, cascades, query behavior, permissions, and cross-component filtering for business dashboards and reports. Use when defining time, organization, business dimension, status, owner, risk, amount, keyword, saved query, or advanced-filter behavior for report pages."
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
9. Permission rules.
10. Empty, reset, export, and shared-link behavior.

## Quality Checklist

Before finalizing filter design, verify:

- First-screen filters are few, high-value, and business-readable.
- Defaults produce a useful first view.
- Cascades cannot leave stale child selections.
- Query keys are stable IDs, not labels.
- Permissions apply to options, results, counts, drawers, jumps, and exports.
- Active filters are visible and removable.
- Reset, refresh, export, and shared links preserve predictable behavior.
- Filter changes cannot cause contradictory KPI, chart, and table states.
