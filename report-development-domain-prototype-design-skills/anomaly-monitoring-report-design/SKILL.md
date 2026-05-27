---
name: anomaly-monitoring-report-design
description: "Design, critique, or refine the design thinking for 异常监控类报表 as a report category, not just one specific alert dashboard. Use when the task asks how to design anomaly monitoring reports, warning dashboards, risk monitoring pages, alert lists, exception handling boards, threshold monitoring, SLA overdue monitoring, revenue/expense/profit/payment/inventory/project/customer/order/data anomaly monitoring, operational risk pages, or any report whose purpose is to detect whether anomalies exist, where they are, how severe they are, who should handle them, and whether they are closed. Emphasize reusable design logic: anomaly rules, severity levels, thresholds, affected objects, priority, distribution, trend, alert list, owner, SLA, handling workflow, escalation, audit logs, rule configuration, and alert fatigue reduction."
---

# Anomaly Monitoring Report Design

## Core Positioning

Treat 异常监控类报表 as a report type. Design the monitoring and handling method first, then instantiate it for scenarios such as revenue volatility, expense over-budget, margin below red line, overdue payment, inventory backlog, project delay, customer complaint spike, order fulfillment exception, data reporting anomaly, store operation exception, cash-flow risk, or budget execution anomaly.

This report type answers:

- 有没有异常。
- 异常在哪里。
- 严重程度如何。
- 影响范围多大。
- 是否需要立即处理。
- 谁负责处理，多久必须处理完。
- 异常是否已关闭，是否复发。

Do not design it as a complete business analysis page. Its core value is: 及时发现风险、定位责任对象、推动处理闭环。

## Design Mindset

Start from "what must be detected and handled", not from "what indicators can be shown".

Use this chain:

1. Monitoring object: define the metric, process, entity, or business object being watched.
2. Anomaly rule: define the threshold, trend rule, comparison rule, duration rule, or compound rule that triggers an alert.
3. Severity: classify urgency and impact, such as red/orange/yellow or high/medium/low.
4. Affected object: locate the organization, project, store, customer, account, order, task, or owner involved.
5. Impact: quantify amount, customers, orders, projects, duration, frequency, or business risk.
6. Handling workflow: define owner, status, SLA, escalation, actions, logs, and closure conditions.
7. Noise control: merge duplicates, suppress repeated alerts, prioritize severe alerts, and record ignore/close reasons.

If the anomaly rule is unclear, explicitly propose rule options and state assumptions.

## Universal Design Workflow

1. Define monitoring scope.
   Identify monitored metrics, objects, time granularity, organization scope, business process, data source, and refresh frequency.

2. Define anomaly rules.
   Specify thresholds and logic: over budget by X%, below red line, continuous decline for N days, YoY/MoM deviation, statistical outlier, missing report, overdue SLA, repeated occurrence, or multi-condition risk.

3. Define severity and priority.
   Map rules to levels. Include urgency, business impact, affected scope, duration, recurrence, and whether immediate action is required.

4. Show overall alert pressure.
   Summarize total anomalies, high-risk anomalies, new anomalies, handled anomalies, overdue unhandled anomalies, affected amount, affected organizations, and SLA status.

5. Locate concentration.
   Break anomalies down by severity, organization, type, metric, project, store, owner, process step, or time.

6. Track trend and recurrence.
   Show whether anomalies are expanding, decreasing, becoming overdue, or recurring in the same object/type.

7. Provide an actionable alert list.
   List concrete anomaly items with rule, current value, threshold, deviation, duration, owner, status, deadline, and action buttons.

8. Close the handling loop.
   Support confirm, assign, start rectification, ignore, close, escalate, view detail, view source, upload proof, and write handling comments.

9. Control alert fatigue.
   Sort by priority, merge duplicates, reduce repeated reminders, allow subscriptions, retain handling evidence, and make close/ignore auditable.

## Anomaly Rule Model

Use this rule structure as a design model, then adapt to the specific domain:

- Threshold rule: value exceeds or falls below a fixed warning line.
- Variance rule: actual deviates from target, budget, plan, or benchmark by a defined ratio or amount.
- Trend rule: continuous rise/fall, sudden spike/dip, or abnormal fluctuation over N periods.
- Duration rule: abnormal state persists beyond a time limit.
- SLA rule: handling or business process exceeds deadline.
- Missing-data rule: required report, field, document, or source data is missing.
- Recurrence rule: same object/type repeats within a period.
- Compound rule: multiple weak signals together trigger higher severity.
- Manual rule: user or auditor marks an item as abnormal.

