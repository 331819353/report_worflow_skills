# In-Component Control Rules

Use for capsule switches, segmented controls, dropdown selects, mini menus, component-internal local filters, and component-level view controls inside cards, charts, tables, KPI groups, task lists, and drawers.

In Vue report prototypes, prefer Element Plus `ElSegmented`, `ElRadioGroup`, `ElSelect`, `ElDropdown`, `ElButton`, `ElTooltip`, `ElPopover`, `ElSwitch`, `ElTag`, and `ElTabs` before custom DOM controls. Use custom controls only when Element Plus or the project design system cannot express the interaction.

## When To Use

- Use capsule switches for 2-4 mutually exclusive short options that users compare frequently, such as `金额 / 数量`, `日 / 月 / 年`, `图表 / 表格`, `销售 / 利润 / 费用`.
- Use dropdowns for larger option sets, lower-frequency choices, long labels, hierarchy, or scoped dimensions, such as organization, product, region, customer, project, metric library, ranking scope, or benchmark.
- Do not use both a capsule switch and a dropdown for the same decision in one component.
- Component-internal local filters must change only the current component or current block-scoped component group. They must not assume page/global filter responsibility.
- A control that changes the metric set, component semantic role, table columns/header groups, domain vocabulary, or first-level report perspective is a perspective/control switch, not an ordinary component-internal local filter.

For the default block-owned title/function area's right side, use the stricter local-filter rule:

| Right function area content | Control |
| --- | --- |
| One local filter with `2-4` short values and enough width | Sliding capsule / segmented pill |
| One local filter with `> 4` values, long labels, or insufficient width | Compact capsule dropdown/select |
| Two local filter groups | Keep the primary group visible and collapse the secondary group into a dropdown or panel; allow two visible groups only in wide components |
| Multiple local filters | Filter panel/popover/drawer trigger with active count or summary |
| Detail/jump action | Lightweight text link such as `查看详情` |

## Component-Internal Local Filters

Use the fixed section name `组件内筛选区 / 局部筛选区` in implementation-ready component specs.

Scope:

- It is a lightweight switch for the current component only.
- It operates over the component's already fetched and bounded data unless the binding contract explicitly says otherwise.
- It must not change page-level scope, permission scope, pagination, backend aggregation, export scope, or other components.
- Prefer local display dimensions such as time range, metric view, display granularity, sort, Top N, or YoY/MoM view. Avoid complex business dimensions such as region, channel, store, category, owner, or status unless the dimension is truly local to this component.

Default selection:

| Option count / fit | Default |
| --- | --- |
| `2-4` short options | Capsule sliding button / segmented control |
| `> 4` options | Single compact capsule dropdown |
| Space does not fit within title band | Single compact capsule dropdown |
| Two groups | Primary group visible; secondary group collapsed unless `W >= 720px` and the title still fits |
| More than two groups | Local filter panel/popover/drawer trigger |

Priority when choices compete:

```text
time range -> metric口径/view -> display granularity -> sort/ranking
```

Size algorithm:

```text
filterH = clamp(24px, H * 0.08, 32px)
defaultFilterH = 28px
smallFilterH = 24px
optionW = clamp(44px, textWidth + 24px, 96px)
filterW = sum(optionW) + capsulePadding * 2
filterMaxW = min(CW * 0.45, 280px)

if filterW > filterMaxW:
  use compact capsule dropdown
```

Style:

- Shape is a quiet pill/capsule, usually `999px` radius, 1px subtle border, 2px inner padding, and 12px text.
- Option horizontal padding is `10-14px`; ordinary option width is `44-96px`.
- Keep it restrained and close to the title or chart header. It should feel like a light switch, not a form.
- Do not use large filled buttons, form rows, stacked field labels, or colorful tags as the default component-internal filter.

Placement:

```text
filterX = W - P - filterW
filterY = P + (titleLineH - filterH) / 2
titleMaxW = CW - filterW - 12px
```

If the right side does not fit:

```text
filterX = P
filterY = P + titleH + 6px
filterRowH = filterH + 6px
titleAreaH = titleH + filterRowH
```

Placement rules:

- Prefer the title band right side.
- Use an under-title lightweight row only when the title-right placement fails.
- Do not place the filter over a plot, axis label, chart legend, KPI value, table header, or empty-state message.
- Keep filter and legend separate. A filter changes state; a legend explains visual encoding.
- Title remains readable first. Definition/help icon follows the title. Units move to subtitle or chart header metadata when the title-right area is crowded.

Responsive collapse:

| Condition | Behavior |
| --- | --- |
| `W >= 480px` | Title-right capsule is allowed when fit passes |
| `320px <= W < 480px` | Use title-right only if title still fits; otherwise under-title row or dropdown |
| `240px <= W < 320px` | Compact single capsule dropdown |
| `W < 240px` | Show selected value plus chevron, for example `本月 ▾` |
| `H < 180px` | Do not add a new filter row; inline or collapse |
| Option count `> 4` | Compact dropdown |
| More than one group in narrow width | Collapse secondary groups first |

