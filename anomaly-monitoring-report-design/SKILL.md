---
name: anomaly-monitoring-report-design
description: "设计、评审或提炼异常监控类报表的通用思路逻辑和落地路径。适用于异常监控、预警、风险告警、SLA 超时、阈值监控、异常闭环、经营/财务/库存/项目/客户/订单/数据异常监控等场景，但不要局限于某个告警看板。重点沉淀监控对象、异常规则、严重等级、影响范围、告警清单、责任人、SLA、处理流程、降噪机制、数据落地、审计日志和闭环结论。"
---

# 异常监控报表设计

## 核心定位

把异常监控类报表当作一种“及时发现风险并推动处理闭环”的通用方法。它的价值不是完整分析业务原因，而是回答有没有异常、异常在哪里、严重程度如何、影响多大、谁负责、多久处理、是否关闭、是否复发。

适用对象可以是收入波动、费用超预算、毛利低于红线、回款逾期、库存积压、项目延期、投诉激增、订单履约异常、数据上报异常、门店运营异常、现金流风险或任何可规则化监控的对象。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 监控对象：指标、流程、实体、记录、系统、数据质量或业务事件。
- 监控范围：组织、区域、业务线、对象类型、时间粒度、数据源。
- 刷新频率：实时、小时、日、周、月、批次。
- 异常规则：阈值、偏差、趋势、持续时间、SLA、缺失、复发、组合规则。
- 严重等级：红/橙/黄/灰或高/中/低，和影响、紧急度、持续时间、复发相关。
- 处理机制：负责人、状态、期限、升级、证据、关闭、忽略、复开。
- 降噪策略：合并、抑制、优先级、订阅、重复提醒控制。

## 思路逻辑

从“什么必须被发现并处理”出发，而不是从“能展示哪些指标”出发。

1. 定义监控对象：明确被观察的是指标、流程、实体还是数据。
2. 定义触发规则：每条告警都要能说明为什么触发。
3. 定义严重等级：等级必须与影响、紧急度、持续时间、复发或 SLA 相关。
4. 定位影响对象：找到组织、项目、门店、客户、订单、账号、流程节点或责任人。
5. 量化影响：说明金额、数量、客户、订单、时长、频次或业务风险。
6. 设计处理流程：支持确认、分派、整改、忽略、关闭、升级、留痕。
7. 控制告警疲劳：合并重复、降低噪声、突出必须处理的异常。

## 落地路径

按下面顺序把监控方法落到页面或原型：

1. 定义监控范围
   写清监控指标、对象、组织范围、数据源、刷新频率和监控周期。

2. 制定异常规则
   明确固定阈值、目标偏差、趋势突变、连续异常、SLA 超时、缺失数据、重复发生、组合规则和人工标记。

3. 制定等级与优先级
   将规则映射到严重等级，结合影响金额、对象数量、持续时长、复发次数、是否逾期和是否需要即时处理。

4. 设计信息架构
   常用层级是“异常概览 -> 严重等级 -> 分布定位 -> 趋势复发 -> 告警清单 -> 处理动作 -> 降噪规则”。

5. 映射组件
   用预警卡、等级状态、分布热力、趋势/控制图、Top N、告警列表、SLA 计时、处理抽屉和任务表承载监控任务。

6. 设计交互
   支持等级下钻、组织下钻、类型下钻、状态筛选、告警抽屉、批量分派、关闭/忽略、升级、订阅和规则配置。

7. 明确数据契约
   为告警定义 ID、规则、对象、当前值、阈值、偏差、首次发生、持续时长、影响、等级、负责人、状态、期限和日志。

8. 设计处理闭环
   每条重要异常都要有确认、分派、处理、提交证据、关闭、复开或升级路径。

9. 验收表达
   验收时检查用户是否能知道当前最严重异常是什么、谁处理、何时完成、是否逾期和是否复发。

## 异常规则模型

- 阈值规则：高于或低于固定警戒线。
- 偏差规则：相对目标、预算、计划、均值、标杆偏离超过阈值。
- 趋势规则：连续上升/下降、突增突降、异常波动。
- 持续规则：异常状态持续超过指定时长。
- SLA 规则：业务处理或系统流程超过承诺期限。
- 缺失规则：必填字段、报表、单据、接口数据缺失。
- 复发规则：同一对象或同类异常在周期内反复出现。
- 组合规则：多个弱信号同时出现提升等级。
- 人工规则：用户、审计或管理者手工标记异常。

