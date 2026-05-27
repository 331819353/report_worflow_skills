---
name: report-requirement-structure-extraction
description: "Extract, structure, classify, and normalize business report requirements before design. Use when the task asks to analyze a report idea, screenshot, rough description, meeting request, business scenario, existing dashboard, metric list, or user story and identify the report theme, report type, target users, core questions, business objects, key concerns, metric system, dimensions, content blocks, interactions, data needs, visual strategy, and which report-design skills should be applied next. This is a high-availability, adaptive pre-design skill that turns vague or partial report inputs into stable design inputs for the eight report categories plus information mapping, mock data, filter data, data interaction, visual layout, and component style skills."
---

# Report Requirement Structure Extraction

## Core Positioning

Treat this as the front-door skill for report design. It extracts the report's information architecture and design inputs before choosing layout, charts, components, or detailed interactions.

This skill answers:

- 这张报表的主题是什么。
- 它属于八大类中的哪一类，是否是多类型组合。
- 用户真正想回答什么问题。
- 应该拆成哪些内容区块。
- 关键业务关注点、指标、维度和对象是什么。
- 哪些交互、视觉布局和组件规范应该被后续调用。

Do not jump directly to page design. First turn the input into a clear report design brief.

## Input Adaptation

Accept incomplete inputs and infer cautiously.

Supported input forms:

- One-sentence report idea.
- Long business description.
- Existing report screenshot or page description.
- Metric list or data table fields.
- Meeting/reporting requirement.
- Business pain point.
- User role and task.
- Existing dashboard that needs redesign.
- Mixed Chinese/English terms.

When information is missing:

- Infer from context when safe.
- Mark assumptions explicitly.
- List missing information that affects design.
- Avoid blocking unless the missing information changes the report type or core purpose.

## Extraction Workflow

Use this sequence for every report requirement:

1. Identify the report theme.
   Write one sentence that describes what the report is about and what business situation it observes.

2. Identify target users and use scenario.
   Determine who uses it, when, in what meeting/workflow, and what decision or action follows.

3. Extract the core question.
   Convert vague goals into one or more questions the report must answer.

4. Classify report type.
   Map to one primary report category and optional secondary categories. Use the eight report types as the taxonomy.

5. Identify business objects.
   Extract what entities the report observes: group, region, subsidiary, department, person, project, store, product, customer, channel, contract, order, task, exception, document, data source, metric, or process.

6. Extract key business concerns.
   Identify concerns such as result, target, variance, trend, cause, risk, execution, detail lookup, fairness, data trust, evidence, or action.

7. Build the metric and dimension model.
   Separate core metrics, supporting metrics, derived metrics, status metrics, dimensions, hierarchies, and baselines.

8. Propose content blocks.
   Convert the information into page blocks such as summary, filters, KPI cards, decomposition, trend, distribution, table, alert list, task board, evidence chain, action plan, or conclusion.

9. Identify interactions.
   Extract required filters, drilldowns, popovers, drawers, jumps, exports, refresh, fullscreen, tasks, approvals, or source tracing.

10. Route to design skills.
   Recommend which report-type, information mapping, mock data, filter data, data interaction, visual layout, and component style skills should be used next.

## Report Type Classification

Use these definitions:

- 状态总览型: answers current overall status, health, target attainment, deviation, and priority risks.
- 分析诊断型: explains why a metric improved, worsened, or deviated.
- 明细查询型: helps users find, filter, inspect, export, and trace records.
- 绩效评估型: evaluates objects against targets, scoring rules, rankings, fairness, and improvement gaps.
- 汇报复盘型: tells a period story: result, change, reason, risk, and next action.
- 异常监控型: detects anomalies, severity, affected objects, owner, SLA, and handling status.
- 运营执行型: turns conclusions/problems into tasks, tracks progress, evidence, acceptance, and closure.
- 核对追溯型: verifies data correctness, differences, source, lineage, version, and correction/confirmation.

Classification rules:

- Pick one primary type based on the report's main user intent.
- Add secondary types only when they change content or interaction design.
- Do not create new report types for charts, funnels, maps, or tables; treat them as views/components.
- If the input says "why", prefer 分析诊断型.
- If it says "which records", prefer 明细查询型.
- If it says "who did well", prefer 绩效评估型.
- If it says "what happened this period and next", prefer 汇报复盘型.
- If it says "is there an anomaly", prefer 异常监控型.
- If it says "who handles it and progress", prefer 运营执行型.
- If it says "is the data right", prefer 核对追溯型.
- If it says "overall situation", prefer 状态总览型.