## Placement

- Preferred placement is the component header right side, aligned with title/actions.
- If the header is too crowded, place controls in a compact toolbar at the top of the body with reserved height.
- Do not float controls over chart labels, legends, table headers, KPI values, or empty states.
- Keep legend and controls visually separate. A control is interactive state; a legend explains visual encoding.
- For narrow cards, collapse secondary controls into a single dropdown or `更多` menu.
- In a block-owned title/function band, the left-aligned title keeps priority and the right function area stays one line. Collapse low-frequency controls into a panel or `更多` before shrinking the title below readability.

## Capsule Switch Style

- Shape: rounded pill container with 999px radius, 1px subtle border, soft neutral background.
- Size: height 28-32px for ordinary report cards; 24-28px for dense cockpit cards; minimum touch target should still be 32px when used on touch screens.
- Segment padding: 10-14px horizontal, 4-6px vertical. Text 12-13px.
- Selected segment: white or brand-tint background, primary text, subtle shadow or 1px primary border. Avoid heavy gradient fills.
- Unselected segment: neutral text, transparent background, visible hover state.
- Disabled segment: muted text, no hover elevation, optional tooltip explaining why.
- Do not allow segment text to wrap. If labels cannot fit, abbreviate labels and show full text in tooltip, or switch to dropdown.
- Keep capsule switch width stable when selection changes.

## Dropdown Style

- Use a compact select trigger with 28-32px height, 120-180px ordinary width, and 96-120px compact width in dense cards.
- The trigger shows selected option, optional leading label, and chevron. Keep chevron right aligned and stable.
- Long selected values use ellipsis only with full value in tooltip.
- Dropdown menu width should be at least the trigger width and may expand to fit readable option text.
- Menu options use 12-14px text, 32-36px option height, hover and selected states.
- Selected option should show primary text or a check icon; do not rely only on background color.
- For hierarchy or long option lists, provide search, grouping, or tree select instead of a flat crowded menu.
- Menus must stay within viewport; flip or constrain height with internal scroll.

## UI Style Tokens

Recommended light enterprise style:

```css
:root {
  --control-bg: #f8fafc;
  --control-border: #e2e8f0;
  --control-text: #475569;
  --control-text-active: #0f172a;
  --control-primary: #0b6fd3;
  --control-primary-soft: #eaf4ff;
  --control-hover: #f1f5f9;
  --control-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.component-controlbar {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.capsule-switch {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 2px;
  border: 1px solid var(--control-border);
  border-radius: 999px;
  background: var(--control-bg);
}

.capsule-switch__item {
  height: 24px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--control-text);
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
}

.capsule-switch__item[aria-selected="true"] {
  background: #fff;
  color: var(--control-text-active);
  box-shadow: var(--control-shadow);
}

.component-select {
  height: 30px;
  min-width: 120px;
  max-width: 180px;
  border: 1px solid var(--control-border);
  border-radius: 999px;
  background: #fff;
  color: var(--control-text-active);
  font-size: 12px;
}
```

## Behavior

- Control changes must update chart/table/KPI content without changing card size.
- Preserve selected control state during refresh, fullscreen, drawer open/close, and export.
- When a control changes the data grain or metric, clear stale chart selection and tooltip state.
- Show loading state only in the affected component body or control trigger; do not freeze the entire report unless required.
- Keyboard interaction: capsule switch supports arrow keys and Enter/Space; dropdown supports Enter, Escape, arrow keys, and typeahead/search where possible.
- Add `aria-selected` or equivalent state for segmented items and accessible labels for select triggers.

## Component-Specific Guidance

- KPI card: capsule switch may change metric, unit, or period. Keep apex value layout stable and update comparison cells consistently.
- Chart: capsule switch may change metric/view mode; dropdown may change dimension/ranking scope. Recompute label budget after change.
- Table: dropdown may change metric group or column set. Keep row height stable and use horizontal scroll instead of squeezing columns.
- Text summary: use controls sparingly. Changing control state should update the conclusion copy and highlighted evidence.
- Task/anomaly list: capsule switch may switch status grouping; dropdown may switch owner/priority scope.
- Drawer: controls may switch tabs or evidence dimensions; keep sticky header/actions stable.

## Avoid

- Do not put page-level filters inside every component unless each component needs independent scope.
- Do not use large colorful buttons as mode switches inside dense report cards.
- Do not turn block-title right function links such as `查看详情` into primary filled buttons; keep them lightweight.
- Do not let controls overlap legends, axis labels, table headers, or KPI values.
- Do not create a new visual language for each component. Controls across the page must share height, radius, border, hover, and selected states.
- Do not hide selected state in color only; pair it with shape, check, shadow, or text contrast.
