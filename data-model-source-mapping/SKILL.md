---
name: data-model-source-mapping
description: "用于创建或修正数据模型文件和数据源到消费端映射。用户提到数据模型、字段模型、数据源映射、源表、元数据、逻辑模型、响应模型、视图模型、更换数据源/数据表、API返回字段保持不变、新增字段规范命名、指标/字段口径、维度关系、snapshotDate/dataVersion/loadBatch、数据版本、筛选前数据完整性、筛选数据粒度、原型mock字段、数据血缘、刷新频率、权限、质量规则时触发；不负责API文档或代码实现。"
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
| Produce the exact 数据模型文件 structure and required table columns | `$delivery-artifact-template-management` |
| Map physical sources into logical models and response/view models | `references/02-source-logical-response-mapping.md` |
| Define metric formulas, transformations, permissions, and data-quality rules | `references/03-metrics-transformations-quality.md` |
| Run model traceability, no-invention, and pending-item routing checks | `references/04-model-stability-gate.md` |
| Resolve authority conflicts when requirements, metric lists, prototype code, API contracts, source documents, or tests disagree | `$quality-gate-validation` |
| Audit whether source/logical/response model design reasonably supports the business question, API inventory, frontend contract, permissions, and tests | `$quality-gate-validation` |

Loading guidance:

- For any generated or updated 数据模型文件, load the data model template from `$delivery-artifact-template-management` plus the three local references below.
- For source-to-response mapping only, use `$delivery-artifact-template-management`, `02-source-logical-response-mapping.md`, and `04-model-stability-gate.md`.
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
   Map prototype/API-facing fields to logical/source fields. Include display labels, field types, units, precision, numeric display contracts, enum labels, sorting, empty-state behavior, and whether the field is calculated.

4a. Preserve response contract compatibility during source replacement.
   When the source table, upstream API, fixture schema, or serving model changes, keep existing response/view field codes and behavior stable. Produce a before/after mapping: response field -> old source field/formula -> new source field/formula -> transformation/default/null rule -> verification evidence. New response fields must be additive and named by the project convention; if absent, use stable English lowerCamel field codes. Any required rename, type/unit/precision/enum/nullability/formula/grain change is a breaking `DESIGN-*` or `GAP-*` item until versioning and downstream impact are explicit.

5. Define data-version and snapshot semantics.
   When the report needs current/latest/snapshot behavior, document the snapshot role, business time field, `snapshotDate` or `latestPeriod`, `loadBatch`, `dataVersion`, source partition, report version, freshness timestamp, and invalidation/backfill rule. Clarify which response models expose version metadata, which fact/logical/precompute/snapshot models are queried or reused by each endpoint, and which source fields or partitions those params filter. If an API response is intentionally the canonical/shared snapshot for other components, model it as a named snapshot/precompute/view model with grain, fields, scope, and reuse rules instead of treating it as an incidental response.

6. Define filter-supporting data completeness.
   When consuming pages or APIs have filters, document the filter option source, fact/business row grain, required fields, default state, at least one non-default state, empty/no-permission state when relevant, and resolver/API branch dependency before declaring the response/view model filter-ready. Single default snapshots are not enough for affecting filters unless the component is explicitly invariant.

7. Define metric formulas.
   For each metric, document formula, numerator, denominator, filter scope, period logic, baseline, threshold, direction, unit, precision, numeric display contract, and reconciliation rule.

8. Define transformation notes.
   Capture date conversion, period aggregation, unit conversion, enum mapping, rounding, default fill, hierarchy rollup, deduplication, and permission filtering.

9. Mark gaps.
   Record unresolved source, field, formula, enum, join, sample, owner, refresh, or permission gaps in this skill's pending model items with stable `GAP-*` IDs, impact, owner question, current assumption, and downstream blocking status.

