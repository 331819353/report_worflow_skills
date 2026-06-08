# Report Data Visualization Frontend Implementation And Optimization

Use this shared reference whenever a report, BI, dashboard, large-screen, or data-visualization frontend is designed, implemented, integrated with providers, validated, or reviewed for production readiness.

This reference is about turning data into a usable decision interface. It complements:

- `$backend-development-workflow` for report backend metadata, query planning, permissions, cache, export, and audit.
- `$performance-optimization` for backend/data-service capacity and resilience.
- `report-component-style-design` references for detailed component styling, responsive fit, ECharts, tables, and visual QA.
- `frontend-development-workflow` for provider wiring, environment profiles, runtime verification, and handoff.

## Core Principle

Good report visualization is not "more charts" or "more visual effects". It should help users:

```text
understand what happened
-> judge whether it is normal
-> explain why it changed
-> drill into where it happened
-> trace the exact records or evidence
-> decide what to do next
```

The stable implementation path is:

```text
user role and business question
-> core metrics and口径
-> overview-to-detail analysis path
-> appropriate chart/table choice
-> layout and hierarchy
-> filters, linkage, drilldown, export
-> states, permissions, freshness, and explanations
-> frontend performance and runtime QA
-> usage feedback and continuous optimization
```

## Default Frontend Stack

For self-developed report frontends, use `Vue 3 + TypeScript + ECharts + Element Plus + axios + AntV S2` unless the user specifies another stack or an existing project has an authoritative stack.

- Use Vue 3 single-file components and TypeScript for component contracts, provider models, and adapter output types.
- Use axios for HTTP/provider calls and keep request params traceable to API/provider contracts.
- Use Element Plus for filters, forms, buttons, tabs, tags, popovers, dialogs, drawers, pagination, and simple tables.
- Use ECharts for standard KPI trends, bars, lines, scatter, heatmaps, maps, waterfalls, funnels, gauges, and dashboard charts.
- Use AntV S2 for pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, and dense comparison grids.
- Record an override reason before using another stack.

## Required Frontend Visualization Decisions

For every production-bound or production-like visualization page, document or implement these decisions.

| Area | Required Decisions |
| --- | --- |
| User and purpose | Target role, usage moment, primary question, decision/action, and whether the page is overview, analysis, monitoring, detail, self-service, or recap. |
| Information hierarchy | First viewport conclusion, core KPIs, trend, breakdown, anomaly, detail/traceability, and action/export entry. |
| Metric presentation | Name, value, unit, precision, format, numerator/denominator for ratios,同比/环比 baseline, target/threshold,口径 tooltip/detail, owner/source/freshness. |
| Chart selection | Trend/line, ranking/bar, composition/stack/tree, detail/table, funnel, retention/cohort, map plus ranking, anomaly/control, target/bullet/progress. |
| Layout | Global filters, title, freshness, KPI strip, trend, breakdown, anomaly/detail, table/export, responsive behavior, and large-screen/mobile variants. |
| Filters | High-frequency filters, advanced filters, default values, option sources, search/multi-select/cascade, reset, current filter summary, permission scope. |
| Interactions | Chart click filter, drill-down, drill-through, tooltip, legend toggle, time brush, table row detail, drawer/modal, route jump, refresh, fullscreen, export. |
| States | Loading, skeleton, empty, error, partial data, no permission, token invalid, stale selection, query timeout, data delay, quality warning, retry. |
| Visual semantics | Color palette, semantic status colors, change indicators, legends, axes, labels, tooltip content, contrast, accessibility, theme tokens. |
| Data volume | Point/category limits, Top N + other, time-grain adaptation, aggregation/downsampling, pagination, virtual scroll, lazy loading, and async export handoff. |
| Provider mapping | Component-ready data contract, adapter boundary, request params, response fields, local-only component filters, export params, stale-response guard. |
| Runtime quality | Build/startup, network params, console errors, screenshot evidence, visual overlap/clipping, responsiveness, interaction smoke, production profile. |

## Page Type Fit

Choose visual structure by page type, not by habit.

