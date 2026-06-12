# General Prototype Design Thinking

Use this as the default entry for a new report prototype.

## Core Question

Before drawing a table or chart, answer:

```text
Who uses this report, in what scenario, to make what decision or action?
```

A report prototype is not a container for data. It is a decision path.

## 1. Business Goal

Ask what problem the report solves and what the user should do after reading it.

Examples:

| User Goal | Prototype Focus |
| --- | --- |
| 管理层看经营 | Total result, target completion, YoY/MoM, ranking, risk. |
| 销售主管看团队 | Team performance, conversion, follow-up progress, gap objects. |
| 一线销售看自己 | Personal target, current completion, pending customers, next actions. |
| 财务核算 | Order amount, payment amount, refund, invoice status, reconciliation evidence. |

The same "sales report" changes completely when the user and decision change.

## 2. Role And Scenario

Classify the main user role:

| Role | Cares About | Prototype Emphasis |
| --- | --- | --- |
| 决策型用户 | Overall health, target progress, anomalies, strong/weak teams or regions. | KPI cards, trend, ranking, abnormal reminder, conclusion summary. |
| 分析型用户 | Why metrics rose/fell, which dimension caused the change, drilldown/export. | Multi-filter, grouping comparison, trend analysis, detail drilldown, export. |
| 执行型用户 | What to process today, which tasks are unfinished, what action to take next. | Pending list, status marks, action entry, direct metrics. |

## 3. Metric And Field Layers

Do not start by placing every field. Split the information first.

| Layer | Purpose | Typical UI |
| --- | --- | --- |
| Core metrics | What the user checks first. | Top KPI cards, progress cards, status summary. |
| Analysis metrics | Explain why the core metric changed. | Trend, comparison, structure, funnel, ranking, contribution analysis. |
| Detail fields | Verify, trace, export, or process records. | Bottom table, drawer, appendix, export file, linked business document. |

## 4. Analysis Path Before Layout

Default path:

```text
Overall state -> trend -> structure/driver split -> ranking/anomaly -> detail/action
```

Typical sales prototype path:

1. Overall: sales amount, order count, average order value, gross margin, target completion.
2. Trend: sales/order trend, YoY/MoM, target line or average line.
3. Dimension split: region, store, product, channel, customer type, salesperson.
4. Ranking and anomaly: top/bottom objects, low completion list, abnormal fluctuation.
5. Detail tracking: filter, sort, view detail, export, jump to business document.

## 5. Chart Choice By Analysis Purpose

| Purpose | Preferred Components |
| --- | --- |
| Total/current value | KPI card, number card, progress card. |
| Trend | Line chart, area chart, combo chart with target/average line. |
| Comparison | Bar chart, horizontal bar chart, ranked list. |
| Composition | Stacked bar, donut/pie only when categories are few, treemap when hierarchy matters. |
| Ranking | Horizontal bar, leaderboard, top/bottom list. |
| Distribution | Histogram, scatter plot, box/interval view when needed. |
| Conversion | Funnel, path/step chart. |
| Geography | Map, regional heatmap, ranked region table. |
| Details | Table, drawer, linked record page, export. |

## Output Checklist

- User, scenario, decision/action, business object, time scope.
- Main entry type and rejected competing entries.
- Core metrics, analysis metrics, detail fields.
- Analysis path and first-viewport answer.
- Component proposal by question, not by decoration.
- Filters, drilldowns, exports, permissions, data source/freshness, empty/error/no-permission states.
- Downstream handoff gaps for report type, binding matrix, layout, template, API/data model, and tests.
