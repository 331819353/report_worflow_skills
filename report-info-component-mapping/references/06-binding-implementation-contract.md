# 06 Binding Implementation Contract

Use this reference before implementation, prototype configuration, API handoff, or any output that must be buildable.

## Unified Component Mapping Contract

Every mapped component must be expressible as an implementation contract.

```ts
type ControlSemantics =
  | 'perspective-switch'
  | 'global-filter'
  | 'local-filter'
  | 'drilldown-param';

type ComponentSchemaImpact =
  | 'none'
  | 'row-scope-only'
  | 'metric-name'
  | 'metric-set'
  | 'component-set'
  | 'table-schema'
  | 'dimension-set'
  | 'definition-change'
  | 'domain-vocabulary'
  | 'mixed';

type ComponentSchemaImpactDetail = {
  categories: ComponentSchemaImpact[];
  changesMetricNames: boolean;
  changesComponentSet: boolean;
  changesTableHeaders: boolean;
  changesDimensions: boolean;
  changesFormulaOrDefinition: boolean;
  changesDomainVocabulary: boolean;
  notes?: string;
};

type NavigationMetricLineage = {
  navigationId: string;
  metricKind: 'percentage' | 'ranking' | 'status-light';
  sourceDataset: string;
  field?: string;
  formula?: string;
  grain: string;
  affectedFilters: string[];
  periodBehavior:
    | 'selected-period'
    | 'current-period'
    | 'comparison-period'
    | 'rolling-window'
    | 'latest-snapshot'
    | 'static-display-copy';
  staticDisplayCopy?: boolean;
};

type DisplayTheme =
  | 'detail-table'
  | 'summary-stat'
  | 'business-dashboard'
  | 'exploratory-analysis'
  | 'management-report'
  | 'monitoring-alert';

type PatternRole =
  | 'primary-structure'
  | 'supporting-evidence'
  | 'interaction'
  | 'state'
  | 'export'
  | 'governance'
  | 'acceptance-only';

type AnalysisInsightContract = {
  subtype:
    | 'conclusion-card'
    | 'insight-card'
    | 'anomaly-alert'
    | 'attribution-card'
    | 'impact-factor-card'
    | 'comparison-interpretation'
    | 'trend-interpretation'
    | 'target-diagnosis'
    | 'recommendation-card'
    | 'risk-card'
    | 'definition-card'
    | 'data-quality-card'
    | 'chart-annotation'
    | 'summary-bar'
    | 'change-explanation'
    | 'ranking-interpretation'
    | 'forecast-note'
    | 'review-card'
    | 'explanatory-empty-state'
    | 'task-card'
    | 'permission-no-result-delay-note';
  insightFamily: 'conclusion' | 'insight' | 'diagnosis' | 'recommendation' | 'explanation' | 'state';
  conclusion: string;
  evidence?: string[];
  affectedObjects?: string[];
  compareWith?: string;
  changeValue?: string;
  reasonFields?: string[];
  recommendedActions?: string[];
  confidence?: 'high' | 'medium' | 'low' | 'insufficient';
  definitionRefs?: string[];
  dataQualityScope?: string;
  annotationTarget?: { componentId: string; field?: string; markId?: string; range?: string };
  maxVisibleItems?: number;
  localFilters?: string[];
  tooltipPayload?: string[];
  detailRoute?: string;
  sourceDataset?: string;
  freshnessField?: string;
  validationRules: string[];
};

type ComponentMapping = {
  id: string;
  // Metadata for the layout/block title. Do not render this again inside the component body.
  title: string;
  priority: 'must-have' | 'should-have' | 'optional';
  sampleModuleRole?: 'businessRequired' | 'sampleStructure' | 'optionalEnhancement';
  displayTheme?: DisplayTheme;
  sourcePatternIds?: string[];
  patternRoles?: PatternRole[];
  businessQuestion: string;
  answerAtom: string;
  semanticRole: string;
  block: string;
  // Top-level page-grid occupant. Uses the report page `8 * N` grid.
  parentBlockId?: string;
  // Optional local region inside the parent block body. Not a page-grid block.
  subBlockId?: string;
  subBlockRole?: 'summary' | 'evidence' | 'detail' | 'control' | 'peer' | 'state' | 'microGroup';
  componentType: 'card' | 'chart' | 'table' | 'text-summary' | 'drawer' | 'task' | 'action' | 'custom';
  visualType: string;
  chartSubtype?: string;
  dataSource: string;
  apiId?: string;
  apiEndpoint?: string;
  frontendComputePolicy?: 'component-ready' | 'format-only' | 'blocked';
  grain: string;
  primaryKey?: string;
  requiredFields: string[];
  formulas?: string[];
  rollupLogic?: string;
  analysisInsightContract?: AnalysisInsightContract;
  compositePanelContract?: {
    topic: string;
    analysisSequence: Array<'summary' | 'trend' | 'structure' | 'contribution' | 'exception' | 'detail' | 'action'>;
    layoutPattern:
      | 'metric-main'
      | 'main-side'
      | 'main-detail'
      | 'main-two-side'
      | 'two-by-two'
      | 'metric-main-side';
    primaryChildId: string;
    children: Array<{
      id: string;
      role:
        | 'primary-metric'
        | 'main-visual'
        | 'auxiliary-visual'
        | 'top-list'
        | 'detail-preview'
        | 'insight'
        | 'legend'
        | 'state';
      visualType: string;
      priority: 'P1' | 'P2' | 'P3' | 'P4';
      minW: number;
      minH: number;
      datasetId?: string;
      requiredFields?: string[];
      unit?: string;
      localFilterScope?: 'panel' | 'child-only';
    }>;
    childCountLimit: number;
    primaryVisualWeight: '50-70%';
    contentHeightRule: 'contentH>=CH*0.60';
    sharedLocalFilters?: string[];
    childLocalFilterException?: string;
    sharedLegend?: boolean;
    sharedUnit?: string;
    linkedInteraction?: 'none' | 'hover-highlight' | 'click-select' | 'hover-and-click';
    detailPreview?: { maxRows: number; maxColumns: number; detailRoute?: string };
    responsiveFallback: string[];
    stateRules: string[];
  };
  pivotContract?: {
    rowDimensions: string[];
    columnDimensions: string[];
    measures: string[];
    aggregationFunctions: Record<string, string>;
    rateFormulas?: Record<string, { numerator: string; denominator: string; formula: string }>;
    subtotalRules?: string[];
    grandTotalRules?: string[];
    rowHierarchyDepth?: number;
    columnHierarchyDepth?: number;
    sortRules?: string[];
    densityFallback?: string[];
    renderer?: 'antv-s2' | 'project-s2-equivalent' | 'static-preview';
  };
  groupedHeaderContract?: {
    columnTree: Array<{
      id: string;
      title: string;
      field?: string;
      children?: string[];
      unit?: string;
      definition?: string;
      align?: 'left' | 'center' | 'right';
      width?: number;
      minWidth?: number;
      maxWidth?: number;
      priority?: number;
      sortable?: boolean;
      filterable?: boolean;
      fixed?: 'left' | 'right';
    }>;
    maxDepth: number;
    leafColumnCount: number;
    spanRules: 'computed-colSpan-rowSpan';
    fixedHeader: boolean;
    frozenColumns?: string[];
    componentLocalFilters?: string[];
    columnHeaderFilters?: string[];
    densityFallback?: string[];
    tooltipFields?: string[];
  };
  controlSemantics: ControlSemantics[];
  componentSchemaImpact: ComponentSchemaImpactDetail;
  navigationMetricLineage?: NavigationMetricLineage[];
  globalFilters: string[];
  filterMap: Record<string, string>;
  filterExecutionStage?: 'sql-where' | 'source-query' | 'provider-query' | 'repository-query' | 'resolver-param' | 'redis-cache' | 'precompute-cache' | 'component-local' | 'bounded-local' | 'blocked';
  ignoredFilters?: string[];
  localControls?: string[];
  interactions?: string[];
  actionPayload?: string[];
  stateKeys?: string[];
  updateTriggers: string[];
  parentLayoutSpan?: string;
  subBlockLayout?: string;
  layoutSpan: string;
  emptyState: string;
  validationCases: string[];
};
```

