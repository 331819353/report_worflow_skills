---
name: report-analysis-report-prototype-workflow
description: "运行分析报告类报表原型 workflow。用户提到分析报告、专题分析、经营分析报告、月报/周报/季报、活动复盘、原因归因、为什么上涨/下降、结论先行、证据链、行动建议、为什么这样时触发；不负责通用报表原型 workflow、自助分析、指标看板、明细报表、API 文档或后端实现。"
---

# Analysis Report Prototype Workflow

## Positioning

Use this workflow when the prototype should explain a topic, variance, or business problem through a structured data story. It is one of the five peer prototype workflows.

Core intent:

```text
分析报告讲“为什么这样”。
```

## Child Skills

| Stage | Skill |
| --- | --- |
| Requirement intake | `$report-requirement-structure-extraction` |
| Report business type | `$report-type-design` |
| Component/data/filter/interaction mapping | `$report-info-component-mapping` |
| Page layout | `$report-visual-layout-design` |
| Runnable template assets | `$report-prototype-template-management` |
| Component visual details | `$report-component-style-design` |
| Design system | `$report-design-system-governance` |
| Quality gates | `$quality-gate-validation` |
| Runtime QA | `$frontend-runtime-qa-validation` |

## Workflow

1. Confirm mode: design proposal, implementation spec, runnable prototype, repair, or URL handoff.
2. Define the report question: what happened, why, impact, and next action.
3. Write the conclusion-first answer before choosing charts. The conclusion must include fact, magnitude, likely reason, and suggested action when evidence allows.
4. Build the narrative path: conclusion -> overview -> problem analysis -> attribution -> impact -> action -> appendix.
5. Define evidence: metric formulas, comparisons, baselines, time/region/channel/product/customer/person/process splits, contribution, and detail evidence.
6. Define interaction: period switch, dimension switch, chart-to-detail, conclusion-to-chart anchor, expand/collapse, PDF/PPT export, share, comment, historical report.
7. Use `$report-type-design`: default primary type is `analysis-diagnostic`; use `review-recap` when meeting/report circulation is the main scenario.
8. Use `$report-info-component-mapping` to bind conclusions, evidence components, attribution blocks, action items, appendix details, and states.
9. Use layout/template/component skills to make the report read as a coherent story, not a chart gallery.
10. Verify conclusion-evidence links, action follow-up, export/share/comment needs, and runnable URL when requested.

## Required Output

- Workflow mode, report audience, report period, data scope, business question, and meeting/circulation scenario.
- Core conclusion, supporting evidence, cause breakdown, impact assessment, and action recommendation.
- Narrative block plan: title/meta, conclusion, overview, problem analysis, attribution, action, appendix.
- Comparison model: current vs previous, YoY, actual vs target, before/after, segment comparison.
- Action model: owner, deadline, follow-up metric, status, and tracking notes.
- Filter, interaction, export/share/comment/history, permission, freshness, and state requirements.
- Component/data/filter/control/interaction binding matrix.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not build a chart collection with no conclusion.
- Do not explain changes without a baseline, comparison, or evidence link.
- Do not let recommendations appear without owner, follow-up metric, or tracking intent when the report drives action.
- Do not repeat the same metric across multiple charts unless each chart answers a different narrative step.
- Do not claim readiness unless each conclusion is tied to evidence or marked as insufficient-data.
