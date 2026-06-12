---
name: report-design-system-governance
description: "用于沉淀、应用和验收可复用报表/仪表盘/经营分析/明细查询/专题分析页面的全流程设计系统与开发基线。用户提到提高前端设计、前端设计提升、报表设计系统、页面设计规范、页面规范、组件规范、组件设计规范、视觉规范、tokens、KPI、图表、表格、筛选、指标口径、单位/百分比显示、报表前端实现、报表联调验收、数据对账、权限/空态/loading/error、导出/性能、报表风格一致、可复用报表规范时触发；不替代单个组件修复或模板工程复制。"
---

# Report Design System Governance

## Overview

Use this skill to create, audit, merge, apply, or validate reusable report design-system standards across design, implementation, runtime QA, testing, acceptance, and handoff.

It governs the shared baseline. Use `$report-visual-layout-design` for a page layout fix, `$report-layout-size-constraint-spec` for block/viewport fit, `$report-component-style-design` for mixed component repair, `$report-component-design-spec` for reusable component-family standards, `$report-chart-design-spec` for charts, `$report-table-design-spec` for tables, `$report-filter-control-design-spec` for filters, `$report-component-placement-spec` for implementation-ready component coordinates, and `$report-prototype-template-management` for bundled template assets.

When Haier enterprise UI is the required source of truth, load `$haier-enterprise-app-ui-design-spec` and keep inherited company rules separate from report-specific extensions and project exceptions.

## Use Modes

| Mode | Use when | Output emphasis |
| --- | --- | --- |
| `create-standard` | A team needs a reusable report design system | Tokens, layout, component, visualization, state, engineering, and governance standards |
| `audit-standard` | Existing reports or standards are inconsistent | Findings, missing rules, conflict matrix, repair priorities |
| `merge-standards` | Multiple docs/templates/skills overlap | Source-of-truth decision, merged rules, deprecated rules |
| `extend-haier-standard` | Haier UI is the company baseline | Inherited Haier rules plus report extensions |
| `migration-plan` | Existing reports need adoption | Versioned rollout, affected components, regression baselines, exception process |

## Reference Loading

Always choose the mode and then load only the matching references.

| Need | Read |
| --- | --- |
| Reusable spec or audit skeleton | `references/01-design-system-spec-template.md` |
| Concrete rule catalog and completeness checks | `references/02-report-design-system-rule-catalog.md` |
| Report guideline index | `references/03-report-development-guidelines-index.md` |
| Requirements, metric口径, hierarchy, layout, priority | `references/04-report-requirements-metrics-layout-guidelines.md` |
| Chart, table, typography, format, warning colors | `references/05-report-charts-tables-format-guidelines.md` |
| Filters, states, permissions, frontend, performance, acceptance | `references/06-report-filters-states-engineering-acceptance.md` |
| Leadership-friendly patterns and dense report examples | `references/07-exemplary-report-design-patterns.md` |
| Generic anti-AI design gate | `references/08-anti-ai-design-gate.md` |
| Report decision anti-AI gate | `references/09-report-decision-anti-ai-gate.md` |
| Detailed reusable-standard acceptance gates | `references/10-design-system-acceptance-gates.md` |
| Number precision, rounding, unit scaling, and exact-value display | `$metric-number-display-contract` |
| Bundled template layout tokens | `$report-prototype-template-management` `references/template-layout-design-system.md` |
| Chart/table/filter-specific standards | `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec` |
| Component-family placement and fit | `$report-component-placement-spec` |

## Workflow

1. Select mode and source-of-truth hierarchy: company standard, report extension, template standard, project exception, or legacy override.
2. Inventory design surfaces: shell, navigation, filters, KPI cards, charts, tables, drawers, modals, buttons, tags, empty/loading/error/no-permission states, export, responsive layouts, and custom graphics.
3. Classify whether the work is report/dashboard/BI/data-screen, common enterprise app, or mixed. Load the matching baseline before judging or defining rules.
4. Run the generic anti-AI gate and report decision gate before stabilizing tokens or accepting a visual standard.
5. Define semantic tokens and reusable rules: color roles, typography, spacing/grid, radius, border, shadow, density, icon size, z-index, responsive breakpoints, states, accessibility, and motion limits.
6. Define page, component, visualization, numeric precision/display, filter, state, performance, and handoff standards. Delegate numeric display details to `$metric-number-display-contract`; delegate implementation-ready component families to `$report-component-design-spec` and `$report-component-style-design`.
7. Define governance: stable vs experimental rules, allowed variants, deprecated patterns, exception process, versioning, migration status, owners, and review checklist.
8. Route implementation or remediation to layout, component, frontend, runtime QA, testing, or template skills.

## Required Output

- Mode, source-of-truth hierarchy, input inventory, and scope.
- Token, page-layout, component, visualization, numeric precision/display, filter, state, accessibility, interaction, and performance standards.
- Report guideline mapping: requirements, metric dictionary, calculation口径, page hierarchy, chart/table/filter/state rules, engineering handoff, and acceptance checklist.
- Anti-AI and report-decision gate result with `AI-*` and `RPT-*` findings or explicit pass status.
- Governance matrix: version, owner/source, status, allowed variants, deprecated patterns, exception approval, migration impact, and review checklist.
- Adoption or remediation plan with affected projects/components and regression evidence requirements.

## Quality Gate

- Do not output an empty table-only template; each required rule needs values, inherited source references, or explicit `gap` status.
- Do not create one-off colors, spacings, hover effects, chart semantics, or component variants without semantic tokens or approved exceptions.
- Do not accept generic "modern SaaS", "高级科技感", purple-blue gradients, glass cards, glow buttons, floating decoration, oversized radius, or abstract AI imagery as default report style.
- Reusable standards must cover responsive behavior, edge states, accessibility, data density, numeric display contracts, exact-value access, engineering tokens, and migration impact.
- Report standards must preserve metric口径, metric tree/driver path, realistic data states, drilldown/detail/action, trust metadata, and industry vocabulary.
- Load `10-design-system-acceptance-gates.md` before accepting a reusable standard, audit result, merge, or migration plan.
