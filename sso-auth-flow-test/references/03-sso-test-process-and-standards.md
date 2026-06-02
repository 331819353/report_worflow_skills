# SSO Test Process And Standards

Use this reference when SSO testing needs an executable process and clear acceptance standards. The goal is to prove the whole auth chain works, not only that a login page appears.

## Test Scope

SSO testing covers these layers:

- Frontend login bootstrap, redirect/callback, storage, route guard, request interceptor, 401 recovery, 403 permission state, and logout cleanup.
- Backend `tokenUrl` code exchange, protected API middleware, `Application-Key` and `Access-Token` validation, IAMA token check, local user mapping, permission checks, and logout/session policy.
- Cross-end contract consistency: environment, `clientId`, token source, header names, status codes, retry rules, and evidence.

## Entry Criteria

Start SSO testing only when these are known or explicitly marked as blockers:

- Running frontend URL.
- Running backend base URL or at least one protected API endpoint.
- SSO environment: test or production-like.
- Test account, login method, and expected role/permission.
- Expected `clientId` or `Application-Key`.
- Expected token storage location: localStorage, sessionStorage, cookie, SDK-managed memory, or project auth store.
- Expected request headers, normally `Application-Key` and `Access-Token`.
- Expected unauthenticated response, token-invalid response, and no-permission response.
- Logout entrypoint if logout is in scope.

If any required item is missing, record it as `blocked` or `missing information` instead of guessing.

## Standard Test Process

1. Establish the auth contract.
   Record frontend URL, backend URL, SSO domain, account/role, storage keys, header names, protected API sample, public route allowlist, expected 401/token-invalid response, expected 403 response, and logout behavior.

2. Prepare a clean browser state.
   Clear localStorage, sessionStorage, relevant cookies, and service-worker/cache state if the app uses them. Start from a fresh tab or isolated browser context when possible.

3. Test clean first access.
   Open a protected page or entry route with no local token. Verify the app starts SSO, completes login, returns to the intended page, and does not call protected business APIs before valid auth is ready.

4. Test token exchange and storage.
   Verify the configured backend `tokenUrl` succeeds when the SDK/frontend exchanges the authorization code. Confirm browser storage contains only safe auth values needed by the frontend, such as `clientId` and access token. Do not require the browser to expose secrets or raw authorization codes.

5. Test protected request headers.
   Trigger page data loading and user interactions that call protected APIs. Confirm every protected API request carries the documented client ID and token headers, normally `Application-Key` and `Access-Token`. Confirm tokens are not sent in query strings unless the project has an explicit documented exception.

6. Test backend token validation.
   Confirm the backend rejects missing headers, rejects unknown `Application-Key`, calls or enforces token validation for protected routes, and allows requests only after token validity is confirmed.

7. Test valid-session continuity.
   Refresh the page, open a deep link, change routes, switch tabs if relevant, and trigger API requests. Confirm auth state is restored, headers remain present, protected APIs succeed, and no duplicate login loop occurs.

8. Test missing token.
   Remove the token while keeping the app open, then refresh or call a protected API. The backend should reject the request, and the frontend should clear stale auth state and re-trigger SSO or show the configured auth state.

9. Test invalid or expired token.
   Tamper with the token, use an expired token, or use the project's token invalidation method. The backend should return 401 or token-invalid, and the frontend should call `login({ invalidateToken: true })`, update token/clientId, retry the failed request once, and stop retrying if recovery fails.

10. Test concurrent 401 recovery.
   Trigger multiple protected API requests with an invalid token. Confirm the frontend uses one shared refresh/re-login operation, avoids multiple login windows or redirect storms, retries failed requests at most once, and ends in a stable state.

11. Test no-permission behavior.
   Use a no-permission role or a controlled 403 response. Confirm the backend returns 403 only after token validity is confirmed, and the frontend shows a no-permission state without re-login loops or stale protected data.

12. Test logout.
   Trigger logout from the UI or documented route. Confirm SDK logout or local logout is called, browser auth state is cleared, local frontend stores/caches are cleared, backend local session is invalidated when applicable, and revisiting a protected page requires login again.

13. Test public route boundaries.
   Confirm public routes, health checks, static assets, and preflight requests work without auth when they are intentionally allowlisted. Confirm business APIs are not accidentally public.

14. Collect evidence and classify result.
   Capture storage state, redacted network headers, status codes, screenshots, console errors, backend response samples, and reproduction steps. Classify each case as `pass`, `fail`, `blocked`, or `not run`.

## Minimum Test Cases

