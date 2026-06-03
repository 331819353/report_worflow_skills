# 07 Routing Layout Quality

Use this reference when the mapping must route to report-type skills, fit layout/style rules, or produce a final specification.

## Report Type Routing

Map information patterns to these skills:

- `status-overview-report-design`: current status, health judgment, target progress, variance, trend, structure, risk entry.
- `analysis-diagnostic-report-design`: phenomenon, driver, cause, attribution, decomposition, evidence, recommendation.
- `detail-query-report-design`: records, fields, filters, sorting, export, row detail, source object.
- `performance-evaluation-report-design`: target completion, score, rank, tier, benchmark, fairness, improvement gap.
- `review-recap-report-design`: period story, conclusion, major change, reason, risk, next action, export to PPT/PDF.
- `anomaly-monitoring-report-design`: rule breach, severity, affected object, owner, SLA, handling status.
- `operational-execution-report-design`: task, owner, deadline, progress, blocker, evidence, acceptance, closure.
- `reconciliation-traceability-report-design`: source,口径, version, matching result, difference, lineage, correction, audit log.

When one page mixes multiple intents, choose one primary type for page logic and use secondary types only for local blocks.
Do not create a separate domain overlay. Domain words such as 产业, 区域, 国家, 品牌, 渠道, 客户, or 产品 are handled as theme, object, dimension, filter, drilldown hierarchy, or narrative context inside the selected report type.

## Layout Coordination

- Put high-level judgment before detailed evidence unless the report type is detail query or reconciliation-first.
- In sample/source restoration, distinguish business necessity from visual restoration. A visible module should be `businessRequired` only when it directly answers the stated report question; otherwise classify it as `sampleStructure` or `optionalEnhancement`.
- Use the `8 * N` grid from `report-visual-layout-design`; every component must occupy a rectangular group of blocks.
- Choose each component's span from the legal component span matrix in `report-visual-layout-design`.
- Preserve the scrollable template block-height rule: every resolved block must be at least 220px tall, and layouts taller than 1080px must scroll vertically instead of compressing rows. Fixed sci-fi/big-screen templates are exempt.
- Page, section, and block titles are layout-owned. Component mappings may keep a `title` field as metadata, but component bodies should not render duplicate visible titles when the surrounding block already has one.
- Peer component groups should use balanced `M * N` distribution where possible: 4 -> `2 * 2`, 6 -> `3 * 2`, 8 -> `4 * 2`, 9 -> `3 * 3`; prefer columns greater than rows unless the count naturally fits a square.
- Text summary components use `text-summary` and legal spans `4*1`, `5*1`, `6*1`, `7*1`, `8*1`, or `3*2`.
- Allocate larger spans to charts with long labels, dense legends, many categories, or horizontal comparisons.
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
6. Component bundle mapping with priority.
7. Mock/data model: datasets, row grain, fields, formulas, signals, edge cases.
8. Filter/query model: filters, option sources, defaults, cascades, permissions, query params.
9. Interaction model: clickable objects, interaction type, parameters, state preservation, failure states.
10. Report type routing.
11. Unified data/filter/component/interaction binding matrix.
12. Layout and style constraints.
13. Missing information, assumptions, and removed decorative components.

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
- Filtered KPI totals, chart totals, table rows, drawer records, exports, jumps, and refresh share context.
- Selected objects reset or show stale-selection state when filters remove them from scope.
- Dense components have overflow, zoom, drawer, or fullscreen strategy.
- The mapping can be implemented within the `8 * N` rectangular grid.

## Avoid

- Do not map one vague problem directly to one decorative chart.
- Do not use funnel, map, gauge, pie, or radar charts just because they look rich.
- Do not duplicate the same conclusion across multiple components.
- Do not leave first-screen components unbound to data.
- Do not hide field formulas,口径, source, filter mappings, or action payloads inside prose only.
- Do not use interactions that cannot preserve filter context.
- Do not invent unsupported layout spans when the report template has a legal span matrix.
