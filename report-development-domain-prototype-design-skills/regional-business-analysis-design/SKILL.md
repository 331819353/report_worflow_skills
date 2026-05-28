---
name: regional-business-analysis-design
description: "Use when the user mentions 区域, 区域分析, 区域经营分析, 区域经营情况, 区域问题定位, 区域盈利能力分析, 区域营运质量分析, 国家/产业/品牌区域下钻, DSO/DIO区域分析, or asks for a report/prototype skill triggered by 区域. This skill turns the 区域分析框架 into business report prototype logic covering profitability, revenue/profit/expense diagnosis, receivable and inventory quality, country/industry/brand drilldown, warning rules, and opportunity discovery. Trigger word: 区域."
---

# Regional Business Analysis Design

## Core Positioning

Use this as the domain skill for 区域经营分析. It converts the 区域分析框架 into report prototype logic for management teams that need to judge regional health, locate business problems, and trace them to country, industry, brand, customer, expense account, receivable, or inventory drivers.

This skill answers:

- 区域经营情况是否健康。
- 收入、利润、毛利率、费用率是否达成目标并优于同期。
- DSO、DIO、逾期额、存货效率是否超过目标或基线。
- 问题主要落在哪些国家、产业、品牌、客户、费用项、库存对象上。
- 收入、利润、费用、应收、存货分别由哪些因素造成。
- 是否存在机会发现入口，哪些机会需要进一步验证。

Do not use it as a generic geography map skill. 区域 analysis here is a经营分析 domain skill: the prototype must connect经营情况, 问题定位, 问题归因, 营运质量, and opportunity discovery.

## Trigger And Skill Routing

Trigger this skill whenever the user request contains `区域` as a report/prototype theme, especially:

- 区域分析框架, 区域经营分析, 区域经营情况, 区域问题定位.
- 区域盈利能力分析, 区域收入分析, 区域利润分析, 区域费用分析.
- 区域应收分析, 区域存货分析, DSO/DIO 区域分析.
- 国家、产业、品牌、客户维度的区域经营诊断.
- 区域原型, 区域报表, 区域看板, 区域经营驾驶舱.

Use this skill before generic report-type selection. Then combine it with:

- `status-overview-report-design` for the top-level regional health overview.
- `analysis-diagnostic-report-design` for revenue, profit, expense, DSO, DIO, and gap attribution.
- `detail-query-report-design` for evidence tables such as customer, overdue, inventory, and expense details.
- `report-info-component-mapping`, `report-mock-data-design`, `report-filter-data-design`, `report-data-interaction-design`, `report-visual-layout-design`, and `report-component-style-design` for implementation-ready prototype details.

## Analysis Framework

Build the prototype around three layers: 经营情况, 问题定位, and 机会发现.

### 1. 经营情况

Use two major lenses: 盈利能力 and 营运质量.

盈利能力:

- Data source: 《损益》.
- 看规模: 收入, 利润.
- 看效率: 毛利率, 费用率.
- Output: regional profitability health card group, metric tree, warning status, and trend.

营运质量:

- Data source: 《应收》 for receivable quality.
- DSO: receivable turnover days and overdue amount.
- DIO: inventory turnover days and inventory efficiency indicators.
- Output: operating-quality cards, target/baseline comparison, and problem object drilldown.

### 2. 盈利能力 Metrics

收入:

- 指标: 销售收入, unit 亿.
- 对比指标: 完成率.
- 底线指标: 同比.
- Warning: 完成率 < 100%, 同比 < 0%.

利润:

- 指标: 利润, unit 亿.
- 对比指标: 完成率.
- 底线指标: 同比.
- Warning: 完成率 < 100%, 同比 < 0%.

毛利率:

- 基础指标: 毛利率, unit %.
- 对比指标: 完成率.
- 底线指标: 同比.
- Warning: 完成率 < 100%, 同比 < 0%.

费用率:

- 指标: 费用率, unit %.
- 对比指标: 完成率.
- 底线指标: 同比.
- Warning: 完成率 > 100%, 同比 > 0%.
- Treat higher expense rate as worse unless the user provides a different business rule.

### 3. 营运质量 Metrics

DSO:

- 指标: DSO, unit 天.
- 二级指标: 逾期额, unit 万元.
- 对比指标: 比目标.
- 底线指标: 比基线.
- Warning: 比目标 > 0, or baseline completion is below target.
- Drill dimensions: 国家, 客户.

DIO:

