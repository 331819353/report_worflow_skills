---
name: quality-gate-validation
description: "用于执行跨阶段质量门禁和一致性检查。用户提到质量检查、输入材料冲突、入口一致性、设计合理性、筛选绑定断裂、快照接口依赖、snapshotDate/dataVersion/loadBatch、指标单位/百分比显示冲突、更换数据源/数据表后API字段漂移、新增字段命名不规范、生产就绪、验收门禁、可交付性、不要凭空假设、需求/API/模型/前端/后端/测试不一致、ready/partial/blocked 判定时触发；不替代具体实现 skill。"
---

# Quality Gate Validation

## Positioning

Use this skill for reusable quality gates across requirements, design, API/model work, backend/frontend implementation, runtime QA, and testing. It decides whether evidence is consistent, reasonable, production-ready, or blocked.

It is a guardrail skill. It should not produce the primary business/API/code/test artifact itself.

## Reference Loading

Primary shared gates:

- `references/entry-input-consistency-gate.md`
- `references/design-reasonableness-gate.md`
- `references/production-closed-loop-readiness.md`
- `references/visual-multimodal-browser-check.md`
- `references/human-ai-readable-artifact-standard.md`
- `references/report-delivery-pipeline-contract.md`
- `references/environment-profile-contract.md`
- `$haier-enterprise-app-ui-design-spec` when judging common enterprise application page design, frontend readiness, runtime QA, acceptance, or handoff.
- `$report-design-system-governance` `references/03-report-development-guidelines-index.md` plus the relevant report guideline reference(s) when judging report/dashboard/BI/data-screen/analysis design, frontend readiness, runtime QA, testing, acceptance, or handoff.

Legacy standalone gates have been absorbed into the primary shared gates above. Use the main gate references instead of source-specific duplicate files.

## Gate Types

| Gate | Use When |
| --- | --- |
| Entry consistency | Multiple inputs disagree on requirement, metric, source, API, field, permission, UI, env, runtime, or test evidence. |
| Design reasonableness | A design is internally consistent but may not serve the business question, consumer workflow, data feasibility, permission model, or testability. |
| Production readiness | A handoff claims real delivery or release readiness. |
| Visual/runtime gate | Runnable UI needs screenshot, baseline diff, multimodal layout review, or visual defect triage. |
| Artifact readability | Outputs must be human-readable while still extractable by downstream agents. |
| Environment profile | Test/prod runtime profiles, base URLs, proxy/CORS, auth, deployment, and rollback must be separated. |
| Delivery pipeline | A workflow handoff must stay aligned across requirement, prototype, model, API, backend, frontend, test, release, and retest artifacts. |
| Common app UI baseline | Common enterprise app pages need design/implementation/QA/acceptance checks against the company UI baseline. |
| Report UI baseline | Report/dashboard/analysis pages need design/implementation/QA/acceptance checks against report guideline references. |

## Workflow

1. Select the smallest gate set needed for the current risk.
2. Classify whether affected UI artifacts are common enterprise app, report/dashboard, or mixed, then load the matching baseline references before judging design/readiness.
3. Inventory evidence and affected artifacts.
4. Produce findings with stable IDs: `ENTRY-*`, `DESIGN-*`, `READY-*`, `VIS-*`, `VDIFF-*`, or domain-specific IDs.
5. Assign severity, owner, affected artifact, required decision/evidence, and readiness impact.
6. Mark each affected artifact as `ready`, `partial`, or `blocked`.
7. Route unresolved findings to the owning skill/workflow.

## Required Output

- Gate(s) executed and evidence checked.
- Findings table with ID, severity, expected, actual, impact, owner, and required action.
- Readiness result: `ready`, `partial`, or `blocked`.
- Confirmation questions only for decisions that block affected work.

## Quality Gate

- Do not use this skill as a dumping ground for domain logic.
- Do not mark `ready` when high-impact conflicts, missing production controls, or untested required runtime behavior remain.
- Do not mark `ready` when filter linkage was tested before data completeness, or when affecting filter option data, fact rows, resolver/API branches, field grain, or non-default data variation evidence is missing.
- Do not mark `ready` when a data-bearing API depends on an undocumented runtime response, frontend call order, controller memory, or application-memory snapshot for correctness. Snapshot/latest-period reports must declare whether snapshot data is overview-only, canonical/shared, or local/demo, and must use explicit `snapshotDate/latestPeriod/loadBatch/dataVersion` context plus source/precompute/cache/snapshot-backed data rather than hidden endpoint state.
- Do not mark `ready` when data-version, business filters, or permission/data scope are only returned or echoed as metadata but are not used as backend params, source/provider predicates, precompute lookup keys, declared snapshot reuse rules, or Redis/cache key dimensions.
- Do not mark `ready` when a source table, upstream API, fixture, or data source replacement changes existing API response field names, nesting, type/unit/precision/enum/nullability semantics, formula, grain, or empty/no-permission behavior without explicit versioning, deprecation/migration notes, and downstream impact coverage.
- Do not mark `ready` when new response fields lack project-convention naming, source trace, type, unit, nullability, permission/sensitivity rule, additive compatibility status, or contract validation evidence.
- Do not mark `ready` when an affecting filter only changes selected UI state, is hidden by `ignoredFilters`, lacks provider/resolver grain, or has no evidence for non-default data variation.
- Do not mark `ready` when business domain, report theme, management object, subject area, or first-level perspective switching is hidden as an ordinary filter while changing metric names, component set, table headers, metric口径, or domain vocabulary.
- Do not mark `ready` when non-default perspective QA only proves numeric changes and does not verify metric names, titles/summaries, table dimensions/headers, component collection, specialty metrics, risk focus, and口径 labels.
- Do not mark `ready` when perspective navigation percentages, rankings, or status lights lack lineage (`sourceDataset`, `field/formula`, `grain`, `affectedFilters`, `periodBehavior`) or are stored as dynamic KPI values in `filterData.meta`.
- Do not mark `ready` when cross-perspective consistency is unverified: navigation percentages, overview KPIs, journey cards, and chart summaries must reconcile to the same data chain for each domain/statistical口径, with at least one field-level assertion.
- Do not mark `ready` when visible Chinese report rate/change/completion indicators use `pt`, `p.p.`, or `percentage point` instead of `%`, unless that wording is explicitly accepted in the contract.
- Do not mark `ready` when fixed-height navigation/cards/KPI tiles lack declared padding, explicit line-height, gaps, height budget, or DOM overflow evidence at `1920x1080` and `1280x768`. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is clipping unless the region is an intentional visible scroll area.
- Do not mark `ready` when small-card donut/pie charts lack a declared `legendBandHeight`, `labelLineBudget`, `radius`, and `center`, use a right-side legend without a passing width budget, keep outside labels for low-value slices that crowd the ring, or lack a dedicated donut/pie component crop proving labels, guide lines, legend, title, and center text do not collide or leave bounds.
- Do not mark `ready` when KPI/summary/card internals hide critical labels or values through nowrap, ellipsis, overflow clipping, or too-small internal columns without a tested expansion/scroll/wrap behavior.
- Do not mark `ready` when common enterprise app UI or report UI artifacts ignore the matching baseline references for their page type, unless an explicit accepted exception covers the deviation.
- Keep gate ownership clear: quality gates decide readiness and conflicts; implementation details route to the owning skill/workflow.
