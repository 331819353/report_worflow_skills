---
name: report-kpi-dashboard-prototype-workflow
description: "运行指标看板类报表原型 workflow。用户提到指标看板、经营看板、驾驶舱、状态总览、目标达成、核心 KPI、同比环比、趋势、排名、异常提醒、预警、现在怎么样时触发；不负责通用报表原型 workflow、自助分析、分析报告、明细报表、API 文档或后端实现。"
---

# KPI Dashboard Prototype Workflow

## Positioning

Use this workflow when the prototype should monitor business state quickly. It is one of the five peer prototype workflows.

Core intent:

```text
指标看板看“现在怎么样”。
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
2. Define the dashboard decision: business health, target progress, abnormality, risk object, and next drilldown.
3. Lock the KPI set: core KPI, process KPI, risk KPI, formula, unit, period, target, threshold, baseline, owner/source, freshness.
4. Design the first viewport: title, time range, update time, global filters, core KPI cards, target completion, YoY/MoM, abnormal reminder.
5. Design the second layer: trends, target/average lines, regional/channel/product comparisons, key rankings.
6. Design the third layer: anomaly detail, attention list, drilldown destination, and action entry.
7. Use `$report-type-design`: default primary type is `status-overview`; use `anomaly-monitoring` only when alert handling is the central task.
8. Use `$report-info-component-mapping` to bind KPIs, thresholds, trend datasets, anomaly rules, drilldowns, filters, and states.
9. Use layout/template/component skills to keep the dashboard sparse, layered, and actionable.
10. Verify first-viewport answer, filter linkage, drilldown, abnormal states, refresh/freshness, and runnable URL when requested.

## Required Output

- Workflow mode, dashboard user role, business state question, decision/action, time scope, and managed objects.
- KPI dictionary: formula, unit, period, target, threshold, baseline, owner/source, freshness, display status.
- First-viewport plan, trend/comparison/ranking plan, anomaly/detail/action plan.
- Drilldown chain: state -> split -> object -> detail/action.
- Filter, refresh, permission, export/share, abnormal, empty/error/no-permission state requirements.
- Component/data/filter/control/interaction binding matrix.
- Template/custom shell decision, changed files if implemented, verification, URL or blocker, and readiness.

## Quality Gate

- Do not turn a dashboard into a dense detail report.
- Do not use unbounded gauges or decorative charts for variety.
- Do not show only result metrics when process or risk metrics are needed to explain status.
- Do not mark every fluctuation as an anomaly; thresholds and severity must be explicit.
- Do not claim readiness unless the first viewport answers the current-state question and drilldown destinations are defined.
