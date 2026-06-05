---
name: test-evidence-defect-reporting
description: "用于产出结构化测试证据、缺陷报告和验收结论。用户提到测试报告、缺陷报告、问题单、证据截图、浏览器截图、多模态视觉异常、网络日志、控制台日志、复现步骤、预期/实际结果、通过/失败/部分通过、阻塞项、责任归类、回归证据、验收总结时触发；不设计测试用例或执行测试。"
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
