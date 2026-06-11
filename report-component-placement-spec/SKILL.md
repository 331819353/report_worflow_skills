---
name: report-component-placement-spec
description: "用于报表组件内部位置排布、坐标、slot矩形、对齐、局部筛选位置、图表/表格/KPI内部元素布局和实现级组件排布规范。用户提到组件内部排布、组件坐标、位置规则、对齐规则、slot、x/y、宽高、局部筛选位置、标题/图例/指标条/绘图区/表格区域排布、实现级组件规范、组件内元素重叠或裁切时触发；不负责整页区块布局。"
---

# Report Component Placement Spec

## Positioning

Use this as the direct front door for implementation-ready component-internal placement. It turns the former deep placement references into a predictable trigger surface.

Use `$report-layout-size-constraint-spec` for parent block size; use this skill for slots inside one component after the parent container is known.

## Reference Map

| Need | Read |
| --- | --- |
| Placement source map | `references/01-placement-reference-map.md` |
| Placement routing index | `$report-component-style-design` `references/12-internal-placement-algorithms.md` |
| Coordinate variables and local-filter geometry | `$report-component-style-design` `references/12a-placement-foundation-controls.md` |
| Component acceptance gates | `$report-component-style-design` `references/12-component-acceptance-gates.md` |

## Workflow

1. Confirm parent container width/height, padding, component family, data density, local controls, and state set.
2. Load `references/01-placement-reference-map.md`, then load only the exact placement file for that component family.
3. Define container variables, slot rectangles, title/filter/legend/metric/plot/table/body/footer coordinates, alignment, responsive degradation, and state geometry.
4. Pair placement with the visual/content skill for the component family, such as `$report-chart-design-spec`, `$report-table-design-spec`, or `$report-filter-control-design-spec`.
5. Run acceptance gates before marking implementation-ready placement as ready.

## Required Output

- Component family, parent container, and selected placement reference.
- Slot and coordinate rules with size tiers and fallback order.
- Local-filter/control placement when present.
- State geometry for loading, empty, error, no-permission, stale, and dense data.
- Readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- Do not output implementation-ready component specs without measurable slot geometry.
- Do not place local controls where they collide with title, legend, unit, metric strip, or action areas.
- Do not accept geometry that only fits the happy path and fails state masks, long labels, or dense data.
