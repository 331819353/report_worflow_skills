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

6. Filter and query logic.
   Filters have defaults, option sources, affected components, query params or data fields, permission scope, cascade behavior, and stale-selection behavior.

7. Interaction and closure.
   Drilldowns, drawers, jumps, exports, refresh, fullscreen, task actions, approvals, and evidence views preserve the same context and support the user's next step.

8. Visual/layout reasonableness.
   Shell, template, grid, first viewport, block spans, density, labels, legends, tables, and complex diagrams fit the content without overlap, clipping, unreadable text, or excessive blank space.

9. API/backend feasibility.
   API endpoints, response models, data models, transformations, auth, pagination, sorting, exports, and error states can support the UI contract without hidden invention.

10. Testability.
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
- The first meaningful viewport is useful, not merely attractive.
- Data, filters, interactions, layout, and tests form one traceable contract.
- No unresolved `P0` design issue remains; unresolved `P1` issues are fixed or explicitly accepted as `partial`.
