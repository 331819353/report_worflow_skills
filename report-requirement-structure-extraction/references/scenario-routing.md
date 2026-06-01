# Scenario Routing Reference

Use this reference when scenario judgment, phase split, or downstream skill routing is needed.

## Scenario Types

These are routing labels for requirement transformation, not skill names. Use them to decide which reference to load and which downstream skill, if any, to call.

- `prototype-design`: report/dashboard/page prototype, data screen, visual analysis page, interaction demo, screenshot restoration.
- `technical-solution`: architecture, API inventory, data model, table relationship, source mapping, permission strategy, transformation plan.
- `data-modeling`: data model requirement transformation, business object modeling, conceptual/logical/physical model split, table-field mapping, metric grain, model relationship, source-to-service-to-view model design.
- `data-service-backend`: backend service, Flask/API service, interface documentation, database query, auth, pagination, export, upload, cache, error handling.
- `data-visualization-frontend`: frontend page, dashboard, report, API integration, response adapter, filters, component binding, runtime QA.
- `testing-integration`: test case design, frontend-backend integration, data consistency, filter linkage, SSO/auth flow, smoke test, evidence/defect report.
- `data-governance`: data source credibility, lineage, data quality, reconciliation, version,口径, masking, audit, retention.
- `business-workflow`: operational process, task/approval/notification flow, status machine, responsibility, SLA, closure criteria.
- `migration-optimization`: legacy system replacement, refactor, performance optimization, compatibility, phased rollout.

## Classification Rules

- Pick the scenario by the user's intended deliverable, not by isolated keywords.
- If the user wants a visible page or demo, prefer `prototype-design` or `data-visualization-frontend`.
- If the user asks how to build data/API/model artifacts before coding, prefer `technical-solution`.
- If the user asks for 数据模型, 数据建模, 表字段映射, 业务对象建模, 模型文件, 指标粒度, 明细/汇总模型, or source-to-response model transformation, prefer `data-modeling` or add it as a secondary scenario under `technical-solution`.
- If the user asks to implement service endpoints, prefer `data-service-backend`.
- If the user asks to replace mock data, connect APIs, or fix runtime UI/API issues, prefer `data-visualization-frontend`.
- If the user asks how to verify,联调,自测,验收, or find defects, prefer `testing-integration`.
- If source systems,口径, lineage, permissions, or reconciliation dominate, add `data-governance`.
- If task assignment, approval, handling, or closure dominates, add `business-workflow`.
- If the request spans multiple phases, name the immediate phase first and list later phases as dependencies.

## Downstream Skill Routing

Recommend the smallest complete path.

- Use `report-design-workflow` when the user explicitly wants a report/page/dashboard prototype, runnable page, screenshot-to-prototype repair, mock-data-backed demo, deployment, or preview URL.
- Use `report-info-component-mapping`, `report-visual-layout-design`, and `report-component-style-design` for prototype/detail design after the requirement is structured.
- Use report-type skills when the requirement is a business report: `status-overview-report-design`, `analysis-diagnostic-report-design`, `detail-query-report-design`, `performance-evaluation-report-design`, `review-recap-report-design`, `anomaly-monitoring-report-design`, `operational-execution-report-design`, `reconciliation-traceability-report-design`.
- Use `technical-solution-workflow` when the deliverable is API inventory, data model files, data source mapping, or pending model gaps.
- Use `api-inventory-design` for endpoint inventory and request/response contracts.
- Use `data-model-source-mapping` for table/model/source relationships and transformations.
- Use `references/data-model-requirement-playbook.md` before `data-model-source-mapping` when vague business/data needs must first become a clear model requirement.
- Use `missing-model-management` when required source tables, fields,口径, or model metadata are missing.
- Use `backend-development-workflow` when implementing a backend/data service.
- Use `api-documentation-design`, `backend-api-contract-validation`, `backend-data-transformation-design`, and `backend-missing-info-management` for backend subproblems.
- Use `frontend-development-workflow` when integrating a frontend prototype/page with real APIs.
- Use `frontend-api-contract-validation`, `frontend-response-adapter-design`, `frontend-runtime-qa-validation`, and `frontend-env-deployment-verification` for frontend subproblems.
- Use `testing-integration-workflow` when the deliverable is联调,测试设计,验收, defect evidence, or end-to-end validation.
- Use `integration-test-case-design`, `frontend-backend-integration-test-validation`, `frontend-backend-data-consistency-test`, `filter-linkage-completeness-test`, `runtime-url-smoke-test`, `sso-auth-flow-test`, and `test-evidence-defect-reporting` for targeted testing.