## Business Concern Extraction

Extract concerns into reusable categories:

- Result: revenue, profit, cost, completion, delivery, service, quality, collection, inventory.
- Target: budget, plan, target, quota, SLA, threshold, benchmark.
- Deviation: gap amount, gap rate, time-progress gap, over/under target.
- Trend: YoY, MoM, rolling trend, period change, abnormal turning point.
- Cause: formula decomposition, dimension attribution, process step, structure shift, event.
- Structure: region, organization, product, customer, channel, project, owner, process.
- Risk: anomaly, overdue, red/yellow/green, threshold breach, recurrence, severity.
- Detail: records, documents, line items, transactions, source objects, logs.
- Performance: score, rank, tier, fairness, peer group, stability.
- Execution: task, owner, deadline, progress, blocker, evidence, acceptance.
- Trust: source,口径, version, matching rule, difference, lineage, correction.
- Action: next step, owner, deadline, expected result, jump target.

## Content Block Model

Use these blocks as building material. Choose only what supports the report purpose:

- Page header: title, subtitle, period, scope, data status, primary actions.
- Filter block: high-frequency filters, advanced filters, active filter chips.
- Executive summary: key conclusion, health judgment, or management statement.
- KPI block: 4-8 core metrics or status cards.
- Target/variance block: actual vs target/budget/plan, completion, gap, progress.
- Trend block: time change and turning points.
- Structure block: organization, region, product, customer, channel, project, owner, process.
- Decomposition block: formula, driver tree, waterfall, contribution, funnel/process.
- Ranking/evaluation block: score, rank, tier, benchmark, peer comparison.
- Alert block: severity, anomaly count, alert list, SLA.
- Detail block: table/list, record fields, row drawer, export.
- Evidence block: source, diagnosis basis, related records, attachments, lineage.
- Task/action block: owner, deadline, status, progress, acceptance, next action.
- Review narrative block: result, changes, causes, risks, actions.
- Data trust block: matching result, differences, versions, source comparison, logs.
- Footer/meta block: data source,口径, version, owner, confidentiality.

## Key Business Object Extraction

Identify the main object and secondary objects:

- Organization object: group, region, subsidiary, department, team, person.
- Business object: project, store, product, SKU, customer, supplier, channel.
- Transaction object: contract, order, invoice, payment, expense, budget item, document.
- Process object: lead, opportunity, delivery, approval, complaint, inspection, task.
- Risk object: anomaly, overdue item, exception, warning, risk event.
- Data object: source system, table, metric, field, version, lineage node.

For each object, extract:

- Grain: what one row/card/node represents.
- Hierarchy: how it rolls up or drills down.
- Owner: who is responsible.
- Status: state, risk, progress, or validity.
- Link: related details, source, task, or evidence.

## Metric And Dimension Extraction

For metrics, capture:

- Metric name.
- Business meaning.
- Actual value.
- Baseline: target, budget, plan, threshold, historical period, benchmark.
- Derived fields: completion rate, gap, variance rate, contribution, score, risk level.
- Direction: higher is better, lower is better, range is best, threshold breach.
- Unit and precision.
- Refresh cadence and data source when known.

For dimensions, capture:

- Organization hierarchy.
- Time granularity.
- Product/project/customer/channel/store/owner.
- Status/type/category.
- Process stage.
- Source system or version.

## Interaction Extraction

Extract interactions by intent:

- Scope control: filters, search, saved views.
- Exploration: drilldown, tab switch, chart/table switch, Top/Bottom.
- Explanation: tooltip, popover, formula,口径, rule explanation.
- Evidence: drawer, row detail, source link, attachment, lineage.
- Action: assign, handle, approve, close, export, subscribe, refresh.
- Navigation: jump to status overview, diagnosis, detail query, anomaly monitoring, execution, reconciliation, recap.
- Presentation: fullscreen, share, PDF/PPT export, version comparison.

Only include interactions that support the report goal. Avoid adding interaction because it is fashionable.

## Skill Routing

After extraction, recommend next skills:

- Use `status-overview-report-design` when the primary question is current health/status.
- Use `analysis-diagnostic-report-design` when the primary question is cause/why.
- Use `detail-query-report-design` when the user needs records.
- Use `performance-evaluation-report-design` when the user evaluates objects.
- Use `review-recap-report-design` when the report supports meetings/recap.
- Use `anomaly-monitoring-report-design` when the report detects and handles alerts.
- Use `operational-execution-report-design` when the report manages tasks/actions.
- Use `reconciliation-traceability-report-design` when the report verifies data trust.
- Use `report-design-workflow` when the user wants a report prototype, runnable page, screenshot-to-prototype repair, implementation-ready spec, mock-data-backed demo, template-backed build, automatic deployment, or returned preview URL rather than only conceptual design.
- Use `report-info-component-mapping` when extracted information needs to be mapped to blocks, components, charts, tables, and interactions.
- Use `report-mock-data-design` when the report needs demo data, synthetic records, KPI values, trends, targets, alerts, tasks, or reconciliation differences.
- Use `report-filter-data-design` when filters, filter option data, defaults, cascades, query state, or permission-scoped filter behavior must be designed.
- Use `report-data-interaction-design` when drilldown, cross-filtering, popovers, drawers, jumps, parameter passing, breadcrumbs, or state preservation must be designed.
- Use `report-visual-layout-design` for page shell, grid, logo, and layout.
- Use `report-component-style-design` for component-level readability, fit, and style.
- Preserve the prototype block-height rule in extracted layout risks for scrollable page templates: every resolved block is at least 220px tall, and grids taller than 1080px scroll vertically. Fixed sci-fi/big-screen templates are exempt.

If multiple report-type skills apply, name the primary type and secondary roles. Do not blur the primary purpose.

## Output Format

When extracting a report requirement, return this structure:

1. 报表主题: one sentence.
2. 类型判断: primary report type and secondary types, with reason.
3. 用户与场景: target users, usage moment, decision/action.
4. 核心问题: 3-5 questions the report must answer.
5. 业务对象: main object, row/card/node grain, hierarchy, owner/status.
6. 关键关注点: result, target, variance, trend, cause, risk, detail, execution, trust, action.
7. 指标体系: core metrics, supporting metrics, derived metrics, baselines, direction, unit.
8. 维度体系: time, organization, business dimensions, status/type/source/version.
9. 内容区块: recommended page blocks and why each exists.
10. 交互入口: filters, drilldowns, popovers, drawers, jumps, export/refresh/fullscreen/actions.
11. 数据策略: mock data needs, row grain, formula dependencies, and validation requirements.
12. 筛选策略: main filters, advanced filters, defaults, cascades, query state, and permission scope.
13. 交互策略: drilldowns, cross-filtering, popovers, drawers, jumps, parameters, export/refresh/fullscreen/actions.
14. 视觉与组件策略: layout pattern, component rules, and fit/overflow risks.
15. 后续调用: specific design skills to use next.
16. 假设与缺口: assumptions, missing information, risks that affect design.

For very small inputs, keep output concise but preserve the same structure.

## High-Availability Rules

This skill must work even when requirements are vague.

Rules:

- Never fail just because the user provides only a short phrase.
- Produce a best-effort structure and mark assumptions.
- Prefer stable categories over over-specific invention.
- Keep extraction independent of one industry; adapt object names to the provided context.
- Separate fact from inference.
- Ask follow-up questions only when necessary for report type, user, or business object.
- If screenshots are provided, extract visible title, navigation, filters, blocks, charts, tables, labels, actions, and visible issues.
- If the screenshot has layout problems, route to visual/component skills and name the problem precisely.

## Quality Checklist

Before finalizing, verify:

- Theme is clear and not just copied from the title.
- Report type classification is justified.
- Core user questions are explicit.
- Business objects and row/card/node grain are identified.
- Key concerns are extracted, not buried in prose.
- Metrics include baseline and direction where possible.
- Dimensions include time, organization, business object, and status/source when relevant.
- Content blocks map to user questions.
- Interactions map to decisions, evidence, or actions.
- Data, filter, and interaction needs are separated from visual layout decisions.
- Recommended next skills are named.
- Assumptions and missing inputs are separated from confirmed facts.

## Avoid

- Do not jump straight to visual layout before extracting requirements.
- Do not invent a new report type when one of the eight categories fits.
- Do not treat charts as report types.
- Do not ignore users, scenarios, or decisions.
- Do not list metrics without baselines, direction, or meaning.
- Do not create too many content blocks without a clear purpose.
- Do not hide uncertainty; state assumptions and missing information.
