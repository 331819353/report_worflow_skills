# Data Model Requirement Playbook

Use when vague requirements must become data model requirements, especially for 数据模型, 数据建模, 模型文件, 数据字典, 表字段映射, 指标粒度, 明细模型, 汇总模型, 宽表, 维表, 事实表, source-to-response model transformation, or model gaps.

## Extract

- Modeling goal: analysis/reporting model, API response model, operational transaction model, integration model, reconciliation model, or export model.
- Business objects: entity names, business meaning, owner, lifecycle, status, identity, hierarchy, and row grain.
- Source inventory: source system, source table/file/API, owner, refresh cadence, access method, partition, key fields, quality constraints.
- Field mapping: source field -> standardized field -> model field -> API field -> frontend/view field, including type, unit, precision, enum, timezone, null/default, and masking rules.
- Model layers: conceptual model, logical model, physical/source model, service response model, frontend view model, export model.
- Grain and aggregation: detail grain, summary grain, metric grain, time grain, organization grain, deduplication rule, rollup rule, snapshot/history rule.
- Relationships: primary/foreign keys, natural keys, bridge tables, hierarchies, one-to-one, one-to-many, many-to-many, parent-child, event-to-master, fact-to-dimension.
- Metric definitions: metric formula, numerator/denominator, filters, baseline, direction, unit,口径 owner, effective date, version, and reconciliation source.
- Permission and privacy: row scope, organization scope, field masking, sensitive fields, export approval, audit field requirements.
- Data quality and gaps: missing fields, ambiguous口径, duplicate keys, inconsistent enum, late-arriving data, null rules, source trust, pending confirmation.

## Required Handoff

Output enough detail for downstream data-model work:

- Model list with purpose, layer, grain, source, owner, and consumers.
- Entity/table/field mapping matrix.
- Relationship and key design.
- Metric口径 and aggregation rules.
- Permission/masking rules at row and field level.
- Transformation rules from source to model and model to API/UI.
- Pending model gaps with blocker level, owner, and confirmation question.

## Acceptance Checks

- Every model has a clear consumer: report component, API, backend service, export, reconciliation, or test.
- Every key metric maps to source fields or is marked as a pending口径/model gap.
- Every relationship has a key, cardinality, and missing-match behavior.
- Every field used by UI/API/test has type, unit, precision, null handling, and enum/masking rules when relevant.
- Detail totals, summary totals, API totals, and UI totals can reconcile under the same filters and permission scope.
