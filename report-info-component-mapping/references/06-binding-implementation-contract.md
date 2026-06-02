# 06 Binding Implementation Contract

Use this reference before implementation, prototype configuration, API handoff, or any output that must be buildable.

## Unified Component Mapping Contract

Every mapped component must be expressible as an implementation contract.

```ts
type ComponentMapping = {
  id: string;
  title: string;
  priority: 'must-have' | 'should-have' | 'optional';
  sampleModuleRole?: 'businessRequired' | 'sampleStructure' | 'optionalEnhancement';
  businessQuestion: string;
  answerAtom: string;
  semanticRole: string;
  block: string;
  componentType: 'card' | 'chart' | 'table' | 'text-summary' | 'drawer' | 'task' | 'action' | 'custom';
  visualType: string;
  chartSubtype?: string;
  dataSource: string;
  grain: string;
  primaryKey?: string;
  requiredFields: string[];
  formulas?: string[];
  rollupLogic?: string;
  globalFilters: string[];
  filterMap: Record<string, string>;
  ignoredFilters?: string[];
  localControls?: string[];
  interactions?: string[];
  actionPayload?: string[];
  stateKeys?: string[];
  updateTriggers: string[];
  layoutSpan: string;
  emptyState: string;
  validationCases: string[];
};
```

Rules:

- Use stable IDs such as `attritionTrend`, `riskEmployeeTable`, or `revenueGapWaterfall`.
- For sample/source restoration, set `sampleModuleRole`. Only `businessRequired` modules should become `must-have`; `sampleStructure` preserves visible sample structure, and `optionalEnhancement` must be labeled as an enhancement.
- `visualType` must match runnable template/widget capability where a template is used.
- `filterMap` must map UI filter IDs to dataset fields or query params.
- `grain` must state row level: employee-month, org-month, order, contract, project, alert, task, or reconciliation-pair.
- `validationCases` must include default state, filtered state, empty/no-permission state, and interaction state when clickable.
- Use the controlled vocabularies and naming rules in `08-generation-stability.md`; do not invent enum values for `priority`, `componentType`, `visualType`, action type, data policy, or filter value type.

## Required Controlled Values

Use these values unless an existing project explicitly defines a different local vocabulary.

- `priority`: `must-have`, `should-have`, `optional`.
- `componentType`: `card`, `chart`, `table`, `text-summary`, `drawer`, `task`, `action`, `custom`.
- `visualType`: `line`, `bar`, `candlestick`, `heatmap`, `pie`, `radar`, `path`, `sunburst`, `gauge`, `scatter`, `boxplot`, `parallel`, `map`, `graph`, `tree`, `treemap`, `sankey`, `funnel`, `metric-card`, `text-summary`, `table`, `other`.
- Built-in action type: `openModal`, `closeModal`, `setFilters`, `resetFilters`, `navigateUrl`, `print`, `fullscreen`, `refresh`. Avoid `switchNav` for new components unless maintaining legacy config.
- `dataPolicy`: `static` only for explicit narrative/static content, `external` only when the component manages runtime data outside normal datasets.

## Binding Matrix

Every mapping must produce a binding matrix before implementation or final specification.

Minimum columns:

- Component ID and title.
- Priority.
- Component type, `visualType`, and planned `columns * rows` span.
- Business question, answer atom, and semantic role.
- Data source or dataset.
- Row grain, primary key, and required fields.
- Metric formulas and rollup logic.
- Global filters that affect it.
- Ignored filters and visible scope label.
- Local filters or internal tabs.
- Filter-to-field or filter-to-query mapping.
- Interaction state: selected row, chart mark, drill path, drawer, modal, or jump context.
- Action payload or emitted event.
- Update trigger: filter change, refresh, drilldown, permission change, data reload, resize, fullscreen.
- Reset/stale behavior when selected object leaves scope.
- Export/download behavior.
- Validation cases.

## Data Accuracy Rules

- A component without a data source is decorative unless explicitly static narrative.
- KPI cards, conclusion cards, status cards, warning cards, and text-summary cards must have a source dataset or explicit static policy.
- Visible sample/source modules are not automatically `must-have`. A module becomes `businessRequired` only when it directly answers the stated report question; otherwise it remains `sampleStructure` or `optionalEnhancement`.
- Empty states must name the reason: no matching filter result, no permission, loading failed, source not configured, or static placeholder.
- Additive KPI/chart totals must reconcile with detail rows under the same filters.
- Non-additive metrics such as rates, scores, and completion rates must recalculate from raw numerator/denominator fields.
- Selected mock objects used by drawers, drilldowns, or jumps must exist in filtered data or produce a stale-selection state.

## Template Implementation Rules

For bundled templates:

- `widget.data.params.key` must point to a real dataset in `dashboardData`.
- Use `filters[].source` for data-derived filter options and `filters[].options` for static enums.
- Use `widget.data.filterFields` when filter ID differs from dataset field.
- Use `widget.data.requiredFilters` for filters that must affect the dataset.
- Use `widget.data.requiredParams` for fixed params that must filter `staticData`.
- Use `widget.data.ignoredFilters` for intentionally ignored global filters, and label that scope difference in the UI.
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
- Use ECharts for standard visual charts: KPI trend cards, line, bar, area, scatter, heatmap, map, waterfall, funnel, gauge, mixed chart.
- Use AntV S2 through `@antv/s2` and `@antv/s2-vue` for analytical tables: pivot tables, cross tables, wide metric matrices, frozen-header tables, drillable comparison grids, and dense financial/operation tables.
- Use regular Vue/HTML tables only when Element Plus and S2 are both unavailable or the existing project stack explicitly forbids them.
- Keep chart/table widgets typed, data-driven, and isolated from shell actions.
- Keep mock/static data in data files or data-source resolvers, not embedded in ECharts or S2 setup code.
- Visible Chinese UI uses `%` for rate, completion, variance-rate, YoY, MoM, and change labels. Avoid `pt`, `p.p.`, and `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up and negative-green-down semantics: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.

## Validation Requirements

For each primary filter, include at least one scenario proving:

- KPI cards, charts, tables, lists, drawers, and exports change consistently.
- Filtered detail rows reconcile to filtered KPI totals when additive.
- Non-additive metrics recalculate from raw numerator/denominator fields.
- Selected objects remain in scope or show a stale-selection state.

A runnable prototype should fail validation when:

- A primary filter has no explicit component binding.
- A clickable element has no emitted event or configured action.
- A multi-period filter is backed by single-period data.
- A first-screen component has no dataset, static policy, or external runtime contract.
