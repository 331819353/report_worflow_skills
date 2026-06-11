---
name: report-visual-layout-design
description: "用于报表页面视觉布局设计、页面规范、页面设计规范、页面壳设计、布局评审和布局修复。用户提到提高前端设计、前端设计提升、页面布局、页面壳、顶部栏、左侧导航、页面级筛选区、工具栏、8*N网格、区块排布、首屏层级、响应式、Haier品牌位置、图表/表格容器尺寸、hover动效裁切、空态/加载/错误态位置、元素重叠、溢出、布局不好看时触发；不负责组件细节样式、模板工程复制或业务报表类型选择。"
---

# Report Visual Layout Design

## Positioning

Use this skill for report page-level layout: shell, navigation, header/filter/control surface, toolbar, brand placement, `8 * N` grid, parent-block sizing, internal sub-block composition, first-viewport hierarchy, responsive behavior, and layout defect repair.

It owns page规范. Component internals go to `$report-component-style-design`; reusable component standards go to `$report-component-design-spec`; full design-system governance goes to `$report-design-system-governance`; runnable templates go to `$report-prototype-template-management`.

For common enterprise app shells/forms/dialogs, load `$haier-enterprise-app-ui-design-spec`. For report/dashboard/BI/data-screen layouts, load `$report-design-system-governance` report guideline references before final layout decisions.

## Reference Loading

| Need | Read |
| --- | --- |
| Page shell and layout mode | `references/page-layout-modes.md` |
| Brand and Haier placement | `references/brand-style.md` |
| `8 * N` grid and parent containers | `references/grid-containers.md` |
| Block sizing and viewport constraints | `references/block-size-constraints.md` |
| Parent block and internal sub-block composition | `references/block-composition.md` |
| Toolbar, drawer, modal, responsive interactions | `references/components-interactions.md` |
| Output checklist | `references/output-checklist.md` |
| Detailed layout acceptance gates | `references/layout-acceptance-gates.md` |
| Report layout baseline and decision gates | `$report-design-system-governance` relevant guideline references |
| Template layout tokens | `$report-prototype-template-management` `references/template-layout-design-system.md` when template-based |

## Workflow

1. Identify page purpose, user, primary report question, density, display scenario, first action, and target viewport.
2. Classify the baseline: report/dashboard, common enterprise app, template-based page, custom page, or mixed.
3. Run anti-AI and report-decision layout checks when the page is a report surface.
4. Choose shell structure: topbar, left-nav, unified header/control area, fixed cockpit, existing shell, or custom shell.
5. Place navigation, page/global filters, toolbar actions, brand/logo, refresh/export/fullscreen/status controls, and template-native filter entry when applicable.
6. Plan the first meaningful viewport and downstream reading path.
7. Lay out top-level parent blocks in legal `8 * N` spans, then decide whether each block contains one component or composed internal sub-blocks.
8. Size blocks and sub-blocks from content needs: KPI, summary, chart, table, complex diagram, task list, evidence panel, drawer/detail, or action area.
9. Define layout states and responsive fallback for parent blocks and sub-blocks.
10. Use `layout-acceptance-gates.md` before accepting implementation-ready layout or repairing overlap/cropping defects.

## Required Output

- Surface classification, baseline references, and shell choice.
- First-viewport hierarchy and reading path.
- Header/navigation/filter/toolbar/brand structure.
- `8 * N` parent-block grid and internal sub-block plan.
- Block sizing rationale, state plan, responsive plan, and downstream component/template handoffs.
- Layout risks, `DESIGN-*`/`RPT-*`/`VIS-*` findings, and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- The first meaningful viewport must answer the page's main question or expose the main action.
- Layout must be driven by task, data density, business priority, state coverage, and next action, not decorative polish.
- Report pages must expose metric tree, diagnostic path, detail/action route, and trust/source/version placement or explicit scoped gaps.
- Template-native filter surfaces must be reused unless a template-level redesign is explicitly requested.
- Fixed-height navigation/cards/KPI strips need padding, explicit line-height, gap, and DOM overflow checks at `1920x1080` and `1280x768`.
- Dense tables/charts/diagrams need enough block area or a scroll/fullscreen/drawer/fallback strategy.
- Load `layout-acceptance-gates.md` before marking a layout ready for implementation or acceptance.
