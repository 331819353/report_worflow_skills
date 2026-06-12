# Cards, Lists, Tasks, And Status Rules

Use for repeated object cards, ranking lists, anomaly cards, task cards, status chips, and timeline rows.

## Card And List Structure

- Same card/list type uses consistent height, padding, metadata order, icon style, and status placement.
- Primary object name, main value/status, owner, deadline, and next action must be easy to scan.
- Use table layout when the content becomes record-like or comparison-heavy.
- Do not turn every field into a badge. Reserve badges for status, priority, severity, or lifecycle.
- Fixed-height cards must declare an internal height budget: padding + explicit line-height rows + vertical gaps + status/action/footer heights must be `<=` card height. Object name, main value/status, metadata, focus labels, and action text need explicit `line-height`.
- Card/list groups must declare a visible-count budget. Repeated peer cards default to `<=6` visible cards in one fixed block; more records use pagination, internal scroll with visible affordance, Top N + other, grouping, drawer/detail, or a table fallback.

## Fit And Overflow

- Object names can wrap to two lines; full name appears in tooltip or detail drawer.
- Task titles, anomaly reasons, warning names, owners, deadlines, and next actions must not be clipped without disclosure.
- Repeated cards in a fixed-height block use internal scroll or pagination. They must not overflow the report page.
- Overflow strategy must be explicit: which records stay visible, how `+N` or pagination is labeled, whether sorting/ranking is stable, and how the full record can be inspected.
- Keep action area stable so buttons do not move when status text changes.
- `scrollHeight > clientHeight + 2` or `scrollWidth > clientWidth + 2` on a fixed-height card body is a clipping failure unless the overflow behavior is an intentional visible scroll region or declared disclosure strategy.

## Status And Severity

- Severity uses one consistent scale across the page, such as critical, high, medium, low.
- Pair color with icon/text. Do not use color alone.
- Long status wording uses short visible label plus full explanation in tooltip.
- Use strong fills only for severe/selected states; use soft tints for ordinary statuses.

## Interaction States

- Cards and list rows need hover, active, selected, loading, disabled, and empty states when relevant.
- Hover may reveal secondary actions, but primary action and status remain visible.
- Selection should not alter card dimensions.
- Drag/sort/task-board interactions need clear placeholder and drop target styles.

## Task-Specific Rules

- Task cards show status, owner, deadline, latest update, and next action.
- Overdue and blocked states must be visible without opening the detail drawer.
- SLA countdowns must reserve enough width and use compact formatting when narrow.
