# 异常监控子类型选择与处置模式

Use this reference when an anomaly monitoring report may involve multiple design parts, when the user asks for 异常监控、预警、告警、风险提醒、超时监控、逾期预警、库存预警、数据质量监控、系统异常监控、订单异常、财务异常、合规异常、客户流失预警、目标滞后预警、异常清单、处理闭环, or when the page must classify monitoring patterns by reusable reference categories.

## 1. Boundary

异常监控回答“哪里异常了、为什么触发、有多严重、影响什么、谁处理、何时完成、是否关闭、是否复发”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览展示整体健康；异常监控发现异常事件并推动处理 |
| 分析诊断 | 分析诊断解释原因；异常监控触发告警并锁定异常对象 |
| 明细查询 | 明细查询查看记录；异常监控只关注命中异常规则的记录 |
| 绩效评估 | 绩效评估评价表现；异常监控识别风险事件，异常可影响扣分 |
| 汇报复盘 | 汇报复盘总结异常处理和经验；异常监控负责发现和处置 |
| 运营执行 | 运营执行推动任务办理；异常监控生成需要处理的异常任务 |
| 核对追溯 | 核对追溯还原差异和责任；异常监控先发现差异或风险信号 |

Choose the primary anomaly monitoring subtype by:

```text
监控对象 + 异常规则 + 处置机制
```

## 2. Selection Rule

Declare exactly one primary `anomalyMonitoringSubtype` before designing the page:

- `metricThreshold`: 指标阈值异常监控。
- `trendMovement`: 趋势波动/异动异常监控。
- `targetProgressDeviation`: 目标进度偏差异常监控。
- `processTimeoutBacklog`: 流程超时/积压异常监控。
- `businessRuleConflict`: 业务规则/状态冲突异常监控。
- `financeReconciliation`: 资金财务/对账异常监控。
- `resourceSupplyDemand`: 资源供需/库存产能异常监控。
- `objectRiskState`: 客户/对象风险状态异常监控。
- `qualityServiceExperience`: 质量服务/体验异常监控。
- `riskComplianceAudit`: 风险合规/审计异常监控。
- `systemServiceJob`: 系统服务/接口任务异常监控。
- `dataQualityPipeline`: 数据质量/数据链路异常监控。
- `securityPermissionBehavior`: 安全权限/操作行为异常监控。
- `recurrenceClusterComposite`: 复发聚集/组合事件异常监控。

Complex pages may contain secondary subtypes, but the primary subtype owns the first-screen severity judgment, rule model, alert list, treatment lifecycle, and governance rules. Secondary subtypes may appear as tabs, local modules, or drilldown paths.

If several subtypes seem equally important, choose by the anomaly recognition pattern:

| Recognition pattern | Primary subtype |
| --- | --- |
| Current value above/below fixed or dynamic limits | `metricThreshold` |
| Sudden rise/fall, abnormal fluctuation, baseline deviation | `trendMovement` |
| Completion lags time progress, plan, target, budget, forecast | `targetProgressDeviation` |
| SLA timeout, queue backlog, process stuck, node delay | `processTimeoutBacklog` |
| State conflict, illegal transition, field relation violation | `businessRuleConflict` |
| Payment, receivable, invoice, reconciliation, budget, duplicate finance risk | `financeReconciliation` |
| Shortage, overstock, overload, idle, mismatch, capacity risk | `resourceSupplyDemand` |
| Customer churn risk, contract expiry, supplier risk, device maintenance | `objectRiskState` |
| Complaint, return, defect, poor rating, satisfaction drop | `qualityServiceExperience` |
| Violation, audit issue, rectification overdue, compliance risk | `riskComplianceAudit` |
| Service availability, interface error, task failure, latency, SLA | `systemServiceJob` |
| Missing, delayed, duplicate, inconsistent, unavailable data | `dataQualityPipeline` |
| Abnormal login, export, permission change, sensitive operation | `securityPermissionBehavior` |
| Repeated issue, cluster anomaly, multi-rule hit, escalation event | `recurrenceClusterComposite` |

