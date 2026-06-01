# 05 Interaction State Flow

Use this reference to design how users move from data to context, evidence, and action.

## Decision Rules

- Need a quick explanation: tooltip or popover.
- Need supporting evidence without leaving the page: drawer.
- Need to narrow the current page: cross-filtering or linked highlighting.
- Need to move down a hierarchy: drilldown with breadcrumb.
- Need exact records: row drawer or detail page.
- Need focused confirmation: modal.
- Need specialized analysis or source system: page jump with parameter passing.
- Need dense chart/table inspection: fullscreen viewport.

Do not make every element clickable. Only add interaction when it advances judgment, positioning, explanation, verification, or action.

## Interaction Types

### Tooltip / Popover

Use for metric definition, formula, threshold, scoring rule, update time, one-point trend note, disabled reason, and exact chart mark value. Charts with hidden or dense labels should reveal exact values on hover.

### Hover And Motion Feedback

- Hovering a chart mark should show value tooltip and visual emphasis.
- Hovering a table row, KPI submetric, card, or list item should show whether it is clickable.
- Filter, tab, refresh, or drilldown updates should show restrained transition or loading state.
- Selected objects should remain visibly selected until cleared, invalidated, or replaced.
- Disabled interactions should explain why.

### Drawer

Use for KPI decomposition, organization snapshot, alert handling, task progress, row detail, evidence list, source comparison, and diagnostic support.

Drawers should preserve page state and offer clear next actions such as view detail, jump to source, assign, export, or close.

### Modal

Use only for focused decisions: close anomaly, submit task completion, apply batch operation, approve/reject, or confirm irreversible workflow changes.

Avoid large modals for complex analysis. Use drawers or pages instead.

### Drilldown

Use for hierarchy:

- Organization: group -> region -> subsidiary -> department/store/person.
- Metric: result -> driver -> sub-driver -> detail object.
- Time: year -> quarter -> month -> week/day.
- Object: customer -> contract -> order -> invoice/payment.
- Process: stage -> sub-stage -> record.
- Source: report metric -> data mart -> interface -> source system -> document.

Limit drilldown depth to decision-making depth. When the next layer becomes record inspection, route to detail query or source system.

### Cross-Filtering And Linked Highlighting

Use to keep analysis on one page:

- Clicking a chart segment filters other components.
- Hovering highlights related marks across charts.
- Selecting a map region updates KPI cards and lists.
- Clicking a Top N item filters detail table.

Show active selection clearly and provide one-click clear.

### Page Jump

Use when users need another report type or system:

- Status overview -> analysis diagnostic.
- Diagnostic result -> detail query.
- Anomaly -> operational execution.
- Performance gap -> diagnostic report.
- Reconciliation difference -> source system or data governance page.
- Recap conclusion -> supporting diagnosis or action page.

Jumps must carry enough context to avoid re-selecting filters.

## Parameter Passing Model

Every drilldown or jump should pass:

- `period`: selected time period and granularity.
- `comparison_period`: baseline period when relevant.
- `org_id`: selected organization and hierarchy level.
- `object_id`: selected project, customer, contract, task, anomaly, or record.
- `metric_id`: selected metric.
- `dimension_id`: selected dimension or split.
- `status`: selected state.
- `severity`: selected risk level.
- `source_system`: selected system or data source.
- `version`: data version or reconciliation batch.
- `filters`: remaining active filters.
- `permission_scope`: authorized data range.
- `return_to`: source report and interaction path.

Use stable IDs for parameters. Labels are display-only.

## Linkage Integrity

For every clickable object, define:

- Source component and source dataset.
- Required object ID, metric ID, dimension ID, and period.
- Active filters that must be inherited.
- Target component, drawer, modal, drill level, or page.
- Behavior when target data is empty, unauthorized, stale, or no longer in scope.

Rules:

- Drilldowns, drawers, popovers, jumps, fullscreen views, and exports must use the same active filters as the visible component unless the user explicitly changes scope.
- Cross-filtering must update all subscribed components and show active-selection state.
- Selected chart marks, rows, tasks, anomalies, or difference records must be cleared or marked stale when filters remove them.
- Drawer counts, evidence rows, related records, and source links must reconcile with selected object and active filters.
- Page jumps must pass stable IDs and enough filter context.
- Back behavior must restore prior filter and selection state, or explicitly state that context changed.

## Template Contract

- Business widgets emit `dashboard-action` with stable IDs in the payload.
- `openModal`, `setFilters`, `navigateUrl`, `refresh`, `fullscreen`, and custom operations are configured in widget action map or central action registry.
- `navigateUrl` should include active filters by default; use `includeFilters: false` only when target intentionally resets scope.
- Modal and drawer widgets must read `context.params`, `context.sourceFilters`, and `context.isStale`.
- If a click selects a chart mark or row, the component must clear or mark it stale when its data no longer contains that object.

## Failure States

- No data after filter: show empty state and reset suggestion.
- No permission: show restricted state without leaking totals.
- Drilldown has no child level: show lowest-level message and offer detail query.
- Jump target unavailable: show fallback drawer or disabled source link reason.
- Stale selected object after filter change: close drawer or mark out of scope.
- Refresh failure: preserve existing data and show update warning.
- Batch operation partial failure: show success/failure counts and affected rows.
