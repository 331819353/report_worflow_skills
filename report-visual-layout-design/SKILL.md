---
name: report-visual-layout-design
description: "用于报表页面整体布局、页面壳、导航和内容区域设计/评审/修复。用户提到布局、页面结构、左侧导航、顶部栏、标题区、筛选区、工具栏、Haier logo、8*N网格、卡片/图表/表格容器、抽屉、空态/加载/错误态、导出/全屏/刷新、响应式适配、首屏信息层级、布局重做、页面不好看或元素重叠时触发。"
---

# Report Visual Layout Design

## Core Positioning

This is a universal report visual layout skill. It owns how a report page is organized, branded, filtered, navigated, displayed, implemented through the four bundled dashboard templates when appropriate, and checked visually after the report type and business content are known.

It does not own report-type logic, mock data design, API contracts, or detailed filter/data interaction rules. When component, metric, data, filter, or interaction mapping is unclear, record the missing contract as a layout-blocking gap or handoff note instead of requiring another skill before this skill can produce layout guidance.

Treat this skill as general report layout and template selection rather than prototype-only visual advice.

## Mandatory Design Direction

- First decide `pageShellPath`: `template` or `custom`.
- Use a bundled template by default. Only choose a custom shell when the user explicitly says they want to 自行设计开发 / 自由设计 / custom development, or when the user provides a sample/source and explicitly asks for 百分百复刻 / exact pixel-level restoration.
- If the user provides a sample but asks for optimization, template conversion, or does not require exact restoration, treat the sample as information architecture and visual preference evidence, then choose the closest bundled template by usage scenario.
- If `pageShellPath: custom`, declare exactly one `customDesignPath`: `htmlReplica` or `freeDesign`.
- Before `visualMode`, declare exactly one `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
- Before implementation, declare exactly one `visualMode`: `haierEnterprise`, `sampleRestore`, or `sciFiCockpit`.
- Keep the page simple, elegant, unified, and work-focused.
- Use Haier blue and white as the primary palette. Avoid redundant information, heavy decoration, and many competing colors.
- Use the bundled Haier logo correctly: original color logo on light backgrounds, white logo on dark backgrounds.
- Title, navigation, and filters do not have to be three separate zones. They may be merged into one unified header/control area when that better fits the page style.
- Page, section, and block titles are owned by the page layout layer. Data components render inside the body viewport and must not add duplicate visible titles inside charts, tables, KPI groups, or custom component bodies unless no layout title exists for that standalone surface.
- The content display area must use an `8 * N` rectangular grid. `N` may grow with content, and scrollable report pages should support vertical scrolling rather than compressing content.
- Component spans start from the default distribution in `references/grid-containers.md`, then use `references/block-size-constraints.md` to check whether the selected span can really hold the content.
- Treat `1920 * 1080` and `1280 * 768` as visible viewport baselines, not report size limits. Actual report height may exceed the first viewport.
- Do not calculate row height by dividing viewport height by `N`; increase `N`, split content, scroll, or paginate instead.
- If a dashboard template is selected, follow the template's own shell, logo slot, navigation, filter pattern, grid mechanics, and sizing model.

## Integrated Template Routing

- Only `assets/templates/frozen-title-sci-fi-cockpit-template` is fixed to a full 1920*1080 screen.
- All other bundled templates use scrollable `8 * N` content grids and a business overview/cockpit report atmosphere without a fixed big-screen frame.
- `assets/templates/topbar-dark-scroll-dashboard-template`: use for compact single-topic dashboards with a dark Haier-branded top bar and one scrollable `8 * N` content grid.
- `assets/templates/topbar-light-scroll-dashboard-template`: use for compact single-topic dashboards with a light enterprise top bar and one scrollable `8 * N` content grid.
- `assets/templates/left-nav-analytics-workbench-template`: use for multi-page, multi-chapter, dense enterprise analytics workbenches with left navigation; each nav page uses its own scrollable `8 * N` content grid.
- `assets/templates/frozen-title-sci-fi-cockpit-template`: use for fixed 1920*1080 big-screen/cockpit pages with frozen visual title/background assets for exhibition, monitoring walls, and leadership cockpits.

## Template Fallback

If a preferred template asset is missing, cannot be copied, fails dependency installation, conflicts with the existing project stack, or lacks a required capability:

1. Prefer the existing project shell and implement the same `8 * N` grid, logo, filter, toolbar, state, and component-viewport contracts inside that shell.
2. If no usable shell exists, design a custom report page with the same layout contract.
3. Keep the selected fallback explicit in the output: missing template id, reason, replacement shell, and which template behaviors must be recreated.
4. Do not block visual design because a template asset is unavailable; block only runnable implementation when no target project or writable output path exists.
5. Do not silently switch to a richer-looking template. Fallback must preserve the original usage scenario and navigation depth.

## Hard Gates

### Style Source Gate

- Before shell selection, declare `pageShellPath`: `template` or `custom`.
- Before shell selection, declare `pageStyleSource`: `templateDefault`, `userSpecified`, or `sampleProvided`.
- Use `templateDefault` when the user has not specified page style and has not provided HTML/source/sample styling; choose the closest bundled template by usage scenario.
- Use `userSpecified` when the user names a page style, layout style, visual shell, or design direction; choose a bundled template that satisfies that direction unless the user explicitly asks for 自行设计开发 / 自由设计 / custom development.
- Use `sampleProvided` when screenshot, HTML source, image, or display sample supplies the visual structure. Choose `pageShellPath: custom` only when the user explicitly asks for 百分百复刻 / exact restoration; otherwise choose the closest bundled template and record how the sample informs layout, density, and visual tone.
- Do not choose `pageShellPath: custom` merely because the user omitted style requirements or provided a loose reference. A custom shell needs explicit custom-development intent, explicit exact-restoration intent, or a documented template limitation.
- If `pageShellPath: custom`, declare `customDesignPath`:
  - `htmlReplica`: replicate provided HTML/source/sample structure.
  - `freeDesign`: create a custom shell from requirements without HTML/source/sample visual authority.
- Custom Haier pages default to `brandMode: haierBranded`; both `htmlReplica` and `freeDesign` then must configure a real bundled Haier logo. A placeholder is a blocker, not an accepted custom-page final state. Explicit `sampleNative` or `neutral` pages must record why Haier branding is not required.

### Brand Mode Gate

- Declare exactly one `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
- Use `haierBranded` for Haier enterprise pages, Haier-branded report prototypes, and custom report pages unless the user clearly asks for non-Haier/native sample branding.
- If `brandMode: haierBranded`, the Haier logo and global UI token gates override generic sample fidelity while preserving the sample's main hierarchy.
- If `brandMode: sampleNative` or `neutral`, do not inject Haier logo only because the shell is custom; record the non-Haier decision in the output.