Rules:

- Use stable IDs such as `attritionTrend`, `riskEmployeeTable`, or `revenueGapWaterfall`.
- For sample/source restoration, set `sampleModuleRole`. Only `businessRequired` modules should become `must-have`; `sampleStructure` preserves visible sample structure, and `optionalEnhancement` must be labeled as an enhancement.
- When a display-theme pattern library is used, set `displayTheme`, `sourcePatternIds`, and `patternRoles` on every affected mapping row. Pattern IDs should be stable values such as `detail-table-01`.
- `visualType` must match runnable template/widget capability where a template is used.
- `parentBlockId` groups components that live in the same top-level `8 * N` parent block. `subBlockId` identifies the internal sub-block viewport that owns the component. Leave `subBlockId` empty only for single-component parent blocks.
- `parentLayoutSpan` is the top-level `columns * rows` span. `subBlockLayout` describes local grid/flex placement such as `area:evidence`, `local:2x1`, `track:minmax(240px,1fr)`, or `tab:trend`, and must preserve `subBlockInset:5px` plus `subBlockGap:5px` when sub-blocks exist.
- `filterMap` must map UI filter IDs to dataset fields or query params.
- `controlSemantics` must classify controls that affect the component as `perspective-switch`, `global-filter`, `local-filter`, or `drilldown-param`.
- `componentSchemaImpact` must explicitly state whether a control changes metric names, component collection, table headers, dimensions, metric formulas/口径, domain vocabulary, or only narrows rows.
- `navigationMetricLineage` is required when perspective navigation displays percentages, rankings, or status lights. Each item must declare `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, and `periodBehavior`.
- `filterExecutionStage` must show where filters, sorting, pagination, ranking, grouping, and aggregation execute when implementation or handoff is in scope. Use `sql-where` for global/page-level database filters, `component-local` for filters over the already fetched component dataset, and `blocked` when the current design depends on page/API-level full-materialize-then-filter behavior.
- `apiId`/`apiEndpoint` should identify the API that serves this component when the output feeds API planning or frontend integration. Default to one component or coherent component group per API.
- `frontendComputePolicy` must be `component-ready` or `format-only` for implementation handoff. Use `blocked` when required business formulas, aggregations, rankings, filters, or series shaping are still expected to happen in the frontend.
- `grain` must state row level: employee-month, org-month, order, contract, project, alert, task, or reconciliation-pair.
- `analysisInsightContract` is required when a text-summary/card/task/custom component is used as a conclusion card, insight card, anomaly/risk explanation, attribution summary, recommendation/action card, definition/data-quality/forecast note, chart annotation, explanatory empty state, permission/no-result/delay note, or any analysis copy that influences a decision. It must declare subtype, family, conclusion, evidence or explicit insufficiency, affected object, comparison/change value when relevant, action/detail path when relevant, confidence/source/freshness/definition when relevant, local-filter scope, tooltip payload, and state rules.
- `compositePanelContract` is required when multiple child components live inside one report component container as one analysis unit. It must declare the shared topic, sequence, layout pattern, primary child, child roles/priorities/minimum sizes, default child-count limit, primary visual weight, content-height rule, panel-level local filters, any child-only filter exception, shared legend/unit behavior, linked interaction, detail-preview limit, responsive fallback, and parent/child state rules. Use it only when child components answer one question; split unrelated children into separate parent blocks.
- `groupedHeaderContract` is required when a table has `>8` visible columns or natural field groups such as metric families, actual/target/variance, current/YoY/MoM, amount/count/rate, time periods, finance sections, or pivot columns. It must declare the grouped column tree, leaf-field metadata, computed `colSpan`/`rowSpan`, max depth, fixed header, frozen row/primary columns, component-local filters vs per-column header filters, tooltip fields, and density fallback.
- `validationCases` must include default state, filtered state, empty/no-permission state, and interaction state when clickable.
- Use the controlled vocabularies and naming rules in `08-generation-stability.md`; do not invent enum values for `priority`, `componentType`, `visualType`, action type, data policy, or filter value type.

## Required Controlled Values

Use these values unless an existing project explicitly defines a different local vocabulary.

- `priority`: `must-have`, `should-have`, `optional`.
- `componentType`: `card`, `chart`, `table`, `text-summary`, `drawer`, `task`, `action`, `custom`.
- `visualType`: `line`, `bar`, `combo`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, `pivot`, `composite-panel`, `other`.
- Built-in action type: `openModal`, `closeModal`, `setFilters`, `resetFilters`, `navigateUrl`, `print`, `fullscreen`, `refresh`. Avoid `switchNav` for new components unless maintaining legacy config.
- `controlSemantics`: `perspective-switch`, `global-filter`, `local-filter`, `drilldown-param`.
- `componentSchemaImpact`: `none`, `row-scope-only`, `metric-name`, `metric-set`, `component-set`, `table-schema`, `dimension-set`, `definition-change`, `domain-vocabulary`, `mixed`.
- `navigationMetricKind`: `percentage`, `ranking`, `status-light`.
- `periodBehavior`: `selected-period`, `current-period`, `comparison-period`, `rolling-window`, `latest-snapshot`, `static-display-copy`.
- `filterExecutionStage`: `sql-where`, `source-query`, `provider-query`, `repository-query`, `resolver-param`, `redis-cache`, `precompute-cache`, `component-local`, `bounded-local`, or `blocked`.
- `dataPolicy`: `static` only for explicit narrative/static content, `external` only when the component manages runtime data outside normal datasets.

## Binding Matrix

Every mapping must produce a binding matrix before implementation or final specification.

Minimum columns:

- Component ID, parent block ID, optional sub-block ID, and layout/block title metadata.
- Display theme, source pattern IDs, and pattern roles when the workflow selected reusable pattern cards.
- Priority.
- Component type, `visualType`, planned parent `columns * rows` span, and sub-block layout when present.
- Sub-block spacing: `subBlockInset:5px` and `subBlockGap:5px` when the component lives inside a composed parent block.
- Business question, answer atom, and semantic role.
- Data source or dataset.
- API ID/path and frontend compute policy when an API/backend handoff is in scope.
- Row grain, primary key, and required fields.
- Metric formulas and rollup logic.
- `analysisInsightContract` when the component is an analysis/explanation/decision-support text summary, card, annotation, task, or state note.
- `compositePanelContract` when `visualType` is `composite-panel` or multiple child components are intentionally combined into one component container.
- Control semantics for each control that affects the component.
- Component schema impact: whether the control changes metric names, component set, table headers, dimensions, formulas/口径, domain vocabulary, or only row scope.
- Navigation metric lineage when perspective navigation shows percentages, rankings, or status lights: `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, `periodBehavior`.
- Global filters that affect it.
- Ignored filters and visible scope label.
- Local filters or internal tabs.
- Filter-to-field or filter-to-query mapping.
- Filter/sort/page execution stage.
- Interaction state: selected row, chart mark, drill path, drawer, modal, or jump context.
- Action payload or emitted event.
- Update trigger: filter change, refresh, drilldown, permission change, data reload, resize, fullscreen.
- Reset/stale behavior when selected object leaves scope.
- Export/download behavior.
- Validation cases.

