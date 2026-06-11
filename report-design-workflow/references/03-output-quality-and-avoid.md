# 03 Output Quality And Avoid

## Skip Rules

Skip a stage only when it clearly does not apply:

- Skip mock data for pure conceptual guidance.
- Skip filter design for fixed-scope static reports.
- Skip data interaction for static PDF/PPT-only reports.
- Skip template implementation when the user only asks for design thinking.
- Skip report type classification only when the user explicitly gives the report type and it is consistent with the goal.

If skipping a stage creates risk, say what is being deferred.

## Output Formats

### Design Proposal Output

Use this structure:

1. 流程模式.
2. 展示主题、模式卡片与报表类型.
3. 用户与核心问题.
4. 业务设计思路.
5. 信息区块、模式卡片与组件映射.
6. 数据策略.
7. 筛选策略.
8. 数据交互策略.
9. 视觉布局策略.
10. 组件风格策略.
11. 质量验收清单.
12. 假设与缺口.

### Implementation Plan Output

Use this structure:

1. Scope and selected workflow mode.
2. Skills used and why.
3. Display theme, selected pattern cards, and pattern-to-component/API/test impact.
4. Files/components/data to create or modify.
5. Mock data and filter state plan.
6. Interaction state and parameter plan.
7. Shell path, style source, brand mode, visual mode, and brand asset gate: `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, `customDesignPath` and `customLayoutPattern` if any, logo discovery result, logo slot/placeholder, sample-fidelity decision, and sample module classification.
8. Visual layout and component style plan.
9. Technical architecture: TypeScript, Vue 3, Element Plus, ECharts, optional AntV S2 trigger, and template choice.
10. Self-check report and repair-loop plan.
11. Automatic deployment plan and expected URL source.
12. Verification plan.

### Review/Repair Output

Use this structure:

1. Visible problems.
2. Root design causes.
3. Affected components/blocks.
4. Affected display-theme and pattern-card decisions.
5. Fix strategy by workflow stage.
6. Concrete implementation changes if requested.
7. Verification checks.

### Self-Check Report Output

Use this structure after implementation and after each repair cycle:

1. 自检轮次与总体结论.
2. 本轮检查范围.
3. 已执行命令/工具/页面验证.
4. Z型逐组件检查: in rendered order, list each component's source pattern IDs, filters, filter config, mock coverage, data/filter binding, interaction binding, layout capacity, block-size/clip status, and pass/fail result.
5. 数据完整性检查.
6. 筛选配置检查.
7. 交互可用性检查.
8. 配置完整性检查.
9. 视觉与运行态检查：include `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design/layout path if any, logo/header screenshot acceptance, sample fidelity and sample module classification when applicable, conclusion placement, global UI token consistency, Chinese metric display, complex diagram spacing, and primary filter control implementation.
10. 无头浏览器截图证据：screenshot path, viewport, page/state, cycle.
11. 确定性视觉回归：baseline/current/diff path, threshold, masked regions, `VDIFF-*` findings, baseline missing/not run status.
12. 多模态视觉异常识别：`VIS-*` finding, severity, screenshot, component/region, observation, impact, fix plan, retest criteria, or multimodal not-run blocker.
13. 问题清单：severity, evidence, affected file/module, fix plan, current status.
14. 本轮修复动作.
15. 剩余风险与是否进入下一轮.

## End-To-End Quality Checklist

Before final delivery, verify:

