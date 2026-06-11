---
name: report-design-system-governance
description: "用于沉淀、应用和验收可复用报表/仪表盘/经营分析/明细查询/专题分析页面的全流程设计系统与开发基线。用户提到报表、仪表盘、经营分析、明细查询、专题分析、KPI、图表、表格、筛选、指标口径、单位/百分比显示、报表前端实现、报表联调验收、数据对账、权限/空态/loading/error、导出/性能、报表风格一致、可复用报表规范、视觉规范、tokens时触发；不替代单个组件修复或模板工程复制。"
---

# Report Design System Governance

## Overview

Use this skill to turn one-off report UI rules into reusable product-level standards and to provide the report-specific baseline for report work across design, implementation, runtime QA, testing, acceptance, and handoff. It should produce or apply a governing specification, not a single page critique and not a loose style summary.

It complements `$report-visual-layout-design` and `$report-component-style-design`: those skills solve a page/component; this skill governs the shared system.

When the reusable standard must follow Haier enterprise application UI rules, use `$haier-enterprise-app-ui-design-spec` as the source for company-level tokens, component standards, scene templates, and cross-platform adaptation. This skill should govern adoption, variants, exceptions, and report-specific extensions instead of restating the Haier source.

## Use Modes

Choose one mode before writing the output:

| Mode | Use when | Output emphasis |
| --- | --- | --- |
| `create-standard` | A team needs a new reusable report design system | Complete token, component, visualization, state, responsive, and governance spec |
| `audit-standard` | Existing reports are inconsistent or a design system seems incomplete | Findings, missing rules, conflict matrix, and repair priorities |
| `merge-standards` | Multiple skills/docs/templates overlap | Source-of-truth decision, inherited rules, merged rule set, deprecated rules |
| `extend-haier-standard` | Haier enterprise UI is the required baseline | Haier inherited rules plus report-specific extensions and exceptions |
| `migration-plan` | Existing reports must adopt a standard | Versioned rollout, affected components, regression baselines, exception process |

## Inputs

- Existing report screenshots, design files, frontend components, CSS/theme tokens, charts, tables, forms, layouts, brand constraints, accessibility requirements, or inconsistency examples.
- Optional: target device sizes, chart library, component library, brand colors, dark/light mode, and legacy exceptions.

## Reference Loading

Always read `references/01-design-system-spec-template.md` when producing a reusable spec or audit result. Read `references/02-report-design-system-rule-catalog.md` when the task needs concrete default rules, completeness checks, or examples of what a non-empty design system must contain.

For any report, dashboard, cockpit, business analysis, detail-query, or topic-analysis task that touches requirements, design, frontend implementation, QA, testing, acceptance, or reusable standards, read `references/03-report-development-guidelines-index.md` first, then load only the relevant distilled guideline reference:

- Requirement, metric口径, information architecture, layout, and card priority: `references/04-report-requirements-metrics-layout-guidelines.md`.
- Chart, table, typography, number/date format, series colors, and warning colors: `references/05-report-charts-tables-format-guidelines.md`.
- Filters, states, permissions, frontend implementation, performance, collaboration, acceptance, and templates: `references/06-report-filters-states-engineering-acceptance.md`.
- Leadership-friendly report patterns, strong sample highlights, long operating-analysis pages, high-density diagnostic dashboards, asset/resource overviews, and fixed 16:9 cockpits: `references/07-exemplary-report-design-patterns.md`.
- Report-specific anti-AI decision gate for metric systems, data story, realistic data, chart/table choice, drilldown/action, industry sense, and report designer behavior: `references/09-report-decision-anti-ai-gate.md`.

When the reusable standard is based on bundled report templates, also inspect `$report-prototype-template-management` `references/template-layout-design-system.md` so spacing, radius, title-band, and hover/focus rules stay aligned with the actual template assets.

When the standard defines implementation-ready component families, inspect `$report-component-style-design` `references/12-internal-placement-algorithms.md` so component slots, coordinates, main visual centers, size tiers, and state geometry stay measurable.

For any design, implementation, QA, or reusable-standard work where output could become generic, "AI-looking", template-like, or overly polished without product context, read `references/08-anti-ai-design-gate.md` and apply it as a required quality gate.

