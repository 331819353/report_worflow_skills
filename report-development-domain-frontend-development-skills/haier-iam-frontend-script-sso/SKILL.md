---
name: haier-iam-frontend-script-sso
description: "Implement, review, or standardize Haier account-center @haier/iam browser SDK SSO through script-tag integration in frontend projects. Use when a non-NPM, non-React, static HTML, Vue, Vite, legacy, embedded webview, or mixed frontend needs Haier IAM/账号中心 login, logout, token handling, 401 re-login, window.__USERCENTER__, optional ihaier/Feishu appId, debug mode, or migration from @haier/fe-stub-usercenter to @haier/iam by script access."
---

# Haier IAM Frontend Script SSO

## Overview

Use this skill to add or review Haier 账号中心 browser SDK access through a `<script>` tag. Prefer this path for non-React or non-NPM projects; if the target project already uses package-based `@haier/iam`, keep using the npm workflow unless the user explicitly asks for script access.

For detailed snippets, API notes, and request-interceptor examples, read [references/script-integration.md](references/script-integration.md).

## Default Workflow

1. Inspect the frontend entry points.
   Identify whether the app is plain HTML, Vue/Vite, legacy webpack, micro-frontend, iframe/webview, or server-rendered. In Vue/Vite projects, treat `index.html` as the usual SDK script insertion point and `App.vue` as the usual initialization/login entry, unless the project has an existing auth bootstrap module.

2. Add the browser SDK script once.
   Add it to `index.html` in typical Vue/Vite projects. Use version `1.9.4` by default unless the project pins another approved version:

   ```html
   <script src="https://r.haier.net/assets/prod/s01996-front/haier-iam/1.9.4/browser/index.min.js"></script>
   ```

3. Read the SDK from `window.__USERCENTER__`.
   In typical Vue/Vite projects, read and initialize it from `App.vue` or from an IAM adapter imported by `App.vue`. Add a null guard before using it. Do not assume the global exists when the network script is blocked, delayed, or loaded after app bootstrap.

4. Initialize with required config only.
   Required fields are `ssoUrl`, `clientId`, and `tokenUrl`. `appId` is optional; omit it when the business side has not provided a Feishu/ihaier app id or the page is not running in an ihaier/Feishu container.

5. Use the correct environment values.
   Use `https://iama.haier.net` for production and `https://iam-test.haier.net` for test. Do not include a trailing slash on `ssoUrl`. `tokenUrl` must point to the business backend token service and should use HTTPS.

6. Login on page startup.
   In Vue projects, this usually belongs in `App.vue` startup logic. The recommended flow is to call `login()` when the page loads without first checking whether a token exists. On success, store or inject the returned token according to the app's existing request layer. On failure, surface `errorMessage` first.

7. Handle token expiry and 401 responses.
   When a token expires or an API returns 401, call `login({ invalidateToken: true })`, update the `Access-Token` request header with the new token, and retry the failed request once if the local request layer supports retry. For 403, call `notPermission()` or the app's existing no-permission flow.

8. Wire logout through the SDK.
   Use `logout()` for explicit sign-out and keep the app's local state cleanup consistent with its router/session conventions.

9. Verify in the target environment.
   Smoke test first load, successful login, refresh, route change, API request with `Access-Token`, 401 re-login, 403 no-permission handling, logout redirect, and script-load failure messaging.

## Implementation Rules

- Keep SDK config in environment-aware constants rather than scattering literals through business code.
- Do not commit real tokens, captured user info, client secrets, or private backend token endpoints.
- Prefer one small adapter module, such as `iam.ts` or `iam.js`, that wraps `configUserCenter`, `login`, `logout`, `getToken`, `getUserInfo`, and 401 handling.
- Add TypeScript declarations for `window.__USERCENTER__` when the project is TypeScript.
- Use `extra.locationParseEnableHash: true` for hash-router projects.
- Use `extra.debugLog: true`, `?iam_debug=1`, `?iamDebug=1`, or `window.FORCE_IAM_DEBUG = 1` only for diagnosis; do not leave noisy debug behavior enabled by default.

## Handoff Checklist

- The HTML shell loads the SDK exactly once.
- Vue/Vite projects put the SDK `<script>` in `index.html`.
- Vue/Vite projects put initialization and first `login()` in `App.vue` or an IAM adapter imported by `App.vue`.
- Runtime code guards `window.__USERCENTER__` before calling SDK methods.
- `appId` is omitted unless the product explicitly supplies a Feishu/ihaier app id.
- First-load `login()` is wired and errors use `errorMessage`.
- API requests include `Access-Token` where required.
- 401 calls `login({ invalidateToken: true })`; 403 uses `notPermission()` or the product's no-permission handler.
- Logout is wired through `logout()`.
- The implementation has been smoke tested in the expected browser/container.
