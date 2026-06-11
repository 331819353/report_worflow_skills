# 07 Routing Layout Quality

Use this reference when the mapping must route to report-type skills, fit layout/style rules, or produce a final specification.

## Report Type Routing

Map information patterns to `report-type-design` with one of these primary type labels:

- `status-overview`: current status, health judgment, target progress, variance, trend, structure, risk entry.
- `analysis-diagnostic`: phenomenon, driver, cause, attribution, decomposition, evidence, recommendation.
- `detail-query`: records, fields, filters, sorting, export, row detail, source object.
- `performance-evaluation`: target completion, score, rank, tier, benchmark, fairness, improvement gap.
- `review-recap`: period story, conclusion, major change, reason, risk, next action, export to PPT/PDF.
- `anomaly-monitoring`: rule breach, severity, affected object, owner, SLA, handling status.
- `operational-execution`: task, owner, deadline, progress, blocker, evidence, acceptance, closure.
- `reconciliation-traceability`: source,口径, version, matching result, difference, lineage, correction, audit log.

When one page mixes multiple intents, choose one primary type for page logic and use secondary types only for local blocks.
Do not create a decorative domain overlay. Domain words such as 产业, 区域, 国家, 品牌, 渠道, 客户, or 产品 must first be classified by control semantics: if they change metric names, component set, table schema, metric口径, or domain vocabulary, place them in navigation, route, tab, segment, or an explicit perspective layer; if they only narrow row scope, they may be ordinary filters.

## Layout Coordination

