---
name: report-visual-layout-design
description: "Design, critique, or refine visual layout and page structure for business report pages, dashboards, and cockpit-style screens. Use when deciding page shell, title and navigation areas, filter control surfaces, Haier logo usage, visual hierarchy, 8*N grids, chart/table containers, drawers, loading/empty/error states, export/fullscreen/refresh behavior, responsive fit, and report layout QA."
---

# Report Visual Layout Design

## Core Positioning

This is a universal report visual layout skill. It owns how a report page is organized, branded, filtered, navigated, displayed, implemented through the three bundled dashboard templates when appropriate, and checked visually after the report type and business content are known.

It does not own report-type logic, mock data design, API contracts, or detailed filter/data interaction rules. When component, metric, data, filter, or interaction mapping is unclear, record the missing contract as a layout-blocking gap or handoff note instead of requiring another skill before this skill can produce layout guidance.

Treat this skill as general report layout and template selection rather than prototype-only visual advice.

## Mandatory Design Direction

- First decide `pageShellPath`: `template` or `custom`.
- If the user does not specify a page style and does not provide HTML/source/sample styling, use a bundled template by default. If the user specifies a design style or provides a sample/HTML source, follow that user-specified design direction.
- If `pageShellPath: custom`, declare exactly one `customDesignPath`: `htmlReplica` or `freeDesign`.
- Before `visualMode`, declare exactly one `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
- Before implementation, declare exactly one `visualMode`: `haierEnterprise`, `sampleRestore`, or `sciFiCockpit`.
- Keep the page simple, elegant, unified, and work-focused.
- Use Haier blue and white as the primary palette. Avoid redundant information, heavy decoration, and many competing colors.
- Use the bundled Haier logo correctly: original color logo on light backgrounds, white logo on dark backgrounds.
- Title, navigation, and filters do not have to be three separate zones. They may be merged into one unified header/control area when that better fits the page style.
- The content display area must use an `8 * N` rectangular grid. `N` may grow with content, and scrollable report pages should support vertical scrolling rather than compressing content.
- Treat `1920 * 1080` and `1280 * 768` as visible viewport baselines, not report size limits. Actual report height may exceed the first viewport.
- If a dashboard template is selected, follow the template's own shell, logo slot, navigation, filter pattern, grid mechanics, and sizing model.

## Integrated Template Routing

- `assets/templates/single-page-dashboard-template`: use for compact single-topic dashboards with a top bar and one scrollable `8 * N` content grid.
- `assets/templates/left-nav-analytics-dashboard-template`: use for multi-page, multi-chapter, dense enterprise analytics workbenches with left navigation.
- `assets/templates/sci-fi-dashboard-template`: use for fixed 1920*1080 big-screen/cockpit pages for exhibition, monitoring walls, and leadership cockpits.

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
- Use `userSpecified` when the user names a page style, layout style, visual shell, or design direction; follow that direction unless it breaks hard layout, brand, or interaction gates.
- Use `sampleProvided` when screenshot, HTML source, image, or display sample supplies the visual structure; follow the provided design under `sampleRestore` unless the user asks for optimization or redesign.
- Do not choose `pageShellPath: custom` merely because the user omitted style requirements. A custom shell needs explicit user direction, provided sample/source, or a documented template limitation.
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

### Complex Diagram Spacing Gate

- For flow, Sankey, graph, tree, decomposition, DuPont, lineage, and process-chain visuals, apply the complex-diagram spacing rules below before finalizing coordinates. If deeper component styling is out of scope, produce a handoff note instead of requiring another skill.
- The layout must reserve rail width, node half-width, label reserve, edge bend reserve, viewport padding, and a minimum gutter of 16px.
- Do not pass QA when layer numbers, labels, nodes, edges, or curve bend areas overlap, touch, or sit within less than 16px of each other.

### Filter Control Implementation Gate

- Main filter areas must not use naked native `<select>` controls as the final visual surface.
- Use Element Plus controls (`ElSelect`, `ElDropdown`, `ElTreeSelect`, `ElCascader`, `ElDatePicker`, `ElInput`, `ElButton`, `ElPopover`) or an existing project design system equivalent. If a native `<select>` is unavoidable in a lightweight prototype, it must use `appearance: none`, a custom arrow, matching height/radius, and visible hover, focus, active, disabled, loading, and error states.
- Native OS dropdown menus cannot be fully styled or screenshot-controlled; advanced visual acceptance requires a custom popover select.

## Reference Map

Load only the reference sections needed for the task:

- `references/page-layout-modes.md`: `pageShellPath` template vs custom, custom `htmlReplica` vs `freeDesign`, `pageStyleSource`, custom layout patterns, unified header/control area, title/navigation/filter placement.
- `references/brand-style.md`: Haier logo rules, Haier blue/white palette, minimalist enterprise visual style.
- `references/grid-containers.md`: `8 * N` grid, legal spans, block anatomy, ECharts/S2 container and overflow rules.
- `references/block-size-constraints.md`: calculate block sizes for 1920*1080 and 1280*768 viewports, then decide which spans can safely hold which component combinations without capping total report height.
- `references/block-composition.md`: design a single grid block that contains multiple subcomponents.
- `references/components-interactions.md`: report structure patterns, toolbar actions, drawers/popovers/modals, states, responsive behavior.
- `references/template-routing.md`: choose among the three bundled template assets.
- `references/template-shared-contract.md`: common template file map, edit boundaries, create/install/validate loop.
- `references/template-redevelopment-playbook.md`: rebuild a business report from a copied template.
- `references/template-single-page.md`: single-page top-bar dashboard specifics.
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
8. Lay out the content grid: assign every top-level block to complete rectangular `8 * N` spans; calculate the actual block size with `references/block-size-constraints.md`; separate visible viewport planning from total report height; when one block contains multiple subcomponents, use `references/block-composition.md`.
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
- Template choice, block IDs, component order, and `columns * rows` spans stay stable across revisions unless the business question, content volume, or display scenario changes.
- Block height is based on component content capacity, not forced into the first 1080px viewport.
- Titles, filters, toolbar actions, legends, labels, charts, tables, and empty states do not overlap or clip.
- Haier logo variant, brand colors, typography, spacing, and density remain consistent.
- Flow, Sankey, graph, tree, decomposition, and lineage layouts pass the 16px safe-spacing gate.
- Main filter controls use Element Plus or project design-system select/dropdown/date/cascader patterns, or a fully styled native select only for baseline prototypes.
- Tables, dense charts, maps, lineage graphs, Gantt views, and complex diagrams have scroll, zoom, pan, drawer, or fullscreen strategy.
- Loading, empty, error, no-permission, stale, export, refresh, and fullscreen states have visible layout placement.

## Avoid

- Do not choose a template because it looks richer; choose by usage scenario, navigation depth, information density, and display environment.
- Do not treat `1920 * 1080` as a hard page height for scrollable business reports.
- Do not place charts, tables, legends, or empty states in the block header area.
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