For report, dashboard, BI, business-analysis, detail-query, cockpit, topic-analysis, or report-designer work, also read `references/09-report-decision-anti-ai-gate.md`. This is mandatory because a report can pass the generic anti-AI gate and still fail as a decision report.

If Haier enterprise UI tokens are the required source of truth, read `$haier-enterprise-app-ui-design-spec` before defining report token overrides. Keep the inherited Haier values and report-specific extensions separate.

## Workflow

1. Select mode and source of truth.
   Identify whether the standard is new, audited, merged, Haier-inherited, or migration-focused. Declare the hierarchy: company standard, template standard, report extension, project exception.

2. Inventory design surfaces.
   List shell, navigation, filters, KPI cards, charts, tables, drawers, modals, buttons, tags, empty/loading/error/no-permission states, exports, mobile layouts, and any custom graphics.

3. Run the anti-AI design gate.
   Identify thin product context, generic SaaS/AI aesthetics, screenshot-only completion, empty copy, brandless visuals, generic assets, equal hierarchy, decorative motion, and sample-like engineering. Record remediation or approved exceptions before stabilizing tokens.

4. Run the report decision anti-AI gate when report surfaces are in scope.
   Check metric system, metric tree, data story, realistic data, chart/table decision logic, filters/drilldowns/linkage, trust/action details, industry vocabulary, and report-designer behavior.

5. Define semantic tokens.
   Specify color roles, typography scale, spacing/grid, radius, border, shadow, density, icon size, z-index, and responsive breakpoints. Tokens must be semantic, for example `surface.card`, `text.primary`, `state.error`, not only raw colors.

6. Define component standards.
   For each component family, specify anatomy, required/optional slots, internal positioning/alignment algorithm, states, data density, label/tooltip behavior, overflow, loading/empty/error/no-permission behavior, accessibility, interaction expectations, hover/focus feedback, and internal fit rules.

7. Define visualization standards.
   Specify chart/table selection, axis/legend/tooltip/data-label rules, color semantics, metric unit wording, percentage/rate display conventions, comparison baselines, threshold/alert styling, drilldown/export behavior, and screenshot regression requirements.

8. Define governance.
   Mark stable tokens/components, allowed variants, deprecated patterns, exception process, versioning policy, migration status, and review checklist.

9. Route implementation.
   For page-level fixes use `$report-visual-layout-design`; for component defects use `$report-component-style-design`; for frontend implementation use `$frontend-development-workflow`; for visual regression use `$testing-integration-workflow`.

## Required Output

- Mode, source-of-truth hierarchy, and input inventory.
- Design-system scope and principles for report products.
- Token specification: color, typography, spacing, grid, radius, border, shadow, state, density, icon, z-index, and breakpoint.
- Template layout-token specification when report templates are in scope: design frame, shell frame, content range, block gap, row height, cell padding, card padding/radius, title band, and widget viewport.
- Component specification: page/global filters, component-internal local filters, KPI cards, charts, tables, detail views, actions, feedback states.
- Component internal placement specification: coordinate system, slot ownership, main visual center, x/y alignment algorithms, component-local filter placement when present, size tiers, fallback order, and state geometry for implementation-ready component families.
- Interaction feedback specification: hover/focus/active/selected/disabled motion limits, border glow, focus ring, and reduced-motion behavior.
- Visualization specification: chart choice, semantics, legends, labels, tooltips, thresholds, interaction.
- Metric display specification: raw vs display scale, percent/rate wording, rounding, trend icon semantics, and forbidden legacy terms.
- Report-development guideline mapping for report work: requirement fields, metric dictionary, calculation口径, page hierarchy, chart/table/filter/state rules, engineering handoff, acceptance checklist, and reusable templates.
- Responsive and accessibility rules.
- Anti-AI design gate result: `antiAiRisk`, cause IDs, forbidden default scan, copy specificity, real-context proof, state/accessibility coverage, and approved exceptions.
- Report decision anti-AI gate result: `reportDecisionRisk`, `RPT-*` cause IDs, metric tree, metric dictionary completeness, data story path, realistic data proof, linkage proof, trust/action details, industry sense, and report-designer checks when applicable.
- Governance matrix: version, owner, source, status, allowed variants, deprecated patterns, exception approval, review checklist.
- Adoption plan: affected projects/components, migration priority, screenshot regression baseline plan.

## Hard Constraints

