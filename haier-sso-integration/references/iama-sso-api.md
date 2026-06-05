# IAMA SSO API Reference

Source: https://iama.haier.net/doc/webdoc/jssdkhdjc/#2授权码换-token

Use this reference for the backend API contract only. Keep product-specific routes, local session logic, and user mapping in the target service.

Default SSO sequence:

1. Use `/api/oauth/code/get/v2` first to exchange the frontend-provided authorization code for token-related data and account info.
2. Use `/api/oauth/token/check` in later business flows to validate the user token during page jumps, page changes, route transitions, and authenticated requests.

## Domains

- Test: `https://iam-test.haier.net`
- Production: `https://iama.haier.net`

## Authorization Code Exchange

Purpose: exchange an account-center authorization code or Feishu code for an account-center token and user info. This is the first backend SSO call after the frontend passes the authorization code to the backend.

- Method: `POST`
- Path: `/api/oauth/code/get/v2`
- Content type: JSON

Request body:

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `code` | Yes | string | Feishu authorization code or account-center code. |
| `client_id` | Yes | string | Client ID assigned by account center. |
| `client_secret` | Yes | string | Client secret assigned by account center. |

Response shape:

```json
{
  "result": "SUCCESS",
  "resultCode": "0",
  "resultMsg": "success",
  "data": {
    "access_token": "...",
    "expires_in": "...",
    "token_type": "...",
    "refresh_token": "...",
    "account": {}
  }
}
```

Response notes:

| Field | Type | Notes |
| --- | --- | --- |
| `resultCode` | string | `0` means success; other values mean failure. |
| `resultMsg` | string | Result message, usually `success` on success. |
| `access_token` | string | IAMA token. |
| `expires_in` | string | Remaining token lifetime in seconds when present. |
| `token_type` | string | Token type when present. |
| `refresh_token` | string | Refresh token when present. |
| `account` | object | User info returned by account center. |

Implementation rules:

- Send `client_secret` only from server-side code.
- If the backend owns callback handling, validate `state`/nonce and allowed redirect or origin before exchanging the code. If the frontend owns those checks, document that responsibility boundary in the local API contract.
- Preserve upstream response fields; add local fields only outside or alongside the upstream payload.
- Treat missing `data.access_token` on a nominally successful response as an upstream protocol failure.

## Token Validity Check

Purpose: verify whether an IAMA token is valid. Use this endpoint for later business-flow user validation, including page jumps, page changes, route transitions, and authenticated backend requests.

- Method: `GET`
- Path: `/api/oauth/token/check`
- Example: `https://iam-test.haier.net/api/oauth/token/check?client_id={clientId}`

Request headers:

| Header | Required | Type | Notes |
| --- | --- | --- | --- |
| `Application-Key` | Yes | string | Client ID. |
| `Access-Token` | Yes | string | Token to validate. |

Frontend-to-backend contract:

- Authenticated browser requests to the business backend must include `Application-Key: {clientId}` and `Access-Token: {token}`.
- The backend reads those two headers, rejects missing or disallowed `Application-Key` values, then calls IAMA `token/check` with the same values.
- Missing or invalid headers fail closed.
- Invalid token responses should map to 401 or the service's normalized token-invalid response so the frontend can clear browser auth state and re-trigger SSO.
- 403 is reserved for valid token but insufficient business permission.

Query or request parameter:

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `client_id` | No | string | Client ID assigned by account center. The official example sends it as a query parameter. |

Local implementation rule: even if the upstream parameter is technically optional in some environments, pass the same client ID used in `Application-Key` when the project contract requires that header. Do not let browser-provided client IDs select arbitrary server-side credentials; validate them against configuration or tenant registration first.

Response shape:

```json
{
  "result": "SUCCESS",
  "resultCode": "0",
  "resultMsg": "success",
  "data": true
}
```

Response notes:

| Field | Type | Notes |
| --- | --- | --- |
| `result` | string | Usually `SUCCESS` on success. |
| `resultCode` | string | `0` means the request succeeded; other values mean failure. |
| `resultMsg` | string | Result message, usually `success` on success. |
| `data` | boolean | `true` means valid; `false` means invalid. |

Validity rule:

```text
valid = resultCode == "0" && data == true
```