- Put high-level judgment before detailed evidence unless the report type is detail query or reconciliation-first.
- In sample/source restoration, distinguish business necessity from visual restoration. A visible module should be `businessRequired` only when it directly answers the stated report question; otherwise classify it as `sampleStructure` or `optionalEnhancement`.
- Use the `8 * N` grid from `report-visual-layout-design`; every top-level parent block must occupy a rectangular group of page-grid cells.
- Components may live directly in a parent block or inside internal sub-blocks. Use sub-blocks when multiple components jointly answer one business question inside the same parent block.
- Choose each parent block's span from the legal component span matrix in `report-visual-layout-design`, based on the dominant or most layout-demanding sub-block/component.
- Preserve the scrollable template block-height rule: every resolved block must be at least 220px tall, and layouts taller than 1080px must scroll vertically instead of compressing rows. Fixed sci-fi/big-screen templates are exempt.
- For bundled templates, do not allocate header or grid space to a standalone filter bar when the selected template already has native filter invocation. The mapping may define main filters, but the visual surface remains `filters[]` plus the template trigger/panel/popover/drawer or local title-band controls. Schema-changing first-level perspectives use nav/page/route/tab/segment/perspective state rather than template `filters[]`.
- Page layout owns page shell identity and block placement, while each block owns its own title/function/local-filter area. Component mappings may keep a `title` field as metadata, but component bodies should not render duplicate visible titles when the surrounding block already has one.
- Peer component groups or repeated sub-blocks inside one large parent block should use internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, columns `M >= N`, and minimal `M - N` among valid factor pairs. The resulting internal `N` rows must feed the parent-block height decision with `heightExpansionRows = ceil(N * 2 / 3)`. Do not pad arbitrary empty slots; the single prime-balancing cell must not create fake metrics or mock data. Split by business meaning, tabs, pagination, drawer, or another parent block when the factor pair is unreadable.
- Text summary components use `text-summary` and legal spans `4*1`, `5*1`, `6*1`, `7*1`, `8*1`, or `3*2`. When the text summary is an analysis/explanation/decision-support component, it must carry `analysisInsightContract`; recommended sizes are summary bar `36-56px`, small insight card `220-360px * 88-128px`, standard card `320-560px * 120-180px`, enhanced diagnosis card `480-720px * 160-240px`, side insight panel `220-320px * 240-480px`, and annotation bubble `120-240px * 40-96px`.
- Analysis & Insight blocks reserve title/function/local-filter handoff, conclusion, evidence, action/trust/source/freshness, tooltip/detail path, and state-message zones. Chart-side insights use `insightW = clamp(200px, W * 0.28, 320px)` and should stay within `25%` of a Composite Panel area unless the panel is explicitly an explanation panel.
- Allocate larger spans to charts with long labels, dense legends, many categories, or horizontal comparisons.
- Allocate aspect-compatible spans to shape-sensitive visuals such as gauges, radar, maps, pies, sunburst charts, treemap/rectangular tree maps, path charts, flow paths, SVG/canvas diagrams, and custom ECharts graphics. If the required block ratio does not fit, choose a different visual, split the content, or use fullscreen/fit-to-screen rather than stretching the graphic.
- Heatmap blocks must reserve enough matrix height for row labels, column labels, cells, and visualMap; carry row/column/value/aggregation and missing-vs-zero contracts; and use label sampling, scroll, pagination, aggregation, virtual rendering, or table fallback when rows/columns exceed readable density.
- Detail Table blocks must reserve title/local-filter, optional metric strip, optional compact search/tools, fixed header, body rows, optional summary row, pagination/total, and state-message zones; carry row grain, primary key, default sort, visible column priorities, column alignment/widths, row detail/action payload, search/sort/pagination/export scope, and fallback to horizontal scroll, frozen primary/action columns, column settings, drawer/detail, split table, or S2 when column/row density exceeds readability.
- Tables with complex/grouped headers must reserve multi-level header depth before body rows: `columnTree`, leaf-column count, `maxDepth`, computed `colSpan`/`rowSpan`, fixed whole-header behavior, frozen row/primary columns, component-local filter vs per-column header-filter separation, and fallback to group collapse, column settings, horizontal scroll, fullscreen, split table, Pivot Table, or Detail Table drilldown when header height or leaf-column density exceeds the block.
- Composite Panel blocks must reserve one shared title/function/local-filter handoff, optional subtitle/unit, optional metric strip, one dominant main child, auxiliary child areas, optional short detail preview, shared legend, tooltip/detail route, and state-message zones. Carry `compositePanelContract`, use default `2-3` children and normal max `4`, keep primary visual weight `50-70%` and `contentH >= CH * 0.60`, collapse P4/P3/P2 before shrinking P1, and split unrelated/equal-weight children into separate blocks.
- Pivot Table blocks must reserve title/local-filter, optional metric strip, row dimension header, multi-level column header, measure header, data cells, subtotal/grand-total bands, scroll/virtual viewport, tooltip/drilldown, and state-message zones; carry row dimensions, column dimensions, measures, aggregation formulas, subtotal/grand-total rules, frozen row dimensions, fixed column headers, and fallback to metric switch, dimension reduction, fullscreen, split table, heatmap, or Detail Table drilldown when density exceeds readability.
- Combo chart blocks must reserve title/local-filter, metric strip, legend, left/right axes, plot body, x-axis labels, target/reference labels, tooltip guide, and state-message zones; carry the paired scale + rate/target relationship, bar/line metric units, visible series limits, dual-axis rationale when used, and category-density fallback; and split into bar/line/table when the relationship, `plotH >= CH * 0.48`, or label budget fails.
- Parallel-coordinate blocks must reserve a wide multi-axis viewport for dimension titles, axes, line density, highlights, brush ranges, legends, local filters, and exact-value tooltip access; carry object/sample schema, `3-12` ordered dimensions, per-axis unit/range/direction, scaling mode, sample-density strategy, and fallback to dimension filter, horizontal scroll, sampling/aggregation, fullscreen, scatter/bar, or table when `plotH`/`axisGap` or sample readability fails.
- Path chart blocks must reserve enough horizontal path viewport for start, middle steps, end, branches, arrows, labels, legends, and local filters; carry step/link schema, start/end/order, transition metrics, conversion/drop-off rules, Top N/aggregation, and density strategy; and use horizontal scroll, aggregation, pagination, Sankey, relation graph, or table fallback when node/link counts exceed readable path density.
- Sankey blocks must reserve enough horizontal layer viewport for source, middle, and target node columns, ribbon curvature, node labels, metric strip, legend, and component-local filters; carry node schema, link schema with `source`/`target`/`value`, layer/stage order, metric unit, Top N/`其他`, node/link density, flow-width mapping, and tooltip/detail payload; and use aggregation, drilldown, fullscreen, path/funnel/table fallback, or a larger span when `sankeyAreaH`, layer spacing, node count, or link count exceeds readable flow density.
- Treemap blocks must reserve enough rectangle viewport for parent groups, child rectangles, parent labels, large-leaf labels, breadcrumbs, color legend/visualMap, metrics, and local filters; carry hierarchy schema, parent/leaf aggregation, non-negative additive area metric, optional color metric, total/parent share fields, Top N/`其他`, visible-depth rule, label thresholds, and tooltip/detail payload; and use drilldown, aggregation, fullscreen, ranked bar, tree, or table fallback when leaves, levels, tiny rectangles, negative values, or exact-audit needs exceed readable density.
- Sunburst blocks must reserve enough radial viewport for center content, visible rings, sector labels, breadcrumbs, color legend/visualMap, metrics, and local filters; carry hierarchy schema, parent/child aggregation, non-negative additive angle metric, optional color metric, total/parent share fields, visible-depth/ring-width rule, Top N/`其他`, sector label thresholds, and tooltip/detail payload; and use drilldown, aggregation, fullscreen, Treemap, ranked bar, tree, or table fallback when siblings, levels, tiny sectors, negative values, or exact-audit needs exceed readable density.
- Tree chart blocks must reserve enough hierarchy viewport for root, visible levels, child branches, connectors, expand/collapse controls, labels, legends, search, and local filters; carry root/parent-child schema, depth/layer, visible-depth/default-expanded rules, Top N/`+N` aggregation, orientation, and density strategy; and use collapse, search/locate, horizontal/vertical scroll, indented tree list, pagination, fullscreen, or table fallback when node counts, depth, or child counts exceed readable hierarchy density.
- Relation graph blocks must reserve enough graph viewport for nodes, edges, labels, legend, search, and zoom controls; carry node/edge schema, source/target integrity, direction/weight semantics, layout type, and density strategy; and use filtering, aggregation, local exploration, fullscreen, or table/tree fallback when node/edge counts exceed readable density.
- Map blocks must reserve enough viewport for spatial reading, carry region-code or lon/lat binding, declare map resource/projection, and use clustering/heatmap/TopN/table fallback for dense points or flows before the mapping is implementation-ready.
- Candlestick/K-line blocks must reserve enough vertical viewport for the main OHLC plot, carry ordered `open/high/low/close` fields, declare market color convention and dataZoom/recent-window fallback, and keep volume/indicator subplots secondary before the mapping is implementation-ready.
- Boxplot blocks must reserve enough plot height for boxes, whiskers, medians, targets, and outliers; carry sample/statistical contract and outlier rule; and use horizontal layout, scroll, pagination, or table fallback for many categories before the mapping is implementation-ready.
- Do not force KPI cards, text summaries, charts, and tables into equal sizes if their content density differs.
- Give tables, decomposition trees, sunbursts, treemaps, parallel-coordinate charts, hierarchy/tree charts, lineage graphs, path charts, relation graphs, maps, and Gantt charts dedicated scroll/fullscreen behavior.
- Keep action-heavy components close to the objects they act on.

