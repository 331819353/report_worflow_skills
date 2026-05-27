---
name: report-mock-data-design
description: "Design realistic, self-consistent mock data for business report prototypes, dashboards, demos, tests, and generated UI examples. Use when a report needs synthetic KPI values, detail records, hierarchies, trends, targets, budgets, anomalies, tasks, reconciliation differences, filter option data, component-bound datasets, or chart-ready datasets that must match report logic instead of being random filler and must validate filter/component linkage."
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

## Time Coverage Rules

Do not implement a multi-period report with only one period of data.

Hard rules:

- If the report mentions multiple months, month-over-month, year-over-year, trend, recent 7/30/90 days, quarter, year, rolling period, or period switching, create a complete time dimension and fact rows for every selectable period.
- If the page has a month or period filter, every default first-screen dataset that is affected by that filter must contain rows for all selectable periods, not only the default month.
- Trend charts need continuous periods. Do not skip months unless the missing period is an intentional empty-state test with a visible explanation.
- MoM requires at least the selected period and the immediately previous comparable period.
- YoY requires the selected period and the same period in the prior year; for monthly YoY, include at least 13 monthly points when the chart claims a 12-month trend plus YoY comparison.
- Quarter and year views must be derivable from monthly or lower-grain facts, or the aggregation rule must be explicitly defined.
- If the report is intentionally single-period, declare it as fixed-scope and do not expose period filters or multi-period trend components.

Recommended minimum coverage:

- Monthly business reports: 12-13 continuous months.
- Quarterly reports: 4 quarters plus prior-year comparable quarter when YoY is shown.
- Daily operational monitoring: latest 30 days when a 30-day trend or rolling filter exists.
- Recap or diagnosis pages: the diagnosis period, comparison period, and enough surrounding periods to prove whether the change is isolated or persistent.

Validation checks:

- The time filter options are generated from `dim_time` or the fact periods.
- Every affected dataset has a `period`, `date`, `month`, `quarter`, or equivalent field that maps to the time filter.
- KPI cards, trend charts, tables, drawers, and exports all return valid results for at least one non-default period.
- Summary text does not claim multi-month change when the underlying data contains only one month.

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
- Time filters must be backed by the time dimension or fact periods. Do not hardcode month options that have no matching rows.
- Organization filters should reduce KPI totals, rankings, alerts, tasks, and detail rows consistently.
- Status filters should match status counts.
- Severity filters should match alert cards.
- Owner filters should match task and anomaly lists.
- Business dimension filters should still preserve at least one meaningful result.

Default filters should produce a strong first-screen story.

Filter option mock data should also support implementation behavior:

- Include stable `id` and user-facing `label` for every option.
- Include `count` when the UI shows result counts, and make the count match filtered rows.
- Include `disabled` and `reason` for permission-blocked, parent-filter-blocked, or unavailable options.
- Include `parentId` or `parent_id` for cascades and enough child options to test parent changes.
- Include at least one option that produces an empty state when that state is part of the UX.

## Data Binding And Accuracy Contract

Mock data must be designed so data, filters, and components can be verified together. This requirement applies even when no template is used.

For each visible component, define:

- Dataset name and row grain.
- Required fields and stable IDs.
- Formulas and rollup logic.
- Which filters affect it and which filters do not.
- Expected total, count, rank, or status after default filters.
- Empty-state or permission-limited state when a filter removes all rows.

When using bundled templates:

- `widget.data.params.key` must point to a real dataset in `dashboardData`.
- Use `filterFields` when filter IDs differ from row fields.
- Use `requiredFilters` for filters that must affect the dataset.
- Use `requiredParams` for fixed params that must filter `staticData`.
- Use `ignoredFilters` only when the component is intentionally outside a global filter scope.

When not using a bundled template:

- Define an equivalent dataset contract with `datasetId`, `rowGrain`, `primaryKey`, `filterMap`, `requiredFilters`, `ignoredFilters`, `requiredParams`, `formulas`, `rollups`, and `emptyState`.
- Keep raw mock rows outside visual components so KPI cards, charts, tables, drawers, and exports can use the same source.

Card and summary components must also be data-managed:

- KPI cards, conclusion cards, status cards, warning cards, and text-summary cards must have a source dataset or an explicit static policy.
- Do not leave a large card showing only "暂无数据" unless it is an intentional empty-state test case.
- Empty states must name the reason: no matching filter result, no permission, data loading failed, source not configured, or static placeholder not yet implemented.
- If a card is static narrative, mark it as static in the implementation contract, for example template `dataPolicy: 'static'`.
- If a card uses external runtime state, mark it as external and define refresh and error behavior, for example template `dataPolicy: 'external'`.
- Default mock data must populate all first-screen cards unless the page is explicitly demonstrating empty-state handling.

For each primary filter, include at least one mock-data scenario proving that:

- KPI cards, charts, tables, lists, drawers, and exports change consistently.
- Filtered detail rows reconcile to filtered KPI totals when the metric is additive.
- Non-additive metrics such as rates, scores, and completion rates are recalculated from raw numerator/denominator fields.
- Selected objects used by drawers, drilldowns, or jumps exist in the filtered dataset or produce a clear stale-selection state.

Do not create mock data that only makes the default screen look good while filters, interactions, or exports contradict the displayed summary.

## Coordination With Other Skills

This skill owns synthetic data structure and consistency. It does not own the UI behavior of filters or interactions.

- Use `report-filter-data-design` to define filter controls, option schema, defaults, cascades, query parameters, and permissions.
- Use `report-data-interaction-design` to define how selected mock records, chart marks, tasks, alerts, or differences pass context through drilldowns, drawers, and jumps.
- Use `report-info-component-mapping` to decide which mock datasets are required by each block or component.
- Use `report-component-style-design` and `report-visual-layout-design` after the mock data is mapped to visible components.
- When mock data drives visible blocks in scrollable page templates, preserve the block-height rule: every resolved block is at least 220px tall, and grids taller than 1080px scroll vertically. Fixed sci-fi/big-screen templates are exempt.

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
8. Component binding and expected filtered results.
9. Validation checks.
10. Example rows or JSON/CSV-ready sample data when requested.

## Quality Checklist

Before finalizing mock data, verify:

- KPI cards reconcile with detail or fact tables.
- All derived formulas are calculable from raw fields.
- Multi-month, trend, MoM, YoY, quarter, and rolling-period claims are backed by complete period rows, not only the default month.
- Time filter options all have matching data rows or are explicitly disabled with a reason.
- Trends support the stated conclusion.
- Ranking and risk counts match underlying rows.
- Filters do not produce contradictory totals.
- Filtered component totals, table row counts, drawer records, and export counts reconcile.
- Each primary filter has at least one data scenario where affected components visibly change.
- Drilldown targets exist and use stable IDs.
- Selected mock objects handle out-of-scope filter changes through reset or stale-selection state.
- Edge cases are present but not so many that they obscure the main story.
- Data is synthetic and safe to share.