## 3. Rule Gate

Every anomaly monitoring design must define normal before defining abnormal:

```text
正常范围/基线/SLA/状态规则 -> 触发规则 -> 严重等级 -> 影响范围 -> 责任处置 -> 关闭标准
```

Before choosing visuals, declare:

- Monitoring object: metric, document, process, resource, customer/object, quality service, compliance risk, system service, data pipeline, or behavior.
- Normal definition: range, target, baseline, SLA, valid state machine, whitelist, exemption, or expected freshness.
- Trigger rule: threshold, trend, deviation, duration, missingness, recurrence, combination, manual mark, or model score.
- Threshold/baseline source: fixed rule, target, budget, historical average, moving average, peer benchmark, forecast, SLA, rule dictionary, or model output.
- Time window: current point, rolling window, consecutive triggers, cycle, deadline, or cooldown.
- Severity: P0/P1/P2/P3, red/orange/yellow/gray, or high/medium/low based on impact, urgency, duration, recurrence, and business criticality.
- Impact: money, customers, orders, inventory, projects, reports, system scope, process stage, data credibility, or compliance exposure.
- Ownership: object owner, region owner, process owner, duty person, platform owner, escalation owner.
- Close standard: metric recovered, process completed, business confirmed, evidence uploaded, task generated, exception waived, or recurrence watch enabled.

Do not create alerts without a rule, trigger reason, owner, and close standard.

## 4. Subtype Patterns

| Subtype | Core object | Trigger examples | Key fields | Typical actions |
| --- | --- | --- | --- | --- |
| `metricThreshold` 指标阈值 | Business, finance, system, quality metrics | Inventory below safety stock; complaint rate above line; error rate above limit | Current value, threshold, direction, warning line, object, severity | Confirm, assign owner, tune threshold, close after recovery |
| `trendMovement` 趋势异动 | Sales, traffic, orders, cost, conversion | Orders down 40% vs 7-day average; cost spikes; return rate rises | Current, baseline, change, seasonality, comparison window | Diagnose cause, monitor continuity, suppress expected seasonality |
| `targetProgressDeviation` 目标进度偏差 | Target, plan, budget, OKR, project progress | Completion 45% while time progress 70%; forecast misses target | Target, actual, completion, time progress, gap, forecast | Escalate lag, create catch-up task, adjust plan with approval |
| `processTimeoutBacklog` 流程超时积压 | Order, ticket, approval, procurement, delivery | SLA exceeded; node stuck; queue grows sharply | Process object, node, stay time, SLA, owner, backlog count | Assign handler, escalate overdue, open node detail |
| `businessRuleConflict` 规则状态冲突 | Order, contract, invoice, inventory, customer | Refunded order still pending shipment; invoice amount exceeds order | Rule ID, conflict fields, invalid state, source record | Correct data/process, open traceability, fix rule source |
| `financeReconciliation` 资金财务对账 | Receivable, payable, invoice, bank, budget | Duplicate payment; unmatched bank flow; invoice/order mismatch | Amount, aging, matched object, variance, evidence, risk level | Reconcile, freeze, approve adjustment, audit trail |
| `resourceSupplyDemand` 资源供需 | Inventory, capacity, manpower, equipment, funds | Stock will run out in 3 days; capacity > 95%; idle too high | Current stock, demand, in-transit, utilization, forecast gap | Replenish, reallocate, schedule, reduce idle |
| `objectRiskState` 对象风险 | Customer, supplier, contract, device, store, project | VIP customer inactive; contract expiring; supplier delays twice | Object, risk signal, lifecycle, expiry, score, owner | Generate follow-up, renew, maintain, contact, watch |
| `qualityServiceExperience` 质量服务 | Complaint, return, defect, satisfaction, ticket | Defect rate rises; severe complaints exceed threshold | Count, rate, severity, scope, recurrence, handler | Quality investigation, service recovery, root-cause entry |
| `riskComplianceAudit` 风险合规 | Compliance rule, audit issue, approval, rectification | Unauthorized approval; rectification overdue; supplier qualification expired | Rule, evidence, risk level, owner, deadline, recurrence | Escalate, rectify, freeze, audit, report |
| `systemServiceJob` 系统服务 | System, API, job, model, platform, SLA | API error rate > 5%; data task failed; queue backlog | Service, error, latency, availability, affected business | Notify duty, incident handling, rollback, recovery confirmation |
| `dataQualityPipeline` 数据质量 | Table, field, ETL, metric, report | Data not updated; null rate spikes; duplicate keys; metric mismatch | Table, field, freshness, completeness, consistency, lineage | Block report, notify data owner, fix pipeline, mark credibility |
| `securityPermissionBehavior` 安全权限 | Account, role, export, sensitive operation | Abnormal login; mass export; privilege escalation | User, action, device/IP, object, sensitivity, result | Freeze account, revoke permission, audit, notify security |
| `recurrenceClusterComposite` 复发组合 | Repeated issue, cluster risk, multi-rule object | Same object repeatedly triggers; many weak signals combine | Recurrence count, rule hits, cluster, composite severity | Upgrade, create incident, trigger recap, adjust rules |

