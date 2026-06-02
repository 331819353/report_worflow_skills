# 明细查询子类型选择与下钻上下文

Use this reference when a detail query report may involve multiple design parts, when the user asks for 明细、台账、清单、流水、单据、附件、日志、下钻、构成明细, or when the page must classify detail-query patterns by reference categories.

## 1. Boundary

明细查询回答“哪些具体记录构成这个结果、如何定位并核实这些记录”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览看整体状态；明细查询看构成整体状态的具体记录 |
| 分析诊断 | 分析诊断解释原因；明细查询提供原因判断所需的事实样本和证据记录 |
| 异常监控 | 异常监控发现并分级；明细查询查看异常对象和处理证据 |
| 核对追溯 | 核对追溯解决系统/口径差异；明细查询提供可核对的源记录列表 |
| 运营执行 | 运营执行推动任务闭环；明细查询定位任务、工单或待处理记录 |

Choose the primary detail query subtype by:

```text
查询对象 + 记录粒度 + 查询任务
```

## 2. Selection Rule

Declare exactly one primary `detailQuerySubtype` before designing the page:

- `objectLedger`: 对象档案/台账明细查询。
- `businessDocument`: 业务单据明细查询。
- `lineItem`: 行项目/组成项明细查询。
- `transactionEvent`: 交易流水/行为事件明细查询。
- `currentBalance`: 存量余额/当前清单明细查询。
- `processTrace`: 流程节点/状态轨迹明细查询。
- `taskTicket`: 任务事项/工单明细查询。
- `relationshipMapping`: 关联关系/映射明细查询。
- `metricSource`: 指标口径/汇总来源明细查询。
- `exceptionList`: 异常对象/问题清单明细查询。
- `evidenceAttachment`: 凭证附件/材料明细查询。
- `operationLog`: 操作日志/系统事件明细查询。

Complex pages may contain secondary sections, but the primary subtype owns row grain, default columns, primary filters, export rules, and row detail structure. Secondary subtypes may appear as tabs, related-record blocks, or drawer sections.

## 3. Upstream Drilldown Gate

If the page is launched from status overview, analysis diagnosis, anomaly monitoring, reconciliation traceability, or another upper-level report, inherit the upstream context but keep the detail-query page centered on records:

```text
来源报表/模块 -> 来源指标/对象 -> 继承筛选/口径/权限 -> 相关记录 -> 详情/追溯/导出
```

Before designing fields or layout, declare:

- Source entry: report name, module name, widget/card/table row, source metric/object, and source ID when available.
- Inherited filters: time range, organization, region, product, customer, owner, status, permission scope, and source system.
- Metric or object logic: aggregation field, formula, inclusion/exclusion rules, currency/unit, deduplication, and snapshot time when the entry is metric-based.
- Record scope: why these rows are included in this drilldown result and which records are excluded by filters, permissions, or data rules.
- Return path: how users return to the upper-level report with context preserved.

All table filters, default columns, result summaries, details, exports, and source jumps must help answer:

```text
这次下钻带来了哪些记录？
为什么这些记录被纳入或排除？
这些记录如何被核实、追溯或导出？
```

If no upstream context exists, mark the page as `standaloneDetailQuery`. Do not force a variance, pre-actual, or diagnostic narrative into a standalone detail query.

## 4. Subtype Patterns

| Subtype | Row grain | Core object | Typical fields | Main task |
| --- | --- | --- | --- | --- |
| `objectLedger` 对象档案/台账 | 一个业务对象 | 客户、供应商、SKU、设备、门店、员工、账号 | 唯一标识、名称、状态、归属、等级、启停时间、负责人 | 精准定位对象、查看对象详情、进入关联记录 |
| `businessDocument` 业务单据 | 一张业务单据 | 订单、合同、采购单、发票、付款单、报销单、出入库单 | 单号、主体、金额、状态、时间、归属、关联单据 | 按单号/状态/金额/时间筛单据并核实流转 |
| `lineItem` 行项目/组成项 | 一张单据内的一个组成项 | 订单商品行、发票行、费用项、成本项、合同条款 | 上级单号、SKU/科目、数量、单价、金额、税率、状态 | 解释总额由哪些明细项构成 |
| `transactionEvent` 交易流水/行为事件 | 一次交易、变动或事件 | 资金流水、库存流水、积分流水、行为事件 | 发生时间、事件类型、变动对象、变动值、前后状态、操作者 | 按时间顺序核实变动过程 |
| `currentBalance` 存量余额/当前清单 | 某对象在某时点的余额或状态 | 库存余额、应收余额、可用额度、资产占用 | 对象、位置、当前值、可用/冻结/占用、账龄、截止时间 | 查看当前剩余、占用、冻结和可用情况 |
| `processTrace` 流程节点/状态轨迹 | 一个流程节点或状态变更 | 审批、物流轨迹、订单状态、项目阶段 | 节点、状态、开始/完成时间、耗时、处理人、意见 | 查看过程、卡点、超期节点和责任人 |
| `taskTicket` 任务事项/工单 | 一个任务或工单 | 工单、待办、整改项、投诉、缺陷、需求 | 事项编号、类型、优先级、状态、负责人、SLA、关闭时间 | 查询待处理、已关闭、超期或责任事项 |
| `relationshipMapping` 关联关系/映射 | 一条对象关系 | 客户-合同、订单-发票、商品-供应商、主子账号 | 主对象、从对象、关系类型、生效时间、状态、来源 | 查看对象之间如何关联和映射 |
| `metricSource` 指标口径/汇总来源 | 一条构成汇总的源记录 | 指标下钻记录、收入来源、费用构成、预算执行来源 | 指标字段、来源记录、金额/数量、口径标签、排除原因 | 验证汇总数或指标值由哪些记录构成 |
| `exceptionList` 异常对象/问题清单 | 一个异常对象或问题记录 | 异常订单、逾期客户、缺货SKU、失败任务 | 异常类型、严重级别、影响金额、持续时长、责任人、状态 | 查看异常对象、优先级和处理入口 |
| `evidenceAttachment` 凭证附件/材料 | 一份附件、凭证或材料 | 发票、合同附件、回单、资质、图片、证明材料 | 文件名、类型、关联对象、上传人、时间、校验状态、权限 | 查证据材料、下载或核验附件 |
| `operationLog` 操作日志/系统事件 | 一次操作或系统事件 | 登录、导出、权限变更、接口调用、数据同步 | 操作时间、操作者、动作、对象、结果、IP、请求ID | 审计谁在何时做了什么 |

