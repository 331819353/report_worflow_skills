---
name: haier-sso-integration
description: "用于海尔账号中心 IAM/IAMA 单点登录前后端接入。用户提到海尔IAM、海尔IAMA、账号中心、@haier/iam、window.__USERCENTER__、script版SSO、Application-Key、Access-Token、clientId、code换token、checkToken、JWT/session桥接、401重登、403无权限、logout、前后端SSO断点时触发。"
---

# Haier SSO Integration

## Positioning

Use this skill to implement or review Haier account-center SSO across frontend and backend. It covers browser SDK/script integration, backend token exchange/checking, protected API middleware, and cross-end breakpoint handoff.

It does not replace generic runtime SSO testing; use `$sso-auth-flow-test` when the task is to execute or evidence-test a running system.

## Reference Loading

- Frontend entrypoint selection: `references/frontend-integration-entrypoints.md`
- Frontend script SDK snippets and interceptors: `references/frontend-script-integration.md`
- Backend entrypoint selection: `references/backend-integration-entrypoints.md`
- IAMA API endpoints and response shape: `references/iama-sso-api.md`

## Workflow

1. Determine target side: frontend, backend, or full chain.
2. Identify runtime container: ordinary browser, static page, Vue/Vite app, iHaier/Feishu container, iframe/webview, backend service, middleware retrofit, or multi-tenant app.
3. Choose the integration path from the matching reference.
4. Define config: base URL, app/client ID, headers, token storage, callback URL, protected route/API scope, and logout behavior.
5. Implement or review the smallest project-native integration.
6. For cross-end failures, produce a breakpoint handoff with failing step, expected/actual behavior, frontend storage, request headers, backend status, and retest criteria.

## Required Output

- Chosen frontend/backend SSO path and reason.
- Config and environment variables needed.
- Files or modules to update.
- Auth header/token/session behavior.
- 401, 403, logout, refresh, and deep-link behavior.
- Verification or breakpoint handoff.

## Quality Gate

- Do not mix script SDK and package SDK unless the project explicitly requires both.
- Do not hard-code secrets or tokens.
- Protected APIs must have backend validation, not only frontend hiding.
- 401 token invalid and 403 no-permission behavior must be distinct.
