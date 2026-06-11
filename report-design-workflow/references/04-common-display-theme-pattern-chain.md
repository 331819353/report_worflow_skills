# 04 Common Display Theme Pattern Chain

Use this reference for report prototype work that needs a reusable display-theme baseline, pattern selection, or prototype-to-development checklist.

This reference is derived from:

- `报表开发原型设计指南_通用展示主题版.docx`
- `报表原型设计模式库_120条.xlsx`

It complements `$report-type-design`. Do not replace the existing business report type with a display theme. The display theme answers "what kind of page form is this"; the business report type answers "what decision is the user making".

## Dual-Axis Routing

Every prototype should carry both axes when the output is a design proposal, spec, implementation plan, or runnable page.

| Axis | Values | Owns |
| --- | --- | --- |
| `displayTheme` | `detail-table`, `summary-stat`, `business-dashboard`, `exploratory-analysis`, `management-report`, `monitoring-alert` | Page form, default structure, reusable pattern cards, component families, export/interaction emphasis. |
| `primaryReportType` | Existing `$report-type-design` values such as `status-overview`, `analysis-diagnostic`, `detail-query`, `review-recap`, `anomaly-monitoring` | Decision question, answer model, evidence logic, business acceptance. |

Routing rules:

- If the request says 明细、列表、台账、流水、记录、导出、字段权限, prefer `displayTheme: detail-table`.
- If the request says 汇总、统计、分组、小计、总计、透视、同比、环比, prefer `displayTheme: summary-stat`.
- If the request says 看板、经营驾驶舱、总览、一屏判断、核心 KPI, prefer `displayTheme: business-dashboard`.
- If the request says 分析、探索、假设、联动、下钻、维度/指标切换、保存视图, prefer `displayTheme: exploratory-analysis`.
- If the request says 管理报告、专题报告、汇报、复盘、月报、导出 PDF/Word、章节、审批, prefer `displayTheme: management-report`.
- If the request says 监控、告警、阈值、值班、大屏、刷新、运行手册、根因, prefer `displayTheme: monitoring-alert`.
- When signals conflict, use the user's primary task to choose the display theme. Keep other themes as local blocks or follow-up pages.

## Theme Baseline Matrix

| Display theme | Primary task | Default prototype structure | Template hint | Acceptance emphasis |
| --- | --- | --- | --- | --- |
| `detail-table` | Find, verify, trace, and process individual records. | Frequent filters, search, table toolbar, fixed table, pagination or virtual scroll, row detail drawer/page. | Usually `topbar-light-scroll-dashboard-template`; use `left-nav-analytics-workbench-template` for multi-page ledgers or dense workbench suites. | Server-side filter/sort/page, export scope, field permission, long text, empty/loading/error/no-permission states. |
| `summary-stat` | Fold detailed data into grouped conclusions. | KPI/stat cards, dimension slices, trend/structure/ranking visuals, summary table or matrix, drilldown to detail. | `topbar-light-scroll-dashboard-template` for office summary; `left-nav-analytics-workbench-template` when several summary chapters or pivot-heavy pages exist. | Totals are not current-page calculations, aggregation grain is clear, drilldown counts reconcile, cache/precompute strategy is explicit. |
| `business-dashboard` | Quickly judge current status and decide where to act. | Global context, core KPI strip, primary trend, structure/comparison, Top list, risk/action entry. | Topbar light or dark by audience and display tone; fixed sci-fi only for explicit cockpit/exhibition/big-screen. | First viewport answers the top question in about five seconds, global filters synchronize, drilldown carries context. |
| `exploratory-analysis` | Test hypotheses, compare views, and form insights. | Analysis question area, global filters, multi-view charts, dimension/metric switches, cross-filter/drilldown, linked detail table, saved view/annotation. | Topbar for focused analysis; left-nav for multi-chapter analysis workbench. | Selected conditions are visible, view state is reproducible, dynamic dimensions/metrics are supported by data/API, permissions are enforced server-side. |
| `management-report` | Communicate conclusions, support review, archive, and export. | Cover or identity block, executive summary, chapters, conclusion-first evidence pages, appendix, version/export/sign-off. | `topbar-light-scroll-dashboard-template` for interactive report page; `left-nav-analytics-workbench-template` for long chaptered suite; custom only for exact paginated/print needs. | Every conclusion has evidence, export is complete, source/method/version are traceable, page identity survives screenshots/print/PDF. |
| `monitoring-alert` | Detect abnormal state and guide response. | Health overview, core signals, threshold time series, alert list, event timeline, dependency/root-cause path, runbook. | `frozen-title-sci-fi-cockpit-template` for monitoring wall; topbar dark for scrollable operational monitor; left-nav for multi-environment workbench. | Five-second status judgment, severity semantics, refresh/unknown/no-data behavior, actionable owner/runbook/escalation path. |

