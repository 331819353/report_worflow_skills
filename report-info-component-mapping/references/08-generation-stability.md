# 08 Generation Stability

Use this reference whenever the output may become a reusable specification, widget config, mock dataset, prototype implementation, or generated file.

## Stability Goal

The same business input should produce the same:

- Primary report type and secondary report-type routing.
- Display theme and selected pattern-card IDs when supplied by the prototype workflow.
- Answer atoms and component priorities.
- Sample/source module roles when restoration input exists.
- Component IDs, parent block IDs, sub-block IDs, dataset IDs, filter IDs, and action names.
- `visualType`, control semantics, component schema impact, layout span category, row grain, and required fields.
- Binding matrix columns and validation cases.

If a later revision changes these, it must be because the business question, data shape, template capability, or user instruction changed.

## Generation Modes

Choose one mode before generating.

- `concept-map`: for design discussion only. Output answer atoms and component bundle; do not invent detailed rows.
- `spec-contract`: default when the user asks for design, optimization, or handoff. Output components, mock/data model, filters, interactions, and binding matrix.
- `prototype-config`: when creating or repairing runnable Vue/template files. Output or implement config-compatible IDs, datasets, filters, actions, and validation cases.

When mode is unclear, use `spec-contract`.

For `prototype-config` targeting bundled dashboard templates, the physical mock-data target is `src/data/dashboard.dataset.json`: filter option datasets go under `filterData`, business/component datasets go under `businessData`, and widgets/filters bind through `widget.data` or `filters[].source`. Do not create generated `*.ts` fixture modules for mock rows, arrays, or payloads.

## Controlled Vocabularies

Use these values unless the target project explicitly defines a different vocabulary.

- `answerAtom`: `status`, `targetGap`, `variance`, `trend`, `structure`, `ranking`, `process`, `cause`, `anomaly`, `detail`, `action`, `evidence`, `dataTrust`, `narrative`.
- `semanticRole`: `judgment`, `comparison`, `movement`, `location`, `rank`, `conversion`, `driver`, `risk`, `record`, `operation`, `proof`, `trust`, `story`.
- `block`: `header`, `filter`, `summary`, `kpi`, `targetVariance`, `trend`, `structure`, `ranking`, `process`, `decomposition`, `alert`, `detail`, `taskAction`, `evidence`, `dataTrust`, `footer`.
- `priority`: `must-have`, `should-have`, `optional`.
- `componentType`: `card`, `chart`, `table`, `text-summary`, `drawer`, `task`, `action`, `custom`.
- `visualType`: `line`, `bar`, `combo`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, `pivot`, `other`.
- `actionType`: `openModal`, `closeModal`, `setFilters`, `resetFilters`, `navigateUrl`, `print`, `fullscreen`, `refresh`, or a named custom action registered in the project.
- `filterValueType`: `single`, `multiple`, `range`, `keyword`, `date`, `treePath`, `enum`, `toggle`.
- `controlSemantics`: `perspective-switch`, `global-filter`, `local-filter`, `drilldown-param`.
- `componentSchemaImpact`: `none`, `row-scope-only`, `metric-name`, `metric-set`, `component-set`, `table-schema`, `dimension-set`, `definition-change`, `domain-vocabulary`, `mixed`.
- `navigationMetricKind`: `percentage`, `ranking`, `status-light`.
- `periodBehavior`: `selected-period`, `current-period`, `comparison-period`, `rolling-window`, `latest-snapshot`, `static-display-copy`.
- `filterExecutionStage`: `sql-where`, `source-query`, `provider-query`, `repository-query`, `resolver-param`, `redis-cache`, `precompute-cache`, `component-local`, `bounded-local`, `blocked`.
- `dataPolicy`: `bound`, `static`, `external`. Prefer `bound`.
- `sampleModuleRole`: `businessRequired`, `sampleStructure`, `optionalEnhancement`.
- `subBlockRole`: `summary`, `evidence`, `detail`, `control`, `peer`, `state`, `microGroup`.
- `displayTheme`: `detail-table`, `summary-stat`, `business-dashboard`, `exploratory-analysis`, `management-report`, `monitoring-alert`.
- `patternRole`: `primary-structure`, `supporting-evidence`, `interaction`, `state`, `export`, `governance`, `acceptance-only`.

