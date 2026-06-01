---
name: status-overview-report-design
description: "设计、评审或提炼状态总览型报表的通用思路逻辑和落地路径。适用于状态总览、经营驾驶舱、健康度、目标完成、风险概览、KPI 状态、预算/目标达成、经营概览等场景，但不要局限于某个行业、指标或固定页面形态。重点沉淀业务问题、判断基准、指标体系、信息架构、组件映射、交互边界、数据落地、结论表达和验收清单。"
---

# 状态总览报表设计

## 核心定位

把状态总览型报表当作一种通用报表方法，而不是某一个经营驾驶舱模板。它的价值是让用户快速判断一个对象当前是否健康、是否达标、是否偏离、是否有风险，以及下一步应该关注哪里。

适用对象可以是企业、区域、组织、产品、项目、门店、客户、库存、服务、流程、预算、专项工作或任何需要做健康判断的管理对象。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 观看者：高层、经营负责人、区域负责人、职能负责人、项目负责人、一线管理者。
- 管理对象：被判断状态的对象和层级。
- 时间范围：日、周、月、季、年、项目阶段、经营周期。
- 判断基准：目标、预算、计划、阈值、时间进度、去年同期、上期、历史均值、行业/内部标杆。
- 核心指标：结果、完成、偏差、趋势、结构、风险、效率。
- 后续动作：查看诊断、查看明细、核对数据、处理异常、发起任务、进入复盘。

## 思路逻辑

从“如何判断状态”出发，而不是从“摆哪些图表”出发。

1. 定义判断问题：用户需要在 10 秒内判断什么。
2. 定义状态对象：判断的是整体、组织、项目、流程、资产还是人群。
3. 定义基准：所有关键指标都要有可比较对象。
4. 构建指标层级：结果指标说明现状，完成指标说明达标，偏差指标说明差距，趋势指标说明变化，结构指标说明对象，风险指标说明优先级。
5. 组织信息路径：先整体状态，再目标偏差，再趋势结构，最后给出风险入口。
6. 设定交互边界：总览页负责发现状态和定位入口，不承担完整根因分析、明细核对或任务闭环。
7. 输出管理结论：用短结论说明整体状态、主要偏差和优先风险。

## 落地路径

按下面顺序把方法落到页面或原型：

1. 抽象业务问题
   将需求改写成一句话：在什么周期内，谁要判断哪个对象是否健康，依据什么基准，下一步要进入哪里。

2. 建立指标模型
   至少包含实际值、基准值、完成率/偏差、趋势、结构拆分和风险对象。避免只有实际值没有目标或阈值。

3. 定义状态规则
   明确红黄绿、达标/未达标、健康/预警/异常的计算口径、阈值来源和例外规则。

4. 设计信息架构
   常用层级是“整体状态 -> 目标偏差 -> 趋势变化 -> 结构分布 -> 风险清单 -> 跳转入口”。小型报表可以合并层级，但不要打乱判断顺序。

5. 映射组件
   用 KPI 卡、目标达成条、子弹图、对比柱、偏差条、趋势线、结构图、热力表、Top/Bottom、风险清单承载不同判断任务。

6. 设计交互
   支持时间、组织、业务线、对象类型、基准切换；支持 KPI 聚焦、结构联动、趋势点查看、风险对象抽屉、定义口径弹层和跨报表跳转。

7. 明确数据契约
   为每个组件定义字段、口径、基准来源、更新时间、过滤参数、下钻参数、状态规则和跳转参数。

8. 验收表达
   验收时检查用户是否能快速回答：当前好不好、差在哪里、风险对象是谁、该看哪张后续报表。

## 组件选择

- KPI 卡：承载整体健康判断和关键结果。
- 子弹图/进度条：承载实际、目标、完成率、区间状态。
- 对比柱/偏差条：承载不同对象的达标差距。
- 折线/面积图：承载趋势、拐点和连续异常。
- 热力表/矩阵/地图：承载组织、区域、对象健康分布。
- Top/Bottom：承载优秀对象和拖累对象。
- 风险清单：承载可行动对象、负责人、严重度、持续时间和下一入口。

图表选择必须服务判断任务，不为了丰富视觉而堆图。

## 与其他报表的边界

- 需要解释为什么变化时，跳转到 `analysis-diagnostic-report-design`。
- 需要查看具体记录时，跳转到 `detail-query-report-design`。
- 需要处理异常时，跳转到 `anomaly-monitoring-report-design` 或 `operational-execution-report-design`。
- 需要证明数据是否可信时，跳转到 `reconciliation-traceability-report-design`。
- 需要会议叙事时，跳转到 `review-recap-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将状态、目标、偏差、趋势、结构、风险映射为内容块、数据字段、筛选器和组件绑定矩阵。
- 用 `report-visual-layout-design` 处理页面壳、导航、栅格、首屏层级和操作区。
- 用 `report-component-style-design` 处理 KPI、图表、风险列表、标签、颜色和响应式细节。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：首屏结论、指标与明细/风险对象是否可追溯，筛选后 KPI、图表、列表是否一致。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计状态总览型报表时，按这个结构输出：

1. 设计定位：说明受众、对象、周期、核心判断问题。
2. 思路逻辑：说明从状态判断到偏差定位再到风险入口的路径。
3. 指标体系：列出结果、完成、偏差、趋势、结构、风险、效率指标和基准。
4. 布局框架：说明整体状态、目标偏差、趋势结构、风险入口等层级。
5. 组件映射：说明每个组件回答什么问题。
6. 交互路径：说明筛选、联动、下钻、弹层、抽屉和跳转边界。
7. 数据落地：说明字段、口径、阈值、更新时间和接口/数据源依赖。
8. 管理结论：给出整体状态、主要偏差、优先风险和下一步入口。
9. 校验清单：列出缺口、假设、风险和需要业务确认的规则。

## 质量清单

- 是否先定义管理判断，而不是先定义图表。
- 每个关键指标是否都有基准或阈值。
- 首屏是否能快速判断健康度和目标完成。
- 偏差和风险是否能定位到可行动对象。
- 结构拆分是否对应真实管理责任。
- 交互边界是否清楚，避免把总览做成无限分析页。
- 状态颜色是否有明确规则。
- 结论是否说明整体状态、主要偏差和下一步关注点。

## 避免

- 不要把某个行业的指标硬编码成通用规则。
- 不要把状态总览做成单一驾驶舱模板。
- 不要只有实际值，没有目标、预算、计划、阈值或历史对比。
- 不要在总览页展开完整根因分析。
- 不要让风险对象藏在装饰性图表后面。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
