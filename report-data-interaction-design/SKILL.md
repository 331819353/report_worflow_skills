---
name: report-data-interaction-design
description: "Design report data interactions including drilldown, cross-filtering, linked highlighting, popovers, drawers, modals, page jumps, parameter passing, breadcrumbs, state preservation, back behavior, permissions, and interaction failure states. Use when defining what happens after users click KPI cards, chart marks, map regions, table rows, alerts, tasks, evidence nodes, or report navigation actions."
---

# Report Data Interaction Design

## Core Positioning

Use this skill to design how users move from data to context, evidence, and action.

It answers:

- What should happen when a user clicks a KPI, chart segment, map region, table row, alert, task, or evidence node.
- When to use drilldown, cross-filtering, tooltip, drawer, modal, fullscreen, or page jump.
- How filter state, selected object, time period, permission scope, and return path are preserved.
- How interactions connect the eight report types into a coherent workflow.

This skill defines interaction mechanics. Report-type skills define business intent.

## Interaction Decision Rules

Choose the interaction by user intent:

- Need a quick explanation: use tooltip or popover.
- Need supporting evidence without leaving the page: use drawer.
- Need to narrow the current page: use cross-filtering or linked highlighting.
- Need to move down a hierarchy: use drilldown with breadcrumb.
- Need to inspect exact records: use row drawer or detail page.
- Need to complete or confirm an operation: use modal only for focused confirmation.
- Need a specialized analysis or source system: use page jump with parameter passing.
- Need to inspect a dense chart or table: use fullscreen viewport.

Do not make every element clickable. Only add interaction when it advances judgment, positioning, explanation, verification, or action.

## Interaction Types

### Tooltip / Popover

Use for lightweight explanation:

- Metric definition.
- Formula.
- Threshold or scoring rule.
- Data update time.
- One-point trend note.
- Current value vs baseline.
- Disabled-state reason.

Tooltips should be short and should not contain workflows or large tables.

### Drawer

Use for contextual detail without breaking the current page:

- KPI decomposition.
- Organization snapshot.
- Alert handling.
- Task progress.
- Row detail.
- Evidence list.
- Source comparison.
- Diagnostic support.

Drawers should preserve the page state and offer clear next actions such as view detail, jump to source, assign, export, or close.

### Modal

Use only for focused decisions:

- Confirm close anomaly.
- Submit task completion.
- Apply batch operation.
- Approve or reject.
- Confirm irreversible or workflow-changing action.

Avoid using large modals for complex analysis. Use drawers or pages instead.

### Drilldown

Use when users need to move through a hierarchy:

- Organization: group -> region -> subsidiary -> department/store/person.
- Metric: result -> driver -> sub-driver -> detail object.
- Time: year -> quarter -> month -> week/day.
- Object: customer -> contract -> order -> invoice/payment.
- Process: stage -> sub-stage -> record.
- Source: report metric -> data mart -> interface -> source system -> document.

Limit drilldown depth to the depth needed for decision-making. When the next layer becomes record inspection, route to detail query or source system.

### Cross-Filtering And Linked Highlighting

Use to keep analysis on one page:

- Clicking a chart segment filters other components.
- Hovering highlights related marks across charts.
- Selecting a map region updates KPI cards and lists.
- Clicking Top N item filters detail table.

Show the active selection clearly. Provide a one-click clear action.

### Page Jump

Use when the user needs a different report type or business system:

- Status overview -> analysis diagnostic.
- Diagnostic result -> detail query.
- Anomaly -> operational execution.
- Performance gap -> diagnostic report.
- Reconciliation difference -> source system or data governance page.
- Recap conclusion -> supporting diagnosis or action page.

Jumps must carry enough context to avoid making the user re-select filters.

## Parameter Passing Model

Every drilldown or jump should pass a structured context:

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

## Coordination With Other Skills

This skill owns interaction mechanics and state preservation. It does not choose the business report type or component visuals by itself.

