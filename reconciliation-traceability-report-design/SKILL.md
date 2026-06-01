---
name: reconciliation-traceability-report-design
description: "设计、评审或提炼核对追溯类报表的通用思路逻辑和落地路径。适用于数据核对、差异追溯、账实核对、来源比对、财务与业务核对、预算与费用核对、合同与收入核对、付款与银行流水核对、库存盘点核对、指标口径变更追溯、审计链路等场景，但不要局限于某个核对表。重点沉淀核对对象、来源系统、匹配规则、口径版本、容差、字段级差异、数据血缘、证据链、修正确认、审批日志、数据落地和可信结论。"
---

# 核对追溯报表设计

## 核心定位

把核对追溯类报表当作一种“证明数据是否可信，并定位差异来源”的通用方法。它的价值不是分析业务表现，而是回答数据是否正确、哪些数据不一致、差异在哪里、哪个系统或字段导致差异、数据从哪里来、谁确认或修正、差异是否已关闭并可审计。

适用场景可以是财务与业务核对、预算与费用核对、合同与收入核对、付款与银行流水核对、库存账实核对、子公司上报核对、合并报表差异追溯、指标口径变更、数据质量校验或审计追溯。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 核对对象：记录、指标、单据、字段、系统、版本、汇总数据或明细数据。
- 来源系统：源系统 A/B/C、数据仓库、报表层、手工调整、锁定版本。
- 数据粒度：指标级、组织级、科目级、单据级、行项目级、交易级、SKU 级、字段级。
- 匹配规则：主键、复合键、时间窗口、金额/数量、模糊匹配、一对多、多对一、人工匹配。
- 口径版本：公式、字段映射、过滤条件、聚合层级、币种/单位、税口径、调整规则。
- 容差规则：金额、数量、日期、汇率、四舍五入、时间延迟。
- 处理机制：标记原因、分派、修正、重算、重匹配、确认、审批、关闭、复开。

## 思路逻辑

从“如何证明数据可信”出发，而不是从“如何判断业务好坏”出发。

1. 定义核对范围：明确哪些系统、版本、周期、对象和数据集参与核对。
2. 定义数据粒度：先统一比较粒度，再做汇总或明细钻取。
3. 定义匹配规则：说明如何匹配记录，匹配失败如何分类。
4. 定义口径和版本：说明公式、字段映射、过滤条件、单位、币种、锁定状态和更新时间。
5. 汇总核对结果：展示匹配率、差异数、差异金额、待确认、已处理和未处理。
6. 定位差异来源：按金额、数量、日期、组织、缺失、重复、口径、映射、同步、手工调整分类。
7. 展示来源对比：源系统值并排展示，字段级高亮，计算差异。
8. 建立证据链：展示源单据、系统、接口、仓库、转换、指标、调整和报表输出路径。
9. 设计关闭流程：解释、修正、重算、确认、审批和关闭都要留痕。

## 落地路径

按下面顺序把核对方法落到页面或原型：

1. 定义核对目标
   将需求改写成“比较哪些来源在什么粒度、什么周期内是否一致，并给出可信结论”。

2. 统一数据粒度
   明确核对发生在汇总指标、组织、科目、单据、行项目、交易、库存 SKU 或字段级。不同粒度要有聚合关系。

3. 制定核对规则
   明确匹配键、候选键、容差、时间窗口、一对多/多对一、人工匹配、排除条件和差异分类。

4. 制定口径版本规则
   明确指标公式、字段映射、数据版本、锁定版本、调整版本、单位、币种和更新时间。

5. 设计信息架构
   常用层级是“核对结果 -> 差异分类 -> 来源对比 -> 差异明细 -> 血缘追溯 -> 处理闭环 -> 审计日志”。

6. 映射组件
   用匹配率卡、差异分类图、来源对比表、字段高亮、差异明细表、血缘图、处理状态表、审计日志承载核对任务。

7. 设计交互
   支持差异下钻、来源下钻、版本切换、规则弹层、字段解释、差异抽屉、批量分派、修正、确认、审批和跳源系统。

8. 明确数据契约
   为核对结果、来源值、差异字段、匹配规则、口径版本、血缘节点、处理状态、审批和日志定义字段与接口。

9. 验收表达
   验收时检查用户是否能证明数据可信、定位差异来源、查看证据链并完成修正确认。

## 核对规则模型

