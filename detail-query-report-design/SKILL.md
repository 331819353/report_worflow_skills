---
name: detail-query-report-design
description: "设计、评审或提炼明细查询类报表的通用思路逻辑和落地路径。适用于明细查询、记录列表、交易/订单/项目/费用/合同/付款/库存/异常明细、导出型表格、审计查询、来源记录检索等场景，但不要局限于某个业务对象或单一表格样式。重点沉淀查询目标、行粒度、字段模型、筛选体系、表格结构、行级详情、权限导出、来源追溯、数据落地和操作效率。"
---

# 明细查询报表设计

## 核心定位

把明细查询类报表当作一种“找记录、筛批次、看详情、可导出、可追溯”的通用方法。它的价值不是讲故事或做趋势分析，而是让用户快速、准确、可控地找到具体业务记录，并能查看详情、导出、追溯来源或进入处理动作。

适用对象可以是合同、项目、订单、客户、费用、预算记录、付款、库存、发票、审批、异常、任务、门店记录、交易流水或任何需要记录级检索的对象。

## 通用输入

设计前先明确这些输入，缺失时要先提出假设：

- 查询目的：查找单条记录、筛选一批记录、审计核查、导出、处理、追溯、复核。
- 行粒度：一行代表什么业务对象，不能混合粒度。
- 用户角色：管理者、经办人、审核人、财务、运营、审计、数据治理人员。
- 字段来源：主数据、交易系统、审批系统、财务系统、数据仓库、手工补充。
- 权限规则：行权限、字段权限、操作权限、导出权限、来源跳转权限。
- 操作动作：查看详情、导出、批量处理、标记、分派、核对、跳源系统。

## 思路逻辑

从“用户如何找到目标记录”出发，而不是从“表格长什么样”出发。

1. 定义查询任务：用户是已知编号查找，还是按条件筛批次。
2. 定义行粒度：一行必须代表清晰、稳定、可追溯的对象。
3. 建立字段模型：字段要能识别、描述、分类、计量、标记状态、定位责任、追溯来源和触发操作。
4. 建立筛选模型：高频条件前置，复杂条件进入高级筛选。
5. 设计主表结构：默认列、可配列、冻结列、排序、汇总、分页、选择、批量操作。
6. 设计行级详情：打开记录时能看到基本信息、关联对象、流程、日志、附件、来源和异常解释。
7. 设计导出和治理：导出必须遵守当前筛选、选择范围、权限、脱敏和审计要求。

## 落地路径

按下面顺序把查询方法落到页面或原型：

1. 定义行粒度
   写清“一行等于一个什么”。如果需要展示多个粒度，要拆表、分组或用主从结构。

2. 拆解用户任务
   区分精确查找、模糊搜索、批量筛选、异常筛选、导出、审计、处理、来源追溯。

3. 建立字段体系
   将字段分为识别字段、对象字段、组织字段、时间字段、金额/数量字段、状态字段、分类字段、责任字段、风险字段、来源字段和操作字段。

4. 建立筛选体系
   设计关键词搜索、常用快捷筛选、高级筛选、保存视图、默认筛选和权限范围。

5. 设计表格主界面
   设计列顺序、默认宽度、冻结列、排序、合计、条件格式、状态标签、分页或虚拟滚动、批量选择和批量操作。

6. 设计详情承载
   用右侧抽屉承载快速查看，用详情页承载复杂对象。详情中要有流程、日志、附件、关联对象和源系统信息。

7. 设计导出与审计
   明确导出格式、导出范围、字段脱敏、行数限制、水印、审批、导出日志和权限控制。

8. 明确数据契约
   为表格、筛选、统计提示、行详情、操作按钮和导出定义字段、枚举、权限、接口参数和返回结构。

9. 验收表达
   验收时检查用户是否能快速筛到目标记录、理解结果规模、打开详情、追溯来源、按权限导出或处理。

## 字段模型

- 识别字段：记录编号、合同号、项目编码、订单号、客户号、单据号。
- 对象字段：客户、项目、产品、门店、供应商、员工、部门、区域、业务单元。
- 时间字段：创建日期、交易日期、签约日期、到期日、审批日、付款日、更新时间。
- 金额/数量字段：金额、预算、差异、已付、未付、数量、单价、税额、余额。
- 状态字段：完成、待处理、异常、作废、审批中、逾期、超预算、已核对、未核对。
- 分类字段：类型、品类、科目、业务线、项目类型、客户类型、渠道、风险类别。
- 责任字段：负责人、审批人、创建人、部门负责人、区域负责人。
- 追溯字段：源系统、源单据、关联合同、关联订单、关联发票、关联任务。
- 操作字段：查看、跳转、导出、分派、处理、核对、备注、复制链接。

