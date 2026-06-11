# Professional Technical Solution Template

Use this template when the user asks for a full 技术方案, 技术架构设计, 技术选型, 实现路径, or production-bound implementation plan.

## 1. 技术方案总览

Open with 3-7 concise paragraphs or bullets:

- business goal and user/process scope;
- proposed architecture direction;
- selected technology stack and major decisions;
- implementation route and release approach;
- readiness verdict and top blockers/risks.

## 2. 输入、范围与约束

| Input ID | Source | Authority | Covered scope | Key facts | Uncertainty/GAP |
| --- | --- | --- | --- | --- | --- |
| IN-001 |  | authoritative / supporting / obsolete / TBD |  |  | none / TBD(GAP-*) |

Also state:

- in scope;
- out of scope;
- assumptions;
- acceptance objectives;
- environment or organization constraints.

## 3. 技术架构设计

### 3.1 架构视图总表

| ARC ID | View | Design decision | Reason | Impacted artifacts | Status |
| --- | --- | --- | --- | --- | --- |
| ARC-001 | business-capability |  |  | API清单 / 数据模型文件 / roadmap | ready / partial / blocked |

### 3.2 System Context

List participating systems and boundaries:

- client/browser;
- frontend app;
- API service;
- data service/domain service;
- database/warehouse/source systems;
- Redis/cache/precompute;
- IAM/auth;
- export/file service;
- scheduler/job worker;
- monitoring/logging, including structured backend log fields, requestId/traceId propagation, redaction, request/auth/validation/query/cache/pool/export/error log points, and slow-query/report thresholds when backend is in scope.

Use a simple text diagram or Mermaid diagram when helpful.

### 3.3 Logical Architecture

| Module | Responsibility | Inputs | Outputs | Dependencies | Notes |
| --- | --- | --- | --- | --- | --- |
| frontend module |  |  |  | API-* |  |
| API controller/family |  |  |  | service/cache |  |
| domain/query service |  |  |  | repository/source adapter |  |
| source adapter |  |  |  | SRC-* |  |

### 3.4 Data Flow

Describe source -> logical model -> response model -> component flow, including permission injection, data-version params, cache/precompute lookup, and invalidation point.

## 4. 技术选型说明 / ADR

| ADR ID | Layer | Selected decision | Type | Reason | Alternatives/tradeoffs | Impact | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ADR-001 | frontend | Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2 | default |  |  | compatibility/test/release | ready / partial / blocked |

Required layers:

- frontend;
- backend/data-service;
- data source/storage;
- cache/precompute;
- auth/security;
- observability;
- deployment/runtime;
- testing/release.

## 5. 数据架构与模型映射

| Model ID | Layer | Business object/process | Grain | Key | Source authority | Data-version | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LGM-001 | logical |  |  |  | SRC-* | snapshotDate/dataVersion/TBD | ready / partial / blocked |

Include field mapping, metric formulas, lineage, transformation/adapter rules, quality rules, source replacement rules, security/masking rules, and unresolved gaps.

## 6. API 与集成设计

| API ID | Family | Purpose | Trigger | Request context | Response model | Source/logical model | Runtime policy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-001 | metadata / filter / query / dashboard / detail / export / action / health |  | initial-load / filter-change / drilldown / export / action / scheduled |  | RSP-* | LGM-*/SRC-* | sync/cache/async/TBD | ready / partial / blocked |

Also define:

- common request context;
- common response envelope;
- error envelope;
- pagination/sorting/filtering conventions;
- service-layer mapping;
- endpoint reuse and custom exceptions;
- data-vs-presentation boundary: structured data/metadata returned by data services, frontend-owned text/conclusion composition, and any server-owned text exceptions;
- API compatibility/versioning/deprecation;
- contract validation scope.

## 7. 运行时、非功能与生产准备

| NFR ID | Area | Decision | Target/limit | Evidence/source | Linked API/model | Status |
| --- | --- | --- | --- | --- | --- | --- |
| NFR-001 | performance |  | latency/concurrency/volume/export rows | IN-* / GAP-* | API-* | ready / partial / blocked |

Cover:

- sync vs async/offline;
- connection pools;
- Redis/cache/precompute;
- cache keys and invalidation;
- rate/concurrency limits;
- timeout/retry/fallback/stale policy;
- observability and alert owner;
- deployment environments;
- config/secrets;
- health checks;
- release and rollback;
- backup/recovery when relevant.

## 8. 权限与安全

| Rule ID | Scope | Decision | Applies to | Evidence/source | Gap/status |
| --- | --- | --- | --- | --- | --- |
| PERM-001 | role / org / row / field / action / export |  | API-*/field/component | IN-* | ready / partial / blocked |

State identity source, role model, organization/data scope, sensitive fields, masking, audit, export/download constraints, and explicit no-sensitive-data decisions.

## 9. 技术实现路径

| ROAD ID | Phase | Goal | Key tasks | Dependencies | Owner | Output | Acceptance evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ROAD-001 | architecture and contract freeze |  |  | IN-*/GAP-* |  | reviewed technical solution | review/readiness record | ready / partial / blocked |

Include dependency order, migration/backfill if needed, release gate, rollback, testing route, and owner actions for backend/frontend/data/QA/ops.

## 10. 缺口台账与风险台账

| GAP ID | Category | Missing decision/fact | Impact | Owner question | Blocks | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GAP-001 | source / metric / permission / runtime / security / deployment |  |  |  | API-*/ADR-*/ROAD-* | open / assumed / blocked / resolved |

| Risk ID | Category | Description | Impact | Probability | Mitigation | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RISK-001 | source / metric / permission / performance / security / deployment / schedule |  | High / Medium / Low | High / Medium / Low |  |  | open / mitigated / accepted / blocked |

## 11. Handoff Verdict

End with:

- overall readiness: `ready`, `partial`, or `blocked`;
- backend/API-documentation handoff;
- frontend-integration handoff;
- testing-integration handoff;
- operations-release handoff;
- exact blockers and next owner actions.
