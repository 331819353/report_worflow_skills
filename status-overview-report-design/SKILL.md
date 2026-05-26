---
name: status-overview-report-design
description: "Design, critique, or refine the design thinking for 状态总览型报表 as a report category, not just one specific dashboard. Use when the task asks how to design status overview reports, health overview dashboards, executive overview pages, KPI status reports, target completion views, budget-vs-actual overviews, variance monitoring pages, risk overview reports, 经营驾驶舱, 集团总览看板, 月度经营总览, 区域总览, or any report whose purpose is to answer whether the current situation is healthy, on target, abnormal, or risky. Emphasize reusable design logic: business question, audience, status object, baseline, metric hierarchy, layout pattern, chart choice, interaction boundary, and management conclusion."
---

# Status Overview Report Design

## Core Positioning

Treat 状态总览型报表 as a report type. Design the method first, then instantiate it for a concrete domain such as group operations, sales, finance, projects, inventory, service, regions, departments, stores, products, or customers.

This report type answers:

- 当前整体状态怎么样。
- 是好还是不好。
- 是否偏离目标、预算、计划、进度或阈值。
- 哪些对象存在风险。
- 管理者下一步应该关注哪里。

Do not copy a single dashboard example as the whole skill. Use any provided example only as input for abstraction: extract the reusable design logic behind it.

## Design Mindset

Start from "how to judge status", not from "what charts to place".

Use this chain:

1. Decision question: what judgment should the viewer make quickly.
2. Status object: what entity is being judged, such as organization, project, product, customer group, asset, process, or region.
3. Baseline: what the actual result is compared against, such as target, budget, plan, threshold, last period, same period last year, or time progress.
4. Metric hierarchy: which indicators express result, progress, deviation, trend, structure, and risk.
5. Information hierarchy: how to move from overall status to deviation to risk object.
6. Interaction boundary: what can be solved in this overview and what should jump to another report.
7. Conclusion: what management judgment and next attention point should be stated.

## Universal Design Workflow

1. Clarify the audience and decision.
   Identify whether the viewer is executive, function owner, regional owner, operations manager, finance owner, or project owner. Write the central question in one sentence.

2. Define the status object and scope.
   Determine whether the report observes the whole enterprise, one region, one product line, one team, a project group, a store network, a customer segment, or another managed object.

3. Choose the judgment baseline.
   A status overview must have a comparison basis. Prefer target, budget, plan, threshold, time progress, YoY, MoM, or historical average. Avoid presenting actual values alone.

4. Build the metric model.
   Separate metrics into result, target completion, variance, trend, structure, risk, and efficiency. Choose metrics according to the domain instead of hard-coding revenue/profit for every report.

5. Arrange the page from status to problem entrance.
   Place overall health first, deviation second, trend and structure next, and actionable risks last. The viewer should know "good or bad" before exploring "why or who".

6. Select charts by cognitive task.
   Choose visuals based on what the user must compare: status, progress, variance, trend, contribution, ranking, distribution, or risk object.

7. Design interactions as controlled exploration.
   Let users filter scope, drill down management hierarchy, open explanatory popovers, inspect concise drawers, and jump to diagnosis/detail/handling reports.

8. Write a management conclusion.
   Summarize overall status, main deviation, and priority risk in a short paragraph. Do not write a long root-cause analysis unless the user asks for diagnosis.

## Metric Abstraction

Use this metric structure as a thinking model, then rename metrics for the specific scenario:

- Result metrics: show current outcome, such as revenue, profit, GMV, SLA rate, delivery amount, defect rate, inventory value, project progress, or customer satisfaction.
- Completion metrics: compare actual against target, plan, budget, schedule, capacity, or service commitment.
- Variance metrics: show gap amount, gap rate, over/under status, and gap to time progress.
- Trend metrics: show whether the status is improving, worsening, stable, or suddenly abnormal.
- Structure metrics: show which region, organization, product, project, channel, customer, or process contributes most or drags most.
- Risk metrics: show threshold breaches, red/yellow/green status, exception count, consecutive misses, overdue objects, or abnormal entities.
- Efficiency metrics: show input-output relationship, such as expense rate, labor efficiency, turnover, utilization, conversion, or productivity.

For every status judgment, make the baseline visible. A metric card that says "actual value" without target, threshold, or comparison is not enough for this report type.

## Layout Pattern

Use a five-layer pattern when the report is broad and management-facing. Adapt or merge layers for smaller scenarios.

1. Overall Status Layer
   Show 4-8 decisive KPIs or status cards. The goal is a 10-second health judgment.

2. Target And Deviation Layer
   Show actual vs target/budget/plan, completion rate, variance amount, variance rate, and progress gap. This is usually the core of the report.

3. Trend Layer
   Show whether status is getting better, worse, stable, or abnormal over time. Use the period granularity that matches management rhythm.

