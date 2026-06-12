---
name: haier-enterprise-app-ui-design-spec
description: "用于按海尔集团企业应用 UI 设计规范（Web端）提供公司级 UI 基线。用户提到通用企业应用、PC Web应用、管理后台、前台页面、页面原型、前端页面、表单/列表/详情/表格/导航/弹窗/空态/工作台/跨平台适配/Haier UI Style时触发；海尔/企业报表、仪表盘、大屏、数据分析页面也必须继承本技能的色彩、字体、间距、圆角、阴影、基础控件、品牌和状态基线，同时叠加 report-design-* 报表专项规范。"
---

# Haier Enterprise App UI Design Spec

## Overview

Use this skill as the full-process company-level UI baseline for Haier enterprise Web applications. It applies during requirement shaping, prototype design, page implementation, runtime QA, acceptance, and handoff whenever the target is a Web application surface: forms, lists, detail pages, tables, navigation, dialogs, empty/exception/feedback states, workbench pages, report/dashboard/BI pages, and cross-platform adaptation.

For report, dashboard, cockpit, KPI, chart/table-heavy analytics, or runnable report prototype work, route first to the appropriate report workflow (`$report-design-workflow` for generic prototypes or a specialized prototype workflow for 自助分析/指标看板/分析报告/明细报表), `$report-visual-layout-design`, `$report-component-style-design`, or `$report-design-system-governance` for report-specific decisions. Still load this skill as the inherited company-level UI baseline for color, typography, spacing, radius, border, shadow, icon size, base controls, brand/logo, application states, and cross-platform behavior unless the user explicitly requests a non-Haier/native sample/neutral brand.

The skill is based on offline captures of the document "海尔集团企业应用 UI 设计规范（Web端）"; do not depend on live Feishu or website access.

## Offline Sources

Always use local offline sources first:

0. Read `$quality-gate-validation` `references/preflight-understanding-gate.md` before implementation, repair, or acceptance when the surface type, source authority, or owning design skill is not trivial.
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

1. Run the Preflight understanding gate for implementation, repair, or acceptance work when the surface type or owning baseline is not trivial.
   Name whether the work is Haier/enterprise app, report/dashboard, or mixed; identify affected forms/lists/tables/navigation/dialogs/states, report-specific surfaces, source authority, inherited company baseline, missing evidence, and start decision.

2. Classify the target surface.
   Decide whether the task is common application UI, report/dashboard UI, or mixed. Apply this baseline to Haier/enterprise report pages too, because reports are application pages; route report-specific hierarchy, chart, table, filter, metric, and data-readability decisions to report skills.

3. Load the smallest relevant source.
   Use `00-source-index.md` to choose one or two targeted references. Load `design-tokens.md` only when concrete visual values are needed.

4. Apply foundation rules first.
   Enforce Haier UI style, 2px base unit, color system, typography, spacing, grid, hierarchy, and responsive constraints before component details.

5. Apply component and scene rules.
   For buttons, inputs, selects, forms, menus, page headers, tables, empty states, exception pages, feedback, navigation, data entry/display, workbench, and detail pages, follow the matching thematic reference.

6. Produce implementation-ready guidance.
   Specify component choice, layout width/grid, spacing, state coverage, action placement, text/copy rules, and responsive behavior.

## Required Output

- State which offline Markdown sections were used.
- State the Preflight understanding result when the work is implementation, repair, or acceptance.
- State whether the work is common application UI, report/dashboard UI, or mixed, and how Haier baseline rules are inherited.
- Design decisions: style, tokens, layout, components, interaction, copywriting, and cross-platform behavior.
- Concrete specs: dimensions, grid spans, spacing, color/typography roles, button hierarchy, table overflow, form layout, empty/error/feedback behavior.
- Exceptions or open gaps when the requested UI cannot follow the offline standard.
- QA checklist for overlap, density, responsive fit, state coverage, and consistency with Haier enterprise app style.

## Hard Constraints

- Do not replace the offline source with a generic Ant Design, Element Plus, or Blue Whale summary unless the task explicitly asks for a different library.
- Do not infer design tokens from memory when `design-tokens.md` provides a local rule.
- Do not omit concrete token values such as HEX colors, font sizes, spacing, radius, shadow, icon size, grid, or responsive thresholds when producing implementation guidance.
- Do not use this skill as the main analytical design engine for report, dashboard, data-screen, KPI, chart, or analytics prototype work. Use report-design skills for those; this skill supplies the required Haier application UI baseline.
- Do not skip Haier color, typography, spacing, radius, shadow, icon, base control, state, and brand/logo constraints merely because the surface is a report/dashboard.
- Do not apply this skill before classifying whether the surface is Haier/enterprise app, report/dashboard, or mixed.
- Do not hide primary actions among multiple same-weight buttons; one operation area should have at most one primary button.
- Do not use arbitrary spacing; use the 2px base unit and documented responsive spacing.
- Do not accept enterprise pages that are visually polished but fail task logic, information density, action priority, or cross-platform fit.
