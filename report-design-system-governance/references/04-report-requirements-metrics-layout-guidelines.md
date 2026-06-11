# Report Requirements, Metrics, And Layout Guidelines

Use this reference for report design method, requirement analysis, metric口径, page information architecture, and layout rules.

## Core Goals

Report standards should improve:

- Readability: users quickly understand key metrics, trends, anomalies, and details.
- Consistency: same business, component, interaction, status, name, unit, and format stay consistent.
- Professionalism: chart, table, color, typography, format, and state expression are unified.
- Reuse: page structure, chart selection, format rules, config templates, and tokens become reusable assets.
- Development efficiency: use configuration, components, and tokens to reduce repeated work.

## Principles

| Principle | Rule |
| --- | --- |
| Clarity | Reports help users understand problems and make judgments, not simply show all data |
| Consistency | Same metric name, unit, formula, status color, operation, and chart pattern should remain consistent |
| Business first | Start from business question, user role, decision scenario, metric口径, and dimension before choosing chart/table |
| Less is more | One page focuses on one core theme; one module answers one core question; one chart expresses one primary relationship |
| Explainable | Every result should have口径, unit, source, update time, anomaly/null handling, and traceability path |

Recommended design order:

```text
业务问题 -> 用户角色 -> 决策场景 -> 指标口径 -> 分析维度 -> 图表/表格 -> 交互路径 -> 权限与性能
```

## Development Stages

| Stage | Must clarify | Deliverable |
| --- | --- | --- |
| Business goal | Who sees it, what they see, why they see it, frequency, next action | Report goal, user roles, core questions, refresh cycle |
| Metrics and口径 | Metric name, meaning, formula, unit, precision, direction, source, update, dimensions, permissions | Metric dictionary |
| Information architecture | Page hierarchy from overview to detail | Page structure and module priority |
| Expression method | Chart/table/card chosen by data relationship | Chart/table selection notes |
| Interaction path | Filter, query, overview, anomaly discovery, linkage, drilldown, detail, export/jump | Interaction contract |
| Engineering and acceptance | Components, configs, formatters, permissions, performance, states, QA | Implementation and acceptance package |

## Required Requirement Fields

Every report requirement should include:

| Module | Required content |
| --- | --- |
| Basic info | Report name, business domain, owner, demand source, launch time |
| User roles | User groups, organization scope, permission boundary |
| Business goal | Problem solved and decision supported |
| Metric list | Name, definition, formula, unit, precision, direction |
| Dimension list | Time, organization, region, product, customer, channel, etc. |
| Filters | Default, required, multi-select, cascade |
| Display | KPI cards, charts, tables, drilldown, export |
| Data logic | Source, refresh frequency,口径, anomaly handling |
| Permissions | Data permission, button permission, field permission |
| Nonfunctional | Performance, compatibility, security, observability, accessibility |

## Business Question Breakdown

Use a total-detail-total flow:

```text
总体表现如何？
-> 哪些指标异常？
-> 异常来自哪个维度？
-> 具体明细是什么？
-> 用户下一步能做什么？
```

For example, a sales report may map:

| Layer | Question | Module |
| --- | --- | --- |
| Overview | 本月销售额是否达标？ | KPI cards, completion gauge |
| Trend | 近 12 个月走势是否稳定？ | Line chart |
| Comparison | 哪些区域表现最好/最差？ | Bar chart, ranking |
| Structure | 哪类产品贡献最大？ | Donut or stacked bar |
| Anomaly | 哪些客户下降明显？ | Warning list |
| Detail | 具体订单有哪些？ | Detail table |

## Requirement Review Checks

- Does each metric support a business judgment?
- Does the same metric already have a historical口径?
- Are there same-name-different-meaning or same-meaning-different-name conflicts?
- Are filters too many or cognitively heavy?
- Do default filters match the highest-frequency user scenario?
- Does chart type match the data relationship?
- Are drilldown, export, jump, permission, and action paths needed?
- Are high data volume, realtime, or high-concurrency requirements present?

## Metric Naming

Metric names should follow:

```text
业务对象 + 指标含义 + 时间/范围/口径限定
```

Examples:

| Avoid | Prefer | Reason |
| --- | --- | --- |
| 金额 | 销售收入金额 | Clarifies business object |
| 完成 | 销售目标完成率 | Clarifies metric meaning |
| 去年 | 同期销售收入 | Clarifies comparison口径 |
| 增长 | 销售收入同比增长率 | Clarifies calculation method |

## Metric Dictionary Fields

