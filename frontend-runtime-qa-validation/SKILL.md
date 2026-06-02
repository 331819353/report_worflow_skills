---
name: frontend-runtime-qa-validation
description: "Run structured browser/runtime QA for frontend apps, dashboards, prototypes, report pages, or embedded pages after implementation, mock replacement, data-provider integration, environment changes, or visual fixes. Use to verify console errors, network/SDK/file requests, filters, route jumps, tabs, drawers, modals, chart clicks, table actions, export/download, refresh, loading/empty/error/auth states, stale prototype copy, layout clipping, headless browser screenshots, multimodal visual anomaly recognition, targeted repair feedback, and final runnable URL. Data service is optional; validate the provider model actually used."
---

# Frontend Runtime QA Validation

## Positioning

Use this skill independently after frontend code changes that affect a runnable page. It turns final verification into a repeatable browser QA pass instead of a quick build-only check.

This skill is not bound to 数据服务. It can verify API-backed pages, SDK-backed pages, local/static-data pages, realtime views, visual-only prototypes, and deployed static builds. Use data-service checks only when the frontend actually depends on data-service endpoints.

## Reference Map

- Read `references/browser-qa-matrix.md` for browser, console, route, asset, and layout checks.
- Read `references/data-interaction-state-checks.md` for provider, filter, interaction, and edge-state checks.
- Read `references/qa-note-template.md` when producing the QA result.
- Read `references/standalone-quality-gates.md#visual-browser-and-multimodal-check` before visual pass/fail judgment for any runnable page.

## Workflow

1. Start from build/runtime basics.
   Run available typecheck, lint, tests, build, and dev/preview startup commands. Record skipped commands only when they are not defined or blocked by an external dependency.

2. Open the target page.
   Use a local verified URL. Check that the page loads without blocking runtime errors and that core layout appears.

3. Capture headless browser screenshots.
   After the page is stable, capture first-viewport screenshots before visual judgment. Capture full-page, responsive, filter-state, drawer, modal, tab, and edge-state screenshots when those states are in scope. Store screenshot paths as QA evidence.

4. Run multimodal visual anomaly recognition.
   Use `references/standalone-quality-gates.md#visual-browser-and-multimodal-check` to ask a multimodal model to inspect screenshots for layout offset, excessive blank area, text overlap, graphic overlap, clipping, tiny charts/tables/cards, unreadable labels, nonblank chart/canvas rendering, broken proportions, stale prototype residue, and broken scroll behavior. Convert all findings into structured `VIS-*` items.

5. Check browser console and network.
   Verify there are no blocking console errors, unresolved assets, failed provider requests, wrong base URLs, CORS/proxy failures, unexpected 401/403 loops, or malformed responses.

6. Exercise page interactions.
   Traverse visible controls page by page: filters, search, date ranges, organization selectors, pagination, sorting, tabs, route jumps, drawers, modals, chart clicks, table row actions, export/download, refresh, fullscreen, and close/back flows.

7. Check data states.
   Confirm loading, empty, error, no-permission, token-invalid, stale-selection, and retry states render without layout breakage or stale data.

8. Check copy and prototype residue.
   Search visible source text and UI for stale wording such as `原型`, `mock`, `demo`, `示例`, placeholder titles, wrong metric names, malformed units, and irrelevant explanatory copy.

9. Feed visual findings into repair or QA conclusion.
   For self-check tasks, repair all actionable `blocker` and `major` visual findings, then re-capture affected screenshots and rerun multimodal inspection. For reporting-only tasks, include findings, screenshot evidence, likely owner, and retest criteria in the QA note.

## Required Output

Produce a compact QA note using `references/qa-note-template.md`.

## Verification Checklist

- Build/startup succeeds or a concrete external blocker is documented.
- Browser reaches the target page without blocking console/runtime failures.
- Headless browser screenshots were captured before visual pass/fail judgment, or an explicit blocker explains why screenshots could not be captured.
- Multimodal visual review was run on the screenshots, with `VIS-*` findings recorded or an explicit no-issue result.
- Runtime data requests hit expected endpoints, SDKs, files, or configured proxies.
- Filters and interactions update the correct data without stale values.
- Empty/error/loading/auth states are visible and stable.
- No stale prototype-only wording remains unless explicitly required.
- Chinese report rate/change labels use `%`, and change-rate indicators follow positive-red-up / negative-green-down icon semantics when present.
- HTML-replica or custom layouts preserve global UI token consistency instead of copied one-off colors or surfaces.
- Final answer includes the verified URL when startup succeeds.
