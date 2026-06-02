---
name: report-component-style-design
description: "Design, critique, or refine visual style and responsive behavior of business report components across dashboards and pages. Use when deciding how Element Plus filters/forms/buttons/tabs/tags/popovers/dialogs/drawers, text summaries, KPI cards, ECharts charts, AntV S2 analytical tables, legends, labels, titles, task cards, anomaly cards, comparison panels, decomposition diagrams, DuPont charts, trees, funnels, flows, component-level switches, segmented controls, dropdown selects, and compact control bars should look, align, resize, avoid overlap, preserve readability, support zoom/pan, animate, show hover values, and stay visually consistent."
---

# Report Component Style Design

## Core Positioning

Use this skill to design, critique, or repair the visual style and responsive behavior of business report components. It covers Element Plus filters/forms/buttons/tabs/tags/popovers/dialogs/drawers, summaries, KPI cards, ECharts charts, AntV S2 analytical tables, cards/lists/tasks, complex diagrams, and in-component controls.

Keep `SKILL.md` as the routing and quality gate. Load detailed references only for the component types actually present in the task.

## Reference Library

Start with `references/00-component-reference-index.md`, then load only the matching component references:

| Need | Read |
| --- | --- |
| Shared layout, typography, overflow, labels, hover disclosure, empty/loading/error states | `references/01-shared-foundation.md` |
| Filter bars, chips, query controls, advanced filters | `references/02-filter-controls.md` |
| Text summaries, insight blocks, conclusion cards | `references/03-text-summary.md` |
| KPI cards, metric groups, comparison tiles, mini trends | `references/04-kpi-metric-cards.md` |
| ECharts axes, legends, labels, tooltips, chart density | `references/05-echarts-charts.md` |
| AntV S2 tables, analytical grids, wide metric matrices | `references/06-analytical-tables.md` |
| Cards, lists, tasks, anomaly/status blocks | `references/07-cards-lists-tasks.md` |
| Drawers, modals, evidence/detail panels | `references/08-drawers-detail-panels.md` |
| Trees, Sankey, attribution, DuPont, flows, complex diagrams | `references/09-complex-diagrams.md` |
| Capsule switches, segmented controls, dropdowns inside components | `references/10-in-component-controls.md` |
| Legacy detailed rules not yet covered by focused references | `references/11-detailed-style-rules.md` |
| Cross-stage design reasonableness when component style choices affect business comprehension, density, exact values, or interaction closure | `references/standalone-quality-gates.md#design-reasonableness-gate` |

## Workflow

1. Identify every component type, its data density, viewport size, interaction needs, and business priority.
2. Load `references/00-component-reference-index.md` plus the smallest matching reference set.
3. Reserve stable component dimensions before styling: header, actions, legend, body viewport, footer, pagination, and state messages.
4. Apply shared fit rules first, then component-specific rules. If rules conflict, use the stricter no-overlap/no-truncation/no-hidden-critical-data rule.
5. Run design reasonableness checks when a component choice may weaken the business answer, hide exact values, duplicate another component, overload the container, or block the next action.
6. Define overflow and exact-value disclosure: tooltip, drawer, fullscreen, zoom/pan, scroll, table fallback, or label sampling.
7. Specify visual tokens: typography, color semantics, borders, shadows, spacing, states, hover/focus, and responsive behavior.
8. Verify the component inside its real container after filters, tab switches, data updates, drawer/fullscreen changes, and window resize.

## Hard Constraints

- Do not style a component until its business purpose, data grain, key fields, filter scope, and interaction state are known.
- Do not accept a polished component that is unreasonable for the task. Use `DESIGN-*` findings when a chart should be a table, a dense component needs drilldown/fullscreen, a component duplicates another message, or the style hides the user's decision-critical value.
- Do not hide decision-critical labels, units, warnings, or values without a hover/focus/click disclosure path.
- Do not let ECharts, S2, SVG, canvas, or custom diagrams mount into a zero-size or unstable container.
- Do not solve density by shrinking text below readable sizes; use sampling, scrolling, zoom/pan, drawer, fullscreen, split components, or table fallback.
- Do not create one-off component styles that conflict with the page shell, Haier branding, or existing design system.
- Text summaries, conclusions, and insight blocks must inherit the surrounding page shell tokens for surface, spacing, typography, radius, and semantic colors. Do not introduce a new standalone visual surface, grid rhythm, or density that conflicts with adjacent sections.
- In `sampleRestore`, added conclusions must sit inside an existing sample-equivalent region and reuse its spacing, border, typography, and surface tokens; a new standalone horizontal band fails style QA unless the sample already has one.
- Rate/change indicators in Chinese report UI display `%`, not `pt`, `p.p.`, or `percentage point`, unless the user explicitly requests that term.
- Change-rate and variance-rate indicators use positive-red-up / negative-green-down semantics with icon+text pairing: positive value = red text plus upward SVG/icon; negative value = green text plus downward SVG/icon; zero = neutral.
- Do not use naked native `<select>` controls as the final visual surface for primary filters.
- Do not hand-roll Vue controls that Element Plus already provides unless the existing project design system explicitly supersedes Element Plus or the interaction is unsupported.
- Do not accept flow, Sankey, graph, tree, decomposition, lineage, DuPont, or process-chain diagrams until rail, node, label, gutter, and edge-bend spacing has been calculated.

## Output Format

When using this skill, provide:

1. Component inventory and loaded reference files.
2. Viewport and size assumptions for each component.
3. Style decisions: typography, spacing, color, border/shadow, state, and interaction feedback.
4. Fit decisions: label density, overflow, exact-value disclosure, scroll/zoom/fullscreen/drawer/table fallback.
5. Design reasonableness status and any `DESIGN-*` findings that affected component choice or fit.
6. Implementation notes for ECharts/S2/DOM/CSS behavior where relevant.
7. Self-check result: overlap, clipping, truncation, contrast, resize, hover/focus/touch, loading/empty/error states.

## Quality Checklist

- Each component has a stable body viewport and explicit overflow policy.
- Component choice is reasonable for the business task and data shape; unresolved `P0`/`P1` `DESIGN-*` findings are not styled over.
- Titles, units, labels, legends, controls, pagination, and states fit without overlapping data marks.
- Hidden or abbreviated values are inspectable.
- Dense charts use label budgets and tooltips; dense tables use S2 or horizontal scroll.
- Complex diagrams use zoom/pan, minimap, drawer, or fullscreen instead of overflowing.
- Complex diagrams keep layer numbers, labels, nodes, and edges at least 16px apart and reserve rail/edge-bend space.
- Primary filters use Element Plus or project design-system select/dropdown/date/cascader controls, or a fully styled native select only for baseline prototype acceptance.
- Controls inside components have clear selected/hover/disabled/loading states and do not resize the block.
- Text summaries and conclusions inherit the surrounding layout tokens and do not look like unrelated inserted bands.
- Change-rate indicators pass positive-red-up / negative-green-down semantics and use `%` in Chinese UI.
- Loading, empty, error, no-permission, and stale states preserve geometry.
- Runtime resize or visual verification is performed when the component is implemented.

## Avoid

- Do not duplicate detailed reference rules in final answers; cite the loaded references and apply their decisions.
- Do not use decorative cards, gradients, or visual noise when the component's job is analytical scanning.
- Do not hide required table columns, action text, KPI values, or alert labels merely to make the layout look cleaner.
- Do not use a chart when the exact-value task requires a table or detail list.
