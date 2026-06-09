---
name: haier-enterprise-app-ui-design-spec
description: "用于按海尔集团企业应用 UI 设计规范（Web端）为通用企业应用全流程提供公司级 UI 基线：需求/原型/页面设计/前端实现/运行QA/验收/交付说明中的页面壳、通用组件、结构布局、业务场景模板、状态反馈和跨平台适配。用户提到通用企业应用、PC Web应用、管理后台、前台页面、应用页面开发、页面原型、前端页面、表单/列表/详情/表格/导航/弹窗/空态/工作台/跨平台适配/Haier UI Style时触发；报表、仪表盘、大屏、数据分析页面优先触发 report-design-* 技能，本技能作为通用应用/公司级UI基线。"
---

# Haier Enterprise App UI Design Spec

## Overview

Use this skill as the full-process company-level UI baseline for common Haier enterprise Web applications. It applies during requirement shaping, prototype design, page implementation, runtime QA, acceptance, and handoff whenever the target is a common application surface: forms, lists, detail pages, tables, navigation, dialogs, empty/exception/feedback states, workbench pages, and cross-platform adaptation.

This is not the primary report/dashboard/data-screen design workflow. For report, dashboard, cockpit, KPI, chart/table-heavy analytics, or runnable report prototype work, route first to `$report-design-workflow`, `$report-visual-layout-design`, `$report-component-style-design`, or `$report-design-system-governance`; use this skill only as the company-level UI baseline when Haier enterprise app rules are required.

The skill is based on offline captures of the document "海尔集团企业应用 UI 设计规范（Web端）"; do not depend on live Feishu or website access.

## Offline Sources

Always use local offline sources first:

1. Read `references/00-source-index.md` first when choosing which reference file to load.
2. Read `references/design-tokens.md` whenever the task involves color, typography, size, spacing, radius, border, shadow, grid, layer, or implementable visual specs.
3. Read `references/01-principles.md` for design理念, style, design-system positioning, and componentization logic.
4. Read `references/03-components.md` for Button, Input, Select, Form, Menu, PageHeader, Table, Modal/Dialog, Empty, and Result component rules.
5. Read `references/04-layout-structures.md` for front-office/back-office layouts, form+table pages, description-list pages, dialogs, and empty pages.
6. Read `references/05-usage-scenarios.md` for form/list/detail/table/empty/exception/feedback/navigation/data-entry/data-display/copywriting/result scenario decisions.
7. Read `references/06-scene-templates.md` for form-page, empty/exception, workbench, and detail-page templates.
8. Read `references/07-cross-platform.md` for resolution breakpoints, left-nav width, spacing adaptation, and PC Web/Desktop/Mobile navigation adaptation.

Do not load every reference by default. Load only the smallest file(s) needed for the task.

## Workflow

1. Classify the target surface.
   Decide whether the task is common application UI, report/dashboard UI, or mixed. If it is a common enterprise application page, apply this baseline even when the user did not say "规范". For report/dashboard primary work, route to report skills first and apply this skill only as company-level baseline.

2. Load the smallest relevant source.
   Use `00-source-index.md` to choose one or two targeted references. Load `design-tokens.md` only when concrete visual values are needed.

3. Apply foundation rules first.
   Enforce Haier UI style, 2px base unit, color system, typography, spacing, grid, hierarchy, and responsive constraints before component details.

4. Apply component and scene rules.
   For buttons, inputs, selects, forms, menus, page headers, tables, empty states, exception pages, feedback, navigation, data entry/display, workbench, and detail pages, follow the matching thematic reference.

5. Produce implementation-ready guidance.
   Specify component choice, layout width/grid, spacing, state coverage, action placement, text/copy rules, and responsive behavior.

## Required Output

- State which offline Markdown sections were used.
- State whether the work is common application UI or report/dashboard UI baseline support.
- Design decisions: style, tokens, layout, components, interaction, copywriting, and cross-platform behavior.
- Concrete specs: dimensions, grid spans, spacing, color/typography roles, button hierarchy, table overflow, form layout, empty/error/feedback behavior.
- Exceptions or open gaps when the requested UI cannot follow the offline standard.
- QA checklist for overlap, density, responsive fit, state coverage, and consistency with Haier enterprise app style.

## Hard Constraints

- Do not replace the offline source with a generic Ant Design, Element Plus, or Blue Whale summary unless the task explicitly asks for a different library.
- Do not infer design tokens from memory when `design-tokens.md` provides a local rule.
- Do not omit concrete token values such as HEX colors, font sizes, spacing, radius, shadow, icon size, grid, or responsive thresholds when producing implementation guidance.
- Do not use this skill as the main design engine for report, dashboard, data-screen, KPI, chart, or analytics prototype work. Use report-design skills for those; this skill supplies common Haier UI baseline only.
- Do not hide primary actions among multiple same-weight buttons; one operation area should have at most one primary button.
- Do not use arbitrary spacing; use the 2px base unit and documented responsive spacing.
- Do not accept enterprise pages that are visually polished but fail task logic, information density, action priority, or cross-platform fit.
