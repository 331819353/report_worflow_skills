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
| 组件规范, 组件设计规范, 图表规范, 表格规范, KPI卡规范, 筛选控件规范 | `$report-component-design-spec` for reusable standard, `$report-component-style-design` for one component/fix |
| 报表规范, 仪表盘规范, 报表风格一致, tokens, 设计系统 | `$report-design-system-governance` |
| 通用企业应用, 管理后台, 表单列表详情, 工作台, Haier UI | `$haier-enterprise-app-ui-design-spec` |
| 页面跑起来看, 浏览器检查, 截图, 控制台, hover/focus, 裁切, 溢出 | `$frontend-runtime-qa-validation` |
| 修改代码, 接口接入, 修复页面, 去mock, 编译报错 | `$frontend-development-workflow` |

## Default Bundle

For report/dashboard pages, the default bundle for "提高前端设计" is:

1. `$report-design-system-governance`
2. `$report-visual-layout-design`
3. `$report-component-design-spec` or `$report-component-style-design`
4. `$frontend-runtime-qa-validation` when a runnable page exists

For common enterprise app pages, use:

1. `$haier-enterprise-app-ui-design-spec`
2. `$frontend-design-improvement-workflow`
3. `$frontend-runtime-qa-validation` when a runnable page exists
