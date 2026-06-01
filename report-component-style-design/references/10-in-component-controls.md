# In-Component Control Rules

Use for capsule switches, segmented controls, dropdown selects, mini menus, and component-level view controls inside cards, charts, tables, KPI groups, task lists, and drawers.

## When To Use

- Use capsule switches for 2-5 mutually exclusive modes that users compare frequently, such as `金额 / 数量`, `日 / 月 / 年`, `图表 / 表格`, `销售 / 利润 / 费用`.
- Use dropdowns for larger option sets, lower-frequency choices, long labels, hierarchy, or scoped dimensions, such as organization, product, region, customer, project, metric library, ranking scope, or benchmark.
- Do not use both a capsule switch and a dropdown for the same decision in one component.
- Component controls must change only that component unless explicitly designed as a page-level filter.

## Placement

- Preferred placement is the component header right side, aligned with title/actions.
- If the header is too crowded, place controls in a compact toolbar at the top of the body with reserved height.
- Do not float controls over chart labels, legends, table headers, KPI values, or empty states.
- Keep legend and controls visually separate. A control is interactive state; a legend explains visual encoding.
- For narrow cards, collapse secondary controls into a single dropdown or `更多` menu.

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
- Do not let controls overlap legends, axis labels, table headers, or KPI values.
- Do not create a new visual language for each component. Controls across the page must share height, radius, border, hover, and selected states.
- Do not hide selected state in color only; pair it with shape, check, shadow, or text contrast.
