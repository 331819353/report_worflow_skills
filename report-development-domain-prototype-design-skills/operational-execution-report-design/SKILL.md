---
name: operational-execution-report-design
description: "Design, critique, or refine the design thinking for 运营执行类报表 as a report category, not just one specific task board. Use when the task asks how to design operational execution reports, task tracking boards, rectification follow-up dashboards, action plan tracking, collection task boards, project delivery tracking, store inspection rectification, budget reduction actions, complaint handling tracking, exception handling execution, special campaign execution, PMO supervision,督办事项, or any report whose purpose is to turn analysis conclusions or anomalies into tasks, assign owners, track progress, close the loop, and verify whether the business problem was solved. Emphasize reusable design logic: action objective, task model, owner and collaborator, priority, deadline, status flow, progress, risk blockers, evidence, acceptance, result verification, logs, notifications, and closed-loop operations."
---

# Operational Execution Report Design

## Core Positioning

Treat 运营执行类报表 as a report type. Design the action-closure method first, then instantiate it for concrete scenarios such as rectification tracking, regional performance improvement, payment collection, project delivery, store inspection remediation, budget reduction, customer complaint handling, exception processing, special campaign execution, PMO supervision, or group督办事项.

This report type answers:

- 接下来要做什么。
- 谁负责处理，谁协同。
- 什么时候完成。
- 当前处理到什么程度。
- 卡点和风险是什么。
- 是否完成并通过验收。
- 业务问题是否真的被解决。

Do not design it as a passive data display. Its core value is: 把分析结论转成任务，把任务推进到闭环，把闭环结果回写到指标或异常。

## Design Mindset

Start from "what action must happen next", not from "what result has already happened".

Use this chain:

1. Source: identify whether the action comes from status overview, analysis diagnosis, performance gap, anomaly monitoring, review recap, manual督办, or business workflow.
2. Objective: define the business problem to solve and the expected outcome.
3. Task model: define task, task package, subtask, owner, collaborator, deadline, priority, status, and evidence.
4. Progress model: define nodes, completion percentage, planned vs actual time, blockers, and next step.
5. Handling workflow: support assign, update, transfer, remind, delay request, submit completion, accept, reject, close, and reopen.
6. Result verification: check whether the linked indicator improved, anomaly closed, project recovered, collection increased, cost decreased, or complaint resolved.
7. Traceability: keep logs, comments, attachments, approval records, and source links.

If the task source or acceptance standard is unclear, propose a task model and explicitly list assumptions.

## Universal Design Workflow

1. Define the execution scenario.
   Identify what is being executed: rectification, collection, delivery, inspection remediation, cost control, complaint handling, exception handling, campaign, or supervision.

2. Define task source and objective.
   Link each task to the source problem, indicator, anomaly, diagnosis, performance gap, meeting action, or manual instruction.

3. Define the task data model.
   Include task name, source, related object, related indicator, owner, collaborators, priority, deadline, status, progress, node, blocker, result, evidence, and acceptance rule.

4. Define status flow.
   Use a clear lifecycle such as not started, assigned, in progress, blocked, delayed, submitted, accepted, rejected, closed, reopened. Adapt labels to the business process.

5. Design progress tracking.
   Show planned completion time, actual completion time, overdue days, current node, next action,协同部门, blockers, and SLA or督办 level.

6. Design execution operations.
   Let users update progress, write handling notes, upload evidence, transfer task, remind owner, request delay, submit completion, accept close, reject rework, and comment.

7. Design effectiveness verification.
   Do not stop at task completion. Verify whether the underlying metric, anomaly, project, collection, cost, service, or performance outcome improved.

8. Close the loop.
   When accepted, update linked anomaly/status/action/report if relevant, preserve logs, and mark whether the business problem is solved or requires follow-up.

## Task Model

Use this task structure as a reusable model:

- Task identity: task ID, task name, task type, task package, parent task, subtask.
- Source: anomaly, diagnosis, performance gap, review action, manual督办, project milestone, customer complaint, inspection issue.
- Business link: related indicator, organization, project, customer, contract, store, order, expense, payment, or exception.
- Responsibility: owner, collaborator, supervisor, reviewer, accepting role.
- Timing: start date, due date, planned node date, actual completion date, overdue days, SLA.
- Priority: high/medium/low, leadership concern, high-risk, high-impact, urgent.
- Status: not started, in progress, blocked, delayed, submitted, accepted, rejected, closed, reopened.
- Progress: percentage, current node, next step, blocker, latest update, risk level.
- Evidence: notes, attachments, screenshots, documents, source records, approval, acceptance proof.
- Result: completion result, metric change, anomaly closure, issue resolution, recurrence status, acceptance conclusion.
- Logs: assignment, transfer, reminders, comments, updates, submissions, acceptance, rejection, closure.

