# 绩效评估子类型选择与评价模式

Use this reference when a performance evaluation report may involve multiple design parts, when the user asks for 绩效、考核、评分、评级、排名、奖金依据、目标达成、团队表现、人员业绩、门店排名、供应商评级、项目绩效、活动绩效, or when the page must classify evaluation patterns by reusable reference categories.

## 1. Boundary

绩效评估回答“评价对象表现好不好、是否达标、是否公平、如何排名、是否需要奖励/预警/改进/问责”。 It is different from adjacent report types:

| Adjacent type | Boundary |
| --- | --- |
| 状态总览 | 状态总览看当前状态；绩效评估形成评价结论 |
| 分析诊断 | 分析诊断解释原因；绩效评估判断表现好坏和得分等级 |
| 明细查询 | 明细查询看事实记录；绩效评估基于事实记录计算评价结果 |
| 汇报复盘 | 汇报复盘偏阶段总结；绩效评估偏评价、排名、奖惩、改进 |
| 异常监控 | 异常监控发现问题；绩效评估判断异常是否影响绩效 |
| 运营执行 | 运营执行推动动作；绩效评估衡量动作结果 |
| 核对追溯 | 核对追溯保证数据可信；绩效评估依赖可信数据进行评价 |

Choose the primary performance evaluation subtype by:

```text
评价对象 + 评价机制 + 评价用途
```

## 2. Selection Rule

Declare exactly one primary `performanceEvaluationSubtype` before designing the page:

- `targetAchievement`: 目标达成绩效评估。
- `orgTeam`: 组织/团队绩效评估。
- `personRole`: 人员/岗位绩效评估。
- `businessObject`: 业务对象经营绩效评估。
- `projectDelivery`: 项目/任务交付绩效评估。
- `processFulfillment`: 流程履约绩效评估。
- `serviceQuality`: 服务质量绩效评估。
- `costEfficiency`: 成本效率/投入产出绩效评估。
- `riskCompliance`: 风险合规绩效评估。
- `collaborationResponse`: 协同响应绩效评估。
- `strategyCampaign`: 策略活动绩效评估。
- `benchmarkRanking`: 对标排名绩效评估。
- `compositeRating`: 综合评分/评级绩效评估。

Complex pages may contain secondary subtypes, but the primary subtype owns evaluation object, first-screen score/grade, scoring model, ranking logic, and governance rules. Secondary subtypes may appear as tabs, local modules, or drilldown paths.

If several subtypes seem equally important, choose by the dominant evaluation mechanism:

| Dominant mechanism | Primary subtype |
| --- | --- |
| Target, KPI, OKR, budget, plan completion | `targetAchievement` |
| Department, team, region, subsidiary, store group | `orgTeam` |
| Employee, sales, service agent, operator, project manager, engineer | `personRole` |
| Product, customer, channel, store, supplier, warehouse, device | `businessObject` |
| Project, demand, task, special initiative, delivery package | `projectDelivery` |
| Order fulfillment, approval, procurement, ticket flow, delivery process | `processFulfillment` |
| Service, quality, experience, complaint, satisfaction | `serviceQuality` |
| ROI, productivity, expense efficiency, resource utilization | `costEfficiency` |
| Compliance, safety, audit, risk control, quality risk | `riskCompliance` |
| Cross-team support, handoff, response, collaboration SLA | `collaborationResponse` |
| Campaign, strategy, product feature, special action | `strategyCampaign` |
| Leaderboard, peer benchmark, percentile, Top/Bottom comparison | `benchmarkRanking` |
| Health score, star rating, A/B/C/D grade, weighted total score | `compositeRating` |

## 3. Subtype Patterns

