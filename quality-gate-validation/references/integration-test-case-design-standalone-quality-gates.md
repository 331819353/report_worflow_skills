# Standalone Quality Gates

Use this local reference when this skill runs outside a workflow. It keeps the skill self-contained while preserving the shared gates used by workflow orchestration.

## Entry Input Consistency Gate

Run this gate before irreversible design, documentation, validation, implementation, or repair when more than one authority is present, such as requirements, screenshots, HTML/source samples, API docs, data model docs, mock data, code, environment/auth notes, or runtime traces.

If there is only one small input and no conflicting evidence, record `Entry consistency: not needed` and continue.

Minimum process:

1. Inventory every input artifact with path/source, version/date when known, role, and likely authority.
2. Extract comparable claims: scope, user, page/module, metric, formula, unit, grain, filter, default, interaction, state, permission, endpoint, request, response, source, freshness, environment, auth, and acceptance.
3. Compare authority pairs that exist: requirement vs sample/screenshot, requirement vs API, UI/mock vs API/provider sample, API vs source model, API vs runtime route, function description vs API, auth/env notes vs implementation.
4. Record findings as `ENTRY-*` with severity: `P0 blocker`, `P1 high`, `P2 medium`, or `P3 low`.
5. For unresolved `P0` or `P1` conflicts, do not invent or silently repair the affected artifact. Mark the affected scope `partial` or `blocked`, continue unaffected work, and ask for confirmation only before changing authoritative artifacts or code.
6. Propagate confirmed decisions consistently across downstream docs, mappings, code, tests, and handoff notes.

Compact output:

```text
Entry Consistency Audit
Status: pass | partial | blocked | not needed
Findings:
- ENTRY-001 | P1 high | sources | impact | proposed repair | confirmation needed
Decisions:
- ...
Assumptions:
- ...
```

## Design Reasonableness Gate

Run this gate after entry consistency and before finalizing a requirement transform, report design, component mapping, API/model contract, adapter, validation result, visual repair, or handoff.

Check these dimensions:

- Business fit: user, usage moment, primary question, decision/action, and expected conclusion are clear.
- Report/type fit: selected logic matches the task, such as overview, diagnosis, detail, evaluation, recap, anomaly, execution, or reconciliation.
- Hierarchy: conclusion/status, evidence/breakdown, detail, and action are ordered by priority.
- Component necessity: every required block answers a named question and avoids duplicate semantics.
- Metric/data feasibility: formulas, units, grain, baseline, source, dimensions, and gaps support the chosen visual or contract.
- Filter/query logic: defaults, option source, affected components, request fields, permissions, cascade, and stale-selection behavior are defined.
- Interaction closure: drilldown, drawer, jump, export, refresh, fullscreen, approval, and evidence views preserve context and support the next step.
- Visual/layout fit: shell, grid, labels, legends, tables, and diagrams avoid overlap, clipping, unreadable text, and excessive blank space.
- API/backend feasibility: endpoints, models, transformations, auth, errors, pagination, sorting, and exports support the consumer contract.
- Testability: pass/fail criteria and empty/error/no-permission/stale edge behavior are checkable.

Record findings as `DESIGN-*` with severity `P0 blocker`, `P1 high`, `P2 medium`, or `P3 low`. Fix `P0` before marking ready. Fix `P1` before implementation unless the user explicitly accepts a `partial` limitation. Do not hide unreasonable structure behind assumptions.

## Production Closed Loop Readiness

Use this section only when the output is production-bound rather than prototype/demo-only.

Check readiness across:

- Architecture/runtime boundary, dependencies, and data flow.
- Authoritative source, owner, access path, refresh cadence, quality rule, and sample evidence.
- API/model contract, transformations, errors, pagination/export, versioning, and backward compatibility.
- Security, SSO/auth, permission, masking, audit, and secret/config handling.
- Environment/deployment: dev/test/prod URLs, config, proxy/CORS, base path, startup, health, rollback.
- Reliability/observability: logs, request IDs, metrics, traces, timeouts, retries, alerts, and SLA/SLO when needed.
- Performance/capacity: volume, latency, cache/precompute, export limits, concurrency, and slow-query risk.
- Testability: seed data, accounts/roles, executable cases, smoke, API/display consistency, filters, permissions, exports, and visual evidence.
- Defect closure: blocker/major defects have owner, reproduction, evidence, fix version, retest criteria, and status.

Readiness values:

- `ready`: required production controls are confirmed, documented or implemented, and tested enough for the next stage.
- `partial`: limited, demo, or non-prod scope can proceed with named assumptions or missing controls.
- `blocked`: a missing or failed readiness item prevents reliable downstream use.

Do not mark production readiness `ready` when authoritative source, P0 metric formula, auth/permission, API version/contract, runtime URL/health, environment config, rollback path, or blocker/major retest criteria are unknown for a production-bound scope.

## Visual Browser And Multimodal Check

Use this section when a runnable frontend page, dashboard, report page, or prototype needs visual judgment.

Required sequence:

1. Open the target URL with a headless browser or browser automation tool.
2. Wait until shell, charts, tables, fonts, and async data are stable.
3. Capture screenshots before judging visual quality.
4. Run deterministic checks for nonblank rendering, viewport size, expected screenshot count, and baseline image diff when approved baselines exist.
5. If no baseline exists, mark deterministic regression as `baseline missing` and save baseline candidates; do not claim regression pass.
6. Run multimodal explanatory review when available and visual acceptance is in scope.
7. Convert deterministic failures into `VDIFF-*` findings and multimodal anomalies into `VIS-*` findings.
8. Repair or route blocker/major findings, then retest the affected screenshot states.

Screenshot coverage should include the first viewport, full page when scroll exists, important responsive viewports, representative filter state, key tabs/drawers/modals, complex diagrams, and reachable loading/empty/error/no-permission/token-invalid states.

Visual finding categories include layout offset, excessive blank area, text overlap, graphic overlap, component too small, clipping, nonblank rendering failure, brand/logo issue, sample fidelity issue, weak control surface, complex diagram collision, bad visual proportion, broken scroll behavior, low readability, and stale prototype residue.

Use severity `blocker`, `major`, or `minor`. Do not report visual pass when required screenshots, baseline diff evidence, or required multimodal review are missing; mark the result `partial` or `blocked` instead.

## Readiness And Handoff Contract

When this skill hands results to another stage, include:

- Scope and environment/version used.
- Artifacts produced or inspected, with paths or URLs.
- Readiness: `ready`, `partial`, or `blocked`.
- Open `ENTRY-*`, `DESIGN-*`, `VDIFF-*`, `VIS-*`, defect, or gap IDs.
- Owner questions and exact confirmation needed.
- Retest or acceptance criteria for any repaired or deferred item.

A handoff is not `ready` when downstream work would need to invent source authority, metric formula, API behavior, permission behavior, runtime environment, or closure criteria.
