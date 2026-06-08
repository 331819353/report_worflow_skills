---
name: gap-ledger-management
description: "用于识别、记录和维护需求、数据模型、API、后端、前端、权限、环境、性能、测试中的缺口和阻塞项。用户提到缺失字段、口径不清、数据源未知、样例缺失、筛选前数据完整性缺口、筛选数据粒度缺口、表关系不明、枚举/公式待定、鉴权头/环境变量缺少、性能限制未定、假设、待补充清单、gap ledger、阻塞开发或联调时触发。"
---

# Gap Ledger Management

## Positioning

Use this skill whenever uncertainty affects delivery correctness or handoff readiness. A gap is any missing, assumed, contradictory, or unverified fact that could change requirements, models, APIs, code, tests, permissions, environments, performance, or release readiness.

It creates a living ledger. It does not solve the missing information by invention.

## Reference Loading

- Model/API/product gaps: `references/model-gap-taxonomy-and-severity.md`, `references/model-pending-list-template.md`, `references/model-lifecycle-and-consistency.md`
- Backend/API/runtime gaps: `references/backend-gap-taxonomy.md`, `references/backend-document-template.md`, `references/backend-consistency-and-resolution.md`

## Workflow

1. Identify gaps from current task evidence: missing facts, conflicting sources, weak assumptions, unverified runtime behavior, and partial test evidence.
2. Classify category, severity, owner, affected artifact, downstream impact, and whether it blocks work.
   For filter-related gaps, classify missing option rows, missing fact/business rows, missing required fields, missing default/non-default states, single-snapshot mock/provider data, missing empty/no-permission state, or missing resolver/API branch as data-completeness/data-grain gaps before considering frontend binding gaps.
3. Record current assumption only when it is safe to continue; otherwise mark blocked.
4. Link each gap to affected requirement, model, API, field, component, permission, env var, test case, or release artifact.
5. Maintain lifecycle status: `open`, `assumed`, `blocked`, `resolved`, or `obsolete`.

## Required Output

- Gap ledger table with stable IDs.
- Owner question and required evidence for each gap.
- Data-completeness-before-filter-binding gaps when filters are affected.
- Current assumption and readiness impact.
- Affected downstream skills/workflows.
- Resolution and retest notes when applicable.

## Quality Gate

- Correctness, permission, source authority, metric口径, and production environment gaps cannot be hidden in prose.
- Missing filter data completeness cannot be downgraded to a UI binding assumption. It must stay open or blocked until option data, row grain, fields, default/non-default states, and resolver/API branches are evidenced.
- Do not mark affected artifacts `ready` while blocking gaps remain open.
- Every assumption uses consistent wording across downstream handoffs.
