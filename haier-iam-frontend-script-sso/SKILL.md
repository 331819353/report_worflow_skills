---
name: haier-iam-frontend-script-sso
description: "Implement, review, or standardize Haier account-center @haier/iam browser SDK SSO through script-tag integration in frontend projects. Use when a non-NPM, non-React, static HTML, Vue, Vite, legacy, embedded webview, or mixed frontend needs Haier IAM/账号中心 login, logout, token handling, 401 re-login, window.__USERCENTER__, optional ihaier/Feishu appId, debug mode, or migration from @haier/fe-stub-usercenter to @haier/iam by script access."
---

# Haier IAM Frontend Script SSO

## Overview

Use this skill to add or review Haier 账号中心 browser SDK access through a `<script>` tag. Prefer this path for non-React or non-NPM projects; if the target project already uses package-based `@haier/iam`, keep using the npm workflow unless the user explicitly asks for script access.

For entrypoint selection and complete frontend flows, read [references/frontend-integration-entrypoints.md](references/frontend-integration-entrypoints.md). For script-tag snippets, API notes, and request-interceptor examples, read [references/script-integration.md](references/script-integration.md). When the user reports SSO "breakpoints" or cross-end flow gaps, also read [../sso-auth-flow-test/references/02-sso-breakpoint-closure.md](../sso-auth-flow-test/references/02-sso-breakpoint-closure.md).

## Integration Entrypoints

Choose the access path before editing:

- Script-tag browser SDK: static HTML, Vue/Vite, legacy webpack, non-NPM, mixed frontend, or global `window.__USERCENTER__` integration.
- Package-based IAM SDK: an existing package-based `@haier/iam` integration; keep the package workflow and do not add a second script SDK.
- iHaier/Feishu container: the page runs inside iHaier/Feishu and the product supplies a real `appId`.
- Micro-frontend, iframe, or webview: shell/sub-app or embedded runtime affects redirect, storage, or script loading.
- Existing SSO retrofit: login already exists but API headers, 401 recovery, 403 handling, or logout cleanup is incomplete.

For each path, follow the matching flow in [references/frontend-integration-entrypoints.md](references/frontend-integration-entrypoints.md).

## Default Workflow

1. Inspect the frontend entry points.
   Identify whether the app is plain HTML, Vue/Vite, package-based, legacy webpack, micro-frontend, iframe/webview, container-hosted, or server-rendered. Use [references/frontend-integration-entrypoints.md](references/frontend-integration-entrypoints.md) to select the matching path before editing.

2. Add the browser SDK script once.
   Add it to `index.html` in typical Vue/Vite projects. Use version `1.9.4` by default unless the project pins another approved version. If the SDK may load after app bootstrap, use a small wait/load helper and a timeout instead of assuming the global is immediately available:

   ```html
   <script src="https://r.haier.net/assets/prod/s01996-front/haier-iam/1.9.4/browser/index.min.js"></script>
   ```

3. Read the SDK from `window.__USERCENTER__`.
   In typical Vue/Vite projects, read and initialize it from `App.vue` or from an IAM adapter imported by `App.vue`. Add a null guard plus a recoverable error state before using it. Do not assume the global exists when the network script is blocked, delayed, or loaded after app bootstrap.

4. Initialize with required config only.
   Required fields are `ssoUrl`, `clientId`, and `tokenUrl`. `appId` is optional; omit it when the business side has not provided a Feishu/ihaier app id or the page is not running in an ihaier/Feishu container.

5. Use the correct environment values.
   Use `https://iama.haier.net` for production and `https://iam-test.haier.net` for test. Do not include a trailing slash on `ssoUrl`. `tokenUrl` must point to the business backend token service and should use HTTPS.

6. Login on page startup.
   In Vue projects, this usually belongs in `App.vue` startup logic. The recommended flow is to call `login()` when the page loads without first checking whether a token exists. On success, store the returned token together with the configured `clientId` in browser storage according to the app's storage convention, then inject both values into the request layer. On failure, surface `errorMessage` first.