- Use the relevant report-type skill to define why the interaction exists and where its boundary should stop.
- Use `report-filter-data-design` to define filter state, query parameters, cascading behavior, saved views, and permission-scoped options.
- Use `report-mock-data-design` when clicked objects, drilldown targets, drawer records, or jump targets need synthetic but consistent data.
- Use `report-info-component-mapping` to decide which information objects should be interactive.
- Use `report-visual-layout-design` and `report-component-style-design` to decide where drawers, popovers, fullscreen, selected states, and action buttons appear visually.

## State Preservation

Preserve:

- Active filters.
- Selected drill path.
- Selected chart mark or row.
- Open drawer context when still valid.
- Sort, pagination, table column configuration.
- Time comparison mode.
- User's return path.

When returning from a jump, restore the report to the previous state unless the user explicitly changed context.

## Breadcrumbs And Navigation

Use breadcrumbs for:

- Multi-level drilldown.
- Cross-report jumps.
- Source tracing.
- Organization hierarchy.
- Diagnostic paths.

Breadcrumbs should show business meaning, such as `集团 > 华东区域 > 子公司 A`, not technical IDs.

Provide:

- Back to previous level.
- Back to original report.
- Clear current selection.
- Switch to detail view when drilldown reaches record level.

## Report Type Interaction Patterns

### Status Overview

Common path:

KPI or risk card -> filter/linked detail -> drawer explanation -> jump to diagnostic, anomaly, or detail report.

Keep interaction shallow. It should help users find the entry point.

### Analysis Diagnostic

Common path:

Phenomenon -> driver -> dimension/object -> evidence drawer -> detail query or task creation.

Support multi-path drilldown and preserve the diagnostic path.

### Detail Query

Common path:

Filter -> sort -> row click -> detail drawer -> source page or export.

Use row-level interaction and table state preservation.

### Performance Evaluation

Common path:

Ranking/score -> object drawer -> score decomposition -> gap diagnosis -> improvement task.

Explain scoring rules and peer-group context.

### Review Recap

Common path:

Conclusion -> evidence drawer -> source diagnosis/detail -> action plan.

Prioritize evidence retrieval and export rather than deep exploration.

### Anomaly Monitoring

Common path:

Severity card -> alert list -> alert drawer -> assign/confirm/escalate/close -> task or source detail.

Track state changes and logs.

### Operational Execution

Common path:

Task board/list -> task drawer -> update progress/upload evidence -> submit/accept/return -> verify effect.

Interaction must support workflow closure.

### Reconciliation Traceability

Common path:

Difference summary -> difference type -> record drawer -> source comparison -> lineage/source system -> correction/confirmation.

Preserve versions and audit trail.

## Interaction Priority

Use this order when designing interactions:

1. Filters that define scope.
2. Clicks that reveal evidence or causes.
3. Drilldowns that follow hierarchy or logic.
4. Drawers that preserve context.
5. Jumps that enter specialized reports or systems.
6. Operations that assign, close, export, approve, or refresh.
7. Fullscreen for dense components.

Avoid low-value hover effects and decorative clicks.

## Empty, Error, And Permission States

Design failure states:

- No data after filter: show clear empty state and reset suggestion.
- No permission: show restricted state without leaking totals.
- Drilldown has no child level: show "already at lowest level" and offer detail query.
- Jump target unavailable: show fallback drawer or source link disabled reason.
- Stale selected object after filter change: close drawer or mark out of scope.
- Refresh failure: preserve existing data and show update warning.
- Batch operation partial failure: show success/failure counts and affected rows.

## Interaction Output Format

When applying this skill, provide:

1. Interaction goals.
2. Clickable objects and non-clickable objects.
3. Interaction type for each object.
4. Drilldown paths.
5. Drawer/popover/modal contents.
6. Page jump targets and parameters.
7. State preservation rules.
8. Permission and failure states.
9. Return/back behavior.
10. Interaction priority and avoid list.

## Quality Checklist

Before finalizing interactions, verify:

- Every clickable item has a clear business purpose.
- Tooltip, drawer, modal, drilldown, and jump are used for different levels of complexity.
- Parameters include period, scope, object, metric, filters, permission, and return path where needed.
- Back navigation restores prior state.
- Drilldown depth does not trap users.
- Cross-filter selections are visible and easy to clear.
- Drawers contain evidence or action, not duplicated page content.
- Page jumps do not force users to rebuild context manually.
- Permission and empty states are defined.
