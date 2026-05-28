---
name: industry-business-analysis-design
description: "Use when the user mentions 产业, 产业分析, 产业经营分析, 家电产业, 产业经营情况, 产业经营问题, 产业洞察, 行业对标, 对手对标, 美的对标, 国内海外产业分析, or asks for a report/prototype skill triggered by 产业. This skill turns the 产业 analysis framework into business report prototype logic covering industry benchmark, competitor benchmark, self profitability, operating quality, domestic/overseas problem diagnosis, opportunities, and risks. Trigger word: 产业."
---

# Industry Business Analysis Design

## Core Positioning

Use this as the domain skill for 产业经营情况分析. It converts the产业分析框架 into a report prototype reasoning path, especially for家电产业 or similar multi-channel, multi-brand, domestic/overseas business analysis.

This skill answers:

- 产业整体是否跑赢行业和主要对手。
- 线上、线下渠道的零售额、增速、份额是否健康。
- 自身经营的规模、效率、盈利能力和营运质量是否达标。
- 国内和海外分别有哪些经营问题，问题落在哪些客户、品牌、小V、渠道、价位段或型号上。
- 当前存在什么机会和风险，下一步应优先跟进什么。

Do not use it as a generic industry research report. This skill is for经营情况分析原型, where the page must connect benchmark, own performance, problem diagnosis, and insight/action.

## Trigger And Skill Routing

Trigger this skill whenever the user request contains `产业`, especially:

- 产业分析框架, 产业经营分析, 产业经营情况, 产业经营问题, 产业洞察.
- 家电产业经营分析, 行业/对手/自身经营对标.
- 国内产业、海外产业、小V、品牌、价位段、TOP 型号份额分析.
- 产业原型, 产业报表, 产业看板, 产业驾驶舱, 经营情况分析中的产业专题.

Use this skill before generic report-type selection. Then combine it with:

- `status-overview-report-design` for the top-level health and benchmark overview.
- `analysis-diagnostic-report-design` for revenue, profit, expense, DSO, DIO, and share-loss diagnosis.
- `anomaly-monitoring-report-design` when warning thresholds and issue lists need severity and owners.
- `report-info-component-mapping`, `report-mock-data-design`, `report-filter-data-design`, `report-data-interaction-design`, `report-visual-layout-design`, and `report-component-style-design` for implementation-ready prototype details.

## Analysis Framework

Build the prototype around four layers: 经营情况, 经营问题, 洞察, and action handoff.

### 1. 经营情况

Use a top-down sequence: 看行业 -> 看对手 -> 看自己.

看行业:

- Benchmark object: 家电行业 or the selected产业大盘.
- Core question: 零售额增速是否跑赢行业.
- Split by channel: 线上零售额增速, 线下零售额增速.
- Output: industry growth card, online/offline comparison, gap-to-industry indicator.

看对手:

- Default competitor: 美的; allow more competitors when data exists.
- Core question: 是否跑赢对手.
- Split by channel: 线上, 线下.
- Measures: 零售额/增速, 零售份额/增速.
- Output: competitor benchmark matrix, share trend, channel gap cards.

看自己:

- Profitability: 看规模 and 看效率.
- Operating quality: DSO and DIO.
- Output: own-performance metric tree with warning status, formula popovers, and drillable evidence.

### 2. 自身盈利能力

看规模:

- 收入: 销售收入, unit 亿.
- 利润: 利润 or 利润额, use the business unit's agreed unit.
- 对比指标: 完成率.
- 底线指标: 同比.

看效率:

- 毛利率: unit %.
- 费用率: unit %.
- 对比指标: 完成率.
- 底线指标: 同比.

Use a compact metric tree: 收入/利润 explain scale, 毛利率/费用率 explain efficiency. Each metric should show actual, target, completion rate, YoY, warning status, and trend.

### 3. 营运质量

DSO:

- Core metric: DSO, unit 天.
- Supporting metric: 逾期额, unit 万元.
- Compare against target and baseline.
- Warning when 比目标 > 0 or above baseline.

DIO:

- Core metric: DIO, unit 天.
- Compare against target and baseline.
- Warning when 比目标 > 0 or above baseline.

Use DSO/DIO cards plus aging or inventory structure charts. Show affected customers, overdue amount, stock category, and responsible organization in drawers.

### 4. 经营问题

