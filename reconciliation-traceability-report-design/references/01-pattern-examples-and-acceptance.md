# 核对追溯 Pattern Examples And Acceptance

Use this file only when a concrete example, acceptance sample, or anti-pattern is needed. Keep the entry skill as the main generic logic.

## Typical Scenario

- Primary task: 来源核对/差异追溯/审计确认.
- Common component bundle: 核对总览、差异分布、字段差异、来源链路、审批日志.
- Acceptance focus: 来源系统、匹配键、容差、口径版本、修正确认规则.

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
