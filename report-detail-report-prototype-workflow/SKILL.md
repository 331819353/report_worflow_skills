---
name: report-detail-report-prototype-workflow
description: "运行明细报表类报表原型 workflow。用户提到明细报表、台账、流水、记录查询、订单/客户/库存/发票/回款/售后明细、筛选、排序、分页、导出、核对、追溯具体是哪一条时触发；不负责通用报表原型 workflow、自助分析、指标看板、分析报告、API 文档或后端实现。"
---

# Detail Report Prototype Workflow

## Positioning

Use this workflow when the prototype should query, verify, export, or trace exact business records. It is one of the five peer prototype workflows.

Core intent:

```text
明细报表用于核对“具体是哪一条”。
```

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Table standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
3. Define row grain, primary key, business record identity, source system, freshness, and trace target.
4. Design filters: high-frequency filters outside, low-frequency filters under "more filters"; declare default values, reset behavior, query limits, and saved filter needs.
5. Design table fields by order: identity -> time -> subject -> amount/quantity -> status -> owner -> operation.
6. Define table behavior: default sort, optional sort fields, pagination, page size, fixed header, frozen key columns, column resize, column configuration, return-state preservation.
7. Define export: current page/current filter/all matched, current columns/full fields, row limits, async export, watermark, audit log, approval, masking, and export failure state.
8. Define traceability: detail drawer, source-document jump, operation log, customer/order/product/invoice/payment links.
9. Use `$report-type-design` with `detail-query` as primary; add `reconciliation-traceability` only when matching differences or audit evidence is central.
10. Use `$report-info-component-mapping` to bind row fields, filters, sorting, pagination, export, detail drawer, source links, permissions, and states.
11. Route table, filter, and component-internal placement surfaces to `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
12. Verify query/filter linkage, row identity, export scope, permissions/masking, timeout/over-limit states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, users, query scenario, row grain, primary key, source system, freshness, and trace target.
- Affected-surface to owning-skill routing, especially table, filter, component placement, layout, design-system, template, and runtime QA.
- Filter plan: high-frequency filters, more filters, defaults, reset, saved schemes, query constraints.
- Table field plan: visible columns, hidden/optional columns, field source, format, width/alignment, status tags, sensitive handling.
- Table interaction plan: sorting, pagination, fixed/frozen behavior, column settings, detail drawer, source jumps, return-state preservation.
- Export plan: scope, fields, limits, async behavior, watermark, audit, approval, masking, failure state.
- Component/data/filter/control/interaction binding matrix.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design only a field list; query efficiency and traceability are part of the prototype.
- Do not start implementation or repair from this workflow alone when table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not put every available field into the first visible table.
- Do not miss export scope, row limit, permission, masking, or audit rules.
- Do not claim readiness without row grain, primary key, default sort, pagination, and exact filter binding.
- Do not ignore empty, timeout, no-permission, over-limit, and export-failure states.
