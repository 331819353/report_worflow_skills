---
name: test-evidence-defect-reporting
description: "Produce structured test evidence and defect reports for report integration testing. Use for 测试报告, 缺陷报告, evidence capture, screenshots, headless browser screenshot evidence, multimodal visual anomaly findings, network logs, reproduction steps, expected/actual result, owner classification, blocker/missing information, pass/partial/fail conclusion, and handoff-ready QA summaries."
---

# Test Evidence Defect Reporting

## Overview

Use this skill to turn runtime testing into a handoff-ready report. Every failure should be reproducible, evidence-backed, and classified by likely owner side when possible.

## References

- Read `references/01-evidence-defect-template.md` when the task needs a reusable matrix/template or standardized evidence structure.

## Evidence Rules

- Prefer direct runtime evidence: screenshot, browser console, network request/response, API response sample, visible UI value, storage snapshot, and exact URL.
- For visual/layout defects, prefer headless browser screenshot paths plus multimodal `VIS-*` findings. Include viewport/state, component/region, anomaly category, severity, and retest criteria.
- Include source/Git evidence only when it explains a runtime issue.
- Avoid vague statements such as "data is wrong" without expected value, actual value, endpoint, params, and component location.
- Mark missing accounts, missing API docs, inaccessible backend, unavailable SSO, or absent data as blockers or missing information rather than silently passing.

## Defect Classification

Classify each defect into one primary category:

- Environment: URL unreachable, wrong environment, build/version mismatch, proxy/CORS, gateway, timeout, or deployment issue.
- SSO/auth: login redirect, token storage, auth headers, backend validation, invalid-token recovery, permission handling, or logout.
- API contract: endpoint, params, response shape, type, enum, unit, precision, pagination, sorting, error envelope, or transformation mismatch.
- Frontend binding: wrong API call, stale mock, wrong adapter, display calculation, chart/table binding, empty state, or interaction binding.
- Filter: option data, default, reset, cascade, request params, component binding, persistence, export/drilldown inheritance.
- Layout/data visibility: clipping, overlap, truncation, table ellipsis hiding required values, missing scroll, or unreadable data.
- Missing information: unavailable account, undocumented rule, unknown field meaning, absent test data, or inaccessible system.

## Report Template

Use this compact structure:

- Test summary:
- Test environment:
- Running frontend URL:
- Running backend URL:
- Account/role:
- Version/build/source reference:
- Test modules executed:
- Screenshot evidence:
- Multimodal visual review:
- Overall conclusion: pass / partial pass / fail / blocked

For each module:

- Module:
- Cases executed:
- Passed:
- Failed:
- Blocked:
- Evidence:
- Visual findings:
- Notes:

For each defect:

- ID:
- Category:
- Severity: blocker / high / medium / low
- Component or API:
- Reproduction steps:
- Expected result:
- Actual result:
- Evidence:
- Screenshot:
- Visual finding:
- Likely owner: frontend / backend / SSO / data / environment / unclear
- Missing information:
- Suggested next action:

## Pass Criteria

- The report states exactly what was tested and what was not tested.
- Every failed or blocked case has evidence and reproduction steps.
- Every `blocker` or `major` visual/layout failure has screenshot evidence, a `VIS-*` finding, likely owner, and retest criteria.
- The conclusion distinguishes pass, partial pass, fail, and blocked.
- Defects can be handed to frontend, backend, SSO, data, or environment owners without re-investigation.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
