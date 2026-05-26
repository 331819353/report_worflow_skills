---
name: report-info-component-mapping
description: "Map structured report information into content blocks, components, charts, tables, interactions, mock data needs, filter needs, and applicable report-design skills. Use after extracting a report's theme, core business concerns, metrics, dimensions, objects, conclusions, risks, tasks, evidence, or data-trust needs, especially when deciding what each piece of information should become on a business dashboard or report page. This skill bridges report requirement extraction, the eight report-type design skills, mock data design, filter data design, data interaction design, visual layout guidance, and component style guidance."
---

# Report Info Component Mapping

## Core Positioning

Use this as the middle-layer mapping skill for report design.

It answers:

- 这类信息应该放在哪个内容区块。
- 应该用 KPI 卡、文本总结、表格、趋势图、瀑布图、看板、抽屉还是其他组件表达。
- 哪些交互是必要的，哪些只是装饰。
- 这组信息更接近八大类中的哪类报表。
- 组件如何与视觉布局和组件样式规范衔接。

Do not treat this as a new report type. It is a reusable mapping layer between business information and UI realization.

## Mapping Workflow

For every report requirement or extracted information set, map in this order:

1. Normalize information items.
   Split the input into theme, question, scope, metric, baseline, dimension, object, conclusion, risk, task, evidence, rule, and source.

2. Classify semantic role.
   Identify whether each item is for status judgment, target comparison, variance, trend, structure, ranking, cause, detail lookup, anomaly, action, evidence, or data trust.

3. Choose content block.
   Put each item into a page block such as header, filter, summary, KPI, target/variance, trend, structure, decomposition, ranking, alert, detail, task, evidence, or data trust.

4. Choose component by cognitive task.
   Select the simplest component that helps the user complete the task. Prefer cards, tables, and clear charts over decorative visuals.

5. Define interaction.
   Decide whether the item needs filtering, drilldown, tooltip, drawer, jump, export, fullscreen, refresh, batch action, or approval.

6. Route to report type skills.
   Identify the primary and secondary report category skills that should govern business logic.

7. Identify data, filter, and interaction needs.
   Use `report-mock-data-design` for synthetic data and validation. Use `report-filter-data-design` for filter option data, defaults, cascades, permissions, and query behavior. Use `report-data-interaction-design` for drilldowns, drawers, jumps, parameter passing, and state preservation.

8. Apply visual and component constraints.
   Use `report-visual-layout-design` for page shell and grid placement. Use `report-component-style-design` for component fit, hierarchy, typography, color, and overflow behavior.

## Information To Component Mapping

Use this table as the default mapping baseline.

| Information type | Recommended block | Recommended components |
| --- | --- | --- |
| 报表主题 / 标题 | Page header | Title, subtitle, business scope, period, status badge |
| 核心问题 | Executive summary | Question statement, conclusion card, decision prompt |
| 时间 / 组织 / 范围 | Filter block / header meta | Date picker, org selector, active filter chips |
| 核心结论 | Executive summary | Text summary card, key finding list, conclusion strip |
| 核心 KPI | KPI block | KPI card, metric card, sparkline card |
| 实际 vs 目标 / 预算 | Target/variance block | Bullet chart, progress bar, target card, comparison card |
| 差异额 / 差异率 | Target/variance block | Variance bar, comparison bar, waterfall when attribution is needed |
| 同比 / 环比 / 趋势 | Trend block | Line chart, area chart, small multiple, sparkline |
| 区域 / 组织 / 产品结构 | Structure block | Bar chart, heatmap, matrix table, treemap, map when geography matters |
| 排名 / Top Bottom | Ranking block | Horizontal bar chart, ranking table, Top/Bottom switch |
| 评分 / 分层 / 等级 | Evaluation block | Scorecard, tier distribution, heat matrix, benchmark chart |
| 原因 / 驱动因素 | Decomposition block | Waterfall chart, decomposition tree, driver tree, contribution bar |
| 流程 / 转化 / 漏斗 | Decomposition or process block | Funnel chart, stage bar, process step chart; do not create a separate report type |
| 明细记录 | Detail block | Data table, list, row drawer, export action |
| 异常 / 风险 / 预警 | Alert block | Alert card, severity badge, warning list, SLA table |
| 任务 / 整改 / 跟进 | Task/action block | Task card, task table, Kanban, Gantt, progress stepper |
| 证据 / 附件 / 来源 | Evidence block | Evidence drawer, source list, attachment list, linked records |
| 口径 / 公式 / 规则 | Tooltip or definition block | Help icon, popover, rule drawer, formula note |
| 数据差异 / 可信度 | Data trust block | Side-by-side comparison table, diff table, lineage graph, log table |
| 导出 / 下载 / 刷新 / 全屏 | Header actions or component toolbar | Icon buttons with tooltips, menu actions |

