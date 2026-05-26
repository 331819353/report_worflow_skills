---
name: reconciliation-traceability-report-design
description: "Design, critique, or refine the design thinking for 核对追溯类报表 as a report category, not just one specific reconciliation table. Use when the task asks how to design reconciliation reports, data traceability reports, source comparison pages, finance-vs-business data checks, budget-vs-expense checks, contract-vs-revenue checks, payment-vs-bank-statement checks, inventory-vs-physical-count checks, subsidiary reporting checks, consolidated report variance trace, metric definition change trace, data quality validation, audit traceability, lineage review, or any report whose purpose is to verify whether data is correct, where differences are, which source caused them, why systems or versions are inconsistent, and how differences should be corrected or confirmed. Emphasize reusable design logic: reconciliation objects, source systems, matching rules, metric definitions, versions, tolerance, field-level differences, lineage, evidence chain, correction workflow, approval, operation logs, and data trust conclusion."
---

# Reconciliation Traceability Report Design

## Core Positioning

Treat 核对追溯类报表 as a report type. Design the trust-and-evidence method first, then instantiate it for concrete scenarios such as finance vs business reconciliation, budget vs actual expense, contract vs revenue, payment vs bank statement, inventory vs physical count, subsidiary reporting, consolidated report differences, metric definition changes, data quality checks, or audit traceability.

This report type answers:

- 数据是否正确。
- 哪些数据不一致。
- 差异在哪里、差多少。
- 哪个系统、字段、版本或口径导致差异。
- 数据从哪里来，经过了什么处理。
- 谁确认、谁修正、什么时候修正。
- 差异是否已关闭，是否可审计追溯。

Do not design it as a business performance analysis report. Its core value is: 建立数据可信结论，给出可验证的证据链和处理闭环。

## Design Mindset

Start from "how to prove whether the data is trustworthy", not from "how to judge business performance".

Use this chain:

1. Reconciliation object: define what records, metrics, documents, systems, or versions are being compared.
2. Source systems: define source A, source B, source C, data warehouse, report layer, manual adjustment, and locked versions.
3. Matching rule: define how records are matched, such as ID, document number, organization, date, amount, quantity, customer, account, or composite key.
4. Tolerance and口径: define acceptable difference, metric formula, field mapping, time window, currency/unit, and aggregation rule.
5. Difference location: identify record-level, field-level, amount, quantity, time, organization, missing, duplicate, mapping, or sync differences.
6. Lineage and evidence: trace source document, system, interface, data warehouse, transformation, metric processing, report display, and manual adjustment.
7. Handling closure: mark reason, assign owner, resync, correct, approve, confirm, close, and retain logs.
8. Trust conclusion: state match rate, difference amount, unresolved differences, main causes, and required correction timeline.

If matching rules or口径 are unclear, propose them explicitly and flag resulting limitations.

## Universal Design Workflow

1. Define reconciliation scope.
   Identify systems, data sets, records, metrics, organizations, period, versions, and business scope being checked.

2. Define data grain.
   Clarify whether comparison occurs at summary metric, organization, account, document, line item, transaction, inventory SKU, project, customer, or field level. Avoid mixing grains without clear aggregation.

3. Define matching rules.
   Specify keys, fallback rules, tolerance range, one-to-one or one-to-many matching, time-window matching, amount/quantity matching, and manual matching conditions.

4. Define口径 and versions.
   State formulas, field mappings, data version, locked version, adjustment version, update time, source system, currency/unit, and whether data is pre- or post-adjustment.

5. Summarize reconciliation result.
   Show expected records, matched records, unmatched records, difference records, difference amount, difference rate, processed differences, and pending differences.

6. Classify differences.
   Group by amount mismatch, quantity mismatch, time mismatch, organization mismatch, missing document, duplicate record,口径 mismatch, sync failure, mapping error, and manual adjustment.

7. Compare sources side by side.
   Display source values next to each other, highlight differing fields, and show calculated difference.

8. Trace lineage.
   Show how data moved from source document to system, interface, warehouse, transformation, indicator, adjustment, and report display.

9. Close the difference.
   Support reason marking, correction request, resync, rematch, explanation, evidence upload, approval confirmation, and close.

## Reconciliation Rule Model

Use this model as a reusable design pattern:

- Source definition: source system, table/report, data owner, update time, version, locking status.
- Matching key: document number, contract ID, customer ID, project ID, account, organization, date, amount, quantity, composite key.
- Matching type: exact match, fuzzy match, one-to-one, one-to-many, many-to-one, time-window match, manual match.
- Tolerance: amount tolerance, quantity tolerance, date tolerance, rounding rule, currency/unit conversion, tax-inclusion rule.
-口径 rule: formula, aggregation level, filter condition, inclusion/exclusion, adjustment rule, mapping relationship.
- Difference type: missing, duplicate, amount mismatch, quantity mismatch, date mismatch, organization mismatch, mapping mismatch, sync delay, manual adjustment, version inconsistency.
- Handling rule: confirm, correct, resync, rematch, ignore with reason, approve, close, reopen.

Every difference should show why it is classified that way.

## Layout Pattern

Use a "reconciliation result -> difference location -> source trace -> handling closure" layout. Adapt the number of layers to the scenario.

1. Reconciliation Overview Layer
   Show expected records, matched records, unmatched records, difference records, match rate, difference amount, difference rate, processed differences, pending confirmation, and locked/version status.

2. Difference Classification Layer
   Break differences down by type: amount, quantity, date, organization, missing document, duplicate,口径, mapping, sync failure, manual adjustment, or version inconsistency.

3. Source Comparison Layer
   Place source-system values side by side. Highlight field-level differences and calculate amount/rate/time/organization gaps.

4. Difference Detail Layer
   Provide a table of difference records with ID, type, involved systems, key fields, values, difference, possible reason, status, owner, and deadline.

5. Lineage Trace Layer
   Show data lineage from original document to source system, interface, data warehouse, transformation, metric calculation, manual adjustment, approval, and report output.

6. Difference Handling Layer
   Provide operations: mark reason, assign owner, request correction, rematch, resync, submit explanation, upload evidence, confirm, approve, close, export report.

7. Audit Log Layer
   Show who changed, confirmed, approved, closed, or adjusted what, when, and why.

## Component Selection Logic

- Use metric cards for match rate, difference amount, pending differences, and processing progress.
- Use bar charts or matrix tables for difference distribution.
- Use side-by-side comparison tables for two or more sources.
- Use field-level highlighting for mismatched fields.
- Use variance bars for difference amount by organization, account, source, or type.
- Use lineage graphs, flowcharts, or link diagrams for source tracing.
- Use Sankey diagrams only when multi-system flow and transformation volume need explanation.
- Use status flow tables for difference handling state.
- Use log tables for audit records and operation trace.
- Use exportable detail tables for reconciliation reports.

Tables and lineage diagrams are more important than trend charts in this report type.

## Interaction Design Logic

Design interactions around "locate difference -> trace source -> explain reason -> correct or confirm".

- Difference drilldown: total difference -> organization/account/type difference -> document/line-item difference -> field difference.
- Source drilldown: report metric -> data warehouse -> interface -> source system -> original document.
- Version drilldown: current version -> previous version -> adjusted version -> locked version.
- Rule drilldown: reconciliation rule -> matching failure reason -> difference type -> handling suggestion.
- Field click: show source value, target value, mapping rule, tolerance, and transformation logic.
- Difference record click: open a difference detail drawer.
- Batch operations: assign, mark reason, request correction, resync, rematch, confirm, close, export.

Use popovers for核对规则, matching rule, tolerance, metric definition, field mapping, difference classification, data update time, source system, version, and locking state.

Use drawers as the main detail surface. A difference drawer should include difference ID, type, involved systems, source A/B values, difference amount/rate, differing fields, possible reason, matching rule, data source, lineage, version, status, confirmer, correction record, approval record, operation log, attachments, and action buttons.

Drawer operations may include:

- Mark reason.
- Assign owner.
- Request correction.
- Rematch.
- Resync.
- Submit explanation.
- Upload evidence.
- Confirm difference.
- Approve adjustment.
- Close difference.
- Reopen.

Use jumps to source and handling pages: contract system, finance voucher, bank statement, inventory system, budget system, data lineage platform, data governance workflow, subsidiary reporting page, approval flow, or original document.

## Evidence Chain Design

The report must provide an evidence chain, not just a mismatch label.

For each important difference, show:

- Which systems disagree.
- Which records or fields disagree.
- Actual values from each source.
- Difference amount, rate, date gap, or classification.
- Matching rule and failure reason.
- Metric口径 and field mapping.
- Data version and update time.
- Source document and lineage path.
- Current handling status and owner.
- Confirmation, correction, approval, and operation logs.

Evidence chain quality determines whether users trust the report.

