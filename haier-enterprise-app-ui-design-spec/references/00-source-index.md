# Haier Enterprise App UI Source Index

Source document: "海尔集团企业应用 UI 设计规范（Web端）".

Document metadata:

| Field | Value |
| --- | --- |
| Created | 2023-04-14 |
| Latest local source modification | 2025-06-24 |
| Scope | PC Web, PC desktop, Mobile App adaptation reference |
| Base unit | `Hd = 2px` |
| Goal | Unify visual language, interaction, components, layout, and cross-platform adaptation for Haier enterprise application surfaces, including report applications as inherited baseline |

## Skill Boundary

This skill is for Haier enterprise application development: forms, lists, detail pages, tables, navigation, workbench, dialogs, empty/exception/feedback states, report application shells, and cross-platform adaptation.

It is not the primary analytical workflow for report/dashboard/data-screen development. For report, dashboard, cockpit, KPI, chart/table-heavy analytics, or runnable report prototype work, use the `report-design-*` skills for report-specific decisions, and also load this skill as the required Haier company-level UI baseline unless an explicit non-Haier/native/neutral exception exists.

## Reference Map

| Need | Read |
| --- | --- |
| Token values, colors, typography, spacing, radius, shadow, icon, grid, breakpoints | `design-tokens.md` |
| Design理念, keywords, design style, componentization mindset | `01-principles.md` |
| Button, Input, Select, Form, Menu, PageHeader, Table, Modal/Dialog, Empty, Result | `03-components.md` |
| Front-office/back-office layout, form+table, description list, modal, empty page | `04-layout-structures.md` |
| Form/list/detail/table/empty/exception/feedback/navigation/data-entry/data-display/copywriting/result scenario rules | `05-usage-scenarios.md` |
| Form page, empty/exception, workbench, detail page templates | `06-scene-templates.md` |
| Resolution, left navigation width, spacing adaptation, PC/Desktop/Mobile navigation adaptation | `07-cross-platform.md` |

Load only the needed reference files. Do not load all references just because this skill triggered.

## Original Document Structure

| Part | Section | Reference |
| --- | --- | --- |
| 0 | 文档信息 | This file |
| 1 | 设计理念 | `01-principles.md` |
| 2 | 原子元素 | `design-tokens.md` |
| 3 | 通用组件 | `03-components.md` |
| 4 | 结构布局 | `04-layout-structures.md` |
| 5 | 使用场景 | `05-usage-scenarios.md` |
| 6 | 场景模板 | `06-scene-templates.md` |
| 7 | 跨平台适配 | `07-cross-platform.md` |
