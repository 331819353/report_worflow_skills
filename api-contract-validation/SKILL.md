---
name: api-contract-validation
description: "用于校验 API 契约是否与文档、前端期望、后端路由、mock、OpenAPI、数据库/上游样例、运行响应一致。用户提到接口契约校验、前后端字段不一致、响应字段缺失、类型/单位/枚举/精度错误、百分比/比例值口径、请求参数、分页排序筛选、空态错误态、鉴权头、mock替换前验证、联调问题定位时触发；不生成完整 API 文档或实现代码。"
---

# API Contract Validation

## Positioning

Use this skill to compare API contracts across producer and consumer evidence. It is side-neutral: apply it before backend implementation, before frontend mock replacement, after route changes, or during integration debugging.

It validates behavior and records differences. It does not design a new API inventory, write full API documentation, or implement backend/frontend code unless another workflow asks for that.

## Reference Loading

- Backend/source authority and runtime validation: `references/backend-contract-sources-and-authority.md`, `references/backend-response-and-request-validation.md`, `references/backend-runtime-source-validation.md`
- Backend validation note: `references/backend-validation-note-template.md`
- Frontend provider evidence and comparison checklist: `references/frontend-source-contract-types.md`, `references/frontend-comparison-checklist.md`
- Frontend contract note: `references/frontend-contract-note-template.md`
- Cross-artifact conflicts or readiness gates: use `$quality-gate-validation`.

## Workflow

1. List all contract evidence: API docs, OpenAPI, route code, frontend clients, mock data, provider samples, DB/upstream samples, runtime responses, env/auth notes, and test failures.
2. Decide authority order. If sources conflict on behavior, run `$quality-gate-validation` before changing affected contracts.
3. Compare request contract: method/path, params, filters, pagination, sorting, headers, auth, defaults, invalid values, and permission scope.
4. Compare response contract: envelope, fields, nesting, types, units, precision, enum values, dates, totals, empty states, errors, and no-permission states. For rate/percentage fields, identify whether the API returns a raw ratio (`0.744`), percent number (`74.4`), or display-ready string (`74.4%`), and record display owner and rounding rules.
5. Compare runtime/source behavior when available: mock vs fixture vs DB/upstream vs live API.
6. Classify each finding as pass, mismatch, missing, ambiguous, blocked, or not tested.

## Required Output

- Contract evidence inventory and authority decision.
- Field/request/state comparison matrix.
- Findings with severity, expected, actual, evidence, owner side, and suggested repair.
- Readiness: `ready`, `partial`, or `blocked`.
- Handoff notes for API docs, backend, frontend, or testing.

## Quality Gate

- Do not mark pass when required evidence is absent.
- Do not silently merge contradictory API docs, mocks, route code, and runtime samples.
- Every mismatch includes field/path/state, expected value, actual value, and evidence source.
- Frontend-facing readiness includes loading, empty, error, auth, no-permission, and partial data states.
- Frontend-facing rate/change/completion contracts are not ready until raw value scale, display scale/unit, rounding, and owner are explicit. Visible Chinese report labels should use `%` unless the contract explicitly and intentionally requires `pt`, `p.p.`, or `percentage point`.
- Filter/search/sort/page params are not ready when the contract only changes UI selected state or omits the provider/resolver fields needed to rebuild the response for non-default states.