The task is the primary unit of the report.

## Process/Funnel Absorption

When a process/funnel reveals a bottleneck, absorb it into 运营执行型 as execution tasks. The report should manage the actions needed to unblock stages, reduce backlog, improve conversion, or close overdue objects.

Process-driven tasks may include:

- Clear backlog in a specific stage.
- Follow up objects overdue in a stage.
- Assign missing owners for stuck objects.
- Improve conversion at a weak stage.
- Handle returned/reworked objects.
- Recover delayed delivery, acceptance, payment, or closure.
- Verify whether stage metrics improve after action.

The focus is not the funnel visualization itself, but who acts, by when, with what evidence, and whether the process problem is solved.

## Layout Pattern

Use a "goal -> task -> progress -> risk -> closure" layout. Adapt the number of layers to the scenario.

1. Execution Overview Layer
   Show total tasks, completed tasks, in-progress tasks, overdue tasks, high-priority tasks, completion rate, on-time completion rate, issue closure rate, and acceptance pass rate.

2. Key Task Layer
   Surface the tasks that matter now: group督办, high-risk整改, overdue tasks, high-impact tasks, leadership-focused tasks, blocked tasks, and tasks due soon.

3. Task Distribution Layer
   Break tasks down by region, business unit, owner, task type, priority, status, source, related metric, or supervision level.

4. Progress Tracking Layer
   Show current node, planned date, actual date, overdue days, blocker reason,协同部门, next step, and progress update history.

5. Risk And Blocker Layer
   Highlight blocked, delayed, repeatedly returned, unaccepted, no-update, owner-missing, or high-impact tasks that need escalation.

6. Execution Result Layer
   Verify whether the business problem was solved: cost decreased, collection improved, anomaly closed, project recovered, performance improved, complaint resolved, or issue recurred.

7. Closure And Evidence Layer
   Show acceptance status, acceptance standard, proof, comments, logs, attachments, and whether linked records were updated.

## Component Selection Logic

- Use Kanban boards for task status flow and drag-and-drop status updates when the process allows it.
- Use task cards for priority, owner, deadline, SLA, and quick actions.
- Use task tables for dense supervision, sorting, filtering, batch operations, and export.
- Use progress bars for completion percentage and node progress.
- Use Gantt charts or timelines for plans, dependencies, and deadline tracking.
- Use step indicators or process flows for current node and approval/acceptance status.
- Use warning tables for overdue, blocked, and high-priority tasks.
- Use status transition tables for execution closure.
- Use metric comparison cards for before/after effect verification.

In this report type, task boards, task tables, Gantt views, and status flows are more important than traditional analytical charts.

## Interaction Design Logic

Design interactions around "create/assign -> execute -> evidence -> accept -> verify".

- Task hierarchy drilldown: special action -> task package -> subtask -> handling record.
- Organization drilldown: group task -> region task -> subsidiary task -> owner task.
- Status drilldown: all tasks -> overdue tasks -> high-priority overdue tasks -> owner.
- Metric drilldown: profit improvement action -> cost reduction task -> marketing cost reduction -> specific expense item.
- Source drilldown: task -> source anomaly/diagnosis/performance gap/review action.
- Effect drilldown: completed task -> linked metric trend/status/anomaly closure/detail evidence.

Use popovers for lightweight state explanation: status meaning, overdue reason, priority rule, SLA rule, current node, owner contact, latest comment, and acceptance rule.

Use drawers as the core interaction. Clicking a task row/card should open a task detail drawer with task name, source, related metric, related anomaly, owner, collaborators, deadline, status, node, records, attachments, acceptance standard, result, approval/acceptance history, next action, and operation buttons.

Drawer operations may include:

- Update progress.
- Add handling note.
- Upload attachment or proof.
- Transfer or add collaborator.
- Remind or催办.
- Request delay.
- Submit completion.
- Accept and close.
- Reject and return.
- Reopen.
- Comment.

Use jumps to connect source and verification: anomaly detail, analysis diagnosis report, performance evaluation report, detail query report, reconciliation report, status overview, metric trend, review recap report, or source business system.

## Closed-Loop Verification

Always distinguish "task completed" from "problem solved".

Verify one or more outcomes:

- Linked anomaly is closed.
- Linked metric improves or reaches target.
- Linked project returns to plan.
- Overdue collection is recovered.
- Cost or expense decreases.
- Complaint is resolved and not repeated.
- Inspection issue passes acceptance.
- Performance gap narrows.
- Source data is corrected.
- Business owner accepts the result.