- 指标: DIO, unit 天.
- 对比指标: 比目标.
- Warning: 比目标 > 0.
- Formula: 实际数 - 目标数.
- Supporting indicators: 产量/采购量, 销量, 产能利用率, 超期额, 超期率, SKU库存个数, SKU效率（单型号平均年化销量）.

## Problem Location Logic

Split problem location into 盈利能力分析 and 营运质量分析.

### 盈利能力分析

收入分析:

- Data source: 《损益》.
- Problem location dimensions: 国家, 产业, 品牌.
- Exposure rules: 同比负增长, 目标未达成, 完成率 < 1.
- Problem causes: customer decline, industry decline, brand decline, channel change, product mix shift, lost orders, weak conversion, or large-customer fluctuation.

利润分析:

- Data source: 《损益》.
- Problem location: target gap and YoY gap by 国家, 产业, 品牌.
- Problem causes: revenue drop, gross margin decline, expense increase, mix deterioration, price decline, cost increase.
- Use waterfall to separate positive and negative impact.

费用分析:

- Data source: 《损益》.
- Analyze expense amount and expense rate.
- Suggested expense drivers: 销售费用, 市场费用, 物流成本, 销售佣金, 研发费用, 财务费用, 管理费用, 其他.
- Warning: expense completion > 100% or YoY > 0% when higher expense is unfavorable.

### 营运质量分析

应收分析:

- Data source: 《应收》.
- Analyze DSO（应收账款周转天数） by 国家.
- Analyze 逾期额 by 国家 -> 客户.
- Evidence should include customer, overdue amount, overdue days, owner, and follow-up state.

存货分析:

- Analyze DIO（存货周转天数）.
- Analyze production/procurement volume, sales volume, capacity utilization, overdue inventory amount, overdue rate, SKU inventory count, and SKU efficiency.
- Evidence should include country, industry, brand, SKU/product, inventory days, stock amount, slow-moving reason, and action owner.

## Opportunity Discovery

Use 机会发现 as an optional bottom layer. If the scenario says `330不包含`, keep it as a placeholder or extension entry rather than a core page block.

Opportunity candidates:

- Countries where revenue growth is positive but brand share is still low.
- Industries with improving margin but insufficient sales coverage.
- Brands with target gap but strong YoY momentum.
- Customers with recovering revenue and manageable receivable risk.
- Inventory categories where stock pressure is low and demand momentum is rising.

Each opportunity must show evidence, affected object, expected benefit, risk, and next action.

## Metric Rules

Use these formulas unless the user's source system defines a different口径.

| Metric | Formula | Good Direction | Warning |
| --- | --- | --- | --- |
| 完成率 | 实际数 / 目标数 * 100% | Higher is better for收入、利润、毛利率 | < 100% |
| 费用率完成率 | 实际数 / 目标数 * 100% | Lower is better unless stated otherwise | > 100% |
| 同比 | (实际数 - 同期数) / 同期数 * 100% | Higher is better for收入、利润、毛利率 | < 0% |
| 费用率同比 | 实际数 - 同期数 | Lower is better | > 0% |
| 毛利率同比 | 实际数 - 同期数 | Higher is better | < 0% |
| DSO比目标 | 实际DSO - 目标DSO | Lower is better | > 0 |
| DIO比目标 | 实际DIO - 目标DIO | Lower is better | > 0 |
| 逾期额 | Source-system overdue amount | Lower is better | Above target/baseline |

When target, baseline, or same-period data is missing, mark the comparison as not available and keep the metric visible.

## Prototype Component Mapping

Recommended first-screen structure:

1. 区域经营结论条
   Summarize health: revenue/profit target status, margin/expense efficiency, DSO/DIO pressure, biggest problem, and opportunity entry.

2. 经营情况总览
   Use KPI cards for 收入, 利润, 毛利率, 费用率, DSO, DIO, 逾期额. Each card shows actual, target, completion/gap, YoY/baseline, warning status, and formula popover.

3. 盈利能力诊断
   Use metric tree or grouped cards for 看规模 and 看效率. Use waterfall charts for revenue/profit/expense attribution.

4. 问题定位矩阵
   Use S2 analytical table or heatmap by 国家 x 产业 x 品牌. Highlight target-miss, YoY negative growth, and completion < 1.

5. 营运质量诊断
   Use DSO/DIO cards, trend lines, overdue/customer table, and inventory/SKU efficiency table.

6. 机会发现
   Use opportunity cards or a scored list. If 330不包含, show it only as a future extension marker.

