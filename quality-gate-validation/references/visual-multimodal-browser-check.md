# Visual Browser Regression And Multimodal Check

Use this shared reference whenever a runnable frontend page, report page, dashboard, big-screen, or prototype must be self-checked or tested visually.

Visual QA has two complementary tracks:

- Deterministic visual regression: Playwright/Cypress/headless browser screenshots plus baseline image diff for repeatable layout-regression detection.
- Multimodal explanatory review: screenshot inspection by a multimodal model to explain visual anomalies, usability impact, and likely repair direction.

Do not treat multimodal review as the only visual regression mechanism. Use deterministic evidence for repeatability and multimodal evidence for interpretation.

## Mandatory Sequence

For runnable pages, do the visual check in this order:

1. Open the target URL with a headless browser or browser automation tool.
2. Wait until the main page shell, charts, tables, fonts, and async data are stable.
3. Capture deterministic screenshots before judging visual quality.
4. Run deterministic checks:
   - Confirm nonblank rendering, stable viewport size, expected screenshot count, and key screenshot file paths.
   - If approved baselines exist, run image diff and record threshold, diff count/ratio, ignored or masked dynamic regions, and diff output paths.
   - If no approved baseline exists, mark deterministic regression as `baseline missing` and save the current screenshots as baseline candidates rather than claiming regression pass.
5. Run multimodal explanatory review on the screenshots when the model/service is available and visual acceptance is in scope.
6. Convert deterministic image-diff failures and multimodal anomalies into structured findings.
7. Feed findings back to the main workflow:
   - In frontend/prototype self-check, repair actionable issues and rerun deterministic diff plus multimodal review when available.
   - In testing workflow, write findings into the test result and defect feedback bundle.

Do not mark deterministic visual regression as passed without screenshot evidence and a passing baseline diff when a baseline is available. Do not mark explanatory visual review as passed without a multimodal review result. If the multimodal model is unavailable, record `multimodal: not run` with the service/tool blocker; deterministic regression may still pass, but overall visual QA should be `partial` unless the task explicitly only requires deterministic regression. If the page cannot be opened, record a blocker instead of skipping visual QA.

## Screenshot Coverage

Capture the smallest set that can prove the page is visually usable:

