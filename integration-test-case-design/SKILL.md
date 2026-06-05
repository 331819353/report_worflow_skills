---
name: integration-test-case-design
description: "用于在联调/验收前设计集成测试用例和测试矩阵。用户提到测试用例、测试样例、验收用例、联调用例、集成测试设计、SSO用例、接口连通性、页面数据一致性、筛选联动、权限、导出、异常/空态/边界场景、回归标准、根据API文档和前端功能说明设计测试时触发；不执行运行测试。"
---

# Integration Test Case Design

## Overview

Use this skill independently to create 测试样例 from API documentation and frontend function descriptions. It can be used before runtime URLs are available.

## Inputs

- API文档: endpoints, params, response schemas, examples, auth, errors, pagination, sorting, filters, and pending items.
- 前端功能说明: pages, modules, controls, filters, interactions, states, exports, permissions, and known limitations.

Optional inputs: test account, data seed, environment URL, source commit, risk list, previous defects, and acceptance criteria.

## References

- Use `$delivery-artifact-template-management` when the output should be a reusable execution matrix or when blocked cases must be tracked explicitly.

## Workflow

1. Build the feature/API matrix.
   Map each page/module/control to APIs, request params, response fields, filters, interactions, permissions, and expected states.

2. Define test categories.
   Include runtime smoke, SSO/auth, API contract, data consistency, filters, interactions, edge states, permission, export/download, layout/data visibility, and regression cases.

3. Design positive cases.
   Cover default page load, normal filter changes, expected drilldowns, successful exports, valid permissions, and representative data rows.

4. Design negative and edge cases.
   Cover empty data, invalid params, missing token, expired token, no permission, API failure, timeout, missing optional fields, null values, boundary dates, cascade clearing, and no-result filters.

5. Define expected results and evidence.
   Each case must specify precondition, steps, test data/API params, expected UI result, expected API behavior, evidence to capture, and pass/fail criteria.

6. Mark execution readiness.
   Cases that cannot run without URL/account/data/source access should be marked blocked or pending, not silently removed.

## Test Case Format

Use a table with:

- Case ID.
- Category.
- Priority.
- Feature/page.
- Related API.
- Preconditions.
- Steps.
- Test data or params.
- Expected frontend result.
- Expected backend/API result.
- Evidence to capture.
- Status: not run / pass / fail / blocked.
- Notes.

## Required Outputs

When using this skill, produce:

1. Test scope and assumptions: tested pages/modules, APIs, permissions, environment readiness, and missing inputs.
2. Feature/API coverage matrix: page/module/control mapped to API, params, fields, filters, interactions, and states.
3. Test case table using the required format.
4. Minimum case set coverage summary, including any intentionally omitted category and reason.
5. Blocked or pending case list with missing URL, account, data seed, permission, API document, or acceptance rule.
6. Handoff notes for runtime execution, evidence capture, and defect reporting.

## Minimum Case Set

- Runtime URL smoke and environment alignment.
- First access, valid token, invalid token, and no-permission SSO behavior.
- One API/display consistency case per major KPI/chart/table/drawer/export.
- Default filter, single filter, combined filters, reset, cascade, no-result, and permission-limited filter cases.
- Drilldown/drawer/modal/page-jump parameter preservation.
- Loading, empty, error, timeout, null, and partial data states.
- Export/download inherits active filters and permissions.

## Quality Checklist

- Every important frontend feature maps to at least one test case.
- Every documented API used by the frontend has a contract or display-consistency case.
- Filters and interactions include both happy path and edge cases.
- Blocked cases state the missing account, URL, data, permission, or documentation item.
