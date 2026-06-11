# 09 Report Decision Anti-AI Gate

Use this reference for report, dashboard, cockpit, BI, business-analysis, detail-query, topic-analysis, and report-designer pages.

Purpose: prevent a page that "looks like a report" but cannot support real business decisions. A report is not ready because it has KPI cards and charts. It is ready when a target user can understand what happened, why it happened, whether to trust the data, and what to do next.

This gate is derived from the user's pasted note about report-page AI-ization.

## Report-Specific AI Causes

Classify findings with these IDs.

| ID | Cause | Typical smell | Required countermeasure |
| --- | --- | --- | --- |
| `RPT-METRIC-SHELL` | Report shell without metric system. | Generic Revenue/Users/Growth/Conversion cards with no formula, grain, denominator, period, source, or owner. | Build a metric tree and metric dictionary before layout; every primary metric needs formula, unit, grain, baseline, source, and freshness. |
| `RPT-TEMPLATE-LAYOUT` | Default dashboard template layout. | Four KPI cards, two big charts, three small charts, right list, top date filter, all equal visual weight. | Organize by the decision path: judge status -> compare target -> locate driver -> inspect detail -> act. |
| `RPT-DECORATIVE-CHART` | Charts decorate instead of answering a question. | Pie/donut/radar/map/area charts appear for variety rather than analysis need. | Choose chart/table by task: target gap, trend, ranking, composition, distribution, relationship, cause, detail, or action. |
| `RPT-NO-DATA-STORY` | Results shown without explanation. | "Revenue +12%" or "Conversion -3%" with no driver, baseline, abnormality, or next step. | Add data story: current state, target/last-period comparison, driver decomposition, abnormality judgment, owner/action. |
| `RPT-GENERIC-INSIGHT` | Insight/explanation components look analytical but lack decision substance. | "智能洞察", "建议关注", "数据有所波动", polished conclusion cards with no evidence, affected object, action, source, or confidence. | Use Analysis & Insight components with `analysisInsightContract`: subtype, conclusion, evidence, affected object, comparison/change, action/trust/source/freshness, local-filter scope, and state rules. |
| `RPT-TOO-CLEAN-DATA` | Fake data is too perfect. | Smooth lines, all metrics rising, balanced shares, no missing rows, no dirty values, no latency, no conflicts. | Mock/provider data must include realistic variance, missing/zero/extreme values, delays, anomalies, long labels, and permission-limited cases. |
| `RPT-STATIC-FILTERS` | Filters are drawn but not real. | Date Range/Region/Category/Status controls change selected UI only or lack drilldown/export context. | Filters must map to data fields/API params, affect components, show active context, and carry into drilldown/export/share. |
| `RPT-VISUAL-OVER-DATA` | Visual polish harms data reading. | Gradient/glass/glow/card decoration competes with numbers, axes, labels, tables, and anomalies. | Prioritize numeric hierarchy, units, precision, axes, comparison, table readability, and anomaly/status color semantics. |
| `RPT-NO-INDUSTRY-SENSE` | All industries look like the same generic dashboard. | E-commerce, SaaS, finance, service, and supply-chain pages use the same metrics and terminology. | Use domain metric families, vocabulary, dimensions, constraints, and known business objects. |
| `RPT-NO-ACTION` | The user has no next move. | There is no owner, responsible role, drill path, operation entry, export, assignment, runbook, or decision prompt. | Every primary concern needs a next action: drilldown, detail table, owner contact, task, export, approve, assign, or runbook. |
| `RPT-DESIGNER-SHELL` | Report designer is only a three-panel shell. | Left component library, center canvas, right props, Preview/Save/Publish, but no data binding or validation behavior. | Report designer must cover data source, field binding, aggregation, filters, calculated fields, permissions, linkage, validation, versioning, preview, and publish flow. |

## Five Decision Questions

Before any report layout/spec/implementation is accepted, answer:

1. Who uses this page and at what decision moment?
2. What decision or judgment must they make after reading it?
3. How is every primary metric calculated?
4. Can abnormal movement be located to a driver, object, dimension, or record?
5. Can the user drill into real details or take a concrete next action?

If any answer is unknown, mark a gap. Do not fill the gap with generic KPIs or decorative charts.

## Metric System Gate

