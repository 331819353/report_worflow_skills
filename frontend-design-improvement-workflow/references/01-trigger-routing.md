# Trigger Routing

Use this file to route vague frontend-design requests into predictable skills.

## Direct Trigger Phrases

When the user says any of the following, use `$frontend-design-improvement-workflow` first:

- 提高前端设计
- 前端设计提升
- 页面更专业
- 页面更好看
- UI优化
- 视觉优化
- 页面规范
- 组件规范
- 组件设计规范
- 前端设计规范
- 统一风格
- 企业应用风格
- 报表系统风格

## Routing Rules

| User wording | Route |
| --- | --- |
| 页面规范, 页面布局, 页面壳, 顶部栏, 左侧导航, 网格, 首屏层级, 元素重叠 | `$report-visual-layout-design` |
| 区块尺寸, 固定高度, 卡片高度, scrollHeight/clientHeight, overflow, 裁切, 溢出 | `$report-layout-size-constraint-spec` |
| 组件规范, 组件设计规范, KPI卡规范, 指标居中, 结论卡, 排名卡, Composite Panel, Analysis & Insight | `$report-component-design-spec` for reusable standard, `$report-component-style-design` for one component/fix |
| 图表规范, ECharts, legend, 图例, 组合图, 表格规范, 筛选控件规范 | `$report-chart-design-spec`, `$report-table-design-spec`, `$report-filter-control-design-spec` |
| 重复筛选, 重复刷新, 重复导出, topbar控件, 控件归属, 模板控件 | `$report-prototype-template-management` plus `$report-component-style-design` |
| 报表规范, 仪表盘规范, 报表风格一致, tokens, 设计系统 | `$haier-enterprise-app-ui-design-spec` as inherited company UI baseline for Haier/enterprise report apps, plus `$report-design-system-governance` for report-specific rules |
| 通用企业应用, 管理后台, 表单列表详情, 工作台, Haier UI | `$haier-enterprise-app-ui-design-spec` |
| 页面跑起来看, 浏览器检查, 截图, 控制台, hover/focus, 裁切, 溢出 | `$frontend-runtime-qa-validation` |
| 修改代码, 接口接入, 修复页面, 去mock, 编译报错 | `$frontend-development-workflow` |

## Default Bundle

For Haier/enterprise report/dashboard pages, the default bundle for "提高前端设计" is:

1. `$haier-enterprise-app-ui-design-spec`
2. `$report-design-system-governance`
3. `$report-visual-layout-design`
4. `$report-layout-size-constraint-spec`
5. `$report-component-design-spec` or `$report-component-style-design`
6. `$report-chart-design-spec`, `$report-table-design-spec`, or `$report-filter-control-design-spec` when those component families exist
7. `$report-prototype-template-management` when a bundled template shell/topbar/filter/action surface exists
8. `$frontend-runtime-qa-validation` when a runnable page exists

The default bundle must produce predictable proof obligations when code or a URL exists: KPI value alignment, duplicate-control ownership, fixed-height overflow, ECharts/table option evidence, contract-to-DOM/CSS/renderer binding, component crops, and non-default states.

For explicit non-Haier/native-sample/neutral report pages, record the exception and use the report bundle without the Haier baseline.

For common enterprise app pages, use:

1. `$haier-enterprise-app-ui-design-spec`
2. `$frontend-design-improvement-workflow`
3. `$frontend-runtime-qa-validation` when a runnable page exists
