---
name: analysis-diagnostic-report-design
description: "Design, critique, or refine the design thinking for 分析诊断类报表 as a report category, not just one specific diagnostic dashboard. Use when the task asks how to design cause analysis reports, metric diagnosis reports, attribution analysis pages, variance diagnosis, revenue/profit/expense/margin/project/inventory/customer churn diagnosis, root-cause exploration dashboards, decomposition trees, waterfall attribution, driver analysis, or any report whose purpose is to explain why a metric improved, worsened, deviated from target, or changed abnormally. Emphasize reusable design logic: problem definition, metric decomposition, attribution path, dimension drilldown, process-chain diagnosis, evidence drawer, interaction linkage, and conclusion with action."
---

# Analysis Diagnostic Report Design

## Core Positioning

Treat 分析诊断类报表 as a report type. Design the reasoning method first, then instantiate it for a domain such as revenue, profit, expense, margin, project progress, inventory turnover, customer churn, regional performance, service quality, supply chain, or sales conversion.

This report type answers:

- 指标为什么变好了。
- 指标为什么变坏了。
- 偏离目标、预算、计划或历史水平的主要原因是什么。
- 哪些维度、环节、结构或对象贡献了变化。
- 哪些证据支持这个判断。
- 下一步应该核对、处理、复盘或改进什么。

Do not design it as a status overview page. A diagnostic report must help users complete attribution reasoning, not only observe results.

## Design Mindset

Start from "how to explain the change", not from "how to show more metrics".

Use this reasoning chain:

1. Phenomenon: define what changed, by how much, against which baseline.
2. Formula: express the target metric as a decomposable model.
3. Drivers: identify factors that pull the metric up or down.
4. Attribution: quantify each factor's contribution where possible.
5. Dimension: locate which region, product, customer, project, channel, owner, account, or organization caused the change.
6. Process: locate which business step caused the change when the metric belongs to a process.
7. Evidence: provide records, lists, trends, comparison, samples, or linked details that support the diagnosis.
8. Conclusion: state phenomenon, cause, affected object, and recommended action.

If the metric cannot be decomposed, first ask or infer the closest business formula, process chain, or contribution model.

## Universal Design Workflow

1. Define the diagnostic question.
   Write the question as "why did X change/deviate". Include metric, period, scope, baseline, and change size.

2. Choose the decomposition model.
   Use a business formula, financial structure, process funnel, cost account tree, object contribution model, or statistical driver model. Keep the model explainable to business users.

3. Separate driver types.
   Classify causes into metric drivers, dimension drivers, process drivers, structure drivers, contribution drivers, and abnormal-event drivers.

4. Quantify contribution.
   Show which factors explain most of the increase or decrease. Use contribution amount, contribution rate, variance amount, variance rate, or impact percentage.

5. Locate the problem object.
   Break down by actionable management dimensions such as organization, region, subsidiary, store, product, customer, channel, project, contract, account, process step, or owner.

6. Build an evidence chain.
   Provide enough supporting evidence in the current page or drawer so users can trust the diagnosis without immediately jumping away.

7. Keep jumps for confirmation and action.
   Jump to detail query, reconciliation, execution, exception handling, or review reports only after the main reasoning path is clear.

8. Write a diagnostic conclusion.
   Use the structure "phenomenon -> cause -> affected object -> suggested action".

## Diagnostic Models

Select the model that matches the metric. Adapt the examples instead of copying them as universal rules.

- Formula decomposition: break a metric into mathematical drivers.
  Example: revenue = customers x conversion rate x average order value x repurchase frequency.

- Financial decomposition: break result into financial components.
  Example: profit = revenue - cost - expense - tax.

- Variance decomposition: break a gap into account, object, or activity differences.
  Example: expense variance = labor variance + marketing variance + rent variance + logistics variance + management variance.

- Funnel/process decomposition: break outcome by business flow.
  Example: leads -> opportunities -> quotes -> deals -> delivery -> payment -> repurchase.

- Structure decomposition: explain change by mix shift.
  Example: high-margin business share decreased, low-price product share increased, or large-customer share changed.

- Contribution decomposition: rank objects by their contribution to increase or decrease.
  Example: top regions, products, customers, projects, or channels explaining 80% of the decline.

- Abnormal-event diagnosis: determine whether change is driven by one-off events.
  Example: one large customer churned, one major project delayed, one special campaign inflated cost, or one data exception distorted the metric.

## Process/Funnel Absorption

Treat process/funnel analysis as one diagnostic model, not as a separate report type. Use it when the metric change can be explained by stage movement, conversion loss, backlog, cycle time, or handoff failure.

Typical diagnostic questions:

- Which stage caused the overall result to change.
- Which stage conversion rate dropped.
- Which stage has abnormal backlog or long dwell time.
- Which object type, region, owner, or channel caused stage loss.
- Whether the problem is stage quantity, conversion quality, timing, or downstream closure.

Use funnel charts to locate stage loss, then use dimension drilldown, detail evidence, and drawers to explain why the loss happened.

## Layout Pattern

Use a "problem -> decomposition -> location -> evidence -> conclusion" layout. Adapt the number of layers to the scenario.

1. Problem Definition Layer
   State the diagnostic object clearly: metric, period, scope, baseline, change amount, and severity. Avoid throwing users into charts before the problem is named.

