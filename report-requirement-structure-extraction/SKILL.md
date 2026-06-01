---
name: report-requirement-structure-extraction
description: "Convert vague user needs into real, development-ready requirements across multiple delivery scenarios. Use when the task mentions 需求分析, 需求转化, 需求梳理, 需求拆解, 需求澄清, 模糊需求转开发需求, PRD整理, 原型设计需求分析, 技术方案需求转化, 数据服务需求分析, 接口设计需求拆解, 数据可视化需求分析, 前后端联调需求, 测试需求分析, 权限/数据源/数据表/数据格式转化梳理, or when Codex must turn rough business ideas, screenshots, meeting notes, metric lists, data documents, API notes, or user stories into scenario-specific development requirements, including business problems, users, scope, metrics, dimensions, APIs, data models, source systems, permissions, transformations, integration contracts, tests, acceptance criteria, risks, gaps, and next skill/workflow routing."
---

# Requirement Transformation Analysis

## Core Positioning

Use this as the front-door skill for turning unclear or partial requirements into concrete development inputs. The output is not only a summary; it must become an actionable requirement package that downstream prototype, technical-solution, backend, frontend, data-service, visualization, testing, and integration workflows can use.

This skill answers:

- What real business, service, technical, data, permission, integration, or delivery problem the user needs solved.
- Which delivery scenario the request belongs to, and whether it should be split into phases.
- What each theme, business problem, feature, API, data object, page, flow, or test point requires.
- Which facts are confirmed, which items are inferred, and which gaps block reliable design or development.
- Which downstream skill/workflow should be used next and what handoff artifacts it needs.

Do not jump directly to implementation. First convert the request into a stable, traceable, scenario-specific development brief.

## Reference Loading Guide

Load references only when their scenario is relevant. Do not bulk-load every reference by default.

- Read `references/scenario-routing.md` when scenario judgment, phase split, or downstream skill routing is needed.
- Read `references/prototype-design-playbook.md` for prototypes, report/dashboard/page design, data screens, screenshot restoration, or implementation-ready UI specs.
- Read `references/technical-solution-playbook.md` for technical solutions, API inventory, data models, table relationships, data sources, transformations, and permission strategy.
- Read `references/data-model-requirement-playbook.md` for data model requirement transformation, including business objects, source fields, conceptual/logical/physical models, metric grain, table relationships, response/view models, and model gaps.
- Read `references/data-service-backend-playbook.md` for backend/data-service/API implementation requirements.
- Read `references/data-visualization-frontend-playbook.md` for frontend visualization, mock-to-API replacement, response adapters, filters, component binding, and runtime UI validation.
- Read `references/testing-integration-playbook.md` for test design, frontend-backend integration, smoke tests, SSO tests, data consistency, and defect evidence.
- Read `references/data-governance-permission-playbook.md` whenever data source credibility,口径, lineage, reconciliation, masking, audit, or permission design matters.
- Read `references/object-model-and-acceptance.md` when object fields, acceptance criteria, or implementation task lists need more detail than the core output skeleton.

## Input Adaptation

Accept incomplete inputs and infer cautiously.

Supported input forms include one-sentence ideas, PRDs, meeting notes, screenshots, prototypes, metric lists, data dictionaries, database fields, source-system metadata, API documents, mock data, frontend/backend code, logs, deployment notes, SSO/security notes, and mixed Chinese/English terminology.

When information is missing:

- Produce a best-effort structure instead of blocking.
- Separate confirmed facts, inferred assumptions, and missing questions.
- Ask follow-up questions only when a missing answer changes the main scenario, user, data source, permission model, or delivery boundary.
- Prefer explicit uncertainty over silent invention.

## Universal Workflow

Use this sequence for every requirement transformation:

1. Identify the primary deliverable.
   State whether the user likely expects a requirement brief, prototype spec, technical solution, API list, data model, backend plan, frontend integration plan, test plan, or executable implementation.

2. Judge the scenario.
   Pick one primary scenario and optional secondary scenarios. If scenario choice is not obvious, read `references/scenario-routing.md`.

3. Extract facts, assumptions, and missing inputs.
   Facts come from the user or provided files. Assumptions are safe inferences. Missing inputs are items that may affect scope, data, permission, acceptance, or delivery.

4. Identify users, stakeholders, and usage moments.
   Capture target users, maintainers, data owners, reviewers, approvers, external systems, and when/why they use the delivered result.

