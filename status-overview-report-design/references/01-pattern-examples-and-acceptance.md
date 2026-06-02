# 状态总览 Pattern Examples And Acceptance

Use this file only when a concrete example, acceptance sample, or anti-pattern is needed. Keep the entry skill as the main generic logic.

## Typical Scenario

- Primary task: 健康度/目标达成/风险概览.
- Common component bundle: 状态卡、趋势、结构、风险入口、明细跳转.
- Acceptance focus: 判断基准、状态口径、阈值、时间/组织筛选.

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
