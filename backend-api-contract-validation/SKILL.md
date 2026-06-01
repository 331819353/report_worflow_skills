---
name: backend-api-contract-validation
description: "Validate backend/API contracts across documentation, frontend clients, mock/display expectations, JSON fixtures, implemented routes, upstream services, database-backed responses, OpenAPI schemas, and runtime samples. Use for generic API contract validation, frontend/backend integration, mock replacement, implementation handoff, regression checks, response fields, nesting, types, units, precision, empty-state shape, pagination, sorting, filtering, error/auth contracts, transformation samples, and performance limits."
---

# Backend API Contract Validation

## Overview

Use this skill independently to prevent APIs from being technically valid but unusable by downstream consumers. A contract includes route shape, request semantics, response schema, examples, empty states, errors, auth, pagination, sorting, filters, transformations, and performance boundaries.

Typical inputs are API documentation, frontend clients, mock/display contracts, JSON fixtures, OpenAPI schemas, implemented routes, upstream samples, database-backed responses, runtime responses, and transformation rules. The output is a pass/partial/fail contract validation note.

## Core Workflow

1. Collect contracts to compare.
   Identify all available contracts and choose or record the authoritative source.

2. Compare response shape field by field.
   Check fields, nesting, types, units, precision, enums, date/period formats, ordering, nullability, and empty-state shape.

3. Validate request behavior.
   Check query/path/body params, filters, defaults, pagination, sorting, search, date ranges, permission scope, and invalid-param errors.

4. Validate transformation samples.
   For source-to-response rules from `$backend-data-transformation-design`, confirm representative sample inputs produce expected response values.

5. Validate runtime/source alignment.
   Compare documented contracts, local fixtures, implemented responses, upstream responses, and database-backed responses according to the project source strategy.

6. Validate errors and auth.
   Check error envelope, HTTP status, business code, message, auth failure, token-invalid behavior, no-permission behavior, and upstream/data-source failure behavior.

7. Validate performance and scale.
   Check default page size, maximum page size, export limit, timeout behavior, cache/precompute strategy, retry behavior, and large result handling.

## References

- Read [references/01-contract-sources-and-authority.md](references/01-contract-sources-and-authority.md) when gathering artifacts, resolving conflicts, or deciding authoritative behavior.
- Read [references/02-response-and-request-validation.md](references/02-response-and-request-validation.md) for field-level, request, filter, error, auth, and performance checks.
- Read [references/03-runtime-source-validation.md](references/03-runtime-source-validation.md) when comparing mocks, fixtures, upstream services, database responses, and live runtime responses.
- Read [references/04-validation-note-template.md](references/04-validation-note-template.md) when producing the validation note.

## Required Output

Produce a compact validation note in the API document, PR, issue, test report, or task response. Include evidence when a status depends on runtime behavior: environment, URL or operation, request command/tool, sample response location or excerpt, timestamp, and test command/result.

## Verification Checklist

- Every endpoint or operation in scope has a status: pass, partial, fail, or not tested.
- No consumer-required field is missing or renamed without a documented adapter/contract decision.
- Empty, no-data, invalid-param, unauthenticated, token-invalid, no-permission, and upstream-failure responses match the expected handling.
- Pagination, sorting, filters, exports, and defaults use documented names and behavior.
- Runtime/source comparisons are performed when sample or live responses are available.
- Runtime pass/partial/fail statuses include enough evidence to reproduce or review the result.
- Contract failures are fixed or captured in missing-information documentation, using `$backend-missing-info-management` when available.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
