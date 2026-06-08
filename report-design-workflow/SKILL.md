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
- If selecting a template with `nav[]`, such as `left-nav-analytics-workbench-template` or `frozen-title-sci-fi-cockpit-template`, redesign the content into multiple substantial nav pages. Do not choose a navigation template and implement only a homepage.
- When using a bundled template, map requirement-document title, filter, navigation, toolbar, and shell-layout intent into the template's existing slots and config. Do not recreate the requirement document's shell structure when it conflicts with the selected template.
- When using a bundled template with filter functionality, do not generate a separate filter toolbar, persistent filter bar, or extra filter drawer. A requested "main filter bar" becomes template `filters[]`, native trigger/panel/popover/drawer behavior, local title-band filters, and filter-to-widget/API/resolver bindings.

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

## Reinforced Constraints

- When multiple artifacts influence the prototype, run `$quality-gate-validation` before locking scope, visual source, API/mock contract, or implementation target. Unresolved high-impact conflicts keep the affected scope `partial` or `blocked`.
- Before implementation, lock one workflow mode, one primary report type, one `pageShellPath`, one template/custom reason, and one writable target path. Add brand/visual mode decisions when branding, restoration, or cockpit style is in scope.
- The first meaningful viewport must answer one named business question. Every must-have component, dataset, filter, and interaction must appear in the binding matrix before visual polish or code.
- Template selection and asset copying belong to `$report-prototype-template-management`; page shell/grid fit belongs to `$report-visual-layout-design`; component readability belongs to `$report-component-style-design`.
- Data completeness is checked before filter binding after implementation or repair. Required rows/options/fields/default and non-default states/resolver branches must exist before `filterFields`, `requiredFilters`, API params, or resolver params can be accepted as working.
- A primary/global filter is not accepted until affected components have filter-field/query/resolver binding and non-default filter values prove visible data changes. Selected-state-only behavior is a failed prototype.
- In template mode, filter design is a shell-config and binding problem, not permission to add a new filter toolbar. Only explicit template-level redesign may add a new persistent filter surface.
- Template `8 * N` validation covers outer blocks only. Composite widget internals, summary text areas, nested KPI grids, and small metric cells must pass `$report-component-style-design` fit rules.
- Missing API, model, field, formula, source, permission, or acceptance facts must be recorded as assumptions or gaps. Do not implement unsupported behavior as final prototype logic.
- When the prototype feeds technical solution, produce a handoff bundle: component binding, mock/data-source contract, filter contract, interaction payload, data/model assumptions or gaps, and readiness value.

## Workflow

1. Confirm prototype intent and choose mode: design spec, runnable implementation, screenshot/HTML restoration, repair, or URL handoff.
2. Normalize rough requirements with `$report-requirement-structure-extraction` when scope, users, metrics, screenshots, HTML, or acceptance rules are unclear.
3. Run `$quality-gate-validation` when inputs conflict on scope, metric口径, visual source, API/mock contract, or implementation target.
4. Use `$report-type-design` to choose one primary report type and any secondary local blocks.
5. Use `$report-info-component-mapping` to produce answer atoms, component bundles, datasets, filters, interactions, and binding matrix.
6. Declare `pageShellPath` as `template` or `custom`; default to `template` when no hard custom/restoration/existing-shell reason exists.
7. Use `$report-visual-layout-design` for page shell, header/navigation/native filter surface, `8 * N` grid, block sizing, and responsive layout.
8. Use `$report-prototype-template-management` for default bundled-template selection, copy/merge, Vue/Vite scaffold handling, and template validation.
9. Use `$report-component-style-design` for KPI/cards/charts/tables/drawers/complex-diagram style and readability.
10. Implement or repair the prototype in the selected target path when requested.
11. Run build/start/visual QA when a runnable URL is requested and route findings through `$frontend-runtime-qa-validation`.

## Required Output

- Workflow mode and input inventory.
- Primary report type and core question.
- Component/data/filter/interaction binding matrix.
- Layout plan, `pageShellPath`, selected template/custom reason, filter surface mapping, nav-page content plan when a template with `nav[]` is selected, and default-stack override reason if any.
- Prototype-to-technical handoff bundle when the output will feed API/model/backend/frontend work.
- Files changed or created when implementation is requested.
- Quality-gate findings and readiness: `ready`, `partial`, or `blocked`.
- Verified URL, screenshot/QA evidence, or exact blocker.

## Quality Gate

- Do not use this workflow without prototype/demo/page-output intent.
- Do not start implementation before report type, binding matrix, layout, and template/custom shell decision exist.
- Do not default to custom development merely because the user omitted visual style; select a bundled template unless a hard custom/restoration/existing-shell/template-limitation reason exists.
- Do not use a non-Vue3/TypeScript/Vite/Element Plus/ECharts/axios stack for runnable prototypes unless the user specifies it or the existing project requires it.
- Do not select a navigation/sidebar template unless the content is reorganized into multiple meaningful nav pages, each with enough components, data, and interactions to stand on its own.
- Do not create a second title area, filter bar, sidebar, navigation layer, or toolbar inside an existing template because the requirement document showed one; adapt labels, options, defaults, and behavior through template config unless a template-level redesign is explicitly requested.
- Do not satisfy "筛选工具栏" or "主筛选栏" by rendering a new visual bar in bundled templates. Use the template's native filter entry and `filters[]` contract.
- Do not claim filter linkage is implemented when data completeness was not checked first, or when the only available data is a single default snapshot for an affecting filter.
- Do not keep template engineering inside layout; template work belongs to `$report-prototype-template-management`.
- Do not claim runnable delivery without build/start/visual evidence or a precise blocker.
