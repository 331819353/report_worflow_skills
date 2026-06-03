---
name: data-model-source-mapping
description: "用于在开发前创建或修正数据模型文件和数据源到消费端映射。用户提到数据模型、字段模型、数据源映射、源表、元数据、指标口径、字段口径、维度关系、原型mock字段、响应模型、视图模型、数据血缘、刷新频率、权限、质量规则、数据模型文件、source-to-consumer mapping时触发，支撑技术方案、后端、前端联调和测试。"
---

# Data Model Source Mapping

## Core Positioning

Use this as a reusable artifact skill when the deliverable is a 数据模型文件 or source-to-consumer mapping that connects requirements, APIs, frontend contracts, tests, or real data sources.

This skill is not limited to the 技术方案 stage. In 技术方案 it defines the model handoff; in 数据服务 it supports API documentation and transformation design; in 前端联调 it explains how response fields map to UI expectations; in 测试校验 it provides the traceability basis for data consistency checks.

The model file must explain not only field names, but also source ownership, grain, refresh cadence, relationships, metric formulas, transformations, permissions, and what each model supports.

## Inputs

- Data-source documents with tables, views, files, APIs, fields, metadata, owner, permission, and refresh rules.
- Requirements and metric lists.
- Prototype data code, mock data, TypeScript interfaces, component data fields, filters, and response-like structures.
- API清单 or endpoint draft, if available.

## Reference Map

Read only the reference files needed for the current task:

| Need | Read |
| --- | --- |
| Produce the exact 数据模型文件 structure and required table columns | `references/01-model-file-template.md` |
| Map physical sources into logical models and response/view models | `references/02-source-logical-response-mapping.md` |
| Define metric formulas, transformations, permissions, and data-quality rules | `references/03-metrics-transformations-quality.md` |
| Run model traceability, no-invention, and pending-item routing checks | `references/04-model-stability-gate.md` |
| Resolve authority conflicts when requirements, metric lists, prototype code, API contracts, source documents, or tests disagree | `references/standalone-quality-gates.md#entry-input-consistency-gate` |
| Audit whether source/logical/response model design reasonably supports the business question, API inventory, frontend contract, permissions, and tests | `references/standalone-quality-gates.md#design-reasonableness-gate` |

Loading guidance:

- For any generated or updated 数据模型文件, read all four references.
- For source-to-response mapping only, read `01-model-file-template.md`, `02-source-logical-response-mapping.md`, and `04-model-stability-gate.md`.
- For metric-heavy work, `03-metrics-transformations-quality.md` is mandatory.

## Workflow

0. Check source authority.
   When multiple artifacts define the model, identify which source owns physical fields, metric formula, grain, response/view needs, permission, freshness, and sample evidence. If they conflict on source field, join, formula, enum, grain, permission, or response shape, record `ENTRY-*` findings before creating a model assumption.

1. Identify source systems.
   List every source table/view/file/API, owner, business domain, refresh cadence, access method, permission need, expected volume, and known quality issue.

2. Define source models.
   For each source, capture physical name, business meaning, grain, primary key, natural keys, partition/date fields, dimensions, measures, enums, nullable fields, and sample values.

3. Define logical/business models.
   Combine sources into business objects such as customer, order, project, inventory, contract, payment, task, alert, organization, or period. Define joins, relationship cardinality, aggregation grain, and ownership.

4. Define response/view models.
   Map prototype/API-facing fields to logical/source fields. Include display labels, field types, units, precision, enum labels, sorting, empty-state behavior, and whether the field is calculated.

5. Define metric formulas.
   For each metric, document formula, numerator, denominator, filter scope, period logic, baseline, threshold, direction, unit, precision, and reconciliation rule.

6. Define transformation notes.
   Capture date conversion, period aggregation, unit conversion, enum mapping, rounding, default fill, hierarchy rollup, deduplication, and permission filtering.

7. Mark gaps.
   Record unresolved source, field, formula, enum, join, sample, owner, refresh, or permission gaps in this skill's pending model items with stable `GAP-*` IDs, impact, owner question, current assumption, and downstream blocking status.

8. Run the design reasonableness gate.
   Check whether the model grain, joins, response/view models, metric formulas, transformation strategy, permissions, freshness, and quality rules reasonably support the consuming APIs, UI components, filters, and tests. Record unreasonable model structures as `DESIGN-*` findings.

## Hard Constraints

- Every response/view field must trace to a source field, formula, static enum, or `GAP-*` item.
- Do not resolve contradictory source/model/API/frontend evidence by preference or convenience; unresolved `P0`/`P1` conflicts keep affected models `partial` or `blocked`.
- Every metric must have formula, grain, dimensions, period logic, source dependency, and precision, or a `GAP-*` item.
- Source ownership, refresh cadence, and permission must be explicit, assumed, or blocked.
- Joins and hierarchy rollups must be documented before API documentation starts.
- Prototype mock fields must be reconciled with real source fields instead of copied blindly.
- Do not keep a model structure that is technically traceable but unreasonable for the consuming API/UI/test workflow. Use `DESIGN-*` findings when grain, joins, response shape, metric formula, transformation, permission, or freshness design would distort the business answer.
- Do not use a field in a response model if its type, unit, enum, or null behavior is unknown and undocumented.
- Sensitive fields must declare sensitivity level, masking rule, and field-level permission behavior, or link to `GAP-*`.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.

## Required Output

Use this structure for the 数据模型文件:

1. Model overview: purpose, supported pages/APIs, owner, status.
2. Data sources: source name, type, location, owner, refresh, permission, reliability notes.
3. Source models: physical fields and metadata.
4. Logical models: business objects, keys, relationships, grain, joins.
5. Response/view models: API/frontend fields, types, units, null rules, examples.
6. Metrics: formulas, dimensions, baselines, thresholds, reconciliation.
7. Transformation mapping: source -> logical -> response.
8. Security rules: sensitivity, masking, field-level permission, no-permission behavior.
9. Data-quality rules: uniqueness, completeness, enum validation, range checks, freshness.
10. Pending model items: linked `GAP-*` IDs or summary.
11. Design reasonableness status: linked `DESIGN-*` IDs, repairs, or accepted limitations.

## Quick Quality Gate

- Every response/view field traces to a source field, formula, or pending item.
- Every metric in the indicator list has formula, grain, dimensions, and source dependency.
- Source ownership, refresh cadence, and permission are explicit.
- Model IDs and API response model names are stable for downstream API inventory, documentation, frontend integration, and testing artifacts.
- Model design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected models `partial` or `blocked`.
- All unresolved model issues are visible in the pending model items section with `GAP-*` IDs.
