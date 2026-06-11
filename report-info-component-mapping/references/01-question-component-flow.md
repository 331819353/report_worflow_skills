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
| 哪些明细对象支撑结论 | detail/evidence | Detail Table with row grain, primary key, prioritized columns, row drawer, source link, export |
| 是否异常、谁处理、是否超时 | anomaly/action | alert card, severity list, SLA table, handling drawer |
| 后续谁做什么、做到哪一步 | execution | task table, task card, Kanban, Gantt, progress stepper |
| 数据是否可信、两边为何不一致 | data trust | diff table, source comparison, lineage graph, audit log |
| 要给管理层讲清楚 | narrative | text-summary, conclusion strip, chapter block, action plan table |
| 发生了什么、为什么、影响多大、下一步怎么办、口径是否可信 | analysis insight | Analysis & Insight component with `analysisInsightContract`: conclusion, evidence, affected object, action/trust, state |

## Information To Component Mapping

| Information type | Recommended block | Recommended components |
| --- | --- | --- |
| 报表主题 / 标题 | Page header | Title, subtitle, business scope, period, status badge |
| 核心问题 | Executive summary | Question statement, conclusion card, decision prompt, `visualType: 'text-summary'` |
| 时间 / 组织 / 范围 | Filter block / header meta | Date picker, org selector, scope selector, active filter chips |
| 核心结论 | Executive summary | Text summary card, key finding list, conclusion strip |
| 洞察 / 诊断 / 建议 / 口径说明 | Analysis insight block | Conclusion card, insight card, anomaly/risk card, attribution card, recommendation card, data-quality/definition card, chart annotation |
| 核心 KPI | KPI block | KPI card, metric card, sparkline card |
| 实际 vs 目标 / 预算 | Target/variance block | Bullet chart, progress bar, target card, comparison card |
| 差异额 / 差异率 | Target/variance block | Variance bar, comparison bar, waterfall only when attribution is additive |
| 同比 / 环比 / 趋势 | Trend block | Line chart, area chart, small multiple, sparkline |
| 规模 + 效率 / 达成 | Trend or target/variance block | Combo chart only when amount/count and rate/trend/target share one ordered category/time axis |
| 区域 / 组织 / 产品结构 | Structure block | Bar chart, heatmap, matrix table, treemap for hierarchical non-negative value share, sunburst for hierarchy path/share, map only for geography |
| 排名 / Top Bottom | Ranking block | Horizontal bar chart, ranking table, Top/Bottom switch |
| 评分 / 分层 / 等级 | Evaluation block | Scorecard, tier distribution, heat matrix, benchmark chart |
| 多指标对象画像 / 异常识别 | Evaluation or anomaly block | Parallel coordinates when `3+` metrics share objects, plus detail table fallback |
| 原因 / 驱动因素 | Decomposition block | Waterfall, decomposition tree, driver tree, contribution bar |
| 流程 / 转化 / 漏斗 | Process block | Funnel chart, stage bar, process step chart, stage table |
| 来源去向 / 流量分配 / 多阶段流转 | Flow block | Sankey diagram when source-target-value links exist, plus detail table fallback |
| 明细记录 | Detail block | Detail Table, row drawer, export action; S2 only for pivot/cross/wide analytical grids |
| 异常 / 风险 / 预警 | Alert block | Alert card, severity badge, warning list, SLA table |
| 任务 / 整改 / 跟进 | Task/action block | Task card, task table, Kanban, Gantt, progress stepper |
| 证据 / 附件 / 来源 | Evidence block | Evidence drawer, source list, attachment list, linked records |
| 口径 / 公式 / 规则 | Tooltip or definition block | Help icon, popover, rule drawer, formula note |
| 数据差异 / 可信度 | Data trust block | Side-by-side comparison table, diff table, lineage graph, log table |
| 导出 / 下载 / 刷新 / 全屏 | Header actions or toolbar | Icon buttons with tooltips, menu actions |

## Cognitive Task Mapping

