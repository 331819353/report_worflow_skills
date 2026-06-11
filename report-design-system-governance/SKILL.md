---
name: report-design-system-governance
description: "用于沉淀、应用和验收可复用报表/仪表盘/经营分析/明细查询/专题分析页面的全流程设计系统与开发基线。用户提到报表、仪表盘、经营分析、明细查询、专题分析、KPI、图表、表格、筛选、指标口径、单位/百分比显示、报表前端实现、报表联调验收、数据对账、权限/空态/loading/error、导出/性能、报表风格一致、可复用报表规范、视觉规范、tokens时触发；不替代单个组件修复或模板工程复制。"
---

# Report Design System Governance

## Overview

Use this skill to turn one-off report UI rules into reusable product-level standards and to provide the report-specific baseline for report work across design, implementation, runtime QA, testing, acceptance, and handoff. It should produce or apply a governing specification, not a single page critique and not a loose style summary.

It complements `$report-visual-layout-design` and `$report-component-style-design`: those skills solve a page/component; this skill governs the shared system.

When the reusable standard must follow Haier enterprise application UI rules, use `$haier-enterprise-app-ui-design-spec` as the source for company-level tokens, component standards, scene templates, and cross-platform adaptation. This skill should govern adoption, variants, exceptions, and report-specific extensions instead of restating the Haier source.

## Use Modes

Choose one mode before writing the output:

| Mode | Use when | Output emphasis |
| --- | --- | --- |
| `create-standard` | A team needs a new reusable report design system | Complete token, component, visualization, state, responsive, and governance spec |
| `audit-standard` | Existing reports are inconsistent or a design system seems incomplete | Findings, missing rules, conflict matrix, and repair priorities |
| `merge-standards` | Multiple skills/docs/templates overlap | Source-of-truth decision, inherited rules, merged rule set, deprecated rules |
| `extend-haier-standard` | Haier enterprise UI is the required baseline | Haier inherited rules plus report-specific extensions and exceptions |
| `migration-plan` | Existing reports must adopt a standard | Versioned rollout, affected components, regression baselines, exception process |

## Inputs

- Existing report screenshots, design files, frontend components, CSS/theme tokens, charts, tables, forms, layouts, brand constraints, accessibility requirements, or inconsistency examples.
- Optional: target device sizes, chart library, component library, brand colors, dark/light mode, and legacy exceptions.

## Reference Loading

Always read `references/01-design-system-spec-template.md` when producing a reusable spec or audit result. Read `references/02-report-design-system-rule-catalog.md` when the task needs concrete default rules, completeness checks, or examples of what a non-empty design system must contain.

For any report, dashboard, cockpit, business analysis, detail-query, or topic-analysis task that touches requirements, design, frontend implementation, QA, testing, acceptance, or reusable standards, read `references/03-report-development-guidelines-index.md` first, then load only the relevant distilled guideline reference:

- Requirement, metric口径, information architecture, layout, and card priority: `references/04-report-requirements-metrics-layout-guidelines.md`.
- Chart, table, typography, number/date format, series colors, and warning colors: `references/05-report-charts-tables-format-guidelines.md`.
- Filters, states, permissions, frontend implementation, performance, collaboration, acceptance, and templates: `references/06-report-filters-states-engineering-acceptance.md`.
- Leadership-friendly report patterns, strong sample highlights, long operating-analysis pages, high-density diagnostic dashboards, asset/resource overviews, and fixed 16:9 cockpits: `references/07-exemplary-report-design-patterns.md`.
- Report-specific anti-AI decision gate for metric systems, data story, realistic data, chart/table choice, drilldown/action, industry sense, and report designer behavior: `references/09-report-decision-anti-ai-gate.md`.

When the reusable standard is based on bundled report templates, also inspect `$report-prototype-template-management` `references/template-layout-design-system.md` so spacing, radius, title-band, and hover/focus rules stay aligned with the actual template assets.

For any design, implementation, QA, or reusable-standard work where output could become generic, "AI-looking", template-like, or overly polished without product context, read `references/08-anti-ai-design-gate.md` and apply it as a required quality gate.