2. Core Decomposition Layer
   Show the formula, driver tree, account tree, funnel, or waterfall that explains how the result changed. The viewer should see which factors pulled the result up or down.

3. Dimension Drilldown Layer
   Break the issue by management dimensions: region, business unit, subsidiary, store, project, product, customer, channel, account, owner, or contract.

4. Process Chain Layer
   When the metric belongs to an operational process, show the step where the issue occurs, such as acquisition, conversion, fulfillment, delivery, acceptance, payment, or retention.

5. Evidence Layer
   Show top affected objects, related trends, exception records, sample details, linked documents, transactions, tasks, or historical comparisons.

6. Conclusion And Recommendation Layer
   Summarize the diagnosis and suggest the next action: verify, monitor, assign task, optimize process, adjust strategy, review pricing, control cost, or initiate remediation.

## Chart Selection Logic

- Use waterfall charts to explain how a result moved from A to B.
- Use decomposition trees or metric trees to show factor hierarchy and drillable drivers.
- Use Pareto charts or Top N bars to rank the biggest contributors.
- Use bar charts or matrix tables for dimension comparison.
- Use funnel charts for process conversion and stage loss.
- Use stacked bars, treemaps, or mix charts for structure changes.
- Use multi-line charts for trend comparison across drivers or objects.
- Use scatter or bubble charts for correlation, clustering, and outlier detection.
- Use detail tables for evidence validation and record-level confirmation.

Choose charts according to the reasoning task: explain change, locate contributor, compare dimensions, inspect process, verify evidence, or expose outliers.

## Interaction Design Logic

Analysis diagnostic reports need strong drilldown and linkage, but the drilldown must follow the diagnostic logic.

- Metric drilldown follows the indicator formula or metric tree.
  Example: profit -> revenue -> cost -> expense -> margin.

- Organization drilldown follows the management hierarchy.
  Example: group -> region -> subsidiary -> store/project.

- Process drilldown follows the business flow.
  Example: lead -> opportunity -> contract -> delivery -> payment.

- Account drilldown follows financial or cost account structure.
  Example: expense -> labor -> marketing -> travel -> logistics.

- Object drilldown follows evidence granularity.
  Example: region -> customer -> project -> contract -> document.

Use popovers for explanatory information: formula, attribution rule, weight, contribution algorithm, anomaly rule, sample size, current dimension share, and update time.

Use right drawers for evidence: affected object list, Top N factors, related trends, related exceptions, documents, tasks, historical comparison, and entry buttons such as 查看明细, 查看核对, 发起整改, 加入复盘.

Use jumps when diagnosis has reached the point of confirmation or action: detail query, project detail, regional performance, reconciliation trace, exception handling, operational execution, or review report.

Aim for the current page to complete the main reasoning path. A useful rule is: complete about 70% of the diagnosis in the diagnostic report, use drawers for evidence, and use jumps for records, processing, or source verification.

## Output Format

When asked to design this report type or create a design proposal, prioritize the diagnostic thinking. Use this structure:

1. 设计定位: define the diagnostic question, audience, metric, scope, and baseline.
2. 诊断思路: explain the attribution path from phenomenon to cause.
3. 拆解模型: provide the metric formula, driver tree, process chain, account tree, or contribution model.
4. 布局框架: describe the problem, decomposition, drilldown, evidence, and conclusion layers.
5. 图表选择: map each visual to the reasoning question it answers.
6. 交互设计: describe metric drilldown, dimension drilldown, linkage, popovers, drawers, and jumps.
7. 诊断结论: write the conclusion as phenomenon -> cause -> affected object -> recommended action.
8. 校验清单: list assumptions, data dependencies, attribution limitations, sample-size risks, and places requiring source verification.

If the user provides one concrete report example, explicitly abstract it into general diagnostic rules before applying it back to that example.

## Conclusion Pattern

Always produce a clear diagnosis when enough information is available:

现象: what changed, how much, compared with what.
原因: which driver(s) explain the change.
影响对象: which region, product, customer, project, account, channel, or process step contributed most.
建议动作: what to verify, optimize, control, follow up, or escalate.

Example structure:

本期[指标]较[基准]变化[幅度]，主要由[原因1]和[原因2]导致。其中[对象/维度]贡献了[比例/金额]的变化，建议优先[动作]，并进一步核对[证据/明细]。

## Quality Checklist

Before finalizing, verify:

- The report explains why a metric changed, not only that it changed.
- The diagnostic object, period, baseline, and change size are explicit.
- The metric has a decomposition model or explainable driver path.
- Contribution or impact is quantified where possible.
- Dimension and process drilldowns locate actionable objects.
- Evidence is visible before asking users to jump away.
- Popovers explain attribution methods and formulas.
- Drawers carry evidence, not a second full report.
- Jumps are reserved for details, source checks, execution, or review.
- The conclusion includes phenomenon, cause, affected object, and suggested action.

## Avoid

- Do not build a chart pile without a diagnostic path.
- Do not confuse status overview with cause diagnosis.
- Do not hard-code one domain's formula as universal.
- Do not rely only on correlation when the report claims causality.
- Do not jump users across many pages before the main reasoning is complete.
- Do not show attribution percentages without explaining the attribution rule.
- Do not bury evidence after the conclusion.
