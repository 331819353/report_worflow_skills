# 02 Business Bundle Patterns

Use this reference when a business question needs a coordinated component bundle instead of a single component.

## 1. Situation Overview

Use when the question is "整体情况如何".

- Must-have: KPI group, status/health judgment, trend or target comparison.
- Should-have: structure breakdown, Top N risk/opportunity list.
- Optional: detail drawer, export.
- Avoid: too many equal-weight charts without a clear conclusion.

## 2. Personnel Attrition

Use when the question is "人员流失情况如何, 为什么, 怎么处理".

- Must-have: attrition KPI cards, trend chart, department/job/rank distribution, detail table.
- Should-have: exit reason contribution, high-risk group ranking, replacement or retention task block.
- Optional: funnel only if there is a real ordered HR process stage; otherwise use structure bars or reason contribution.
- Key datasets: `dim_employee`, `dim_org`, `fact_attrition_monthly`, `fact_exit_record`, `fact_retention_task`.
- Key fields: employee_id, employee_name, org_id, job_family, job_level, tenure_band, performance_level, leave_date, leave_type, leave_reason, risk_level, replacement_status, owner, action_status.
- Hard rule: do not use a funnel for simple category composition such as "离职原因占比"; use bar/treemap/table instead.

## 3. Target Completion

Use when the question is "目标达成如何".

- Must-have: actual/target KPI, completion rate, gap, time progress.
- Should-have: trend versus plan, org/product/customer breakdown, gap ranking.
- Optional: task block for underperforming objects.
- Key datasets: target snapshot, actual fact, dimension breakdown, improvement tasks.
- Hard rule: completion progress needs denominator, time progress, and target definition; otherwise label as partial evidence.

## 4. Variance Diagnosis

Use when the question is "为什么变好/变差/偏离预算".

- Must-have: variance KPI, waterfall or contribution bar, driver ranking.
- Should-have: dimension drilldown, evidence drawer/detail table.
- Optional: recommended actions.
- Key datasets: current/baseline facts, additive driver facts, evidence records.
- Hard rule: waterfall requires additive contribution logic. If drivers are not additive, use driver table or correlation/scatter with explanation.

## 5. Process Conversion

Use when the question is "流程漏在哪一步".

- Must-have: ordered stage chart, conversion/drop-off rate, stage detail.
- Should-have: stage owner/status, trend by stage.
- Optional: bottleneck task block.
- Key datasets: stage dimension, cohort facts, stage record details.
- Hard rule: funnel requires ordered stages and stage counts from the same cohort or clearly defined population.

## 6. Anomaly Monitoring

Use when the question is "有没有异常, 谁受影响, 谁处理".

- Must-have: alert pressure cards, severity distribution, alert list/table, owner/SLA state.
- Should-have: recurrence trend, affected object ranking, handling drawer.
- Optional: batch assign/close/remind actions.
- Key datasets: alert rules, alert facts, handling logs, owner dimension.
- Hard rule: every alert component must expose rule, threshold, severity, owner, status, and latest update time.

## 7. Reconciliation And Traceability

Use when the question is "数据是否一致, 差异来自哪里".

- Must-have: reconciliation result KPI, source comparison/diff table, difference ranking.
- Should-have: lineage/source drawer, version and口径 explanation, audit log.
- Optional: correction task.
- Key datasets: source A facts, source B facts, match result facts, lineage nodes, audit logs.
- Hard rule: exact-value proof needs row count, matched/unmatched count, source version, and exportable details.

## 8. Execution Follow-Up

Use when the question is "问题是否被处理闭环".

- Must-have: task overview, owner/deadline/status, task list/table.
- Should-have: progress trend, blocker/risk list, evidence drawer.
- Optional: Kanban/Gantt when timeline and workload matter.
- Key datasets: task facts, evidence records, status logs, effect metrics.
- Hard rule: action components must include owner, due date, status, operation entry, and closure evidence.

## 9. Industry Business Analysis

Use when the question is "产业经营情况如何, 是否跑赢行业/对手, 问题和机会在哪里".

- Must-have: industry benchmark KPI group, competitor comparison, self-performance cards, key gap ranking, opportunity/risk list.
- Should-have: market share trend, price-band/product/channel structure, domestic/overseas split, profitability and operating-quality diagnosis.
- Optional: model/SKU detail table, competitor drawer, opportunity task block.
- Key datasets: `dim_industry`, `dim_competitor`, `dim_product`, `dim_channel`, `fact_market_benchmark`, `fact_self_operation`, `fact_competitor_compare`, `fact_opportunity_risk`.
- Key fields: period, industry_id, competitor_id, product_line_id, channel_id, region_type, sales_amount, profit_amount, margin_rate, market_share, share_gap, growth_rate, price_band, opportunity_level, risk_level.
- Hard rule: do not make industry analysis a news/profile page. It must connect industry benchmark, competitor benchmark, self result, business gap, and decision/action entry.

## 10. Regional Business Analysis

Use when the question is "区域经营是否健康, 问题落在哪些国家/组织/品牌/客户, 如何改善".

- Must-have: regional health KPI group, profitability/target gap, country or organization ranking, problem-location matrix, risk/opportunity list.
- Should-have: revenue/profit/expense diagnosis, DSO/DIO or receivable/inventory quality, brand/customer/product drilldown, owner/action list.
- Optional: map only when geography itself matters; otherwise use ranking, matrix, or table.
- Key datasets: `dim_region`, `dim_country`, `dim_org`, `dim_brand`, `dim_customer`, `fact_regional_operation`, `fact_receivable_inventory`, `fact_regional_issue`, `fact_regional_action`.
- Key fields: period, region_id, country_id, org_id, brand_id, customer_id, revenue_amount, profit_amount, expense_amount, margin_rate, target_amount, completion_rate, dso_days, dio_days, issue_type, owner_id, action_status.
- Hard rule: do not reduce regional analysis to a map or simple ranking. It must connect regional health, profitability or operating quality, problem location, evidence, and improvement action.
