---
name: report-visual-layout-design
description: "用于报表页面视觉布局设计、评审和修复。用户提到页面布局、页面壳、顶部栏、左侧导航、标题区、筛选区、工具栏、8*N网格、区块排布、首屏层级、响应式、Haier品牌位置、图表/表格容器尺寸、hover动效裁切、空态/加载/错误态位置、元素重叠、溢出、布局不好看时触发；不负责模板工程复制、业务报表类型选择或组件细节样式。"
---

# Report Visual Layout Design

## Positioning

Use this skill to design the report page shell and visual layout. It owns page organization: header, navigation, filter/control surface, toolbar, brand position, `8 * N` content grid, parent block sizing, parent-block-to-sub-block composition, first-viewport hierarchy, responsive behavior, and layout defect repair.

It does not own report-type business logic, template project assets, component-level styling, API/model design, or runtime QA.

When a runnable template is needed, hand off to `$report-prototype-template-management`. When a card/chart/table/diagram needs detailed visual treatment, hand off to `$report-component-style-design`.

When the page includes common enterprise app shell, navigation, forms, dialogs, or cross-platform application surfaces, load `$haier-enterprise-app-ui-design-spec` for company-level tokens, app layout rules, component hierarchy, and cross-platform adaptation. This skill only maps those rules into the report page shell and `8 * N` block layout.

For template-based pages, use `$report-prototype-template-management` `references/template-layout-design-system.md` as the source of truth for shared template spacing, block inner/outer padding, card radius, title-band geometry, widget viewport, and hover/focus layout behavior. If the selected template owns filter invocation, design the native filter surface and binding contract; do not add a separate filter toolbar or persistent filter bar.

For every report, dashboard, cockpit, data-screen, BI, or business-analysis layout task, use `$report-design-system-governance` `references/04-report-requirements-metrics-layout-guidelines.md` as the report layout baseline for page information architecture, overview-analysis-detail-explanation hierarchy, card spacing, module priority, and layout acceptance.

## Reference Loading

- Page shell and layout mode: `references/page-layout-modes.md`
- Brand and Haier visual placement: `references/brand-style.md`
- Haier enterprise app UI tokens/components/layouts for common app surfaces: `$haier-enterprise-app-ui-design-spec`
- Report development layout baseline for report pages: `$report-design-system-governance` `references/04-report-requirements-metrics-layout-guidelines.md`
- Leadership-friendly report sample patterns and reusable reading paths: `$report-design-system-governance` `references/07-exemplary-report-design-patterns.md`
- `8 * N` grid and container anatomy: `references/grid-containers.md`
- Block sizing and viewport checks: `references/block-size-constraints.md`
- Parent block and internal sub-block composition: `references/block-composition.md`
- Toolbar, drawer, modal, responsive states: `references/components-interactions.md`
- Output and checklist: `references/output-checklist.md`

## Workflow

