# 02 Self Check Startup Deployment

### Stage 10.4: Self-Check Report And Repair Loop

Use this stage for every implementation, repair, optimization, or runnable prototype before deployment or final delivery. It applies whether the page uses a bundled template or a custom implementation.

Core rule:

- Produce a written self-check report for each cycle.
- Fix issues found by the report before handoff.
- For runnable prototypes, capture headless browser screenshots before judging visual quality, run multimodal visual anomaly recognition on those screenshots, and add `VIS-*` findings to the self-check report.
- Repeat the cycle until the report has no unresolved issues, or stop after 3 cycles.
- If unresolved blocker or major issues remain after 3 cycles, do not claim the project is complete; report the remaining issues, evidence, and blocker clearly.

Self-check dimensions:

1. Z-shaped component audit.
   - Traverse each rendered page in Z-shaped reading order: start from the top-left first component, move left-to-right across the row, then continue row by row from top to bottom. For multi-page or tabbed prototypes, run the same audit per page/tab.
   - For every component, record component id/name, block id, visual type, data source, displayed metrics, used filters, interaction outputs, and current pass/fail status.
   - Check which filters the component uses: direct filters, scoped filters, required filters, ignored filters, implicit parameters, permission scope, and drilldown state.
   - Check whether every used filter is configured successfully: stable `id`, label, default, option source, scope, reset behavior, visible active state, same-name field mapping or explicit `filterFields`.
   - Check mock data completeness for the component: mock rows include all selectable values for every bound filter, including default value, non-default options, cascade children, empty-state combinations, abnormal/risk cases, and permission-limited cases.
   - Check component configuration and binding: the widget mounts to an existing block, declares `visualType`, uses an existing `data.id` or explicit `dataPolicy`, receives the resolved mock/data prop, declares required fields/formulas/units, and binds to its filter component through the data-source/filter-map contract.
   - Check interaction configuration and binding: clickable marks, rows, cards, buttons, drawers, modals, jumps, filter mutations, export/download/fullscreen, and close/back flows emit expected actions and target existing configured handlers.
   - Check layout capacity for the component: the page layout can carry all displayed indicators, labels, legends, tables, controls, warnings, and actions. If the component cannot carry the content, expand the layout, increase block span, split the component, move secondary details to drawer/fullscreen, or enable internal scroll/zoom.
   - Check block size and clipping: the assigned block and component body viewport are large enough after title/action/padding are reserved; no content is compressed, cropped, hidden behind overflow, or made unreadable.
   - Any failed component in the Z-shaped audit must be repaired and rechecked before handoff.

2. Data completeness.
   - Required datasets exist and have stable IDs, row grain, dimensions, facts, units, baselines, and formulas.
   - Multi-month, trend, MoM, YoY, quarter, year, and rolling-period views have complete rows for every selectable period, not just the default month.
   - Mock data covers default state, filtered states, empty state, abnormal/risk state, permission scope, and drilldown/detail records.
   - KPI totals, chart totals, table row counts, drawer records, export rows, and summary text reconcile under the same active filters.
   - Derived values are calculated from source fields or documented formulas; no first-screen card may show unmanaged placeholder data.

3. Filter configuration.
   - Every filter has a stable `id`, label, default value, option source, scope, reset behavior, and visible active state.
   - Data-bearing filter options are derived from dimension data, fact data, or resolvers by default. Static options are limited to stable enums such as status, severity, period granularity, view mode, and yes/no toggles.
   - Every filter maps to a real data field, resolver parameter, or permission scope through same-name fields or explicit `filterFields`.
   - Widgets that require a filter declare `requiredFilters`; widgets intentionally outside a filter declare `ignoredFilters` and make the scope difference visible.
   - Cascading filters, disabled options, export/download/share-link state, and permission-limited options are defined when relevant.

4. Interaction usability.
   - Click, drilldown, drawer, modal, popover, jump, refresh, fullscreen, download/export, and close/back actions work where configured.
   - Widgets emit the expected action names and payloads; configured actions target existing modals, routes, filters, widgets, or URLs.
   - Active filters, period, organization, object, metric, permission scope, and return path are preserved across drilldowns and jumps.
   - Open drawers, selected marks, selected rows, and drill paths reset or show a stale-state message when filters remove the selected object.
   - Failure, no-permission, loading, empty, and stale states are visible and not silent.

5. Configuration completeness.
   - `layoutRows` follows the 8*N rule and every block is rectangular.
   - For scrollable page templates, every resolved content block is at least 220px tall; if the total grid height exceeds 1080px, vertical scrolling is enabled instead of row compression. Fixed sci-fi/big-screen templates are exempt.
   - For single-page analysis/diagnostic prototypes, the layout may exceed 1080px in height. Treat 1080px as the first viewport, not a compression target.
   - Every configured widget mounts to an existing block, declares `visualType`, and either declares `data` or an explicit `dataPolicy`.
   - Widget registry, widget props/types, data-source registry, filter sources, modals, assets, logo, theme, toolbar, and route/download configs are complete.
   - Component spans obey the legal component span matrix; oversized diagrams use viewport zoom/pan rather than overflowing their block.
   - Custom implementations define equivalent `dataSource`, `filterMap`, `componentBindings`, and `updateTriggers` contracts.

