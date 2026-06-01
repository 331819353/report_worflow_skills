---
name: performance-evaluation-report-design
description: "设计、评审或提炼绩效评估型报表的通用思路逻辑和落地路径。适用于绩效评估、KPI 考核、排名、评分、目标达成评价、组织/人员/团队/门店/项目/区域评价、预算执行评价等场景，但不要局限于某个考核表或排行榜。重点沉淀评价对象、目标基准、指标权重、评分规则、公平校正、排名分层、差距分析、对象画像、改进行动、数据落地和规则可审计性。"
---

# 绩效评估报表设计

## 核心定位

把绩效评估型报表当作一种“公平评价对象表现并推动改进”的通用方法。它的价值不是做一个排行榜，而是回答谁表现好、谁未达标、差距在哪里、排名是否公平、是否持续稳定、下一步应该表扬、督导、整改、复盘或支持谁。

适用对象可以是组织、区域、子公司、门店、团队、个人、项目经理、销售组、运营人员、成本中心、预算主体、产品、渠道或任何需要评价表现的实体。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 评价对象：被评价的是组织、人、项目、门店、预算主体还是其他实体。
- 评价周期：日、周、月、季、年、项目阶段、考核周期。
- 评价目标：什么叫表现好，是否以目标、预算、计划、配额、标杆或同组均值为基准。
- 指标体系：结果、完成、贡献、效率、质量、稳定性、风险、过程表现。
- 评分规则：权重、公式、等级、封顶保底、加减分、例外和一票否决。
- 公平规则：规模校正、同类比较、成熟度差异、区域难度、数据资格、特殊事件。
- 改进闭环：弱项解释、辅导动作、整改任务、复盘或资源支持。

## 思路逻辑

从“如何公平评价”出发，而不是从“如何做排名更好看”出发。

1. 定义评价对象和同组范围：先确认哪些对象可比。
2. 定义目标和基准：不能只看绝对值，要看目标、完成率、差距和同类水平。
3. 建立指标体系：覆盖结果、完成、贡献、效率、质量、稳定性和风险。
4. 明确评分规则：权重、公式、等级、调整项必须可解释。
5. 处理公平性：对规模、类型、成熟度、区域差异和特殊事件做校正或分组。
6. 展示排名和分层：提供总分排名、单项排名、同组排名、等级分布和 Top/Bottom。
7. 解释差距：指出失分指标、目标缺口、持续性和可改进方向。
8. 连接行动：低绩效对象要能进入诊断、明细、任务或复盘。

## 落地路径

按下面顺序把评价方法落到页面或原型：

1. 定义评价边界
   写清评价对象、周期、口径、参与对象、排除对象和同组比较规则。

2. 设计指标框架
   将指标分为目标完成、排名表现、同比/环比进步、贡献、差距、稳定性、综合得分、等级和风险。

3. 制定评分规则
   明确每个指标权重、得分公式、上下限、加减分、等级线、红黄绿阈值和重大异常处理。

4. 设计公平校正
   需要时引入同类型排名、人均/店均/面积均、规模归一、区域难度、项目类型、成熟度阶段或资格过滤。

5. 设计信息架构
   常用层级是“评价概览 -> 目标达成 -> 排名分层 -> 差距分析 -> 对象画像 -> 改进行动”。

6. 映射组件
   用得分卡、排名条、子弹图、进度条、等级矩阵、热力表、差距瀑布、趋势线、对象画像抽屉承载不同评价任务。

7. 设计交互
   支持评价规则查看、总分/单项切换、同组切换、对象下钻、指标下钻、得分解释、弱项抽屉和行动跳转。

8. 明确数据契约
   为目标、实际、得分、权重、等级、排名、同组、校正项、例外项、数据资格和跳转参数定义字段。

9. 验收表达
   验收时检查用户是否能解释排名依据、查看得分明细、发现弱项、判断公平性并发起改进动作。

## 评价指标模型

