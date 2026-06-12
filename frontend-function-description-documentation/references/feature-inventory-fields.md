# Feature Inventory Fields

## Scope Fields

- Page, route, menu, tab, drawer, modal, export, major component, and reusable widget.
- User purpose and primary business or operational question.
- Visible controls and default state.
- Permission, role, or data-scope behavior if visible in the frontend.
- UI/design baseline: Haier/company application baseline, report-specific baseline, inherited dual baseline, or explicit non-Haier/native/neutral exception.

## Provider Binding Fields

- Provider type: REST, BFF, GraphQL, SDK, static file, local fixture, generated module, realtime feed, or mixed.
- Provider reference: endpoint path, SDK method, query name, file path, data-source ID, or contract document section.
- Provider version or evidence: API文档 version, schema hash/date, SDK version, sample response file, network trace, static file path, or accepted assumption.
- Input mapping: filters, route params, pagination, sorting, search, date range, drilldown, export params.
- Displayed fields: table columns, chart series, KPI props, labels, units, precision, and enums.
- Adapter or transformation notes.
- Lifecycle notes: loading, refresh, stale response handling, cache invalidation, realtime subscription cleanup, and retry rules when relevant.

## Code Traceability Fields

- Code file: changed `.vue`, `.ts`, `.js`, `.mjs`, `.css`, config, registry, API-client, data-source, or test file.
- Sidecar ledger path: `__change_logs__/<code-file-name>.changes.md`.
- Version entry: project version, branch/commit, change ID, or generated timestamp version.
- Functional code range: line range or stable anchor such as component section, function name, route handler, adapter function, or style block.
- Modified content: layout, data binding, API call, adapter, formatter, state handling, permission, export, logging, test, or style change.
- Affected contracts: props, emitted events, API request/response fields, env vars, filters, route params, data-source IDs, permission behavior, or none.
- Verification and rollback notes from the ledger.

## Interaction Fields

- Chart clicks, KPI/card clicks, row actions, drawer/modal opening, page jumps, parameter passing, back behavior, fullscreen, download, refresh, reset, and retry.
- Loading, empty, error, no-permission, token-invalid, stale-selection, and not-tested states.