## Pattern Card Contract

The 120-card pattern library is not a visual decoration list. Each selected card must become a traceable design input.

Required fields for each selected card:

- `patternId`: stable ID such as `detail-table-01`.
- `displayTheme`: one of the six theme values.
- `patternName`: short Chinese display name.
- `designIntent`: why the pattern is needed for the user task.
- `prototypeStructure`: page/block/control structure implied by the pattern.
- `implementationPath`: data, frontend, API, permission, cache, export, or QA work implied by the pattern.
- `keyComponents`: component families that should appear in the component mapping.
- `acceptancePoints`: concrete checks to carry into test and self-check.
- `patternRole`: `primary-structure`, `supporting-evidence`, `interaction`, `state`, `export`, `governance`, or `acceptance-only`.
- `bindingRows`: component/filter/interaction rows affected by the pattern.

Selection bounds:

- Quick design proposal: choose 3-7 cards.
- Implementation-ready spec: choose 5-12 cards.
- Runnable template page: choose only cards that can be backed by data, controls, or explicit static policy.
- Always include at least one structure card, one evidence/data card, and one state/acceptance card unless the user asks for a very narrow repair.
- Do not copy all 20 cards from a theme into one page. Unused cards may become backlog, appendix, or future iteration notes.

## Pattern Catalog

Use these card names as the normalized catalog. Load the source workbook only when exact card text, source URLs, or all acceptance details are needed.

### `detail-table`

1. 顶部查询区 + 表格主体
2. 高级筛选抽屉
3. 列显示与列顺序配置
4. 冻结表头和关键列
5. 单列/多列排序
6. 快速搜索
7. 行展开二级信息
8. 行内操作与更多菜单
9. 批量选择与批量操作
10. 状态标签体系
11. 异常行提示
12. 数字、单位、精度规范
13. 长文本省略与完整查看
14. 导出与异步下载
15. 视图保存与共享
16. 空、加载、错误状态
17. 字段权限与脱敏
18. 服务端分页与虚拟滚动
19. 详情抽屉/详情页
20. 数据口径与更新时间

### `summary-stat`

1. 总览指标卡 + 汇总表
2. 多级分组汇总
3. 交叉矩阵/透视表
4. 同比/环比摘要
5. 汇总到明细下钻
6. TOP N 排名
7. 结构占比视图
8. 分布分桶
9. 固定总计/小计
10. 时间粒度切换
11. 指标切换器
12. 维度切片器
13. 汇总说明条
14. 可下载统计摘要
15. 异常值标注
16. 条件格式热力
17. 趋势迷你图
18. 柱线组合图
19. 可折叠维度树
20. 预计算与缓存提示

### `business-dashboard`

1. 一屏故事布局
2. 顶部核心指标卡组
3. 目标/达成率组件
4. 趋势主图
5. 结构分布模块
6. TOP 问题/机会列表
7. 全局筛选栏
8. 卡片层级与留白
9. 语义色规范
10. 更新时间与刷新机制
11. 下钻到分析/明细
12. 少而精的图表数量
13. 指标口径说明
14. 对比基准设计
15. 风险提示条
16. 大屏展示模式
17. 响应式看板
18. 角色化看板
19. 运营注释/人工标记
20. 看板维护与版本

### `exploratory-analysis`

1. 问题导向首页
2. 全局筛选与局部筛选分层
3. 层级下钻 Drill-down
4. 穿透 Drill-through
5. 图表交叉过滤
6. 维度切换器
7. 指标切换器
8. 对比集设计
9. 时间范围比较
10. 框选/刷选探索
11. 图表选择决策树
12. 分布与离群分析
13. 相关性探索
14. 地理/空间分析入口
15. 明细联动区
16. 保存分析视图
17. 注释与洞察分享
18. 指标血缘与口径追踪
19. 性能与渐进加载
20. 分析权限边界

### `management-report`

1. 封面与报告身份
2. 执行摘要页
3. 目录与章节导航
4. 章节叙事结构
5. 先结论后证据
6. 指标摘要页
7. 页眉页脚规范
8. 长表分页
9. 图表注释与标注
10. 重点信息 Callout
11. 口径与方法附录
12. 数据源与更新时间
13. 审批与签发流
14. 多格式导出
15. 交互式网页版报告
16. 视觉模板统一
17. 可扫读排版
18. 风险与限制说明
19. 版本变更记录
20. 自动化生成路径

### `monitoring-alert`

