---
name: report-design-system-governance
description: "用于沉淀和评审可复用报表设计系统规范。用户提到报表设计系统、视觉规范、颜色/字号/间距/tokens、图表规范、表格规范、空态/loading/错误态、交互规范、响应式规范、多报表风格一致、长期复用产品化规范时触发；不处理单个组件修复或单页模板复制。"
---

# Report Design System Governance

## Overview

Use this skill to turn one-off report UI rules into reusable product-level standards for multiple report projects.

It complements `$report-visual-layout-design` and `$report-component-style-design`: those skills solve a page/component; this skill governs the shared system.

## Inputs

- Existing report screenshots, design files, frontend components, CSS/theme tokens, charts, tables, forms, layouts, brand constraints, accessibility requirements, or inconsistency examples.
- Optional: target device sizes, chart library, component library, brand colors, dark/light mode, and legacy exceptions.

Read `references/01-design-system-spec-template.md` when producing a reusable spec.

## Workflow

1. Inventory design surfaces.
   List layout shell, navigation, filters, KPI cards, charts, tables, drawers, modals, buttons, tags, empty/loading/error/no-permission states, exports, and mobile layouts.

2. Define tokens.
   Specify color roles, typography scale, spacing/grid, radius, border, shadow, density, icon size, z-index, and responsive breakpoints.

3. Define component rules.
   For each report component, specify anatomy, states, data density, label/tooltip behavior, overflow, loading/empty/error behavior, accessibility, and interaction expectations.

4. Define visualization rules.
   Specify chart selection, axis/legend/tooltip/data-label rules, color semantics, comparison baselines, threshold/alert styling, drilldown behavior, and screenshot regression requirements.

5. Define governance.
   Mark stable tokens/components, allowed variants, deprecated patterns, exception process, review checklist, and versioning policy.

6. Route implementation.
   For page-level fixes use `$report-visual-layout-design`; for component defects use `$report-component-style-design`; for frontend implementation use `$frontend-development-workflow`; for visual regression use `$testing-integration-workflow`.

## Required Output

- Design-system scope and principles for report products.
- Token specification: color, typography, spacing, grid, radius, border, state, breakpoint.
- Component specification: filters, KPI cards, charts, tables, detail views, actions, feedback states.
- Visualization specification: chart choice, semantics, legends, labels, tooltips, thresholds, interaction.
- Responsive and accessibility rules.
- Governance matrix: version, owner, allowed variants, deprecated patterns, exception approval, review checklist.
- Adoption plan: affected projects/components, migration priority, screenshot regression baseline plan.

## Quality Checklist

- The output is reusable across reports, not a single-page style note.
- Tokens distinguish semantic roles rather than one-off colors.
- Empty/error/loading/no-permission states are specified.
- Dense enterprise-report needs are prioritized over marketing-style layouts.
- Design-system version and adoption checklist are explicit.
