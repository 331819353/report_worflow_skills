---
name: report-design-workflow
description: "运行报表、仪表盘、数据大屏、页面原型的设计和可运行原型编排。用户明确提到原型、页面原型、报表原型、仪表盘原型、大屏原型、demo、样机、截图/HTML还原、mock数据原型、模板原型、可运行URL、本地预览、部署预览、Vue报表原型时触发；默认使用内置报表模板和 Vue3 + TypeScript + ECharts + AntV S2 + Element Plus + axios 技术栈，除非用户指定其他栈、现有项目已有技术栈、要求自定义开发/精确复刻，或模板能力无法满足；不用于纯需求梳理、纯API/后端/前端生产联调或单独样式规范。"
---

# Report Design Workflow

## Positioning

Use this workflow only when the user asks for a report/page/dashboard prototype, runnable demo, screenshot/HTML restoration, template-based prototype, or preview URL. It orchestrates atomic skills and keeps implementation details in the owning skills.

Default runnable prototype policy:

- Use `pageShellPath: template` by default and select one bundled report template by scenario.
- Use `pageShellPath: custom` only when the user explicitly asks for custom/free design, explicitly asks for exact screenshot/HTML/source restoration, provides an existing shell that must be kept, or a documented requirement cannot be met by any bundled template.
- If the user gives a loose sample/reference without asking for exact restoration, treat it as hierarchy, density, and tone evidence, then choose the closest bundled template.
- Unless the user specifies another stack or the existing project already uses another stack, implement runnable prototypes with Vue 3 single-file components + TypeScript + Vite + Element Plus + ECharts + AntV S2 + axios.
- Install/use AntV S2 only for S2-class analytical tables such as pivot tables, cross tables, frozen headers, dense comparison grids, or wide metric matrices.

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Reusable design standards | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime visual QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Confirm prototype intent and choose mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
2. Normalize rough requirements with `$report-requirement-structure-extraction` when scope, users, metrics, screenshots, HTML, or acceptance rules are unclear.
3. Run `$quality-gate-validation` when inputs conflict on scope, metric口径, visual source, API/mock contract, or implementation target.
4. Use `$report-type-design` to choose one primary report type and any secondary local blocks.
5. Use `$report-info-component-mapping` to produce answer atoms, component bundles, datasets, filters, interactions, and binding matrix.
6. Declare `pageShellPath` as `template` or `custom`; default to `template` when no hard custom/restoration/existing-shell reason exists.
7. Use `$report-visual-layout-design` for page shell, header/navigation/filter area, `8 * N` grid, block sizing, and responsive layout.
8. Use `$report-prototype-template-management` for default bundled-template selection, copy/merge, Vue/Vite scaffold handling, and template validation.
9. Use `$report-component-style-design` for KPI/cards/charts/tables/drawers/complex-diagram style and readability.
10. Implement or repair the prototype in the selected target path when requested.
11. Run build/start/visual QA when a runnable URL is requested and route findings through `$frontend-runtime-qa-validation`.

## Required Output

- Workflow mode and input inventory.
- Primary report type and core question.
- Component/data/filter/interaction binding matrix.
- Layout plan, `pageShellPath`, selected template/custom reason, and default-stack override reason if any.
- Files changed or created when implementation is requested.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.
- Verified URL, screenshot/QA evidence, or exact blocker.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not start implementation before report type, binding matrix, layout, and template/custom shell decision exist.
- Do not default to custom development merely because the user omitted visual style; select a bundled template unless a hard custom/restoration/existing-shell/template-limitation reason exists.
- Do not use a non-Vue3/TypeScript/Vite/Element Plus/ECharts/axios stack for runnable prototypes unless the user specifies it or the existing project requires it.
- Do not keep template engineering inside layout; template work belongs to `$report-prototype-template-management`.
- Do not claim runnable delivery without build/start/visual evidence or a precise blocker.