6. Visual and runtime verification.
   - Run `npm run validate:dashboard` when the project uses a bundled template or has the script.
   - Run the build command, usually `npm run build`, for runnable Vue projects.
   - Start or preview the page when required, then use a headless browser or browser automation tool to capture screenshots before visual judgment.
   - Capture at least the first viewport. Also capture full-page, representative filtered state, tab/drawer/modal/drilldown/fullscreen state, and responsive viewport screenshots when in scope.
   - Run multimodal visual anomaly recognition using `../../workflow-shared-references/visual-multimodal-browser-check.md`.
   - Verify there is no layout offset, excessive blank area, text overlap, graphic overlap, critical truncation, low contrast, unreadable chart/table/KPI content, component overflow outside the component body, blank chart/canvas/table, or broken visual proportion.
   - Record each anomaly as a `VIS-*` finding with screenshot path, viewport/state, severity, component/region, impact, fix direction, and retest criteria.
   - Check at least one representative filter change and one representative interaction in the running page when browser tooling or local verification is available.
   - If the page is taller than 1080px, verify download/print includes the full scrollable content across multiple pages rather than only the first viewport.

Severity:

- `Blocker`: breaks build/startup, leaves core data/filter/interaction unusable, or makes the main report conclusion unreliable.
- `Major`: a dependent component, filter, export, drawer, or key visual is wrong or incomplete, but the page can still run.
- `Minor`: polish, secondary copy, non-critical empty state, or low-risk style issue.

Loop procedure:

1. Run Cycle 1 self-check and write the report.
2. If the report contains any unresolved issue or user-acceptance failure, repair it unless it is explicitly non-actionable and documented.
3. For any repaired visual issue, re-capture the affected screenshot state and rerun multimodal visual anomaly recognition before writing Cycle 2.
4. Repeat once more if needed for Cycle 3.
5. Stop early only when the latest report has zero unresolved issues.
6. After Cycle 3, unresolved issues must be listed in the final response with severity, evidence, and why they remain.

For pure design/specification tasks without code, provide the same report as a planning-level readiness review instead of running commands.

### Stage 10.5: Automatic Local Startup And Port Handling

Use this stage for any implementation, repair, or handoff where a runnable local prototype should be shown, even when public deployment is not requested.

Local startup workflow:

1. Determine the preferred port.
   Use the user-requested port, current in-app browser port, project `.env`, Vite config, package script, or the Vite default `5173`, in that priority order.

   On interrupted or resumed work, first check the current browser URL and likely project ports. If a same-project server is already reachable and the page verifies correctly, reuse that URL instead of starting another server.

2. Detect whether the port is available.
   Use `lsof -nP -iTCP:<port> -sTCP:LISTEN` on macOS/Linux. If unavailable, use `nc -z 127.0.0.1 <port>` or an equivalent local socket check.

3. Choose a usable port.
   - If the port is free, use it.
   - If the port is occupied by the same project and the page verifies correctly, reuse it and return that URL.
   - If the port is occupied by another process, do not kill it. Increment the port until a free port is found.
   - If a package script or config pins an unusable port, override it through the command-line `--port <port>` argument or update the local configuration when the project requires a fixed port.

4. Start the server automatically.
   If the project provides auto-port scripts, use `npm run dev:auto -- --port <port>` for development verification or `npm run preview:auto -- --port <port>` after a production build. Otherwise use `npm run dev -- --host 0.0.0.0 --port <port>` or `npm run preview -- --host 0.0.0.0 --port <port>`.

5. Verify before final response.
   Open or request `http://127.0.0.1:<port>/` with browser tooling or a local HTTP check. If it is unreachable, inspect terminal output, choose a new port if needed, and retry once before reporting a blocker.

6. Return the exact URL.
   Final handoff must include the verified local URL, usually `http://127.0.0.1:<port>/`, or the public deployed URL if deployment succeeds.

### Stage 11: Automatic Deployment And URL Return

Use this stage when the user asks for deployment, shareable URL, public preview, demo link, or "return URL".

Deployment workflow:

1. Build locally.
   Run dependency installation if needed, then run the project build command, usually `npm run build`.

2. Verify production output.
   Confirm the Vite output directory exists, usually `dist`. Run a local preview through Stage 10.5 when useful, using an available port, and inspect the page if browser tools are available.

3. Choose deployment target.
   - If the project already has deployment configuration, use it.
   - If a hosting CLI is installed and authenticated, deploy non-interactively to that platform.
   - If no deployment target exists, prefer static hosting for the Vite `dist` directory and add only minimal config required by the chosen platform.
   - Prefer installed and authenticated static-site deployment tools such as Vercel, Netlify, Cloudflare Pages, GitHub Pages, or the project's own deployment script.
   - Do not stop at local build when the user asked for a deployed URL; attempt deployment first, then fall back only when blocked.
   - If public deployment is blocked by missing auth, missing platform configuration, or network failure, return the local preview URL and state the blocker clearly.

4. Capture URL.
   Read the deployment command output and capture the final HTTPS URL. If the platform returns both draft and production URLs, return the URL that matches the user's request; otherwise prefer the shareable preview URL.

5. Final response requirement.
   Always include:
   - Deployment status.
   - Public URL when deployment succeeds.
   - Local preview URL when public deployment is unavailable.
   - Build/verification status.
   - Latest self-check report status and unresolved issue count.

Do not claim deployment succeeded without a returned URL from the deployment tool or a verified reachable preview URL.
