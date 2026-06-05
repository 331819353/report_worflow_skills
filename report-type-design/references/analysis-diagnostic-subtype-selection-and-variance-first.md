# 分析诊断子类型选择与预实差优先

Use this reference when an analysis diagnostic report may involve multiple design parts, when the user asks for 原因分析, 诊断, 差异拆解, 归因, 目标偏差, 预实差, 指标异动, 流程瓶颈, 成本利润, 客户流失, 质量异常, 策略效果, or when the report must start from 预实差 and expand around the gap.

## 1. Boundary

分析诊断类回答“为什么会这样、问题出在哪里、主要影响因素是什么、下一步优先看哪里或做什么”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览回答现在怎么样；分析诊断回答为什么这样 |
| 明细查询 | 明细查询看具体记录；分析诊断看规律、结构、原因和证据链 |
| 绩效评估 | 绩效评估关注评价与责任；分析诊断关注原因与驱动因素 |
| 汇报复盘 | 汇报复盘偏阶段总结；分析诊断偏问题定位和原因解释 |
| 异常监控 | 异常监控负责发现和触发；分析诊断负责解释异常来源 |
| 运营执行 | 运营执行告诉人做什么；分析诊断说明为什么要这么做 |
| 核对追溯 | 核对追溯解决数据一致性；分析诊断解决业务原因解释 |

## 2. Variance-First Gate

Every analysis diagnostic design starts with 预实差:

`预期/目标/预算/基准 - 实际 = 差异`

Before choosing charts or layout, define:

- Expected baseline: target, budget, plan, last period, same period last year, historical average, peer benchmark, industry baseline, or threshold.
- Actual result: current value under the active time, organization, and permission scope.
- Gap: difference amount, difference rate, direction, severity, and impact.
- Affected object: organization, region, product, customer, channel, project, process stage, owner, cost item, risk type, or lifecycle segment.
- Diagnostic question: why this gap exists, where it comes from, and what should be checked or acted on next.

If there is no baseline, mark a blocking assumption or use a clearly labeled temporary baseline. Do not start from current KPI display or a cause conclusion.

## 3. Selection Rule

Declare exactly one primary `analysisDiagnosticSubtype`:

- `metricMovement`: 指标异动诊断。
- `targetGap`: 目标差距诊断。
- `structureContribution`: 结构贡献诊断。
- `funnelConversion`: 漏斗转化诊断。
- `processBottleneck`: 流程效率瓶颈诊断。
- `costProfit`: 成本利润诊断。
- `qualityExperience`: 质量体验诊断。
- `lifecycle`: 客户/对象生命周期诊断。
- `resourceSupplyDemand`: 资源供需与利用诊断。
- `regionalOrgDifference`: 区域/组织差异诊断。
- `riskAnomaly`: 风险异常诊断。
- `strategyCampaignEffect`: 策略活动效果诊断。
- `correlationDriver`: 关联驱动因素诊断。

Complex diagnostic pages may declare secondary subtypes, but the primary subtype owns the first-screen 预实差, main decomposition model, and conclusion narrative. Secondary subtypes may only appear as local sections, evidence modules, or drilldown paths.

## 4. Subtype Patterns

