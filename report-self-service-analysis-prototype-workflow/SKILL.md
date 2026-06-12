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
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
2. Define `dataScope -> analysisModel -> operationModel -> outputResult`.
3. List available datasets, dimensions, metrics, time fields, filter fields, and custom fields.
4. Define field metadata: field type, groupability, filterability, calculability, permissions, masking, allowed combinations, and performance limits.
5. Design the workbench structure: dataset/report title/save/share/export, field panel, row/column/metric/filter configuration, chart/style configuration, result area, drilldown/detail drawer.
6. Define user operations: drag/drop or equivalent selection, filter, sort, Top N, null handling, chart switching, pivot/table view, drilldown, save, duplicate, share, scheduled delivery, export, add-to-dashboard.
7. Use `$report-type-design` with exploratory-analysis intent; keep detail-query only as a drilldown or output block.
8. Use `$report-info-component-mapping` for field panel, config zones, result widgets, dataset contracts, invalid-combination states, and binding matrix.
9. Use layout/template/component skills to implement the workbench without hiding the analysis model behind decorative charts.
10. Verify data completeness, permission states, empty/error/timeout/invalid-combination states, and runnable URL when requested.

## Required Output

- Workflow mode, target analysts, business scenarios, datasets, and exploration questions.
- Data scope, analysis model, operation model, and output/result reuse model.
- Field catalog: dimensions, metrics, time fields, statuses, custom fields, and each field's allowed operations.
- Workbench layout: field panel, configuration area, chart/table/pivot result area, detail drawer, save/share/export controls.
- Filter, grouping, sorting, chart switching, drilldown, save/share/export, permission, masking, and performance rules.
- Component/data/filter/control/interaction binding matrix.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not design a BI-looking page unless the data model can support the promised field combinations.
- Do not hide field metadata, invalid combinations, permissions, or performance limits.
- Do not treat save/share/export as optional polish; they decide whether self-service analysis can be reused.
- Do not overload ordinary users with expert controls without templates, presets, or guided defaults.
- Do not claim runnable readiness until non-default field/filter/chart changes visibly alter the result.
