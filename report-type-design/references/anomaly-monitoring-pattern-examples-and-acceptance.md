# 异常监控 Pattern Examples And Acceptance

Use this file only when a concrete example, acceptance sample, or anti-pattern is needed. Keep the entry skill as the main generic logic.

## Typical Scenario

- Primary task: 异常发现/分级/闭环处理.
- Common component bundle: 告警总览、异常分布、告警清单、处理流、SLA.
- Acceptance focus: 异常规则、阈值、严重等级、责任人、降噪规则.

## Example Output Skeleton

1. 业务问题: state the decision or action the report supports.
2. 判断对象: define the object, grain, owner, and period.
3. 指标/字段: list metric or field names, units, direction, baseline, and formula.
4. 维度/筛选: list time, organization, status, object, permission, and keyword filters.
5. 组件组合: map each question to cards, charts, tables, drawers, or task blocks.
6. 交互: define drilldown, row detail, export, refresh, jump, evidence, or closure action.
7. 数据落地: identify source, freshness, missing data, edge states, and validation evidence.
8. 验收: define visible conclusion, data reconciliation, filter linkage, permission behavior, and unresolved gaps.

## Anti-Patterns

- Starting from chart type instead of business question.
- Using a decorative component without data, filter, or action purpose.
- Hiding assumptions about metric formulas, thresholds, source systems, or permissions.
- Producing only a visual layout without data model, interaction, and acceptance criteria.
