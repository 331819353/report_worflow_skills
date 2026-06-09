# Haier Enterprise App Usage Scenarios

Use this reference when choosing how common application components become pages and flows.

## Form Scenario

Basic layout:

- Single-column forms suit small forms with few fields and little need for grouping.
- As form complexity increases, add grouping.

Grouping:

- Weak grouping: short and strongly related fields can be placed in the same row.
- Grouped form: use group titles when many fields can be classified.
- When content exceeds `2` screens and can be classified, prefer card grouping.
- Each card needs a clear large title.

Layout rules:

- Advanced, grouped, and card forms should use top/bottom label layout.
- Basic forms should use left/right label layout.
- Do not mix left/right and top/bottom label layouts on the same page.

## List Scenario

Single-column list:

- Browse from top to bottom.
- Put the filter module at the top.
- User flow: filter first, then browse, then enter detail.

Two-column list:

- If filter conditions are many and horizontal space is sufficient, put filters in a sidebar.

Batch operations:

- Page-level batch operations that affect the whole page can be placed at the page bottom.

## Detail Scenario

Layout strategy:

- Basic detail: flat display.
- Complex detail: use Tabs, Steps, cards, or similar structures to split information.

Separation:

| Method | Usage |
| --- | --- |
| Non-full-width divider | Separate relatively related content |
| Full-width divider | Separate different parts |
| Card | One theme per card |
| Tabs | Switch top-level content dimensions |

## Table Scenario

- Suitable for large data display.
- Suitable for horizontal and vertical comparison.
- Operations are placed on the right and right-aligned.
- Operation area may float when needed.
- Editing can use inline editing or popup editing.

## Empty State

Composition:

- Image / illustration.
- Prompt information.
- Optional suggested action.

Use for:

- List has no data.
- Page has no content.
- Component has no content.

## Abnormal Page

Composition:

- Illustration.
- HTTP error code.
- Abnormal reason description.
- Suggested action.

## Feedback

Feedback types:

- Success staying prompt: Modal dialog.
- Global Message.
- Inline Text + Illustration.
- Failure staying prompt: Modal dialog.
- Alert.
- Form Validation Prompt.
- Notification.
- Notification Center.

Notification Center aggregates:

- Approval.
- Approval results.
- Background tasks.
- System activity information.

## Navigation

Navigation movement:

| Type | Rule |
| --- | --- |
| 平移 | Switch pages at the same level |
| 下钻 | Enter lower-level content |
| 返回 | Return to upper level or browsing history |
| 关联 | Jump to related pages or modules |

Navigation types:

- Global navigation.
- Return navigation.
- Page navigation.
- Drilldown navigation.
- Associated navigation.

Side navigation:

- Suitable for back-office systems.
- Use when there are many menu items.
- Supports `1-3` menu levels.
- Recommended for enterprise back-office systems.

Top navigation:

- Suitable for front-office systems.
- Suitable for `2-7` navigation items.
- Supports `1-2` levels.
- If more than `2` levels are needed, use popup navigation.

Page-level navigation can include:

- PageHeader.
- Anchor.
- Tree.
- Breadcrumb.
- Tab.

## Data Entry

Text entry:

- Single-line input: recommended content length no more than `20` characters.
- Textarea: use for long content editing.
- Long explanations use information icons or Tooltip.
- Short reminders can be placed under the input.

Selection entry:

| Type | Use when |
| --- | --- |
| Radio | Single selection with few options |
| Checkbox | Multi-selection or status mark |
| Switch | Trigger-immediate switch operation |
| Dropdown | Many options, for example more than `5` |
| Transfer | Dual-list selection |
| DatePicker | Time or time-range selection |

Upload:

- Simple upload: single file, no preview needed.
- Thumbnail upload: display images in a list.
- Hide upload button after quantity limit is reached.

## Data Presentation

Table:

- Clear and efficient data display.
- Can pair with sorting, search, filtering, and pagination.
- Time, status, and operation should avoid wrapping.
- Empty cell uses `-`.

Card:

- Carries data and operations.
- Control the number of cards per row to avoid overcrowding.

Carousel:

- Shows same-level content.
- Can auto-rotate or be user-triggered.
- Recommended item count: `3-5`.
- Must imply quantity and direction.

Tree:

- Shows hierarchical relationships.
- Suitable for catalogs, organization structures, and category structures.

Timeline:

- Vertical time flow.
- Usually shows events in reverse order.
- Use for tracking past and current progress.

## Button Scenario

- Primary button: complete, recommended, submit, and other key actions.
- Secondary button: non-main actions.
- Text button: weakened style, suitable for table operation columns.
- Icon button: improves recognition; pure icon must have Tooltip.

Rules:

- One button area has at most `1` primary button.
- Use secondary buttons when operation priority is unclear.
- Secondary operations can be collapsed into a dropdown.
- Do not put two icons in one button.
- Button areas should be placed in the user's browsing path.

## Copywriting

Core principles:

- Precise.
- Clear.
- Appropriate tone.
- User perspective.
- Consistent wording.
- Important information first.
- Professional and complete.
- Concise and friendly.
- Positive expression.

Writing rules:

- Describe what the user can do, not what the product does.
- Avoid repeating information the user already knows.
- Use language familiar to users.
- Use the same term for the same concept.
- Operation name should match the target page title.
- Error prompts should match user cognition.
- Time expressions must be explicit.

Button copy:

- Clearly express what happens after click.
- Prefer verbs.
- Replace generic `确定 / 取消` with task copy when possible, for example `发布 / 取消`.
- High-risk operations should emphasize consequences, for example `删除 / 取消`.

## Result Scenario

Result pages can contain:

1. Result feedback: clearly tell submission result.
2. Result explanation: optional short explanation.
3. Suggested action: guide next step.
4. Supplemental information: optional auxiliary information or operation module.