## Handling And Audit Closure

Design a clear lifecycle:

1. Detected: difference generated by reconciliation rule.
2. Classified: difference type and severity/impact identified.
3. Assigned: owner responsible for explanation or correction.
4. Explained: reason marked, evidence attached, source checked.
5. Corrected or confirmed: data corrected/resynced/rematched or difference accepted as合理差异.
6. Approved: reviewer confirms adjustment or closure where required.
7. Closed: status closed with reason, evidence, operator, and timestamp.
8. Reopened: difference reappears or closure is disputed.

Keep operation logs for every status change, correction, resync, rematch, reason mark, approval, and close.

## Handoff To Horizontal Skills

This skill owns data-trust and reconciliation logic. For implementation-ready design, hand off to horizontal skills:

- Use `report-info-component-mapping` to map match results, difference types, source comparison, lineage, logs, and correction actions to components.
- Use `report-mock-data-design` to create coherent source-system values, difference fields, versions, causes, statuses, lineage nodes, and audit logs.
- Use `report-filter-data-design` to define source system, batch, version, difference type, status, rule, organization, and owner filters.
- Use `report-data-interaction-design` to define difference drilldown, source drilldown, version switch, lineage navigation, correction flows, and source-system jumps.
- Use `report-visual-layout-design` and `report-component-style-design` for comparison tables, diff highlights, lineage viewports, logs, and dense evidence layout.

## Output Format

When asked to design this report type or create a design proposal, prioritize data trust and traceability. Use this structure:

1. 设计定位: define reconciliation scenario, users, systems, data scope, grain, and trust objective.
2. 核对思路: explain how records/metrics are compared and how differences are traced.
3. 核对规则: define matching keys,口径, tolerance, versions, field mappings, and difference classification.
4. 布局框架: describe overview, classification, source comparison, difference detail, lineage, handling, and audit layers.
5. 字段与清单: define difference ID, systems, fields, values, difference, reason, status, owner, version, source, and deadline.
6. 图表组件: map cards, comparison tables, highlighted fields, lineage graphs, status tables, and logs to their tasks.
7. 交互设计: describe difference drilldown, source drilldown, version switch, rule popovers, detail drawers, batch actions, and source jumps.
8. 处理闭环: define reason marking, correction, resync, rematch, approval, close, reopen, and logs.
9. 数据可信结论: state match rate, difference amount, main causes, unresolved items, and required correction timeline.

If the user provides one concrete reconciliation report example, explicitly abstract it into general reconciliation rules before applying it back to that example.

## Trust Conclusion Pattern

核对追溯类 conclusions should be data-trust conclusions, not business-performance conclusions:

核对结果: match rate, difference count, difference amount, difference rate.
差异来源: systems, fields, organizations, accounts, versions, or口径 causing differences.
主要原因: timing, mapping, missing document, sync failure, manual adjustment, input error, or口径 inconsistency.
处理状态: confirmed, corrected, pending, overdue, closed.
后续要求: owner, deadline, correction, approval, resync, or audit follow-up.

Example structure:

本期[数据范围]与[来源系统]核对匹配率为 [X%]，差异金额 [金额]，主要来自[原因/系统/字段]；当前仍有 [N] 条差异待确认，需由[责任方]在[时间]前完成[修正/确认/审批]，以确保[报表/月结/审计]数据可信。

## Quality Checklist

Before finalizing, verify:

- The report focuses on data correctness, difference source, and traceability.
- Reconciliation scope, data grain, systems, versions, and update time are clear.
- Matching rules, tolerance,口径, and field mappings are explicit.
- Difference records show side-by-side source values and field-level highlights.
- Difference classification explains why a record is considered mismatched.
- Lineage shows source document, system, interface, warehouse, transformation, and report output where relevant.
- Drawers provide evidence, status, owner, correction, approval, and logs.
- Source jumps and correction actions are permission-aware.
- The handling lifecycle supports detected, assigned, explained, corrected/confirmed, approved, closed, and reopened.
- The final conclusion states data trust status, not business performance.

## Avoid

- Do not treat reconciliation as ordinary operational analysis.
- Do not show only a difference amount without source values and fields.
- Do not omit matching rules, tolerance,口径, or versions.
- Do not hide source system, update time, or lineage.
- Do not allow differences to close without reason, evidence, or logs.
- Do not mix summary-level and record-level differences without explaining the grain.
- Do not make users leave the page before they can see why data is inconsistent.
