---
name: haier-iama-backend-sso
description: "Implement backend single sign-on against Haier IAMA unified identity authentication. Use when adding, reviewing, or standardizing backend services that receive frontend JSSDK, Feishu, or account-center authorization codes, exchange codes for account-center tokens and user info, validate Access-Token values, wrap reusable IAMA OAuth clients, or connect IAMA identities to local sessions, JWTs, middleware, filters, interceptors, and tests."
---

# Haier IAMA Backend SSO

## Overview

Use this skill to implement the backend half of Haier IAMA SSO. Treat SSO as enabled by default for backend services that need Haier unified identity; skip it only when the product requirement explicitly says the service does not use SSO.

The default flow is: after the frontend obtains an authorization code, the backend first calls `{baseUrl}/api/oauth/code/get/v2` to obtain token-related information and account info. In later business flows such as page jumps, route transitions, and page refreshes, the backend calls `{baseUrl}/api/oauth/token/check` to verify the user token.

Before coding against the remote API, read [references/iama-sso-api.md](references/iama-sso-api.md) for the exact endpoints, parameters, headers, and response shape extracted from the official IAMA documentation.

## Workflow

1. Inspect the target backend's existing authentication style before adding SSO code.
   Identify the HTTP client, configuration pattern, exception model, logging helpers, user/session model, and middleware or interceptor conventions already used by the service.

2. Add configuration instead of hard-coding IAMA values.
   Use environment-specific config for `iama.baseUrl`, `iama.clientId`, `iama.clientSecret`, connect/read timeouts, and any local session or JWT issuer settings. Keep `clientSecret`, authorization codes, and tokens out of source code, logs, errors, metrics labels, and screenshots.

3. Implement one small IAMA client or gateway.
   Provide two public methods: `exchangeCodeForToken(code)` and `checkToken(accessToken)`. Keep raw HTTP details inside this client, normalize success and failure results, and let controllers or middleware handle local login/session behavior.

4. Start SSO by exchanging the authorization code for token and user info.
   Call `POST {baseUrl}/api/oauth/code/get/v2` with JSON body `client_id`, `client_secret`, and `code`. This is the first backend SSO step after the frontend passes in a code. Treat `resultCode == "0"` as success. Preserve IAMA response fields such as `access_token`, optional token metadata, and `account`; the official overview says returned parameters must not be deleted, though local services may add fields.

5. Validate users in later business flows with token check.
   For page jumps, page changes, route transitions, and every authenticated business request from the frontend, read `Application-Key` and `Access-Token` from the incoming request headers. Treat `Application-Key` as the browser-provided `clientId` and `Access-Token` as the token to validate. Call `GET {baseUrl}/api/oauth/token/check`, normally with `client_id` as a query parameter. Forward request headers `Application-Key: {clientId}` and `Access-Token: {accessToken}` to IAMA. Treat `resultCode == "0"` and `data == true` as valid; any other result is unauthenticated.

6. Bridge IAMA identity to local authentication.
   After a successful code exchange, map the returned account to the service's local user record by stable identifiers such as IAMA account id, `userName`, `account`, `domain`, `tenantId`, or a configured binding table. Then issue the service's existing local session or JWT. Avoid making downstream business endpoints depend directly on raw IAMA response objects.

7. Protect business endpoints and navigation checks with IAMA token validation.
   Use the project's native middleware, filter, interceptor, or guard structure, but make IAMA `token/check` the standard user validation point for SSO-backed route jumps, page transitions, and business API access. Local sessions or JWTs may store derived account context, but they should not silently replace the required IAMA token validity check unless a later product requirement explicitly changes the SSO model.

## Implementation Notes

- Do not automatically retry code exchange after an HTTP response from IAMA; authorization codes may be short-lived or single-use. A retry on connection failure is acceptable only if the project's HTTP policy already supports it and the request definitely did not reach the server.
- Token check is idempotent and can use the service's standard timeout and retry policy for transient network failures, but fail closed when validity cannot be confirmed.
- Normalize remote failures into the service's existing unauthenticated or upstream-auth-failed error types. Do not leak `client_secret`, raw token values, or full upstream account payloads in API error responses.
- Missing `Application-Key` or missing `Access-Token` must fail closed with the service's unauthenticated response.
- When `token/check` returns invalid, return a 401 or the project's normalized auth-expired/token-invalid error so the frontend can clear browser auth state and re-trigger SSO. Use 403 only for valid-token but no-permission cases.
- Do not accept `clientId` and token from ordinary query parameters or body fields for browser business APIs unless the existing project contract explicitly requires it; headers are the default trust boundary for SSO validation.
- Preserve the raw upstream response inside a typed DTO for auditability, but expose a smaller local login response if the existing frontend contract expects one.
- If caching token validity, keep the TTL short and never let a cached `true` outlive the token's known expiry. Do not let cache behavior bypass required jump, page-change, or route-transition user validation.

## Expected Tests

Add focused tests around the wrapper rather than testing IAMA itself:

- Successful code exchange returns token fields and account data.
- Code exchange failure when `resultCode` is not `0` maps to the local auth error.
- Token check returns valid only for `resultCode == "0"` and `data == true`.
- Missing `code`, missing `accessToken`, upstream timeout, and malformed upstream responses fail closed.
- Missing `Application-Key`, missing `Access-Token`, and mismatched/invalid token responses return the local unauthenticated/token-invalid response.
- Controller or middleware tests verify that route jumps, page changes, and authenticated business requests read frontend headers, call the token validation path, and fail closed when IAMA reports invalid.

For live smoke tests, use the official test domain and injected credentials only. Never commit real `client_secret` values or captured access tokens.