| Field | Meaning | Example |
| --- | --- | --- |
| `metric_code` | Metric code | `sales_amount` |
| `metric_name` | Metric name | 销售收入 |
| `biz_domain` | Business domain | 销售 |
| `definition` | Metric definition | 统计周期内已确认销售收入 |
| `formula` | Calculation formula | `sum(order_amount)` |
| `unit` | Unit | 万元 |
| `precision` | Decimal places | `0` |
| `format_type` | Format type | 金额/比率/数量 |
| `direction` | Direction | 正向/负向/中性 |
| `data_source` | Source | `dws_sales_order` |
| `refresh_freq` | Refresh frequency | T+1 / realtime |
| `owner` | Owner | 数据产品/数据开发 |
| `remark` | Notes | 剔除取消订单 |

## Calculation Rules

### Completion Rate

| Condition | Rule |
| --- | --- |
| Target `> 0` | Actual / target |
| Target `= 0`, actual `> 0` | `1` |
| Target `= 0`, actual `< 0` | `-1` |
| Target `= 0`, actual `= 0` | `0` |
| Target `< 0` | Display `-` |

### YoY Growth

| Condition | Rule |
| --- | --- |
| Previous `> 0` | Actual / previous - 1 |
| Previous `= 0`, actual `>= 0` | Not calculated, display `-` |
| Previous `= 0`, actual `< 0` | `-100%` |
| Previous `< 0`, actual `< previous` | `1 - actual / previous` |
| Previous `< 0`, actual `>= previous` | Not calculated, display `-` |
| YoY or completion rate `>= 500%` or `<= -500%` | Display `-` |

## Unit And Precision

| Data type | Recommended unit | Precision | Example |
| --- | --- | --- | --- |
| Revenue/amount | 万元 | No decimals | `1,234` |
| Quantity | 个/件/单/人 | No decimals | `12,345` |
| Rate | `%` | No decimals | `86%` |
| Completion rate | `%` | No decimals | `102%` |
| YoY/MoM | `%` | No decimals | `-12%` |
| Average/unit price | 元/万元 | Business-defined | `12.34` |

Rules:

- Same metric on the same page must use the same unit.
- Unit appears in title, axis, table header, or KPI card.
- Amount and quantity use thousands separator.
- Color follows metric direction and business meaning, not raw sign alone. In visible Chinese rate/change/completion/YoY/MoM/variance indicators, default to positive-red-up and negative-green-down unless the metric dictionary explicitly defines another direction. Absolute loss, overdue, risk, or business-negative values may use danger red with text/icon/tag evidence.

## Source And Update Time

Every report page should show:

- Data source, for example `数据来源：经营分析系统`.
- Update time, for example `更新时间：2026-06-09 08:00`.
- Metric口径 explanation through info icon, tooltip, or page footer when needed.

Recommended positions:

| Info | Position |
| --- | --- |
| Page-level update time | Right of page title or below filter area |
| Chart-level data source | Bottom-left of chart |
| Metric口径 | Info icon after metric name |
| Supplemental explanation | Bottom-left of module |

## Page Information Architecture

Recommended structure:

```text
页面标题/说明/更新时间
-> 查询筛选区
-> 核心指标概览
-> 趋势/对比/占比/分布分析
-> 异常和重点提醒
-> 明细表格
-> 数据来源、更新时间、口径说明
```

Layer purpose:

| Layer | Content | Purpose |
| --- | --- | --- |
| Page | Title, description, global filters | Explain topic and query scope |
| Overview | KPI cards, key metrics | Quick overall judgment |
| Analysis | Charts, ranking, trends, structure | Discover causes and changes |
| Detail | Detail table, detail link, export | Trace and operate |
| Explanation | Source, update time,口径 | Trust and explainability |

## Layout Rules

| Item | Rule |
| --- | --- |
| Grid base | Spacing and component sizes use `2px` multiples |
| Module/card gap | `16px` |
| Module title to content | `24px` |
| Inner button gap | `8px` or multiples of `8px` |
| Input text/icon padding | `12px` |
| Card content | Left/right padding consistent; content should not touch edges |

Reading order:

1. Conclusion: title, core metrics, key anomalies.
2. Change: trend, YoY/MoM, progress.
3. Breakdown: region, product, customer, channel.
4. Detail: table, orders, customers, organizations.

## Card Rules

- Card title is left-aligned.
- Right top can hold filter, more, export, description, or other auxiliary actions.
- Bottom can hold data source, update time, and detail links.
- Card padding, title style, and operation position stay consistent on one page.
- Card gap is `16px`.
- Avoid putting too many charts in one card.

## Module Priority

| Priority | Module type | Recommended position |
| --- | --- | --- |
| P0 | Core KPI, anomaly reminder | First-screen top |
| P1 | Trend, comparison, structure analysis | First or second screen |
| P2 | Detail table, ranking | Second screen and below |
| P3 | Notes, logs, low-frequency config | Page bottom or collapsed area |