Do not create near-synonyms such as `trendLine`, `line-chart`, `metricCard`, or `dataTable` in contract fields. Put display labels in titles, not enum fields.

## Naming Rules

- Component IDs: lowerCamelCase, semantic and stable, such as `attritionTrend`, `riskEmployeeTable`, `revenueGapWaterfall`.
- Parent block IDs: lowerCamelCase ending with `Block`, such as `attritionOverviewBlock` or `riskEvidenceBlock`.
- Sub-block IDs: lowerCamelCase ending with `SubBlock`, such as `trendChartSubBlock` or `topRiskListSubBlock`.
- Dataset IDs: lower_snake_case with prefixes: `dim_`, `fact_`, `agg_`, `ref_`, `log_`.
- Filter IDs: lowerCamelCase and scope-oriented, such as `period`, `orgId`, `jobFamily`, `severity`, `ownerId`.
- Perspective IDs: lowerCamelCase and view-oriented, such as `businessDomain`, `reportTheme`, `managementObject`, or `analysisPerspective`. Do not reuse ordinary filter IDs for first-level perspective switching.
- Action event names: lowerCamelCase plus event type, such as `barClick`, `rowClick`, `stageClick`, `taskSubmit`.
- Modal IDs and drawer IDs: lowerCamelCase ending with `Modal` or `Drawer`.
- Field names in mock datasets: lower_snake_case unless the existing project already uses camelCase.
- Display labels may be Chinese; IDs and field names should stay ASCII.
- Source pattern IDs: `<displayTheme>-NN`, such as `detail-table-01`, `summary-stat-05`, or `monitoring-alert-12`.

When revising an existing mapping, preserve IDs unless the component's semantic role changes. Add new components instead of renaming existing ones.

## Quantity Bounds

Use these default bounds to reduce random output drift.

- First viewport: 3-7 meaningful components.
- Full report page: 6-14 components unless the user asks for a dense suite.
- Must-have components: 3-8.
- Main filter surface: 3-6 global/page filters. In bundled templates this is `filters[]` plus native trigger/panel/popover/drawer, not a visual toolbar.
- Advanced filters: 0-12 filters.
- KPI strip: 3-8 cards.
- Top/Bottom lists: default Top 5 or Top 10; state which one.
- Detail table: 5-8 visible columns by default, 8-12 only in large blocks, with row drawer/export/column settings for full fields.
- Mock time coverage: 12-13 months for monthly trend, 30 days for daily rolling view, selected + previous period for MoM, selected + prior-year comparable period for YoY.

If more components are needed, group them into tabs, drawers, secondary sections, or follow-up pages rather than flattening them into one screen.

## Deterministic Selection Order

When several components are plausible, choose in this order:

1. KPI/status card for current judgment.
2. Target/variance card or bullet/progress when target exists.
3. Gauge only when one bounded status/progress metric needs range and threshold judgment.
4. Combo chart only when scale + rate/trend/target must be read together on one shared category/time axis.
5. Trend chart when time movement matters or period filters exist.
6. Structure/ranking chart when the user must locate objects.
7. Process/funnel only when ordered stages, shared population/cohort logic, and conversion/drop formulas exist.
8. Decomposition/waterfall only when cause or additive contribution exists.
9. Detail table/drawer when exact records or evidence matter.
10. Task/action block when closure or responsibility matters.
11. Data-trust block when sources, versions, or differences matter.

If two components answer the same atom, keep the one earlier in this order unless the later one provides necessary evidence or action.

## Fallback Rules

- Missing ordered stages, shared population/cohort logic, or conversion/drop formulas: do not use funnel; use structure bar, ranking table, process table, path chart, or Sankey according to the actual question.
- Missing Gauge min/max range, status/threshold rule, or bounded metric semantics: do not use Gauge; use KPI card, progress bar, target card, bar/table, or line chart according to the actual question.
- Missing paired business relationship, shared ordered category/time grain, axis units, or valid series limit: do not use Combo; use separate bar and line charts, target/variance card, trend chart, or table according to the actual question.
- Missing row grain, primary key, default sort, visible column priority, or pagination/search/export scope: do not finalize a Detail Table; use a bounded list/summary card while row evidence is pending, or mark the table contract as a data gap.
- Missing additive contribution: do not use waterfall; use driver table, contribution bar, or narrative explanation.
- Missing geographic meaning: do not use map; use organization bar/matrix.
- Missing stable row IDs: do not create click-through drawer; use tooltip/popover until IDs are defined.
- Missing time coverage: do not expose multi-period filter or trend claim; mark fixed period.
- Missing permission model: include `permission_scope` placeholder and no-permission validation case.
- Missing API contract: produce mock dataset contract and mark data source as mock/resolver candidate.
- Unknown template support: use `other` only with a named custom widget and explicit reason; otherwise choose from known `visualType` values.
- Sample/source module visibility: do not mark as `must-have` unless it directly answers the user's stated report question; otherwise preserve as `sampleStructure` or label as `optionalEnhancement`.

