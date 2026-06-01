# Inputs And Traceability

Use this reference when deciding what the API document is based on and how endpoint behavior traces to evidence.

## Input Types

- API inventory: endpoint id, module, method/path, purpose, request params, response model, priority, status, and pending notes.
- Requirements: user stories, page needs, reporting metrics, workflow actions, acceptance criteria, permissions, and delivery scope.
- Existing implementation: routes/controllers, schemas/DTOs, serializers, service methods, repositories, tests, and sample responses.
- Interface artifacts: OpenAPI fragments, Postman collections, frontend API clients, mock data, JSON fixtures, integration notes, and previous API docs.
- Model/source artifacts: source models, logical models, response/view models, database tables/views, upstream APIs, field dictionaries, formulas, relationships, refresh cadence, and quality rules.
- Environment and policy artifacts: base URL, deployment environments, auth/SSO rules, common headers, CORS/proxy requirements, error standards, performance constraints, and export limits.

## Authority Rules

- Prefer implemented behavior only when the task is documenting current implementation.
- Prefer API inventory or explicit product/backend contract when the task is designing future APIs.
- Prefer frontend display/mock contracts when the task is integration handoff and no backend contract has been finalized.
- Treat conflicts between artifacts as missing information unless the user or repository clearly marks one artifact authoritative.

## Traceability Rules

- Every endpoint should trace to a module/page/resource/service boundary.
- Every response schema should trace to a response model, DTO, serializer, implementation sample, or explicit designed contract.
- Every response field should trace to a source field, formula, transformation rule, upstream field, route-level constant, or unresolved item.
- Every request filter should trace to a supported query condition, business rule, frontend control, or documented unsupported behavior.
- Every auth/permission rule should trace to a policy, middleware, gateway rule, or pending confirmation item.

## Pending Item Triggers

Record a pending item when any of these are unclear:

- Source table, file, upstream API, or authoritative system.
- Field name, type, nullability, unit, precision, enum dictionary, ID semantics, or date format.
- Formula, denominator, aggregation grain, sorting, Top/Bottom rule, fiscal calendar, or rounding rule.
- Required request param, default filter, pagination limit, export behavior, upload/download shape, or error code.
- Auth header, token validation path, role/permission rule, environment value, CORS/proxy rule, timeout, retry, or cache behavior.
