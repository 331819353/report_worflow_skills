# 状态总览子类型选择与大屏模式

Use this reference when the task asks for 状态总览, 经营驾驶舱, 大屏总览, 健康度总览, 目标达成总览, or any page whose core question is: 在某个时间范围内，某个管理对象整体是否健康、进展如何、哪里需要关注。

## 1. Boundary

状态总览回答“现在整体怎么样，是否正常，哪里需要关注”。它可以作为很多报表链路的入口，但不替代其他报表类型：

| Adjacent type | Boundary |
| --- | --- |
| 分析诊断 | 状态总览指出哪里不对；分析诊断解释为什么不对 |
| 明细查询 | 状态总览看整体和重点对象；明细查询看具体记录 |
| 绩效评估 | 状态总览看运行状态；绩效评估看评价、考核、排名和责任 |
| 异常监控 | 状态总览展示风险面貌；异常监控负责预警触发和处理闭环 |
| 运营执行 | 状态总览提示哪里要处理；运营执行说明谁做什么、做到哪步 |
| 汇报复盘 | 状态总览偏当前与近期；汇报复盘偏阶段总结和结论沉淀 |
| 核对追溯 | 状态总览看可信结果；核对追溯解决差异和过程还原 |

## 2. Selection Rule

Declare exactly one primary `statusOverviewSubtype` before designing a status overview page:

- `globalBusiness`: 全局经营状态总览。
- `businessDomain`: 业务域状态总览。
- `targetPlan`: 目标计划状态总览。
- `processFlow`: 流程链路状态总览。
- `resourceCapacity`: 资源能力状态总览。
- `objectAsset`: 对象资产状态总览。
- `projectTask`: 项目事项状态总览。
- `regionalSpatial`: 区域空间状态总览。
- `riskHealth`: 风险健康状态总览。
- `systemService`: 系统服务状态总览。

Complex dashboards may declare secondary subtypes, but the primary subtype owns the first-screen judgment, page narrative, and main metric hierarchy. Secondary subtypes may only appear as named local modules or drilldown entries.

If several subtypes seem equally important, choose by management object:

| Management object | Primary subtype |
| --- | --- |
| Company, group, business unit, total经营盘 | `globalBusiness` |
| Sales, supply chain, production, customer service, finance, HR, procurement, R&D, operations | `businessDomain` |
| Target, budget, plan, OKR, KPI, annual or quarterly mission | `targetPlan` |
| Business process, approval chain, conversion path, delivery path | `processFlow` |
| People, money, inventory, capacity, equipment, warehouse, vehicles, seats, system resource | `resourceCapacity` |
| Customer, member, store, product, SKU, supplier, contract, device, account, channel | `objectAsset` |
| Project, task, demand, ticket, campaign, special initiative, rectification item | `projectTask` |
| Region, city, store, warehouse, site, park, network point | `regionalSpatial` |
| Risk, compliance, quality, safety, overdue, anomaly, health score | `riskHealth` |
| System, application, service, API, data job, model, platform, SLA | `systemService` |

## 3. Tag System

Use one primary subtype plus tags rather than trying to cover every case with a single tree.

Scenario tags:

| Tag | Use |
| --- | --- |
| `leadershipCockpit` | 高层一屏看经营大盘 |
| `dailyInspection` | 日常巡检当前是否正常 |
| `operatingMeeting` | 周会、月会、季度会 |
| `campaignMonitoring` | 大促、上线、专项活动期间 |
| `targetSprint` | 月末、季末、年末追进度 |
| `shiftHandover` | 值班交接或跨班次状态 |
| `projectReview` | 项目周会、里程碑检查 |
| `riskPatrol` | 风控、质量、安全、合规巡查 |

Management level tags: `strategic`, `operating`, `management`, `execution`.

Time rhythm tags: `realtime`, `daily`, `weekly`, `monthly`, `quarterly`, `annual`.

Expression tags: `metricCards`, `trend`, `structure`, `mapHeat`, `funnelFlow`, `progress`, `trafficLight`, `topBottom`.

## 4. Universal Formula

Default formula:

`状态总览 = 核心结果 + 目标进度 + 趋势变化 + 结构分布 + 健康风险 + 下钻入口`

Six modules:

| Module | Purpose | Examples |
| --- | --- | --- |
| 核心结果 | 当前整体值是多少 | 销售额、订单数、客户数、库存金额 |
| 目标进度 | 和目标/计划相比如何 | 完成率、时间进度、预算执行率 |
| 趋势变化 | 最近是变好还是变差 | 同比、环比、近7日趋势、近12月趋势 |
| 结构分布 | 主要贡献/问题来自哪里 | 区域、产品、渠道、客户、组织拆分 |
| 健康风险 | 是否有需要关注的地方 | 红黄绿、异常数、风险等级、健康分 |
| 下钻入口 | 下一步看哪里 | 分析诊断、明细查询、异常处理、执行清单 |

## 5. Subtype Patterns

