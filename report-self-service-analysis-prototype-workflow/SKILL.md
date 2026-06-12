---
name: report-self-service-analysis-prototype-workflow
description: "运行自助分析类报表原型 workflow。用户提到自助分析、分析工作台、BI 自助分析、拖拽维度指标、自由组合筛选、透视分析、保存个人报表、分享分析、图表切换、探索还有什么问题时触发；不负责通用报表原型 workflow、指标看板、分析报告、明细报表、API 文档或后端实现。"
---

# Self-Service Analysis Prototype Workflow

## Positioning

Use this workflow when the prototype is an analysis workbench rather than a fixed report. It is one of the five peer prototype workflows.

Core intent:

```text
自助分析让用户自己探索“还有什么问题”。
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
| Chart standards | `$report-chart-design-spec` |
| Table/pivot standards | `$report-table-design-spec` |
| Filter standards | `$report-filter-control-design-spec` |
| Component placement | `$report-component-placement-spec` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Run `$quality-gate-validation` `references/preflight-understanding-gate.md` before design, repair, template edits, or code. Name affected surfaces, owning skills, hard constraints, missing evidence, and start decision.
2. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
3. Define `dataScope -> analysisModel -> operationModel -> outputResult`.
4. List available datasets, dimensions, metrics, time fields, filter fields, and custom fields.
5. Define field metadata: field type, groupability, filterability, calculability, permissions, masking, allowed combinations, and performance limits.
6. Design the workbench structure: dataset/report title/save/share/export, field panel, row/column/metric/filter configuration, chart/style configuration, result area, drilldown/detail drawer.
7. Define user operations: drag/drop or equivalent selection, filter, sort, Top N, null handling, chart switching, pivot/table view, drilldown, save, duplicate, share, scheduled delivery, export, add-to-dashboard.
8. Use `$report-type-design` with exploratory-analysis intent; keep detail-query only as a drilldown or output block.
9. Use `$report-info-component-mapping` for field panel, config zones, result widgets, dataset contracts, invalid-combination states, and binding matrix.
10. Route chart, table/pivot, filter, and component-internal placement surfaces to `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec`, and `$report-component-placement-spec` before implementation-ready decisions.
11. Run the anti-laziness execution gate from `$quality-gate-validation` before implementation-ready, repair, QA, or handoff conclusions. Keep `LAZY-*` findings visible until evidence closes them.
12. Use layout/template/component skills to implement the workbench without hiding the analysis model behind decorative charts.
13. Verify data completeness, permission states, empty/error/timeout/invalid-combination states, and runnable URL when requested.

## Required Output

- Workflow mode, Preflight understanding matrix, target analysts, business scenarios, datasets, and exploration questions.
- Affected-surface to owning-skill routing, especially field-panel layout, chart, table/pivot, filter, component placement, design-system, template, and runtime QA.
- Data scope, analysis model, operation model, and output/result reuse model.
- Field catalog: dimensions, metrics, time fields, statuses, custom fields, and each field's allowed operations.
- Workbench layout: field panel, configuration area, chart/table/pivot result area, detail drawer, save/share/export controls.
- Filter, grouping, sorting, chart switching, drilldown, save/share/export, permission, masking, and performance rules.
- Component/data/filter/control/interaction binding matrix.
- Anti-laziness execution result: evidence inspected, `LAZY-*` findings or explicit no-finding result, before/after proof for repairs, regression probe, and readiness impact.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design a BI-looking page unless the data model can support the promised field combinations.
- Do not start implementation or repair from this workflow alone when chart/table/filter/placement surfaces require their specific front-door skills.
- Do not mark ready without a Preflight understanding start decision and evidence that required specialty skills were loaded or explicitly not needed.
- Do not hide field metadata, invalid combinations, permissions, or performance limits.
- Do not treat save/share/export as optional polish; they decide whether self-service analysis can be reused.
- Do not overload ordinary users with expert controls without templates, presets, or guided defaults.
- Do not claim runnable readiness until non-default field/filter/chart changes visibly alter the result.
- Do not mark ready when the anti-laziness gate is missing, `LAZY-*` findings remain open, or only default field/filter/chart states were checked.
