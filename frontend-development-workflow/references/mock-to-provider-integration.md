# Mock To Provider Integration Reference

Use this reference when replacing prototype mock/static data with the intended runtime provider. Provider means any source that supplies UI data: REST/BFF HTTP, GraphQL, SDK/client package, static/generated file, realtime feed, data-source registry, or explicitly retained offline/demo mode.

## Discovery Commands

Search for mock data, fake request patterns, and existing provider paths:

```bash
rg -n "mock|fixture|fixtures|staticData|dashboard\\.data|Promise\\.resolve|setTimeout|localStorage|sessionStorage|fetch\\(|axios|request\\(|graphql|gql`|useQuery|subscribe|WebSocket|EventSource|sdk|client" src
rg --files | rg "(mock|fixture|data|api|service|request|http|graphql|sdk|client|store|composable|dataSource|registry)"
```

Inspect runtime and framework clues:

```bash
rg -n "vite|vue|react|next|axios|fetch|pinia|vuex|router|proxy|baseURL|VITE_|GRAPHQL|SDK|WebSocket|EventSource" package.json vite.config.* src
```

## Provider Classification

- REST/BFF HTTP: use endpoint docs, OpenAPI, route code, sample response, or network trace.
- GraphQL: use schema, operations, variables, fragments, sample result, and pagination convention.
- SDK/client package: use package docs, TypeScript declarations, initialization rules, and sample return values.
- Static/generated files: use JSON/CSV/XLSX/source modules, parser behavior, public asset path, and build-time rules.
- Realtime feed: use WebSocket/SSE/polling spec, event schema, reconnect, unsubscribe, and stale-data policy.
- Data-source registry: use resolver/config IDs, widget binding, provider options, and action contracts.
- Offline/demo mode: keep isolated and explicit; do not let it masquerade as production data.

## Mapping Template

Build this mapping before editing data flow:

```text
Current source:
Consumer pages/components:
Current view model fields:
Current UI interactions:
Provider type:
Provider evidence:
Provider call/query/file/subscription:
Input mapping:
Auth/client/env requirements:
Payload data path:
Payload-to-view-model adapter:
Lifecycle behavior:
Empty/error/auth behavior:
Verification case:
Missing information:
```

## Provider Implementation Patterns

- REST/BFF HTTP: use the existing request client. If none exists, add the smallest project-native client. See `mock-to-http-integration.md` for HTTP-specific examples.
- GraphQL: keep operation documents and variables near the client/composable layer; map query results before they reach visual components.
- SDK/client package: wrap initialization and method calls in one adapter module so components do not depend on SDK-specific return shapes.
- Static/generated files: normalize file paths and parser output near the loader; verify build/preview asset paths.
- Realtime feed: isolate connect, message mapping, reconnect, unsubscribe, and stale-data behavior in a composable/store/service.
- Data-source registry: update resolver/config bindings instead of bypassing the registry from components.

## Runtime Lifecycle Rules

- Guard rapid filter/search changes with request cancellation, sequence IDs, or stale-response checks.
- Debounce high-frequency inputs when the provider cannot handle per-keystroke calls.
- Define cache scope and invalidation for provider responses used by multiple components.
- Keep previous data only when the UI explicitly marks it as stale or refreshing.
- For realtime feeds, cleanup subscriptions on route change, component unmount, filter changes, and logout.
- Retry only bounded, idempotent operations unless the provider contract says otherwise.

## Component Or Store Integration

1. Replace direct mock imports with a provider service, composable, store action, SDK wrapper, parser, or data-source resolver.
2. Add or preserve `loading`, `error`, `empty`, `partial`, `stale`, and `data` state where the UI needs them.
3. Pass current filters, route params, pagination, sorting, permissions, and selection state into the provider layer.
4. Re-fetch, re-query, reload, or resubscribe when those state values change.
5. Keep chart/table/card props shaped like the existing view model unless a narrow refactor is safer.

## Verification

- Target pages load without blocking runtime errors.
- Runtime provider calls use expected env/auth/client configuration.
- UI fields match provider payloads through a documented adapter.
- Filters, route params, pagination, sorting, drilldowns, exports, and refresh use current state.
- Loading, empty, partial, failed, unauthorized, no-permission, stale, and retry states do not break layout.
- Build output succeeds after stale mock imports are removed or isolated.