- Judge current status: KPI card, health badge, target card, bullet chart.
- Compare values: comparison bar, grouped bar, bullet chart, side-by-side table.
- Read scale with rate/target together: Combo chart with bar for amount/count/scale and line or target/reference for rate/trend/efficiency/standard.
- Rank objects: horizontal bar, ranking table, Top/Bottom list.
- See time movement: line chart, area chart, sparkline, annotated trend.
- Locate risky or important objects: heatmap, matrix, map, Top N list, alert table.
- Cross-summarize dimensions: Pivot Table with row dimensions, column dimensions, measures, aggregation formulas, subtotal/grand-total rules, frozen row headers, exact cell tooltip, and drilldown to detail evidence.
- Read grouped table fields: grouped table header with business column groups, `columnTree`, computed `colSpan`/`rowSpan`, leaf units/definitions, fixed multi-level header, and frozen row/primary columns when horizontal scroll exists.
- Complete a mini analysis loop inside one container: Composite Panel with one shared topic, one primary child, summary -> trend/structure -> contribution/exception -> detail/action sequence, panel-level local filter, shared legend/unit, and linked child interaction.
- Explain a decision point: Analysis & Insight component with one subtype, one main conclusion, supporting evidence, affected object, action or trust context, and `analysisInsightContract`.
- Compare multi-metric object profiles: parallel coordinates with object/dimension/axis contracts, plus detail table for exact values.
- Explain why: waterfall, decomposition tree, funnel/process chart, contribution analysis.
- Trace source-to-target flow: Sankey with node/link schema, Top N aggregation, main-flow highlight, and exact link tooltip/detail.
- Inspect exact records: table, drawer, source link, export.
- Inspect row-level records: Detail Table with stable primary key, default sort, pagination/search/export scope, row detail drawer, and exact hidden-field disclosure.
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
- Combo charts require one shared ordered category/time grain, a named scale-to-rate/target business relationship, declared bar metric/unit, line or target metric/unit, left/right y-axis mapping, total visible series `<=4`, tooltip exact values, and split-chart fallback. Use separate bar/line/table views when the metrics are unrelated, dual-axis semantics are weak, category labels are dense, or exact audit is the main task.
- Detail Tables require row grain, row id/primary key, visible column priority, default sort, column type/width/alignment, status/action semantics, pagination/search/sort/export scope, and row detail/action payload. Use Detail Tables for lookup, audit, reconciliation, export, and row action; do not use them as unprioritized source-table dumps or show checkbox/action columns without a real batch/action flow.
- Tables with more than `8` visible columns or natural field groups require a grouped-header contract: business group nodes, leaf fields, units/definitions, computed `colSpan`/`rowSpan`, max depth `<=3` by default, fixed multi-level header, frozen row/primary columns when scrolling, and component-local filters separated from per-column header filters. A flat header needs an explicit reason.
- Multiple child components may become a Composite Panel only when they answer one shared business question and can declare `compositePanelContract`: topic, analysis sequence, primary child, child roles/priorities/min sizes, default `2-3` children and max `4`, primary visual weight `50-70%`, shared panel-level filter, shared legend/unit, linked interaction, detail-preview limit, responsive fallback, and parent/child states. If children have independent questions or independent full controls, split them into separate parent blocks.
- Analysis & Insight components are valid only when they explain a concrete decision point: conclusion, insight, anomaly, attribution, impact factor, comparison, trend interpretation, target diagnosis, recommendation, risk, definition, data quality, forecast, annotation, state, or task. They require `analysisInsightContract` and cannot be generic narrative copy. If the component cannot show evidence, action/trust, source/freshness, or an insufficient-data state, it is decorative.
- Ranking charts require stable dimension IDs and a deterministic sort rule.
- Funnel charts require ordered stages, shared population or documented cohort logic, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, and exact tooltip/detail. Use funnel only for stage retention/conversion/loss questions; use bar/table for unordered stage comparison, line for trend, path for explicit movement paths, and Sankey for multi-branch source-target flows.
- Waterfall charts require additive contribution logic. Non-additive drivers need contribution bars, driver tables, decomposition trees, or narrative explanation.
- Pie/donut charts are not the default. Use only for very small part-to-whole composition with clear labels.
- Sankey diagrams are valid only for source-to-target flow, allocation, transfer, conversion, loss, or many-stage distribution tasks. Require node schema, directed links with `source`/`target`/`value`, layer/stage order, metric unit, Top N/`其他`, node/link density limits, flow-width semantics, legend/filter separation, exact node/link tooltip/detail, and fallback to table/path/funnel/bar when there is no real flow, only ranking/composition, negative values, or dense all-link clutter.
- Treemap/rectangular tree maps are valid only for hierarchical composition and scale/share reading with a non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, and exact path/value/share tooltip. Use tree for expand/collapse hierarchy and bar/table for precise ranking or negative values.
- Sunburst charts are valid only for hierarchy path plus composition share with a non-negative additive angle metric, visible depth/ring budget, Top N/`其他`, sector label thresholds, center content, breadcrumb/drilldown, and exact full-path/value/total-share/parent-share tooltip. Use Treemap for area-size comparison, tree for expansion context, and bar/table for precise ranking, trend, negative values, or single-level composition.
- Parallel coordinates are valid only for multi-metric object profiles with `3+` metric dimensions. Require object/sample id, `3-12` ordered dimension fields, axis unit/range/direction, independent or standardized scale, sample-density opacity/sampling, Top/anomaly/selected highlight, exact object tooltip/detail, and fallback to table, scatter, bar, filtering, or horizontal scroll when dimensions/samples exceed readability.
- Maps are valid only when geography itself matters.
- Gauges are valid only for a single bounded progress/status metric with min/max range, unit, current value, target/threshold/status semantics when present, and exact tooltip/detail. Use KPI/progress bar when only the number matters, bar/table for multi-object comparison, line for trend, and table/detail for exact audit.
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
- Use Pivot Table only when the business question is a multidimensional aggregated cross-summary. It must include row dimensions, column dimensions, measures, aggregation functions/formulas, subtotal/grand-total rules, density fallback, and drilldown/tooltip evidence; raw records stay in Detail Tables.

## Adaptive Rules

- Infer business purpose from verbs such as "看整体", "为什么", "查明细", "谁好谁差", "汇报", "异常", "执行", "核对", "流失", "转化", "达成", "偏差".
- Start with fewer, stronger blocks rather than a crowded page.
- Mark assumptions and list the minimum missing fields needed to finalize.
- If a component choice depends on data shape, state the condition clearly. Example: "有阶段顺序时用漏斗, 否则用结构柱状图".
