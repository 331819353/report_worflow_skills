# Output Skeleton And Gates

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
13. UI/设计基线: common enterprise app baseline, report development baseline, or mixed, with downstream skills that must apply it.
14. 后续调用建议: exact downstream skills/workflows and why.
15. 风险与待确认问题: unresolved risks, questions, decisions needed before implementation.

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
- Page requirements identify whether the common enterprise app baseline, report development baseline, or both must be applied downstream.
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