## Cognitive Task Mapping

Choose components by what the user needs to do:

- Judge current status: KPI card, health badge, target card, bullet chart.
- Compare two or more values: comparison bar, grouped bar, side-by-side table.
- Rank objects: horizontal bar chart, ranking table, Top/Bottom list.
- See time movement: line chart, area chart, sparkline, annotated trend.
- Locate risky or important objects: heatmap, matrix, map, Top N list, alert table.
- Explain why: waterfall, decomposition tree, funnel/process chart, contribution analysis.
- Inspect exact records: table, drawer, source link, export.
- Execute actions: task card, Kanban, workflow stepper, operation buttons.
- Prove data correctness: source comparison, lineage, version list, operation log.
- Present a story: conclusion cards, chapter blocks, timeline, action plan table.

## Component Selection Rules

Use the simplest component that preserves meaning.

- If exact values and many fields matter, use a table before a chart.
- If the user only needs a judgment, use a KPI card or status card before a complex chart.
- If target comparison matters, prefer bullet charts or progress cards over plain pies.
- If contribution or attribution matters, prefer waterfall, decomposition tree, or contribution bars.
- If there are many categories, show Top N plus "others" and provide table fallback.
- If a graph is naturally large, such as lineage, DuPont, decomposition, or process network, treat the block as a viewport with zoom, pan, reset, and fullscreen.
- Avoid using multiple chart types for the same message unless they answer different questions.
- Do not use decorative charts that reduce readability or hide labels.

## Report Type Routing

Map information patterns to the eight report-design skills:

- 状态总览型: current status, health judgment, target progress, variance, trend, structure, risk entry.
- 分析诊断型: phenomenon, driver, cause, attribution, decomposition, evidence, recommendation.
- 明细查询型: records, fields, filters, sorting, export, row detail, source object.
- 绩效评估型: target completion, score, rank, tier, benchmark, fairness, improvement gap.
- 汇报复盘型: period story, conclusion, major change, reason, risk, next action, export to PPT/PDF.
- 异常监控型: rule breach, severity, affected object, owner, SLA, handling status.
- 运营执行型: task, owner, deadline, progress, blocker, evidence, acceptance, closure.
- 核对追溯型: source,口径, version, matching result, difference, lineage, correction, audit log.

When one page mixes multiple intents, choose one primary type for page logic and use secondary types only for local blocks.

## Interaction Mapping

Add interactions only when they support the user's workflow:

- Filters: period, organization, business unit, object type, status, severity, owner.
- Tooltip/popover: metric definition, formula, threshold, scoring rule,口径, update time.
- Drilldown: organization hierarchy, metric decomposition, process stage, anomaly type, task hierarchy, data lineage.
- Drawer: KPI explanation, diagnosis evidence, row detail, anomaly handling, task progress, difference detail.
- Jump: source system, diagnostic report, detail query, task page, reconciliation page, recap page.
- Export/download: detail table, evidence list, recap material, reconciliation result.
- Refresh: live monitoring, anomaly handling, task status, data synchronization.
- Fullscreen: dense tables, large decomposition trees, lineage graphs, maps, Gantt charts.
- Batch actions: export, assign, close, confirm, approve, remind, merge.

