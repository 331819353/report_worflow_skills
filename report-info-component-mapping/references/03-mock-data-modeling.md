# 03 Mock Data Modeling

Use this reference when a report prototype needs believable data that supports components, filters, interactions, and validation.

## Core Rules

- Mock data is not random decoration.
- KPI totals must match underlying detail records when the metric is additive.
- Actual, target, budget, gap, completion rate, and variance must reconcile.
- Organization, time, product, customer, project, task, anomaly, and source hierarchies must roll up correctly.
- Trends, anomalies, rankings, and conclusions must be visible in the data.
- Drilldowns and filters must return coherent subsets.

## Design Workflow

1. Define the business story the data should prove.
2. Define row grain: daily snapshot, org-period metric, transaction, task, anomaly, source-system comparison, or record detail.
3. Define dimension tables: time, org, product, customer, project, owner, status, source, permission scope.
4. Define fact tables: KPI facts, detail records, driver facts, anomaly records, task records, reconciliation differences, score records.
5. Define formulas: completion, gap, variance, contribution, score, SLA, risk.
6. Create signal and contrast: change, gap, ranking, anomaly, cause evidence.
7. Add edge cases: zero, missing, overdue, closed, tied rankings, negative growth, outliers, permission-restricted records, empty-filter scenarios.
8. Validate rollups, formulas, counts, statuses, and component-level summaries.

## Time Coverage Rules

Do not implement a multi-period report with only one period of data.

- If the report mentions multiple months, MoM, YoY, trend, recent 7/30/90 days, quarter, year, rolling period, or period switching, create a complete time dimension and fact rows for every selectable period.
- If the page has a period filter, every affected first-screen dataset must contain rows for all selectable periods.
- Trend charts need continuous periods. Do not skip months unless the missing period is an intentional empty-state test with visible explanation.
- MoM requires selected period and immediately previous comparable period.
- YoY requires selected period and same period in prior year.
- Monthly business reports should usually include 12-13 continuous months.
- Daily operational monitoring should usually include latest 30 days when a 30-day trend or rolling filter exists.

Validation checks:

- Time filter options come from `dim_time` or fact periods.
- Every affected dataset has `period`, `date`, `month`, `quarter`, or equivalent field.
- KPI cards, trends, tables, drawers, and exports return valid results for at least one non-default period.

## Data Model Patterns

- Dimension data: `dim_time`, `dim_org`, `dim_product`, `dim_customer`, `dim_project`, `dim_owner`, `dim_status`, `dim_source`.
- KPI snapshot facts: period-level actuals, targets, budgets, prior-period values, thresholds.
- Detail facts: contracts, orders, expenses, payments, inventory, projects, stores, customers, records.
- Diagnostic facts: driver factors, contribution values, formula nodes, process stages, cause categories.
- Alert facts: anomaly type, severity, rule, current value, threshold, owner, SLA, handling status.
- Task facts: task source, owner, deadline, priority, progress, evidence, acceptance status.
- Reconciliation facts: source A value, source B value, difference field, rule, version, status, audit log.

Use stable IDs for every object so filtering, drawer detail, and jumps can preserve context.

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

- Group totals should equal the sum of regions unless consolidation adjustments are explicit.
- Region totals should equal subsidiary/store totals when those levels are shown.
- Product category totals should equal product totals.
- Monthly totals should equal daily or weekly facts.
- Task, anomaly, and record counts must match filtered lists.
- Non-additive values such as margin rate, completion rate, and score must be recalculated from numerator/denominator fields.

## Signal Design

Useful mock data contains meaningful contrast:

- At least one strong positive performer.
- At least one obvious risk or laggard.
- At least one neutral baseline object.
- At least one trend turning point.
- At least one explanation traceable from summary to detail.
- At least one edge case for empty, missing, or permission-limited states.

Avoid all numbers being too neat. Use realistic variation, but keep the story legible.

## Filter Compatibility

- Time filters should return valid periods and not break trends.
- Organization filters should reduce KPI totals, rankings, alerts, tasks, and detail rows consistently.
- Status filters should match status counts.
- Severity filters should match alert cards.
- Owner filters should match task and anomaly lists.
- Business dimension filters should preserve at least one meaningful result.
- Default filters should produce a strong first-screen story.

Filter option mock data should include stable `id`, `label`, optional `count`, `disabled`, `reason`, and `parentId` for cascades. Counts must match filtered rows when displayed.

## Filter Granularity And Scenario Rules

- Mock data must cover every primary/global filter that is expected to change visible data. A filter is not implemented when it only changes selected UI state.
- For view, snapshot date, month, period, organization, industry, product, status, permission, or scenario filters, affected datasets need rows keyed by those dimensions or a resolver that derives different values for each option.
- Do not use one default snapshot for all filter states unless every affected component is explicitly static/invariant and documents why.
- At least one validation case per primary filter should prove a visible KPI/chart/table/list value changes, and another should prove empty or no-permission behavior when relevant.
- If a global filter maps to a different row field, define the mapping as `filterFields` or equivalent. If the data shape cannot support the filter, mark a data-grain gap instead of adding the filter to `ignoredFilters`.

## Safety

- Do not use real personal names, phone numbers, identity numbers, bank cards, or confidential contracts.
- Use neutral names such as `华东一区`, `A 项目`, `客户 001`, `产品线 B`, `负责人 03`.
- If using brand context, avoid implying real confidential operational data.
