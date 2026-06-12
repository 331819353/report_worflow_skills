---
name: sso-auth-flow-test
description: "用于验证运行中系统的SSO登录、鉴权和权限链路。用户提到单点登录、SSO测试、登录跳转、token/clientId、Application-Key、Access-Token、401失效重登、403无权限、刷新/深链访问、logout、重新登录、后端token校验、前端SDK与后端鉴权断点、认证请求证据时触发；不负责SSO代码接入。"
---

# SSO Auth Flow Test

## Overview

Use this skill to validate that frontend SSO behavior and backend auth enforcement work together. SSO is tested as a logic flow, not just as a successful login screen.

## References

- Use `$delivery-artifact-template-management` when the task needs a reusable SSO case matrix/template or standardized evidence structure.
- Read `references/02-sso-breakpoint-closure.md` when the task is to find, explain, or repair breakpoints between frontend SDK login, backend token exchange, protected API validation, 401 recovery, 403 permission handling, or logout.
- Read `references/03-sso-test-process-and-standards.md` when the task needs concrete SSO test procedure, acceptance criteria, fail/blocker standards, evidence rules, or test-report structure.
- Read `$quality-gate-validation` when SSO results are used for production acceptance, release readiness, or defect retest closure.

## Required Inputs

- Running frontend URL.
- Running backend URL or protected API endpoint.
- Test account or access method.
- Expected auth header names and browser storage keys, if documented.

Optional inputs: SSO documentation, role/permission expectations, token invalidation method, source/Git diagnostics links.

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Establish auth contract.
   Record expected browser storage keys, request header names, backend auth middleware behavior, unauthenticated status code, token-invalid status code, no-permission status code, and login URL pattern. Use `references/03-sso-test-process-and-standards.md` for the required entry criteria and test standards.

2. Test clean first access.
   Clear browser storage/cookies. Open the frontend URL and verify it triggers SSO or the expected login flow. After login, verify the user reaches the target page.

3. Test browser storage.
   Confirm the frontend stores the agreed token value or project-specific equivalent. `clientId` may exist in SDK config, but it must not be required as the authoritative token-check input from the browser. Record whether storage is localStorage, sessionStorage, cookie, or SDK-managed memory.

4. Test authenticated headers.
   Inspect protected backend requests and verify the frontend sends `Access-Token` or the documented token alias. For Haier IAMA check flows, `Application-Key`/`clientId` must be resolved by backend code, not supplied by the frontend request. Auth values should not appear in query strings unless explicitly required.

5. Test valid-session continuity.
   Refresh the page, open a deep route, switch tabs/pages, and trigger API requests. Confirm auth state and headers remain valid without duplicate login loops.

6. Test invalid auth.
   Remove, corrupt, or expire the token when possible. Confirm backend rejects the request and frontend clears invalid auth state, avoids stale business data, and triggers SSO again.

7. Test permission boundary.
   Use a no-permission role or simulate a 403 response when possible. Confirm the frontend shows a permission state rather than redirect loops or stale data.

8. Test logout when available.
   Trigger logout and verify browser storage/cookies are cleared, backend session is invalidated if applicable, and revisiting the page requires login.

9. Record production/retest context when applicable.
   For production-bound SSO validation, record environment/version/account/role, SSO domain, frontend/backend URLs, auth contract version, protected API sample, evidence paths, defect ID when retesting, and closure criteria. Do not mark SSO `pass` when required token/header contract, test account, protected API, or 401/403 evidence is unavailable.

## Required Output

- SSO environment:
- Test account/role:
- Storage keys checked:
- Header names checked:
- First access result:
- Valid token result:
- Missing/invalid/expired token result:
- No-permission result:
- Refresh/deep-link result:
- Logout result:
- Production/retest context:
- Defects/blockers:

## Pass Criteria

- Login starts correctly from unauthenticated access and returns to the intended page.
- Stored auth values match the frontend/backend contract.
- Protected API requests carry the required token header, normally `Access-Token`.
- Backend token-check evidence shows `clientId`/`Application-Key` comes from server-side configuration or a trusted tenant/app registry, not from a frontend header.
- Invalid auth is rejected by backend and recovered by frontend without request loops.
- No-permission scenarios are distinguishable from unauthenticated scenarios.
- The run satisfies the pass standards in `references/03-sso-test-process-and-standards.md`, or any unmet standard is explicitly reported as fail or blocked with evidence.
- Production-bound pass includes environment/version/account/role context, auth contract evidence, protected API evidence, and retest closure when applicable.
