---
name: performance-evaluation-report-design
description: "Design, critique, or refine the design thinking for 绩效评估型报表 as a report category, not just one specific ranking dashboard. Use when the task asks how to design performance evaluation reports, target attainment assessments, organization/person/team/store/project ranking pages, scorecards, KPI assessment dashboards, benchmark comparison reports, A/B/C/D rating reports, weighted performance scoring, budget execution performance, sales/team/region/subsidiary/project manager evaluation, or any report whose purpose is to evaluate who performed well, who missed targets, where the gap is, whether the evaluation is fair, and what improvement actions should follow. Emphasize reusable design logic: evaluation object, target and scoring rules, metric weights, fairness and scale correction, ranking, grading, gap analysis, performance profile, drilldown, rule explanation, and improvement action."
---

# Performance Evaluation Report Design

## Core Positioning

Treat 绩效评估型报表 as a report type. Design the evaluation method first, then instantiate it for concrete objects such as regions, business units, subsidiaries, stores, teams, employees, project managers, sales groups, operation staff, cost centers, budgets, projects, products, or channels.

This report type answers:

- 谁完成得好。
- 谁没有达标。
- 差距在哪里。
- 排名和评分是否公平。
- 表现是持续稳定还是偶然波动。
- 下一步应该表扬、督导、整改、复盘或资源支持谁。

Do not design it as a simple leaderboard. A performance evaluation report must evaluate objects against targets, rules, scoring logic, and comparable peer groups.

## Design Mindset

Start from "how to evaluate fairly", not from "how to rank beautifully".

Use this chain:

1. Evaluation object: define who or what is being evaluated.
2. Objective: define what "good performance" means for this scenario.
3. Target baseline: define target, budget, quota, plan, benchmark, peer average, or threshold.
4. Metric system: define result, completion, contribution, efficiency, quality, stability, and risk metrics.
5. Scoring rule: define weights, calculation rules, grading bands, adjustment items, and exception rules.
6. Fairness rule: handle size differences, object types, territory quality, business maturity, special events, and data eligibility.
7. Ranking and grading: show position, tier, benchmark distance, and peer comparison.
8. Gap and improvement: explain what is missing and what action should follow.

If the evaluation rule is unclear, explicitly state assumptions and ask for or propose a scoring framework.

## Universal Design Workflow

1. Define the evaluated object and peer group.
   Clarify whether the report evaluates organizations, people, teams, stores, projects, regions, cost centers, or another entity. Define comparable groups such as same region type, same store size, same project category, or same job role.

2. Define goals and baselines.
   Use targets, budgets, plans, quotas, time progress, benchmark values, group average, or historical baseline. Avoid evaluating only by absolute value.

3. Build the metric framework.
   Combine target completion, ranking, YoY/MoM progress, contribution, gap, stability, weighted score, grading, and risk/exception metrics.

4. Define scoring and grading rules.
   Specify formula, weight, cap/floor, bonus/malus, adjustment items, A/B/C/D bands, red/yellow/green thresholds, and whether major exceptions override the score.

5. Handle fairness and comparability.
   Apply scale correction, peer-group comparison, per-capita/per-store/per-area normalization, same-type ranking, or eligibility filters when absolute comparison is unfair.

6. Show ranking and tiering.
   Provide overall score ranking and allow switching to single-metric ranking, same-type ranking, Top/Bottom, and benchmark comparison.

7. Explain gaps.
   For underperforming objects, show target gap, benchmark gap, score loss, weak indicators, missing tasks, cost overrun, collection shortfall, customer loss, or delayed projects.

8. Provide performance profile and improvement actions.
   Let users inspect one object through score breakdown, trend, peer comparison, weak points, and suggested next actions.

## Evaluation Metric Abstraction

Use this metric structure as a thinking model, then adapt names and formulas to the scenario:

- Target completion: target value, actual value, completion rate, gap amount, gap rate, time progress gap.
- Ranking performance: overall rank, metric rank, peer-group rank, regional rank, type-specific rank.
- Progress: YoY, MoM, rolling trend, improvement/decline, consecutive periods above/below target.
- Contribution: contribution amount, contribution rate, impact on group result, incremental contribution.
- Gap: distance to target, distance to benchmark, distance to group average, score loss by metric.
- Stability: volatility, sustained high performance, sustained underperformance, one-off spike/dip.
- Composite score: weighted score, sub-score, total score, bonus/malus, adjusted score.
- Grading: A/B/C/D tier, red/yellow/green status, excellence/pass/warning/fail.
- Fairness correction: same-size comparison, per-capita efficiency, per-store average, territory difficulty, project type, maturity stage, or scale-normalized metrics.

Do not let a single absolute metric dominate unless the evaluation rule explicitly says so.

## Process/Funnel Absorption

When process performance matters, absorb funnel/process indicators into 绩效评估型 as evaluation metrics. Do not create a separate report type just because stages or conversion rates are involved.

Use process metrics to evaluate:

- Stage conversion rate or pass rate.
- Average stage duration and SLA attainment.
- Backlog, overdue, or blocked object count.
- Rework/return rate.
- On-time handoff rate.
- Closure rate and first-pass success rate.
- Contribution to final outcome, such as成交, 回款, 交付, 验收, or关闭.

Keep fairness rules explicit: compare teams, people, projects, or stores only within comparable process types, volumes, and difficulty levels.

## Layout Pattern

Use a "target -> ranking -> gap -> profile -> improvement" layout. Adapt the number of layers to the scenario.

1. Performance Overview Layer
   Show evaluation period, object count, achieved count, missed count, average completion rate, average score, Top/Bottom, and grade distribution.

2. Target Attainment Layer
   Show target, actual, completion rate, gap amount, time progress, and pass/fail status for each object or key group.

3. Ranking And Tiering Layer
   Show overall ranking, single-metric ranking, peer-group ranking, Top/Bottom switching, and A/B/C/D or red/yellow/green distribution.

4. Gap Analysis Layer
   Explain why an object lost score or missed target: revenue gap, profit gap, cost overrun, payment shortfall, task incompletion, customer churn, project delay, quality issue, or risk event.

5. Performance Profile Layer
   Show one evaluated object's score breakdown, metric values, trends, peer comparison, benchmark distance, strengths, weaknesses, and stability.

6. Improvement Action Layer
   Provide suggested actions, focus objects, linked tasks, coaching direction, remediation entry, or follow-up report jumps for low performers.

## Chart Selection Logic

- Use horizontal bar charts for ranking and Top/Bottom comparison.
- Use bullet charts or progress bars for target attainment and benchmark distance.
- Use scorecards for weighted scores, sub-scores, and grade display.
- Use matrix charts or distribution charts for performance grades and object segmentation.
- Use heat matrices for multi-metric organization comparison.
- Use variance bars or waterfall charts for score loss and gap decomposition.
- Use trend lines or small multiples for stability and sustained performance.
- Use benchmark comparison charts for peer average, best practice, and target distance.
- Use radar charts only for a small number of objects with multi-dimensional capability profiles. Do not use radar charts for dozens of objects.

Prefer practical combinations: horizontal bars + bullet charts + scorecards.

## Interaction Design Logic

Design interactions so users can move from ranking result to scoring basis, gap source, and improvement action.

- Ranking dimension switch: overall score, revenue, profit, completion rate, cost control, payment, quality, task completion, or custom metric.
- Weight/scoring switch: current rule, simulation rule, business line rule, or role-specific rule when allowed.
- Organization or object drilldown: group -> region -> subsidiary -> department -> person, or portfolio -> project -> manager.
- Metric drilldown: composite score -> sub-score -> metric -> calculation detail.
- Gap drilldown: missed target -> revenue gap -> customer shortage -> new contract shortage, or score loss -> weak metric -> affected objects.
- Top/Bottom switch: quickly compare best performers and lagging performers.
- Peer-group comparison: same type, same size, same maturity stage, same region, or same role.
- Target/actual toggle: compare target values, actual values, completion rates, gaps, and scores.
- Benchmark comparison: compare against group average, top performer, historical best, or external benchmark where available.
- Low-performance action: generate整改任务, coaching item, follow-up review, or diagnostic jump.