- Do not output an empty table-only template. Every required table needs at least the minimum rows listed in `01-design-system-spec-template.md`, with either values, inherited source references, or explicit `gap` status.
- Do not create one-off colors, spacings, hover effects, chart semantics, or component variants without assigning them to a semantic token or an approved exception.
- Do not allow generic "modern SaaS", "高级科技感", purple-blue gradients, glass cards, glow buttons, floating decorative assets, oversized radius, or abstract AI imagery as default report styles unless an approved source explicitly requires them.
- Do not accept empty marketing/product copy such as "赋能", "一站式", "重新定义", "智能化", "无缝", or "提升效率" without concrete user action, data object, system behavior, condition, or evidence.
- Do not accept a reusable standard that optimizes only first-screen beauty while omitting responsive behavior, edge states, accessibility, data density, and engineering token/reuse rules.
- Do not accept implementation-ready component standards that define only colors, font sizes, radii, and shadows while omitting internal placement algorithms for element position, alignment, coordinates, size tiers, and state geometry.
- Do not accept a reusable report standard that merges page/global filters and component-internal local filters into one vague filter rule. Component-internal local filters must be current-component scoped, use `2-4` short-option capsules by default, collapse to dropdown when options/space exceed budget, and never overlay or compress the primary value/plot/table.
- Do not accept reusable Analysis & Insight component standards that treat report conclusions,洞察,异常说明,归因,建议,风险提示,口径说明,数据质量说明,预测说明,图表标注,解释型空态,权限/无结果/延迟说明 as generic text. They must define subtype taxonomy, `analysisInsightContract`, conclusion-before-evidence structure, evidence/action/trust/source/freshness fields, local-filter scope, copy length budgets, placement algorithms, visual restraint, responsive fallback, and state geometry.
- Do not accept reusable parallel-coordinate standards that omit object/sample fields, `3-12` dimension fields, dimension order, per-axis range/unit/direction, independent or standardized scaling, plot-height and axis-gap budgets, sample-count opacity/sampling/aggregation rules, Top/anomaly/selected highlight semantics, legend/filter separation, exact object tooltip/detail, and fallbacks for `<3` dimensions, `>12` dimensions, too many samples, or exact audit tasks.
- Do not accept report standards that only define dashboard surfaces and chart/card styling while omitting metric口径, metric tree/driver path, realistic dirty data, drilldown/detail/action, trust metadata, and industry-specific vocabulary.
- Do not accept a report designer/editor standard that only defines the three-panel shell without data source binding, aggregation, calculated fields, filters, permissions, validation, versioning, preview, and publish behavior.
- Do not duplicate Haier enterprise UI values when `$haier-enterprise-app-ui-design-spec` is the source. Reference inherited values and only define report-specific extensions.
- Do not let template layout tokens drift from `$report-prototype-template-management` when bundled templates are the implementation target.
- Do not mark a rule `stable` unless it has scope, owner/source, usage guidance, acceptance criteria, and migration impact.
- Do not accept a design system without loading, empty, error, no-permission, stale-data, and disabled states.
- Do not accept chart/table rules without metric display semantics, exact-value access, overflow policy, and screenshot/regression check.
- Do not accept reusable Composite Panel / multi-component analysis card standards that omit the shared business topic, analysis sequence, `compositePanelContract`, primary child id, child roles/priorities/min sizes, child-count limits, default layout patterns, panel-level local filter scope, child-only filter exceptions, shared legend/unit rules, linked hover/click behavior, detail-preview limits, responsive fallback, and parent-vs-child state geometry. Composite Panels explain one topic inside one container; they are not mini dashboards, equal-weight chart collages, or nested card stacks.
- Do not accept reusable Detail Table standards that omit row-level task, row grain, primary key/object identity, visible column priority, column type/width/alignment metadata, default sort, table-body height and visible-row budget, fixed header/frozen-column rules, pagination/search/sort/export execution scope, row detail/action contract, component-local filter behavior, and loading/empty/error/no-permission states. Detail Tables are row evidence and action surfaces, not source-table dumps.
- Do not accept reusable Pivot Table standards that omit row dimensions, column dimensions, measure list, aggregation grain, aggregation functions/formulas, rate numerator/denominator rules, subtotal/grand-total placement, row/column hierarchy depth, sort behavior, fixed header/frozen row dimension behavior, S2/project analytical-table renderer choice, `pivotAreaH` budget, row/column density fallbacks, conditional-formatting limits, tooltip/drilldown payload, and loading/empty/error/no-permission states. Pivot Tables are aggregated cross summaries, not raw detail lists or Excel field configuration panels.
- Do not accept reusable complex/grouped table-header standards that omit the trigger conditions (`>8` visible columns or natural field groups), `columnTree`/grouped-column contract, leaf field metadata, unit/definition metadata, `colSpan`/`rowSpan` calculation, parent-width-from-leaf-width rules, maximum header depth, fixed multi-level header behavior, frozen row/primary column behavior, component-local filter vs per-column header-filter separation, sort/filter icon limits, tooltip definitions, density fallbacks, and loading/empty/error/no-permission geometry. Complex headers organize field relationships; they are not decorative color bands or Excel-like configuration wells.
- Do not accept reusable pie/donut standards that omit category-count limits, deterministic `TopN + 其他` merge behavior, negative/all-zero handling, legend/label budget, center metric rules, exact-value tooltip/detail access, and fallback to bar/table when composition is too dense or exact comparison is required.
- Do not accept reusable radar chart standards that omit shared score scale/standardization, dimension and series limits, circular geometry preservation, outside label budget, local-filter/legend separation, tooltip exact/raw-value access, and fallback for too many dimensions or objects.
- Do not accept reusable scatter/bubble standards that omit X/Y metric names and units, axis range/baseline behavior, point density strategy, bubble size mapping, target/average/quadrant semantics, label limits, exact-value tooltip/detail access, and fallback for too many points.
- Do not accept reusable map/geographic standards that omit geography decision scope, region-code or longitude/latitude binding, map resource/projection, aspect-safe fitBounds, map viewport budget, visualMap/legend semantics, label limits, dense point/flow fallback, missing-geo handling, and exact-value tooltip/detail access.
- Do not accept reusable candlestick/K-line standards that omit OHLC field contract, ordered time, unit, market color convention, price range padding, candle density/dataZoom rules, main/volume/indicator height budgets, MA/indicator limits, crosshair/tooltip exact-value access, and missing OHLC/volume states.
- Do not accept reusable boxplot standards that omit sample/statistical contract, Q1/median/Q3/IQR, whisker/outlier rule, sample-size thresholds, category/group density limits, outlier display strategy, exact-value tooltip/detail access, and fallback for tiny samples or too many categories.
- Do not accept reusable matrix/time/calendar/correlation heatmap standards that omit row/column/value/aggregation contract, unit, color-scale type, visualMap range, missing-vs-zero encoding, row/column density limits, cell-size and label-sampling rules, value-label threshold, anomaly/highlight rule, exact-value tooltip/detail access, and fallback for too many cells.
- Do not accept reusable Combo chart standards that omit the paired business relationship, bar/line/target metric roles, shared category/time grain, left/right y-axis unit mapping, dual-axis rationale, visible series limits, category-density fallback, `plotH` budget, legend/filter separation, component-local filter behavior, exact tooltip/detail access, and fallback for unrelated metrics, false correlation, dense labels, exact audit, or too many series.
- Do not accept reusable Gauge standards that omit one bounded metric, min/max range, current value, unit, clamp/overflow behavior, target/threshold semantics, business direction for status color, `gaugeAreaH` budget, default semicircle geometry, radius/arc-width rules, center value/unit placement, tick/label density, pointer-use limits, component-local filter behavior, exact tooltip/detail access, and fallback for comparison, trend, composition, exact audit, unbounded metrics, or many-gauge screens.
- Do not accept reusable path/user/process path standards that omit step/node schema, directed transition schema, start/end/order, metric basis, conversion/drop-off formulas, path depth, Top N and "other" aggregation rules, node/link density limits, main-path/branch strategy, path-width mapping, label strategy, legend/filter separation, exact node/transition tooltip/detail access, and fallback for too many paths.
- Do not accept reusable funnel standards that omit ordered stage schema, stage order, metric basis/unit, shared population or documented cohort logic, entry/final values, entry share, stage conversion, drop value/rate, total conversion, `funnelAreaH` budget, stage-count density, target/comparison handling, label thresholds, legend/filter separation, component-local filter behavior, exact stage tooltip/detail access, and fallback for unordered ranking, trend, simple composition, multi-branch paths, mixed口径 stages, or too many stages.
- Do not accept reusable Sankey standards that omit source-target-value link schema, node schema, layer/stage order, metric unit, flow-width mapping, node-value/flow-conservation handling, `sankeyAreaH` budget, Top N and `其他` aggregation, node/link density limits, label thresholds, legend/filter separation, component-local filter behavior, exact node/link tooltip/detail access, and fallback for no-flow, simple ranking/composition, negative values, or dense all-link displays.
- Do not accept reusable treemap/rectangular tree map standards that omit hierarchy fields, parent/leaf aggregation, non-negative additive area metric, optional color metric semantics, total/parent share formulas, Top N and `其他` aggregation, visible level/depth rule, `treemapAreaH` budget, rectangle/label thresholds, color legend, breadcrumb/drilldown behavior, exact path/value/share tooltip/detail access, and fallback for negative values, too many leaves, or exact comparison tasks.
- Do not accept reusable sunburst standards that omit hierarchy fields, parent/child aggregation, non-negative additive angle metric, optional color metric semantics, total/parent share formulas, Top N and `其他` aggregation, visible level/ring-depth rule, `sunburstAreaH` budget, `ringW >= 18px`, sector/label thresholds, center content, color legend, breadcrumb/drilldown behavior, exact path/value/total-share/parent-share tooltip/detail access, and fallback for negative values, too many nodes, too many levels, or exact comparison tasks.
- Do not accept reusable tree/hierarchical tree standards that omit hierarchy task, root node, parent-child schema, node id/name/type/status/value fields, depth/layer, visible depth, default expanded levels, child-count and Top N/`+N` aggregation rules, orientation, node/connector density limits, expand/collapse/search behavior, legend/filter separation, exact node/parent/child tooltip/detail access, and tree-list/fallback rules for too many nodes.
- Do not accept reusable relation/network graph standards that omit node/edge schema, relationship direction and weight semantics, graph layout type, node/edge density limits, node category and edge type limits, node-size and edge-width mapping, label strategy, legend/filter separation, fitView/zoom/drag behavior, exact node/edge tooltip/detail access, and fallback for hairball graphs.

