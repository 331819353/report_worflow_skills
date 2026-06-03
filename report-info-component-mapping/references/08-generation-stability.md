# 08 Generation Stability

Use this reference whenever the output may become a reusable specification, widget config, mock dataset, prototype implementation, or generated file.

## Stability Goal

The same business input should produce the same:

- Primary report type and secondary report-type routing.
- Answer atoms and component priorities.
- Sample/source module roles when restoration input exists.
- Component IDs, dataset IDs, filter IDs, and action names.
- `visualType`, layout span category, row grain, and required fields.
- Binding matrix columns and validation cases.

If a later revision changes these, it must be because the business question, data shape, template capability, or user instruction changed.

## Generation Modes

Choose one mode before generating.

- `concept-map`: for design discussion only. Output answer atoms and component bundle; do not invent detailed rows.
- `spec-contract`: default when the user asks for design, optimization, or handoff. Output components, mock/data model, filters, interactions, and binding matrix.
- `prototype-config`: when creating or repairing runnable Vue/template files. Output or implement config-compatible IDs, datasets, filters, actions, and validation cases.

When mode is unclear, use `spec-contract`.

## Controlled Vocabularies

Use these values unless the target project explicitly defines a different vocabulary.

- `answerAtom`: `status`, `targetGap`, `variance`, `trend`, `structure`, `ranking`, `process`, `cause`, `anomaly`, `detail`, `action`, `evidence`, `dataTrust`, `narrative`.
- `semanticRole`: `judgment`, `comparison`, `movement`, `location`, `rank`, `conversion`, `driver`, `risk`, `record`, `operation`, `proof`, `trust`, `story`.
- `block`: `header`, `filter`, `summary`, `kpi`, `targetVariance`, `trend`, `structure`, `ranking`, `process`, `decomposition`, `alert`, `detail`, `taskAction`, `evidence`, `dataTrust`, `footer`.
- `priority`: `must-have`, `should-have`, `optional`.
- `componentType`: `card`, `chart`, `table`, `text-summary`, `drawer`, `task`, `action`, `custom`.
- `visualType`: `line`, `bar`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, `other`.
- `actionType`: `openModal`, `closeModal`, `setFilters`, `resetFilters`, `navigateUrl`, `print`, `fullscreen`, `refresh`, or a named custom action registered in the project.
- `filterValueType`: `single`, `multiple`, `range`, `keyword`, `date`, `treePath`, `enum`, `toggle`.
- `filterExecutionStage`: `sql-where`, `source-query`, `provider-query`, `repository-query`, `resolver-param`, `redis-cache`, `precompute-cache`, `component-local`, `bounded-local`, `blocked`.
- `dataPolicy`: `bound`, `static`, `external`. Prefer `bound`.
- `sampleModuleRole`: `businessRequired`, `sampleStructure`, `optionalEnhancement`.

Do not create near-synonyms such as `trendLine`, `line-chart`, `metricCard`, or `dataTable` in contract fields. Put display labels in titles, not enum fields.

## Naming Rules

- Component IDs: lowerCamelCase, semantic and stable, such as `attritionTrend`, `riskEmployeeTable`, `revenueGapWaterfall`.
- Dataset IDs: lower_snake_case with prefixes: `dim_`, `fact_`, `agg_`, `ref_`, `log_`.
- Filter IDs: lowerCamelCase and scope-oriented, such as `period`, `orgId`, `jobFamily`, `severity`, `ownerId`.
- Action event names: lowerCamelCase plus event type, such as `barClick`, `rowClick`, `stageClick`, `taskSubmit`.
- Modal IDs and drawer IDs: lowerCamelCase ending with `Modal` or `Drawer`.
- Field names in mock datasets: lower_snake_case unless the existing project already uses camelCase.
- Display labels may be Chinese; IDs and field names should stay ASCII.

When revising an existing mapping, preserve IDs unless the component's semantic role changes. Add new components instead of renaming existing ones.

## Quantity Bounds

Use these default bounds to reduce random output drift.

- First viewport: 3-7 meaningful components.
- Full report page: 6-14 components unless the user asks for a dense suite.
- Must-have components: 3-8.
- Main filter bar: 3-6 filters.
- Advanced filters: 0-12 filters.
- KPI strip: 3-8 cards.
- Top/Bottom lists: default Top 5 or Top 10; state which one.
- Detail table: 8-12 visible columns by default, with drawer/export for full fields.
- Mock time coverage: 12-13 months for monthly trend, 30 days for daily rolling view, selected + previous period for MoM, selected + prior-year comparable period for YoY.

If more components are needed, group them into tabs, drawers, secondary sections, or follow-up pages rather than flattening them into one screen.

## Deterministic Selection Order

When several components are plausible, choose in this order:

1. KPI/status card for current judgment.
2. Target/variance card or bullet/progress when target exists.
3. Trend chart when time movement matters or period filters exist.
4. Structure/ranking chart when the user must locate objects.
5. Process/funnel only when ordered stages exist.
6. Decomposition/waterfall only when cause or additive contribution exists.
7. Detail table/drawer when exact records or evidence matter.
8. Task/action block when closure or responsibility matters.
9. Data-trust block when sources, versions, or differences matter.

If two components answer the same atom, keep the one earlier in this order unless the later one provides necessary evidence or action.

## Fallback Rules

- Missing ordered stages: do not use funnel; use structure bar, ranking table, or process table.
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
- Use the same field name for the same concept across datasets, filters, actions, and matrix rows.
- Use a controlled `filterExecutionStage` for primary filters and implementation-handoff components. Global/page filters should prefer `sql-where`, `source-query`, `provider-query`, or `repository-query`; component-internal filters may use `component-local`; `blocked` is required when the current design depends on page/API-level full-materialize-then-filter behavior.
- Do not alternate between `org`, `organization`, `orgId`, and `department` for the same scope. Pick one and map aliases explicitly.
- Do not mix Chinese labels into IDs or query params.
- State assumptions in one section; do not hide assumptions inside component titles.
- Every `must-have` component must have a dataset, fields, filters, interaction state, update trigger, and validation case.
- Every primary filter must list affected components.
- Every primary/global filter must state whether it narrows data through SQL/source/provider/repository/resolver/precompute/cache before component construction; every component-internal filter must state the already fetched component dataset it operates on.
- Every clickable component must list event name, payload fields, target action, and stale-state behavior.

## Acceptance Gate

Before finalizing, answer yes to all:

- Can another agent implement the same component IDs and dataset IDs from this output?
- Can every first-screen value be traced to a dataset or static policy?
- Can every primary filter be tested against at least one affected component?
- Can every global/page-level filter be tested without relying on full-materialize-then-filter behavior, and can every component-internal filter be tested against already fetched component data?
- Can every clickable mark or row produce a stable action payload?
- Can the page still behave predictably when filters return empty data or remove a selected object?
- Are unsupported chart choices explicitly ruled out by fallback rules?
- Are all enums from controlled vocabularies or project-defined local types?
