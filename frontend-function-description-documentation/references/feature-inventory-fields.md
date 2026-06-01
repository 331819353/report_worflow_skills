# Feature Inventory Fields

## Scope Fields

- Page, route, menu, tab, drawer, modal, export, major component, and reusable widget.
- User purpose and primary business or operational question.
- Visible controls and default state.
- Permission, role, or data-scope behavior if visible in the frontend.

## Provider Binding Fields

- Provider type: REST, BFF, GraphQL, SDK, static file, local fixture, generated module, realtime feed, or mixed.
- Provider reference: endpoint path, SDK method, query name, file path, data-source ID, or contract document section.
- Provider version or evidence: API文档 version, schema hash/date, SDK version, sample response file, network trace, static file path, or accepted assumption.
- Input mapping: filters, route params, pagination, sorting, search, date range, drilldown, export params.
- Displayed fields: table columns, chart series, KPI props, labels, units, precision, and enums.
- Adapter or transformation notes.
- Lifecycle notes: loading, refresh, stale response handling, cache invalidation, realtime subscription cleanup, and retry rules when relevant.

## Interaction Fields

- Chart clicks, KPI/card clicks, row actions, drawer/modal opening, page jumps, parameter passing, back behavior, fullscreen, download, refresh, reset, and retry.
- Loading, empty, error, no-permission, token-invalid, stale-selection, and not-tested states.
