---
name: report-design-workflow
description: "Run the end-to-end workflow for designing, critiquing, redesigning, or implementing business reports and dashboards. Use when a task asks to create a report design, build a report prototype, turn a rough business requirement into a dashboard, redesign an existing report screenshot, generate mock data, define filters/interactions, choose report type skills, apply visual layout and component style, or select implementation templates. This workflow orchestrates report requirement extraction, eight report-type skills, information-to-component mapping, mock data design, filter data design, data interaction design, visual layout design, component style design, and optional Vue dashboard templates."
---

# Report Design Workflow

## Core Positioning

Use this as the top-level orchestration skill for report work.

It does not replace the report-type or horizontal skills. It decides:

- Which skill should be used first.
- Which steps are required for the user's current task.
- What each step must output before moving on.
- When to skip a step.
- How to verify the final design or prototype.

The default flow is:

`需求提取 -> 类型判断 -> 信息映射 -> 报表类型设计 -> 数据设计 -> 筛选设计 -> 数据交互设计 -> 视觉布局 -> 组件样式 -> 模板实现/交付 -> 质量验收`

## Workflow Modes

Choose the mode before starting.

### 1. Design Thinking Mode

Use when the user asks how a report category or page should be designed.

Deliver:

- Report type judgment.
- Design logic.
- Content blocks.
- Component mapping.
- Interactions.
- Visual/style guidance.
- Validation checklist.

Implementation, mock data, and templates are optional unless requested.

### 2. Prototype Design Mode

Use when the user wants a concrete report page or prototype design.

Deliver:

- Structured requirement.
- Report type and secondary roles.
- Page layout.
- Component list.
- Mock data plan.
- Filters and interactions.
- Visual style and responsive rules.
- Implementation-ready notes.

### 3. Implementation Mode

Use when the user wants code, a Vue dashboard, or an actual runnable page.

Deliver:

- All prototype design outputs.
- Template choice.
- Data files or mock data.
- Component implementation.
- Local verification.
- Screenshot or browser QA when applicable.

Use `left-nav-analytics-dashboard-template` for standard enterprise analytics dashboards and `sci-fi-dashboard-template` for fixed 1920x1080 sci-fi cockpit screens.

### 4. Review And Repair Mode

Use when the user provides an existing screenshot or page and asks what is wrong or how to optimize it.

Deliver:

- Visible issues.
- Requirement/type interpretation.
- Layout and component diagnosis.
- Data/filter/interaction gaps.
- Concrete repair plan.
- Updated implementation if requested.

## Stage Gate Workflow

### Stage 0: Determine Scope

Clarify or infer:

- Is the user asking for thinking, design proposal, actual prototype, or repair?
- Is there a specific report page or a report category?
- Is the expected output text, specification, code, or both?
- Is the page standard enterprise dashboard or sci-fi/big-screen cockpit?

Do not block if missing details can be safely assumed.

### Stage 1: Requirement Extraction

Use `report-requirement-structure-extraction`.

Output must include:

- Report theme.
- Primary and secondary report types.
- Users and scenario.
- Core questions.
- Business objects and grain.
- Metrics, dimensions, baselines.
- Content blocks.
- Data, filter, interaction, visual, and component needs.
- Assumptions and missing information.

Skip only when the user already provides a clean structured brief.

### Stage 2: Report Type Routing

Choose one primary report-type skill:

- `status-overview-report-design`: current status, health, target, variance, risk entry.
- `analysis-diagnostic-report-design`: why a metric changed, driver, cause, attribution.
- `detail-query-report-design`: records, fields, filters, sorting, export, row detail.
- `performance-evaluation-report-design`: target completion, scoring, ranking, fairness, improvement.
- `review-recap-report-design`: period story, conclusion, evidence, risk, action, meeting output.
- `anomaly-monitoring-report-design`: anomaly rules, severity, owner, SLA, handling.
- `operational-execution-report-design`: task, owner, progress, evidence, acceptance, closure.
- `reconciliation-traceability-report-design`: data correctness, differences, source, lineage, version, audit.

Use secondary report-type skills only for local blocks or follow-up flows. Do not invent extra report types for maps, funnels, tables, or charts.

### Stage 3: Business Design

Apply the primary report-type skill.

Output must include:

- Design positioning.
- Business logic.
- Metric and dimension logic.
- Layout layers.
- Chart/component rationale.
- Interactions.
- Conclusion pattern.
- Type-specific checklist.

This stage owns business purpose. It does not finalize mock data, filters, visual shell, or component style.

### Stage 4: Information To Component Mapping

Use `report-info-component-mapping`.

Output must include:

- Information inventory.
- Semantic roles.
- Content block mapping.
- Component/chart/table/card mapping.
- Interaction entry points.
- Mock data needs.
- Filter data needs.
- Layout and style constraints.

This is the bridge from business thinking to implementable page structure.

### Stage 5: Data Design

Use `report-mock-data-design` when prototype data, demo data, or chart-ready data is needed.

Output must include:

- Data story.
- Dataset list.
- Row grain.
- Dimension schema.
- Fact schema.
- Derived formulas.
- Rollup rules.
- Edge cases.
- Validation checks.

