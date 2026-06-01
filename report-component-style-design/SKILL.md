---
name: report-component-style-design
description: "Design, critique, or refine visual style and responsive behavior of business report components across dashboards and pages. Use when deciding how filters, text summaries, KPI cards, ECharts charts, AntV S2 analytical tables, legends, labels, titles, drawers, task cards, anomaly cards, comparison panels, decomposition diagrams, DuPont charts, trees, funnels, flows, component-level switches, segmented controls, dropdown selects, and compact control bars should look, align, resize, avoid overlap, preserve readability, support zoom/pan, animate, show hover values, and stay visually consistent."
---

# Report Component Style Design

## Core Positioning

Use this skill to design, critique, or repair the visual style and responsive behavior of business report components. It covers filters, summaries, KPI cards, ECharts charts, AntV S2 analytical tables, cards/lists/tasks, drawers, complex diagrams, and in-component controls.

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

## Workflow

1. Identify every component type, its data density, viewport size, interaction needs, and business priority.
2. Load `00-component-reference-index.md` plus the smallest matching reference set.
3. Reserve stable component dimensions before styling: header, actions, legend, body viewport, footer, pagination, and state messages.
4. Apply shared fit rules first, then component-specific rules. If rules conflict, use the stricter no-overlap/no-truncation/no-hidden-critical-data rule.
5. Define overflow and exact-value disclosure: tooltip, drawer, fullscreen, zoom/pan, scroll, table fallback, or label sampling.
6. Specify visual tokens: typography, color semantics, borders, shadows, spacing, states, hover/focus, and responsive behavior.
7. Verify the component inside its real container after filters, tab switches, data updates, drawer/fullscreen changes, and window resize.

## Hard Constraints

- Do not style a component until its business purpose, data grain, key fields, filter scope, and interaction state are known.
- Do not hide decision-critical labels, units, warnings, or values without a hover/focus/click disclosure path.
- Do not let ECharts, S2, SVG, canvas, or custom diagrams mount into a zero-size or unstable container.
- Do not solve density by shrinking text below readable sizes; use sampling, scrolling, zoom/pan, drawer, fullscreen, split components, or table fallback.
- Do not create one-off component styles that conflict with the page shell, Haier branding, or existing design system.
- Do not use naked native `<select>` controls as the final visual surface for primary filters.
- Do not accept flow, Sankey, graph, tree, decomposition, lineage, DuPont, or process-chain diagrams until rail, node, label, gutter, and edge-bend spacing has been calculated.

## Output Format

When using this skill, provide:

1. Component inventory and loaded reference files.
2. Viewport and size assumptions for each component.
3. Style decisions: typography, spacing, color, border/shadow, state, and interaction feedback.
4. Fit decisions: label density, overflow, exact-value disclosure, scroll/zoom/fullscreen/drawer/table fallback.
5. Implementation notes for ECharts/S2/DOM/CSS behavior where relevant.
6. Self-check result: overlap, clipping, truncation, contrast, resize, hover/focus/touch, loading/empty/error states.

## Quality Checklist

- Each component has a stable body viewport and explicit overflow policy.
- Titles, units, labels, legends, controls, pagination, and states fit without overlapping data marks.
- Hidden or abbreviated values are inspectable.
- Dense charts use label budgets and tooltips; dense tables use S2 or horizontal scroll.
- Complex diagrams use zoom/pan, minimap, drawer, or fullscreen instead of overflowing.
- Complex diagrams keep layer numbers, labels, nodes, and edges at least 16px apart and reserve rail/edge-bend space.
- Primary filters use design-system/custom select/dropdown controls, or a fully styled native select only for baseline prototype acceptance.
- Controls inside components have clear selected/hover/disabled/loading states and do not resize the block.
- Loading, empty, error, no-permission, and stale states preserve geometry.
- Runtime resize or visual verification is performed when the component is implemented.

## Avoid

- Do not duplicate detailed reference rules in final answers; cite the loaded references and apply their decisions.
- Do not use decorative cards, gradients, or visual noise when the component's job is analytical scanning.
- Do not hide required table columns, action text, KPI values, or alert labels merely to make the layout look cleaner.
- Do not use a chart when the exact-value task requires a table or detail list.

## Execution Completeness Gate

Before finalizing work with this skill, verify the following items explicitly:

1. Scope and trigger reliability: confirm the request truly matches this skill. General report-design skills must stay independent of workflow function words such as `原型设计`, `技术方案`, `前端开发`, `后端开发`, or `测试`; workflow-specific skills may use those words only when they are part of the actual phase intent.
2. Input condition handling: classify inputs as complete, partial, missing, conflicting, or runtime-only. Continue with a minimal useful artifact when safe, but mark assumptions, blockers, owners, and confirmation questions instead of inventing source fields, formulas, permissions, URLs, credentials, or business rules.
3. Flow completeness and feasibility: execute the workflow in order, split broad requests into smaller stages, and validate that each stage has the artifacts needed by the next stage before producing final output.
4. Constraint enforcement: apply the hard constraints, reference-loading rules, technology boundaries, security rules, and avoid-lists in this skill and its referenced files.
5. Output completeness: include the core deliverable, key decisions, data/source or evidence trace, missing-information list, self-check result, and next-step handoff details required by the user scenario.
6. Self-check before response: review process completeness, logical feasibility, missing-input coverage, decomposition, constraints, output integrity, generality, and trigger hygiene; repair any gap found before delivering.
