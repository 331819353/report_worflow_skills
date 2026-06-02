# 汇报复盘子类型选择与叙事模式

Use this reference when a review/recap report may involve multiple design parts, when the user asks for 汇报、复盘、总结、周报、月报、季报、年报、经营分析会、项目复盘、活动复盘、事故复盘、整改复盘、阶段总结、经验沉淀、行动闭环, or when the page must classify recap patterns by reusable reference categories.

## 1. Boundary

汇报复盘回答“这段时间或这件事发生了什么、原计划是什么、实际结果如何、为什么、学到了什么、还有什么风险、下一步谁做什么”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览偏当前状态；汇报复盘偏一个周期或事件的阶段总结 |
| 分析诊断 | 分析诊断偏原因定位；汇报复盘吸收诊断结论并形成管理表达 |
| 明细查询 | 明细查询提供底层证据；汇报复盘只引用关键事实和样本 |
| 绩效评估 | 绩效评估形成评分、等级、排名；汇报复盘形成结论、经验和行动 |
| 异常监控 | 异常监控发现问题；汇报复盘总结问题发生、处理和改进 |
| 运营执行 | 运营执行推动任务办理；汇报复盘检查执行结果并形成下一步计划 |
| 核对追溯 | 核对追溯证明数据和过程；汇报复盘引用可信证据支撑结论 |

Choose the primary review/recap subtype by:

```text
汇报复盘对象 + 复盘主题 + 管理用途
```

## 2. Selection Rule

Declare exactly one primary `reviewRecapSubtype` before designing the page:

- `periodicBusiness`: 周期经营汇报复盘。
- `targetPlanOkr`: 目标计划/OKR 复盘。
- `projectDelivery`: 项目/任务交付复盘。
- `strategyCampaign`: 策略活动/专项战役复盘。
- `productBusinessTopic`: 产品/业务专题复盘。
- `customerMarketChannel`: 客户市场/渠道复盘。
- `processOperationFulfillment`: 流程运营/履约复盘。
- `incidentProblem`: 异常事故/问题复盘。
- `riskComplianceRectification`: 风险合规/整改复盘。
- `resourceBudgetRoi`: 资源预算/投入产出复盘。
- `orgCollaborationManagement`: 组织协同/团队管理复盘。
- `decisionActionClosure`: 决策跟踪/行动闭环复盘。
- `benchmarkExperience`: 标杆案例/经验沉淀复盘。

Complex reports may contain secondary subtypes, but the primary subtype owns the first-screen conclusion, narrative chain, chapter order, and action closure. Secondary subtypes may appear as chapters, evidence sections, appendix pages, or drilldown paths.

If several subtypes seem equally important, choose by the dominant recap theme:

| Dominant theme | Primary subtype |
| --- | --- |
| Week, month, quarter, year, business meeting, operating review | `periodicBusiness` |
| KPI, OKR, budget, annual priority, plan completion | `targetPlanOkr` |
| Project, demand, task, version, delivery package, rectification item | `projectDelivery` |
| Campaign, promotion, growth experiment, strategy, special battle | `strategyCampaign` |
| Product, SKU, feature, business line, commercial model | `productBusinessTopic` |
| Customer, member, market, channel, region, customer segment | `customerMarketChannel` |
| Order, procurement, approval, ticket, production, logistics, fulfillment | `processOperationFulfillment` |
| Incident, outage, complaint, failure, major abnormal event | `incidentProblem` |
| Audit issue, compliance, risk, safety, quality rectification | `riskComplianceRectification` |
| Budget, cost, expense, manpower, capacity, inventory, capital | `resourceBudgetRoi` |
| Team, collaboration, handoff, talent, organizational mechanism | `orgCollaborationManagement` |
| Meeting decision, action item, management requirement, follow-up task | `decisionActionClosure` |
| Best practice, success case, failure case, reusable method | `benchmarkExperience` |

## 3. Narrative Gate

Every review/recap design must start from a management narrative, not from a chart list:

```text
背景目标 -> 执行过程 -> 结果达成 -> 差异变化 -> 原因解释 -> 经验教训 -> 风险问题 -> 后续行动
```

Before choosing visuals, declare:

- Theme: what is being reviewed.
- Audience: who reads or attends the meeting.
- Purpose: sync, decision, recap, accountability, resource request, experience deposition, or action closure.
- Period/boundary: time range, business scope, included/excluded objects.
- Original target: plan, budget, OKR, milestone, expectation, key assumption, or management requirement.
- Actual result: what happened, what was completed, what changed, and what missed or exceeded expectation.
- Core conclusion: the top 1 to 3 management judgments.
- Evidence: data, cases, events, diagnosis, details, logs, attachments, or meeting records.
- Action: owner, deadline, expected result, tracking metric, status, and review rhythm.

