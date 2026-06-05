# 运营执行子类型选择与闭环模式

Use this reference when an operational execution report may involve multiple design parts, when the user asks for 执行、待办、任务、工作台、处理清单、跟进清单、催办、派单、办理、处置、整改、推进、闭环、行动项、工单处理、订单履约、客户跟进、补货调拨、任务看板, or when the page must classify execution patterns by reusable reference categories.

## 1. Boundary

运营执行回答“现在要做什么、谁来做、何时完成、优先级是什么、到哪一步了、怎么证明完成、是否真的有效”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览看整体情况；运营执行告诉具体要处理哪些对象 |
| 分析诊断 | 分析诊断解释原因；运营执行承接诊断结论形成动作 |
| 明细查询 | 明细查询查看记录；运营执行对记录发起处理、更新状态、形成闭环 |
| 绩效评估 | 绩效评估评价结果；运营执行推动结果产生 |
| 汇报复盘 | 汇报复盘总结行动效果；运营执行跟踪行动过程 |
| 异常监控 | 异常监控发现异常；运营执行负责异常处置 |
| 核对追溯 | 核对追溯还原事实和责任；运营执行记录处理过程和证据 |

Choose the primary operational execution subtype by:

```text
执行对象 + 执行动作 + 闭环机制
```

## 2. Selection Rule

Declare exactly one primary `operationalExecutionSubtype` before designing the page:

- `todoWorkbench`: 待办工作台/任务队列执行。
- `leadCustomerFollowup`: 线索客户/商机跟进执行。
- `orderFulfillmentDelivery`: 订单履约/交付执行。
- `ticketServiceAfterSales`: 工单服务/售后处理执行。
- `anomalyRiskTreatment`: 异常风险处置执行。
- `processApprovalHandling`: 流程审批/业务办理执行。
- `projectTaskProgress`: 项目任务/计划推进执行。
- `campaignOperationAction`: 活动战役/运营动作执行。
- `resourceReplenishmentDispatch`: 资源补给/调度执行。
- `financeCollectionSettlement`: 财务收付/结算催办执行。
- `qualityComplianceRectification`: 质量整改/合规整改执行。
- `inspectionSupervision`: 巡检检查/督导执行。
- `productContentConfigRelease`: 商品内容/配置发布执行。
- `systemDataOpsJob`: 系统数据/运维作业执行。
- `decisionActionClosure`: 决策行动项/会议任务闭环执行。

Complex execution workbenches may contain secondary subtypes, but the primary subtype owns row grain, task model, default fields, main actions, status flow, closure criteria, and effect verification. Secondary subtypes may appear as tabs, queues, related-task sections, or drilldown paths.

If several subtypes seem equally important, choose by the dominant execution action:

| Dominant action | Primary subtype |
| --- | --- |
| Personal/team todo, generic task queue, action list | `todoWorkbench` |
| Contact, follow up, renew, recall, visit, customer success | `leadCustomerFollowup` |
| Review order, allocate stock, ship, deliver, confirm receipt | `orderFulfillmentDelivery` |
| Receive ticket, respond, handle, escalate, close, return visit | `ticketServiceAfterSales` |
| Confirm anomaly, handle risk, recover, close, trigger recap | `anomalyRiskTreatment` |
| Approve, reject, supplement material, transfer, countersign | `processApprovalHandling` |
| Push project, update progress, submit deliverable, unblock | `projectTaskProgress` |
| Configure campaign, launch, adjust budget, touch users | `campaignOperationAction` |
| Replenish, transfer, schedule, allocate, release resources | `resourceReplenishmentDispatch` |
| Collect payment, pay, invoice, reconcile, settle, urge | `financeCollectionSettlement` |
| Rectify quality, audit, compliance, safety, hidden danger | `qualityComplianceRectification` |
| Inspect, check, supervise, verify, rectify field issue | `inspectionSupervision` |
| Publish product/content/config, approve listing, rollback | `productContentConfigRelease` |
| Rerun job, fix system, process interface, recover data | `systemDataOpsJob` |
| Track meeting decisions, recap actions, management follow-ups | `decisionActionClosure` |

## 3. Execution Gate

Every operational execution design must turn insight into action:

```text
来源问题 -> 执行对象 -> 推荐/必做动作 -> 主责与协同 -> 截止时间/SLA -> 状态流转 -> 证据验收 -> 效果验证
```

Before choosing visuals, declare:

- Source: anomaly, diagnosis, recap, performance gap, process node, manual task, scheduled rule, or external sync.
- Execution object: customer, order, ticket, task, SKU, project, workflow item, system job, action item, or rectification issue.
- Row grain: one task, one business object, one process node, one action item, one dispatch item, or one rectification issue.
- Action: contact, approve, replenish, rectify, close, transfer, urge, upload evidence, handle anomaly, push node, or finish handling.
- Owner model: owner, collaborator, supervisor, acceptor, approver, escalation owner.
- Time model: start time, deadline, SLA, remaining time, overdue days, delay request.
- Priority: impact, urgency, risk, object value, overdue, recurrence, leader focus, blocked dependency.
- Closure standard: what counts as completion and who accepts it.
- Effect verification: which metric, status, exception, payment, customer confirmation, or recurrence check proves that the business problem is solved.