- First viewport at the target desktop size.
- Header/logo area for Haier or branded pages, including placeholder state when the asset is missing.
- Full-page screenshot when the page scrolls.
- Mobile/tablet screenshots when the page is responsive or embedded in variable containers.
- One screenshot after changing a representative primary filter, plus the expected visible data-change assertion for affected components when the filter is supposed to change data.
- One screenshot or focused crop after switching each non-default business domain, report theme, management object, subject area, or first-level perspective when those controls exist. The assertion must cover metric names, titles/summaries, table dimensions/headers, component set, specialty metrics, risk focus, and口径 labels, not only values.
- A dedicated crop for every donut/pie chart. Full-page screenshots cannot replace donut/pie crops because label-line, legend, title, and edge collisions are easy to miss at page scale.
- A dedicated crop for every radar chart. Full-page screenshots cannot replace radar crops because outer dimension labels, legend/filter separation, circular geometry, and label collisions are easy to miss at page scale.
- A dedicated crop for every Gauge chart. Full-page screenshots cannot replace Gauge crops because center value hierarchy, arc geometry, ticks, target/threshold labels, status text, local filters, and overflow states are easy to miss at page scale.
- A dedicated crop for every Detail Table. Full-page screenshots cannot replace Detail Table crops because row count, primary key visibility, header/body/pagination separation, column alignment, status tags, operation columns, local filters/search, and truncated-cell disclosure are easy to miss at page scale.
- A dedicated crop for every table with a complex/grouped header. Full-page screenshots cannot replace grouped-header table crops because group-to-leaf alignment, merged-cell span, whole-header fixation, frozen-column synchronization, header icon clutter, and useful body-row budget are easy to miss at page scale.
- A dedicated crop for every Composite Panel. Full-page screenshots cannot replace Composite Panel crops because shared topic, primary child dominance, child roles, shared filters/legends/units, linked selection state, short detail preview, responsive collapse, and parent/child state scope are easy to miss at page scale.
- A dedicated crop for every Analysis & Insight component. Full-page screenshots cannot replace these crops because conclusion-before-evidence, evidence/action/trust/source/freshness, annotation overlap, and explanatory empty/data-delay states are easy to miss at page scale.
- A dedicated crop for every Pivot Table. Full-page screenshots cannot replace Pivot Table crops because row/column dimension context, subtotal/grand-total placement, frozen headers, scroll behavior, conditional formatting, and exact-cell tooltip/drilldown evidence are easy to miss at page scale.
- A dedicated crop for every Combo chart. Full-page screenshots cannot replace Combo crops because shared x-axis alignment, left/right axis units, bar-line-target hierarchy, legend/filter separation, category density, and false dual-axis correlation are easy to miss at page scale.
- A dedicated crop for every scatter/bubble chart. Full-page screenshots cannot replace scatter crops because axis units, point density, label clutter, bubble overlap, reference lines, and quadrant labels are easy to miss at page scale.
- A dedicated crop for every parallel-coordinate chart. Full-page screenshots cannot replace parallel-coordinate crops because axis spacing, dimension titles, line density, brush/filter/legend separation, highlighted objects, and exact-value tooltip access are easy to miss at page scale.
- A dedicated crop for every map/geographic chart. Full-page screenshots cannot replace map crops because geography distortion, legend overlap, label clutter, dense point overlap, flow tangles, and weak/strong basemap balance are easy to miss at page scale.
- A dedicated crop for every candlestick/K-line chart. Full-page screenshots cannot replace K-line crops because candle density, red/green semantics, volume alignment, MA/indicator overload, crosshair/tooltip behavior, and price/time axis readability are easy to miss at page scale.
- A dedicated crop for every boxplot chart. Full-page screenshots cannot replace boxplot crops because box height, median line, whiskers, outliers, category labels, grouped density, and target markers are easy to miss at page scale.
- A dedicated crop for every matrix/time/calendar/correlation heatmap. Full-page screenshots cannot replace heatmap crops because visualMap, row labels, column labels, cell size, missing/zero encoding, all-cell value labels, and selected/anomaly highlights are easy to miss at page scale.
- A dedicated crop for every treemap/rectangular tree map. Full-page screenshots cannot replace treemap crops because parent groups, tiny labels, rectangle density, color legend, breadcrumb, local filters, and tooltip trigger areas are easy to miss at page scale.
- A dedicated crop for every sunburst chart. Full-page screenshots cannot replace sunburst crops because center text, ring width, visible depth, tiny sector labels, color legend, breadcrumb, local filters, and tooltip trigger areas are easy to miss at page scale.
- A dedicated crop for every funnel chart. Full-page screenshots cannot replace funnel crops because stage-label columns, bar/funnel body width, value/share labels, conversion/loss markers, target markers, stage density, legend/filter separation, and tooltip trigger areas are easy to miss at page scale.
- A dedicated crop for every path/user/process path chart. Full-page screenshots cannot replace path chart crops because start/end order, branch clutter, arrow direction, path-label collision, drop-off emphasis, Top N aggregation, legend/filter separation, and tooltip/detail evidence are easy to miss at page scale.
- A dedicated crop for every Sankey diagram. Full-page screenshots cannot replace Sankey crops because stage/layer spacing, ribbon density, node/link labels, Top N aggregation, loss/unknown nodes, legend/filter separation, and tooltip trigger areas are easy to miss at page scale.
- A dedicated crop for every relation/network graph. Full-page screenshots cannot replace relation graph crops because node/edge density, source/target direction, arrows, label clutter, legend/filter separation, search/zoom controls, fitView clipping, and hairball risk are easy to miss at page scale.
- DOM overflow evidence for domain navigation, Tabs, Segments, and first-level perspective controls at `1920x1080` and `1280x768`: each visible item/card content viewport must satisfy `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`. Screenshots are not a substitute for this evidence.
- Height-budget and DOM overflow evidence for fixed-height navigation/cards/KPI tiles/compact summaries: padding, explicit line-height, gaps, badge/status/footer heights, and `requiredContentHeight <= componentHeight`. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is a clipping defect unless the region is an intentional visible scroll area.
- Donut/pie option/config evidence for compact charts: category count, `TopN + 其他` merge rule, negative/all-zero handling, `legendBandHeight`, `labelLineBudget`, `radius`, `innerRadius` when donut, `center`, right-legend width budget when right legend is used, center metric rule, low-value label rule, tooltip/legend disclosure, and edge/bleed/hide-overlap settings.
- Radar option/config evidence when radar charts are present: dimension count, visible series count, shared score scale/standardization rule, `radar.center`, `radar.radius`, `radar.shape`, `radar.splitNumber`, `nameGap`, value-label strategy, local-filter/legend separation, and tooltip exact/raw-value payload.
- Gauge option/config evidence when present: one bounded progress/status metric, min/max range, current value, unit, `series.type: 'gauge'`, start/end angle, radius, center, arc width, `gaugeAreaH` or equivalent body budget, target/threshold/status semantics, business color direction, clamp/overflow behavior with true displayed value, local-filter fit, sparse ticks, and tooltip exact payload.
- Detail Table option/config evidence when present: row-level task, row grain, primary key/object field, total count, default sort, column metadata, visible column priority, type/width/alignment, table-body height budget, visible-row count, fixed header/frozen column behavior, pagination/search/sort/export provider scope, row detail/action payload, local-filter scope, tooltip disclosure, and loading/empty/error/no-permission states.
- Composite Panel option/config evidence when present: `compositePanelContract`, shared topic, analysis sequence, layout pattern, primary child id, child roles/priorities/min sizes, default `2-3` children and normal max `4`, primary visual weight `50-70%`, `contentH >= CH * 0.60`, panel-level local filter scope, child-only filter exception, shared legend/unit behavior, linked hover/click state, detail-preview row/column limit and route, responsive fallback, and parent/child loading/empty/error/no-permission states.
- Analysis & Insight option/config evidence when present: `analysisInsightContract` or equivalent metadata, subtype/family, conclusion, evidence or insufficient-data state, affected object/comparison/change/reason/source/freshness, recommended action/detail route or trust/definition disclosure, component-local filter scope, tooltip payload, and loading/empty/error/no-permission/data-delay states.
- Complex/grouped table-header option/config evidence when present: `columnTree` or nested grouped columns, business group nodes, real leaf fields, unit/definition metadata, computed `colSpan`/`rowSpan` or max-depth/leaf-count rules, parent group widths tied to visible leaf widths, fixed whole-header behavior, frozen row/primary columns during horizontal scroll, component-local filter vs per-column header-filter separation, sort/filter/definition icon limits, tooltip disclosure, group collapse/column settings/fullscreen fallback, useful body-row budget, and loading/empty/error/no-permission states.
- Pivot Table option/config evidence when present: multidimensional cross-summary task, `visualType: pivot`, S2/project analytical renderer, row dimensions, column dimensions, measures, aggregation formulas/functions, percentage/rate numerator-denominator recomputation rules, subtotal/grand-total placement, hierarchy depth, natural time sorting, fixed column header/frozen row dimension behavior, `pivotAreaH` and visible-row budget, row/column density fallback, restrained conditional formatting, exact cell tooltip/drilldown payload, local-filter scope, and loading/empty/error/no-permission states.
- Combo option/config evidence when present: paired scale + rate/trend/target relationship, shared ordered x-axis, bar metric/unit, line or target metric/unit, left/right y-axis mapping, dual-axis rationale when used, visible series `<=4`, category-density fallback, `plotH >= CH * 0.48`, legend/filter separation, target/reference label rule, and axis-trigger tooltip exact payload.
- Scatter/bubble option/config evidence when present: X/Y metric names and units, axis range/baseline rules, point count, radius/opacity/label density strategy, bubble `symbolSize` sqrt mapping when present, color/size legend behavior, reference line/quadrant/trend-line encoding, tooltip exact-value payload, and aggregation/sampling/zoom strategy for dense points.
- Parallel-coordinate option/config evidence when present: object/sample identity fields, `3-12` ordered dimensions or `parallelAxis`, per-axis unit/range/direction, independent or standardized scale mode, `axisGap`/plot-height budget, sample count, line opacity, sampling/aggregation strategy, Top/anomaly/selected highlight, brush semantics when present, legend/filter separation, exact object tooltip payload, and too-many-dimensions/samples fallback.
- Map/geographic option/config evidence when present: geography field or lon/lat binding, map resource/projection, fitBounds/center/zoom/aspect strategy, map viewport budget, `visualMap`/legend behavior, basemap boundary/fill strength, point/bubble radius or flow-width mapping when present, label strategy, clustering/heatmap/TopN fallback, missing-coordinate/unmatched-region handling, drilldown/zoom controls when present, and tooltip exact-value payload.
- Candlestick/K-line option/config evidence when present: ordered OHLC fields, OHLC validation, time spacing mode, unit, market color convention, y-axis price range padding, visible candle count, candle body width strategy, main/volume/indicator height budget, MA/indicator count, volume alignment and opacity, `axisPointer`/crosshair, `dataZoom`/recent-window strategy, high/low/latest label strategy, tooltip exact-value payload, and missing OHLC/volume states.
- Boxplot option/config evidence when present: raw-sample or precomputed-statistics contract, sample counts and thresholds, Q1/median/Q3/IQR, whisker/outlier rule, unit, axis range and padding, plot height budget, category/group density, box width, median/whisker/target styling, outlier jitter or aggregation strategy, key-label-only rule, tooltip five-number summary, outlier detail payload, and tiny-sample/no-outlier/all-same-value states.
- Heatmap option/config evidence when present: row dimension, column dimension, value metric, aggregation grain, unit, color-scale type, visualMap range, missing-vs-zero encoding, row/column density, matrix height budget, cell size, cell gap/radius, row/column label sampling, value-label threshold, highlight/anomaly rule, tooltip exact-value payload, and too-many-cells fallback.
- Treemap option/config evidence when present: hierarchy fields or `children`, parent/leaf aggregation, non-negative additive area metric, optional color metric, total/parent share formulas, Top N/`其他`, visible depth, treemap area budget, rectangle/label thresholds, color legend/visualMap, breadcrumb/drilldown when deep, tooltip exact path/value/share payload, and negative/all-zero/too-many-leaf fallback.
- Sunburst option/config evidence when present: hierarchy fields or `children`, parent/child aggregation, non-negative additive angle metric, optional color metric, total/parent share formulas, Top N/`其他`, visible depth/ring-width budget, sector label thresholds, center content, color legend/visualMap, breadcrumb/drilldown when deep, tooltip exact path/value/total-share/parent-share payload, and negative/all-zero/too-many-node fallback.
- Funnel option/config evidence when present: ordered stage dataset/schema, stage order, metric basis/unit, shared population or cohort rule, entry/final values, entry share, stage conversion, drop value/rate, total conversion, funnel area/column budget, stage-count density fallback, target/comparison encoding when present, legend/filter separation, tooltip exact stage payload, and denominator-zero/too-many-stage states.
- Path/user/process path option/config evidence when present: step/node dataset/schema, directed transition dataset/schema, start node, end node, order/layer, metric basis, conversion/drop-off formulas, path depth, Top N and "other" aggregation, node/link density tiers, main-path/branch strategy, path-width mapping, label limits, legend/filter separation, expand/collapse or fallback behavior, node/link tooltip payload, and missing start/end/too-many-path states.
- Sankey option/config evidence when present: node dataset/schema, directed link dataset/schema with `source`/`target`/`value`, layer/stage order, metric unit, non-negative value handling, node-value/flow-conservation rule, Top N/`其他`, node/link density tiers, `sankeyAreaH` budget, flow-width/color mapping, label limits, legend/filter separation, hover/click adjacency highlight, node/link tooltip payload, and missing source/target/negative/too-many-flow states.
- Relation/network graph option/config evidence when present: node dataset/schema, edge dataset/schema, node ids, edge source/target resolution, relationship direction and weight, node category/status, edge type/status, layout type, node/edge density tiers, node-size and edge-width mapping, label limits, legend/filter separation, fitView, roam/zoom/drag/reset/search behavior, node/edge tooltip payload, and missing node/edge/layout-failure states.
- One screenshot of opened custom filter popovers/dropdowns when filter visual acceptance is in scope.
- One screenshot focused on complex flow, Sankey, graph, tree, decomposition, or lineage diagrams when present.
- For diagrams with layer/stage/lane labels such as `L1/L2/L3`, capture the full diagram header/title band and the first row of nodes in the same screenshot so title-node collisions are visible.
- One screenshot after opening each important tab, drawer, modal, drilldown, fullscreen view, or export preview.
- Error, empty, loading, no-permission, and token-invalid states when those states are in scope and reachable.

