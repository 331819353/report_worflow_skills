# Code Change Ledger: src/styles/index.scss

- Code file: `src/styles/index.scss`
- Ledger file: `src/styles/__change_logs__/index.scss.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:51:55.800Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:51:55.800Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 811 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `64b57b4f33973f212bc3aac33a721d20f0296604489ce0617b743ccda1c06ef8`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125155 - 2026-06-11T12:51:55.801Z

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
- File snapshot: 811 lines, sha256 `64b57b4f33973f212bc3aac33a721d20f0296604489ce0617b743ccda1c06ef8`
- Follow-up: none

### v20260611130904 - 2026-06-11T13:09:04.708Z

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
- File snapshot: 869 lines, sha256 `8ccf0d57e8b2ba0b90aea0e05a947f486ccacfed113930719bc8a895117489d9`
- Follow-up: none

### v20260611133152 - 2026-06-11T13:31:52.286Z

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
- File snapshot: 868 lines, sha256 `10f083d102a66b2bd71a7b5a0596778c8028111056f7f2884a29f9569a1388b3`
- Follow-up: none

### v20260612094603 - 2026-06-12T09:46:03Z

- Change ID: filter-popover-overlay-layering
- Actor: codex
- Change type: fix
- Summary: Raised the left-nav global filter popover and dismiss layer above block masks.
- Modified functionality: filter popover stacking order, dismiss layer stacking order
- Code ranges: `src/styles/index.scss:260-274`
- Modified content: Increased `.panel-dismiss-layer` from z-index 45 to 80, and increased `.filter-popover` from z-index 60 to 90.
- Affected contracts: left-nav global filter popover must sit above block masks and remain clickable.
- Verification: `npm run build:preview` passed. Runtime overlay check passed on `http://localhost:5203/#/`: panel z-index 90, dismiss z-index 80, block mask z-index 30, and `elementFromPoint` hit inside `.filter-popover`.
- Rollback note: Revert `.panel-dismiss-layer z-index` and `.filter-popover z-index` together.
- Related files: src/styles/index.scss
- File snapshot: 867 lines, sha256 `8d38e473c9511511b3b95c385c42365ac358c275694919b7fdeb3d3c6dbc120a`
- Follow-up: none
