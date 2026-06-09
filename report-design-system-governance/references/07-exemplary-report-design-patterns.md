# Exemplary Report Design Patterns

Use this reference when a task asks for 报表设计亮点、领导喜欢的看板、经营分析页、驾驶舱、大屏、资产总览、合同治理、样例复用、视觉优化, or when a report needs a proven information path rather than only generic chart rules.

Core idea:

```text
先给结论，再给过程；先看总览，再看拆解；颜色服务于含义，而不是装饰。
```

## Shared Strengths To Reuse

- Design the reading path before drawing charts. Strong reports answer: 当前结果如何 -> 为什么变化 -> 哪些维度贡献/异常 -> 哪些对象需要行动 -> 明细证据是什么.
- Put core KPI cards in the first meaningful viewport. Titles stay small, numbers are large, units are secondary, and YoY/MoM/completion indicators use semantic color.
- Use one module for one question. A chart title should be convertible into a clear business question; otherwise the chart probably needs removal, merging, or a table/detail fallback.
- Keep colors semantic. Use blue for primary data and stable system identity, cyan/light blue for auxiliary data, orange for focus/target/opportunity, red for risk/decline/exception, and green for healthy/growth/qualified states.
- Make dense pages feel calm through unified containers: consistent card title position, unit position, filter position, legend position, padding, gap, radius, and border/shadow.
- Let data stand forward. Colored backgrounds, quadrant zones, gradients, and decorations must have low visual weight unless they are the top-level KPI layer.
- Use tables as evidence after visual diagnosis. Charts help leaders understand; tables help business users verify, trace, export, and act.
- Keep filters lightweight. Global filters usually sit near the page title or top-right toolbar; module filters sit in the card top-right. Filter controls should not be visually heavier than the metric or chart title.
- Format large numbers with thousands separators. This is required for contract counts, asset totals, revenue, amounts, quantities, and other large business figures.

## Reusable Page Patterns

### Operating Analysis Long Page

Use for monthly/weekly operating reports, revenue/profit analysis, business recap, and scrollable management analysis.

Recommended flow:

```text
顶部导航/左侧菜单
-> KPI 概览
-> 趋势变化
-> 区域/国内外分布
-> 收入/利润/成本结构拆解
-> 排名、异常或明细表格
```

Design highlights:

- Strong chaptering prevents users from getting lost in a long page. Use clear section titles and enough vertical spacing between large chapters.
- The first screen should expose 6-10 leadership metrics before detailed charts.
- Use paired or parallel trend charts for comparison; use map + trend when the question has both region and time dimensions.
- Suitable spacing: page margin `16-24px`, card gap `12-16px`, large module gap `24-32px`, card padding `12-20px`, radius `6-10px`.

### High-Density Business Diagnostic Dashboard

Use for daily/weekly operating dashboards, analyst workbenches, business-owner cockpits, and pages with many indicators.

Recommended flow:

```text
全局趋势
-> KPI 卡片阵列
-> 象限诊断
-> 多维拆解
-> 地图/区域分布
-> 排名与明细
```

Design highlights:

- Put a wide trend chart near the top when the page has many metrics. It gives context before users scan dense modules.
- Use quadrant charts when the business question is about priority, input, elimination, scale-vs-efficiency, or growth-vs-size.
- Use low-saturation colored quadrant backgrounds; data points, labels, and thresholds must remain more prominent than the background.
- Suitable spacing: main gap `12px`, card gap `8-12px`, card padding `10-14px`, title band `28-36px`, radius about `6px`.

### Asset Or Resource Overview

Use for fixed assets, projects, parks, stores, devices, facilities, inventory, and resource governance.

Recommended flow:

```text
彩色 KPI 头部
-> 三列分析卡片
-> 分类/地域/年限/价值结构
-> 风险红绿灯或状态分级
-> 明细入口
```

Design highlights:

- Gradient or icon-rich KPI cards are acceptable only at the top layer. Analysis areas should return to a restrained white/blue system so the page does not become noisy.
- Use consistent card dimensions in the middle grid to communicate stability and authority.
- Embed key numbers in short explanatory sentences when it helps reading, for example "总资产数量：220 个".
- Suitable spacing: page margin about `24px`, top KPI gap about `20px`, analysis card gap `18-24px`, card padding about `18px`, title-to-chart gap about `12px`.

### Leadership Cockpit Or 16:9 Big Screen

Use for leadership dashboards, meeting-room projection, contract governance, procurement, supply chain, legal/compliance, HR operations, and service operations.

Recommended flow:

```text
品牌/标题/日期/用户
-> 4 个核心 KPI
-> 左右排行/分布
-> 中间治理效率或关键状态
-> 底部长期趋势
```

Design highlights:

- One-screen cockpits should be restrained and authoritative. Prefer white/light-gray surfaces, brand blue, cyan, and one accent color over heavy decoration.
- Use horizontal bar charts for rankings and long names; use line charts for time; use column-line combinations when both actual/target and rate must be visible.
- Place brand/logo, page title, date, and user/status in the top band to create system credibility.
- Suitable spacing: page margin `12-20px`, KPI gap about `12px`, card padding `18-24px`, module gap `12-16px`, title band about `36px`, KPI height `100-120px`.

## Chart Choice By Business Question

| Business question | Preferred expression |
| --- | --- |
| 最近如何变化？ | Line chart |
| 每月规模和增幅如何？ | Column-line combo |
| 哪个分类最多/排名如何？ | Horizontal bar chart |
| 占比结构如何？ | Donut or stacked bar |
| 地区分布在哪里？ | Map plus ranking/detail |
| 哪些对象值得重点关注？ | Quadrant/scatter with thresholds |
| 风险占比多少？ | Donut progress, traffic-light status, risk cards |
| 具体明细是什么？ | Table, ranking table, anomaly list |

## Visual Acceptance Checklist

- The first meaningful viewport gives a leadership-level answer before detailed evidence.
- The page has a named pattern: long operating analysis, high-density diagnostic dashboard, asset/resource overview, or fixed leadership cockpit.
- Section order follows overview -> trend -> breakdown -> diagnosis -> detail/action unless a specific business workflow requires another order.
- KPI anatomy is consistent: label, number, unit, change/completion, optional icon/sparkline.
- Color use has business meaning; decorative gradients are limited to the top KPI layer or a justified brand scene.
- Spacing follows the 8px rhythm where possible: `4px` minimum, `8px` inner micro gap, `16px` card padding/gap, `24px` module gap, `32px` chapter gap.
- Filters are visible but lightweight and do not push the first report answer below the fold.
- Chart types match the question, and exact values remain available through labels, tooltip, table, drawer, drilldown, or export.
- Tables appear as evidence or operation surfaces, not as isolated decoration.
- Large numbers use thousands separators, clear units, and stable precision.