- The primary report type is clear and not confused with a chart type.
- The display theme is clear, not confused with the primary report type, and selected pattern cards are listed.
- Every selected pattern card maps to a component, filter/control, interaction, dataset/API requirement, export/share behavior, operations note, or validation case.
- No unimplemented pattern is described as done; unsupported patterns are marked as gaps or future work.
- Secondary report types only appear where they change a block or flow.
- The core user question is answered in the first meaningful viewport.
- `pageShellPath` is declared as `template` or `custom`.
- `pageStyleSource` is declared. If no page style and no HTML/source/sample styling is provided, a bundled template is used by default.
- Exactly one `brandMode` is declared and its logo/global UI token implications are followed.
- Exactly one `visualMode` is declared before implementation and remains consistent in the final self-check.
- If `pageShellPath: custom`, `customDesignPath` is declared as `htmlReplica` or `freeDesign`.
- Custom shells declare exactly one `customLayoutPattern`: `symmetricBalance`, `threePart`, `masterDetail`, or `narrativeStack`.
- Custom `htmlReplica` and `freeDesign` pages with `brandMode: haierBranded` use a real bundled Haier logo; placeholder state is reported as blocked.
- Haier/branded pages have a configured logo asset or a visible placeholder with the missing asset recorded.
- Screenshot evidence verifies the logo/header area, correct logo variant, aspect ratio, and no clipping.
- When input is a display sample, screenshot, image, or HTML source and `visualMode: sampleRestore`, page shell, module order, container hierarchy, main control count, layer structure, card proportions, and first viewport are compared against the source.
- Sample/source modules are classified as `businessRequired`, `sampleStructure`, or `optionalEnhancement`; no module is `must-have` only because it appears in the source.
- Added conclusions, insights, or status summaries in `sampleRestore` are embedded into existing sample-equivalent regions instead of standalone horizontal bands.
- Analysis & Insight components in runnable prototypes declare `analysisInsightContract`, show conclusion before evidence, expose evidence/action/trust/source/freshness or an explicit insufficient-data state, and have dedicated crop/source checks when present.
- HTML-replica and custom layouts use global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and controls unless exact restoration is explicitly requested.
- Metrics include baselines, direction, unit, and formulas where needed.
- Rate/change/completion fields use `%` in visible Chinese UI; change-rate and variance-rate indicators use positive-red-up / negative-green-down SVG/icon semantics.
- Mock data, if used, reconciles with KPI cards, charts, tables, and filters.
- A self-check report has been produced for the latest implementation cycle.
- The self-check report covers Z-shaped component audit, data completeness, filter configuration, interaction usability, configuration completeness, and visual/runtime state.
- Runnable self-check captures browser screenshots before visual pass/fail judgment, runs deterministic baseline image diff when baselines exist, and runs multimodal visual anomaly recognition on those screenshots when available.
- Deterministic visual regression records baseline/current/diff paths, thresholds, masked regions, and `VDIFF-*` findings; first-run screenshots without approved baselines are baseline candidates, not regression pass evidence.
- Multimodal visual findings cover layout offset, excessive blank area, duplicate component titles, text overlap, graphic overlap, text-graphic overlap, title-node collision, cramped/narrow/tiny components, clipping/truncation, unreadable chart/table/card content, nonblank rendering, visual proportion, SVG/canvas/ECharts geometry distortion, scroll behavior, and stale prototype residue.
- Z-shaped component audit starts from the first rendered component and checks each component's filters, filter setup, mock coverage, component data binding, filter binding, interaction binding, layout capacity, and block-size/clipping status.
- Self-check issues were repaired and rechecked, up to 3 cycles when needed.
- `blocker` and `major` `VDIFF-*` / `VIS-*` findings are repaired and rechecked with fresh screenshots and diff/review evidence, or explicitly remain blocked with evidence and owner question.
- The latest self-check report has zero unresolved issues; otherwise the final response states the remaining issues and why they remain after the third cycle.
- Filters have defaults, stable IDs, cascades, permission rules, and visible active state.
- Every filter has an explicit field/query mapping, and every component declares whether it is affected by that filter.
- Changing any primary filter updates all dependent KPIs, charts, tables, drawers, exports, downloads, jumps, and fullscreen views without stale values.
- Filtered KPI totals, chart totals, table rows, summary counts, and drawer records reconcile against the same dataset and permission scope.
- Interactions preserve period, scope, object, metric, filters, permissions, and return path.
- Open drawers, selected rows, chart marks, and drill paths reset or show stale-selection state when filters remove the selected object.
- Layout follows the 8*N rectangular grid.
- Haier logo usage follows light/dark rules.
- Page layout owns page shell identity and block placement, while business components own visible title/function/local-filter areas inside their widget viewport.
- Peer component groups or repeated sub-blocks inside one parent block use the internal exact `M * N` distribution only when `actualTotal > 4`; for `actualTotal <= 4`, use a small-group layout based on content and block shape. When the algorithm applies, normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, columns `M >= N`, and the minimal `M - N` among valid factor pairs. This is an internal sub-block matrix; it does not replace the top-level parent block span. After choosing it, preserve `5px` parent inset and `5px` sibling gap, then check whether the parent block needs vertical expansion with `heightExpansionRows = ceil(N * 2 / 3)`. Do not add arbitrary empty placeholders; the only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data. Split the group if the exact shape is unreadable.
- Components are not narrow, tiny, crowded, or unreadable; if content does not fit, enlarge, split, scroll, zoom, or move to fullscreen/drawer.
- Components do not overlap, clip, truncate critical text, or use low-contrast labels. Section headers, group captions, layer labels, stage titles, lane titles, and column captions reserve an independent title band and stay at least 16px away from cards, nodes, connectors, chart marks, legends, badges, and child labels.
- Business-question text, conclusion text, titles, labels, legends, chart marks, table cells, controls, cards, diagrams, nodes, and connectors do not overlap, stack, or visually merge.
- SVG/canvas/ECharts custom graphics, gauges, maps, radars, pies, funnels, sunbursts, paths, and complex diagrams preserve aspect ratio and geometry; warped curves, stretched maps, oval circles/radars/sunbursts, collapsed funnels, or squeezed gauges fail visual QA.
- Funnel, flow, Sankey, graph, tree, decomposition, lineage, DuPont, and process-chain visuals reserve stage/rail, body, value, label, gutter, edge-bend, and stage/layer/lane title-band space; stage labels, value/share labels, layer numbers, stage/layer/lane titles, group captions, labels, nodes, connectors, and edges remain at least 16px apart.
- Gauge charts in runnable prototypes use ECharts `series.type: 'gauge'`, one bounded progress/status metric, min/max range, unit, current value, target/threshold/status semantics, business color direction, center value hierarchy, sparse ticks, clamp/overflow behavior with true displayed value, local-filter separation, and exact tooltip/detail evidence. Decorative CSS/SVG dials, many-gauge variety blocks, unbounded scores, or comparison/trend/composition tasks disguised as Gauge fail readiness.
- Combo charts in runnable prototypes use ECharts shared `xAxis`, `bar` plus `line`/`markLine` series, declared bar/line/target metric roles and units, left/right y-axis mapping, visible series `<=4`, category-density fallback, legend/local-filter separation, dual-axis rationale when used, and exact axis-trigger tooltip evidence. Unrelated dual-axis metrics, hand-authored bar-line SVGs, hidden right-axis units, or dense labels without fallback fail readiness.
- Detail Table widgets in runnable prototypes use Element Plus or the project table component for row-level lookup, comparison, evidence, export, or light action tasks. They must declare row grain, primary key/object field, prioritized visible columns, default sort, column type/width/alignment, numeric right alignment, status/action rules, table-body row budget, fixed header or frozen columns when needed, pagination/search/export scope, local-filter limits, tooltip disclosure, row detail/action, and stable loading/empty/error/no-permission states. A flat dump of every source field, a table without a business row identity, or a decorative list with no sort/page/search/detail contract fails readiness.
- Complex/grouped table-header widgets in runnable prototypes use Element Plus/project grouped columns for ordinary row-level tables or S2/project analytical headers for pivot/cross/wide matrices. They must declare `columnTree` or nested grouped columns, business group names, leaf field metadata, units/definitions, computed `colSpan`/`rowSpan` or depth/leaf-count metadata, fixed whole-header behavior, frozen row/primary columns when horizontally scrolling, component-local filter vs per-column header-filter separation, sort/filter icon limits, tooltip disclosure, density fallback, and stable loading/empty/error/no-permission states. Absolute-positioned fake merged labels, decorative color bands, or every-column icons fail readiness.
- Composite Panel widgets in runnable prototypes are one cohesive business widget with an internal layout, not loose page-grid cells. They must declare `compositePanelContract`, one shared topic, analysis sequence, one primary child, child roles/priorities/min sizes, default `2-3` visible children and normal max `4`, primary visual weight `50-70%`, `contentH >= CH * 0.60`, panel-level local filters, child-only filter exceptions, shared legend/unit behavior, linked hover/click state, short detail preview, responsive fallback, and parent/child states. Unrelated widgets, nested decorative cards, equal-weight mini dashboards, or repeated legends/filters fail readiness.
- Analysis & Insight widgets in runnable prototypes use `visualType: 'text-summary'` only with structured decision-support fields when they are conclusion cards, insight cards, anomaly/risk notes, attribution/recommendation cards, definition/data-quality/forecast notes, chart annotations, explanatory empty states, permission/no-result/delay notes, or task notes. Generic "智能洞察", "建议关注", "有所变化", essay-like copy, full-card red alerts, or decorative insight icons without evidence/action/trust fail readiness.
- Pivot Table widgets in runnable prototypes use visualType `pivot` and AntV S2/project analytical renderer for multidimensional aggregated cross summaries. They must declare row dimensions, column dimensions, measures, aggregation formulas/functions, subtotal/grand-total rules, rate numerator/denominator recomputation, hierarchy depth, natural time sorting, fixed column headers/frozen row dimensions, density fallback, local metric/display controls, exact tooltip/drilldown, and stable states. A raw detail list reshaped as columns, decorative static matrix, Excel-like field well in display mode, naive percentage total, or hand-rolled merged table fails readiness.
- Funnel charts in runnable prototypes use ordered stage data, shared population/cohort logic, value/unit, entry share, stage conversion, drop value/rate, total conversion, stage-count fallback, separated legend/local filters, exact stage tooltip evidence, and ECharts `series.type: 'funnel'` or a data-driven horizontal `bar` funnel. Decorative fixed trapezoids or descending CSS blocks fail readiness.
- Sankey diagrams in runnable prototypes use `series.type: 'sankey'` or a declared data-driven custom exception, node/link `source`/`target`/`value`, layer/stage order, Top N/`其他`, key-only labels, separated legend/local filters, and exact node/link tooltip evidence. Decorative fixed ribbons or all-link clutter fail readiness.
- Path/user/process path charts must carry step/link schema, start/end/order, conversion/drop-off metrics, TopN/aggregation, main-path emphasis, and exact node/link tooltip/detail; use custom SVG/canvas only when it is data-driven and declared as a custom diagram.
- Tree/hierarchical tree charts must carry root node, parent-child schema, depth/layer, visible-depth/default-expanded rules, TopN/`+N` child aggregation, expand/collapse/search behavior, and exact node tooltip/detail; use custom SVG/canvas only when it is data-driven and declared as a custom diagram.
- Relation/network graphs use ECharts `graph` by default and must carry node/edge schema, source/target direction, density controls, fitView/zoom/search behavior, and exact node/edge tooltip/detail; use custom SVG/canvas only with an explicit custom-diagram exception.
- Parallel-coordinate charts use ECharts `parallelAxis` plus `series.type: 'parallel'` and must carry object/sample schema, `3-12` ordered dimensions, per-axis unit/range/direction, scaling mode, line-density controls, highlight/brush behavior, and exact object tooltip/detail; decorative hand-authored line webs fail readiness.
- Primary filter areas use Element Plus controls or project design-system equivalents; styled native select is only for baseline prototype acceptance.
- Advanced visual acceptance for option menus uses a custom popover select because native OS dropdown menus cannot be fully internet-styled or screenshot-controlled.
- Dense tables, lineage graphs, diagrams, maps, and Gantt charts have scroll, zoom, pan, drawer, or fullscreen strategy.
- Export, refresh, download, share, and fullscreen actions respect filters and permissions.
- Empty, loading, no-permission, error, and stale-selection states are defined.
- Implementation uses existing project patterns and is verified locally when built.
- Runnable prototypes use TypeScript + Vue 3 + Element Plus + ECharts as the base stack unless the existing project has an explicit conflicting stack. AntV S2 is installed and used only for pivot tables, cross tables, wide metric matrices, frozen-header analytical tables, dense financial grids, or equivalent table needs.
- Runnable prototypes are automatically started on a verified available port and return the exact local URL when no public URL is available.
- Deployment, when requested, builds successfully and returns a public URL or explains why only a local preview URL is available.

