---
name: missing-model-management
description: "Identify, document, and maintain reusable 待补充数据模型清单 / gap ledgers for data, model, requirement, API, security, performance, and integration uncertainty. Use when requirements, page scope, interactions, acceptance criteria, prototype data code, data sources, tables, fields, metadata, joins, metrics, formulas, enums, sample rows, refresh cadence, ownership, permission, response fields, API contracts, frontend bindings, test expectations, or prototype-to-source mappings are missing, ambiguous, temporary, assumed, or blocking inventory, documentation, implementation, integration, or validation work."
---

# Missing Model Management

## Core Positioning

Use this as a reusable gap-ledger skill to produce or update the 待补充数据模型清单 whenever requirement, data, model, API, security, performance, binding, or testing uncertainty affects API inventory, data modeling, API documentation, backend implementation, frontend binding, or validation.

The list makes uncertainty actionable before it becomes hidden API, backend, frontend, or testing risk.

## Inputs

- Requirements, page/module scope, interaction notes, acceptance criteria, data documents, metric lists, prototype data code.
- API清单 drafts.
- 数据模型文件 drafts.
- Review comments or unresolved implementation questions.

## Reference Map

Read only the reference files needed for the current task:

| Need | Read |
| --- | --- |
| Classify gap category, severity, owner, and impact | `references/01-gap-taxonomy-and-severity.md` |
| Produce the exact pending list table and row wording | `references/02-pending-list-template.md` |
| Maintain status, assumptions, resolution notes, and cross-artifact consistency | `references/03-lifecycle-and-consistency.md` |

Loading guidance:

- For any generated or updated 待补充数据模型清单, read all three references.
- For quick triage, read `01-gap-taxonomy-and-severity.md` and `02-pending-list-template.md`.
- When resolving or changing statuses, `03-lifecycle-and-consistency.md` is mandatory.

## Workflow

1. Collect model gaps.
   Scan requirements, data documents, metric lists, prototype data code, data model files, and API inventory drafts. Treat temporary assumptions as pending until confirmed.

2. Classify each gap.
   Use categories: requirement scope, page/module, interaction, acceptance criteria, prototype code, source system, table/view/file/API, field metadata, join/key, metric formula, enum/dictionary, dimension hierarchy, sample data, permission, data security, refresh cadence, data quality, response model, prototype mapping, performance, ownership.

3. State impact.
   Explain whether the gap blocks API inventory, data model completion, API documentation, backend implementation, frontend binding, testing, or only business confirmation.

4. Define current assumption.
   If work can continue safely, write the exact assumption, fallback, and where it must appear in downstream docs. If not safe, mark status as `blocked`.

5. Ask a concrete question.
   Assign the likely owner: business, data owner, backend, frontend, SSO/security, platform, or unclear. Write one precise confirmation question.

6. Maintain status.
   Use status values: `open`, `assumed`, `blocked`, `resolved`, `obsolete`. When resolved, record decision, date, source, and affected artifacts.

## Hard Constraints

- Every unresolved requirement/source/model/formula/enum/join/permission/security/performance issue must be visible.
- Every temporary assumption must use the same wording across API清单、数据模型文件, and downstream API docs.
- No endpoint or response field may depend on an undocumented model gap.
- Do not merge unrelated gaps into one vague TODO row.
- Resolved items must include where the decision came from and which artifacts were updated.
- If a gap can change business results, permissions, or source traceability, severity cannot be `Low`.
- Do not leave required gap-list cells blank. Use `none` when intentionally not applicable, or `TBD` only when paired with a concrete confirmation question.

## Required Output

Use a table with these columns:

- ID.
- Category.
- Severity.
- Affected model/API/page.
- Missing or ambiguous item.
- Impact.
- Current assumption or fallback.
- Owner.
- Confirmation question.
- Status.
- Resolution note.

## Quick Quality Gate

- Every `partial` or `blocked` API/model has linked gap IDs.
- Every gap has one owner and one concrete question.
- Every assumed item has a reusable assumption sentence.
- Every blocker states what downstream work is blocked.
- No row says only "待确认" without impact and owner question.
- No required cell is blank.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