7. Attach SSO headers to backend API requests.
   Every authenticated backend API request must include the stored `clientId` and token in headers. Use `Application-Key: {clientId}` for the client id and `Access-Token: {token}` for the token unless the backend contract explicitly names a compatible alias. Keep this in one request interceptor or API client hook, not scattered across components.

8. Handle token expiry and 401 responses.
   When a token expires or an API returns 401/token-invalid, clear stale browser token state, call `login({ invalidateToken: true })`, persist the new `clientId` and token, update both `Application-Key` and `Access-Token` request headers, and retry the failed request once if the local request layer supports retry. For 403, call `notPermission()` or the app's existing no-permission flow.

9. Wire logout through the SDK.
   Use `logout()` for explicit sign-out and keep the app's local state cleanup consistent with its router/session conventions.

10. Verify in the target environment.
   Smoke test first load, successful login, refresh, route change, API request with `Application-Key` and `Access-Token`, backend token-invalid/401 re-login, 403 no-permission handling, logout redirect, and script-load failure messaging.

## Required Outputs

When using this skill, produce or update:

1. Frontend integration summary: target entry files, SDK script location, initialization location, environment values used, and storage/header conventions.
2. Code changes: SDK loading, `window.__USERCENTER__` guard, config initialization, first-load login, token persistence, request interceptor, 401 re-login, 403 no-permission, and logout cleanup.
3. Configuration notes: `ssoUrl`, `clientId`, `tokenUrl`, optional `appId`, hash-router/debug settings, and any missing or assumed value.
4. Security notes: confirm no token, authorization code, user payload, private endpoint, or secret is committed or logged.
5. Verification evidence: first load, refresh, route change, authenticated request headers, token-invalid/401 recovery, 403 handling, logout, and script-load failure state.
6. Handoff blockers: unresolved backend token service, SSO environment, clientId/appId, container behavior, permission rule, or test-account dependency.

## Implementation Rules

- Keep SDK config in environment-aware constants rather than scattering literals through business code.
- Do not commit real tokens, captured user info, client secrets, or private backend token endpoints.
- Prefer one small adapter module, such as `iam.ts` or `iam.js`, that wraps `configUserCenter`, `login`, `logout`, `getToken`, `getUserInfo`, and 401 handling.
- Persist only the browser-side `clientId` and access token needed by backend requests. Use stable storage keys, clear them on logout and invalid-token/401 re-login, and never store `clientSecret` or raw authorization codes in the browser.
- Add request interception at the shared API layer so all authenticated requests automatically receive `Application-Key` and `Access-Token` headers.
- Add TypeScript declarations for `window.__USERCENTER__` when the project is TypeScript.
- Use `extra.locationParseEnableHash: true` for hash-router projects.
- Use `extra.debugLog: true`, `?iam_debug=1`, `?iamDebug=1`, or `window.FORCE_IAM_DEBUG = 1` only for diagnosis; do not leave noisy debug behavior enabled by default.
- For micro-frontends, iframes, webviews, or slow networks, handle SDK load timeout with a visible login/configuration error and a retry path instead of a blank screen.

## Handoff Checklist

- The HTML shell loads the SDK exactly once.
- Vue/Vite projects put the SDK `<script>` in `index.html`.
- Vue/Vite projects put initialization and first `login()` in `App.vue` or an IAM adapter imported by `App.vue`.
- Runtime code guards `window.__USERCENTER__` before calling SDK methods.
- Runtime code can wait for delayed SDK availability or fail with a visible recoverable error.
- `appId` is omitted unless the product explicitly supplies a Feishu/ihaier app id.
- First-load `login()` is wired and errors use `errorMessage`.
- Successful login persists browser `clientId` and token using the project's storage convention.
- API requests include both `Application-Key` and `Access-Token` where required.
- 401/token-invalid clears stale token state, calls `login({ invalidateToken: true })`, persists the refreshed `clientId` and token, and retries once when supported; 403 uses `notPermission()` or the product's no-permission handler.
- Logout is wired through `logout()`.
- Logout clears stored `clientId`, token, and related local auth state.
- The implementation has been smoke tested in the expected browser/container.

## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