Split by 国内 and 海外. Keep the logic consistent, but allow overseas to drill further to 小V and 品牌.

国内:

- 盈利能力分析: 收入分析, 利润分析, 费用分析.
- 营运质量分析: 应收分析 and 存货分析.
- 收入问题定位: 同期有收入但本期未达成, 同期有收入但本期无收入, 完成率 < 100%.
- 收入问题归因: channel, customer, product, brand, price band, region, or project.
- 利润问题: margin decline, mix shift, price decline, cost increase, low-margin business share.
- 费用问题: 费用额 and 费用率, account contribution, abnormal increase, budget overrun.
- 应收问题: DSO, 逾期额, 逾期率.
- 存货问题: DIO, slow-moving stock, inventory structure.

海外:

- Use the same analysis path as 国内.
- Required drill dimensions: 小V and 品牌.
- Income analysis: by 小V and 品牌.
- Profit analysis: 利润动因解析.
- Expense analysis: 费用额 and 费用率.
- Receivable analysis: DSO.
- Inventory analysis: DIO.

### 5. 洞察

机会:

- Find growth pockets where industry or competitor benchmark is positive and own business has room to improve.
- Prioritize channel, brand, price band, region, customer group, or model series with high potential and manageable execution difficulty.

风险:

- Detect 跑输对手.
- Analyze brand, price band, and TOP10 model share/concentration.
- Flag share loss, over-concentration, weak online/offline channel, declining gross margin, rising expense rate, high DSO, or high DIO.

The insight layer should conclude with "opportunity/risk -> affected object -> evidence -> recommended action".

## Metric Rules

Use these formulas unless the user's business definition overrides them.

| Metric | Meaning | Formula | Warning |
| --- | --- | --- | --- |
| 完成率 | actual vs target | 实际数 / 目标数 * 100% | 完成率 < 100% |
| 同比 | actual vs same period | (实际数 - 同期数) / 同期数 * 100% | 同比 < 0% |
| 比目标 | actual minus target | 实际数 - 目标数 | For DSO/DIO, 比目标 > 0 |
| 比基线 | actual minus baseline | 实际数 - 基线数 | For DSO/DIO, 比基线 > 0 |
| 零售额增速差 | own/competitor/industry growth gap | 本方增速 - 对标增速 | < 0 indicates 跑输 |
| 份额增速差 | share growth gap | 本方份额增速 - 对手份额增速 | < 0 indicates share pressure |
| 毛利率 | gross margin efficiency | 毛利额 / 收入 * 100% | Completion < 100% or YoY < 0 |
| 费用率 | expense efficiency | 费用额 / 收入 * 100% | Completion < 100% or YoY worsens |
| DSO | receivable turnover days | use finance definition from source system | Above target/baseline |
| DIO | inventory turnover days | use inventory definition from source system | Above target/baseline |

When 同期数 is zero or missing, do not fabricate YoY. Mark it as not comparable and provide a reason.

## Prototype Component Mapping

Recommended first screen for a single-page or left-nav prototype:

1. 产业经营结论条
   Show one-line conclusion: 跑赢/跑输行业, 跑赢/跑输对手, own health status, key opportunity, key risk.

2. 行业与对手对标
   Use KPI cards and grouped bars/lines for industry growth, own growth, competitor growth, online/offline growth, and share movement.

3. 自身经营健康
   Use metric cards or a metric tree for 收入, 利润, 毛利率, 费用率, DSO, DIO. Each metric must expose actual, target, completion, YoY, warning, and formula.

4. 经营问题诊断
   Use waterfall charts, contribution bars, Pareto, or S2 tables to explain revenue gap, profit gap, expense gap, receivable pressure, and inventory pressure.

5. 国内/海外 drilldown
   Use tabs or segmented controls. 国内 defaults to region/customer/channel/product. 海外 defaults to 小V/品牌/channel/product.

6. 洞察与行动
   Use opportunity/risk cards with evidence links, owner, suggested action, and next-step jump.

For scrollable page templates, every resolved block must be at least 220px tall. If the full grid is taller than 1080px, use vertical scrolling. Fixed sci-fi/big-screen templates are exempt.

## Chart Selection