| Subtype | Core object | Main question | Typical indicators | Output |
| --- | --- | --- | --- | --- |
| `targetAchievement` 目标达成 | 目标、KPI、OKR、预算、计划 | 目标完成了吗，完成得好不好 | 目标值、实际值、完成率、差距、时间进度、绩效得分 | 达成结论、得分、等级、差距对象 |
| `orgTeam` 组织/团队 | 部门、团队、区域、事业部、门店组 | 哪个团队表现好，是否公平可比 | 收入、利润、目标达成、人均产出、质量、风险、协同 | 团队得分、排名、等级、改进方向 |
| `personRole` 人员/岗位 | 员工、销售、客服、运营、工程师 | 个人是否达标，优势短板是什么 | 产出、目标达成、效率、质量、过程行为、风险、协同 | 个人得分、等级、奖金/晋升依据、复核入口 |
| `businessObject` 业务对象 | 产品、客户、渠道、门店、供应商、仓库 | 哪些对象值得投入、优化或退出 | 收入、毛利、增长、周转、质量、服务成本、风险 | 对象评级、资源配置建议、淘汰/扶持 |
| `projectDelivery` 项目/任务 | 项目、需求、任务、专项 | 是否按时、按质、按成本交付 | 进度、质量、成本、价值、风险、里程碑 | 项目得分、交付等级、复盘入口 |
| `processFulfillment` 流程履约 | 流程、节点、责任团队 | 流程是否按时稳定履约 | SLA达成率、超期率、处理时长、一次通过率、积压率 | 履约得分、节点短板、超期对象 |
| `serviceQuality` 服务质量 | 客服、门店、供应商、产品、服务团队 | 服务和质量是否达标 | 满意度、投诉率、缺陷率、一次解决率、复发率、严重问题 | 质量得分、问题分类、改进对象 |
| `costEfficiency` 成本效率 | 团队、项目、渠道、活动、产品、预算 | 投入是否产出足够回报 | 投入、产出、ROI、人效、费效、单位成本、利用率 | 效率等级、资源配置建议 |
| `riskCompliance` 风险合规 | 团队、人员、供应商、项目、流程、系统 | 是否合规，风险是否可控 | 风险事件、违规数、整改率、风险金额、重大扣分项 | 风险得分、合规等级、问责/整改 |
| `collaborationResponse` 协同响应 | 团队、岗位、流程节点、支持对象 | 协同是否及时有效 | 响应时长、SLA、支援次数、交接质量、满意度 | 协同得分、瓶颈团队、改进动作 |
| `strategyCampaign` 策略活动 | 活动、策略、产品功能、专项动作 | 策略是否有效、是否值得继续 | 投入、触达、转化、收入、ROI、留存、复购 | 活动评级、策略调整建议 |
| `benchmarkRanking` 对标排名 | 同类对象、标杆对象、分位组 | 谁领先、谁落后、差距多大 | 排名、分位、标杆差、同类均值、Top/Bottom | 排名结果、标杆对象、追赶目标 |
| `compositeRating` 综合评分 | 多维评价对象 | 综合表现如何分级 | 维度分、权重、总分、等级、加减分、一票否决 | 综合分、A/B/C/D、评级解释 |

## 4. Tag System

Use one primary subtype plus tags.

Evaluation object tags:

| Tag | Use |
| --- | --- |
| `person` | 人员、岗位、员工、经理 |
| `team` | 团队、部门、组织、区域 |
| `businessAsset` | 产品、客户、渠道、门店、供应商、设备 |
| `projectTask` | 项目、任务、需求、专项 |
| `process` | 流程、节点、SLA、履约 |
| `campaign` | 活动、策略、产品功能、专项动作 |
| `systemService` | 系统、服务、平台、接口 |

Evaluation purpose tags:

| Tag | Use |
| --- | --- |
| `managementView` | 管理查看和经营判断 |
| `rankingBenchmark` | 排名、分位、对标 |
| `bonusIncentive` | 奖金、激励、结算 |
| `promotionReference` | 晋升、调岗、人才评价 |
| `resourceAllocation` | 投入、收缩、淘汰、扶持决策 |
| `improvementManagement` | 短板改进、整改、辅导 |
| `riskAccountability` | 风险问责、合规扣分、追责 |

Scoring method tags:

| Tag | Use |
| --- | --- |
| `achievementScore` | 达成率评分，适合目标明确指标 |
| `weightedScore` | 多指标综合权重评分 |
| `rankingScore` | 排名、分位、同组比较评分 |
| `thresholdScore` | 阈值、红黄绿、合格/不合格 |
| `bonusPenalty` | 加减分，适合过程行为、风险和专项贡献 |
| `vetoRule` | 一票否决，适合重大风险、安全、合规 |
| `tierRating` | A/B/C/D、优秀/良好/待改进 |
| `manualReview` | 主管复核、定性评价、特殊情况 |

## 5. Scoring Governance Gate

Before accepting any performance evaluation design, declare:

- Rule version: scoring version, effective date, owner, and change history.
- Target/baseline source: target, budget, historical baseline, peer average, industry benchmark, or threshold.
- Formula: how raw indicators convert to score, including reverse indicators.
- Weight: each dimension and indicator weight, including total weight check.
- Cap/floor: upper/lower bounds, minimum score, maximum score, and overachievement cap.
- Bonus/penalty: extra points, risk deductions, special contribution, and approval rules.
- Veto: major risk, compliance, safety, quality, or fraud rules that downgrade or zero score.
- Eligibility: new objects, inactive objects, missing data, low sample size, special events, and exclusion rules.
- Freeze/review: data freeze time, reviewer, confirmation, appeal, manual adjustment, and audit trail.

