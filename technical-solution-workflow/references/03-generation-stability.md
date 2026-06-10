# Generation Stability

Use this reference to make the output deterministic enough for weaker models.

## Stable Names

Use these artifact names exactly:

- `技术方案总览`
- `技术架构设计`
- `技术选型说明`
- `ADR决策记录`
- `技术实现路径`
- `非功能与生产准备`
- `API清单`
- `数据模型文件`
- `待补充数据模型清单`
- `缺口台账`
- `风险台账`

Use these ID prefixes:

- Inputs: `IN-001`
- Architecture views/decisions: `ARC-001`
- Architecture decision records: `ADR-001`
- Non-functional requirements: `NFR-001`
- APIs: `API-001`
- Source models: `SRC-001`
- Logical models: `LGM-001`
- Response models: `RSP-001`
- Metrics: `MET-001`
- Permission rules: `PERM-001`
- Data quality rules: `DQ-001`
- Gaps: `GAP-001`
- Risks: `RISK-001`
- Roadmap phases: `ROAD-001`
- Test/acceptance checks: `CHK-001`

If the project already has stable IDs, keep them and only add missing IDs.

## Controlled Values

Architecture view:

- `business-capability`
- `system-context`
- `logical-architecture`
- `data-flow`
- `api-integration`
- `runtime-deployment`
- `security-permission`
- `operations-observability`
- `implementation-roadmap`

Technology decision layer:

- `frontend`
- `backend-data-service`
- `data-source-storage`
- `cache-precompute`
- `auth-security`
- `observability`
- `deployment-runtime`
- `testing-release`

Decision type:

- `default`
- `override`
- `project-existing`
- `TBD`

API trigger:

- `initial-load`
- `filter-change`
- `drilldown`
- `export`
- `action`
- `scheduled`

API priority:

- `P0`: required for first usable version.
- `P1`: important but not first-screen blocking.
- `P2`: enhancement, secondary drilldown, or non-core export.

API/artifact status:

- `ready`
- `partial`
- `blocked`

Pending item status:

- `open`
- `assumed`
- `blocked`
- `resolved`
- `obsolete`

Risk status:

- `open`
- `mitigated`
- `accepted`
- `blocked`

Gap severity:

- `Blocker`
- `High`
- `Medium`
- `Low`

Risk probability:

- `High`
- `Medium`
- `Low`

Readiness consumer:

- `backend-api-documentation`
- `backend-implementation`
- `frontend-integration`
- `testing-integration`
- `operations-release`
- `business-acceptance`

## No-Invention Rule

When source information is unknown, write `TBD` and create a gap item. Do not invent:

- Physical table/view/API names.
- Owner names.
- Existing architecture.
- Deployment topology.
- Runtime environment.
- Security/IAM mechanism.
- Metric formulas.
- Enum dictionaries.
- Join keys.
- Refresh cadence.
- Permission rules.
- Capacity numbers.
- SLA targets.
- Cache TTLs.
- Redis key dimensions.
- Rollback strategy.
- Monitoring owners.
- Sample values that pretend to be real source data.

## Fallback Rule

If work can continue safely:

1. Mark the item `assumed`.
2. Write the exact assumption in one sentence.
3. Reuse that sentence in every affected artifact.
4. Link the same `GAP-*` ID.

If work cannot continue safely:

1. Mark the item `blocked`.
2. Explain the downstream blocker.
3. Ask one concrete owner question.

## Output Discipline

- Use tables for inventories, model fields, APIs, and gaps.
- Use short architecture-view tables before API/model tables for production-bound technical solutions.
- Keep `ARC-*`, `ADR-*`, `API-*`, `LGM-*`, `RSP-*`, `MET-*`, `PERM-*`, `DQ-*`, `NFR-*`, `GAP-*`, `RISK-*`, and `ROAD-*` IDs stable across the whole answer.
- Keep one row per model/API/gap. Do not merge unrelated issues into one row.
- Keep status and severity in dedicated columns, not buried in notes.
- Put assumptions next to the affected row.
- Do not leave required table cells blank. Use `none` when intentionally not applicable, or `TBD(GAP-*)` when unknown.
- End with a short handoff verdict: `ready`, `partial`, or `blocked`, plus next-stage owner actions.

## Section Discipline

Use this default order for a full technical solution:

1. `技术方案总览`
2. `输入与范围`
3. `技术架构设计`
4. `技术选型说明 / ADR决策记录`
5. `数据架构与模型映射`
6. `API与集成设计`
7. `运行时、非功能与生产准备`
8. `权限与安全`
9. `技术实现路径`
10. `API清单`
11. `数据模型文件`
12. `缺口台账与风险台账`
13. `版本与交付门禁`
14. `Handoff verdict`

If the user asks for a lightweight solution, keep the same order but compress each section. Do not remove architecture, technology selection, implementation path, or readiness entirely unless explicitly out of scope.