Do not call a page operational execution if it lacks action, owner, deadline, state, and closure standard.

## 4. Subtype Patterns

| Subtype | Row grain | Main action | Key fields | Verification |
| --- | --- | --- | --- | --- |
| `todoWorkbench` 待办工作台 | One work item | Process, assign, update, close | Task ID, source, object, action, priority, deadline, owner, status | Task accepted and closed with evidence |
| `leadCustomerFollowup` 线索客户跟进 | One customer/lead/opportunity task | Contact, visit, quote, renew, recall | Customer, value, stage, last/next follow-up, risk, recommended action | Contact result, next plan, conversion/renewal/activity |
| `orderFulfillmentDelivery` 订单履约 | One order/delivery object or node | Review, allocate, ship, confirm | Order, customer, current node, SLA, block reason, handler | Delivery completed, signed, exception closed |
| `ticketServiceAfterSales` 工单售后 | One ticket/service request | Respond, handle, escalate, close | Ticket, customer, severity, SLA, handler, solution, satisfaction | Problem solved, customer confirmed, no recurrence |
| `anomalyRiskTreatment` 异常风险处置 | One anomaly/risk event | Confirm, handle, recover, close, recap | Alert ID, rule, severity, impact, owner, deadline, close standard | Anomaly recovered, evidence uploaded, recurrence watched |
| `processApprovalHandling` 流程办理 | One approval/application node | Approve, reject, supplement, transfer | Application, node, material status, approver, deadline, opinion | Process completed or returned with reason |
| `projectTaskProgress` 项目推进 | One task/milestone/project item | Update, unblock, submit, accept | Project, milestone, dependency, progress, blocker, deliverable | Deliverable accepted, milestone restored |
| `campaignOperationAction` 活动执行 | One campaign action | Configure, launch, adjust, pause, review | Campaign, phase, audience, channel, metric, owner, action | Launch complete, conversion improved, issue handled |
| `resourceReplenishmentDispatch` 资源调度 | One resource dispatch/replenishment task | Replenish, transfer, schedule, allocate | Resource, current state, demand, gap, suggested action | Gap resolved, replenishment/dispatch completed |
| `financeCollectionSettlement` 财务催办 | One collection/payment/invoice/settlement task | Urge, pay, invoice, reconcile, settle | Customer/vendor, amount, aging, document, owner, due date | Payment received, invoice issued, reconciliation closed |
| `qualityComplianceRectification` 整改执行 | One quality/compliance issue | Rectify, submit evidence, accept, close | Issue, severity, owner, deadline, evidence, reviewer | Rectification accepted, recurrence prevented |
| `inspectionSupervision` 巡检督导 | One inspection/check issue | Inspect, record, assign, rectify, verify | Site/object, checklist, issue, photo, owner, status | Issue passed recheck |
| `productContentConfigRelease` 内容配置发布 | One product/content/config task | Create, review, publish, rollback | Item, version, approval, publish window, risk, operator | Published successfully or rolled back |
| `systemDataOpsJob` 系统数据作业 | One job/system/data operation | Rerun, fix, recover, verify | Job/service, failure, owner, retry, log, affected object | Job recovered, data/report usable |
| `decisionActionClosure` 决策行动闭环 | One meeting decision/action item | Follow up, report progress, close, escalate | Decision, owner, deadline, progress, blocker, result | Action closed and next recap updated |

## 5. State Flow

Recommended auditable state flow:

```text
Created -> Assigned -> In Progress -> Blocked/Delayed -> Submitted -> Accepted/Rejected -> Closed/Reopened
```

Use only states that the page can operate and explain. Each transition should define:

- Who can perform the transition.
- Required comment or evidence.
- Whether notification is sent.
- Whether deadline or SLA changes.
- Whether audit log is recorded.

Important tasks should not jump directly from assigned to closed without evidence and acceptance.

## 6. Priority And Sorting

Execution pages must help users decide what to do first. Prioritize by:

- Severity or risk level.
- Deadline/SLA remaining time.
- Overdue days.
- Impact amount, customer value, affected order count, or system criticality.
- Recurrence or repeated failure.
- Leader focus or management escalation.
- Blocked dependency on critical path.
- Task complexity and owner load when dispatching.

Avoid unprioritized task queues when task volume is high.

## 7. Collaboration And Escalation

Complex execution must define responsibility explicitly:

- Owner: the one accountable person.
- Collaborator: people or teams required to complete the action.
- Supervisor: tracks progress and urges.
- Acceptor: verifies completion and business effect.
- Approver: approves delay, exception, closure, or adjustment.
- Escalation owner: receives overdue, blocked, high-risk, or repeated issues.

If multiple teams are involved, the page must show the current blocking party and next action.

## 8. Effect Verification

Always distinguish task completion from business problem resolution.

