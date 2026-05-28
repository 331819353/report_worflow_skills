---
name: report-visual-layout-design
description: "Design, critique, or refine visual layout, page shell, UI composition, and interaction surfaces for business report pages, dashboards, and TypeScript + Vue 3 prototypes. Use when deciding menu bar, navigation, sidebar, breadcrumbs, logo, title, header, footer, filter area, toolbar actions, fullscreen, export, refresh, share, tabs, content hierarchy, 8*N rectangular grid, summary/detail structure, card/table/chart composition, ECharts container layout, AntV S2 table layout, drawers, empty/loading states, internet-style polish, readability, and usability. Always use the bundled Haier logo: original color on light backgrounds and white on dark backgrounds. Complements all eight report-type design skills."
---

# Report Visual Layout Design

## Core Positioning

Treat this as a visual and interaction shell skill for reports. It defines how a report page should be structured, styled, and operated after the business report type has been chosen.

It owns the page shell and visual composition. It does not own report-type logic, mock data logic, filter option behavior, or detailed drilldown state. Use the relevant report-type skill, `report-info-component-mapping`, `report-mock-data-design`, `report-filter-data-design`, and `report-data-interaction-design` before finalizing the visual shell when those concerns are present.

For runnable prototypes, assume the implementation architecture is TypeScript + Vue 3 + Vite + ECharts + AntV S2 unless the existing project explicitly uses another stack. Visual layout decisions should leave enough stable container space for ECharts canvases and AntV S2 analytical tables to resize correctly inside the 8*N grid.

This skill answers:

- 报表页面应该长什么样。
- 是否需要菜单栏、导航栏、页眉、页脚。
- logo、标题、筛选、刷新、下载、全屏等控件放在哪里。
- 内容应该采用总分总、总分、分总、明细优先、看板式还是叙事式，并如何落到 `8 * N` 矩形分块。
- 如何做到互联网风格、美观、直达核心、易用、可读、可操作。

Do not invent decorative layouts. Reports are work surfaces. The first screen must reach the core question quickly.

## Design Principles

Use these principles for every report page:

- Core first: the first viewport must answer the report's main question or expose the most important work item.
- Quiet hierarchy: use clear spacing, typography, grouping, and semantic color instead of heavy decoration.
- Action nearby: put refresh, export, fullscreen, share, settings, and handling actions near the report context they affect.
- Filters visible: keep high-frequency filters easy to reach; collapse advanced filters.
- Evidence on demand: use drawers, popovers, and tabs to reveal details without breaking the main view.
- Semantic color: use color for status, risk, emphasis, and action; avoid decorative color noise.
- Dense but breathable: enterprise reports should scan quickly without feeling cramped.
- Responsive: desktop-first for complex reports, but ensure tablet/mobile fallback for viewing and approvals.
- Grid discipline: content layout must use an `8 * N` rectangular block grid. Every component may occupy multiple blocks, but its occupied area must be a complete rectangle.

Prefer a modern light enterprise style: white or near-white surfaces, subtle borders, 8px or smaller radius, restrained shadows, crisp icons, clear type scale, and compact controls.

## Brand Logo Rule

Always use the bundled Haier logo assets for report visual layouts:

- Light background: use `assets/haier-logo-original.svg`.
- Dark background: use `assets/haier-logo-white.svg`.

Usage rules:

- Put the logo in the global app bar, report header, export cover, PDF/PPT footer, or shared report header when brand context is needed.
- Keep logo size restrained. It should identify the report platform, not compete with the report title.
- Preserve the original aspect ratio.
- Do not recolor the original logo except using the provided white variant on dark backgrounds.
- Do not place the logo repeatedly in cards, charts, section headers, or decorative backgrounds.
- In fullscreen or presentation mode, keep the logo visible only if it helps orientation or brand consistency.

## Page Shell Anatomy

Use a page shell made of these optional parts. Include only what serves the task.

### Global App Bar

Use when the report belongs to a larger product or report platform.

Contains:

- Logo or product name.
- Global module navigation.
- Global search if the product has many reports or objects.
- User/account area.
- Notifications or messages when reports have alerts, tasks, or comments.

Avoid repeating a large logo inside every report. Logo belongs to the global shell or export cover, not the content body.

### Sidebar Or Menu

Use when users need to switch between report groups, modules, or report categories.

Good for:

- Report catalog.
- Organization report tree.
- Frequent cross-report navigation.
- Role-based workbench navigation.

Avoid sidebars for single-report embeds or meeting/export views. If screen width is tight, collapse to icons or a drawer menu.

### Page Header

Almost always include it. It anchors the report.

Contains:

- Report title.
- Short subtitle or decision question.
- Period/scope.
- Data status: latest refresh time, data version, locked status, or sync status.
- Owner or department when governance matters.
- Primary actions: refresh, export/download, fullscreen, share, subscribe, settings.

Keep title concise. Put口径, source, and long definitions in popovers or drawers.

### Breadcrumbs And Tabs

Use breadcrumbs when the report sits in a hierarchy:

- 集团经营 > 区域总览 > 华东区域
- 报表中心 > 财务核对 > 预算与费用核对

Use tabs when the same report has peer views:

- 总览 / 维度拆分 / 明细 / 处理记录
- 看板 / 列表 / 甘特 / 统计
- 摘要 / 结果 / 原因 / 风险 / 行动

Do not use both heavy breadcrumbs and many tabs unless the hierarchy genuinely needs them.

### Filter Bar

Usually include it directly below the page header.

Design:

- Show 3-6 high-frequency filters by default.
- Put advanced filters in expandable area.
- Use chips to show active filter conditions.
- Provide reset, save view, and apply actions when filters are complex.
- Use sticky behavior for long pages when repeated filtering is common.

Common filters:

- Time period.
- Organization or region.
- Business line.
- Report object type.
- Status or risk level.
- Owner.
- Metric or baseline.

Avoid making users scroll before they can set the report scope.

### Toolbar

Use a compact toolbar near filters or table/list headers.

Typical actions:

- Refresh.
- Download/export.
- Fullscreen.
- Share.
- Subscribe.
- Column settings.
- View switch.
- Density switch.
- More actions.

Use icons with labels for primary actions, icons with tooltips for secondary actions, and a "More" menu for rare operations.

### Footer

Use lightly. Most dashboards do not need a heavy visual footer.

Good footer content:

- Data source.
- Latest update time.
-口径 version.
- Owner.
- Export watermark.
- Confidentiality note.

For long reports, prefer a compact metadata footer or side note. For meeting/PDF export, footer may include page number, confidentiality, and data date.

## Content Structure Patterns

Choose one structure based on the report goal. Do not mix too many.

## 8*N Rectangular Grid System

All report content areas must use an `8 * N` grid:

- The content canvas is divided into 8 equal columns and N rows.
- N is flexible and grows with page length.
- Every component must occupy one or more complete grid blocks.
- Every component's occupied area must be rectangular.
- For scrollable page templates such as single-page and left-nav analytics layouts, each resolved content block must be at least 220px tall. A one-row block therefore needs a resolved row height of at least 220px.
- If a scrollable page's resolved content grid height, including row gaps and vertical offsets, exceeds the 1080px design canvas, keep row/block heights and enable vertical scrolling instead of compressing blocks.
- Fixed sci-fi/big-screen cockpit layouts are exempt from the 220px rule because they must fit the fixed 1920x1080 canvas.
- Do not use masonry, staggered, diagonal, floating, or irregular component shapes.
- Do not let a component visually spill outside its assigned rectangle.
- Components may span 1-8 columns and multiple rows according to importance.
- Major sections may occupy full-width `8-column` rows.
- Dense work surfaces may use 2-column, 4-column, or mixed spans, but all spans must align to the 8-column grid.
- Drawers and modals are overlays and do not count as content-grid blocks, but the underlying page should remain grid-aligned.

Recommended spans:

- Hero summary or main chart: 8 columns.
- KPI strip: four cards at 2 columns each, or eight compact cards at 1 column each.
- Primary chart + side insight: 5+3 or 6+2 columns.
- Two balanced panels: 4+4 columns.
- Three panels: 3+3+2 or 2+3+3 columns, only when visual weight is still balanced.
- Table or task list: usually 8 columns.
- Secondary cards: 2 or 4 columns.

Use the grid to make the report feel ordered, not rigid. If a component is important, give it more blocks; if it is secondary, reduce its span or move it lower.

### Component Span Matrix

In an `8 * N` grid, component spans are written as `columns * rows`. Use only the following spans unless the user explicitly extends the matrix for a special component.

| Component type | Allowed spans |
| --- | --- |
| 折线图 / 柱状图 / K 线图 / 热力图 | `2*1`, `2*2`, `3*2`, `3*3`, `4*4`, `4*2`, `4*3` |
| 饼图 / 雷达图 / 路径图 / 旭日图 / 仪表盘 | `1*1`, `2*2`, `3*2`, `2*3`, `3*3`, `4*4` |
| 散点图 / 盒须图 / 平行坐标系 | `3*1`, `2*2`, `3*2`, `2*3`, `3*3`, `2*4`, `4*4`, `4*2`, `4*3`, `3*4` |
| 地图 / 关系图 / 树图 / 矩形树图 / 桑基图 / 漏斗图 | `2*2`, `3*2`, `3*3`, `4*3`, `4*4` |
| 指标卡 | `1*1`, `2*1` |
| 表格 | `3*2`, `4*2`, `5*2`, `3*3`, `4*3`, `5*3`, `6*3`, `7*3`, `8*3`, `4*4`, `5*4`, `6*4`, `7*4`, `8*4` |
| 说明 / 摘要 / 总结等文本说明组件 | `4*1`, `5*1`, `6*1`, `7*1`, `8*1`, `3*2` |
| 其他组件 | `2*1`, `2*2`, `3*2`, `3*3`, `4*4`, `4*2`, `4*3` |

Rules:

- Treat these spans as the legal placement set, not loose inspiration.
- Text explanation, abstract, and conclusion components must use `text-summary` as their runnable `visualType`; do not hide them under `other` unless they are not text-led.
- If a component's title, legend, axis labels, toolbars, or data density cannot fit in the chosen legal span, move to a larger legal span or switch component type.
- Do not shrink text, hide overflow, or let legends overlap to force an illegal or too-small span to work.
- For runnable templates, declare the component `visualType` in widget config so validation can check the actual `layoutRows` span.

### Block Internal Anatomy

Each `8 * N` content block must separate the frame from the component body:

- Block frame: unified card background, radius, shadow, safe padding, and optional block-level actions.
- Header/title area: fixed or content-aware height for title, subtitle, unit, status tag, and small actions.
- Component body area: the only viewport where charts, tables, KPI groups, text summaries, empty states, diagrams, and business components render.
- Optional footer area: source, pagination, note, or legend only when it has reserved height.

Hard rules:

- Default light card style is pure white `#FFFFFF`, 8px radius, 24px padding, `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05)`, and no hard outer border.
- Module title sits at the top-left as plain text: 16px, `font-weight: 600`, deep gray `#333333` in light theme. Do not put the title in a boxed mini-card.
- Use semantic color tokens consistently: actual/current uses brand primary, target/baseline uses neutral or pale brand tint, risk/negative uses one red family, healthy/positive uses one green family.
- Do not let a chart, icon, table, empty state, or business component render behind or across the title/header area.
- Do not style a block title as a boxed nested card by default. Prefer plain text, subtle divider, underline, or small accent mark unless the product design system explicitly requires a title box.
- The component body background must fill the full body rectangle up to the body edge. Do not create a smaller inner background that leaves a white or unrelated-color moat between the body edge and the safe content line.
- Do not draw a default border around the component body. The block frame may define the outer boundary; the body should rely on background, spacing, and clipping rather than an extra nested border line.
- The body viewport must have explicit `min-width: 0`, `min-height: 0`, and a defined overflow strategy.
- A component viewport layer must sit inside the body viewport and carry the component-area background/clipping. The rendered chart/table/card must fit this viewport, not the full block and not the page.
- ECharts and AntV S2 instances must mount and resize against the body viewport, not the whole card frame.
- Tables must either fit their visible columns and full cell content inside the body viewport or scroll horizontally inside the body viewport. Do not use ellipsis as the primary way to hide undisplayed table content; when content cannot fit, use content-aware column widths, wrapping, table-level horizontal scroll, and sticky/frozen key columns. Tables must never expand the grid block or rely on page-level horizontal overflow.
- If the header needs two lines, more actions, or a status explanation, increase the row span or move secondary text into a tooltip/drawer.
- Empty/loading/no-permission states must be centered inside the body viewport and must not replace the title area.
- For complex diagrams, the body viewport is the visible pan/zoom window; the diagram's logical size may exceed it, but the block rectangle must not expand.

## Viewport And Overflow Rules

Design the page so the report never appears visually cut off by the browser viewport, sidebar, or grid container.

Layout rules:

- The outer shell should separate sidebar and main content with a stable grid or flex layout.
- The main content area must use `min-width: 0` behavior in implementation so wide children do not push it outside the viewport.
- The report canvas should scroll vertically as a whole unless a component explicitly owns its internal scroll.
- Avoid page-level horizontal overflow. Only true wide tables, timelines, and complex diagrams may scroll or pan inside their own component viewport.
- When a right-side column is narrow, use wrapping, smaller spans, or move content to a wider row; do not let text continue beyond the visible area.
- Do not use fixed page heights for sections that contain dynamic text, KPI cards, legends, or multiline labels.
- In scrollable page templates, each grid row must resolve to at least 220px and still fit the component's title, controls, content, and safe padding.
- When `N * rowHeight + gaps + vertical offsets` is greater than 1080px in a scrollable page template, the page or content region must scroll vertically; do not shrink rows below 220px to force everything into the first viewport.
- If a component needs more content than its block can show, choose one strategy explicitly: increase its grid span, add internal scroll, add expand/fullscreen, or move details to drawer.

Common fixes for clipping and overlap:

- Hero or summary blocks with multiple cards should use a nested grid that can wrap into additional rows.
- Text-heavy insight cards should receive wider spans or line clamp plus "view more" drawer.
- Bar/list components should reserve separate columns for label, bar, and value so values do not overlap bars or get clipped.
- Right-side diagnostic cards should not use tiny fixed heights; they should either grow to fit or clamp secondary text.
- Evidence tables and detail lists should use sticky headers and internal scroll when the assigned block is intentionally limited.

Visual QA:

- Test at the target dashboard width, a narrower laptop width, and fullscreen.
- Check the right edge of every component for clipping.
- Check the bottom edge of every component for hidden rows, hidden labels, or cut-off cards.
- Check that no component visually crosses into another component's rectangle.
- For scrollable page templates, check that no content block resolves below 220px tall, and that pages exceeding 1080px expose vertical scrolling.

### 1. 总分总: Executive Narrative

Use for status overview, review recap, performance evaluation, and leadership-facing pages.

Structure:

- Top conclusion or health summary.
- Core KPIs or key facts.
- Breakdown sections by metric, dimension, trend, risk, or action.
- Bottom conclusion, priority risks, or next actions.

Best when the report must quickly tell "overall judgment -> evidence -> management action".

### 2. 总分: Overview To Breakdown

Use for status overview, anomaly monitoring, performance evaluation, and broad dashboards.

Structure:

- Overall status cards.
- Key chart or distribution.
- Breakdown by organization, metric, type, or object.
- Drilldown/drawer for detail.

Best when users first need the big picture, then locate objects.

### 3. 分总: Evidence To Conclusion