Use stable screenshot file names that include page, viewport, state, and cycle, for example:

```text
visual-check/<page>-<viewport>-<state>-cycle-<n>.png
```

## Deterministic Baseline Diff

Use Playwright, Cypress, or an equivalent headless-browser screenshot diff path when a repeatable visual regression decision is needed.

Baseline rules:

- Store baselines in a stable path such as `visual-baseline/<page>/<viewport>/<state>.png` or the project's existing screenshot baseline folder.
- Store current screenshots and diff images separately, for example `visual-check/current/` and `visual-check/diff/`.
- Baselines must be reviewed or accepted intentionally. First-run screenshots are baseline candidates, not proof that no regression exists.
- Keep viewport, device scale factor, color scheme, locale, timezone, route, seed data, auth role, and feature flags stable between baseline and current screenshots.
- Mask or ignore only documented dynamic regions such as timestamps, random IDs, animated counters, maps/tiles, realtime values, ad hoc loading shimmer, or user avatar images.
- Use thresholds deliberately. Record pixel count/ratio and threshold values. Small antialiasing/font differences may be tolerated only when layout, text, charts, and controls remain readable.
- Any diff affecting core content, controls, chart/table geometry, logo placement, or first-viewport answer should be treated as a finding even if the raw pixel ratio is small.