## Component Style Coordination

Apply `report-component-style-design`:

- Titles must be clear, compact, consistently positioned, and not duplicated inside component bodies.
- Text, labels, legends, values, chart marks, tables, cards, and diagram nodes must not overlap, stack, visually merge, or truncate critical meaning.
- Components should be horizontally and vertically balanced inside their allocated block.
- Values should scale within sensible bounds, not with viewport width alone.
- Long labels need wrapping, abbreviation plus tooltip, or a larger block.
- Complex diagrams should use zoom and drag instead of overflowing the page.
- Components on the same page should share card base, radius, shadow, typography, status colors, and interaction states.
- Light enterprise components default to white cards with 8px radius, 24px padding, `0 2px 10px rgba(0, 0, 0, 0.05)` shadow, and no hard default border.
- Status fields, risk labels, SLA states, and trend judgments should map to badge/pill or icon+text components rather than plain text.
- Rate/change indicators in Chinese UI use `%`, and change-rate semantics are positive-red-up and negative-green-down with icon+text rather than color alone.
- Multi-series chart mappings must include a visible legend zone.

## Output Format

Produce a structured mapping:

1. Report theme, primary question, business decision, and user scenario.
2. Information inventory.
3. Answer atom decomposition.
4. Semantic role classification.
5. Content block mapping.
6. Parent block, sub-block, and component bundle mapping with priority.
7. Mock/data model: datasets, row grain, fields, formulas, signals, edge cases.
8. Control semantics model: perspective switches, global filters, local filters, drilldown params, and schema impact.
9. Filter/query model: filters, option sources, defaults, cascades, permissions, query params.
10. Interaction model: clickable objects, interaction type, parameters, state preservation, failure states.
11. Report type routing.
12. Unified data/filter/control/component/interaction binding matrix.
13. Layout and style constraints, including sub-block rules when a parent block is composed.
14. Missing information, assumptions, and removed decorative components.

