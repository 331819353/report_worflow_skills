# Report Design System Rule Catalog

Use this catalog when a design-system output needs concrete rules rather than an empty framework. It is intentionally reusable across report products; project-specific values should come from source systems such as `$haier-enterprise-app-ui-design-spec`, bundled templates, existing CSS tokens, or approved brand files.

## Source Hierarchy

When multiple design sources exist, resolve conflicts in this order:

1. Company-level standard, such as `$haier-enterprise-app-ui-design-spec`.
2. Approved template design system, such as `$report-prototype-template-management` template layout tokens.
3. Product/report-family extension.
4. Project-specific exception with owner, expiry, and regression evidence.

If a lower-level source conflicts with a higher-level source, record the conflict instead of silently choosing the newer-looking style.

## Required Rule Families

A report design system is incomplete unless it covers all of these:

| Family | Must define |
| --- | --- |
| Tokens | Color, typography, spacing, grid, radius, border, shadow, icon, density, z-index, breakpoint |
| Layout | Shell, header, navigation, filter surface, content grid, parent block anatomy, internal sub-block anatomy, title band, responsive behavior |
| Components | Filters, KPI cards, summaries, Analysis & Insight components, charts, tables, drawers/modals, actions, tags, feedback states |
| Visualization | Chart choice, axis, legend, tooltip, data labels, color semantics, thresholds, drilldown/export |
| Data display | Unit, precision, percent/rate wording, trend direction, empty/null/zero/stale data |
| Interaction | Hover, focus, active, selected, disabled, loading, reduced motion, no layout shift |
| States | Loading, empty, error, no-permission, stale, disabled, partial data, offline/mock |
| Governance | Version, owner, source, status, allowed variants, deprecated patterns, exception process, QA baseline |

## Token Rules

- Tokens must be semantic. Prefer `text.primary`, `surface.card`, `border.default`, `state.error`, `chart.series.primary`, `space.block`, not raw names such as `blue-1` unless the raw token is inherited from a company source.
- Each token needs `value/source`, `usage`, `accessibility note`, and `status`.
- If the value is inherited, write the source name and section, not a copied paraphrase.
- If a token is unknown, mark it `gap` and name the owner needed to close it.
- Do not allow one-off colors in chart series, KPI status, hover glow, or badges without a semantic role.

## Layout Rules

- Define page shell areas: logo/brand, title, scope/status, navigation, filter surface, toolbar/actions, content blocks, feedback area.
- Top-level report blocks must use stable rectangular `8 * N` parent spans. A parent block may contain internal sub-blocks; sub-blocks are local layout regions, not page-grid cells, and they need their own fit rules.
- Internal sub-blocks must declare component owner, local grid/flex tracks, `5px` parent inset, `5px` sibling gap, min width/height, state behavior, and overflow policy.
- Template-based pages must use template-owned filters, title bands, card padding/radius, row height, and hover/focus behavior unless a template-level redesign is approved.
- Define first-viewport priority: primary conclusion or action, supporting evidence, breakdown, detail, and next action.
- Responsive behavior must declare what collapses, stacks, scrolls, moves to drawer, or remains fixed.
- Loading, empty, error, and no-permission states must preserve the planned geometry unless the state is explicitly page-level.

## Component Rules

### Filter And Control Surfaces

- Define filter source, default value, active-state display, reset path, changed-state display, disabled/loading/error states, and affected components.
- In template-based report pages, main filters should map to template-native `filters[]` and its trigger/panel/popover/drawer behavior.
- Separate page/global filters from `组件内筛选区 / 局部筛选区`. Component-internal local filters affect only the current component or declared local group and must not change page/global scope, permission scope, backend aggregation, pagination, export scope, or other components.
- Component-internal local filters default to a quiet title/header capsule: `2-4` short options use a segmented pill, `>4` options, long labels, or failed width fit use a compact dropdown, and multiple local filter groups use a panel/popover/drawer trigger.
- Component-internal local filters must reserve geometry before rendering: title-right is preferred, under-title row is allowed only when vertical budget passes, and the filter cannot overlay or compress KPI values, plot areas, legends, axes, table headers, pagination, or state messages.
- Filter chips and selected labels need wrapping, overflow counter, or panel expansion.
- Primary filters must not be visual-only; affected components need binding and validation.