## Data Accuracy Rules

- A component without a data source is decorative unless explicitly static narrative.
- A selected pattern card without a component/control/data/API/interaction/export/operations/validation impact is decorative. Mark it as backlog or remove it from completed scope.
- A data-bearing component should have a matching API or provider contract when implementation or handoff is in scope. Do not make a complex page-level API the hidden source for multiple unrelated components.
- KPI cards, conclusion cards, status cards, warning cards, and text-summary cards must have a source dataset or explicit static policy.
- Visible sample/source modules are not automatically `must-have`. A module becomes `businessRequired` only when it directly answers the stated report question; otherwise it remains `sampleStructure` or `optionalEnhancement`.
- Empty states must name the reason: no matching filter result, no permission, loading failed, source not configured, or static placeholder.
- Additive KPI/chart totals must reconcile with detail rows under the same filters.
- Non-additive metrics such as rates, scores, and completion rates must recalculate from raw numerator/denominator fields.
- A primary/global filter that should affect a component must map to a dataset field, query param, resolver param, or required filter. It cannot be hidden in `ignoredFilters`.
- Business domain, report theme, management object, subject area, and first-level perspective switching must not be represented as ordinary filters when they change metric names, component semantics, table headers, metric口径, or domain vocabulary.
- Perspective navigation percentages, rankings, and status lights are data-bearing metrics. They must be backed by business facts, aggregate datasets, or resolvers with lineage; they must not be hidden in `filterData.meta`.
- Filter option `meta` may contain only dimensional/static descriptors such as name aliases, sort order, permission, description, icon, disabled reason, stable category tags, or UI hints. Dynamic KPI values belong in business facts or resolvers.
- Mock/offline data must include enough dimension grain or resolver logic for each affected primary filter to return different values when business reality differs. A single static snapshot is allowed only for explicitly invariant/static content.
- For backend/API handoff, business formulas, aggregations, ranking, grouping, Top/Bottom, filtering, pagination, and chart-series/table shaping should be returned as component-ready response fields. The frontend may do display formatting, enum label display, null handling, local UI sorting of tiny already-returned option lists, and interaction state only.
- Do not design page/API-level full-materialize-then-filter data paths. Components, stores, adapters, and static helpers must not build/fetch all candidate rows and then apply global filters, permission filters, pagination, ranking, grouping, aggregation, or counts locally. Use `component-local` only for filters over the already fetched component dataset; use `bounded-local` for tiny static enums or confirmed bounded lookups; otherwise use `blocked`.
- Selected mock objects used by drawers, drilldowns, or jumps must exist in filtered data or produce a stale-selection state.

