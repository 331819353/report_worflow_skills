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
2. 报表主题与类型.
3. 用户与核心问题.
4. 业务设计思路.
5. 信息区块与组件映射.
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
3. Files/components/data to create or modify.
4. Mock data and filter state plan.
5. Interaction state and parameter plan.
6. Shell path, style source, brand mode, visual mode, and brand asset gate: `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, `customDesignPath` and `customLayoutPattern` if any, logo discovery result, logo slot/placeholder, sample-fidelity decision, and sample module classification.
7. Visual layout and component style plan.
8. Technical architecture: TypeScript, Vue 3, Element Plus, ECharts, AntV S2, and template choice.
9. Self-check report and repair-loop plan.
10. Automatic deployment plan and expected URL source.
11. Verification plan.

### Review/Repair Output

Use this structure:

1. Visible problems.
2. Root design causes.
3. Affected components/blocks.
4. Fix strategy by workflow stage.
5. Concrete implementation changes if requested.
6. Verification checks.

### Self-Check Report Output

Use this structure after implementation and after each repair cycle:

1. 自检轮次与总体结论.
2. 本轮检查范围.
3. 已执行命令/工具/页面验证.
4. Z型逐组件检查: in rendered order, list each component's filters, filter config, mock coverage, data/filter binding, interaction binding, layout capacity, block-size/clip status, and pass/fail result.
5. 数据完整性检查.
6. 筛选配置检查.
7. 交互可用性检查.
8. 配置完整性检查.
9. 视觉与运行态检查：include `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design/layout path if any, logo/header screenshot acceptance, sample fidelity and sample module classification when applicable, conclusion placement, global UI token consistency, Chinese metric display, complex diagram spacing, and primary filter control implementation.
10. 无头浏览器截图证据：screenshot path, viewport, page/state, cycle.
11. 多模态视觉异常识别：`VIS-*` finding, severity, screenshot, component/region, observation, impact, fix plan, retest criteria.
12. 问题清单：severity, evidence, affected file/module, fix plan, current status.
13. 本轮修复动作.
14. 剩余风险与是否进入下一轮.

## End-To-End Quality Checklist

Before final delivery, verify:

- The primary report type is clear and not confused with a chart type.
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
- HTML-replica and custom layouts use global UI tokens for palette, typography, spacing, radius, shadows, semantic states, and controls unless exact restoration is explicitly requested.
- Metrics include baselines, direction, unit, and formulas where needed.
- Rate/change/completion fields use `%` in visible Chinese UI; change-rate and variance-rate indicators use positive-red-up / negative-green-down SVG/icon semantics.
- Mock data, if used, reconciles with KPI cards, charts, tables, and filters.
- A self-check report has been produced for the latest implementation cycle.
- The self-check report covers Z-shaped component audit, data completeness, filter configuration, interaction usability, configuration completeness, and visual/runtime state.
- Runnable self-check captures browser screenshots before visual pass/fail judgment and runs multimodal visual anomaly recognition on those screenshots.
- Multimodal visual findings cover layout offset, excessive blank area, text overlap, graphic overlap, clipping/truncation, unreadable chart/table/card content, nonblank rendering, visual proportion, scroll behavior, and stale prototype residue.
- Z-shaped component audit starts from the first rendered component and checks each component's filters, filter setup, mock coverage, component data binding, filter binding, interaction binding, layout capacity, and block-size/clipping status.
- Self-check issues were repaired and rechecked, up to 3 cycles when needed.
- `blocker` and `major` `VIS-*` findings are repaired and rechecked with fresh screenshots, or explicitly remain blocked with evidence and owner question.
- The latest self-check report has zero unresolved issues; otherwise the final response states the remaining issues and why they remain after the third cycle.
- Filters have defaults, stable IDs, cascades, permission rules, and visible active state.
- Every filter has an explicit field/query mapping, and every component declares whether it is affected by that filter.
- Changing any primary filter updates all dependent KPIs, charts, tables, drawers, exports, downloads, jumps, and fullscreen views without stale values.
- Filtered KPI totals, chart totals, table rows, summary counts, and drawer records reconcile against the same dataset and permission scope.
- Interactions preserve period, scope, object, metric, filters, permissions, and return path.
- Open drawers, selected rows, chart marks, and drill paths reset or show stale-selection state when filters remove the selected object.
- Layout follows the 8*N rectangular grid.
- Haier logo usage follows light/dark rules.
- Components do not overlap, clip, truncate critical text, or use low-contrast labels.
- Flow, Sankey, graph, tree, decomposition, lineage, DuPont, and process-chain visuals reserve rail, node, label, gutter, and edge-bend space; layer numbers, labels, nodes, and edges remain at least 16px apart.
- Primary filter areas use Element Plus controls or project design-system equivalents; styled native select is only for baseline prototype acceptance.
- Advanced visual acceptance for option menus uses a custom popover select because native OS dropdown menus cannot be fully internet-styled or screenshot-controlled.
- Dense tables, lineage graphs, diagrams, maps, and Gantt charts have scroll, zoom, pan, drawer, or fullscreen strategy.
- Export, refresh, download, share, and fullscreen actions respect filters and permissions.
- Empty, loading, no-permission, error, and stale-selection states are defined.
- Implementation uses existing project patterns and is verified locally when built.
- Runnable prototypes use TypeScript + Vue 3 + Element Plus + ECharts + AntV S2 unless the existing project has an explicit conflicting stack.
- Runnable prototypes are automatically started on a verified available port and return the exact local URL when no public URL is available.
- Deployment, when requested, builds successfully and returns a public URL or explains why only a local preview URL is available.

