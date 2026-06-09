# Report Development Design Core Guidelines Index

Use this index for the distilled report-development design standard. It is derived from the provided report design guideline materials, but the references here are not raw document storage and should not require re-reading the original files.

## Core Standard Scope

This distilled standard covers:

- Report development method and role collaboration.
- Requirement breakdown and business-question framing.
- Metric dictionary, calculation口径, unit, precision, and data-source explanation.
- Page hierarchy, module priority, layout spacing, and card structure.
- Chart anatomy, chart selection, chart color, warning color, tooltip, labels, and drilldown/link rules.
- Table alignment, column contract, pagination, export, and operation rules.
- Text, number, date, percentage, empty value, and warning display formats.
- Query/filter controls, buttons, inputs, selectors, cascaders, dates, navigation, switches.
- Loading, empty, error, permission, data anomaly, performance, acceptance, and reusable template rules.
- Leadership-friendly sample patterns for long operating-analysis pages, high-density diagnostic dashboards, asset/resource overviews, and 16:9 cockpits.

## Skill Boundary

This report guideline is for PC Web reports, business analysis dashboards, detail-query reports, and topic analysis pages.

Use with:

- `$report-design-workflow` for report prototype/design orchestration.
- `$report-design-system-governance` for reusable report UI standards and governance.
- `$report-info-component-mapping` for business question to component/data/filter/interaction contracts.
- `$report-visual-layout-design` for page structure, first viewport, card grid, filter region, and layout fit.
- `$report-component-style-design` for KPI cards, charts, tables, filters, states, and component readability.
- `$frontend-development-workflow`, `$api-*`, `$data-*`, and `$testing-*` skills when the guideline moves into implementation, contracts, data consistency, and acceptance verification.

Do not use `$haier-enterprise-app-ui-design-spec` as the primary report guideline. That skill supplies the common Haier enterprise UI baseline; this distilled report standard owns report-specific hierarchy, visualization, tables, filters, metric display, engineering handoff, and acceptance.

## Reference Map

| Need | Read |
| --- | --- |
| Report guideline boundary and routing | This file |
| Report principles, development stages, requirements, metric口径, layout, card priority | `04-report-requirements-metrics-layout-guidelines.md` |
| Chart anatomy, chart selection, series/warning colors, table rules, typography, number/date format | `05-report-charts-tables-format-guidelines.md` |
| Query/filter controls, states, permissions, data anomalies, frontend implementation, performance, collaboration, acceptance, templates | `06-report-filters-states-engineering-acceptance.md` |
| Design highlights from proven leadership/operating report samples, reusable page patterns, reading paths, density, and visual acceptance | `07-exemplary-report-design-patterns.md` |

Load only the smallest reference needed. Do not load all report guideline references by default.

## Conflict Policy

- If this report standard and common Haier app UI disagree, report-specific rules win for report/dashboard pages; Haier app UI remains the company baseline for common components.
- If this report standard and bundled template tokens disagree, record a template adoption decision in `$report-design-system-governance`; do not silently override template assets.
- If a project must deviate from this distilled standard, record the exception owner, affected surface, reason, expiry or review date, and regression evidence.