| Subtype | Core question | Typical methods | Key indicators | Recommended visuals |
| --- | --- | --- | --- | --- |
| `metricMovement` 指标异动 | 核心指标为什么上升、下降、波动或异常 | 同比/环比、趋势对比、贡献拆解、异常点定位、维度下钻 | 当前值、对比值、变化量、变化率、影响量、贡献率 | 趋势图、同比环比柱、贡献瀑布、异常点标记 |
| `targetGap` 目标差距 | 为什么没有达成目标，差距主要在哪里 | 目标拆解、完成率 vs 时间进度、预测达成、差距排序 | 目标值、实际值、差距值、完成率、时间进度、进度偏差、预测达成率 | 目标进度条、差距瀑布、预测达成图、差距排名 |
| `structureContribution` 结构贡献 | 谁贡献最大、谁拖累最大、结构是否健康 | 占比、贡献率、帕累托、Top/Bottom、结构变化 | 占比、贡献额、贡献率、集中度、结构变化 | 堆叠柱、帕累托、Top/Bottom、结构矩阵 |
| `funnelConversion` 漏斗转化 | 哪个阶段流失或卡住 | 漏斗分析、阶段转化率、阶段流失率、分群对比 | 阶段进入量、通过量、转化率、流失率、停留时长 | 漏斗图、阶段转化表、流失率趋势、分群漏斗 |
| `processBottleneck` 流程瓶颈 | 流程为什么慢、积压在哪里 | 时长拆解、队列分析、SLA、瓶颈定位 | 平均/中位/P90/P95 时长、积压量、超期量、SLA达成率 | 阶段时长图、积压分布、SLA图、超期清单 |
| `costProfit` 成本利润 | 钱为什么赚少了、成本为什么高了 | 收入成本拆解、价格-销量-结构、费用结构、单位经济 | 收入、成本、毛利、毛利率、费用率、净利、单位成本 | 利润瀑布、成本结构、毛利矩阵、单元经济表 |
| `qualityExperience` 质量体验 | 质量/服务/体验为什么变差 | 问题分类、严重等级、影响范围、责任环节 | 投诉量/率、退货量/率、缺陷率、满意度、关闭率 | 帕累托、投诉趋势、等级分布、问题热力 |
| `lifecycle` 生命周期 | 对象为什么增长、流失、沉睡、价值下降 | 生命周期分层、留存、流失、cohort、迁移分析 | 新增、活跃、沉睡、流失、高价值、阶段迁移率 | 生命周期分布、状态迁移、留存曲线、cohort 表 |
| `resourceSupplyDemand` 资源供需 | 资源为什么不足、闲置、积压或错配 | 供需缺口、利用率、周转、配置对比 | 需求量、可用量、缺口、利用率、闲置率、周转天数 | 供需缺口图、利用率趋势、周转图、错配矩阵 |
| `regionalOrgDifference` 区域组织差异 | 哪些区域/组织拖后腿，差异来自哪里 | 标准化对比、地图热力、排名、象限、维度拆解 | 区域指标、目标差、增长率、风险数、贡献率 | 地图、热力图、排名图、象限图、标准化对比表 |
| `riskAnomaly` 风险异常 | 异常为什么发生，风险集中在哪里 | 风险等级、异常趋势、影响范围、事件拆解 | 风险数、风险金额、等级、逾期率、持续时间、关闭率 | 风险矩阵、等级分布、异常趋势、风险对象清单 |
| `strategyCampaignEffect` 策略活动效果 | 活动/策略为什么有效或无效 | 前后对比、分组对比、ROI、转化路径、对照组 | 投入、产出、ROI、转化率、触达率、留存/复购 | 前后对比、分组对比、ROI图、转化路径 |
| `correlationDriver` 关联驱动因素 | 哪些因素影响指标，需要验证什么 | 散点、相关矩阵、因素重要性、分群对比 | 驱动因子值、相关系数、重要性、解释度、样本量 | 散点图、相关性矩阵、因素重要性排序、分群对比 |

## 5. Difference-Centered Page Structure

Analysis diagnostic pages should follow “from conclusion to evidence”, but the conclusion must be tied to the gap.

Recommended scrollable structure:

```text
First screen: 预实差与诊断结论
- 预期/目标/预算/基准
- 实际结果
- 差异额 / 差异率 / 影响量
- 问题严重度
- 主要原因概览
- 影响最大的对象

Second screen: 差异确认
- 核心指标趋势
- 同比/环比/目标/预算对比
- 是否超过正常波动区间
- 影响金额/数量/比例

Third screen: 差异来源定位
- 按时间、区域、产品、客户、渠道、组织、负责人拆解
- 贡献 Top / 拖累 Top
- 结构变化与集中度

Fourth screen: 驱动解释
- 指标公式拆解
- 贡献度拆解
- 漏斗、流程、成本、生命周期或资源拆解
- 关键驱动因子排序

Fifth screen: 验证与行动
- 重点对象清单
- 证据明细入口
- 建议动作
- 后续跟踪指标
```

Compact dashboard structure:

```text
Top: 一句话诊断结论，必须引用差异
Row 1: 预期 / 实际 / 差异额 / 差异率 / 影响量
Row 2: 主要原因，贡献拆解，Top 影响因素
Row 3: 维度定位，区域/产品/渠道/客户/组织拆解
Row 4: 证据、下钻与行动
```

## 6. Diagnostic Depth

Choose the diagnostic depth that data can support:

| Level | Meaning |
| --- | --- |
| L1 描述性诊断 | 发生了什么，在哪里发生 |
| L2 对比性诊断 | 和目标、历史、同类相比如何 |
| L3 归因性诊断 | 主要由哪些因素造成 |
| L4 预测性诊断 | 按当前趋势未来会怎样 |
| L5 决策性诊断 | 应该优先采取什么动作 |