Do not produce a recap page whose first screen asks users to infer the conclusion from charts.

## 4. Subtype Patterns

| Subtype | Core object | Main question | Typical chapters | Output |
| --- | --- | --- | --- | --- |
| `periodicBusiness` 周期经营 | Company, business unit, region, product line | 本周期经营结果如何，下周期重点是什么 | 核心结论、目标完成、关键指标、同比环比、增长/拖累、问题风险、下期策略 | 经营结论、风险重点、行动计划 |
| `targetPlanOkr` 目标计划/OKR | KPI, OKR, budget, annual priority | 目标完成了吗，目标是否需要调整 | 目标清单、完成结果、时间进度、差距解释、目标质量、后续动作 | 目标复盘、调整建议、行动项 |
| `projectDelivery` 项目/任务交付 | Project, task, version, delivery package | 是否按时、按质、按成本交付 | 背景目标、范围里程碑、计划vs实际、进度质量成本、问题处理、收益价值、经验教训 | 项目结论、复盘事项、后续优化 |
| `strategyCampaign` 策略活动 | Campaign, strategy, experiment, special action | 活动/策略是否有效，是否值得继续 | 活动背景、目标、执行过程、达成结果、效果拆解、经验教训、下次建议 | 效果结论、保留/放大/修正/停止 |
| `productBusinessTopic` 产品/业务专题 | Product, SKU, feature, business line | 产品/业务表现如何，下一步路线是什么 | 定位、核心指标、用户使用、收入利润、质量体验、市场变化、问题机会、路线建议 | 专题结论、产品/业务建议 |
| `customerMarketChannel` 客户市场/渠道 | Customer, member, market, channel, region | 客户和市场发生了什么变化，哪些渠道有效 | 客户增长、客户价值、客户结构、渠道表现、市场变化、行动建议 | 客群策略、渠道调整、市场机会 |
| `processOperationFulfillment` 流程运营/履约 | Process, node, order, ticket, logistics | 流程是否更快、更稳、更少异常 | 总量完成、环节效率、SLA、积压超期、瓶颈节点、优化动作、改善效果 | 流程优化计划、瓶颈行动 |
| `incidentProblem` 异常事故/问题 | Incident, outage, complaint, failure | 问题如何发生，如何防止复发 | 事件概述、影响范围、时间线、响应过程、直接原因、根因、处理结果、防复发措施 | 事故结论、整改责任、跟踪计划 |
| `riskComplianceRectification` 风险合规/整改 | Risk, audit issue, compliance, safety | 风险是否降低，整改是否真正闭环 | 风险概览、等级影响、整改计划、完成情况、延期原因、复发分析、机制改进 | 整改结论、监督机制 |
| `resourceBudgetRoi` 资源预算/投入产出 | Budget, expense, manpower, capacity, inventory | 资源是否按计划使用，投入产出是否合理 | 预算执行、成本费用、资源利用、投入产出、偏差原因、下期建议 | 增投/减投/调配建议 |
| `orgCollaborationManagement` 组织协同 | Team, collaboration, mechanism, talent | 协作是否顺畅，机制哪里要改 | 团队目标、协作情况、任务推进、跨团队响应、阻塞点、能力缺口、机制问题 | 组织改进动作 |
| `decisionActionClosure` 决策跟踪/行动闭环 | Decision, action item, meeting requirement | 上次说要做的事情做了吗 | 决策事项、行动计划、执行进度、结果验证、延期阻塞、升级事项 | 闭环结论、督办清单 |
| `benchmarkExperience` 标杆案例/经验沉淀 | Success case, failure case, best practice | 哪些经验可复用，适用边界是什么 | 案例背景、关键做法、结果证明、成功/失败因素、适用条件、推广建议 | 方法沉淀、复制路径、风险边界 |

## 5. Management Purpose Tags

Use one primary subtype plus purpose tags.

| Tag | Use |
| --- | --- |
| `informationSync` | 信息同步、例会通报 |
| `managementDecision` | 需要管理层拍板、资源支持、策略选择 |
| `stageSummary` | 阶段总结、周期复盘 |
| `experienceDeposition` | 提炼方法、沉淀案例、推广经验 |
| `accountabilityReview` | 事故、问题、风险、责任边界 |
| `resourceRequest` | 预算、人力、资源、优先级申请 |
| `actionClosure` | 跟踪上期决策、行动项和整改闭环 |

Audience tags: `executive`, `businessOwner`, `frontlineTeam`, `financeRiskAudit`, `crossFunctional`, `externalPartner`.

Output carrier tags: `biPage`, `ppt`, `pdf`, `docReport`, `meetingMinutes`, `presentationMode`.

## 6. Page Structure Patterns

Use the smallest structure that serves the meeting.

One-page management brief:

```text
Conclusion -> result vs target -> key evidence -> risks/issues -> next actions
```

Five-section recap:

