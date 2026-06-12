---
name: report-visual-layout-design
description: "用于报表页面视觉布局设计、页面规范、页面设计规范、页面壳设计、布局评审和布局修复。用户提到提高前端设计、前端设计提升、页面布局、页面壳、顶部栏、左侧导航、页面级筛选区、工具栏、8*N网格、区块排布、首屏层级、响应式、Haier品牌位置、图表/表格容器尺寸、hover动效裁切、空态/加载/错误态位置、元素重叠、溢出、布局不好看时触发；不负责组件细节样式、模板工程复制或业务报表类型选择。"
---

# Report Visual Layout Design

## Positioning

Use this skill for report page-level layout: shell, navigation, header/filter/control surface, toolbar, brand placement, `8 * N` grid, parent-block sizing, internal sub-block composition, first-viewport hierarchy, responsive behavior, and layout defect repair.

It owns page规范. Component internals go to `$report-component-style-design`; reusable component standards go to `$report-component-design-spec`; full design-system governance goes to `$report-design-system-governance`; runnable templates go to `$report-prototype-template-management`.

For Haier/enterprise Web surfaces, including report/dashboard/BI/data-screen layouts, load `$haier-enterprise-app-ui-design-spec` for company-level color, typography, spacing, base controls, states, and brand/logo rules. Also load `$report-design-system-governance` report guideline references before final report layout decisions. These baselines are inherited together; they are not alternatives.

## Reference Loading

| Need | Read |
| --- | --- |
| Preflight understanding before implementation/repair/acceptance | `$quality-gate-validation` `references/preflight-understanding-gate.md` |
| Page shell and layout mode | `references/page-layout-modes.md` |
| Brand and Haier placement | `references/brand-style.md` |
| `8 * N` grid and parent containers | `references/grid-containers.md` |
| Block sizing and viewport constraints | `references/block-size-constraints.md` |
| Direct block-size front door | `$report-layout-size-constraint-spec` |
| Parent block and internal sub-block composition | `references/block-composition.md` |
| Toolbar, drawer, modal, responsive interactions | `references/components-interactions.md` |
| Output checklist | `references/output-checklist.md` |
| Detailed layout acceptance gates | `references/layout-acceptance-gates.md` |
| Report layout baseline and decision gates | `$report-design-system-governance` relevant guideline references |
| Template layout tokens | `$report-prototype-template-management` `references/template-layout-design-system.md` when template-based |

## Workflow

1. Run the Preflight understanding gate for implementation, repair, or acceptance work; name page purpose, baseline, affected surfaces, specialty skill routing, hard constraints, missing evidence, and start decision.
2. Identify page purpose, user, primary report question, density, display scenario, first action, and target viewport.
3. Classify the baseline: report/dashboard, common enterprise app, template-based page, custom page, or mixed. For Haier/enterprise report pages, record both the inherited Haier application baseline and report-specific baseline.
4. Run anti-AI and report-decision layout checks when the page is a report surface.
5. Choose shell structure: topbar, left-nav, unified header/control area, fixed cockpit, existing shell, or custom shell.
6. Place navigation, page/global filters, toolbar actions, brand/logo, refresh/export/fullscreen/status controls, and template-native filter entry when applicable.
7. Plan the first meaningful viewport and downstream reading path.
8. Lay out top-level parent blocks in legal `8 * N` spans, then decide whether each block contains one component or composed internal sub-blocks.
9. Size blocks and sub-blocks from content needs: KPI, summary, chart, table, complex diagram, task list, evidence panel, drawer/detail, or action area. Use `$report-layout-size-constraint-spec` when the task is mainly block size, height budget, overflow, or viewport fit.
10. Define layout states and responsive fallback for parent blocks and sub-blocks.
11. Use `layout-acceptance-gates.md` before accepting implementation-ready layout or repairing overlap/cropping defects.

## Required Output

- Preflight understanding result when the work is implementation/repair/acceptance, plus surface classification, baseline inheritance references, and shell choice.
- First-viewport hierarchy and reading path.
- Header/navigation/filter/toolbar/brand structure.
- `8 * N` parent-block grid and internal sub-block plan.
- Block sizing rationale, state plan, responsive plan, and downstream component/template handoffs.
- Layout risks, `DESIGN-*`/`RPT-*`/`VIS-*` findings, and readiness: `ready`, `partial`, or `blocked`.

## Quality Gate

- The first meaningful viewport must answer the page's main question or expose the main action.
- Do not repair or accept page layout before affected component families and their chart/table/filter/placement owners are identified.
- Do not accept Haier/enterprise report layout that applies report grid rules but omits Haier application typography, color, spacing, base surface, and brand/logo constraints.
- Layout must be driven by task, data density, business priority, state coverage, and next action, not decorative polish.
- Report pages must expose metric tree, diagnostic path, detail/action route, and trust/source/version placement or explicit scoped gaps.
- Template-native filter surfaces must be reused unless a template-level redesign is explicitly requested.
- Fixed-height navigation/cards/KPI strips need padding, explicit line-height, gap, and DOM overflow checks at `1920x1080` and `1280x768`.
- Dense tables/charts/diagrams need enough block area or a scroll/fullscreen/drawer/fallback strategy.
- Load `layout-acceptance-gates.md` before marking a layout ready for implementation or acceptance.