10. Run the design reasonableness gate.
   Check whether the model grain, joins, response/view models, metric formulas, transformation strategy, permissions, freshness, and quality rules reasonably support the consuming APIs, UI components, filters, and tests. Record unreasonable model structures as `DESIGN-*` findings.

## Hard Constraints

- Every response/view field must trace to a source field, formula, static enum, or `GAP-*` item.
- Every metric-bearing response/view field must define value type, raw/display unit, display scale, screen precision, tooltip/export precision, rounding mode, null/zero/denominator-zero behavior, negative-zero handling, small-nonzero behavior when relevant, formula precision policy, and formatter ownership.
- Response/view field names, nesting, types, units, precision, enum meanings, nullability, formulas, grain, and empty/no-permission behavior are stable compatibility contracts across source/table replacement. Source names may change; response contracts may not drift silently.
- New response/view fields must follow the project naming convention, or stable English lowerCamel when no convention exists, and must declare source, meaning, type, unit, nullability, permission/sensitivity, compatibility status, and downstream consumers.
- Do not resolve contradictory source/model/API/frontend evidence by preference or convenience; unresolved `P0`/`P1` conflicts keep affected models `partial` or `blocked`.
- Every metric must have formula, grain, dimensions, period logic, source dependency, precision, and numeric display contract, or a `GAP-*` item.
- Snapshot/latest-period response models must trace to source/logical/precompute/cache/snapshot models through explicit data-version fields and source/filter predicates. Do not define one response model as the authoritative source for another response model unless it is explicitly modeled as a canonical/shared snapshot with grain, fields, scope, and reuse rules.
- Filterable response/view models must prove data completeness before filter binding: option dimensions, matching fact/business rows, required fields, default/non-default states, empty/no-permission states when relevant, and resolver/API branch coverage. Missing evidence is a `GAP-*`, not a frontend binding assumption.
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
5. Response/view models: API/frontend fields, types, units, numeric display contracts, null rules, examples.
5a. Source replacement compatibility: old source, new source, unchanged response fields, additive fields, transform/default/null rules, and breaking/versioning decisions.
6. Data-version/snapshot semantics: snapshot role, business time, snapshotDate/latestPeriod, loadBatch, dataVersion, freshness, invalidation/backfill, exposing response metadata, source fields/partitions, filter predicate mapping, and reuse rules when canonical/shared.
7. Filter-support completeness: option source, row grain, fields, default/non-default states, empty/permission states, resolver/API branches.
8. Metrics: formulas, dimensions, baselines, thresholds, numeric display contracts, reconciliation.
9. Transformation mapping: source -> logical -> response.
10. Security rules: sensitivity, masking, field-level permission, no-permission behavior.
11. Data-quality rules: uniqueness, completeness, enum validation, range checks, freshness.
12. Pending model items: linked `GAP-*` IDs or summary.
13. Design reasonableness status: linked `DESIGN-*` IDs, repairs, or accepted limitations.

## Quick Quality Gate

- Every response/view field traces to a source field, formula, or pending item.
- Existing response/view contracts remain stable when source tables or data sources change; any drift is blocked unless explicitly versioned.
- Additive fields are named and documented by convention before downstream API/front-end/test use.
- Every metric in the indicator list has formula, grain, dimensions, source dependency, and numeric display contract.
- Data-version and snapshot semantics are explicit when current/latest/snapshot endpoints exist.
- Data-version and scope params map to source fields, partitions, logical filters, precompute keys, or cache keys before response/view models are declared ready.
- Filter-support completeness is documented before downstream `filterFields`, query params, or resolver params are accepted.
- Source ownership, refresh cadence, and permission are explicit.
- Model IDs and API response model names are stable for downstream API inventory, documentation, frontend integration, and testing artifacts.
- Model design reasonableness is checked; unresolved `P0`/`P1` `DESIGN-*` findings keep affected models `partial` or `blocked`.
- All unresolved model issues are visible in the pending model items section with `GAP-*` IDs.
