# Filter Control Rules

Use for filter bars, query panels, filter popovers, chips, and saved views.

## Final Visual Control Gate

- Main filter areas must not use naked native `<select>` controls as the final visual surface.
- Prefer the existing design-system `Select`, `Dropdown`, `TreeSelect`, `DatePicker`, cascader, or menu component. If no design system exists, build a custom popover select with a styled trigger, controlled menu/listbox, keyboard focus, outside-click close, disabled options, loading/no-option rows, and selected-state feedback.
- A native `<select>` is acceptable only as a baseline prototype fallback when it is wrapped and styled with `appearance: none`, custom arrow, consistent height/radius/border, focus ring, hover/active/disabled/loading/error states, and full-value disclosure.
- Native operating-system dropdown menus cannot be fully internet-styled or screenshot-controlled. Advanced visual acceptance requires a custom popover select instead of relying on the native dropdown menu.
- Screenshot QA must include the closed trigger, open menu/popover, selected state, focus state, disabled state, loading/no-options state when applicable, and active filter chips.

## Layout

- High-frequency filters stay visible; low-frequency filters move into an advanced filter popover or drawer.
- Controls in one row share height, baseline, border radius, and label alignment.
- Use a grid or flex wrap. Do not squeeze filters until labels or selected values overflow.
- Keep label and input visually bound. If horizontal space is narrow, stack label above input.
- Date range, organization tree, metric, owner, status, and baseline filters should use familiar controls.

## Width And Overflow

- Each filter has a minimum interactive width: compact select 120px, ordinary select 160px, date range 220px, search 200px, tree select 220px.
- Long selected values may use one-line ellipsis only when the full value appears on hover/focus tooltip.
- Multi-select chips wrap inside the filter popover or collapse into `已选 N 项`; the full selected list appears in popover.
- Active filter chips in the page header must not push primary actions out of view. Move extra chips into `更多条件`.

## States

- Define default, hover, focus, selected, disabled, loading options, no options, and error loading options.
- Loading option lists should preserve menu width and show a stable loading row.
- Disabled controls must show why they are disabled through tooltip or helper text when the reason is not obvious.

## Interaction

- Provide clear reset, apply, and save-view actions when filters are expensive or multi-step.
- Immediate filters should update affected components without shifting the filter bar.
- Validation errors must appear close to the control and not overlap adjacent filters.