Use sparingly for analysis-heavy or audit-like pages where users need evidence before accepting a conclusion.

Structure:

- Problem/evidence sections.
- Decomposition or comparison.
- Detail validation.
- Final conclusion.

Best for analysis diagnosis and reconciliation when the conclusion depends on proof.

### 4. 问题 -> 拆解 -> 证据 -> 结论

Use for analysis diagnostic pages.

Structure:

- Problem definition.
- Driver decomposition.
- Dimension/process drilldown.
- Evidence drawer or detail list.
- Diagnostic conclusion and action entry.

Use waterfall, decomposition tree, Top N, comparison table, and evidence drawer.

### 5. 筛选 -> 汇总 -> 表格 -> 抽屉

Use for detail query and reconciliation detail pages.

Structure:

- Filter bar and keyword search.
- Small result summary.
- Dense table/list.
- Row detail drawer.
- Export and source jumps.

This is the best pattern for "find records quickly".

### 6. 告警 -> 定位 -> 处理

Use for anomaly monitoring.

Structure:

- Alert pressure cards.
- Severity and distribution.
- Trend/recurrence.
- Alert list.
- Handling drawer and batch actions.

Keep high-risk items visually dominant and actionable.

### 7. 目标 -> 任务 -> 进度 -> 风险 -> 闭环

Use for operational execution.

Structure:

- Execution overview.
- Key tasks.
- Kanban/table/Gantt view.
- Risk and blocker list.
- Task drawer.
- Result verification.

The task row/card is the primary object.

### 8. 摘要 -> 章节 -> 证据 -> 行动

Use for review recap and meeting materials.

Structure:

- Executive conclusion.
- Chapter navigation.
- Stage results.
- Key changes and causes.
- Issues/risks.
- Action plan.
- Export/presentation mode.

Make it read well in meetings and export cleanly to PDF/PPT.

## Visual Style Presets

Use one of these presets. They are visual directions, not rigid templates.

### A. Clean Management Dashboard

Best for 状态总览型, 绩效评估型, 汇报复盘型.

Style:

- Light background.
- White content panels with subtle border.
- Top KPI strip.
- One large main chart or matrix per section.
- Clear section titles and short insight text.
- Moderate whitespace.

Feeling: calm, executive, high-trust.

### B. Analytical Workspace

Best for 分析诊断型 and 核对追溯型.

Style:

- Dense but organized layout.
- Left or top problem context.
- Central decomposition/comparison area.
- Right drawer for evidence.
- Tables and charts balanced.
- Clear formulas,口径, and source notes.

Feeling: rigorous, traceable, investigative.

### C. Data Operations Table

Best for 明细查询型, 核对追溯型, 异常清单.

Style:

- Filters and search first.
- Compact result summary.
- Sticky table header.
- Frozen key columns.
- Status tags and conditional highlights.
- Column settings, density switch, export.

Feeling: efficient, precise, work-focused.

### D. Monitoring Command Center

Best for 异常监控型.

Style:

- Alert summary cards.
- Strong but controlled semantic colors.
- Severity lanes or grouped list.
- Heatmap/matrix for distribution.
- Alert drawer with handling actions.
- SLA timers and escalation labels.

Feeling: urgent, prioritized, controllable.

### E. Execution Workbench

Best for 运营执行型.

Style:

- Task cards, task table, or Kanban lanes.
- Clear owner, deadline, status, priority.
- Sticky operation bar.
- Task drawer with updates and evidence.
- Progress and blocker emphasis.

Feeling: action-oriented, accountable, closed-loop.

### F. Meeting Recap Page

Best for 汇报复盘型.

Style:

- Conclusion-first layout.
- Chapter navigation.
- Narrative section cards or full-width bands.
- Chart annotations.
- Action-plan table.
- Presentation mode and export controls.

Feeling: polished, readable, boardroom-ready.

## Component Rules

For implementation, use ECharts for standard dashboard charts and AntV S2 for analytical tables, pivot tables, cross tables, and dense metric matrices. Layout must provide clear container dimensions, `min-width: 0` behavior, and resize-safe blocks for both libraries.