### Brand Asset Gate

- For `brandMode: haierBranded` report pages, discover logo assets before layout or implementation: check the existing project `public`/`assets` paths, the selected template `public` path, then bundled assets `assets/haier-logo.svg`, `assets/haier-logo-original.svg`, and `assets/haier-logo-white.svg`.
- Configure the logo in the header, unified title/control area, sidebar brand area, or template logo slot before implementing business components.
- If no usable logo asset is available, keep the same logo slot and render an explicit placeholder such as `Logo placeholder: asset missing`; record the missing asset as a gap. Do not silently omit the logo.
- For `pageShellPath: custom` with `brandMode: haierBranded`, placeholder does not pass acceptance. Copy or reference a real bundled Haier logo before final delivery.
- Screenshot acceptance must confirm that the logo or declared placeholder is visible, uses the correct light/dark variant, is not stretched, and is not clipped.

### Unique Visual Mode Gate

- Declare exactly one `visualMode` before page shell or template work:
  - `haierEnterprise`: default for ordinary business reports, enterprise workbenches, and Haier/brand-unified pages.
  - `sampleRestore`: default when the input is a display sample, screenshot, image, or HTML source and the user asks to restore, follow, or build from it without explicit redesign.
  - `sciFiCockpit`: only for explicit big-screen, cockpit, command-center, exhibition, monitoring-wall, or fixed 1920*1080 presentation use.