For implementation tasks, component bundle, data model, filter model, interaction model, and binding matrix are mandatory.

## Quality Checklist

- Every key business concern maps to at least one visible block or interaction.
- Every component has a clear business question and semantic role.
- There is one primary answer area, not a flat wall of equal-weight charts.
- There is no chart chosen only for decoration.
- No source/sample module is marked `must-have` only because it exists visually.
- Exact-value tasks have table/card support.
- Cause-analysis tasks have decomposition support.
- Process/conversion tasks have ordered stage logic, shared population/cohort rules, conversion/drop formulas, stage density, and exact stage tooltip/detail before using funnel.
- Action tasks have owner, deadline, status, operation entry, and closure evidence.
- Data-trust tasks have source, version, difference, and audit evidence.
- Analysis & Insight components have `analysisInsightContract`, one main point, conclusion-before-evidence copy, concrete affected object/evidence, relevant action/trust/source/freshness, local-filter scope, and validation cases for loading, insufficient data, empty, error, no-permission, and data-delay states.
- Every component has a declared data source, grain, fields, formulas, affected filters, interaction state, and update trigger.
- Every filter maps to a field, query parameter, permission scope, or documented non-data behavior.
- Every control declares `controlSemantics` and `componentSchemaImpact`, and schema-changing perspectives are not hidden as ordinary filters.
- Filtered KPI totals, chart totals, table rows, drawer records, exports, jumps, and refresh share context.
- Selected objects reset or show stale-selection state when filters remove them from scope.
- Dense components have overflow, zoom, drawer, or fullscreen strategy.
- The mapping can be implemented within the `8 * N` rectangular parent grid, and any internal sub-blocks have explicit component owner, local size, `5px` parent inset, `5px` sibling gap, state, and overflow rules.

## Avoid

- Do not map one vague problem directly to one decorative chart.
- Do not use funnel, map, gauge, pie, radar, candlestick, boxplot, heatmap, combo, parallel coordinates, sunburst, treemap, path chart, tree chart, relation graph charts, pivot tables, complex grouped headers, Composite Panels, or oversized tables just because they look rich/complete; Composite Panels need one shared topic, one primary child, child roles/priorities/min sizes, shared local filter context, linked interaction, shared legend/unit, responsive fallback, and parent/child state rules; detail tables need a row-level lookup/evidence/action task, row grain, primary key, prioritized visible columns, default sort, pagination/search/export scope, row detail/action, and hidden-field disclosure; grouped table headers need real business field groups, `columnTree`, computed spans, depth and body-row budget, frozen header/columns, and tooltip definitions; pivot tables need a multidimensional aggregated cross-summary task, row dimensions, column dimensions, measures, aggregation functions/formulas, subtotal/grand-total rules, frozen headers, density fallback, and exact cell tooltip/drilldown; combo charts need one shared x-axis, a named scale + rate/target relationship, bar/line metric units, axis mapping, series limits, dual-axis rationale when present, category-density fallback, and exact tooltip/detail; gauges need one bounded progress/status metric, min/max, unit, current value, target/threshold/status semantics, business color direction, overflow behavior, and exact tooltip/detail; funnels need ordered stage schema, shared population/cohort rule, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, and exact stage tooltip/detail; maps need a real geography decision dimension, candlestick charts need real OHLC volatility data, boxplots need distribution/stability data with enough sample size, heatmaps need a real two-dimensional pattern plus clear color semantics, parallel coordinates need real multi-metric object profile data with ordered dimensions and line-density control, sunbursts need real hierarchy path plus non-negative additive angle values, ring/depth budgets, Top N/`其他`, and breadcrumb/drilldown, treemaps need real hierarchy plus non-negative additive area values and Top N/`其他`, path charts need ordered start-to-end transition data plus Top N/density control, tree charts need real root/parent-child hierarchy plus expand/collapse and density control, and relation graphs need real entity-relationship data plus density control.
- Do not duplicate the same conclusion across multiple components, and do not use generic "智能洞察", "建议关注", "有所变化", or essay-like explanation cards without evidence/action/trust context.
- Do not leave first-screen components unbound to data.
- Do not hide field formulas,口径, source, filter mappings, or action payloads inside prose only.
- Do not use interactions that cannot preserve filter context.
- Do not invent unsupported layout spans when the report template has a legal span matrix.
