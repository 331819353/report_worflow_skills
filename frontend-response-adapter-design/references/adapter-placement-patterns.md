# Adapter Placement Patterns

Choose the narrowest existing boundary that keeps visual components stable.

## Preferred Locations

- Request/service module: best for REST, BFF, or backend API calls.
- GraphQL hook/composable: map query result data before returning it to UI code.
- Store selector/getter: useful when shared state feeds many components.
- Data-source resolver: useful for dashboard/report systems with registry-driven widgets.
- SDK wrapper: normalize third-party or internal SDK return shapes in one place.
- File/parser module: normalize JSON, CSV, XLSX, or generated static data near the loader.
- Stream/event adapter: map WebSocket/SSE events into append/update/remove UI operations.

## Avoid

- Repeating field mapping in several components.
- Letting chart/table/card components know provider-specific field names.
- Mixing semantic conversion with purely visual formatting.
- Hiding missing fields behind constants without documenting the assumption.

## Component Boundary

Keep formatting that is purely visual in the component. Keep semantic conversion, enum mapping, unit conversion, aggregation, pagination normalization, and stale-data policy in the adapter or data layer.