1. 当前健康总览
2. 核心信号面板
3. 阈值与颜色语义
4. 时间序列优先
5. 告警列表
6. 事件时间线
7. 根因下钻路径
8. 运行手册链接
9. 自动刷新策略
10. 噪声控制
11. 大屏值班模式
12. 缺失数据状态
13. 多对象/多环境切换
14. 容量与趋势预测
15. 依赖关系视图
16. 变更标记
17. 复盘视图
18. 仪表板目录与命名
19. 面板性能治理
20. 权限与共享

## Optimized Prototype Chain

Use this ten-stage chain before implementation and as a review checklist after implementation.

| Stage | Goal | Required output | Gate |
| --- | --- | --- | --- |
| 1. Define display theme | Decide which of the six display forms is primary. | `displayTheme`, competing themes, user role, use frequency, primary task. | Theme matches task; do not choose charts first. |
| 2. Shape information architecture | Decide what appears first, what moves to drilldown, and what is low-frequency. | Page frame, module priority, field list, first-viewport answer. | First viewport is clear; low-frequency information does not steal primary visual weight. |
| 3. Build metric/field dictionary | Prevent口径, unit, precision, permission, and refresh drift. | Metric/field names, formulas, units, precision, owner, permission, refresh time. | Titles, units, exports, and口径 notes are consistent. |
| 4. Prototype layout | Turn requirements into reviewable page structure. | Low/high fidelity structure, component states, control positions, layout spans. | Normal, empty, loading, error, and no-permission states are represented. |
| 5. Interaction path | Let users move from overview to cause to exact records. | Filter, sort, cross-filter, drilldown, drawer, saved view, export, return behavior. | Context is preserved and predictable across jumps and returns. |
| 6. Data/API contract | Ensure each component receives the right structure. | Dataset/API rows, aggregation grain, pagination, sorting, permission, cache/refresh strategy. | Performance and permissions are source-side, not only frontend-side. |
| 7. Visualization standard | Make charts serve the question. | Chart choice, axis/legend/label rules, semantic color, thresholds, exact-value access. | Comparison/trend/structure/distribution/relationship tasks use suitable chart families. |
| 8. Export/share | Support meetings, archive, checking, and collaboration. | Export scope, file naming, async export, screenshot/share link, sensitive-data rule. | Export matches current filters and does not leak restricted data. |
| 9. Acceptance test | Confirm usable, trustworthy, and buildable behavior. | Acceptance cases for data, filters, permissions, performance, edge cases, visual QA. | No口径 conflict, no permission gap, no layout overlap/clipping. |
| 10. Operations loop | Keep reports from becoming unmanaged artifacts. | Version log, owner, usage stats, refresh SLA, deprecation/downline rules. | Report has accountable owner, traceability, rollback, and archive path. |

## Pattern-To-Binding Rules

- Every selected pattern must map to at least one component, filter/control, interaction, data/API requirement, or acceptance case.
- Put `sourcePatternIds` in every affected binding matrix row.
- A pattern with only acceptance implications can produce validation cases without adding UI.
- If a pattern requires backend behavior, record it in the prototype handoff bundle rather than faking the behavior in frontend-only mock logic.
- If a pattern cannot be supported by available data, keep it as `gap` or `futurePattern`, not as a completed feature.
- For bundled templates, adapt pattern intent into template slots and config. Do not add duplicate shell layers just because a pattern mentions a filter bar, toolbar, or navigation surface.

## Handoff Focus By Theme

- `detail-table`: API must cover server-side filter, sort, pagination, field permission, row detail, export, and batch operations.
- `summary-stat`: API/data model must cover aggregation grain, totals/subtotals, comparison periods, precompute/cache, and drilldown reconciliation.
- `business-dashboard`: data contract must support first-screen KPI reconciliation, global query context, risk/action entries, refresh time, and drilldown context.
- `exploratory-analysis`: provider/API must support dynamic dimensions, metrics, time grain, cross-filter state, saved views, annotations, and permission-limited fields.
- `management-report`: delivery must cover conclusion/evidence mapping, report identity, version, source/method appendix, export/print, approval/sign-off, and archive behavior.
- `monitoring-alert`: runtime contract must cover severity states, thresholds, no-data/unknown, refresh cadence, alert ownership, event timeline, runbook, and escalation path.

## Quality Gate

- A prototype is not ready for layout or implementation until `displayTheme`, `primaryReportType`, selected pattern cards, and the reason for rejected competing themes are recorded.
- The selected pattern set must be small enough to implement and test in the requested scope.
- First-screen structure must follow the display theme while still answering the business report type's core question.
- Each must-have component must trace to both a business answer atom and either a selected pattern or an explicit custom reason.
- Data/interface/test handoff must include the selected pattern acceptance points.
- Operations, export, permissions, refresh, and versioning patterns may be non-visual; do not drop them just because they do not draw a component.