Deterministic finding schema:

- `Finding ID`: `VDIFF-*`.
- `Screenshot`: current screenshot path.
- `Baseline`: baseline screenshot path or `missing`.
- `Diff`: diff image path when available.
- `Viewport/state`: desktop/mobile/full-page/filter/drawer/modal/etc.
- `Metric`: diff pixels, diff ratio, threshold, masked regions.
- `Severity`: `blocker`, `major`, or `minor`.
- `Location`: page, module, component, chart/table/card/control, or approximate screen region.
- `Impact`: why the repeated layout regression affects usability, data interpretation, or acceptance.
- `Likely owner`: `prototype`, `frontend`, `style/layout`, `data`, `environment`, or `unclear`.
- `Suggested fix`: concrete repair direction.
- `Retest criteria`: baseline diff and screenshot state that must pass after repair.

## Multimodal Anomaly Categories

Ask the multimodal model to inspect screenshots for:

- Layout offset: blocks are not aligned to the intended grid, content drifts out of its container, or spacing looks structurally broken.
- Excessive blank area: first viewport or component body has large unused space that weakens the core answer.
- Text overlap: titles, labels, values, legends, buttons, table cells, or tooltips overlap each other.
- Duplicate component title: a page shell title or block-owned title is repeated again inside an ECharts/S2/table/KPI/custom component body, creating redundant hierarchy or wasting component body space.
- Title-node collision: section headers, stage/layer/lane titles, group captions, or column labels overlap, touch, or visually attach to card borders, node cards, node titles, badges, connector paths, chart marks, legends, or child labels. This includes cases where a top stage label appears to sit inside or on the top edge of the first node card.
- Graphic overlap: chart marks, labels, legends, axes, maps, diagrams, table headers, or cards overlap.
- Text-graphic collision: business-question text, conclusion text, titles, labels, legends, chart marks, tables, cards, diagram nodes, connectors, or controls overlap, stack, or visually merge.
- Component too small: chart/table/KPI/detail content is compressed, unreadable, or occupies too little of its block.
- Internal component clipping: summary text, nested KPI grids, submetric tiles, metric titles, values, helper text, or actions are truncated by narrow columns, forced fixed grids, `nowrap`, ellipsis, or hidden overflow without tooltip/focus/drawer disclosure.
- Missing fixed-height budget: fixed-height navigation/cards/KPI tiles do not declare padding, explicit line-height, gaps, badge/status/footer heights, or a passing `requiredContentHeight <= componentHeight` calculation.
- Donut/pie budget failure: compact donut/pie charts lack category-count/merge rules, `legendBandHeight`, `labelLineBudget`, `radius`, `innerRadius` when donut, or `center`, use a right-side legend without a width budget, keep low-share outside labels that crowd the label ring, or do not reserve center metric space.
- Donut/pie crop failure: donut/pie labels, guide lines, legend, title, center text, or chart edge spacing collide, squeeze each other, clip, leave the card bounds, or make the center value unreadable in the dedicated component crop.
- Donut/pie data-semantics failure: the chart plots negative values, fakes all-zero shares, keeps more than `8` unmerged categories, lets `其他` become the largest unexplained category, or uses pie/donut when a bar/table is required for exact comparison.
- Radar budget failure: radar charts lack declared `radar.center`, `radar.radius`, outer label gap, ring count, dimension/series limits, or shared score scale; or local filters, metrics, legends, and the radar plot do not have separate reserved zones.
- Radar crop failure: dimension labels, value labels, legend, filter, metric strip, title, tooltip, or chart edge spacing collide, clip, leave bounds, or compress the radar into an unreadable shape in the dedicated component crop.
- Radar scale/semantics failure: the chart plots mixed raw units directly, uses more than `10` dimensions, shows more than `3` objects at equal weight, hides exact/raw values without tooltip/detail, or uses radar when a table/bar chart is required for precise comparison.
- Gauge budget failure: Gauge charts lack one bounded metric, min/max range, unit, current value, target/threshold/status semantics, business color direction, `gaugeAreaH` or equivalent body budget, start/end angle, radius, center, arc width, clamp/overflow behavior, or exact tooltip/detail.
- Gauge crop failure: center value, unit, arc, min/max ticks, target marker, threshold labels, status text, local filters, legend, tooltip trigger area, footer, or state messages collide, clip, leave bounds, or compress the Gauge into an unreadable dial in the dedicated component crop.
- Gauge semantics failure: the chart is used for category comparison, trend, composition, exact audit, many gauges, an unbounded metric, or decorative variety; uses pointer mode without monitoring/risk/load semantics; hides true over-max/under-min values; or lacks table/detail access for exact range, target, threshold, and status evidence.
- Analysis & Insight budget failure: the component lacks `analysisInsightContract`, subtype/family, conclusion-before-evidence, evidence or insufficient-data state, affected object/comparison/change/reason/source/freshness, action/detail/trust/definition disclosure, or loading/empty/error/no-permission/data-delay states.
- Analysis & Insight crop failure: conclusion, evidence, action, definition/source/freshness labels, local filters, annotation bubbles, tooltip triggers, or state messages collide, clip, visually merge, or dominate the primary chart/table they explain.
- Analysis & Insight semantics failure: the component uses generic "智能洞察", "建议关注", "有所变化", essay-like text, full-card red warning, or decorative icons without concrete evidence, affected object, action, trust context, or state handling.
- Detail Table budget failure: the table lacks row grain, primary key, default sort, prioritized visible columns, table-body height budget, visible-row budget, fixed-header/frozen-column rules, search/sort/pagination/export scope, row detail/action, or hidden-value disclosure.
- Detail Table crop failure: header, body rows, pagination, search/local filters, status tags, operation column, summary row, tooltips, or state messages collide, clip, visually merge, or show fewer than `3` useful rows without a named preview/detail-route exception.
- Detail Table semantics failure: the table is an unprioritized source-field dump, exposes too many columns without scroll/column settings/drawer fallback, adds checkbox/actions without a workflow, colors ordinary numbers, uses every-column sorting, or applies global search/sort/pagination client-side over unbounded data.
- Complex/grouped table-header budget failure: the table lacks grouped-column metadata, leaf-field mapping, span/depth rules, unit/definition disclosure, fixed whole-header behavior, frozen row/primary columns, density fallback, or enough useful body rows.
- Complex/grouped table-header crop failure: parent group headers do not align with child leaf columns, merged cells visually detach from the body, top-left header and frozen columns desynchronize during horizontal scroll, multi-level headers clip or crowd, sort/filter/definition icons overwhelm labels, or the header consumes body rows.
- Complex/grouped table-header semantics failure: grouped headers are decorative color bands over unrelated fields, use absolute-positioned labels over a flat table, expose every column as a filter/control, use more than `3` levels in report display mode without collapse/fullscreen, or use a grouped header where a flat/split/Pivot Table would be clearer.
- Pivot Table budget failure: the table lacks row dimensions, column dimensions, measure metadata, aggregation functions/formulas, subtotal/grand-total rules, `pivotAreaH`/visible-row budget, fixed column header/frozen row dimension behavior, density fallback, or exact cell tooltip/drilldown.
- Pivot Table crop failure: row headers, column headers, measure headers, data cells, subtotals, grand totals, local filters, scrollbars, tooltips, or state messages collide, clip, visually merge, lose dimension context, or show fewer than `4` useful body rows without a named preview/detail-route exception.
- Pivot Table semantics failure: the component is a raw-detail table, decorative matrix, static screenshot, or Excel-like field-well clone instead of a bounded row-dimension × column-dimension × measure cross-summary; totals sum percentages directly instead of recomputing numerator/denominator ratios; or conditional formatting turns the whole grid into an unreadable color block.
- Combo budget failure: Combo charts lack a paired business relationship, shared ordered x-axis, bar metric/unit, line or target metric/unit, left/right y-axis mapping, visible series limit, dual-axis rationale, category-density fallback, plot-height budget, or exact tooltip/detail.
- Combo crop failure: bars, line points, target/reference labels, x-axis labels, left/right axes, legends, local filters, metric strip, tooltip trigger area, footer, or state messages collide, clip, overplot, or shrink the plot below `plotH >= CH * 0.48` in the dedicated component crop.
- Combo semantics failure: the chart combines unrelated metrics, hides right-axis units, implies unsupported correlation through dual axes, exceeds `4` visible series, uses dense category labels without scroll/sampling, or should be split into bar/line/table for exact audit.
- Scatter/bubble budget failure: scatter charts lack X/Y units, axis range/baseline rules, plot budget, density strategy, bubble size mapping, reference/quadrant/trend encoding rules, or tooltip exact-value payload.
- Scatter/bubble crop failure: point labels crowd the point cloud, bubbles obscure too many points, axes/legends/reference labels collide, quadrant labels or backgrounds overpower points, or the plot area is too small to read the relationship.
- Scatter/bubble semantics failure: the chart uses only one numeric metric, hides exact object values, shows all labels in a dense chart, lacks aggregation for `N > 1000`, or uses scatter when trend/composition/category comparison is the real task.
- Parallel-coordinate budget failure: parallel-coordinate charts lack object/sample schema, `3-12` ordered dimension fields, per-axis unit/range/direction, scale mode, axis-gap or plot-height budget, sample-density strategy, line opacity, highlight/brush rules, or exact object tooltip payload.
- Parallel-coordinate crop failure: axes, dimension labels, lines, brush ranges, legends, local filters, metric strip, or state messages collide, clip, overplot, or make the object profile unreadable in the dedicated component crop.
- Parallel-coordinate semantics failure: the chart is used for `1-2` metrics, single ranking, exact row audit without a table, random dimension order, mixed units without standardization/axis disclosure, too many dimensions or samples without filtering/sampling/aggregation, or decorative line-web variety without object evidence.
- Map/geographic budget failure: maps lack geography binding, map resource/projection, aspect-safe fitBounds, map viewport budget, visualMap/legend semantics, label strategy, dense point/flow fallback, missing-geo states, or tooltip exact-value payload.
- Map/geographic crop failure: administrative shapes, routes, or coordinate layers are stretched; legend covers high-value regions, dense points, or key routes; labels crowd the map; basemap overpowers data; point bubbles obscure the geography; or flow routes become unreadable.
- Map/geographic semantics failure: the chart has no real geography decision dimension, uses a map for ordinary category ranking, hides unmatched regions/missing coordinates, displays all region/point labels by default, lacks clustering/heatmap for dense points, or lacks TopN/table fallback for dense flows.
- Candlestick/K-line budget failure: K-line charts lack OHLC fields, OHLC validity checks, unit, market color convention, price range padding, candle density/dataZoom strategy, main/volume/indicator height budget, crosshair tooltip, or missing OHLC/volume states.
- Candlestick/K-line crop failure: candles are too thin or visually merged, volume bars do not align with candles, MA/indicator lines overpower candles, price/time labels collide, crosshair/tooltip covers the newest candles, or the main plot is too small to read volatility.
- Candlestick/K-line semantics failure: the chart uses K-line for single-value trend data, applies the wrong red/green market convention, labels every candle, shows too many technical indicators by default, hides exact OHLC values, or lacks recent-window/dataZoom fallback for dense histories.
- Boxplot budget failure: boxplot charts lack sample/statistical contract, sample-size thresholds, Q1/median/Q3/IQR, whisker/outlier rule, plot height budget, category/group density limits, outlier display strategy, or exact five-number tooltip/detail.
- Boxplot crop failure: boxes, median lines, whiskers, target markers, outlier points, legends, labels, axes, or chart edge spacing collide, clip, overplot, or make the distribution unreadable in the dedicated component crop.
- Boxplot semantics failure: the chart uses boxplot for a single aggregate ranking, trend, composition, or tiny-sample comparison without fallback; hides sample count or outlier rule; labels every statistic permanently; or lacks table/detail access to raw samples and outliers.
- Heatmap budget failure: heatmaps lack row/column/value/aggregation contract, unit, visualMap/color-scale rule, color range, missing-vs-zero encoding, matrix height budget, row/column density limits, cell-size thresholds, label sampling, value-label rule, or exact cell tooltip/detail.
- Heatmap crop failure: heatmap cells, row labels, column labels, visualMap, local filters, metric strip, value labels, highlights, or chart edge spacing collide, clip, overplot, or make the color pattern unreadable in the dedicated component crop.
- Heatmap semantics failure: the chart uses heatmap for one-dimensional ranking, few exact values, tiny variance, unclear color meaning, missing values rendered as zero, all-cell permanent labels in dense matrices, correlation without a diverging scale, or too many cells without scroll/aggregation/fallback.
- Treemap budget failure: treemaps lack hierarchy schema, parent/leaf aggregation, non-negative additive area metric, optional color metric semantics, treemap area budget, Top N/`其他`, visible-depth rule, label thresholds, color legend/visualMap, breadcrumb/drilldown when deep, or exact path/value/share tooltip/detail.
- Treemap crop failure: parent groups, child rectangles, labels, legends/visualMap, breadcrumbs, local filters, metric strip, tooltip trigger areas, footer, or state messages collide, clip, overplot, hide structure, or render as a tiny unreadable mosaic in the dedicated component crop.
- Treemap semantics failure: the chart uses treemap for trend, exact comparison, negative area values, unclear hierarchy, ordinary tree expansion, or decorative visual variety; uses rate/score/change as area; forces text into tiny rectangles; lacks Top N/`其他`; or lacks table/detail access to exact path/value/share.
- Sunburst budget failure: sunbursts lack hierarchy schema, parent/child aggregation, non-negative additive angle metric, optional color metric semantics, sunburst area budget, visible depth/ring-width rule, Top N/`其他`, sector label thresholds, center content, color legend/visualMap, breadcrumb/drilldown when deep, or exact path/value/total-share/parent-share tooltip/detail.
- Sunburst crop failure: center text, rings, sector labels, legends/visualMap, breadcrumbs, local filters, metric strip, tooltip trigger areas, footer, or state messages collide, clip, overplot, hide hierarchy, or render as a tiny unreadable multi-ring pie in the dedicated component crop.
- Sunburst semantics failure: the chart uses sunburst for single-level share, trend, exact ranking, negative angle values, unclear hierarchy, ordinary tree expansion, or decorative visual variety; uses rate/score/change as angle; forces text into tiny sectors; lacks Top N/`其他`; or lacks table/detail access to exact path/value/total-share/parent-share.
- Funnel budget failure: funnel charts lack ordered stage schema, shared population/cohort logic, metric basis/unit, entry/final values, entry share, stage conversion, drop value/rate, total conversion, funnel area budget, stage-count fallback, target/comparison behavior when present, legend/filter separation, or exact stage tooltip/detail.
- Funnel crop failure: stage labels, bar/funnel body, value/share labels, conversion/loss markers, target markers, legends, local filters, metric strip, tooltip trigger areas, footer, or state messages collide, clip, overplot, hide the conversion order, or render as a cramped decorative funnel in the dedicated component crop.
- Funnel semantics failure: the chart uses a funnel look for unordered ranking, trend, simple composition, dense branching, mixed people/order/amount口径, or decorative variety; highlights every loss strongly; lacks denominator/cohort evidence; or lacks table/detail access to exact stage values and conversion/drop rates.
- Path chart budget failure: path charts lack step/link schema, start/end/order, metric basis, conversion/drop-off formulas, path depth, Top N/aggregation, path area budget, node/link density limits, label strategy, legend/filter separation, or exact node/link tooltip/detail.
- Path chart crop failure: nodes, links, arrows, labels, legends, local filters, metric strip, drop-off branches, abnormal paths, or state messages collide, clip, overplot, hide the main path, or render as an unreadable all-branch path in the dedicated component crop.
- Path chart semantics failure: the chart uses a journey look for ranking, composition, unordered entity relationships, geographic route, or exact row audit; hides start/end/order; labels every path; lacks Top N/aggregation for dense branches; or lacks table/detail access to exact nodes and transitions.
- Sankey budget failure: Sankey diagrams lack node schema, directed link schema with `source`/`target`/`value`, layer/stage order, metric unit, non-negative value handling, node-value/flow-conservation rule, `sankeyAreaH` budget, Top N/`其他`, node/link density strategy, flow-width mapping, label strategy, legend/filter separation, or exact node/link tooltip/detail.
- Sankey crop failure: nodes, ribbons, node labels, link labels, legends, local filters, metric strip, tooltip trigger areas, footer, or state messages collide, clip, overplot, hide the main flow, or render as an unreadable all-link ribbon mass in the dedicated component crop.
- Sankey semantics failure: the chart uses a flow look for simple ranking, single-level composition, no source-target data, negative values, exact row audit, or decorative variety; lets flow disappear without loss/unknown/other nodes; labels every link; lacks Top N/`其他`; or lacks table/detail access to exact source-target values and shares.
- Tree chart budget failure: tree charts lack root node, parent-child schema or children array, node fields, depth/layer, visible-depth/default-expanded rules, Top N/`+N` child aggregation, orientation, tree area budget, node/child density limits, expand/collapse/search behavior, label strategy, legend/filter separation, or exact node tooltip/detail.
- Tree chart crop failure: root, levels, branches, connectors, node labels, expand/collapse controls, legends, search, local filters, metric strip, or state messages collide, clip, overplot, hide parent-child structure, or render as an unreadable all-expanded tree in the dedicated component crop.
- Tree chart semantics failure: the chart uses a tree look for many-to-many relationships, area composition, ranking, or exact row audit; hides root/parent-child evidence; expands every node by default; lacks Top N/`+N`/tree-list fallback for dense branches; ignores multiple-parent/circular-reference data; or lacks table/detail access to exact node evidence.
- Relation graph budget failure: relation graphs lack node/edge schema, source/target integrity, relationship direction/weight, layout type, density tiers, node category and edge type limits, label strategy, legend/filter separation, fitView/zoom/search controls, or exact node/edge tooltip/detail.
- Relation graph crop failure: nodes, edges, arrows, labels, legends, search, zoom controls, local filters, group areas, or state messages collide, clip, overplot, or form an unreadable hairball in the dedicated component crop.
- Relation graph semantics failure: the chart uses a network look for ranking, trend, composition, or exact row audit; hides relationship direction/weight; labels every node/edge permanently; lacks filtering/aggregation/neighborhood focus for dense data; or lacks table/detail access to exact nodes and edges.
- Crowded component distribution: repeated peer cards/charts/tiles are too narrow, too small, or arranged in an awkward long strip instead of a balanced `M * N` pattern when space allows.
- Clipping or truncation: important text, values, legends, axes, controls, drawers, modals, or table content is cropped.
- Nonblank rendering: charts, canvases, maps, icons, logos, images, and tables render with visible content.
- Brand/logo acceptance: required logo or declared placeholder is visible, uses the correct light/dark variant, keeps aspect ratio, and is not clipped. For custom `htmlReplica` or `freeDesign` pages, a real bundled Haier logo is required; placeholder is a blocker.
- Sample fidelity: for sample/screenshot/HTML-source restoration, shell, module order, control count, hierarchy, card proportions, and first viewport match the source unless an enhancement is labeled.
- Control surface quality: primary filters use a styled design-system/custom select/dropdown surface; naked native `<select>` controls are not accepted as final visuals.
- Perspective semantics mismatch: domain/theme/management-object/subject-area switching is shown as a normal filter while component schema changes, or the non-default perspective leaves default metric names, titles, table headers, specialty metrics, or口径 labels in place.
- Perspective navigation clipping: domain navigation, Tabs, Segments, or first-level perspective cards fail DOM no-clipping checks even when screenshots appear acceptable.
- Perspective data-chain mismatch: navigation percentages, overview KPIs, journey cards, or chart summaries disagree under the same domain/statistical口径 and active filters.
- Complex diagram spacing: layer numbers, stage/layer/lane titles, group captions, labels, nodes, connectors, ribbons, and edges in flow/Sankey/graph/tree/decomposition visuals have at least 16px visible separation and do not collide with rail, title-band, ribbon, or edge-bend zones.
- Complex diagram title band: layer/stage/lane titles reserve a separate top/side title band with at least 16px spacing from the nearest node, card border, connector, or label.
- Bad visual proportion: primary KPI, chart, table, or conclusion area is visually underweighted compared with decorative or secondary elements.
- Broken scroll behavior: page, table, drawer, modal, or chart needs scroll/zoom but no usable control is visible.
- Low readability: font too small, contrast too weak, dense labels unreadable, or long values not inspectable.
- Stale/prototype residue: visible `mock`, `demo`, `示例`, placeholder text, wrong title, or irrelevant explanatory copy.

