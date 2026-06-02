# Output And Checklist

## 1. Output Format

When asked to design a report visual layout, use this structure:

1. 页面定位: report type, user, core question, usage scenario, custom shell or template-based.
2. 页面路径、样式来源、品牌模式与视觉模式: declare `pageShellPath`, `pageStyleSource`, exactly one `brandMode`, and exactly one `visualMode`; when custom, declare `customDesignPath` and exactly one `customLayoutPattern`.
3. 页面外壳: unified title/navigation/filter control area, logo placement, actions, and template mapping if applicable.
4. 品牌风格: Haier logo asset discovery result, logo variant or placeholder, Haier blue/white palette, typography, spacing, density, surfaces.
5. 内容结构: summary, breakdown, evidence, detail, action, or another report-appropriate flow.
6. 栅格方案: `8 * N` grid, component spans, row height/scroll strategy, chart/table/container/complex-diagram safety.
7. 关键组件: KPI cards, charts, tables, text summaries, drawers/popovers, toolbar actions.
8. 模板路由: chosen template and config files to adjust.
9. 交互与状态: filters, drilldown, drawer/modal, refresh/export/fullscreen, empty/loading/error/no-permission, responsive behavior.
10. 设计校验: first-viewport value, sample fidelity when applicable, brand correctness, grid correctness, visual restraint, no clipping/overlap.

## 2. Quality Checklist

Before finalizing, verify:

- The entry mode is clear: custom report page or template-based page.
- `pageShellPath` is declared as `template` or `custom`.
- `pageStyleSource` is declared. If no page style and no HTML/source/sample styling is provided, `pageShellPath: template` and a bundled template are selected by default.
- `brandMode` is declared as `haierBranded`, `sampleNative`, or `neutral`; logo and global-token implications are explicit.
- User-specified design style or provided sample/HTML source is followed unless it violates hard gates or the user asks for optimization.
- Exactly one `visualMode` is declared before implementation.
- If `pageShellPath: custom`, exactly one `customDesignPath` is declared: `htmlReplica` or `freeDesign`.
- Custom page shells declare exactly one `customLayoutPattern`: `symmetricBalance`, `threePart`, `masterDetail`, or `narrativeStack`.
- Custom `htmlReplica` and `freeDesign` pages with `brandMode: haierBranded` use a real bundled Haier logo in the header, unified title/control area, or sidebar brand area; placeholder does not pass final acceptance.
- `sampleRestore` preserves the source page shell, module order, container hierarchy, main control count, layer structure, and card proportions unless the user explicitly asks for redesign.
- Any added filter, summary card, detail table, matrix, drawer, or jump in `sampleRestore` is labeled as an enhancement and does not change the first viewport or main body layout.
- Any added conclusion, insight, or status summary in `sampleRestore` is embedded into an existing sample-equivalent region; a new standalone horizontal band fails unless the source has an equivalent band.
- HTML-replica and custom layouts use global UI tokens for palette, typography, spacing, radius, semantic colors, shadows, and control states unless exact color restoration is explicitly requested.
- Custom pages use one coherent title/navigation/filter control area when possible, instead of mechanically splitting three independent strips.
- Template-based pages follow the selected template's shell, logo slot, navigation, filter pattern, and grid mechanics.
- If a template is used, the chosen template is justified: single-page, left-nav, or sci-fi.
- Template adjustment points are named: `dashboard.config.ts`, `dashboard.data.ts`, `dataSources/registry.ts`, widget files, registry/types, actions, styles, and assets as relevant.
- The first viewport reaches the report's core question.
- Logo asset discovery has been completed before implementation.
- The Haier logo is present in the custom-page title/control area or the template logo slot.
- Logo variant is correct: original color on light backgrounds, white on dark backgrounds.
- If logo assets are missing, a visible placeholder remains in the logo slot and the missing asset is listed as a gap.
- The page uses Haier blue and white as the main palette.
- Red/orange/yellow/green colors are used only for semantic status and are not overused.
- Rate/change fields use `%` in visible Chinese UI, not `pt`, `p.p.`, or `percentage point` labels unless explicitly requested.
- Change-rate and variance-rate indicators use positive-red-up / negative-green-down icon semantics.
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
- Element Plus controls are used for filters, form fields, buttons, tabs, tags, popovers, dialogs, drawers, pagination, and simple tables unless a project design system explicitly supersedes them.
- Template validation and build commands are planned or run when code is changed.
- The right edge and bottom edge of every component are checked for clipping.
- No component crosses into another component's rectangle.
- Flow, Sankey, graph, tree, decomposition, and lineage visuals keep layer numbers, labels, nodes, and edges at least 16px apart and reserve rail, node, label, and edge-bend space.
- Main filter controls are Element Plus or project design-system select/dropdown/date/cascader controls, or a styled native select that declares baseline-only acceptance.
- Advanced visual acceptance for option menus uses a custom popover select, not the operating system's native dropdown menu.
- Screenshot evidence covers the logo/header area, filter controls, complex diagrams when present, and sample-restoration first viewport when applicable.
- Empty, loading, error, delayed-data, and no-permission states are handled.

## 3. Avoid

- Do not treat custom pages and template-based pages as the same layout problem.
- Do not choose a custom shell merely because the user did not specify page style.
- Do not mark a custom page complete with only a logo placeholder.
- Do not redesign a selected template's shell unless the task explicitly asks for template-level changes.
- Do not choose a template without explaining why it fits the report scope and usage scenario.
- Do not force title, navigation, and filters into three separate areas when a unified control area is cleaner.
- Do not omit the Haier logo from a `brandMode: haierBranded` custom page's title/control area or a template's logo slot.
- Do not omit the `brandMode` decision when a sample or custom shell might conflict with Haier branding.
- Do not silently remove the logo slot when the logo asset is missing.
- Do not use the original blue logo on dark backgrounds or the white logo on light backgrounds.
- Do not introduce many accent colors that compete with Haier blue and white.
- Do not let copied HTML inline colors or one-off custom styles override the selected global UI token system.
- Do not add a sidebar, nav, footer, or logo just to fill space.
- Do not make navigation visually dominant when compact tabs, breadcrumbs, segmented controls, or drawer navigation are enough.
- Do not expose a large permanent filter region when a filter trigger, popover, drawer, or bottom sheet can carry the task.
- Do not use naked native `<select>` controls as the final visual surface for primary filters.
- Do not use masonry, staggered, irregular, diagonal, or non-rectangular component layouts.
- Do not create a marketing-style hero for operational reports.
- Do not bury filters or primary actions.
- Do not use many unrelated cards and charts with no visual hierarchy.
- Do not rely on color alone for status.
- Do not show positive change rates with green/down styling or negative change rates with red/up styling.
- Do not use heavy gradients, oversized decoration, or big shadows.
- Do not make every report look like a dark monitoring wall unless the use case requires it.
- Do not optimize for prettiness at the cost of scanning, comparison, and action.
