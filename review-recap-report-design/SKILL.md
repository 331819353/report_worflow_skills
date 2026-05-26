---
name: review-recap-report-design
description: "Design, critique, or refine the design thinking for 汇报复盘类报表 as a report category, not just one specific monthly report or meeting deck. Use when the task asks how to design management review reports, business review dashboards, monthly/quarterly/annual recap reports, operating meeting reports, board report data pages, project review reports, special-topic recap reports, leadership briefing materials, data-driven presentation reports, or any report whose purpose is to explain what happened during a period, what the result was, why it happened, what risks remain, and what actions come next. Emphasize reusable design logic: narrative structure, conclusion-first summary, stage results, key changes, cause summary, evidence access, issue and risk list, action plan, meeting readability, export to PDF/PPT, and versioned review."
---

# Review Recap Report Design

## Core Positioning

Treat 汇报复盘类报表 as a report type. Design the narrative method first, then instantiate it for concrete scenarios such as operating meetings, monthly reviews, quarterly business reviews, annual summaries, board reports, project reviews, special-topic reviews, regional reports, department reports, PMO updates, or leadership briefings.

This report type answers:

- 这段时间发生了什么。
- 结果如何。
- 为什么会这样。
- 有哪些亮点、问题和风险。
- 下一步怎么办。
- 谁负责、什么时候完成、如何跟踪。

Do not design it as an exploratory dashboard. Its core value is: 结论清楚、证据可查、行动明确、适合会议阅读、可以沉淀为材料。

## Design Mindset

Start from "how to tell the management story", not from "how to display all data".

Use this chain:

1. Reporting purpose: define meeting, audience, period, topic, and decision context.
2. Executive conclusion: state the main judgment first.
3. Stage result: show what was achieved or missed during the period.
4. Key changes: explain what changed materially versus target, plan, previous period, or same period last year.
5. Cause summary: summarize why the major changes happened, referencing diagnostic evidence without recreating full analysis.
6. Issues and risks: name current problems and future risks that may affect goals.
7. Action plan: define what to do next, owner, deadline, expected result, and tracking method.
8. Evidence and export: make support material accessible and meeting materials easy to generate.

This report should read like a structured argument: conclusion -> evidence -> explanation -> action.

## Universal Design Workflow

1. Define the review context.
   Identify the audience, meeting type, review period, business scope, theme, and expected decision or alignment.

2. Write the top conclusion before arranging charts.
   Summarize result, main reason, major risk, and next action. The first screen should let leaders understand the story quickly.

3. Select stage-result metrics.
   Choose metrics that represent the period outcome: revenue, profit, expense, collection, budget completion, project completion, customer growth, operational quality, organization performance, or domain-specific results.

4. Identify key changes and events.
   Compare against budget, plan, target, previous period, same period last year, milestone, or baseline. Include major events such as campaigns, policies, projects, market changes, organizational changes, or incidents when they explain the story.

5. Summarize causes at the right depth.
   Bring in conclusions from analysis diagnostic reports, but keep the recap concise. Use detailed drilldown only as support.

6. Separate highlights, problems, and risks.
   Highlights show what worked; problems show current underperformance; risks show what may affect future targets.

7. Design the action closure.
   Every important problem or risk should connect to an action, owner, deadline, expected result, and follow-up method.

8. Support material output.
   Consider PDF/PPT export, presentation mode, shared link, annotations, version comparison, and evidence drawers.

## Narrative Structure

Use this narrative model, adapting labels to the scenario:

- Conclusion summary: overall judgment, main achievements, main gaps, major risks, next focus.
- Period results: what was completed, missed, improved, declined, or delayed.
- Target comparison: budget, plan, target, milestone, previous period, same period last year, or benchmark.
- Key changes: significant changes in metrics, structure, contribution, region, business line, cost, project, customer, or process.
- Major events: activities, policy changes, market changes, important projects, incidents, special adjustments, or leadership decisions.
- Cause summary: short explanation of the drivers behind the changes.
- Issues and risks: current problems, future risk factors, severity, affected objects, and possible impact.
- Action plan: actions, owners, due dates, expected outcomes, tracking method, and status.

The narrative should make the meeting easy to follow without forcing participants to rediscover the logic.

## Process/Funnel Absorption

When a review story depends on a process or funnel, absorb it into 汇报复盘型 as part of the period narrative. Do not turn the recap into an exploratory funnel dashboard.

Use process/funnel content to explain:

- Which stage improved or deteriorated during the period.
- Where volume accumulated, conversion dropped, or duration increased.
- Which event, policy, campaign, project, or organizational action affected the process.
- Which process issue became a risk or action item.
- What follow-up action will unblock the process.

Keep the recap level concise: show the process story, evidence summary, and next action; link to diagnosis or detail reports for full exploration.

## Layout Pattern

Use a "summary -> result -> change -> cause -> risk -> action" layout. This is a story structure, not a fixed wireframe.

1. Conclusion Summary Layer
   Put the main conclusion first. Include overall result, target gap, major driver, key risk, and next focus. Use conclusion cards or short narrative blocks.

2. Stage Result Layer
   Show the period's main outcomes with KPI cards, target comparison, progress bars, bullet charts, or concise comparison charts.

3. Key Change Layer
   Show what changed during the period: YoY/MoM, structure change, contribution shift, regional change, expense mix change, project progress change, or customer change.