Every primary metric must declare:

- Business name and display name.
- Formula and denominator, including inclusion/exclusion rules such as refund, cancellation, partial payment, abnormal values, or manual adjustment.
- Grain: order, user-day, account-month, SKU-day, region-month, ticket, alert, task, reconciliation-pair, etc.
- Time basis: natural day, business day, fiscal period, snapshot date, rolling window, or latest batch.
- Unit, precision, null/zero rule, positive/negative direction, and color semantics.
- Baseline: target, budget, forecast, prior period, YoY, MoM, cohort, threshold, or SLA.
- Source system/table/API and freshness/latency.
- Owner or accountable role.
- Drilldown/detail path and export behavior when exact values matter.

Generic metrics such as Revenue, Users, Growth, Orders, Conversion, Retention, or Sales Performance are allowed only after this metadata is made domain-specific.

## Metric Tree And Diagnostic Path

For decision reports, define at least one metric tree or driver path.

Examples:

- Sales amount = order count * average order value.
- Order count = traffic * conversion rate.
- Profit = revenue - cost - refund - discount.
- Target completion = current amount / period target.
- SLA risk = unresolved tickets over threshold / active tickets.

The page should follow a diagnostic path:

1. Current state.
2. Target/threshold/baseline gap.
3. Time movement.
4. Driver or dimension contribution.
5. Abnormality and trust signal.
6. Detail records.
7. Owner/action.

Overview-only pages must still expose the path to diagnosis or detail.

## Realistic Data Gate

Mock/offline/provider sample data must include enough messy reality to test the report:

- At least one missing/zero/null case where relevant.
- At least one abnormal spike/drop or threshold breach when the report claims to detect anomalies.
- At least one non-default filter state that changes values, rows, and totals.
- At least one long label or high-cardinality dimension that forces table/overflow behavior.
- Freshness/source metadata and, when relevant, latency or partial-sync status.
- Permission-limited or no-permission state when roles/scopes exist.
- Reconciliation cases where KPI, chart, table, and drawer totals must match.

Do not use all-upward, smooth, balanced, perfectly clean data as the only prototype evidence.

## Chart/Table Decision Rules