## 5. Tag System

Use one subtype plus task and time tags.

Query task tags:

| Tag | Use |
| --- | --- |
| `exactLocate` | 用户已知编号、名称、ID或关键字 |
| `conditionFilter` | 用户按组合条件筛一批记录 |
| `batchCheck` | 用户要批量核查、复核、导出或比对 |
| `drilldownEvidence` | 承接上层总览、诊断、异常、核对的下钻 |
| `exportArchive` | 以导出留档、审计或交付为主要目的 |
| `processView` | 查看流程、状态轨迹、节点耗时 |
| `relationView` | 查看对象之间的关联、映射、上下游 |
| `evidenceView` | 查看附件、凭证、日志或源系统证据 |
| `permissionBound` | 强依赖行权限、字段权限、附件权限或导出权限 |

Time shape tags:

| Tag | Meaning |
| --- | --- |
| `currentState` | 当前态，展示最新状态或余额 |
| `historyState` | 历史态，展示某对象过去记录 |
| `eventStream` | 流水态，按发生时间展示事件 |
| `periodOwned` | 周期归属态，按业务周期、会计期、统计期归属 |
| `cutoffSnapshot` | 截止时点态，按快照时间解释余额或状态 |

## 6. Drilldown-Aware Detail Structure

When there is an upstream drilldown context, structure the page as:

```text
Context strip: 来源报表/模块/指标或对象/口径/继承筛选/返回入口
Query and filter bar: only filters compatible with the inherited source scope
Result summary: rows, amount/quantity total, excluded count, summary coverage
Main table: records included in or related to the source entry
Row detail drawer: source, formula fields, process, attachment, log, related records
Reconcile/export area: export scope, permission, source jump, audit log
```

For standalone detail query, structure the page as:

```text
Query and filter bar
Result summary
Main table
Row detail drawer
Related records/attachments/logs
Export and governance
```

## 7. Detail Query Canvas

Use this canvas before producing a prototype or implementation spec:

| Canvas field | Question to answer |
| --- | --- |
| Report name | 这张明细表叫什么 |
| Primary subtype | 属于 12 类中的哪一类 |
| Query object | 用户要查什么对象 |
| Row grain | 一行代表什么 |
| Query task | 精准定位、条件筛选、批量核查、下钻承接、导出留档、过程查看、关联查看、证据查看 |
| Entry point | 菜单入口、总览下钻、诊断下钻、异常下钻、核对追溯下钻 |
| Upstream context | 是否有来源报表/模块、来源指标/对象、继承筛选、指标口径和返回路径 |
| Default columns | 不点详情也必须看见哪些字段 |
| Optional columns | 哪些字段放在列配置里 |
| Detail content | 点开一行看哪些基本信息、流程、附件、日志、来源 |
| Filters | 关键词、快捷筛选、高级筛选、批量ID、保存视图 |
| Summary | 行数、金额/数量合计、异常数、汇总覆盖率 |
| Related drilldown | 能跳到哪些对象、单据、流程、附件、日志 |
| Export rule | 当前筛选导出、选中导出、脱敏、水印、审批、导出日志 |
| Permission rule | 行权限、字段权限、附件权限、源系统跳转权限 |
| Data logic | 时间口径、状态口径、统计口径、排除规则、刷新频率 |
| Performance | 默认时间范围、分页、虚拟滚动、索引、历史归档 |

## 8. Acceptance Gate

Before accepting a detail query design, verify:

- It declares exactly one `detailQuerySubtype`.
- It states “one row equals what” and avoids mixed row grain.
- It states the query task and the entry point.
- If an upstream context exists, source report/module, source metric/object, inherited filters, metric logic, return path, and inclusion/exclusion rules are visible.
- Detail totals can reconcile with the upper-level metric, anomaly list, or reconciliation result under the same permission scope.
- Default columns support quick judgment without forcing users to open every row.
- Details support source record, related records, process/log/attachment evidence as needed.
- Export respects current filters, selected rows, permission, desensitization, watermark, and audit trail.
- Large data scenarios have default time range, pagination/virtual scroll, field configuration, and performance constraints.

## 9. Avoid

- Do not make charts the primary component unless they directly support filtering or result explanation.
- Do not mix objects, documents, line items, events, and logs in the same table without a master-detail or tab structure.
- Do not drop upper-level filters, metric scope, permission scope, source entry, return path, or exclusion rules when drilling into detail records.
- Do not claim cause conclusions from a detail list alone; hand off cause explanation to `analysis-diagnostic-report-design`.
- Do not allow export to bypass row permissions, field permissions, attachment permissions, or desensitization rules.