### KPI And Metric Cards

- Card anatomy: title, value, unit, trend/comparison, helper, status/action when needed.
- Implementation-ready KPI rules must include the internal placement algorithm: content box variables, top-left title, top-right definition/help entry, centered `value + unit` group, centered comparison/target group, optional sparkline placement, bottom metadata, size tiers, and fallback order.
- Value and unit must remain visible. Long titles may wrap or disclose, but critical values cannot be ellipsis-only.
- Trend direction and color semantics must be explicit. For Chinese report UI, rate/change/completion labels use `%` unless an approved exception says otherwise.
- Cards need loading, empty, error, no-permission, and stale-data variants.

### Summary And Narrative Blocks

- Summary text must follow the surrounding layout tokens and density.
- A summary block must have conclusion, reason/evidence, and action/follow-up when the business task requires decisions.
- Long narrative should use expand/drawer or a larger block instead of tiny text.

### Analysis And Insight Components

- Treat conclusion cards, insight cards, anomaly/risk explanations, attribution summaries, impact-factor cards, comparison/trend/target diagnosis notes, recommendation/action cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, and permission/no-result/delay notes as a dedicated component family.
- Implementation-ready standards must require `analysisInsightContract`: subtype, insight family, conclusion, evidence, affected object, comparison/change value when relevant, reason fields, recommended actions, confidence/definition/source/freshness, local filters, tooltip payload, detail route, and state rules.
- Copy structure is conclusion first, evidence second, action/trust third. One card carries one main point; multi-insight lists default to `2-4` items and max `5`.
- Length budgets are explicit: title `2-8` Chinese characters, main conclusion `12-32` Chinese characters, explanation `1-2` lines, action suggestions `1-3`, tooltip `3-6` short lines.
- Visual style stays quieter than the chart/table it explains: weak neutral or semantic tint, `1px` weak border, `8-12px` radius, summary/annotation radius `6-8px`, semantic icons `14-18px`, and no full-card red alert fills.
- Component-local filters are optional and current-component scoped, such as 全部/异常/建议, 实际/预测, 高/中/低风险, or 原因/影响/建议. They use capsule/dropdown rules and must not change report scope or metric口径.
- Chart annotations are bounded: max `3` visible annotations, bubble `120-240px * 40-96px`, leader line `12-48px`, and no coverage of key marks, legends, or axes.
- States include loading, analysis generating, insufficient data, empty/filter-no-result, data delay, error, no-permission, and long-content expansion.

### Charts