- 来源定义：系统、表/报表、数据负责人、更新时间、版本、锁定状态。
- 匹配键：单据号、合同 ID、客户 ID、项目 ID、科目、组织、日期、金额、数量、复合键。
- 匹配类型：精确匹配、模糊匹配、一对一、一对多、多对一、时间窗口、人工匹配。
- 容差规则：金额、数量、日期、汇率、舍入、币种/单位、含税/不含税。
- 口径规则：公式、聚合层级、过滤条件、纳入/排除、调整规则、映射关系。
- 差异类型：缺失、重复、金额不一致、数量不一致、日期不一致、组织不一致、映射错误、同步延迟、手工调整、版本不一致。
- 处理规则：确认、修正、重算、重匹配、忽略并说明、审批、关闭、复开。

每条差异都要说明为什么被归为该差异类型。

## 组件选择

- 指标卡：承载匹配率、差异金额、待处理、处理进度。
- 条形图/矩阵：承载差异类型、组织、系统、科目分布。
- 来源对比表：并排展示多个来源的字段和值。
- 字段级高亮：突出不一致字段。
- 偏差条：展示差异金额或数量。
- 血缘图/流程图：展示数据从源头到报表的路径。
- 状态流表：展示差异处理状态。
- 日志表：展示确认、修正、审批和关闭记录。
- 可导出明细表：生成核对或审计材料。

表格、来源对比和血缘证据通常比趋势图更重要。

## 证据链设计

每个重要差异都应展示：

- 哪些系统不一致。
- 哪些记录或字段不一致。
- 各来源的实际值。
- 差异金额、差异率、日期差或分类。
- 匹配规则和失败原因。
- 指标口径和字段映射。
- 数据版本和更新时间。
- 源单据和血缘路径。
- 当前处理状态和负责人。
- 确认、修正、审批和操作日志。

证据链质量决定用户是否信任报表。

## 处理与审计闭环

建议使用可追溯的生命周期：

1. 已发现：核对规则生成差异。
2. 已分类：识别差异类型和影响。
3. 已分派：确定解释或修正责任人。
4. 已解释：标记原因并附证据。
5. 已修正/已确认：修正、重算、重匹配，或确认合理差异。
6. 已审批：需要时由审核人确认调整或关闭。
7. 已关闭：带原因、证据、操作人和时间戳关闭。
8. 已复开：差异复发或关闭被质疑。

## 与其他报表的边界

- 判断业务状态，用 `status-overview-report-design`。
- 解释业务变化原因，用 `analysis-diagnostic-report-design`。
- 查看具体业务记录，用 `detail-query-report-design`。
- 修正任务闭环，用 `operational-execution-report-design`。
- 将重大差异纳入会议材料，用 `review-recap-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将匹配结果、差异类型、来源对比、血缘、日志和修正动作映射为组件和绑定矩阵。
- 用 `report-visual-layout-design` 处理对比表、血缘区域、差异抽屉、操作流和审计区。
- 用 `report-component-style-design` 处理字段高亮、密集表格、血缘图、差异标签和证据布局。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：来源版本、匹配规则、差异字段、血缘证据、修正确认和审计日志是否完整可追溯。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计核对追溯类报表时，按这个结构输出：

1. 设计定位：说明核对场景、用户、系统、范围、粒度和可信目标。
2. 核对思路：说明如何比较记录/指标，如何定位和追溯差异。
3. 核对规则：说明匹配键、口径、容差、版本、字段映射和差异分类。
4. 布局框架：说明结果、分类、来源对比、明细、血缘、处理、审计层级。
5. 字段清单：说明差异 ID、系统、字段、值、差异、原因、状态、负责人、版本和期限。
6. 组件映射：说明卡片、对比表、字段高亮、血缘图、状态表和日志的任务。
7. 交互路径：说明差异下钻、来源下钻、版本切换、规则弹层、抽屉、批量动作和跳源。
8. 处理闭环：说明原因标记、修正、重算、重匹配、审批、关闭、复开和日志。
9. 可信结论：说明匹配率、差异金额、主要来源、未解决项和修正时限。

## 质量清单

- 核对范围、粒度、系统、版本和更新时间是否清楚。
- 匹配规则、容差、口径和字段映射是否明确。
- 差异记录是否展示来源值和字段级高亮。
- 差异分类是否解释原因。
- 是否能从报表指标追到源系统和原始单据。
- 抽屉是否提供证据、状态、负责人、修正、审批和日志。
- 处理生命周期是否支持发现、分类、分派、解释、修正/确认、审批、关闭和复开。
- 最终结论是否是数据可信结论，而不是业务表现结论。

## 避免

- 不要把核对追溯当成普通经营分析。
- 不要只有差异金额，没有来源值和字段差异。
- 不要省略匹配规则、容差、口径和版本。
- 不要隐藏源系统、更新时间和血缘。
- 不要允许差异无原因、无证据、无日志关闭。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