- Conflict priority: explicit user instruction wins; otherwise sample/source restoration uses `sampleRestore`; explicit big-screen presentation uses `sciFiCockpit`; all other business report prototypes use `haierEnterprise`.
- If `sampleRestore` conflicts with Haier enterprise styling, preserve the sample's shell, module order, container hierarchy, main control count, layer structure, and card proportions. Add Haier logo, filters, summaries, tables, matrices, drawers, or jumps only as labeled enhancements that do not change the first viewport or main layout unless the user asks for optimization.
- In `sampleRestore`, added conclusions, insights, or status summaries must be embedded into an existing sample-equivalent region such as the header/control area, panorama header, section head, or summary card. Do not insert a new standalone horizontal band unless the source has an equivalent band.
- If the user asks for enterprise/Haier unification or optimization, use `haierEnterprise`; treat the sample as information architecture and content evidence rather than a visual authority.

### Global UI Token Gate

- When layout/style follows HTML, screenshot, or custom design, preserve the user/source shell and module hierarchy, but use global UI tokens for palette, typography, spacing, radius, shadows, semantic colors, and control states unless the user explicitly requires exact color restoration.
- A custom or HTML-replica page must not introduce one-off local colors, densities, shadows, or component surfaces that conflict with the selected template/project/global UI.

### Chinese Metric Display Gate

- Rate, completion, variance-rate, YoY, MoM, and change fields use `%` in visible Chinese UI. Do not render `pt`, `p.p.`, or `percentage point` in page labels unless the user explicitly requests that technical term.
- Change-rate and variance-rate indicators use positive-red-up and negative-green-down semantics: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.

### Custom Layout Pattern Gate

- When the page shell is custom rather than a bundled template, declare exactly one `customLayoutPattern`:
  - `symmetricBalance`: 对称式, left/right or top/bottom balanced modules for comparison, overview, and paired KPI/chart layouts.
  - `threePart`: 三部式, summary/analysis/detail or header/main/side-action structure for clear hierarchy.
  - `masterDetail`: 主从式, primary list/map/chart plus detail drawer/panel/table for object exploration.
  - `narrativeStack`: 分层叙事式, conclusion first then evidence, diagnosis, detail, and action in a vertical reading flow.
- Choose by business question and content density; do not invent a fifth custom pattern unless the user explicitly requests it.
- Record why the selected pattern fits the report and how it preserves the `8 * N` grid.

### Title Ownership Gate

- The page shell owns page titles, section titles, block titles, and stage/layer/lane titles. Component implementations receive a titled container and should render only the data visual, table, KPI values, controls, legends, notes, and states inside the body viewport.
- Disable or omit ECharts/S2/custom-chart internal `title` options when the surrounding block already has a visible title. Do not repeat the same title in both the block header and the chart body.
- If a component must run standalone without a page/block title, record that exception and reserve title height before computing the body viewport.

### Chart X-Axis Ordering Gate

- 折线图、面积图、柱状图等类目轴图表必须显式排序 x 轴。时间、月份、周期类 x 轴默认按时间升序，除非用户或业务规则明确要求倒序或自定义顺序。
- 不允许只排序 x 轴标签、`labels`、`categories` 或 `xAxis.data`，再用未排序的原始行生成 `series.data`。必须先按 x 轴字段排序整行数据，再从同一个有序行列表生成 `xAxis.data`、所有 `series.data`、tooltip payload 和点击 payload。
- 当 x 轴来自接口或 mock 数据时，组件实现仍要声明排序字段和排序方向；不能假设上游已经排好序。