## Output Stability Rules

- Always include a binding matrix for `spec-contract` and `prototype-config` modes.
- Preserve upstream `displayTheme` and `sourcePatternIds` in binding rows unless a pattern is explicitly rejected as out of scope.
- Use the same field name for the same concept across datasets, filters, actions, and matrix rows.
- Classify every user control before placement with `controlSemantics`. A control that changes metric names, metric set, component set, table headers, dimensions, metric definition/口径, report subject, or business-domain vocabulary is `perspective-switch`, not a normal filter.
- Every binding matrix row must include `controlSemantics` and `componentSchemaImpact`. Use `row-scope-only` only when the control keeps the same component schema and only narrows rows or values.
- Every perspective-navigation percentage, ranking, or status light must include stable lineage fields: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
- Filter option `meta` must be treated as static/dimensional only. Do not place dynamic KPI values in `filterData.meta` unless the value is explicitly `static-display-copy`.
- For bundled template prototypes, each mock dataset ID must map to a `dashboard.dataset.json` key or to an explicit API/provider resolver. A generated TS data file is not an acceptable mock dataset target.
- Use a controlled `filterExecutionStage` for primary filters and implementation-handoff components. Global/page filters should prefer `sql-where`, `source-query`, `provider-query`, or `repository-query`; component-internal filters may use `component-local`; `blocked` is required when the current design depends on page/API-level full-materialize-then-filter behavior.
- Do not alternate between `org`, `organization`, `orgId`, and `department` for the same scope. Pick one and map aliases explicitly.
- Do not mix Chinese labels into IDs or query params.
- State assumptions in one section; do not hide assumptions inside component titles.
- Every `must-have` component must have a dataset, fields, filters, interaction state, update trigger, and validation case.
- Every component inside a composed parent block must declare `parentBlockId`, `subBlockId`, `subBlockRole`, local sub-block layout, `subBlockInset:5px`, and `subBlockGap:5px`.
- Every selected pattern card must map to at least one component/control/data/API/interaction/export/operations/validation row; otherwise mark it `futurePattern` or remove it from the selected set.
- Every primary filter must list affected components.
- Every primary/global filter must state whether it narrows data through SQL/source/provider/repository/resolver/precompute/cache before component construction; every component-internal filter must state the already fetched component dataset it operates on.
- First-level business domain, report theme, management object, subject area, or analysis perspective must map to navigation, route, tab, segment, or an explicit perspective state. Do not encode it only as a template `filters[]` item unless an accepted local project contract proves it is row-scope-only.
- Every clickable component must list event name, payload fields, target action, and stale-state behavior.

## Acceptance Gate

Before finalizing, answer yes to all:

- Can another agent implement the same component IDs and dataset IDs from this output?
- Can another agent trace every selected pattern card to implemented rows or explicit future/gap status?
- Can every first-screen value be traced to a dataset or static policy?
- Can every primary filter be tested against at least one affected component?
- Can every control be classified as perspective switch, global filter, local filter, or drilldown param without hiding schema-changing behavior inside ordinary filters?
- For every non-default perspective, can QA verify changed metric names, titles/summaries, table dimensions or headers, component set, specialty metrics, and口径 where the contract says they should change?
- Can every navigation percentage, ranking, and status light be traced to `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior` instead of filter option metadata?
- Can every global/page-level filter be tested without relying on full-materialize-then-filter behavior, and can every component-internal filter be tested against already fetched component data?
- Can every clickable mark or row produce a stable action payload?
- Can the page still behave predictably when filters return empty data or remove a selected object?
- Are unsupported chart choices explicitly ruled out by fallback rules?
- Are all enums from controlled vocabularies or project-defined local types?