Skip only for pure methodology answers where no prototype or example data is needed.

### Stage 6: Filter Design

Use `report-filter-data-design` when report scope can change by time, organization, status, object, owner, source, or keyword.

Output must include:

- Main filter bar.
- Advanced filters.
- Defaults.
- Option schema.
- Cascades.
- Query parameters.
- Permission rules.
- Reset/export/shared-link behavior.

Almost all operational reports need this stage.

### Stage 7: Data Interaction Design

Use `report-data-interaction-design` when any data object is clickable or navigable.

Output must include:

- Clickable and non-clickable objects.
- Drilldown paths.
- Popover/drawer/modal contents.
- Cross-filtering rules.
- Jump targets.
- Parameter passing.
- State preservation.
- Permission and failure states.
- Back/return behavior.

Skip only for static export-only reports with no interaction.

### Stage 8: Visual Layout Design

Use `report-visual-layout-design`.

Output must include:

- Page shell choice.
- Haier logo usage.
- Header, filter bar, toolbar, sidebar/menu, footer decisions.
- 8*N rectangular grid structure.
- Content pattern: 总分总, 总分, 分总, 明细优先, 告警处理, 执行闭环, or recap narrative.
- Visual style preset.
- Empty/loading/error states.
- Responsive and overflow rules.

Always respect the bundled Haier logo rule: original color on light backgrounds and white on dark backgrounds.

### Stage 9: Component Style Design

Use `report-component-style-design`.

Output must include:

- Component title style.
- Background, typography, color, border, shadow.
- Alignment and centering.
- Label and legend rules.
- Overflow/clipping strategy.
- Complex diagram viewport behavior.
- Table/card/chart/drawer style rules.
- Visual QA checklist.

This stage prevents overlap, truncation, low contrast, and component sizing failures.

### Stage 10: Template Or Implementation

Use this stage only when the user asks for runnable files, page implementation, or a prototype.

Template choice:

- Use `left-nav-analytics-dashboard-template` for enterprise analytics reports with sidebar navigation, filters, 8*N cards, business widgets, and standard workbench behavior.
- Use `sci-fi-dashboard-template` for fixed 1920x1080 cockpit screens or command-center presentations.
- If the existing project already has a framework, follow the existing project patterns instead of forcing a template.

Implementation must:

- Keep business data out of config when the template expects data files or data sources.
- Use stable IDs for filters, interactions, and mock records.
- Implement component overflow and responsive behavior from earlier stages.
- Run and verify the page when a dev server is required.

## Skip Rules

Skip a stage only when it clearly does not apply:

- Skip mock data for pure conceptual guidance.
- Skip filter design for fixed-scope static reports.
- Skip data interaction for static PDF/PPT-only reports.
- Skip template implementation when the user only asks for design thinking.
- Skip report type classification only when the user explicitly gives the report type and it is consistent with the goal.

If skipping a stage creates risk, say what is being deferred.

## Output Formats

### Design Proposal Output

Use this structure:

1. 流程模式.
2. 报表主题与类型.
3. 用户与核心问题.
4. 业务设计思路.
5. 信息区块与组件映射.
6. 数据策略.
7. 筛选策略.
8. 数据交互策略.
9. 视觉布局策略.
10. 组件风格策略.
11. 质量验收清单.
12. 假设与缺口.

### Implementation Plan Output

Use this structure:

1. Scope and selected workflow mode.
2. Skills used and why.
3. Files/components/data to create or modify.
4. Mock data and filter state plan.
5. Interaction state and parameter plan.
6. Visual layout and component style plan.
7. Verification plan.

### Review/Repair Output

Use this structure:

1. Visible problems.
2. Root design causes.
3. Affected components/blocks.
4. Fix strategy by workflow stage.
5. Concrete implementation changes if requested.
6. Verification checks.

## End-To-End Quality Checklist

Before final delivery, verify:

- The primary report type is clear and not confused with a chart type.
- Secondary report types only appear where they change a block or flow.
- The core user question is answered in the first meaningful viewport.
- Metrics include baselines, direction, unit, and formulas where needed.
- Mock data, if used, reconciles with KPI cards, charts, tables, and filters.
- Filters have defaults, stable IDs, cascades, permission rules, and visible active state.
- Interactions preserve period, scope, object, metric, filters, permissions, and return path.
- Layout follows the 8*N rectangular grid.
- Haier logo usage follows light/dark rules.
- Components do not overlap, clip, truncate critical text, or use low-contrast labels.
- Dense tables, lineage graphs, diagrams, maps, and Gantt charts have scroll, zoom, pan, drawer, or fullscreen strategy.
- Export, refresh, download, share, and fullscreen actions respect filters and permissions.
- Empty, loading, no-permission, error, and stale-selection states are defined.
- Implementation uses existing project patterns and is verified locally when built.

## Avoid

- Do not start from visual layout before classifying the report purpose.
- Do not use every skill for every task; use the smallest complete path.
- Do not duplicate detailed rules from child skills; route to them.
- Do not invent new report categories when one of the eight categories fits.
- Do not treat mock data as random values.
- Do not design filters or jumps without permission and state behavior.
- Do not finish an implementation without checking for overlap, clipping, and broken layout.