## 5. Severity And Notification

Severity should combine impact, urgency, duration, recurrence, and business criticality.

| Level | Suggested meaning | Notification |
| --- | --- | --- |
| P0 / Red | Major business, finance, safety, compliance, or system impact | Immediate message + phone/SMS + incident mechanism |
| P1 / Orange | High impact or likely to breach SLA soon | Instant message + task/work order + escalation timer |
| P2 / Yellow | Medium impact, needs owner attention | In-app notice + daily queue + owner assignment |
| P3 / Gray | Low impact, observation or known issue | Aggregated notice, observation list, or suppressed reminder |

Do not use the same notification channel for all severities.

## 6. Lifecycle And Closure

Recommended auditable state flow:

```text
New -> Pending confirmation -> Confirmed -> Assigned -> In progress -> Escalated -> Recovered -> Closed
```

Optional states: `Ignored`, `FalsePositive`, `Exempted`, `Reopened`, `Recurring`, `UnderReview`.

Closure must record:

- Close reason.
- Close standard met.
- Evidence or result.
- Closer and time.
- Whether recurrence monitoring is enabled.
- Whether rule tuning is needed.

Ignoring, marking false positive, and exemption must also record reason and approver when risk is high.

## 7. Noise Control

Monitoring must include alert-fatigue controls:

- Deduplicate same object and same rule within a time window.
- Merge related alerts into one incident when they share source or impact.
- Cooldown repeated reminders after owner acknowledged.
- Whitelist planned maintenance, holidays, promotions, migrations, and approved exceptions.
- Use dynamic thresholds or peer baselines for objects with different scale or seasonality.
- Separate actionable alerts from observation signals.
- Track false-positive rate and rule adjustment history.
- Periodically review rules with owner and business users.

## 8. Page Structure

Recommended structure:

```text
First screen: severity overview
- P0/P1 count, new alerts, overdue alerts, affected amount/object, current most severe issue

Distribution and trend
- severity distribution, type distribution, region/object/process distribution, recurrence trend

High-impact list
- Top affected objects, top owners, top overdue, repeated alerts

Alert workbench
- filterable alert list, status, SLA, owner, action buttons

Alert detail drawer
- trigger rule, current vs threshold, evidence, logs, related records, owner, timeline, actions

Governance
- rule config, notification, suppression, whitelist, version, audit log
```

For compact dashboards, keep severity overview and alert workbench visible; move rule detail, evidence, and governance into drawers.

## 9. Drilldown Paths

Anomaly monitoring should route users to evidence and treatment:

