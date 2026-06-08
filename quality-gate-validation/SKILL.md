---
name: quality-gate-validation
description: "用于执行跨阶段质量门禁和一致性检查。用户提到质量检查、输入材料冲突、入口一致性、设计合理性、筛选绑定断裂、指标单位/百分比显示冲突、生产就绪、验收门禁、可交付性、不要凭空假设、需求/API/模型/前端/后端/测试不一致、ready/partial/blocked 判定时触发；不替代具体实现 skill。"
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

## Workflow

1. Select the smallest gate set needed for the current risk.
2. Inventory evidence and affected artifacts.
3. Produce findings with stable IDs: `ENTRY-*`, `DESIGN-*`, `READY-*`, `VIS-*`, `VDIFF-*`, or domain-specific IDs.
4. Assign severity, owner, affected artifact, required decision/evidence, and readiness impact.
5. Mark each affected artifact as `ready`, `partial`, or `blocked`.
6. Route unresolved findings to the owning skill/workflow.

## Required Output

- Gate(s) executed and evidence checked.
- Findings table with ID, severity, expected, actual, impact, owner, and required action.
- Readiness result: `ready`, `partial`, or `blocked`.
- Confirmation questions only for decisions that block affected work.

## Quality Gate

- Do not use this skill as a dumping ground for domain logic.
- Do not mark `ready` when high-impact conflicts, missing production controls, or untested required runtime behavior remain.
- Do not mark `ready` when filter linkage was tested before data completeness, or when affecting filter option data, fact rows, resolver/API branches, field grain, or non-default data variation evidence is missing.
- Do not mark `ready` when an affecting filter only changes selected UI state, is hidden by `ignoredFilters`, lacks provider/resolver grain, or has no evidence for non-default data variation.
- Do not mark `ready` when visible Chinese report rate/change/completion indicators use `pt`, `p.p.`, or `percentage point` instead of `%`, unless that wording is explicitly accepted in the contract.
- Do not mark `ready` when KPI/summary/card internals hide critical labels or values through nowrap, ellipsis, overflow clipping, or too-small internal columns without a tested expansion/scroll/wrap behavior.
- Keep gate ownership clear: quality gates decide readiness and conflicts; implementation details route to the owning skill/workflow.