- Chart type must match the task: trend, ranking, composition, distribution, correlation, process, or exact-value lookup.
- Axis order, unit, tooltip payload, legend behavior, threshold lines, and drilldown target must be specified.
- Dense charts require label budgets, tooltip exact values, zoom/fullscreen/table fallback, or sampling rules.
- Combo charts require a named scale + rate/trend/target relationship, shared ordered category/time grain, bar metric/unit, line or target metric/unit, left/right y-axis mapping, visible series limit, dual-axis rationale when present, `plotH` budget, legend/filter separation, category-density fallback, and exact tooltip/detail access.
- Pie/donut charts require part-to-whole semantics, `2-6` preferred categories, `<=8` maximum before merge, deterministic `TopN + 其他`, negative/all-zero handling, legend/label budget, center metric rules, and exact-value tooltip/detail.
- Radar charts require a shared score scale, dimension/series limits, circular geometry, outside label budget, tooltip exact/raw values, and a fallback when dimensions or objects exceed the readable range.
- Scatter/bubble charts require two numeric metrics with names and units, declared axis ranges/baselines, point-count density handling, bubble size mapping when present, weak reference/quadrant/trend encodings, key-only labels, and exact-value tooltip/detail.
- Parallel-coordinate charts require an object/sample schema, `3-12` ordered dimension fields, per-axis range/unit/direction, independent or standardized scaling mode, plot-height and axis-gap budget, sample-density opacity/sampling/aggregation rules, Top/anomaly/selected highlight semantics, brush behavior when present, legend/filter separation, and exact object tooltip/detail access.
- Map/geographic charts require a real geography decision scope, region-code or lon/lat binding, declared map resource/projection, aspect-safe fitBounds, visualMap/legend semantics, key-only labels, dense point/flow fallback, missing-geo handling, and exact-value tooltip/detail.
- Candlestick/K-line charts require ordered OHLC rows, price unit, market color convention, valid OHLC relationship, price range padding, candle-density/dataZoom strategy, secondary volume/indicator budget, limited MA/indicator count, crosshair tooltip, and missing OHLC/volume states.
- Boxplot charts require a raw-sample or precomputed-statistics contract, sample counts, Q1/median/Q3/IQR, declared whisker/outlier rule, sample-size thresholds, category/group density limits, stable outlier strategy, key-only labels, and exact five-number tooltip/detail access.
- Matrix/time/calendar/correlation heatmaps require row and column dimensions, value metric, aggregation grain, unit, visualMap/color-scale rule, missing-vs-zero encoding, row/column density limits, cell-size and value-label thresholds, label sampling, highlight/anomaly rule, and exact cell tooltip/detail access.
- Gauge charts require one bounded progress/status metric, min/max range, unit, current value, target/threshold semantics when present, status color business direction, `gaugeAreaH` budget, semicircle default for report cards, center value/unit anchoring, sparse ticks, threshold segment limits, pointer-use limits, and exact range/target/status tooltip/detail access.
- Path/user/process path charts require step/node schema, directed transition schema, start/end/order, metric basis, conversion/drop-off formulas, path depth, Top N and "other" aggregation, node/link density limits, main-path/branch strategy, path-width mapping, key-only labels, legend/filter separation, and exact node/transition tooltip/detail access.
- Funnel charts require ordered stage schema, shared population/cohort rule, metric basis/unit, entry/final values, entry share, stage conversion, drop value/rate, total conversion, `funnelAreaH` budget, `3-6` preferred stages with `>10` fallback, horizontal bar default for report cards, max/key-loss highlight, legend/filter separation, and exact stage tooltip/detail access.
- Sankey diagrams require source-target-value link schema, node schema, layer/stage order, metric unit, node-value/flow-conservation handling, Top N/`其他` aggregation, node/link density limits, flow-width mapping, key-only labels, legend/filter separation, hover/click path highlight, and exact node/link tooltip/detail access.
- Treemap/rectangular tree maps require hierarchy schema, parent/leaf aggregation, non-negative additive area metric, optional color metric semantics, Top N/`其他`, visible-depth rule, rectangle/label thresholds, breadcrumb/drilldown when deep, legend/filter separation, and exact path/value/share tooltip/detail access.
- Sunburst charts require hierarchy schema or `children`, parent/child aggregation, non-negative additive angle metric, optional color metric semantics, total/parent share formulas, visible-depth/ring-width budget, Top N/`其他`, sector/label thresholds, center content, breadcrumb/drilldown when deep, legend/filter separation, and exact path/value/total-share/parent-share tooltip/detail access.
- Relation/network graphs require node schema, edge schema, relationship direction/weight semantics, graph layout type, node/edge density limits, node category and edge type limits, node-size and edge-width mapping, label limits, legend/filter separation, fitView/zoom/drag behavior, and exact node/edge tooltip/detail access.
- Do not use pie/donut as a default for ranking, trend, or precise comparison.

### Tables