## Avoid

- Do not start from visual layout before classifying the report purpose.
- Do not choose a custom shell merely because the user did not specify page style.
- Do not mark a `brandMode: haierBranded` custom shell complete when it has only a logo placeholder instead of a real bundled Haier logo.
- Do not start implementation before declaring `pageShellPath`, `pageStyleSource`, `brandMode`, `visualMode`, custom design/layout paths when applicable, and passing the logo asset gate.
- Do not use every skill for every task; use the smallest complete path.
- Do not duplicate detailed rules from child skills; route to them.
- Do not invent new report categories when one of the eight categories fits.
- Do not treat mock data as random values.
- Do not design filters or jumps without permission and state behavior.
- Do not finish an implementation without checking for overlap, clipping, and broken layout.
- Do not finish a Haier/branded implementation without visible logo or placeholder screenshot evidence.
- Do not finish sample/source restoration after changing the first viewport or main body layout unless the user asked for redesign or the change is labeled as an enhancement.
- Do not promote a sample/source module to `must-have` only because it is visible in the sample.
- Do not add an independent conclusion strip in `sampleRestore` unless the source already has an equivalent strip.
- Do not show rate/change labels as `pt`, `p.p.`, or `percentage point` in Chinese UI unless explicitly required.
- Do not reverse the required change-rate semantics: positive is red/up and negative is green/down.
- Do not let copied HTML inline colors or one-off custom surfaces override global UI tokens.
- Do not use naked native `<select>` as the final visual for primary filters; use Element Plus or the project design-system equivalent.
- Do not finish a runnable prototype visual check without headless browser screenshots and multimodal visual review results.
- Do not finish an implementation without producing the self-check report and completing the repair loop or explicitly reporting the unresolved issues after 3 cycles.
- Do not replace ECharts or AntV S2 with ad hoc chart/table code for standard report components.
- Do not hand-roll filters, forms, dialogs, drawers, popovers, tags, pagination, or simple tables when Element Plus can provide the needed control.
- Do not leave a completed runnable prototype at "please run npm..." handoff; detect a port, start it, verify it, and return the URL.
- Do not say deployment is done without returning a URL or a concrete deployment blocker.
