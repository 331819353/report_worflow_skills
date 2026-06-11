---
name: report-type-design
description: "用于选择和设计报表业务类型，独立输出报表类型、核心问题、指标/维度、组件建议、筛选交互、证据链和验收口径。用户提到状态总览、驾驶舱、分析诊断、原因归因、明细查询、台账、绩效考核、评分排名、汇报复盘、异常监控、预警告警、任务执行、待办闭环、核对对账、差异追溯、审计证据时触发；不负责页面模板工程、API文档、后端实现或运行测试。"
---

# Report Type Design

## Positioning

Use this skill to decide and design the business report type. It is an atomic design skill: it must be useful on its own, but its output can feed prototype, technical-solution, backend, frontend, and testing workflows.

It owns report intent and business structure, not visual template engineering, API contracts, backend code, frontend implementation, or runtime QA.

## Report Types

Choose exactly one primary type unless the user explicitly asks for a composite page. Secondary types may support named local blocks.

| Type | Trigger Signals | Owns |
| --- | --- | --- |
| `status-overview` | 总览、概览、首页、驾驶舱、健康度、是否达标、风险概览 | Status baseline, KPI state, management conclusion, drilldown entry. |
| `analysis-diagnostic` | 为什么、原因、波动、异动、归因、预实差、目标偏差、漏斗转化 | Problem definition, decomposition path, evidence chain, diagnosis action. |
| `detail-query` | 明细、列表、台账、流水、记录、订单/费用/库存明细、筛选分页 | Row grain, table fields, filters, detail drawer, export, traceability. |
| `performance-evaluation` | 绩效、考核、KPI、评分、评级、排名、权重、奖金依据 | Evaluation object, scoring rules, rank fairness, review/appeal path. |
| `review-recap` | 汇报、复盘、总结、周报、月报、经营分析会、领导简报 | Narrative structure, conclusion-first summary, risk/action follow-up. |
| `anomaly-monitoring` | 异常、预警、告警、阈值、SLA超时、风险提醒、处置看板 | Rule trigger, severity, impact scope, owner, escalation, closure. |
| `operational-execution` | 执行、待办、任务、派单、整改、催办、行动项、工单闭环 | Task model, state flow, owner, due date/SLA, evidence and acceptance. |
| `reconciliation-traceability` | 核对、对账、差异追溯、账实不符、来源比对、审计日志 | Match rules, tolerance, discrepancy evidence, source trace, audit closure. |

Domain words such as 产业、区域、品牌、渠道、项目、门店 are objects, dimensions, filters, or drilldown levels. Do not route by domain keyword alone.

## Reference Loading

Load only the reference files for the selected primary type:

- `status-overview`: `references/status-overview-pattern-examples-and-acceptance.md`, `references/status-overview-subtype-selection-and-patterns.md`
- `analysis-diagnostic`: `references/analysis-diagnostic-pattern-examples-and-acceptance.md`, `references/analysis-diagnostic-subtype-selection-and-variance-first.md`
- `detail-query`: `references/detail-query-pattern-examples-and-acceptance.md`, `references/detail-query-subtype-selection-and-drilldown-context.md`
- `performance-evaluation`: `references/performance-evaluation-pattern-examples-and-acceptance.md`, `references/performance-evaluation-subtype-selection-and-evaluation-patterns.md`
- `review-recap`: `references/review-recap-pattern-examples-and-acceptance.md`, `references/review-recap-subtype-selection-and-recap-patterns.md`
- `anomaly-monitoring`: `references/anomaly-monitoring-pattern-examples-and-acceptance.md`, `references/anomaly-monitoring-subtype-selection-and-monitoring-patterns.md`
- `operational-execution`: `references/operational-execution-pattern-examples-and-acceptance.md`, `references/operational-execution-subtype-selection-and-execution-patterns.md`
- `reconciliation-traceability`: `references/reconciliation-traceability-pattern-examples-and-acceptance.md`

For any output that will feed a report prototype, dashboard, BI page, business-analysis page, cockpit, or report designer, also apply `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` at the business-design level. Use it to prevent generic metric shells and to require metric口径, metric tree/driver path, data story, drilldown/action, trust details, and industry vocabulary.

## Workflow

1. Identify the user, decision scenario, managed object, time scope, and business question.
2. Select the primary report type and explain why competing types were not selected.
3. Answer the five decision questions from the report decision anti-AI gate: who uses it, what decision is made, how metrics are calculated, how abnormalities are located, and what drilldown/action exists.
4. Define the report's answer model: conclusion, metrics, dimensions, grain, baseline, threshold, evidence, and action.
5. Build a metric tree or driver path when the report is not purely static/detail lookup. Generic KPIs such as revenue/users/growth/conversion require domain-specific formula, denominator, period, source, owner, and drill path.
6. Propose components only at the business-design level: KPI, chart, table, list, flow, detail drawer, action block, audit evidence, or narrative block.
7. Define filters, drilldowns, interactions, permissions, exports, and acceptance criteria at a contract level.
8. Record assumptions and missing facts without inventing fields, formulas, thresholds, owners, or source systems.

## Required Output

- Primary report type and optional secondary local blocks.
- Core business question and target users.
- Five decision-question answers and `reportDecisionRisk` when the output feeds prototype/frontend work.
- Metric, dimension, grain, baseline, threshold, evidence model, and metric tree/driver path when applicable.
- Component/content block proposal with business purpose.
- Filter, drilldown, interaction, permission, export, and return-path notes.
- Acceptance criteria, open questions, and downstream handoff notes.

## Quality Gate

- The chosen type matches the decision scenario, not merely a chart form.
- The report is not a generic metric shell: primary metrics have formula/denominator, grain, period, source/freshness, owner, and business-specific vocabulary when possible.
- The report has a data story path from state to baseline/target, driver, abnormality, detail, and action when the decision scenario requires diagnosis.
- Every component answers a named question or supports a required action.
- Metrics have grain, comparison basis, and business owner when possible.
- Missing口径, thresholds, source fields, permissions, and action ownership are visible.
- Output can be consumed by component mapping, visual layout, API/model planning, or test design without rereading the original conversation.