4. Structure Layer
   Break down by the management dimension that can be acted on: organization, region, store, project, product, customer, channel, process, or owner.

5. Risk And Action Layer
   List the objects that need attention. Include object name, owner, metric, gap, severity, duration, and recommended next entry.

This layout is a pattern, not a fixed wireframe. The key principle is: first judge whole status, then expose deviation, then locate risky objects.

## Chart Selection Logic

- Use KPI cards for headline status and executive scanning.
- Use bullet charts when actual, target, performance band, and on/off-track status need to appear together.
- Use progress bars for completion rate and time progress comparison.
- Use funnel or stage bars only when the status object is a process and the main question is current stage health, conversion, backlog, or average duration.
- Use comparison bars for actual vs budget, plan, or target across objects.
- Use variance bars for positive/negative deviation and gap ranking.
- Use line or area charts for status trend and abnormal turning points.
- Use heat tables, status matrices, or maps for organization/region/entity health.
- Use waterfall charts when contribution and drag need decomposition.
- Use Top/Bottom bars for best/worst performers.
- Use alert lists or exception cards for concrete risk objects and next actions.

Select charts by the question being answered, not by decorative variety.

## Process/Funnel Absorption

Do not create a separate report type only because a process funnel appears. In 状态总览型, use the process/funnel view as a status lens when leaders need to know whether an end-to-end process is healthy.

Use it to show:

- Stage volume: how many objects are in each step.
- Conversion/pass rate: how many move from one step to the next.
- Backlog: where objects accumulate.
- Average duration: where cycle time is too long.
- Stage risk: which stage is red/yellow/green.
- Entry point: which stage should jump to diagnosis, detail, anomaly, or execution.

Keep the purpose at overview level: judge process health and locate risky stages, not explain every cause inside the funnel.

## Interaction Design Logic

Design interactions to move from "overview judgment" to "problem entrance":

- Filters define time, scope, hierarchy, business line, object type, unit, and baseline.
- KPI clicks switch the page focus to one metric and expose its lower-level distribution.
- Drilldown follows the real management hierarchy and usually stops within 3-4 levels.
- Trend point clicks reveal the structure and risk objects for that period.
- Structure chart clicks filter the page or open the selected object's snapshot.
- Risk card clicks show the risky object list.
- Popovers explain definitions, formulas, data source, baseline source, update time, and red/yellow/green rules.
- Right drawers show brief decomposition, top related records, and jump links.
- Jumps lead to specialist reports: diagnosis, detail query, reconciliation, exception handling, task follow-up, or owner workspace.

Keep the overview page from becoming an unlimited analysis page. If the user needs evidence, records, root cause, or processing workflow, jump out.

## Handoff To Horizontal Skills

This skill owns the status-overview business logic. For implementation-ready design, hand off to horizontal skills:

- Use `report-info-component-mapping` to map status, target, variance, trend, structure, and risk information to blocks and components.
- Use `report-mock-data-design` to create coherent KPI, target, trend, structure, and risk-list data.
- Use `report-filter-data-design` to define period, organization, business line, baseline, status, and risk filters.
- Use `report-data-interaction-design` to define KPI clicks, hierarchy drilldown, risk drawers, and diagnostic/detail jumps.
- Use `report-visual-layout-design` and `report-component-style-design` for 8*N layout, logo, toolbar, cards, charts, and overflow behavior.

## Output Format

When asked to design this report type or create a design proposal, prioritize the design thinking. Use this structure:

1. 设计定位: define the report type, decision question, audience, and status object.
2. 设计思路: explain the logic from status judgment to deviation to risk entrance.
3. 指标体系: provide metric categories and example metrics adapted to the scenario.
4. 布局框架: describe the layered information architecture, not only a page mockup.
5. 图表选择: map each chart to the question it answers.
6. 交互设计: describe filters, drilldown, popovers, drawers, and jumps with boundaries.
7. 结论表达: give a concise management conclusion template or example.
8. 校验清单: list assumptions, missing data, threshold dependencies, and design risks.

If the user provides only one concrete report example, explicitly abstract it into general rules before applying it back to the example.

## Quality Checklist

Before finalizing, verify:

- The answer describes how to design the report category, not only one concrete page.
- The first screen supports a quick health judgment.
- Every key metric has a comparison baseline.
- The core logic includes actual vs target/budget/plan/threshold, not just trend display.
- Structure breakdown identifies actionable objects.
- Risk objects have owners, severity, duration, or next steps when possible.
- Interactions have clear boundaries between overview, diagnosis, detail, and handling.
- The conclusion states overall status, main deviation, and priority risk.

## Avoid

- Do not hard-code one industry's metrics as universal.
- Do not turn the skill into a single dashboard template.
- Do not start with chart placement before defining the management question.
- Do not show actual values without baselines.
- Do not bury actionable risks under decorative visuals.
- Do not force root-cause diagnosis into the overview report.
- Do not use red/yellow/green status without explicit threshold rules.
