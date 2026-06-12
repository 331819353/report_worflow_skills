---
name: sql-query-optimization
description: "用于SQL查询写法、索引友好条件、分页排序、聚合、JOIN、可选筛选、执行计划和慢查询优化。用户提到SQL慢、查询优化、索引没走、where条件、order by慢、group by慢、分页慢、TopN、count慢、执行计划、StarRocks/MySQL/Oracle查询写法优化时触发；不负责Redis缓存或完整API性能治理。"
---

# SQL Query Optimization

## Positioning

Use this skill for SQL/query-shape optimization and database-backed report/API query review. It owns predicate shape, projection, joins, aggregation, pagination, sort, count, plan evidence, and safe parameter binding.

Use `$performance-optimization` when the performance surface also includes API design, cache, export, frontend rendering, capacity, or end-to-end verification.

## Reference Loading

- Read `references/sql-query-writing-optimization.md` before proposing or accepting SQL/query-shape optimizations.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Identify database/dialect, query purpose, result grain, filters, sort, pagination, volume, and SLA.
2. Inspect SQL/query builder shape and available plan evidence.
3. Optimize selected columns, predicates, joins, aggregation/window placement, sort/page strategy, and optional filter handling.
4. Preserve metric formulas, permission predicates, source-side filtering, and response compatibility.
5. Define verification: `EXPLAIN`, query timing, row counts, before/after plan, and correctness checks.

## Required Output

- Query surface and bottleneck hypothesis.
- SQL/query rewrite or review findings.
- Index/predicate/page/sort/aggregation notes.
- Correctness and permission-scope risks.
- Verification result or blocker.

## Quality Gate

- Do not optimize by changing metric口径, permission scope, business totals, filters, or response semantics.
- Do not fetch broad result sets and filter/sort/page globally in memory for database-backed data.
- Use parameter binding and whitelisted fields; never concatenate user-controlled SQL.