1. Identify page purpose, user, primary report question, expected density, and display scenario.
2. Declare shell intent: topbar, left-nav, unified header/control area, fixed cockpit, existing project shell, or custom shell.
3. Declare `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
4. Place page title, navigation, filters, toolbar actions, logo, and status/refresh/export/fullscreen controls. For template-based pages, map filters to the template's native `filters[]` trigger/panel/popover/drawer or local title-band filters. For every block, design the title band as left title plus right function area.
5. Plan the first meaningful viewport: primary conclusion or action entry first, then evidence, breakdown, detail, and action areas.
6. Lay out top-level parent blocks in a rectangular `8 * N` grid. Let `N` grow; scroll or split content instead of compressing dense rows.
7. For each parent block, decide whether it is single-component or internally composed. If composed, define stable internal sub-blocks inside the parent body, then place components in those sub-blocks.
8. Size every parent block and sub-block by its content needs: KPI, text summary, chart, table, complex diagram, task list, evidence panel, drawer trigger, or detail area.
9. Define layout states: loading, empty, error, no-permission, stale data, export, fullscreen, drawer/modal, and mobile/tablet behavior at both parent-block and affected sub-block levels. For no-data masks in composed parent blocks, decide the mask scope after checking all sibling sub-block data states.
10. For fixed-height navigation, cards, KPI strips, and compact controls, declare an internal height budget before finalizing: padding + explicit line-height boxes + vertical gaps + status/badge/footer rows must be `<=` the assigned component height.
11. Run overlap/overflow checks before finalizing.

## Hard Rules

- Page/block titles are owned by layout. Component bodies should not duplicate visible titles when the surrounding block already has one.
- Block title bands default to a two-zone layout: top-left is the left-aligned block title, and top-right is the function area. The function area may contain lightweight local filters, a filter-panel trigger, or text links such as `详情` / `查看详情`; it must not push, wrap, or overlap the title.
- Right function area control selection: one local filter with fewer than 3 values uses a sliding capsule/segmented pill; one local filter with 3 or more values uses a compact dropdown/select; multiple local filters use a filter panel/popover/drawer trigger. Low-frequency detail/jump actions use explicit text links or icon+tooltip links in the same right area.
- Top-level blocks must occupy legal rectangular `8 * N` spans.
- A top-level `8 * N` block is a parent container, not a one-component limit. Parent blocks may contain internal sub-blocks, and each sub-block may contain one component or one tightly related micro-group.
- Internal sub-blocks must remain inside the parent block body viewport. They do not create nested page-grid blocks, do not own same-weight block titles, and must use local grid/flex tracks with `5px` parent inset, `5px` sibling gaps, explicit min sizes, and overflow rules.
- No-data masks in composed parent blocks are hierarchical. If a sub-block has no data, first check every sibling sub-block in the same parent block. When all sub-blocks are no-data, show one parent-block mask over the whole parent block. When only some sub-blocks are no-data, show masks only on those affected sub-blocks. A sub-block mask must cover the sub-block label/title/control area and component body together; it must not mask only the chart/table body and leave the sub-block title active.
- Treat `1920x1080` and `1280x768` as viewport baselines, not maximum report height.
- First-level perspective controls such as domain navigation, Tabs, and Segments must pass no-clipping DOM checks at both `1920x1080` and `1280x768`. For each visible navigation/control item or card content viewport, acceptance requires `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`; if `scrollHeight > clientHeight` or `scrollWidth > clientWidth`, the layout fails even when screenshots look acceptable. Screenshot inspection cannot replace this DOM check.
- Fixed-height navigation/cards must declare a height budget before acceptance: `paddingTop + paddingBottom + sum(explicit line-height * reserved lines) + sum(gaps) + fixed badges/status/footer heights <= cardHeight`. Auto layout alone is not acceptable for fixed-height components.
- Domain names, metric names, percentages/core values, badges, footer labels, and bottom focus labels inside fixed-height navigation/cards must have explicit `line-height`; large numbers must not rely on browser default line boxes.
- First-level navigation should carry `domain + one core indicator` by default. Navigation cards may carry at most two layers of primary information. If one navigation card needs domain name, metric name, value, and focus point at the same time, redesign it as a two-line structure, intentional horizontal navigation pattern, dropdown perspective selector, selected-state summary, or move detail into tooltip/overview content.
- Do not divide viewport height by row count to make everything fit; increase rows, split sections, scroll, tab, drawer, or fullscreen.
- Filters, toolbar, legends, table headers, labels, chart marks, and diagram nodes must not overlap or clip.
- Template-based pages must not introduce a standalone filter toolbar, persistent filter bar, or extra filter drawer when the selected template already has a filter trigger/panel/popover/drawer. Treat "筛选工具栏" requirements as `filters[]` and filter-binding work unless the user explicitly requests template-level redesign.
- Shape-sensitive visuals such as gauges, radar, maps, pies, flow paths, SVG/canvas diagrams, and custom ECharts graphics need an aspect-compatible block or fullscreen/fit-box strategy. Do not allocate them to a mismatched rectangle and rely on non-uniform stretching.
- Hover/focus effects in fixed `8 * N` blocks must not move, scale, or visually escape components. Prefer in-bounds border glow/inset glow and route component-level motion details to `$report-component-style-design`.
- Complex diagrams need reserved title bands and at least 16px safe spacing between titles, nodes, labels, and connectors.
- Main filter controls should use the project design system or Element Plus-style controls; naked native selects are not final visual surfaces.
- Haier-branded pages must reserve a visible logo slot and use a correct light/dark logo asset supplied by the project or `$report-prototype-template-management`.

## Required Output

- Page shell choice and layout rationale.
- Brand mode and logo placement.
- Header/navigation/filter/toolbar structure.
- Perspective navigation density and DOM no-clipping check plan for `1920x1080` and `1280x768`.
- Fixed-height navigation/card height budget: declared height, padding, explicit line heights, row count, gaps, footer/status heights, and pass/fail calculation.
- Block title-band structure: left-aligned title, right function area contents, and control selection rule for local filters/links.
- Filter surface mapping: template-native filter trigger/panel/popover/drawer, local title-band filter, custom filter bar, or explicit redesign exception.
- First-viewport hierarchy.
- `8 * N` parent block grid, internal sub-block plan when used, component placement, and sizing notes.
- Empty/no-data mask scope plan: parent-block mask when all child sub-blocks have no data; affected sub-block mask including sub-block title plus component when only part of the parent is empty.
- Template layout-token family and deviations when template-based: `contentGap`, `cellPadding`, card padding/radius, title band, content range, and row height.
- Responsive and state layout plan.
- Layout risks, gaps, and downstream handoffs.

## Quality Gate

- The first meaningful viewport answers the page's main question or exposes the main action.
- Every block title band preserves left title alignment and a bounded right function area; local filters follow capsule/dropdown/panel selection rules and links do not crowd the title.
- Domain navigation, Tabs, and Segments pass DOM no-clipping checks at `1920x1080` and `1280x768`: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth` for each visible item/card content viewport. Screenshot-only evidence is insufficient.
- Fixed-height navigation/cards declare padding, explicit line-height, gaps, and height budget; `padding + line-height boxes + gaps <= card height` at both baseline viewports.
- Navigation/cards with `scrollHeight > clientHeight` or `scrollWidth > clientWidth` fail layout QA even if screenshot review does not show obvious clipping.
- Navigation cards do not exceed two primary information layers; default content is `domain + one core indicator`; domain name + metric name + value + focus point is split, scrolled intentionally, converted to dropdown perspective selection, moved to selected-state summary, or moved to tooltip/overview.
- Every block has a purpose, a size rationale, and a visible state plan.
- Every internal sub-block has a purpose, a size rationale, component owner, and visible state plan when parent-block composition is used.
- No-data masks are applied at the correct hierarchy: whole parent block only when every child sub-block is no-data, otherwise only the no-data child sub-blocks, covering each child sub-block title/label/control area plus its component body.
- Dense components have enough room or an overflow/fullscreen/drawer strategy.
- No title, label, legend, chart, table, card, node, connector, filter, or toolbar element overlaps or clips.
- Template filter surfaces are reused instead of duplicated; no standalone filter toolbar/bar appears in a template-based layout without a named redesign decision.
- Shape-sensitive charts and diagrams are assigned aspect-compatible spans or use centered uniform scaling/fullscreen; they are not warped to fill a block.
- Hover/focus states for cards, blocks, navigation, and toolbar controls preserve geometry and are not clipped at block edges.
- Template-based layout tokens follow `$report-prototype-template-management` `template-layout-design-system.md`; deviations are deliberate and documented.
- Template engineering details are routed to `$report-prototype-template-management`, not embedded here.
