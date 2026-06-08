---
name: report-visual-layout-design
description: "用于报表页面视觉布局设计、评审和修复。用户提到页面布局、页面壳、顶部栏、左侧导航、标题区、筛选区、工具栏、8*N网格、区块排布、首屏层级、响应式、Haier品牌位置、图表/表格容器尺寸、hover动效裁切、空态/加载/错误态位置、元素重叠、溢出、布局不好看时触发；不负责模板工程复制、业务报表类型选择或组件细节样式。"
---

# Report Visual Layout Design

## Positioning

Use this skill to design the report page shell and visual layout. It owns page organization: header, navigation, filter/control area, toolbar, brand position, `8 * N` content grid, block sizing, first-viewport hierarchy, responsive behavior, and layout defect repair.

It does not own report-type business logic, template project assets, component-level styling, API/model design, or runtime QA.

When a runnable template is needed, hand off to `$report-prototype-template-management`. When a card/chart/table/diagram needs detailed visual treatment, hand off to `$report-component-style-design`.

For template-based pages, use `$report-prototype-template-management` `references/template-layout-design-system.md` as the source of truth for shared template spacing, block inner/outer padding, card radius, title-band geometry, widget viewport, and hover/focus layout behavior.

## Reference Loading

- Page shell and layout mode: `references/page-layout-modes.md`
- Brand and Haier visual placement: `references/brand-style.md`
- `8 * N` grid and container anatomy: `references/grid-containers.md`
- Block sizing and viewport checks: `references/block-size-constraints.md`
- Multi-subcomponent blocks: `references/block-composition.md`
- Toolbar, drawer, modal, responsive states: `references/components-interactions.md`
- Output and checklist: `references/output-checklist.md`

## Workflow

1. Identify page purpose, user, primary report question, expected density, and display scenario.
2. Declare shell intent: topbar, left-nav, unified header/control area, fixed cockpit, existing project shell, or custom shell.
3. Declare `brandMode`: `haierBranded`, `sampleNative`, or `neutral`.
4. Place page title, navigation, filters, toolbar actions, logo, and status/refresh/export/fullscreen controls.
5. Plan the first meaningful viewport: primary conclusion or action entry first, then evidence, breakdown, detail, and action areas.
6. Lay out content blocks in a rectangular `8 * N` grid. Let `N` grow; scroll or split content instead of compressing dense rows.
7. Size every block by its content needs: KPI, text summary, chart, table, complex diagram, task list, evidence panel, drawer trigger, or detail area.
8. Define layout states: loading, empty, error, no-permission, stale data, export, fullscreen, drawer/modal, and mobile/tablet behavior.
9. Run overlap/overflow checks before finalizing.

## Hard Rules

- Page/block titles are owned by layout. Component bodies should not duplicate visible titles when the surrounding block already has one.
- Top-level blocks must occupy legal rectangular `8 * N` spans.
- Treat `1920 * 1080` and `1280 * 768` as viewport baselines, not maximum report height.
- Do not divide viewport height by row count to make everything fit; increase rows, split sections, scroll, tab, drawer, or fullscreen.
- Filters, toolbar, legends, table headers, labels, chart marks, and diagram nodes must not overlap or clip.
- Hover/focus effects in fixed `8 * N` blocks must not move, scale, or visually escape components. Prefer in-bounds border glow/inset glow and route component-level motion details to `$report-component-style-design`.
- Complex diagrams need reserved title bands and at least 16px safe spacing between titles, nodes, labels, and connectors.
- Main filter controls should use the project design system or Element Plus-style controls; naked native selects are not final visual surfaces.
- Haier-branded pages must reserve a visible logo slot and use a correct light/dark logo asset supplied by the project or `$report-prototype-template-management`.

## Required Output

- Page shell choice and layout rationale.
- Brand mode and logo placement.
- Header/navigation/filter/toolbar structure.
- First-viewport hierarchy.
- `8 * N` block grid with component spans and sizing notes.
- Template layout-token family and deviations when template-based: `contentGap`, `cellPadding`, card padding/radius, title band, content range, and row height.
- Responsive and state layout plan.
- Layout risks, gaps, and downstream handoffs.

## Quality Gate

- The first meaningful viewport answers the page's main question or exposes the main action.
- Every block has a purpose, a size rationale, and a visible state plan.
- Dense components have enough room or an overflow/fullscreen/drawer strategy.
- No title, label, legend, chart, table, card, node, connector, filter, or toolbar element overlaps or clips.
- Hover/focus states for cards, blocks, navigation, and toolbar controls preserve geometry and are not clipped at block edges.
- Template-based layout tokens follow `$report-prototype-template-management` `template-layout-design-system.md`; deviations are deliberate and documented.
- Template engineering details are routed to `$report-prototype-template-management`, not embedded here.