Every alert should expose why it was triggered: rule, threshold, current value, deviation, start time, duration, and severity.

## Process/Funnel Absorption

When the monitored object is a process, absorb funnel/process monitoring into 异常监控型. Use alerts to detect stage-level abnormality instead of creating a separate process report type.

Common process anomaly rules:

- Stage conversion rate drops below threshold.
- Stage backlog exceeds capacity or historical range.
- Objects stay in one stage longer than SLA.
- Handoff failure or missing next owner.
- Rework/return rate rises above threshold.
- Completion/closure rate drops for N periods.
- A stage has no update, missing report, or data sync failure.

The output should still be an alert item with severity, owner, deadline, handling state, and evidence.

## Layout Pattern

Use an "alert -> locate -> handle" layout. Adapt the number of layers to the scenario.

1. Anomaly Overview Layer
   Show current total anomalies, high-risk count, new count, handled count, overdue count, affected amount, affected organizations, and SLA pressure.

2. Severity Layer
   Group anomalies by red/orange/yellow/gray or high/medium/low/closed. Make "must handle now" visually obvious.

3. Distribution Layer
   Show where anomalies concentrate: region, business unit, subsidiary, project, store, metric, type, owner, process step, or source system.

4. Trend And Recurrence Layer
   Show anomaly count trend, high-risk trend, overdue trend, repeated anomaly trend, and whether risk is expanding.

5. Alert List Layer
   Make the concrete exception list the operational center. Include ID, type, object, metric, current value, threshold, deviation, first occurrence, duration, impact, owner, status, deadline, and actions.

6. Handling Action Layer
   Provide direct actions: assign, confirm, rectify, ignore, close, escalate, view detail, view source, submit explanation, upload proof, or create task.

## Chart And Component Selection

- Use warning cards for anomaly totals and high-risk pressure.
- Use red/orange/yellow/green status cards for severity.
- Use heatmaps, matrices, or maps for distribution by region, organization, or object.
- Use line charts and control charts for trends, thresholds, and abnormal fluctuation.
- Use Top N bars for most affected objects, types, owners, or organizations.
- Use alert lists, status tables, Kanban boards, and task lists for handling.
- Use threshold-line charts for metric warning boundaries.
- Use badges, countdowns, SLA timers, and status tags for urgency and processing state.

Use red/yellow/green carefully. Too many alerts with the same visual weight creates numbness.

## Interaction Design Logic

Design interactions around "discover -> locate -> assign -> track -> close".

- Severity drilldown: all anomalies -> high-risk anomalies -> concrete anomaly item.
- Organization drilldown: group -> region -> subsidiary -> project/store.
- Type drilldown: anomaly category -> subtype -> specific rule.
- Time drilldown: month -> week -> day -> newly added today.
- Status drilldown: all -> pending -> in progress -> overdue -> closed -> owner.
- Alert click opens a handling drawer.
- Batch actions support assign, close, ignore, escalate, subscribe, or export when allowed.
- SLA reminders show remaining time, overdue time, and escalation path.
- Rule configuration lets authorized users view or adjust thresholds, frequency, recipients, and suppression rules.
- Subscription and push settings let users follow specific types, owners, regions, or severities.
- Duplicate merging groups repeated or related alerts into one handling object.

Use popovers to explain why an alert fired: rule, threshold, current value, deviation, first occurrence, duration, recurrence, affected amount, and affected object count.

Use drawers for handling evidence and workflow: anomaly ID, type, object, metric, value, threshold, deviation, occurrence time, duration, impact, related records, history, owner, status, SLA, logs, comments, attachments, and operation buttons.

Use jumps for deeper work: analysis diagnosis report, detail query report, reconciliation report, project execution report, collection task, expense detail, exception handling page, operational execution page, or review recap for repeated issues.

## Handling Workflow Design

Every important anomaly should have a clear lifecycle:

1. New: alert generated by rule, source, or manual marking.
2. Confirmed: user verifies it is a real anomaly.
3. Assigned: owner and deadline are set.
4. In progress: handling action is underway.
5. Escalated: overdue, high-risk, or unresolved item is raised to higher owner.
6. Closed: result, explanation, evidence, and close reason are recorded.
7. Reopened or recurring: same issue appears again or closure is invalid.