For report, dashboard, BI, business-analysis, detail-query, cockpit, topic-analysis, or report-designer work, also read `references/09-report-decision-anti-ai-gate.md`. This is mandatory because a report can pass the generic anti-AI gate and still fail as a decision report.

If Haier enterprise UI tokens are the required source of truth, read `$haier-enterprise-app-ui-design-spec` before defining report token overrides. Keep the inherited Haier values and report-specific extensions separate.

## Workflow

1. Select mode and source of truth.
   Identify whether the standard is new, audited, merged, Haier-inherited, or migration-focused. Declare the hierarchy: company standard, template standard, report extension, project exception.

2. Inventory design surfaces.
   List shell, navigation, filters, KPI cards, charts, tables, drawers, modals, buttons, tags, empty/loading/error/no-permission states, exports, mobile layouts, and any custom graphics.

3. Run the anti-AI design gate.
   Identify thin product context, generic SaaS/AI aesthetics, screenshot-only completion, empty copy, brandless visuals, generic assets, equal hierarchy, decorative motion, and sample-like engineering. Record remediation or approved exceptions before stabilizing tokens.

4. Run the report decision anti-AI gate when report surfaces are in scope.
   Check metric system, metric tree, data story, realistic data, chart/table decision logic, filters/drilldowns/linkage, trust/action details, industry vocabulary, and report-designer behavior.

5. Define semantic tokens.
   Specify color roles, typography scale, spacing/grid, radius, border, shadow, density, icon size, z-index, and responsive breakpoints. Tokens must be semantic, for example `surface.card`, `text.primary`, `state.error`, not only raw colors.

6. Define component standards.
   For each component family, specify anatomy, required/optional slots, states, data density, label/tooltip behavior, overflow, loading/empty/error/no-permission behavior, accessibility, interaction expectations, hover/focus feedback, and internal fit rules.

7. Define visualization standards.
   Specify chart/table selection, axis/legend/tooltip/data-label rules, color semantics, metric unit wording, percentage/rate display conventions, comparison baselines, threshold/alert styling, drilldown/export behavior, and screenshot regression requirements.

8. Define governance.
   Mark stable tokens/components, allowed variants, deprecated patterns, exception process, versioning policy, migration status, and review checklist.

9. Route implementation.
   For page-level fixes use `$report-visual-layout-design`; for component defects use `$report-component-style-design`; for frontend implementation use `$frontend-development-workflow`; for visual regression use `$testing-integration-workflow`.

## Required Output

- Mode, source-of-truth hierarchy, and input inventory.
- Design-system scope and principles for report products.
- Token specification: color, typography, spacing, grid, radius, border, shadow, state, density, icon, z-index, and breakpoint.
- Template layout-token specification when report templates are in scope: design frame, shell frame, content range, block gap, row height, cell padding, card padding/radius, title band, and widget viewport.
- Component specification: filters, KPI cards, charts, tables, detail views, actions, feedback states.
- Interaction feedback specification: hover/focus/active/selected/disabled motion limits, border glow, focus ring, and reduced-motion behavior.
- Visualization specification: chart choice, semantics, legends, labels, tooltips, thresholds, interaction.
- Metric display specification: raw vs display scale, percent/rate wording, rounding, trend icon semantics, and forbidden legacy terms.
- Report-development guideline mapping for report work: requirement fields, metric dictionary, calculation口径, page hierarchy, chart/table/filter/state rules, engineering handoff, acceptance checklist, and reusable templates.
- Responsive and accessibility rules.
- Anti-AI design gate result: `antiAiRisk`, cause IDs, forbidden default scan, copy specificity, real-context proof, state/accessibility coverage, and approved exceptions.
- Report decision anti-AI gate result: `reportDecisionRisk`, `RPT-*` cause IDs, metric tree, metric dictionary completeness, data story path, realistic data proof, linkage proof, trust/action details, industry sense, and report-designer checks when applicable.
- Governance matrix: version, owner, source, status, allowed variants, deprecated patterns, exception approval, review checklist.
- Adoption plan: affected projects/components, migration priority, screenshot regression baseline plan.