Most business reports should reach L2-L3. L4-L5 require stable data, explicit rules, or validated models. Do not imply causal certainty when only correlation exists.

## 7. Metric Design Rules

Each diagnostic metric should carry:

`当前值 + 对比值 + 变化量 + 变化率 + 贡献度 + 状态 + 下钻入口`

Metric layers:

| Layer | Purpose | Examples |
| --- | --- | --- |
| 结果指标 | 最终出了问题的指标 | 销售额、利润率、投诉率、流失率 |
| 拆解指标 | 可拆开结果的组成项 | 客户数、客单价、频次、成本、转化率 |
| 过程指标 | 影响结果的过程因素 | 线索量、报价率、发货时长、处理时长 |
| 结构指标 | 看贡献和分布 | 产品占比、渠道占比、客户等级占比 |
| 对比指标 | 判断变化是否异常 | 同比、环比、目标差、行业基线 |
| 影响指标 | 衡量严重程度 | 影响金额、影响客户数、影响订单数 |
| 行动指标 | 后续跟踪效果 | 修复率、召回率、改善率、关闭率 |

Priorities:

- P0: diagnosed result metric, baseline/comparison metric, dimension breakdown metric.
- P1: driver decomposition metric, impact metric.
- P2: prediction metric, action tracking metric.

## 8. Common Decomposition Models

Use these as examples, not fixed industry rules:

```text
收入 = 客户数 × 客单价 × 购买频次
收入 = 流量 × 转化率 × 客单价
收入 = 订单量 × 平均订单金额
收入 = 新客收入 + 老客收入
利润 = 收入 - 成本 - 费用
毛利率 = 毛利 / 销售额
总转化率 = 阶段1转化率 × 阶段2转化率 × 阶段3转化率
活跃用户 = 新增活跃 + 留存活跃 + 召回活跃
流失用户 = 上期活跃用户 - 本期留存用户
总成本 = 数量 × 单位成本
获客成本 = 营销费用 / 新增客户数
平均处理时长 = 各环节处理时长之和
资源缺口 = 需求量 - 可用量
利用率 = 实际使用量 / 可用资源量
投诉率 = 投诉量 / 订单量
退货率 = 退货量 / 销售量
```

## 9. Diagnostic Canvas

Use this canvas for design output or implementation handoff:

| Module | Question |
| --- | --- |
| 报表名称 | 这张诊断报表叫什么 |
| 诊断对象 | 围绕什么对象诊断 |
| 核心问题 | 要解释什么问题 |
| 被诊断指标 | 哪个指标出了问题 |
| 问题类型 | 下降、上升、异常、未达成、差异大 |
| 预实差 | 预期/目标/预算/基准、实际、差异额、差异率、影响量 |
| 对比基线 | 同比、环比、目标、预算、同类、阈值 |
| 时间范围 | 分析哪个周期 |
| 指标拆解 | 结果指标可以拆成哪些驱动项 |
| 维度拆解 | 按哪些维度定位问题来源 |
| 诊断方法 | 贡献拆解、漏斗、队列、帕累托、相关分析等 |
| 影响量化 | 每个原因影响多大 |
| 主要结论 | 最可能的原因是什么 |
| 证据支撑 | 哪些数据支持这个结论 |
| 下钻路径 | 需要跳到哪些明细或专题分析 |
| 行动建议 | 应该优先处理哪些对象或动作 |
| 数据口径 | 指标定义、刷新频率、异常口径 |

## 10. Acceptance Gate

Before finalizing, verify:

- One primary `analysisDiagnosticSubtype` is declared.
- The first screen starts with 预实差, not a generic status summary.
- Every major section answers one gap-centered question: 差是什么、差在哪里、差为什么、差影响谁、下一步查什么或做什么。
- The decomposition model is explainable, and additive vs non-additive logic is clear.
- Contributions or impacts are quantified where possible.
- Dimension drilldown locates actionable objects.
- Evidence is visible on the page or in an immediate drawer.
- Conclusion names phenomenon, cause, affected object, evidence, and action.
- Correlation is labeled as a clue unless the causal rule or experiment is documented.

## 11. Avoid

- Do not turn a diagnostic report into status display: “下降了、某区域下降最多” is description, not diagnosis.
- Do not skip denominator checks. When counts rise, also check rates; when cost rises, also check unit cost.
- Do not rely only on averages for process, service, or quality diagnosis. Use median, P90/P95, extreme values, and high-value object impact when available.
- Do not treat correlation as causal proof.
- Do not hide evidence behind multiple jumps.
- Do not let multiple diagnostic subtypes compete equally in the first viewport.
