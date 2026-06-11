# Report Filters, States, Engineering, And Acceptance Guidelines

Use this reference for query/filter controls, interaction states, permissions, data anomalies, frontend implementation, performance, collaboration, acceptance, and reusable templates.

## Filter Area

Filter area narrows data scope and should not become the visual center.

Rules:

- High-frequency filters display directly.
- Low-frequency filters collapse into `更多筛选`.
- Default values match the highest-frequency query scenario.
- Required filters have clear prompts.
- Query and reset buttons are placed on the right side or at the end.
- Keep labels, inputs, and buttons aligned.
- Page/global filters define cross-component query scope. Component-internal local filters are separate controls and affect only the current component or declared local group.

Recommended filter order:

```text
时间 -> 组织 -> 区域 -> 产品 -> 客户 -> 状态 -> 其他条件 -> 查询/重置
```

Reason:

- Time is usually the most important global scope.
- Organization/region decides permission and business boundary.
- Product/customer further focuses analysis.
- Status/type and auxiliary conditions come later.

## Component-Internal Local Filters

Use the fixed design item name `组件内筛选区 / 局部筛选区` when a component needs a local switch. It is not a page filter bar and should not look like a form.

Rules:

- Scope is current component only, or one explicitly declared local component group.
- It may run locally only on already fetched and bounded component data.
- It must not change page/global scope, permission scope, backend aggregation, pagination, export scope, or other components.
- Suitable uses: time range, metric口径/view, display granularity, YoY/MoM, sort/ranking, or Top N when those choices belong to the component.
- Unsuitable default uses: region, channel, store, category, owner, status, permission, and other complex business dimensions unless the component itself owns that local dimension.
- Use capsule sliding buttons for `2-4` short options. Use a compact dropdown for `>4` options, long labels, or failed width fit. Use panel/popover/drawer only for multiple local filter groups.
- Preferred placement is the component title/header right side; an under-title row is allowed only when vertical budget passes. Never overlay the KPI value, plot, legend, axis, table header, pagination, or state message.
- Keep the component title readable first. Definition/help follows the title; units move to subtitle/metadata when the title-right area is crowded.

Acceptance:

```text
filterH = clamp(24px, H * 0.08, 32px)
optionW = clamp(44px, textWidth + 24px, 96px)
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  collapse to compact dropdown
```

Responsive behavior: `W >= 480px` may show title-right capsule; `320px <= W < 480px` must pass title fit or collapse; `240px <= W < 320px` uses compact dropdown; `W < 240px` shows selected value plus chevron; `H < 180px` cannot add a new filter row.

## Filter And Control Colors

Use project/template tokens first. For Haier-branded enterprise/report pages, inherit `$haier-enterprise-app-ui-design-spec` color tokens and record any project-level override.

| Role | Token/fallback | Usage |
| --- | --- | --- |
| Primary action | `brand.primary` / Haier `HBlue-6 #0073E5` | Button default, selected pagination |
| Primary hover/pressed | Generated `HBlue` hover/pressed token or documented project token | Button hover and active states |
| Option hover/focus fill | Generated `HBlue-1`/light brand token or documented project token | Cascader/select option hover and focus |
| Disabled/no-permission | Neutral disabled/background token / Haier `#BFBFBF` text with `#F5F5F5` background | Disabled or no-permission button/control |

Do not introduce standalone filter colors such as `#2793F2`, `#E6F7FF`, or `#F2F2F2` without mapping them to an approved brand/template token.

## Buttons

Primary button:

- Use for query, confirm, submit, complete.
- Primary button uses primary color background.
- One button area has at most `1` primary button.
- One page should have no more than `2` primary buttons when possible.
- Use only for key operations, not normal jumps or low-frequency actions.

Secondary button:

- Use for cancel, reset, return, secondary actions.
- Usually appears with primary button.
- Visual weight is lower.
- Position follows system convention, usually left of or near primary button.

Text button:

- Use for collapse, expand, view, cancel, or light actions in fixed components.
- Lowest visual weight.
- Do not use as strong-action entry.
- Dangerous actions should not be text-only.

## Inputs And Selectors

Input query:

- Text and icon padding inside input is `12px`.
- Placeholder explains input content, for example `请输入客户名称`.
- Search input can place search icon on the right.
- Error prompt stays close under input.
- Validation failure must clearly state reason.

Select:

- Applies to single select, multi-select, status select, type select.
- Options use business names, not codes.
- Multi-select displays selected tags; collapse when too many.
- Search is needed when options are many.
- Required-empty prompt is explicit.
- Dropdown width should be at least input width.

Cascader:

- Applies to organization, region, product, category hierarchy.
- Hierarchy must be clear and not too deep.
- Search should match any level when supported.
- Leaf/non-leaf selection rule must be clear.
- Hover color uses the approved option hover/focus fill token from `Filter And Control Colors`.

Date picker:

