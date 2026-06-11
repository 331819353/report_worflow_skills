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
| Table source map and exact placement files | `references/01-table-reference-map.md` |
| Analytical table visual/content rules | `$report-component-style-design` `references/06-analytical-tables.md` |
| Report chart/table format baseline | `$report-design-system-governance` `references/05-report-charts-tables-format-guidelines.md` |
| Table/composite placement routing | `$report-component-style-design` `references/12f-placement-composite-tables.md` |
| Dense table acceptance | `$report-component-style-design` `references/12-component-acceptance-gates.md` |

## Workflow

1. Identify table type: detail table, grouped header, pivot/S2, metric matrix, composite panel child, or export-oriented list.
2. Load `references/01-table-reference-map.md`, then load only the matching visual and placement references.
3. Define row grain, columns, header hierarchy, metrics, units, precision, sorting, filtering, pagination, fixed header/columns, and export behavior.
4. Reserve visible space for header depth, body rows, scrollbars, pagination, summary, selection, empty/error/no-permission states, and tooltips.
5. Verify table readability at the target viewport and density before marking ready.

## Required Output

- Table type and selected references.
- Row grain, columns, header hierarchy, units/precision, and interaction contract.
- Layout rules for width, height, rows, fixed areas, scroll, pagination, and states.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not hide critical columns through nowrap truncation, unplanned horizontal scroll, or decorative density.
- Do not use pivot/S2 patterns when a detail table answers the task more directly.
- Do not mark a table ready without pagination/large-result behavior and empty/error/no-permission states when data can vary.
