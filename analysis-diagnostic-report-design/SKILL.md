---
name: analysis-diagnostic-report-design
description: "设计、评审或提炼分析诊断类报表的通用思路逻辑和落地路径。适用于原因分析、指标波动诊断、归因分析、驱动因素拆解、目标偏差诊断、经营问题定位、流程瓶颈分析等场景，但不要局限于某个行业、指标或固定诊断页面。重点沉淀问题定义、分解模型、归因路径、维度下钻、过程诊断、证据链、交互联动、数据落地、诊断结论和行动建议。"
---

# 分析诊断报表设计

## 核心定位

把分析诊断类报表当作一种解释问题的方法。它的价值不是展示更多指标，而是帮助用户回答：指标为什么变好、为什么变差、为什么偏离目标、主要驱动因素是什么、哪些对象贡献了变化、证据是否足够、下一步该验证或行动什么。

适用对象可以是收入、利润、费用、毛利、库存、项目进度、客户流失、回款、质量、服务、供应链、流程转化或任何可解释变化的业务指标。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 诊断问题：哪个指标在什么周期、什么范围内发生了什么变化。
- 比较基准：目标、预算、计划、上期、同期、历史均值、标杆、阈值。
- 指标口径：公式、分子分母、聚合规则、过滤条件、数据版本。
- 可拆维度：组织、区域、产品、客户、渠道、项目、合同、门店、流程节点、责任人。
- 可用证据：趋势、明细、事件、样本、单据、异常、任务、外部因素。
- 预期动作：继续核对、发起整改、调整策略、复盘、预警或进入明细。

## 思路逻辑

从“如何解释变化”出发，而不是从“如何摆更多图”出发。

1. 定义现象：说明变化对象、变化幅度、比较基准和影响程度。
2. 选择分解模型：用公式、财务结构、流程漏斗、账户树、贡献模型或业务规则解释指标。
3. 识别驱动因素：区分结果驱动、结构驱动、流程驱动、对象贡献、异常事件和数据口径影响。
4. 量化归因：尽量给出贡献金额、贡献率、偏差额、影响比例或排序。
5. 定位对象：下钻到可行动的组织、区域、产品、客户、项目、渠道、流程节点或责任人。
6. 建立证据链：用趋势、明细、样本、事件、单据或异常记录支撑诊断。
7. 给出结论：按“现象 -> 原因 -> 影响对象 -> 建议动作”表达。

## 落地路径

按下面顺序把诊断方法落到页面或原型：

1. 抽象诊断问题
   将需求改写成“为什么 X 在 Y 范围内相对 Z 变化了 N”。没有明确变化对象时，不进入组件设计。

2. 选择诊断模型
   根据指标性质选择公式分解、财务分解、差异分解、流程分解、结构分解、贡献分解、异常事件诊断或组合模型。

3. 定义归因规则
   明确每个驱动因素如何计算影响，哪些因素可以相加，哪些只能作为解释线索，哪些需要人工确认。

4. 设计信息架构
   常用层级是“问题定义 -> 核心分解 -> 贡献排序 -> 维度定位 -> 过程/事件解释 -> 证据抽屉 -> 诊断结论”。

5. 映射组件
   用瀑布图、指标树、分解树、帕累托、Top N、对比柱、矩阵、漏斗、趋势线、散点、明细表承载不同推理任务。

6. 设计交互
   支持指标树下钻、维度下钻、贡献项点击、流程节点定位、证据抽屉、口径弹层和跨报表跳转。

7. 明确数据契约
   为每个诊断节点定义字段、公式、贡献算法、维度、过滤参数、证据列表、样本数量、更新时间和跳转参数。

8. 验收表达
   验收时检查用户是否能说清：发生了什么、为什么发生、谁贡献最大、证据在哪里、下一步做什么。

## 常用诊断模型

- 公式分解：将指标拆成可计算驱动项，例如数量、价格、转化率、客单价、频次。
- 财务分解：将利润、成本、费用、毛利等拆到账户或科目结构。
- 差异分解：将目标差异、预算差异、计划差异拆到对象和科目。
- 流程分解：按线索、商机、合同、交付、验收、回款等节点定位损失。
- 结构分解：解释产品、客户、渠道、区域、价格带等结构变化影响。
- 贡献分解：找出拉动或拖累整体变化的 Top 对象。
- 事件诊断：识别一次性政策、项目、活动、事故、数据异常对指标的影响。

模型必须可解释。不要把无法解释的相关性包装成确定原因。

## 组件选择

- 瀑布图：解释结果从基准到当前的增减构成。
- 指标树/分解树：表达指标公式和逐层驱动。
- 帕累托/Top N：找出主要贡献对象。
- 对比柱/矩阵：比较维度差异。
- 漏斗/流程图：定位流程节点损失和积压。
- 趋势线/小多图：比较驱动项随时间变化。
- 散点/气泡：识别异常对象、聚类和相关线索。
- 明细表：承载证据确认和记录级验证。

## 与其他报表的边界

- 只判断是否健康时，用 `status-overview-report-design`。
- 需要找具体记录时，用 `detail-query-report-design`。
- 需要处理预警和闭环时，用 `anomaly-monitoring-report-design` 或 `operational-execution-report-design`。
- 需要证明数据口径是否一致时，用 `reconciliation-traceability-report-design`。
- 需要会议叙事时，用 `review-recap-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将现象、驱动、分解、维度、证据、建议映射为内容块、数据字段、筛选器和组件绑定矩阵。
- 用 `report-visual-layout-design` 处理诊断页结构、证据抽屉、跨报表入口和布局节奏。
- 用 `report-component-style-design` 处理瀑布图、分解树、漏斗、矩阵、标签密度和证据表格。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：诊断结论、驱动因素、证据样本和明细记录是否能互相追溯，筛选后推理链是否仍成立。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计分析诊断类报表时，按这个结构输出：

1. 设计定位：说明诊断对象、受众、周期、范围、基准和变化幅度。
2. 思路逻辑：说明从现象到原因、对象、证据、动作的推理路径。
3. 分解模型：给出公式、指标树、流程链、科目树或贡献模型。
4. 布局框架：说明问题定义、核心分解、维度定位、证据、结论层级。
5. 组件映射：说明每个图表或表格承担哪一步诊断。
6. 交互路径：说明指标下钻、维度联动、证据抽屉、口径弹层和跳转。
7. 数据落地：说明字段、算法、口径、维度、样本、证据和数据源依赖。
8. 诊断结论：按“现象 -> 原因 -> 影响对象 -> 建议动作”输出。
9. 校验清单：列出假设、归因限制、样本风险和需要业务确认的规则。

## 质量清单

- 是否明确了诊断问题、周期、范围、基准和变化幅度。
- 是否有可解释的分解模型或驱动路径。
- 贡献或影响是否尽量量化。
- 维度下钻是否能定位到可行动对象。
- 证据是否在当前页或抽屉中可见。
- 归因规则、公式和样本限制是否可解释。
- 结论是否包含现象、原因、影响对象和建议动作。
- 跳转是否用于确认和行动，而不是替代当前页的主要推理。

## 避免

- 不要把诊断页做成图表堆叠。
- 不要把相关性当成因果。
- 不要硬套某个行业公式作为通用模型。
- 不要在没有基准和变化幅度时直接归因。
- 不要把证据藏到多级跳转之后。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