### Logo

Use the bundled Haier logo:

- `assets/haier-logo-original.svg` on light backgrounds.
- `assets/haier-logo-white.svg` on dark backgrounds.

Use logo in:

- Global app bar.
- Report header when there is no global app bar.
- Exported PDF/PPT cover or footer.
- Shared/public report header when brand context is needed.

Avoid large repeated logos inside report content. Preserve logo aspect ratio and keep it visually secondary to the report title.

### Title

Use a strong report title plus a short subtitle or decision question.

Example:

- 标题: 月度经营总览
- 副标题: 判断集团本月目标达成、主要偏差与重点风险

### Filters

Always include filters when scope changes the meaning of data. Keep high-frequency filters visible and advanced filters collapsed.

### Refresh

Include refresh when data can update during use. Show latest update time and sync status.

### Download/Export

Include export when users need offline analysis, meeting material, audit evidence, or sharing. Export should respect permissions and current filters.

### Fullscreen

Include fullscreen for dashboards, monitoring pages, meeting screens, and large charts/tables. Hide non-essential chrome in fullscreen.

### Share/Subscribe

Include when users collaborate, receive alerts, or return to saved report states.

### Settings

Use for column configuration, metric display, density, chart/table switch, benchmark, and口径 view. Put destructive or rare actions in overflow.

## Layout Density And Spacing

Use three density modes:

- Comfortable: leadership overview and recap pages.
- Standard: default for most report pages.
- Compact: dense tables, monitoring, execution, and reconciliation.

Guidelines:

- Align all content to the `8 * N` rectangular grid.
- Use 8px spacing rhythm.
- Use 8px or smaller card radius unless the product design system says otherwise.
- Use a light unified card shadow over hard borders: default `0 2px 10px rgba(0, 0, 0, 0.05)`.
- Keep card nesting shallow; avoid cards inside cards.
- Use full-width bands or section blocks for major content groups.
- Keep important numbers aligned and easy to compare.
- Use sticky filters/table headers for long working pages.
- Do not create irregular empty holes inside the grid; each component should occupy a clear rectangle.

## Color And Status

Use a neutral base and semantic accents:

- Red: urgent risk, failure, severe anomaly.
- Orange: warning, approaching deadline, medium risk.
- Yellow: watch/attention.
- Green: achieved, healthy, closed.
- Blue: selected, primary action, neutral info.
- Gray: disabled, closed, low priority, metadata.

Do not use color as the only signal. Pair color with label, icon, text, or pattern.

Avoid a one-note palette dominated by one hue. Enterprise report pages should feel crisp and trustworthy, not decorative.

## Typography And Number Display

Use:

- Clear title hierarchy.
- Compact labels.
- Large numbers only for top-level KPIs.
- Monospaced or tabular numerals when comparing many numbers.
- Units near values, not hidden in footnotes.
- Positive/negative signs and direction icons consistently.
- Percentages and amounts with consistent precision.

Avoid oversized hero typography inside dense dashboards.

## Drawer, Popover, Modal

Use:

- Popover for definitions,口径, formulas, status reasons, data source, and small explanations.
- Drawer for record details, evidence, decomposition, task processing, anomaly handling, or source trace.
- Modal only for focused confirmations or short forms.
- Full detail page when the object has many modules or long workflows.

Prefer right drawers for report work because they preserve context.

## Empty, Loading, Error States

Design states explicitly:

- Empty: say what condition produced no data and how to adjust filters.
- Loading: keep skeleton layout stable.
- Error: show failure reason, retry, data source, and support path.
- No permission: explain scope and request path.
- Data delayed: show latest successful refresh and expected update time.

Never let an important report fail silently.

## Mobile And Responsive Rules

Complex reports are desktop-first, but mobile should support reading and lightweight action.

Mobile adaptation:

