# Components And Interactions

## 1. Content Structure Patterns

Choose one dominant structure based on the report goal.

When `visualMode: sampleRestore`, any added conclusion, insight, or status summary must reuse an existing sample-equivalent region in the chosen structure: header/control area, panorama header, section head, or summary card. Do not insert a standalone horizontal band between the toolbar and body unless the source sample already has an equivalent band.

### Executive Narrative

Use for status overview, review recap, performance evaluation, and leadership pages.

Flow: overall judgment -> key facts -> evidence sections -> risks/actions.

### Overview To Breakdown

Use for broad dashboards, status overview, anomaly monitoring, and performance evaluation.

Flow: status cards -> main chart/distribution -> dimension breakdown -> drawer detail.

### Evidence To Conclusion

Use for analysis diagnosis and reconciliation pages where proof matters.

Flow: evidence -> decomposition/comparison -> detail validation -> conclusion.

### Problem To Diagnosis To Action

Use for analysis diagnostic pages.

Flow: problem definition -> driver decomposition -> dimension/process drilldown -> evidence drawer -> diagnostic conclusion and action entry.

### Filter To Summary To Table To Drawer

Use for detail query and reconciliation detail pages.

Flow: filter/search -> result summary -> dense table/list -> row detail drawer -> export/source trace.

### Alert To Locate To Handle

Use for anomaly monitoring.

Flow: alert pressure -> severity/distribution -> trend/recurrence -> alert list -> handling drawer and batch actions.

### Target To Task To Progress To Closure

Use for operational execution.

Flow: execution overview -> tasks -> table/Kanban/Gantt -> blockers -> task drawer -> result verification.

### Summary To Chapters To Evidence To Action

Use for review recap and meeting materials.

Flow: executive conclusion -> chapter navigation -> stage results -> changes/causes -> issues/risks -> action plan -> export/presentation mode.

### Perspective Navigation

Use for business domain, report theme, management object, subject area, or statistical口径 switching when the control changes the report's first-level view.

Rules:

- Prefer low-intrusion Tabs, Segments, compact card navigation, or dropdown perspective selection based on available width and item count.
- Each perspective item should expose at most two primary information layers. The default payload is `domain + one core metric/status`; move extra focus detail into hover/focus tooltip, selected-state summary, overview content, or the selected perspective body.
- Fixed-height navigation items must declare a height budget: padding + explicit line-height rows + gaps + badge/status/footer heights must be `<=` item height. Domain name, metric name, percentage/core value, and bottom labels must use explicit `line-height`.
- At `1920x1080` and `1280x768`, every visible item/card content viewport must pass `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth`. Use DOM checks; screenshots are supporting evidence only. `scrollHeight > clientHeight` or `scrollWidth > clientWidth` is clipping.
- If labels or badges do not fit, redesign the navigation pattern instead of shrinking text or hiding overflow.

## 2. Key Page Actions

Use only actions that support the task.

- Refresh: include when data can update. Show latest update time and sync status.
- Export/download: include for offline analysis, meeting material, audit evidence, or sharing.
- Fullscreen: include for dashboards, monitoring pages, meeting screens, and large charts/tables.
- Share/subscribe: include when users collaborate, receive alerts, or return to saved report states.
- Settings: use for columns, metrics, density, chart/table switch, benchmark, and definition view.
- More menu: put rare, destructive, or secondary operations here.

Primary actions may use icon + text. Secondary actions should generally use icons with tooltips.

## 2.1 Block-Owned Title Function Area Handoff

Page layout does not design the block title/function area. It only records what the block needs to expose and which downstream owner implements it. The block, template block renderer, or business widget owns the internal title/function layout.

When a block exposes a title/function area, the downstream block contract should use a stable two-zone layout:

```text
left: block title, left-aligned
right: function area, right-aligned
```

The page-layout output may hand off these right-function needs:

- Component-local filter controls that affect only the current block/component data.
- A filter-panel trigger when the block has multiple local filter fields.
- Text links such as `详情`, `查看详情`, `查看明细`, or `进入分析`.
- Secondary icon actions with tooltips, such as fullscreen, export, refresh, or more.

