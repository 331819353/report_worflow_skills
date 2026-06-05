---
name: data-quality-validation
description: "用于真实数据质量规则设计、执行和可信度验收。用户提到数据质量、完整性、唯一性、及时性、准确性、异常值、重复数据、缺失数据、数据延迟、口径漂移、跨源一致性、接口正常但数据不可信、生产数据校验、质量规则、数据质量报告时触发；不负责API契约或页面展示核对。"
---

# Data Quality Validation

## Overview

Use this skill to design or execute data quality checks for report delivery and production acceptance. It focuses on whether data is trustworthy, not merely whether APIs return successfully.

## Inputs

- Data model, source table/API metadata, metric dictionary, API samples, production exports, SQL snippets, data files, reconciliation rules, refresh SLA, or incident examples.
- Optional: expected thresholds, source owner, refresh schedule, historical baseline, business calendar, and critical metric list.

Read `references/01-quality-rule-template.md` when producing a reusable rule matrix.

## Workflow

1. Define quality scope.
   Identify critical metrics, dimensions, source tables/APIs, response fields, reporting period, data grain, and consumers.

2. Classify checks.
   Cover completeness, uniqueness, timeliness, accuracy, validity, range/outlier, referential integrity, drift/口径漂移, cross-source consistency, and permission-sensitive data leakage.

3. Write executable rules.
   For each rule, specify data object, field/metric, condition, threshold, frequency, owner, SQL/API/check expression, and failure action.

4. Compare against business expectation.
   Check totals, subtotals, TopN, rankings, period-over-period values, and cross-report numbers against source-of-truth or approved baseline.

5. Assess failures.
   Classify as blocker/high/medium/low. Distinguish source-data issue, transformation issue, API aggregation issue, frontend display issue, permission filter issue, or stale cache.

6. Define monitoring.
   For production-bound data, link quality rules to SLA alerts and `$production-observability-feedback`.

## Required Output

- Data quality scope: source objects, metrics, periods, grain, consumers.
- Rule matrix: rule ID, dimension, field/metric, expression, threshold, frequency, owner, evidence.
- Execution result: passed/failed/blocked/not run, sample records, counts, timestamps, query/API evidence.
- Trust conclusion: pass / partial / fail / blocked, with impact on report acceptance.
- Defects or blockers: likely owner, reproduction query/API, expected vs actual, retest criteria.
- Production monitoring handoff: quality rules that need scheduled checks or alerting.

## Quality Checklist

- Quality checks cover real business correctness, not only non-empty responses.
- Time freshness and late-arriving data rules are explicit.
- Cross-source and cross-report reconciliation is included when figures must match.
- Failures include evidence and likely owner.
- Acceptance is not marked ready when critical data-quality checks are not run.
