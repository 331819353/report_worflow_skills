# Handoff Quality Checklist

- The document can drive test-case design without requiring source-code reading.
- Changed source-code features cite sidecar code ledgers, functional code ranges or stable anchors, version entries, affected contracts, verification, and rollback notes.
- Every data-backed feature names its provider or source, not just "接口" generically.
- Every provider-backed feature includes version/evidence or an explicit accepted assumption.
- Every page/module records whether Haier/company application baseline, report-specific baseline, or inherited dual baseline is the acceptance basis; Haier/enterprise report pages cannot omit the inherited application baseline without an explicit exception.
- Filters include defaults, option source, reset behavior, cascade behavior, and affected modules.
- Interactions include trigger, payload/params, target view, and stale-selection behavior when relevant.
- State behavior covers loading, empty, error, auth/permission, and retry where applicable.
- Runtime lifecycle behavior covers stale responses, cache invalidation, refresh, and realtime cleanup when applicable.
- Mock-only, offline-only, deferred, blocked, and not-tested behavior is clearly marked.
- Verification evidence includes commands, URL, browser checks, and known blockers.
- Production-bound handoff includes backend base URL, provider/source mode, auth/env behavior, retained mock status, runtime QA evidence, testing handoff, readiness, and blockers.
- Stale prototype copy such as `mock`, `demo`, `示例`, or placeholder metric names is not presented as delivered behavior.