Control selection:

| Situation | Default control | Notes |
| --- | --- | --- |
| One local filter with `2-4` short values and enough width | Sliding capsule / segmented pill | Use when options are short, mutually exclusive, and title still fits. |
| One local filter with `>4` values, long labels, or failed fit | Compact dropdown/select | Use Element Plus or project select; long labels get tooltip. |
| Two local filter groups | Primary group visible, secondary group collapsed unless the block is wide | Two visible groups need fit proof and should not crowd the title. |
| Multiple local filter groups | Filter panel/popover/drawer trigger | Show active count or active summary in the trigger. |
| Detail or jump action | Text link or icon+text link | Use clear copy such as `查看详情`; keep it low visual weight. |
| Several secondary actions | `更多` menu | Keep rare actions out of the title band. |

Fit rules:

- The block title owns left priority inside the block. The function area may shrink, collapse, or move to `更多`, but the title must remain readable.
- Function controls stay within the block-owned title/function area and do not wrap into the body.
- Keep at least `8px` gap between title text and the right function area.
- Avoid placing chart legends in the function area; legends explain data encoding and belong near the chart.
- Component-local filters affect only the current block/component. They must not replace page/global filters, change permission scope, or drive backend aggregation/pagination unless separately modeled as a page/global filter.
- If the block-owned title/function area cannot fit both title and controls, keep the most frequent local control visible and collapse the rest into dropdown, panel, or menu.
- Never float local filters over KPI values, plot areas, legends, axes, table headers, pagination, or state messages. Collapse the filter before compressing the component body below its fit budget.

## 3. Drawers, Popovers, And Modals

Use:

- Popover for definitions, formulas, source notes, status reasons, and small explanations.
- Drawer for record details, evidence, decomposition, task processing, anomaly handling, or source trace.
- Modal for focused confirmations or short forms.
- Full detail page when the object has many modules or a long handling process.

In Vue report prototypes, use Element Plus `ElPopover`, `ElTooltip`, `ElDrawer`, `ElDialog`, `ElTabs`, `ElForm`, `ElButton`, and `ElTag` for standard overlay and action surfaces unless an existing project design system supersedes Element Plus.

Prefer right drawers for report work because they preserve page context.

## 4. Filters And Drilldown

Filter and drilldown behavior must stay visually safe:

- Active filter scope should be visible through chips or compact summary text.
- Filter changes must update dependent cards, charts, tables, drawers, and export/fullscreen states consistently.
- If a drawer or modal becomes stale after filter changes, show a stale-state message or require sync.
- Drilldown should either update local selection, open a drawer, open a modal, or navigate to a detail page. Avoid hidden side effects.

## 5. States

Design states explicitly:

- Empty: explain the condition that produced no data and how to adjust filters.
- Loading: keep skeleton layout stable.
- Error: show failure reason, retry, data source, and support path.
- No permission: explain scope and request path.
- Data delayed: show latest successful refresh and expected update time.

Never let an important report fail silently.

## 6. Responsive Behavior

Complex reports are desktop-first, but mobile should support reading and lightweight action.

Mobile adaptation:

- Collapse side navigation into menu or drawer.
- Stack KPI cards.
- Turn tables into key-field lists or cards when necessary.
- Keep filters in bottom sheet, popover, drawer, or collapsible panel.
- Preserve primary actions: refresh, filter, export/share, row detail, task update.
- Avoid wide charts that require horizontal scrolling unless table-like data demands it.

## 7. Report-Type Style Mapping

- Status overview: clean management dashboard, overview to breakdown or executive narrative.
- Analysis diagnostic: analytical workspace, problem to diagnosis to action.
- Detail query: data operations table, filter to summary to table to drawer.
- Performance evaluation: clean dashboard plus scorecards and ranking.
- Review recap: meeting recap page, summary to chapters to evidence to action.
- Anomaly monitoring: monitoring command center, alert to locate to handle.
- Operational execution: execution workbench, target to task to progress to closure.
- Reconciliation traceability: analytical workspace or data operations table, result to difference location to source trace to closure.