For scrollable page templates, every resolved block must be at least 220px tall. If the full grid is taller than 1080px, use vertical scrolling. Fixed sci-fi/big-screen templates are exempt.

## Chart Selection

- KPI card: actual, target, completion, YoY, warning, and formula.
- Waterfall: compare target and actual, or same-period and current, for revenue/profit/expense impact.
- Matrix table or heatmap: 国家 x 产业 x 品牌 problem location.
- Pareto or Top N bar: biggest negative contributors by country, brand, customer, expense account, or SKU.
- Line chart: trend of revenue, profit, margin, expense rate, DSO, DIO.
- S2 table: detailed drilldown by country, industry, brand, customer, SKU, and expense account.
- Drawer: evidence for a selected problem object.
- Opportunity scatter: growth, margin, scale, and risk.

## Filter Design

Minimum filters:

- Period: year, quarter, month, rolling period.
- Region hierarchy: region, country, organization.
- Business dimensions: industry, brand, customer, product/SKU.
- Metric group: profitability, revenue, profit, expense, receivable, inventory.
- Warning type: target miss, YoY negative, expense overrun, DSO over target, DIO over target, overdue amount.
- Data source: 《损益》, 《应收》, inventory source when available.

Filters must keep all blocks linked. If a selected country or brand has no receivable or inventory data, keep the block visible and show a clear empty state.

## Interaction Design

- Click a KPI card to open formula, target, same-period, baseline, and issue evidence.
- Click a warning badge to filter the problem matrix to matching warning objects.
- Click a country/industry/brand cell to update revenue, profit, expense, receivable, and inventory blocks together.
- Click a waterfall bar to open driver evidence and affected object list.
- Click DSO or overdue amount to drill from 国家 to 客户.
- Click DIO to drill to SKU/product inventory evidence.
- Click an opportunity card to open evidence, expected benefit, risk, owner, and next action.
- Use popovers for formulas and thresholds. Use drawers for evidence. Use jumps only for source detail, reconciliation, or execution follow-up.

## Mock Data Requirements

Mock data must be internally consistent:

- Actual, target, completion, same-period, and YoY must reconcile.
- Expense rate warnings must treat values above target or above same period as negative.
- DSO/DIO warnings must match actual minus target/baseline.
- Country, industry, and brand totals should reconcile to higher-level totals when displayed.
- Revenue, profit, margin, expense, DSO, DIO, overdue, and inventory records must connect to visible issue objects.
- Include both healthy and warning examples across at least several countries, industries, and brands.

## Output Format

When asked to design or implement a 区域 report/prototype, produce:

1. 设计定位: audience, region scope, data source, period, and management question.
2. 分析主线: 经营情况 -> 盈利能力/营运质量 -> 问题定位 -> 问题归因 -> 机会发现.
3. 指标体系: revenue, profit, margin, expense rate, DSO, DIO, overdue, inventory efficiency, formulas, warnings.
4. 页面结构: conclusion strip, KPI cards, profitability diagnosis, problem matrix, operating-quality diagnosis, opportunity area.
5. 筛选联动: period, region/country, industry, brand, customer, SKU, warning type, data source.
6. 交互路径: card drilldown, warning filter, waterfall evidence, DSO customer drilldown, DIO SKU drilldown, opportunity action.
7. Mock 数据: tables and fields needed to support formulas, warnings, and linked evidence.
8. 校验清单: formula consistency, totals, warning direction, empty states, row-height/scrolling behavior, and action handoff.

## Quality Checklist

Before finalizing, verify:

- The prototype starts with an explicit regional经营 conclusion.
- 盈利能力 and 营运质量 are both represented.
- 收入, 利润, 毛利率, 费用率, DSO, and DIO have target/baseline and warning logic.
- 问题定位 supports 国家, 产业, and 品牌 dimensions.
- 收入/利润/费用 waterfalls separate positive and negative impact.
- 应收 analysis can drill from 国家 to 客户.
- 存货 analysis can drill to SKU/product evidence.
- Opportunity discovery is either implemented or intentionally marked as out of scope when 330不包含.
- Issue evidence links back to visible metrics and charts.

## Avoid

- Do not reduce 区域 analysis to a map or regional ranking only.
- Do not mix expense-rate warning direction with revenue/profit direction.
- Do not show DSO/DIO without target or baseline context.
- Do not locate problems by country only when industry and brand are available.
- Do not create opportunity claims without visible evidence.
