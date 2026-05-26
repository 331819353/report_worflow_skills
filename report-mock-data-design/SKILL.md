---
name: report-mock-data-design
description: "Design realistic, self-consistent mock data for business report prototypes, dashboards, demos, tests, and generated UI examples. Use when a report needs synthetic KPI values, detail records, hierarchies, trends, targets, budgets, anomalies, tasks, reconciliation differences, filter option data, or chart-ready datasets that must match report logic instead of being random filler."
---

# Report Mock Data Design

## Core Positioning

Use this skill when a report prototype needs believable data.

Mock data is not random decoration. It must support the report's business story, components, filters, interactions, and validation:

- KPI totals must match underlying detail records.
- Actual, target, budget, gap, completion rate, and variance must reconcile.
- Organization, time, product, customer, project, and task hierarchies must roll up correctly.
- Trends, anomalies, rankings, and conclusions must be visible in the data.
- Drilldowns and filters must still return coherent subsets.

## Input Requirements

Before designing mock data, extract or infer:

- Report type: one of the eight report categories, with optional secondary types.
- Report theme and core question.
- Main business objects: organization, project, store, customer, product, contract, order, task, anomaly, source system, metric.
- Metrics and formulas.
- Dimensions and hierarchies.
- Time period and granularity.
- Target, budget, plan, threshold, benchmark, or prior-period baseline.
- Required components and interactions.
- Filters and permission scope.

If information is missing, create conservative assumptions and state them.

## Design Workflow

1. Define the business scenario.
   Write one short story that the data should prove, such as "revenue is down because high-base products slowed and inventory price competition intensified".

2. Define data grain.
   Decide what one row represents: daily metric snapshot, organization-period metric, transaction, task, anomaly, source-system comparison, or record detail.

3. Define dimension tables.
   Create stable dimension options for time, organization, business unit, product, customer, project, status, owner, and region.

4. Define fact tables.
   Create the minimum fact datasets needed by the report: KPI facts, transaction records, anomaly records, task records, reconciliation differences, or score records.

5. Define formulas.
   Document how derived fields are calculated, such as completion rate, gap, variance rate, contribution, score, SLA status, and risk level.

6. Create signal and contrast.
   Add enough change, gap, ranking, anomaly, and cause evidence for the page to communicate clearly.

7. Add edge cases.
   Include zero values, missing values, overdue items, closed items, tied rankings, negative growth, outliers, permission-restricted records, and empty-filter scenarios when relevant.

8. Validate consistency.
   Check rollups, formulas, counts, statuses, and component-level summaries before using the data.

## Data Model Patterns

Use these common dataset layers:

- Dimension data: `dim_time`, `dim_org`, `dim_product`, `dim_customer`, `dim_project`, `dim_owner`, `dim_status`.
- KPI snapshot facts: period-level actuals, targets, budgets, prior-period values, thresholds.
- Detail facts: contracts, orders, expenses, payments, inventory, projects, stores, customers, records.
- Diagnostic facts: driver factors, contribution values, formula nodes, process stages, cause categories.
- Alert facts: anomaly type, severity, rule, current value, threshold, owner, SLA, handling status.
- Task facts: task source, owner, deadline, priority, progress, evidence, acceptance status.
- Reconciliation facts: source A value, source B value, difference field, rule, version, status, audit log.

Use stable IDs for every object so filtering, drawer detail, and jumps can preserve context.

## Report Type Mock Patterns

### Status Overview

Include:

- 4-8 core KPI values.
- Actual, target or budget, completion rate, gap, and time progress.
- Trend data for recent periods.
- Structure data by organization or business dimension.
- Risk counts that match risk lists.

### Analysis Diagnostic

Include:

- A clear phenomenon: decline, increase, gap, or abnormal movement.
- Driver factors whose contributions reconcile to the total change.
- Dimension attribution: region, product, customer, project, channel, or cost item.
- Evidence rows that support the main conclusion.

### Detail Query

Include:

- Enough rows to make filtering, sorting, paging, export, and row drawers meaningful.
- Complete fields for status, amount, date, owner, organization, source, and related object.
- Mixed states such as normal, overdue, abnormal, voided, pending approval, and closed.

### Performance Evaluation

Include:

- Objects with targets, actuals, completion rates, scores, rankings, tiers, and benchmarks.
- Peer groups or scale-adjusted fields when fairness matters.
- Stable top, middle, and bottom performers.

