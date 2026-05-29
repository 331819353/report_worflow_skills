---
name: sso-auth-flow-test
description: "Test SSO authentication flows for running frontend/backend report systems. Use for 单点登录, SSO测试, clientId/token storage, Application-Key/Access-Token headers, 401 invalid token handling, 403 no-permission handling, refresh/deep-link access, logout, re-login, backend token validation, and auth request evidence."
---

# SSO Auth Flow Test

## Overview

Use this skill to validate that frontend SSO behavior and backend auth enforcement work together. SSO is tested as a logic flow, not just as a successful login screen.

## Required Inputs

- Running frontend URL.
- Running backend URL or protected API endpoint.
- Test account or access method.
- Expected auth header names and browser storage keys, if documented.

Optional inputs: SSO documentation, role/permission expectations, token invalidation method, source/Git diagnostics links.

## Workflow

1. Establish auth contract.
   Record expected browser storage keys, request header names, backend auth middleware behavior, unauthenticated status code, token-invalid status code, no-permission status code, and login URL pattern.

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
