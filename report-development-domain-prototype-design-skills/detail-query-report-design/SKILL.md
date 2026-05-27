---
name: detail-query-report-design
description: "Design, critique, or refine the design thinking for 明细查询类报表 as a report category, not just one specific detail table. Use when the task asks how to design detailed query reports, record lists, transaction detail pages, contract/project/customer/order/expense/budget/payment/inventory/exception details, operational lists, audit query pages, export-oriented tables, source-record lookup reports, or any report whose purpose is to help users quickly find, filter, sort, inspect, export, and trace specific records or batches of records. Emphasize reusable design logic: query objective, field model, filter system, table structure, row-level detail, permissions, export, source trace, and operational efficiency."
---

# Detail Query Report Design

## Core Positioning

Treat 明细查询类报表 as a report type. Design the retrieval method first, then instantiate it for concrete objects such as contracts, projects, customers, orders, expenses, budget execution records, stores, regional performance rows, payments, inventory, exceptions, invoices, approvals, or tasks.

This report type answers:

- 具体有哪些数据。
- 我要找某一条、某一批或某一类记录。
- 当前筛选结果包含多少数据、金额或异常。
- 某条记录的详情、流程、来源和关联对象是什么。
- 这些记录能否排序、导出、追踪、核查或处理。

Do not design it as a trend analysis or storytelling report. Its core value is: 查得快、筛得准、导得出、看得清、追得到。

## Design Mindset

Start from "how users find the target record", not from "what charts look good".

Use this chain:

1. Query purpose: determine whether the user needs lookup, audit, reconciliation, batch analysis, export, monitoring, or operational handling.
2. Record object: define the business object represented by each row.
3. Field model: decide which fields identify, describe, classify, measure, status-mark, and trace the record.
4. Filter model: define how users narrow records by time, organization, type, status, amount, owner, risk, keyword, and permission scope.
5. Table model: design default columns, configurable columns, frozen columns, sorting, grouping, totals, highlighting, pagination, and batch actions.
6. Detail model: define what appears when a row is opened, such as basic info, related documents, workflow, logs, attachments, and source.
7. Output model: support export, saved queries, copied links, source jumps, and permission-aware field visibility.

## Universal Design Workflow

1. Define the row grain.
   Identify what one row means: one contract, one project, one order, one cost line, one payment, one inventory item, one exception, one approval, or one source document. Avoid mixing multiple grains in one table.

2. Define user tasks.
   Clarify whether users are searching a known record, screening a batch, checking anomalies, exporting data, auditing accuracy, or entering a business object for follow-up.

3. Build the field system.
   Split fields into identifier fields, business description fields, organization fields, time fields, amount/quantity fields, status fields, owner fields, risk tags, source fields, and operation fields.

4. Prioritize filters.
   Put high-frequency filters first. Support advanced filters for lower-frequency conditions. Provide quick filters for common scenarios such as 待处理, 异常, 超预算, 逾期, 本月, 我负责的, 已作废.

5. Design the table as the main surface.
   Use the table as the core component. Charts are optional summaries, not the main interaction.

6. Design row-level inspection.
   Clicking a row should open a drawer or detail page with enough context to verify the record, understand its process, and trace its source.

7. Design export and permission.
   Decide who can see which rows and fields, who can export, whether sensitive fields are masked, and whether exports follow the same filters and permissions.

8. Provide lightweight result hints.
   Show count, total amount, abnormal count, overdue count, selected count, or export scope so users understand the scale of the current result set.

## Field Design Logic

For each detail report, define fields by function:

- Identifier fields: record number, contract number, project code, order ID, customer ID, document number.
- Object fields: customer, project, product, store, supplier, employee, department, region, business unit.
- Time fields: creation date, transaction date, signing date, due date, approval date, payment date, update time.
- Amount and quantity fields: amount, budget, variance, paid amount, unpaid amount, quantity, unit price, tax, balance.
- Status fields: completed, pending, abnormal, voided, approving, overdue, over budget, reconciled, unreconciled.
- Classification fields: type, category, account, business line, project type, customer type, channel, risk class.
- Owner fields: responsible person, approver, creator, department owner, regional owner.
- Trace fields: source system, source document, related contract, related order, related invoice, related task.
- Operation fields: view detail, jump source, export, assign, handle, reconcile, add note, copy link.

Make default columns serve the most common lookup task. Allow users to configure columns for personal or role-based work.

## Process/Funnel Absorption

When a process/funnel view needs record-level support, absorb it into 明细查询型 as process-object details. Each row should represent a process object, such as a lead, opportunity, order, project, approval, complaint, payment item, or delivery task.

Add process fields when relevant:

- Current stage or node.
- Previous stage and next stage.
- Stage entry time and stay duration.
- Stage owner and next responsible person.
- Stage status: pending, processing, passed, rejected, overdue, blocked.
- Flow history, approval history, handoff record, and return/rework count.
- Related source document and downstream object.

The purpose is to find and inspect concrete process objects, not to analyze the whole funnel.

## Layout Pattern

Use a "filters first, table primary, details on demand" layout.

1. Filter Layer
   Place filters at the top. Include keyword search and common filters. Support expand/collapse advanced filters to avoid overwhelming the first view.

2. Result Summary Layer
   Place a small summary above the table: total rows, total amount, selected rows, abnormal rows, overdue rows, over-budget rows, or current export scope. This is for orientation, not deep analysis.

3. Detail Table Layer
   Make the table the main body. Include configurable columns, sorting, grouping, frozen columns, totals, conditional highlighting, pagination or virtual scrolling, batch selection, and row operations.

4. Row Detail Layer
   Use a right drawer for fast inspection. Use a full detail page when the object has many modules, long workflows, or complex editing/processing.

