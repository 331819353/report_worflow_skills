# Code Change Ledger: src/styles/index.scss

- Code file: `src/styles/index.scss`
- Ledger file: `src/styles/__change_logs__/index.scss.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:51:57.243Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:51:57.244Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1008 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `af186c80743d4db3cd8ac1d8d413244e07911ec729d2ceea407d914fe89730c8`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125157 - 2026-06-11T12:51:57.244Z

- Change ID: vue3-standard-structure-refactor
- Actor: codex
- Change type: refactor
- Summary: Refactored template into the standard Vue3 TypeScript Vite project structure with router, Pinia store, Axios request wrapper, env files, Sass style entry, and preview build compatibility.
- Modified functionality: project structure, app bootstrap, routing, store, request layer, style entry, template docs
- Code ranges: full file
- Modified content: standard Vue3 project scaffolding and imports
- Affected contracts: Vue3 project directory contract; dashboard template data-source contract preserved
- Verification: npm run build:preview passed for all four templates
- Rollback note: revert the structure refactor and package dependency updates together
- Related files: package.json, vite.config.ts, tsconfig.json, src/main.ts, src/App.vue, src/router, src/stores, src/utils, src/views, src/styles
- File snapshot: 1008 lines, sha256 `af186c80743d4db3cd8ac1d8d413244e07911ec729d2ceea407d914fe89730c8`
- Follow-up: none

### v20260611130904 - 2026-06-11T13:09:04.889Z

- Change ID: block-title-mask-control
- Actor: codex
- Change type: feature
- Summary: Implemented template-level block title visibility controls and block-level state masks for unbound widgets and no-data widget data.
- Modified functionality: block title function band, titleVisible config, emptyState config, unbound widget mask, no-data mask
- Code ranges: DashboardShell block state helpers and block template; styles/index.scss block mask styles; widgets/types.ts widget config contract
- Modified content: Added titleVisible/emptyState config fields, block state overlay rendering, and full-card mask styles covering title band and body.
- Affected contracts: template-layout-design-system block-owned title/function band and no-data mask scope
- Verification: npm run build:preview passed for all four templates; runtime check on http://localhost:5185 reported 16 block masks and no console errors
- Rollback note: revert DashboardShell.vue, styles/index.scss, and widgets/types.ts together
- Related files: src/components/DashboardShell.vue, src/styles/index.scss, src/widgets/types.ts
- File snapshot: 1066 lines, sha256 `ce568a5d892101c05e07f4080819e07aa0ed8194e8f467598e751b7cd1dfe6d9`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.279Z

- Change ID: component-owned-title-construction-state
- Actor: codex
- Change type: update
- Summary: Reassigned block titles and local controls to component ownership, and changed the unbound widget fallback to construction state.
- Modified functionality: component-owned title/control handoff, unbound widget construction mask, local filter context API, template comments
- Code ranges: DashboardShell block state/context/template; styles block viewport/mask; widgets/types WidgetContext and BaseWidgetConfig; dashboard.config and WidgetTemplate comments; types/actions localFilters comment
- Modified content: Removed Shell-rendered block title/local-filter DOM, removed titleVisible from widget contract, exposed local filter config/options/set/clear through WidgetContext, changed unbound mask copy to 建设中, and updated source comments.
- Affected contracts: template-layout-design-system component-owned title/control contract; runtime UI no longer exposes 未绑定 or 待配置组件
- Verification: npm run build:preview passed for all four templates; Browser QA on http://localhost:5185/#/ showed placeholderTitleCount=0, mask texts=建设中, no 未绑定/待配置组件, and no console errors
- Rollback note: Revert DashboardShell.vue, styles/index.scss, widgets/types.ts, config comments, WidgetTemplate comments, and types/actions together
- Related files: src/components/DashboardShell.vue, src/styles/index.scss, src/widgets/types.ts, src/config/dashboard.config.ts, src/widgets/templates/WidgetTemplate.vue, src/types/actions.ts
- File snapshot: 1065 lines, sha256 `aa5434f5c433af2a71b76ed052579abaf3ed6ade231a8a0b160a7b1b85016680`
- Follow-up: none

### v20260612093911 - 2026-06-12T09:39:11Z

- Change ID: topbar-shell-coordinate-alignment
- Actor: codex
- Change type: fix
- Summary: Aligned the fixed topbar with the centered dashboard canvas in wide browser viewports.
- Modified functionality: dashboard shell positioning, fixed topbar x-axis coordinate, print/export topbar reset
- Code ranges: `.dashboard-app` shell variables, `.topbar` fixed positioning, `@media print .topbar`
- Modified content: Added shared `--shell-left` based on `100vw` and `--design-width`, changed `.topbar` from browser-left `left: 0` to `left: var(--shell-left)`, and reset the print topbar left offset to `0`.
- Affected contracts: topbar-dark fixed shell/content coordinate contract; horizontal scroll transform contract preserved
- Verification: `npm run build:preview` passed, including `validate:dashboard`, `vue-tsc --noEmit`, and Vite preview build.
- Rollback note: Revert `.dashboard-app --shell-left`, `.topbar left`, and print `.topbar left` changes together.
- Related files: src/styles/index.scss, src/components/DashboardShell.vue
- File snapshot: 1067 lines, sha256 `2064d0e352acaf7b409961dbc1eff04e97c8a59abb4d0266e6e0dbb82c19fe1a`
- Follow-up: Runtime QA for copied projects should measure `abs(topbarRect.left - dashboardFrameRect.left) <= 1px` at wide and narrow viewports.

### v20260612094603 - 2026-06-12T09:46:03Z

- Change ID: filter-panel-overlay-layering
- Actor: codex
- Change type: fix
- Summary: Raised the global filter drawer and dismiss layer above block masks, and aligned the drawer with the centered dashboard shell in wide viewports.
- Modified functionality: filter drawer stacking order, dismiss layer stacking order, wide-viewport filter drawer x-axis position
- Code ranges: `src/styles/index.scss:343-357`
- Modified content: Increased `.panel-dismiss-layer` from z-index 15 to 80, increased `.filter-panel` from z-index 18 to 90, and changed `.filter-panel right` to `calc(var(--shell-left) + 24px)`.
- Affected contracts: topbar-dark global filter drawer must sit above block masks and stay visually attached to the shell right edge.
- Verification: `npm run build:preview` passed. Runtime overlay checks passed on `http://localhost:5202/#/`: at 1920px viewport panel z-index 90, dismiss z-index 80, block mask z-index 30, `elementFromPoint` hit inside `.filter-panel`; at 2560px viewport panel stayed 24px from the dashboard shell right edge.
- Rollback note: Revert `.panel-dismiss-layer z-index`, `.filter-panel right`, and `.filter-panel z-index` together.
- Related files: src/styles/index.scss
- File snapshot: 1067 lines, sha256 `53db56637b9df8bc3dd50cde9bdf244aa896e853f4527de2edb6e359fe704ea4`
- Follow-up: none