- Supports single date, date range, month, year.
- Default date range matches business scenario, such as current month, last 30 days, or yesterday.
- Date range cannot exceed API-supported scope.
- Start date cannot be later than end date.
- Monthly reports use month picker, not calendar date picker.
- Annual reports use year picker.

Navigation:

- Horizontal navigation: for few first-level categories and top switching.
- Vertical navigation: for many levels, many modules, or back-office scenarios.
- Current item has clear highlight.
- Navigation name matches page title.
- Avoid long navigation copy.
- Secondary navigation should not be too deep.

Switch:

- Use for immediate enable/disable, show/hide data, or feature toggle.
- If change takes effect immediately, the result must be clear.
- High-risk operations should add confirmation, not only switch.
- Loading state prevents repeated operation.

## States And Permissions

Loading:

- Use for first page load, filter query, chart refresh, table pagination, export generation.
- Query button enters loading after click to avoid repeated submit.
- Charts/tables can use local loading to avoid full-page flicker.
- Long loading should show prompt such as `数据加载中，请稍候`.

Empty:

| Scenario | Copy |
| --- | --- |
| Default no data | `暂无数据` |
| No data after filter | `当前筛选条件下暂无数据` |
| No permission data | `暂无可查看数据` |
| Required condition not selected | `请选择筛选条件后查询` |

Rules:

- Empty state sits in the center of chart/table content area.
- Do not show broken chart/table shapes.
- Provide next-step suggestion when useful, such as adjust filters and retry.

Error:

| Type | Handling |
| --- | --- |
| API failure | Show error and support retry |
| Data timeout | Suggest retry later or shrink query scope |
| Param error | Mark wrong filter item |
| Permission denied | Prompt no permission or guide application |
| Export failure | Show reason and allow re-export |

Permissions:

| Permission state | Recommended handling |
| --- | --- |
| No page access | Show no-permission page |
| No field access | Hide field or show masked value |
| No operation access | Hide button or disable with reason |
| No export access | Hide export or prompt no permission |

Permission dimensions include page access, data row permission, field visibility, operation button permission, and export permission.

Data anomalies:

| Anomaly | Display rule |
| --- | --- |
| Empty/null | `-` |
| Division by zero | Follow口径, display `-` |
| Extreme YoY/completion | `>= 500%` or `<= -500%` displays `-` |
| Negative | Follow metric direction and口径; negative values are not automatically red |
| Infinity/NaN | `-` |
| Data delay | Show update time or delay explanation |

## Frontend Implementation

Recommended component structure:

```text
ReportPage
├── PageHeader
├── FilterForm
├── MetricCardGroup
├── ChartGrid
│   ├── ChartCard
│   └── ChartCard
├── ReportTable
└── ReportFooterNote
```

Configuration-first development:

- Variable report parts should be configured to reduce repeated code.
- Filter config should define field, label, type, required, default, multiple, placeholder, and validation.
- Chart config should define id, title, subtitle, unit, chartType, x/y/series fields, legend position, data labels, tooltip, colors, source text, and detail link.
- Table column config should define title, dataIndex, width, alignment, ellipsis, tooltip, formatter, fixed, and permissions.

Formatting:

- All number formatting is centralized; do not scatter formatting logic across pages.
- Null/undefined/NaN display `-`.
- Numbers use rounded thousands separators when business rules say no decimals.
- Percent format displays rounded value plus `%`.
- Amount format uses thousands separator and business unit.

Formula implementation:

- Completion rate follows the rules in `04-report-requirements-metrics-layout-guidelines.md`.
- YoY follows the rules in `04-report-requirements-metrics-layout-guidelines.md`.
- Extreme rate `>= 5` or `<= -5` should normalize to null/display `-`.
- Color semantic functions must account for metric direction: positive, negative, or neutral.

API field contract:

```json
{
  "success": true,
  "code": "0",
  "message": "success",
  "data": {
    "summary": {},
    "charts": {},
    "table": {
      "list": [],
      "pagination": {
        "pageNo": 1,
        "pageSize": 10,
        "total": 100
      }
    },
    "meta": {
      "dataSource": "经营分析系统",
      "updateTime": "2026-06-09 08:00:00",
      "unit": "万元"
    }
  }
}
```

Rules:

- API field names remain stable.
- Numeric fields return raw values, not strings with units.
- Units and format rules are handled through `meta` or frontend config.
- Permission info should be explicit; frontend should not guess.

## Performance And Usability

Query performance targets:

| Scenario | Target |
| --- | --- |
| First-screen core metrics | `<= 2s` |
| Normal chart query | `<= 3s` |
| Detail table pagination | `<= 3s` |
| Large data export | Async task |

Optimization:

- Load first-screen core metrics and key charts first.
- Lazy-load detail tables or load on demand.
- Large query must paginate.
- High-frequency reports can use cache, pre-aggregation, or offline wide tables.
- When filter scope is too large, prompt user to narrow scope.

