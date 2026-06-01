---
name: sso-auth-flow-test
description: "Test SSO authentication flows for running frontend/backend report systems. Use for 单点登录, SSO测试, clientId/token storage, Application-Key/Access-Token headers, 401 invalid token handling, 403 no-permission handling, refresh/deep-link access, logout, re-login, backend token validation, and auth request evidence."
---

# SSO Auth Flow Test

## Overview

Use this skill to validate that frontend SSO behavior and backend auth enforcement work together. SSO is tested as a logic flow, not just as a successful login screen.

## References

- Read `references/01-sso-case-matrix-template.md` when the task needs a reusable matrix/template or standardized evidence structure.
- Read `references/02-sso-breakpoint-closure.md` when the task is to find, explain, or repair breakpoints between frontend SDK login, backend token exchange, protected API validation, 401 recovery, 403 permission handling, or logout.
- Read `references/03-sso-test-process-and-standards.md` when the task needs concrete SSO test procedure, acceptance criteria, fail/blocker standards, evidence rules, or test-report structure.

## Required Inputs

- Running frontend URL.
- Running backend URL or protected API endpoint.
- Test account or access method.
- Expected auth header names and browser storage keys, if documented.

Optional inputs: SSO documentation, role/permission expectations, token invalidation method, source/Git diagnostics links.

## Workflow

1. Establish auth contract.
   Record expected browser storage keys, request header names, backend auth middleware behavior, unauthenticated status code, token-invalid status code, no-permission status code, and login URL pattern. Use `references/03-sso-test-process-and-standards.md` for the required entry criteria and test standards.

2. Test clean first access.
   Clear browser storage/cookies. Open the frontend URL and verify it triggers SSO or the expected login flow. After login, verify the user reaches the target page.

3. Test browser storage.
   Confirm the frontend stores the agreed `clientId` and `token` values or project-specific equivalents. Record whether storage is localStorage, sessionStorage, cookie, or SDK-managed memory.

4. Test authenticated headers.
   Inspect protected backend requests and verify auth values are passed in documented headers such as `clientId`/`token`, `Application-Key`/`Access-Token`, or the project-specific names. Auth values should not appear in query strings unless explicitly required.

5. Test valid-session continuity.
   Refresh the page, open a deep route, switch tabs/pages, and trigger API requests. Confirm auth state and headers remain valid without duplicate login loops.

6. Test invalid auth.
   Remove, corrupt, or expire the token when possible. Confirm backend rejects the request and frontend clears invalid auth state, avoids stale business data, and triggers SSO again.

7. Test permission boundary.
   Use a no-permission role or simulate a 403 response when possible. Confirm the frontend shows a permission state rather than redirect loops or stale data.

8. Test logout when available.
   Trigger logout and verify browser storage/cookies are cleared, backend session is invalidated if applicable, and revisiting the page requires login.

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
- Defects/blockers:

## Pass Criteria

- Login starts correctly from unauthenticated access and returns to the intended page.
- Stored auth values match the frontend/backend contract.
- Protected API requests carry the required auth headers.
- Invalid auth is rejected by backend and recovered by frontend without request loops.
- No-permission scenarios are distinguishable from unauthenticated scenarios.
- The run satisfies the pass standards in `references/03-sso-test-process-and-standards.md`, or any unmet standard is explicitly reported as fail or blocked with evidence.

## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