| Page Type | Frontend Priority |
| --- | --- |
| Executive/overview dashboard | First-screen conclusion, KPI health, trend,同比/环比, anomaly summary, minimal filters. |
| Operations/analysis dashboard | Decomposition, ranking, funnel, cohort, drilldown, filters, actionable anomalies. |
| Monitoring/large screen | Status, alert, current value, threshold, auto-refresh, freshness, last-success fallback, few readable charts. |
| Detail/list report | Search, filters, pagination, sorting, column visibility, field descriptions, export, row detail. |
| Self-service analysis | Dataset/field selection, dimension/metric limits, chart recommendation, query guardrails, clear expensive-query feedback. |
| Recap/story report | Conclusion, evidence, decomposition, cause, recommendation, and traceable detail links. |

Do not reuse one dense dashboard template for all audiences. A management overview should not open with many filters; an analyst page should not stop at non-drillable KPI cards.

## Information Hierarchy

A stable report page normally follows:

```text
overview
-> trend
-> ranking
-> composition/distribution
-> anomaly/cause
-> detail/trace
```

First meaningful viewport should answer the primary question or expose the most important action. Avoid starting with a filter wall, decorative graphics, or equal-weight chart grids where the user must infer the story alone.

## Metric And KPI Rules

KPI cards and metric blocks should include more than a number:

- metric name and clear business wording
- current value, unit, precision, and display scale
-同比/环比 with comparison period and base value when useful
- change amount plus change rate, not only percentage
- target, completion rate, threshold, or status when relevant
- data freshness and warning state when relevant
- tooltip or detail link for口径, formula, time field, source, update frequency, owner

Rules:

- Format money, counts, rates, durations, and ratios differently.
- Use `%` for Chinese rate/change labels unless a domain explicitly requires another term.
- Do not rely only on color for up/down or normal/alert/abnormal. Pair color with arrow, sign, label, icon, or marker.
- For ratio metrics, expose denominator or sample size where misleading small denominators are possible.
- Avoid early rounding before aggregation; present display precision consistently.

## Chart Selection Rules

Use the chart that fits the question:

| Question | Prefer | Avoid |
| --- | --- | --- |
| Trend over time | Line or area chart | Pie chart |
| Ranking/comparison | Horizontal bar, sorted table | Pie with many categories |
| Composition | Stacked bar, donut for few categories, tree map | 3D pie |
| Detail/exact values | Table/S2 grid | Decorative chart |
| Distribution | Histogram, box plot, scatter | Average-only KPI |
| Relationship | Scatter/bubble | Dense table-only reading |
| Funnel conversion | Funnel plus step table | Decorative funnel without rates |
| Retention | Cohort heatmap | Plain line chart |
| Geography | Map plus ranking/table | Map-only analysis |
| Target/progress | Bullet chart, progress bar, KPI target card | Large gauge unless monitoring needs it |
| Anomaly | Trend with threshold/markers, anomaly list | Isolated number |

Hard rules:

- Pie/donut normally stays within 5 categories. Use bar, stack, tree, or table when categories are many.
- Line charts should not default to many series. Show important series, Top N, or allow controlled selection.
- Bar/ranking charts must be sorted by the business metric unless a natural order is required.
- Dual-axis charts need at most two metrics, clear units, axis-color pairing, and no hidden correlation implication; split into two charts if users may misread it.
- Maps should be paired with ranking/detail because area size can distort perceived importance.

## Chart Detail Rules

Every chart needs enough metadata to be understandable:

- Title names metric, dimension, time range, and口径 when needed.
- Axis units and value formats are explicit.
- Tooltip includes dimension, metric, unit,同比/环比, share, ranking, data time, and warning text when relevant.
- Legend is stable, scrollable/foldable when long, and defaults to important series.
- Labels are sampled or hidden with tooltip/detail access when density is high.
- Thresholds, targets, anomaly points, and data delay are visible when they affect interpretation.
- Empty, error, no-permission, loading, stale, and partial states reserve geometry and explain what the user can do.