For detailed interaction mechanics, apply `report-data-interaction-design`.

## Data And Filter Coordination

After mapping components, identify the data each component needs:

- KPI cards need actual, baseline, gap, direction, unit, and period.
- Target/variance blocks need target, budget, plan, actual, completion, and time progress.
- Trends need consistent time grain and comparison periods.
- Structure and ranking blocks need stable dimension IDs and rollup rules.
- Detail blocks need row-level records and stable object IDs.
- Alert blocks need rule, threshold, severity, owner, SLA, and status.
- Task blocks need source, owner, deadline, progress, evidence, and closure state.
- Reconciliation blocks need source-system values, difference fields, versions, and audit logs.

Use `report-mock-data-design` when this data must be synthesized for prototypes or demos. Use `report-filter-data-design` when the data must drive filters, option lists, defaults, cascades, or permission scopes.

## Layout Coordination

After choosing components, coordinate with visual layout:

- Put high-level judgment before detailed evidence unless the report type is detail query.
- Use the 8*N grid from `report-visual-layout-design`; every component must occupy a rectangular group of blocks.
- Allocate larger spans to charts with long labels, dense legends, many categories, or horizontal comparisons.
- Do not force KPI cards, text summaries, charts, and tables into equal sizes if their content density differs.
- Give tables, decomposition trees, lineage graphs, maps, and Gantt charts dedicated scroll/fullscreen behavior.
- Keep action-heavy components close to the objects they act on.

## Component Style Coordination

After mapping, apply `report-component-style-design`:

- Titles must be clear, compact, and consistently positioned.
- Text, labels, legends, and values must not overlap, truncate critical meaning, or use colors that are too light.
- Components should be horizontally and vertically balanced inside their allocated block.
- Values should scale within sensible bounds, not with viewport width alone.
- Long labels need wrapping, abbreviation plus tooltip, or a larger block.
- Complex diagrams should use zoom and drag instead of overflowing the page.
- All components on the same page should share radius, border, shadow, typography, status colors, and interaction states.

## Output Format

When this skill is used, produce a structured mapping:

1. Report theme and primary question.
2. Information inventory.
3. Semantic role classification.
4. Content block mapping.
5. Component and chart mapping.
6. Interaction mapping.
7. Report type routing.
8. Mock data, filter data, and state needs.
9. Layout and style constraints.
10. Missing information or assumptions.

For implementation tasks, also include component priority: must-have, should-have, optional.

## Adaptive Rules

If the requirement is vague:

- Infer the likely business purpose from verbs such as "看整体", "为什么", "查明细", "谁好谁差", "汇报", "异常", "执行", "核对".
- Start with fewer, stronger blocks rather than a crowded page.
- Prefer reusable blocks that can survive data changes.
- Mark assumptions and list the minimum missing fields needed to finalize.

If the screenshot or existing page has overlap, clipping, or crowding:

- Re-map the overloaded component into multiple blocks.
- Replace dense charts with table plus drawer when precision matters.
- Increase grid span or move secondary information into drawer/tooltips.
- Add internal scroll/fullscreen only for naturally dense components.
- Reduce simultaneous labels and show detail on hover or selection.

## Quality Checklist

Before finalizing a mapping, verify:

- Every key business concern maps to at least one visible block or interaction.
- Every component has a clear user task.
- There is no chart chosen only for decoration.
- Exact-value tasks have table/card support.
- Cause-analysis tasks have decomposition support.
- Action tasks have owner, deadline, status, and operation entry.
- Data-trust tasks have source, version, difference, and audit evidence.
- Dense components have overflow, zoom, drawer, or fullscreen strategy.
- The mapping can be implemented within the 8*N rectangular grid.