| Case | Steps | Pass Standard | Failure Examples |
| --- | --- | --- | --- |
| Clean first access | Clear browser state, open protected page, complete login | User returns to intended page; protected APIs wait until auth is ready | Blank page, wrong redirect, protected API fires before login, endless login loop |
| Token exchange | Login through SDK and observe backend `tokenUrl` | Code exchange succeeds; frontend receives usable token/user info; no secret in browser | `tokenUrl` 404/CORS error, missing token, `clientSecret` in browser |
| Storage | Inspect agreed storage after login | Only safe `clientId` and token-related values are stored | Raw code, `clientSecret`, excessive account payload, missing token |
| Request headers | Trigger protected API calls | All protected APIs carry `Application-Key` and `Access-Token` or documented aliases | Missing client ID, missing token, token in query string without contract |
| Backend validation | Call protected API with valid auth | Backend validates token and returns business response | Backend trusts local storage/client ID only; route bypasses middleware |
| Refresh/deep link | Refresh and open a deep route | Auth restored, headers attached, no duplicate login loop | Route loses token, stale data, multiple redirects |
| Missing token | Remove token and call protected API | Backend returns 401/token-invalid; frontend starts auth recovery | Protected data still returned, silent failure, stale data shown |
| Invalid/expired token | Tamper token or force expiry | Backend rejects; frontend refreshes login once and recovers or stops cleanly | Infinite retry loop, repeated redirects, stale token reused |
| Concurrent 401 | Trigger several protected calls with invalid token | One refresh operation; requests retry once; stable final state | Multiple login windows, several refresh calls, request storm |
| No permission | Use restricted feature with valid token but no role | Backend returns 403; frontend shows permission state | Re-login loop, 401 used for permission, protected stale data shown |
| Logout | Login, then logout and revisit protected route | Browser auth and local state cleared; protected route requires login | Token remains, user data remains, route still accessible |
| Public allowlist | Call public routes and protected routes separately | Public routes work; protected routes require auth | Health check blocked unnecessarily, business API accidentally public |

## Pass Standards

An SSO test pass requires all applicable standards below:

- First access starts SSO and returns to the intended page.
- Frontend does not call protected business APIs before auth bootstrap succeeds.
- Browser storage and frontend store match the documented auth contract.
- Protected backend requests include required auth headers.
- Tokens, authorization codes, and secrets are not leaked through URLs, logs, screenshots, or final reports.
- Backend rejects missing, unknown, invalid, expired, or unverifiable auth.
- Backend validates token before attaching local user context or running business permission logic.
- 401/token-invalid triggers frontend auth recovery without infinite loops.
- 403/no-permission is displayed as permission denial and does not trigger re-login.
- Refresh, deep links, and route changes preserve or restore auth correctly.
- Logout clears local frontend auth state and backend local session state when applicable.
- Evidence is sufficient for another engineer to reproduce the result without exposing real secrets.

## Fail Standards

Mark the test as `fail` when any of these occur in a testable environment:

- Protected business data loads without required auth.
- `clientSecret`, raw authorization code, or full sensitive account payload appears in browser storage, request query, logs, or report evidence.
- Required auth headers are missing from protected requests.
- Backend accepts unknown `Application-Key` values.
- Backend returns 200 for invalid, expired, or missing token on protected APIs.
- Frontend enters infinite redirect/retry loops.
- Frontend treats 403 as a login-expired state.
- Logout leaves reusable token/session state behind.
- Test and production SSO values are mixed in one environment.

## Blocker Standards

Mark the test as `blocked` rather than pass/fail when execution cannot prove behavior:

- Frontend URL, backend URL, or protected API endpoint is unavailable.
- No test account or SSO access method is available.
- VPN/network/container access is required but unavailable.
- SSO environment, client ID, or token/header contract is unknown.
- No valid way exists to simulate missing, invalid, expired, or no-permission states.
- Backend logs or API responses needed to distinguish 401 from 403 are unavailable.

For blockers, record the missing item, owner, and the smallest confirmation needed to unblock testing.

## Evidence Standards

Collect evidence for each run:

- Environment: frontend URL, backend URL, SSO domain, browser/container, build or commit if known.
- Account and role: redacted username or role label, not passwords or tokens.
- Storage: storage key names and redacted value presence, not full token values.
- Network: request URL, method, status, redacted auth header presence, response code.
- UI: screenshot or visible state for login success, no-permission, error, and logout when applicable.
- Backend: sanitized response samples or logs if available.
- Reproduction: precondition, steps, expected result, actual result.
- Production/retest context when applicable: environment/version, account/role, protected API sample, auth contract version, defect ID, retest criteria, and closure evidence.

Redaction rules:

- Show only token presence, prefix/suffix, or `[REDACTED]`; never paste full tokens.
- Never paste `clientSecret`, authorization code, password, full account object, or private user data.
- Avoid screenshots that expose personal data unless the data is masked.

## Result Format

Use this format in test reports:

```text
SSO environment:
Frontend URL:
Backend URL / protected API:
Account / role:
Auth contract:
Storage checked:
Headers checked:
Cases run:
Pass:
Fail:
Blocked:
Key evidence:
Production/retest context:
Defects:
Blockers / missing info:
Conclusion: pass / partial pass / fail / blocked
```