Chart performance:

- Too many data points need sampling, aggregation, pagination, virtual scroll, or heatmap.
- Do not render too many charts at once.
- Debounce chart resize.
- Avoid high-frequency recalculation in tooltip and linkage events.

Table performance:

- Large lists use pagination or virtual scroll.
- Many columns use horizontal scroll and column configuration.
- Avoid too many fixed columns.
- Large export uses async export.

Usability:

- Preserve last query state when useful and support reset.
- Key report operations have feedback.
- Empty, error, loading, and no-permission states are complete.
- User can identify current data range and update time.
- Important charts support detail view or jump.

## Collaboration And Deliverables

Standard flow:

```text
需求提出
-> 业务目标澄清
-> 指标口径确认
-> 原型与信息架构设计
-> UI 设计与规范套用
-> 技术方案评审
-> 前后端开发
-> 联调与数据对账
-> UI 走查
-> 测试验收
-> 上线发布
-> 使用反馈与迭代
```

Roles:

| Role | Responsibility |
| --- | --- |
| Business | Business goal, metric meaning, scenario, acceptance |
| Product | Requirement breakdown, page structure, filters, interaction path |
| Data analyst | Metric口径, analysis dimensions, chart suggestion |
| UI/UX | Layout, visual rules, interaction states |
| Backend/data dev | API, aggregation, permissions, performance |
| Frontend | Components, formatting, interactions, states |
| QA | Functional, data, UI, permission, performance tests |

Deliverables:

| Stage | Deliverables |
| --- | --- |
| Requirement | Report requirement doc, metric dictionary, dimension dictionary, filter list, prototype, chart selection, permission rules, acceptance criteria |
| Design | Page design, component state design, chart style notes, table column notes, color/typography annotations, abnormal state notes, jump/drilldown notes |
| Development | Frontend code, component configs, API docs, mock data, formatters, permission logic, core tests |
| Testing | Test cases, data reconciliation, UI walkthrough, permission test, performance test, defects, launch confirmation |

## Acceptance Checklist

Requirement and口径:

- Report goal answers core business question.
- User role and permission scope are clear.
- Metric name, unit, formula, and precision are clear.
- Derived metrics such as YoY and completion rate have rules.
- Data source and update time are clear.
- Null, anomaly, and extreme handling are clear.
- Filter defaults and required rules are clear.

Layout:

- Page follows overview -> analysis -> detail -> explanation.
- Module spacing and card layout are consistent.
- Module title, operations, and descriptions are positioned consistently.
- First screen shows core metrics and key conclusion.
- No obvious crowding or visual noise.

Charts:

- Chart type matches data relationship.
- Title, unit, legend, and axis are complete.
- Typography, colors, and grid lines follow rules.
- Multi-series colors use palette order.
- Warning colors match business semantics.
- Tooltip is complete and formatted.
- Empty data shows empty state, not broken chart.
- Necessary drilldown/detail jump exists.

Tables:

- Header background and border color follow rules.
- Text/numeric/amount/rate alignment is correct.
- Long fields use ellipsis and tooltip.
- Operation column remains accessible under horizontal scroll.
- Pagination works.
- Sorting, filtering, export meet requirements.
- Permission fields and operations are controlled.

Format and copy:

- Chinese and English/digit fonts follow rules.
- Page title/body/note sizes follow rules.
- Amount and quantity use thousands separators.
- Rate/completion/YoY have no decimals unless business requires.
- Negative values are red.
- Empty values display `-`.
- Date/time formats are consistent.
- Copy is clear and does not expose API fields or technical terms.

Interaction and states:

- Query, reset, export, and drilldown work.
- Button hierarchy is correct and primary buttons are limited.
- Loading, empty, error, no-permission states exist.
- Validation and error prompts are clear.
- Date range, required fields, and cascades are correct.
- Repeated clicks are protected.

Performance and compatibility:

- First-screen load meets target.
- Chart/table query response meets target.
- Large data pagination or async export works.
- Browser compatibility passes.
- Resize keeps charts adaptive.
- Permission and security verification pass.

## Reusable Templates

When asked for template artifacts, provide one of these structures:

- Report requirement statement: basic info, background, users, business questions, metrics, dimensions, page structure, interactions, abnormal states, acceptance.
- Metric dictionary: metric code/name, domain, definition, formula, unit, precision, format type, direction, source, refresh, owner, anomaly handling.
- Chart design note: name, analysis purpose, chart type, metrics, dimensions, unit, time range, series, color, sort, tooltip, data labels, empty copy, click action, link, source, update time.
- Table column config: column name, field, type, unit, width, alignment, sort/filter/fixed, permission, notes.
- Filter config: filter name, field, component type, required, default, multi-select, linkage, validation, notes.
- UI walkthrough record: module, issue, type, priority, owner, status.
- Data reconciliation record: metric, page value, source value, diff, reason, pass/fail.