| Source problem | Verification |
| --- | --- |
| Anomaly alert | Related anomaly closed, no recurrence in watch window |
| Target gap | Catch-up action completed and progress improves |
| Customer follow-up | Contact result recorded, renewal/conversion/activity improves |
| Order delivery | Shipment/signature/acceptance completed |
| Ticket complaint | Customer confirms resolution and satisfaction |
| Resource shortage | Gap resolved, replenishment/dispatch complete |
| Collection overdue | Payment received or collection plan accepted |
| Rectification | Recheck passed and control mechanism improved |
| Data/system issue | Job recovered and affected report/data usable |
| Meeting action | Owner closes item and next recap confirms result |

If task is complete but effect fails, reopen, create follow-up task, or escalate.

## 9. Page Structure

Recommended structure:

```text
Execution overview
- total tasks, due today, overdue, blocked, high priority, completion, accepted, reopened

Priority work queue
- tasks sorted by severity, SLA, impact, owner load, recurrence

Responsibility and load
- owner/team distribution, overdue owners, blocked dependencies

Progress tracking
- status board, timeline, Gantt, node progress, SLA countdown

Risk and blockers
- overdue, blocked, no update, rejected, repeated reopen

Task detail drawer
- source, context, action form, comments, evidence, logs, related records, effect verification

Governance
- permissions, bulk actions, notification, escalation, audit log, export
```

For compact workbenches, keep the task queue and actions visible; move analytics and governance into drawers or secondary tabs.

## 10. Drilldown And Feedback

Operational execution often sits between upstream insight and downstream verification:

```text
Upstream source -> execution task -> detail/evidence -> effect verification -> performance/recap/traceability feedback
```

Typical links:

| Source | Execution page | Evidence / downstream |
| --- | --- | --- |
| Customer churn risk | Customer follow-up execution | Customer detail, lifecycle diagnosis, next follow-up |
| Order timeout | Order fulfillment execution | Order detail, process trace, service quality |
| Stock shortage | Replenishment dispatch | Inventory balance, purchase order, replenishment result |
| Overdue receivable | Collection task | Receivable detail, customer account, collection result |
| Complaint anomaly | Ticket service workbench | Ticket detail, service quality performance |
| Audit issue | Rectification execution | Audit evidence, risk compliance recap |
| Data task failure | Data ops workbench | Job log, affected report list |
| Meeting action item | Decision action closure | Next recap, owner status |

## 11. Execution Canvas

Use this canvas before producing a prototype or implementation spec:

| Canvas field | Question to answer |
| --- | --- |
| Report name | 这张执行报表叫什么 |
| Primary subtype | 属于 15 类中的哪一类 |
| Execution scenario | 是客户跟进、订单履约、异常处置、项目推进还是整改闭环 |
| Execution object | 要处理什么对象 |
| Row grain | 一行代表一个任务、对象、节点、调度事项、整改问题还是行动项 |
| Task source | 任务来自异常、分析、复盘、人工、流程、定期规则还是外部同步 |
| User roles | 谁执行，谁管理，谁协同，谁验收 |
| Execution action | 用户需要做什么 |
| Priority rule | 任务按什么排序 |
| Deadline/SLA | 什么时候必须完成 |
| State flow | 从待处理到关闭有哪些状态 |
| Context information | 执行人需要哪些背景信息 |
| Action form | 执行时需要填写什么 |
| Evidence requirement | 是否需要附件、截图、备注、凭证 |
| Collaboration | 是否需要转派、加签、协同、升级 |
| Close standard | 什么条件算完成和关闭 |
| Effect verification | 做完后用什么指标或状态验证有效 |
| Notification | 是否提醒责任人、主管、协同方 |
| Permission | 谁能看、处理、转派、关闭、验收、导出 |
| Data contract | 任务生成、状态更新、完成率、验收率如何定义 |

## 12. Acceptance Gate

Before accepting an operational execution design, verify:

- It declares exactly one `operationalExecutionSubtype`.
- It states execution object, row grain, task source, user roles, and execution action.
- Every task has source, target, owner, deadline/SLA, priority, status, and close standard.
- The task detail contains enough context for execution, not just identifiers.
- Users can handle, transfer, comment, upload evidence, request delay, submit, accept/reject, close, and reopen when appropriate.
- Important tasks require evidence and acceptance before closure.
- Overdue, blocked, high-priority, leader-focused, and no-update tasks are easy to find.
- Collaboration has one accountable owner, visible collaborators, acceptor, supervisor, and escalation path.
- Effect verification distinguishes task completion from business problem resolution.
- Logs, status transitions, bulk actions, permissions, and notifications are auditable.

## 13. Avoid

- Do not treat a detail table as an execution workbench.
- Do not create tasks without action, owner, deadline, state, and close standard.
- Do not track completion rate only; verify business effect.
- Do not let important tasks close without evidence or acceptance.
- Do not hide overdue, blocked, or no-update tasks in summary numbers.
- Do not allow multi-team tasks without one accountable owner.
- Do not omit source context; users must know why the task exists.
- Do not design action forms that cannot feed results back into analysis, performance, recap, or traceability.
