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
- Page, section, and block titles are layout-owned. Component mappings may keep a `title` field as metadata, but component bodies should not render duplicate visible titles when the surrounding block already has one.
- Peer component groups or repeated sub-blocks inside one large parent block should use internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, columns `M >= N`, and minimal `M - N` among valid factor pairs. The resulting internal `N` rows must feed the parent-block height decision with `heightExpansionRows = ceil(N * 2 / 3)`. Do not pad arbitrary empty slots; the single prime-balancing cell must not create fake metrics or mock data. Split by business meaning, tabs, pagination, drawer, or another parent block when the factor pair is unreadable.
- Text summary components use `text-summary` and legal spans `4*1`, `5*1`, `6*1`, `7*1`, `8*1`, or `3*2`.
- Allocate larger spans to charts with long labels, dense legends, many categories, or horizontal comparisons.
- Allocate aspect-compatible spans to shape-sensitive visuals such as gauges, radar, maps, pies, flow paths, SVG/canvas diagrams, and custom ECharts graphics. If the required block ratio does not fit, choose a different visual, split the content, or use fullscreen/fit-to-screen rather than stretching the graphic.
- Do not force KPI cards, text summaries, charts, and tables into equal sizes if their content density differs.
- Give tables, decomposition trees, lineage graphs, maps, and Gantt charts dedicated scroll/fullscreen behavior.
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
- Process/conversion tasks have ordered stage logic before using funnel.
- Action tasks have owner, deadline, status, operation entry, and closure evidence.
- Data-trust tasks have source, version, difference, and audit evidence.
- Every component has a declared data source, grain, fields, formulas, affected filters, interaction state, and update trigger.
- Every filter maps to a field, query parameter, permission scope, or documented non-data behavior.
- Every control declares `controlSemantics` and `componentSchemaImpact`, and schema-changing perspectives are not hidden as ordinary filters.
- Filtered KPI totals, chart totals, table rows, drawer records, exports, jumps, and refresh share context.
- Selected objects reset or show stale-selection state when filters remove them from scope.
- Dense components have overflow, zoom, drawer, or fullscreen strategy.
- The mapping can be implemented within the `8 * N` rectangular parent grid, and any internal sub-blocks have explicit component owner, local size, `5px` parent inset, `5px` sibling gap, state, and overflow rules.

## Avoid

- Do not map one vague problem directly to one decorative chart.
- Do not use funnel, map, gauge, pie, or radar charts just because they look rich.
- Do not duplicate the same conclusion across multiple components.
- Do not leave first-screen components unbound to data.
- Do not hide field formulas,口径, source, filter mappings, or action payloads inside prose only.
- Do not use interactions that cannot preserve filter context.
- Do not invent unsupported layout spans when the report template has a legal span matrix.