```text
1. Core conclusion
2. Target and result
3. Key changes and causes
4. Problems, risks, and lessons
5. Next actions and owners
```

Full report:

```text
Background and target
Execution process
Result achievement
Key changes
Cause summary
Experience and lessons
Problems and risks
Action plan
Evidence appendix
Version and meeting record
```

For BI pages, keep conclusion and action visible; move evidence, notes, and full diagnosis into drawers, tabs, or linked reports.

## 7. Chart Selection

| Recap question | Recommended visuals |
| --- | --- |
| 目标达成 | 目标 vs 实际柱状图、完成率进度条、差距图 |
| 周期变化 | 趋势图、同比环比图、阶段变化图 |
| 贡献来源 | 瀑布图、贡献排名、结构占比图 |
| 活动过程 | 漏斗图、转化路径、活动时间线 |
| 项目推进 | 里程碑图、甘特图、阶段状态图 |
| 问题分布 | 帕累托图、问题类型分布、风险矩阵 |
| 事故过程 | 事件时间线、影响范围图、根因树 |
| 资源投入 | 预算执行图、费用结构图、ROI 图 |
| 行动闭环 | 行动项看板、责任人矩阵、完成状态表 |
| 经验沉淀 | 案例卡片、方法流程图、适用边界表 |

Principle: charts support conclusions. Do not show data only because it exists.

## 8. Action Closure Gate

Every important problem, risk, or decision must produce an action record:

- Action: what exactly to do.
- Owner: responsible person and collaborators.
- Deadline: due date and review rhythm.
- Expected result: target state or metric movement after completion.
- Tracking metric: how to verify the action worked.
- Current status: not started, in progress, blocked, completed, delayed, closed, upgraded.
- Evidence: diagnosis, detail record, attachment, meeting note, task record, or source system.

If prior actions exist, include a "previous actions" section with completion, delay, closure, or escalation status. Recaps that never check prior actions lose credibility.

## 9. Recap Canvas

Use this canvas before producing a prototype or implementation spec:

| Canvas field | Question to answer |
| --- | --- |
| Report name | 这份汇报/复盘叫什么 |
| Primary subtype | 属于 13 类中的哪一类 |
| Recap theme | 复盘的是周期、项目、活动、目标、异常还是案例 |
| Period and boundary | 复盘哪个时间范围或事件周期，哪些对象纳入/排除 |
| Audience | 谁看这份汇报 |
| Purpose | 同步、决策、复盘、问责、资源申请、经验沉淀还是行动闭环 |
| Original target | 当初想达成什么，关键假设是什么 |
| Execution process | 做了哪些关键动作，发生了哪些事件 |
| Actual result | 实际完成了什么，超预期或未达预期在哪里 |
| Baseline | 和目标、历史、预算、同类、预期还是上期行动比较 |
| Core conclusion | 最重要的 1 到 3 个判断是什么 |
| Evidence | 哪些数据、案例、明细、日志、附件支撑结论 |
| Cause summary | 成功或失败的原因是什么 |
| Lessons | 哪些做法可复用，哪些问题要避免，适用边界是什么 |
| Risks and issues | 哪些问题尚未解决，优先级和影响是什么 |
| Decisions needed | 是否需要管理层拍板或资源支持 |
| Next actions | 谁在什么时间前做什么 |
| Tracking metrics | 后续用哪些指标验证改进效果 |
| Drilldown reports | 可以跳到哪些分析、明细、异常、执行报表 |
| Data contract | 数据来源、统计范围、更新时间、版本号 |
| Output carrier | BI、PPT、PDF、文档、邮件还是会议纪要 |

## 10. Acceptance Gate

Before accepting a review/recap design, verify:

- It declares exactly one `reviewRecapSubtype`.
- It states theme, audience, purpose, period, boundary, original target, and actual result.
- The first screen gives a clear management conclusion before charts.
- It distinguishes facts, judgments, inferred causes, and recommendations.
- It explains key changes and references evidence or drilldowns.
- It includes lessons learned or reusable practices when the scenario is a real recap, not just a status report.
- It separates existing problems from future risks and assigns priority.
- Important problems, risks, decisions, or lessons have actions with owner, deadline, expected result, tracking metric, and status.
- Prior action items are checked when the recap is recurring.
- Output mode fits the use case: BI page, PPT, PDF, meeting minutes, or presentation mode.

## 11. Avoid

- Do not treat data listing as recap.
- Do not hide the conclusion behind charts.
- Do not skip the original target or plan.
- Do not present cause claims without evidence or diagnostic entry.
- Do not list problems and risks without actions.
- Do not create action items without owner, deadline, and tracking metric.
- Do not turn incident or project recaps into blame-only documents; focus on facts, mechanisms, prevention, and closure.
- Do not introduce new actions every cycle without checking prior action closure.