- Composite Panels / multi-component analysis cards are valid only when one container answers one shared business question through a mini analysis loop. Standards must define `compositePanelContract`, one primary child, child roles/priorities/min sizes, default `2-3` visible children and normal max `4`, primary visual weight `50-70%`, content height `>=60%`, panel-level local filter scope, child-only filter exceptions, shared legend/unit rules, linked hover/click behavior, detail-preview limits, responsive fallback, and parent/child loading/empty/error/no-permission states. Split unrelated or equal-weight children into separate blocks.
- Tables need column definitions, unit/precision, sorting, pagination, empty/error/no-permission states, row actions, export rule, and overflow behavior.
- Complex/grouped headers are required by default when a table has `>8` visible columns or natural field groups. Standards must define `columnTree`, parent group nodes, leaf field metadata, `colSpan`/`rowSpan` calculation, max depth `<=3` by default, parent width from child leaf widths, fixed whole-header behavior, frozen row/primary columns when horizontally scrolling, restrained header backgrounds/dividers, component-local filter vs per-column header-filter separation, sort/filter icon limits, group collapse, and tooltip definition access.
- Detail Tables need row grain, primary key/object field, visible column priority, type-specific width/alignment, default sort, table-body height/visible-row budget, fixed-header/frozen-column rules, row detail/action contract, tooltip disclosure for truncated cells, and provider/API/resolver scope for global search, sorting, pagination, and export.
- Default Detail Tables show `5-8` core columns; large blocks may show `8-12`; `11-16` columns require horizontal scroll plus frozen primary column; `>16` columns require column settings/drawer/detail/split; `>24` columns should not be one flat table.
- Pivot Tables need row dimensions, column dimensions, measures, aggregation grain, aggregation functions/formulas, subtotal/grand-total placement, hierarchy depth, sort rules, exact cell tooltip, and drilldown/export behavior.
- Pivot Tables keep `pivotAreaH >= CH * 0.55`, visible measures `1-3` by default and `<=5`, rows/columns within density thresholds, frozen row dimensions for horizontal scroll, fixed column headers for vertical scroll, and restrained conditional formatting for only `1-2` core measures.
- Percentage/rate metrics in Pivot Tables recompute totals from numerator/denominator; do not sum percentages or average them unless the business口径 explicitly requires unweighted average.
- Wide tables should preserve operation access through frozen/sticky action columns or row detail drawers.
- Simple row-level Detail Tables should use Element Plus or the project table component. Analytical matrices, pivot tables, cross tables, frozen-header analytical tables, wide metric matrices, and dense comparison grids should use S2-class table behavior when implementation supports it.

### Drawers, Modals, And Popouts

- Use drawer/modal for focused detail or short editing flows; move long workflows to a page or route.
- Define mask, z-index, close path, footer actions, scroll area, loading/error states, and context preservation.
- Popout shadow and focus rules must be inherited from the token system.

### Feedback States

- Every reusable component family needs loading, empty, error, no-permission, stale, disabled, and partial-data states.
- Empty states should explain whether data is absent, filtered out, unauthorized, not loaded, or not configured.
- Error states need retry/contact/reset action when appropriate.

## Visualization Semantics

