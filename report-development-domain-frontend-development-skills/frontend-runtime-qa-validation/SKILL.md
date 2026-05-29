---
name: frontend-runtime-qa-validation
description: "Run structured browser/runtime QA for frontend prototypes or report pages after implementation, mock replacement, API integration, or visual fixes. Use to verify console errors, network requests, filters, route jumps, tabs, drawers, modals, chart clicks, table actions, export/download, refresh, loading/empty/error states, auth failures, stale prototype copy, layout clipping, and final runnable URL."
---

# Frontend Runtime QA Validation

## Overview

Use this skill after frontend code changes that affect a runnable page. It turns final verification into a repeatable browser QA pass instead of a quick build-only check.

This skill is usually called by `$frontend-development-workflow` before deployment or final handoff.

## Workflow

1. Start from build/runtime basics.
   Run available typecheck, lint, tests, build, and dev/preview startup commands. Record skipped commands only when they are not defined or blocked by an external dependency.

2. Open the target page.
   Use a local verified URL. Check that the page loads without blocking runtime errors and that core layout appears.

3. Check browser console and network.
   Verify there are no blocking console errors, unresolved assets, failed API requests, wrong base URLs, CORS/proxy failures, unexpected 401/403 loops, or malformed responses.

4. Exercise page interactions.
   Traverse visible controls page by page: filters, search, date ranges, organization selectors, pagination, sorting, tabs, route jumps, drawers, modals, chart clicks, table row actions, export/download, refresh, fullscreen, and close/back flows.

5. Check data states.
   Confirm loading, empty, error, no-permission, token-invalid, stale-selection, and retry states render without layout breakage or stale data.

6. Check copy and prototype residue.
   Search visible source text and UI for stale wording such as `原型`, `mock`, `demo`, `示例`, placeholder titles, wrong metric names, malformed units, and irrelevant explanatory copy.

7. Check layout and clipping.
   Verify charts, tables, legends, labels, KPI cards, buttons, drawers, modals, and table scrollbars fit their containers across the target viewport(s).

## Required Output

Produce a compact QA note:

- Commands run:
- URL verified:
- Console/network status:
- Interaction cases checked:
- Data states checked:
- Copy cleanup:
- Layout/clipping status:
- Remaining blocker:

## Verification Checklist

- Build/startup succeeds or a concrete external blocker is documented.
- Browser reaches the target page without blocking console/runtime failures.
- Network requests hit documented endpoints or configured proxies.
- Filters and interactions update the correct data without stale values.
- Empty/error/loading/auth states are visible and stable.
- No stale prototype-only wording remains unless explicitly required.
- Final answer includes the verified URL when startup succeeds.
