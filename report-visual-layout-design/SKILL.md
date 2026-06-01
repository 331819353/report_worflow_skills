---
name: report-visual-layout-design
description: "Design, critique, or refine visual layout and page structure for business report pages, dashboards, and cockpit-style screens. Use when deciding page shell, title and navigation areas, filter control surfaces, Haier logo usage, visual hierarchy, 8*N grids, chart/table containers, drawers, loading/empty/error states, export/fullscreen/refresh behavior, responsive fit, and report layout QA."
---

# Report Visual Layout Design

## Core Positioning

This is a universal report visual layout skill. It owns how a report page is organized, branded, filtered, navigated, displayed, implemented through the three bundled dashboard templates when appropriate, and checked visually after the report type and business content are known.

It does not own report-type logic, mock data design, API contracts, or detailed filter/data interaction rules. Use the relevant report-type skill and `report-info-component-mapping` when component, metric, data, filter, or interaction mapping is still unclear.

Keep the canonical skill name `report-visual-layout-design` for compatibility with existing report-type skills, but treat its scope as general report layout and template selection rather than prototype-only visual advice.

## Mandatory Design Direction

- First decide whether the page is a blank report page or a template-based report page.
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
2. If no usable shell exists, design a blank custom report page with the same layout contract.
3. Keep the selected fallback explicit in the output: missing template id, reason, replacement shell, and which template behaviors must be recreated.
4. Do not block visual design because a template asset is unavailable; block only runnable implementation when no target project or writable output path exists.
5. Do not silently switch to a richer-looking template. Fallback must preserve the original usage scenario and navigation depth.

## Reference Map

Load only the reference sections needed for the task:

- `references/page-layout-modes.md`: blank page vs template page, unified header/control area, title/navigation/filter placement.
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

1. Identify context: report type, audience, core question, usage scenario, and whether the implementation is blank-page or template-based.
2. Choose the shell mode:
   - Blank page: design one coherent title/navigation/filter control area plus the `8 * N` content display area.
   - Template page: map requirements into the selected template's existing logo, nav, filter, toolbar, modal, and grid configuration.
3. If a template is appropriate, read `references/template-routing.md`; then load only the selected template reference and the shared contract/playbook files needed for the edit.
4. Define the visual hierarchy: core conclusion first, then evidence, breakdown, detail, and actions.
5. Apply brand style: Haier blue/white primary palette, restrained semantic colors, subtle surfaces, no decorative noise.
6. Lay out the content grid: assign every top-level block to complete rectangular `8 * N` spans; calculate the actual block size with `references/block-size-constraints.md`; separate visible viewport planning from total report height; when one block contains multiple subcomponents, use `references/block-composition.md`.
7. Define actions and states: refresh, export, fullscreen, share/subscribe/settings if relevant; loading, empty, error, delayed data, and no-permission states.
8. Run layout QA with the checklist before finalizing.

## Quality Gate

Before finalizing a layout, verify:

- The first meaningful viewport answers the primary report question or exposes the correct action entry.
- The shell choice matches the scenario: single-page, left-nav analytics, sci-fi cockpit, or blank custom page.
- Every top-level content block occupies a legal rectangular `8 * N` grid span.
- Template choice, block IDs, component order, and `columns * rows` spans stay stable across revisions unless the business question, content volume, or display scenario changes.
- Block height is based on component content capacity, not forced into the first 1080px viewport.
- Titles, filters, toolbar actions, legends, labels, charts, tables, and empty states do not overlap or clip.
- Haier logo variant, brand colors, typography, spacing, and density remain consistent.
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

1. 页面定位: report type, user, core question, usage scenario, blank-page or template-based.
2. 页面外壳: unified title/navigation/filter control area, logo placement, actions, and template mapping if applicable.
3. 品牌风格: Haier logo variant, Haier blue/white palette, typography, spacing, density, surfaces.
4. 内容结构: summary, breakdown, evidence, detail, action, or another report-appropriate flow.
5. 栅格方案: `8 * N` grid, component spans, row height/scroll strategy, chart/table container safety.
6. 关键组件: KPI cards, charts, tables, text summaries, drawers/popovers, toolbar actions.
7. 模板路由: chosen template and files/configs to adjust.
8. 交互与状态: filters, drilldown, drawer/modal, refresh/export/fullscreen, empty/loading/error/no-permission, responsive behavior.
9. 设计校验: first-viewport value, brand correctness, grid correctness, visual restraint, no clipping/overlap.
## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