### Component Size And Distribution Gate

- Do not finalize a layout with components that are too narrow, too small, or crowded. Enlarge the block, reduce component count, split sections, add vertical scroll, use tabs/drawers/fullscreen, or change component type before shrinking text or overlapping content.
- For peer component groups inside one large block, use the internal exact `M * N` matrix algorithm only when `actualTotal > 4`. For `actualTotal <= 4`, use a small-group layout based on content and block shape instead of this factor algorithm. When the algorithm applies, `M` is columns and `N` is internal rows. Calculate from `layoutTotal`: normally `layoutTotal = actualTotal`; when `actualTotal` is prime, use `layoutTotal = actualTotal + 1`; then choose `layoutTotal = M * N`, `M >= N`, and minimal `M - N` among valid factor pairs. This decides the subcomponent layout inside the large block; it does not replace the outer `8 * N` page-grid span.
- After choosing the internal matrix, run parent-block expansion: if the current large block body cannot provide readable height, increase the outer block's row span with `heightExpansionRows = ceil(N * 2 / 3)` before shrinking labels, charts, or tables. Do not add arbitrary empty placeholders to force a prettier matrix; the only allowed spare cell is the single prime-balancing cell created when the algorithm applies to a prime count, and it must not create fake metrics or mock data. If the factor pair creates an unreadable long strip, split the group by business meaning, tabs, pagination, drawer, or another block before finalizing. Avoid long single-row or single-column strips unless the content is explicitly a timeline, KPI strip, or navigation and passes pixel-fit checks.
- Every repeated card/chart/table tile must have enough body width and height for its values, labels, legends, axes, pagination, and states at the target viewport.

### Complex Diagram Spacing Gate

- For flow, Sankey, graph, tree, decomposition, DuPont, lineage, and process-chain visuals, apply the complex-diagram spacing rules below before finalizing coordinates. If deeper component styling is out of scope, produce a handoff note instead of requiring another skill.
- The layout must reserve rail width, node half-width, label reserve, stage/layer/lane title band, edge bend reserve, viewport padding, and a minimum gutter of 16px.
- Do not pass QA when layer numbers, stage/layer/lane titles, group captions, labels, nodes, edges, or curve bend areas overlap, touch, or sit within less than 16px of each other.

### Filter Control Implementation Gate

- Main filter areas must not use naked native `<select>` controls as the final visual surface.
- Use Element Plus controls (`ElSelect`, `ElDropdown`, `ElTreeSelect`, `ElCascader`, `ElDatePicker`, `ElInput`, `ElButton`, `ElPopover`) or an existing project design system equivalent. If a native `<select>` is unavoidable in a lightweight prototype, it must use `appearance: none`, a custom arrow, matching height/radius, and visible hover, focus, active, disabled, loading, and error states.
- Native OS dropdown menus cannot be fully styled or screenshot-controlled; advanced visual acceptance requires a custom popover select.

## Reference Map

Load only the reference sections needed for the task:

- `references/page-layout-modes.md`: `pageShellPath` template vs custom, custom `htmlReplica` vs `freeDesign`, `pageStyleSource`, custom layout patterns, unified header/control area, title/navigation/filter placement.
- `references/brand-style.md`: Haier logo rules, Haier blue/white palette, minimalist enterprise visual style.
- `references/grid-containers.md`: `8 * N` grid, default component span distribution, block anatomy, ECharts/S2 container and overflow rules.
- `references/block-size-constraints.md`: calculate block sizes for 1920*1080 and 1280*768 viewports, check component minimum size and complexity, then adjust spans without capping total report height.
- `references/block-composition.md`: design a single grid block that contains multiple subcomponents.
- `references/components-interactions.md`: report structure patterns, toolbar actions, drawers/popovers/modals, states, responsive behavior.
- `references/template-routing.md`: choose among the four bundled template assets.
- `references/template-shared-contract.md`: common template file map, edit boundaries, create/install/validate loop.
- `references/template-usage-modes.md`: zero-development, copy-modify, and production redevelopment modes.
- `references/template-redevelopment-playbook.md`: rebuild a business report from a copied template.
- `references/template-single-page.md`: top-bar scroll dashboard specifics for dark and light variants.
- `references/template-left-nav.md`: left-nav multi-page analytics specifics.
- `references/template-sci-fi.md`: fixed 1920*1080 cockpit specifics.
- `references/template-recipes-checklist.md`: common template edits and verification checklist.
- `references/output-checklist.md`: output format, quality checklist, and avoid list.