## Finding Schema

Every visual anomaly must be recorded as:

- `Finding ID`: `VIS-*`.
- `Screenshot`: screenshot path or URL.
- `Viewport/state`: desktop/mobile/full-page/filter/drawer/modal/etc.
- `Category`: one category from the anomaly list.
- `Severity`: `blocker`, `major`, or `minor`.
- `Location`: page, module, component, chart/table/card/control, or approximate screen region.
- `Observation`: what the multimodal model sees.
- `Impact`: why it affects usability, data interpretation, or acceptance.
- `Likely owner`: `prototype`, `frontend`, `style/layout`, `data`, `environment`, or `unclear`.
- `Suggested fix`: concrete repair direction.
- `Retest criteria`: which screenshot/state must pass after repair.

## Severity Standard

- `blocker`: the page is blank, core conclusion cannot be read, critical data is hidden, main interaction is unusable, deterministic diff breaks a key acceptance area, text/graphic collision hides core content, title-node collision hides or corrupts a key layer/component title, critical metric title/value text is clipped without disclosure, or the screenshot cannot support acceptance.
- `major`: a key component is readable only with difficulty, a chart/table/card is visibly distorted, duplicated titles waste meaningful body space, layout is clearly broken, components are cramped when a balanced layout is available, summary/KPI internal cells truncate business labels, a stage/layer/lane title touches or visually attaches to a card/node/connector, deterministic diff changes important geometry/content, or a normal user may misread the result.
- `minor`: polish issue, secondary spacing issue, non-critical alignment/diff problem, or low-risk text/visual density issue.

## Feedback Loop

For self-check and repair workflows:

1. Add visual findings to the current self-check report.
2. Repair all `blocker` and `major` `VDIFF-*` and `VIS-*` findings unless blocked by missing product/design input.
3. Re-capture the affected screenshot states.
4. Re-run deterministic baseline diff.
5. Re-run multimodal inspection on the new screenshots when available.
6. Stop only when findings are resolved, downgraded with evidence, accepted as partial with owner decision, or the configured repair-cycle limit is reached.

For testing workflows:

1. Attach screenshot paths, baseline diff artifacts, and multimodal findings to test evidence.
2. Convert every `blocker` or `major` `VDIFF-*` or `VIS-*` finding into a defect item.
3. Assign likely owner and retest criteria.
4. Do not report deterministic visual regression as pass when required screenshots or baseline diffs were not captured.
5. Do not report multimodal explanatory review as pass when required screenshots were not reviewed by the model.