## Filters, Linkage, And Drill Rules

Filter rules:

- Keep high-frequency filters visible through the page's approved filter surface and put low-frequency filters into advanced filters. In bundled/copy templates, the approved surface is the template-native trigger/panel/popover/drawer and `filters[]`, not a newly generated standalone toolbar.
- Do not show a long row of many filters by default.
- Do not default to unbounded historical data or all details. Use safe defaults such as recent 7/30 days and current permission scope.
- Show the active filter summary and support reset.
- For template-based pages, active filter summary/reset should use the template's existing shell, compact state text, chips, or filter panel affordance instead of adding another header row.
- Define option source, cascade behavior, stale-selection behavior, and permission filtering.
- Time filters must state business time, such as order time, payment time, refund time, completion time, or ingestion time.

Interaction rules:

- Drill-down stays within the same hierarchy, such as region -> province -> city -> store.
- Drill-through jumps from a summary/anomaly to related detail records.
- Chart clicks must preserve filter context and route/drawer params.
- Table detail, drawers, exports, and route jumps should carry the same scope.
- Local legend toggles, local tabs, and in-component search may filter already fetched component data only when the provider returned the complete component dataset after global filtering.
- Global filters, permission scope, pagination, sorting, Top/Bottom, grouping, aggregation, and export scope must be sent to the provider/API/resolver before component rendering.
- Data completeness must be checked before filter binding: provider/mock data needs option rows, default rows, non-default filter rows or responses, required fields, and resolver/API branches for every affecting global/page filter.
- A global/page filter is not implemented if it only changes selected control state. Affected components must bind the filter to API/provider/resolver inputs or configured `filterFields`/equivalent mapping, and non-default filter values must visibly change the relevant KPI/chart/table/list data.
- Use `ignoredFilters` only for intentionally invariant components. Do not use it to compensate for missing provider fields, mock data grain, or resolver branches.

## Data Freshness, Quality, And Trust

Production-bound report pages should show or expose:

- data update time
- statistical period
- update frequency
- quality status and warnings
- source delay or stale fallback when applicable
- partial data marker when some widgets fail

Do not let users assume stale, delayed, partial, or quality-risk data is realtime and complete.

## Frontend Performance Rules

Frontend visualization performance is part of user experience.

- Limit chart points, categories, visible series, and table rows.
- Use backend/source aggregation or query grain adaptation for large time ranges.
- Use Top N + other for long-tail dimensions.
- Use pagination or virtual scrolling for large tables.
- Lazy-load below-the-fold or hidden-tab charts.
- Resize charts only after containers are stable and visible.
- Debounce filter input and avoid firing a request on every keystroke.
- Cancel, ignore, or sequence-guard stale requests so old responses cannot overwrite new filter results.
- Deduplicate repeated requests and cache safe repeated results when the project has a cache layer.
- Use skeletons and last-success fallback for high-frequency dashboards when appropriate.
- Do not render many heavy charts simultaneously on first load when staged loading would preserve the first-screen answer.

## Component Architecture

Prefer reusable visualization components and a data boundary:

```text
Provider/API/SDK
-> request client / data-source resolver
-> response adapter
-> stable view model
-> reusable visualization component
```

Reusable components may include:

- `MetricCard`
- `TrendChart`
- `RankingBarChart`
- `CompositionChart`
- `FunnelChart`
- `CohortHeatmap`
- `MapWithRanking`
- `DataTable`
- `FilterPanel`
- `DashboardGrid`
- `DrillDownPanel`

Each reusable component should standardize loading, empty, error, tooltip, legend, format, resize, permission, export, theme, and accessibility behavior.

Adapters may normalize envelopes, names, nulls, enums, units, precision, and component-ready shapes. Adapters must not hide missing provider contracts by calculating global business formulas, large aggregations, rankings, pagination totals, or splitting unrelated component payloads from broad all-data responses.

## Theme, Color, And Accessibility

