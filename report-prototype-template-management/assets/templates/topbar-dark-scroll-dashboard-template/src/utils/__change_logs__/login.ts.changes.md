# Code Change Ledger: src/utils/login.ts

- Code file: `src/utils/login.ts`
- Ledger file: `src/utils/__change_logs__/login.ts.changes.md`
- Purpose: TBD: describe what this file owns before handoff.
- Primary features: TBD
- Last reviewed before edit: 2026-06-11T12:51:57.902Z / baseline / codex
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - 2026-06-11T12:51:57.902Z

- Change ID: baseline
- Actor: codex
- Change type: baseline
- Summary: Initial ledger created from existing file before a code change.
- Modified functionality: none
- Code ranges: full file, 16 lines
- Modified content: none
- Affected contracts: none
- Verification: sha256 `fbab1a97fe46fcbdfc0e30c62435f0db9414a8ef3cf862d5130c1a4cadc3cf04`
- Rollback note: use VCS history or previous release bundle if available.
- Related files: none
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.

### v20260611125157 - 2026-06-11T12:51:57.903Z

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
- File snapshot: 16 lines, sha256 `fbab1a97fe46fcbdfc0e30c62435f0db9414a8ef3cf862d5130c1a4cadc3cf04`
- Follow-up: none