- 目标完成：目标值、实际值、完成率、缺口、时间进度差。
- 排名表现：总分排名、单项排名、同组排名、区域排名、类型排名。
- 进步表现：同比、环比、滚动趋势、连续达标/未达标。
- 贡献表现：贡献额、贡献率、对整体结果的拉动。
- 差距表现：距目标、距标杆、距均值、失分项。
- 稳定性：波动、持续高绩效、持续低绩效、一次性异常。
- 综合得分：加权得分、子项得分、加减分、调整后得分。
- 等级分层：A/B/C/D、优秀/合格/预警/不合格。
- 公平校正：同类、同规模、同阶段、人均/店均、难度系数、数据资格。

## 组件选择

- 横向条形图：承载排名和 Top/Bottom。
- 子弹图/进度条：承载目标达成和标杆距离。
- 得分卡：承载综合分、子项分和等级。
- 矩阵/分布图：承载等级分布和对象分群。
- 热力表：承载多指标组织对比。
- 瀑布图/偏差条：承载失分和差距分解。
- 趋势线/小多图：承载稳定性和连续表现。
- 雷达图只适合少量对象的能力画像，不适合大量对象排名。

## 规则治理

绩效评估必须可解释、可审计：

- 说明目标来源以及是否因对象不同而不同。
- 说明指标权重、评分公式、等级线、封顶保底和调整项。
- 说明排名是全局、区域、同类、同规模还是同角色。
- 说明新对象、停用对象、缺失数据、特殊事件、异常数据是否纳入。
- 说明一票否决、重大风险覆盖得分、加减分审批等规则。
- 保留数据更新时间、评价版本和争议处理入口。

## 与其他报表的边界

- 只看整体健康，用 `status-overview-report-design`。
- 解释低绩效原因，用 `analysis-diagnostic-report-design`。
- 查评分来源记录，用 `detail-query-report-design`。
- 将改进动作闭环，用 `operational-execution-report-design`。
- 需要会议汇报，用 `review-recap-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将目标、得分、排名、等级、差距、画像、改行动作映射为组件和绑定矩阵。
- 用 `report-visual-layout-design` 处理评价页结构、排名区、对象抽屉和规则说明区。
- 用 `report-component-style-design` 处理得分卡、排名列表、热力表、等级标签和密集信息展示。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：得分、排名、等级、权重、校正规则和对象画像是否可解释、可复算、可审计。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计绩效评估型报表时，按这个结构输出：

1. 设计定位：说明评价对象、受众、周期、评价目的和同组范围。
2. 思路逻辑：说明如何公平判断好坏、排名和差距。
3. 指标规则：说明目标、实际、完成、贡献、差距、稳定性、权重、得分、等级和校正。
4. 布局框架：说明概览、目标达成、排名分层、差距、画像、改进行动层级。
5. 组件映射：说明每个组件回答哪个评价问题。
6. 交互路径：说明规则弹层、排名切换、对象抽屉、指标下钻、改进跳转。
7. 数据落地：说明字段、公式、权重、等级、同组、资格、版本和接口依赖。
8. 评价结论：说明谁好、谁弱、差在哪、是否持续、下一步动作。
9. 公平性校验：列出校正规则、例外、数据资格和争议风险。

## 质量清单

- 是否有明确评价对象和可比同组。
- 是否基于目标、规则和基准评价，而不是只看绝对值。
- 权重、公式、等级线和调整项是否可解释。
- 是否考虑规模、类型、成熟度或区域差异。
- 是否展示目标、实际、完成率、差距、排名和得分。
- 用户是否能查看得分依据和失分来源。
- 低绩效对象是否有改进方向或行动入口。
- 结论是否覆盖优秀对象、薄弱对象、差距来源、持续性和动作。

## 避免

- 不要把绩效评估简化成排行榜。
- 不要在不可比对象之间只按绝对值排名。
- 不要隐藏评分规则、权重和等级阈值。
- 不要忽略缺失数据、特殊调整和争议记录。
- 不要给出改进建议却不说明差距来源。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