Do not show a score or rank if users cannot inspect how it is calculated.

## 6. Page Structure

Recommended structure:

```text
First screen: evaluation conclusion
- score, grade, rank, key winners/weak objects, rule version, data freeze state

Evaluation dimensions
- result, target, efficiency, quality, cost, risk, collaboration, growth

Ranking and segmentation
- overall ranking, peer ranking, Top/Bottom, grade distribution, percentile

Score explanation
- dimension scores, lost points, bonus/penalty, veto, fairness correction

Object profile
- trend, strengths, weaknesses, peer benchmark, evidence links

Governance and actions
- rule drawer, data evidence, review/appeal, improvement task, export
```

For compact dashboards, keep the first screen to score/grade/rank plus lost-point explanation; move rule details and evidence into drawers.

## 7. Drilldown Paths

Performance evaluation should connect score to evidence:

```text
绩效总分 -> 维度得分 -> 指标得分 -> 指标来源明细 -> 业务记录/异常记录/任务记录 -> 诊断/改进事项
```

Typical routes:

| From performance page | Route to |
| --- | --- |
| Low target achievement | `analysis-diagnostic-report-design` target gap or `detail-query-report-design` source records |
| Low sales/person/team score | sales/order detail, revenue diagnosis, customer quality evidence |
| Low service score | ticket detail, complaint diagnosis, service quality evidence |
| Low store/supplier/object rating | object operation diagnosis, quality/fulfillment detail |
| Low project delivery score | project task detail, delay diagnosis, risk list |
| High risk deduction | anomaly detail, compliance traceability, rectification task |
| Low collaboration score | process node detail, ticket flow records, SLA evidence |

## 8. Evaluation Canvas

Use this canvas before producing a prototype or implementation spec:

| Canvas field | Question to answer |
| --- | --- |
| Report name | 这张绩效报表叫什么 |
| Primary subtype | 属于 13 类中的哪一类 |
| Evaluation object | 评价谁或评价什么 |
| Evaluation period | 按什么周期评价，何时冻结数据 |
| Audience | 管理层、主管、HR、员工本人、财务、风控 |
| Purpose | 管理查看、排名、奖金、资源配置、改进、问责 |
| Peer group | 谁和谁可比，同组如何定义 |
| Dimensions | 结果、目标、效率、质量、成本、风险、协同、成长 |
| Indicators | 每个维度有哪些具体指标 |
| Target/baseline | 和目标、预算、历史、同类平均、阈值还是标杆比较 |
| Scoring formula | 指标如何换算成分数 |
| Weight rule | 各指标权重是多少，总权重是否为 100% |
| Grade rule | 分数如何映射 A/B/C/D 或优秀/良好/待改进 |
| Rank rule | 是否排名，按全局、区域、同类、同规模还是同岗位 |
| Bonus/penalty | 哪些行为加分或扣分 |
| Veto rule | 是否有重大风险直接降级或清零 |
| Evidence drilldown | 得分可以下钻到哪些明细、异常、任务或来源记录 |
| Permission | 谁能看谁的绩效，是否本人可见，是否可导出 |
| Review mechanism | 主管复核、员工确认、申诉、人工调整、审批留痕 |
| Data governance | 数据来源、刷新频率、冻结时间、规则版本、争议处理 |

## 9. Acceptance Gate

Before accepting a performance evaluation design, verify:

- It declares exactly one `performanceEvaluationSubtype`.
- It states evaluation object, period, purpose, audience, and peer group.
- Indicators are controllable, attributable, measurable, and explainable for the evaluated object.
- Targets/baselines are sourced and fair for comparable objects.
- Formula, weight, cap/floor, bonus/penalty, grade, ranking, veto, and correction rules are visible.
- Score, grade, rank, and lost-point explanation are reproducible from the data contract.
- Users can drill from total score to dimension score, indicator score, and evidence records.
- Missing data, new objects, inactive objects, abnormal sample size, and special events have rules.
- For bonus, personnel, promotion, or accountability scenarios, review, appeal, data freeze, and adjustment audit trail are available.

## 10. Avoid

- Do not treat a leaderboard as a complete performance evaluation.
- Do not rank incomparable objects by absolute value only.
- Do not hide weights, formulas, thresholds, grade lines, or adjustment rules.
- Do not use one metric alone when it can induce bad behavior.
- Do not evaluate people on indicators they cannot influence.
- Do not allow post-period scoring rule changes without versioning and approval.
- Do not skip evidence drilldown for scores that affect money, promotion, resource allocation, or accountability.
- Do not omit review and appeal flows for personnel, bonus, or accountability evaluations.
