---
name: metric-governance-lineage
description: "用于企业报表指标治理、指标字典、口径版本、指标血缘、权限分级、数据质量规则和跨报表一致性检查。用户提到指标字典、口径管理、同名指标不同口径、指标版本、指标血缘图、指标权限、指标质量规则、跨报表数字对不上、指标变更审计时触发。"
---

# Metric Governance Lineage

## Overview

Use this skill to make metrics stable across reports: define metric dictionary entries,口径 versions, source lineage, permission level, quality rules, and cross-report consistency checks.

Use it before API/model design when metrics are ambiguous, and after changes when a metric definition needs versioning or impact review.

## Inputs

- Metric list, PRD, report screenshots, API docs, data model, source tables, calculation SQL, BI/dashboard exports, or discrepancy examples.
- Optional: historical口径, owner, approval record, effective date, consumer reports, permission policy, and data quality incidents.

Read `references/01-metric-dictionary-template.md` when producing reusable metric governance artifacts.

## Workflow

1. Normalize metric identity.
   Assign stable metric ID, canonical name, aliases, business domain, owner, and consuming reports/components.

2. Define口径 version.
   Capture formula, grain, dimensions, filters, time window, unit, precision, null handling, dedupe rule, late-arrival rule, and effective version/date.

3. Trace lineage.
   Map source system -> source table/API/file -> source fields -> transformation -> logical model -> response/API field -> frontend component -> test case.

4. Define permission and security classification.
   Mark public/internal/confidential/restricted, role/organization scope, field masking, export rule, audit need, and data retention constraints.

5. Define quality rules.
   Include completeness, uniqueness, timeliness, accuracy, range/outlier, reconciliation, drift, and cross-source consistency checks. Route executable checks to `$data-quality-validation`.

6. Run cross-report consistency check.
   Compare same/similar metric names across reports. Distinguish intended different口径 from unintended divergence. Require versioned names or explicit aliases when口径 differs.

7. Produce governance decision.
   State approved, partial, blocked, or deprecated. Link unresolved questions to owners and downstream impact.

## Required Output

- 指标字典: metric ID, canonical name, aliases, domain, owner, definition, formula, grain, dimensions, unit, precision, refresh, status.
- 口径版本表: version, effective date, change reason, old/new formula, consumers affected, approval status.
- 血缘链路: source -> model -> API -> component -> test/document.
- 权限与安全分级: role/data scope, masking, export, audit, retention.
- 数据质量规则: rule ID, dimension, threshold, execution location, failure handling.
- 跨报表一致性结论: consistent / intentional difference / conflict, with impacted reports and repair actions.
- Downstream handoff: affected API/model/frontend/test/version artifacts and owner workflows.

## Quality Checklist

- Same metric name never hides different formulas or grains.
- Formula and grain are explicit enough for backend/API implementation.
- Every metric traces to sources or a blocker.
- Quality rules are measurable and executable or clearly assigned.
- Cross-report conflicts become change-impact or missing-info items, not silent assumptions.
