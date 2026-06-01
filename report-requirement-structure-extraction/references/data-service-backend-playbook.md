# Data Service And Backend Playbook

Use when the requirement is for 数据服务, 后端, API服务, Flask, 接口开发, 接口文档, 数据接口, query service, export service, or backend integration.

## Extract

- Service purpose and consumers.
- Endpoint contracts: path, method, headers, auth, request params/body, response schema, error codes, examples.
- Query behavior: filters, search, pagination, sorting, aggregation, drill parameters, date ranges, permission scope.
- Data access: tables/views/files/APIs, joins, transformations, cache/precompute, transaction boundaries, consistency requirements.
- Validation: required fields, enum rules, range rules, business constraints, duplicate handling, idempotency.
- Auth and SSO: login/session/token source, 401 handling, user context, tenant/org scope, role/operation permission.
- Data output: JSON envelope, list/detail/export format, file naming, units, precision, timezone, null/default mapping.
- Operations: logs, metrics, tracing, rate limits, retry, error classification, config/env variables.
- Tests: contract tests, service tests, permission tests, edge cases, sample data, smoke URL.

## Required Handoff

Output direct backend implementation inputs:

- Endpoint list with request and response contracts.
- Data source and query plan per endpoint.
- Transformation and validation rules.
- Auth/permission behavior.
- Error envelope and status code rules.
- Test cases and smoke checks.