| Question | Preferred visual | Required rule |
| --- | --- | --- |
| Current status or target gap | KPI card, status table, progress indicator | Baseline, threshold, status color, and owner |
| Single bounded progress/status | Gauge only when range, threshold, and current-state judgment matter | Min/max, unit, target/threshold, status color direction, center value, sparse ticks, and KPI/bar/table fallback |
| Trend over time | Line/area/bar by period | Chronological order, consistent period granularity, y-axis range rule, missing/null handling, and point/label density |
| Scale + rate/target relationship | Combo chart | Shared x-axis, bar and line/target metric roles, left/right axis units, series `<=4`, dual-axis rationale, category-density fallback, and split-chart/table fallback |
| Price volatility over time | Candlestick/K-line | Ordered OHLC fields, market color convention, price range padding, main/volume height budget, candle density/dataZoom, crosshair tooltip, and line/table fallback for non-OHLC data |
| Distribution/stability/outliers | Boxplot | Sample count, Q1/median/Q3/IQR, declared whisker/outlier rule, category/group density, outlier strategy, and table/detail fallback for raw sample audit |
| Density/pattern/cohort/correlation | Heatmap | Row dimension, column dimension, value metric, aggregation grain, visualMap/color scale, missing-vs-zero encoding, row/column density, label sampling, and exact cell tooltip/detail |
| Ordered movement/journey/workflow | Path chart | Step/link schema, start/end/order, metric basis, conversion/drop-off, Top N and aggregation, main-path/branch strategy, legend/filter separation, and transition detail fallback |
| Ordered stage conversion/loss | Funnel chart | Stage schema/order, shared population/cohort rule, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, legend/filter separation, and stage detail fallback |
| Hierarchy/parent-child structure | Tree chart | Root node, parent-child schema, depth/layer, visible-depth/default-expanded rules, Top N/`+N` child aggregation, orientation, expand/collapse/search, legend/filter separation, and node detail fallback |
| Entity relationship/dependency/network | Relation graph | Node/edge schema, relationship direction and weight, layout type, density limits, legend/filter separation, fitView/zoom/search, and node/edge detail fallback |
| Ranking/comparison | Sorted bar/table | Sort basis, top/bottom rule, exact values |
| Simple composition | Stacked bar or donut/pie only for `2-6` categories | Total basis, percent/value tooltip, `Top5 + 其他` merge rule, and bar/table fallback when categories exceed budget |
| Hierarchical composition/scale | Treemap / rectangular tree map | Hierarchy schema, non-negative additive area metric, parent/leaf aggregation, Top N/`其他`, label thresholds, color semantics, breadcrumb/drilldown, and table/bar/tree fallback |
| Hierarchical path/share | Sunburst | Hierarchy schema, non-negative additive angle metric, parent/child aggregation, visible depth/ring budget, Top N/`其他`, sector label thresholds, center content, breadcrumb/drilldown, and Treemap/bar/table fallback |
| Relationship/outlier/quadrant | Scatter/bubble | X/Y metric names and units, axis range/baseline rule, point density, reference lines/quadrants, tooltip exact values, and aggregation fallback |
| Multi-metric object profile/anomaly | Parallel coordinates | Object id/name, `3-12` ordered dimensions, axis range/unit/direction, scaling mode, plot/axis spacing, sample opacity/sampling, brush/highlight, and table/scatter/bar fallback |
| Geography/spatial distribution | Map/geographic | Geography key or lon/lat fields, map resource/projection, fitBounds, map viewport budget, visualMap/legend, key-label-only rule, dense point/flow fallback, and tooltip exact values |
| Cause or contribution | Waterfall, decomposition chart, ranked factors, table | Additive or attribution logic |
| Process/conversion | Funnel/process/flow only with ordered stages | Shared population/cohort rule, conversion/drop formulas, and detail fallback |
| Multi-dimensional score/profile | Radar only for `5-8` recommended dimensions, shared score scale, and `<=3` visible series | Dimension labels, target/actual semantics, tooltip exact/raw values, and fallback when dimensions/objects overflow |
| Audit/detail lookup | Table/S2/detail drawer | Row grain, key fields, export permission |

## Metric Display Rules

- Every metric must define raw scale, display scale, unit, precision, null/zero rule, period, comparison baseline, and owner.
- Chinese report UI should display rate, completion, change-rate, variance-rate, YoY, and MoM with `%` by default.
- Use positive-red-up and negative-green-down for change-rate indicators unless a named domain rule overrides it.
- A displayed percentage must distinguish ratio value `0.42`, percent value `42`, and formatted value `42%`.
- Avoid terms such as `pt`, `p.p.`, and `percentage point` in Chinese UI unless the product explicitly requires them.

## Interaction Feedback Rules

- Hover/focus must not move, scale, or resize fixed-grid blocks.
- Prefer border color, outline, inset glow, or stable box-shadow inside component bounds.
- Focus-visible must be visible for keyboard users and must not rely only on color when possible.
- Reduced-motion behavior should keep state feedback but remove nonessential transitions.
- Disabled states must preserve layout and explain unavailable actions when the action is important.

## Governance Status

Use these statuses consistently:

| Status | Meaning |
| --- | --- |
| `stable` | Approved source, owner, scope, and acceptance checks exist |
| `variant` | Allowed alternative for a named scenario, with limits |
| `deprecated` | Existing pattern should be migrated away |
| `gap` | Required rule is missing or source conflict is unresolved |
| `exception` | Temporary project-specific deviation with owner and expiry |

## Minimum Audit Checks

- Are color, typography, spacing, radius, shadow, and breakpoint tokens semantic and sourced?
- Are filter, KPI, chart, table, drawer/modal, action, and feedback components specified?
- Are metric display rules explicit for unit, precision, percentage/rate, and trend semantics?
- Are loading, empty, error, no-permission, stale, disabled, and partial-data states present?
- Are hover/focus effects geometry-safe and accessible?
- Are template rules inherited rather than rediscovered or changed ad hoc?
- Are allowed variants and deprecated patterns named?
- Does each stable rule have source, owner, adoption status, and regression check?
