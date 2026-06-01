# Testing And Integration Playbook

Use when the requirement is for 测试, 联调, 验收, 自测, 冒烟测试, SSO测试, 接口测试, 数据一致性, 缺陷报告, or evidence collection.

## Extract

- Test objective: what risk or behavior must be proven.
- Scope: systems, pages, APIs, data services, roles, environments, browsers, source systems.
- Test matrix: scenario, precondition, test data, steps, expected result, evidence, severity if failed.
- API tests: auth, required params, filters, pagination, sorting, error envelope, permission denial, performance baseline.
- UI/API integration tests: request params, response adapter, component rendering, filter linkage, drawer/jump/export context.
- Data consistency tests: KPI totals, chart totals, table rows, detail records, export rows, source totals under same filters.
- SSO/security tests: login, token expiration, 401 re-login, role/org scope, masked fields, audit.
- Defect handling: reproduction steps, actual/expected, affected module, severity, owner, fix verification.

## Required Handoff

Output executable or reviewable test assets:

- Test case matrix.
- Test data and environment assumptions.
- Expected results and acceptance criteria.
- Evidence requirements such as screenshots, logs, exported files, or API responses.
- Defect reporting template and fix verification rule.
