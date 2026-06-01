# Handoff Quality Checklist

- The document can drive test-case design without requiring source-code reading.
- Every data-backed feature names its provider or source, not just "接口" generically.
- Every provider-backed feature includes version/evidence or an explicit accepted assumption.
- Filters include defaults, option source, reset behavior, cascade behavior, and affected modules.
- Interactions include trigger, payload/params, target view, and stale-selection behavior when relevant.
- State behavior covers loading, empty, error, auth/permission, and retry where applicable.
- Runtime lifecycle behavior covers stale responses, cache invalidation, refresh, and realtime cleanup when applicable.
- Mock-only, offline-only, deferred, blocked, and not-tested behavior is clearly marked.
- Verification evidence includes commands, URL, browser checks, and known blockers.
- Stale prototype copy such as `mock`, `demo`, `示例`, or placeholder metric names is not presented as delivered behavior.