5. Convert goals into problem statements.
   Split vague goals into `theme -> business/technical problem -> expected decision/action/result`.

6. Define scope and boundaries.
   List in-scope capabilities, out-of-scope items, phase boundaries, dependencies, and delivery order.

7. Build the object model.
   Identify business objects, data objects, system objects, UI objects, process objects, and test objects. Capture grain, owner, source, status, relationship, lifecycle, permission, and acceptance when relevant.

8. Load the relevant scenario playbook.
   Use only the reference files that match the selected scenario and requested deliverable.

9. Convert to tasks and acceptance criteria.
   Write requirements as capability statements with measurable acceptance criteria, data/API dependencies, permission behavior, error/empty states, and test evidence.

10. Route to downstream skills.
    Recommend the next skill/workflow only after the requirement package is clear enough for that skill to act.

## Output Skeleton

When transforming a requirement, use this structure. Keep small inputs concise, but preserve the same logical sections.

1. 需求场景判断: primary scenario, secondary scenarios, expected deliverable.
2. 已知事实/推断/缺口: confirmed facts, assumptions, missing inputs that affect design or development.
3. 目标用户与使用场景: users, stakeholders, usage moment, decision/action/result.
4. 主题与问题树: theme -> business/technical problem -> expected outcome.
5. 开发范围边界: in scope, out of scope, dependencies, phase split.
6. 对象模型: business/data/system/UI/process/test objects with grain, owner, source, status, relationships.
7. 场景化需求拆解: selected playbook output, such as prototype blocks, APIs, data tables, frontend components, or test cases.
8. 数据与接口需求: source systems, tables/models, relationships, API contracts, request/response fields, transformations.
9. 权限与安全需求: identity, role, organization scope, row/field/operation permission, masking, audit, export rules.
10. 交互/流程/状态需求: filters, jumps, approval/task flow, lifecycle state, error/empty/loading/no-permission/stale states.
11. 非功能需求: performance, freshness, reliability, observability, compatibility, deployment, rollback.
12. 测试与验收标准: acceptance criteria, test cases, evidence, data consistency checks, integration smoke tests.
13. 后续调用建议: exact downstream skills/workflows and why.
14. 风险与待确认问题: unresolved risks, questions, decisions needed before implementation.

For implementation-ready tasks, add `开发任务清单`: task name, target file/module or artifact, dependency, and acceptance condition. Read `references/object-model-and-acceptance.md` for the detailed object and acceptance model.

## High-Availability Rules

- Never fail because the user only gave a short or vague request.
- Always produce a scenario judgment and a first-pass development brief.
- Keep extraction independent of one industry; adapt object names to the provided context.
- Separate business requirements, data requirements, API requirements, UI requirements, permission requirements, and test requirements.
- Do not overfit to examples; support adjacent scenarios that still convert requirements into development work.
- Use stable categories and explicit assumptions instead of inventing unnecessary methodology.
- When screenshots or source files are provided, extract visible/actual elements before inferring missing ones.
- When code or API docs are provided, inspect real contracts before designing new ones.
- If a follow-up question is necessary, ask the minimum number needed to unblock the next irreversible decision.

## Quality Checklist

Before finalizing, verify:

- The primary scenario and expected deliverable are explicit.
- Facts, assumptions, and missing inputs are separated.
- User/stakeholder and usage moment are named.
- Vague goals are converted into specific problems and outcomes.
- Scope boundaries and dependencies are visible.
- Objects include grain, owner/source, status, relationships, and permission when relevant.
- Scenario-specific requirements are detailed enough for the selected downstream skill.
- Data, API, UI, permission, process, nonfunctional, and test needs are separated.
- Acceptance criteria are measurable and tied to tests or evidence.
- Recommended downstream skills are specific and minimal.
- Remaining risks and questions are not hidden.

## Avoid

- Do not treat requirement analysis as a generic summary.
- Do not jump from vague intent to UI/code without scenario judgment.
- Do not design APIs without data source, table/model, permission, and response transformation considerations.
- Do not design visual pages without metrics, dimensions, filters, interactions, and data binding.
- Do not design tests without acceptance criteria, test data, expected results, and evidence.
- Do not list every possible artifact; include what the selected scenario needs.
- Do not ask broad clarification questions when safe assumptions can move the work forward.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