5. Trace And Action Layer
   Provide source jumps, related object links, export, batch operation, reconciliation, exception handling, approval flow, logs, and attachments when relevant.

## Component Selection Logic

- Use tables as the primary visual component.
- Use status tags, badges, and chips for state, risk, approval, overdue, and exception labels.
- Use conditional formatting for abnormal values, over-budget amounts, overdue dates, and missing fields.
- Use mini bars or in-cell progress bars only when they improve scanning.
- Use checkboxes and sticky batch action bars for batch export or batch handling.
- Use drawers for row details and quick verification.
- Use popovers for field definitions, status explanations, amount source, approval state, and warning reasons.
- Use full detail pages for complex source objects.
- Avoid heavy charts unless a small summary chart directly helps users narrow records.

The table is the correct "chart" for this report type.

## Interaction Design Logic

Design interactions around retrieval, inspection, export, and trace.

- Keyword search supports exact number lookup and fuzzy object search.
- Quick filters support frequent tasks such as 我的, 本月, 待处理, 异常, 超预算, 逾期, 已完成.
- Advanced filters support multi-condition queries: time range, organization, type, status, amount range, owner, source, risk, approval state, and tags.
- Sorting supports amount, date, risk, status, completion, update time, and priority.
- Column configuration lets users choose display fields, order, width, and frozen columns.
- Saved views preserve common filter and column configurations.
- Row click opens a drawer with basic info, related objects, workflow, logs, attachments, data source, and exception explanation.
- Row-level jumps lead to source systems or object detail pages such as contract, project, expense document, payment record, CRM customer, inventory item, or exception handling.
- Batch selection supports export, assign, mark, handle, reconcile, or submit when the business process allows it.
- Export supports Excel/CSV and should respect filters, selected rows, field permissions, row permissions, and data masking.

明细查询类的下钻更接近 "从一条业务对象进入它的关联对象"，而不是图表层层下钻。

## Permission And Governance

Always design permission behavior for detail reports:

- Row permission: which organizations, regions, departments, owners, or objects the user can see.
- Field permission: which sensitive fields are visible, masked, hidden, or exportable.
- Action permission: who can export, jump source, handle exceptions, approve, edit, or view logs.
- Export governance: export size limit, watermark, audit log, approval requirement, and sensitive-field masking.
- Source permission: not every user can jump to the source system or view the original document.
- Data freshness: show latest update time, source system, sync status, or data delay where relevant.

Permission is part of the design, not a later technical detail.

## Handoff To Horizontal Skills

This skill owns detail-query logic. For implementation-ready design, hand off to horizontal skills:

- Use `report-info-component-mapping` to map fields, summaries, tables, status tags, row drawers, and source links to components.
- Use `report-mock-data-design` to create coherent row-level records, status mixes, source links, totals, and edge cases.
- Use `report-filter-data-design` to define keyword search, quick filters, advanced filters, saved views, permissions, and export query state.
- Use `report-data-interaction-design` to define row clicks, source jumps, batch actions, drawer context, and return state.
- Use `report-visual-layout-design` and `report-component-style-design` for filters-first layout, table density, sticky headers, columns, tags, and overflow behavior.
- Apply the prototype block-height rule for scrollable page templates during layout coordination: every resolved block is at least 220px tall, and grids taller than 1080px scroll vertically. Fixed sci-fi/big-screen templates are exempt.

## Output Format

When asked to design this report type or create a design proposal, prioritize the query method. Use this structure:

1. 设计定位: define the row object, user task, audience, and query purpose.
2. 查询思路: explain how users narrow from all records to target records.
3. 字段体系: define default fields, optional fields, status/risk fields, trace fields, and operation fields.
4. 筛选体系: define keyword search, quick filters, advanced filters, saved views, and permission scope.
5. 表格设计: define columns, sorting, grouping, totals, frozen columns, highlighting, pagination, batch actions, and export.
6. 详情设计: define row drawer/detail page, related records, approval flow, logs, attachments, and source trace.
7. 交互设计: describe filtering, sorting, row click, popovers, drawers, jumps, batch operations, and export rules.
8. 权限与校验: define row/field/action/export permissions, data freshness, and audit needs.
9. 辅助提示: provide concise result hints instead of long analysis conclusions.

If the user provides one concrete detail report example, explicitly abstract it into general query rules before applying it back to that example.

## Result Hint Pattern

明细查询类 usually does not need a long conclusion. Provide short result hints:

当前筛选结果共 [N] 条，涉及 [金额/数量]，其中 [异常/逾期/超预算/待处理] [N] 条；可按 [关键字段] 排序后查看详情或导出。

Example:

当前筛选结果中，华东区域超预算费用记录共 18 条，金额合计 326 万元，其中 5 条超过审批阈值。

## Quality Checklist

Before finalizing, verify:

- The design defines what one table row represents.
- The page prioritizes filters and table, not decorative charts.
- Default fields support the user's most common lookup task.
- Advanced filters cover time, organization, type, status, amount, owner, risk, and source where relevant.
- Sorting, column configuration, frozen columns, pagination, and batch actions are considered.
- Row click provides enough detail to verify the record.
- Source jumps and related object links are permission-aware.
- Export follows current filters, selected rows, field permissions, and audit rules.
- Status tags and warnings explain why a record is overdue, abnormal, over budget, or pending.
- The result hint summarizes the current filtered dataset without pretending to be a diagnostic conclusion.

## Avoid

- Do not over-visualize a detail query report with unnecessary charts.
- Do not mix different row grains in one table without clear grouping.
- Do not hide filters below the table.
- Do not make export ignore permissions or selected filters.
- Do not design a detail table without row-level detail access.
- Do not omit data source, update time, or trace path when records may be audited.
- Do not use vague status labels without explanations or rules.