## 组件选择

- 表格是主组件，图表只作为结果提示或辅助筛选。
- 状态标签用于状态、风险、审批、逾期、异常。
- 条件格式用于异常金额、超预算、逾期日期、缺失字段。
- 单元格迷你条只在提升扫描效率时使用。
- 批量选择和悬浮操作条用于导出、分派、处理、核对。
- 抽屉用于行详情和快速核验。
- 弹层用于字段定义、状态解释、金额来源、审批说明和告警原因。

## 权限与治理

明细查询必须把权限作为设计的一部分：

- 行权限：用户能看哪些组织、区域、部门、负责人或对象。
- 字段权限：敏感字段是显示、脱敏、隐藏还是仅可导出。
- 操作权限：谁能导出、跳源、处理、审批、编辑、看日志。
- 导出治理：导出上限、水印、审批、审计日志、敏感字段脱敏。
- 来源权限：不是所有用户都能跳到源系统或原始单据。
- 数据新鲜度：显示更新时间、源系统、同步状态或延迟说明。

## 与其他报表的边界

- 要判断整体状态，用 `status-overview-report-design`。
- 要解释变化原因，用 `analysis-diagnostic-report-design`。
- 要监控预警并闭环，用 `anomaly-monitoring-report-design`。
- 要把记录转为任务，用 `operational-execution-report-design`。
- 要核对多系统差异，用 `reconciliation-traceability-report-design`。

## 参考样例

- 当需要具体样例、验收口径或反例时，读取 `references/01-pattern-examples-and-acceptance.md`；纯通用设计问题不必加载。

## 协同技能

- 用 `report-info-component-mapping` 将字段、筛选、表格、详情、状态、权限、导出和来源跳转映射为组件和绑定矩阵。
- 用 `report-visual-layout-design` 处理筛选区、工具栏、表格主区域、抽屉和操作区。
- 用 `report-component-style-design` 处理表格密度、列宽、标签、冻结列、滚动、空态和溢出。

## 独立调用最低落地门禁

当本 skill 未经 `report-design-workflow` 直接使用时，不要停留在方法论。最终输出至少补齐：

- 数据契约：指标字段、行粒度、基准/阈值、公式、更新时间、数据源或接口依赖。
- 筛选与交互：主筛选、影响组件、下钻/抽屉/跳转参数、返回和重置行为。
- 权限与状态：组织/对象权限、导出权限、空态、加载、错误、无权限、筛选后失效状态。
- 校验方式：表格行数、汇总数、详情抽屉、导出结果和来源记录是否在同一筛选/权限范围内一致。
- 后续契约：如果要进入原型或实现，必须交给 `report-info-component-mapping` 生成绑定矩阵。

## 输出格式

当用户要求设计明细查询类报表时，按这个结构输出：

1. 设计定位：说明查询对象、行粒度、用户任务和使用角色。
2. 查询思路：说明用户如何从全量记录筛到目标记录。
3. 字段体系：列出默认字段、可选字段、状态字段、风险字段、追溯字段和操作字段。
4. 筛选体系：说明关键词、快捷筛选、高级筛选、保存视图和权限范围。
5. 表格设计：说明列、排序、冻结、合计、高亮、分页、批量操作和导出。
6. 详情设计：说明抽屉/详情页、关联对象、流程、日志、附件和来源。
7. 权限导出：说明行/字段/操作/导出权限、脱敏和审计。
8. 数据落地：说明字段字典、枚举、接口参数、返回结构和更新频率。
9. 结果提示：给出记录数、金额/数量合计、异常数、逾期数或导出范围。

## 质量清单

- 是否明确一行代表什么。
- 默认字段是否服务最常见查询任务。
- 高频筛选是否前置，高级筛选是否完整。
- 表格是否支持排序、列配置、冻结列、分页或虚拟滚动。
- 行点击是否能完成核验和来源追溯。
- 导出是否遵守当前筛选、选中范围、权限和脱敏规则。
- 状态标签是否有规则说明。
- 是否展示数据来源、更新时间和同步状态。

## 避免

- 不要用大量图表稀释明细查询的主任务。
- 不要混合不同粒度的记录。
- 不要把筛选放到用户难以发现的位置。
- 不要让导出绕过权限或筛选条件。
- 不要没有行级详情和来源追溯。
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
