# Output And Checklist

## 1. Output Format

When asked to design a report visual layout, use this structure:

1. 页面定位: report type, user, core question, usage scenario, blank-page or template-based.
2. 页面外壳: unified title/navigation/filter control area, logo placement, actions, and template mapping if applicable.
3. 品牌风格: Haier logo variant, Haier blue/white palette, typography, spacing, density, surfaces.
4. 内容结构: summary, breakdown, evidence, detail, action, or another report-appropriate flow.
5. 栅格方案: `8 * N` grid, component spans, row height/scroll strategy, chart/table container safety.
6. 关键组件: KPI cards, charts, tables, text summaries, drawers/popovers, toolbar actions.
7. 模板路由: chosen template and config files to adjust.
8. 交互与状态: filters, drilldown, drawer/modal, refresh/export/fullscreen, empty/loading/error/no-permission, responsive behavior.
9. 设计校验: first-viewport value, brand correctness, grid correctness, visual restraint, no clipping/overlap.

## 2. Quality Checklist

Before finalizing, verify:

- The entry mode is clear: blank report page or template-based page.
- Blank pages use one coherent title/navigation/filter control area when possible, instead of mechanically splitting three independent strips.
- Template-based pages follow the selected template's shell, logo slot, navigation, filter pattern, and grid mechanics.
- If a template is used, the chosen template is justified: single-page, left-nav, or sci-fi.
- Template adjustment points are named: `dashboard.config.ts`, `dashboard.data.ts`, `dataSources/registry.ts`, widget files, registry/types, actions, styles, and assets as relevant.
- The first viewport reaches the report's core question.
- The Haier logo is present in the blank-page title/control area or the template logo slot.
- Logo variant is correct: original color on light backgrounds, white on dark backgrounds.
- The page uses Haier blue and white as the main palette.
- Red/orange/yellow/green colors are used only for semantic status and are not overused.
- Redundant information, decorative elements, and visual noise are removed.
- The content area uses an `8 * N` rectangular grid.
- Every component occupies complete rectangular grid blocks.
- Every chosen block span has been checked against `1920 * 1080` or `1280 * 768` practical viewport constraints.
- `1920 * 1080` and `1280 * 768` are not treated as total report height limits.
- If one grid block contains multiple subcomponents, it has one clear block-level business title and the internal subcomponents remain visually subordinate.
- Blocks with 2/4/6/8 internal subcomponents obey the component count limits and are split, tabbed, or moved to drawers when too dense.
- Scrollable report pages keep usable row/block heights and support vertical scrolling when content exceeds the first viewport.
- Navigation is present only when it helps orientation and remains low-intrusion.
- Filters are easy to invoke and active conditions are visible.
- Filter changes have visible, layout-safe effects across cards, charts, tables, drawers, and export/fullscreen states.
- Toolbar actions are grouped by frequency and importance.
- Tables, charts, cards, and drawers each have a clear job.
- ECharts and AntV S2 containers have stable dimensions and resize against the body viewport.
- Template validation and build commands are planned or run when code is changed.
- The right edge and bottom edge of every component are checked for clipping.
- No component crosses into another component's rectangle.
- Empty, loading, error, delayed-data, and no-permission states are handled.

## 3. Avoid

- Do not treat blank pages and template-based pages as the same layout problem.
- Do not redesign a selected template's shell unless the task explicitly asks for template-level changes.
- Do not choose a template without explaining why it fits the report scope and usage scenario.
- Do not force title, navigation, and filters into three separate areas when a unified control area is cleaner.
- Do not omit the Haier logo from a blank page's title/control area or a template's logo slot.
- Do not use the original blue logo on dark backgrounds or the white logo on light backgrounds.
- Do not introduce many accent colors that compete with Haier blue and white.
- Do not add a sidebar, nav, footer, or logo just to fill space.
- Do not make navigation visually dominant when compact tabs, breadcrumbs, segmented controls, or drawer navigation are enough.
- Do not expose a large permanent filter region when a filter trigger, popover, drawer, or bottom sheet can carry the task.
- Do not use masonry, staggered, irregular, diagonal, or non-rectangular component layouts.
- Do not create a marketing-style hero for operational reports.
- Do not bury filters or primary actions.
- Do not use many unrelated cards and charts with no visual hierarchy.
- Do not rely on color alone for status.
- Do not use heavy gradients, oversized decoration, or big shadows.
- Do not make every report look like a dark monitoring wall unless the use case requires it.
- Do not optimize for prettiness at the cost of scanning, comparison, and action.
