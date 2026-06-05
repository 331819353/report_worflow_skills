---
name: report-prototype-template-management
description: "用于管理可运行报表原型模板资产，选择、复制、二开和校验 Vue/Vite 报表模板。用户提到报表模板、页面模板、选择模板、复制模板、模板二开、topbar、left nav、暗色/亮色模板、固定1920大屏、Haier logo、dashboard.config.ts、dashboard.dataset.json、validate-dashboard-contract、启动预览URL时触发；不负责业务报表类型判断或组件视觉细节。"
---

# Report Prototype Template Management

## Positioning

Use this skill when the task needs a runnable report prototype template or must modify an existing bundled template. It owns template asset selection, copy strategy, extension points, validation scripts, local startup helpers, and template-specific implementation boundaries.

It does not own report-type business logic, component-level styling, API documentation, or production frontend integration.

## Bundled Assets

Template assets live under `assets/templates/<template-id>/`:

- `topbar-dark-scroll-dashboard-template`: dark topbar, scrollable `8 * N` grid.
- `topbar-light-scroll-dashboard-template`: light topbar, scrollable `8 * N` grid.
- `left-nav-analytics-workbench-template`: multi-page left-nav analytics workbench.
- `frozen-title-sci-fi-cockpit-template`: fixed 1920 * 1080 cockpit screen.

Brand assets live under `assets/brand/`:

- `haier-logo.svg`
- `haier-logo-white.svg`
- `haier-logo-original.svg`

All template directories must be copied with their full project structure: `package.json`, lockfile, Vite/TS config, `index.html`, `.vscode`, `demo`, `scripts`, `public`, and `src`.

## Reference Loading

- Choose a template: `references/template-routing.md`
- Copy/edit extension points: `references/template-shared-contract.md`
- Topbar template details: `references/template-single-page.md`
- Left-nav template details: `references/template-left-nav.md`
- Fixed cockpit template details: `references/template-sci-fi.md`
- Template use modes: `references/template-usage-modes.md`
- Template redevelopment: `references/template-redevelopment-playbook.md`
- Recipe and verification checklist: `references/template-recipes-checklist.md`

## Workflow

1. Decide whether the task needs a bundled template, an existing project shell, or custom development.
2. Select exactly one template when bundled assets are appropriate.
3. Copy the full template directory into the target project or merge it into an existing Vue 3 + Vite app.
4. Keep shell-owned behavior in `src/config/dashboard.config.ts`, `src/data/dashboard.dataset.json`, `src/dataSources/registry.ts`, `src/actions/registry.ts`, and template shell components.
5. Add business widgets through `src/widgets/components/`, `src/widgets/types.ts`, and `src/widgets/registry.ts`.
6. Keep mock/offline rows in `src/data/dashboard.dataset.json`; do not create TS fixture modules for data rows.
7. Run `npm run validate:dashboard`, build, and use `npm run dev:auto` or `npm run preview:auto` when a local URL is required.

## Required Output

- Selected template ID and reason.
- Asset copy/merge path.
- Files or extension points to edit.
- Brand/logo asset decision.
- Data binding mode: JSON, API, custom resolver, or retained offline mode.
- Validation and startup commands.
- Any template limitation or custom-development gap.

## Quality Gate

- The selected template matches display scenario, navigation depth, density, and fixed/scroll behavior.
- Template project structure remains complete after copying.
- Native shell navigation, filters, toolbar, theme, and logo slots are preserved unless explicitly redesigned.
- Validation scripts and start helpers remain available.
- Template asset paths in workflow or layout skills point to this skill, not to layout skill assets.