- KPI card: actual, target, completion, YoY, warning, rank.
- Grouped bar or line: industry/own/competitor online-offline growth comparison.
- Matrix table: channel x competitor x metric comparison.
- Waterfall: explain revenue, profit, expense, and margin contribution.
- Pareto or Top N bar: largest customers, brands, price bands, models, or regions causing the gap.
- Metric tree: 收入 -> 利润 -> 毛利率/费用率 -> DSO/DIO health path.
- S2 analytical table: domestic/overseas drilldown by 小V, brand, channel, customer, product, price band, model.
- Scatter/bubble: opportunity identification by growth, margin, share, and scale.
- Drawer detail list: issue evidence, affected customers, overdue records, inventory categories, and action suggestions.

## Filter Design

Minimum filters:

- Period: year, quarter, month, rolling period.
- Scope: 国内/海外, organization, region, 小V.
- Industry/category: 家电行业, category, product line.
- Channel: online, offline, all.
- Competitor: 美的 by default; allow more competitors.
- Brand, price band, product, model, TOP N model group.
- Customer type/customer, revenue status, completion status.
- Warning type: completion warning, YoY warning, DSO/DIO warning, share-loss warning.

Filters must preserve linkage across benchmark, own performance, diagnosis, and insight blocks. When a filter has no data for one block, show a clear empty state rather than silently hiding the block.

## Interaction Design

- Click an industry/competitor benchmark metric to open a drawer with channel split, trend, and formula.
- Click 跑输行业 or 跑输对手 to drill to online/offline, brand, price band, and TOP model evidence.
- Click 收入, 利润, 毛利率, 费用率, DSO, or DIO to show formula, target, baseline, YoY, and responsible object.
- Click a waterfall contribution bar to filter the issue table to the matching driver.
- Click 国内/海外 tabs to preserve the same diagnostic structure while switching drill dimensions.
- Click an opportunity/risk card to show evidence, owner, action suggestion, and detail jump.
- Use popovers for formulas and warnings. Use drawers for evidence. Use page jumps only for source details, reconciliation, or execution follow-up.

## Mock Data Requirements

Mock data must be internally consistent:

- Actual, target, completion, same-period, and YoY must reconcile.
- Industry/competitor/own growth gaps must match the displayed 跑赢/跑输 conclusion.
- Online/offline totals should reconcile to all-channel totals when the prototype shows totals.
- Revenue, profit, gross margin, expense, DSO, and DIO should include normal, warning, and severe examples.
- Domestic and overseas data should share the same structure, with overseas including 小V and brand drill dimensions.
- Issue records must connect to visible metrics and charts, not float as unrelated sample rows.

## Output Format

When asked to design or implement a 产业 report/prototype, produce:

1. 设计定位: audience, business scope, period, and management question.
2. 分析主线: 看行业 -> 看对手 -> 看自己 -> 找问题 -> 出洞察.
3. 指标体系: benchmark metrics, own metrics, operating quality metrics, formulas, warnings.
4. 页面结构: blocks, charts, tables, drawers, domestic/overseas tabs, insight cards.
5. 筛选联动: period, channel, domestic/overseas, 小V, brand, price band, model, competitor.
6. 交互路径: metric drilldown, waterfall contribution, issue evidence, opportunity/risk action.
7. Mock 数据: tables and fields needed to support all blocks and warning states.
8. 校验清单: formulas, totals, thresholds, empty states, row-height/scrolling behavior, and action handoff.

## Quality Checklist

Before finalizing, verify:

- The prototype starts with an explicit 产业经营 conclusion, not a loose chart collection.
- 行业, 对手, and 自身 are all represented.
- Online/offline channel comparison is visible when data exists.
- 收入, 利润, 毛利率, 费用率, DSO, and DIO have target/baseline and warning logic.
- 国内 and 海外 paths are structurally consistent; overseas supports 小V and brand drilldown.
- Opportunities and risks are evidence-backed and actionable.
- Formulas and warning thresholds are available through popovers or metric metadata.
- Issue tables link back to charts and metrics.
- The final page can support both status overview and diagnostic reasoning.

## Avoid

- Do not treat 产业 as only a company profile or industry news page.
- Do not show industry benchmark without competitor and own-performance comparison.
- Do not diagnose profit before locating revenue, margin, and expense drivers.
- Do not mix 国内 and 海外 dimensions without clear labels.
- Do not use waterfall charts without explaining positive/negative impact.
- Do not create opportunities or risks that are not supported by visible evidence.
