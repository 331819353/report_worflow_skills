# Design Reasonableness Gate

Use this gate after entry consistency has been checked and before irreversible specification, API/model design, frontend/backend implementation, visual repair, or stage handoff.

The goal is to verify that the proposed design is not merely consistent with the inputs, but actually reasonable: it answers the business question, uses the right report logic, has necessary data/API support, keeps filters and interactions meaningful, and can be tested.

## When To Run

Run this gate when any of these are true:

- The task designs, restores, optimizes, repairs, or implements a report/dashboard/prototype/page.
- A workflow converts requirements into component mapping, API lists, data models, API docs, adapters, function descriptions, or test cases.
- A design decision would affect report type, information hierarchy, component choice, metric口径, filter scope, drilldown, action loop, permission behavior, visual layout, or implementation feasibility.
- A provided sample/HTML/mock/API can be internally consistent but still not answer the user's real business question.

For narrow copy, typo, or non-design code fixes, record `Design reasonableness: not needed`.

## Audit Dimensions

Check the design across these dimensions:

1. Business fit.
   The design names the user, usage moment, primary question, decision/action, and expected conclusion. The first meaningful viewport answers that question or exposes the correct action entry.

2. Report-type fit.
   The selected report type matches the task: overview for health/status, diagnosis for why, detail for record lookup, evaluation for scoring/ranking, recap for narrative review, anomaly for alerts, execution for task closure, reconciliation for data correctness.

3. Information hierarchy.
   Content has a clear priority order: conclusion/status, evidence/breakdown, detail, action. It is not a flat wall of equal-weight charts or decorative cards.

4. Component necessity.
   Every must-have component answers a named business question, has a distinct semantic role, and is not duplicated by another chart with the same message.

5. Metric and data feasibility.
   Metrics have grain, formula, unit, baseline, time scope, dimensions, source or pending gap. Data is sufficient for the chosen chart/table, trend, ranking, funnel, waterfall, map, or decomposition logic.

6. OLAP data modeling fit.
   Reporting/BI/dashboard models name business questions, subject areas, business processes, grain, layer/type, fact/dimension/summary/application role, metric additivity, time口径, conformed dimensions, SCD/history need, many-to-many handling, late-arriving/backfill strategy, quality rules, and lineage. A model that starts from fields or source tables without business process/grain, mixes grains, treats ratios as additive, uses current-only dimensions when historical state matters, or builds an unbounded super-wide table is a `DESIGN-*` finding.

7. Filter and query logic.
   Filters have defaults, option sources, affected components, query params or data fields, permission scope, cascade behavior, and stale-selection behavior.
   A primary/global filter is unreasonable when it only changes selected UI state. Affected components must bind the filter through dataset fields, API/provider/query params, `filterFields`, `requiredFilters`, or resolver params, and non-default filter values must visibly change component data unless the component is explicitly invariant. `ignoredFilters` cannot be used to hide missing mock grain, missing field mapping, or missing resolver logic.

8. Interaction and closure.
   Drilldowns, drawers, jumps, exports, refresh, fullscreen, task actions, approvals, and evidence views preserve the same context and support the user's next step.

9. Visual/layout reasonableness.
   Shell, template, grid, first viewport, block spans, density, labels, legends, tables, and complex diagrams fit the content without duplicate component titles, cramped/narrow/tiny components, overlap, clipping, unreadable text, excessive blank space, or title-node collision. Page/block titles are layout-owned; peer component groups use balanced `M * N` layouts when possible; complex diagrams with layer/stage/lane titles must reserve an independent title band and keep titles at least 16px away from the first row of nodes, node borders, child labels, badges, connectors, and edge labels.
   Outer block/grid validity is not enough for composite widgets. Summary zones, nested KPI grids, small metric cells, comparison tiles, and custom card internals must pass fit inside their real sub-containers. Decision-critical metric titles, labels, values, status text, and actions cannot be clipped by `nowrap`/ellipsis without a disclosure path; prefer reserved one- or two-line wrapping, larger min-height, wider zones, stacking, or fewer visible tiles.

10. Report data-visualization frontend fit.
   Report/BI/dashboard frontends define user purpose, first-screen conclusion, information hierarchy, chart/table choice, metric names/units/precision/口径, filters, linkage, drill-down/drill-through, tooltip/legend/axis semantics, data freshness/quality display, loading/empty/error/no-permission/stale states, component-ready provider mapping, frontend data-volume/performance limits, theme/color/accessibility, and runtime QA evidence. A design that is a flat chart collection, hides the core conclusion, uses misleading chart types, lacks units/口径, fetches broad data for local global filtering, omits edge states, or cannot trace anomalies to detail is a `DESIGN-*` finding.

11. API/backend feasibility.
   API endpoints, response models, data models, transformations, auth, pagination, sorting, exports, and error states can support the UI contract without hidden invention. Global/page-level filters and permission scope execute through SQL `WHERE`, source/provider/repository queries, resolver params, Redis/precompute keys, or equivalent source-side scope wherever feasible; component-internal filters may operate on already fetched component data. A design that depends on page/API-level full-materialize-then-filter behavior is a `DESIGN-*` finding unless explicitly bounded.