Use popovers to explain scoring rules, weights, ranking口径, target source, grade rule, adjustment items, scale correction, metric definition, and exception exclusion rules.

Use drawers to show one object's performance detail: basic info, total score, sub-scores, target/actual/completion/gap, rank, YoY/MoM, group average comparison, benchmark comparison, unmet reasons, improvement suggestions, and related tasks.

Use jumps when users need deeper confirmation or action: analysis diagnosis report, detail query report, reconciliation report, operational execution page, review report, or source business system.

## Fairness And Rule Governance

Always make evaluation rules explainable and auditable:

- State target source and whether targets differ by object.
- State metric weights and score calculation.
- State whether large/small objects are scale-corrected.
- State whether rankings are global, regional, same-type, same-size, or role-specific.
- State whether abnormal events, missing data, new organizations, closed stores, or one-off adjustments are included or excluded.
- State score caps, floors, bonus points, penalty points, and override rules.
- Show data update time and evaluation period.
- Keep an audit path for disputed绩效数据.

Fairness is part of the report design, not a footnote.

## Output Format

When asked to design this report type or create a design proposal, prioritize the evaluation logic. Use this structure:

1. 设计定位: define evaluation object, audience, period, evaluation purpose, and peer group.
2. 评价思路: explain how to judge good/bad performance fairly.
3. 指标与规则: define target, actual, completion, contribution, gap, stability, score, weight, grade, and correction rules.
4. 布局框架: describe overview, target attainment, ranking/tiering, gap analysis, profile, and improvement layers.
5. 图表选择: map each visual to the evaluation question it answers.
6. 交互设计: describe ranking switch, metric drilldown, object drilldown, rule popovers, detail drawers, benchmark comparison, and action jumps.
7. 结论表达: state who is good, who is weak, where the gap is, whether it is sustained, and what action follows.
8. 公平性校验: list assumptions,口径 risks, scale correction, data eligibility, adjustment rules, and dispute-handling needs.

If the user provides one concrete performance report example, explicitly abstract it into general evaluation rules before applying it back to that example.

## Conclusion Pattern

Performance evaluation conclusions should include:

谁好: top performers or达标 groups.
谁差: underperformers or未达标 groups.
差在哪: weak metrics, gaps, or score-loss sources.
是否持续: sustained pattern or one-off result.
下一步:督导,整改,复盘,激励,资源支持,诊断, or明细核查.

Example structure:

本期[对象范围]共有 [N] 个对象达标，[N] 个未达标；[对象A]综合表现最好，主要优势在[指标]；[对象B]连续[N]期位于低分层，主要差距来自[指标/环节]，建议[动作]。

## Quality Checklist

Before finalizing, verify:

- The report evaluates against explicit targets, rules, and baselines.
- The evaluation object and comparable peer group are clear.
- Ranking is not based only on absolute size unless justified.
- Scoring weights, formulas, grade rules, and adjustment items are explainable.
- Scale correction or same-type comparison is considered.
- The report shows target, actual, completion, gap, and rank.
- Users can inspect score basis through popovers or drawers.
- Low performers have gap explanation and next action.
- Jumps lead to diagnosis, detail, reconciliation, execution, or review where appropriate.
- The conclusion covers who is good, who is weak, gap source, persistence, and action.

## Avoid

- Do not reduce performance evaluation to a simple ranking list.
- Do not compare large and small objects only by absolute value without correction.
- Do not hide scoring rules, weights, or grade thresholds.
- Do not use radar charts for many objects.
- Do not ignore data eligibility, missing data, special adjustments, or disputed records.
- Do not label objects A/B/C/D without explaining rules.
- Do not make improvement suggestions without showing the gap source.
