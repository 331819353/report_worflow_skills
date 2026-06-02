# 01 Question Component Flow

Use this reference when deciding how a business question becomes answer atoms, content blocks, and real components.

## Answer Atom Decision Tree

| If the user asks... | Required answer atom | Typical component bundle |
| --- | --- | --- |
| 现在好不好、严不严重、是否达标 | status judgment | KPI card, status badge, target card, bullet/progress chart |
| 比目标差多少、比上期变化多少 | target/variance | KPI + variance bar, bullet chart, comparison table |
| 趋势是否恶化或改善 | trend | line/area chart, sparkline card, annotated event marker |
| 问题集中在哪里 | structure/location | bar chart, heatmap, matrix, map only for geographic meaning |
| 谁最好/最差/最需要关注 | ranking | horizontal bar, ranking table, Top/Bottom switch |
| 流程哪一步损失最大 | process/conversion | funnel chart, stage bar, process step table |
| 为什么变化、谁贡献最大 | cause/driver | waterfall, contribution bar, decomposition tree, driver table |
| 哪些明细对象支撑结论 | detail/evidence | S2 table or Vue table, row drawer, source link, export |
| 是否异常、谁处理、是否超时 | anomaly/action | alert card, severity list, SLA table, handling drawer |
| 后续谁做什么、做到哪一步 | execution | task table, task card, Kanban, Gantt, progress stepper |
| 数据是否可信、两边为何不一致 | data trust | diff table, source comparison, lineage graph, audit log |
| 要给管理层讲清楚 | narrative | text-summary, conclusion strip, chapter block, action plan table |

## Information To Component Mapping

| Information type | Recommended block | Recommended components |
| --- | --- | --- |
| 报表主题 / 标题 | Page header | Title, subtitle, business scope, period, status badge |
| 核心问题 | Executive summary | Question statement, conclusion card, decision prompt, `visualType: 'text-summary'` |
| 时间 / 组织 / 范围 | Filter block / header meta | Date picker, org selector, scope selector, active filter chips |
| 核心结论 | Executive summary | Text summary card, key finding list, conclusion strip |
| 核心 KPI | KPI block | KPI card, metric card, sparkline card |
| 实际 vs 目标 / 预算 | Target/variance block | Bullet chart, progress bar, target card, comparison card |
| 差异额 / 差异率 | Target/variance block | Variance bar, comparison bar, waterfall only when attribution is additive |
| 同比 / 环比 / 趋势 | Trend block | Line chart, area chart, small multiple, sparkline |
| 区域 / 组织 / 产品结构 | Structure block | Bar chart, heatmap, matrix table, treemap, map only for geography |
| 排名 / Top Bottom | Ranking block | Horizontal bar chart, ranking table, Top/Bottom switch |
| 评分 / 分层 / 等级 | Evaluation block | Scorecard, tier distribution, heat matrix, benchmark chart |
| 原因 / 驱动因素 | Decomposition block | Waterfall, decomposition tree, driver tree, contribution bar |
| 流程 / 转化 / 漏斗 | Process block | Funnel chart, stage bar, process step chart, stage table |
| 明细记录 | Detail block | Data table, S2 table, list, row drawer, export action |
| 异常 / 风险 / 预警 | Alert block | Alert card, severity badge, warning list, SLA table |
| 任务 / 整改 / 跟进 | Task/action block | Task card, task table, Kanban, Gantt, progress stepper |
| 证据 / 附件 / 来源 | Evidence block | Evidence drawer, source list, attachment list, linked records |
| 口径 / 公式 / 规则 | Tooltip or definition block | Help icon, popover, rule drawer, formula note |
| 数据差异 / 可信度 | Data trust block | Side-by-side comparison table, diff table, lineage graph, log table |
| 导出 / 下载 / 刷新 / 全屏 | Header actions or toolbar | Icon buttons with tooltips, menu actions |

## Cognitive Task Mapping

- Judge current status: KPI card, health badge, target card, bullet chart.
- Compare values: comparison bar, grouped bar, bullet chart, side-by-side table.
- Rank objects: horizontal bar, ranking table, Top/Bottom list.
- See time movement: line chart, area chart, sparkline, annotated trend.
- Locate risky or important objects: heatmap, matrix, map, Top N list, alert table.
- Explain why: waterfall, decomposition tree, funnel/process chart, contribution analysis.
- Inspect exact records: table, drawer, source link, export.
- Execute actions: task card, Kanban, workflow stepper, operation buttons.
- Prove data correctness: source comparison, lineage, version list, operation log.
- Present a story: conclusion cards, chapter blocks, timeline, action plan table.

## Component Selection Constraints

- A component is valid only when it answers a named business question.
- In sample/source restoration, a visible source module is not automatically `must-have`. Classify each source module as:
  - `businessRequired`: directly answers the user's stated report question.
  - `sampleStructure`: needed to preserve the sample's shell, hierarchy, or module rhythm, but not a business-required component.
  - `optionalEnhancement`: useful extra capability that should be labeled and must not alter the sample's first viewport or main body layout.
- Two components may show the same metric only when they answer different tasks, such as current value and trend.
- KPI cards must include actual value, unit, period, comparison baseline, direction, and status rule when judgment is implied.
- Trend charts require consistent time grain.
- Ranking charts require stable dimension IDs and a deterministic sort rule.
- Funnel charts require ordered stages and a shared population or documented cohort logic.
- Waterfall charts require additive contribution logic. Non-additive drivers need contribution bars, driver tables, decomposition trees, or narrative explanation.
- Pie/donut charts are not the default. Use only for very small part-to-whole composition with clear labels.
- Maps are valid only when geography itself matters.
- Gauges are valid only for a single bounded progress/status metric.
- Dense analytical tables, pivot tables, cross tables, and wide metric matrices should use AntV S2.
- Simple operation lists, alerts, task lists, short forms, pagination, tags, popovers, dialogs, drawers, and basic data tables should use Element Plus in Vue report prototypes unless the existing project design system supersedes it.
- Large graphs such as lineage, decomposition, process network, DuPont, Gantt, or map need a viewport with zoom, pan, reset, and fullscreen.
- For status-overview reports, process/path/flow diagrams are secondary. Use them only when the core question explicitly asks for value chain, dependency, lineage, transmission, process conversion, or flow attribution; otherwise prefer KPI, target/variance, trend, structure, ranking, or risk-entry components.

## Multi-Component Constraints

- Define one primary component or primary KPI group. The rest must be supporting, evidence, or action components.
- First viewport should usually contain 3-7 meaningful components, not a crowded catalogue.
- Every component must have a different semantic role, dimension, grain, or workflow purpose.
- If two components answer the same sub-question, merge them or keep the more precise one.
- Put judgment before evidence unless the report is detail-query or reconciliation-first.
- Put action entries near the object they act on: alert row, task row, risk card, or detail drawer.
- Keep all components under the same global filter context unless the difference is intentional and labeled.
- Do not add a chart when a single KPI, table, or text-summary answers the question better.

## Adaptive Rules

- Infer business purpose from verbs such as "看整体", "为什么", "查明细", "谁好谁差", "汇报", "异常", "执行", "核对", "流失", "转化", "达成", "偏差".
- Start with fewer, stronger blocks rather than a crowded page.
- Mark assumptions and list the minimum missing fields needed to finalize.
- If a component choice depends on data shape, state the condition clearly. Example: "有阶段顺序时用漏斗, 否则用结构柱状图".