## Template Implementation Rules

For bundled templates:

- One template widget normally represents one top-level parent block. When the parent block contains multiple sub-blocks, implement them inside that widget with local CSS grid/flex or a typed `subBlocks[]` view model; do not create fake page-grid blocks for internal sub-blocks.
- Global/page filters must be declared in `filters[]` and invoked through the selected template's native filter trigger/panel/popover/drawer. Do not generate a standalone filter toolbar, persistent filter bar, or extra filter drawer unless the user explicitly requests template-level redesign.
- Template `filters[]` is for horizontal row-scope constraints. First-level business domain, report theme, management object, subject area, or analysis perspective must be represented through nav/page/route/tab/segment/perspective state when it changes component schema, metric names, table headers, or domain wording.
- Offline/mock filter options and business rows must live in `src/data/dashboard.dataset.json` and be loaded through `src/data/dashboard.loader.ts` plus the data-source registry. Do not create generated TS files for fixture rows, arrays, or payloads.
- `widget.data.params.key` must point to a real dataset in `dashboardData`.
- Use `filters[].source` for data-derived filter options and `filters[].options` for static enums.
- Do not put dynamic perspective-navigation KPIs in `filterData.meta`. Use `businessData`, aggregate rows, or a custom resolver and bind the navigation display to that data chain.
- Use `widget.data.filterFields` when filter ID differs from dataset field.
- Use `widget.data.requiredFilters` for filters that must affect the dataset.
- Use `widget.data.requiredParams` for fixed params that must filter `staticData`.
- Use SQL `WHERE`, source/provider/repository/resolver params, Redis/precompute cache keys, or equivalent source-side scope for high-volume or business-defined global filtering before component data is constructed. `staticData` or component-local filtering is acceptable only for already fetched component datasets, explicitly bounded demo datasets, tiny enums, or lookup options.
- Use `widget.data.ignoredFilters` only for intentionally ignored global filters whose component scope is invariant. Do not use it to bypass missing mock grain, mismatched field names, or unimplemented resolver behavior; fix the data with `filterFields`, `requiredFilters`, `requiredParams`, API params, or a custom resolver.
- Use `widget.filterScope` plus `filters[].scope` for local filter behavior.
- Business widgets should emit `dashboard-action` and central action config should handle the event.
- `navigateUrl` should include active filters by default.

