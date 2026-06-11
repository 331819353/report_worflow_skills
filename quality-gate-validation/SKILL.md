---
name: quality-gate-validation
description: "用于执行跨阶段质量门禁和一致性检查。用户提到质量检查、输入材料冲突、入口一致性、设计合理性、筛选绑定断裂、快照接口依赖、snapshotDate/dataVersion/loadBatch、指标单位/百分比显示冲突、更换数据源/数据表后API字段漂移、新增字段命名不规范、生产就绪、验收门禁、可交付性、不要凭空假设、需求/API/模型/前端/后端/测试不一致、ready/partial/blocked 判定时触发；不替代具体实现 skill。"
---

# Quality Gate Validation

## Positioning

Use this skill to decide whether an artifact, implementation, handoff, or workflow stage is `ready`, `partial`, or `blocked`. It detects cross-stage conflicts, missing evidence, unsafe assumptions, visual/runtime issues, production readiness gaps, and delivery-chain breaks.

It is a gate, not a dumping ground for domain implementation. Load the owning skill references for domain details, then use this skill to judge readiness and route unresolved findings.

## Reference Loading

Primary shared gates:

- `references/entry-input-consistency-gate.md`
- `references/design-reasonableness-gate.md`
- `references/production-closed-loop-readiness.md`
- `references/visual-multimodal-browser-check.md`
- `references/human-ai-readable-artifact-standard.md`
- `references/report-delivery-pipeline-contract.md`
- `references/environment-profile-contract.md`
- `references/shared-quality-gate-blockers.md`
- `$delivery-version-management` `references/code-file-change-ledger.md` when frontend/backend/prototype code changed.
- `$haier-enterprise-app-ui-design-spec` when judging common enterprise app UI readiness.
- `$report-design-system-governance` relevant references, especially `references/11-number-precision-display-rules.md`, when judging report/dashboard/BI/data-screen readiness.

## Gate Types

| Gate | Use when |
| --- | --- |
| Entry consistency | Inputs disagree on requirement, metric, source, API, field, permission, UI, env, runtime, or test evidence. |
| Design reasonableness | A design is internally consistent but may not serve the business question, data shape, workflow, permission model, or testability. |
| Production readiness | A handoff claims real delivery or release readiness. |
| Visual/runtime gate | Runnable UI needs screenshot, baseline diff, multimodal review, or visual defect triage. |
| Artifact readability | Outputs must be human-readable and downstream-agent-readable. |
| Environment profile | Runtime profiles, URLs, proxy/CORS, auth, deployment, and rollback must be separated. |
| Delivery pipeline | Handoffs must stay aligned across requirement, prototype, model, API, backend, frontend, test, release, and retest artifacts. |
| Code change ledger | Changed code needs file-level traceability, pre-change read evidence, code ranges, verification, and rollback/blocker notes. |
| Backend logging | Backend/data-service readiness depends on diagnosable structured logs. |
| Numeric precision/display | Metric-bearing artifacts need consistent value type, units, scale, precision, rounding, null/zero behavior, and formatter ownership. |
| Common app UI baseline | Common enterprise app pages need company UI baseline checks. |
| Report UI baseline | Report/dashboard/analysis pages need report guideline checks. |

## Workflow

1. Select the smallest gate set needed for the current risk.
2. Classify affected artifacts and owning skills.
3. Load the relevant shared gate references and domain baseline references.
4. Inventory evidence and conflicts.
5. Produce findings with stable IDs such as `ENTRY-*`, `DESIGN-*`, `READY-*`, `VIS-*`, `VDIFF-*`, or domain-specific IDs.
6. Assign severity, owner, affected artifact, required evidence/action, and readiness impact.
7. Mark each affected artifact `ready`, `partial`, or `blocked`.
8. Route unresolved findings to the owning skill/workflow.

## Required Output

- Gate(s) executed and evidence checked.
- Findings table with ID, severity, expected, actual, impact, owner, required action, and readiness impact.
- Readiness result: `ready`, `partial`, or `blocked`.
- Confirmation questions only for decisions that block affected work.

## Quality Gate

- Do not mark `ready` when high-impact conflicts, missing production controls, missing runtime evidence, or untested required behavior remain.
- Do not mark `ready` when governed report metrics lack numeric display contracts or show inconsistent units, decimals, percent scale, rounding, tooltip/export precision, null/zero/denominator-zero behavior, or formatter ownership across design/API/frontend/backend/export.
- Do not use this skill to restate full domain rules; cite the loaded references and summarize the blocking evidence.
- Load `shared-quality-gate-blockers.md` before final readiness decisions or when a finding can block delivery.