If the task is complete but the business issue remains, mark it as not fully closed, reopen it, create follow-up, or escalate.

## Governance And Traceability

Design for accountability:

- Every task has an owner, deadline, source, priority, and acceptance standard.
- Every status change has a timestamp, operator, and optional comment.
- Delay requests require reason, new deadline, and approval when relevant.
- Close/accept requires evidence or acceptance comment.
- Rejection should state reason and next step.
- Batch operations should be permission-controlled and logged.
- Notifications and reminders should avoid spam but escalate overdue/high-risk tasks.
- Linked anomalies, indicators, or meeting actions should be updated after closure where relevant.

Execution reports are management tools; auditability matters.

## Handoff To Horizontal Skills

This skill owns task execution and closed-loop logic. For implementation-ready design, hand off to horizontal skills:

- Use `report-info-component-mapping` to map tasks, owners, deadlines, progress, blockers, evidence, acceptance, and result verification to components.
- Use `report-mock-data-design` to create coherent task, source, owner, status-flow, deadline, evidence, and effect-verification data.
- Use `report-filter-data-design` to define task status, owner, priority, deadline, source, current-user, and organization filters.
- Use `report-data-interaction-design` to define task drawers, progress updates, transfer/reminder/delay/acceptance actions, source jumps, and closure state.
- Use `report-visual-layout-design` and `report-component-style-design` for workbench layout, Kanban, task tables, Gantt, step flows, and operation states.
- Apply the prototype block-height rule for scrollable page templates during layout coordination: every resolved block is at least 220px tall, and grids taller than 1080px scroll vertically. Fixed sci-fi/big-screen templates are exempt.

## Output Format

When asked to design this report type or create a design proposal, prioritize execution closure. Use this structure:

1. 设计定位: define execution scenario, users, task source, and management purpose.
2. 执行思路: explain how conclusions/problems become tasks and how tasks close the loop.
3. 任务模型: define task fields, source links, owners, deadlines, status, progress, evidence, and acceptance.
4. 布局框架: describe overview, key tasks, distribution, progress, risks, results, and closure layers.
5. 组件选择: map Kanban, task table, Gantt, step flow, warning list, and result verification to their roles.
6. 交互设计: describe task drilldown, status flow, task drawer, updates, attachments, transfer, reminders, delay, submission, acceptance, rejection, and jumps.
7. 闭环校验: define how to verify the underlying business problem is solved, not merely that the task is submitted.
8. 权限与留痕: define roles, operation permissions, logs, notifications, escalation, and audit rules.
9. 执行结论: state which tasks are completed, which are overdue, who is blocked, and what to push next.

If the user provides one concrete execution report example, explicitly abstract it into general execution rules before applying it back to that example.

## Conclusion Pattern

Operational execution conclusions should focus on closure:

完成情况: completed, in-progress, overdue, high-priority tasks.
卡点责任: which task/owner/organization is blocked or overdue.
业务结果: whether the linked issue, anomaly, metric, or project improved.
下一步推进: escalation, reminder, deadline, or follow-up action.

Example structure:

本期[范围]重点任务共 [N] 项，已完成 [N] 项，逾期 [N] 项；逾期主要集中在[对象/区域/任务类型]，其中[任务/责任方]卡点为[原因]。建议在[时间]前完成[推进动作]，并以[指标/验收标准]验证闭环效果。

## Quality Checklist

Before finalizing, verify:

- The report centers on actions, owners, deadlines, progress, and closure.
- Every task has a source, business objective, owner, deadline, priority, and status.
- The lifecycle supports assignment, execution, submission, acceptance, rejection, closure, and reopening.
- Task drawers support progress updates, notes, attachments, transfer, reminders, delay requests, completion submission, and acceptance.
- Overdue, blocked, high-priority, and leader-focused tasks are easy to find.
- The design verifies whether the business problem was solved after task completion.
- Logs, comments, evidence, and status transitions are auditable.
- Jumps connect task source and result verification reports.
- Notifications, reminders, and escalation rules are considered.
- The final conclusion names completed tasks, overdue tasks, blocked owners, and next actions.

## Avoid

- Do not design it as only a metric dashboard.
- Do not stop at task completion rate without checking business effect.
- Do not create tasks without owner, deadline, source, or acceptance standard.
- Do not allow close/accept without evidence or comment when the process is important.
- Do not hide overdue and blocked tasks behind summary cards.
- Do not make status flow ambiguous.
- Do not omit operation logs, notifications, escalation, or permission control.
