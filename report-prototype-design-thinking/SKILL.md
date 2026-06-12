---
name: report-prototype-design-thinking
description: "用于报表、仪表盘、数据大屏、BI 页面原型在画表格、画图表或写代码前建立通用设计思路。用户提到报表原型通用设计思路、产品经理接到报表需求、谁在什么场景下做什么决策、先想清楚业务目标/角色/指标/分析路径时触发；不负责四类专项原型 workflow、页面模板工程、API 文档、后端实现或运行测试。"
---

# Report Prototype Design Thinking

## Positioning

Use this skill before report prototype layout, chart selection, component mapping, template selection, or implementation. It owns the product-manager thinking layer: who uses the report, in what scenario, to make what decision or action.

Default policy: this is the generic thinking layer used by the original `$report-design-workflow`. Four specialized prototype workflows exist separately and should be triggered directly when the user asks for 自助分析、指标看板、分析报告、或明细报表.

## Reference Loading

- General method: `references/01-general-prototype-design-thinking.md`

## Anti-Laziness Gate

For non-trivial work, apply `$quality-gate-validation` `references/anti-laziness-execution-gate.md` before final output, handoff, or readiness. Do not mark the result ready while `LAZY-*` findings remain open, when available local evidence was not inspected, when owning skills were skipped, or when proof is limited to generic statements such as "checked", "optimized", "looks good", or "implemented".

## Workflow

1. Load `references/01-general-prototype-design-thinking.md` for ordinary prototype work.
2. Identify target user, decision scenario, managed object, business question, time scope, expected action, and output form.
3. Separate content into `coreMetrics`, `analysisMetrics`, and `detailFields`; do not turn a raw field list directly into page blocks.
4. Define the analysis path before layout. A common path is: overall state -> trend -> dimension/driver split -> ranking/anomaly -> detail/action.
5. Choose components and charts by analysis purpose, not visual variety.
6. Record filters, drilldowns, exports, permissions, data口径, freshness, empty/error/no-permission states, and unresolved gaps.
7. Hand off the design-thinking output to `$report-type-design`, `$report-info-component-mapping`, `$report-visual-layout-design`, and `$report-prototype-template-management`.

## Required Output

- Target users, usage scenario, business question, decision/action, managed object, time scope, and output mode.
- Metric/field layering: core metrics, analysis metrics, detail fields, dimensions, baselines, thresholds, and known口径 gaps.
- Analysis path and first-viewport answer.
- Page block proposal with each block's business purpose.
- Component/chart choice rationale tied to the question it answers.
- Filter, drilldown, export, save/share, permission, refresh, and state requirements.
- Downstream handoff notes for report type, component mapping, layout, template, data/API, and testing.

## Quality Gate

- Do not start by drawing tables or charts before the user/scenario/decision/action is explicit or safely inferred.
- Do not treat "报表" as one fixed page shape. When the user explicitly needs monitoring, explanation, exploration, or exact record verification, use the corresponding specialized prototype workflow instead of branching inside this skill.
- Do not place all requested fields on the main canvas. Detail fields belong in detail tables, drawers, exports, or appendix unless they are needed for the first decision.
- Every proposed component must answer a named question, provide evidence, or support a required action.
- A type-specific entry must not bypass metric口径, data source, permissions, export scope, and abnormal/empty/error state notes.
- If the result feeds a runnable prototype, pass this output into the binding matrix and layout/template workflow before implementation.
