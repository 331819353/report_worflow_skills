# Data, Interaction, And State Checks

## Provider Checks

- REST/BFF/GraphQL requests use expected base URLs, params, headers, and response shapes.
- Global filter/search/pagination/sort interactions send active scope params to REST/BFF/GraphQL/SDK/data-source calls. Flag requests that fetch all candidate rows and then rely on component/store/adapter filtering as fail/partial. Component-internal filters may be local only when they operate on already fetched component data and do not affect API-level totals, permission scope, pagination, ranking, aggregation, or counts.
- SDK calls initialize with expected app/client values and return the documented shape.
- Static/local file loads use expected paths and do not depend on unavailable local absolute paths.
- Realtime feeds connect, update, stop, retry, and show stale data policy correctly.
- CORS/proxy/auth failures are classified separately from UI rendering bugs.
- Rapid filter/search/page changes do not let old responses overwrite newer UI state.
- Cache reuse, manual refresh, logout, permission changes, and provider errors invalidate or preserve data according to the documented policy.

## Control Semantics Checks

- Classify each visible control as `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param` before judging behavior.
- Perspective switches cover business domain, report theme, management object, subject area, and first-level views. They may change metric names, component set, table headers, dimensions,口径, and domain vocabulary.
- Global filters narrow the same semantic schema and should not change metric names, component titles, component collection, table headers, or口径 unless the binding matrix declares them as perspective switches.
- Local filters affect one component or parent block over already fetched data and must not alter page-level totals, permission scope, or backend query shape.
- Drilldown params are action payloads that scope drawers, modals, detail routes, or lower-level queries.
- For every non-default perspective, verify metric names, title/summary wording, table dimensions/headers, component collection, specialty metrics, risk focus, and口径 labels as well as numeric values.
- For every domain and statistical口径 switch, verify cross-perspective consistency: navigation percentages, overview KPIs, journey cards, and chart summaries come from the same data chain and active filter context.
- Record at least one field-level equality assertion for the selected perspective, such as `navigation.satisfaction === current experienceProfiles.satisfaction`, with the source dataset/field and active period behavior.
- Flag a failure when a domain/theme/management-object switch is implemented only as an ordinary filter and schema-changing labels or table fields remain in the default domain.

## Interaction Checks

- Filters, search, date ranges, organization selectors, pagination, sorting, tabs, route jumps, chart clicks, table row actions, exports/downloads, refresh, reset, retry, fullscreen, and close/back flows.
- Verify affected components update and unaffected components remain stable.
- Check stale selection behavior after filters, page changes, or data refresh.
- For export/download, verify the generated file name, file type, applied filters, row count or visible content sample, and empty/error export behavior when feasible.

## State Checks

- Loading, empty, error, partial, no-permission, token-invalid, offline, retry, and not-configured states.
- Visible copy should not contain stale `原型`, `mock`, `demo`, `示例`, placeholder titles, wrong metric names, malformed units, or irrelevant explanatory text unless intentionally part of the product.
- Long text, dense chart labels, empty charts, very small totals, zero values, and null values should remain readable and not collapse the layout.
