# Technical Solution Playbook

Use when the requirement is for 技术方案, 技术架构, API清单, 数据建模, 数据模型, 表关系, 数据源映射, 权限方案, or development handoff.

## Extract

- 系统边界: frontend, backend, data service, database, source systems, external systems, scheduled jobs, file services.
- API inventory: endpoint group, method/path, business purpose, request params, body schema, response model, pagination, sorting, filtering, error envelope.
- 数据表与模型: source tables, logical models, response/view models, primary keys, foreign keys, grain, partitions, indexes, enums, status fields.
- 表关系: one-to-one, one-to-many, many-to-many, hierarchy, bridge table, snapshot/history, slowly changing dimension, aggregation dependency.
- 数据源: source system, table/file/API, owner, refresh cadence, latency, quality rules,口径/version, access method.
- 数据格式转化: raw field -> normalized field -> API field -> frontend field, type conversion, unit conversion, enum mapping, date/time handling, precision, null/default rules.
- 权限设计: identity source, role, organization scope, row-level data permission, field masking, operation permission, audit log, export/download constraints.
- 非功能需求: performance, cache, rate limit, concurrency, timeout, retry, idempotency, observability, deployment, rollback.
- 风险与缺口: missing source table, unclear口径, privacy concern, performance bottleneck, cross-system dependency.

## Required Handoff

The transformed requirement must be specific enough to produce:

- API inventory or API documentation.
- Data model files and source mapping.
- Table relationship and transformation notes.
- Permission and security strategy.
- Pending model/source/field/口径 gaps.
- Implementation sequence and acceptance checks.