## Custom Implementation Rules

For custom Vue or non-template pages:

- Keep `activeFilters` as a single runtime object.
- Keep a `filterMap` table from filter IDs to data fields, API query params, permission scopes, and affected components.
- Keep exports, jumps, fullscreen views, drawers, and modals reading from the same filtered context as visible components.
- Use a shared action dispatcher for drilldowns, drawers, modals, jumps, exports, refresh, and fullscreen actions.
- Store selection and drill path in one place so filter changes can invalidate them consistently.
- Keep raw mock rows outside visual components so KPI cards, charts, tables, drawers, and exports can use the same source.

## Prototype Technology Mapping

- Use TypeScript + Vue 3 single-file components with Composition API unless the existing project uses another stack.
- Use Element Plus for standard UI controls in Vue report prototypes: filter forms, selects, tree selects, cascaders, date pickers, inputs, buttons, tabs, tags, popovers, tooltips, dialogs, drawers, pagination, and simple operation/detail tables.
- Detail Table mappings with `componentType: 'table'` and `visualType: 'table'` must carry row grain, primary key, default sort, column metadata, visible-column priority, search/sort/pagination/export scope, row detail/action payload, local-filter behavior, and state handling. Use Element Plus/project table for ordinary row-level details; use S2 only when the table is a pivot, cross table, wide metric matrix, frozen-header analytical table, or dense comparison grid.
- Use ECharts for standard visual charts: KPI trend cards, line, bar, area, Combo through data-driven `bar` + `line`/`markLine` series on one shared x-axis, scatter, Gauge through `series.type: 'gauge'`, parallel coordinates through `parallelAxis` plus `series.type: 'parallel'`, heatmap, map, Sankey through `series.type: 'sankey'` with node/link `source`/`target`/`value`, path/user/process path when implemented through ECharts sankey/graph/custom series, treemap/rectangular tree map through `series.type: 'treemap'`, sunburst through `series.type: 'sunburst'`, tree/hierarchical tree through `series.type: 'tree'` or a declared data-driven hierarchy component, relation/network graph, waterfall, funnel, mixed chart.
- Gauge implementation must use ECharts `series.type: 'gauge'` with declared `min`, `max`, `startAngle`, `endAngle`, `radius`, `center`, `progress`/`axisLine`, `detail`, `data`, target/threshold encoding when present, and tooltip evidence. Do not map a standard Gauge to hand-authored SVG/CSS arcs, needles, ticks, or labels while merely importing ECharts.
- Combo implementation must use ECharts `xAxis`, one or two `yAxis` definitions, data-driven `bar` and `line`/`markLine`/reference series, `legend`, `tooltip`, and `axisPointer`. The mapping must carry the paired relationship, axis units, series limits, category-density fallback, and exact tooltip evidence; do not map unrelated metrics into a dual-axis Combo.
- Funnel implementation may be ECharts `series.type: 'funnel'` for traditional trapezoids or ECharts horizontal `bar` series for the report-default bar funnel. In both cases the mapping must carry ordered stage rows, value/unit, conversion/drop formulas, tooltip evidence, and target/comparison semantics instead of hand-drawn decorative bars or trapezoids.
- When the binding matrix maps a component to ECharts, implementation must use an actual ECharts instance or approved project wrapper with data-driven `option`/`series`. Do not mark a standard chart as ECharts if the intended implementation is hand-authored SVG/HTML/CSS/canvas. Use `customDiagram`, `svgIcon`, or another explicit non-standard component type only when the visual is genuinely not an ECharts chart.
- Use AntV S2 through `@antv/s2` and `@antv/s2-vue` for analytical tables: pivot tables, cross tables, wide metric matrices, frozen-header tables, drillable comparison grids, and dense financial/operation tables. Treat those packages as on-demand dependencies; do not add or install them when the mapped components only use charts, KPI cards, simple Element Plus tables, lists, or text summaries.
- Use regular Vue/HTML tables only when Element Plus and S2 are both unavailable or the existing project stack explicitly forbids them.
- Keep chart/table widgets typed, data-driven, and isolated from shell actions.
- Keep mock/static data in JSON data files or data-source resolvers, not embedded in ECharts/S2 setup code or generated TS fixture modules. In bundled templates, use `src/data/dashboard.dataset.json`.
- Visible Chinese UI uses `%` for rate, completion, variance-rate, YoY, MoM, and change labels. Avoid `pt`, `p.p.`, and `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up and negative-green-down semantics: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.

## Validation Requirements

For each primary filter, include at least one scenario proving:

- KPI cards, charts, tables, lists, drawers, and exports change consistently.
- Filtered detail rows reconcile to filtered KPI totals when additive.
- Non-additive metrics recalculate from raw numerator/denominator fields.
- Selected objects remain in scope or show a stale-selection state.

For each `perspective-switch`, include at least one default and one non-default scenario proving:

- Metric names and title/summary wording match the selected domain.
- Component collection and table dimensions/headers change when `componentSchemaImpact` says they should.
- Domain-specific specialty metrics and risk focus appear for the selected domain.
- Formula/口径 differences are visible in labels, field mapping, or validation notes instead of only changing numeric values.
- Navigation percentages, rankings, and status lights reconcile to the same `sourceDataset`/field/formula chain used by overview KPIs, journey cards, and chart summaries.

A runnable prototype should fail validation when:

- A primary filter has no explicit component binding.
- A schema-changing control is modeled only as a normal filter or lacks `componentSchemaImpact`.
- A navigation percentage, ranking, or status light lacks `sourceDataset`, `field/formula`, `grain`, `affectedFilters`, or `periodBehavior`.
- A dynamic navigation KPI is stored in filter option `meta` or `filterData.meta` without being explicitly static display copy.
- A non-default perspective only changes numeric values while metric names, titles, table dimensions, component set, specialty metrics, and口径 stay incorrectly default.
- A primary filter only narrows data after full dataset/component construction.
- A primary filter changes only UI selected state while affected component data stays identical. Treat `ignoredFilters` or missing `filterFields` as binding gaps after data completeness is proven; treat single-snapshot mock data, missing non-default rows, or missing resolver/API branches as data-completeness gaps first.
- A clickable element has no emitted event or configured action.
- A multi-period filter is backed by single-period data.
- A first-screen component has no dataset, static policy, or external runtime contract.
- A component mapped as an ECharts standard chart only imports `echarts` but renders chart marks through hand-authored SVG/HTML/CSS/canvas.