## Quality Checklist

- The output is reusable across reports, not a single-page style note.
- Tokens distinguish semantic roles rather than one-off colors.
- The spec separates inherited company/template rules, report extensions, and project exceptions.
- The anti-AI design gate passes or remaining `AI-*` findings are recorded with owner, severity, and remediation.
- The report decision anti-AI gate passes or remaining `RPT-*` findings are recorded with owner, severity, and remediation.
- Primary report metrics have formulas, grain, period, source/freshness, baseline, unit/precision, owner, and drilldown/action path.
- Report standards include realistic data-state requirements: missing/zero/extreme values, abnormal spikes/drops, long labels, partial sync, permission-limited cases, and reconciliation checks.
- Primary headings, CTAs, summaries, empty states, and errors contain concrete business meaning rather than generic AI/SaaS slogans.
- Visual identity comes from brand/template/product/domain choices, not interchangeable gradient/glass/neon decoration.
- Empty/error/loading/no-permission states are specified.
- Dense enterprise-report needs are prioritized over marketing-style layouts.
- KPI/summary/card internals have wrapping, min-height, tooltip/expand, or scroll rules for long labels and values; critical metric text is not hidden by ellipsis-only treatment.
- KPI cards center the core value zone in the card body and reserve at least 40% of the main visual height for the primary value area; title/description clusters must not create a top-heavy card with large unused blank space.
- KPI card standards center `value + unit` as one measured group and define top-left title, top-right definition entry, centered comparison/target, optional sparkline, and weak bottom metadata placement.
- Component-internal local filter standards are explicit: they are named `组件内筛选区 / 局部筛选区`, affect only the current component/local group, select capsule vs dropdown by option count and fit, and preserve title, legend, unit, metric strip, value, plot, and table geometry.
- Analysis & Insight standards define subtype groups, `analysisInsightContract`, one-card-one-point, conclusion-before-evidence, copy budgets, evidence/action/trust/source/freshness requirements, chart annotation limits, weak semantic colors, local-filter scope, responsive degradation, and loading/insufficient/empty/error/no-permission/data-delay states.
- Composite Panel standards define one shared analysis topic, one primary child, an analysis sequence such as summary -> trend/structure -> contribution/exception -> detail/action, child roles and priorities, default `2-3` visible children with normal maximum `4`, primary-child visual weight `50-70%`, content height `>=60%` of the container body, shared panel-level local filters, shared legend/unit rules, child-only filter exceptions, hover/click linkage, detail-preview limits, responsive fallback, and parent/child state scope.
- ECharts charts with x-axis labels and bottom legends reserve a safe legend/axis distance; ECharts options use `grid.containLabel = true` and `grid.bottom >= 56px`.
- Small-card donut charts reserve legend width/band, reduce radius, constrain labels with max width/wrapping or disclosure, enable overlap hiding, and configure edge/bleed margins before acceptance.
- Pie/donut standards define donut as the report default, `2-6` preferred categories, `<=8` maximum before merge, `Top5 + 其他` or approved merge rule, no negative values, no fake all-zero shares, center metric fit, legend-first labels, and tooltip/detail exact values.
- Radar chart standards define `5-8` recommended dimensions, `<=10` maximum dimensions, `<=3` visible series, standardized scores for mixed units, circular coordinate preservation, reserved outer label ring, key-only value labels, and tooltip access to exact/raw values.
- Scatter/bubble standards define relationship tasks, explicit X/Y metrics and units, point-count density tiers, bounded bubble sqrt size mapping, weak target/average/quadrant/trend encodings, key-only labels, and tooltip/detail exact values.
- Parallel-coordinate standards define multi-metric object profile tasks, object/sample schema, `3-12` ordered dimensions, per-axis unit/range/direction, independent vs standardized scale, `plotH >= CH * 0.48`, `axisGap >= 56px`, line-opacity tiers, sampling/aggregation fallback, Top/anomaly/selected highlight behavior, brush/filter/legend separation, and exact object tooltip/detail values.
- Map/geographic standards define spatial decision tasks, geography keys or lon/lat fields, map resource/projection, aspect-safe fitBounds, map viewport floor, visualMap/legend rules, key-only labels, clustering/heatmap/TopN fallback, missing-geo states, and tooltip/detail exact values.
- Candlestick/K-line standards define OHLC-only usage, ordered time, price unit, market red/green convention, visible candle density tiers, `mainChartH >= CH * 0.45`, secondary volume/indicator budgets, limited MA lines, crosshair/tooltip exact values, dataZoom fallback, and invalid/missing OHLC states.
- Boxplot standards define distribution tasks, sample-count thresholds, Q1/median/Q3/IQR, Tukey `1.5 * IQR` or declared Min-Max rule, `plotH >= CH * 0.50`, category/group density limits, stable outlier strategy, key-only labels, and tooltip/detail five-number summaries.
- Matrix/time/calendar/correlation heatmap standards define two-dimensional pattern tasks, row/column/value/aggregation contract, unit, sequential/stepped/diverging color scale, visualMap range, missing-vs-zero handling, `matrixH >= CH * 0.45`, row/column density limits, cell-size thresholds, sampled labels, and tooltip/detail exact cell values.
- Combo chart standards define scale + rate/trend/target relationship tasks, bar metric as amount/count/scale, line metric as rate/trend/efficiency, optional target/reference, shared ordered category/time grain, visible series `<=4`, legend items `<=4` preferred, `plotH >= CH * 0.48`, dual-axis unit/rationale rules, label-density fallback, legend/filter separation, and tooltip/detail exact values.
- Detail Table standards define row-level lookup/comparison/evidence/action tasks, row grain, primary key/object field, default sort, visible columns `5-8` by default and `8-12` only in large blocks, column widths/alignment, numeric right alignment, status badge semantics, operation caps, fixed header/frozen-column conditions, `tableBodyAreaH >= CH * 0.55`, `visibleRowCount >= 4-6` by default, pagination/virtual-scroll rules, search/sort/export provider scope, component-local filter limits, and tooltip/detail access for hidden values.
- Pivot Table standards define multidimensional cross-summary tasks, row and column dimensions, measure metadata, aggregation functions/formulas, rate numerator/denominator recomputation, subtotal and grand-total placement, row/column hierarchy depth, natural time sorting, `pivotAreaH >= CH * 0.55`, frozen row dimensions and fixed column headers, visible measures `1-3` by default and `<=5`, row/column scroll or virtualization thresholds, restrained conditional formatting for `1-2` core measures, and tooltip/drilldown access to exact path/formula evidence.
- Complex/grouped table-header standards define business column groups, `columnTree` leaves tied to real fields, `colSpan`/`rowSpan` from visible leaves and `maxDepth`, parent group widths from child leaf widths, default depth `2` and max depth `3`, header row height `32-40px`, fixed whole-header behavior during vertical scroll, frozen row dimension/primary columns during horizontal scroll, component-local filters separate from leaf-column filters, only necessary leaf sort/filter icons, restrained group backgrounds/dividers, group collapse for dense columns, and tooltip access to field/group definitions.
- Gauge standards define single bounded progress/status tasks, min/max range, unit, current value, target/threshold semantics, business direction for status color, `gaugeAreaH >= CH * 0.50`, semicircle default, center value as visual anchor, sparse ticks, `3-4` threshold segments and `<=5` maximum, pointer use only for monitoring/risk/load, legend/filter separation, and tooltip/detail exact range/target/status evidence.
- Path/user/process path standards define ordered-flow tasks, step/link schema, start/end/order, metric basis, conversion/drop-off formulas, path depth, Top N and "other" aggregation, `pathAreaH >= CH * 0.52`, node/link density limits, main-path/branch strategy, key-only labels, legend/filter separation, and tooltip/detail exact transition evidence.
- Funnel standards define ordered conversion/process tasks, stage schema/order, shared population/cohort logic, metric unit, entry/final values, entry share, stage conversion, drop value/rate, total conversion, `funnelAreaH >= CH * 0.52`, `3-6` preferred stages and `>10` fallback, horizontal bar default, max/key-loss highlight, target/comparison rules, legend/filter separation, and tooltip/detail exact stage evidence.
- Sankey standards define source-target flow tasks, node/link schema with `source`/`target`/`value`, layer/stage order, metric unit, node-value and loss/unknown handling, `sankeyAreaH >= CH * 0.55`, 3-4 layers by default and `<=5` visible layers without drilldown, Top N/`其他` aggregation, node/link density limits, key-only labels, legend/filter separation, hover/click path highlight, and tooltip/detail exact source, target, value, share, conversion/loss, source, period, and aggregation evidence.
- Treemap/rectangular tree map standards define hierarchical composition tasks, hierarchy schema, non-negative additive area metric, optional color metric, total/parent share formulas, `treemapAreaH >= CH * 0.55`, Top N/`其他` aggregation, visible level/depth rule, parent/child rectangle and label thresholds, color legend, breadcrumb/drilldown, and tooltip/detail exact path, value, share, color metric, source, and aggregation evidence.
- Sunburst standards define hierarchy-path composition tasks, hierarchy schema or `children`, non-negative additive angle metric, optional color metric, total/parent share formulas, `sunburstAreaH >= CH * 0.55`, visible level/ring-depth rule, `ringW >= 18px`, Top N/`其他` aggregation, sector/label thresholds, center content, color legend, breadcrumb/drilldown, and tooltip/detail exact path, value, total share, parent share, color metric, source, and aggregation evidence.
- Tree/hierarchical tree standards define hierarchy tasks, root and parent-child schema, depth/layer, visible-depth/default-expanded rules, `treeAreaH >= CH * 0.55`, orientation choice, node/child density limits, Top N/`+N` aggregation, expand/collapse/search behavior, short node labels, legend/filter separation, and tooltip/detail exact node, parent, child, value, status, period, and source evidence.
- Relation/network graph standards define entity-connection tasks, node/edge schema, layout type, node/edge density tiers, `graphH >= CH * 0.55`, node category and edge type limits, fitView/zoom/drag behavior, label limits, legend/filter separation, and tooltip/detail exact node/edge evidence.
- Tables with more than 8 visible columns or natural grouped fields use complex/grouped headers by default.
- Hover/focus feedback preserves component geometry and stays inside component bounds. Border glow, inset glow, and outline are preferred; offset/scale animation needs explicit overflow and viewport proof.
- Chinese report rate/change/completion labels use `%` by default; exceptions require named legacy/product rationale.
- Design-system version and adoption checklist are explicit.
