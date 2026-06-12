# SSO Breakpoint Closure Guide

Use this guide when an SSO flow works in isolated steps but still has breaks between frontend SDK login, backend token exchange, protected API access, token refresh, permission handling, or logout.

## Target End-To-End Flow

1. Frontend loads the IAM browser SDK once and waits for `window.__USERCENTER__` with a timeout.
2. Frontend initializes `configUserCenter` with environment-specific `ssoUrl`, `clientId`, `tokenUrl`, optional `redirectUri`, and optional `appId`.
3. Frontend starts login from the app bootstrap or route guard before protected API calls run.
4. SDK obtains the login result and calls the configured backend `tokenUrl` when an authorization code must be exchanged.
5. Backend `tokenUrl` exchanges `code` through IAMA `/api/oauth/code/get/v2` using server-side `client_secret`.
6. Backend returns the canonical login fields to the frontend: `resultCode`, `resultMsg`, `access_token`, `expires_in`, `token_type`, `refresh_token`, and `account`, while keeping secrets and raw codes out of browser storage.
7. Frontend stores only browser-safe auth values, normally the access token, using agreed storage keys.
8. Frontend shared request layer sends every protected business API request with `Access-Token: {token}`.
9. Backend auth middleware reads `Access-Token`, resolves `clientId` from server-side config or a trusted tenant/app registry, and validates the token through IAMA `/api/oauth/token/check` using the resolved `clientId` as upstream `Application-Key`.
10. Backend maps a valid IAMA account to local user context and applies business permission checks.
11. Backend returns 401 or the local token-invalid response for missing/invalid auth, and returns 403 only for valid token but insufficient permission.
12. Frontend handles 401 by clearing stale auth, calling `login({ invalidateToken: true })`, persisting the refreshed token, and retrying the failed request once.
13. Frontend handles 403 with `notPermission()` or the product's no-permission state, without re-login loops.
14. Logout calls SDK `logout()`, clears local auth state, and follows the backend session or revocation policy if the project has one.

## Common Breakpoints And Fixes

| Breakpoint | Symptom | Likely owner | Required fix |
| --- | --- | --- | --- |
| SDK script not ready | blank page, `window.__USERCENTER__` undefined | frontend | Add a bounded wait/load helper, visible error state, and retry path. |
| Config drift | test frontend redirects to prod IAM or wrong callback | frontend/config | Centralize `ssoUrl`, `clientId`, `tokenUrl`, `redirectUri`, and optional `appId` per environment. |
| Login starts too late | first page APIs return 401 before SSO finishes | frontend | Gate protected route rendering and API bootstrap until login resolves or fails. |
| `tokenUrl` mismatch | SDK login succeeds but token/userInfo missing | frontend/backend | Confirm method, URL, CORS/proxy, code parameter name, response shape, and backend code exchange. |
| `clientSecret` exposed | secret appears in frontend config or network payload | backend/security | Move code exchange to backend only; never ship `clientSecret` to browser. |
| Missing backend client ID config | backend cannot build upstream `Application-Key` for token check | backend/config | Resolve `clientId` from server-side config or trusted tenant/app registry; frontend still sends only `Access-Token`. |
| Only local token check | backend trusts browser storage or local session only | backend | Protect business APIs with IAMA `token/check` or a documented equivalent policy. |
| Browser-driven client ID accepted | arbitrary frontend `Application-Key`/`clientId` selects credentials | backend/security | Ignore untrusted browser client IDs for token check; resolve credentials from trusted backend config/tenant context. |
| 401 loop | page repeatedly redirects or retries requests | frontend | Single-flight refresh, retry once, clear stale state, stop on repeated failure. |
| Concurrent 401 storm | several failed APIs trigger multiple logins | frontend | Share one refresh promise across in-flight failed requests. |
| 401/403 mixed | no-permission user is forced to re-login | backend/frontend | Backend returns 401 for invalid auth and 403 for permission denial; frontend handles them separately. |
| Refresh/deep-link failure | direct URL or browser refresh loses login | frontend | Route guard re-runs login/bootstrap and restores headers before page data loads. |
| Logout incomplete | revisiting app remains logged in or stale data appears | frontend/backend | Call SDK logout, clear local storage/store/cache, and invalidate local session when applicable. |
| Token cache outlives token | invalid token remains accepted | backend | Cache token validity only with short TTL and never beyond known `expires_in`. |

## Minimum Frontend Contract

- Load SDK once from the approved browser build.
- Initialize `configUserCenter` before `login()`.
- Persist browser-safe auth values only: access token and optional non-authoritative SDK config metadata.
- Add the token header, normally `Access-Token`, in one shared request client or interceptor.
- Clear stored auth on logout and invalid-token recovery.
- Retry a 401 request at most once after a successful refreshed login.
- Never store `clientSecret`, raw authorization codes, or full sensitive account payloads in browser-accessible storage.

## Minimum Backend Contract

- Provide the `tokenUrl` endpoint used by the SDK or frontend auth adapter.
- Exchange `code` with IAMA using server-side `client_id` and `client_secret`.
- Preserve the canonical login response fields while exposing only safe local response data to the frontend.
- Protect all business endpoints by default, with an explicit public or health-check allowlist.
- Read `Access-Token` from protected browser requests.
- Resolve `clientId` from server-side configuration or trusted tenant/app registration before calling IAMA.
- Call IAMA `token/check` with backend-resolved `clientId` as `client_id` and `Application-Key`, plus the request token.
- Return 401/token-invalid for missing, expired, invalid, or unverifiable tokens.
- Return 403 only after token validity is confirmed and business permission fails.

## Closure Checklist

- First unauthenticated access reaches the intended page after SSO.
- Page refresh and deep links preserve or restore SSO state.
- Protected API calls wait for login and include `Access-Token`.
- Backend token-check evidence shows the client ID came from server-side config or trusted tenant/app context.
- Invalid token is rejected by backend and recovered by frontend without infinite loops.
- No-permission state is not treated as expired login.
- Logout clears SDK state, browser storage, frontend store/cache, and local backend session when applicable.
- Test and production values cannot be mixed accidentally through hard-coded config.