- Collapse sidebar into menu.
- Stack KPI cards.
- Turn table into key-field list or card list when necessary.
- Keep filters in bottom sheet or collapsible panel.
- Preserve primary actions: refresh, filter, export/share, row detail, task update.
- Avoid wide charts that require horizontal scrolling unless table-like data demands it.

## Report-Type Mapping

Use this mapping when combining with the 8 report-type skills:

- 状态总览型: Clean Management Dashboard, 总分 or 总分总.
- 分析诊断型: Analytical Workspace, 问题 -> 拆解 -> 证据 -> 结论.
- 明细查询型: Data Operations Table, 筛选 -> 汇总 -> 表格 -> 抽屉.
- 绩效评估型: Clean Management Dashboard plus scorecards, 目标 -> 排名 -> 差距 -> 改进.
- 汇报复盘型: Meeting Recap Page, 摘要 -> 章节 -> 证据 -> 行动.
- 异常监控型: Monitoring Command Center, 告警 -> 定位 -> 处理.
- 运营执行型: Execution Workbench, 目标 -> 任务 -> 进度 -> 风险 -> 闭环.
- 核对追溯型: Analytical Workspace or Data Operations Table, 核对结果 -> 差异定位 -> 来源追溯 -> 处理闭环.

## Output Format

When asked to design a report's visual layout, use this structure:

1. 页面定位: report type, user, core question, usage scenario.
2. 页面外壳: whether to use logo, app bar, sidebar, breadcrumbs, tabs, header, filter bar, toolbar, footer.
3. Logo 使用: use original Haier logo on light backgrounds and white Haier logo on dark backgrounds.
4. 内容结构: choose 总分总, 总分, 分总, 明细优先, 告警处理, 任务闭环, or 叙事章节.
5. 栅格方案: describe the `8 * N` rectangular grid and each major component's column span.
6. 视觉样式: choose one style preset and explain spacing, color, typography, density, card/table treatment.
7. 关键组件: title, KPI cards, charts, tables, drawers, popovers, actions, export/fullscreen/refresh.
8. 交互与状态: filters, drilldown, drawer, loading, empty, no-permission, error, responsive behavior.
9. 适配建议: desktop, fullscreen, meeting, export/PDF/PPT, mobile reading.
10. 设计校验: whether first viewport reaches the core, whether actions are visible, whether visual noise is controlled.

## Quality Checklist

Before finalizing, verify:

- The first viewport reaches the report's core question.
- The bundled Haier logo is used correctly: original color on light backgrounds, white on dark backgrounds.
- The content area uses an `8 * N` rectangular grid.
- Every component occupies complete rectangular grid blocks.
- Navigation and menus are present only when they help orientation.
- Header includes title, scope, data status, and primary actions.
- Filters are easy to find and active conditions are visible.
- Filter changes have visible, layout-safe effects across dependent cards, charts, tables, drawers, and export/fullscreen states.
- Toolbar actions are grouped by frequency and importance.
- Content structure matches the report goal.
- Tables, charts, cards, and drawers each have a clear job.
- Visual style is modern, restrained, readable, and not decorative.
- Semantic colors are consistent and not overused.
- Export/fullscreen/refresh behavior is defined when relevant.
- Export/fullscreen/refresh uses the same active filter scope as the visible page.
- Empty, loading, error, delayed-data, and no-permission states are handled.

## Avoid

- Do not add a sidebar, nav, footer, or logo just to fill space.
- Do not use any logo other than the bundled Haier logo assets.
- Do not use the original blue logo on dark backgrounds or the white logo on light backgrounds.
- Do not use masonry, staggered, irregular, diagonal, or non-rectangular component layouts.
- Do not create a marketing-style hero for operational reports.
- Do not bury filters or primary actions.
- Do not use many unrelated cards and charts with no visual hierarchy.
- Do not rely on color alone for status.
- Do not use heavy gradients, oversized decoration, or big shadows.
- Do not make every report look like a dark monitoring wall unless the use case requires it.
- Do not optimize for prettiness at the cost of scanning, comparison, and action.