| Anomaly | Route to |
| --- | --- |
| Sales/revenue sudden drop | `analysis-diagnostic-report-design` metric movement and `detail-query-report-design` order records |
| Target lag | target gap diagnosis, task detail, catch-up actions |
| Ticket timeout | ticket detail, process trace, operational execution |
| Stock below safety line | inventory balance, inventory flow, replenishment task |
| Overdue receivable | receivable detail, customer detail, collection task |
| Invoice/order mismatch | invoice/order detail, reconciliation traceability |
| Customer churn risk | lifecycle diagnosis, customer follow-up task |
| Data task failure | data lineage, job logs, affected report list |
| Compliance issue | operation logs, approval records, rectification task |
| System outage | service logs, affected business, incident recap |

Each anomaly should answer: why triggered, what it affects, where to verify, where to handle, how to close.

## 10. Monitoring Canvas

Use this canvas before producing a prototype or implementation spec:

| Canvas field | Question to answer |
| --- | --- |
| Report name | 这张异常监控报表叫什么 |
| Primary subtype | 属于 14 类中的哪一类 |
| Monitoring object | 监控指标、单据、流程、资源、客户、系统、数据还是行为 |
| Monitoring goal | 防什么风险，为什么要监控 |
| Normal definition | 什么情况算正常 |
| Trigger rule | 什么条件触发异常 |
| Threshold/baseline | 阈值从哪里来，是否动态 |
| Time window | 实时、滚动窗口、连续触发、周期、截止时间 |
| Monitoring frequency | 实时、小时、日、周、月、批次 |
| Severity rule | 如何分 P0/P1/P2/P3 或红黄绿 |
| Impact scope | 影响金额、客户、订单、系统、报表、流程、数据可信度 |
| Owner rule | 谁确认、谁处理、谁兜底 |
| Notification | 通过什么渠道通知，何时通知 |
| Treatment flow | 待确认、处理中、已恢复、已关闭如何流转 |
| Escalation rule | 什么情况下升级给上级、值班或事故机制 |
| Close standard | 满足什么条件可以关闭 |
| False positive | 如何标记误报并优化规则 |
| Whitelist/exemption | 哪些特殊场景不触发 |
| Drilldown | 可以跳到哪些明细、分析、日志、任务 |
| Recap mechanism | 哪些异常需要复盘，复盘输出什么 |
| Data contract | 数据来源、刷新时间、统计口径、规则版本 |
| Permission | 敏感异常、操作日志、安全数据谁可见 |

## 11. Acceptance Gate

Before accepting an anomaly monitoring design, verify:

- It declares exactly one `anomalyMonitoringSubtype`.
- It defines monitoring object, normal state, trigger rule, threshold/baseline, time window, and monitoring frequency.
- Each alert exposes trigger reason, rule, threshold/baseline, current value, deviation, start time, duration, and severity.
- Severity maps to impact, urgency, duration, recurrence, SLA, and business criticality.
- Impact is quantified by amount, object count, customer, order, system, process, report, or data credibility.
- Alerts have owner, status, response deadline, escalation rule, treatment flow, and close standard.
- Important alerts cannot be closed, ignored, exempted, or marked false positive without reason and evidence.
- Noise controls include deduplication, merge, cooldown, whitelist/exemption, false-positive feedback, and rule review.
- Rule version, owner, effective time, and adjustment history are visible.
- Users can drill from overview to alert list to evidence and action.

## 12. Avoid

- Do not create alerts without rules, thresholds/baselines, owners, and close standards.
- Do not build a wall of red metrics with no priority.
- Do not make every alert equally urgent.
- Do not show only counts without affected objects.
- Do not stop at discovery; include treatment, closure, recurrence, and review.
- Do not allow important alerts to be closed or ignored without reason.
- Do not use one-size-fits-all thresholds for objects with different scale, seasonality, or risk tolerance.
- Do not skip false-positive handling, whitelist/exemption, and rule maintenance.