### Review Recap

Include:

- Period result, major changes, events, causes, risks, and action plans.
- A data story that supports a meeting-ready conclusion.
- Action item data with owner and deadline.

### Anomaly Monitoring

Include:

- Alert rules, thresholds, current values, severity, affected objects, owner, SLA, and status.
- New, recurring, overdue, ignored, closed, and escalated anomalies.
- Counts that exactly match summary cards and lists.

### Operational Execution

Include:

- Task list, task source, owner, priority, deadline, progress, blocker, evidence, and acceptance.
- Status flow: not started, in progress, blocked, overdue, completed, accepted, returned.
- Effect metrics that show whether the task improved the business problem.

### Reconciliation Traceability

Include:

- Two or more source systems.
- Matching result, difference type, difference amount, difference field, version, cause, status.
- Lineage nodes and operation logs.
- Correctable and non-correctable differences.

## Formula Consistency Rules

Every derived metric must be reproducible:

- `completion_rate = actual / target`
- `gap_amount = actual - target`
- `variance_rate = gap_amount / target`
- `yoy_rate = (current - last_year) / last_year`
- `mom_rate = (current - last_period) / last_period`
- `contribution_rate = item_change / total_change`
- `score = sum(metric_score * weight)`
- `sla_overdue_days = current_date - due_date` when status is not closed

Round display values only at presentation time. Keep raw values precise enough for totals to reconcile.

## Hierarchy And Rollup Rules

Mock data must support hierarchy:

- Group totals should equal the sum of regions unless the report explicitly includes consolidation adjustments.
- Region totals should equal subsidiary or store totals when those levels are shown.
- Product category totals should equal product totals.
- Monthly totals should equal daily or weekly facts.
- Task, anomaly, and record counts must match filtered lists.

If a value is intentionally non-additive, such as margin rate, completion rate, or score, calculate it from numerator and denominator rather than summing row-level rates.

## Signal Design

A useful mock dataset should contain meaningful contrast:

- At least one strong positive performer.
- At least one obvious risk or laggard.
- At least one neutral baseline object.
- At least one trend turning point.
- At least one explanation that can be traced from summary to detail.
- At least one edge case that tests empty, missing, or permission-limited states.

Avoid all numbers being too neat. Use realistic variation, but keep the story legible.

## Filter Compatibility

Design data so common filters work:

- Time filters should return valid periods and not break trends.
- Organization filters should reduce KPI totals, rankings, alerts, tasks, and detail rows consistently.
- Status filters should match status counts.
- Severity filters should match alert cards.
- Owner filters should match task and anomaly lists.
- Business dimension filters should still preserve at least one meaningful result.

Default filters should produce a strong first-screen story.

## Coordination With Other Skills

This skill owns synthetic data structure and consistency. It does not own the UI behavior of filters or interactions.

- Use `report-filter-data-design` to define filter controls, option schema, defaults, cascades, query parameters, and permissions.
- Use `report-data-interaction-design` to define how selected mock records, chart marks, tasks, alerts, or differences pass context through drilldowns, drawers, and jumps.
- Use `report-info-component-mapping` to decide which mock datasets are required by each block or component.
- Use `report-component-style-design` and `report-visual-layout-design` after the mock data is mapped to visible components.

## Privacy And Naming

For synthetic data:

- Do not use real personal names, phone numbers, identity numbers, bank cards, or confidential contracts.
- Use neutral names such as `华东一区`, `A 项目`, `客户 001`, `产品线 B`, `负责人 03`.
- If using brand context, avoid implying real confidential operational data.

## Output Format

When applying this skill, provide:

1. Mock data objective and business story.
2. Dataset list and row grain.
3. Dimension schema.
4. Fact schema.
5. Derived metric formulas.
6. Scenario signals and edge cases.
7. Filter support plan.
8. Validation checks.
9. Example rows or JSON/CSV-ready sample data when requested.

## Quality Checklist

Before finalizing mock data, verify:

- KPI cards reconcile with detail or fact tables.
- All derived formulas are calculable from raw fields.
- Trends support the stated conclusion.
- Ranking and risk counts match underlying rows.
- Filters do not produce contradictory totals.
- Drilldown targets exist and use stable IDs.
- Edge cases are present but not so many that they obscure the main story.
- Data is synthetic and safe to share.