12. Report data-service backend fit.
   Report/BI/dashboard backend APIs define a controlled query-service chain: report metadata, dimension/metric/filter/sort whitelist, backend-owned SQL/source expression mapping, parameter guardrails, backend-injected tenant/data/field/export permissions, component-ready result metadata, pagination/count/export strategy, cache key permission safety, data freshness/quality fields, query/export audit, version/publish/rollback, and slow-report governance. A design that lets the frontend send SQL/source expressions, omits permission injection, leaves heavy export synchronous, omits cache permission scope, or cannot explain the report query chain is a `DESIGN-*` finding.

13. Data-service performance and resilience.
   Production-bound data services have reasonable latency/capacity assumptions, bounded concurrency, cache/precompute design when useful, connection/resource pools, async/offline job strategy for long-running work, timeout/retry/fallback behavior, rate/concurrency limits, health/readiness checks, and observability. A design that relies on unbounded threads/queues, one connection per request, indefinite upstream waits, synchronous handling for long-running work, or no overload behavior for expensive endpoints is a `DESIGN-*` finding.

14. SQL query reasonableness.
   Database-backed APIs have reasonable query shape: only needed columns are selected, predicates are source-side and sargable, join keys/cardinality are complete, one-to-many multiplication is controlled, dedup/order operations are intentional, pagination is bounded and stable, aggregation/window work happens after early filters when possible, dynamic optional filters avoid broad nullable-OR templates, and risky P0/high-volume queries have plan evidence or a slow-query gap. A design that depends on `SELECT *`, broad in-memory filtering, incomplete joins, deep unbounded pagination, or large unverified sorts is a `DESIGN-*` finding.

15. Report integration testing fit.
   Report/BI/dashboard testing plans define metric口径, golden/baseline data, source/model/API/frontend/export reconciliation, API contract, frontend binding, filters, permissions, cache isolation, export parity, performance/stability, exception states, UAT, release smoke, monitoring, rollback, regression, automation scope, and retest closure when those paths are in scope. A testing plan that only checks page load or API `200`, lacks golden/baseline data for P0 metrics, skips role/tenant/export/cache safety, or cannot localize data mismatches through the chain is a `DESIGN-*` finding.

16. Testability.
   The design has acceptance criteria, validation cases, sample data or runtime evidence, and clear pass/fail behavior for empty, error, no-permission, stale, and edge states.

## Finding Severity

Use stable IDs such as `DESIGN-001`.

- `P0 blocker`: no clear primary question, wrong workflow/report type, key metric/data/API/auth cannot support the design, unsafe permission/action behavior, or the design would lead implementation in a fundamentally wrong direction.
- `P1 high`: important component/filter/interaction/API/model/layout decision is unreasonable or missing and would change user-visible behavior, data correctness, or testability.
- `P2 medium`: design works but has avoidable redundancy, weak hierarchy, incomplete edge states, overly dense layout, or a non-core component with weak justification.
- `P3 low`: wording, small style, ordering, or polish issue that does not affect the design contract.

## Handling Rules

- `P0` findings must be fixed or confirmed before the affected artifact can be marked `ready`.
- `P1` findings must be fixed before implementation unless the user explicitly accepts the limitation and the handoff is marked `partial`.
- `P2` and `P3` findings may be repaired directly when the fix follows existing requirements and does not alter core business/data/API/permission behavior.
- When a design issue is caused by contradictory inputs, also create or link the relevant `ENTRY-*` finding from `entry-input-consistency-gate.md`.
- Do not hide unreasonable design behind "assumption". Assumptions are for unknowns; unreasonable structure needs a `DESIGN-*` finding.

## Output Pattern

```text
Design Reasonableness Audit
Status: pass | partial | blocked | not needed
Findings:
- DESIGN-001 | P1 high | dimension | issue | impact | repair
Decisions:
- DESIGN-001 fixed by ...
Accepted limitations:
- ...
```

## Pass Criteria

- The design has one clear business question and a matching report type.
- Every must-have component, filter, interaction, dataset, and API has a reason.
- Reporting/BI/dashboard data models have explicit business process, grain, layer/type, metric additivity, time口径, quality, and lineage decisions.
- Report data-visualization frontend behavior is feasible when report UI is in scope: first-screen conclusion, appropriate chart/table choices, metric formatting/口径, filters/linkage/drill-through, state coverage, provider mapping, performance limits, and theme/accessibility are explicit.
- Affecting filters have field/API/resolver bindings and data-variation evidence for at least one non-default state; selected-state-only filtering is not accepted.
- Global filter/query behavior is feasible without building or fetching all candidate data before applying scope; component-internal filters are explicitly local to already fetched component data.
- Composite widget internals fit their sub-containers without hidden critical text, clipped metric titles, or forced fixed grids that make labels unreadable.
- Report data-service backend behavior is feasible when report APIs are in scope: frontend selects codes only, backend owns metadata/query planning/permission injection/guardrails/cache/export/audit/freshness behavior, and no unsafe SQL/source proxy exists.
- Database-backed P0/high-volume APIs avoid obvious SQL query-shape risks or record accepted mitigations/gaps.
- Report integration testing behavior is feasible when report acceptance is in scope: metric口径, golden/baseline data, data-chain reconciliation, API/frontend/filter/permission/cache/export/performance/exception coverage, UAT/smoke/monitoring/rollback, regression, and retest criteria are explicit.
- The first meaningful viewport is useful, not merely attractive.
- Data, filters, interactions, layout, and tests form one traceable contract.
- No unresolved `P0` design issue remains; unresolved `P1` issues are fixed or explicitly accepted as `partial`.