Record handling logs for assignment, comments, proof upload, status change, ignore, close, escalation, and rule adjustment.

## Alert Fatigue Control

Design noise control explicitly:

- Prioritize by severity, impact, duration, recurrence, and SLA status.
- Merge same-object same-rule repeated alerts.
- Suppress duplicate reminders within a configured window.
- Separate "must handle" from "observe only".
- Allow ignore and close, but require reasons and retain audit logs.
- Provide rule tuning suggestions when many low-value alerts occur.
- Show recurrence and unresolved history so severe repeated issues stand out.
- Avoid making every small deviation a high-priority alert.

Monitoring is only useful if users trust the signal.

## Handoff To Horizontal Skills

This skill owns anomaly rules, priority, and handling logic. For implementation-ready design, hand off to horizontal skills:

- Use `report-info-component-mapping` to map alert counts, severity, distribution, trends, lists, SLA, and handling actions to components.
- Use `report-mock-data-design` to create coherent alert rules, thresholds, current values, severity, owners, SLA, recurrence, and status data.
- Use `report-filter-data-design` to define severity, anomaly type, status, owner, SLA, recurrence, period, and organization filters.
- Use `report-data-interaction-design` to define severity drilldown, alert drawers, assignment/close modals, batch operations, and execution/detail jumps.
- Use `report-visual-layout-design` and `report-component-style-design` for monitoring layout, red/yellow/green states, alert lists, cards, and noise-controlled emphasis.

## Output Format

When asked to design this report type or create a design proposal, prioritize monitoring and handling logic. Use this structure:

1. 设计定位: define monitoring scenario, audience, monitored objects, risk purpose, and refresh cadence.
2. 异常规则: define thresholds, trigger logic, severity levels, priority rules, and recurrence logic.
3. 监控布局: describe overview, severity, distribution, trend, alert list, and handling layers.
4. 字段与清单: define alert ID, type, object, metric, value, threshold, deviation, time, duration, impact, owner, status, deadline, and actions.
5. 图表组件: map cards, heatmaps, control charts, Top N bars, lists, and status tables to their monitoring tasks.
6. 交互设计: describe drilldowns, popovers, drawers, batch operations, SLA timers, subscriptions, push, and rule configuration.
7. 处理闭环: define lifecycle, owner assignment, escalation, logs, evidence, close/ignore rules, and task jumps.
8. 降噪机制: explain duplicate merge, suppression, prioritization, recurrence handling, and alert fatigue prevention.
9. 行动结论: state which anomalies must be handled, by whom, and by when.

If the user provides one concrete anomaly report example, explicitly abstract it into general monitoring rules before applying it back to that example.

## Conclusion Pattern

Anomaly monitoring conclusions should be action-oriented:

异常规模: how many anomalies and high-risk items exist.
集中位置: where they concentrate.
严重程度: what needs immediate handling.
责任与时限: who should handle them and by when.
升级建议: which overdue/repeated/high-impact issues need escalation.

Example structure:

当前[范围]共有 [N] 条异常，其中高风险 [N] 条，主要集中在[对象/区域/类型]；[N] 条已超过处理时限，建议由[责任方]在[时间]前完成[处理动作]，并对[复发/重大异常]升级跟踪。

## Quality Checklist

Before finalizing, verify:

- The report answers whether anomalies exist and what must be handled now.
- Every alert has an explicit rule, threshold, current value, deviation, and severity.
- Severity levels are tied to impact, urgency, duration, recurrence, or SLA.
- The layout supports alert overview, location, trend, concrete list, and handling.
- Alert list fields are sufficient for action, not just observation.
- Drawers include evidence, logs, owner, SLA, and operation buttons.
- Jumps lead to diagnosis, details, reconciliation, execution, or recap when needed.
- Handling statuses and close/ignore rules are auditable.
- Duplicate merge, suppression, prioritization, and recurrence tracking are considered.
- The final conclusion names anomalies, owners, deadlines, and escalation needs.

## Avoid

- Do not create alerts without clear rules or thresholds.
- Do not give every alert the same priority.
- Do not show only counts without concrete abnormal objects.
- Do not stop at discovery; include handling and closure.
- Do not allow ignore/close without reason and trace.
- Do not create noisy alerts that users will learn to ignore.
- Do not confuse anomaly monitoring with full root-cause analysis; link to diagnosis when needed.