## Hard Constraints

- Do not output an empty table-only template. Every required table needs at least the minimum rows listed in `01-design-system-spec-template.md`, with either values, inherited source references, or explicit `gap` status.
- Do not create one-off colors, spacings, hover effects, chart semantics, or component variants without assigning them to a semantic token or an approved exception.
- Do not allow generic "modern SaaS", "高级科技感", purple-blue gradients, glass cards, glow buttons, floating decorative assets, oversized radius, or abstract AI imagery as default report styles unless an approved source explicitly requires them.
- Do not accept empty marketing/product copy such as "赋能", "一站式", "重新定义", "智能化", "无缝", or "提升效率" without concrete user action, data object, system behavior, condition, or evidence.
- Do not accept a reusable standard that optimizes only first-screen beauty while omitting responsive behavior, edge states, accessibility, data density, and engineering token/reuse rules.
- Do not accept report standards that only define dashboard surfaces and chart/card styling while omitting metric口径, metric tree/driver path, realistic dirty data, drilldown/detail/action, trust metadata, and industry-specific vocabulary.
- Do not accept a report designer/editor standard that only defines the three-panel shell without data source binding, aggregation, calculated fields, filters, permissions, validation, versioning, preview, and publish behavior.
- Do not duplicate Haier enterprise UI values when `$haier-enterprise-app-ui-design-spec` is the source. Reference inherited values and only define report-specific extensions.
- Do not let template layout tokens drift from `$report-prototype-template-management` when bundled templates are the implementation target.
- Do not mark a rule `stable` unless it has scope, owner/source, usage guidance, acceptance criteria, and migration impact.
- Do not accept a design system without loading, empty, error, no-permission, stale-data, and disabled states.
- Do not accept chart/table rules without metric display semantics, exact-value access, overflow policy, and screenshot/regression check.

## Quality Checklist

- The output is reusable across reports, not a single-page style note.
- Tokens distinguish semantic roles rather than one-off colors.
- The spec separates inherited company/template rules, report extensions, and project exceptions.
- The anti-AI design gate passes or remaining `AI-*` findings are recorded with owner, severity, and remediation.
- The report decision anti-AI gate passes or remaining `RPT-*` findings are recorded with owner, severity, and remediation.
- Primary report metrics have formulas, grain, period, source/freshness, baseline, unit/precision, owner, and drilldown/action path.
- Report standards include realistic data-state requirements: missing/zero/extreme values, abnormal spikes/drops, long labels, partial sync, permission-limited cases, and reconciliation checks.
- Primary headings, CTAs, summaries, empty states, and errors contain concrete business meaning rather than generic AI/SaaS slogans.
- Visual identity comes from brand/template/product/domain choices, not interchangeable gradient/glass/neon decoration.
- Empty/error/loading/no-permission states are specified.
- Dense enterprise-report needs are prioritized over marketing-style layouts.
- KPI/summary/card internals have wrapping, min-height, tooltip/expand, or scroll rules for long labels and values; critical metric text is not hidden by ellipsis-only treatment.
- KPI cards center the core value zone in the card body and reserve at least 40% of the main visual height for the primary value area; title/description clusters must not create a top-heavy card with large unused blank space.
- ECharts charts with x-axis labels and bottom legends reserve a safe legend/axis distance; ECharts options use `grid.containLabel = true` and `grid.bottom >= 56px`.
- Small-card donut charts reserve legend width/band, reduce radius, constrain labels with max width/wrapping or disclosure, enable overlap hiding, and configure edge/bleed margins before acceptance.
- Tables with more than 8 visible columns or natural grouped fields use complex/grouped headers by default.
- Hover/focus feedback preserves component geometry and stays inside component bounds. Border glow, inset glow, and outline are preferred; offset/scale animation needs explicit overflow and viewport proof.
- Chinese report rate/change/completion labels use `%` by default; exceptions require named legacy/product rationale.
- Design-system version and adoption checklist are explicit.
