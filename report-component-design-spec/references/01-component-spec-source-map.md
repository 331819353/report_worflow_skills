# Component Spec Source Map

Use this map to load only the source references needed for the component families in scope.

| Component family | Primary source references |
| --- | --- |
| Shared foundation, state, overflow, typography | `$report-component-style-design` `references/01-shared-foundation.md` |
| Page/global and component-local filters | `$report-component-style-design` `references/02-filter-controls.md`, `references/10-in-component-controls.md`, `references/12a-placement-foundation-controls.md` |
| Analysis & Insight / text summaries | `$report-component-style-design` `references/03-text-summary.md`, `references/12b-placement-insight-kpi.md` |
| KPI and metric cards | `$report-component-style-design` `references/04-kpi-metric-cards.md`, `references/12b-placement-insight-kpi.md` |
| ECharts charts | `$report-component-style-design` `references/05-echarts-charts.md` plus the matching placement split file |
| Detail tables, Pivot/S2, complex headers | `$report-component-style-design` `references/06-analytical-tables.md`, `references/12f-placement-composite-tables.md` |
| Cards, lists, tasks, status blocks | `$report-component-style-design` `references/07-cards-lists-tasks.md` |
| Drawers, modals, detail panels | `$report-component-style-design` `references/08-drawers-detail-panels.md` |
| Flow/hierarchy/complex diagrams | `$report-component-style-design` `references/09-complex-diagrams.md`, `references/12e-placement-flow-hierarchy-charts.md` |
| Composite Panels / multi-component analysis cards | `$report-component-style-design` `references/12f-placement-composite-tables.md` plus child component references |
| Acceptance gates | `$report-component-style-design` `references/12-component-acceptance-gates.md` |

For report-wide rules such as metric口径, chart/table format, filters, states, and acceptance, also load `$report-design-system-governance` guideline references.