| Subtype | Core question | Key indicators | Common dimensions | Preferred modules | Drilldown |
| --- | --- | --- | --- | --- | --- |
| `globalBusiness` 全局经营 | 公司整体经营是否健康 | 收入、利润、订单、毛利率、费用率、现金流、客户数、交付达成率、风险事项数 | 时间、组织、业务线、产品、区域、客户类型、渠道 | 少而关键的 KPI、近12月/近30日趋势、业务线/区域/产品结构、重点风险对象 | 业务域总览、分析诊断、绩效评估、异常监控 |
| `businessDomain` 业务域 | 某业务域运转是否正常 | 规模、效率、质量、成本、风险 | 时间、组织、人员、客户、产品、渠道、状态、区域 | 业务域运行链路、规模效率质量成本风险五类指标、业务过程状态 | 业务过程分析、明细查询、异常处理、绩效评估 |
| `targetPlan` 目标计划 | 完成到哪里，是否领先或滞后 | 目标值、实际值、完成率、时间进度、进度偏差、预测达成率 | 目标类型、组织、负责人、时间、项目、业务线、优先级 | 完成率 vs 时间进度、目标差距趋势、组织/项目拆分、高风险目标 | 绩效评估、差距分析、行动计划、复盘报表 |
| `processFlow` 流程链路 | 流程卡在哪里，流转是否正常 | 阶段数量、转化率、流转时长、积压量、超期量、通过率 | 流程阶段、状态、负责人、组织、时间、客户、产品、优先级 | 流程漏斗/阶段分布、各阶段时长、转化率、积压量、卡点对象 | 流程诊断、瓶颈分析、明细查询、运营执行 |
| `resourceCapacity` 资源能力 | 资源够不够，是否闲置或超载 | 可用量、占用量、利用率、缺口、闲置率、周转率、负载率 | 资源类型、地点、组织、状态、时间、负责人、业务线 | 存量、占用、消耗、补充、缺口、效率 | 资源调度、补货计划、产能分析、成本分析 |
| `objectAsset` 对象资产 | 管理对象处于什么状态 | 对象总数、活跃数、沉睡数、高价值数、高风险数、状态分布、生命周期阶段 | 生命周期阶段、价值等级、风险等级、区域、行业、负责人、渠道 | 状态字典、生命周期分布、价值/风险分层、对象结构 | 对象明细、生命周期分析、分层运营、风险监控 |
| `projectTask` 项目事项 | 项目/事项推进到哪，是否延期或阻塞 | 总数、进行中数、已完成数、延期数、阻塞数、完成率 | 状态、阶段、负责人、优先级、项目类型、组织、时间 | 红黄绿状态、里程碑进度、阶段分布、延期/阻塞清单 | 项目明细、任务执行、风险处理、复盘报告 |
| `regionalSpatial` 区域空间 | 哪些区域好，哪里异常或不均衡 | 区域业务量、增长率、目标完成率、资源利用率、异常数、覆盖率 | 大区、省、市、门店、仓库、网点、商圈、渠道 | 地图/热力、区域排名、区域结构对比、重点门店/网点 | 区域分析、门店明细、异常监控、绩效评估 |
| `riskHealth` 风险健康 | 当前整体风险水平如何 | 风险事件数、风险金额、风险等级分布、健康分、逾期率、关闭率 | 风险类型、等级、组织、区域、业务线、责任人、时间 | 健康分、红黄绿状态、风险等级分布、恶化对象、高风险清单 | 异常监控、风险明细、处理闭环、核对追溯 |
| `systemService` 系统服务 | 系统/服务/数据是否稳定 | 可用率、成功率、失败数、延迟、错误率、任务完成率、SLA达成率 | 系统、服务、接口、任务、业务线、时间、负责人、严重等级 | 服务状态、任务成功/失败趋势、关键系统/API 状态、失败任务 | 异常监控、日志追溯、根因分析、工单处理 |

## 6. Big-Screen Composition

Status overview big screens may combine multiple design parts. Use this composition rule:

1. Primary subtype decides the headline judgment and center visual.
2. Universal formula supplies the required module checklist.
3. Secondary subtypes become side panels, bottom panels, tabs, drawers, or drilldown buttons.
4. First viewport must answer the primary subtype's core question, not all subtype questions equally.
5. A strict single-screen cockpit may compress detail, but must still show the active period, scope, status rule, and next drilldown entry.

Recommended scrollable page structure:

```text
First screen: overall judgment
- Core metric cards
- Health/target status
- Key trend

Second screen: structure breakdown
- Business line / region / product / channel / organization split
- Contribution share
- Top/Bottom objects

Third screen: focus objects
- Anomaly objects
- Risk objects
- Lagging objects
- Drilldown entries

Fourth screen: supporting info
- Metric definitions
- Data update time
- Permission scope
- Source and drill links
```

Recommended strict one-screen cockpit structure:

```text
Top: one-line conclusion + active period/scope + update time
Row 1: 5-8 core KPI cards
Row 2: trend + target/progress
Row 3: structure distribution + region/organization/object comparison
Row 4: risk focus + drilldown/action entry
```

For fixed sci-fi/cockpit screens, use `report-visual-layout-design` and the sci-fi template only when the user explicitly asks for 大屏/驾驶舱/指挥中心/监控墙/展厅/固定 1920*1080. Status overview logic still owns the subtype, metric hierarchy, and conclusion.

## 7. Acceptance Gate

Before finalizing a status overview design, verify:

- One primary `statusOverviewSubtype` is declared.
- Secondary subtypes are named local modules, not competing page narratives.
- Scenario, management level, time rhythm, and expression tags are declared when they affect layout.
- The page answers: 当前规模是多少、进展如何、是否健康、趋势如何、主要分布在哪里.
- The universal six modules are present or intentionally omitted with a reason.
- Each key metric has baseline, threshold, direction, unit, formula, and update time.
- Risk/focus objects are visible and can lead to diagnosis, detail, monitoring, execution, recap, or traceability pages.
- A big screen does not become a dense catalogue of all possible status components.

## 8. Avoid

- Choose the subtype from the managed object and status question.
- Do not make all ten subtypes visible on one page.
- Do not treat process/flow diagrams as primary unless `processFlow` is the primary subtype or the core question explicitly asks for flow, dependency, or transmission.
- Do not confuse regional status with performance ranking; status overview asks where the operating state is abnormal or important, while performance evaluation asks who should be evaluated.
- Do not turn project/task overview into a plain project list; show normal/risk/delayed/blocked judgment first.