4. Cause Summary Layer
   Explain the main changes with waterfall charts, decomposition charts, concise diagnostic summaries, or linked evidence. Keep it at recap depth.

5. Issues And Risk Layer
   List current problems and future risks: budget gap, margin decline, project delay, overdue collection, inventory backlog, efficiency decline, customer complaints, quality issues, or execution blockers.

6. Action Plan Layer
   Show what will be done next: action, owner, deadline, expected result, status, dependency, and tracking method. This layer is essential.

## Chart And Component Selection

- Use conclusion cards and key metric cards for executive summary.
- Use KPI cards, comparison bars, progress bars, and bullet charts for stage results and target completion.
- Use trend charts and timelines for period process and important events.
- Use waterfall charts and decomposition charts for concise cause explanation.
- Use stacked bars, structure charts, or contribution charts for key changes.
- Use tables, risk lists, and issue cards for problems and risks.
- Use task tables, roadmaps, or Gantt charts for action plans.
- Use annotations and callouts to connect data points to events and conclusions.

Avoid overloading the report with interactive analysis charts. Meeting readability is more important than exploratory freedom.

## Interaction Design Logic

Design interactions to support reading, evidence checking, material generation, and action follow-up.

- Chapter navigation: jump between summary, result, change, cause, risk, and action sections.
- Period switch: switch month, quarter, year, project phase, or review cycle.
- Conclusion expansion: click a conclusion to reveal supporting evidence.
- Metric click: show metric change process or related summary evidence.
- Issue click: show issue explanation, impact, owner, and follow-up status.
- Organization or segment click: show that object's recap summary, not a full exploratory drilldown.
- Action click: show owner, due date, dependencies, progress, and linked tasks.
- Annotation: support chart notes, meeting comments, leadership concerns,口径 notes, and event explanations.
- Export: support PDF, PPT, share link, and presentation mode when needed.
- Version comparison: compare current review with previous version, previous meeting, or historical recap.

Use lightweight drilldown only. The purpose is to move from conclusion to evidence, not to redo the whole analysis.

Use popovers for metric explanation, chart note, data source, event note,口径 change, meeting comment, leadership concern, and data refresh time.

Use drawers for supporting material: conclusion evidence, key charts, detail evidence, related attachments, meeting minutes, historical recaps, action details, and diagnostic sources.

Use jumps to return to source analysis: analysis diagnostic report, status overview report, performance evaluation report, detail query report, exception monitoring report, reconciliation report, operational execution page, or source system.

## Action Plan Design

Every important issue or risk should lead to an action plan. Include:

- Action description: what will be done.
- Owner: who is responsible.
- Deadline: when it should be completed.
- Expected result: what should change.
- Tracking metric: how progress will be measured.
- Current status: not started, in progress, blocked, completed, delayed.
- Related evidence: diagnosis, detail record, task, attachment, or meeting note.
- Follow-up cadence: next meeting, weekly check, monthly review, or task workflow.

Action plans turn recap into management closure. Without actions, the report is only a retrospective.

## Output Format

When asked to design this report type or create a design proposal, prioritize the story and meeting use. Use this structure:

1. 设计定位: define review scenario, audience, period, topic, and expected decision.
2. 叙事主线: explain the story from result to cause to risk to action.
3. 指标与内容: define stage results, target comparison, key changes, events, issues, risks, and actions.
4. 布局框架: describe conclusion summary, result, change, cause, risk, and action layers.
5. 图表组件: map each component to its role in the story.
6. 交互设计: describe chapter navigation, period switch, conclusion evidence, popovers, drawers, jumps, annotations, and export.
7. 行动闭环: define owner, deadline, expected result, tracking method, and follow-up.
8. 汇报结论: write a conclusion covering result, reason, risk, and next action.
9. 材料化校验: list assumptions, evidence gaps,口径 changes, export needs, versioning, and meeting-readability risks.

If the user provides one concrete recap report example, explicitly abstract it into general review-recap rules before applying it back to that example.

## Conclusion Pattern

Review recap conclusions should be complete:

结果如何: what was achieved or missed.
为什么: main causes or events.
有什么风险: current issues and future risks.
下一步怎么办: actions, owner direction, and follow-up focus.

Example structure:

本期[范围]整体[结果判断]，[关键指标]较[目标/预算/同期]为[表现]；主要受[原因/事件]影响。后续需重点关注[风险/问题]，并由[责任方]在[时间]前推进[行动]，以达成[预期结果]。

## Quality Checklist

Before finalizing, verify:

- The report starts with conclusions, not a chart pile.
- The narrative explains what happened, result, reason, risk, and next action.
- Metrics support the story and do not distract from it.
- Causes are summarized at recap depth and link to deeper diagnosis when needed.
- Issues and risks are explicit and prioritized.
- Every major issue or risk has an action owner, deadline, expected result, and tracking method.
- Interactions help users find evidence and materials, not wander into endless exploration.
- Popovers and drawers carry notes, evidence, meeting comments, and support material.
- Export to PDF/PPT, share link, presentation mode, or version comparison is considered when relevant.
- The final conclusion is suitable for meeting reading.

## Avoid

- Do not make the recap a pure dashboard with no narrative.
- Do not bury the conclusion after many charts.
- Do not overload the page with deep drilldowns.
- Do not restate diagnostic reports in full; summarize and link.
- Do not list risks without actions.
- Do not create action items without owner or deadline.
- Do not ignore meeting output needs such as PPT/PDF, annotations, comments, and version history.
