# Contract Sources And Authority

Use this reference when collecting API contracts and deciding which artifact is authoritative.

## Contract Sources

- API documentation or OpenAPI schemas.
- Frontend clients, hooks, services, adapters, mock data, display code, and integration tests.
- Backend routes, controllers, schemas, DTOs, serializers, services, repositories, and tests.
- JSON fixtures, local fallback files, generated sample payloads, Postman collections, and curl examples.
- Runtime responses from local, staging, production-like, upstream, or database-backed environments.
- Product, security, permission, performance, and delivery requirements.

## Authority Selection

- If validating implemented behavior, compare runtime responses against the published contract and consumer expectations.
- If validating design before implementation, treat the approved API documentation or OpenAPI schema as authoritative.
- If replacing frontend mocks, treat the consumer-facing display contract as a required compatibility input until an adapter decision changes it.
- If integrating upstream services, treat upstream response as source behavior but validate the local API response after transformation.
- If artifacts conflict, record the conflict as missing information unless ownership or repository convention clearly resolves it.

## Scope Statement

Start each validation by naming:

- Endpoint, operation, event, or query in scope.
- Consumer or downstream system.
- Source artifacts compared.
- Runtime/source mode, such as mock, fixture, upstream, database, local service, staging, or production-like.
- Out-of-scope behavior, if any.
