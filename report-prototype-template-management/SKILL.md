---
name: report-prototype-template-management
description: "用于管理可运行报表原型模板资产，选择、复制、二开和校验 Vue/Vite 报表模板。报表原型默认走内置模板，只有用户明确自定义/精确复刻/保留现有壳或模板无法满足时才走 custom。用户提到报表模板、页面模板、模板布局token、分块内外间距、圆角、标题带/标题位置、模板筛选、筛选工具栏、独立筛选栏、选择模板、复制模板、模板二开、topbar、left nav、暗色/亮色模板、固定1920大屏、Haier logo、hover/focus模板动效、dashboard.config.ts、dashboard.dataset.json、validate-dashboard-contract、启动预览URL时触发；不负责业务报表类型判断或组件视觉细节。"
---

# Report Prototype Template Management

## Positioning

Use this skill when the task needs a runnable report prototype template or must modify a bundled template. It owns template asset selection, copy strategy, extension points, validation scripts, local startup helpers, and template-specific implementation boundaries.

It does not own report-type business logic, component visual rules, API documentation, or production frontend integration. Those route to `$report-type-design`, `$report-info-component-mapping`, `$report-component-style-design`, and `$frontend-development-workflow`.

Default routing: choose `pageShellPath: template` for runnable report prototypes unless the user explicitly asks for custom/free design, exact screenshot/HTML/source restoration, existing shell preservation, or a documented bundled-template limitation.

## Bundled Assets

Template assets live under `assets/templates/<template-id>/`:

- `topbar-dark-scroll-dashboard-template`
- `topbar-light-scroll-dashboard-template`
- `left-nav-analytics-workbench-template`
- `frozen-title-sci-fi-cockpit-template`

Brand assets live under `assets/brand/`:

- `haier-logo.svg`
- `haier-logo-white.svg`
- `haier-logo-original.svg`

Copy templates with their full project structure, including package/config files, `.vscode`, `demo`, `scripts`, `public`, and `src`.

## Reference Loading

| Need | Read |
| --- | --- |
| Template choice | `references/template-routing.md` |
| Template routing and implementation gates | `references/template-routing-and-implementation-gates.md` |
| Shared extension points | `references/template-shared-contract.md` |
| Layout tokens and template design system | `references/template-layout-design-system.md` |
| Topbar template details | `references/template-single-page.md` |
| Left-nav template details | `references/template-left-nav.md` |
| Fixed cockpit template details | `references/template-sci-fi.md` |
| Template use modes | `references/template-usage-modes.md` |
| Template redevelopment | `references/template-redevelopment-playbook.md` |
| Recipe and verification checklist | `references/template-recipes-checklist.md` |
| Report decision compatibility | `$report-design-system-governance` `references/09-report-decision-anti-ai-gate.md` |
| Code-file ledger | `$delivery-version-management` `references/code-file-change-ledger.md` |

## Workflow

1. Decide bundled template, existing project shell, or custom development; default to bundled template unless a hard exception exists.
2. Select exactly one template using display theme, selected pattern cards, content volume, navigation depth, interaction density, and display environment.
3. Verify report-decision compatibility: metric tree/data story, detail/action/trust capacity, realistic data states, and report-designer needs when applicable.
4. For templates with `nav[]`, define substantial nav-page content before copying or editing.
5. Copy or merge the full template into the target.
6. Keep shell-owned behavior in template config/data/action registries and widget registries.
7. Preserve native template filter surfaces; configure `filters[]`, data sources, empty-filter values, resolvers, and widget bindings instead of adding a duplicate filter bar.
8. Before editing copied template source, read/create the sidecar code ledger; append version entries after edits.
9. Validate chart/table/component fidelity through owning component references when widgets are added or changed.
10. Run template validation, build, and dev/preview startup when a local URL is required.

## Required Output

- Selected template ID and reason.
- Compatibility notes for display theme, pattern cards, report decision path, and navigation depth.
- Shell decisions: title, logo, navigation, native filters, toolbar, controls.
- Asset copy/merge path and files/extension points changed.
- Data binding mode and filter-to-widget binding proof.
- Empty-filter configuration and aggregate-row key policy when filters or data contain all/total/synthetic options.
- Code-ledger proof for changed template source files.
- Validation/startup commands, URL, blockers, and template limitations.

## Quality Gate

- Do not choose custom development when a bundled template can satisfy the requirement.
- Do not choose a nav template unless multiple substantial nav pages are implemented.
- Do not add duplicate shell, filter bar, toolbar, or navigation layers over existing template slots without an explicit redesign decision.
- Template `filters[]` is for horizontal constraints; schema-changing perspectives belong in nav/page/route/tab/segment/perspective state.
- Template data sources must declare or inherit configurable `emptyFilterValues`; aggregate/subtotal rows must use a distinct `aggregateValue`, `rowRole`, or typed key and should not use `all` as a business primary key.
- Standard chart/table widgets must use their declared renderer and data contract.
- Changed copied-template source files require code-ledger read/create evidence and post-change version entries.
- Load `template-routing-and-implementation-gates.md` before selecting, copying, editing, or accepting bundled report templates.