- Use global design tokens for background, surface, text, border, radius, spacing, and chart palette.
- Keep semantic colors consistent: normal, warning, abnormal, success, selected, disabled, up, down.
- Avoid one-off copied colors from prototypes when integrating into a frontend app.
- Do not use a one-note palette that turns every surface into the same hue.
- Do not rely on color alone. Use text, icons, arrows, line style, markers, or labels.
- Keep contrast sufficient and font sizes readable.
- Ensure tooltips, titles, and exported results are understandable without seeing the source code.

## Large Screen And Mobile Variants

Large-screen rules:

- Emphasize status, alerts, current values, and data freshness.
- Use fewer, larger charts with readable labels from a distance.
- Reduce complex filters and deep interactions.
- Support auto-refresh, last-success fallback, and clear failed/partial states.

Mobile rules:

- Prioritize KPI cards, short trends, key alerts, and drill-to-detail.
- Collapse filters and reduce visible chart count.
- Reduce table fields and move exact values to detail views.
- Avoid copying dense desktop grids directly onto mobile.

## Configuration-Driven Visualization

For report platforms, a visualization config may define:

- chart code/name/type
- dataset/provider id
- dimensions and metrics
- required filters and sort
- limit/Top N
- formatter and unit rules
- color/status rules
- interaction rules
- permission and export behavior
- cache/freshness behavior
- layout span/row/height

Configuration is useful only when it keeps metric口径, field permissions, formatting, and interactions governed. Do not make configuration a way for arbitrary raw SQL, unsafe formulas, or unbounded data requests to enter the frontend.

## Anti-Patterns

Treat these as findings unless explicitly accepted for a tiny prototype:

- Page is a flat collection of charts without a primary question or analysis path.
- First viewport hides the conclusion behind filters or decorative visuals.
- KPI numbers lack unit, time scope, comparison baseline, or口径.
- Chart type is chosen for looks instead of the business question.
- Too many charts, series, categories, legends, labels, or table rows render at once.
- Pie charts show many categories or trends.
- Dual-axis chart implies correlation without clarity.
- Averages hide distribution and outliers.
- Filters default to all historical data or unbounded detail.
- Frontend fetches broad all-data payloads and performs global filtering, sorting, pagination, ranking, aggregation, or permission narrowing locally.
- Frontend components calculate governed business formulas that belong to API/model/metric contracts.
- Errors, empty states, no-permission, stale data, or data delay render as blank areas.
- Colors are decorative, inconsistent, or the only carrier of meaning.
- Dashboard uses copied prototype one-off surfaces that do not match the app theme.

## Readiness Rules

Mark report data-visualization frontend readiness:

- `ready`: user purpose, information hierarchy, component choices, metric formatting/口径, filters, linkage, drill/trace, states, provider mapping, theme, performance controls, permissions, freshness/quality, runtime QA, environment profile, and handoff evidence are confirmed, implemented or documented, and testable for the stated scope.
- `partial`: local/demo/test scope can proceed with named limitations, retained mocks, missing optional interactions, limited responsive coverage, or incomplete production monitoring.
- `blocked`: core metric口径, provider contract, auth/permission, filter behavior, first-screen conclusion, component-ready data, global query execution scope, error/empty/no-permission states, or runtime verification is missing for a production-bound page.

## Handoff Evidence

Frontend function descriptions, QA notes, and handoff summaries should include:

- Page type, user, primary question, and first-screen answer.
- Component inventory and chart-choice rationale.
- Metric formatting, unit, precision,口径, freshness, and quality display.
- Filter defaults, option sources, cascade/reset behavior, and provider param mapping.
- Interaction map: chart click, drill-down, drill-through, drawer/modal, route, export, refresh.
- Provider mapping and adapter boundary.
- Performance decisions: point/category/table limits, lazy load, debounce, cancellation, cache, virtual scroll, downsampling/aggregation.
- State coverage: loading, empty, error, partial, no-permission, token-invalid, stale, timeout, data delay.
- Theme/color/accessibility decisions.
- Browser/runtime QA evidence: URL, profile, screenshots, console/network result, visual findings, build/test commands.
- Known partial/blocked behavior and owner questions.