## Avoid

- Do not start from visual layout before classifying the report purpose.
- Do not start from visual layout before classifying the display theme and selecting a bounded pattern-card set.
- Do not choose a custom shell merely because the user did not specify page style.
- Do not mark a `brandMode: haierBranded` custom shell complete when it has only a logo placeholder instead of a real bundled Haier logo.
- Do not start implementation before declaring `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design/layout paths when applicable, and passing the logo asset gate.
- Do not use every skill for every task; use the smallest complete path.
- Do not duplicate detailed rules from child skills; route to them.
- Do not invent new report categories when one of the eight categories fits.
- Do not invent new display themes when one of the six common display themes fits.
- Do not list pattern-card names without carrying their implementation and acceptance impact into the binding matrix or handoff bundle.
- Do not treat mock data as random values.
- Do not design filters or jumps without permission and state behavior.
- Do not finish an implementation without checking for duplicate component titles, cramped components, overlap, clipping, broken layout, and title-node collision.
- Do not finish with component titles repeated in both the layout header and the component body.
- Do not finish with peer components arranged too narrowly, too small, crowded, or in an awkward strip when `actualTotal > 4` and an internal exact `M * N` layout plus parent-block expansion can carry the content.
- Do not finish when business-question text, chart marks, labels, legends, cards, tables, or diagram nodes overlap, stack, or visually merge.
- Do not finish a funnel, flow, Sankey, graph, tree, decomposition, lineage, DuPont, or process-chain visual when a stage/layer/lane title, funnel stage label, value/share label, or marker such as `L1`/`L2`/`L3` sits on, touches, or visually attaches to a bar, node card, card border, child title, badge, connector path, or chart mark.
- Do not finish a Haier/branded implementation without visible logo or placeholder screenshot evidence.
- Do not finish sample/source restoration after changing the first viewport or main body layout unless the user asked for redesign or the change is labeled as an enhancement.
- Do not promote a sample/source module to `must-have` only because it is visible in the sample.
- Do not add an independent conclusion strip in `sampleRestore` unless the source already has an equivalent strip.
- Do not show rate/change labels as `pt`, `p.p.`, or `percentage point` in Chinese UI unless explicitly required.
- Do not reverse the required change-rate semantics: positive is red/up and negative is green/down.
- Do not let copied HTML inline colors or one-off custom surfaces override global UI tokens.
- Do not use naked native `<select>` as the final visual for primary filters; use Element Plus or the project design-system equivalent.
- Do not finish deterministic visual regression without headless browser screenshots and baseline diff status when baselines exist.
- Do not claim multimodal explanatory visual review passed without multimodal review results; if the model is unavailable, record `multimodal: not run` and keep overall visual QA `partial` when explanatory review is required.
- Do not finish an implementation without producing the self-check report and completing the repair loop or explicitly reporting the unresolved issues after 3 cycles.
- Do not replace ECharts with ad hoc chart code, including manually drawn Combo bars/lines/axes, Gauge arcs/needles/ticks, funnel/trapezoid stages, or parallel-coordinate axes/lines, and do not hand-roll S2-class analytical tables when AntV S2 is required and available.
- Do not hand-roll filters, forms, dialogs, drawers, popovers, tags, pagination, or simple tables when Element Plus can provide the needed control.
- Do not present a Detail Table as complete when it lacks row-level business identity, default sorting, column priority, visible page/search/export scope, or a row detail/action path; move low-priority fields into tooltip, drawer, column settings, export, or a separate detail page instead of widening the first view indefinitely.
- Do not present a complex/grouped table header as complete when it lacks real business field groups, leaf-field mapping, computed span/depth rules, unit/definition disclosure, fixed header/frozen column behavior, component-local filter vs column-filter separation, density fallback, or useful body-row budget.
- Do not present a Pivot Table as complete when it lacks row/column dimensions, measure aggregation functions, subtotal/grand-total rules, rate numerator/denominator recomputation, S2/project renderer, frozen header behavior, density fallback, or exact cell tooltip/drilldown evidence.
- Do not leave a completed runnable prototype at "please run npm..." handoff; detect a port, start it, verify it, and return the URL.
- Do not say deployment is done without returning a URL or a concrete deployment blocker.