- Target completion: prefer progress, bullet chart, target-gap card/table, or target variance table before generic bar charts.
- Driver diagnosis: prefer decomposition, contribution bars, ranked driver table, waterfall only when additive logic is real.
- Channel/product/region comparison: prefer sorted bars or tables with exact values; use pie/donut only for few-part composition.
- Abnormal movement: include baseline/threshold/average line, event marker, anomaly tag, and detail drill.
- Detail, audit, reconciliation, export, and exact-value tasks require tables or drawers; charts alone fail.
- Detail Tables are valid only when row-level lookup, comparison, evidence, export, or action is the actual decision need. A table-looking block without row grain, primary key/object identity, prioritized visible columns, default sort, numeric/status alignment, search/sort/pagination/export scope, row detail/action path, hidden-field disclosure, and realistic empty/error/permission states is a source-table dump, not a decision table.
- Analysis & Insight components are valid only when they explain a concrete decision point. A conclusion card, insight card, anomaly/risk note, attribution card, recommendation, definition/data-quality/forecast note, chart annotation, explanatory empty state, or permission/no-result/delay note without `analysisInsightContract`, conclusion-before-evidence structure, affected object, evidence, action/trust/source/freshness, tooltip/detail path, and state rules is generic AI-like copy, not decision support.
- Composite Panels are valid only when multiple child components form one decision loop under one business topic. A polished card that combines unrelated KPIs, charts, Top lists, and tables without `compositePanelContract`, one primary child, child roles/priorities, shared filter context, linked interaction, shared legend/unit behavior, responsive fallback, and parent/child state scope is a miniature dashboard collage, not decision support.
- Complex/grouped table headers are valid only when fields have real business grouping such as metric family, actual/target/variance, current/YoY/MoM, time period, financial section, or pivot hierarchy. A professional-looking multi-row header without `columnTree`/nested columns, real leaf fields, computed spans/depth, unit/definition disclosure, fixed header/frozen column behavior, filter separation, and useful body rows is decorative structure, not decision support.
- Pivot Tables are valid only when multidimensional aggregated cross-summary is the decision need. A table-looking block without row dimensions, column dimensions, measure metadata, aggregation functions/formulas, subtotal/grand-total rules, rate numerator/denominator recomputation, fixed headers/frozen row dimensions, density fallback, tooltip/drilldown evidence, and S2/project analytical renderer choice is a decorative matrix or source dump, not a pivot.
- High-cardinality dimensions use tables, search, grouping, Top N + "other", pagination, or drilldown, not unreadable charts.
- Maps are valid only when geography is the actual decision dimension. A valid map must have geography fields or coordinates, a declared map resource/projection, exact-value tooltip/detail, and a fallback for dense points, routes, or region labels.
- Candlestick/K-line charts are valid only when ordered OHLC data and price volatility are the actual decision dimension. A simple single-price trend should use line/area, and dense market histories need dataZoom/recent-window or table fallback.
- Boxplot charts are valid only when distribution, stability, spread, or outlier comparison is the actual decision dimension. Aggregate ranking should use bar/table; tiny samples need point/table fallback and an explicit sample-count warning.
- Heatmaps are valid only when two-dimensional color distribution helps the decision, such as time pattern, cohort retention, utilization, risk grid, or correlation structure. One-dimensional ranking, small exact comparisons, missing color legend, missing-vs-zero ambiguity, or huge unsampled matrices are decorative chart failures.
- Combo charts are valid only when scale and rate/trend/target share one category/time axis and have a named business relationship such as conversion, efficiency, target attainment, or input-output. A dual-axis or bar-line visual without bar/line metric roles, visible units on both axes, series limits, category-density fallback, exact tooltip, and split-chart fallback is a decorative correlation-looking chart failure.
- Path charts are valid only when ordered movement and breakpoints are the actual decision dimension. A journey-looking line without start/end/order, transition metrics, conversion/drop-off evidence, Top N/aggregation, or node/link detail is a decorative process graphic failure.
- Funnel charts are valid only when ordered stage conversion, retention, or loss is the actual decision dimension and stages share one population or a documented cohort rule. A descending visual without stage schema/order, value/unit, entry share, stage conversion, drop value/rate, total conversion, denominator-zero handling, stage-count fallback, exact tooltip/detail, and a clear fallback for ranking/trend/branching tasks is a decorative funnel failure.
- Sankey diagrams are valid only when source-to-target flow, allocation, transfer, conversion, or loss is the actual decision dimension. A ribbon-looking visual without node schema, `source`/`target`/`value` links, layer/stage order, non-negative flow values, Top N/`其他`, flow-width mapping, loss/unknown handling, legend/filter separation, and node/link share tooltip evidence is a decorative flow graphic failure.
- Treemaps are valid only when hierarchical composition and scale/share are the actual decision dimension. A colorful rectangle mosaic without hierarchy schema, non-negative additive area metric, Top N/`其他`, label thresholds, color semantics, breadcrumb/drilldown when deep, and tooltip/detail evidence is a decorative chart failure.
- Sunburst charts are valid only when hierarchy path plus composition share are the actual decision dimension. A multi-ring visual without hierarchy schema, non-negative additive angle metric, total/parent share formulas, visible ring/depth budget, Top N/`其他`, center content, sector-label thresholds, breadcrumb/drilldown when deep, and full path/value/share tooltip evidence is a decorative chart failure.
- Tree charts are valid only when hierarchy, parent-child ownership, decomposition, or upstream/downstream levels are the actual decision dimension. A hierarchy-looking diagram without root node, parent-child fields, visible depth, expand/collapse, Top N/`+N` aggregation, node detail, or multiple-parent handling is a decorative org-chart failure.
- Relation graphs are valid only when entity connections are the actual decision dimension. A network-looking background without node/edge schema, direction/weight semantics, density control, neighborhood focus, or node/edge evidence is a decorative chart failure.
- Parallel coordinates are valid only when multi-metric object profile, similarity, anomaly, or multi-factor screening is the actual decision dimension with `3+` metrics. A line-web visual without object/sample schema, ordered dimension contract, per-axis scales/units/directions, sample-density strategy, highlight/brush rules, and exact object tooltip/detail is a decorative chart failure.
- Gauge is valid only when one bounded progress/status metric needs quick current-state judgment. A mechanical-looking dial without min/max range, current value, unit, target/threshold semantics, status color business rule, center-value priority, sparse ticks, exact tooltip/detail, and fallback for comparison/trend/exact-audit tasks is a decorative gauge failure.
- Radar is valid only when comparable dimensions share a scale and the shape itself supports the decision.