## Workflow

1. Identify context: report type, audience, core question, usage scenario, and whether the implementation uses `pageShellPath: template` or `pageShellPath: custom`.
2. Declare `pageStyleSource`, `pageShellPath`, `brandMode`, `visualMode`, and pass the brand asset gate. If the input is a display sample, screenshot, or HTML source, decide whether it is `sampleRestore` or only an information-architecture reference.
3. Choose the shell mode:
   - Custom page: design one coherent title/navigation/filter control area plus the `8 * N` content display area.
   - Template page: map requirements into the selected template's existing logo, nav, filter, toolbar, modal, and grid configuration.
4. If no user-specified/sample style exists, prefer a bundled template. If a custom shell is chosen, declare one `customDesignPath` and one `customLayoutPattern`.
5. If a template is appropriate, read `references/template-routing.md`; then load only the selected template reference and the shared contract/playbook files needed for the edit.
6. Define the visual hierarchy: core conclusion first, then evidence, breakdown, detail, and actions.
7. Apply brand style or sample fidelity according to `visualMode`.
8. Lay out the content grid: first choose a default rectangular `8 * N` span by component type, calculate the actual block size with `references/block-size-constraints.md`, then keep it, enlarge it, or split the content based on the check result; separate visible viewport planning from total report height; when one block contains multiple subcomponents, use `references/block-composition.md`.
9. Define actions and states: refresh, export, fullscreen, share/subscribe/settings if relevant; loading, empty, error, delayed data, and no-permission states.
10. Run layout QA with the checklist before finalizing.

## Quality Gate

Before finalizing a layout, verify:

- The first meaningful viewport answers the primary report question or exposes the correct action entry.
- `pageShellPath` is declared as `template` or `custom`.
- `pageStyleSource` is declared; absence of style/HTML/sample input routes to a bundled template by default.
- Exactly one `brandMode` is declared and its logo/global-token implications are followed.
- Exactly one `visualMode` is declared and conflicts with samples, templates, Haier branding, or sci-fi styling are resolved by the hard gate.
- If `pageShellPath: custom`, exactly one `customDesignPath` is declared: `htmlReplica` or `freeDesign`.
- Any custom shell declares exactly one `customLayoutPattern`: `symmetricBalance`, `threePart`, `masterDetail`, or `narrativeStack`.
- Brand asset discovery is complete; the logo slot contains the correct asset or an explicit placeholder and the gap is recorded.
- Custom pages with `brandMode: haierBranded` use a real bundled Haier logo; placeholder state is treated as blocked rather than pass.
- For sample/source restoration, page shell, module order, container hierarchy, main control count, layer structure, and card proportions match the sample unless an enhancement is explicitly labeled.
- For sample/source restoration, added conclusions, insights, or status summaries are embedded into existing sample-equivalent regions rather than standalone bands.
- Custom and HTML-replica pages use global UI tokens for palette, typography, spacing, radius, semantic colors, and control states unless exact restoration is explicitly required.
- Rate/change labels use Chinese `%` display and trend indicators follow positive-red-up / negative-green-down icon semantics.
- The shell choice matches the scenario: single-page, left-nav analytics, sci-fi cockpit, or custom page.
- Every top-level content block occupies a legal rectangular `8 * N` grid span.
- Component spans are selected from the default distribution first and adjusted only when the size check shows the content cannot fit.
- Every titled block has exactly one visible layout-owned title. Components inside the block do not render a duplicate title in their body viewport.
- Line, area, bar, and other category-axis charts explicitly sort the x-axis and derive labels, points, values, tooltips, and click payloads from the same sorted row order.
- Template choice, block IDs, component order, and `columns * rows` spans stay stable across revisions unless the business question, content volume, or display scenario changes.
- Block height follows component capacity and fixed row-height rules; the page grows, scrolls, or paginates instead of compressing rows.
- Repeated cards, charts, tables, and peer groups pass the small-group threshold, internal exact `M * N` distribution when `actualTotal > 4`, parent-block expansion, and pixel-fit checks before final acceptance.
- Titles, filters, toolbar actions, legends, labels, charts, tables, and empty states do not overlap or clip.
- Business-question text, conclusion text, titles, labels, legends, chart marks, diagrams, tables, and cards do not overlap, touch, or visually stack on top of each other.
- Section headers, level labels, lane titles, stage titles, and group captions reserve their own title band and do not overlap, touch, or visually attach to cards, node boxes, connector lines, badges, or child labels. Keep at least 16px safe spacing; if this cannot pass, enlarge the block, move the title outside the diagram, or use fullscreen/zoom/pan.
- Haier logo variant, brand colors, typography, spacing, and density remain consistent.
- Flow, Sankey, graph, tree, decomposition, and lineage layouts pass the 16px safe-spacing gate, including title-band reserve and no title-node collision.
- Main filter controls use Element Plus or project design-system select/dropdown/date/cascader patterns, or a fully styled native select only for baseline prototypes.
- Tables, dense charts, maps, lineage graphs, Gantt views, and complex diagrams have scroll, zoom, pan, drawer, or fullscreen strategy.
- Loading, empty, error, no-permission, stale, export, refresh, and fullscreen states have visible layout placement.

## Avoid

- Do not choose a template because it looks richer; choose by usage scenario, navigation depth, information density, and display environment.
- Do not treat `1920 * 1080` as a hard page height for scrollable business reports.
- Do not place charts, tables, legends, or empty states in the block header area.
- Do not draw a second visible title inside a component body when the page or block layout already provides that title.
- Do not place a section/stage/layer/lane title in the same collision band as a node card or component card.
- Do not make components narrow, tiny, crowded, or arranged as an awkward long strip when `actualTotal > 4` and an internal exact `M * N` layout plus parent-block expansion can carry the same content.
- Do not allow business-question text, chart marks, labels, legends, cards, or diagram nodes to overlap, stack, or visually merge.
- Do not use decorative panels, gradients, images, or colors that compete with the report conclusion.
- Do not invent non-rectangular spans or compress dense components until labels and values become unreadable.
- Do not leave export, fullscreen, drawer, or responsive behavior outside the layout plan.

## Default Output

When asked to design a report visual layout, structure the answer as:

1. 页面定位: report type, user, core question, usage scenario, custom shell or template-based.
2. 样式来源: `pageStyleSource`, `brandMode`, `visualMode`, and `customLayoutPattern` when the shell is custom.
3. 页面外壳: unified title/navigation/filter control area, logo placement, actions, and template mapping if applicable.
4. 品牌风格: Haier logo variant, Haier blue/white palette, typography, spacing, density, surfaces.
5. 内容结构: summary, breakdown, evidence, detail, action, or another report-appropriate flow.
6. 栅格方案: `8 * N` grid, component spans, row height/scroll strategy, chart/table container safety.
7. 关键组件: KPI cards, charts, tables, text summaries, drawers/popovers, toolbar actions.
8. 模板路由: chosen template and files/configs to adjust.
9. 交互与状态: filters, drilldown, drawer/modal, refresh/export/fullscreen, empty/loading/error/no-permission, responsive behavior.
10. 设计校验: first-viewport value, brand correctness, grid correctness, visual restraint, no clipping/overlap.
