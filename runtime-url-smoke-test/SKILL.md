---
name: runtime-url-smoke-test
description: "Validate already running frontend and backend URLs before deeper report testing. Use for runtime URL smoke tests, 前端URL, 后端URL, 运行地址, 冒烟测试, environment/version alignment, backend health, API base URL, proxy/CORS, static assets, console errors, network failures, and deciding whether SSO/data/filter testing can proceed."
---

# Runtime URL Smoke Test

## Overview

Use this skill at the start of the testing phase. It answers whether the provided running frontend URL and backend URL are reachable, aligned, and stable enough for deeper SSO, data consistency, and filter tests.

## References

- Read `references/01-url-smoke-matrix-template.md` when the task needs a reusable matrix/template or standardized evidence structure.

## Required Inputs

- Running frontend URL.
- Running backend base URL, gateway URL, or representative API endpoint.

Optional inputs: environment name, expected version/build, API documentation, test account, known proxy/base path rules, source/Git diagnostics links.

## Workflow

1. Normalize runtime targets.
   Record the frontend URL, backend URL, protocol, host, port, base path, environment, and expected version if known.

2. Check reachability.
   Open the frontend URL and call the backend health endpoint or representative API. Record HTTP status, redirect behavior, response time, and whether a login redirect is expected.

3. Check frontend runtime basics.
   Confirm the page loads its main assets, router, CSS, JavaScript bundles, favicon/logo, and visible shell without blocking console errors.

4. Check backend runtime basics.
   Confirm the backend responds with the expected content type, error envelope, auth requirement, and no unexpected 5xx, gateway, CORS, or timeout failure.

5. Check frontend-to-backend wiring.
   Inspect browser network requests and verify API base URL, proxy path, path prefix, HTTPS policy, credentials mode, and CORS behavior match the environment.

6. Check version alignment.
   If version metadata is available, verify frontend build, backend build, API document, and optional source/Git commit refer to the same delivery under test.

7. Decide test readiness.
   Continue only when the runtime pair is reachable and stable. If not, stop deeper testing and report the environment blocker with evidence.

## Required Output

- Frontend URL:
- Backend URL:
- Environment/version:
- Frontend load status:
- Backend health/API status:
- Console/network status:
- Proxy/CORS/base URL status:
- Readiness result: pass / fail / blocked
- Blockers:

## Pass Criteria

- Frontend URL opens in a browser and renders the expected shell.
- Backend URL or representative API is reachable and returns expected auth or data behavior.
- Browser network requests point to the intended backend environment.
- No blocking console, asset, CORS, proxy, gateway, or timeout errors prevent deeper testing.