## Filter, Drilldown, And Linkage Gate

Every primary filter/control must declare:

- Data field/API/query mapping.
- Default and at least one non-default state.
- Affected components.
- Whether it changes row scope only or changes component schema/metric口径.
- Active-condition display.
- Reset/share/export behavior.
- Permission behavior.

Every clickable KPI/chart/table mark must declare:

- Event and payload.
- Target drawer/modal/page/export/runbook.
- Filter and period context passed forward.
- Stale-selection behavior when filters remove the selected object.

Static screenshots of charts and filters are not report products.

## Trust And Action Details

A real decision report normally needs several trust/action details:

- Data updated time.
- Data source or source-system label.
- Statistical period and snapshot/batch/version.
- Metric口径 or method note.
- Delay/partial-sync warning.
- Abnormal marker and explanation.
- Permission scope.
- Export/download scope.
- Detail table or drawer.
- Annotation/comment.
- Owner/responsible role.
- Processing status, task, approval, assignment, or runbook link.

These details may be compact, but they cannot be absent from implementation-ready work unless explicitly out of scope.

## Industry Sense Gate

Use domain vocabulary and metric families. Do not make all business domains look like generic technology dashboards.

Examples:

- E-commerce: GMV, paid orders, AOV, conversion rate, refund rate, SKU sell-through, inventory, channel ROI.
- SaaS: MRR, ARR, churn, expansion, activation, retention, seat usage, trial conversion, cohort.
- Finance: revenue, cost, gross margin, expense, budget execution, cash flow, AR/AP, profit margin.
- Customer service: ticket volume, first response time, resolution time, SLA, satisfaction, reopen rate, agent load.
- Supply chain: inventory turnover, stockout rate, fulfillment delay, on-time rate, supplier performance, backlog.

If the business domain is unknown, use neutral placeholders but mark them as assumptions. Do not silently use generic web/SaaS metrics.

## Report Designer Gate

For report-designer/editor pages, a three-panel shell is not enough. The design must cover:

- Data source selection and connection state.
- Field binding for dimensions and metrics.
- Aggregation: sum, avg, count, distinct count, min/max, custom.
- Calculated fields and expression editor.
- Filter/parameter configuration.
- Sorting, grouping, Top N, and drilldown/linkage configuration.
- Permission and data-scope settings.
- Component layer/order, alignment, snapping, lock/hide.
- Undo/redo, version history, publish approval.
- Real-data preview, validation errors, performance warnings.
- Export PDF/Excel, scheduled send, embed/share settings.
- Mobile/responsive layout configuration when in scope.

If a designer only says "drag components here" and lacks data-to-report behavior, record `RPT-DESIGNER-SHELL`.

## Output Requirements

Any workflow applying this gate should output:

- `reportDecisionRisk`: pass/partial/fail.
- `RPT-*` causes found or ruled out.
- Metric tree or reason it is not applicable.
- Metric dictionary completeness: formula, grain, denominator, period, source, owner, baseline, unit.
- Data story path: status -> target/baseline -> driver -> abnormality -> detail -> action.
- Realistic data evidence: messy states and reconciliation cases.
- Filter/drilldown/linkage proof.
- Trust/action details included or scoped out.
- Industry vocabulary/domain metric check.
- Report designer capability check when applicable.

## Quality Gate

- `RPT-METRIC-SHELL`, `RPT-NO-DATA-STORY`, `RPT-GENERIC-INSIGHT`, `RPT-STATIC-FILTERS`, or `RPT-NO-ACTION` is at least `major` for report implementation work.
- `RPT-TOO-CLEAN-DATA` is at least `major` when mock/offline data is used as prototype evidence.
- `RPT-DECORATIVE-CHART` is at least `major` when charts replace required exact-value tables, drilldown, or diagnostic evidence.
- `RPT-DESIGNER-SHELL` is at least `major` for report-designer/editor pages.
- Do not mark a report `ready` if the five decision questions cannot be answered.
