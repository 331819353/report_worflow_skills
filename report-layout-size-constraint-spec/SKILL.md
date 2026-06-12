---
name: report-layout-size-constraint-spec
description: "用于报表页面区块尺寸、容器尺寸、高度预算、首屏层级、8*N网格、图表/表格容器高度、固定高度卡片、裁切、溢出、重叠和响应式尺寸约束设计/评审。用户提到区块尺寸、容器尺寸、卡片高度、首屏放不下、图表太挤、表格太矮、1920x1080、1280x768、高度预算、scrollHeight/clientHeight、overflow、裁切、重叠、响应式布局时触发；不负责组件内部图表细节。"
---

# Report Layout Size Constraint Spec

## Positioning

Use this as the direct front door for page/block sizing and viewport fit. It promotes the layout sizing reference that was previously nested under `$report-visual-layout-design`.

Use `$report-visual-layout-design` for full page layout decisions; use this skill for block size budgets, fixed-height risk, parent/child container fit, and responsive overflow checks.

## Reference Map

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Size source map | `references/01-size-reference-map.md` |
| Parent layout references | `$report-visual-layout-design` references: `block-size-constraints.md`, `grid-containers.md`, `block-composition.md`, `layout-acceptance-gates.md` |

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name affected blocks, child component families, viewport targets, hard constraints, missing evidence, and start decision.
2. Identify viewport targets, grid system, parent blocks, child components, fixed-height surfaces, and density.
3. Calculate usable width/height for the block before deciding chart/table/KPI composition.
4. Check row count, header/filter/toolbar/legend/footer/state masks, gaps, padding, line-height, and scroll areas.
5. Decide whether to enlarge, split, move to drawer/fullscreen, paginate, scroll, or reduce component density.
6. Require DOM overflow checks when code or URL exists.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus target viewport and block/container size budget.
- Fit decision for each dense block: fit, enlarge, split, scroll, drawer/fullscreen, or blocked.
- Overflow/cropping risks and required DOM/runtime checks.
- Handoff to component/table/chart skills when internal fit rules are needed.

## Quality Gate

- Do not approve a block only because it looks acceptable at one viewport.
- Do not approve or edit a layout before identifying affected child component families and their owning chart/table/filter/placement skills.
- Fixed-height KPI/card/navigation/table areas need explicit padding, line-height, gap, and overflow checks.
- Dense charts and tables need enough reserved area for labels, axes, legends, pagination, and states.
