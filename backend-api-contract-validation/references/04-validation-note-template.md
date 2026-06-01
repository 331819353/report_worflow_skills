# Validation Note Template

Use this template for API contract validation output.

## Compact Template

- Endpoint or operation:
- Consumer/downstream:
- Compared artifacts:
- Runtime/source mode:
- Evidence:
- Request command/tool:
- Environment and timestamp:
- Sample response or artifact path:
- Test command/result:
- Contract status: pass / partial / fail / not tested
- Response field differences:
- Request/filter differences:
- Transformation sample results:
- Empty/error/auth results:
- Performance limits:
- Remaining missing information:

## Status Meaning

- `pass`: contract is consistent across the compared artifacts and tested/runtime evidence.
- `partial`: contract is usable but has documented assumptions, untested branches, unavailable sources, or limited evidence.
- `fail`: contract mismatch blocks reliable use or would break a consumer.
- `not tested`: endpoint or branch was in scope but no meaningful evidence could be collected.

## Evidence Rules

- Include a curl command, test command, browser/network capture, fixture path, log path, or response excerpt when a status relies on observed behavior.
- Redact secrets, tokens, credentials, cookies, and personally identifiable values.
- If evidence cannot be collected, use `not tested` or `partial` and record the blocker through `$backend-missing-info-management`.

## Failure Handling

- Fix mismatches immediately when they are local and low risk.
- Record unresolved conflicts through `$backend-missing-info-management`.
- Link transformation mismatches to `$backend-data-transformation-design`.
- Name the exact artifact that must change when the conflict is between documentation, frontend, backend, upstream, or tests.
