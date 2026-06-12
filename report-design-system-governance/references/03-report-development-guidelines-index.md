# Report Development Design Core Guidelines Index

Use this index for the distilled report-development design standard. It is derived from the provided report design guideline materials, but the references here are not raw document storage and should not require re-reading the original files.

## Core Standard Scope

This distilled standard covers:

- Report development method and role collaboration.
- Requirement breakdown and business-question framing.
- Metric dictionary, calculation口径, unit, precision, numeric display contract, and data-source explanation.
- Page hierarchy, module priority, layout spacing, and card structure.
- Chart anatomy, chart selection, chart color, warning color, tooltip, labels, and drilldown/link rules.
- Table alignment, column contract, pagination, export, and operation rules.
- Text, number, date, percentage, empty value, warning display formats, and numeric rounding/export consistency.
- Query/filter controls, buttons, inputs, selectors, cascaders, dates, navigation, switches.
- Loading, empty, error, permission, data anomaly, performance, acceptance, and reusable template rules.
- Leadership-friendly sample patterns for long operating-analysis pages, high-density diagnostic dashboards, asset/resource overviews, and 16:9 cockpits.
- Anti-AI design checks for product context, concrete copy, forbidden generic aesthetics, edge states, accessibility, and implementation realism.
- Report decision anti-AI checks for metric口径, metric tree, diagnostic path, realistic dirty data, filters/drilldowns, trust/action details, industry vocabulary, and report designer complexity.

## Skill Boundary

This report guideline is for PC Web reports, business analysis dashboards, detail-query reports, and topic analysis pages.

Use with:

- `$report-design-workflow` for generic report prototype/design orchestration, or the specialized prototype workflow when the user explicitly asks for 自助分析、指标看板、分析报告、or 明细报表.
- `$report-design-system-governance` for reusable report UI standards and governance.
- `$report-info-component-mapping` for business question to component/data/filter/interaction contracts.
- `$report-visual-layout-design` for page structure, first viewport, card grid, filter region, and layout fit.
- `$report-component-style-design` for KPI cards, charts, tables, filters, states, and component readability.
- `$frontend-development-workflow`, `$api-*`, `$data-*`, and `$testing-*` skills when the guideline moves into implementation, contracts, data consistency, and acceptance verification.

Do not use `$haier-enterprise-app-ui-design-spec` as the primary analytical report guideline. That skill supplies the inherited Haier enterprise application UI baseline and remains required for Haier/enterprise report pages unless an explicit non-Haier/native/neutral exception exists. This distilled report standard owns report-specific hierarchy, visualization, tables, filters, metric display, engineering handoff, and acceptance.

## Reference Map

| Need | Read |
| --- | --- |
| Report guideline boundary and routing | This file |
| Report principles, development stages, requirements, metric口径, layout, card priority | `04-report-requirements-metrics-layout-guidelines.md` |
| Chart anatomy, chart selection, series/warning colors, table rules, typography, number/date format | `05-report-charts-tables-format-guidelines.md` |
| Query/filter controls, states, permissions, data anomalies, frontend implementation, performance, collaboration, acceptance, templates | `06-report-filters-states-engineering-acceptance.md` |
| Design highlights from proven leadership/operating report samples, reusable page patterns, reading paths, density, and visual acceptance | `07-exemplary-report-design-patterns.md` |
| Anti-AI design gate for generic aesthetics, empty copy, first-screen-only completion, missing states/accessibility, and sample-like engineering | `08-anti-ai-design-gate.md` |
| Report decision anti-AI gate for avoiding empty dashboard shells and enforcing metric systems, data stories, realistic data, linkage, action, and industry sense | `09-report-decision-anti-ai-gate.md` |
| Numeric precision, rounding, unit scaling, tooltip/export precision, and formatter ownership | `$metric-number-display-contract` |

Load only the smallest reference needed. Do not load all report guideline references by default.

## Conflict Policy

- If this report standard and Haier application UI disagree, first separate ownership: Haier owns company tokens, typography, color, spacing, radius, shadows, base controls, states, brand/logo, and cross-platform behavior; report-specific rules own analytical hierarchy, chart/table/filter geometry, metric display, density, and acceptance. Override inherited Haier rules only with a named report-specific reason and recorded exception.
- If this report standard and bundled template tokens disagree, record a template adoption decision in `$report-design-system-governance`; do not silently override template assets.
- If a project must deviate from this distilled standard, record the exception owner, affected surface, reason, expiry or review date, and regression evidence.
