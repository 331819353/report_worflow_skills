# Code Change Ledger: src/router/index.ts

- Code file: `src/router/index.ts`
- Ledger file: `src/router/__change_logs__/index.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:51:56.100Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:51:56.100Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 30 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `775581449ad682f57f18c12311bcb10bc334c36cf9dd72261c9d91f77836135f`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125156 - 2026-06-11T12:51:56.101Z

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
- File snapshot: 30 lines, sha256 `775581449ad682f57f18c12311bcb10bc334c36cf9dd72261c9d91f77836135f`
- Follow-up: none
