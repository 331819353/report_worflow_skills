---
name: report-table-design-spec
description: "用于报表/仪表盘/BI中的表格设计规范、明细表、复杂表头、分组表头、透视表、交叉表、AntV S2、指标矩阵、分页、固定列、排序、条件格式、表格可读性和表格布局验收。用户提到表格规范、表格设计、明细表、透视表、复杂表头、分组表头、S2、AntV S2、表格列宽、表格滚动、固定表头、固定列、分页、导出、表格溢出时触发；不负责整页布局或API实现。"
---

# Report Table Design Spec

## Positioning

Use this as the direct front door for analytical table standards. It makes table references reachable without first entering the broad component-style skill.

Use `$report-component-style-design` for mixed components; use this skill when the task is mainly table anatomy, column/header structure, S2/pivot behavior, row density, scrolling, pagination, or table acceptance.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Table source map and exact placement files | `references/01-table-reference-map.md` |
| Analytical table visual/content rules | `$report-component-style-design` `references/06-analytical-tables.md` |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Table/composite placement routing | `$report-component-style-design` `references/12f-placement-composite-tables.md` |
| Dense table acceptance | `$report-component-style-design` `references/12-component-acceptance-gates.md` |

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name table type candidates, row grain, primary key/object identity, column contracts, parent container, hard constraints, missing evidence, and start decision.
2. Identify table type: detail table, grouped header, pivot/S2, metric matrix, composite panel child, or export-oriented list.
3. Load `references/01-table-reference-map.md`, then load only the matching visual and placement references.
4. Define row grain, columns, header hierarchy, metrics, units, precision, sorting, filtering, pagination, fixed header/columns, and export behavior.
5. Reserve visible space for header depth, body rows, scrollbars, pagination, summary, selection, empty/error/no-permission states, and tooltips.
6. Convert table rules into proof obligations when implementation or URL exists: row grain, primary key/object identity, column metadata, grouped-header tree/span proof, S2/project renderer evidence, pagination/search/sort/export scope, body height/row count, overflow behavior, and state coverage.
7. Verify table readability at the target viewport and density before marking ready.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus table type and selected references.
- Row grain, columns, header hierarchy, units/precision, and interaction contract.
- Layout rules for width, height, rows, fixed areas, scroll, pagination, and states.
- Proof obligations: row grain/primary key, column metadata, renderer ownership, grouped-header or pivot contract, pagination/search/sort/export scope, DOM overflow/visible-row checks, and screenshot/crop evidence when code or URL exists.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not hide critical columns through nowrap truncation, unplanned horizontal scroll, or decorative density.
- Do not repair or accept table visuals before row grain, primary key/object identity, column type/width/alignment metadata, and density limits are known.
- Do not use pivot/S2 patterns when a detail table answers the task more directly.
- Do not mark a table ready without pagination/large-result behavior and empty/error/no-permission states when data can vary.
- Row grain, primary key/object identity, column metadata, renderer ownership, grouped-header/pivot contracts, pagination/search/sort/export scope, overflow, and state coverage are `MUST/fail` constraints for implementation-ready tables; recommended density values may vary only with a documented fit proof and fallback.
