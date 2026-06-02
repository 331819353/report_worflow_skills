# Runtime Source Validation

Use this reference when comparing actual responses across mock, fixture, upstream, database, and runtime modes.

## Source Modes

- Mock/display mode: frontend or prototype shape used as a consumer contract.
- Fixture mode: stable JSON examples used for tests, local fallback, documentation, or regression checks.
- Upstream mode: remote service response before local normalization.
- Database mode: repository/query response from the authoritative data store.
- Runtime mode: actual local/staging/prod-like API response after controllers, services, schemas, auth, and middleware.
- Production-bound runtime mode: runtime response with intended environment/base URL, health/readiness evidence, version alignment, auth behavior, source mode, and observable request/log evidence for the stated scope.

## Comparison Rules

- Compare consumer-visible API response after all transformations, not only raw source rows.
- Compare representative requests for common, empty, invalid, unauthorized, and no-permission paths.
- Check that fixture examples remain consistent with the documented contract when fixtures are used.
- If the database is the confirmed authoritative source, validate database-backed runtime responses as the default mode.
- If a service is intentionally file-backed or fixture-backed, document that source decision and its delivery boundary.
- Record allowed differences, such as extra internal fields removed by adapters or environment-specific timestamps.
- Save or cite evidence for each runtime comparison: request command, environment, timestamp, response artifact, log excerpt, or test result.
- For production-bound validation, record health/readiness, version/API-doc alignment, source mode, auth/env behavior, observability/log evidence, and performance/export constraints or mark the result partial.

## Mock Replacement Checks

When replacing mock data with real APIs:

- Validate the original mock/display contract.
- Preserve required consumer fields or document an adapter decision.
- Generate or update canonical fixtures only as testing/documentation support.
- Confirm the production/default runtime source is the intended upstream/database/service source.
- Treat fixture-only completion as partial unless the user explicitly requested a file-backed service.