每条告警都应暴露触发原因、规则、阈值、当前值、偏差、开始时间、持续时长和严重等级。

## 组件选择

- 预警卡：承载总异常、高风险、新增、已处理、逾期、影响金额。
- 等级状态卡：承载红橙黄灰或高中低分布。
- 热力图/矩阵/地图：承载组织、区域、对象、类型分布。
- 趋势图/控制图：承载异常数量、阈值边界和异常波动。
- Top N：承载高影响对象、类型、负责人或组织。
- 告警列表：承载具体异常项，是操作中心。
- SLA 计时和状态标签：承载紧急度和处理状态。
- 处理抽屉：承载证据、日志、负责人、操作和关闭规则。

## 处理生命周期

建议使用可审计的状态流：

1. 新建：规则或人工生成告警。
2. 已确认：确认是真实异常。
3. 已分派：设置责任人和期限。
4. 处理中：处理动作已开始。
5. 已升级：逾期、高风险或长期未解决。
6. 已关闭：记录结果、原因、证据和关闭人。
7. 复开/复发：同一问题再次出现或关闭无效。

忽略和关闭都要记录原因，重要异常要保留证据。

## 降噪机制

监控必须设计降噪：

- 按严重度、影响、持续时间、复发和 SLA 排序。
- 合并同对象同规则的重复告警。
- 在配置窗口内抑制重复提醒。
- 区分必须处理、观察、已知问题和低优先级噪声。
- 对大量低价值告警给出规则调优建议。
- 对忽略、关闭、规则调整保留审计日志。

## 与其他报表的边界

- 要解释异常根因，用 `analysis-diagnostic-report-design`。
- 要查看异常明细记录，用 `detail-query-report-design`。
- 要把异常转任务，用 `operational-execution-report-design`。
- 要核对是否数据错误，用 `reconciliation-traceability-report-design`。
- 要汇报重复重大异常，用 `review-recap-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将告警数量、等级、分布、趋势、清单、SLA、处理动作映射为组件和绑定矩阵。
- 用 `report-visual-layout-design` 处理监控页层级、告警列表、处理抽屉和规则配置入口。
- 用 `report-component-style-design` 处理红黄绿状态、告警卡、列表密度、倒计时和视觉优先级。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：异常规则、等级、影响对象、SLA、责任人、处理记录和关闭原因是否可追溯。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计异常监控类报表时，按这个结构输出：

1. 设计定位：说明监控对象、受众、范围、刷新频率和风险目的。
2. 异常规则：说明阈值、触发逻辑、等级、优先级和复发规则。
3. 布局框架：说明概览、等级、分布、趋势、清单、处理、降噪层级。
4. 字段清单：说明告警 ID、对象、指标、当前值、阈值、偏差、时间、影响、责任人、状态、期限和动作。
5. 组件映射：说明卡片、热力、控制图、Top N、列表、状态表的任务。
6. 交互路径：说明下钻、抽屉、批量操作、SLA、订阅、推送和规则配置。
7. 处理闭环：说明确认、分派、处理、升级、关闭、忽略、复开和日志。
8. 降噪机制：说明合并、抑制、优先级、复发和规则调优。
9. 行动结论：说明哪些异常必须处理、由谁处理、何时完成。

## 质量清单

- 每条告警是否有明确规则、阈值、当前值、偏差和等级。
- 等级是否与影响、紧急度、持续时间、复发或 SLA 相关。
- 页面是否能从概览定位到具体异常项。
- 告警清单字段是否足以支持行动。
- 抽屉是否包含证据、日志、负责人、SLA 和操作。
- 是否支持关闭、忽略、升级和复开。
- 是否设计重复合并、提醒抑制和低价值告警治理。
- 结论是否说明异常规模、集中位置、责任人、期限和升级建议。

## 避免

- 不要创建没有规则或阈值的告警。
- 不要让所有告警看起来同等紧急。
- 不要只有数量，没有具体异常对象。
- 不要停留在发现异常，必须包含处理闭环。
- 不要允许无原因关闭或忽略重要异常。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
