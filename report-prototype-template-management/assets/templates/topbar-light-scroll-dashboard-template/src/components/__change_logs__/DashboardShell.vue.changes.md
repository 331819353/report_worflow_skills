# Code Change Ledger: src/components/DashboardShell.vue

- Code file: `src/components/DashboardShell.vue`
- Ledger file: `src/components/__change_logs__/DashboardShell.vue.changes.md`
- Purpose: Block title and state mask behavior repair
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T13:02:46.559Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T13:02:46.560Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 1025 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `05b42dc348746874190a4e27905be46c94172c886297dec56ff81a8d16b41954`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611130905 - 2026-06-11T13:09:05.009Z

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
- File snapshot: 1084 lines, sha256 `a11f759e63cce10d6bb5011036e1da854df2e1dda2c4f5e62439783b5059e957`
- Follow-up: none

### v20260611133151 - 2026-06-11T13:31:51.558Z

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
- File snapshot: 893 lines, sha256 `9a9891b3b102ce45791861e93d976a750e6b6b54c851ad9099de6644f09af599`
- Follow-up: none
